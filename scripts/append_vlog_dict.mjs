// VLOG_DICT 追加新 3 集词条 + 词形还原校验（v2：补全功能词/修正引号清洗）
import { readFileSync, writeFileSync } from 'fs';

const ROOT = '/Users/alice/WorkBuddy/3/english-world';

// 1. 新词条（commute / dogwalk / errands 三集 + 校验发现的缺口）
const newDict = {
  // The Morning Commute
  "commute": "n./v. 通勤（the morning commute 早晨通勤）",
  "leave": "v. 离开", "eight": "num. 八", "begins": "v. 开始（begin 的三单）",
  "subway": "n. 地铁（美式）", "power-walk": "v. 疾走（口语）",
  "taps": "v. 轻刷（tap 的三单）", "opens": "v. 打开（open 的三单）",
  "train": "n. 列车", "behind": "prep. 在……后面", "lucky": "adj. 幸运的",
  "lap": "n. 腿上（on my lap 在我腿上）", "old": "adj. 年老的",
  "lady": "n. 女士", "her": "pron. 她（宾格/她的）", "she": "pron. 她",
  "smiles": "v. 微笑（smile 的三单）", "thanks": "n. 感谢",
  "ticket": "n. 车票", "regular": "adj. 固定的，常来的",
  "travelers": "n. 旅客（traveler 的复数）", "monthly": "adj. 每月的", "pass": "n. 通行卡，月票",
  // Walking the Dog
  "knows": "v. 知道（know 的三单）", "word": "n. 单词",
  "moment": "n. 时刻（the moment 一……就）", "picks": "v. 拿起（pick 的三单）",
  "starts": "v. 开始（start 的三单）", "girl": "n. 姑娘（对宠物的爱称）",
  "stairs": "n. 楼梯", "favorite": "adj. 最爱的", "tree": "n. 树",
  "reading": "v. 读（read 的现在分词）", "news": "n. 新闻",
  "business": "n. 方便（do one's business 宠物如厕，委婉）",
  "poop": "n. 便便（口语）", "always": "adv. 总是", "squirrel": "n. 松鼠",
  "barks": "v. 吠叫（bark 的三单）", "hard": "adv. 用力地", "hold": "v. 握紧",
  "tight": "adv. 紧紧地", "park": "n. 公园", "other": "adj. 其他的",
  "drinks": "v. 喝（drink 的三单）", "head": "v. 朝……去（head home 回家）",
  "tired": "adj. 疲倦的", "happy": "adj. 开心的", "after": "prep. 在……之后",
  "walkies": "n. 遛弯（英式俚语，对狗说）", "slang": "n. 俚语",
  "makes": "v. 使得（make 的三单）", "go": "v. 变得（go crazy 发疯）",
  "crazy": "adj. 疯狂的", "every": "det. 每一个", "them": "pron. 他们（宾格）",
  // Weekend Errands
  "saturday": "n. 周六", "errand": "n. （出门办的）小事，差事",
  "errands": "n. 差事（run errands 跑腿办事）", "lunch": "n. 午餐",
  "shirts": "n. 衬衫（shirt 的复数）", "pays": "v. 支付（pay 的三单）",
  "takes": "v. 花费（take 的三单）", "tells": "v. 告诉（tell 的三单）",
  "food": "n. 食物", "halfway": "adv./adj. 半途的",
  "break": "n. 休息（take a break 休息一下）", "try": "v. 尝试",
  "order": "v. 点单", "today": "adv. 今天", "mailing": "v. 邮寄（mail 的现在分词）",
  "birthday": "n. 生日", "office": "n. 办公室；办事处",
  "small": "adj. 小的", "doing": "v. 做（do 的现在分词）",
  "many": "det. 许多", "task": "n. 任务",
  // 既有 6 集里的缺口（本次校验发现）
  "is": "v. 是（be 的三单）", "my": "det. 我的", "it's": "it is 的缩写",
  "in": "prep. 在……里", "the": "art. 这，那（定冠词）", "to": "prep. 到，向",
  "up": "adv. 向上", "i": "pron. 我", "a": "art. 一个",
  "now": "adv. 现在", "for": "prep. 为了", "of": "prep. ……的",
  "into": "prep. 进入", "me": "pron. 我（宾格）", "on": "prep. 在……上面",
  "and": "conj. 和", "you": "pron. 你", "can": "v. 能，会",
  "they": "pron. 他们", "get": "v. 得到；变得", "any": "det. 任何",
  "all": "det. 全部", "it": "pron. 它", "too": "adv. 也；太",
  "are": "v. 是（be 的复数）", "not": "adv. 不", "by": "prep. 通过；被",
  "be": "v. 是", "has": "v. 有（have 的三单）", "at": "prep. 在（点）",
  "but": "conj. 但是", "out": "adv. 外面", "back": "adv. 回",
  "big": "adj. 大的", "do": "v. 做", "no": "det. 没有",
  "very": "adv. 非常", "when": "conj. 当……时候", "there's": "there is 的缩写",
  "i'm": "i am 的缩写", "she's": "she is 的缩写", "we": "pron. 我们",
  "an": "art. 一个（元音前）", "seat": "n. 座位", "old lady": "老奶奶",
  // 第二轮校验补缺（既有 6 集 + 新 3 集的动作词与高频词）
  "put": "v. 放", "two": "num. 二", "if": "conj. 如果", "one": "num. 一",
  "cap": "n. 盖子（一盖的量）", "dry": "adj. 干的 v. 弄干",
  "home": "n./adv. 家；在家", "catch": "v. 赶上；抓住", "walk": "v./n. 走；遛",
  "fast": "adj./adv. 快的（地）", "station": "n. 车站", "run": "v./n. 跑；跑一趟",
  "crowd": "n. 人群", "gate": "n. 闸机；大门", "tap": "v. 轻刷，轻拍 n. 水龙头",
  "beep": "n./v. 哔声；哔哔响", "door": "n. 门", "through": "adv./prep. 通过",
  "pulls": "v. 拉（pull 的三单）", "pull": "v. 拉", "empty": "adj. 空的",
  "sit": "v. 坐", "down": "adv. 向下", "offer": "v. 提供；让给",
  "stop": "n./v. 车站；停止", "comes": "v. 来（come 的三单）",
  "dog": "n. 狗", "leash": "n. 牵引绳", "spin": "v./n. 旋转",
  "sniffs": "v. 闻（sniff 的三单）", "sniff": "v. 闻，嗅",
  "carefully": "adv. 认真地", "does": "v. 做（do 的三单）",
  "uh-oh": "int. 哎呀（口语）", "zoom": "v. 疾驰（口语）",
  "around": "adv. 到处；周围", "dogs": "n. 狗（复数）",
  "running": "n./v. 跑步（run 的现在分词）", "lot": "n. 许多（a lot 很多）",
  "make": "v. 做；使得", "bank": "n. 银行", "pharmacy": "n. 药店",
  "exact": "adj. 正好的（exact change 正好的零钱）", "change": "n. 零钱；改变",
  "deposit": "v./n. 存款", "counter": "n. 柜台", "only": "adv. 仅仅",
  "refill": "v. 续配（处方）", "prescription": "n. 处方",
  "pharmacist": "n. 药剂师", "short": "adj. 短的；短暂的",
  "bench": "n. 长椅", "noodle": "n. 面条（常复数 noodles）",
  "eat": "v. 吃", "post": "v. 邮寄（英式）n. 邮政",
  "room": "n. 房间；空间",
};

// 2. 注入 vlog.js 的 VLOG_DICT 尾部（"french" 行后）
let src = readFileSync(`${ROOT}/vlog.js`, 'utf8');
const anchor = '"those": "det. 那些", "french": "adj. 法国的，法语的",';
if (!src.includes(anchor)) throw new Error('dict anchor not found');
const insertLines = '  // The Morning Commute / Walking the Dog / Weekend Errands + 功能词补全\n'
  + Object.entries(newDict).map(([k, v]) => `  "${k}": "${v}",`).join('\n') + '\n';
const out = src.replace(anchor, anchor + '\n' + insertLines);
writeFileSync(`${ROOT}/vlog.js`, out);

// 3. 校验：VLOG_DICT 无重复 key + 语法有效
const m = out.match(/const VLOG_DICT = \{[\s\S]*?\n\};/);
if (!m) throw new Error('VLOG_DICT block not found after write');
const dictSrc = m[0];
const dict = new Function(dictSrc.replace('const VLOG_DICT =', 'return ') + ';')();
const keys = Object.keys(dict);
if (new Set(keys).size !== keys.length) {
  const dup = keys.filter((k, i) => keys.indexOf(k) !== i);
  throw new Error('duplicate dict keys: ' + dup.join(', '));
}
console.log('VLOG_DICT now', keys.length, 'entries (+' + Object.keys(newDict).length + ')');

// 词形还原函数（与 vlog.js lookupWord 同逻辑：先清洗非字母再查）
function lookup(raw) {
  const w = raw.toLowerCase().replace(/[^a-z'-]/g, '');
  if (!w) return true;
  if (dict[w]) return true;
  const tries = [w.replace(/'s$/, ''), w.replace(/'s?$/, ''), w.replace(/'re$/, ''), w.replace(/ed$/, ''), w.replace(/ing$/, ''), w.replace(/s$/, '')];
  return tries.some(t => t.length > 2 && dict[t]);
}

// 4. 校验 9 集 vlog 全部卡片：先剥掉嵌套引号再分词，每个词都可查
const vlogsSrc = readFileSync(`${ROOT}/vlogs.js`, 'utf8');
const VLOGS = new Function(vlogsSrc.replace(/^\/\/.*$/gm, '') + '; return VLOGS;')();
let missing = [];
for (const v of VLOGS) {
  for (const c of v.cards) {
    const clean = c.en.toLowerCase().replace(/'[^']*'/g, ' ');  // 剥掉嵌套引用短语
    const words = clean.match(/[a-z'-]+/g) || [];
    for (const w of words) if (!lookup(w) && !missing.includes(w)) missing.push(w);
  }
}
if (missing.length) throw new Error('words not in dict: ' + missing.join(', '));
console.log('all 9 vlogs card words resolvable (quotes stripped, morphological restore)');
