#!/usr/bin/env python3
"""对齐修复 pass 2：对 build_audio.py 失败的句子重跑对齐（复用已生成的 mp3，只重做 whisper + 弹性对齐）
弹性策略：
  1) 规范化后做 LCS 对齐（容错引号/连字符/吞词）
  2) 对不上的源词：取前后已对齐邻居的时间区间线性插值
  3) 产出与 pass1 相同格式的 index 条目
"""
import json, os, re, subprocess, sys, time

ROOT = '/Users/alice/WorkBuddy/3/english-world'
DIR = f'{ROOT}/audio/vlog'
WHISPER = os.path.expanduser('~/Movies/work/venv/bin/mlx_whisper')
os.makedirs('/tmp/pg2', exist_ok=True)

src = open(f'{ROOT}/vlogs.js', encoding='utf8').read()
src = re.sub(r'^//.*$', '', src, flags=re.M)
js = src.replace('const VLOGS =', '', 1).strip().rstrip(';')
py = re.sub(r'([{,]\s*)([A-Za-z_$][\w$]*)\s*:', r'\1"\2":', js)
VLOGS = eval(py)

index = json.load(open(f'{DIR}/index.json', encoding='utf8'))
def norm(w): return re.sub(r"[^a-z'-]", '', w.lower())

def lcs_align(a, b):
    """返回 pairs: [(i_a|None, i_b|None), ...] 的 LCS 对齐（norm 后比较）"""
    n, m = len(a), len(b)
    dp = [[0]*(m+1) for _ in range(n+1)]
    for i in range(n-1, -1, -1):
        for j in range(m-1, -1, -1):
            dp[i][j] = dp[i+1][j+1]+1 if a[i] == b[j] else max(dp[i+1][j], dp[i][j+1])
    pairs = []
    i = j = 0
    while i < n and j < m:
        if a[i] == b[j]:
            pairs.append((i, j)); i += 1; j += 1
        elif dp[i+1][j] >= dp[i][j+1]:
            pairs.append((i, None)); i += 1
        else:
            pairs.append((None, j)); j += 1
    while i < n: pairs.append((i, None)); i += 1
    while j < m: pairs.append((None, j)); j += 1
    return pairs

fixed, still = [], []
for v in VLOGS:
    for ci, card in enumerate(v['cards']):
        key = f"{v['id']}_{ci}"
        if key in index: continue
        mp3 = f'{DIR}/{key}.mp3'
        if not os.path.exists(mp3):
            still.append((key, 'no mp3')); continue
        # whisper（mp3 已在 pass1 生成，只需重跑转写）
        jpath = f'/tmp/pg2/{key}.json'
        r = subprocess.run([WHISPER, mp3, '--model', 'mlx-community/whisper-large-v3-turbo',
                            '--output-format', 'json', '--output-dir', '/tmp/pg2', '--word-timestamps', 'True'],
                           capture_output=True, text=True)
        if not os.path.exists(jpath):
            still.append((key, 'whisper')); continue
        d = json.load(open(jpath)); os.remove(jpath)
        asr = []
        for seg in d.get('segments', []):
            for w in seg.get('words', []):
                asr.append({'w': w['word'].strip(), 's': w['start'], 'e': w['end']})
        src_tokens = card['en'].split()
        a = [norm(t) for t in src_tokens]
        b = [norm(w['w']) for w in asr]
        pairs = lcs_align(a, b)
        matched = sum(1 for x, y in pairs if x is not None and y is not None)
        if matched < len(a) * 0.5:
            still.append((key, f'match {matched}/{len(a)}')); continue
        # 构造带时间戳的词表：LCS 命中的直接取；未命中的插值
        # 1) 先建立 asr 索引 → 时间
        # 2) 对源 token 序列，找每个 token 最近的已匹配时间
        token_time = [None] * len(src_tokens)
        for x, y in pairs:
            if x is not None and y is not None:
                token_time[x] = (asr[y]['s'], asr[y]['e'])
        # 插值：向前向后找最近邻居
        for i in range(len(src_tokens)):
            if token_time[i]: continue
            prev_t = next_t = None
            for j in range(i-1, -1, -1):
                if token_time[j]: prev_t = token_time[j][1]; break
            for j in range(i+1, len(src_tokens)):
                if token_time[j]: next_t = token_time[j][0]; break
            if prev_t is not None and next_t is not None:
                mid = (prev_t + next_t) / 2
                token_time[i] = (mid - 0.15, mid + 0.15)
            elif prev_t is not None:
                token_time[i] = (prev_t + 0.02, prev_t + 0.18)
            elif next_t is not None:
                token_time[i] = (max(0, next_t - 0.18), max(0.01, next_t - 0.02))
            else:
                token_time[i] = (0, 0.2)
        # 标点并入前词（与 pass1 相同策略）
        words_out = []
        for tok, tt in zip(src_tokens, token_time):
            if not norm(tok):
                if words_out: words_out[-1]['w'] += tok
                continue
            words_out.append({'w': tok, 's': round(tt[0], 3), 'e': round(tt[1], 3)})
        index[key] = {
            'vlog': v['id'], 'card': ci,
            'dur': round(d['segments'][-1]['end'], 3) if d.get('segments') else 0,
            'words': words_out, 'interp': matched  # < len(words) 表示有插值词
        }
        fixed.append(key)

json.dump(index, open(f'{DIR}/index.json', 'w', encoding='utf8'), ensure_ascii=False)
print(f'fixed: {len(fixed)}, still failed: {len(still)}')
for k, why in still: print(' ', k, why)
print('total index:', len(index))
