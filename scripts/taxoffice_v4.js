    {
      id: "v4",
      title: "第 4 次光顾 · 报税文化课",
      titleEn: "Tax Culture",
      emoji: "🏛️",
      desc: "和税务官闲聊报税季文化：为什么美国人 1 月开始囤收据、免费报税资源、延迟申请——文化潜规则一课。",
      reward: { en: "keep receipts", zh: "你已深谙报税文化！🏛️" },
      steps: [
        {
          npcLines: [
            "Well, if it isn't my favorite taxpayer! Back for more? Or just visiting your friends at the tax office?",
            "Look who it is — my favorite customer! What brings you back? Or are you just nostalgic for our waiting area?",
            "My favorite regular! What can I do for you — or is this a social visit?",
          ],
          npcZh: "哟，这不是我最喜欢的纳税人吗！又来了？还是专程来看望税务局的朋友们？",
          task: "笑着说明是来咨询免费报税资源",
          options: [
            { text: "Ha! I heard there are free tax-filing services — is that true, or just a rumor?", ok: true,  tip: "free tax-filing services 免费报税服务 + rumor 传言" },
            { text: "I return for friendship. And also free things. Rumors of free things.",           ok: false, tip: "咨询核心问题：Are there free tax-filing services?" },
            { text: "Tax office has friends? Since when? News to me.",                                 ok: false, tip: "直奔主题：I heard about free filing services — is that true?" },
          ],
          phrase: { en: "Is that true, or just a rumor?", zh: "是真的还是谣传？", note: "rumor 传言；求证信息的轻快问法" },
        },
        {
          npcLines: [
            "Absolutely true! If your income is under seventy-nine thousand, you qualify for free filing software. And VITA centers offer free in-person help.",
            "One hundred percent real! Under seventy-nine thousand in income means free filing software. Plus VITA centers — free in-person assistance!",
            "Not a rumor at all! Income under seventy-nine grand? Free software for you. And VITA centers do free face-to-face help!",
          ],
          npcZh: "完全属实！收入低于 7.9 万美元就能用免费报税软件。VITA 中心还提供免费面对面帮助。",
          task: "询问 VITA 中心是什么",
          options: [
            { text: "I haven't heard of VITA centers — what exactly do they offer?", ok: true,  tip: "haven't heard of 没听说过——大方承认知识盲区" },
            { text: "VITA? Vitamin center? Health tax? Confused.",                  ok: false, tip: "询问详情：What exactly do VITA centers offer?" },
            { text: "VITA sounds like secret club. Secret tax club.",               ok: false, tip: "了解服务：What do they offer exactly?" },
          ],
          phrase: { en: "I haven't heard of that.", zh: "我没听说过那个。", note: "承认不知道是学习的开始——比不懂装懂高效一百倍" },
        },
        {
          npcLines: [
            "VITA is Volunteer Income Tax Assistance — trained volunteers file taxes for free for people who qualify. Students and first-generation folks love it.",
            "VITA — Volunteer Income Tax Assistance! Trained volunteers, free filings, qualified folks only. Very popular with students and newcomers.",
            "Volunteer Income Tax Assistance! Certified volunteers doing free returns for eligible people. A lifesaver for students and new immigrants.",
          ],
          npcZh: "VITA 是志愿者报税援助——受过培训的志愿者免费帮符合条件的人报税。学生和新移民特别喜欢。",
          task: "感叹资源好，继续问收据文化",
          options: [
            { text: "What a great resource! Changing topics — why do people say to keep receipts all year? Is that really necessary?", ok: true, tip: "切换话题 + 问文化现象：keep receipts 全年留收据" },
            { text: "Volunteers do taxes? Free labor? Capitalism confusing.",                                                         ok: false, tip: "问收据文化：Why keep receipts all year — is it necessary?" },
            { text: "Receipts are paper. Paper is clutter. Clutter is life.",                                                          ok: false, tip: "了解规则：Why do people keep receipts all year?" },
          ],
          phrase: { en: "Is that really necessary?", zh: "真的有必要吗？", note: "necessary 必要；质询规则的礼貌方式" },
        },
        {
          npcLines: [
            "If you claim deductions — yes! Receipts are your proof. Without them, a deduction can be disallowed. My advice: photograph every receipt the moment you get it.",
            "For deductions, absolutely! Receipts are evidence. No proof, no deduction. Pro tip: snap a photo of every receipt immediately.",
            "Deduction-claimers, definitely! A receipt is your receipt's receipt! No documentation, no deduction. Photograph them as you go — future you will rejoice!",
          ],
          npcZh: "如果你申报扣除项——是的！收据就是证据。没有它们，扣除项可能被驳回。我的建议：拿到收据立刻拍照。",
          task: "追问收据要保存多久",
          options: [
            { text: "Good tip! How long should I keep them — is there a rule of thumb?", ok: true,  tip: "rule of thumb 经验法则——问保存期限的地道说法" },
            { text: "Photograph receipts? Phone album full of food pics already. No space.", ok: false, tip: "问期限：How long should I keep them?" },
            { text: "Keep forever? House become receipt. Live inside receipt.",          ok: false, tip: "经验法则：Is there a rule of thumb for how long?" },
          ],
          phrase: { en: "Rule of thumb", zh: "经验法则。", note: "thumb 拇指；rule of thumb = 实用经验法则" },
        },
        {
          npcLines: [
            "Three years is the standard rule of thumb, but six if you underreported, and forever for fraud. For a normal taxpayer — three years of receipts is your safe harbor.",
            "Three years standard, six if income was underreported, forever for fraud! For honest taxpayers: three years is your safe harbor.",
            "The rule: three years for most, six for underreporting, eternity for fraud! Regular folks — three years and you're in the safe harbor.",
          ],
          npcZh: "3 年是标准经验法则，漏报要 6 年，欺诈永久保留。对普通纳税人——3 年收据就是你的安全港。",
          task: "最后问一个实用问题：赶不上截止日怎么办",
          options: [
            { text: "Last question — what happens if I can't file by the deadline? Life happens sometimes.", ok: true,  tip: "Life happens 生活总有意外——提问缓冲铺垫" },
            { text: "Deadline escape plan? Emergency exit? Tax fire drill?",                                 ok: false, tip: "正式询问：What if I can't file by the deadline?" },
            { text: "I will never be late. I am early machine. Question for friend. Weak friend.",           ok: false, tip: "直接问：What if I can't file by the deadline?" },
          ],
          phrase: { en: "What if I can't file by the deadline?", zh: "如果我赶不上截止日怎么办？", note: "What if...? 假设提问；deadline 前的救命问句" },
        },
        {
          npcLines: [
            "You file Form 4868 — an automatic extension to October. But careful: it extends the filing, not the payment! Tax owed is still due April fifteenth.",
            "Form 4868 grants an automatic extension to October! One huge caveat — it extends filing, NOT payment. Taxes owed are still due in April!",
            "That's what Form 4868 is for — automatic extension to October! Big warning though: filing extends, payment doesn't. April fifteenth still counts for cash!",
          ],
          npcZh: "填 4868 表——自动延到 10 月。但注意：延期的是申报，不是付款！欠的税 4 月 15 日照样到期。",
          task: "复述这个关键区别并道谢",
          options: [
            { text: "So the extension is for paperwork, not payment — that's a crucial distinction. Thank you for the tax culture lesson!", ok: true,  tip: "crucial distinction 关键区别——复述确认 + 幽默收尾" },
            { text: "Extension trick! Extend everything! Extend life itself!",                                                              ok: false, tip: "复述关键点：It's for paperwork, not payment — thank you!" },
            { text: "Tax culture lesson? Culture usually fun. This culture numbers.",                                                        ok: false, tip: "确认理解：That's a crucial distinction — thank you!" },
          ],
          phrase: { en: "That's a crucial distinction.", zh: "这是个关键区别。", note: "distinction 区别；catch 关键陷阱的代名词" },
        },
      ],
    },
