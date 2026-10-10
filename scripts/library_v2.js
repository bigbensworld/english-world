    {
      id: "v2",
      title: "第 2 次光顾 · 预约热门书",
      titleEn: "Placing a Hold",
      emoji: "🤙",
      desc: "想借的书全被借走了？学会预约（place a hold）、等通知、到馆取书——热门书这样借。",
      reward: { en: "place a hold", zh: "你学会了预约热门书，不用白跑！🤙" },
      steps: [
        {
          npcLines: [
            "Welcome back! What can I do for you today?",
            "Hi again! Back for more books?",
            "Good to see you again! What are we looking for today?",
          ],
          npcZh: "欢迎回来！今天有什么可以帮您？",
          task: "说明来意：找一本烹饪书",
          options: [
            { text: "Hi! I'm looking for a cookbook — the Italian one that everyone's talking about.", ok: true, tip: "I'm looking for... + 描述书的特征，馆员帮你查" },
            { text: "The famous book. Cooking one. Hurry.",  ok: false, tip: "礼貌+信息：I'm looking for a cookbook about Italian food" },
            { text: "I want the book that everyone has but me.", ok: false, tip: "说出具体类型：I'm looking for a cookbook" },
          ],
          phrase: { en: "I'm looking for ___.", zh: "我在找……。", note: "找书万能开场；配上书名/类型/作者更高效" },
        },
        {
          npcLines: [
            "Oh, that one! Let me check the catalog... All copies are checked out right now. The wait is about two weeks.",
            "The famous Italian cookbook! Good news and bad news — it's super popular. Every copy is out.",
            "Let me look... Yep, all copies are borrowed. It's a hot one right now!",
          ],
          npcZh: "哦，那本！我查查目录……现在所有副本都借出去了。等待期大约两周。",
          task: "询问能否预约排队",
          options: [
            { text: "That's okay — can I place a hold on it?", ok: true,  tip: "place a hold 预约排队——热门书标准操作" },
            { text: "Two weeks?! I will cry in the corner now.", ok: false, tip: "预约排队：Can I place a hold on it?" },
            { text: "Tell the borrowers to give it back today.", ok: false, tip: "图书馆管不了别人：place a hold 排队等" },
          ],
          phrase: { en: "Can I place a hold on it?", zh: "我可以预约这本书吗？", note: "hold = 预留；place/put a hold on 都地道" },
        },
        {
          npcLines: [
            "Of course! I just need your card... Done. You're number three in line.",
            "Absolutely — scanning your card... There, you're third on the waitlist.",
            "Sure thing! You're number three in the queue. It'll move fast, I promise.",
          ],
          npcZh: "当然可以！扫一下您的卡……好了，您排在第三位。",
          task: "询问到书后会怎样通知",
          options: [
            { text: "Number three — got it. How will I know when it's ready?", ok: true, tip: "How will I know when...? 问通知方式" },
            { text: "Three people before me? Cancel everything.", ok: false, tip: "问通知方式：How will I know when it's ready?" },
            { text: "I will come every day and ask you. Every hour.", ok: false, tip: "不用跑腿：会自动通知，How will I know?" },
          ],
          phrase: { en: "How will I know when it's ready?", zh: "到书了我怎么知道？", note: "预约后必问；图书馆一般发短信或邮件 notify" },
        },
        {
          npcLines: [
            "We'll notify you by text or email — you can pick how in your account. Holds go on the shelf behind me for seven days.",
            "You'll get a text or email — your choice. Once it's in, we keep it for a week.",
            "We'll send a notification! Books wait on the hold shelf for seven days before going to the next person.",
          ],
          npcZh: "我们会短信或邮件通知您——在账户里可以选。预约的书在后面书架保留七天。",
          task: "确认取书流程",
          options: [
            { text: "Perfect — so I come to the hold shelf with my card within seven days?", ok: true, tip: "复述流程确认理解——hold shelf 预约架 + 七天期限" },
            { text: "Seven days? I will come in seven months.", ok: false, tip: "确认期限：within seven days, right?" },
            { text: "Text me the book itself. Books fit in phones.", ok: false, tip: "取书流程：到馆 hold shelf + 出示卡" },
          ],
          phrase: { en: "Just to confirm, ___.", zh: "确认一下，……。", note: "复述关键流程防误会——办事标准动作" },
        },
        {
          npcLines: [
            "Exactly! Anything else today? Our cookbook section is right over there, by the way — other titles are available now.",
            "That's it! And hey, the cookbook shelf's right there if you want something to read while you wait.",
            "You got it! By the way, other cookbooks are on shelf three — no waiting on those.",
          ],
          npcZh: "正是！今天还有其他需要吗？顺便说，烹饪书区就在那边——其他书现在就能借。",
          task: "顺势借一本当下能借的烹饪书",
          options: [
            { text: "Actually, yes — I'll grab a baking book while I wait for the hold. Thanks for the tip!", ok: true, tip: " Thanks for the tip 谢谢指点；顺势满足需求是高效沟通" },
            { text: "No. I only want the famous one. All or nothing.", ok: false, tip: "灵活变通：I'll grab a baking book while I wait" },
            { text: "Baking is for cowards. Real cooks boil pasta.",   ok: false, tip: "接受推荐：I'll grab one while I wait, thanks!" },
          ],
          phrase: { en: "I'll grab ___ while I wait.", zh: "等的时间我先拿……。", note: "grab = 随手拿（口语）；while I wait 表时间差" },
        },
        {
          npcLines: [
            "Smart move! That's everything on this book — enjoy your baking, and we'll text you soon!",
            "Great pick! We'll be in touch about your hold. Happy baking!",
            "Love it! You'll hear from us the moment the Italian one comes back. Enjoy!",
          ],
          npcZh: "聪明！这本书就办这些——祝您烘焙愉快，我们会尽快短信通知您！",
          task: "礼貌告别",
          options: [
            { text: "Will do — thanks so much for your help!", ok: true,  tip: "Will do 好的（答应动作）+ 道谢收尾" },
            { text: "Whatever. Textbook me the book.",         ok: false, tip: "自然告别：Thanks so much for your help!" },
            { text: "You too enjoy. Bye house of books.",      ok: false, tip: "标准收尾：Will do, thanks a lot!" },
          ],
          phrase: { en: "Will do!", zh: "好的，就这么办！", note: "答应对方建议的爽快回答，美式口语高频" },
        },
      ],
    },
