// 交通场景 第 3 轮：打车与网约车（7 步）
{
  id: "v3",
  title: "第 3 次光顾 · 打车与网约车",
  titleEn: "Taxi & Rideshare",
  emoji: "🚕",
  desc: "赶时间只能打车！街头拦出租车、报目的地、看计价器、用 App 叫车、给小费——现代出行一网打尽。",
  reward: { en: "fare", zh: "你解锁了打车全套英语，赶时间也不慌！🚕" },
  steps: [
    {
      npcLines: [
        "Taxi! Where to, my friend?",
        "Hey there! Hop in — where are you headed?",
        "Taxi's free! Where you going?",
      ],
      npcZh: "出租车！去哪儿，朋友？",
      task: "报目的地：中央车站，越快越好",
      options: [
        { text: "Central Station, please. I'm in a bit of a hurry.", ok: true,  tip: "in a hurry 赶时间——报目的地 + 说明紧迫度" },
        { text: "Station central go fast fast now!",                 ok: false, tip: "说 Central Station, please. I'm in a hurry" },
        { text: "Drive me train station quick quick.",               ok: false, tip: "更自然：Central Station, please. I'm in a bit of a hurry." },
      ],
      phrase: { en: "___, please. I'm in a bit of a hurry.", zh: "去……，我有点赶时间。", note: "打车报目的地 + 赶时间说明，司机立马踩油门" },
    },
    {
      npcLines: [
        "Central Station it is! Buckle up, please. There's some traffic on Main Street, but I know a shortcut.",
        "You got it! Strap in! Main Street's jammed, but I've got a secret route.",
        "Central Station, coming up! Seatbelt, please — Main Street's a mess, but don't worry, I know the back ways!",
      ],
      npcZh: "中央车站！请系好安全带。主街有点堵，但我知道一条近路。",
      task: "听懂后询问预计车程",
      options: [
        { text: "Thanks! How long will the ride take?", ok: true,  tip: "How long will the ride take? 问车程——ride 指这趟行程" },
        { text: "Arrive time what hour minute?",        ok: false, tip: "说 How long will the ride take?" },
        { text: "Traffic bad? My train leaves soon panic!", ok: false, tip: "先问时长：How long will the ride take?" },
      ],
      phrase: { en: "How long will the ride take?", zh: "车程大概多久？", note: "打车必问句；ride = 打的一趟，trip 泛指旅程" },
    },
    {
      npcLines: [
        "Usually twenty minutes, fifteen with my shortcut. You'll catch your train, no worries!",
        "Twenty minutes the normal way, fifteen my way. That train of yours is safe!",
        "Fifteen, maybe twenty max. Plenty of time for your train!",
      ],
      npcZh: "平时二十分钟，走我的近路十五分钟。您能赶上火车，别担心！",
      task: "途中司机闲聊，礼貌回应",
      options: [
        { text: "That's a relief! Is this your favorite shortcut?", ok: true,  tip: "That's a relief 松了口气——回应好消息的标准句" },
        { text: "Good good. Be quiet now I stress.",              ok: false, tip: "礼貌回应闲聊：That's a relief!" },
        { text: "Fifteen or twenty? Numbers confuse me, both bad.", ok: false, tip: "松口气式回应：That's a relief!" },
      ],
      phrase: { en: "That's a relief!", zh: "那就放心了！", note: "听到好消息的松气反应，聊天神句" },
    },
    {
      npcLines: [
        "Haha, yes! Been driving this city for twenty years — I know every nook and cranny. Here we are, Central Station!",
        "Twenty years behind the wheel here — every alley's my old friend! And... we're here! Central Station!",
        "Favorite? More like my office! Twenty years in this city. Anyway — Central Station, arrived!",
      ],
      npcZh: "哈哈，是的！在这城市开了二十年车——每个角落我都熟。到了，中央车站！",
      task: "看计价器，询问车费",
      options: [
        { text: "That was fast! How much is the fare?", ok: true,  tip: "fare 车费——打车付费核心词" },
        { text: "Money how much I owe you driving man?", ok: false, tip: "说 How much is the fare?" },
        { text: "Price screen I don't understand number.", ok: false, tip: "计价器读数就是 fare：How much is the fare?" },
      ],
      phrase: { en: "How much is the fare?", zh: "车费多少？", note: "fare 车费（出租车/公交/火车通用）；meter 是计价器" },
      adds: [{ emoji: "🚕", label: "Arrived ✓", badge: true }],
    },
    {
      npcLines: [
        "Eighteen fifty. Card or cash?",
        "That'll be eighteen fifty. Card? Cash? Either works!",
        "Eighteen fifty even. Pay however you like!",
      ],
      npcZh: "18.5 美元。刷卡还是现金？",
      task: "刷卡支付并询问是否含小费",
      options: [
        { text: "Card, please. Should I add a tip on the machine?", ok: true,  tip: "add a tip on the machine 刷卡机加小费——付费环节的关键问句" },
        { text: "Card pay. Extra money mandatory or free choice?", ok: false, tip: "说 Should I add a tip on the machine?" },
        { text: "Eighteen fifty very expensive why so much money.", ok: false, tip: "正常付费即可：Card, please" },
      ],
      phrase: { en: "Should I add a tip?", zh: "需要加小费吗？", note: "打车小费美国惯例 10%~15%，刷卡机上会问" },
    },
    {
      npcLines: [
        "That's totally up to you! Most folks add a couple of dollars. Thank you either way!",
        "Whatever you feel like! A couple bucks is typical, but no pressure at all!",
        "Your call, my friend! Most people round up a bit. Thanks regardless!",
      ],
      npcZh: "完全看您！大多数人加两美元左右。无论如何都谢谢！",
      task: "加小费完成支付，下车道谢",
      options: [
        { text: "I'll add three dollars — that was a great ride. Thank you!", ok: true,  tip: "爽快加小费 + 致谢，爽利收尾" },
        { text: "Three dollar extra take it bye bye now.",                  ok: false, tip: "更完整：I'll add three dollars. Thank you!" },
        { text: "No tip today sorry money tight week.",                     ok: false, tip: "服务好可大方些：I'll add three dollars" },
      ],
      phrase: { en: "I'll add ___ dollars.", zh: "我加……美元（小费）", note: "刷卡机加小费直接说金额，干脆利落" },
      adds: [{ emoji: "💳", label: "Paid + Tip", badge: true }],
    },
    {
      npcLines: [
        "You're too kind! Oh — one more thing. If you ever need a ride in this city, try the rideshare apps. Sometimes cheaper than us!",
        "Wow, thank you! Hey, a tip from a cabbie: those rideshare apps can be cheaper sometimes. Just saying!",
        "Much appreciated! Pro tip from a twenty-year driver: check the rideshare apps too — deals to be found!",
      ],
      npcZh: "您太客气了！对了——以后在这城市需要用车，可以试试网约车 App，有时比我们出租还便宜！",
      task: "好奇询问网约车怎么用",
      options: [
        { text: "Good to know! I've never used a rideshare app — do I just book a car in the app?", ok: true,  tip: "Good to know! 接纳建议 + book in the app 问用法" },
        { text: "App car phone thing how work explain.",                                            ok: false, tip: "说 Do I just book a car in the app?" },
        { text: "Taxi driver promoting competitor app? Suspicious!",                                 ok: false, tip: "真诚建议值得听：Good to know!" },
      ],
      phrase: { en: "Good to know!", zh: "知道了，有用！", note: "接收新信息的高频回应，万能礼貌句" },
    },
  ],
},
