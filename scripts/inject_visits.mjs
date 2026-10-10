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
const sceneStart = src.indexOf(`id: "${sceneId}"`);
if (sceneStart < 0) throw new Error('scene not found');
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

// 5. items 追加
const itemsArrIdx = out.indexOf('items: [', out.indexOf(`id: "${sceneId}"`));
const itemsOpen = out.indexOf('[', itemsArrIdx);
let d2 = 0, itemsEnd = -1;
for (let j = itemsOpen; j < out.length; j++) {
  if (out[j] === '[') d2++;
  else if (out[j] === ']') { d2--; if (d2 === 0) { itemsEnd = j; break; } }
}
if (itemsEnd < 0) throw new Error('items end not found');
const itemsText = '\n' + newItems.map(x => {
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
if (new Set(ids).size !== ids.length) throw new Error('duplicate visit ids!');
const itemIds = sc.items.map(x => x.id);
if (new Set(itemIds).size !== itemIds.length) throw new Error('duplicate item ids!');

console.log(`injected ${sceneId}: visits=${sc.visits.length} items=${sc.items.length} steps=${sc.visits.reduce((a, v) => a + v.steps.length, 0)}`);
writeFileSync(`${ROOT}/data.js`, out);
console.log('data.js written, len', out.length);
