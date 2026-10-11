    {
      id: "v5",
      title: "第 5 次光顾 · 婚纱封存",
      titleEn: "The Wedding Dress",
      emoji: "👰",
      desc: "婚礼结束，婚纱要专业清洗并封存。干洗店的终极任务：加香选择、防尘罩、装箱保存——文化与服务术语大满贯。",
      reward: { en: "box it up", zh: "你的婚礼记忆被永久珍藏了！👰" },
      steps: [
        {
          npcLines: [
            "Well, don't you glow today! What's the special occasion — or should I guess from that dress bag?",
            "Someone's glowing! What do we have here — that looks like a very special dress bag!",
            "Good morning! You're absolutely radiant — and that garment bag looks important. What's the occasion?",
          ],
          npcZh: "你今天容光焕发！有什么喜事——还是我从那个衣袋猜猜？",
          task: "说明要清洗并保存婚纱",
          options: [
            { text: "I just got married! This is my wedding dress — I'd like it cleaned and preserved.", ok: true,  tip: "preserved 保存/封存——婚纱服务的关键词" },
            { text: "Big dress! Married now! Dress was expensive. Keep forever.",                       ok: false, tip: "专业表达：I'd like it cleaned and preserved" },
            { text: "This is costume. Wedding costume party. Not real wedding.",                        ok: false, tip: "如实说明：It's my wedding dress — cleaned and preserved, please" },
          ],
          phrase: { en: "I'd like it cleaned and preserved.", zh: "我想把它清洗并封存。", note: "preserve 保存；婚纱服务的正式说法是 wedding dress preservation" },
        },
        {
          npcLines: [
            "Congratulations!! Wedding dress preservation is our premium service. First, let's assess the dress — any stains I should know about? Grass, wine, cake frosting?",
            "Congratulations, newlywed! Preservation is our specialty. Let's assess: any stains? The usual suspects are grass, wine, and cake frosting.",
            "Oh, congratulations!! Premium service coming up. First — the damage report: grass stains? Wine? Cake frosting? Brides battle all three!",
          ],
          npcZh: "恭喜！！婚纱封存是我们的高端服务。先评估一下——有什么污渍要知道吗？草渍、红酒、蛋糕霜？",
          task: "如实报告裙摆有草渍和一点红酒",
          options: [
            { text: "Grass stains on the hem from photos, and a little red wine — someone toasted too enthusiastically!", ok: true,  tip: "toast 敬酒 + enthusiastically 过于热情——幽默如实报告" },
            { text: "Dress is mess. Whole battlefield. Cry later, clean now.",                                         ok: false, tip: "说明位置：Grass on the hem, plus a little red wine" },
            { text: "No stains. Perfect wedding. I am perfect. Dress perfect.",                                        ok: false, tip: "如实报告利于处理：Grass stains on the hem and a little wine" },
          ],
          phrase: { en: "Grass stains on the hem.", zh: "裙摆上有草渍。", note: "草地拍照是草渍重灾区——如实告知才能对症处理" },
        },
        {
          npcLines: [
            "A classic combo — we see it every June! Both stains are very treatable. Now, one question: would you like the dress scented or unscented after cleaning?",
            "The June special! Grass and wine, we've got you. Big question now: scented or unscented for the final finish?",
            "Ah, the wedding trifecta minus one! Totally treatable. Here's your choice: scented or unscented for preservation?",
          ],
          npcZh: "经典组合——每年六月都见！两种污渍都好处理。问一下：清洗后要加香还是不加香？",
          task: "选择不加香（长期保存更安全）",
          options: [
            { text: "Unscented, please — I've read fragrance can yellow the fabric over time.", ok: true,  tip: "yellow 变黄 + over time 长期——面料保存知识" },
            { text: "Maximum scent! Smell wedding forever! Nose memory!",                       ok: false, tip: "长期保存选无香：Unscented, please — fragrance can yellow the fabric" },
            { text: "Scent? What scent options? Cake scent? Love scent?",                       ok: false, tip: "选无香更利于保存：Unscented, please" },
          ],
          phrase: { en: "Scented or unscented?", zh: "加香还是不加香？", note: "二选一服务问句；长期保存无香更稳妥" },
        },
        {
          npcLines: [
            "A knowledgeable bride — unscented it is! The preservation includes cleaning, the box, and acid-free tissue. It's one hundred forty dollars.",
            "Smart choice — unscented! The full package: cleaning, preservation box, and acid-free tissue. One hundred forty dollars.",
            "You did your homework! Unscented, confirmed. Package covers cleaning, the box, and acid-free tissue — one hundred forty.",
          ],
          npcZh: "懂行的新娘——就无香了！封存服务含清洗、箱子和无酸纸。一共 140 美元。",
          task: "询问 140 美元包含的全部内容",
          options: [
            { text: "So the one-forty covers cleaning, the box, and the acid-free tissue — anything else included?", ok: true,  tip: "covers 包含 + 追问服务边界，掏钱前问清" },
            { text: "One-forty for box? Box is cardboard. Cardboard expensive now?",                                ok: false, tip: "确认包含项：It covers cleaning, the box, and the tissue — anything else?" },
            { text: "Acid-free tissue? Regular tissue angry? Tissue war?",                                           ok: false, tip: "无酸纸防黄化：What else is included in the one-forty?" },
          ],
          phrase: { en: "What's included in the price?", zh: "这个价格包含什么？", note: "covers = 包含；大额消费必问边界" },
        },
        {
          npcLines: [
            "Also included: a lifetime guarantee against yellowing, and a window in the box so you can peek at your dress anytime. Ready in three weeks.",
            "Plus — lifetime guarantee against yellowing, and the box has a viewing window for dress-checking anytime! Three weeks turnaround.",
            "And more! Lifetime no-yellowing guarantee, plus a viewing window in the lid. Three weeks and she's boxed forever!",
          ],
          npcZh: "还包括：终身防黄化保证，箱子上有个观察窗，随时能看你的裙子。三周后好。",
          task: "感叹服务周到，确认下单",
          options: [
            { text: "A viewing window — that's such a thoughtful touch! Let's do it.", ok: true,  tip: "thoughtful touch 贴心的细节——认可设计的表达" },
            { text: "Three weeks long. Wedding dress patience test. Fine.",           ok: false, tip: "专业服务需时间：That's a thoughtful touch — let's do it!" },
            { text: "Window in box? Dress can escape? Close window!",                 ok: false, tip: "观察窗是亮点：Let's do it!" },
          ],
          phrase: { en: "That's a thoughtful touch.", zh: "这个细节真贴心。", note: "thoughtful 体贴周到；夸服务细节的地道说法" },
          adds: [{ emoji: "📦", label: "Preservation box", wordId: "dry-shrink-wrap" }],
        },
        {
          npcLines: [
            "Wonderful! Fill out this form — the story of the dress goes on a card inside the box. Future you will thank present you!",
            "Excellent! One form — you'll write the dress's story on a card for the box. Your grandkids will love reading it!",
            "Perfect choice! Last step: this form — a little card telling the dress's story, tucked inside the box. A time capsule!",
          ],
          npcZh: "太好了！填这张表——裙子的故事会写在盒内的卡片上。未来的你会感谢现在的你！",
          task: "填表时感慨一句",
          options: [
            { text: "A time capsule with a dress inside — what a beautiful way to keep the memory. Thank you!", ok: true,  tip: "time capsule 时间胶囊——浪漫升华收尾" },
            { text: "Form more paperwork. Wedding is forms everywhere. Forms life.",                           ok: false, tip: "这表格有意义：What a beautiful way to keep the memory!" },
            { text: "Future me no care. Past is past. Box is box.",                                            ok: false, tip: "珍藏仪式感：A time capsule — thank you!" },
          ],
          phrase: { en: "What a beautiful way to keep the memory.", zh: "保存回忆的美好方式。", note: "What a...! 感叹句式；情感服务的满分回应" },
        },
      ],
    },
  ],
},
