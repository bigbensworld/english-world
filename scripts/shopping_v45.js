// 网购 v4：包裹丢失投诉（功能位③出错意外）
{
  id: "v4",
  title: "第 4 次光顾 · 包裹去哪了",
  titleEn: "Lost Package",
  emoji: "🕵️",
  desc: "物流显示已签收，但家门口什么都没有？追踪、申诉、索赔——包裹失踪全流程。",
  reward: { en: "track my order", zh: "你解锁了包裹追踪索赔英语！🕵️" },
  steps: [
    {
      npcLines: [
        "ShoeTop support, this is Alex. How can I help?",
        "Hi, Alex from ShoeTop! What's going on today?",
        "Thanks for contacting us — Alex here. What's the trouble?",
      ],
      npcZh: "ShoeTop 客服，我是 Alex。有什么可以帮您？",
      task: "描述问题：显示已送达但没收到",
      options: [
        { text: "Hi Alex. My tracking says 'delivered,' but there's no package at my door. I've checked everywhere.", ok: true,  tip: "tracking says delivered 物流显示已签收 + I've checked everywhere 已排除自身原因" },
        { text: "Tracking lies! Package ghost! Help!",         ok: false, tip: "说清矛盾点：Tracking says delivered, but there's no package" },
        { text: "Package missing. I blame the mailman personally.", ok: false, tip: "先陈述事实：Tracking says delivered but no package at my door" },
      ],
      phrase: { en: "My tracking says delivered, but...", zh: "物流显示已签收，但是……", note: "丢件申诉开场白——先摆出系统与现实的矛盾" },
    },
    {
      npcLines: [
        "That's frustrating, let me look... The carrier marked it delivered at 2:15 p.m. to your front door. Did anyone else in your household pick it up?",
        "Ugh, that's the worst! System says 2:15 p.m. delivery to your front door. Anyone at home who might've grabbed it?",
        "Let me check... carrier scanned it 'delivered, front door, 2:15 p.m.' Housemates or family grab it, maybe?",
      ],
      npcZh: "真让人恼火，我查查……承运方标记下午 2:15 送达您前门。家里有其他人签收了吗？",
      task: "排除家人签收，请求查司机 GPS 记录",
      options: [
        { text: "No one else was home. Could you check with the carrier for the GPS delivery photo? Most services take one.", ok: true,  tip: "GPS delivery photo 签收拍照——丢件核实的标准动作" },
        { text: "Family? My cat maybe. Ask cat.",         ok: false, tip: "请求核实：Could you check for the GPS delivery photo?" },
        { text: "Trust me, no package. Skip investigation, pay me now.", ok: false, tip: "走核实流程更快：Check with the carrier for the delivery photo" },
      ],
      phrase: { en: "Could you check with the carrier?", zh: "能和承运方核实一下吗？", note: "carrier = 承运公司（UPS/FedEx 等）；核实是索赔前提" },
    },
    {
      npcLines: [
        "Good thinking — I'll open a claim with the carrier... Oh no. The photo shows it was delivered to number 42, not your number 24. Wrong address!",
        "Claim opened with the carrier... Uh oh. The proof-of-delivery photo shows house 42 — you're 24! Misdelivered!",
        "Checking the GPS photo now... Yikes. That's house number 42's porch, not yours. The driver misdelivered!",
      ],
      npcZh: "好主意——我向承运方发起核查……哦不。照片显示包裹送到了 42 号，不是您的 24 号。送错地址了！",
      task: "询问如何取回送错的包裹",
      options: [
        { text: "That explains it! What happens now — will the carrier retrieve it, or should I go to number 42 myself?", ok: true,  tip: "retrieve it 取回 + or should I myself 分工确认" },
        { text: "Neighbor thief! I confront neighbor with evidence!", ok: false, tip: "先确认流程：Will the carrier retrieve it?" },
        { text: "House 42 is far. Send new shoes to house 42 as backup.", ok: false, tip: "分工确认：Will the carrier retrieve it, or should I go?" },
      ],
      phrase: { en: "What happens now?", zh: "接下来怎么办？", note: "问题定性后的标准追问——把流程主动权交给专业方" },
    },
    {
      npcLines: [
        "The carrier will attempt retrieval within 48 hours. If they can't get it back, we'll ship a replacement to you immediately — free of charge, of course.",
        "Carrier retrieval within 48 hours. If that fails? Replacement ships same-day, on us. You're covered either way!",
        "Retrieval attempt within two days. No luck? Instant free replacement. We've got your back!",
      ],
      npcZh: "承运方会在 48 小时内尝试取回。如果取不回，我们立即免费给您补发。",
      task: "确认补发的到货时间",
      options: [
        { text: "Good. If a replacement is needed, how long would shipping take? I need the shoes for a trip next Friday.", ok: true,  tip: "说明时间约束（for a trip next Friday）——让客服按 deadline 给方案" },
        { text: "Friday trip! Shoes must arrive Thursday! Or Wednesday! Or NOW!", ok: false, tip: "给出约束即可：I need them for a trip next Friday" },
        { text: "No rush. Trip can wait for shoes.",             ok: false, tip: "说清 deadline：For a trip next Friday" },
      ],
      phrase: { en: "I need it by ___.", zh: "我最晚……需要它。", note: "时间约束句——客户服务最有效的加急理由" },
    },
    {
      npcLines: [
        "Next Friday? Cutting it close with standard shipping... Let me upgrade it — if we ship the replacement, it'll arrive Wednesday. Deal?",
        "Friday deadline, eh? Standard won't make it. I'll bump you to express — Wednesday arrival. Sound good?",
        "I'll make it work — express shipping on the replacement, landing Wednesday. That beat your Friday by two days!",
      ],
      npcZh: "下周五？普通快递有点悬……我给您升级——如果补发，周三就能到。可以吗？",
      task: "接受方案并感谢客服",
      options: [
        { text: "That works perfectly — thank you for going the extra mile, Alex!", ok: true,  tip: "go the extra mile 多走一英里（额外用心）——对超出预期的服务的专属夸赞" },
        { text: "Wednesday fine. Standard gratitude applied.",   ok: false, tip: "真诚致谢：You went the extra mile!" },
        { text: "Finally! Took forever. Everything is your fault, Alex.", ok: false, tip: "对方已尽力补救：Thank you for going the extra mile!" },
      ],
      phrase: { en: "go the extra mile", zh: "格外用心，超出预期。", note: "服务超出预期时的最高评价；也可说 go above and beyond" },
    },
    {
      npcLines: [
        "My pleasure! I'll email you the claim number and the replacement plan. Fingers crossed the carrier retrieves it — enjoy your trip!",
        "Happy to help! Claim number and full plan are in your inbox. Good luck, and safe travels!",
        "Anytime! Email incoming with your claim number. Here's hoping 42 returns what's yours — have a great trip!",
      ],
      npcZh: "乐意效劳！我会把核查编号和补发方案发您邮箱。祈祷承运方取回包裹——旅途愉快！",
      task: "确认后续跟进方式",
      options: [
        { text: "Thanks! If I don't hear back in 48 hours, should I contact you again, or will you update me?", ok: true,  tip: "确认跟进机制（谁找谁）——客服收尾必问，防石沉大海" },
        { text: "48 hours then I shout into void repeatedly.",  ok: false, tip: "约定跟进机制：Should I contact you, or will you update me?" },
        { text: "No updates needed. I enjoy suspense.",         ok: false, tip: "明确跟进：Who contacts whom, and when?" },
      ],
      phrase: { en: "Should I contact you, or will you update me?", zh: "是我再联系你，还是你来更新我？", note: "售后跟进双通道确认——避免互相等待的扯皮" },
    },
  ],
},
// 网购 v5：评价与售后文化（功能位④文化潜规则）
{
  id: "v5",
  title: "第 5 次光顾 · 评价与售后文化",
  titleEn: "Reviews & After-Sales",
  emoji: "⭐",
  desc: "客服请你写好评？差评会不会被拉黑？退货太多次会怎样？网购评价文化的潜规则。",
  reward: { en: "leave a review", zh: "你解锁了网购评价文化，买家等级再次提升！⭐" },
  steps: [
    {
      npcLines: [
        "Hi again! Remember me — Alex from the lost package saga? How were the shoes? Did they make it before your trip?",
        "Hey, it's Alex! Package hero of last week! Did the shoes arrive in time for the trip?",
        "Well well, if it isn't my favorite customer! Shoes arrive okay? Trip go well?",
      ],
      npcZh: "又见面啦！还记得我吗——丢件事件里的 Alex。鞋怎么样？赶上周五出行了吗？",
      task: "确认鞋到了，回应客服的关心",
      options: [
        { text: "Alex! Yes, they arrived Wednesday and survived the whole trip. Perfect timing — thanks again!", ok: true,  tip: "survived the trip 经受住旅行考验（幽默）+ 点名感谢" },
        { text: "Shoes came. Trip came. Life came. Fine.",     ok: false, tip: "具体+幽默：They survived the whole trip!" },
        { text: "Shoes OK. Barely remember you though.",       ok: false, tip: "记得对方并致谢：Thanks again, Alex!" },
      ],
      phrase: { en: "Perfect timing!", zh: "来得正是时候！", note: "对准时到达的人/物的称赞；timing = 时机" },
    },
    {
      npcLines: [
        "That's what I love to hear! Hey, quick favor to ask — would you leave a review? Honestly, five stars would make my whole month!",
        "Music to my ears! Okay, awkward ask: could you leave a review? Five stars would genuinely make my month!",
        "Best news ever! Small ask from your friendly agent — a review? Five stars makes my quarter, honestly!",
      ],
      npcZh: "这话我爱听！对了，想请你帮个小忙——能写条评价吗？说真的，五星好评能让我开心一整月！",
      task: "询问评价是否影响客服绩效",
      options: [
        { text: "Happy to help! Does the review mention you by name? I've heard ratings affect support agents.", ok: true,  tip: "mention you by name 点名提及 + affect support agents 影响客服绩效——问清规则再写" },
        { text: "Five stars for money? What compensation for review?", ok: false, tip: "有偿好评违反平台规则：Does the rating affect you?" },
        { text: "Reviews affect nothing. I review randomly like weather.", ok: false, tip: "绩效确实相关：Do ratings affect support agents?" },
      ],
      phrase: { en: "Does it affect you?", zh: "这会影响你吗？", note: "问清规则再行动——评价文化第一课" },
    },
    {
      npcLines: [
        "You've done your homework! Yes — if you mention my name in a positive review, it counts toward my performance. But only if it's genuine! No pressure!",
        "Smart shopper! Named positive reviews do count for us. But genuine only — I'd rather have an honest four stars than a fake five!",
        "Full marks for research! Name mentions in good reviews help my score. Real feedback only, though — honesty first!",
      ],
      npcZh: "你做足功课了！是的——好评里提到我的名字会算进我的绩效。但必须真实！没有压力！",
      task: "请教怎样写有用的评价",
      options: [
        { text: "Understood, and it'll be genuine! What makes a review actually helpful — details about sizing, fit, that kind of thing?", ok: true,  tip: "what makes a review helpful 什么让评价有用——从写手视角问标准" },
        { text: "Helpful review = longest review. I write novel.", ok: false, tip: "有用≠最长：What details make it helpful?" },
        { text: "I write only: good shoes. Five words, five stars.", ok: false, tip: "具体信息才有用：Sizing, fit, that kind of detail?" },
      ],
      phrase: { en: "What makes it helpful?", zh: "什么才算有用？", note: "helpful 是电商评价的核心指标（点赞数）——具体细节 > 泛泛好评" },
    },
    {
      npcLines: [
        "Exactly — sizing notes are gold! 'Runs small, size up half' helps a thousand future buyers. Photos too! And honestly, mention what could be better — that helps us improve.",
        "Sizing details are treasure! 'Runs small, order up' saves future shoppers. Photos rock! And critique helps us grow — bring it!",
        "Fit notes = review gold! 'Runs small, size up' guides everyone. Pics are great, and honest criticism helps us fix things!",
      ],
      npcZh: "完全正确——尺码信息是金子！\"偏小，建议买大半码\"能帮一千个后来的买家。照片也是！说真的，也可以写不足之处——帮我们改进。",
      task: "追问差评文化",
      options: [
        { text: "Good to know. What about negative reviews — do companies ever retaliate, like refusing future returns?", ok: true,  tip: "negative reviews 差评 + retaliate 报复——潜规则里最敏感的问题" },
        { text: "Bad review = ban hammer? Truth or myth?",       ok: false, tip: "问潜规则：Do companies retaliate against negative reviewers?" },
        { text: "I only write good reviews out of fear anyway.",  ok: false, tip: "值得问清：Do companies retaliate?" },
      ],
      phrase: { en: "What about negative reviews?", zh: "那差评呢？", note: "What about...? 话题切换万能句——探索文化另一面" },
    },
    {
      npcLines: [
        "Legitimate criticism is protected — no retaliation, that's illegal in most places. But here's the real talk: return too often, like every order, and accounts do get flagged. Fair use, fair reviews!",
        "Honest bad reviews are safe — retaliating is actually illegal! The real gray zone: extreme return rates get accounts flagged. Be reasonable and you're golden!",
        "Real criticism: totally protected, retaliation's illegal! One gray area — serial returners get flagged. Normal shopping? Zero risk!",
      ],
      npcZh: "合理的批评受保护——报复是违法的。但说点实话：退货太频繁（比如每单都退）账户确实会被标记。合理使用、真实评价就好！",
      task: "总结学到的评价文化",
      options: [
        { text: "Makes sense: be honest, be specific, and don't abuse returns. I'll write my review tonight — sizing notes included!", ok: true,  tip: "总结三原则（honest/specific/fair use）+ 承诺行动（tonight）" },
        { text: "Summary: reviews complicated, me tired, goodbye.", ok: false, tip: "总结原则：Be honest, be specific, don't abuse returns" },
        { text: "Tonight? I will write review in year 2030 maybe.", ok: false, tip: "行动承诺：I'll write it tonight" },
      ],
      phrase: { en: "Be honest, be specific.", zh: "真实，具体。", note: "好评价的两大支柱——真实 + 细节（尺码/版型/使用场景）" },
    },
    {
      npcLines: [
        "Sizing notes included — you're basically a professional reviewer now! It's been a pleasure helping you through the whole saga: wrong item, lost package, and now this!",
        "From wrong item to lost package to review advice — we've been through a lot together! You're ready for professional reviewer status!",
        "Our whole journey — wrong shoes, vanishing packages, review culture! You've earned honorary reviewer status. Pleasure's all mine!",
      ],
      npcZh: "还带尺码说明——你已经是专业评审员了！很荣幸陪你走过整个故事线：发错货、丢包裹，还有现在！",
      task: "幽默回应『三段式购物史诗』，结束",
      options: [
        { text: "Haha, what a saga — wrong shoes, lost package, and cultural enlightenment! You've been great through all of it, Alex.", ok: true,  tip: "回顾三段旅程（幽默）+ 肯定对方全程表现——关系升华式收尾" },
        { text: "Saga complete. Shopping life now empty. Farewell.", ok: false, tip: "幽默+感谢：You've been great through all of it!" },
        { text: "I rate this conversation: three stars. Room for improvement.", ok: false, tip: "满分收尾：You've been great through all of it, Alex!" },
      ],
      phrase: { en: "You've been great through all of it.", zh: "这一路你都很给力。", note: "through all of it = 贯穿全程——对长期服务关系的完整致谢" },
    },
  ],
},
