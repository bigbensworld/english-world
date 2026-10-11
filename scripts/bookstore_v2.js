    {
      id: "v2",
      title: "第 2 次光顾 · 求推荐",
      titleEn: "Asking for Recommendations",
      emoji: "⭐",
      desc: "不知道读什么？让店员根据口味推荐。学描述喜好、问畅销榜、看封面推荐语。",
      reward: { en: "recommendation", zh: "你收获了一份专属书单推荐！⭐" },
      steps: [
        {
          npcLines: [
            "Welcome back! Back for more already? What are you in the mood for today?",
            "Hey, welcome back! Finished that book already? What kind of read are you after today?",
            "Back so soon — love to see it! What are you looking for this time?",
          ],
          npcZh: "欢迎回来！又来啦？今天想看点什么类型的？",
          task: "说明想找一本悬疑小说",
          options: [
            { text: "I'm in the mood for a mystery novel. Any recommendations?", ok: true,  tip: "be in the mood for 表达心情偏好 + 请求推荐" },
            { text: "Give me best book. Which best?",                          ok: false, tip: "说明类型：I'm in the mood for a mystery novel" },
            { text: "You choose. I wait here.",                                ok: false, tip: "先说想看什么类型，店员才好推荐" },
          ],
          phrase: { en: "I'm in the mood for ___.", zh: "我今天想看……", note: "mood = 心情；逛店买书买奶茶都能用" },
        },
        {
          npcLines: [
            "A mystery, nice! Quick question — do you prefer slow-burn puzzles or fast-paced thrillers?",
            "Ooh, mystery! Let me narrow it down: are you a slow-burn puzzle person or a fast-paced thriller person?",
            "Great genre! To find your match: slow and clever puzzles, or heart-pounding thrillers?",
          ],
          npcZh: "悬疑类，不错！快速问一下——你喜欢慢热的解谜还是快节奏的惊悚？",
          task: "选慢热解谜型",
          options: [
            { text: "Definitely slow-burn puzzles. I love figuring things out.", ok: true,  tip: "Definitely 明确表态 + figure things out 喜欢自己推理" },
            { text: "Fast! Slow book is boring book.",                          ok: false, tip: "表达偏好即可：Definitely slow-burn puzzles" },
            { text: "What is puzzle? I don't know book.",                       ok: false, tip: "选喜欢的节奏：slow-burn 慢热 / fast-paced 快节奏" },
          ],
          phrase: { en: "I love figuring things out.", zh: "我喜欢自己推理出真相。", note: "figure out = 搞明白；和店员聊书的核心动词" },
        },
        {
          npcLines: [
            "Then I've got the perfect author for you. Her new book just hit the bestseller list — it's a locked-room mystery.",
            "In that case, do I have an author for you! Her latest just made the bestseller list — a brilliant locked-room mystery.",
            "Say no more. There's an author whose new book just landed on the bestseller list — classic locked-room stuff.",
          ],
          npcZh: "那我有一位完美契合的作者。她的新书刚上畅销榜——一间密室悬疑。",
          task: "询问这本书是否畅销热卖",
          options: [
            { text: "Oh, it's a bestseller? Is it selling well here too?", ok: true,  tip: "bestseller 畅销书 + selling well 追问销量" },
            { text: "Best seller? I want worst seller.",                  ok: false, tip: "畅销书值得试：Is it selling well here too?" },
            { text: "What is room? Room locked why?",                     ok: false, tip: "先确认销量：Is it selling well here too?" },
          ],
          phrase: { en: "Is it selling well?", zh: "卖得好吗？", note: "问销量的地道说法；selling well = 销量好" },
        },
        {
          npcLines: [
            "Hugely! We can barely keep it in stock. Want to see it? The blurb on the back is what hooked me.",
            "It's flying off the shelves! Come take a look — the blurb on the back cover is what sold me on it.",
            "We restock it every week! Here, flip it over — read the blurb on the back. That's what got me.",
          ],
          npcZh: "超好！我们都快补不上货了。要看看吗？封底的推荐语当年就是它把我圈粉的。",
          task: "看封底推荐语后表达兴趣",
          options: [
            { text: "'A puzzle you won't be able to put down' — okay, you've convinced me. I'll take it!", ok: true,  tip: "put down 放不下手——引用 blurb 再表态，地道！" },
            { text: "Back cover words too small. Read for me.",                                         ok: false, tip: "读一句 blurb 表态：You've convinced me. I'll take it!" },
            { text: "Blurb is lying. All blurbs lie.",                                                   ok: false, tip: "被种草就大方接受：You've convinced me!" },
          ],
          phrase: { en: "You've convinced me. I'll take it.", zh: "你说服我了，我买了。", note: "被推荐种草后的标准回应；convince = 说服" },
          adds: [{ emoji: "⭐", label: "Bestseller", wordId: "book-best" }],
        },
        {
          npcLines: [
            "Excellent choice! It's sixteen dollars even. Would you like me to wrap it, or is a bag fine?",
            "Wonderful! That'll be sixteen even. Gift wrap, or just a bag today?",
            "Great pick! Sixteen even. Do you want it gift wrapped, or is a regular bag okay?",
          ],
          npcZh: "好选择！整 16 美元。要我包装一下吗，还是袋子就行？",
          task: "这是送朋友的礼物，请求礼品包装",
          options: [
            { text: "Actually, it's a gift for a friend — could you gift wrap it, please?", ok: true,  tip: "It's a gift + could you gift wrap it 送礼必备句" },
            { text: "Wrap in free paper only.",                                            ok: false, tip: "说明用途更自然：It's a gift for a friend — could you gift wrap it?" },
            { text: "Bag fine. Friend likes bag.",                                         ok: false, tip: "送礼可选包装：could you gift wrap it, please?" },
          ],
          phrase: { en: "Could you gift wrap it, please?", zh: "能帮我礼品包装一下吗？", note: "买礼物必问；wrap = 包装" },
          adds: [{ emoji: "🎁", label: "Gift wrap", wordId: "book-giftwrap" }],
        },
        {
          npcLines: [
            "Of course! One beautifully wrapped mystery, coming up. ...Here you are — your friend is lucky!",
            "Absolutely, let me just grab the wrapping paper... All done! Your friend's going to love it.",
            "My pleasure! ...Ta-da! Wrapped and ready. What a lucky friend!",
          ],
          npcZh: "当然！一份包得漂漂亮亮的悬疑小说马上好。……给您——您朋友真有福！",
          task: "感谢包装服务",
          options: [
            { text: "That's beautiful — thank you so much for wrapping it!", ok: true,  tip: "夸一句服务 + 致谢，暖场收尾" },
            { text: "Paper is shiny. Okay.",                                ok: false, tip: "认可服务：That's beautiful — thank you so much!" },
            { text: "More wrapping paper. Give extra.",                     ok: false, tip: "满意道谢即可：Thank you so much for wrapping it!" },
          ],
          phrase: { en: "Thank you so much for wrapping it.", zh: "非常谢谢你帮我包装。", note: "thank sb for doing sth 感谢某人做了某事" },
        },
      ],
    },
