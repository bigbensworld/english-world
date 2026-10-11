    {
      id: "v5",
      title: "第 5 次光顾 · 咳嗽糖浆事件",
      titleEn: "The Cough Syrup Mix-Up",
      emoji: "🍷",
      desc: "给孩子买咳嗽糖浆，回家一看——含酒精的成人版！回店换儿童版。学退换、看标签、剂量换算。",
      reward: { en: "children's dose", zh: "你为孩子换到了安全的药！🧒" },
      steps: [
        {
          npcLines: [
            "Oh, welcome back! How did the vitamins treat you? Wait — you look worried. What's up?",
            "Hey, back so soon! Everything okay with the vitamins? You look concerned.",
            "Welcome back! Uh oh, that's a worried face. What happened?",
          ],
          npcZh: "哦，欢迎回来！维生素还行吗？等等——你看起来很着急。怎么了？",
          task: "说明买错了：咳嗽糖浆是成人含酒精版，孩子不能喝",
          options: [
            { text: "I bought this cough syrup yesterday, but I just noticed it contains alcohol — it's for my kid. Can I exchange it?", ok: true,  tip: "contains alcohol 含酒精 + exchange 换货，说清缘由" },
            { text: "Syrup wrong! Alcohol syrup! Baby drink? Bad bad!",                                                                  ok: false, tip: "冷静说明：It contains alcohol — it's for my kid. Can I exchange it?" },
            { text: "You sell poison juice for children. Explain yourself.",                                                             ok: false, tip: "是买错了不是卖错了：It contains alcohol and it's for my kid — can I exchange it?" },
          ],
          phrase: { en: "It contains alcohol.", zh: "它含有酒精。", note: "contain 含有；给孩子买药必看成分表" },
        },
        {
          npcLines: [
            "Oh no, good catch — that's the adult formula! Yes, absolutely, let's swap it for the children's version. Do you have the receipt?",
            "Ah, the adult one — glad you caught that! Of course we'll exchange it. Got your receipt handy?",
            "That's on us for not double-checking — that's the adult formula! Exchange, no question. Receipt with you?",
          ],
          npcZh: "哦不，好眼力——那是成人配方！当然可以换儿童版。收据带了吗？",
          task: "出示收据并感谢",
          options: [
            { text: "Here's the receipt. Thank you — I should have read the label more carefully myself.", ok: true,  tip: "主动担一点责任，沟通氛围立刻变好" },
            { text: "Receipt yes. Your fault also. Mostly your fault.",                                   ok: false, tip: "共同担责更得体：I should have read the label more carefully too" },
            { text: "Label too small for human eyes. Design crime.",                                      ok: false, tip: "配合换货即可：Here's the receipt — thank you!" },
          ],
          phrase: { en: "Here's the receipt.", zh: "这是收据。", note: "退换货第一步；主动自查是沟通润滑剂" },
        },
        {
          npcLines: [
            "No problem at all! Here's the children's version — alcohol-free, grape flavor, kids love it. Same price, so it's a straight swap.",
            "Easy fix! Here's the kids' version — alcohol-free, grape flavored, a crowd favorite. Even swap, same price.",
            "One swap coming up! The children's formula — no alcohol, grape taste, kid-approved. Identical price, so we're even!",
          ],
          npcZh: "完全没问题！这是儿童版——不含酒精、葡萄味，孩子都喜欢。价格一样，直接换。",
          task: "换货前确认儿童剂量怎么定",
          options: [
            { text: "Perfect. What's the children's dose — is it based on age or weight?", ok: true,  tip: "based on age or weight 按年龄还是体重——儿童剂量两大依据" },
            { text: "Dose same as adult but smaller spoon? Half spoon?",                   ok: false, tip: "问清依据：Is the dose based on age or weight?" },
            { text: "Grape flavor is flavor enough. Dose irrelevant.",                     ok: false, tip: "剂量很重要：What's the children's dose?" },
          ],
          phrase: { en: "Is it based on age or weight?", zh: "是按年龄还是按体重？", note: "儿童剂量依据问句；based on = 基于" },
        },
        {
          npcLines: [
            "For this one, it's age-based: two teaspoons every six hours for ages six to twelve. Under six, ask a doctor first.",
            "Age-based dosing here! Six to twelve years: two teaspoons every six hours. Younger than six — doctor's advice first, please.",
            "It goes by age! Ages six to twelve, two teaspoons every six hours. For the under-six crowd, check with a doctor first.",
          ],
          npcZh: "这款按年龄：6-12 岁每 6 小时两茶匙。6 岁以下要先咨询医生。",
          task: "复述剂量并确认 6 岁以下要问医生",
          options: [
            { text: "Two teaspoons every six hours for ages six to twelve — and ask a doctor if under six. Got it.", ok: true,  tip: "完整复述剂量规则，孩子用药零差错" },
            { text: "Two spoon, one hour, all ages, no doctor. My way.",                                            ok: false, tip: "按说明来：Two teaspoons every six hours — got it" },
            { text: "Doctor for under six? Doctor for everything? Doctor in my house?",                             ok: false, tip: "记下提醒：Ask a doctor first if under six" },
          ],
          phrase: { en: "Two teaspoons every six hours.", zh: "每六小时两茶匙。", note: "teaspoon 茶匙；量勺比家用勺子准" },
        },
        {
          npcLines: [
            "You've got it — great memory! Anything else for the little one? Some pediatric electrolyte drinks are on the shelf nearby.",
            "Perfect recall! Anything else while you're here? We've got pediatric electrolyte drinks right around the corner.",
            "Spot on! Need anything else for the kiddo? Electrolyte drinks for kids are on the next shelf over.",
          ],
          npcZh: "完全正确——好记性！还要给孩子买点别的吗？儿童电解质饮料就在旁边货架。",
          task: "婉拒推销，这次只换糖浆",
          options: [
            { text: "Not today, thanks — the syrup is the mission. Maybe next time!", ok: true,  tip: "Not today 礼貌拒绝 + maybe next time 留余地" },
            { text: "Electrolyte drink? Sugar water scam. No.",                      ok: false, tip: "礼貌婉拒即可：Not today, thanks — maybe next time!" },
            { text: "Buy everything for little one. Little emperor deserves all.",   ok: false, tip: "按需购买：The syrup is the mission today — thanks!" },
          ],
          phrase: { en: "Not today, thanks.", zh: "今天先不了，谢谢。", note: "婉拒推销万能句；配上 maybe next time 更圆润" },
        },
        {
          npcLines: [
            "Totally fair! Here's your grape syrup — alcohol-free, kid-safe. Hope the little one feels better soon!",
            "Of course! One kid-safe grape syrup, coming right at you. Wishing your little one a speedy recovery!",
            "Syrup's all yours — alcohol-free and grape-tastic! Get well soon to the small one!",
          ],
          npcZh: "完全理解！你的葡萄味糖浆——无酒精、儿童安全。希望小朋友早日康复！",
          task: "道谢离开",
          options: [
            { text: "Thank you so much for the quick swap. We'll read labels together from now on!", ok: true,  tip: "quick swap 痛快换货 + together 亲子共读的暖收尾" },
            { text: "Labels forever now. I read labels in sleep. Label dreams.",                    ok: false, tip: "真诚致谢即可：Thank you for the quick swap!" },
            { text: "Next time I check label first. This time you check label first.",              ok: false, tip: "共同成长：We'll read labels together from now on!" },
          ],
          phrase: { en: "Hope the little one feels better soon!", zh: "希望小家伙早日康复！", note: "the little one 小家伙；关心孩子必备表达" },
        },
      ],
    },
  ],
},
