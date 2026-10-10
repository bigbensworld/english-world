// 餐厅 第 6 轮：小费文化（8 步）
{
  id: "v6",
  title: "第 6 次光顾 · 小费文化深潜",
  titleEn: "Tipping Culture",
  emoji: "💰",
  desc: "在美国餐厅，小费是绕不开的文化。该给多少？什么时候可以不给？变打工达人前先学会消费达人！",
  reward: { en: "tip", zh: "你搞懂了小费文化，再也不用在账单前装冷静！💰" },
  steps: [
    {
      npcLines: [
        "Good evening! Welcome back to Rosewood! Your usual table by the window?",
        "Evening! Great to see you again. Window table, as always?",
        "Well hello again! The usual spot by the window, I presume?",
      ],
      npcZh: "晚上好！欢迎回到 Rosewood 餐厅！还是老位置，靠窗那桌吗？",
      task: "确认老位置",
      options: [
        { text: "Yes, the usual, please. Great to be back!", ok: true,  tip: "the usual 老样子，熟客感拉满的口语" },
        { text: "Same same table window again yes.",         ok: false, tip: "说 The usual, please" },
        { text: "I always sit here you know.",               ok: false, tip: "更自然：Yes, the usual, please" },
      ],
      phrase: { en: "The usual, please.", zh: "老样子", note: "常客点单/选座万能句，= 和平常一样" },
    },
    {
      npcLines: [
        "Perfect. Here's the menu. By the way, we have a new seasonal tasting menu tonight — five courses!",
        "Here you go! Oh — just so you know, tonight we're featuring a five-course tasting menu.",
        "Menu for you! Quick heads-up: there's a new seasonal tasting menu tonight, five courses.",
      ],
      npcZh: "好的。这是菜单。对了，今晚我们新推了季节品鉴套餐——五道式！",
      task: "询问品鉴套餐价格是否含小费",
      options: [
        { text: "Sounds interesting! Does the price include tax and tip?", ok: true,  tip: "include tax and tip 问清总价构成，点套餐必问" },
        { text: "How much money all together is it?",                     ok: false, tip: "更精准：Does the price include tax and tip?" },
        { text: "Price have tip inside or not?",                          ok: false, tip: "说 Does the price include tip?" },
      ],
      phrase: { en: "Does the price include tax and tip?", zh: "价格含税和小费吗？", note: "套餐/团餐必问：含税+含小费一次问清" },
    },
    {
      npcLines: [
        "Great question! The price includes tax but not tip. For parties of six or more, we add an 18% gratuity automatically.",
        "Good of you to ask! Tax is included, tip is not. Heads-up: parties of six or more get an automatic 18% gratuity.",
        "Tax is in there, tip isn't. And just so you know, six or more people means an automatic 18% service charge.",
      ],
      npcZh: "问得好！价格含税但不含小费。另外，六人及以上聚会会自动加收 18% 的服务费。",
      task: "理解 gratuity 规则，继续点餐",
      options: [
        { text: "Got it. It's just the two of us tonight, so we'll tip separately. We'll try the tasting menu!", ok: true,  tip: "Got it 表示听懂规则 + 二人不受影响，理解后行动" },
        { text: "18 percent too much money no want.",                ok: false, tip: "先确认人数：It's just the two of us" },
        { text: "Gratuity word I don't know. Free is good.",         ok: false, tip: "gratuity = 小费的正式说法，自动加收时用" },
      ],
      phrase: { en: "gratuity / service charge", zh: "服务费（小费的正式说法）", note: "账单上自动加的小费叫 gratuity，通常 18%~20%" },
    },
    {
      npcLines: [
        "Excellent choice! I'll get that started for you. The first course will be out in about fifteen minutes.",
        "Wonderful! I'll put that order in right away. First course in about fifteen minutes!",
        "Great pick! Your first course will arrive in about fifteen minutes.",
      ],
      npcZh: "绝佳选择！我这就下单。第一道菜大约十五分钟后上。",
      task: "询问可否配酒（红酒推荐）",
      options: [
        { text: "Could you recommend a red wine that pairs well with the menu?", ok: true,  tip: "pair with 搭配，配餐酒的行话" },
        { text: "Give me best wine for this food.",                            ok: false, tip: "更地道：Could you recommend a wine that pairs well?" },
        { text: "Red wine good with food yes?",                               ok: false, tip: "说 pairs well with the menu" },
      ],
      phrase: { en: "What pairs well with ___?", zh: "……和什么搭？", note: "pair with 餐饮搭配万能词：酒配菜、菜配酱都能用" },
    },
    {
      npcLines: [
        "Our sommelier suggests a Pinot Noir — light enough for every course. Would you like a glass?",
        "I'd go with the Pinot Noir — it works with all five courses. A glass?",
        "The Pinot Noir is a lovely match for the tasting menu. Care for a glass?",
      ],
      npcZh: "我们的侍酒师推荐黑皮诺——轻盈百搭，配五道菜都合适。来一杯吗？",
      task: "接受推荐，来一杯",
      options: [
        { text: "That sounds perfect. I'll have a glass, please.", ok: true,  tip: "I'll have... 接受推荐点单的标准句" },
        { text: "Okay wine yes one cup give.",                   ok: false, tip: "一杯酒是 a glass：I'll have a glass, please" },
        { text: "You choose I drink anything free.",             ok: false, tip: "说 I'll have a glass, please" },
      ],
      phrase: { en: "I'll have a glass of ___.", zh: "我来一杯……", note: "点酒水标准句；红酒杯是 glass，整瓶才叫 bottle" },
      adds: [{ emoji: "🍷", label: "Pinot Noir", wordId: "wine" }],
    },
    {
      npcLines: [
        "How is everything so far? Are you enjoying the courses?",
        "Checking in — how are the courses treating you?",
        "Well? How's the tasting menu working out for you?",
      ],
      npcZh: "目前一切还好吗？喜欢这些菜吗？",
      task: "称赞 + 好奇问一句菜量会太大吗",
      options: [
        { text: "Everything is delicious! The portions are perfect — not too big, not too small.", ok: true,  tip: "not too big, not too small 中庸表达，自然赞美" },
        { text: "Food good. Too much food maybe I will fat.",                                   ok: false, tip: "更自然：The portions are perfect" },
        { text: "Delicious yes. Small plates expensive though.",                                ok: false, tip: "只夸分量即可：The portions are perfect" },
      ],
      phrase: { en: "not too ___, not too ___", zh: "不太……也不太……", note: "表达刚刚好的万能句式" },
    },
    {
      npcLines: [
        "So glad you're enjoying it! Here's the bill whenever you're ready — no rush at all.",
        "Wonderful! Take your time — the bill's here whenever you're ready for it.",
        "Delighted to hear it! I'll leave the bill here — whenever you're ready.",
      ],
      npcZh: "很高兴您喜欢！账单放这儿了，您慢慢来，不着急。",
      task: "看账单：$80。按 20% 给小费，刷卡",
      options: [
        { text: "I'll pay by card. The service was excellent — 20% tip, please.", ok: true,  tip: "小费比例直接说，刷卡时 tip 在刷卡机或账单上操作" },
        { text: "Card pay. Add some extra money for you okay.",                   ok: false, tip: "说清比例：20% tip, please" },
        { text: "I pay 80 dollar only exact no tip today.",                       ok: false, tip: "服务很好，正常小费 15%~20%" },
      ],
      phrase: { en: "___% tip", zh: "给……% 的小费", note: "美国惯例：午餐 15%~18%，晚餐 18%~20%，服务出色给 20%+" },
      adds: [{ emoji: "💳", label: "Paid + 20% Tip", wordId: "card" }],
    },
    {
      npcLines: [
        "That's very generous — thank you so much! We love having you here. See you next time!",
        "You're too kind, thank you! It's always a pleasure. Until next time!",
        "Wow, thank you! You're one of our favorites. Safe travels home!",
      ],
      npcZh: "您太慷慨了——非常感谢！很高兴您光临。下次见！",
      task: "总结小费文化要点，道别",
      options: [
        { text: "Great service deserves a great tip. Have a good one!", ok: true,  tip: "have a good one 美式随性告别，比 have a good day 更口语" },
        { text: "Bye bye restaurant money finished.",                 ok: false, tip: "更自然：Have a good one!" },
        { text: "Next time I pay less money okay deal?",              ok: false, tip: "大方道别：Have a good one!" },
      ],
      phrase: { en: "Have a good one!", zh: "回见！", note: "美式万能告别：比 have a good day 更随意，人人爱用" },
    },
  ],
},
