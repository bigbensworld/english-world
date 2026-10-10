// 追加 3 集 vlog（dinner/gardening/workout）到 vlogs.js + VLOG_DICT 补词条
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';

// 1. 校验 3 个分片结构
const ids = [];
for (const f of ['vlog_dinner.js', 'vlog_gardening.js', 'vlog_workout.js']) {
  const src = readFileSync(`${ROOT}/scripts/${f}`, 'utf8').trim().replace(/,\s*$/, '');
  const v = new Function(`return (${src})`)();
  if (!v.id || !v.title || v.cards?.length !== 8) throw new Error(f + ' bad structure');
  const ff = v.cards.filter(c => c.type === 'fun-fact');
  if (ff.length !== 1) throw new Error(f + ' fun-fact count != 1');
  if (!v.cards.every(c => c.en && c.zh)) throw new Error(f + ' missing en/zh');
  // words 必须是数组
  if (!v.cards.every(c => Array.isArray(c.words))) throw new Error(f + ' words not array');
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
const parts = ['vlog_dinner.js', 'vlog_gardening.js', 'vlog_workout.js'].map(f => readFileSync(`${ROOT}/scripts/${f}`, 'utf8').trim());
const out = before + '\n' + parts.join('\n') + '\n];\n';
const VLOGS = new Function(out.replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
if (VLOGS.length !== 12) throw new Error(`VLOGS ${VLOGS.length} != 12`);
if (VLOGS.some(v => !v.cards || v.cards.length !== 8)) throw new Error('some vlog without 8 cards');
writeFileSync(`${ROOT}/vlogs.js`, out);
console.log('vlogs.js written: ' + VLOGS.length + ' vlogs');

// 3. VLOG_DICT 追加新词条
const newDict = {
  // Cooking Dinner
  "o'clock": "adv. ……点钟（of the clock 缩写）", "clock": "n. 钟",
  "cook": "v. 烹饪", "cooking": "n. 烹饪（cook 的动名词）",
  "chop": "v. 切（chop, chop, chop 拟声重复）", "onion": "n. 洋葱",
  "olive": "n. 橄榄（olive oil 橄榄油）", "oil": "n. 油",
  "pan": "n. 平底锅", "heat": "n. 火，热度（turn the heat 调火）",
  "goes": "v. 去；放进去（go 的三单，goes in 下锅）",
  "carrots": "n. 胡萝卜（carrot 的复数）", "stir": "v. 搅拌",
  "chicken": "n. 鸡肉", "sizzles": "v. 滋滋作响（sizzle 的三单）",
  "season": "v. 调味（区别于 n. 季节）", "salt": "n. 盐",
  "pepper": "n. 胡椒", "while": "conj. 当……的时候（表时间差）",
  "broccoli": "n. 西兰花", "veggies": "n. 蔬菜（vegetable 的口语复数）",
  "make": "v. 使变得（veggies make the meal healthy）",
  "scoop": "v. 盛，舀", "rice": "n. 米饭", "plates": "n. 盘子（plate 的复数）",
  "place": "v. 放置", "great": "adj. 极好的",
  "mmm": "int. 嗯（品尝美味的声音）", "delicious": "adj. 美味的",
  "nothing": "pron. 没有什么", "beats": "v. 打败（beat 的三单，nothing beats 没什么比得上）",
  "home-cooked": "adj. 家常做的（home-cooked meal 家常菜）",
  "noise": "n. 声音，噪音", "copy": "v. 模仿", "sounds": "n. 声音（sound 的复数）",
  "onomatopoeia": "n. 拟声词（/ˌɒnəˌmætəˈpiːə/）", "imitate": "v. 模仿",
  // Gardening
  "afternoon": "n. 下午", "perfect": "adj. 完美的",
  "gardening": "n. 园艺（garden 的动名词）", "put": "v. 放（put on 戴上）",
  "grab": "v. 抓起，拿起（口语）", "weeds": "n. 杂草（weed 的复数）",
  "pull": "v. 拉（pull out 拔出）", "steal": "v. 偷",
  "hole": "n. 洞，坑", "tulip": "n. 郁金香", "spring": "n. 春天",
  "bloom": "v. 开花", "beautiful": "adj. 美丽的", "flower": "n. 花",
  "plants": "n. 植物（plant 的复数）；v. 种植（plant 的三单）",
  "fill": "v. 装满，灌满", "can": "n. 容器（watering can 浇水壶；区别 v. 能）",
  "drink": "n. 一饮（give a good drink 好好喝一顿）",
  "bee": "n. 蜜蜂", "little": "adj. 小的", "carry": "v. 携带，传递",
  "pollen": "n. 花粉", "plant-to-plant": "adv. 从一株到另一株",
  "ripe": "adj. 熟的", "red": "adj. 红色的", "few": "det. 几个（a few 一些）",
  "salad": "n. 沙拉", "done": "adj. 完成的", "wipe": "v. 擦",
  "shed": "n. 棚屋，工具房", "hard": "adj. 辛苦的", "worth": "adj. 值得的（worth it 值得）",
  "thumb": "n. 拇指（green thumb 种植天赋）", "always": "adv. 总是",
  "die": "v. 死（植物养死）", "might": "v. 可能（may 的过去式/委婉）",
  "say": "v. 说", "jokingly": "adv. 开玩笑地",
  // Home Workout
  "gym": "n. 健身房", "light": "adj. 轻度的", "stretching": "n. 拉伸（stretch 的动名词）",
  "stretch": "v. 拉伸", "first": "adv. 首先", "up": "adv. 上（first up 第一项）",
  "squats": "n. 深蹲（squat 的复数）", "feet": "n. 双脚（foot 的复数）",
  "back": "n. 背部", "twenty": "num. 二十", "them": "pron. 它们（宾格）",
  "next": "adj. 接下来的", "push-ups": "n. 俯卧撑", "lower": "v. 放低",
  "arms": "n. 手臂（arm 的复数）", "shake": "v. 发抖", "going": "v. 进行（keep going 坚持）",
  "plank": "n. 平板支撑；木板", "body": "n. 身体", "minute": "n. 分钟",
  "feels": "v. 感觉（feel 的三单）", "hour": "n. 小时",
  "sweating": "v. 流汗（sweat 的现在分词）", "bottle": "n. 瓶子",
  "quick": "adj. 快速的", "last": "adj. 最后的", "video": "n. 视频",
  "jumping": "v. 跳（jump 的现在分词）", "jacks": "n. 千斤顶（jumping jacks 开合跳）",
  "jump": "v. 跳", "clap": "v. 拍手", "cool": "adj. 凉的（cool down 降温放松）",
  "again": "adv. 再一次", "pain": "n. 疼痛", "gain": "n. 收获",
  "classic": "adj. 经典的", "saying": "n. 格言，说法", "require": "v. 需要",
  "effort": "n. 努力", "trainers": "n. 教练（trainer 的复数）",
  "good": "adj. 好的（good pain 良性酸胀）", "builds": "v. 建造；增强（build 的三单）",
  "muscle": "n. 肌肉", "sharp": "adj. 尖锐的（sharp pain 刺痛）", "stop": "v. 停止",
};

// 4. 合并进 VLOG_DICT（vlog.js 内）
let vlogSrc = readFileSync(`${ROOT}/vlog.js`, 'utf8');
// 找到 VLOG_DICT 对象的结束位置：通过解析定位
const dictStart = vlogSrc.indexOf('const VLOG_DICT = {');
if (dictStart < 0) throw new Error('VLOG_DICT not found');
// 括号深度追踪找对象结束
let depth = 0, dictEnd = -1, inStr = false, strCh = '';
for (let i = dictStart; i < vlogSrc.length; i++) {
  const c = vlogSrc[i];
  if (inStr) {
    if (c === '\\') { i++; continue; }
    if (c === strCh) inStr = false;
    continue;
  }
  if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
  if (c === '{') depth++;
  if (c === '}') { depth--; if (depth === 0) { dictEnd = i; break; } }
}
if (dictEnd < 0) throw new Error('VLOG_DICT end not found');
// 现有词条
const dictBody = vlogSrc.slice(dictStart + 'const VLOG_DICT = '.length, dictEnd + 1);
const existingDict = new Function('return (' + dictBody + ')')();
// 去重：新词条里去掉已存在的 key
const merged = { ...existingDict };
let added = 0;
for (const [k, v] of Object.entries(newDict)) {
  if (existingDict[k] !== undefined) { console.log('skip existing key:', k); continue; }
  merged[k] = v; added++;
}
// 重新序列化（保持插入顺序：旧的在前新的在后）
const keys = Object.keys(merged);
let out2 = 'const VLOG_DICT = {\n';
for (const k of keys) out2 += `  ${JSON.stringify(k)}: ${JSON.stringify(merged[k])},\n`;
out2 += '};';
vlogSrc = vlogSrc.slice(0, dictStart) + out2 + vlogSrc.slice(dictEnd + 1);
// 语法校验
new Function(vlogSrc.replace(/^\/\/.*$/gm, '').replace(/^import.*$/gm, ''));
writeFileSync(`${ROOT}/vlog.js`, vlogSrc);
console.log('VLOG_DICT updated:', Object.keys(merged).length, 'entries,', added, 'added');

// 5. 词形还原静态校验：12 集全部卡片句子逐词可查（含还原规则）
const lookup = (w, dict) => {
  const word = w.toLowerCase();
  if (dict[word] !== undefined) return word;
  // 复数 / 三单 / ing / ed / er / est 简易还原
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
// 从更新后的 vlogs.js + vlog.js 解析数据
const VLOGS2 = new Function(readFileSync(`${ROOT}/vlogs.js`, 'utf8').replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
const dictMatch = readFileSync(`${ROOT}/vlog.js`, 'utf8').match(/const VLOG_DICT = \{[\s\S]*?\n\};/);
const dictFinal = new Function('return (' + dictMatch[0].replace('const VLOG_DICT = ', '').replace(/\};$/, '}') + ')')();
let miss = [];
for (const v of VLOGS2) {
  for (const c of v.cards) {
    // 剥掉引号内短语
    const text = c.en.replace(/[''"''].*?[''"'']/g, ' ');
    const tokens = text.split(/[^A-Za-z'-]+/).filter(t => t.length > 0 && !/^\d+$/.test(t));
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
console.log('all 12 vlogs word-check passed, dict size:', Object.keys(dictFinal).length);
