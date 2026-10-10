// 追加 3 集 vlog（commute/dogwalk/errands）到 vlogs.js + VLOG_DICT 补词条
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';

// 1. 校验 3 个分片结构
const ids = [];
for (const f of ['vlog_commute.js', 'vlog_dogwalk.js', 'vlog_errands.js']) {
  const src = readFileSync(`${ROOT}/scripts/${f}`, 'utf8').trim().replace(/,\s*$/, '');
  const v = new Function(`return (${src})`)();
  if (!v.id || !v.title || v.cards?.length !== 8) throw new Error(f + ' bad structure');
  const ff = v.cards.filter(c => c.type === 'fun-fact');
  if (ff.length !== 1) throw new Error(f + ' fun-fact count != 1');
  if (!v.cards.every(c => c.en && c.zh)) throw new Error(f + ' missing en/zh');
  ids.push(v.id);
}
if (new Set(ids).size !== 3) throw new Error('duplicate vlog ids');
console.log('vlog fragments OK:', ids.join(', '));

// 2. 追加到 vlogs.js 的 VLOGS 数组尾部
let vlogsSrc = readFileSync(`${ROOT}/vlogs.js`, 'utf8');
const tailIdx = vlogsSrc.lastIndexOf('\n];');
if (tailIdx < 0) throw new Error('VLOGS tail not found');
const before = vlogsSrc.slice(0, tailIdx);
if (!before.trimEnd().endsWith('},')) throw new Error('unexpected tail: ' + before.slice(-30));
const parts = ['vlog_commute.js', 'vlog_dogwalk.js', 'vlog_errands.js'].map(f => readFileSync(`${ROOT}/scripts/${f}`, 'utf8').trim());
const out = before + '\n' + parts.join('\n') + '\n];\n';
const VLOGS = new Function(out.replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
if (VLOGS.length !== 9) throw new Error(`VLOGS ${VLOGS.length} != 9`);
if (VLOGS.some(v => !v.cards || v.cards.length !== 8)) throw new Error('some vlog without 8 cards');
writeFileSync(`${ROOT}/vlogs.js`, out);
console.log('vlogs.js written: ' + VLOGS.length + ' vlogs');
