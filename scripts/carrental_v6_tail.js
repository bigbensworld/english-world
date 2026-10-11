    {
      id: "v5",
      title: "第 5 次光顾 · 租车文化课",
      titleEn: "Rental Culture",
      emoji: "⛽",
      desc: "租车行的游戏规则：满油还车、ETC 自动扣过路费、押金解冻周期。懂规则的人还车从不吃亏。",
      reward: { en: "fill up the tank", zh: "你已是租车老司机！⛽" },
      steps: [
        {
          npcLines: [
            "Welcome back! How was the trip? The mountains treated you well, I hope?",
            "Hey, welcome back! Good trip? The weather up in the mountains was perfect this week!",
            "There you are! How were the mountains? Come tell me all about it — after the paperwork!",
          ],
          npcZh: "欢迎回来！旅途如何？山里待你还不错吧？",
          task: "分享旅途愉快，准备还车",
          options: [
            { text: "It was amazing! But I'm ready to return the car. What do I need to do?", ok: true,  tip: "先寒暄再办事 + What do I need to do 问流程" },
            { text: "Trip secret. Car return. Fast fast.",                                    ok: false, tip: "简单寒暄后问流程：What do I need to do?" },
            { text: "Mountains are mountains. Rock, tree, sky.",                              ok: false, tip: "一句 Amazing 即可，然后问还车流程" },
          ],
          phrase: { en: "I'm ready to return the car.", zh: "我准备还车了。", note: "drop-off/return the car 还车；办事开门见山" },
        },
        {
          npcLines: [
            "Great to hear! First thing — the fuel. Your contract was full-to-full. Is the tank full?",
            "Love that! Okay, first order of business: fuel. You were full-to-full, so — is the tank full now?",
            "Wonderful! Let's start with the fuel. Full-to-full was your deal, right? Tank full?",
          ],
          npcZh: "太好了！第一件事——油量。你的合同是满油取满油还。油箱满着吗？",
          task: "说明已在还车前加满油",
          options: [
            { text: "Yes, I filled up the tank at the gas station just before coming here.", ok: true,  tip: "fill up the tank 加满油 + just before 时间点" },
            { text: "Tank almost full. Ninety percent good?",                               ok: false, tip: "差一点也要加满：I filled up the tank before coming here" },
            { text: "Full? I drive little. Car fuel never go down.",                        ok: false, tip: "还车前加满：I filled up the tank" },
          ],
          phrase: { en: "I filled up the tank.", zh: "我把油箱加满了。", note: "不加满会按高价代加油费——满油还车是省钱铁律" },
        },
        {
          npcLines: [
            "Perfect, that saves you the refueling service charge — it's steep! Now, about tolls: you drove on toll roads, right? Those are billed to you automatically.",
            "Smart! That dodge is a nine-dollar-a-gallon refueling fee — glad you skipped it! Next: tolls. You took the toll roads, correct? They bill automatically.",
            "Excellent move — our refuel fee is brutal, you dodged it! Now, toll roads: you used them, yes? The charges bill through us automatically.",
          ],
          npcZh: "完美，省下代加油服务费——那可一点都不便宜！然后是过路费：你走了收费路段对吧？那些会自动记在你的账上。",
          task: "询问过路费如何扣款",
          options: [
            { text: "Right, I used the toll road. How will those charges be billed to me?", ok: true,  tip: "be billed to 被计入账单，问清扣款方式" },
            { text: "Toll? I wave at booth. Wave is free.",                                 ok: false, tip: "确认扣款方式：How will the tolls be billed to me?" },
            { text: "Automatic billing? Robot take money? Scary.",                          ok: false, tip: "了解规则：How will those charges be billed?" },
          ],
          phrase: { en: "How will that be billed to me?", zh: "那个会怎么给我计费？", note: "bill 计费/开账单；租车隐藏费用主要来源" },
        },
        {
          npcLines: [
            "The car has a toll pass, so the charges go to us, then we bill your card — no markup. You'll see them on the final receipt, usually within a week.",
            "There's a transponder in the car — tolls route to us, then to your card at cost, zero markup. Expect them on your final receipt within a week.",
            "The toll pass forwards everything to us, and we pass it to your card at face value — no fees on top. Final receipt, about a week.",
          ],
          npcZh: "车上有收费通，费用先到我们这儿，再按原价记到你卡上——不加价。一周内会在最终收据上看到。",
          task: "确认没有额外加价",
          options: [
            { text: "So there's no extra fee on top of the tolls themselves?", ok: true,  tip: "no fee on top of... 在……之上没有额外费用" },
            { text: "Pass? Who is pass? Car has passport?",                    ok: false, tip: "toll pass = 收费通行器：Is there no extra fee on top?" },
            { text: "One week too slow. Bill now. Hurry.",                     ok: false, tip: "确认费用即可：No extra fee on top of the tolls?" },
          ],
          phrase: { en: "Is there a fee on top of it?", zh: "在这之上还有额外费用吗？", note: "on top of = 在……之外还；识别隐藏费用的关键问句" },
        },
        {
          npcLines: [
            "No markup whatsoever. Last item: your deposit hold. I'll release the two hundred dollars today — it takes three to five days to show up on your card.",
            "Not a cent extra! Finally, the deposit: the two-hundred-dollar hold gets released today — your bank will take three to five days to process it.",
            "Zero markup, promise! And the deposit hold — releasing the two hundred today. Banks take three to five business days, just so you know.",
          ],
          npcZh: "绝无加价。最后一项：押金。我今天解除那 200 美元预授权——银行处理需要 3-5 个工作日到账。",
          task: "确认押金到账时间，避免误解",
          options: [
            { text: "So the two hundred will be back on my card in three to five days — got it.", ok: true,  tip: "复述金额和时限——确认理解的标准动作" },
            { text: "Three to five day? Why not zero day?",                                       ok: false, tip: "银行处理周期正常：in three to five days — got it" },
            { text: "Two hundred? Make three hundred. Bonus me.",                                 ok: false, tip: "押金原路退回：the two hundred will be back on my card" },
          ],
          phrase: { en: "It takes three to five days.", zh: "需要 3-5 天。", note: "take + 时间 = 耗时；押金/退款周期必用表达" },
        },
        {
          npcLines: [
            "Exactly! You were a fantastic customer — actually, next time you book, mention my name for a free upgrade. See you on your next trip!",
            "That's it exactly! Honestly, a pleasure doing business with you. Book direct next time and drop my name — free upgrade, on me!",
            "You got it! You've been great — next booking, just say my name at the counter and the upgrade's free. Safe travels!",
          ],
          npcZh: "完全正确！你是位很棒的客户——下次预订时报我的名字，送一次免费升级。下段旅途见！",
          task: "欣然接受并道别",
          options: [
            { text: "A free upgrade? You've got yourself a repeat customer. Thanks for everything!", ok: true,  tip: "repeat customer 回头客——地道商业表达" },
            { text: "Upgrade now. On this car. Bigger wheels.",                                     ok: false, tip: "下次预订使用：You've got yourself a repeat customer!" },
            { text: "Your name? I forget names instantly. Sorry.",                                  ok: false, tip: "礼貌回应：Thanks for everything!" },
          ],
          phrase: { en: "You've got yourself a repeat customer.", zh: "你们多了一位回头客。", note: "表达忠诚度的地道说法；商家最爱听的一句" },
        },
      ],
    },
    {
      id: "v6",
      title: "第 6 次光顾 · 还车风波",
      titleEn: "The Drop-Off Dispute",
      emoji: "⏰",
      desc: "还车被指有新划痕，验车单来救场！学用记录自证清白、核对最终账单、礼貌但坚定地维权。",
      reward: { en: "rental contract", zh: "你用验车单捍卫了自己的清白！📜" },
      steps: [
        {
          npcLines: [
            "Welcome back! Let's do the final walk-around and get you on your way. Oh — hold on. There's a scratch on the rear door that wasn't in our notes.",
            "Hi! Just the final check and you're free to go. Wait — hmm. This scratch on the rear door... it's not in our inspection notes.",
            "Welcome back! Quick final look and we're done. Oh, wait a second — that's a scratch on the rear door. It's not on our form.",
          ],
          npcZh: "欢迎回来！最后绕车检查一下就好。哦——等等。后门上有道划痕，记录里没有。",
          task: "拿出自己的验车单副本，指出划痕早已记录在案",
          options: [
            { text: "Actually, it is in the notes — I have my copy of the inspection form right here. The rear-door scratch is marked down.", ok: true,  tip: "It is in the notes 有理有据 + my copy of the form 自证证据" },
            { text: "Scratch was there! Was there! I swear on sandwich!",                                                                     ok: false, tip: "拿证据说话：I have my copy of the inspection form right here" },
            { text: "Fine, I pay. How much money? Take all.",                                                                                 ok: false, tip: "别急着认账：The scratch is marked on my copy of the form" },
          ],
          phrase: { en: "It's in the notes.", zh: "记录里有这一条。", note: "被质疑时的底气句——前提是取车时认真验车" },
        },
        {
          npcLines: [
            "Let me see that... huh. The date, the signature — this checks out. You're right, the scratch was pre-existing. My apologies!",
            "May I? ...Well, look at that. Dated and signed — completely legit. You're right, that scratch was already there. Apologies!",
            "Can I take a look... I'll be darned. Dated, signed, all official. You're absolutely right — pre-existing damage. Sorry about that!",
          ],
          npcZh: "我看看……嗯。日期、签名——没问题。你说得对，划痕是原有的。抱歉！",
          task: "礼貌接受道歉，强调只是流程确认",
          options: [
            { text: "No worries — that's exactly why we did the walk-around together. Just glad I kept the form!", ok: true,  tip: "No worries 大度化解 + 点出验车流程的意义" },
            { text: "Apology small. I want big apology. Manager now.",                                            ok: false, tip: "大度回应：No worries — glad I kept the form!" },
            { text: "You lie first, now sorry. I tell internet everything.",                                       ok: false, tip: "得体收场：No worries — that's why we did the walk-around" },
          ],
          phrase: { en: "No worries — that's exactly why...", zh: "没事——这正是为什么……", note: "化解尴尬的黄金句式；解释做事目的时用它" },
        },
        {
          npcLines: [
            "Lesson learned on my end! Okay, let me print your final bill. You'll see the rental, the insurance, and the tolls itemized.",
            "Fair enough, lesson for me! Here comes your final invoice — rental charge, insurance, and the tolls, all itemized for you.",
            "Touché! Let me get your final statement. Line items: rental, insurance coverage, and your toll charges.",
          ],
          npcZh: "这教训我记下了！好，我打印你的最终账单。你会看到租金、保险和过路费逐项列出。",
          task: "逐项核对账单",
          options: [
            { text: "Thanks. Let me check the itemized bill... rental, insurance, tolls — everything matches my contract.", ok: true, tip: "itemized 逐项列出的 + matches my contract 与合同一致" },
            { text: "Bill numbers too many. Skip to end.",                                                                 ok: false, tip: "逐项核对：everything matches my contract" },
            { text: "Reading is slow. You read, I nod.",                                                                   ok: false, tip: "自己核对：Everything matches my contract" },
          ],
          phrase: { en: "Let me check the itemized bill.", zh: "我来看一下明细账单。", note: "itemized bill 明细账单；结账必看，防多收" },
        },
        {
          npcLines: [
            "All correct! I'll release your deposit hold right now — the two hundred will be back on your card in a few days. Anything else before you go?",
            "Checks out perfectly! Releasing your deposit hold as we speak — the two hundred lands back on your card in three to five days. Anything else?",
            "Everything's in order! Deposit hold released this minute — two hundred back on your card in a few days. Can I do anything else for you?",
          ],
          npcZh: "全部无误！我现在解除你的押金预授权——200 美元几天内回到卡上。走之前还有别的吗？",
          task: "要一张账单收据存底",
          options: [
            { text: "Could I get a printed copy of the final receipt, please? For my records.", ok: true,  tip: "for my records 留档备查，办事周全" },
            { text: "Receipt? Email is enough. Actually no receipt. Actually yes. Maybe.",      ok: false, tip: "明确要一份：Could I get a printed copy — for my records?" },
            { text: "Printed copy plus five more copies. One per day of week.",                ok: false, tip: "一份存底即可：For my records" },
          ],
          phrase: { en: "Could I get a copy, for my records?", zh: "能给我一份留档吗？", note: "for my records 万能后缀；任何单据都值得留一份" },
        },
        {
          npcLines: [
            "Of course — one final receipt, coming right up! It was a pleasure renting to you. Come see us again!",
            "You got it — printing now! Honestly, a top-tier customer. We'll see you next time!",
            "Sure thing — hot off the printer! A real pleasure, start to finish. Safe travels, and come back soon!",
          ],
          npcZh: "当然——最终收据马上好！很高兴为您服务。下次再来！",
          task: "友好道别",
          options: [
            { text: "Thank you! Despite the scratch drama, it was a great rental. See you next trip!", ok: true,  tip: "幽默回顾小插曲 + 预告复购" },
            { text: "Next trip never. Scratch trauma forever.",                                       ok: false, tip: "轻松收尾：It was a great rental — see you next trip!" },
            { text: "Bye. Tell rear door I won.",                                                     ok: false, tip: "礼貌告别：Thank you — see you next trip!" },
          ],
          phrase: { en: "It was a great rental. See you next trip!", zh: "这次租车体验很棒，下次旅途见！", note: "回顾 + 展望的收尾句；drama = 小插曲" },
        },
      ],
    },
  ],
},
