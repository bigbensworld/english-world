  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 找书买书",
      titleEn: "Finding a Book",
      emoji: "📖",
      desc: "第一次来这家书店。找一本书、比对版本、付钱包装——完整走一遍英文购书流程。",
      reward: { en: "fiction", zh: "你用英文买到了心仪的小说！📚" },
      steps: [
        {
          npcLines: [
            "Hi there! Welcome to Page & Co. Are you looking for anything in particular today?",
            "Hello! Welcome in. Just so you know, I'm happy to help you find something — anything specific on your list?",
            "Good afternoon! Welcome to Page & Co. Looking for a particular book, or just browsing?",
          ],
          npcZh: "你好！欢迎来到 Page & Co 书店。今天在找什么特别的书吗？",
          task: "说明自己在找一本小说",
          options: [
            { text: "Hi! Yes, I'm looking for a novel called The Midnight Library. Do you have it?", ok: true,  tip: "I'm looking for... 直接说明来意 + 书名用 called 引出" },
            { text: "Book! Give book!",  ok: false, tip: "说明找什么：I'm looking for a novel called..." },
            { text: "No speak English.", ok: false, tip: "大胆开口：I'm looking for a novel..." },
          ],
          phrase: { en: "I'm looking for ___.", zh: "我在找……", note: "买东西万能开场：书、衣服、纪念品都能套" },
        },
        {
          npcLines: [
            "The Midnight Library... great pick! Let me check. Is that the Matt Haig novel, right?",
            "Ooh, good taste! The Midnight Library by Matt Haig, yes? One second, let me check our system.",
            "Nice choice — that book flies off the shelves! Matt Haig, right? Let me look it up.",
          ],
          npcZh: "《午夜图书馆》……好眼光！让我查一下。是 Matt Haig 的那本对吧？",
          task: "确认就是这本书",
          options: [
            { text: "Yes, that's the one. Is it in stock?", ok: true,  tip: "That's the one 确认 + in stock 问有货" },
            { text: "Maybe? I don't remember author.",      ok: false, tip: "店员已报书名作者，确认即可：Yes, that's the one" },
            { text: "No, I want different book same name.",  ok: false, tip: "就是这本：Yes, that's the one — 然后问 in stock" },
          ],
          phrase: { en: "Is it in stock?", zh: "有货吗？", note: "in stock = 有现货；out of stock = 缺货" },
        },
        {
          npcLines: [
            "Good news — we have it! Would you like the paperback or the hardcover?",
            "You're in luck, it's in stock! Paperback or hardcover for you today?",
            "We've got it on the shelf right now! So — paperback, or the hardcover edition?",
          ],
          npcZh: "好消息——有货！你想要平装本还是精装本？",
          task: "选平装本（更便宜便携）",
          options: [
            { text: "Paperback, please. It's lighter to carry around.", ok: true,  tip: "给出选择 + 附理由，交流更自然" },
            { text: "Hardcover is book. Book is hard.",                 ok: false, tip: "选平装：Paperback, please" },
            { text: "Both? Free?",                                      ok: false, tip: "二选一即可：Paperback, please" },
          ],
          phrase: { en: "Paperback, please.", zh: "请给我平装本。", note: "paperback 平装 / hardcover 精装，买书必备二选一" },
          adds: [{ emoji: "📖", label: "Paperback", wordId: "book-paperback" }],
        },
        {
          npcLines: [
            "Paperback it is — fourteen ninety-nine. Anything else? We have a deal on notebooks today.",
            "Great, the paperback comes to fourteen ninety-nine. Can I interest you in anything else?",
            "The paperback is fourteen ninety-nine. Would you like to add anything else to that?",
          ],
          npcZh: "平装本 14.99。还需要别的吗？今天笔记本有优惠。",
          task: "只要这本书，去收银台结账",
          options: [
            { text: "That's all for today. Where's the cashier?", ok: true,  tip: "That's all 收尾 + cashier 收银台" },
            { text: "Notebook free? Give free notebook.",        ok: false, tip: "不需要就礼貌收尾：That's all for today" },
            { text: "Money! Take money!",                        ok: false, tip: "先问收银台位置：Where's the cashier?" },
          ],
          phrase: { en: "That's all for today.", zh: "今天就买这些。", note: "购物收尾万能句，店员追加推销时用它礼貌挡回" },
        },
        {
          npcLines: [
            "The cashier is right up front by the entrance. They'll get you all set up!",
            "You can pay at the register just by the door. They'll take care of you there.",
            "Checkout is at the front counter, next to the entrance. See you soon!",
          ],
          npcZh: "收银台就在入口处前面。他们帮你结账！",
          task: "到收银台付款",
          options: [
            { text: "Great, thank you for your help!", ok: true,  tip: "Thank you for your help 感谢协助，标准收尾" },
            { text: "You come too. Help pay.",        ok: false, tip: "礼貌道谢即可：Thank you for your help!" },
            { text: "Where is door?",                 ok: false, tip: "收银台在入口处，道谢离开即可" },
          ],
          phrase: { en: "Thank you for your help.", zh: "谢谢你的帮助。", note: "被指路/被帮助后的万能致谢" },
        },
        {
          npcLines: [
            "Hi! Just this one book today? That'll be fourteen ninety-nine.",
            "Hello! One paperback? Fourteen ninety-nine, please.",
            "Find everything okay? Just the one book — fourteen ninety-nine.",
          ],
          npcZh: "你好！今天就这一本书吗？一共 14.99。",
          task: "付款并要收据",
          options: [
            { text: "Yes, just this one. Could I get a receipt, please?", ok: true,  tip: "Could I get a receipt? 礼貌要收据（退换货要用）" },
            { text: "Card. Beep. Done.",                                 ok: false, tip: "付款时补一句：Could I get a receipt, please?" },
            { text: "No receipt. Throw paper.",                          ok: false, tip: "留着退换用：Could I get a receipt?" },
          ],
          phrase: { en: "Could I get a receipt, please?", zh: "请给我一张收据好吗？", note: "买书必留收据——退换货的凭证" },
          adds: [{ emoji: "🧾", label: "Receipt", wordId: "book-receipt" }],
        },
        {
          npcLines: [
            "Of course! Card or cash? ...All done, here's your receipt and your book. Enjoy!",
            "No problem — card or cash? ...Here you go, receipt's in the bag. Happy reading!",
            "Sure thing! ...Processed! One receipt, one book. Enjoy the read!",
          ],
          npcZh: "当然！刷卡还是现金？……好了，这是收据和书。祝阅读愉快！",
          task: "道谢离开",
          options: [
            { text: "Thanks so much. Have a great day!", ok: true,  tip: "Have a great day 结束对话的万能祝福" },
            { text: "Book is mine now. Bye bye.",        ok: false, tip: "加一句祝福更自然：Have a great day!" },
            { text: "Give bag. More things.",            ok: false, tip: "已结完账，道谢离开即可" },
          ],
          phrase: { en: "Have a great day!", zh: "祝你今天愉快！", note: "购物道别标配，配上 Thanks so much 完美收尾" },
        },
      ],
    },
