  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 验光配镜",
      titleEn: "The Eye Exam",
      emoji: "👁️",
      desc: "看东西越来越模糊！预约验光、读视力表、听懂验光师指令——配镜第一步。",
      reward: { en: "eye exam", zh: "你完成了一次英文验光！👁️" },
      steps: [
        {
          npcLines: [
            "Welcome to ClearView Optical! What brings you in today?",
            "Hi there, ClearView Optical! How can we help your eyes today?",
            "Good afternoon! Welcome to ClearView. What's going on with those eyes?",
          ],
          npcZh: "欢迎来到 ClearView 眼镜店！今天为什么来？",
          task: "描述视力问题（远处模糊）",
          options: [
            { text: "Lately things in the distance look blurry — street signs, the whiteboard at work. I think I need an eye exam.", ok: true,  tip: "blurry 模糊 + 具体场景举例，症状描述范本" },
            { text: "Eyes bad. World fog. Fix eyes.",                                                                                     ok: false, tip: "具体描述：Things in the distance look blurry" },
            { text: "I see everything. Everything is fine. Here for friend.",                                                              ok: false, tip: "说明症状：Street signs look blurry — I need an eye exam" },
          ],
          phrase: { en: "Things look blurry.", zh: "看东西模糊。", note: "blurry 视力问题的核心词；in the distance 在远处" },
        },
        {
          npcLines: [
            "Classic nearsightedness symptoms! We have an opening with our optometrist in twenty minutes — want to take it?",
            "Sounds like nearsightedness to me! The optometrist has a slot in twenty minutes. Interested?",
            "Textbook nearsighted signs! We can squeeze you in with the optometrist in twenty minutes. Shall we?",
          ],
          npcZh: "典型近视症状！验光师 20 分钟后有空档——要吗？",
          task: "接受预约",
          options: [
            { text: "Yes, perfect timing. What does the eye exam include?", ok: true,  tip: "What does it include? 问清服务内容" },
            { text: "Twenty minutes? I come back year 3000. Book then.",   ok: false, tip: "接受空档：Perfect timing — what does the exam include?" },
            { text: "Optometrist? I want eye dentist. Same thing?",        ok: false, tip: "optometrist = 验光师：What does the eye exam include?" },
          ],
          phrase: { en: "What does it include?", zh: "它包含什么？", note: "付费服务前问清范围——消费通用句" },
        },
        {
          npcLines: [
            "A full vision check, refraction test, and eye health screening. Now, hop in the chair — let's start with the eye chart!",
            "Complete vision checkup, refraction, and health screening! Chair's ready — eye chart first!",
            "Vision check, refraction test, health screening — the works! Take a seat — eye chart time!",
          ],
          npcZh: "完整视力检查、验光和眼底筛查。坐到椅子上——先看视力表！",
          task: "配合验光师读视力表",
          options: [
            { text: "Ready! Which line should I start reading from?", ok: true,  tip: "主动配合——验光师最喜欢的患者" },
            { text: "Chart has letters. Letters are friends. Hello letters.", ok: false, tip: "配合指令：Which line should I start from?" },
            { text: "I refuse charts. Charts are classist. Read for me.", ok: false, tip: "配合流程：Ready — which line do I start from?" },
          ],
          phrase: { en: "Which line should I start from?", zh: "我从哪一行开始读？", note: "eye chart 视力表；line 行" },
        },
        {
          npcLines: [
            "Start from the top... and a few clicks of lenses later... 'Better with this one, or this one?' That's the refraction test — one or two?",
            "From the top please... [lens clicks]... Now: better like this, or like this? One or two, quick answers!",
            "Top line, go ahead... [click, click]... Which is sharper — number one, or number two?",
          ],
          npcZh: "从最上面读……（换镜片）……『这个清楚还是这个清楚？』这是验光——一还是二？",
          task: "诚实回答哪个更清楚（不能猜）",
          options: [
            { text: "Number two is definitely sharper. Number one is a bit blurry at the edges.", ok: true,  tip: "sharper 更锐利 + 具体描述差异——诚实回答才准" },
            { text: "Both same. You choose. You are eye boss.",                                   ok: false, tip: "如实描述差异：Number two is definitely sharper" },
            { text: "One? Two? Yes. Both. All numbers good numbers.",                             ok: false, tip: "凭真实感受答：Number two is sharper at the edges" },
          ],
          phrase: { en: "Which one is sharper?", zh: "哪个更清楚？", note: "验光经典问句 one or two；sharper = 更清晰" },
        },
        {
          npcLines: [
            "Great feedback! And last, we measure your pupillary distance... Done! Your prescription: minus two point five, both eyes. Mild nearsightedness.",
            "Excellent, very helpful! Now the PD measurement... All set! Prescription: minus 2.50 in each eye — mild nearsightedness, very common.",
            "Perfect answers! One quick PD measurement... Finished! You're at minus two-fifty, both eyes — a classic mild myopia case.",
          ],
          npcZh: "反馈很好！最后测瞳距……好了！你的处方：双眼近视 250 度。轻度近视。",
          task: "询问这个度数意味着什么",
          options: [
            { text: "Minus two point five — what does that mean for me? Will it get worse?", ok: true,  tip: "问清诊断含义 + 关心趋势——对健康负责" },
            { text: "Minus two five? Math bad. Number bad. Explain simply.",                ok: false, tip: "直接问：What does that mean for me?" },
            { text: "Two point five what? Points? Dollars? Bugs?",                          ok: false, tip: "询问含义：What does that mean — will it get worse?" },
          ],
          phrase: { en: "What does that mean for me?", zh: "这对我意味着什么？", note: "听诊断后的标准追问；负数=近视 正数=远视" },
        },
        {
          npcLines: [
            "It means clear vision with proper glasses! It's stable for most adults. Now — shall we look at some frames? That's the fun part!",
            "It means glasses will give you 20/20 vision! And at your age, it's likely stable. Ready for the fun part — frame shopping?",
            "With glasses you'll see perfectly! Adult prescriptions usually hold steady. Now the best part — picking frames!",
          ],
          npcZh: "意味着配好眼镜就能看得清清楚楚！成年人度数通常稳定。现在——看看镜框？有趣的部分来了！",
          task: "进入选框环节",
          options: [
            { text: "Let's do it — I've been wearing the same style for years, so I'm open to suggestions.", ok: true,  tip: "open to suggestions 愿意听建议——选品心态开放" },
            { text: "Frames boring. Give strongest frames. Strength frames.",                               ok: false, tip: "开放沟通：I'm open to suggestions" },
            { text: "Pick for me. I close eyes. Surprise me with mystery frames.",                          ok: false, tip: "参与选择：I'm open to suggestions" },
          ],
          phrase: { en: "I'm open to suggestions.", zh: "我愿意听听建议。", note: "消费决策开放句；导购最爱听的回答" },
        },
      ],
    },
