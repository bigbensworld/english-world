    {
      id: "v5",
      title: "第 5 次光顾 · 研究服务深潜",
      titleEn: "Research Help & Beyond",
      emoji: "🎓",
      desc: "写论文要用学术数据库？引文格式怎么标？图书馆员其实是隐藏的免费研究顾问——这轮解锁全部技能。",
      reward: { en: "citation", zh: "你解锁了图书馆员的研究外援技能！🎓" },
      steps: [
        {
          npcLines: [
            "Hi! You look like you're on a mission. How can I help?",
            "Hello! Big project energy today — what do you need?",
            "Hey there! What are we digging into today?",
          ],
          npcZh: "您好！您看起来任务在身。有什么可以帮您？",
          task: "说明需求：写课程论文，需要学术资料",
          options: [
            { text: "Hi! I'm writing a term paper and I need academic sources — not just websites.", ok: true, tip: "academic sources 学术资料；term paper 课程论文" },
            { text: "I need the smartest books. The smartest you have.",  ok: false, tip: "说明用途：I'm writing a term paper, I need academic sources" },
            { text: "Give me websites. Only the fastest websites.",       ok: false, tip: "论文要学术资料：academic sources, not just websites" },
          ],
          phrase: { en: "I'm working on a paper about ___.", zh: "我在写一篇关于……的论文。", note: "work on = 从事；先说清项目再提需求" },
        },
        {
          npcLines: [
            "Great — you'll want our research databases, then. JSTOR, ProQuest... Have you used those before?",
            "Perfect use case for the databases! JSTOR, ProQuest — familiar with them?",
            "You need scholarly articles — that's database territory. Ever used JSTOR or ProQuest?",
          ],
          npcZh: "好——那您需要我们的研究数据库，JSTOR、ProQuest……您以前用过吗？",
          task: "承认没用过，询问怎么访问",
          options: [
            { text: "Honestly, no — how do I get access to them?", ok: true, tip: "Honestly, no 坦诚 + how do I get access 怎么访问——数据库要图书馆账号" },
            { text: "Yes. I know all databases. I invented JSTOR.", ok: false, tip: "不会就问：How do I get access to them?" },
            { text: "Database? Like a data monster?",              ok: false, tip: "直接问用法：How do I get access?" },
          ],
          phrase: { en: "How do I get access to ___?", zh: "我怎么才能使用……？", note: "get access to = 获得使用权限；学术数据库多需机构订阅" },
        },
        {
          npcLines: [
            "Easy! Log in with your library card through our website — databases are free with your card. You can even use them from home.",
            "Simple: our website, log in with your card, done. Home access included, twenty-four seven.",
            "Your card is the key! Sign in on our site and every database opens up — even from your couch.",
          ],
          npcZh: "简单！用借书证登录我们的网站——数据库凭卡免费。在家也能用。",
          task: "询问找文章的具体方法",
          options: [
            { text: "That's great! Any tips for finding the right articles?", ok: true, tip: "Any tips for...? 求经验技巧——馆员最擅长的部分" },
            { text: "Free? Then everything must be bad.",  ok: false, tip: "求检索技巧：Any tips for finding the right articles?" },
            { text: "I will read all articles. All of them.", ok: false, tip: "检索要技巧：Any tips for finding the right articles?" },
          ],
          phrase: { en: "Any tips for ___?", zh: "……有什么技巧吗？", note: "求实用建议的万能句，比 How do I do it 更讨喜" },
        },
        {
          npcLines: [
            "Sure! Use quotation marks for exact phrases, filter by peer-reviewed, and check the reference lists of good articles — they lead to more good articles.",
            "Big three: quotes for exact phrases, peer-reviewed filter, and mine the reference lists. That last one's gold.",
            "Pro tips: exact phrases in quotes, peer-reviewed only, and follow the citations. One good article feeds you ten more.",
          ],
          npcZh: "当然！用引号搜精确短语，按『同行评审』筛选，再看好文章的参考文献列表——它们会引出更多好文章。",
          task: "追问引用规范（避免抄袭）",
          options: [
            { text: "Smart — I'll follow the citations. One more thing: how do I cite sources properly? I don't want to plagiarize by accident.", ok: true, tip: "cite sources 引用出处 + plagiarize 抄袭——学术诚信核心问题" },
            { text: "Citations? I will just hide my sources like a magician.", ok: false, tip: "学术诚信：How do I cite sources properly?" },
            { text: "Plagiarism is just sharing, right?",  ok: false, tip: "必须规范引用：How do I cite sources properly?" },
          ],
          phrase: { en: "How do I cite this properly?", zh: "这个要怎么规范引用？", note: "cite /saɪt/ 引用； MLA / APA 是常见引文格式" },
        },
        {
          npcLines: [
            "Excellent question! Your professor will specify a style — MLA or APA, usually. We have citation guides, and most databases generate citations automatically.",
            "So glad you asked! Check your syllabus for the style — MLA or APA. The databases can auto-generate citations, and we have print guides.",
            "The best question! Style depends on your professor — often APA or MLA. Auto-cite buttons live in every database, plus our printed guides.",
          ],
          npcZh: "问得好！教授会指定格式——通常是 MLA 或 APA。我们有引用指南，而且大多数数据库能自动生成引文。",
          task: "确认可用资源并感谢",
          options: [
            { text: "Perfect — auto-generated citations sound like a lifesaver. Where are the citation guides?", ok: true, tip: "lifesaver 救命稻草；追问资源位置" },
            { text: "My professor is a format god. I fear styles.", ok: false, tip: "务实做法：Where are the citation guides?" },
            { text: "I will cite everything. Even this conversation.", ok: false, tip: "聚焦论文需求：Where are the guides?" },
          ],
          phrase: { en: "That sounds like a lifesaver!", zh: "那真是救了我！/ 太有用了！", note: "lifesaver /ˈlaɪfseɪvə(r)/ 救命之物；夸张式感谢" },
        },
        {
          npcLines: [
            "Aisle four, reference section — help yourself. And if you get stuck at any point, ask for the research desk. That's literally our job. Good luck with the paper!",
            "Reference section, aisle four! And remember — the research desk exists for exactly this. Go crush that paper!",
            "Aisle four, right side! The research desk has your back anytime. Happy writing!",
          ],
          npcZh: "四号过道，参考区——随便取用。任何环节卡住了，就来研究服务台。这正是我们的工作。论文顺利！",
          task: "感谢并告别",
          options: [
            { text: "That's literally your job — best job ever. Thanks a million!", ok: true, tip: "幽默回应 + thanks a million 万分感谢——研究服务深潜毕业" },
            { text: "You are too kind. I will name my paper after you.",  ok: false, tip: "表达感谢：Thanks a million!" },
            { text: "Good luck to you too. With what? Unknown.",         ok: false, tip: "收下祝福并道谢：Thanks a million!" },
          ],
          phrase: { en: "Thanks a million!", zh: "万分感谢！", note: "比 Thank you 更热情的口语道谢" },
        },
      ],
    },
  ],
},
