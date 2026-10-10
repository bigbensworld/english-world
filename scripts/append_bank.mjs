// 追加 bank 场景到 data.js（新场景 = SCENES 数组尾部追加）
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';
let src = readFileSync(`${ROOT}/data.js`, 'utf8');

// 1. 读入并校验 bank 场景对象
const bankSrc = readFileSync(`${ROOT}/scripts/bank_full.js`, 'utf8');
const cleaned = bankSrc.replace(/^\/\/.*$/gm, '').trim().replace(/,\s*$/, '');
const bank = new Function(`return (${cleaned})`)();
if (bank.id !== 'bank') throw new Error('bank parse failed');
let steps = 0;
for (const v of bank.visits) {
  if (!v.steps?.length || v.steps.includes(undefined)) throw new Error(v.id + ' bad steps');
  steps += v.steps.length;
  for (const s of v.steps) {
    if (s.options.length !== 3 || !s.options.some(o => o.ok)) throw new Error(v.id + ' bad options');
    if (!s.phrase?.en) throw new Error(v.id + ' phrase missing');
  }
  if (v.reward?.en && !bank.items.some(x => x.en === v.reward.en))
    throw new Error(v.id + ' reward.en not in items: ' + v.reward.en);
}
console.log(`bank: ${bank.visits.length} visits, ${steps} steps, ${bank.items.length} items — all checks OK`);

// 2. 定位 SCENES 数组末尾 `];`
const tailIdx = src.lastIndexOf('\n];');
if (tailIdx < 0) throw new Error('SCENES tail not found');
// 确认 `];` 前最近的结构是 transport 场景的 `},`（文件级最后闭合）
const before = src.slice(0, tailIdx);
if (!before.trimEnd().endsWith('},')) throw new Error('unexpected tail before ];: ' + before.slice(-40));

// 3. 追加 bank 场景（缩进 2 空格，匹配现有风格）
const sceneText = '\n// 银行场景：开户/换汇取现/银行卡出问题（3 轮）\n' + bankSrc.trim() + '\n';
const out = before + sceneText + '];\n';

// 4. 全量校验通过才写入
const SCENES = new Function(out.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
if (SCENES.length !== 8) throw new Error(`scenes ${SCENES.length} != 8`);
const b = SCENES.find(s => s.id === 'bank');
if (!b || b.visits.length !== 3) throw new Error('bank missing after append');
if (b.visits.some(v => !v.steps || v.steps.includes(undefined))) throw new Error('bank sparse array!');
if (SCENES.some(s => s.visits?.some(v => !v.steps))) throw new Error('some visit without steps!');
console.log('appended: total scenes=' + SCENES.length, 'bank steps=' + b.visits.reduce((a, v) => a + v.steps.length, 0));
writeFileSync(`${ROOT}/data.js`, out);
console.log('data.js written, len', out.length);
