  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 办卡参观",
      titleEn: "Tour & Membership",
      emoji: "🎫",
      desc: "搬进新社区第一周，来社区中心办卡。参观设施、了解会员权益、出示居住证明——社区融入第一课。",
      reward: { en: "membership", zh: "你成为社区中心的一员！🏛️" },
      steps: [
        {
          npcLines: [
            "Welcome to Riverside Community Center! First time here? I can give you a tour!",
            "Hi there! New face — welcome to Riverside Community Center! Would you like the grand tour?",
            "Good afternoon! Welcome in! First visit? Lucky you — tours are my favorite part of the job!",
          ],
          npcZh: "欢迎来到 Riverside 社区中心！第一次来吗？我可以带你参观！",
          task: "接受参观并说明刚搬来",
          options: [
            { text: "A tour sounds great — I just moved to the neighborhood last week.", ok: true,  tip: "I just moved to the neighborhood 我刚搬到这个社区——自我介绍式开场" },
            { text: "Tour? I walk myself. I know all. I am center expert. First time.", ok: false, tip: "自然开场：A tour sounds great — I just moved here" },
            { text: "Yes tour! Longest tour! Every room! Every corner! Whole day tour!", ok: false, tip: "接受参观：A tour sounds great" },
          ],
          phrase: { en: "I just moved to the neighborhood.", zh: "我刚搬到这个社区。", note: "neighborhood 社区街坊；新人破冰第一句" },
        },
        {
          npcLines: [
            "Welcome to the neighborhood! So — this floor has the gym and two studios. Upstairs: the pool and basketball court. Any questions so far?",
            "A new neighbor — wonderful! Main floor: gym plus two studios. Second floor: pool and basketball. Questions yet?",
            "Congrats on the move! Down here: gym, two studios. Up top: pool, basketball court. What would you like to know?",
          ],
          npcZh: "欢迎成为邻居！这边一楼是健身房和两间教室。楼上是游泳池和篮球场。有问题吗？",
          task: "询问设施是否都包含在会员费里",
          options: [
            { text: "Are all these facilities included in the membership, or are some extra?", ok: true,  tip: "included in 包含在……内 + extra 额外收费——办卡核心问题" },
            { text: "Everything free? Forever free? Free-est center?",                       ok: false, tip: "问清边界：Are all facilities included, or extra?" },
            { text: "Membership? I am member automatically. Born member. No fee.",           ok: false, tip: "询问会员制：Is everything included in the membership?" },
          ],
          phrase: { en: "Is it included in the membership?", zh: "这包含在会员费里吗？", note: "included 包含；健身/社区/酒店通用边界问句" },
        },
        {
          npcLines: [
            "Great question! Gym and pool are included; classes and court bookings are extra but members get a discount. Speaking of which — interested in a membership?",
            "Smart ask! Gym plus pool: included. Classes and courts: extra, but discounted for members. And speaking of members — want to join?",
            "The details matter! Gym and pool come free with membership; classes and court rentals are discounted extras. So — shall we set you up?",
          ],
          npcZh: "问得好！健身房和泳池包含在内；课程和订场是额外的，但会员有折扣。说到这——要办会员吗？",
          task: "询问会员价格和居民优惠",
          options: [
            { text: "I am interested! How much is the membership, and is there a resident rate?", ok: true, tip: "resident rate 居民价——社区中心的省钱关键" },
            { text: "Price! Give price! Best price! Member price! All prices!",                  ok: false, tip: "问价+优惠：How much is it, and is there a resident rate?" },
            { text: "Discount for residents? I am resident! Trust me! No proof!",                ok: false, tip: "询问优惠：Is there a resident rate?" },
          ],
          phrase: { en: "Is there a resident rate?", zh: "有居民优惠价吗？", note: "resident 居民；社区中心普遍有居民/非居民双轨价" },
        },
        {
          npcLines: [
            "Residents pay thirty dollars a month; non-residents pay forty-five. To get the resident rate, I'll just need proof of residency — a utility bill or lease works.",
            "Resident rate: thirty monthly. Non-resident: forty-five. For the resident price, bring proof of residency — a utility bill or your lease agreement!",
            "Thirty a month for residents, forty-five for everyone else! Proof of residency unlocks the deal — utility bill or lease is perfect.",
          ],
          npcZh: "居民每月 30 美元；非居民 45。办居民价需要居住证明——水电账单或租约都行。",
          task: "出示手机里的水电账单",
          options: [
            { text: "I have my utility bill on my phone — here you go.", ok: true,  tip: "Here you go 递东西万能句 + 电子账单同样有效" },
            { text: "Bill? I burn bills. All paper is fire paper.",     ok: false, tip: "出示证明：Here's my utility bill on my phone" },
            { text: "Lease? Landlord ghost me. Landlord myth.",        ok: false, tip: "电子版即可：I have it on my phone — here you go" },
          ],
          phrase: { en: "Here you go.", zh: "给您。", note: "递东西的万能口语；比 Here it is 更常用" },
        },
        {
          npcLines: [
            "Perfect — resident rate locked in! Fill out this form, and your key card will be ready in five minutes. Welcome aboard!",
            "That's a valid bill — resident status confirmed! One quick form, five minutes for the key card, and you're officially a member!",
            "Approved! Resident rate it is. Form here, key card in five, and welcome to the Riverside family!",
          ],
          npcZh: "完美——锁定居民价！填这张表，门卡 5 分钟就好。欢迎加入！",
          task: "填表时问门卡的使用范围",
          options: [
            { text: "While I fill this out — does the key card work for the pool after hours?", ok: true,  tip: "after hours 非开放时间——门卡权限边界" },
            { text: "Card work always? Card work midnight? Card work year 3000?",              ok: false, tip: "问权限：Does the card work for the pool after hours?" },
            { text: "Pool at midnight is my dream. Night swim lifestyle.",                     ok: false, tip: "实用提问：Does the key card work after hours?" },
          ],
          phrase: { en: "Does it work after hours?", zh: "非开放时间能用吗？", note: "after hours = 营业时间之外；门卡权限必问" },
          adds: [{ emoji: "🎫", label: "Key card", wordId: "cc-member" }],
        },
        {
          npcLines: [
            "The card covers the gym twenty-four seven, and the pool until nine p.m.! Here's your card and the class schedule — the pottery class fills up fast, just saying!",
            "Gym access: always! Pool: until nine nightly! Card, schedule, and a friendly tip — pottery class is legendary and sells out. Just saying!",
            "Card gets you the gym any hour, pool till nine! Here you go — plus the schedule. Pro tip from me: pottery vanishes fast. Just saying!",
          ],
          npcZh: "门卡健身房 24 小时，泳池到晚上 9 点！这是卡和课程表——顺便说一句，陶艺课抢手得很！",
          task: "对陶艺课感兴趣，询问详情",
          options: [
            { text: "Just saying? Now I'm curious — when does the pottery class meet?", ok: true,  tip: "Now I'm curious 被种草 + when does it meet 问时间" },
            { text: "Pottery! Clay! Ghost movie scene! Sign me up now!",               ok: false, tip: "先问信息：When does the pottery class meet?" },
            { text: "Pottery suspicious. Why popular? Clay conspiracy?",                ok: false, tip: "表达兴趣：Now I'm curious — when does it meet?" },
          ],
          phrase: { en: "Now I'm curious.", zh: "这我倒好奇了。", note: "curious 好奇的；被推销种草时的自然回应" },
        },
      ],
    },
