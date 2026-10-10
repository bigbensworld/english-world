    {
      id: "v3",
      title: "第 3 次光顾 · 银行卡出问题了",
      titleEn: "Card Trouble",
      emoji: "🚨",
      desc: "刷卡被拒、卡被吞、发现可疑交易？银行卡出状况时，冷静+准确描述问题的应急英语。",
      reward: { en: "freeze the card", zh: "你解锁了银行卡应急英语，卡出问题不慌！🚨➡️😌" },
      steps: [
        {
          npcLines: [
            "Bank hotline, this is Sarah speaking. How can I help you?",
            "Thanks for calling First City Bank — Sarah here. What seems to be the problem?",
            "Good evening, this is Sarah from the bank's help line. What can I do for you?",
          ],
          npcZh: "银行热线，我是 Sarah。有什么可以帮您？",
          task: "描述问题：网上支付时刷卡被拒",
          options: [
            { text: "Hi, my debit card was declined when I tried to pay online. It worked fine yesterday.", ok: true, tip: "My card was declined 卡被拒了 + It worked fine yesterday 提供关键信息" },
            { text: "Card broken! Website mean to me!",            ok: false, tip: "准确描述：My card was declined when I tried to pay online" },
            { text: "Your bank hates me. Card no work.",           ok: false, tip: "陈述事实不指责：My card was declined" },
          ],
          phrase: { en: "My card was declined.", zh: "我的卡被拒了。", note: "declined = 被拒绝（银行/商家用语），不是 broken" },
        },
        {
          npcLines: [
            "I'm sorry to hear that! Let me check your account... Hmm, it says here the card was blocked by our security system.",
            "Oh no! Give me a second to pull up your account... Interesting — security flagged and blocked your card.",
            "Sorry about that! Checking now... Ah, I see it: our fraud system blocked the card this morning.",
          ],
          npcZh: "很抱歉！让我查一下您的账户……嗯，这里显示您的卡被我们的安全系统拦截了。",
          task: "想知道原因，询问如何解冻",
          options: [
            { text: "I see. Why was it blocked, and how can I unblock it?", ok: true,  tip: "unblock 解冻 + 直接问原因和解决方案" },
            { text: "Unblock now please. I am angry customer.",     ok: false, tip: "先了解原因：Why was it blocked, and how can I unblock it?" },
            { text: "Security? I am not criminal! Apologize!",      ok: false, tip: "风控拦截是保护机制：冷静问 Why was it blocked?" },
          ],
          phrase: { en: "Why was it blocked?", zh: "为什么被拦截了？", note: "blocked = 被冻结/拦截；问清原因再解决" },
        },
        {
          npcLines: [
            "There was a suspicious charge from another country — ninety-nine dollars from a store you've never used. Did you make that purchase?",
            "We caught a fishy transaction: ninety-nine dollars, overseas merchant, first-time store. Was that you?",
            "Here's the issue — a ninety-nine-dollar charge from abroad at a store you've never shopped at. Sound familiar?",
          ],
          npcZh: "有一笔来自其他国家的可疑扣款——一家您从没用过的商店扣了 99 美元。这笔消费是您本人操作吗？",
          task: "否认消费，确认这是欺诈",
          options: [
            { text: "No, that wasn't me! I've never heard of that store. I think that's fraud — what should I do?", ok: true, tip: "That wasn't me 明确否认 + fraud 欺诈 + What should I do? 求方案" },
            { text: "Ninety-nine dollars? Maybe? I buy many things.", ok: false, tip: "不确定时核实：That wasn't me — I've never heard of that store" },
            { text: "Yes was me! Wait... no... maybe... yes?",       ok: false, tip: "欺诈处理最忌含糊：No, that wasn't me!" },
          ],
          phrase: { en: "That wasn't me — I think it's fraud.", zh: "那不是我——我觉得是欺诈。", note: "fraud = 欺诈；盗刷处理第一步：明确否认" },
        },
        {
          npcLines: [
            "Thank you for confirming. I'll freeze the card right away so no more charges can go through. Then we'll issue you a new card.",
            "Got it — freezing your card this second! Nothing else can touch your money. New card's on the way.",
            "Perfect. Card frozen as we speak. Let's get a replacement card sent out to you today.",
          ],
          npcZh: "感谢确认。我马上冻结该卡，防止更多扣款。然后给您补发一张新卡。",
          task: "询问被盗款项能否追回",
          options: [
            { text: "Thank you. Will I get the ninety-nine dollars back? It was fraud, after all.", ok: true, tip: "get the money back 追回款项——盗刷维权关键问题" },
            { text: "New card fast. Money also new. Refund all now.", ok: false, tip: "准确提问：Will I get the ninety-nine dollars back?" },
            { text: "Don't care about money, just make card work.",  ok: false, tip: "盗刷款项可争议退款：Will I get it back?" },
          ],
          phrase: { en: "Will I get my money back?", zh: "我的钱能退回来吗？", note: "盗刷维权核心句；银行有争议处理流程（dispute）" },
        },
        {
          npcLines: [
            "Yes — we'll open a dispute for that charge, and most fraud cases are refunded within ten business days.",
            "You'll get it back! We file a dispute today; refunds usually land within ten business days.",
            "Absolutely. I'm opening the dispute now — expect the refund in about ten business days.",
          ],
          npcZh: "会的——我们会为那笔扣款发起争议处理，多数欺诈案件在 10 个工作日内退款。",
          task: "确认新卡邮寄时间",
          options: [
            { text: "That's a relief. When will the new card arrive, and how do I activate it?", ok: true,  tip: "That's a relief 松了口气 + activate the card 激活新卡" },
            { text: "Ten days too slow! Money now now now!",         ok: false, tip: "流程已有明确时限：When will the new card arrive?" },
            { text: "Activate? Cards activate themselves, obviously.", ok: false, tip: "新卡需激活：How do I activate it?" },
          ],
          phrase: { en: "How do I activate it?", zh: "怎么激活它？", note: "新卡到手先激活（activate）：APP 或电话都能办" },
        },
        {
          npcLines: [
            "The card arrives in five to seven days — activate it right in our app. Is there anything else I can help you with today?",
            "Five to seven business days for the card, and activation takes one tap in the app. Anything else for you?",
            "Expect it within a week — app activation, super easy. Any other questions before you go?",
          ],
          npcZh: "新卡 5-7 天寄到——直接在 APP 里激活。今天还有其他需要帮助的吗？",
          task: "感谢客服，结束通话",
          options: [
            { text: "You've been a huge help. Thanks for handling this so quickly — goodbye!", ok: true, tip: "You've been a huge help + 匆匆收尾，电话道别用 goodbye" },
            { text: "Bye Sarah! You get promotion, I decide this.", ok: false, tip: "真诚致谢即可：You've been a huge help!" },
            { text: "Click. Done talking.",                          ok: false, tip: "电话礼貌收尾：Thanks for handling this so quickly — goodbye!" },
          ],
          phrase: { en: "Thanks for handling this so quickly.", zh: "谢谢你这么快就处理好了。", note: "对客服/柜员的高频致谢；handle = 处理" },
        },
      ],
    },
  ],
},
