    {
      id: "v4",
      title: "第 4 次光顾 · 买一送一的数学题",
      titleEn: "BOGO Math",
      emoji: "🎁",
      desc: "维生素买一送一！但同款有品牌药和仿制药两种价格。学 generic vs brand、折扣计算、积分卡。",
      reward: { en: "buy one get one free", zh: "你做对了药店折扣数学题！🎁" },
      steps: [
        {
          npcLines: [
            "Welcome back! You have great timing — our vitamins are buy one get one free this week!",
            "Hey, perfect timing! It's BOGO week — buy one get one free on all vitamins!",
            "Oh, you picked the right day! Vitamins are buy one, get one free — all week long!",
          ],
          npcZh: "欢迎回来！你来得正好——这周维生素买一送一！",
          task: "确认买一送一的具体规则",
          options: [
            { text: "Buy one get one free — so if I buy one bottle, I get a second one free?", ok: true,  tip: "复述规则确认理解，防结账翻车" },
            { text: "Free vitamin? All vitamin free? Take all shelf.",                        ok: false, tip: "是买一送一：If I buy one bottle, I get a second free?" },
            { text: "BOGO? Dog word? I speak no dog.",                                        ok: false, tip: "BOGO = Buy One Get One：So I buy one and the second is free?" },
          ],
          phrase: { en: "Buy one get one free.", zh: "买一送一。", note: "BOGO 是它的缩写；美式药店超市高频促销语" },
        },
        {
          npcLines: [
            "That's it, exactly! Now, we have the brand-name version at fifteen ninety-nine, or the generic version at eight forty-nine.",
            "You got it! So — brand-name bottle is fifteen ninety-nine, or there's the generic at eight forty-nine. Your call!",
            "Exactly right! Here's your choice: brand name for fifteen ninety-nine, or generic for eight forty-nine.",
          ],
          npcZh: "正是如此！我们有品牌版 15.99，也有仿制版 8.49。",
          task: "询问仿制药和品牌药有什么区别",
          options: [
            { text: "What's the difference between the generic and the brand-name one?", ok: true,  tip: "generic 仿制药 vs brand name 品牌药，省钱关键" },
            { text: "Cheap one bad? Expensive one good? Simple world.",                 ok: false, tip: "问清区别再选：What's the difference between them?" },
            { text: "Generic is generic brand? Generic mean bad?",                       ok: false, tip: "generic ≠ 差：What's the difference between the two?" },
          ],
          phrase: { en: "What's the difference between the generic and the brand name?", zh: "仿制药和品牌药有什么区别？", note: "答案通常是：成分相同，价格不同" },
        },
        {
          npcLines: [
            "Same active ingredient, same dosage — the generic is just cheaper because they don't pay for the brand name or the advertising.",
            "Identical active ingredients and dosage! Generic skips the brand marketing costs, that's all. Same stuff, smaller price tag.",
            "The active ingredients match exactly — dosage too. Generics just skip the fancy brand and ads. Same medicine, friendlier price!",
          ],
          npcZh: "活性成分相同、剂量相同——仿制药便宜只是因为不用付品牌费和广告费。",
          task: "选择仿制药（BOGO 后更划算）",
          options: [
            { text: "Then the generic with the BOGO deal is the smart choice. Let's do that!", ok: true,  tip: "算明白账后果断决策——smart choice" },
            { text: "No no, expensive one is more vitamin. Rich vitamin.",                    ok: false, tip: "成分一样选便宜的：The generic with BOGO is the smart choice" },
            { text: "Brand name make me brand person. Image important.",                      ok: false, tip: "省钱不省质量：Let's do the generic with the BOGO deal!" },
          ],
          phrase: { en: "That's the smart choice.", zh: "这是聪明的选择。", note: "active ingredient 活性成分——药效相同的保障" },
        },
        {
          npcLines: [
            "Smart shopper! So that's eight forty-nine for two bottles. Do you have our rewards card? You'd earn points on this.",
            "Love a bargain hunter! Eight forty-nine for the pair. Got our rewards card? Points on every purchase.",
            "Sensible and savvy — my favorite kind! Two bottles, eight forty-nine. Are you a rewards member? Points are waiting!",
          ],
          npcZh: "精明的 shopper！两瓶 8.49。有我们的积分卡吗？这次能攒积分。",
          task: "询问积分卡怎么办理",
          options: [
            { text: "I don't have one yet. How do I sign up for the rewards card?", ok: true,  tip: "sign up for 报名办理——办卡万能句" },
            { text: "Card? I have many cards. Wallet is card museum.",              ok: false, tip: "问办理方式：How do I sign up for the rewards card?" },
            { text: "Points turn to money? Money turn to points? Explain economy.", ok: false, tip: "先问办卡：How do I sign up?" },
          ],
          phrase: { en: "How do I sign up?", zh: "怎么办理/注册？", note: "sign up for 办卡/注册/报名三合一高频短语" },
        },
        {
          npcLines: [
            "Super easy — just your phone number at checkout, and you're enrolled. Every dollar earns a point, and a hundred points is five dollars off.",
            "Nothing to it! Phone number at the register, done — enrolled on the spot. A point per dollar, a hundred points gets you five dollars off.",
            "Easiest thing all day: phone number at checkout, and boom, member! One point per dollar; hit a hundred and it's five bucks off your total.",
          ],
          npcZh: "超简单——结账时报手机号就注册了。每 1 美元积 1 分，100 分抵 5 美元。",
          task: "办理积分卡并完成本次消费",
          options: [
            { text: "Sounds great — sign me up with my number. Let's ring everything up!", ok: true,  tip: "ring it up 结账买单——地道口语" },
            { text: "Phone number is secret. Private person. Cash only, no number.",      ok: false, tip: "注册即可：Sign me up with my number" },
            { text: "Hundred points too many points. Lower to ten.",                      ok: false, tip: "接受规则：Sign me up — let's ring everything up!" },
          ],
          phrase: { en: "Let's ring it up.", zh: "结账吧。", note: "ring up 结账；说 Let's ring it up 干脆利落" },
          adds: [{ emoji: "🎫", label: "Rewards card", wordId: "drug-rewards" }],
        },
        {
          npcLines: [
            "Enrolled and paid — and you just earned nine points! Your BOGO bottles and your receipt are in the bag. See you next week!",
            "Done and done! Nine points on the board already! Bottles, receipt, bag — you're all set. Have a good one!",
            "Member number activated, nine points banked! Here's your haul — enjoy the vitamins and the freebie!",
          ],
          npcZh: "注册并支付完成——还攒了 9 分！买一送一的瓶子和收据都在袋子里。下周见！",
          task: "满意道别",
          options: [
            { text: "Nine points already? This membership pays for itself. Thanks — see you next week!", ok: true,  tip: "pays for itself 物有所值 + 预告复购" },
            { text: "Nine points? I want nine hundred. Transfer points.",                               ok: false, tip: "积分慢慢攒：This membership pays for itself — thanks!" },
            { text: "Next week? So soon? Store too popular. Traffic jam.",                              ok: false, tip: "礼貌收尾：See you next week!" },
          ],
          phrase: { en: "It pays for itself.", zh: "它自己就把本钱赚回来了。", note: "评价会员/工具划算的地道说法" },
        },
      ],
    },
