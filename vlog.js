// 英语世界 - 慢速生活频道引擎（Slow Vlog）
// 竖向刷卡 + 慢速朗读逐词高亮 + 动作收集链 + 听音选图 Quiz
// 词汇与场景对话共享 state.collected 收集系统

// ---------- Vlog 状态 ----------
const vlogState = {
  currentVlog: null,
  seenCards: {},      // vlogId:cardIdx -> true（看过的卡）
  quizPassed: {},     // vlogId -> true（通过听音 Quiz）
};

function vlogSave() {
  const d = JSON.parse(localStorage.getItem("englishWorldV2") || "{}");
  d.vlogSeen = vlogState.seenCards;
  d.vlogQuiz = vlogState.quizPassed;
  localStorage.setItem("englishWorldV2", JSON.stringify(d));
}
function vlogLoad() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorldV2"));
    if (d) {
      vlogState.seenCards = d.vlogSeen || {};
      vlogState.quizPassed = d.vlogQuiz || {};
    }
  } catch (e) { /* fresh */ }
}

// ---------- 内置轻量词典（vlog 高频词释义） ----------
const VLOG_DICT = {
  "alarm": "n. 闹钟；警报", "clock": "n. 钟，时钟", "morning": "n. 早晨，上午",
  "wake": "v. 醒来（wake up 起床）", "time": "n. 时间",
  "curtains": "n. 窗帘（curtain 的复数）", "open": "v. 打开 adj. 开着的",
  "sun": "n. 太阳", "coming": "v. come 的现在分词，来临", "beautiful": "adj. 美丽的",
  "brush": "v. 刷 n. 刷子（brush my teeth 刷牙）", "teeth": "n. 牙齿（tooth 的复数）",
  "squeeze": "v. 挤，捏", "toothpaste": "n. 牙膏", "onto": "prep. 到……上面",
  "breakfast": "n. 早餐", "slices": "n. 薄片（slice 的复数）", "bread": "n. 面包",
  "toaster": "n. 烤面包机", "pour": "v. 倒，倾倒", "myself": "pron. 我自己",
  "cup": "n. 杯子", "coffee": "n. 咖啡", "smell": "n./v. 气味；闻",
  "better": "adv./adj. 更好（good/well 的比较级）", "than": "conj. 比",
  "jacket": "n. 外套，夹克", "grab": "v. 抓起，拿走（口语）", "keys": "n. 钥匙（key 的复数）",
  "almost": "adv. 几乎，差不多", "ready": "adj. 准备好的", "shoes": "n. 鞋子",
  "step": "v./n. 迈步；台阶（step outside 走出门）", "outside": "adv./n. 外面",
  "great": "adj. 极好的", "day": "n. 一天", "grumpy": "adj. 脾气坏的",
  "wrong": "adj. 错误的", "side": "n. 一侧，边", "bed": "n. 床",
  "crack": "v. 打裂，敲开（crack eggs 打蛋）", "eggs": "n. 鸡蛋", "bowl": "n. 碗",
  "careful": "adj. 小心的", "shells": "n. 壳（shell 的复数）", "stir": "v. 搅拌",
  "fork": "n. 叉子", "round": "n./adv. 圈（round and round 一圈又一圈）",
  "until": "conj./prep. 直到", "they're": "they are 的缩写", "yellow": "adj. 黄色的",
  "heat": "v./n. 加热（heat up 热起来）", "pan": "n. 平底锅", "add": "v. 加入",
  "butter": "n. 黄油", "listen": "v. 听", "sizzles": "v. 滋滋作响",
  "watch": "v. 观看", "turn": "v. 变成；转动", "liquid": "n. 液体",
  "solid": "n. 固体", "magic": "n. 魔法", "flip": "v. 翻转（flip the omelette 翻蛋）",
  "omelette": "n. 煎蛋卷", "chef": "n. 厨师", "okay": "adj./adv. 好的",
  "bacon": "n. 培根", "frying": "v. fry 的现在分词，煎炸", "gets": "v. 变得（get 的第三人称单数）",
  "crispy": "adj. 酥脆的", "whole": "adj. 整个的", "kitchen": "n. 厨房",
  "amazing": "adj. 令人惊叹的", "everything": "pron. 一切，所有东西",
  "plate": "v. 装盘 n. 盘子", "served": "v. serve 的过去分词，上菜", "chefs": "n. 厨师（复数）",
  "say": "v. 说", "phrase": "n. 短语", "means": "v. 意味着（mean 的三单）",
  "place": "n. 地方", "start": "v. 开始", "cooking": "n./v. 烹饪",
  "beans": "n. 豆子（coffee beans 咖啡豆）", "grind": "v. 磨（过去式 ground）",
  "powder": "n. 粉末", "fresh": "adj. 新鲜的", "best": "adj. 最好的", "part": "n. 部分",
  "while": "conj. 当……的时候", "boil": "v. 煮沸", "water": "n. 水",
  "hot": "adj. 热的", "just": "adv. 只是；正好", "below": "prep./adv. 低于",
  "paper": "n. 纸", "filter": "n. 滤纸；过滤器", "dripper": "n. 滤杯",
  "rinse": "v. 冲洗，润湿", "fun": "adj. 有趣的", "slow": "adj. 慢的",
  "circles": "n. 圆圈（in circles 绕圈）", "over": "prep. 在……上方",
  "wait": "v. 等待", "drips": "v. 滴落", "slowly": "adv. 慢慢地",
  "drop": "n. 滴（drop by drop 一滴一滴）", "things": "n. 东西（thing 的复数）",
  "take": "v. 花费（时间）", "mmm": "int. 嗯（品尝声）", "nutty": "adj. 坚果香的",
  "little": "adj. 小的；一点", "sweet": "adj. 甜的", "going": "v. go 的现在分词",
  "good": "adj. 好的", "finally": "adv. 最后", "sip": "n./v. 一小口；啜饮",
  "warm": "adj. 温暖的", "smooth": "adj. 顺滑的", "perfect": "adj. 完美的",
  "people": "n. 人们", "balance": "n. 平衡", "bitter": "adj. 苦的",
  "sour": "adj. 酸的", "right": "adv./adj. 正好；对的",
  // Grocery Run / Doing Laundry / Cleaning the House
  "shopping": "n. 购物（shopping list 购物清单）", "list": "n. 清单",
  "milk": "n. 牛奶", "egg": "n. 鸡蛋", "so": "conj. 所以", "don't": "do not 的缩写",
  "forget": "v. 忘记", "grab": "v. 抓起，拿走（口语）", "wheels": "n. 轮子（wheel 的复数）",
  "squeak": "v. 吱吱作响", "little": "adv. 稍微", "still": "adv. 仍然",
  "works": "v. 能用，起作用（work 的三单）", "fruit": "n. 水果", "section": "n. 区域",
  "red": "adj. 红色的", "apples": "n. 苹果（apple 的复数）", "each": "det. 每一个",
  "give": "v. 给", "next": "adj. 下一个的", "dairy": "n. 乳制品",
  "aisle": "n. 货架通道", "carton": "n. 纸盒/盒装", "check": "v. 检查",
  "date": "n. 日期", "pick": "v. 挑（pick out 挑选出）", "vegetables": "n. 蔬菜（vegetable 的复数）",
  "quick": "adj. 快的", "let": "v. 让", "bread": "n. 面包",
  "sale": "n. 特价（on sale 打折）", "thirty": "num. 三十", "percent": "n. 百分之",
  "off": "adv. 减掉（30% off 七折）", "what": "det. 多么（感叹）", "goes": "v. go 的三单",
  "stand": "v. 站（stand in line 排队）", "line": "n. 队伍", "everything": "pron. 一切",
  "belt": "n. 传送带；腰带", "pay": "v. 付款", "card": "n. 卡片；银行卡",
  "trip": "n. 一趟，出行", "buy": "v. 买", "few": "det. 几个", "called": "v. 称为（call 的过去分词）",
  "laundry": "n. 要洗/刚洗好的衣服", "carry": "v. 搬，提", "clothes": "n. 衣服",
  "machine": "n. 机器", "sort": "v. 分类", "pile": "n. 一堆",
  "color": "n. 颜色", "another": "det. 另一个", "detergent": "n. 洗衣液，洗涤剂",
  "enough": "adj. 足够的", "much": "adv. 多", "press": "v. 按，压",
  "button": "n. 按钮", "bubbles": "n. 泡泡（bubble 的复数）", "spins": "v. 旋转（spin 的三单）",
  "cycle": "n. 一轮（洗衣机程序）", "forty": "num. 四十", "minutes": "n. 分钟（minute 的复数）",
  "towels": "n. 毛巾（towel 的复数）", "towel": "n. 毛巾", "dryer": "n. 烘干机",
  "tumbles": "v. 翻滚（tumble 的三单）", "air": "n. 空气", "until": "conj. 直到",
  "clean": "adj. 干净的", "neatly": "adv. 整齐地", "fold": "v. 叠（衣服）",
  "away": "adv. 收起来（put away 收好）", "done": "adj. 完成的", "americans": "n. 美国人",
  "british": "adj. 英国的", "often": "adv. 经常", "washing": "n. 洗（do the washing 洗衣服）",
  "house": "n. 房子", "broom": "n. 扫把", "sweep": "v. 扫",
  "floor": "n. 地板", "corner": "n. 角落", "wipe": "v. 擦",
  "table": "n. 桌子", "wet": "adj. 湿的", "sponge": "n. 海绵",
  "crumbs": "n. 面包屑（crumb 的复数）", "gone": "v. go 的过去分词，没了", "sink": "n. 水槽",
  "full": "adj. 满的", "dishes": "n. 碗碟（dish 的复数）", "soap": "n. 肥皂（dish soap 洗洁精）",
  "bucket": "n. 桶", "fill": "v. 装满，注入", "warmer": "adj. 温暖的（warm 的比较级）",
  "mop": "n./v. 拖把；拖地", "forth": "adv. 向前（back and forth 来回）",
  "first": "adv. 首先", "flood": "v. 淹，灌满水", "trash": "n. 垃圾",
  "tie": "v. 系（tie up 系紧）", "bag": "n. 袋子", "outside": "n. 外面",
  "bin": "n. 垃圾桶", "vacuum": "v./n. 吸尘", "sofa": "n. 沙发",
  "pillows": "n. 抱枕，枕头（pillow 的复数）", "brand": "n. 品牌（brand new 崭新的）",
  "new": "adj. 新的",   "deep": "adj. 深的", "spring": "n. 春天",
  "autumn": "n. 秋天", "even": "adv. 即使，哪怕",
  "this": "det. 这，这个", "seven": "num. 七", "look": "v. 看",
  "then": "adv. 然后", "last": "adj. 上一个的", "have": "v. 有",
  "fact": "n. 事实（fun fact 冷知识）", "someone": "pron. 某人",
  "with": "prep. 用；和……一起", "them": "pron. 他们（宾格）",
  "from": "prep. 从", "like": "prep. 像", "that": "conj. 那么",
  "before": "prep./conj. 在……之前", "these": "det. 这些",
  "some": "det. 一些", "write": "v. 写", "anything": "pron. 任何东西",
  "cart": "n. 购物车", "entrance": "n. 入口", "frozen": "adj. 冷冻的",
  "freezer": "n. 冰柜", "melt": "v. 融化", "deal": "n. 划算交易（口语）",
  "english": "n. 英语", "grocery": "n. 食品杂货", "basket": "n. 篮子",
  "dirty": "adj. 脏的", "whites": "n. 白色衣物（洗衣用语）", "dark": "adj. 深色的",
  "wash": "v. 洗（wash up/wash the dishes 洗碗）", "dish": "n. 碗碟",
  "cleaner": "n. 清洁剂",   "fluff": "v. 拍松 n. 绒毛", "spring cleaning": "春季大扫除",
  "those": "det. 那些", "french": "adj. 法国的，法语的",
  // The Morning Commute / Walking the Dog / Weekend Errands + 功能词补全
  "commute": "n./v. 通勤（the morning commute 早晨通勤）",
  "leave": "v. 离开",
  "eight": "num. 八",
  "begins": "v. 开始（begin 的三单）",
  "subway": "n. 地铁（美式）",
  "power-walk": "v. 疾走（口语）",
  "taps": "v. 轻刷（tap 的三单）",
  "opens": "v. 打开（open 的三单）",
  "train": "n. 列车",
  "behind": "prep. 在……后面",
  "lucky": "adj. 幸运的",
  "lap": "n. 腿上（on my lap 在我腿上）",
  "old": "adj. 年老的",
  "lady": "n. 女士",
  "her": "pron. 她（宾格/她的）",
  "she": "pron. 她",
  "smiles": "v. 微笑（smile 的三单）",
  "thanks": "n. 感谢",
  "ticket": "n. 车票",
  "regular": "adj. 固定的，常来的",
  "travelers": "n. 旅客（traveler 的复数）",
  "monthly": "adj. 每月的",
  "pass": "n. 通行卡，月票",
  "knows": "v. 知道（know 的三单）",
  "word": "n. 单词",
  "moment": "n. 时刻（the moment 一……就）",
  "picks": "v. 拿起（pick 的三单）",
  "starts": "v. 开始（start 的三单）",
  "girl": "n. 姑娘（对宠物的爱称）",
  "stairs": "n. 楼梯",
  "favorite": "adj. 最爱的",
  "tree": "n. 树",
  "reading": "v. 读（read 的现在分词）",
  "news": "n. 新闻",
  "business": "n. 方便（do one's business 宠物如厕，委婉）",
  "poop": "n. 便便（口语）",
  "always": "adv. 总是",
  "squirrel": "n. 松鼠",
  "barks": "v. 吠叫（bark 的三单）",
  "hard": "adv. 用力地",
  "hold": "v. 握紧",
  "tight": "adv. 紧紧地",
  "park": "n. 公园",
  "other": "adj. 其他的",
  "drinks": "v. 喝（drink 的三单）",
  "head": "v. 朝……去（head home 回家）",
  "tired": "adj. 疲倦的",
  "happy": "adj. 开心的",
  "after": "prep. 在……之后",
  "walkies": "n. 遛弯（英式俚语，对狗说）",
  "slang": "n. 俚语",
  "makes": "v. 使得（make 的三单）",
  "go": "v. 变得（go crazy 发疯）",
  "crazy": "adj. 疯狂的",
  "every": "det. 每一个",
  "them": "pron. 他们（宾格）",
  "saturday": "n. 周六",
  "errand": "n. （出门办的）小事，差事",
  "errands": "n. 差事（run errands 跑腿办事）",
  "lunch": "n. 午餐",
  "shirts": "n. 衬衫（shirt 的复数）",
  "pays": "v. 支付（pay 的三单）",
  "takes": "v. 花费（take 的三单）",
  "tells": "v. 告诉（tell 的三单）",
  "food": "n. 食物",
  "halfway": "adv./adj. 半途的",
  "break": "n. 休息（take a break 休息一下）",
  "try": "v. 尝试",
  "order": "v. 点单",
  "today": "adv. 今天",
  "mailing": "v. 邮寄（mail 的现在分词）",
  "birthday": "n. 生日",
  "office": "n. 办公室；办事处",
  "small": "adj. 小的",
  "doing": "v. 做（do 的现在分词）",
  "many": "det. 许多",
  "task": "n. 任务",
  "is": "v. 是（be 的三单）",
  "my": "det. 我的",
  "it's": "it is 的缩写",
  "in": "prep. 在……里",
  "the": "art. 这，那（定冠词）",
  "to": "prep. 到，向",
  "up": "adv. 向上",
  "i": "pron. 我",
  "a": "art. 一个",
  "now": "adv. 现在",
  "for": "prep. 为了",
  "of": "prep. ……的",
  "into": "prep. 进入",
  "me": "pron. 我（宾格）",
  "on": "prep. 在……上面",
  "and": "conj. 和",
  "you": "pron. 你",
  "can": "v. 能，会",
  "they": "pron. 他们",
  "get": "v. 得到；变得",
  "any": "det. 任何",
  "all": "det. 全部",
  "it": "pron. 它",
  "too": "adv. 也；太",
  "are": "v. 是（be 的复数）",
  "not": "adv. 不",
  "by": "prep. 通过；被",
  "be": "v. 是",
  "has": "v. 有（have 的三单）",
  "at": "prep. 在（点）",
  "but": "conj. 但是",
  "out": "adv. 外面",
  "back": "adv. 回",
  "big": "adj. 大的",
  "do": "v. 做",
  "no": "det. 没有",
  "very": "adv. 非常",
  "when": "conj. 当……时候",
  "there's": "there is 的缩写",
  "i'm": "i am 的缩写",
  "she's": "she is 的缩写",
  "we": "pron. 我们",
  "an": "art. 一个（元音前）",
  "seat": "n. 座位",
  "old lady": "老奶奶",
  "put": "v. 放",
  "two": "num. 二",
  "if": "conj. 如果",
  "one": "num. 一",
  "cap": "n. 盖子（一盖的量）",
  "dry": "adj. 干的 v. 弄干",
  "home": "n./adv. 家；在家",
  "catch": "v. 赶上；抓住",
  "walk": "v./n. 走；遛",
  "fast": "adj./adv. 快的（地）",
  "station": "n. 车站",
  "run": "v./n. 跑；跑一趟",
  "crowd": "n. 人群",
  "gate": "n. 闸机；大门",
  "tap": "v. 轻刷，轻拍 n. 水龙头",
  "beep": "n./v. 哔声；哔哔响",
  "door": "n. 门",
  "through": "adv./prep. 通过",
  "pulls": "v. 拉（pull 的三单）",
  "pull": "v. 拉",
  "empty": "adj. 空的",
  "sit": "v. 坐",
  "down": "adv. 向下",
  "offer": "v. 提供；让给",
  "stop": "n./v. 车站；停止",
  "comes": "v. 来（come 的三单）",
  "dog": "n. 狗",
  "leash": "n. 牵引绳",
  "spin": "v./n. 旋转",
  "sniffs": "v. 闻（sniff 的三单）",
  "sniff": "v. 闻，嗅",
  "carefully": "adv. 认真地",
  "does": "v. 做（do 的三单）",
  "uh-oh": "int. 哎呀（口语）",
  "zoom": "v. 疾驰（口语）",
  "around": "adv. 到处；周围",
  "dogs": "n. 狗（复数）",
  "running": "n./v. 跑步（run 的现在分词）",
  "lot": "n. 许多（a lot 很多）",
  "make": "v. 做；使得",
  "bank": "n. 银行",
  "pharmacy": "n. 药店",
  "exact": "adj. 正好的（exact change 正好的零钱）",
  "change": "n. 零钱；改变",
  "deposit": "v./n. 存款",
  "counter": "n. 柜台",
  "only": "adv. 仅仅",
  "refill": "v. 续配（处方）",
  "prescription": "n. 处方",
  "pharmacist": "n. 药剂师",
  "short": "adj. 短的；短暂的",
  "bench": "n. 长椅",
  "noodle": "n. 面条（常复数 noodles）",
  "eat": "v. 吃",
  "post": "v. 邮寄（英式）n. 邮政",
  "room": "n. 房间；空间",

};

// 查词：返回释义（未命中返回 null）
function lookupWord(raw) {
  const w = raw.toLowerCase().replace(/[^a-z'-]/g, "");
  if (!w) return null;
  if (VLOG_DICT[w]) return VLOG_DICT[w];
  // 简单词形还原
  const tries = [
    w.replace(/'s$/, ""), w.replace(/'re$/, ""),
    w.replace(/s$/, ""), w.replace(/es$/, ""), w.replace(/ing$/, ""), w.replace(/ed$/, ""),
    w.replace(/d$/, ""), w.replace(/ies$/, "y"),
  ];
  for (const t of tries) {
    if (t && t.length > 2 && VLOG_DICT[t]) return VLOG_DICT[t] + "（原形 " + t + "）";
  }
  return null;
}

// 单词点击：发音 + 弹出解释卡
function onVlogWordClick(evt) {
  const span = evt.target.closest(".v-word");
  if (!span || !span.classList.contains("v-word")) return;
  const raw = span.textContent;
  const clean = raw.toLowerCase().replace(/[^a-z'-]/g, "");
  if (!clean) return;
  speakSlow(clean, 0.6);
  const def = lookupWord(raw);
  const card = $("wordCard");
  card.innerHTML = `
    <div class="word-emoji">🔤</div>
    <div class="word-en">${raw}</div>
    <div class="word-zh" style="margin-top:10px">${def ? def : "📖 暂无内置释义<br><span style='font-size:13px;font-weight:400'>这个词还没收录进小词典，先听发音跟读吧</span>"}</div>
    <div class="word-actions">
      <button class="btn btn-big btn-primary" id="wcSpeak">🔊 再听一次</button>
      <button class="btn btn-big" id="wcClose">关闭</button>
    </div>
  `;
  $("wordOverlay").classList.remove("hidden");
  $("wcSpeak").onclick = () => speakSlow(clean, 0.6);
  $("wcClose").onclick = () => $("wordOverlay").classList.add("hidden");
}

// ---------- 慢速朗读（带逐词高亮） ----------
let speakSlowTimer = null;
function speakSlow(text, rate, onWord, onEnd) {
  if (!("speechSynthesis" in window)) { if (onEnd) onEnd(); return; }
  speechSynthesis.cancel();
  // Chrome 已知 bug：cancel() 后立即 speak() 会被一起吞掉（表现为"没生效"/无声）。
  // 修复：延迟一小段时间再播，并 resume 防止引擎处于暂停态。
  clearTimeout(speakSlowTimer);
  speakSlowTimer = setTimeout(() => {
    try { speechSynthesis.resume(); } catch (e) { /* ignore */ }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate || 0.55; // 慢 vlog 语速
    u.pitch = 1;
    u.volume = 1;
    if (onWord) {
      u.onboundary = (e) => {
        if (e.name === "word" || e.charIndex !== undefined) onWord(e.charIndex);
      };
    }
    if (onEnd) u.onend = onEnd;
    speechSynthesis.speak(u);
  }, 150);
}

// 高亮当前朗读到的词：根据 charIndex 找到第几个词
function highlightWordByChar(container, charIndex) {
  const spans = container.querySelectorAll(".v-word");
  let acc = 0;
  spans.forEach((s) => {
    const start = Number(s.dataset.start);
    const end = start + s.textContent.length;
    s.classList.toggle("active", charIndex >= start && charIndex < end);
  });
}

// ---------- 频道入口（首页 Tab + 场景页内频道列表） ----------
// 渲染 vlog 集列表到指定容器（首页 tab 或场景页内均可）
function renderVlogSetsInto(container) {
  container.innerHTML = "";
  VLOGS.forEach((v, i) => {
    const passed = vlogState.quizPassed[v.id];
    const seenCount = Object.keys(vlogState.seenCards).filter((k) => k.startsWith(v.id + ":")).length;
    const seenAll = seenCount >= v.cards.filter((c) => !c.type).length;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "vlog-set" + (passed ? " passed" : "");
    el.style.animationDelay = (i * 0.06) + "s";
    el.innerHTML = `
      <div class="vlog-set-emoji">${v.emoji}</div>
      <div class="vlog-set-info">
        <div class="vlog-set-title">${v.title} · ${v.titleZh}</div>
        <div class="vlog-set-desc">${v.desc}</div>
        <div class="vlog-set-progress">${passed ? "🎓 已毕业 · 可重刷" : seenAll ? "✅ 已刷完 · 去闯 Quiz！" : seenCount > 0 ? "📖 刷到 " + seenCount + "/" + v.cards.length + " 张" : "▶ " + v.cards.length + " 张卡片"}</div>
      </div>
      ${passed ? '<div class="done-badge">✓</div>' : ""}
    `;
    el.onclick = () => openVlog(v.id);
    container.appendChild(el);
  });
}

// 首页 Tab 逻辑
function initHomeTabs() {
  const tabs = $("homeTabs");
  if (!tabs) return;
  // 恢复上次选择的 tab（新访客默认「慢速生活」：先听懂，再开口）
  let active = "vlog";
  try { active = sessionStorage.getItem("ewHomeTab") || "vlog"; } catch (e) {}
  if (active !== "vlog" && active !== "scenes") active = "vlog";
  function switchTo(tab) {
    active = tab;
    try { sessionStorage.setItem("ewHomeTab", tab); } catch (e) {}
    tabs.querySelectorAll(".home-tab").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === tab);
    });
    $("paneVlog").classList.toggle("hidden", tab !== "vlog");
    $("paneScenes").classList.toggle("hidden", tab !== "scenes");
    if (tab === "vlog") renderVlogSetsInto($("homeVlogSets"));
  }
  tabs.querySelectorAll(".home-tab").forEach((b) => {
    b.onclick = () => switchTo(b.dataset.tab);
  });
  // vlog 面板底部 CTA：引导进入场景冒险（输出练习）
  const gotoScenes = $("gotoScenes");
  if (gotoScenes) gotoScenes.onclick = () => switchTo("scenes");
  switchTo(active);
}

// 场景页内的频道列表页（从 vlog 播放器返回时用）
function openVlogChannel() {
  const stage = $("stage");
  $("sceneTitle").textContent = "📺 慢速生活频道 · Slow Vlog";
  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-vlog";
  setMascotState("idle");
  state.currentScene = null;
  state.currentVisit = null;
  vlogState.currentVlog = null;

  const box = document.createElement("div");
  box.className = "adventure-box vlog-list";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">📺 慢速生活频道</div>
    </div>
    <div class="adv-intro">像刷短视频一样学英语：拿起一样东西，做一个动作，慢速讲解。刷完一集，通过听音小测验即可毕业。</div>
    <div class="vlog-sets" id="vlogSets"></div>
    <button class="btn btn-big" id="vlogBack">⬅ 返回地图</button>
  `;
  stage.appendChild(box);
  renderVlogSetsInto($("vlogSets"));
  $("vlogBack").onclick = backToMap;

  $("mapView").classList.add("hidden");
  $("sceneView").classList.remove("hidden");
}

// ---------- 刷卡模式 ----------
function openVlog(id) {
  const v = VLOGS.find((x) => x.id === id);
  if (!v) return;
  vlogState.currentVlog = v;
  const stage = $("stage");
  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-vlog";
  setMascotState("happy", 1200);

  const normalCards = v.cards.filter((c) => !c.type);
  const box = document.createElement("div");
  box.className = "adventure-box vlog-player";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">${v.emoji} ${v.title} · ${v.titleZh}</div>
      <button class="btn btn-ghost" id="vlogExit">✕ 退出</button>
    </div>
    <div class="vlog-cardstage vlog-enter" id="vlogStage"></div>
    <div class="vlog-nav" id="vlogNav"></div>
  `;
  stage.appendChild(box);
  $("vlogExit").onclick = openVlogChannel;

  let idx = 0;
  const seen = (i) => {
    vlogState.seenCards[v.id + ":" + i] = true;
    vlogSave();
  };

  function renderCard() {
    const card = v.cards[idx];
    const s = $("vlogStage");
    const isFact = card.type === "fun-fact";
    const wordsHtml = card.en.split(/(\s+)/).map((w) => {
      return /^\s+$/.test(w) ? w : `<span class="v-word" data-start="${card.en.indexOf(w, 0)}">${w}</span>`;
    }).join("");
    // 精确计算每个词的 start（indexOf 会重复，改为累积法）
    let pos = 0;
    const wordSpans = [];
    card.en.split(/(\s+)/).forEach((w) => {
      if (/^\s+$/.test(w)) { pos += w.length; return; }
      wordSpans.push(`<span class="v-word" data-start="${pos}">${w}</span>`);
      pos += w.length;
    });

    s.innerHTML = `
      <div class="vlog-card ${isFact ? "fact-card" : ""}">
        <div class="vlog-count">${idx + 1} / ${v.cards.length}</div>
        <div class="vlog-anim ${isFact ? "" : "anim-" + (card.anim || "idle")}">
          <span class="vlog-emoji">${card.emoji}</span>
          ${!isFact && card.anim === "pour" ? '<span class="vlog-liquid"></span>' : ""}
          ${!isFact && card.anim === "toast" ? '<span class="vlog-fire">🔥</span>' : ""}
          ${!isFact && card.anim === "boil" ? '<span class="vlog-steam">💨</span>' : ""}
          ${!isFact && card.anim === "curtain" ? '<span class="vlog-sun">☀️</span>' : ""}
          ${isFact ? '<div class="fact-tag">💡 冷知识</div>' : ""}
        </div>
        <div class="vlog-en vlog-tappable" id="vlogEn" title="点击任意单词：听发音 + 看释义">${wordSpans.join(" ")}</div>
        <details class="vlog-zh"><summary>🇨🇳 中文</summary>${card.zh}</details>
        <div class="vlog-words">${(card.words || []).map((w) => `<span class="vlog-word-chip">🔑 ${w}</span>`).join("")}</div>
        <div class="vlog-actions">
          <button class="btn btn-big btn-primary" id="vlogPlay">🔊 慢速播放</button>
          <button class="btn btn-big" id="vlogNormal">🏃 常速</button>
        </div>
      </div>
    `;
    $("vlogPlay").onclick = () => {
      speakSlow(card.en, 0.55, (ci) => highlightWordByChar($("vlogEn"), ci));
    };
    $("vlogNormal").onclick = () => {
      speakSlow(card.en, 0.85, (ci) => highlightWordByChar($("vlogEn"), ci));
    };
    // 单词点击学习：发音 + 释义卡
    $("vlogEn").onclick = onVlogWordClick;
    seen(idx);

    // 导航
    const nav = $("vlogNav");
    const isLast = idx >= v.cards.length - 1;
    nav.innerHTML = `
      ${idx > 0 ? '<button class="btn" id="vlogPrev">← 上一张</button>' : ""}
      ${!isLast
        ? '<button class="btn btn-primary" id="vlogNext">下一张 →</button>'
        : '<button class="btn btn-big btn-primary" id="vlogQuiz">🎬 去闯 Quiz！</button>'}
    `;
    if ($("vlogPrev")) $("vlogPrev").onclick = () => { idx--; renderCard(); };
    if ($("vlogNext")) $("vlogNext").onclick = () => { idx++; renderCard(); };
    if ($("vlogQuiz")) $("vlogQuiz").onclick = () => startVlogQuiz(v);

    // 每张卡自动慢速朗读：进入/切换卡片即播（speakSlow 内部已有 150ms 防吞音延迟）
    if (vlogState.currentVlog === v) {
      const hint = document.createElement("div");
      hint.className = "auto-play-hint";
      hint.textContent = "🔊 自动慢速播放中…（点击单词可查释义）";
      $("vlogStage").appendChild(hint);
      speakSlow(card.en, 0.55, (ci) => highlightWordByChar($("vlogEn"), ci));
      setTimeout(() => hint.remove(), 4000);
    }
  }
  renderCard();

  // 正确切换视图（修复地图未隐藏的 bug）
  $("mapView").classList.add("hidden");
  $("sceneView").classList.remove("hidden");
}

// ---------- 听音选图 Quiz ----------
function startVlogQuiz(v) {
  const normalCards = v.cards.filter((c) => !c.type);
  // 随机抽 3 张（不足则全抽）
  const pool = normalCards.slice().sort(() => Math.random() - 0.5);
  const quizCards = pool.slice(0, Math.min(3, pool.length));
  let qIdx = 0, correct = 0;
  const total = quizCards.length;

  function renderQuiz() {
    if (qIdx >= total) return finishQuiz();
    const target = quizCards[qIdx];
    // 干扰项：从其他卡随机取 2 张
    const others = normalCards.filter((c) => c !== target).sort(() => Math.random() - 0.5).slice(0, 2);
    const opts = [target, ...others].sort(() => Math.random() - 0.5);

    const s = $("vlogStage");
    s.innerHTML = `
      <div class="vlog-card quiz-card">
        <div class="quiz-head">🎬 QUIZ TIME · ${qIdx + 1}/${total}</div>
        <div class="quiz-question">🔊 听声音——刚才是哪个动作？</div>
        <button class="btn btn-big btn-primary" id="quizPlay">🔊 再听一次</button>
        <div class="quiz-opts" id="quizOpts"></div>
        <div class="quiz-result" id="quizResult"></div>
      </div>
    `;
    $("quizPlay").onclick = () => speakSlow(target.en, 0.55);
    speakSlow(target.en, 0.55);

    const optsBox = $("quizOpts");
    let answered = false;
    opts.forEach((c) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "quiz-opt";
      el.innerHTML = `<span class="quiz-emoji">${c.emoji}</span><span class="quiz-label">${c.words ? c.words[0] : ""}</span>`;
      el.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = c === target;
        if (ok) {
          correct++;
          el.classList.add("right");
          $("quizResult").innerHTML = "✅ Right! " + (target.words ? "「" + target.words[0] + "」" : "");
          setMascotState("happy", 800);
        } else {
          el.classList.add("wrong");
          // 高亮正确项
          [...optsBox.children].forEach((b, i) => { if (opts[i] === target) b.classList.add("reveal"); });
          $("quizResult").innerHTML = "❌ It was " + (target.words ? "「" + target.words[0] + "」" : target.emoji) + "——回炉重听这张卡吧";
        }
        setTimeout(() => { qIdx++; renderQuiz(); }, ok ? 1000 : 1600);
      };
      optsBox.appendChild(el);
    });
  }

  function finishQuiz() {
    const passed = correct >= total;
    if (passed) {
      vlogState.quizPassed[v.id] = true;
      vlogSave();
      // 收集本集全部词汇进词汇册（共享收集系统）
      let collected = 0;
      v.cards.forEach((c) => {
        (c.words || []).forEach((w) => {
          const key = "vlog:" + v.id + ":" + w;
          if (!state.collected[key]) { state.collected[key] = { en: w, zh: "", vlog: v.titleZh }; collected++; }
        });
      });
      save(); renderHUD();
    }
    const s = $("vlogStage");
    s.innerHTML = `
      <div class="vlog-card quiz-card">
        <div class="finish-big">${passed ? "🎓" : "💪"}</div>
        <h3>${passed ? "本集毕业！" : "差一点点！"}</h3>
        <p>${passed ? "答对 " + correct + "/" + total + "，本集词汇已全部收进词汇册！" : "答对 " + correct + "/" + total + "，再刷一遍卡片，回来复仇！"}</p>
        <div class="finish-btns">
          ${passed ? "" : '<button class="btn btn-big btn-primary" id="quizRetry">🔄 再刷卡片</button>'}
          <button class="btn btn-big" id="quizBack">📺 返回频道</button>
        </div>
      </div>
    `;
    if ($("quizRetry")) $("quizRetry").onclick = () => openVlog(v.id);
    $("quizBack").onclick = openVlogChannel;
    if (passed) toast("🎓 " + v.titleZh + " 毕业！");
  }

  const nav = $("vlogNav");
  nav.innerHTML = "";
  renderQuiz();
}

// ---------- 初始化（vlog.js 在 game.js 之后加载，在此挂载入口） ----------
vlogLoad();
initHomeTabs();
