// 超市 第 4 轮：会员折扣（8 步）
{
  id: "v4",
  title: "第 4 次光顾 · 会员与折扣",
  titleEn: "Deals & Membership",
  emoji: "🏷️",
  desc: "BOGO、coupon、会员价……美国超市省钱门道多。学会问折扣、用会员卡、走自助结账，省下真金白银！",
  reward: { en: "coupon", zh: "你解锁了超市省钱三件套：问折扣、用会员卡、自助结账！🏷️" },
  steps: [
    {
      npcLines: [
        "Hi! Welcome to Fresh Mart. Before you shop — do you have our member card?",
        "Hello there! Do you have a Fresh Mart rewards card with you today?",
        "Hi, welcome in! Just wondering — got a member card on you?",
      ],
      npcZh: "您好！欢迎来到 Fresh 超市。逛之前问一下——您有我们的会员卡吗？",
      task: "没有会员卡，顺便问办卡有什么好处",
      options: [
        { text: "Not yet. What are the benefits of becoming a member?", ok: true,  tip: "What are the benefits? 问权益，办卡前必问" },
        { text: "No card. Card is good for what things?",               ok: false, tip: "说 What are the benefits?" },
        { text: "No have card. Free card give me?",                     ok: false, tip: "先问好处：What are the benefits?" },
      ],
      phrase: { en: "What are the benefits of ___?", zh: "……有什么好处？", note: "办卡/订阅/入会前的灵魂三问之一" },
    },
    {
      npcLines: [
        "Great question! Members get exclusive discounts, and today we have a buy-one-get-one deal on cereal!",
        "Well, members save a ton! Plus today's BOGO on cereal — buy one, get one free!",
        "Oh, lots! Member-only prices, and right now cereal is buy-one-get-one-free!",
      ],
      npcZh: "问得好！会员享专属折扣，而且今天麦片买一送一！",
      task: "了解 BOGO，决定办卡",
      options: [
        { text: "Buy one, get one free? That's a great deal! I'd like to sign up, please.", ok: true,  tip: "That's a great deal! 听到优惠的标配反应 + sign up 注册" },
        { text: "BOGO I don't understand this word meaning.",                              ok: false, tip: "BOGO = buy one, get one，买一送一的缩写" },
        { text: "Free cereal only? Other free things too?",                                 ok: false, tip: "先办卡：I'd like to sign up, please" },
      ],
      phrase: { en: "buy one, get one free (BOGO)", zh: "买一送一", note: "美国超市高频缩写 BOGO，广告传单上到处都是" },
    },
    {
      npcLines: [
        "Perfect! I just need your phone number, and you're all set. Takes thirty seconds!",
        "Easy! Just your phone number and you're a member. Thirty seconds, tops!",
        "Great! Phone number, please — that's all it takes to join!",
      ],
      npcZh: "太好了！只需要您的手机号就能注册，三十秒搞定！",
      task: "提供手机号完成注册",
      options: [
        { text: "Sure, it's 555-0123. Here you go.", ok: true,  tip: "报号码用 it's...，简洁清楚" },
        { text: "Phone number yes I have one phone.", ok: false, tip: "直接报号码：It's 555-0123" },
        { text: "Why need my number secret?",        ok: false, tip: "会员卡常规流程，报号即可：It's..." },
      ],
      phrase: { en: "Sure, it's ___. Here you go.", zh: "好的，是……给", note: "报号码/信息 + 递东西的组合句" },
      adds: [{ emoji: "💳", label: "Member Card ✓", badge: true }],
    },
    {
      npcLines: [
        "You're a member now! By the way, do you have any coupons today?",
        "All signed up! Oh — any coupons with you today?",
        "Welcome to the family! Got any coupons to use?",
      ],
      npcZh: "您现在是会员了！对了，您今天有优惠券吗？",
      task: "出示手机上的电子优惠券",
      options: [
        { text: "Yes, I have a digital coupon on my phone. Can you scan it?", ok: true,  tip: "digital coupon 电子券；Can you scan it? 扫码请求" },
        { text: "Coupon in phone yes scan please it.",                        ok: false, tip: "说 Can you scan it?" },
        { text: "I have paper money only no coupon.",                         ok: false, tip: "手机券更常见：I have a digital coupon on my phone" },
      ],
      phrase: { en: "Can you scan it?", zh: "能扫一下吗？", note: "扫码/扫券/扫会员码万能句" },
      adds: [{ emoji: "📱", label: "Coupon", wordId: "coupon" }],
    },
    {
      npcLines: [
        "Scanned! You just saved $2.50. Now, is this everything for you today?",
        "Done — that's $2.50 back in your pocket! Is this everything?",
        "Got it, $2.50 saved! Anything else in your basket?",
      ],
      npcZh: "扫好了！您省了 2.5 美元。今天就买这些吗？",
      task: "询问某种商品是否有会员价",
      options: [
        { text: "Is this milk on sale for members?", ok: true,  tip: "on sale 打折中；Is this... on sale? 问折扣万能句" },
        { text: "Milk have special price today or no?", ok: false, tip: "说 Is this on sale?" },
        { text: "Member milk cheaper how much?",      ok: false, tip: "更地道：Is this milk on sale for members?" },
      ],
      phrase: { en: "Is this on sale?", zh: "这个在打折吗？", note: "on sale = 打折中；会员价常说 member price" },
    },
    {
      npcLines: [
        "Yes! Members get it for $2.99 instead of $3.99. Would you like to grab two? They're both discounted.",
        "You bet — $2.99 for members, down from $3.99. Two would both be at the discount price!",
        "That's right, member price is $2.99! Grabing two? Both ring up discounted.",
      ],
      npcZh: "是的！会员价 2.99 美元，原价 3.99。拿两瓶吧？两瓶都享会员价。",
      task: "接受建议拿两瓶",
      options: [
        { text: "Sure, I'll take two then. Thanks for letting me know!", ok: true,  tip: "I'll take two 数量直说 + 致谢提醒" },
        { text: "Two milk yes good deal I buy.",                        ok: false, tip: "更自然：I'll take two, thanks!" },
        { text: "If free I take hundred haha.",                         ok: false, tip: "接受优惠即可：I'll take two then" },
      ],
      phrase: { en: "I'll take two.", zh: "我拿两个", note: "接受店员建议时数量直说，干脆利落" },
      adds: [{ emoji: "🥛", label: "Milk ×2 $5.98", wordId: "milk" }],
    },
    {
      npcLines: [
        "Great! Would you like to use the self-checkout, or come to my register?",
        "Perfect! Self-checkout or my lane — which do you prefer?",
        "All set! Want to do self-checkout, or ring up here with me?",
      ],
      npcZh: "好的！您想用自助结账，还是来我这边的人工通道？",
      task: "尝试自助结账（第一次用）",
      options: [
        { text: "I'd like to try the self-checkout. Could you show me how it works?", ok: true,  tip: "Could you show me how it works? 求演示的礼貌问法" },
        { text: "Machine scary, I don't know use.",                                  ok: false, tip: "大胆尝试：Could you show me how it works?" },
        { text: "Self what? English word too hard.",                                 ok: false, tip: "self-checkout = 自助结账机，超市标配" },
      ],
      phrase: { en: "Could you show me how it works?", zh: "能演示一下怎么用吗？", note: "面对新机器/新流程的万能求助句" },
    },
    {
      npcLines: [
        "Of course! Just scan each item, bag them, and pay at the end. I'll be right here if you need help. See you next time!",
        "Happy to! Scan, bag, pay — that's it! I'm right over here if you get stuck. Have a good one!",
        "Sure thing! Scan each item, bag them up, then pay. Holler if you need me. Take care!",
      ],
      npcZh: "当然！逐件扫码、装袋、最后付款。需要帮忙我就在旁边。下次见！",
      task: "完成自助结账并道别",
      options: [
        { text: "Got it — scan, bag, pay. Thank you for your help!", ok: true,  tip: "复述流程 = 确认理解，学习闭环" },
        { text: "Okay bye machine I go now.",                      ok: false, tip: "复述要点更清楚：Scan, bag, pay. Thanks!" },
        { text: "Too many steps I forget already sorry.",          ok: false, tip: "简版复述即可：Scan, bag, pay!" },
      ],
      phrase: { en: "Scan, bag, pay.", zh: "扫码、装袋、付款", note: "自助结账三步曲，记住它走遍美国超市" },
    },
  ],
},
