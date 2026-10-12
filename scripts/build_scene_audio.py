#!/usr/bin/env python3
"""
Phase 2 音频管线 · 场景对话版 v2：mlx_whisper Python API 常驻（模型只加载一次）
相比 CLI 版（40s/句）提速 ~10x：2631 句预计 ~2 小时。
产出: audio/scene/{key}.mp3 + audio/scene/index.json
key: scene_{sceneId}_{visitId}_{stepIdx}_{lineIdx}
分批: --batch N/M 按任务序号取模分片（多个批次并行跑会各自加载模型，慎用）。
对齐失败句不入 index、mp3 删除，留给 LCS 弹性修复 pass 复跑。
"""
import json, os, re, subprocess, sys, time

ROOT = '/Users/alice/WorkBuddy/3/english-world'
OUT_DIR = f'{ROOT}/audio/scene'
FFMPEG = '/Users/alice/.homebrew/bin/ffmpeg'
VOICE = 'Samantha'

os.makedirs(OUT_DIR, exist_ok=True)

BATCH, TOTAL = 1, 1
for i, a in enumerate(sys.argv):
    if a == '--batch':
        parts = sys.argv[i+1].split('/')
        BATCH, TOTAL = int(parts[0]), int(parts[1])

# 1. SCENES 从 Node dump 的 JSON 读取（规避 JS 字面量解析坑）
# 注：本脚本不做任何文件删除（沙箱 safe-delete 会在累计 50 删时杀进程）。
# 临时 aiff 用固定名复用（say -o / ffmpeg -y 直接覆盖）；对齐失败句 mp3 保留在磁盘，
# 幂等重跑时因 key 不在 index 会重新生成并覆盖；index 不含该 key 即为「未完成」。
SCENES = json.load(open('/tmp/scenes.json', encoding='utf8'))

def norm_word(w):
    return re.sub(r"[^a-z'-]", '', w.lower())

index = {}
index_path = f'{OUT_DIR}/index.json'
if os.path.exists(index_path):
    index = json.load(open(index_path, encoding='utf8'))

tasks = []
for sc in SCENES:
    for vi, visit in enumerate(sc.get('visits', [])):
        for si, step in enumerate(visit['steps']):
            for li, line in enumerate(step.get('npcLines', [])):
                key = f"scene_{sc['id']}_{visit['id']}_{si}_{li}"
                mp3 = f'{OUT_DIR}/{key}.mp3'
                if key in index and os.path.exists(mp3):
                    continue
                tasks.append((key, sc['id'], visit['id'], si, li, line))

if TOTAL > 1:
    tasks = [t for i, t in enumerate(tasks) if i % TOTAL == BATCH - 1]

print(f'batch {BATCH}/{TOTAL}, tasks: {len(tasks)} (index existing: {len(index)})', flush=True)

import mlx_whisper
MODEL = 'mlx-community/whisper-large-v3-turbo'

t0 = time.time()
failures = []
for n, (key, scid, vid, si, li, text) in enumerate(tasks):
    aiff = '/tmp/pg_scene_tmp.aiff'  # 固定名复用，覆盖不删除（规避 safe-delete）
    mp3 = f'{OUT_DIR}/{key}.mp3'
    r = subprocess.run(['say', '-v', VOICE, '-o', aiff, '[[slnc 100]] ' + text], capture_output=True)
    if r.returncode != 0:
        failures.append((key, 'say', r.stderr.decode()[:100])); continue
    r = subprocess.run([FFMPEG, '-y', '-i', aiff, '-codec:a', 'libmp3lame', '-b:a', '24k', '-ar', '16000', '-ac', '1', mp3], capture_output=True)
    if r.returncode != 0:
        failures.append((key, 'ffmpeg', r.stderr.decode()[-100:])); continue
    try:
        d = mlx_whisper.transcribe(mp3, path_or_hf_repo=MODEL, word_timestamps=True)
    except Exception as e:
        failures.append((key, 'whisper', str(e)[-150:])); continue
    words = []
    for seg in d.get('segments', []):
        for w in seg.get('words', []):
            words.append({'w': w['word'].strip(), 's': round(w['start'], 3), 'e': round(w['end'], 3)})
    src_words = [norm_word(x) for x in text.split() if norm_word(x)]
    asr_words = [norm_word(x['w']) for x in words if norm_word(x['w'])]
    if src_words != asr_words:
        failures.append((key, 'align', f'{src_words[:4]}.. vs {asr_words[:4]}..'))
        continue  # mp3 留盘：重跑覆盖，index 无此 key 即未完成
    timed = []
    ai = 0
    for tok in text.split():
        nw = norm_word(tok)
        if not nw:
            if timed: timed[-1]['w'] += tok
            continue
        if ai < len(words):
            timed.append({'w': tok, 's': words[ai]['s'], 'e': words[ai]['e']})
            ai += 1
    index[key] = {
        'scene': scid, 'visit': vid, 'step': si, 'line': li,
        'dur': round(d['segments'][-1]['end'], 3) if d.get('segments') else 0,
        'words': [{'w': t['w'], 's': t['s'], 'e': t['e']} for t in timed],
    }
    if (n + 1) % 50 == 0:
        json.dump(index, open(index_path, 'w', encoding='utf8'), ensure_ascii=False)
        elapsed = time.time() - t0
        eta = elapsed / (n + 1) * (len(tasks) - n - 1)
        print(f'  {n+1}/{len(tasks)} ({elapsed:.0f}s, eta {eta/60:.0f}m, fail {len(failures)})', flush=True)

json.dump(index, open(index_path, 'w', encoding='utf8'), ensure_ascii=False)
print(f'batch {BATCH} done: index {len(index)} entries, this batch {time.time()-t0:.0f}s', flush=True)
if failures:
    print(f'FAILURES ({len(failures)}):')
    for k, t, msg in failures[:30]:
        print(f'  {k} [{t}]: {msg}')
print('DONE')
