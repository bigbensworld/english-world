#!/usr/bin/env python3
"""Phase 2 音频管线自检：index.json 完整性 + 每句词数对齐 + mp3 可解码"""
import json, os, re, subprocess, sys

ROOT = '/Users/alice/WorkBuddy/3/english-world'
DIR = f'{ROOT}/audio/vlog'
FFPROBE = '/Users/alice/.homebrew/bin/ffprobe'

src = open(f'{ROOT}/vlogs.js', encoding='utf8').read()
src = re.sub(r'^//.*$', '', src, flags=re.M)
js = src.replace('const VLOGS =', '', 1).strip().rstrip(';')
py = re.sub(r'([{,]\s*)([A-Za-z_$][\w$]*)\s*:', r'\1"\2":', js)
VLOGS = eval(py)

idx = json.load(open(f'{DIR}/index.json', encoding='utf8'))
print(f'index entries: {len(idx)}')

fails = []
total_cards = 0
for v in VLOGS:
    for i, card in enumerate(v['cards']):
        total_cards += 1
        key = f"{v['id']}_{i}"
        e = idx.get(key)
        if not e:
            fails.append(f'{key}: missing from index'); continue
        mp3 = f'{DIR}/{key}.mp3'
        if not os.path.exists(mp3):
            fails.append(f'{key}: mp3 missing'); continue
        # 词数对齐（原句 split 词数 === 时间戳词数）
        src_n = len([w for w in card['en'].split() if re.sub(r"[^a-z'-]", '', w.lower())])
        ts_n = len([w for w in e['words'] if re.sub(r"[^a-z'-]", '', w['w'].lower())])
        if src_n != ts_n:
            fails.append(f'{key}: word count {src_n} != {ts_n}'); continue
        # 时间戳单调
        prev = -1
        for w in e['words']:
            if w['s'] < prev - 0.01:
                fails.append(f'{key}: non-monotonic at {w["w"]}'); break
            prev = w['s']

print(f'total cards: {total_cards}')
# 抽查 3 个 mp3 可解码
import random
random.seed(1)
sample = random.sample(list(idx.keys()), min(3, len(idx)))
for k in sample:
    r = subprocess.run([FFPROBE, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{DIR}/{k}.mp3'], capture_output=True, text=True)
    if r.returncode != 0:
        fails.append(f'{k}: mp3 decode fail')
    else:
        print(f'  sample {k}: {float(r.stdout.strip()):.1f}s OK')

if fails:
    print(f'\nFAILS ({len(fails)}):')
    for f in fails[:15]: print(' ', f)
    sys.exit(1)
print('ALL CHECKS PASSED')
