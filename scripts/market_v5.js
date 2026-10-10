// 超市 第 5 轮：生鲜称重（7 步）
{
  id: "v5",
  title: "第 5 次光顾 · 生鲜称重",
  titleEn: "Fresh Counter",
  emoji: "⚖️",
  desc: "熟食柜台买火腿、水果区挑西瓜——磅和公斤怎么换算？半份怎么开口？学会称重区生存英语！",
  reward: { en: "scale", zh: "你在生鲜柜台用英文买到了刚刚好的分量！⚖️" },
  steps: [
    {
      npcLines: [
        "Hi there! Welcome to the deli counter. What can I get for you today?",
        "Hello! Fresh deli counter here — what'll it be today?",
        "Hi, welcome! What can I slice up for you today?",
      ],
      npcZh: "您好！欢迎来到熟食柜台。今天想买点什么？",
      task: "想买半磅火腿片",
      options: [
        { text: "Could I get half a pound of sliced ham, please?", ok: true,  tip: "half a pound 半磅；磅是美国重量单位（约 0.45 公斤）" },
        { text: "Ham give me some small piece.",                    ok: false, tip: "说清分量：half a pound of ham" },
        { text: "I want ham how much is one?",                      ok: false, tip: "先报分量：Half a pound of sliced ham, please" },
      ],
      phrase: { en: "Half a pound of ___, please.", zh: "请给我半磅……", note: "熟食柜台标准句；1 磅 ≈ 0.45 kg，半磅 ≈ 227 克" },
    },
    {
      npcLines: [
        "Sure! This brand is on sale this week — $4.99 a pound. Would you like to try a sample first?",
        "You got it! Heads-up, this one's on sale — $4.99 a pound. Want a taste first?",
        "No problem! By the way, this brand's discounted this week — $4.99 a pound. Free sample?",
      ],
      npcZh: "好的！这个牌子这周特价——4.99 美元一磅。要先试吃一下吗？",
      task: "试吃后表示喜欢",
      options: [
        { text: "Sure, I'd love to try. ... Mmm, that's really good! I'll take it.", ok: true,  tip: "I'd love to try 接受试吃 + I'll take it 决定购买" },
        { text: "Eat free sample yes yes delicious.",                              ok: false, tip: "礼貌版：I'd love to try... I'll take it" },
        { text: "No try. Just give ham fast.",                                      ok: false, tip: "试吃不吃亏：Sure, I'd love to try" },
      ],
      phrase: { en: "I'd love to try.", zh: "我很想试试", note: "接受试吃/体验邀请的自然说法" },
    },
    {
      npcLines: [
        "Great! Just to confirm — half a pound, thinly sliced? Anything else from the deli?",
        "Perfect! So that's half a pound, thin slices, right? Anything else for you?",
        "Got it — half a pound, thin cut. Anything else at the counter today?",
      ],
      npcZh: "好的！确认一下——半磅，切薄片，对吧？熟食区还要别的吗？",
      task: "确认，再要一份土豆沙拉",
      options: [
        { text: "Yes, that's right. And could I also get a container of potato salad?", ok: true,  tip: "And could I also get...? 追加订单的礼貌句" },
        { text: "Yes correct. Potato salad one also buy.",                            ok: false, tip: "说 And could I also get a potato salad?" },
        { text: "Right. More food different kind too.",                               ok: false, tip: "具体说商品：And could I also get a potato salad?" },
      ],
      phrase: { en: "And could I also get ___?", zh: "另外能再来一份……吗？", note: "追加购买万能句，点单/购物通吃" },
      adds: [{ emoji: "🥗", label: "Potato Salad", badge: true }],
    },
    {
      npcLines: [
        "One potato salad coming up! Now, for the fruit section — our watermelons are seedless today. Interested?",
        "There you go, potato salad! Oh — seedless watermelons just came in. Want to take a look?",
        "Potato salad, done! By the way, seedless watermelons are in season. Interested?",
      ],
      npcZh: "土豆沙拉来了！对了，水果区今天的西瓜是无籽的。感兴趣吗？",
      task: "想去挑一个，问能买半个吗",
      options: [
        { text: "A whole one is too big for me. Could I buy half a watermelon?", ok: true,  tip: "too big for me 说明原因 + 请求半份，逻辑满分" },
        { text: "Watermelon huge. Half cut sell me.",                          ok: false, tip: "更自然：Could I buy half a watermelon?" },
        { text: "I want small watermelon baby size.",                          ok: false, tip: "常见做法是买半个：Could I buy half?" },
      ],
      phrase: { en: "Could I buy half a ___?", zh: "能买半个……吗？", note: "西瓜/南瓜/大面包都能这样问，店员会帮你切" },
    },
    {
      npcLines: [
        "Of course! We can cut one in half for you. Or would you prefer the pre-cut halves in the cooler?",
        "Absolutely! We'll slice one open for you. Or there are pre-cut halves in the fridge case?",
        "Sure thing! Happy to cut one for you — or grab a pre-cut half from the cooler?",
      ],
      npcZh: "当然可以！我们可以帮您切一半。或者您想直接拿冷柜里预先切好的？",
      task: "选择现切，请店员挑个熟的",
      options: [
        { text: "Could you pick a ripe one for me, please? I can never tell.", ok: true,  tip: "Could you pick... for me? 请人代挑 + 坦承不会挑，诚实又讨喜" },
        { text: "You choose good one I trust you money.",                    ok: false, tip: "更自然：Could you pick a ripe one for me?" },
        { text: "Ripe means what which is ripe word?",                       ok: false, tip: "ripe = 成熟的；直接请店员挑即可" },
      ],
      phrase: { en: "Could you pick a ripe one for me?", zh: "能帮我挑个熟的吗？", note: "挑瓜/挑果神器句；ripe 成熟的，生的是 unripe" },
    },
    {
      npcLines: [
        "Haha, it's a skill! Let me knock on a few... This one sounds perfect. I'll cut and wrap it for you.",
        "You and me both! Let me do the knock test... This one's a winner. Cutting it up now!",
        "Trick of the trade! Knocking on them... ah, this one's ready. I'll halve and wrap it.",
      ],
      npcZh: "哈哈，挑瓜是个技术活！我敲几个听听……这个声音正合适。我帮您切开包好。",
      task: "对挑瓜技术表示好奇",
      options: [
        { text: "How can you tell? It sounds like magic!", ok: true,  tip: "How can you tell? 问对方是怎么看出来的，好奇宝宝必备" },
        { text: "Knock knock watermelon magic show?",      ok: false, tip: "说 How can you tell?" },
        { text: "Sound good bad how to know?",             ok: false, tip: "更自然：How can you tell?" },
      ],
      phrase: { en: "How can you tell?", zh: "怎么看出来的？", note: "请教对方判断方法的万能问句" },
      adds: [{ emoji: "🍉", label: "Half Watermelon", badge: true }],
    },
    {
      npcLines: [
        "Ripe watermelons sound hollow and deep! Here's your half — that'll be $3.50 at the register. Enjoy!",
        "A hollow, deep knock means it's ripe! Here you go — $3.50 at checkout. Enjoy the melon!",
        "Hollow thump = ripe melon, that's the secret! Your half's ready — $3.50 up front. Enjoy!",
      ],
      npcZh: "熟西瓜敲起来声音空而深沉！您的半个好了——收银台付 3.5 美元。慢慢享用！",
      task: "学到挑瓜知识，感谢道别",
      options: [
        { text: "Hollow and deep — got it! Thanks for the lesson. Have a great day!", ok: true,  tip: "复述知识点 + Thanks for the lesson，学以致用" },
        { text: "Okay bye watermelon man thanks.",                                  ok: false, tip: "更有内容：Thanks for the lesson!" },
        { text: "I still don't understand but okay thanks.",                         ok: false, tip: "复述要点巩固记忆：Hollow and deep — got it!" },
      ],
      phrase: { en: "Thanks for the lesson!", zh: "受教了！", note: "学到新知识后的趣味致谢，比 thank you 更有心意" },
    },
  ],
},
