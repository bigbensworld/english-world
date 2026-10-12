#!/usr/bin/env python3
"""
Phase 2 音频管线：vlog 15 集全部卡片句子 → 预生成 mp3 + 词级时间戳 JSON
链路: say(Samantha) → AIFF → ffmpeg(24kbps/16kHz/mono mp3) → mlx-whisper(词级时间戳)
产出: audio/vlog/{vlogId}_{cardIdx}.mp3 + audio/vlog/index.json
设计: say 生成本身就是慢速教学语速（比 Web Speech 0.55x 更稳定可控）
"""
import json, os, re, subprocess, sys, time

ROOT = '/Users/alice/WorkBuddy/3/english-world'
OUT_DIR = f'{ROOT}/audio/vlog'
WORD_DIR = f'{ROOT}/audio/words'
FFMPEG = '/Users/alice/.homebrew/bin/ffmpeg'
WHISPER = os.path.expanduser('~/Movies/work/venv/bin/mlx_whisper')
PY = '/Users/alice/.workbuddy/binaries/python/versions/3.13.12/bin/python3'
VOICE = 'Samantha'
SAY_RATE = '[[slnc 100]] '  # 句首微停顿，提高 whisper 首词对齐率

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(WORD_DIR, exist_ok=True)

# 1. 解析 VLOGS（JS 对象字面量 → Python eval：key 加引号 + JS true/false/null 转换）
src = open(f'{ROOT}/vlogs.js', encoding='utf8').read()
import re as _re
src = _re.sub(r'^//.*$', '', src, flags=_re.M)  # 去注释
js = src.replace('const VLOGS =', '', 1).strip().rstrip(';')
py_expr = _re.sub(r'([{,]\s*)([A-Za-z_$][\w$]*)\s*:', r'\1"\2":', js)
py_expr = _re.sub(r'\btrue\b', 'True', py_expr).replace('false', 'False').replace('null', 'None')
VLOGS = eval(py_expr)
print(f'vlogs: {len(VLOGS)}')

def norm_word(w):
    return re.sub(r"[^a-z'-]", '', w.lower())

# 独立词音频：从所有卡片文本收集唯一词，使用 macOS say 生成一次并复用。
all_words = sorted({norm_word(tok) for v in VLOGS for card in v['cards'] for tok in card['en'].split() if norm_word(tok)})
word_tasks = [w for w in all_words if not os.path.exists(f'{WORD_DIR}/{w}.mp3')]
print(f'word audio tasks: {len(word_tasks)} (total {len(all_words)})')
for n, word in enumerate(word_tasks, 1):
    aiff = f'/tmp/word_{word}.aiff'
    mp3 = f'{WORD_DIR}/{word}.mp3'
    r = subprocess.run(['say', '-v', VOICE, '-o', aiff, word], capture_output=True)
    if r.returncode != 0:
        print(f'word say failed: {word}', file=sys.stderr)
        continue
    r = subprocess.run([FFMPEG, '-y', '-i', aiff, '-codec:a', 'libmp3lame', '-b:a', '32k', '-ar', '22050', '-ac', '1', mp3], capture_output=True)
    if r.returncode != 0:
        print(f'word ffmpeg failed: {word}', file=sys.stderr)
    if os.path.exists(aiff): os.remove(aiff)
    if n % 50 == 0: print(f'  words {n}/{len(word_tasks)}')

# 3. 逐句生成

def norm_word(w):
    return re.sub(r"[^a-z'-]", '', w.lower())

# 2. 收集任务（跳过已完成的——幂等）
index = {}
index_path = f'{OUT_DIR}/index.json'
if os.path.exists(index_path):
    index = json.load(open(index_path, encoding='utf8'))

tasks = []
for v in VLOGS:
    for i, card in enumerate(v['cards']):
        key = f"{v['id']}_{i}"
        mp3 = f'{OUT_DIR}/{key}.mp3'
        if key in index and os.path.exists(mp3):
            continue  # 幂等跳过
        tasks.append((key, v['id'], i, card['en']))
print(f'tasks: {len(tasks)} (skipped {sum(len(v["cards"]) for v in VLOGS) - len(tasks)} existing)')

# 3. 逐句生成
t0 = time.time()
failures = []
for n, (key, vid, ci, text) in enumerate(tasks):
    aiff = f'/tmp/pg2_{key}.aiff'
    mp3 = f'{OUT_DIR}/{key}.mp3'
    # say 生成（--rate 稍慢更贴合教学）
    r = subprocess.run(['say', '-v', VOICE, '-o', aiff, text], capture_output=True)
    if r.returncode != 0:
        failures.append((key, 'say', r.stderr.decode()[:100])); continue
    # ffmpeg 转 mp3
    r = subprocess.run([FFMPEG, '-y', '-i', aiff, '-codec:a', 'libmp3lame', '-b:a', '24k', '-ar', '16000', '-ac', '1', mp3], capture_output=True)
    if r.returncode != 0:
        failures.append((key, 'ffmpeg', r.stderr.decode()[-100:])); continue
    # whisper 词级时间戳
    r = subprocess.run([WHISPER, mp3, '--model', 'mlx-community/whisper-large-v3-turbo',
                        '--output-format', 'json', '--output-dir', '/tmp/pg2', '--word-timestamps', 'True'],
                       capture_output=True, text=True)
    os.makedirs('/tmp/pg2', exist_ok=True)
    jpath = f'/tmp/pg2/{key}.json'
    if not os.path.exists(jpath):
        failures.append((key, 'whisper', (r.stderr or '')[-150:])); continue
    d = json.load(open(jpath))
    words = []
    for seg in d.get('segments', []):
        for w in seg.get('words', []):
            words.append({'w': w['word'].strip(), 's': round(w['start'], 3), 'e': round(w['end'], 3)})
    # 词对齐校验：whisper 转写词序列 vs 原文词序列（规范化后必须一致，否则时间戳映射会错位）
    src_words = [norm_word(x) for x in text.split() if norm_word(x)]
    asr_words = [norm_word(x['w']) for x in words if norm_word(x['w'])]
    if src_words != asr_words:
        # 容错：尝试子序列匹配（whisper 可能吞首尾或合并词）
        joined_src = ''.join(src_words)
        joined_asr = ''.join(asr_words)
        if joined_asr not in joined_src and joined_src not in joined_asr:
            failures.append((key, 'align', f'{src_words[:4]}.. vs {asr_words[:4]}..')); continue
        # 需要重建映射：按合并关系把 asr 时间戳分配到源词（本批先标记，人工/后续处理）
        failures.append((key, 'align-partial', text[:50])); continue
    # 完美对齐：直接把时间戳按序绑定源词（含标点归属）
    # 用原文 split 的原始 token（带标点），逐个绑定 asr 词
    # 策略：把 asr 词的时间戳按 norm 词序对回；原文里 norm 后为空的 token（纯标点）绑定到前一词
    timed = []
    ai = 0
    for tok in text.split():
        nw = norm_word(tok)
        if not nw:
            if timed: timed[-1]['w'] += tok  # 标点并入前词
            continue
        if ai < len(words):
            timed.append({'w': tok, 's': words[ai]['s'], 'e': words[ai]['e']})
            ai += 1
    index[key] = {
        'vlog': vid, 'card': ci, 'dur': round(d['segments'][-1]['end'], 3) if d.get('segments') else 0,
        'words': [{'w': t['w'], 's': t['s'], 'e': t['e']} for t in timed],
    }
    os.remove(jpath)
    if (n + 1) % 20 == 0:
        json.dump(index, open(index_path, 'w', encoding='utf8'), ensure_ascii=False)
        print(f'  {n+1}/{len(tasks)} done ({time.time()-t0:.0f}s)')
    os.path.exists(aiff) and os.remove(aiff)

json.dump(index, open(index_path, 'w', encoding='utf8'), ensure_ascii=False)
print(f'done: {len(index)} entries in {time.time()-t0:.0f}s')
if failures:
    print(f'\nFAILURES ({len(failures)}):')
    for k, t, msg in failures[:20]:
        print(f'  {k} [{t}]: {msg}')
    sys.exit(1)
print('ALL OK')
