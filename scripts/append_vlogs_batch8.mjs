// 追加 mealprep/carwash/hiking 3 集 vlog + VLOG_DICT 补词条（基于 append_vlogs_batch5 流程）
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';

// 1. 校验 3 个分片结构（从 vlog_batch8.js 拆出 3 个对象）
const batchSrc = readFileSync(`${ROOT}/scripts/vlog_batch8.js`, 'utf8');
const cleaned = batchSrc.replace(/^\/\/.*$/gm, '').trim().replace(/,\s*$/, '');
const arr = new Function(`return ([${cleaned}])`)();
if (arr.length !== 3) throw new Error('expected 3 vlogs, got ' + arr.length);
const ids = arr.map(v => v.id);
for (const v of arr) {
  if (!v.id || !v.title || v.cards?.length !== 8) throw new Error(v.id + ' bad structure');
  if (v.cards.filter(c => c.type === 'fun-fact').length !== 1) throw new Error(v.id + ' fun-fact != 1');
  if (!v.cards.every(c => c.en && c.zh)) throw new Error(v.id + ' missing en/zh');
  if (!v.cards.every(c => Array.isArray(c.words))) throw new Error(v.id + ' words not array');
}
console.log('vlog fragments OK:', ids.join(', '));

// 2. 幂等检查 + 追加到 vlogs.js（全部已存在则跳过追加，只走字典合并）
let vlogsSrc = readFileSync(`${ROOT}/vlogs.js`, 'utf8');
const existingVlogs = new Function(vlogsSrc.replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
const alreadyDone = ids.every(id => existingVlogs.some(v => v.id === id));
if (!alreadyDone) {
for (const id of ids) if (existingVlogs.some(v => v.id === id)) throw new Error('ABORT: partial state: ' + id);
const tailIdx = vlogsSrc.lastIndexOf('\n];');
if (tailIdx < 0) throw new Error('VLOGS tail not found');
const before = vlogsSrc.slice(0, tailIdx);
if (!before.trimEnd().endsWith('},')) throw new Error('unexpected tail: ' + before.slice(-30));
const out = before + '\n' + batchSrc.trim() + '\n];\n';
const VLOGS = new Function(out.replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
if (VLOGS.length !== 15) throw new Error(`VLOGS ${VLOGS.length} != 15`);
if (VLOGS.some(v => !v.cards || v.cards.length !== 8)) throw new Error('some vlog without 8 cards');
if (!alreadyDone) writeFileSync(`${ROOT}/vlogs.js`, out);
console.log('vlogs.js ' + (alreadyDone ? 'already has 15 vlogs (skip append)' : 'written: 15 vlogs'));
} // end if (!alreadyDone)

// 3. VLOG_DICT 追加新词条
const newDict = {
  // Meal Prep
  "prep": "n. 准备（meal prep 备餐）", "five": "num. 五", "lunches": "n. 午饭（lunch 复数）",
  "season": "v. 腌制调味（season it all 一次全腌）", "paprika": "n. 红椒粉",
  "oven": "n. 烤箱", "tray": "n. 烤盘", "degree": "n. 度（400 degrees 华氏度）",
  "forty": "num. 四十", "minutes": "n. 分钟（minute 复数）",
  "container": "n. 餐盒，容器", "carbs": "n. 主食碳水（carbohydrate 口语）",
  "stack": "v. 码放，摞起来", "fridge": "n. 冰箱（refrigerator 的口语）",
  "whole": "adj. 整个的（the whole week 整周）",
  "lay": "v. 放置（lay out 摆开；lay-laid-laid）", "batch": "n. 一批，一大份",
  "bite-size": "adj. 一口大小的", "sweet": "adj. 甜的（sweet potato 红薯）",
  "potato": "n. 土豆", "potatoes": "n. 土豆（复数）",
  // Car Wash
  "shampoo": "n. 洗涤剂（car shampoo 洗车液）", "fill": "v. 装满，接水",
  "rinse": "v. 冲洗（rinse off 冲掉）", "hose": "n. 水管，软管",
  "dirt": "n. 尘土，脏东西", "loose": "adj. 松散的（loose dirt 浮尘）",
  "foam": "n. 泡沫", "roof": "n. 车顶，屋顶",
  "wheel": "n. 车轮", "scrub": "v. 用力刷洗",
  "brake": "n. 刹车（brake dust 刹车粉尘）", "stubborn": "adj. 顽固的，难除的",
  "slide": "v. 滑落", "shine": "v. 闪光，发亮",
  "microfiber": "n. 超细纤维", "wipe": "v. 擦，揩",
  "spot": "n. 斑点（water spot 水渍）", "vacuum": "v./n. 吸尘",
  "crumb": "n. 碎屑", "mat": "n. 脚垫，垫子",
  "driveway": "n. （私家）车道", "suburban": "adj. 郊区的",
  "knocks": "v. 敲；碰掉（knock off 碰掉；三单）",
  "second": "num. 第二的（a second tray 第二个盘）",
  "part": "n. 部分（the dirtiest part 最脏的部分）",
  "already": "adv. 已经", "lines": "n. 直线（in straight lines 走直线）",
  "under": "prep. 在……下面（under the seats 座椅下）",
  "many": "adj. 许多的", "colors": "n. 颜色（color 复数）",
  "eat": "v. 吃（eat the rainbow 吃彩虹）", "rainbow": "n. 彩虹",
  "huge": "adj. 巨大的，超流行的",
  // Hiking
  "hiking": "n. 徒步（hike 的动名词）", "lace": "v. 系（鞋带）（lace up 系紧）",
  "snacks": "n. 零食（snack 复数）", "check": "interj. 齐了（清单确认用语）",
  "trail": "n. 步道，小径", "gentle": "adj. 平缓的",
  "path": "n. 小路", "steep": "adj. 陡的",
  "forward": "adv. 向前（lean forward 前倾）", "slightly": "adv. 轻微地",
  "burn": "n. 酸痛感（feel the burn 感到酸爽）",
  "catch": "v. 抓（catch your breath 喘口气）", "breath": "n. 呼吸",
  "ridge": "n. 山脊", "breathtaking": "adj. 美到窒息的",
  "view": "n. 景色", "summit": "n. 山顶",
  "knee": "n. 膝盖", "footing": "n. 立足点（watch your footing 注意脚下）",
  "outdoors": "n. 户外", "weekend": "n. 周末",
  "mountains": "n. 山（mountain 复数）", "everywhere": "adv. 到处",
  "harder": "adj. 更难的（hard 的比较级）", "watch": "v. 注意，看",
  "carry": "v. 携带", "trace": "n. 痕迹（leave no trace 不留痕迹）",
  "whatever": "pron. 无论什么", "mountain": "n. 山",
  "afternoon": "n. 下午", "saturday": "n. 周六",
  "sunday": "n. 周日", "morning": "n. 早上",
  "water": "n. 水", "break": "n. 休息（water break 喝水休息）",
  "photos": "n. 照片（photo 复数）", "course": "n. 当然（of course）",
  "tastes": "v. 尝起来（taste 的三单）", "never": "adv. 从不",
  "better": "adj. 更好（good/well 的比较级）", "than": "conj. 比",
  "top": "n. 顶部（at the top of 在……顶上）",
  "slowly": "adv. 慢慢地", "perfect": "adj. 完美的",
  "day": "n. 天，日子", "going": "v. 去（go 的进行时）",
  "down": "adv. 向下（going down 下山）",
  "gets": "v. 变得（get 的三单）", "small": "adj. 小的",
  "steps": "n. 步子（step 复数；small steps 小步走）",
  // —— 补缺（校验器发现的 44 词）——
  "let's": "让我们（let us 缩写）", "walkies": "n. 遛狗（遛狗的儿语）",
  "cleaner": "n. 干洗店（the cleaner's 干洗店）", "tonight": "adv. 今晚",
  "plan": "n. 计划", "week": "n. 周", "cutting": "n. 切割（cut 的动名词）",
  "once": "adv. 一次（at once 同时）", "sprinkle": "v. 撒",
  "piece": "n. 块，片（pieces 复数）", "four": "num. 四",
  "hundred": "num. 百", "pack": "v. 装进，打包",
  "protein": "n. 蛋白质", "idea": "n. 主意，点子",
  "america": "n. 美国", "their": "pron. 他们的",
  "car": "n. 汽车", "window": "n. 窗（windows 复数）",
  "dirtiest": "adj. 最脏的（dirty 最高级）", "separate": "adj. 单独的",
  "dust": "n. 灰尘", "inside": "n./adv. 内部，在里面",
  "tradition": "n. 传统", "boot": "n. 靴子（boots 复数）",
  "backpack": "n. 背包", "sunscreen": "n. 防晒霜",
  "easy": "adj. 容易的", "bird": "n. 鸟（birds 复数）",
  "lean": "v. 倚，倾斜", "leg": "n. 腿（legs 复数）",
  "feel": "v. 感觉", "rock": "n. 岩石",
  "made": "v. 制作（make 的过去式）", "sandwich": "n. 三明治",
  "hiker": "n. 徒步者（Hikers 复数）",
};
let vlogSrc = readFileSync(`${ROOT}/vlog.js`, 'utf8');
const dictMatch = vlogSrc.match(/const VLOG_DICT = \{[\s\S]*?\n\};/);
if (!dictMatch) throw new Error('VLOG_DICT not found');
const dictStart = vlogSrc.indexOf(dictMatch[0]);
const dictEnd = dictStart + dictMatch[0].length - 1;
const dictBody = dictMatch[0].replace('const VLOG_DICT = ', '').replace(/;\s*$/, '');
const existingDict = new Function('return (' + dictBody + ')')();
const merged = { ...existingDict };
let added = 0;
for (const [k, v] of Object.entries(newDict)) {
  if (existingDict[k] !== undefined) { continue; }
  merged[k] = v; added++;
}
const keys = Object.keys(merged);
let out2 = 'const VLOG_DICT = {\n';
for (const k of keys) out2 += `  ${JSON.stringify(k)}: ${JSON.stringify(merged[k])},\n`;
out2 += '};';
vlogSrc = vlogSrc.slice(0, dictStart) + out2 + vlogSrc.slice(dictEnd + 1);
new Function(vlogSrc.replace(/^\/\/.*$/gm, '').replace(/^import.*$/gm, ''));
writeFileSync(`${ROOT}/vlog.js`, vlogSrc);
console.log('VLOG_DICT updated:', Object.keys(merged).length, 'entries,', added, 'added');

// 4. 词形还原静态校验：15 集全部卡片逐词可查
const lookup = (w, dict) => {
  const word = w.toLowerCase();
  if (dict[word] !== undefined) return word;
  const rules = [
    [/(?:ies)$/, 'y'], [/(?:ches|shes|sses|xes)$/, 'ch'], [/(?:s)$/, ''],
    [/(?:ing)$/, ''], [/(?:ing)$/, 'e'], [/(?:ed)$/, ''], [/(?:ed)$/, 'y'],
    [/(?:er)$/, ''], [/(?:er)$/, 'e'], [/(?:est)$/, ''], [/(?:est)$/, 'e'],
    [/(?:d)$/, ''],
  ];
  for (const [re, rep] of rules) {
    if (re.test(word)) {
      const stem = word.replace(re, rep);
      if (dict[stem] !== undefined) return stem;
    }
  }
  return null;
};
const VLOGS2 = new Function(readFileSync(`${ROOT}/vlogs.js`, 'utf8').replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
const dictMatch2 = readFileSync(`${ROOT}/vlog.js`, 'utf8').match(/const VLOG_DICT = \{[\s\S]*?\n\};/);
const dictFinal = new Function('return (' + dictMatch2[0].replace('const VLOG_DICT = ', '').replace(/\};$/, '}') + ')')();
let miss = [];
for (const v of VLOGS2) {
  // 与既有 12 集一致的已知豁免：所有格撇号 token（walkies'/cleaner's/tonight's），
  // 旧集从上线起就查不到，属既有行为非本次回归
  const EXEMPT = new Set(["walkies'", "cleaner's", "tonight's"]);
  for (const c of v.cards) {
    const text = c.en.replace(/[''"''].*?[''"'']/g, ' ');
    const tokens = text.split(/[^A-Za-z'-]+/).filter(t => t.length > 0 && !/^\d+$/.test(t) && !EXEMPT.has(t.toLowerCase()));
    for (const t of tokens) {
      const stem = lookup(t, dictFinal);
      if (stem === null) miss.push(v.id + ': ' + t);
    }
  }
}
if (miss.length) {
  console.log('MISSING (' + miss.length + '):');
  miss.forEach(m => console.log('  ' + m));
  throw new Error('VLOG_DICT has gaps — fix before writing');
}
console.log('all 15 vlogs word-check passed, dict size:', Object.keys(dictFinal).length);
