// 理发店 v4：剪坏了与投诉（功能位③出错意外）
{
  id: "v4",
  title: "第 4 次光顾 · 剪坏了怎么办",
  titleEn: "Bad Haircut Fix",
  emoji: "😱",
  desc: "剪得比说好的短太多！怎么礼貌而坚定地投诉？免费修复、折扣、退款——维权英语实战。",
  reward: { en: "stylist", zh: "你解锁了投诉维权英语，剪坏了也不慌！😱➡️😌" },
  steps: [
    {
      npcLines: [
        "Welcome in! How was your — oh. Oh no. That's... that's a lot shorter than you asked for, isn't it?",
        "Hi, welcome ba— um. Wow. That's quite a bit shorter than we discussed, isn't it?",
        "Hey! How's the new— ...Okay, I see the problem. That's much shorter than a trim!",
      ],
      npcZh: "欢迎光临！您的头发怎么——哦，天哪。这……比您要求的短太多了，对吧？",
      task: "冷静指出问题：上周剪的比说好的短很多",
      options: [
        { text: "Yes, exactly. I asked for half an inch off, but it's more like three inches. I'd like to talk about how to fix this.", ok: true, tip: "陈述事实（asked for vs 实际）+ I'd like to talk about 引出解决方案——冷静维权三段式" },
        { text: "You people ruined my head! Hair crimes!",         ok: false, tip: "愤怒解决不了问题：陈述事实 + I'd like to talk about how to fix this" },
        { text: "It's fine probably. Hair is hair. Whatever.",     ok: false, tip: "有诉求要表达：I asked for half an inch, but it's three inches" },
      ],
      phrase: { en: "I'd like to talk about how to fix this.", zh: "我想谈谈怎么解决。", note: "维权黄金句——聚焦解决，不指责不压抑" },
    },
    {
      npcLines: [
        "You're absolutely right, and I'm so sorry. That's on us. Let me make this right — the manager can offer options.",
        "No argument here — we messed up, and I apologize. Let me get the manager to sort this out properly.",
        "Completely fair complaint. This was our mistake. I'll grab the manager — we take this seriously.",
      ],
      npcZh: "您完全正确，非常抱歉。这是我们的错。让我来补救——经理可以提供解决方案。",
      task: "听取经理的解决方案选项",
      options: [
        { text: "Thank you. What options do we have? I'd like to understand everything before deciding.", ok: true, tip: "What options do we have? 问全部选项——决策前信息完整" },
        { text: "Options? Only one option: new head!",            ok: false, tip: "听清方案再决定：What options do we have?" },
        { text: "Decide fast, I have no time for process.",       ok: false, tip: "了解全部选项再拍板：I'd like to understand everything first" },
      ],
      phrase: { en: "What options do we have?", zh: "我们有哪些选择？", note: "维权万能问句——让对方摊开所有方案" },
    },
    {
      npcLines: [
        "Here's what I can offer: a free corrective styling session today, plus fifty percent off your next three visits. Or a full refund for today's cut.",
        "Two paths: free restyle right now plus half off your next three cuts — or a complete refund for today.",
        "I can do a corrective restyle free of charge, three future cuts at half price, or your money back for today. Your call!",
      ],
      npcZh: "我能提供：今天免费修型 + 下三次剪发五折；或者今天这次全额退款。",
      task: "权衡后选择免费修型+折扣方案",
      options: [
        { text: "I'll take the corrective styling and the discount — but I'd like a different stylist this time, if possible.", ok: true, tip: "接受方案 + 附加合理请求（换发型师）——谈判进阶" },
        { text: "Refund! All money! Then free styling too!",       ok: false, tip: "方案二选一：I'll take the corrective styling and the discount" },
        { text: "Same stylist again? Sure why not, fourth time lucky.", ok: false, tip: "合理提出换人：A different stylist this time, if possible" },
      ],
      phrase: { en: "I'll take ___, if possible.", zh: "如果可以的话，我选……。", note: "if possible 让请求柔和；选方案+提请求一步完成" },
    },
    {
      npcLines: [
        "Absolutely — Maria's colleague Ben will handle the restyle. He's our senior stylist. Ben, this is our VIP today!",
        "Of course! Ben, our senior, will take over from here. Treat this gentleman like royalty!",
        "Done — Ben's the best we've got, and he owes me a favor! Take good care of this one!",
      ],
      npcZh: "没问题——Maria 的同事 Ben 来修型，他是我们的高级发型师。Ben，这位是今天的贵宾！",
      task: "向新发型师说明修型期望",
      options: [
        { text: "Thanks! My goal is to even out the sides so it grows back neatly. What can we do in the meantime?", ok: true, tip: "even out 修齐 + grows back 留回来 + in the meantime 过渡期——长线思维表达" },
        { text: "Fix everything. Make hair time machine, go back last week.", ok: false, tip: "现实目标：Even out the sides so it grows back neatly" },
        { text: "Just do your magic. No instructions needed.",      ok: false, tip: "说清期望避免二次翻车：My goal is to even out the sides" },
      ],
      phrase: { en: "so it grows back neatly", zh: "这样留长回来才整齐", note: "坏发型修复思路：不追求立刻完美，为留长发铺路" },
    },
    {
      npcLines: [
        "Smart approach — I'll clean up the sides and shape the top so it all blends as it grows. You'll look sharp in three weeks, great in six.",
        "Good thinking! Tidy sides, blended top — in three weeks you'll look sharp, and in six, fantastic.",
        "That's the pro move. I'll blend everything — sharp at three weeks, magazine cover at six!",
      ],
      npcZh: "聪明的思路——我会把两侧修干净、把顶部塑形，让它长的时候整体过渡。三周后您会很精神，六周后更好。",
      task: "询问过渡期怎么打理",
      options: [
        { text: "Sounds like a plan. Any tips for styling it during the awkward growing-out phase?", ok: true,  tip: "awkward growing-out phase 尴尬留长期 + Any tips for styling 求造型建议" },
        { text: "Awkward phase? My hair and I are never awkward.",  ok: false, tip: "留长期人人尴尬：Any tips for the growing-out phase?" },
        { text: "Three weeks? I will wear hat forever.",            ok: false, tip: "有更好的办法：Any styling tips for the awkward phase?" },
      ],
      phrase: { en: "the awkward growing-out phase", zh: "尴尬的留长过渡期", note: "发型过渡期地道说法；awkward = 尴尬的" },
    },
    {
      npcLines: [
        "Hat is honestly option B! Option A: a little styling cream, brush it forward, own the look. Confidence is the best hairstyle!",
        "Hats work, but try this first: styling cream, brush forward, walk tall. Confidence covers a multitude of bad cuts!",
        "Keep the hat handy, but lead with cream-and-confidence! Nobody questions a man who owns his hair!",
      ],
      npcZh: "帽子确实是 B 计划！A 计划：一点造型膏、往前刷、自信地走出去。自信就是最好的发型！",
      task: "幽默回应，感谢两位的处理",
      options: [
        { text: "Haha, cream and confidence — I love it. Thank you both for turning this around today!", ok: true,  tip: "接住幽默（cream and confidence）+ turning this around 扭转局面，感谢收尾" },
        { text: "Confidence cannot be purchased. Neither can hair.", ok: false, tip: "接住幽默：Cream and confidence — I love it!" },
        { text: "Yes. Adequate service. Leaving now.",              ok: false, tip: "幽默+感谢收尾：Thank you for turning this around!" },
      ],
      phrase: { en: "Thanks for turning this around.", zh: "谢谢你们扭转了局面。", note: "turn around = 扭转；对危机处理结果的致谢" },
    },
  ],
},
// 理发店 v5：小费与沙龙文化（功能位④文化潜规则）
{
  id: "v5",
  title: "第 5 次光顾 · 小费与沙龙文化",
  titleEn: "Tipping & Salon Culture",
  emoji: "💵",
  desc: "理发要给小费吗？给多少？洗头小工和发型师分开给？美发沙龙文化潜规则全解。",
  reward: { en: "styling product", zh: "你解锁了沙龙文化，做头发不再是小白！💵" },
  steps: [
    {
      npcLines: [
        "Welcome back, member! Big day today — color, cut, treatment, the works?",
        "Hey, there's our member! Going all out today — color and cut and everything?",
        "Look who it is! Full works today? Color, cut, the whole experience?",
      ],
      npcZh: "欢迎回来，会员！今天大工程——染发、剪发、护理，全套？",
      task: "确认全套服务，顺带请教小费规矩",
      options: [
        { text: "The works! By the way — I never know the tipping etiquette here. Is it different from restaurants?", ok: true,  tip: "tipping etiquette 小费礼仪 + Is it different from...? 对比提问" },
        { text: "All services! Also explain all money rules of your country.", ok: false, tip: "聚焦一个问题：What's the tipping etiquette here?" },
        { text: "Tip? At hair place? I thought only restaurants!",   ok: false, tip: "确实有美发小费文化：What's the tipping etiquette here?" },
      ],
      phrase: { en: "What's the tipping etiquette?", zh: "小费礼仪是怎样的？", note: "etiquette = 礼仪；问规矩的地道说法" },
    },
    {
      npcLines: [
        "Great question! For haircuts, fifteen to twenty percent like restaurants. For the full works — color, treatment — people usually tip twenty percent or more.",
        "Love that you asked! Simple cut: fifteen to twenty percent. Big services like color? Twenty percent plus is the norm.",
        "Standard stuff: cuts are fifteen to twenty percent. Color and treatments run higher — twenty or more feels right.",
      ],
      npcZh: "问得好！剪发跟餐厅一样 15%-20%。全套服务——染发、护理——通常给 20% 或更多。",
      task: "追问多服务多人的情况",
      options: [
        { text: "What if multiple people work on me — say one shampoos and another cuts? Do I tip both?", ok: true,  tip: "multiple people 多人服务 + Do I tip both? 直击场景痛点" },
        { text: "Two workers? Two tips? Ten tips? Nobody knows!",    ok: false, tip: "问法：What if one person shampoos and another cuts?" },
        { text: "I will tip only the head hair person.",             ok: false, tip: "每个动手的人都该打赏：What if multiple people work on me?" },
      ],
      phrase: { en: "What if multiple people work on me?", zh: "如果多人服务我呢？", note: "What if...? 假设提问——探索文化规则的万能句" },
    },
    {
      npcLines: [
        "Perfect question! Yes — whoever shampoos gets three to five dollars, handed directly. The main stylist gets the percentage tip, usually cash or on the card.",
        "You're getting good at this! Shampoo person: three to five bucks, cash in hand. Stylist: your fifteen-to-twenty percent, card or cash.",
        "Yes! Small tip — three to five bucks — goes straight to the shampooer. The big percentage tip goes to your stylist!",
      ],
      npcZh: "完美的问题！是的——洗头的人直接给 3-5 美元现金。主发型师拿比例小费，现金或刷卡都行。",
      task: "确认刷卡时小费如何操作",
      options: [
        { text: "Got it — small cash tip for the shampooer, percentage for the stylist. If I pay by card, can I add both tips on the card?", ok: true, tip: "复述规则 + add tips on the card 刷卡加小费——落地操作" },
        { text: "Card machine tips automatically, yes? Robots handle all?", ok: false, tip: "需主动操作：Can I add both tips on the card?" },
        { text: "Cash only forever? I carry no cash ever.",         ok: false, tip: "刷卡也能加小费：Can I add the tip on the card?" },
      ],
      phrase: { en: "Can I add the tip on the card?", zh: "小费能刷卡吗？", note: "刷卡支付的小费问法；洗头小工最好备现金" },
    },
    {
      npcLines: [
        "The stylist's tip can go on the card, but the shampooer needs cash — they can't split card tips. There's an ATM two doors down if you need it!",
        "Card works for the stylist, cash for the shampooer — card tips don't trickle down! ATM's two doors down the street.",
        "Stylist on card, shampooer in cash — that's the system! There's an ATM nearby if you're short!",
      ],
      npcZh: "发型师的小费可以刷卡，但洗头小工需要现金——卡上小费没法分账。隔壁两家店就有 ATM！",
      task: "感谢提示，询问美国美发的其他潜规则",
      options: [
        { text: "Good to know — I'll get cash. Any other unwritten rules I should know about salons here?", ok: true,  tip: "Any other unwritten rules? 还有其他潜规则吗——文化深潜式提问" },
        { text: "Unwritten rules? Write them down and publish book!", ok: false, tip: "虚心请教：Any other unwritten rules I should know?" },
        { text: "Rules everywhere! Too many rules! I just want hair!", ok: false, tip: "多懂规则少尴尬：Any other unwritten rules?" },
      ],
      phrase: { en: "Any other unwritten rules?", zh: "还有其他不成文的规矩吗？", note: "unwritten rules = 潜规则；文化学习的万能深挖句" },
    },
    {
      npcLines: [
        "One big one: no-shows hurt! If you can't make it, call and cancel — even an hour ahead. Stylists work on commission, and a no-show is lost income.",
        "Biggest rule: cancel if you can't come — even last minute helps. We work on commission; empty chair equals empty wallet!",
        "The golden rule: never ghost your appointment! Call to cancel, however late. Our pay depends on butts in chairs!",
      ],
      npcZh: "有个大规矩：放鸽子最伤人！来不了就打电话取消——哪怕提前一小时都好。发型师靠提成吃饭，无人上门就是白丢收入。",
      task: "对预约文化表示认同，说明自己会提前通知",
      options: [
        { text: "That's totally fair — I'll always call if plans change. You're running a business, not a charity!", ok: true,  tip: "That's totally fair 认同规则 + running a business 换位理解" },
        { text: "I cancel by psychic power. Stylists sense it.",    ok: false, tip: "认真承诺：I'll always call if plans change" },
        { text: "Charity? I thought haircuts were free hugs!",       ok: false, tip: "理解对方立场：You're running a business" },
      ],
      phrase: { en: "That's totally fair.", zh: "这完全合理。", note: "认同规则/界限的标准回应；totally 加强语气" },
    },
    {
      npcLines: [
        "Haha, a customer who gets it — rare and beautiful! Alright, shampoo first, then color, then Ben works his magic. Enjoy the works!",
        "You're my favorite kind of customer! Let's get started — shampoo, color, then the Ben special. Enjoy every minute!",
        "Bless you, understanding customer! The full works begin now — sit back and enjoy the ride!",
      ],
      npcZh: "哈哈，懂事的客户——稀有又可爱！好，先洗头，再染色，然后 Ben 施展魔法。好好享受全套服务吧！",
      task: "幽默回应，开启服务",
      options: [
        { text: "Looking forward to it — I'll be the most well-tipped, well-coiffed customer you've had all week!", ok: true,  tip: "well-tipped 小费大方的 + well-coiffed 发型精致的——幽默双词自夸" },
        { text: "Yes. Begin hair process now.",                     ok: false, tip: "接住幽默：The most well-tipped, well-coiffed customer!" },
        { text: "Tipping talk again? I already agreed to tip!",     ok: false, tip: "轻松回应更得体：Looking forward to it!" },
      ],
      phrase: { en: "Looking forward to it!", zh: "很期待！", note: "服务开始前的积极回应；也可用于接受邀请" },
    },
  ],
},
