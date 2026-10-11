// 追加 bookstore/carrental/drugstore 三个场景到 data.js（SCENES 尾部追加，幂等+全量防呆校验）
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';
let src = readFileSync(`${ROOT}/data.js`, 'utf8');

// 幂等检查：目标场景已存在则跳过
const existingCheck = new Function(src.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
for (const id of ['communitycenter', 'petboarding', 'photostudio']) {
  if (existingCheck.some(s => s.id === id)) throw new Error('ABORT: scene ' + id + ' already exists (idempotent guard)');
}
console.log('idempotent guard OK: none of the 3 scenes exist yet, existing scenes =', existingCheck.length);

// 1. 读入并校验三个场景对象
const scenes = [];
for (const f of ['communitycenter_full.js', 'petboarding_full.js', 'photostudio_full.js']) {
  const poSrc = readFileSync(`${ROOT}/scripts/${f}`, 'utf8');
  const cleaned = poSrc.replace(/^\/\/.*$/gm, '').trim().replace(/,\s*$/, '');
  const po = new Function(`return (${cleaned})`)();
  if (!['communitycenter', 'petboarding', 'photostudio'].includes(po.id)) throw new Error(f + ' bad id: ' + po.id);
  let steps = 0;
  for (const v of po.visits) {
    if (!v.steps?.length || v.steps.includes(undefined)) throw new Error(po.id + ':' + v.id + ' bad steps');
    if (v.steps.length !== v.steps.filter(Boolean).length) throw new Error(po.id + ':' + v.id + ' sparse steps!');
    steps += v.steps.length;
    for (const s of v.steps) {
      if (s.options.length !== 3 || !s.options.some(o => o.ok)) throw new Error(po.id + ':' + v.id + ' bad options');
      if (!s.phrase?.en) throw new Error(po.id + ':' + v.id + ' phrase missing');
    }
    if (v.reward?.en && !po.items.some(x => x.en === v.reward.en))
      throw new Error(po.id + ':' + v.id + ' reward.en not in items: ' + v.reward.en);
  }
  scenes.push(po);
  console.log(`${po.id}: ${po.visits.length} visits, ${steps} steps, ${po.items.length} items — OK`);
}
const allNewIds = scenes.flatMap(s => s.items.map(i => i.id));
if (new Set(allNewIds).size !== allNewIds.length) throw new Error('duplicate item ids across new scenes');
const existingIds = new Set(existingCheck.flatMap(s => (s.items || []).map(i => i.id)));
for (const id of allNewIds) if (existingIds.has(id)) throw new Error('item id collides with existing: ' + id);
const existingItemsTotal = existingCheck.reduce((a, s) => a + (s.items?.length || 0), 0);
console.log('existing scenes:', existingCheck.length, 'existing items:', existingItemsTotal);

// 2. 定位 SCENES 数组末尾 `];`
const tailIdx = src.lastIndexOf('\n];');
if (tailIdx < 0) throw new Error('SCENES tail not found');
const before = src.slice(0, tailIdx);
if (!before.trimEnd().endsWith('},') && !before.trimEnd().endsWith('}')) throw new Error('unexpected tail before ];: ' + before.slice(-40));

// 3. 追加三场景
const sceneText = '\n// 社区中心场景：办卡参观/陶艺候补/订场风波/农夫市集/志愿者（5 轮）\n'
  + readFileSync(`${ROOT}/scripts/communitycenter_full.js`, 'utf8').trim()
  + '\n\n// 宠物寄养场景：日托第一天/出差寄养/接宠汇报/特殊需求/长期寄养（5 轮）\n'
  + readFileSync(`${ROOT}/scripts/petboarding_full.js`, 'utf8').trim()
  + '\n\n// 摄影工作室场景：证件照救急/全家福/选片/拍砸维权/黄金时刻外拍（5 轮）\n'
  + readFileSync(`${ROOT}/scripts/photostudio_full.js`, 'utf8').trim()
  + '\n';
const out = before + sceneText + '];\n';

// 4. 全量校验通过才写入
const SCENES = new Function(out.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
if (SCENES.length !== 25) throw new Error(`scenes ${SCENES.length} != 18`);
const newIds = ['communitycenter', 'petboarding', 'photostudio'];
const expectVisits = { communitycenter: 5, petboarding: 5, photostudio: 5 };
for (const id of newIds) {
  const p = SCENES.find(s => s.id === id);
  if (!p || p.visits.length !== expectVisits[id]) throw new Error(id + ' missing or wrong visits after append');
  if (p.visits.some(v => !v.steps || v.steps.includes(undefined))) throw new Error(id + ' sparse array!');
}
if (SCENES.some(s => s.visits?.some(v => !v.steps))) throw new Error('some visit without steps!');
for (const s of SCENES) for (const v of (s.visits || []))
  if (v.steps && v.steps.length !== v.steps.filter(Boolean).length) throw new Error(s.id + ':' + v.id + ' sparse steps!');
// 防误注泄漏：其他场景 items 总数不变
const others = SCENES.filter(s => !newIds.includes(s.id)).reduce((a, s) => a + (s.items?.length || 0), 0);
if (others !== existingItemsTotal) throw new Error(`other items changed: ${others} != ${existingItemsTotal}`);
const grandItems = SCENES.reduce((a, s) => a + (s.items?.length || 0), 0);
writeFileSync(`${ROOT}/data.js`, out);
console.log('data.js written: scenes=' + SCENES.length, 'total items=' + grandItems, 'len', out.length);
