// 机场 第 5 轮：入境海关（8 步）
{
  id: "v5",
  title: "第 5 次光顾 · 入境海关",
  titleEn: "Immigration & Customs",
  emoji: "🛂",
  desc: "落地了！海关官员问你来干什么、待多久、有没有要申报的东西。学会通关问答，稳稳开启旅程！",
  reward: { en: "customs", zh: "你从容通过了入境海关，旅程正式开始！🛂" },
  steps: [
    {
      npcLines: [
        "Next, please! Passport, please.",
        "Next in line! May I see your passport?",
        "Come on up — passport, please.",
      ],
      npcZh: "下一位！请出示护照。",
      task: "递交护照并问好",
      options: [
        { text: "Good afternoon. Here's my passport.", ok: true,  tip: "问好 + Here's... 递证件，第一印象满分" },
        { text: "Passport yes here take it.",          ok: false, tip: "加个问好更得体：Good afternoon. Here's my passport" },
        { text: "Why you need my passport?",           ok: false, tip: "入境查验是常规流程，礼貌递上即可" },
      ],
      phrase: { en: "Here's my passport.", zh: "这是我的护照", note: "入境第一句；配合微笑使用效果更佳" },
    },
    {
      npcLines: [
        "Thank you. What's the purpose of your visit?",
        "Thanks. So — business or pleasure? What brings you here?",
        "Got it. And what's the purpose of your trip?",
      ],
      npcZh: "谢谢。您此行的目的是什么？",
      task: "回答：旅游观光",
      options: [
        { text: "I'm here for tourism. I'll be sightseeing for two weeks.", ok: true,  tip: "tourism 旅游观光；顺带说时长，减少追问" },
        { text: "Just look around walk see things.",                       ok: false, tip: "说 I'm here for tourism" },
        { text: "No purpose, just came random country.",                   ok: false, tip: "清晰作答：I'm here for tourism" },
      ],
      phrase: { en: "I'm here for tourism / business / study.", zh: "我来旅游/出差/留学", note: "purpose of visit 的三大标准回答，务必流利" },
    },
    {
      npcLines: [
        "Tourism, wonderful! And how long do you plan to stay?",
        "Great! And how long will you be with us?",
        "Lovely. What's the length of your stay?",
      ],
      npcZh: "旅游，很好！您计划停留多久？",
      task: "回答：两周",
      options: [
        { text: "Two weeks. My return flight is on the 24th.", ok: true,  tip: "时长 + 返程日期，海关最爱听的完整答案" },
        { text: "Long time maybe short time not sure.",         ok: false, tip: "说具体时长：Two weeks" },
        { text: "Until my money finish then I go.",             ok: false, tip: "明确日期：My return flight is on the 24th" },
      ],
      phrase: { en: "I'll be staying for ___.", zh: "我将停留……", note: "停留时长直接答；附带返程信息更专业" },
    },
    {
      npcLines: [
        "Perfect. Where will you be staying during your visit?",
        "Great. And where are you staying while you're here?",
        "Alright. What's your accommodation while in town?",
      ],
      npcZh: "很好。您期间住在哪里？",
      task: "回答：市中心的 Grand 酒店，已预订",
      options: [
        { text: "At the Grand Hotel downtown. I have a reservation.", ok: true,  tip: "具体酒店名 + 已有预订 = 答疑一次通过" },
        { text: "Hotel I think some hotel yes.",                     ok: false, tip: "说清名字：At the Grand Hotel downtown" },
        { text: "Sleep somewhere find later when tired.",             ok: false, tip: "海关需具体住址：I have a reservation" },
      ],
      phrase: { en: "I'll be staying at ___.", zh: "我将住在……", note: "住宿应答：酒店名或地址，提前记住英文写法" },
    },
    {
      npcLines: [
        "Great. Are you carrying any food, plants, or more than $10,000 in cash?",
        "Okay — anything to declare? Any food, plants, or over ten grand in cash?",
        "Alright, last couple: any food items, plants, or more than $10,000 cash?",
      ],
      npcZh: "好的。您携带食物、植物或超过 1 万美元现金吗？",
      task: "如实回答：带了些零食（饼干）",
      options: [
        { text: "I have some cookies in my carry-on, just for the trip.", ok: true,  tip: "如实申报少量零食，通常可带入但必须说明" },
        { text: "No nothing at all absolutely zero things.",              ok: false, tip: "如实回答：有零食就说明，撒谎后果严重" },
        { text: "Maybe food maybe not I don't remember bags.",            ok: false, tip: "清楚回答：I have some cookies in my carry-on" },
      ],
      phrase: { en: "I have some snacks in my carry-on.", zh: "我随身带了一些零食", note: "declare 申报；有食品务必主动说明，隐瞒会被罚款" },
    },
    {
      npcLines: [
        "Cookies are fine — enjoy! Could you place your fingers on the scanner for me?",
        "No problem with cookies! Now, fingers on the scanner, please.",
        "Cookies are allowed! Just need your fingerprints on the scanner.",
      ],
      npcZh: "饼干没问题——享用吧！请把手指放在扫描仪上。",
      task: "配合采集指纹",
      options: [
        { text: "Sure. Like this?", ok: true,  tip: "Like this? 确认动作是否正确，配合检查的自然表达" },
        { text: "Finger machine scary what it do to me?", ok: false, tip: "例行程序无需紧张：Sure. Like this?" },
        { text: "Which finger you want all ten?",           ok: false, tip: "按提示操作，问一句 Like this? 即可" },
      ],
      phrase: { en: "Like this?", zh: "是这样吗？", note: "确认动作/姿势的万能短句，配合指令时超好用" },
    },
    {
      npcLines: [
        "Perfect, all done. Welcome to our country — enjoy your stay!",
        "That's it! Welcome in — have a fantastic trip!",
        "All set! Welcome, and enjoy your time here!",
      ],
      npcZh: "好了，完成了。欢迎来到我们国家——祝您玩得愉快！",
      task: "取回护照，礼貌道谢",
      options: [
        { text: "Thank you very much. Have a great day!", ok: true,  tip: "通关收尾标准句：致谢 + 祝好" },
        { text: "Give passport back now please hurry.",   ok: false, tip: "官员会主动归还，微笑致谢即可" },
        { text: "Finally finished I can go yes bye.",     ok: false, tip: "更有礼貌：Thank you very much. Have a great day!" },
      ],
      phrase: { en: "Enjoy your stay!", zh: "祝您逗留愉快！", note: "官员说的最后一句话；你也可以回 Thank you, you too" },
    },
    {
      npcLines: [
        "Next, please! Welcome to the United States.",
        "Next! Enjoy your visit.",
        "Next in line, please — welcome!",
      ],
      npcZh: "下一位！欢迎来到美国。",
      task: "通关成功，最后一题：绿色通道 Nothing to declare 是什么意思？",
      options: [
        { text: "Nothing to declare = 无需申报，走绿色通道；有物品申报才走红色通道。", ok: true,  tip: "绿色=无申报，红色=有申报，通道别走错！" },
        { text: "绿色通道 = 免费快速 VIP 通道，人人都可以走。",                        ok: false, tip: "绿色通道是无申报通道，有食品/超额物品必须走红色" },
        { text: "Nothing to declare = 没带行李的人走的门。",                           ok: false, tip: "是无需申报物品，不是没有行李" },
      ],
      phrase: { en: "Nothing to declare.", zh: "无需申报", note: "海关通道二选一：绿色 Nothing to declare / 红色 Goods to declare" },
    },
  ],
},
