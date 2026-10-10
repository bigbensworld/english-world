// 交通场景：场景头 + 词条（供 append 脚本用）
// 交通与问路 第 1 批：公交地铁/街头问路/打车网约车（3 轮，22 步）
{
  id: "transport",
  name: "交通出行",
  nameEn: "Transportation",
  emoji: "🚌",
  iconId: "transport",
  cover: "🚌🗺️🚕",
  theme: "transport",
  accent: "#b8860b",
  accentSoft: "#faf0dc",
  deco: "🚏",
  deco2: "🛣️",
  intro: "你要穿过整座城市！坐公交、乘地铁、街头问路、打车赶时间——城市交通英语全流程通关。",
  orderLabel: "🧭 出行进度",
  items: [
    // 第 1 轮（公交地铁）新词
    { id: "subway",    en: "subway",    zh: "地铁",   phon: "/ˈsʌbweɪ/",    emoji: "🚇", sent: "Take the subway to downtown." },
    { id: "bus",       en: "bus stop",  zh: "公交站", phon: "/bʌs stɒp/",   emoji: "🚏", sent: "Wait for the bus at the bus stop." },
    { id: "line",      en: "line",      zh: "线路",   phon: "/laɪn/",       emoji: "〰️", sent: "Which line goes to the airport?" },
    { id: "transfer",  en: "transfer",  zh: "换乘",   phon: "/ˈtrænsfɜː(r)/", emoji: "🔁", sent: "Transfer to the Red Line at Union Square." },
    { id: "transitcard", en: "transit card", zh: "交通卡", phon: "/ˈtrænzɪt kɑːd/", emoji: "💳", sent: "Tap your transit card at the gate." },
    { id: "eastbound", en: "eastbound", zh: "往东行", phon: "/ˈiːstbaʊnd/", emoji: "➡️", sent: "Take the Blue Line eastbound." },
    { id: "gap",       en: "mind the gap", zh: "小心空隙", phon: "/maɪnd ðə ɡæp/", emoji: "⚠️", sent: "Mind the gap between the train and the platform." },
    // 第 2 轮（街头问路）新词
    { id: "directions", en: "directions", zh: "方向/指引", phon: "/dəˈrekʃnz/", emoji: "🧭", sent: "Can you give me directions to the museum?" },
    { id: "block",     en: "block",      zh: "街区",   phon: "/blɒk/",       emoji: "🏙️", sent: "Walk two blocks and turn left." },
    { id: "corner",    en: "corner",     zh: "拐角",   phon: "/ˈkɔːnə(r)/",  emoji: "↩️", sent: "The café is right at the corner." },
    { id: "crosswalk", en: "crosswalk",  zh: "人行横道", phon: "/ˈkrɒswɔːk/", emoji: "🚸", sent: "Use the crosswalk to cross the street." },
    { id: "underpass", en: "underpass",  zh: "地下通道", phon: "/ˈʌndəpɑːs/", emoji: "🚇", sent: "Take the underpass to cross the avenue." },
    { id: "walkable",  en: "within walking distance", zh: "步行可达", phon: "/ˈwɔːkɪŋ ˈdɪstəns/", emoji: "🚶", sent: "The park is within walking distance." },
    // 第 3 轮（打车网约车）新词
    { id: "fare",      en: "fare",      zh: "车费",   phon: "/feə(r)/",     emoji: "💵", sent: "The bus fare is two dollars." },
    { id: "meter",     en: "meter",     zh: "计价器", phon: "/ˈmiːtə(r)/",  emoji: "🔢", sent: "Check the meter for the fare." },
    { id: "shortcut",  en: "shortcut",  zh: "近路",   phon: "/ˈʃɔːtkʌt/",   emoji: "📍", sent: "The driver knows a shortcut." },
    { id: "rideshares", en: "rideshare app", zh: "网约车应用", phon: "/ˈraɪdʃeə(r) æp/", emoji: "📱", sent: "I booked a ride on a rideshare app." },
    { id: "buckle",    en: "buckle up", zh: "系安全带", phon: "/ˈbʌkl ʌp/",  emoji: "🔗", sent: "Buckle up before the car starts." },
    { id: "traffic",   en: "traffic",   zh: "交通",   phon: "/ˈtræfɪk/",    emoji: "🚗", sent: "There's heavy traffic on Main Street." },
    { id: "hurry",     en: "in a hurry", zh: "赶时间", phon: "/ɪn ə ˈhʌri/", emoji: "⏰", sent: "I'm in a hurry — can we take the shortcut?" },
    { id: "destination", en: "destination", zh: "目的地", phon: "/ˌdestɪˈneɪʃn/", emoji: "🏁", sent: "What's your final destination?" },
    { id: "buckleup",  en: "exact change", zh: "精确零钱", phon: "/ɪɡˈzækt tʃeɪndʒ/", emoji: "🪙", sent: "The bus only takes exact change." },
  ],
  visits: [
