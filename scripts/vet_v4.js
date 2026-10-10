    {
      id: "v4",
      title: "第 4 次光顾 · 宠物文化课",
      titleEn: "Pet Culture Deep Dive",
      emoji: "🇺🇸",
      desc: "美国人是把宠物当家人的：宠物保险怎么选、绝育文化、狗狗公园潜规则——文化深潜一轮。",
      reward: { en: "pet insurance", zh: "你搞懂了美式宠物文化，毛孩子生活无障碍！🐾" },
      steps: [
        {
          npcLines: [
            "Back again! What's on the agenda today?",
            "Welcome back! What are we covering this time?",
            "My favorite regulars! What brings you in?",
          ],
          npcZh: "又来啦！今天聊点什么？",
          task: "说明来意：想了解宠物保险，身边人都在买",
          options: [
            { text: "Everyone at the dog park keeps telling me to get pet insurance. Where do I even start?", ok: true, tip: "Where do I even start? 从哪儿开始——求助开放式问题" },
            { text: "Insurance for a dog? Is the dog going to drive a car now?", ok: false, tip: "开放提问：Where do I even start?" },
            { text: "Sell me the best insurance. The dog insurance of dog insurances.", ok: false, tip: "先了解：Where do I even start?" },
          ],
          phrase: { en: "Where do I even start?", zh: "我该从哪儿入手呢？", note: "even 强调无从下手；求助万能开场" },
        },
        {
          npcLines: [
            "Great question! Most plans run thirty to fifty a month. The trick is: pet insurance works backwards — you pay us, then the insurer reimburses you.",
            "The classic question! Thirty to fifty bucks monthly, usually. Here's the catch: it's pay-first, get-reimbursed-later.",
            "Ah, insurance! Monthly premiums run thirty to fifty. Heads-up though — you pay the vet, then the insurance pays you back.",
          ],
          npcZh: "好问题！多数计划每月三十到五十美元。关键点：宠物保险是反过来的——您先付给我们，保险公司再赔付给您。",
          task: "确认理解：先垫付再理赔",
          options: [
            { text: "So I pay upfront and then file a claim — got it. What does a typical plan cover?", ok: true, tip: "复述机制（pay upfront + file a claim）+ 问覆盖范围" },
            { text: "Pay first? Insurance is a scam with extra steps.",  ok: false, tip: "理解机制后问覆盖：What does a plan cover?" },
            { text: "The dog pays. He has a job. He's a model.",       ok: false, tip: "确认细节：I pay upfront and file a claim, right?" },
          ],
          phrase: { en: "What does the plan cover?", zh: "这个计划保什么？", note: "cover = 覆盖、赔付；accident-only vs comprehensive 差别巨大" },
        },
        {
          npcLines: [
            "Accidents and illness mostly — like Max's sock adventure would qualify. Routine checkups usually aren't, unless you add a wellness package.",
            "Accidents and illness — sock incidents, broken legs, cancer treatment. Checkups need the wellness add-on.",
            "The big stuff: accidents, illness, surgeries. The sock situation? Covered. Annual checkups? That's the add-on package.",
          ],
          npcZh: "主要是意外和疾病——比如 Max 的袜子冒险就能赔。常规体检一般不保，除非加购保健套餐。",
          task: "结合自身经历感慨，追问预存在病症条款",
          options: [
            { text: "The sock adventure alone would've paid for a year of premiums! What about pre-existing conditions?", ok: true, tip: "pre-existing conditions 预存在病症——保险核心条款，人有宠物险都有" },
            { text: "So insurance only covers the fun disasters. Noted.", ok: false, tip: "问关键条款：What about pre-existing conditions?" },
            { text: "Define adventure. Legally.",  ok: false, tip: "问条款：pre-existing conditions 是否赔付？" },
          ],
          phrase: { en: "What about pre-existing conditions?", zh: "已有病症怎么算？", note: "pre-existing = 投保前已存在的；多数宠物险不赔，要如实告知" },
        },
        {
          npcLines: [
            "Sharp question! Pre-existing stuff is usually excluded — another reason to insure them young, before anything develops. Speaking of young: was Max neutered?",
            "The most important question! Pre-existing conditions don't get covered — insure early, before problems start. Which reminds me: is Max neutered?",
            "You'd make a great insurance agent! Pre-existing = excluded, always. Get coverage while they're young! Now — did you neuter Max?",
          ],
          npcZh: "问得犀利！预存在病症通常不赔——所以要趁年轻、还没生病时投保。说到年轻：Max 做绝育了吗？",
          task: "回答：做了，问这在美国家庭是否普遍",
          options: [
            { text: "Yes, he was neutered as a puppy. Is that the norm here?", ok: true, tip: "neuter 绝育（公）+ Is that the norm? 这是惯例吗——文化对照提问" },
            { text: "None of your business, actually. Oh wait, it is.",  ok: false, tip: "正常交流：He was neutered as a puppy — is that the norm?" },
            { text: "He refused. We respect his choices.",                ok: false, tip: "如实回答+问文化：Is that the norm here?" },
          ],
          phrase: { en: "Is that the norm here?", zh: "这里通常是这样吗？", note: "the norm = 惯例；了解当地标准的万能文化问句" },
        },
        {
          npcLines: [
            "Absolutely — it's standard practice. It reduces health risks and behavior problems. Here, that's just part of being a responsible pet owner. Dogs are family, you know!",
            "Totally the norm! Health benefits, behavior benefits — it's what responsible owners do. Pets are family in this country!",
            "Standard as it gets! Around here, pets are basically children with fur. Neutering is just part of the deal.",
          ],
          npcZh: "完全是惯例——这是标准操作。能降低健康风险和行为问题。在这里，这是负责任宠物主人的基本操作。狗就是家人！",
          task: "询问养狗人还应该知道的文化惯例",
          options: [
            { text: "Dogs as family — I love that. Any other unwritten rules I should know as a new dog owner?", ok: true, tip: "unwritten rules 不成文规则——文化深潜核心问句" },
            { text: "Family? Max pays no rent. Coincidence?",  ok: false, tip: "求文化建议：Any other unwritten rules?" },
            { text: "I know all rules. I am basically a dog.", ok: false, tip: "虚心求教：Any unwritten rules I should know?" },
          ],
          phrase: { en: "Any unwritten rules I should know?", zh: "有什么不成文的规矩我该知道的吗？", note: "unwritten rule = 潜规则；比 custom 更口语" },
        },
        {
          npcLines: [
            "Big one: always leash your dog outside dog parks, pick up the poop — non-negotiable — and ask before letting your dog greet another dog. Not every dog wants friends!",
            "The sacred three: leash everywhere except dog parks, scoop the poop always, and ask 'Is your dog friendly?' before meet-and-greets.",
            "Three commandments! Leash up, scoop up, and always ask before dogs meet. Consent applies to dogs too, ha!",
          ],
          npcZh: "最重要的一条：除非在狗狗公园，外出必须牵绳，便便必须捡——没商量——还有让狗狗打招呼前先问对方。不是每只狗都想交朋友！",
          task: "总结确认三条铁律并道谢",
          options: [
            { text: "Leash, scoop, ask first — got it. Thanks, this has been an education!", ok: true, tip: "三连复述总结 + This has been an education 受教了——文化课毕业" },
            { text: "Rules one through three memorized. Rule four?",  ok: false, tip: "复述三铁律：Leash, scoop, ask first!" },
            { text: "My dog decides his own rules. He's a free spirit.", ok: false, tip: "接受惯例：Got it, this has been an education!" },
          ],
          phrase: { en: "This has been an education!", zh: "真是受教了！", note: "对一次有益聊天的总结式感谢；半开玩笑语气" },
        },
      ],
    },
