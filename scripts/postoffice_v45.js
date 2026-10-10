// 邮局 v4：寄件出状况（功能位③出错意外）——丢件、破损、地址错误全链路维权
{
  id: "v4",
  title: "第 4 次光顾 · 寄件出状况",
  titleEn: "When Things Go Wrong",
  emoji: "🆘",
  desc: "追踪显示已签收但没收到？包裹被压破损？收件人地址写错？出错三连的处理英语。",
  reward: { en: "claim", zh: "你学会了用英文处理寄件事故，维权不慌！🆘" },
  steps: [
    {
      npcLines: [
        "Hi! You look worried — what can I do for you?",
        "Hello! What seems to be the problem today?",
        "Oh no, you don't look happy. How can I help?",
      ],
      npcZh: "您好！您看起来很着急——有什么可以帮您？",
      task: "说明问题：追踪显示已送达，但没收到包裹",
      options: [
        { text: "Hi. The tracking says my package was delivered, but I never received it.", ok: true, tip: "tracking says... was delivered 物流显示已送达 + I never received it 我从未收到——丢件投诉核心句" },
        { text: "My package is stolen! Call the police!",   ok: false, tip: "先陈述事实：tracking says delivered, but I never received it" },
        { text: "You lost my package. I want money now.",  ok: false, tip: "别先定责，先给事实：The tracking says delivered but..." },
      ],
      phrase: { en: "The tracking says ___, but ___.", zh: "物流显示……，但是……。", note: "用追踪信息做依据陈述矛盾——投诉的黄金句式" },
    },
    {
      npcLines: [
        "I'm sorry to hear that. Let me pull up the tracking... it shows delivered to your front door yesterday at 2 p.m.",
        "That's frustrating! Checking now... it says delivered, front door, yesterday at two.",
        "Oh no. Let me look... delivered yesterday at two p.m., left at the front door.",
      ],
      npcZh: "很抱歉听到这个。我调一下记录……显示昨天下午两点投递到您家门口。",
      task: "询问是否有可能投递错了地方",
      options: [
        { text: "Could it have been misdelivered? My neighbors sometimes get my mail.", ok: true, tip: "misdelivered 投递错误——比 it's wrong 更精准" },
        { text: "Maybe the mailman ate it?",                       ok: false, tip: "合理推测：Could it have been misdelivered?" },
        { text: "Check the cameras. Spy on everyone.",             ok: false, tip: "从邮局流程查起：misdelivered?" },
      ],
      phrase: { en: "Could it have been misdelivered?", zh: "有没有可能是投递错了？", note: "could have been = 对过去的推测；mis- 前缀 = 错误地" },
    },
    {
      npcLines: [
        "It happens. I'll file a search request with the carrier. Meanwhile — is there anything else going on?",
        "Possible! I'll start a mail search right away. Now, you mentioned another problem?",
        "Could be. I'll put in a search request. What else can I look at for you?",
      ],
      npcZh: "有这可能。我会向承运方提交查件请求。另外——您还有别的问题吗？",
      task: "提出第二个问题：朋友收到的包裹里东西碎了",
      options: [
        { text: "Yes — my friend received a package from me, but the contents arrived broken.", ok: true, tip: "the contents arrived broken 内件到货时已破损——破损投诉关键句" },
        { text: "Also my friend cried. The gift was destroyed.",   ok: false, tip: "描述事实：the contents arrived broken" },
        { text: "Package two is also problem package.",            ok: false, tip: "完整表达：the contents arrived broken" },
      ],
      phrase: { en: "It arrived broken/damaged.", zh: "东西到的时候就是破的/坏的。", note: "arrive + 形容词 = 到达时的状态；破损索赔第一句" },
    },
    {
      npcLines: [
        "Broken contents — that's a packing issue or rough handling. Was it insured?",
        "Oh dear. Was anything fragile inside? And did you insure the package?",
        "I see. Damaged in transit, then. Did you buy insurance for it?",
      ],
      npcZh: "内件破损——可能是包装问题或搬运粗暴。当时保价了吗？",
      task: "如实回答没保价，询问还能怎么办",
      options: [
        { text: "No, I didn't insure it. Is there anything I can still do?", ok: true, tip: "insure 保价 + Is there anything I can do? 询问补救——如实回答是前提" },
        { text: "Insure? Nobody offered me insurance!",           ok: false, tip: "先如实回答：No, I didn't insure it" },
        { text: "Just give me new gift, same but unbroken.",      ok: false, tip: "问补救途径：Is there anything I can still do?" },
      ],
      phrase: { en: "Is there anything I can do?", zh: "还有什么我能做的吗？", note: "出事后的万能求助句；柜台会据此给出选项" },
    },
    {
      npcLines: [
        "Without insurance, refunds are limited — but if the damage was our handling, we can review a claim. Do you have photos?",
        "No insurance means smaller payouts, but a damage claim is still possible. Got photos of the broken item?",
        "We can still file a claim for handling damage. Photos of everything, box included?",
      ],
      npcZh: "没保价的话赔偿有限——但如果是我们的搬运问题，可以审核理赔申请。您有照片吗？",
      task: "确认有照片，并问理赔流程",
      options: [
        { text: "Yes, I have photos of the broken item and the box. How do I file a claim?", ok: true, tip: "file a claim 提交理赔申请——破损+照片是理赔证据链" },
        { text: "Photos? I have memories and tears.",             ok: false, tip: "照片是关键证据：I have photos of the item and the box" },
        { text: "Claim is a word I don't know. Skip it.",         ok: false, tip: "问流程：How do I file a claim?" },
      ],
      phrase: { en: "How do I file a claim?", zh: "我要怎么提交理赔申请？", note: "claim /kleɪm/ 索赔；file = 正式提交" },
    },
    {
      npcLines: [
        "I'll print the claim form — attach photos, keep copies, and allow two weeks for review. Now, you said a third thing?",
        "Claim form coming up! Photos attached, two weeks to process. You mentioned one more issue?",
        "Here's the form. Photos, copies, two weeks. Okay — what was the last thing on your list?",
      ],
      npcZh: "我打印理赔表——附上照片、留好复印件、审核约两周。您刚才说还有第三件事？",
      task: "说明第三个问题：写错了收件人地址",
      options: [
        { text: "Yes — I wrote the wrong address on a letter I mailed yesterday. Can it be redirected?", ok: true, tip: "redirect 改投/转寄——寄出后改地址的标准说法" },
        { text: "My letter went to the wrong city. Bring it back!",  ok: false, tip: "寄出后用 redirect：Can it be redirected?" },
        { text: "I wrote a typo on the address. Undo it, please.",  ok: false, tip: "正式表达：wrote the wrong address, can it be redirected?" },
      ],
      phrase: { en: "Can it be redirected?", zh: "能改投到正确地址吗？", note: "redirect = 改址转投；比 change the address 更专业" },
    },
    {
      npcLines: [
        "If it hasn't been delivered yet, we can intercept and redirect it. There's a small fee. Want me to try?",
        "If it's still in transit, we can catch it and redirect — small fee though. Shall I?",
        "Depends where it is in the system. If it's not out for delivery, we can redirect for a small fee. Try?",
      ],
      npcZh: "如果还没投递，我们可以拦截并改投。需要一点手续费。要试试吗？",
      task: "同意付费拦截改投",
      options: [
        { text: "Yes, please try. How much is the fee?", ok: true,  tip: "先确认费用再同意——How much is the fee? 消费不糊涂" },
        { text: "Fee? After all these problems, everything should be free!", ok: false, tip: "费用该问就问：How much is the fee?" },
        { text: "No fee. I refuse all fees on principle.",  ok: false, tip: "付费服务先问价：Yes, please try. How much?" },
      ],
      phrase: { en: "How much is the fee?", zh: "手续费是多少？", note: "fee 服务费；问清再付，维权也要明明白白" },
    },
    {
      npcLines: [
        "One dollar twenty. I've entered the redirect request. Fingers crossed for all three fixes — anything else?",
        "A dollar twenty, and it's in. Let's hope all three work out. Anything more today?",
        "Buck twenty, done! Good luck with everything. One more thing before you go?",
      ],
      npcZh: "一美元二十美分。拦截请求已提交。祝三件事都顺利——还有其他吗？",
      task: "收尾确认三件事的处理状态",
      options: [
        { text: "So: a search request, a claim form, and a redirect. Did I get that right?", ok: true, tip: "复述确认三件事——收尾前钉死每个环节，办事核对黄金动作" },
        { text: "Wait, what did you do? Explain from the beginning.",  ok: false, tip: "简洁复述确认：a search request, a claim form, and a redirect" },
        { text: "Three problems, three shrugs. Goodbye forever.",      ok: false, tip: "礼貌收尾：Did I get that right?" },
      ],
      phrase: { en: "So: ___, ___, and ___ — did I get that right?", zh: "所以是：……、……、还有……——我理解得对吗？", note: "总结复述 + 确认——多件事一次办完的必备收尾" },
    },
  ],
},
// 邮局 v5：邮局文化与潜规则（功能位④文化潜规则）
{
  id: "v5",
  title: "第 5 次光顾 · 邮局文化课",
  titleEn: "Post Office Culture",
  emoji: "🎓",
  desc: "排队潜规则、节假日截件时间、邮寄地址格式、打包文化——老手不告诉你的门道。",
  reward: { en: "cut in line", zh: "你毕业了——邮局文化的隐藏规则全掌握！🎓" },
  steps: [
    {
      npcLines: [
        "Welcome back! Slow day — perfect time for a chat. What can I do for you?",
        "Hey, my favorite regular! Quiet in here today. What's up?",
        "Good afternoon! Not busy at all. What brings you in?",
      ],
      npcZh: "欢迎回来！今天不忙——正适合聊聊天。有什么可以帮您？",
      task: "询问邮局最忙的时段（潜规则：避开高峰）",
      options: [
        { text: "Just curious — when is the post office busiest? I'd love to avoid the crowds.", ok: true, tip: "avoid the crowds 避开人流——用提问掌握潜规则" },
        { text: "Tell me the secret hours with zero humans.",  ok: false, tip: "自然问法：When is it busiest? I'd love to avoid the crowds" },
        { text: "When do you close? I love empty buildings.",  ok: false, tip: "问高峰：When is the post office busiest?" },
      ],
      phrase: { en: "When is ___ the busiest?", zh: "……什么时候人最多？", note: "办事潜规则第一条：错峰。月初+午饭时间=人山人海" },
    },
    {
      npcLines: [
        "Lunch hour and the first week of the month — everyone mails bills then! Speaking of which, see that line? One guy tried to cut in today.",
        "Lunchtime and month-start, without fail. Oh — someone actually cut the line this morning!",
        "Noon and the first week of every month. And believe it or not, a guy tried to cut in just today.",
      ],
      npcZh: "午饭时间和每月第一周——大家都在那时寄账单！说到这个，看到那条队了吗？今天还有人想插队。",
      task: "询问插队在美国是什么严重的事",
      options: [
        { text: "Really? Is cutting in line a big deal here?", ok: true,  tip: "cut in line 插队（美式）；英式常说 jump the queue" },
        { text: "Line cutting is illegal? Call police?",       ok: false, tip: "不违法但很失礼：Is cutting in line a big deal?" },
        { text: "What is a line? We don't have lines.",        ok: false, tip: "文化差异点：cut in line 是公认的失礼行为" },
      ],
      phrase: { en: "cut in line / jump the queue", zh: "插队（美式/英式）", note: "在英美插队会收获全体侧目，比大声说话严重得多" },
    },
    {
      npcLines: [
        "Huge deal! People will call you out publicly. Anyway — mailing anything today, or just here for the culture lesson?",
        "Massive! Someone will absolutely say something. So — business today, or just chatting?",
        "Biggest deal there is. So what's the actual business today, my friend?",
      ],
      npcZh: "非常严重！会被人当众指出来。话说——今天要寄东西，还是纯来上文化课？",
      task: "正事：寄感恩节前必须到的包裹，问截止时间",
      options: [
        { text: "Both! I need this package to arrive before Thanksgiving. What's the cutoff date?", ok: true, tip: "cutoff (date) 截止时间——节日寄包裹必问" },
        { text: "Ship it before Thursday eating holiday.",       ok: false, tip: "专业问法：What's the cutoff date?" },
        { text: "Make it arrive before turkey day, thanks.",     ok: false, tip: "问截止日：What's the cutoff date for Thanksgiving?" },
      ],
      phrase: { en: "What's the cutoff date?", zh: "截止日期是哪天？", note: "cutoff = 截止；节日季邮局会公布官方 cutoff 日期" },
    },
    {
      npcLines: [
        "For Thanksgiving, ship by the Monday before — ground shipping. Express is safe until Wednesday morning. Now, is the address format right? Let me see.",
        "Ground by Monday, express by Wednesday morning — that's your window. Address check — mind if I peek?",
        "Monday for ground, Wednesday a.m. for express. Let me check that address before it goes out.",
      ],
      npcZh: "感恩节前到的话——普邮最晚下周一，快递周三上午前都稳。对了，地址格式对吗？我看看。",
      task: "学习美国地址格式的正确顺序",
      options: [
        { text: "Please check! I always mix up the order — name, street, city, then ZIP?", ok: true, tip: "美式地址从小到大：收件人→街道→城市+州+ZIP；ZIP 放最后" },
        { text: "ZIP first, then name, then city?",            ok: false, tip: "顺序反了：name → street → city, state ZIP" },
        { text: "I write the address as one long poem.",       ok: false, tip: "标准顺序：name, street, city, state, ZIP" },
      ],
      phrase: { en: "name → street → city, state ZIP", zh: "收件人 → 街道 → 城市、州 邮编", note: "美式地址从小到大，和中国相反；ZIP = Zone Improvement Plan" },
    },
    {
      npcLines: [
        "Exactly right — you're becoming a pro! Alright, do you want me to pack it, or did you bring your own box?",
        "Perfect order! So — our packing service, or your own box?",
        "That's the format! Now: our box, or yours?",
      ],
      npcZh: "完全正确——您快成专家了！好，需要我帮您打包，还是用您自己的箱子？",
      task: "用自己的箱子，但问胶带和填充物是否免费",
      options: [
        { text: "I have my own box. Is the tape free, or do I need to buy some?", ok: true, tip: "tape 胶带；潜规则：柜台基本胶带通常免费，特制包装材料另购" },
        { text: "Give me all free tape in the building.",       ok: false, tip: "礼貌询问：Is the tape free?" },
        { text: "My box is held together by hope and tape.",    ok: false, tip: "先问规则：Is the tape free, or do I buy some?" },
      ],
      phrase: { en: "Is the ___ free, or do I need to buy it?", zh: "……是免费的，还是要买？", note: "分清 free 与 for sale——邮局潜规则之耗材篇" },
    },
    {
      npcLines: [
        "Plain tape's on the counter — help yourself. You know, a well-packed box is a happy box. Shake test before we label it!",
        "Counter tape is free! Now — give that box a shake. If nothing moves, it's good to go.",
        "Take the plain tape! Quick pro tip: shake the box. Silence means perfect packing.",
      ],
      npcZh: "普通胶带在柜台上——随便用。记住：包得好的箱子才是开心的箱子。贴单前先做摇晃测试！",
      task: "做摇晃测试并理解它的意义",
      options: [
        { text: "Nothing moves when I shake it. So packing well means less damage?", ok: true, tip: "shake test 摇晃测试——东西不动=缓冲到位，破损率大降" },
        { text: "Shake the box? Is that a dance move?",        ok: false, tip: "打包潜规则：shake test，无声即合格" },
        { text: "I packed it with 100% air. Nothing to move.",  ok: false, tip: "理解原理：packing well means less damage" },
      ],
      phrase: { en: "Give it a shake test.", zh: "做一下摇晃测试。", note: "打包文化：内件不动摇 = 缓冲充分；快递暴力分拣也不怕" },
    },
    {
      npcLines: [
        "Exactly — no movement, no damage. Last lesson of the day: do you know about hold mail service? For when you travel?",
        "That's the secret! One more pro tip — ever heard of holding your mail when you're away?",
        "Right! Okay, final culture lesson: hold mail. You know it? For trips?",
      ],
      npcZh: "没错——不晃动就不破损。今天最后一课：您知道暂停投递服务吗？出门旅行时用的那种。",
      task: "询问出远门时如何暂停信件投递",
      options: [
        { text: "No, tell me! If I travel for two weeks, how do I pause my mail?", ok: true, tip: "hold the mail 暂停投递——潜规则：堆积的邮件是小偷信号" },
        { text: "My mail can wait two weeks outside. Rain is fine.", ok: false, tip: "邮件堆积易丢+招贼：How do I pause my mail?" },
        { text: "Two weeks? Ask neighbor to build a mailbox tower.",  ok: false, tip: "官方服务：hold mail，回来一次取齐" },
      ],
      phrase: { en: "hold the mail", zh: "暂停投递（信件）", note: "出远门潜规则：申请 hold，邮局替你保管，回来再取" },
    },
    {
      npcLines: [
        "Just ask us or go online — we'll hold it up to thirty days and deliver it all when you're back. Enjoy your trip — see you after Thanksgiving!",
        "One form or a few clicks online, and we hold everything for thirty days. Safe travels — see you in December!",
        "Form or website, thirty days max, one big delivery when you return. Happy Thanksgiving, and thanks for the chat!",
      ],
      npcZh: "来柜台或上网申请就行——最长保管三十天，回来后一次性投递。旅途愉快——感恩节后见！",
      task: "感谢并告别",
      options: [
        { text: "That's perfect. Thanks for all the tips — happy Thanksgiving to you too!", ok: true, tip: "Thanks for all the tips 感谢指点 + 节日祝福回赠——社交收尾" },
        { text: "OK bye. Tips were acceptable.",       ok: false, tip: "热情收尾：Thanks for all the tips, happy Thanksgiving!" },
        { text: "Turkey day to you as well, mail man.",  ok: false, tip: "自然表达：Happy Thanksgiving to you too!" },
      ],
      phrase: { en: "Thanks for all the tips!", zh: "谢谢你的所有指点！", note: "tip = 点子/小费双关；文化课毕业答谢" },
    },
  ],
},
