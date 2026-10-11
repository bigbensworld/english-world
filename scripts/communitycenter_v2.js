    {
      id: "v2",
      title: "第 2 次光顾 · 陶艺课与候补名单",
      titleEn: "The Waitlist",
      emoji: "🏺",
      desc: "陶艺课满了！上候补名单、等位转正、课程规则——报课不成时的 Plan B 学问。",
      reward: { en: "waitlist", zh: "候补转正，你有位置了！🏺" },
      steps: [
        {
          npcLines: [
            "Welcome back! How's the key card treating you — gym and pool all good?",
            "Hey, member number one of my heart! Card working out? Swimming happened yet?",
            "Back so soon! The card survives, I hope? Gym sessions commenced?",
          ],
          npcZh: "欢迎回来！门卡用得怎么样——健身房和泳池还好吗？",
          task: "简短寒暄后说明来意：报陶艺课",
          options: [
            { text: "The pool is amazing! I'm here about that pottery class — how do I sign up?", ok: true,  tip: "先回应寒暄再入正题——社交节奏感" },
            { text: "Card fine. Pottery now. Clay time. Skip small talk.",                        ok: false, tip: "寒暄+正题：The pool is amazing — how do I sign up for pottery?" },
            { text: "Gym scary. Machines judge me. Pool cold. Pool deep. Anyway, pottery.",       ok: false, tip: "轻松衔接：I'm here about the pottery class" },
          ],
          phrase: { en: "I'm here about ___.", zh: "我是为……来的。", note: "here about 为……而来；开门见山句式" },
        },
        {
          npcLines: [
            "Ah, the pottery class! So... here's the situation. The fall session is completely full. Twelve spots, gone in two days.",
            "The famous pottery class! Small problem: fall session is booked solid. Twelve seats — evaporated in forty-eight hours.",
            "Pottery! Yes! About that... fall session: one hundred percent full. Twelve spots, poof, gone by Wednesday.",
          ],
          npcZh: "啊，陶艺课！所以……情况是这样。秋季班满了。12 个名额，两天就没了。",
          task: "失望但不放弃，问还有别的办法吗",
          options: [
            { text: "That's a shame — is there a waitlist, or another way to get in?", ok: true,  tip: "That's a shame 真遗憾 + waitlist 候补——被拒后的标准追问" },
            { text: "Full?! I bribe teacher! Clay bribe! Accept mud money!",           ok: false, tip: "常规路径：Is there a waitlist?" },
            { text: "Two days?! Slow people take class! Fast me deserves more!",       ok: false, tip: "礼貌追问：Is there a waitlist, or another way in?" },
          ],
          phrase: { en: "Is there a waitlist?", zh: "有候补名单吗？", note: "waitlist 候补；满员课程/餐厅排位的救生圈" },
        },
        {
          npcLines: [
            "There is! I can put you first on the waitlist — people drop out more than you'd think. Want me to add you?",
            "Waitlist exists and you'd be first in line! Life happens — people drop classes constantly. Shall I add you?",
            "Absolutely! You'd be waitlist number one! People's schedules collapse all the time. Add you?",
          ],
          npcZh: "有！我可以把你排在候补第一位——退课的人比你想象的多。要加吗？",
          task: "接受候补，顺便问候补如何通知",
          options: [
            { text: "Yes, please add me! How will I know if a spot opens up?", ok: true,  tip: "How will I know...? 问通知机制——候补关键信息" },
            { text: "Add me! I wait by phone. I sleep by phone. Phone person now.", ok: false, tip: "问通知方式：How will I know if a spot opens?" },
            { text: "First in line? Guarantee spot? Fake guarantee? Real guarantee?", ok: false, tip: "接受+问机制：How will I know?" },
          ],
          phrase: { en: "How will I know?", zh: "我怎么知道呢？", note: "候补/申请/结果——等待期的通知机制问句" },
        },
        {
          npcLines: [
            "We'll call and email you — you'd have twenty-four hours to confirm before we move to the next person. Fair warning: pottery waitlisters answer fast!",
            "Phone call plus email! You get twenty-four hours to confirm, then it rolls to the next person. And pottery people? They answer FAST.",
            "Call and email, and you'll have a day to say yes before we pass it on. Quick tip: pottery fans confirm at lightning speed!",
          ],
          npcZh: "我们会打电话并发邮件——你有 24 小时确认，否则顺延给下一位。提醒：陶艺候补的人回得都很快！",
          task: "确认理解规则并询问费用",
          options: [
            { text: "Twenty-four hours to confirm — got it. And what's the class fee, in case I get in?", ok: true, tip: "复述规则 + 提前问价——候补党的周全" },
            { text: "Twenty-four hours?! I sleep twenty-five hours! Unfair clock!",                       ok: false, tip: "复述+问价：24 hours to confirm — what's the class fee?" },
            { text: "Fee? Free? Clay should be free. Earth belongs to all.",                              ok: false, tip: "确认规则：Got it — what's the fee if I get in?" },
          ],
          phrase: { en: "Got it — and what's the fee?", zh: "明白了——那费用是多少？", note: "Got it 复述确认后的自然追问" },
        },
        {
          npcLines: [
            "Sixty dollars for the eight-week session, materials included — members get that price. Non-members pay eighty. Worth every penny, the instructor is wonderful.",
            "Sixty bucks covers eight weeks, clay included — your member rate! Outsiders pay eighty. And the instructor? Pure gold.",
            "Member price: sixty for eight weeks, materials bundled in! Non-members: eighty. The instructor alone is worth it!",
          ],
          npcZh: "八周课程 60 美元含材料——会员价。非会员 80。绝对值回票价，老师教得特别好。",
          task: "接受价格，顺便看看别的课",
          options: [
            { text: "Sixty for eight weeks is very reasonable. While I'm here — what other classes have open spots?", ok: true, tip: "先认可价格 + 主动扫其他课——候补期的备选思维" },
            { text: "Sixty?! Clay cost one mud dollar! Robbery of mud!",                                             ok: false, tip: "认可+扩展：What other classes have open spots?" },
            { text: "Other classes? Backup classes? Plan B classes? Insecure student needs options.",                 ok: false, tip: "顺路了解：What other classes have open spots?" },
          ],
          phrase: { en: "What other classes have open spots?", zh: "还有哪些课有名额？", note: "open spots 有空位；候补期的 Plan B 收集" },
          adds: [{ emoji: "⏳", label: "Waitlist #1", wordId: "cc-waitlist2" }],
        },
        {
          npcLines: [
            "Watercolor painting has three spots, and beginners' yoga has five! Want to grab one while you wait for pottery?",
            "Watercolor: three seats open! Beginner yoga: five! Want a spot while pottery cooks?",
            "Good news options! Watercolor — three openings. Yoga for beginners — five! Grab one while you wait?",
          ],
          npcZh: "水彩画还有 3 个名额，初级瑜伽还有 5 个！等陶艺的期间要不要占一个？",
          task: "报一门瑜伽作陪跑，等陶艺候补",
          options: [
            { text: "Let's do the yoga — a calm body while I wait for clay! And fingers crossed for the waitlist.", ok: true,  tip: "fingers crossed 交叉手指求好运——候补党的收尾" },
            { text: "Yoga yes! Body pretzel time! Bendy backup plan!",                                              ok: false, tip: "决策+祝福：Let's do yoga — fingers crossed for the waitlist!" },
            { text: "No backup. Pottery or nothing. Clay destiny only.",                                            ok: false, tip: "灵活选择：Let's do the yoga while I wait!" },
          ],
          phrase: { en: "Fingers crossed!", zh: "但愿好运！", note: "fingers crossed 手指交叉；祈祷成功的经典手势语" },
        },
      ],
    },
