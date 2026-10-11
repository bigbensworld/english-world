    {
      id: "v5",
      title: "第 5 次光顾 · 身份被盗报税",
      titleEn: "Identity Theft Emergency",
      emoji: "🚨",
      desc: "报税被拒——有人用你的 SSN 报过了税！身份盗用应急：报警、举报、设 IP PIN 保护。税务最惊魂一课。",
      reward: { en: "identity theft", zh: "你守住了自己的税务身份！🚨" },
      steps: [
        {
          npcLines: [
            "You look pale — are you okay? Come to my window, quickly.",
            "Whoa, you look shaken. Come here, this window — what happened?",
            "You're white as a form! Come over here — what's wrong?",
          ],
          npcZh: "你脸色发白——还好吗？快到我的窗口来。",
          task: "说明电子报税被拒，理由是 SSN 已被申报",
          options: [
            { text: "My e-file was rejected — it says my SSN has already filed a return this year. But I haven't filed yet!", ok: true,  tip: "e-file rejected + SSN already filed——身份盗用的典型症状" },
            { text: "Computer say no! Ghost me! Tax ghost stole me!",                                                          ok: false, tip: "说明系统提示：My SSN has already filed a return — but I haven't!" },
            { text: "Rejected? I am reject? My whole self rejected?",                                                         ok: false, tip: "转述拒绝理由：It says my SSN has already filed this year" },
          ],
          phrase: { en: "My e-file was rejected.", zh: "我的电子申报被拒了。", note: "e-file 电子报税；rejected 被拒绝" },
        },
        {
          npcLines: [
            "Okay, deep breath — this is serious but fixable. It sounds like identity theft: someone used your SSN to file a fraudulent return and steal your refund.",
            "Breathe — serious, but fixable. Classic identity theft pattern: a fraudster filed with your SSN to grab your refund.",
            "Stay calm — this is serious, very fixable. Textbook identity theft: someone filed fraudulently with your SSN to hijack your refund.",
          ],
          npcZh: "好，深呼吸——严重但可解决。听起来是身份盗用：有人用你的 SSN 提交了欺诈申报，想偷你的退税。",
          task: "询问第一步该做什么",
          options: [
            { text: "That's a violation! What's the first step — should I report it to the police?", ok: true,  tip: "report 报案 + violation 侵权——冷静推进" },
            { text: "Police! FBI! Army! Call everyone! Sirens!",                                      ok: false, tip: "按流程走：What's the first step?" },
            { text: "Fake me exists? Fight fake me. I fight me. Only one me survives.",              ok: false, tip: "问流程：What's the first step — report to the police?" },
          ],
          phrase: { en: "What's the first step?", zh: "第一步做什么？", note: "应急处理先问流程——慌乱时最好的自救" },
        },
        {
          npcLines: [
            "Police report helps, but the critical form is this one: the Identity Theft Affidavit. It flags your SSN, freezes the fraudulent claim, and starts the investigation.",
            "A police report is useful, but THIS is the key: the Identity Theft Affidavit. It red-flags your SSN, halts the fake claim, and opens an investigation.",
            "Police report: good. But the real weapon is the Identity Theft Affidavit — it flags your number, freezes their claim, launches the investigation!",
          ],
          npcZh: "报警有用，但关键是这张表：身份盗用宣誓书。它会标记你的 SSN、冻结欺诈申报、启动调查。",
          task: "配合填写宣誓书",
          options: [
            { text: "I'll fill it out right now. What information do you need from me?", ok: true,  tip: "主动配合 + What do you need? 提高效率" },
            { text: "Affidavit? Fancy word. Sign everything. Trust everyone now.",       ok: false, tip: "填表前问清：What information do you need from me?" },
            { text: "Freeze claim! Freeze fraudster! Freeze everything cold!",           ok: false, tip: "配合流程：What do you need from me?" },
          ],
          phrase: { en: "What do you need from me?", zh: "你需要我提供什么？", note: "affidavit 宣誓书；办事效率句" },
        },
        {
          npcLines: [
            "Your SSN, two forms of ID, and last year's return. I'll also set you up with an IP PIN — a six-digit code that locks your identity. No one can file without it.",
            "SSN, two IDs, and last year's return. Then I'm enrolling you in the IP PIN program — a six-digit shield. No PIN, no filing, no exceptions.",
            "Need your SSN, two IDs, and the prior-year return. Also enrolling you in IP PIN today — six digits that lock your identity down tight!",
          ],
          npcZh: "你的 SSN、两种证件、去年的申报表。我还会给你开通 IP PIN——一个 6 位数密码锁定身份。没有它谁也报不了税。",
          task: "确认 IP PIN 的用法（每年都变吗）",
          options: [
            { text: "An IP PIN sounds perfect. Does it change every year, or do I keep the same one?", ok: true,  tip: "问清使用规则——安全机制要门儿清" },
            { text: "Six digits? Make it ten digits. Extra secure. Custom security.",                 ok: false, tip: "问规则：Does it change every year?" },
            { text: "PIN protect me forever? Lifetime PIN? PIN pension?",                             ok: false, tip: "了解机制：Does it change every year, or stay the same?" },
          ],
          phrase: { en: "Does it change every year?", zh: "它每年都会变吗？", note: "IP PIN 每年 1 月发新码——只对本人有效" },
        },
        {
          npcLines: [
            "It changes every January — the IRS mails you a new one, or you can retrieve it online with your account. Never share it with anyone. Anyone.",
            "New PIN every January! It comes by mail, or grab it from your online account. And never share it — with anyone. Tax preparers included!",
            "Fresh PIN each January — by mail or online. Guard it with your life. Never share it, not even with your tax preparer!",
          ],
          npcZh: "每年 1 月换新——IRS 会邮寄给你，或在线账户自行获取。绝不告诉任何人。任何人都包括在内。",
          task: "了解损失能否追回",
          options: [
            { text: "Understood — guard the PIN. One more thing: will I still get my refund, or did the thief take it?", ok: true,  tip: "追回损失——受害者的核心关切" },
            { text: "Thief rich now? Thief on beach? My money on beach?",                                                ok: false, tip: "问结果：Will I still get my refund?" },
            { text: "Never share. Not even with parrot. Parrot repeats secrets.",                                        ok: false, tip: "问核心问题：Will I still get my refund?" },
          ],
          phrase: { en: "Will I still get my refund?", zh: "我还能拿到退税吗？", note: "受害者第一问；identity theft 后的正当权益" },
        },
        {
          npcLines: [
            "You'll get it — the affidavit freezes the fraudulent claim, and your refund is reissued once we verify your identity. About nine weeks. You're in good hands now.",
            "Your refund is safe! The affidavit froze the thief's claim — once identity verification clears, we reissue. Nine weeks, roughly. You're protected now.",
            "Refund secured! Their claim is frozen, and after we verify you're really you, we reissue everything. Nine weeks or so. You're in the fortress now!",
          ],
          npcZh: "会拿到的——宣誓书冻结了欺诈申报，核实你的身份后就重新发放。大约 9 周。现在你很安全了。",
          task: "如释重负，感谢协助",
          options: [
            { text: "From panic to a plan in twenty minutes — thank you for being so thorough and calm with me.", ok: true,  tip: "from panic to a plan 恐慌到方案——概括服务价值的金句" },
            { text: "Twenty minute fix! Panic was forty minutes. Bad ratio. Next time panic faster.",             ok: false, tip: "概括致谢：From panic to a plan — thank you!" },
            { text: "Nine weeks more waiting. Waiting hobby now. Professional waiter.",                           ok: false, tip: "真诚致谢：Thank you for being so thorough and calm" },
          ],
          phrase: { en: "From panic to a plan.", zh: "从恐慌到方案。", note: "对仗式总结；感谢危机处理的点睛句" },
          adds: [{ emoji: "🔐", label: "IP PIN", wordId: "tax-pin" }],
        },
      ],
    },
  ],
},
