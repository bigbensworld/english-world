// 补注 gym 的 16 个词条（visits 已注入，仅 items）
const fs = require('fs');
const ROOT = '/Users/alice/WorkBuddy/3/english-world';
let src = fs.readFileSync(ROOT + '/data.js', 'utf8');
const newItems = new Function('return (' + fs.readFileSync(ROOT + '/scripts/gym_items.json', 'utf8').trim() + ')')();
if (newItems.length !== 16) throw new Error('items != 16');

// gym 场景定位（name: 校验法，跳过 hotel 的词条 gym）
const cands = [...src.matchAll(/id: "gym"/g)].map(m => m.index);
let start = -1;
for (const p of cands) { if (/name: "/.test(src.slice(p, p + 300))) { start = p; break; } }
if (start < 0) throw new Error('gym scene not found');
const objStart = src.lastIndexOf('{', start);
let d = 0, end = -1;
for (let i = objStart; i < src.length; i++) {
  if (src[i] === '{') d++;
  else if (src[i] === '}') { d--; if (d === 0) { end = i; break; } }
}
const sceneText = src.slice(objStart, end + 1);
const itemsArrIdx = sceneText.indexOf('items: [');
const itemsOpen = sceneText.indexOf('[', itemsArrIdx);
let d2 = 0, itemsEndRel = -1;
for (let j = itemsOpen; j < sceneText.length; j++) {
  if (sceneText[j] === '[') d2++;
  else if (sceneText[j] === ']') { d2--; if (d2 === 0) { itemsEndRel = j; break; } }
}
const itemsEnd = objStart + itemsEndRel;
const itemsText = ',\n' + newItems.map(x =>
  '    { id: ' + JSON.stringify(x.id) + ', en: ' + JSON.stringify(x.en) + ', zh: ' + JSON.stringify(x.zh) +
  ', phon: ' + JSON.stringify(x.phon) + ', emoji: ' + JSON.stringify(x.emoji) + ', sent: ' + JSON.stringify(x.sent) + ' },'
).join('\n');
const out = src.slice(0, itemsEnd) + itemsText + src.slice(itemsEnd);

// 全量校验
const SCENES = new Function(out.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
const g = SCENES.find(s => s.id === 'gym');
if (g.items.length !== 42) throw new Error('gym items ' + g.items.length + ' != 42');
if (g.visits.length !== 5) throw new Error('gym visits != 5');
const a = SCENES.find(s => s.id === 'airport');
if (a.items.length !== 23) throw new Error('airport polluted!');
for (const v of g.visits) {
  if (v.reward?.en && !g.items.some(x => x.en === v.reward.en)) throw new Error(v.id + ' reward miss');
}
console.log('gym 5轮42词条 OK, airport intact');
fs.writeFileSync(ROOT + '/data.js', out);
console.log('done, len', out.length);
