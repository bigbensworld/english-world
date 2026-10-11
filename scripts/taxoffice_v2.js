    {
      id: "v2",
      title: "第 2 次光顾 · 收到补税信",
      titleEn: "The CP2000 Letter",
      emoji: "✉️",
      desc: "一封 IRS 公函吓坏了你！CP2000 说你漏报收入。别慌——学读通知函、核对信息、正当申辩。",
      reward: { en: "dispute", zh: "你冷静化解了补税风波！✉️" },
      steps: [
        {
          npcLines: [
            "Good afternoon! You look worried — what can I help you with today?",
            "Afternoon! Oh, that's a concerned face. What's going on?",
            "Hi there! Taxpayer Assistance — you alright? What do you need?",
          ],
          npcZh: "下午好！你看起来很焦虑——今天有什么需要帮忙？",
          task: "说明收到一封吓人的 IRS 信",
          options: [
            { text: "I received this letter from the IRS, and I'm quite worried. Can you help me understand it?", ok: true,  tip: "receive a letter + worried + 请求解释，冷静三步走" },
            { text: "SCARY LETTER! GOVERNMENT ANGRY! I FLEE COUNTRY!",                                           ok: false, tip: "冷静求助：Can you help me understand this letter?" },
            { text: "Letter say numbers. Numbers big. Heart small now.",                                         ok: false, tip: "求助窗口：Can you help me understand it?" },
          ],
          phrase: { en: "I received a letter from the IRS.", zh: "我收到了一封 IRS 的信。", note: "IRS 美国国税局；收公函先别慌，先读懂" },
        },
        {
          npcLines: [
            "Let me see... this is a CP2000 notice. First, take a breath — this is not an audit. It says the income on your return didn't match your W-2.",
            "Okay, let's look... a CP2000 notice. Deep breath — this is NOT an audit. It's saying your reported income doesn't match your W-2.",
            "Ah, the famous CP2000! Breathe — not an audit, I promise. It's flagging a mismatch between your return and your W-2 income.",
          ],
          npcZh: "我看看……这是 CP2000 通知。先深呼吸——这不是审计。它说你申报的收入和 W-2 不符。",
          task: "确认理解：不是审计，只是收入不符",
          options: [
            { text: "So it's not an audit — just a mismatch? That's a relief. But I don't understand — I reported everything on my W-2.", ok: true, tip: "That's a relief + 复述理解 + 提出矛盾点" },
            { text: "NOT AUDIT? HAPPY DAY! Ignore letter then! Goodbye!",                                                                  ok: false, tip: "仍需处理：I reported everything — so why the mismatch?" },
            { text: "Mismatch? I am match person. I match socks. I match taxes.",                                                          ok: false, tip: "指出矛盾：I reported everything on my W-2" },
          ],
          phrase: { en: "That's a relief.", zh: "那就松了口气。", note: "relief 宽慰；听懂利好信息后的标准回应" },
        },
        {
          npcLines: [
            "I believe you — here's the thing: your employer submitted a corrected W-2 in March. The original showed only your main job income, but the corrected one includes a bonus.",
            "I don't doubt you! Here's what happened: your employer filed a corrected W-2 in March. Original showed salary only — the corrected version added a bonus.",
            "You probably did! The catch: your employer filed a corrected W-2 back in March. The first one missed a bonus payment.",
          ],
          npcZh: "我相信你——事情是这样的：你的雇主 3 月提交了一份更正的 W-2。原始版只有工资，更正版含一笔奖金。",
          task: "询问该怎么办",
          options: [
            { text: "I see — so what are my options? Should I pay the difference or respond to the letter?", ok: true,  tip: "What are my options? 选项式提问——决策思维" },
            { text: "Employer fault! I call employer! Anger phone call!",                                    ok: false, tip: "先了解选项：What are my options?" },
            { text: "Pay everything now. Pay twice. Overpay for safety.",                                    ok: false, tip: "了解选项再行动：Should I pay or respond to the letter?" },
          ],
          phrase: { en: "What are my options?", zh: "我有哪些选择？", note: "options 选项；理性应对的黄金问句" },
        },
        {
          npcLines: [
            "You have two: pay the difference — about three hundred dollars — or dispute it if you believe the letter is wrong. You have thirty days to respond.",
            "Two paths: pay the three-hundred-dollar difference, or dispute it within thirty days if you think it's wrong.",
            "Your options: one, pay the roughly three hundred owed. Two, dispute it — but respond within thirty days either way.",
          ],
          npcZh: "两个选择：补缴约 300 美元差额，或者如果你认为信有误可以申辩。30 天内必须回应。",
          task: "核对后确认：奖金确实发过，接受补缴",
          options: [
            { text: "Let me think... yes, I did receive that bonus. I'll pay the difference — it's legitimate.", ok: true,  tip: "legitimate 合理合法的——确认无误后果断接受" },
            { text: "Bonus? Maybe bonus. Memory foggy. Pay maybe money.",                                      ok: false, tip: "核对银行记录：I did receive that bonus — I'll pay" },
            { text: "Dispute! Dispute everything! Dispute weather! Dispute gravity!",                           ok: false, tip: "确属漏报就补缴：It's legitimate — I'll pay the difference" },
          ],
          phrase: { en: "I'll pay the difference.", zh: "我会补缴差额。", note: "the difference 差额；确认有理有据后爽快认账" },
        },
        {
          npcLines: [
            "An honest taxpayer — refreshing! Now, would you like to pay it all at once, or set up an installment plan if that's easier?",
            "Honesty — the best policy, and rare these days! Paying in full today, or would an installment plan suit you better?",
            "Love the integrity! So: full payment today, or shall we set up an installment plan to spread it out?",
          ],
          npcZh: "诚实的纳税人——清新！想一次付清，还是设置分期付款计划更轻松？",
          task: "询问分期付款的条件",
          options: [
            { text: "What would an installment plan look like — how many months, and is there a fee?", ok: true,  tip: "问清条款再决策——installment plan 的月数和费用" },
            { text: "Installment sounds fancy. Like furniture store. Explain plan.",                  ok: false, tip: "问具体条款：How many months, and is there a fee?" },
            { text: "No plan. Spontaneous payment only. Money mood.",                                 ok: false, tip: "了解选项：What would the plan look like?" },
          ],
          phrase: { en: "Is there a fee?", zh: "有手续费吗？", note: "分期常伴 setup fee 设置费——问清再选" },
        },
        {
          npcLines: [
            "Installments would be about sixty a month for six months, with a small setup fee of twenty-two dollars. But honestly, for three hundred, paying in full saves you the fee.",
            "Roughly sixty monthly for six months, plus a twenty-two-dollar setup fee. Though for three hundred total, full payment avoids the fee entirely.",
            "Sixty a month, half a year, twenty-two to set up. But truthfully? For three hundred, one payment skips the fee — your call!",
          ],
          npcZh: "分期大约每月 60 美元付 6 个月，另有 22 美元设置费。不过说实话，300 的金额一次付清更省手续费。",
          task: "选择一次付清并完成办理",
          options: [
            { text: "Then I'll pay in full today — no reason to pay a fee. Can I pay by card right here?", ok: true,  tip: "pay in full 一次付清 + 当场办结的闭环意识" },
            { text: "Fee avoid! Full pay! Card here? Good!",                                               ok: false, tip: "完整表达：I'll pay in full today — can I pay by card right here?" },
            { text: "Sixty monthly forever. Never end. Subscription tax.",                                 ok: false, tip: "一次付清省费用：Can I pay by card right here?" },
          ],
          phrase: { en: "I'll pay in full.", zh: "我一次付清。", note: "pay in full 全额支付；小额欠款的最优解" },
          adds: [{ emoji: "✉️", label: "CP2000 resolved", wordId: "tax-letter" }],
        },
        {
          npcLines: [
            "Card works right here! ...All done — here's your receipt and proof of payment. Keep those with the CP2000 letter forever. You handled this like a pro!",
            "Card it is! ...Processed! Receipt plus proof of payment — staple them to the CP2000 and keep them forever. Nicely handled!",
            "Right this way with the card!... Done and done! Your receipt and payment proof — file them with that letter permanently. You were great today!",
          ],
          npcZh: "可以刷卡！……办好了——这是收据和付款凭证。把它们和 CP2000 信一起永久保存。你处理得非常专业！",
          task: "道谢并确认存档习惯",
          options: [
            { text: "I'll keep everything in one folder — tax paperwork is clearly not something to lose. Thank you!", ok: true,  tip: "not something to lose 双重否定强调——存档意识" },
            { text: "Folder? I have shoebox. Shoebox is folder. Shoebox life.",                                      ok: false, tip: "规范存档：I'll keep everything in one folder — thank you!" },
            { text: "Forever is long. Keep until Tuesday. Tuesday enough.",                                          ok: false, tip: "税务文件要长期保存：I'll keep everything in one folder" },
          ],
          phrase: { en: "I'll keep everything in one folder.", zh: "我会把所有文件放在一个文件夹里。", note: "税务文件建议至少保存 7 年——审计追溯期" },
        },
      ],
    },
