    {
      id: "v5",
      title: "第 5 次光顾 · 签售会之夜",
      titleEn: "Book Signing Night",
      emoji: "🖊️",
      desc: "周六晚上，你最喜欢的作者来书店办签售会。排队、简短交流、请作者题字——追星也要用英文。",
      reward: { en: "book signing", zh: "你拿到了偶像作者的亲笔签名！🖊️" },
      steps: [
        {
          npcLines: [
            "Evening! Big night tonight — the author of your favorite series is here signing books. Do you have a ticket?",
            "Good evening! You're here for the signing, right? The star author is in the house! Ticket, please?",
            "Hi! What a night — we've got a famous author signing books in the back! Do you have your event ticket?",
          ],
          npcZh: "晚上好！今晚是大事——你最喜欢的系列作者来店里签售。你有票吗？",
          task: "出示手机上的电子票",
          options: [
            { text: "Yes, here's my ticket on my phone. I'm so excited to meet her!", ok: true,  tip: "Here's my ticket 出示 + 表达兴奋" },
            { text: "Ticket? I am ticket. Let in.",                                   ok: false, tip: "出示票即可：Here's my ticket on my phone" },
            { text: "I hide in bookshelf since morning. No ticket need.",             ok: false, tip: "正常出示门票：Here's my ticket" },
          ],
          phrase: { en: "Here's my ticket.", zh: "这是我的票。", note: "入场出示凭证万能句，纸质票电子票通用" },
        },
        {
          npcLines: [
            "Scanned and you're in! The signing line starts at the back of the store. She'll personalize books too — that's rare!",
            "You're all set! The signing queue forms in the back. And good news — she's personalizing books, not just signing!",
            "Welcome in! Join the line at the back of the store. Bonus: she writes a personal message in each book. Not every author does that!",
          ],
          npcZh: "扫码通过！签售队伍在店后面排。她还会写个性化题字——这很少见！",
          task: "询问 personalize（题字）是什么意思",
          options: [
            { text: "Personalize? Does that mean she writes my name in the book?", ok: true,  tip: "确认理解：Does that mean...? 学新词的地道问法" },
            { text: "Personal what? English hard. Skip.",                          ok: false, tip: "确认理解：Does that mean she writes my name in the book?" },
            { text: "She write my diary? Why diary?",                              ok: false, tip: "personalize = 题字：Does that mean she writes my name in the book?" },
          ],
          phrase: { en: "Does that mean ___?", zh: "那是说……的意思吗？", note: "听到新表达时的确认句式，比假装听懂好一百倍" },
        },
        {
          npcLines: [
            "Exactly! Tell the assistant your name, and she'll write 'To ___, best wishes' right on the title page. The line's moving — you're up next!",
            "You got it! Give your name to her assistant, and she'll inscribe 'To ___, best wishes' on the title page. Oh — you're next in line!",
            "That's it! The assistant takes your name, she writes 'To ___' with best wishes inside the cover. Look, you're next!",
          ],
          npcZh: "没错！告诉助理你的名字，她会在扉页写上『To ___，祝好』。队伍在动——下一个就是你了！",
          task: "轮到你，向作者问好",
          options: [
            { text: "Hello! I'm a huge fan — your books got me into reading mysteries.", ok: true,  tip: "I'm a huge fan + got me into... 简短真诚的粉丝开场" },
            { text: "You are author! I know! Sign fast.",                               ok: false, tip: "简短真诚：I'm a huge fan — your books got me into mysteries" },
            { text: "Hello. Weather is nice today. Yes.",                               ok: false, tip: "表明粉丝身份：I'm a huge fan of your books" },
          ],
          phrase: { en: "I'm a huge fan of ___.", zh: "我是……的铁杆粉丝。", note: "追星开场白；got me into... = 让我爱上了……" },
        },
        {
          npcLines: [
            "That means the world to me — thank you! What name should I write in your book?",
            "Oh, that's why I write! Thank you! And what's the name for the inscription?",
            "Hearing that never gets old — thank you so much! What name shall I put in here?",
          ],
          npcZh: "这对我意义重大——谢谢！我在你书上写什么名字？",
          task: "告诉作者你的名字",
          options: [
            { text: "Please write 'To Li Wei'. And thank you for signing for me!", ok: true,  tip: "Please write 'To ___' 告知题字名 + 致谢" },
            { text: "Name? Write mystery name. Surprise me.",                     ok: false, tip: "直接报名字：Please write 'To Li Wei'" },
            { text: "No name. Sign only. Quick quick.",                           ok: false, tip: "题字更有纪念意义：Please write 'To Li Wei'" },
          ],
          phrase: { en: "Please write 'To ___'.", zh: "请写『致某某』。", note: "签售题字指定句；inscribe 题字 / autograph 签名" },
        },
        {
          npcLines: [
            "'To Li Wei, best wishes' — there we go! It was lovely to meet you. Enjoy the rest of the event!",
            "All done — 'To Li Wei, best wishes'! Wonderful meeting you. Have a great night!",
            "'To Li Wei, best wishes' — signed and sealed! A pleasure to meet you. Enjoy your evening!",
          ],
          npcZh: "『致李伟，祝好』——好了！很高兴见到你。享受接下来的活动吧！",
          task: "向作者道别",
          options: [
            { text: "It was an honor to meet you. Thank you so much — enjoy your evening!", ok: true,  tip: "It was an honor 表达荣幸 + 双向祝福" },
            { text: "Bye famous person! Tell friends I met you.",                          ok: false, tip: "表达荣幸即可：It was an honor to meet you" },
            { text: "One more signature. For my dog.",                                     ok: false, tip: "队伍还长，道别即可：It was an honor to meet you" },
          ],
          phrase: { en: "It was an honor to meet you.", zh: "见到您是我的荣幸。", note: "见偶像/名人的标准收尾；honor = 荣幸" },
        },
        {
          npcLines: [
            "How was it? Meeting her is pretty special, right? We do these events every month — check our newsletter by the door.",
            "So, how was meeting the author? Magical, right? We host signings monthly — sign up for our newsletter before you go!",
            "Well? Worth the wait? We run author events every month — grab a newsletter by the door so you never miss one!",
          ],
          npcZh: "怎么样？见到本人很特别吧？我们每月都有这类活动——走之前看看门口的活动通讯。",
          task: "赞美活动并表示会关注后续",
          options: [
            { text: "Truly special. I'll definitely sign up — I don't want to miss the next one!", ok: true,  tip: "Truly special 赞美 + sign up 表行动" },
            { text: "Newsletter is paper. I no like paper.",                                      ok: false, tip: "订阅活动通知：I'll definitely sign up" },
            { text: "Every month? Author every month? Same author?",                               ok: false, tip: "关注活动即可：I don't want to miss the next one!" },
          ],
          phrase: { en: "I don't want to miss the next one!", zh: "我可不想错过下一场！", note: "miss = 错过；表达期待复购的黄金话术" },
          adds: [{ emoji: "🖊️", label: "Signed book", wordId: "book-event" }],
        },
      ],
    },
  ],
},
