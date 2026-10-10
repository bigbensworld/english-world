    {
      id: "v3",
      title: "第 3 次光顾 · 会员问题与私教",
      titleEn: "Membership Issues & Trainer",
      emoji: "📋",
      desc: "出差两个月想冻结会员？高峰期卧推被占？想请私教？健身房进阶事务英语。",
      reward: { en: "personal trainer", zh: "你解锁了健身房进阶英语，会员私教都能搞定！📋" },
      steps: [
        {
          npcLines: [
            "Hey, familiar face! What can I do for you today — workout stuff or account stuff?",
            "Welcome back! Are we lifting today, or is this an admin day?",
            "Hi again! Gym time or paperwork time?",
          ],
          npcZh: "嘿，熟面孔！今天办什么——训练还是账户业务？",
          task: "说明要出差，想冻结会员两个月",
          options: [
            { text: "Account stuff, actually. I'm traveling for two months — could I freeze my membership while I'm away?", ok: true,  tip: "freeze my membership 冻结会员（暂停计费）——出差旅行必备" },
            { text: "Travel two months. Membership sleep time, please.", ok: false, tip: "准确说法：Could I freeze my membership?" },
            { text: "I leave. You stop charging. This is fair deal.",  ok: false, tip: "有正式流程：Could I freeze my membership while I'm away?" },
          ],
          phrase: { en: "Could I freeze my membership?", zh: "我能冻结会员吗？", note: "freeze = 暂停不取消；多数健身房每月可冻结 1-3 个月" },
        },
        {
          npcLines: [
            "Absolutely — we can freeze up to three months a year, just ten bucks a month while frozen. Want me to set that up?",
            "You bet! Up to three months a year, ten dollars monthly freeze fee. Shall I?",
            "No problem — three months max per year, ten a month to freeze. Good to go?",
          ],
          npcZh: "当然——每年最多可冻结三个月，冻结期间每月 10 美元。要我现在帮您设置吗？",
          task: "确认冻结，顺便问恢复手续",
          options: [
            { text: "That works. When I come back, do I just unfreeze it, or do I need to do anything?", ok: true,  tip: "unfreeze 解冻 + or do I need to do anything 问全流程" },
            { text: "Freeze now. Unfreeze is future problem.",       ok: false, tip: "问清恢复流程：Do I just unfreeze it?" },
            { text: "Ten dollars to NOT use gym? Bold business model.", ok: false, tip: "行业惯例，确认即可：That works. How do I unfreeze it?" },
          ],
          phrase: { en: "Do I need to do anything?", zh: "我还需要做什么吗？", note: "流程确认收尾句——防隐藏步骤" },
        },
        {
          npcLines: [
            "Just message us when you're back — one click on my end and you're active again! Now, anything else? You look like you want to ask something.",
            "Shoot me a text when you return — reactivation takes ten seconds! What else is on your mind? I sense a question...",
            "Ping us and you're back in business! Okay, spill it — you've got trainer questions, don't you?",
          ],
          npcZh: "回来时给我们发个消息——我这边一键激活！还有别的吗？您看起来有问题想问。",
          task: "询问私教服务的价格与内容",
          options: [
            { text: "You read my mind! I'm thinking about a personal trainer. What do the sessions cost, and what's included?", ok: true,  tip: "You read my mind 你猜到我了 + what's included 问包含内容" },
            { text: "Personal trainer! Muscles rental price?",       ok: false, tip: "问价格与服务：What do sessions cost, and what's included?" },
            { text: "Yes question. But now shy. Forget question.",   ok: false, tip: "直接问：What do the sessions cost?" },
          ],
          phrase: { en: "You read my mind!", zh: "你猜到我心坎里了！", note: "对方抢先说出你想说的话时的幽默回应" },
        },
        {
          npcLines: [
            "Sessions are fifty each, or a package of ten for four-fifty. That includes a custom plan, form checks, and nutrition basics. First session's half off!",
            "Fifty a session, or ten for four-fifty — plan, form coaching, nutrition guide included. First one's fifty percent off!",
            "Single: fifty. Ten-pack: four-fifty. Custom plan, form fixes, food wisdom — and your first session is half price!",
          ],
          npcZh: "单节课 50 美元，10 节套餐 450。含定制计划、动作纠正和营养建议。首节课半价！",
          task: "先约一节体验课试试",
          options: [
            { text: "Let me start with one session at the intro price. If we click, I'll consider the package.", ok: true,  tip: "intro price 体验价 + if we click 如果合得来——先试后买" },
            { text: "Package of ten. No trial. Maximum commitment.", ok: false, tip: "先试一节：Let me start with one session first" },
            { text: "Half price is suspicious price. Why half?",     ok: false, tip: "首单优惠是行业惯例：One session at the intro price, please" },
          ],
          phrase: { en: "If we click, I'll consider it.", zh: "如果合得来，我会考虑的。", note: "click = 合拍（人与人）；进可攻退可守的表态" },
        },
        {
          npcLines: [
            "Fair enough — intro session Saturday at ten with Coach Alex. Oh, one heads-up for your regular workouts: the bench press gets busy around six.",
            "Deal! Saturday, ten a.m., Coach Alex. Quick tip: skip six p.m. on the bench — chaos hour!",
            "Booked! Saturday ten, Coach Alex. Pro tip: bench press at six p.m. is a battlefield. Come earlier!",
          ],
          npcZh: "合理——周六上午 10 点，Alex 教练的体验课。对了，提醒一句：卧推架 6 点左右很抢手。",
          task: "询问器械被占时的礼貌做法",
          options: [
            { text: "Good to know. If the equipment is taken, is it okay to ask to work in, or should I just wait?", ok: true,  tip: "work in 轮流共用器械——健身房重要社交礼仪" },
            { text: "If taken, I take by force. Gym law.",          ok: false, tip: "礼貌询问：Is it okay to ask to work in?" },
            { text: "Wait forever? I wait like furniture?",         ok: false, tip: "可以轮换用：Is it okay to ask to work in?" },
          ],
          phrase: { en: "Can I work in?", zh: "我能跟你轮流用吗？", note: "work in = 组间轮换共用器械；健身房最实用社交句" },
        },
        {
          npcLines: [
            "Working in is totally fine — just ask between their sets, and re-rack your weights after! That's gym etiquette 101. See you Saturday!",
            "Asking to work in is normal — between sets, be friendly, rack your weights! Etiquette gold. Saturday it is!",
            "Work in away! Ask between sets, wipe down, re-rack — that's all the rules. See you Saturday, champ!",
          ],
          npcZh: "轮流用完全没问题——在别人组间问就行，用完把杠铃片归位！这是健身房礼仪第一课。周六见！",
          task: "复述健身房礼仪要点，结束",
          options: [
            { text: "Got it: ask between sets, wipe down the equipment, and re-rack the weights. See you Saturday!", ok: true,  tip: "复述礼仪三件套（ask/wipe/re-rack）——健身房文明人认证" },
            { text: "Rules memorized. Partially. Some rules.",       ok: false, tip: "礼仪要点复述完整：ask between sets, wipe down, re-rack" },
            { text: "Wipe equipment? I spread germs for friendship.", ok: false, tip: "擦器械是基本礼仪：Wipe down the equipment" },
          ],
          phrase: { en: "re-rack your weights", zh: "把器械归位。", note: "re-rack = 放回架子；健身房最看重的公德" },
        },
      ],
    },
  ],
},
