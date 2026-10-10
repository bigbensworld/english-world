// 交通 v5：出租车小费与打车文化（文化潜规则）
{
  id: "v5",
  title: "第 5 次光顾 · 小费与打车文化",
  titleEn: "Tipping & Taxi Culture",
  emoji: "💵",
  desc: "在美国坐出租和网约车，小费怎么给、给多少？哪些是默认规矩？搭车文化一次讲透。",
  reward: { en: "fare", zh: "你解锁了小费文化，打车付账不再心虚！💵" },
  steps: [
    {
      npcLines: [
        "Perfect timing — I've been driving all morning. Where can I take you?",
        "Morning! You caught me right when I needed a fare. Where to?",
        "Hi there! Slow morning so far — where are we headed today?",
      ],
      npcZh: "来得正好——我开了一早上车。您去哪儿？",
      task: "报目的地（机场），询问大概车费",
      options: [
        { text: "Hi! To the airport, please. Roughly how much will that be?",    ok: true,  tip: "Roughly how much 大概多少钱 + To the airport 报目的地" },
        { text: "Airport. How much money you want from me?",                     ok: false, tip: "更自然：Roughly how much will that be?" },
        { text: "Airport airport, go now, price?",                               ok: false, tip: "完整句更清楚：To the airport, please. Roughly how much?" },
      ],
      phrase: { en: "Roughly how much will it be?", zh: "大概多少钱？", note: "roughly = 大约；问估价标准句，避免下车惊吓" },
    },
    {
      npcLines: [
        "Should run you about forty bucks, give or take. Traffic's light right now, so maybe less!",
        "Ballpark forty dollars — could be less, traffic is quiet today!",
        "Around forty bucks, but with this light traffic, maybe we'll get lucky!",
      ],
      npcZh: "大概 40 美元左右，上下浮动一点。现在车少，也许更少！",
      task: "确认自己理解了口语化的价格说法",
      options: [
        { text: "Got it — about forty, give or take. That works for me, let's go!", ok: true, tip: "give or take 上下浮动 + That works for me 可以接受" },
        { text: "Give? Take? What giving? What taking? Confusing!",              ok: false, tip: "give or take = 大约、上下浮动，口语高频" },
        { text: "Forty too expensive! Thirty final price!",                      ok: false, tip: "出租车按计价器：先确认理解 That works for me" },
      ],
      phrase: { en: "give or take", zh: "上下浮动，大约", note: "Forty bucks, give or take = 40 块左右；美语口语必备" },
    },
    {
      npcLines: [
        "Alright, we're at the airport! Meter says forty-two fifty. You can tap or swipe right here.",
        "Here we are! Forty-two fifty on the meter — card machine's right there for you.",
        "Airport, check! That's forty-two fifty — tap to pay whenever you're ready!",
      ],
      npcZh: "好了，到机场了！计价器 42.5 美元。可以在这里刷卡或拍卡。",
      task: "刷卡付款，询问小费如何在机器上操作",
      options: [
        { text: "Sure. Should I add a tip on the machine? What's the usual amount?", ok: true,  tip: "add a tip 加小费 + What's the usual amount? 问惯例，不露怯" },
        { text: "Tip? What tip? Nobody told me about tips!",                      ok: false, tip: "美国打车默认给小费：Should I add a tip on the machine?" },
        { text: "No no no tip, machine take exact money only.",                   ok: false, tip: "机器通常有小费选项：主动问 What's the usual amount?" },
      ],
      phrase: { en: "Should I add a tip?", zh: "我需要加小费吗？", note: "美国服务文化默认小费；机器会跳出 15%/20%/25% 选项" },
    },
    {
      npcLines: [
        "Well, fifteen to twenty percent is standard these days. The screen's got buttons — fifteen, twenty, or custom.",
        "Most folks do fifteen or twenty percent. The machine gives you those buttons right there!",
        "Fifteen percent is fine, twenty if you're feeling generous! It's all on the screen.",
      ],
      npcZh: "现在标准是 15% 到 20%。屏幕上有按钮——15、20 或自定义。",
      task: "选择合适的小费比例并完成支付",
      options: [
        { text: "Twenty percent — you got me here fast and safe. Here you go!",   ok: true,  tip: "20% = 满意服务；肯定服务质量（fast and safe）是给小费的体面理由" },
        { text: "Zero percent. Machine has zero button, I checked.",             ok: false, tip: "服务无过错时给 0% 失礼；15% 起步" },
        { text: "One hundred percent tip because I am rich!",                    ok: false, tip: "小费惯例 15-20%；过度给小费同样不自然" },
      ],
      phrase: { en: "Fifteen to twenty percent is standard.", zh: "15% 到 20% 是标准。", note: "小费文化核心数字：满意 20%、标准 15%、自助 0-10%" },
    },
    {
      npcLines: [
        "Whoa, twenty percent — thank you kindly! You know, in my day, folks just rounded up to the nearest five!",
        "Twenty! You're too generous! Back in the day, people just rounded up and called it a day!",
        "Much appreciated! Fun fact — old-timers used to just round up the fare for the tip!",
      ],
      npcZh: "哇，20%——非常感谢！要知道在我年轻那会儿，大家凑个整数就算小费了！",
      task: "对文化差异表示好奇，追问'凑整'是什么意思",
      options: [
        { text: "Interesting! So people used to round up instead? Like forty-two fifty becomes forty-five?", ok: true, tip: "round up 凑整 + 举数字例子确认理解" },
        { text: "Round up? Circle? What shape you talking about?",               ok: false, tip: "round up = 向上取整（42.5→45），不是圆形" },
        { text: "Old days bad, new days good, obviously.",                       ok: false, tip: "对文化差异表达好奇：Interesting! So people used to...?" },
      ],
      phrase: { en: "round up", zh: "凑整，向上取整", note: "42.5 凑到 45；付现金时 round up 当小费是老派做法" },
    },
    {
      npcLines: [
        "Exactly right, you learn fast! Hey, since you're flying — one tip from me: tip the sky cap two bucks a bag at the curb!",
        "You got it! Say, if you've got luggage — the sky cap at the curb helps you for two dollars a bag!",
        "Nailed it! Oh, airport tip for you: the curb porter, two bucks per bag, that's the custom!",
      ],
      npcZh: "完全正确，你学得真快！对了，既然您要坐飞机——给你个提示：门口帮搬行李的门童，每件行李给 2 美元小费！",
      task: "感谢司机主动分享的文化提示",
      options: [
        { text: "Good to know — two bucks a bag. Thanks for the heads-up, that's really helpful!", ok: true, tip: "Thanks for the heads-up 谢谢提醒 + Good to know 接收新信息" },
        { text: "More tipping?! This country is bankrupting me!",                ok: false, tip: "文化差异不抱怨：Good to know! Thanks for the heads-up!" },
        { text: "No bag, no problem, no money for anyone.",                      ok: false, tip: "提前了解规矩有备无患：Thanks for the heads-up!" },
      ],
      phrase: { en: "Thanks for the heads-up!", zh: "谢谢提醒！", note: "heads-up = 提前告知；对主动提示的高频感谢语" },
    },
    {
      npcLines: [
        "You're one of my favorite passengers — curious, polite, tips fair! Safe flights, and welcome to the tipping club!",
        "A pleasure, truly! You ask good questions and treat people right. Have a wonderful flight!",
        "Best passenger of the week! Curiosity plus manners — you'll do just fine here. Safe travels!",
      ],
      npcZh: "你是我最喜欢的乘客之一——好奇、礼貌、小费给得大方！旅途平安，欢迎加入『小费俱乐部』！",
      task: "幽默回应司机的夸奖，完成告别",
      options: [
        { text: "Haha, proud member of the tipping club now! Thanks for the great ride — take care!", ok: true, tip: "接住幽默（proud member）+ take care 收尾道别" },
        { text: "Favorite passenger? Free ride for me then?",                    ok: false, tip: "接住幽默而非索要好处：Proud member of the tipping club!" },
        { text: "Yes yes goodbye now.",                                          ok: false, tip: "幽默回应更显自如：Haha, proud member of the tipping club!" },
      ],
      phrase: { en: "Take care!", zh: "保重，再见！", note: "比 Bye 更暖的道别；对帮你的人尤其合适" },
    },
  ],
},
