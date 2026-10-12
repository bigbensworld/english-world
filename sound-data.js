// 英语世界 - 发音辨音数据（SOUND_PAIRS）
// 最小对立对（Minimal Pairs）：TTS 播一个词，从两个近音词中选出听到的那一个
// 分组按「中国学习者最难区分的音对」组织，每组 6 题
// 兜底文案：若系统 TTS 播不出明显区别，可改用预生成音频（audio/ 目录）

const SOUND_PAIRS = [
  {
    id: "ih-ee",
    name: "ɪ / iː 短长音",
    emoji: "📏",
    desc: "ship 还是 sheep？短音急促，长音拉长带微笑",
    color: "#4a7c59",
    pairs: [
      { a: "ship", b: "sheep", zhA: "船", zhB: "羊" },
      { a: "sit", b: "seat", zhA: "坐", zhB: "座位" },
      { a: "hit", b: "heat", zhA: "打", zhB: "热度" },
      { a: "fill", b: "feel", zhA: "装满", zhB: "感觉" },
      { a: "list", b: "least", zhA: "清单", zhB: "最少" },
      { a: "itch", b: "each", zhA: "痒", zhB: "每个" },
    ],
    tip: "发 iː 时嘴角向两边咧开（像微笑），拉长；ɪ 短促，嘴型放松。",
  },
  {
    id: "ae-e",
    name: "æ / e 嘴型大小",
    emoji: "👄",
    desc: "bad 还是 bed？嘴巴张大 vs 半开",
    color: "#9a5f36",
    pairs: [
      { a: "bad", b: "bed", zhA: "坏的", zhB: "床" },
      { a: "man", b: "men", zhA: "男人（单）", zhB: "男人（复）" },
      { a: "sad", b: "said", zhA: "伤心的", zhB: "说（过去）" },
      { a: "bag", b: "beg", zhA: "包", zhB: "乞求" },
      { a: "have", b: "heavy", zhA: "有", zhB: "重" },
      { a: "match", b: "mesh", zhA: "比赛", zhB: "网状物" },
    ],
    tip: "æ 嘴张大到两指宽（像看医生说 ahh）；e 嘴只半开。",
  },
  {
    id: "s-th",
    name: "s / θ 咬舌音",
    emoji: "👅",
    desc: "sing 还是 thing？舌尖藏 vs 咬舌",
    color: "#5b6d9e",
    pairs: [
      { a: "sing", b: "thing", zhA: "唱歌", zhB: "东西" },
      { a: "pass", b: "path", zhA: "通过", zhB: "小路" },
      { a: "sick", b: "thick", zhA: "生病的", zhB: "厚的" },
      { a: "face", b: "faith", zhA: "脸", zhB: "信念" },
      { a: "sort", b: "thought", zhA: "分类", zhB: "想法" },
      { a: "frost", b: "froth", zhA: "霜", zhB: "泡沫" },
    ],
    tip: "发 θ 时舌尖轻触上齿，气流从缝隙挤出；中国人最容易读成 s，练习时故意把舌头伸出来一点。",
  },
  {
    id: "l-r",
    name: "l / r 卷舌",
    emoji: "🌀",
    desc: "light 还是 right？舌尖抵上 vs 舌根卷",
    color: "#9e5b7c",
    pairs: [
      { a: "light", b: "right", zhA: "轻的/灯", zhB: "右边/正确" },
      { a: "lock", b: "rock", zhA: "锁", zhB: "岩石" },
      { a: "play", b: "pray", zhA: "玩", zhB: "祈祷" },
      { a: "collect", b: "correct", zhA: "收集", zhB: "正确的" },
      { a: "belly", b: "berry", zhA: "肚子", zhB: "浆果" },
      { a: "glass", b: "grass", zhA: "玻璃", zhB: "草" },
    ],
    tip: "发 l 舌尖抵上齿龈；发 r 舌尖不碰任何地方、舌根往后卷（嘴型像要接东西）。",
  },
];
