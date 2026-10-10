// 通用注入：向已有场景的 visits 尾部插入新轮次 + items 追加词条
// 用法: node inject_visits.mjs <sceneId> <visitsPartFile> <itemsJsonFile>
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';
const [sceneId, visitsFile, itemsFile] = process.argv.slice(2);
if (!sceneId || !visitsFile || !itemsFile) {
  console.error('usage: node inject_visits.mjs <sceneId> <visitsPartFile> <itemsFile>');
  process.exit(1);
}
let src = readFileSync(`${ROOT}/data.js`, 'utf8');
// 注入前快照：各场景 items 数（防误注校验基线）
const beforeScenes = new Function(src.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
const beforeItems = beforeScenes.find(s => s.id === sceneId)?.items?.length;
if (typeof beforeItems !== 'number') throw new Error('scene not found in pre-snapshot');

// 1. 解析并校验新轮次（文件可含多个 visit 对象，逗号分隔）
const visitsSrc = readFileSync(visitsFile, 'utf8');
const cleaned = visitsSrc.replace(/^\/\/.*$/gm, '').trim().replace(/,\s*$/, '');
const arrText = '[' + cleaned + ']';
const newVisits = new Function(`return (${arrText})`)();
if (!newVisits.length || newVisits.some(v => !v.id)) throw new Error('visits parse failed');
for (const v of newVisits) {
  if (!v.steps?.length || v.steps.includes(undefined)) throw new Error(v.id + ' bad steps');
  for (const s of v.steps) {
    if (s.options.length !== 3 || !s.options.some(o => o.ok)) throw new Error(v.id + ' bad options');
    if (!s.phrase?.en) throw new Error(v.id + ' phrase missing');
  }
  console.log(`${v.id}: ${v.steps.length} steps OK`);
}
// 2. 解析新词条
const itemsSrc = readFileSync(itemsFile, 'utf8');
const newItems = new Function(`return (${itemsSrc})`)();
if (!newItems.length || newItems.some(x => !x.id || !x.en)) throw new Error('items parse failed');
console.log(`new items: ${newItems.length}`);

// 3. 括号深度定位场景对象
// 注意：不能只搜 `id: "<sceneId>"` —— 词条的 id 可能与场景 id 撞名（如 hotel 场景的词条 id "gym"）。
// 场景对象的标志是后面紧跟 name: 字段，逐个候选校验。
const candidates = [...src.matchAll(new RegExp(`id: "${sceneId}"`, 'g'))].map(m => m.index);
let sceneStart = -1;
for (const pos of candidates) {
  const after = src.slice(pos, pos + 300);
  if (/name: "/.test(after)) { sceneStart = pos; break; }
}
if (sceneStart < 0) throw new Error('scene not found (no candidate with name field)');
const objStart = src.lastIndexOf('{', sceneStart);
let depth = 0, sceneEnd = -1;
for (let i = objStart; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { sceneEnd = i; break; } }
}
if (sceneEnd < 0) throw new Error('scene end not found');
const sceneText = src.slice(objStart, sceneEnd + 1);

// 4. visits 数组尾：场景文本内最后 `],`（visits 闭合）之前最后一个 `},`（visit 对象闭合）
const visitsClose = sceneText.lastIndexOf('],');
const lastVisitClose = sceneText.lastIndexOf('},', visitsClose);
if (lastVisitClose < 0) throw new Error('last visit close not found');
const insertAt = objStart + lastVisitClose + 1;
function reindent(text) { return text.split('\n').map(l => l ? '    ' + l : l).join('\n'); }
const insertion = ',\n' + reindent(cleaned.split('\n').map(l => l).join('\n')).replace(/^    (\{)$/, '    $1') + '\n';
// 直接 reindent 整段（cleaned 是 "},\n{" 或 "{" 开头的多对象文本）
const insertionText = ',\n' + cleaned.split('\n').map(l => l ? '    ' + l : l).join('\n') + '\n';
let out = src.slice(0, insertAt) + insertionText + src.slice(insertAt);

// 5. items 追加——必须在目标场景对象的文本范围内找 items: [
//    （重新定位场景：插入 visits 后位置变了；用与步骤 3 相同的 name: 校验法）
const candidates2 = [...out.matchAll(new RegExp(`id: "${sceneId}"`, 'g'))].map(m => m.index);
let sceneStart2 = -1;
for (const pos of candidates2) {
  if (/name: "/.test(out.slice(pos, pos + 300))) { sceneStart2 = pos; break; }
}
if (sceneStart2 < 0) throw new Error('scene not re-found after visits insert');
const objStart2 = out.lastIndexOf('{', sceneStart2);
let d1 = 0, sceneEnd2 = -1;
for (let i2 = objStart2; i2 < out.length; i2++) {
  if (out[i2] === '{') d1++;
  else if (out[i2] === '}') { d1--; if (d1 === 0) { sceneEnd2 = i2; break; } }
}
if (sceneEnd2 < 0) throw new Error('scene end re-find failed');
const sceneSlice = out.slice(objStart2, sceneEnd2 + 1);
const itemsArrIdx = sceneSlice.indexOf('items: [');
if (itemsArrIdx < 0) throw new Error('items not found inside target scene!');
const itemsOpen = sceneSlice.indexOf('[', itemsArrIdx);
let d2 = 0, itemsEndRel = -1;
for (let j = itemsOpen; j < sceneSlice.length; j++) {
  if (sceneSlice[j] === '[') d2++;
  else if (sceneSlice[j] === ']') { d2--; if (d2 === 0) { itemsEndRel = j; break; } }
}
if (itemsEndRel < 0) throw new Error('items end not found');
const itemsEnd = objStart2 + itemsEndRel;
const itemsText = ',\n' + newItems.map(x => {
  return `    { id: ${JSON.stringify(x.id)}, en: ${JSON.stringify(x.en)}, zh: ${JSON.stringify(x.zh)}, phon: ${JSON.stringify(x.phon)}, emoji: ${JSON.stringify(x.emoji)}, sent: ${JSON.stringify(x.sent)} },`;
}).join('\n');
out = out.slice(0, itemsEnd) + itemsText + out.slice(itemsEnd);

// 6. 全量校验通过才写入
const SCENES = new Function(out.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
const sc = SCENES.find(s => s.id === sceneId);
if (!sc) throw new Error('scene missing after inject');
if (sc.visits.some(v => !v.steps || v.steps.includes(undefined))) throw new Error('sparse visits!');
if (sc.items.some(x => x === undefined)) throw new Error('sparse items!');
// reward.en 命中 items
for (const v of sc.visits) {
  if (v.reward?.en && !sc.items.some(x => x.en === v.reward.en))
    throw new Error(`${v.id} reward.en "${v.reward.en}" not in items!`);
}
// 重复 id 检查
const ids = sc.visits.map(v => v.id);
// 防呆：目标场景 items 应恰好增加 newItems.length（防止误注到别的场景）
const expectedItems = beforeItems + newItems.length;
if (sc.items.length !== expectedItems) throw new Error(`items count ${sc.items.length} != expected ${expectedItems}（可能注错场景！）`);
// 防呆：其他场景 items 数必须与快照一致
for (const bs of beforeScenes) {
  const now = SCENES.find(s => s.id === bs.id);
  const bLen = bs.items?.length ?? 0;
  const nLen = now?.items?.length ?? 0;
  if (bs.id !== sceneId && bLen !== nLen) throw new Error(`scene ${bs.id} items changed ${bLen}->${nLen}（误注泄漏！）`);
}
if (new Set(ids).size !== ids.length) throw new Error('duplicate visit ids!');
const itemIds = sc.items.map(x => x.id);
if (new Set(itemIds).size !== itemIds.length) throw new Error('duplicate item ids!');

console.log(`injected ${sceneId}: visits=${sc.visits.length} items=${sc.items.length} steps=${sc.visits.reduce((a, v) => a + v.steps.length, 0)}`);
writeFileSync(`${ROOT}/data.js`, out);
console.log('data.js written, len', out.length);
