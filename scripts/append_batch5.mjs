// 追加 library/vet/school 三个场景到 data.js（SCENES 数组尾部追加）
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';
let src = readFileSync(`${ROOT}/data.js`, 'utf8');

// 1. 读入并校验三个场景对象
const scenes = [];
const totalBefore = { visits: 0, steps: 0 };
const itemsBefore = src.match(/\{ id: "/g) ? null : null; // 不用，改为解析后统计
for (const f of ['library_full.js', 'vet_full.js', 'school_full.js']) {
  const poSrc = readFileSync(`${ROOT}/scripts/${f}`, 'utf8');
  const cleaned = poSrc.replace(/^\/\/.*$/gm, '').trim().replace(/,\s*$/, '');
  const po = new Function(`return (${cleaned})`)();
  if (!['library', 'vet', 'school'].includes(po.id)) throw new Error(f + ' bad id: ' + po.id);
  let steps = 0;
  for (const v of po.visits) {
    if (!v.steps?.length || v.steps.includes(undefined)) throw new Error(po.id + ':' + v.id + ' bad steps');
    steps += v.steps.length;
    for (const s of v.steps) {
      if (s.options.length !== 3 || !s.options.some(o => o.ok)) throw new Error(po.id + ':' + v.id + ' bad options');
      if (!s.phrase?.en) throw new Error(po.id + ':' + v.id + ' phrase missing');
    }
    if (v.reward?.en && !po.items.some(x => x.en === v.reward.en))
      throw new Error(po.id + ':' + v.id + ' reward.en not in items: ' + v.reward.en);
  }
  // 词条 id 撞名检查（跨场景）
  scenes.push(po);
  console.log(`${po.id}: ${po.visits.length} visits, ${steps} steps, ${po.items.length} items — OK`);
}
const allNewIds = scenes.flatMap(s => s.items.map(i => i.id));
if (new Set(allNewIds).size !== allNewIds.length) throw new Error('duplicate item ids across new scenes');
// 与现有 data.js 的 items id 撞名检查
const existing = new Function(src.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
const existingIds = new Set(existing.flatMap(s => (s.items || []).map(i => i.id)));
for (const id of allNewIds) if (existingIds.has(id)) throw new Error('item id collides with existing: ' + id);
const existingItemsTotal = existing.reduce((a, s) => a + (s.items?.length || 0), 0);
console.log('existing scenes:', existing.length, 'existing items:', existingItemsTotal);

// 2. 定位 SCENES 数组末尾 `];`
const tailIdx = src.lastIndexOf('\n];');
if (tailIdx < 0) throw new Error('SCENES tail not found');
const before = src.slice(0, tailIdx);
if (!before.trimEnd().endsWith('},') && !before.trimEnd().endsWith('}')) throw new Error('unexpected tail before ];: ' + before.slice(-40));

// 3. 追加三场景
const sceneText = '\n// 图书馆场景：办证借书/预约/还书逾期/礼仪/研究服务（5 轮）\n'
  + readFileSync(`${ROOT}/scripts/library_full.js`, 'utf8').trim()
  + '\n\n// 宠物医院场景：体检/疫苗预防/急诊/文化/慢性病（5 轮）\n'
  + readFileSync(`${ROOT}/scripts/vet_full.js`, 'utf8').trim()
  + '\n\n// 学校场景：报到/选课/邮件礼仪/小组作业/学术诚信（5 轮）\n'
  + readFileSync(`${ROOT}/scripts/school_full.js`, 'utf8').trim()
  + '\n';
const out = before + sceneText + '];\n';

// 4. 全量校验通过才写入
const SCENES = new Function(out.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
if (SCENES.length !== 15) throw new Error(`scenes ${SCENES.length} != 15`);
const newIds = ['library', 'vet', 'school'];
for (const id of newIds) {
  const p = SCENES.find(s => s.id === id);
  if (!p || p.visits.length !== 5) throw new Error(id + ' missing or wrong visits after append');
  if (p.visits.some(v => !v.steps || v.steps.includes(undefined))) throw new Error(id + ' sparse array!');
}
if (SCENES.some(s => s.visits?.some(v => !v.steps))) throw new Error('some visit without steps!');
// 稀疏数组精确校验（length !== filter(Boolean).length）
for (const s of SCENES) for (const v of (s.visits || []))
  if (v.steps && v.steps.length !== v.steps.filter(Boolean).length) throw new Error(s.id + ':' + v.id + ' sparse steps!');
// 防误注泄漏：其他场景 items 总数不变
const others = SCENES.filter(s => !newIds.includes(s.id)).reduce((a, s) => a + (s.items?.length || 0), 0);
if (others !== existingItemsTotal) throw new Error(`other items changed: ${others} != ${existingItemsTotal}`);
const grandItems = SCENES.reduce((a, s) => a + (s.items?.length || 0), 0);
writeFileSync(`${ROOT}/data.js`, out);
console.log('data.js written: scenes=' + SCENES.length, 'total items=' + grandItems, 'len', out.length);
