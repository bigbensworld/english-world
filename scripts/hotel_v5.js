// 酒店 第 5 轮：设施与服务（8 步）
{
  id: "v5",
  title: "第 5 次光顾 · 酒店设施与服务",
  titleEn: "Hotel Amenities",
  emoji: "🏊",
  desc: "健身房几点开门？泳池要带房卡吗？怎么叫早、怎么送洗衣服？把酒店设施用个遍，住回本！",
  reward: { en: "gym", zh: "你把酒店设施玩明白了，这一晚住得值！🏊" },
  steps: [
    {
      npcLines: [
        "Good morning! How can I help you today?",
        "Morning! What can I do for you?",
        "Hello, good morning! How may I assist?",
      ],
      npcZh: "早上好！今天有什么可以帮您？",
      task: "询问健身房和泳池的开放时间",
      options: [
        { text: "Could you tell me the opening hours of the gym and the pool?", ok: true,  tip: "opening hours 营业时间，问任何设施都适用" },
        { text: "Gym and swim time when open close?",                        ok: false, tip: "说 What are the opening hours?" },
        { text: "Exercise room have or not this hotel?",                     ok: false, tip: "先问时间：Could you tell me the opening hours?" },
      ],
      phrase: { en: "What are the opening hours of ___?", zh: "……的开放时间是？", note: "健身房/泳池/餐厅/商场的通用问句" },
    },
    {
      npcLines: [
        "The gym is open 24 hours, and the pool is open from 7 a.m. to 10 p.m. Both are on the third floor.",
        "Gym's around the clock, pool runs 7 to 10. Third floor for both!",
        "Gym never closes! Pool's 7 a.m. till 10 p.m. Both up on three.",
      ],
      npcZh: "健身房 24 小时开放，泳池从早 7 点到晚 10 点。都在三楼。",
      task: "询问使用泳池是否需要带房卡",
      options: [
        { text: "Great! Do I need to bring my room key card to use the pool?", ok: true,  tip: "Do I need to...? 问要求的万能句" },
        { text: "Pool free for me or pay money extra?",                      ok: false, tip: "先问规则：Do I need to bring my key card?" },
        { text: "Swim card important thing must have?",                      ok: false, tip: "说 Do I need to bring my key card?" },
      ],
      phrase: { en: "Do I need to ___?", zh: "我需要……吗？", note: "问规则/要求的万能句：带卡、预约、穿正装都能问" },
    },
    {
      npcLines: [
        "Yes, please bring your key card — the pool entrance requires it. Towels are provided there for free.",
        "Key card's a must for the pool! Towels are on the house, though.",
        "Bring your card, yes! Pool door won't open without it. Towels are free at the desk.",
      ],
      npcZh: "需要的，泳池入口要刷房卡。毛巾那边免费提供。",
      task: "表示了解，接着预约明早的叫醒服务",
      options: [
        { text: "Got it, thanks! Also, could I schedule a wake-up call for 6:30 tomorrow morning?", ok: true,  tip: "wake-up call 叫醒服务，schedule 预约" },
        { text: "Morning tomorrow 6:30 call phone me please.",                                    ok: false, tip: "说 a wake-up call for 6:30 tomorrow" },
        { text: "I want alarm clock service wake early.",                                         ok: false, tip: "专业说法：a wake-up call" },
      ],
      phrase: { en: "Could I schedule a wake-up call for ___?", zh: "能预约……点的叫醒服务吗？", note: "酒店特色服务；也可说 Can I get a wake-up call?" },
    },
    {
      npcLines: [
        "Of course — wake-up call at 6:30 tomorrow morning, confirmed! Is this the right room number, 1208?",
        "Done! 6:30 a.m. wake-up call for Room 1208 — that's correct, yes?",
        "You got it — 6:30 tomorrow, Room 1208. Confirm?",
      ],
      npcZh: "当然——明早 6:30 叫醒服务已确认！房号是 1208 对吧？",
      task: "确认房号，顺便问洗衣服务",
      options: [
        { text: "Yes, that's correct. By the way, do you have a laundry service?", ok: true,  tip: "laundry service 洗衣服务，长住酒店必备" },
        { text: "Room number yes right. Clothes wash service have?",             ok: false, tip: "说 Do you have a laundry service?" },
        { text: "Correct. My shirt dirty need clean fast tomorrow.",             ok: false, tip: "先问服务：Do you have a laundry service?" },
      ],
      phrase: { en: "Do you have a ___ service?", zh: "你们提供……服务吗？", note: "问服务万能模板：洗衣/送餐/寄存都能套" },
    },
    {
      npcLines: [
        "We do! Same-day service if you drop off before 9 a.m. Just leave the bag outside your door.",
        "Yes indeed! Same-day laundry if it's in by 9 a.m. Bag goes outside your door.",
        "Sure do! Before 9 a.m. means same-day. Just hang the bag on your door handle.",
      ],
      npcZh: "有的！早上 9 点前送洗可当日完成。把洗衣袋放门外即可。",
      task: "确认洗衣袋位置和费用",
      options: [
        { text: "Perfect. Where can I find the laundry bag, and how much does it cost?", ok: true,  tip: "连问两件事：Where can I find...? + How much?" },
        { text: "Bag where is it money how much cost?",                                 ok: false, tip: "拆成两句问：Where can I find the bag? How much is it?" },
        { text: "Free washing or must pay price?",                                      ok: false, tip: "问全需求：Where's the bag and how much?" },
      ],
      phrase: { en: "Where can I find ___?", zh: "……在哪里能找到？", note: "找东西万能句，酒店任何物品都能问" },
    },
    {
      npcLines: [
        "The laundry bag and price list are in your closet. Shirts are $3 each, for example.",
        "Check your closet — bag and full price list are in there. Shirts run $3 apiece.",
        "Both are hanging in your closet! And just so you know, shirts are three bucks each.",
      ],
      npcZh: "洗衣袋和价目表在您的衣柜里。比如衬衫一件 3 美元。",
      task: "接受价格，决定送洗两件衬衫",
      options: [
        { text: "That's reasonable. I'll send two shirts tomorrow morning. Thanks!", ok: true,  tip: "That's reasonable 价格公道——评价价格的地道说法" },
        { text: "Three dollar too expensive my shirt!",                             ok: false, tip: "接受市场价即可：I'll send two shirts" },
        { text: "Okay two shirt wash wash tomorrow yes.",                            ok: false, tip: "更自然：I'll send two shirts tomorrow morning" },
      ],
      phrase: { en: "That's reasonable.", zh: "价格挺合理", note: "对价格表示接受的常用语；嫌贵则说 That's a bit steep" },
      adds: [{ emoji: "👕", label: "Laundry ×2", badge: true }],
    },
    {
      npcLines: [
        "Sounds good! By the way, breakfast is served until 10:30 on weekdays. Would you like me to note that down for your 6:30 wake-up?",
        "Great! Oh — weekday breakfast runs till 10:30. Want me to add that reminder to your wake-up call?",
        "Perfect! Quick tip: breakfast wraps at 10:30 on weekdays. Should I mention it during your wake-up call?",
      ],
      npcZh: "好的！对了，工作日早餐供应到 10:30。需要我在叫醒电话里加一句提醒吗？",
      task: "接受贴心提醒，顺便问早餐位置",
      options: [
        { text: "Yes, please! And where is the breakfast served?", ok: true,  tip: "Yes, please 接受 + Where is...? 追问，连环沟通" },
        { text: "Breakfast where is eat place at?",                ok: false, tip: "说 Where is breakfast served?" },
        { text: "Reminder good but I sleep more maybe skip.",      ok: false, tip: "顺势问位置：Where is breakfast served?" },
      ],
      phrase: { en: "Where is breakfast served?", zh: "早餐在哪儿吃？", note: "be served 被供应——问餐厅/服务地点的正式说法" },
    },
    {
      npcLines: [
        "In the Crystal Restaurant, second floor. Enjoy your stay — and your early breakfast!",
        "Second floor, Crystal Restaurant. Enjoy — and good luck with that early morning!",
        "Crystal Restaurant on two. Have a wonderful stay — see you at breakfast, maybe!",
      ],
      npcZh: "二楼水晶餐厅。祝您入住愉快——早餐也吃得开心！",
      task: "感谢全方位服务，收尾",
      options: [
        { text: "You've been super helpful. Thanks for everything!", ok: true,  tip: "You've been super helpful 对服务的综合致谢，收尾金句" },
        { text: "Okay bye many questions I ask sorry.",              ok: false, tip: "不用抱歉，大方致谢：You've been super helpful" },
        { text: "Thanks. This hotel is okay good fine.",             ok: false, tip: "更热情一点：Thanks for everything!" },
      ],
      phrase: { en: "You've been super helpful.", zh: "你帮了大忙", note: "综合致谢金句：问题越多，这句越值钱" },
    },
  ],
},
