    {
      id: "v3",
      title: "第 3 次光顾 · 办卡与预约",
      titleEn: "Membership & Booking",
      emoji: "💳",
      desc: "成了常客！无预约直接来、指定发型师、办会员卡算优惠、预约下次——理发店的金钱与时间英语。",
      reward: { en: "membership card", zh: "你解锁了办卡预约英语，常客当得明明白白！💳" },
      steps: [
        {
          npcLines: [
            "Hey, it's you again! Welcome back — do you have an appointment today?",
            "My favorite customer! Do you have a booking, or are we feeling spontaneous?",
            "Well well, look who's back! Appointment today, or flying free?",
          ],
          npcZh: "嘿，又是你！欢迎回来——今天有预约吗？",
          task: "没有预约，询问能否直接剪",
          options: [
            { text: "No appointment — do you take walk-ins today? I'd like a quick trim.", ok: true,  tip: "walk-in 无预约顾客 + quick trim 快速修剪" },
            { text: "No book. Just hair luck today?",        ok: false, tip: "标准问法：Do you take walk-ins today?" },
            { text: "Appointment? I don't even know that word.", ok: false, tip: "直接说明来意：Do you take walk-ins? I'd like a quick trim" },
          ],
          phrase: { en: "Do you take walk-ins?", zh: "你们接受没预约直接来的客人吗？", note: "walk-in = 直接上门；美式服务行业高频词" },
        },
        {
          npcLines: [
            "For you? Always! Your usual stylist, Maria, is free in ten minutes. Want to wait?",
            "You know we always fit you in! Maria can take you in ten — okay to wait?",
            "For a regular like you? No problem! Maria's free in ten minutes. Hang tight?",
          ],
          npcZh: "对你？永远有空！你常约的发型师 Maria 十分钟后有空。等一下可以吗？",
          task: "接受等待，指定发型师",
          options: [
            { text: "Perfect, I'll wait for Maria — she knows exactly how I like my hair.", ok: true,  tip: "she knows how I like my hair 常客指定发型师的经典理由" },
            { text: "Any person with scissors is fine.",    ok: false, tip: "指定熟手更稳：I'll wait for Maria" },
            { text: "Ten minutes?! My time is very expensive!", ok: false, tip: "等十分钟合理：Perfect, I'll wait for Maria" },
          ],
          phrase: { en: "She knows how I like my hair.", zh: "她知道我想要什么发型。", note: "常客忠的表达；指定发型师时自然说出来" },
        },
        {
          npcLines: [
            "She'll be thrilled to hear that! While you wait — can I tell you about our membership card? Twenty percent off every visit.",
            "Aww, she'll love that! Say, quick pitch while you wait: our membership card — twenty percent off, every single visit.",
            "That'll make her day! Oh — one thing: membership card. Twenty percent off all haircuts. Want to hear more?",
          ],
          npcZh: "她听到会开心的！等待时——给你介绍下我们的会员卡吗？每次剪发八折。",
          task: "询问办卡费用再决定",
          options: [
            { text: "That sounds interesting. How much is the card, and how long does it last?", ok: true,  tip: "How much / how long 问清成本与期限——办卡两问" },
            { text: "Twenty percent! Card! Where sign? Fast!",  ok: false, tip: "先问成本：How much is the card, and how long does it last?" },
            { text: "Membership is a trap for weak minds.",     ok: false, tip: "划算与否算一算：How much is the card?" },
          ],
          phrase: { en: "How much is it, and how long does it last?", zh: "多少钱？有效期多久？", note: "一切会员卡/套餐的必问两句" },
        },
        {
          npcLines: [
            "Fifty dollars for a year. Haircuts are thirty, so with twenty percent off you'd save six dollars a visit — it pays for itself in nine visits!",
            "Fifty bucks a year. Thirty-dollar cuts, twenty percent off — six bucks saved each time. Nine visits and you're ahead!",
            "Annual card, fifty dollars. Save six dollars per thirty-dollar cut — break even by visit nine!",
          ],
          npcZh: "年费 50 美元。剪发 30 美元，八折每次省 6 美元——剪 9 次就回本了！",
          task: "算账后决定办理",
          options: [
            { text: "I come about every five weeks, so that's worth it. I'll take the card!", ok: true,  tip: "按自己的频率算账（every five weeks）+ 做决定 I'll take it" },
            { text: "Math too hard. Card yes. Money no matter.", ok: false, tip: "算清频率再决定：I come every five weeks — I'll take it!" },
            { text: "Nine visits is too many. Card rejected.",    ok: false, tip: "5 周一次 = 一年 10 次，已回本：I'll take the card!" },
          ],
          phrase: { en: "It pays for itself.", zh: "它自己就把本钱赚回来了（回本）。", note: "算账常用语；earns back the cost" },
        },
        {
          npcLines: [
            "Excellent choice! Just fill this out... and done! Would you like to book your next appointment before you leave?",
            "Welcome to the club! Form's all filled. Want to lock in your next appointment now?",
            "You're officially a member! Last thing — shall we book your next visit today?",
          ],
          npcZh: "好选择！填一下这张表……好了！走之前要把下次预约定下来吗？",
          task: "预约五周后的周六",
          options: [
            { text: "Sure — could I book for Saturday in five weeks? Morning, if possible.", ok: true,  tip: "book for + 时间 预约 + morning, if possible 上午优先（if possible 委婉）" },
            { text: "Book future Saturday of all Saturdays.", ok: false, tip: "说清具体：Saturday in five weeks, morning if possible" },
            { text: "Book? I live in the present moment only.", ok: false, tip: "常客锁位更省心：Could I book for Saturday in five weeks?" },
          ],
          phrase: { en: "Could I book for ___?", zh: "我能预约……吗？", note: "预约万能句；补 if possible 更灵活" },
        },
        {
          npcLines: [
            "Saturday in five weeks, ten a.m., with Maria — you're all set! See you then, member!",
            "Done! Saturday, ten a.m., Maria's chair. See you in five weeks, VIP!",
            "Booked and locked! Ten a.m. Saturday, five weeks out. Enjoy the trim today!",
          ],
          npcZh: "五周后的周六上午十点，Maria——都定好了！到时见，会员！",
          task: "感谢接待，结束本轮",
          options: [
            { text: "You've been so helpful — see you in five weeks. Have a great day!", ok: true,  tip: "see you then 预约道别 + have a great day 收尾" },
            { text: "Bye shop! Bye card! Bye everything!",   ok: false, tip: "自然道别：See you in five weeks. Have a great day!" },
            { text: "Five weeks is so long. Goodbye forever maybe.", ok: false, tip: "有约在身：See you in five weeks!" },
          ],
          phrase: { en: "See you then!", zh: "到时候见！", note: "预约告别语——then = 约定的那个时间" },
        },
      ],
    },
  ],
},
