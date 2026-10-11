    {
      id: "v3",
      title: "第 3 次光顾 · 买错了书",
      titleEn: "The Wrong Book",
      emoji: "↩️",
      desc: "买回家发现买错了！拿着收据回书店退换。学退换政策、换货、补差价。",
      reward: { en: "return policy", zh: "你成功完成了一次英文退换货！↩️" },
      steps: [
        {
          npcLines: [
            "Hi! Welcome back to Page & Co. How did the mystery novel go over with your friend?",
            "Hey, good to see you again! Did the mystery novel land well with your friend?",
            "Welcome back! So — was the wrapped book a hit?",
          ],
          npcZh: "你好！欢迎回到 Page & Co。那本悬疑小说你朋友喜欢吗？",
          task: "说明情况：买错了书（买成了系列第二册）",
          options: [
            { text: "That's the thing — I accidentally bought book two of the series. I need book one!", ok: true,  tip: "accidentally 表达不小心 + 说明需要的册数" },
            { text: "Book bad. Book wrong. Exchange now.",                                               ok: false, tip: "说明错在哪：I accidentally bought book two — I need book one" },
            { text: "Friend angry. You sell bad book.",                                                  ok: false, tip: "是自己的疏忽：I accidentally bought book two of the series" },
          ],
          phrase: { en: "I accidentally bought ___.", zh: "我不小心买错了……", note: "accidentally 委婉承认失误，退换货开场好句" },
        },
        {
          npcLines: [
            "Ah, the classic series trap — happens all the time! Do you still have the receipt?",
            "Oh no, the old 'wrong book in the series' trick — you're not the first! Do you have the receipt with you?",
            "That's a rite of passage for series readers! Okay, do you still have your receipt?",
          ],
          npcZh: "啊，经典的系列陷阱——经常发生！你收据还留着吗？",
          task: "出示收据",
          options: [
            { text: "Yes, here's the receipt. Can I exchange it for book one?", ok: true,  tip: "Here's the receipt 递收据 + exchange 换货" },
            { text: "Receipt? Maybe dog ate.",                                ok: false, tip: "有收据直接递上：Here's the receipt" },
            { text: "No receipt but book is perfect. Trust me.",              ok: false, tip: "退换要凭证：Here's the receipt — Can I exchange it?" },
          ],
          phrase: { en: "Can I exchange it for ___?", zh: "能换成……吗？", note: "exchange A for B = 把 A 换成 B；退换货核心句" },
        },
        {
          npcLines: [
            "Perfect, that makes it easy. Book one of that series is twelve dollars — since you paid sixteen, you'd actually get four dollars back!",
            "Receipt looks great! Book one is twelve bucks, so with the sixteen you paid, you're actually owed four dollars back.",
            "With the receipt this is painless. Book one runs twelve — you paid sixteen, so we owe you four dollars.",
          ],
          npcZh: "太好了，这样就简单了。系列第一册是 12 美元——你付了 16，还能退你 4 美元！",
          task: "确认退款金额",
          options: [
            { text: "So I'll get a four-dollar refund? Sounds good to me!", ok: true,  tip: "refund 退款 + Sounds good 爽快确认" },
            { text: "Four dollar? Give ten. I wait.",                      ok: false, tip: "确认金额即可：So I'll get a four-dollar refund?" },
            { text: "Refund is what? Explain money.",                      ok: false, tip: "差额 4 美元：So I'll get a four-dollar refund?" },
          ],
          phrase: { en: "So I'll get a refund?", zh: "所以我会拿到退款？", note: "退款场景确认句；refund 可数名词 = 退款金额" },
        },
        {
          npcLines: [
            "Exactly! Let me grab book one from the fiction shelf... Here we go. Same series, correct number this time!",
            "You got it! One trip to the fiction shelf... Here it is — book one, verified and everything!",
            "That's right! ...And here she is, book one fresh off the shelf. Let's double-check the cover — yep, 'Book One'!",
          ],
          npcZh: "没错！我去小说书架拿第一册……给你。同一系列，这次册数对了！",
          task: "接过书，顺便确认这次封面没问题",
          options: [
            { text: "Let me check the cover... 'Book One' — perfect. Thank you!", ok: true,  tip: "当场核对再确认，细心又地道" },
            { text: "No check. You check. You did wrong before.",                ok: false, tip: "自己确认更稳妥：Let me check the cover — perfect!" },
            { text: "Book one is ugly cover. Book two back.",                    ok: false, tip: "封面不影响内容：确认即可" },
          ],
          phrase: { en: "Let me check the cover.", zh: "我看一下封面。", note: "换货后当场验货的习惯表达" },
          adds: [{ emoji: "📕", label: "Book One", wordId: "book-hardcover" }],
        },
        {
          npcLines: [
            "Ha, trust but verify — I respect that! Here's your four dollars back. Anything else I can help with?",
            "Smart shopper! Four dollars coming back to you. Anything else on your list today?",
            "An inspector in the house! Here's your refund — four dollars. Anything else you need?",
          ],
          npcZh: "哈，信任但验证——我尊重这个！这是退你的 4 美元。还需要帮忙吗？",
          task: "收下退款，顺便问一下会员卡",
          options: [
            { text: "Thanks! Actually, do you have a membership card? I shop here a lot.", ok: true,  tip: "主动问会员卡 — I shop here a lot 给理由" },
            { text: "Member card is free? I take ten.",                                   ok: false, tip: "先询问：Do you have a membership card?" },
            { text: "No more talking. Money now.",                                        ok: false, tip: "收下退款并询问会员：Do you have a membership card?" },
          ],
          phrase: { en: "Do you have a membership card?", zh: "你们有会员卡吗？", note: "常客省钱的钥匙问题，会员卡细节见下一轮！" },
        },
        {
          npcLines: [
            "We do! Ask about it next time you're in — my manager's setting up a new stamp program you'll love. See you soon!",
            "We sure do! Come back and ask about the stamp card — it's a game changer for regulars. Have a good one!",
            "Yes we do! Next visit, just ask about the membership stamp card. Enjoy book one!",
          ],
          npcZh: "有！下次来的时候问问——我们经理在搞一个新的集章活动，你会喜欢的。回头见！",
          task: "道谢离开",
          options: [
            { text: "Will do — thanks for all your help today!", ok: true,  tip: "Will do = 我会的，答应对方 + 收尾致谢" },
            { text: "Next time? Why not now? Now!",             ok: false, tip: "对方说下次：Will do — thanks!" },
            { text: "Stamp program for baby? I no baby.",       ok: false, tip: "下次再问即可：Will do — thanks!" },
          ],
          phrase: { en: "Will do!", zh: "我会的/没问题！", note: "答应对方会做某事的简短回应，口语高频" },
        },
      ],
    },
