// 追加 postoffice 场景到 data.js（SCENES 数组尾部追加）
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';
let src = readFileSync(`${ROOT}/data.js`, 'utf8');

// 1. 读入并校验 postoffice 场景对象
const poSrc = readFileSync(`${ROOT}/scripts/postoffice_full.js`, 'utf8');
const cleaned = poSrc.replace(/^\/\/.*$/gm, '').trim().replace(/,\s*$/, '');
const po = new Function(`return (${cleaned})`)();
if (po.id !== 'postoffice') throw new Error('postoffice parse failed');
let steps = 0;
for (const v of po.visits) {
  if (!v.steps?.length || v.steps.includes(undefined)) throw new Error(v.id + ' bad steps');
  steps += v.steps.length;
  for (const s of v.steps) {
    if (s.options.length !== 3 || !s.options.some(o => o.ok)) throw new Error(v.id + ' bad options');
    if (!s.phrase?.en) throw new Error(v.id + ' phrase missing');
  }
  if (v.reward?.en && !po.items.some(x => x.en === v.reward.en))
    throw new Error(v.id + ' reward.en not in items: ' + v.reward.en);
}
console.log(`postoffice: ${po.visits.length} visits, ${steps} steps, ${po.items.length} items — all checks OK`);

// 2. 定位 SCENES 数组末尾 `];`
const tailIdx = src.lastIndexOf('\n];');
if (tailIdx < 0) throw new Error('SCENES tail not found');
const before = src.slice(0, tailIdx);
if (!before.trimEnd().endsWith('},') && !before.trimEnd().endsWith('}')) throw new Error('unexpected tail before ];: ' + before.slice(-40));

// 3. 追加 postoffice 场景（缩进 2 空格，匹配现有风格）
const sceneText = '\n// 邮局场景：寄包裹/寄信与邮票/取件与查询（3 轮）\n' + poSrc.trim() + '\n';
const out = before + sceneText + '];\n';

// 4. 全量校验通过才写入
const SCENES = new Function(out.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
if (SCENES.length !== 12) throw new Error(`scenes ${SCENES.length} != 12`);
const p = SCENES.find(s => s.id === 'postoffice');
if (!p || p.visits.length !== 3) throw new Error('postoffice missing after append');
if (p.visits.some(v => !v.steps || v.steps.includes(undefined))) throw new Error('postoffice sparse array!');
if (SCENES.some(s => s.visits?.some(v => !v.steps))) throw new Error('some visit without steps!');
// 防误注泄漏：其他场景 items 总数 = 追加前总量（411-24=387 需按实际快照）
const others = SCENES.filter(s => s.id !== 'postoffice').reduce((a, s) => a + (s.items?.length || 0), 0);
console.log('appended: total scenes=' + SCENES.length, 'postoffice steps=' + p.visits.reduce((a, v) => a + v.steps.length, 0), 'other items=' + others);
writeFileSync(`${ROOT}/data.js`, out);
console.log('data.js written, len', out.length);
