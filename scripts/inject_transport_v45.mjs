// 注入交通 v4/v5 + 新词条到 data.js
// 用括号深度追踪定位 transport 场景的 visits 数组尾，避免正则锚点坑
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';
let src = readFileSync(`${ROOT}/data.js`, 'utf8');

// 1. 语法预检分片文件
const v4 = readFileSync(`${ROOT}/scripts/transport_v4.js`, 'utf8')
  .replace(/^\/\/.*$/gm, '').trim().replace(/,$/, ''); // 去注释+去尾逗号→对象字面量
const v5 = readFileSync(`${ROOT}/scripts/transport_v5.js`, 'utf8')
  .replace(/^\/\/.*$/gm, '').trim().replace(/,$/, '');
// 验证是合法对象字面量
const v4Obj = new Function(`return (${v4})`)();
const v5Obj = new Function(`return (${v5})`)();
if (v4Obj.id !== 'v4' || v5Obj.id !== 'v5') throw new Error('v4/v5 parse failed');
for (const [k, v] of [['v4', v4Obj], ['v5', v5Obj]]) {
  if (!v.steps?.length) throw new Error(`${k} no steps`);
  for (const s of v.steps) {
    if (s.options.length !== 3) throw new Error(`${k} step options != 3`);
    if (!s.options.some(o => o.ok)) throw new Error(`${k} step no ok option`);
    if (!s.phrase?.en || !s.phrase?.zh) throw new Error(`${k} step missing phrase`);
    if (!s.npcLines?.length) throw new Error(`${k} step no npcLines`);
  }
  console.log(`${k}: ${v.steps.length} steps OK`);
}

// 2. 定位 transport visits 的最后闭合：找 transport 场景对象起始，深度追踪
const sceneStart = src.indexOf('id: "transport"');
if (sceneStart < 0) throw new Error('transport scene not found');
// 从场景对象起始 { 开始追踪
const objStart = src.lastIndexOf('{', sceneStart);
let depth = 0, i = objStart, sceneEnd = -1;
for (; i < src.length; i++) {
  const ch = src[i];
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) { sceneEnd = i; break; }
  }
}
if (sceneEnd < 0) throw new Error('scene end not found');
// visits 数组尾 = 场景对象内最后一个 `],\n  }` 前的 visit 对象尾
// 简化：在场景对象文本中找最后一个 visits 闭合 `],` 再往后找 visit 对象闭合 `},`
const sceneText = src.slice(objStart, sceneEnd + 1);
// 找最后一个 visit 对象的尾：visits: [ ... 最后一个 `},` 在 visits 闭合 `],` 之前
const visitsClose = sceneText.lastIndexOf('],');
if (visitsClose < 0) throw new Error('visits close not found');
// 最后一个 visit 对象尾 `},` 在 visitsClose 之前
const lastVisitClose = sceneText.lastIndexOf('},', visitsClose);
if (lastVisitClose < 0) throw new Error('last visit close not found');
// 全局坐标
const insertAt = objStart + lastVisitClose + 1; // `}` 之后

// 3. 构造插入文本（缩进 4 空格，匹配现有风格）
function reindent(text) {
  return text.split('\n').map(l => l ? '    ' + l : l).join('\n');
}
const insertion = ',\n' + reindent(v4) + ',\n' + reindent(v5) + '\n';
const out = src.slice(0, insertAt) + insertion + src.slice(insertAt);

// 4. 定位 transport items 数组，追加新词条
const itemsStart = out.indexOf('id: "transport"');
const itemsArrIdx = out.indexOf('items: [', itemsStart);
if (itemsArrIdx < 0) throw new Error('items not found');
// items: [ 后找匹配的 ]
const itemsOpen = out.indexOf('[', itemsArrIdx);
let d2 = 0, itemsEnd = -1;
for (let j = itemsOpen; j < out.length; j++) {
  if (out[j] === '[') d2++;
  else if (out[j] === ']') { d2--; if (d2 === 0) { itemsEnd = j; break; } }
}
const newItems = `
    { id: "missedstop", en: "miss my stop", zh: "坐过站", phon: "/mɪs maɪ stɒp/", emoji: "😰", sent: "Oh no, I missed my stop!" },
    { id: "laststop", en: "last stop", zh: "终点站", phon: "/lɑːst stɒp/", emoji: "🏁", sent: "This is the last stop." },
    { id: "eastbound2", en: "eastbound", zh: "向东行驶的", phon: "/ˈiːstbaʊnd/", emoji: "➡️", sent: "Take the eastbound bus." },
    { id: "confirm", en: "just to confirm", zh: "确认一下", phon: "/dʒʌst tə kənˈfɜːm/", emoji: "✅", sent: "Just to confirm, it's the 12, right?" },
    { id: "fastest", en: "the fastest route", zh: "最快路线", phon: "/ðə ˈfɑːstɪst ruːt/", emoji: "⚡", sent: "Could you take the fastest route?" },
    { id: "detour", en: "detour", zh: "绕行，绕路", phon: "/ˈdiːtʊə/", emoji: "↩️", sent: "There's a detour because of construction." },
    { id: "construction", en: "construction", zh: "施工", phon: "/kənˈstrʌkʃn/", emoji: "🚧", sent: "Sorry, construction on Main Street." },
    { id: "leftbehind", en: "leave behind", zh: "落下（东西）", phon: "/liːv bɪˈhaɪnd/", emoji: "📱", sent: "I almost left my phone behind." },
    { id: "savedday", en: "save my day", zh: "帮了我大忙", phon: "/seɪv maɪ deɪ/", emoji: "🦸", sent: "You really saved my day!" },
    { id: "roughly", en: "roughly", zh: "大约，大概", phon: "/ˈrʌfli/", emoji: "〰️", sent: "Roughly how much will it be?" },
    { id: "giveortake", en: "give or take", zh: "上下浮动", phon: "/ɡɪv ɔː teɪk/", emoji: "±", sent: "Forty bucks, give or take." },
    { id: "addtip", en: "add a tip", zh: "加小费", phon: "/æd ə tɪp/", emoji: "💵", sent: "Should I add a tip on the machine?" },
    { id: "standard", en: "standard", zh: "标准的", phon: "/ˈstændəd/", emoji: "📏", sent: "Fifteen to twenty percent is standard." },
    { id: "roundup", en: "round up", zh: "凑整", phon: "/raʊnd ʌp/", emoji: "🔢", sent: "Just round up to forty-five." },
    { id: "headsup", en: "heads-up", zh: "提前提醒", phon: "/hedz ʌp/", emoji: "📢", sent: "Thanks for the heads-up!" },
    { id: "skycap", en: "sky cap", zh: "机场行李员", phon: "/skaɪ kæp/", emoji: "🧳", sent: "Tip the sky cap two bucks a bag." },`;
const out2 = out.slice(0, itemsEnd) + newItems + out.slice(itemsEnd);

// 5. 全量校验通过才写入
const SCENES = new Function(out2.replace(/^\/\/.*$/gm, '') + '; return SCENES;')();
const t = SCENES.find(s => s.id === 'transport');
if (!t) throw new Error('transport missing after inject');
if (t.visits.some(v => !v.steps)) throw new Error('visit without steps (sparse array!)');
if (t.visits.length !== 5) throw new Error(`visits length ${t.visits.length} != 5`);
if (t.visits.some(v => v.steps.includes(undefined))) throw new Error('undefined in steps!');
if (t.items.some(x => x === undefined)) throw new Error('undefined in items!');
if (t.items.length !== 38) throw new Error(`items ${t.items.length} != 38`);
console.log('injected: visits=' + t.visits.length, 'items=' + t.items.length,
  'steps=' + t.visits.reduce((a, v) => a + v.steps.length, 0));
// reward.en 必须命中 items（引擎按 en 精确匹配）
for (const v of t.visits) {
  if (v.reward?.en && !t.items.some(x => x.en === v.reward.en))
    throw new Error(`reward.en "${v.reward.en}" not in items!`);
}
writeFileSync(`${ROOT}/data.js`, out2);
console.log('data.js written, len', out2.length);
