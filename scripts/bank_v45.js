// 银行 v4：支票、信用分与银行文化（功能位④文化潜规则）
{
  id: "v4",
  title: "第 4 次光顾 · 支票与信用分",
  titleEn: "Checks & Credit Score",
  emoji: "🧾",
  desc: "收到人生第一张支票？信用分是什么、为什么重要？美国银行文化深潜。",
  reward: { en: "statement", zh: "你解锁了银行文化知识，支票信用分不再神秘！🧾" },
  steps: [
    {
      npcLines: [
        "Good afternoon! What brings you in today — deposits, withdrawals, questions?",
        "Hi there! What can I do for you on this lovely afternoon?",
        "Afternoon! Deposit window's open. What do you need?",
      ],
      npcZh: "下午好！今天来办什么——存款、取款，还是咨询？",
      task: "说明来意：收到一张支票，不会处理",
      options: [
        { text: "Hi! I received a check for the first time, and I'm not sure how to deposit it. Could you help me?", ok: true,  tip: "received a check 收到支票 + not sure how to 委婉求助" },
        { text: "Paper money but not money. Confusing paper. Fix it.", ok: false, tip: "说 I received a check — how do I deposit it?" },
        { text: "Someone gave me strange paper bank thing.",      ok: false, tip: "支票就是 check：I received a check — could you help me?" },
      ],
      phrase: { en: "I'm not sure how to ___.", zh: "我不太清楚怎么……。", note: "万能求助开头——先暴露问题再求助，对方立刻明白" },
    },
    {
      npcLines: [
        "Of course! First thing: endorse it — sign your name on the back, right on that line. Then I'll take it from you.",
        "Easy! Step one: flip it over and sign the back — that's called endorsing. Then hand it over!",
        "Happy to help! First, endorse the check — your signature on the back. Then we're in business!",
      ],
      npcZh: "当然！第一步：背书——在支票背面那条线上签您的名字。然后交给我就可以。",
      task: "完成背书并提交",
      options: [
        { text: "Got it — signing the back now. Here you go.",    ok: true,  tip: "endorse = 背书（支票背面签名）；Got it 表示听懂指令" },
        { text: "Sign front? Sign back? I sign everywhere, all paper!", ok: false, tip: "只签背面：signing the back now" },
        { text: "Why sign? The money knows it's mine.",           ok: false, tip: "背书是转让所有权的手续：sign the back" },
      ],
      phrase: { en: "endorse the check", zh: "背书支票（在背面签名）", note: "支票入账第一步；不背书的支票不能存" },
    },
    {
      npcLines: [
        "Perfect. Funds will be available in two business days. Oh — since you're new here, can I ask: do you know about credit scores?",
        "All set — two business days and it's in your account. Say, quick question: familiar with credit scores?",
        "Done! Two business days to clear. By the way — has anyone explained credit scores to you yet?",
      ],
      npcZh: "完美。资金两个工作日到账。对了——您是新客户，问一下：您了解信用分吗？",
      task: "表示听说过但不了解，请教重要性",
      options: [
        { text: "I've heard the term, but why does it matter so much here?", ok: true,  tip: "I've heard the term 听说过这个词 + Why does it matter? 问重要性" },
        { text: "Credit score? Score for what game?",           ok: false, tip: "虚心请教：I've heard the term, but why does it matter?" },
        { text: "Numbers about me? I refuse all numbers.",       ok: false, tip: "信用分影响租房贷款：Why does it matter so much?" },
      ],
      phrase: { en: "Why does it matter?", zh: "它为什么重要？", note: "理解文化概念的切入口；matter = 要紧、重要" },
    },
    {
      npcLines: [
        "It's like a financial report card! A good score means lower interest on loans, better credit cards, easier apartment approvals. Range is three hundred to eight fifty.",
        "Think of it as a money GPA! High score — cheap loans, fancy cards, landlords love you. It runs from three hundred to eight fifty.",
        "Your financial reputation in numbers! Good score unlocks low interest and easy approvals. Scale: three hundred to eight fifty.",
      ],
      npcZh: "它就像一份财务成绩单！分数高意味着贷款利率低、信用卡更好、租房审批更容易。范围是 300 到 850。",
      task: "追问如何建立信用分",
      options: [
        { text: "That makes sense. How do I build a good score as a beginner?", ok: true,  tip: "build a score 建立信用 + as a beginner 新手身份求具体建议" },
        { text: "Give me maximum score now, I ask nicely.",       ok: false, tip: "信用靠积累：How do I build a good score?" },
        { text: "Three hundred is plenty. Done learning.",        ok: false, tip: "低分处处受限：How do I build a good score?" },
      ],
      phrase: { en: "How do I build a good score?", zh: "我怎么能建立好信用？", note: "信用分核心问法——新手建立信用从此问开始" },
    },
    {
      npcLines: [
        "Three golden rules: pay every bill on time, keep card balances low, and don't apply for too many cards at once. Time does the rest!",
        "The recipe: on-time payments, low balances, few applications. Let it simmer for a few years — perfect score stew!",
        "Simple math: pay on time, spend under your limit, apply rarely. Six months of history and you're on the board!",
      ],
      npcZh: "三条黄金法则：按时还款、刷卡额度保持低位、别一次申请太多卡。剩下的交给时间！",
      task: "复述确认三条法则",
      options: [
        { text: "So: pay on time, keep balances low, and don't apply for too many cards. Got it!", ok: true,  tip: "复述三要点确认理解——银行柜员会欣赏认真听的客户" },
        { text: "Pay sometimes, spend maximum, cards for everyone!", ok: false, tip: "复述要准确：Pay on time, keep balances low, don't apply too many" },
        { text: "Rules one and three I keep. Rule two is optional probably.", ok: false, tip: "三条都要：复述全部——pay on time, low balances, few applications" },
      ],
      phrase: { en: "Pay on time, keep balances low.", zh: "按时还款，保持低欠款。", note: "信用分两大支柱；记住这两条已赢过大多数人" },
    },
    {
      npcLines: [
        "Exactly right — you learn fast! Your check will clear Thursday. Anything else for you today?",
        "Nailed it! You're a natural. Check clears Thursday. More questions, or are we all set?",
        "Perfect summary! Thursday, funds land. What else can I do for you?",
      ],
      npcZh: "完全正确——你学得真快！您的支票周四到账。今天还有别的需要吗？",
      task: "感谢讲解，结束业务",
      options: [
        { text: "That's all — thank you for explaining everything so clearly!", ok: true,  tip: "explaining everything so clearly 夸讲解清楚，对乐于分享者的最佳回馈" },
        { text: "Bye! Money numbers knowledge man!",                ok: false, tip: "具体感谢：Thank you for explaining everything so clearly!" },
        { text: "Finally done. Longest bank visit of my life.",     ok: false, tip: "学到知识值得感谢：Thank you for explaining so clearly!" },
      ],
      phrase: { en: "Thanks for explaining everything so clearly!", zh: "谢谢你讲解得这么清楚！", note: "对教学式服务的真诚致谢——clearly 是关键词" },
    },
  ],
},
// 银行 v5：国际汇款（功能位⑥难度分层，B1）
{
  id: "v5",
  title: "第 5 次光顾 · 国际汇款",
  titleEn: "International Transfer",
  emoji: "🌍",
  desc: "给家里汇学费？国际转账全流程：汇率、手续费、到账时间、汇款单——进阶金融英语。",
  reward: { en: "transfer", zh: "你解锁了国际汇款英语，跨国打钱不踩坑！🌍" },
  steps: [
    {
      npcLines: [
        "Welcome back! What can I do for you today?",
        "Hey, good to see you again! What's on the agenda?",
        "Back again! What do you need today?",
      ],
      npcZh: "欢迎回来！今天有什么可以帮您？",
      task: "说明要给家里国际汇款 2000 美元",
      options: [
        { text: "Hi! I'd like to make an international transfer of two thousand dollars to my family in China.", ok: true, tip: "international transfer 国际汇款 + 具体金额与收款地区" },
        { text: "Send money far away to family. Two thousand.",     ok: false, tip: "说清业务类型：I'd like to make an international transfer of..." },
        { text: "Money must travel to China immediately.",          ok: false, tip: "标准说法：an international transfer of two thousand dollars" },
      ],
      phrase: { en: "I'd like to make an international transfer.", zh: "我想办一笔国际汇款。", note: "international transfer = 国际汇款/转账；make a transfer 固定搭配" },
    },
    {
      npcLines: [
        "Sure, we can do that. I'll need the recipient's full name, account number, and the SWIFT code of their bank.",
        "No problem! For international wires I need: recipient's name, their account number, and the SWIFT code.",
        "Absolutely. Three things: full name of the recipient, account number, SWIFT code of the receiving bank.",
      ],
      npcZh: "可以办理。我需要收款人全名、账号，以及对方银行的 SWIFT 码。",
      task: "提供信息，但不知道什么是 SWIFT 码",
      options: [
        { text: "I have the name and account number here. What's a SWIFT code, exactly — where do I find it?", ok: true, tip: "What's a SWIFT code exactly + where do I find it 两连问，精准补盲" },
        { text: "SWIFT? Fast code? Bank runs fast?",               ok: false, tip: "直接问：What's a SWIFT code, and where do I find it?" },
        { text: "No SWIFT. Only slow codes available.",            ok: false, tip: "SWIFT 是银行识别码：Where do I find it?" },
      ],
      phrase: { en: "What's a ___, exactly?", zh: "……到底是什么？", note: "exactly 强调精确定义；问术语的标准句式" },
    },
    {
      npcLines: [
        "It's the bank's international ID code — eight to eleven letters and numbers. Your family can ask their bank, or find it on the bank's website.",
        "SWIFT is the bank's global ID — like a postal code for banks! Ask the receiving bank, or check their website.",
        "Think of it as the bank's passport number. The recipient's bank can provide it — usually on their website too.",
      ],
      npcZh: "这是银行的国际识别码——8 到 11 位字母数字。您的家人可以问他们的银行，或上银行官网查。",
      task: "理解后表示需要联系家人获取",
      options: [
        { text: "I see — I'll message my family to get it. Should I come back with all the details, or can I start the transfer online?", ok: true, tip: "message my family 联系家人 + online 线上办理，流程规划意识" },
        { text: "Family sleeping now. You guess the code?",         ok: false, tip: "SWIFT 必须准确：I'll message my family to get it" },
        { text: "Website? No. Human bank only for me forever.",     ok: false, tip: "线上办理更方便：Can I start the transfer online?" },
      ],
      phrase: { en: "I'll get back to you with the details.", zh: "我拿到详细信息再来找你。", note: "业务暂停标准句——信息不齐时体面离场" },
    },
    {
      npcLines: [
        "Online works great — the app has an international transfer section. Before you go, let's talk fees: fifteen dollars per wire, plus the exchange rate margin.",
        "The app's your friend — look for 'International Transfers'. Quick heads-up on cost: fifteen per wire, plus a small margin on the exchange rate.",
        "App all the way! Now, about fees: fifteen dollars flat, and we take a tiny percentage on the currency exchange.",
      ],
      npcZh: "线上办理很好——APP 里有国际汇款专区。走之前说说费用：每笔汇款 15 美元，外加汇率差价。",
      task: "追问汇率差价是什么意思",
      options: [
        { text: "Could you explain the exchange rate margin? How much would my family actually receive in RMB?", ok: true, tip: "exchange rate margin 汇率差价 + actually receive 实际到账，抓住核心" },
        { text: "Margin? Like notebook paper margin?",            ok: false, tip: "margin 此处指差价：Could you explain the exchange rate margin?" },
        { text: "Fees fine. Just send all money now fast.",        ok: false, tip: "到账金额要问清：How much would they actually receive?" },
      ],
      phrase: { en: "How much would they actually receive?", zh: "他们实际能收到多少？", note: "汇款必问——费用+汇率差之后，实到金额才是真相" },
    },
    {
      npcLines: [
        "Good question! Today's rate means two thousand dollars converts to about fourteen thousand two hundred RMB. Your family should see it in one to three business days.",
        "Let's see — two thousand converts to roughly fourteen thousand two hundred RMB at today's rate. Arrival: one to three business days.",
        "At today's rate: around fourteen-two hundred RMB. Business days to arrive: one to three. Any other questions?",
      ],
      npcZh: "问得好！按今天汇率，2000 美元约合 14200 元人民币。您的家人 1-3 个工作日内应能收到。",
      task: "确认到账时间并核对信息重要性",
      options: [
        { text: "That works. I'll double-check all the details before submitting — one wrong number and the money could go astray.", ok: true, tip: "double-check 反复核对 + go astray 钱款走失，汇款安全意识" },
        { text: "Numbers, schmumbers. Send first, fix later.",     ok: false, tip: "汇款信息错=钱到陌生人账上：Double-check all the details" },
        { text: "One to three days? Carrier pigeon is faster.",    ok: false, tip: "国际汇款时效正常：I'll double-check before submitting" },
      ],
      phrase: { en: "I'll double-check the details.", zh: "我会再核对一遍信息。", note: "double-check = 复核；汇款前必做，一个数字都不能错" },
    },
    {
      npcLines: [
        "Wise words — you're a careful one, and that's exactly right for international banking. The app will show a confirmation page before anything sends. Good luck!",
        "Careful customers are my favorite! The app double-checks with you too — nothing sends without a confirmation screen. Take care!",
        "That's the spirit! The app asks you to confirm everything before it goes through. Safe travels to your money!",
      ],
      npcZh: "明智的话——你很细心，这正是国际银行业务需要的品质。APP 发送前会显示确认页。祝顺利！",
      task: "感谢柜员，结束本轮",
      options: [
        { text: "Thank you for walking me through everything — this was really helpful!", ok: true,  tip: "walk me through 领着我一步步讲——感谢细致服务的地道说法" },
        { text: "OK money talk finished. Exit bank.",              ok: false, tip: "感谢讲解：Thank you for walking me through everything!" },
        { text: "You did adequate job. Goodbye.",                   ok: false, tip: "真诚一点：This was really helpful!" },
      ],
      phrase: { en: "Thanks for walking me through it.", zh: "谢谢你一步步带我弄明白。", note: "walk sb through = 手把手讲解；感谢耐心指导的地道表达" },
    },
  ],
},
