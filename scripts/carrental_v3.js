    {
      id: "v3",
      title: "第 3 次光顾 · 想延期，先问价",
      titleEn: "Extending the Rental",
      emoji: "📅",
      desc: "玩得太开心想多待两天！打电话给租车行问延期价格——先问清日租金和取车原价，再决定延不延。",
      reward: { en: "extend the rental", zh: "你学会了英文租车延期！📅" },
      steps: [
        {
          npcLines: [
            "Speedy Rentals, this is Dana speaking. How can I help you today?",
            "Good morning, Speedy Rentals, Dana on the line. What can I do for you?",
            "Speedy Rentals, Dana here! What's on your mind today?",
          ],
          npcZh: "Speedy 租车，我是 Dana。今天有什么可以帮您？",
          task: "说明自己是三天前取车的客户，想延长租期",
          options: [
            { text: "Hi, I picked up a compact car from you three days ago. I'd like to extend the rental by two days.", ok: true,  tip: "extend the rental by ___ 延长租期 + by 表示增量" },
            { text: "Car too fun. More car days. Two more.",                                                           ok: false, tip: "电话正式些：I'd like to extend the rental by two days" },
            { text: "I have car. Maybe return, maybe keep. You guess.",                                                 ok: false, tip: "说清需求：I'd like to extend the rental by two days" },
          ],
          phrase: { en: "I'd like to extend the rental by ___ days.", zh: "我想把租车延长……天。", note: "extend...by... 延长固定时长；酒店租车通用" },
        },
        {
          npcLines: [
            "Sure, we can do that! Let me pull up your contract. You're on the weekend rate of thirty-five dollars a day — the same rate applies for the extension.",
            "No problem at all! Pulling up your file... You've got the weekend special, thirty-five a day, and yes, that rate holds for extra days.",
            "Happy to help! Found your contract — weekend rate, thirty-five dollars daily. The extension would be at that same rate.",
          ],
          npcZh: "当然可以！我调一下你的合同。你用的是周末价 35 美元一天——延期同样适用这个价。",
          task: "追问延期价和原来取车价是否一样",
          options: [
            { text: "Good to know. Is the daily rate the same as what I paid at pickup?", ok: true,  tip: "确认费率一致性，防隐形加价" },
            { text: "Same rate? Or higher rate? Or secret third rate?",                 ok: false, tip: "清晰确认：Is the daily rate the same as what I paid at pickup?" },
            { text: "Thirty-five? I pay zero. Friend price.",                           ok: false, tip: "确认费率即可：Is it the same as what I paid at pickup?" },
          ],
          phrase: { en: "Is the rate the same as what I paid?", zh: "价格和我之前付的一样吗？", note: "延期/续费必问，防止临时换价目" },
        },
        {
          npcLines: [
            "Exactly the same — thirty-five a day, no change. Shall I go ahead and extend it to Friday?",
            "One hundred percent the same — thirty-five flat, no surprises. Want me to extend you through Friday?",
            "Identical, I promise — thirty-five per day. Should I lock in the extension until Friday?",
          ],
          npcZh: "完全一样——还是 35 一天，没有变化。要我把租期延到周五吗？",
          task: "确认延期到周五",
          options: [
            { text: "Yes, please extend it to Friday. Do I need to sign anything new?", ok: true,  tip: "确认 + 追问手续，办事周全" },
            { text: "Friday yes. No sign. Mouth promise enough.",                      ok: false, tip: "问清手续：Do I need to sign anything new?" },
            { text: "Extend forever. Never return car.",                               ok: false, tip: "明确期限：Please extend it to Friday" },
          ],
          phrase: { en: "Do I need to sign anything new?", zh: "需要签什么新文件吗？", note: "延期/变更服务后的确认句，避免手续漏洞" },
        },
        {
          npcLines: [
            "No new contract — I'll update your booking in the system. But heads up: please return the car by 5 p.m. on Friday, or late fees kick in.",
            "No paperwork needed — it's all digital now! One thing though: the car's due back by five p.m. Friday, or late fees apply.",
            "Nothing to sign — I've updated it right here! Just a heads-up: return by five p.m. Friday, otherwise late fees start ticking.",
          ],
          npcZh: "不用签新合同——我在系统里更新你的订单。但注意：周五下午 5 点前还车，否则会收滞纳金。",
          task: "询问滞纳金怎么算",
          options: [
            { text: "How much is the late fee, exactly? Just so I know.", ok: true,  tip: "How much is... 问清金额 + Just so I know 表明只是了解" },
            { text: "Late fee scary. I be early. No fee talk.",          ok: false, tip: "问清规则：How much is the late fee?" },
            { text: "Five p.m.? What about 5:01? Detail!",               ok: false, tip: "直接问金额：How much is the late fee, exactly?" },
          ],
          phrase: { en: "How much is the late fee?", zh: "滞纳金是多少？", note: "late fee 滞纳金；租车酒店图书馆通用概念" },
        },
        {
          npcLines: [
            "It's fifteen dollars per hour after a thirty-minute grace period. So if you're back by 5:30, you're totally fine.",
            "There's a thirty-minute grace period, then fifteen dollars an hour after that. Back by 5:30 and you're golden.",
            "You get a thirty-minute grace window — after that, fifteen bucks an hour. Roll in by 5:30 and it's all good.",
          ],
          npcZh: "有 30 分钟宽限期，之后每小时 15 美元。所以 5 点半前回来完全没问题。",
          task: "确认宽限期规则并道谢",
          options: [
            { text: "Got it — thirty-minute grace period, then fifteen an hour. Thanks for the heads-up!", ok: true,  tip: "复述关键规则确认理解 + heads-up 提醒" },
            { text: "Thirty minute? Make sixty. Do it.",                                                 ok: false, tip: "规则不能改：Got it — thanks for the heads-up!" },
            { text: "Grace? Like church grace? Confused.",                                               ok: false, tip: "grace period = 宽限期：Got it — thanks!" },
          ],
          phrase: { en: "Thanks for the heads-up!", zh: "谢谢提醒！", note: "heads-up = 提前告知/预警，口语高频" },
        },
        {
          npcLines: [
            "Anytime! Your new drop-off is Friday by 5 p.m. Anything else I can help with?",
            "My pleasure! So, Friday, five p.m., and we'll see you then. Anything else today?",
            "Happy to help! Friday at five it is — see you at the counter. Anything more I can do?",
          ],
          npcZh: "随时！你的新还车时间是周五下午 5 点。还有其他需要帮忙的吗？",
          task: "没有其他问题，礼貌挂电话",
          options: [
            { text: "That's everything. Thanks for making it so easy — have a great day!", ok: true,  tip: "That's everything 电话收尾 + 夸一句服务" },
            { text: "Hang up first. I count three. One...",                               ok: false, tip: "礼貌收尾：That's everything — have a great day!" },
            { text: "More things! I think. Maybe. Wait.",                                  ok: false, tip: "没有就收尾：That's everything — have a great day!" },
          ],
          phrase: { en: "That's everything. Have a great day!", zh: "就这些了，祝你有美好的一天！", note: "电话结束双件套；办事顺利后的完美收尾" },
        },
      ],
    },
