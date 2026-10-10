    {
      id: "v3",
      title: "第 3 次光顾 · 还书与过期",
      titleEn: "Returns & Overdue Books",
      emoji: "⏰",
      desc: "还书去哪儿还？书过期了有罚款吗？逾期、丢书、损坏的处理流程全在这轮。",
      reward: { en: "fine", zh: "你搞定了过期罚款，还书流程门儿清！⏰" },
      steps: [
        {
          npcLines: [
            "Hello! What can I do for you today?",
            "Hi there! Returns? Questions? Fire away.",
            "Good afternoon! What brings you in?",
          ],
          npcZh: "您好！今天有什么可以帮您？",
          task: "说明来意：还两本书，另外有件事想问",
          options: [
            { text: "Hi! I'm returning two books — and I have a quick question about one of them.", ok: true, tip: "I'm returning... + I have a quick question——先还书再提问，结构清晰" },
            { text: "Book. Here. Take.",  ok: false, tip: "完整句：I'm returning two books" },
            { text: "These books chased me here. Keep them away.", ok: false, tip: "正常表达：I'm returning two books, and I have a question" },
          ],
          phrase: { en: "I'm returning ___.", zh: "我来还……。", note: "return 归还；I'm returning 用进行时表达当前目的" },
        },
        {
          npcLines: [
            "Perfect, I'll check those in... Hmm, this first one is three days overdue. There's a small fine — one dollar fifty.",
            "Let me scan these... Oh — this one's three days late. That's a dollar fifty.",
            "Checking them in... This first one's overdue by three days. Small fine: a dollar fifty.",
          ],
          npcZh: "好的，我登记一下……嗯，第一本逾期三天了。有个小罚款——一美元五十美分。",
          task: "道歉并询问怎么交罚款",
          options: [
            { text: "Oh, my bad — totally slipped my mind. How do I pay the fine?", ok: true,  tip: "my bad 口语认错 + slipped my mind 忘了；直接问怎么交" },
            { text: "Three days late? The book needed me more.", ok: false, tip: "认错+处理：My bad, how do I pay the fine?" },
            { text: "No fine. We are friends now, you and I.",  ok: false, tip: "逾期罚款照交：How do I pay the fine?" },
          ],
          phrase: { en: "It totally slipped my mind.", zh: "我完全忘了。", note: "slip one's mind = 忘掉（不是故意）；认错的体面说法" },
        },
        {
          npcLines: [
            "No worries — happens all the time! You can pay here by card, or online through your account.",
            "All good, it's common! Card here at the desk, or online anytime.",
            "Not a problem! Right here with a card, or online in your account — dealer's choice.",
          ],
          npcZh: "没事——这种事常发生！可以在前台刷卡，或在账户里线上支付。",
          task: "前台交罚款",
          options: [
            { text: "I'll pay here by card, please.", ok: true,  tip: "I'll pay here by card 前台刷卡付款" },
            { text: "Can I pay in spaghetti?",  ok: false, tip: "付款方式：I'll pay here by card" },
            { text: "Card online here desk now?", ok: false, tip: "完整句：I'll pay here by card, please" },
          ],
          phrase: { en: "I'll pay by card / in cash.", zh: "我刷卡/现金付款。", note: "by card 刷卡 / in cash 现金——介词不同" },
        },
        {
          npcLines: [
            "Done! Now — you mentioned a question about one of the books?",
            "All settled! What was that question you wanted to ask?",
            "Great, fine's cleared! Now, about that question of yours?",
          ],
          npcZh: "好了！那么——您说关于其中一本书有问题想问？",
          task: "坦白：另一本书洒了咖啡，问怎么处理",
          options: [
            { text: "Yes — I accidentally spilled coffee on the other book. The cover is stained. What should I do?", ok: true, tip: "spill 洒了 + stained 有污渍；主动坦白是诚信第一步" },
            { text: "The book came to me like that. Coffee rain, very sad.",  ok: false, tip: "诚实说明：I spilled coffee on it, what should I do?" },
            { text: "What other book? I see no book. I am a book ghost.",     ok: false, tip: "主动坦白：I spilled coffee on the book" },
          ],
          phrase: { en: "I accidentally spilled ___ on it.", zh: "我不小心把……洒在上面了。", note: "accidentally /ˌæksɪˈdentəli/ 不小心地；诚实+补救=好结果" },
        },
        {
          npcLines: [
            "Thanks for being honest! Let me take a look... It's mostly the cover. We'll charge a small cleaning fee — three dollars. No replacement needed.",
            "I appreciate you telling me! Hmm, the damage is minor. Just a three-dollar cleaning fee — no big deal.",
            "Honesty is the best policy! This is light damage — three bucks for cleaning and we're square.",
          ],
          npcZh: "谢谢您的诚实！我看看……主要污在封面。我们收三美元清洁费，不用赔偿整本。",
          task: "接受处理并道谢",
          options: [
            { text: "That's fair — three dollars it is. Thank you for being so understanding!", ok: true, tip: "That's fair 接受处理 + 感谢通情达理——坦白换来轻处理" },
            { text: "Three dollars?! The coffee was premium!", ok: false, tip: "接受合理处理：That's fair, thank you" },
            { text: "No pay. The stain is modern art now.",    ok: false, tip: "照章处理：Three dollars it is, thanks" },
          ],
          phrase: { en: "That's fair.", zh: "这很合理。", note: "对处理结果表示认可的爽快说法" },
        },
        {
          npcLines: [
            "You're welcome! Last thing — next time, you can use the book drop outside for returns, even when we're closed.",
            "Anytime! Oh, and heads-up: the outside book drop takes returns 24/7.",
            "My pleasure! Quick tip — the book drop by the front door works around the clock.",
          ],
          npcZh: "不客气！最后一件事——下次还书可以用门口的还书箱，闭馆后也能还。",
          task: "确认还书箱用法并告别",
          options: [
            { text: "Oh nice, the book drop — good to know. Thanks, have a great day!", ok: true, tip: "good to know 记下了；book drop 还书箱" },
            { text: "I will return books by pigeon from now on.", ok: false, tip: "实用信息：the book drop, good to know!" },
            { text: "Twenty-four seven? Math is hard.",  ok: false, tip: "自然回应：Good to know, thanks a lot!" },
          ],
          phrase: { en: "Good to know!", zh: "这信息很有用，记下了！", note: "接收新信息的地道回应；比 Thank you 更显你在认真听" },
        },
      ],
    },
