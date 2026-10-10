    {
      id: "v1",
      title: "第 1 次光顾 · 寄包裹",
      titleEn: "Shipping a Package",
      emoji: "📦",
      desc: "给朋友寄一箱家乡零食。称重、选服务、填面单、付款——完整走一遍寄包裹流程。",
      reward: { en: "package", zh: "你用英文寄出了第一个包裹！📦" },
      steps: [
        {
          npcLines: [
            "Hi there! Welcome to the post office. What can I do for you?",
            "Good afternoon! How may I help you today?",
            "Hello! Front of the line — what are we shipping today?",
          ],
          npcZh: "您好！欢迎来到邮局。有什么可以帮您？",
          task: "说明来意：寄一个包裹",
          options: [
            { text: "Hi! I'd like to ship this package, please.", ok: true,  tip: "I'd like to ship this package 寄包裹标准句；ship = 寄送（美式最常用）" },
            { text: "I have box. Box go far away.",                ok: false, tip: "完整句：I'd like to ship this package" },
            { text: "Give me ship service for this thing.",        ok: false, tip: "ship 直接作动词：I'd like to ship this package" },
          ],
          phrase: { en: "I'd like to ship this ___.", zh: "我想寄这个……。", note: "ship 比 send 更专指物流寄送；英式也说 post a package" },
        },
        {
          npcLines: [
            "Sure! Let's put it on the scale first... Okay, it weighs two kilos.",
            "No problem. On the scale it goes... Two kilos exactly.",
            "Of course! Scale first... Looks like two kilos.",
          ],
          npcZh: "好的！先放上秤……好，重量是两公斤。",
          task: "询问可以接受的重量上限",
          options: [
            { text: "Two kilos — got it. Is there a weight limit I should know about?", ok: true, tip: "weight limit 重量上限——先问规则防白跑" },
            { text: "Two? Is that too heavy? Tell me now!",   ok: false, tip: "礼貌询问：Is there a weight limit?" },
            { text: "Kilos? I only understand pounds.",       ok: false, tip: "metric 与英制并用很常见，问规则即可" },
          ],
          phrase: { en: "Is there a weight limit?", zh: "有重量限制吗？", note: "limit = 上限；超重可以说 It's over the limit" },
        },
        {
          npcLines: [
            "Thirty kilos is the max for standard service, so you're fine. What's inside, if I may ask?",
            "You're way under the limit! Now — what's in the box?",
            "Plenty of room to spare. What are the contents?",
          ],
          npcZh: "标准服务上限三十公斤，您没问题。方便问一下里面装的是什么吗？",
          task: "如实说明内容物：零食和茶叶",
          options: [
            { text: "Just some snacks and tea — nothing fragile.", ok: true, tip: "如实申报内容物是寄件基本义务；fragile 易碎" },
            { text: "It's a secret. Don't open it, ever.",  ok: false, tip: "内容物必须如实说明：It's snacks and tea" },
            { text: "Nothing! Empty box, very light magic.", ok: false, tip: "邮局需要知道内容物：some snacks and tea" },
          ],
          phrase: { en: "Nothing fragile.", zh: "没有易碎品。", note: "fragile /ˈfrædʒaɪl/ 易碎；柜台会问 Anything fragile or liquid?" },
        },
        {
          npcLines: [
            "Snacks and tea — lovely. Where's it headed?",
            "Sounds delicious! And where is it going?",
            "Nice! Destination?",
          ],
          npcZh: "零食和茶——不错。寄到哪里？",
          task: "说明目的地：纽约，并问有哪几种服务",
          options: [
            { text: "It's going to New York. What are my shipping options?", ok: true, tip: "shipping options 服务选项——先问清再选，省钱标准动作" },
            { text: "New York. Fastest one, whatever it costs.", ok: false, tip: "先问选项比价比时效：What are my options?" },
            { text: "Far east. Very far. You figure it out.",   ok: false, tip: "给明确目的地：It's going to New York" },
          ],
          phrase: { en: "What are my shipping options?", zh: "我有哪些寄送方式可选？", note: "标准服务 vs 快递：先问时效和价格再决定" },
        },
        {
          npcLines: [
            "For two kilos: standard takes five days at eight dollars, express gets there in two days at twenty.",
            "Two choices — five days for eight bucks, or two days for twenty.",
            "We've got standard, five days, eight dollars. Express is two days, twenty dollars.",
          ],
          npcZh: "两公斤的话：标准件五天八美元，快递两天二十美元。",
          task: "选标准件，并确认是否含追踪",
          options: [
            { text: "Standard is fine. Does that come with a tracking number?", ok: true, tip: "tracking number 追踪单号——确认能否查件" },
            { text: "Standard. If it gets lost, that's fate.",   ok: false, tip: "确认追踪：Does it come with a tracking number?" },
            { text: "What is tracking? I don't need numbers.",   ok: false, tip: "追踪单号几乎必问：tracking number" },
          ],
          phrase: { en: "Does it come with a tracking number?", zh: "这个包含追踪单号吗？", note: "come with = 自带、包含；比 Is there a tracking number 更地道" },
        },
        {
          npcLines: [
            "Yes, tracking is included. Now for the label — could you spell the street name for me?",
            "Tracking's included. One more thing: spell the street name for me?",
            "Sure does! Last bit — the street name, letter by letter, please.",
          ],
          npcZh: "含追踪。接下来打面单——能帮我拼一下街道名吗？",
          task: "逐字母拼出街道名",
          options: [
            { text: "Sure — E-L-M, Elm Street. E-L-M.", ok: true,  tip: "报地址逐字母拼写：E-L-M Elm Street——拼错必丢件" },
            { text: "Elm. You know, like the tree.",    ok: false, tip: "口头描述不行，逐字母拼：E-L-M" },
            { text: "Just write Elm, everyone knows it.", ok: false, tip: "拼写要主动给出：E-L-M, Elm Street" },
          ],
          phrase: { en: "Let me spell that for you.", zh: "我来给您拼写一下。", note: "报地址/姓名主动拼说：避免同名混淆，邮局高频动作" },
        },
        {
          npcLines: [
            "Perfect. That'll be eight dollars exactly. How would you like to pay?",
            "Elm Street, got it. Eight dollars even — card or cash?",
            "All set on the label! Eight fifty... just kidding, eight flat. How are you paying?",
          ],
          npcZh: "完美。一共八美元整。您怎么付款？",
          task: "付款并索取收据",
          options: [
            { text: "Card, please. Could I get a receipt?", ok: true,  tip: "Could I get a receipt? 索取收据——寄件凭证" },
            { text: "Card. No paper, save the trees.",      ok: false, tip: "收据是寄件凭证：Could I get a receipt?" },
            { text: "Pay? I thought shipping was free.",    ok: false, tip: "服务有价，付款+要收据一气呵成" },
          ],
          phrase: { en: "Could I get a receipt?", zh: "能给我一张收据吗？", note: "receipt /rɪˈsiːt/——注意 p 不发音" },
        },
        {
          npcLines: [
            "Here's your receipt and tracking number. Anything else today?",
            "Receipt and tracking number, coming right up. Anything more I can do?",
            "One receipt, one tracking number. Have a great day — anything else?",
          ],
          npcZh: "这是您的收据和追踪单号。今天还有其他需要吗？",
          task: "告别并表示感谢",
          options: [
            { text: "That's everything. Thanks so much — have a great day!", ok: true, tip: "That's everything 收尾 + have a great day 道别" },
            { text: "Bye bye now.", ok: false, tip: "可以更完整：That's everything, thanks a lot!" },
            { text: "Money. Give money back. No.", ok: false, tip: "正常告别：Thanks so much, have a great day" },
          ],
          phrase: { en: "That's everything, thanks!", zh: "就这些了，谢谢！", note: "柜台告别万能收尾；也可说 That'll be all" },
        },
      ],
    },
