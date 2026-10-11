    {
      id: "v4",
      title: "第 4 次光顾 · 书店文化课",
      titleEn: "Bookstore Culture",
      emoji: "🤫",
      desc: "独立书店的潜规则：不催顾客、集章卡、'只是随便看看'的默契、安静礼仪。懂行的人这样逛书店。",
      reward: { en: "browse", zh: "你已深谙独立书店文化！🤫" },
      steps: [
        {
          npcLines: [
            "Welcome back! Take your time looking around — we never rush anyone here.",
            "Hey, welcome in! Browse as long as you like — this is a no-pressure store.",
            "Good to see you! Wander freely — we believe bookstores should be savored, not sprinted through.",
          ],
          npcZh: "欢迎回来！慢慢逛——我们从不催顾客。",
          task: "表示理解并礼貌回应（先随便看看）",
          options: [
            { text: "Thank you — I'll just browse for now, but I'll ask if I need anything.", ok: true,  tip: "Just browsing 礼貌回应 + 需要时会问，书店社交默契" },
            { text: "You rush me? I feel rushed!",                                          ok: false, tip: "对方表示不催：Thank you — I'll just browse for now" },
            { text: "Browse? What is browse word?",                                         ok: false, tip: "browse = 随便逛逛：I'll just browse for now" },
          ],
          phrase: { en: "I'm just browsing, thanks.", zh: "我只是随便看看，谢谢。", note: "逛店被店员搭话的万能回应——礼貌且免打扰" },
        },
        {
          npcLines: [
            "Perfect answer. By the way — are you a coffee-table book person? We just got a gorgeous photography collection in.",
            "Love that. Oh — quick thing: we just got a stunning photography coffee-table book. Want a peek?",
            "A person after my own heart! Say — new photography collection just arrived. Big, beautiful, coffee-table sized. Interested?",
          ],
          npcZh: "完美的回答。对了——你是喜欢客厅大部头画册的人吗？我们刚进了一本超美的摄影集。",
          task: "婉拒大部头画册（家里放不下）",
          options: [
            { text: "It sounds beautiful, but my apartment is tiny — I don't have room for a big book!", ok: true,  tip: "It sounds beautiful, but... 先肯定再婉拒，礼貌满分" },
            { text: "Big book no. Small book yes. Change book.",                                        ok: false, tip: "婉拒要给理由：My apartment is tiny — no room for a big book" },
            { text: "Coffee table? I no drink coffee on table.",                                        ok: false, tip: "coffee-table book = 大开本画册；婉拒：It sounds beautiful, but..." },
          ],
          phrase: { en: "It sounds beautiful, but...", zh: "听起来很美，不过……", note: "先肯定再婉拒的万能句式，推销场景必备" },
        },
        {
          npcLines: [
            "Ha, totally fair — city apartments! Well, when you're ready: the poetry section is quiet and worth a look. It's our most underrated shelf.",
            "The classic small-apartment struggle! Well, whenever you're ready — the poetry section is criminally underrated.",
            "City living, am I right? Anyway, a tip from a regular: our poetry shelf is the most underrated corner of the store.",
          ],
          npcZh: "哈，完全理解——城里公寓嘛！你想看的时候：诗歌区很安静，值得一看。它是我们最被低估的书架。",
          task: "询问诗歌区在哪个通道",
          options: [
            { text: "I'd love to see it. Which aisle is the poetry section in?", ok: true,  tip: "I'd love to + Which aisle 问位置" },
            { text: "Poetry is boring. Where is fun section?",                  ok: false, tip: "不妨看看：I'd love to see it — Which aisle is it in?" },
            { text: "Underrated? Rate is bad?",                                 ok: false, tip: "underrated = 被低估；问位置：Which aisle is the poetry section in?" },
          ],
          phrase: { en: "Which aisle is ___ in?", zh: "……在哪个通道？", note: "超市书店通用方位问句；aisle 不发音的 s 是经典坑" },
        },
        {
          npcLines: [
            "Aisle two, right past the biography section. Oh — and when you're done, come find me about that membership card. It's a good deal for regulars.",
            "Aisle two, just beyond biographies! And hey — don't leave without asking me about the membership card. Regulars swear by it.",
            "Head to aisle two, past biography. One more thing — before you go, ask me about the membership card. It's made for people like you.",
          ],
          npcZh: "2 号通道，过了传记区就是。对了——逛完来找我办那张会员卡，对常客很划算。",
          task: "去诗歌区逛完后回来问会员卡",
          options: [
            { text: "Will do. So — tell me about the membership card. How does it work?", ok: true,  tip: "Will do 呼应 + How does it work 问机制" },
            { text: "Card talk later. I hide in poetry forever.",                        ok: false, tip: "回来问细节：Tell me about the membership card — how does it work?" },
            { text: "Good deal? Deal for me only? Suspicious.",                          ok: false, tip: "了解机制再判断：How does it work?" },
          ],
          phrase: { en: "How does it work?", zh: "它是怎么运作的？", note: "问规则/机制的万能句，办卡办会员必问" },
        },
        {
          npcLines: [
            "It's a stamp card! Every ten dollars earns a stamp. Ten stamps, and your next book is on the house — free!",
            "Here's the deal: it's a stamp card. Ten dollars spent, one stamp earned. Fill all ten stamps and your next book is on the house!",
            "Simple and sweet: a stamp card. A stamp for every ten dollars. Ten stamps later — boom — a free book, on the house!",
          ],
          npcZh: "是集章卡！每花 10 美元集一个章。集满 10 个章，下一本书我们请客——免费！",
          task: "对免费书表示惊喜并办卡",
          options: [
            { text: "A free book? Sign me up! Here's my first purchase for a stamp.", ok: true,  tip: "Sign me up 报名参加 + 顺势消费集章" },
            { text: "Ten stamp is too many. Five stamp only.",                       ok: false, tip: "规则如此，接受即可：A free book? Sign me up!" },
            { text: "On the house? House has books?",                                ok: false, tip: "on the house = 店家请客；Sign me up!" },
          ],
          phrase: { en: "Sign me up!", zh: "给我也办一张/算我一个！", note: "欣然接受提议的口语；on the house = 店家免费赠送" },
          adds: [{ emoji: "🪧", label: "Stamp card", wordId: "book-stamp" }],
        },
        {
          npcLines: [
            "There you go — card with one stamp! Last thing, a little store etiquette: we keep it quiet as a library in here. People come to read in peace.",
            "One stamped card, coming right up! Oh, and one house rule: we stay quiet as a library in here — folks like to read undisturbed.",
            "Card's yours, first stamp shiny and new! Friendly reminder of our one rule: quiet as a library. Our customers treasure the calm.",
          ],
          npcZh: "给你——卡上已有一个章！最后一件事，本店礼仪：这里要保持像图书馆一样安静。有人来这儿就是图个安静看书。",
          task: "表示理解和遵守",
          options: [
            { text: "Of course — quiet as a library. That's part of a bookstore's charm, isn't it?", ok: true,  tip: "复用对方短语表认同，聊文化顺便学表达" },
            { text: "I am loud talker. Deal with it.",                                            ok: false, tip: "入乡随俗：Of course — quiet as a library" },
            { text: "Library? This is store. Wrong word.",                                        ok: false, tip: "比喻说法：quiet as a library 安静如图书馆" },
          ],
          phrase: { en: "quiet as a library", zh: "像图书馆一样安静", note: "as...as 明喻结构；书店图书馆通用礼仪语" },
        },
      ],
    },
