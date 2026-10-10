    {
      id: "v3",
      title: "第 3 次光顾 · 办公室时间与邮件礼仪",
      titleEn: "Office Hours & Email Etiquette",
      emoji: "📧",
      desc: "找教授有讲究：怎么写正式邮件？答疑时间该聊什么？错过 deadline 怎么补救？校园沟通潜规则。",
      reward: { en: "office hours", zh: "你解锁了和教授打交道的正确姿势！📧" },
      steps: [
        {
          npcLines: [
            "Hi, come on in! You look like you have a question. Office hours are exactly for this!",
            "Hello hello! Office hours, my favorite time. What's on your mind?",
            "Come in! You've got the 'I have a question' face. Fire away!",
          ],
          npcZh: "您好，请进！您看起来有问题要问。答疑时间正是干这个的！",
          task: "说明来意：关于作业的一个问题，先道歉打扰",
          options: [
            { text: "Thanks for seeing me! I have a question about the essay assignment — is this a good time?", ok: true, tip: "Is this a good time? 现在方便吗——办公室时间也要礼貌开场" },
            { text: "Sorry to bother you. I'll just stand here silently.", ok: false, tip: "自然开场：I have a question about the assignment" },
            { text: "Your office has many books. Anyway, homework.",      ok: false, tip: "直入主题：A question about the essay assignment — is this a good time?" },
          ],
          phrase: { en: "Is this a good time?", zh: "现在方便吗？", note: "打扰前确认时间的礼貌句；对方多半会说 of course" },
        },
        {
          npcLines: [
            "Perfect time! What's the question about the essay?",
            "It's always a good time for questions! What's up with the essay?",
            "The best time! Tell me about this essay problem.",
          ],
          npcZh: "正是时候！论文有什么问题？",
          task: "提问：参考文献数量要求",
          options: [
            { text: "How many sources do we need to cite? The guidelines just say 'multiple.'", ok: true, tip: "cite 引用 + 指出大纲模糊处——具体清晰的问题" },
            { text: "The essay is hard. How do I make it easy?",  ok: false, tip: "问具体标准：How many sources do we need to cite?" },
            { text: "What's an essay, really, when you think about it?", ok: false, tip: "具体提问：How many sources, and what counts as one?" },
          ],
          phrase: { en: "How many ___ do we need?", zh: "我们需要多少……？", note: "要求模糊（multiple/several）时问清数字" },
        },
        {
          npcLines: [
            "Great question! Five minimum, but I'd say eight to ten for a strong paper. Quality over quantity, though — a weak source hurts more than it helps!",
            "Five is the floor, eight to ten is the sweet spot! And pick strong sources — filler sources drag you down!",
            "Minimum five, but eight to ten shows real research! Weak sources are worse than no sources, honestly.",
          ],
          npcZh: "问得好！最少五个，但想写好论文我建议八到十个。不过质量重于数量——糟糕的引用还不如不引！",
          task: "追问：什么算好来源",
          options: [
            { text: "What counts as a strong source? I want to do this right.", ok: true, tip: "What counts as...? 什么算……——定义边界的万能问句" },
            { text: "So Wikipedia is my best friend, correct?",  ok: false, tip: "问标准：What counts as a strong source?" },
            { text: "I will cite my cousin. He is very smart.",  ok: false, tip: "问来源标准：What counts as strong?" },
          ],
          phrase: { en: "What counts as ___?", zh: "什么才算……？", note: "count as = 算作；学术/行政场景判断标准必问" },
        },
        {
          npcLines: [
            "Peer-reviewed journals, published books, reputable news. Library databases are your friend! Now, I have a meeting soon — anything else?",
            "Journals, books, solid journalism. And the library databases — gold! Okay, I've got a meeting. Last questions?",
            "Peer-reviewed stuff, books, legit news outlets. The databases through the library! I must run soon — anything else?",
          ],
          npcZh: "同行评审期刊、出版书籍、可靠新闻。图书馆数据库是您的好帮手！我马上有个会——还有其他问题吗？",
          task: "还有最后一件事：错过了一个小作业截止",
          options: [
            { text: "Just one more thing — I missed a small deadline this week. Is there any way to still submit it?", ok: true, tip: "Is there any way to still...? 还能……吗——deadline 补救标准句" },
            { text: "What meeting? Talk to me forever instead.",  ok: false, tip: "尊重对方时间：Just one more thing, I missed a deadline..." },
            { text: "I missed a deadline. My excuse is... creative.", ok: false, tip: "简洁求补救：Is there any way to still submit it?" },
          ],
          phrase: { en: "Is there any way to still ___?", zh: "还有办法……吗？", note: "any way = 任何可能；配 still 强调'为时未晚'" },
        },
        {
          npcLines: [
            "Ah, the discussion post? I accept late submissions for partial credit — seventy percent max. Submit it by tonight!",
            "The Tuesday post, right? Late is fine, but partial credit — up to a seventy. Get it in tonight!",
            "That one? I take it late with a cap at seventy percent. Tonight's the cutoff for that cutoff, ha!",
          ],
          npcZh: "啊，讨论帖？迟交我收，算部分得分——最高七十分。今晚之前交！",
          task: "感谢通融，追问以后有事怎么联系（邮件礼仪）",
          options: [
            { text: "That's more than fair — thank you! Going forward, is email the best way to reach you?", ok: true, tip: "Going forward 今后 + is email the best way 确认联系渠道" },
            { text: "Seventy percent? Justice demands one hundred.",  ok: false, tip: "接受规则并问沟通渠道：Is email the best way to reach you?" },
            { text: "I will communicate through interpretive dance.", ok: false, tip: "问联系方式：Is email the best way to reach you?" },
          ],
          phrase: { en: "Going forward, ___.", zh: "往后看的话，……。", note: "going forward = 从今以后；职场校园通用衔接词" },
        },
        {
          npcLines: [
            "Yes, email is best — and here's a pro tip: address me as 'Professor Chen,' skip the 'hey,' and lead with your course number. Professors teach four classes; we need the context!",
            "Email, always! Pro tip from the trenches: 'Dear Professor Chen,' never 'hey,' and your course code goes first. We teach four sections — help us help you!",
            "Email me! And a gift: start with 'Dear Professor Chen,' include the course number up top. We juggle hundreds of students — context is kindness!",
          ],
          npcZh: "邮件最好——送您一个忠告：称呼我『陈教授』，别用『嘿』，开头先写课程编号。教授们教四门课，我们需要背景信息！",
          task: "总结邮件三要素并道谢",
          options: [
            { text: "Dear Professor, course number, no 'hey' — got it. Thank you, this was really helpful!", ok: true, tip: "三要素复述 + 道谢——办公室时间毕业" },
            { text: "But what if my email is just one big 'hey'?",  ok: false, tip: "复述要点：Dear Professor, course number, no 'hey'" },
            { text: "Professors are people too? Shocking. Thanks!", ok: false, tip: "复述+感谢：Got it, this was really helpful!" },
          ],
          phrase: { en: "This was really helpful!", zh: "这次交流真的很有帮助！", note: "对老师/前辈表达具体受益；比 thanks 更走心" },
        },
      ],
    },
