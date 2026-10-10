  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 办卡与参观",
      titleEn: "Membership & Tour",
      emoji: "💳",
      desc: "第一次走进健身房：问价格、免费体验、参观器械区、签合同——办卡全流程。",
      reward: { en: "membership", zh: "你办好了健身卡，新生活开始了！🏋️" },
      steps: [
        {
          npcLines: [
            "Welcome to Iron Paradise! Looking to join, or just checking us out?",
            "Hey there, welcome! Are you here to sign up, or just browsing?",
            "Hi! First time at Iron Paradise? Joining us today or just looking around?",
          ],
          npcZh: "欢迎来到铁馆天堂！是想入会，还是先看看？",
          task: "询问会员价格与套餐选项",
          options: [
            { text: "Hi! I'm interested in joining. Could you tell me about your membership options and prices?", ok: true,  tip: "interested in joining 表达意向 + membership options and prices 问套餐与价格" },
            { text: "How much money for muscle place?", ok: false, tip: "说 I'm interested in joining. What are the membership options?" },
            { text: "Give me cheapest body. Price of cheapest body.", ok: false, tip: "标准问法：membership options and prices" },
          ],
          phrase: { en: "I'm interested in joining.", zh: "我有兴趣入会。", note: "interested in + 动名词——表达意向不承诺，进可攻退可守" },
        },
        {
          npcLines: [
            "Sure! We have monthly at forty bucks, or annual at three-sixty — that's like getting three months free. Want the full tour before deciding?",
            "Great! Monthly is forty, annual is three-sixty — three months free, basically. Shall I show you around first?",
            "Here's the deal: forty a month, or three-sixty a year. Tour first? Decision after — that's my motto!",
          ],
          npcZh: "当然！月卡 40 美元，年卡 360——相当于白送三个月。决定前先来个全程参观？",
          task: "接受参观，同时确认有无隐藏费用",
          options: [
            { text: "A tour sounds great. Are there any extra fees beyond the membership — like enrollment or cancellation fees?", ok: true,  tip: "enrollment fee 注册费 + cancellation fee 取消费——办卡防坑两问" },
            { text: "Tour yes. Fees no. Only membership price forever.", ok: false, tip: "先问清：Any extra fees — enrollment or cancellation?" },
            { text: "Three months free? Free things scare me.", ok: false, tip: "合理核实条款：Are there any extra fees?" },
          ],
          phrase: { en: "Are there any extra fees?", zh: "还有其他额外费用吗？", note: "办任何卡的第一问—— enrollment/cancellation 都要问" },
        },
        {
          npcLines: [
            "No enrollment fee this month — promotion! Cancellation needs thirty days' notice, no penalty. Now, the tour: cardio upstairs, weights down here.",
            "Zero enrollment this month — it's promo season! Cancel anytime with thirty days' notice. Okay: cardio's up top, weights are down here!",
            "This month: no enrollment fee! Thirty-day notice to cancel, that's it. Tour time — follow me, cardio first!",
          ],
          npcZh: "本月免注册费——促销期！取消需提前 30 天通知，无违约金。好，参观：楼上有氧，楼下力量区。",
          task: "参观时询问器械使用是否需要预约",
          options: [
            { text: "Nice! Do I need to book the equipment in advance, or is it first come, first served?", ok: true,  tip: "book in advance 提前预约 + first come, first served 先到先得" },
            { text: "Machines fight for? I fight machine for turn?", ok: false, tip: "问规则：Do I need to book in advance?" },
            { text: "Book equipment? Machines have calendars now?", ok: false, tip: "高峰期可能要等：Is it first come, first served?" },
          ],
          phrase: { en: "first come, first served", zh: "先到先得。", note: "资源分配高频表达；健身房、餐厅、商店通用" },
        },
        {
          npcLines: [
            "No booking needed — first come, first served. Peak hours are five to seven, so come earlier if you hate waiting! And yes, towel service is included.",
            "Just show up and hop on! Rush hour is five to seven — early birds win. Oh, and towels are on us!",
            "No reservations here — fastest feet win! Five to seven is madness, come at lunch instead. Towels? Included!",
          ],
          npcZh: "不需要预约——先到先得。高峰是 5 点到 7 点，不想排队就早点来！毛巾服务包含在内。",
          task: "询问储物柜与淋浴设施",
          options: [
            { text: "Good to know. What about lockers and showers — do I need to bring my own lock?", ok: true,  tip: "bring my own lock 自带锁——健身房储物柜经典问题" },
            { text: "Locker? I will guard bag with my body.", ok: false, tip: "有储物柜：What about lockers — my own lock?" },
            { text: "Shower at gym? I shower at home only, forever.", ok: false, tip: "问清设施：What about lockers and showers?" },
          ],
          phrase: { en: "Do I need to bring my own lock?", zh: "我需要自己带锁吗？", note: "自备 vs 提供——健身房/青旅通用问句" },
        },
        {
          npcLines: [
            "Lockers are free with digital codes — no lock needed! Showers have shampoo and soap. So, are you ready to sign up?",
            "Digital locks, fresh towels, shower stuff — we thought of everything! Ready to make it official?",
            "Keypad lockers, all shower supplies — you just bring you! So — shall we do paperwork?",
          ],
          npcZh: "储物柜免费，数字密码锁——不用自带锁！淋浴间有洗发水和沐浴露。那么，准备好签约入会了吗？",
          task: "先要一次免费体验再决定",
          options: [
            { text: "Almost! Could I try a free trial session first? I'd like to feel the place before committing.", ok: true,  tip: "free trial session 免费体验 + before committing 承诺之前——理性决策" },
            { text: "Yes sign now! No thinking! Paper fast!",       ok: false, tip: "先体验：Could I try a free trial session first?" },
            { text: "Committing? I fear commitment and treadmills.", ok: false, tip: "体验降低决策压力：before committing" },
          ],
          phrase: { en: "Could I try a free trial first?", zh: "我能先免费体验一次吗？", note: "trial = 试用；大额消费前的标准缓冲动作" },
        },
        {
          npcLines: [
            "Smart shopper — one-day free trial, no strings attached! Here's your guest pass. See you tomorrow?",
            "I respect that! Day pass on the house, no commitment. Tomorrow, same time?",
            "Trial it is! Guest pass for one full day. Come break a sweat and then decide!",
          ],
          npcZh: "精明的顾客——一天免费体验，无任何附加条件！这是您的体验券。明天见？",
          task: "感谢并确认明天来体验",
          options: [
            { text: "Perfect, thank you! I'll come tomorrow morning. See you then!", ok: true,  tip: "确认时间（tomorrow morning）+ See you then 预约式道别" },
            { text: "Tomorrow maybe. Or next year. Time is mystery.", ok: false, tip: "定下具体时间：Tomorrow morning — see you then!" },
            { text: "Guest pass received. Departing now.",           ok: false, tip: "收尾确认：I'll come tomorrow morning. See you then!" },
          ],
          phrase: { en: "See you then!", zh: "到时候见！", note: "约好时间后的道别；then = 刚约定的那个时间" },
        },
      ],
    },
