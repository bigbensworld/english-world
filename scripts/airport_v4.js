// 机场 第 4 轮：延误与改签（8 步）
{
  id: "v4",
  title: "第 4 次光顾 · 延误与改签",
  titleEn: "Delay & Rebooking",
  emoji: "⏰",
  desc: "航班延误了！怎么确认信息、改签下一班、要补偿餐券？把最糟心的时刻变成最从容的表现。",
  reward: { en: "rebook", zh: "你冷静搞定了延误改签，心态和英语都赢麻了！⏰" },
  steps: [
    {
      npcLines: [
        "Good afternoon! How can I help you today?",
        "Afternoon! What can I do for you?",
        "Hi there, what's going on? How can I help?",
      ],
      npcZh: "下午好！今天有什么可以帮您？",
      task: "询问你的航班是否延误（CA981）",
      options: [
        { text: "Hi, could you check if flight CA981 is on time?", ok: true,  tip: "Could you check...? 请人核查信息的万能句" },
        { text: "My plane CA981 late or not late?",                ok: false, tip: "说 Could you check if my flight is on time?" },
        { text: "Flight number is CA981 where is it now?",         ok: false, tip: "先问准点与否：Is it on time?" },
      ],
      phrase: { en: "Is my flight on time?", zh: "我的航班准点吗？", note: "on time 准点；延误直接说 delayed" },
    },
    {
      npcLines: [
        "I'm afraid CA981 has been delayed by three hours due to weather. I'm so sorry about that.",
        "Bad news, I'm afraid — CA981's running three hours late because of the weather. Sorry!",
        "Unfortunately yes, CA981 is delayed three hours for weather. Apologies for that.",
      ],
      npcZh: "恐怕 CA981 因天气原因延误了三小时。非常抱歉。",
      task: "确认新起飞时间，并问接下来怎么办",
      options: [
        { text: "Oh no. What's the new departure time? And what are my options?", ok: true,  tip: "What are my options? 我有哪些选择？——权益意识满分" },
        { text: "Three hours?! Give me money back now!",                        ok: false, tip: "先问清选项：What are my options?" },
        { text: "Weather delay bad luck. I wait here sit only.",                 ok: false, tip: "主动了解权益：What are my options?" },
      ],
      phrase: { en: "What are my options?", zh: "我有哪些选择？", note: "航班取消/延误时必问——改签、退票、补偿都要问出来" },
    },
    {
      npcLines: [
        "The new departure is 9:40 p.m. You can keep this flight, or I can rebook you on the 6:15 flight to the same city.",
        "New time is 9:40 p.m. You could keep it, or hop on the 6:15 to the same destination instead.",
        "You're looking at a 9:40 p.m. takeoff. Or — I can move you to the 6:15, same city.",
      ],
      npcZh: "新起飞时间是晚上 9:40。您可以继续等这班，或者我改签您到 6:15 飞同一城市的航班。",
      task: "选择改签到 6:15 的航班",
      options: [
        { text: "The 6:15 sounds much better. Could you rebook me on that one, please?", ok: true,  tip: "rebook 改签；Could you rebook me...? 改签标准句" },
        { text: "Early plane yes put me inside it.",                                   ok: false, tip: "说 Could you rebook me on that flight?" },
        { text: "6:15 airplane change my ticket do it fast.",                          ok: false, tip: "更礼貌：Could you rebook me on that one, please?" },
      ],
      phrase: { en: "Could you rebook me on ___?", zh: "能帮我改签到……吗？", note: "rebook = 重新预订；on 后接航班/日期" },
    },
    {
      npcLines: [
        "Done! You're now on the 6:15 flight, same seat assignment, window seat 21A. Here's your new boarding pass.",
        "All switched! 6:15 flight, keeping your window seat — 21A. New boarding pass, coming up!",
        "You're rebooked! 6:15 departure, seat 21A by the window still. Here you go!",
      ],
      npcZh: "改好了！您现在在 6:15 的航班上，座位不变，还是 21A 靠窗。这是您的新登机牌。",
      task: "收好新登机牌，询问延误补偿餐券",
      options: [
        { text: "Thank you! Since the delay was long, is there any meal voucher or compensation?", ok: true,  tip: "meal voucher 餐券；is there any compensation? 问补偿的礼貌版" },
        { text: "Free food give me, I am hungry now.",                                          ok: false, tip: "更专业：Is there a meal voucher or compensation?" },
        { text: "Delayed flight must pay me money yes?",                                        ok: false, tip: "先问有没有：Is there any compensation?" },
      ],
      phrase: { en: "Is there any compensation?", zh: "有补偿吗？", note: "compensation 补偿；餐券是 meal voucher，住宿券是 hotel voucher" },
    },
    {
      npcLines: [
        "Yes! Here's a $15 meal voucher for the airport restaurants — valid until 8 p.m. today.",
        "You bet! $15 meal voucher, good at any airport restaurant until 8 tonight.",
        "Sure! Here's $15 for food — any restaurant in the terminal, expires at 8 p.m.",
      ],
      npcZh: "有的！这是 15 美元餐券，机场餐厅通用，今天晚 8 点前有效。",
      task: "感谢并确认新登机口",
      options: [
        { text: "That's very kind. Which gate is the 6:15 flight departing from?", ok: true,  tip: "Which gate...? 确认登机口——改签后必问" },
        { text: "Gate number for new airplane tell me.",                          ok: false, tip: "说 Which gate is it departing from?" },
        { text: "Where my airplane door is at which number?",                      ok: false, tip: "更自然：Which gate is the flight departing from?" },
      ],
      phrase: { en: "Which gate is it departing from?", zh: "从哪个登机口出发？", note: "gate 登机口；改签后登机口常变，务必重新确认" },
      adds: [{ emoji: "🎫", label: "New Boarding Pass", wordId: "boardingpass" }],
    },
    {
      npcLines: [
        "Gate C22 — but heads up, gates can change, so keep an eye on the departure board. Boarding starts at 5:40.",
        "C22 is your gate! Fair warning: gates do shift, so watch the boards. Boarding at 5:40.",
        "You'll be at C22. Gates change sometimes though — check the departure screens. Boarding begins 5:40.",
      ],
      npcZh: "C22 登机口——但注意登机口可能变动，留意出发信息屏。5:40 开始登机。",
      task: "理解提醒，确认登机时间",
      options: [
        { text: "Got it — keep an eye on the board, boarding at 5:40. Thank you so much!", ok: true,  tip: "keep an eye on 留意——复述提醒确认理解" },
        { text: "Board what time again? I forget already sorry.",                        ok: false, tip: "复述要点：Boarding at 5:40, keep an eye on the board" },
        { text: "Screen watch yes. What is boarding board?",                             ok: false, tip: "departure board = 出发信息屏，复述一遍加深记忆" },
      ],
      phrase: { en: "Keep an eye on the board.", zh: "留意信息屏", note: "keep an eye on = 留意/盯着，机场/排队/等位都好用" },
    },
    {
      npcLines: [
        "You're welcome! Is there anything else I can help you with before your flight?",
        "Happy to help! Anything else you need tonight?",
        "My pleasure! Anything else before you head off?",
      ],
      npcZh: "不客气！登机前还有其他需要帮忙的吗？",
      task: "顺便问行李是否直挂（之前延误那班托运的）",
      options: [
        { text: "Yes — will my checked luggage be transferred to the new flight automatically?", ok: true,  tip: "transfer 转移；行李直挂问题改签后必问" },
        { text: "My bag old plane or new plane which one?",                                    ok: false, tip: "说 Will my luggage be transferred automatically?" },
        { text: "Suitcase worry lost. Where it goes now?",                                     ok: false, tip: "更专业：Will my checked luggage be transferred?" },
      ],
      phrase: { en: "Will my luggage be transferred?", zh: "我的行李会转运吗？", note: "改签后行李直挂问题，checked luggage 托运行李" },
    },
    {
      npcLines: [
        "Yes, your bags are already re-routed to the 6:15 flight. Everything's taken care of. Have a safe trip!",
        "All set — luggage's been moved to your new flight. Nothing to worry about. Safe travels!",
        "Yes indeed! Bags are on the 6:15 with you. All handled. Have a great flight!",
      ],
      npcZh: "会的，您的行李已改挂到 6:15 航班。一切都安排好了。祝您旅途平安！",
      task: "完整总结今天所学，道别",
      options: [
        { text: "Rebooked, voucher in hand, luggage sorted. You've been a huge help. Thank you!", ok: true,  tip: "三项总结确认 + 致谢——危机处理的完美收官" },
        { text: "Okay many things done bye now thank you.",                                    ok: false, tip: "列举成果更有力：Rebooked, voucher in hand, luggage sorted" },
        { text: "Finally finished. Worst day ever but okay.",                                  ok: false, tip: "正面收尾：You've been a huge help!" },
      ],
      phrase: { en: "Everything's taken care of.", zh: "一切都已经安排好了", note: "万事俱备的安心表达，听懂它=放心登机" },
    },
  ],
},
