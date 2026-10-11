    {
      id: "v2",
      title: "第 2 次光顾 · 真丝与羊绒",
      titleEn: "Silk & Cashmere",
      emoji: "🎀",
      desc: "妈妈的真丝连衣裙和你的羊绒衫要送洗。贵重衣物护理：说明材质、问清风险、加急服务。",
      reward: { en: "cashmere", zh: "你的贵重衣物得到了专业呵护！🎀" },
      steps: [
        {
          npcLines: [
            "Welcome back! How did the suit turn out? Ready for the interview?",
            "Hey, look who's back! The suit — was it interview-ready?",
            "Welcome in! So — did the suit pass the interview test?",
          ],
          npcZh: "欢迎回来！西装怎么样？做好面试准备了吗？",
          task: "称赞西装效果，说明今天送洗贵重衣物",
          options: [
            { text: "The suit looks brand new — thank you! Today I have something more delicate: a silk dress and a cashmere sweater.", ok: true,  tip: "delicate 娇贵易损——贵重衣物的关键形容词" },
            { text: "Suit good. Now expensive clothes. Be scared. Be careful.",                                                     ok: false, tip: "说明材质：a silk dress and a cashmere sweater" },
            { text: "Mom dress and my sweater. Very old. Very love.",                                                               ok: false, tip: "点明材质更重要：It's silk and cashmere" },
          ],
          phrase: { en: "I have something delicate.", zh: "我有件娇贵的衣物。", note: "delicate = 娇气的/易损的；专业护理的开场词" },
        },
        {
          npcLines: [
            "Ooh, silk and cashmere — the VIP treatment section! Let me look at them. Any stains or special concerns?",
            "The luxury fabrics! Bring them over. Any stains or anything I should know about?",
            "Silk and cashmere — my favorite materials to work with! Stains? Special requests?",
          ],
          npcZh: "哦，真丝和羊绒——VIP 待遇区！我看看。有污渍或特别要注意的吗？",
          task: "说明羊绒衫袖口有红酒渍",
          options: [
            { text: "The cashmere has a red wine stain on the cuff — I blotted it with water right away.", ok: true,  tip: "blot 蘸吸（不是擦）+ right away 及时处理——正确急救知识" },
            { text: "Wine fell on sweater. I rubbed hard. Now bigger stain. Help.",                        ok: false, tip: "已经发生就如实说：There's a red wine stain on the cuff" },
            { text: "Red wine party accident. Long story. Wine won.",                                      ok: false, tip: "说重点：A red wine stain on the cuff of the cashmere" },
          ],
          phrase: { en: "There's a wine stain on the cuff.", zh: "袖口上有个红酒渍。", note: "cuff 袖口；应急处理用 blot 蘸吸，千万别 rub 搓" },
        },
        {
          npcLines: [
            "Blotting with water was exactly right — you saved that sweater! Wine on cashmere is very treatable if it's fresh.",
            "Good thinking with the water blot! Fresh wine stains lift right out of cashmere. You did everything right.",
            "You blotted it? Perfect move! Fresh wine on cashmere — we can handle that, no problem at all.",
          ],
          npcZh: "用水蘸吸完全正确——你救了这件羊绒衫！羊绒上的新鲜酒渍很好处理。",
          task: "询问真丝连衣裙怎么处理",
          options: [
            { text: "That's a relief! And the silk dress — can it be dry cleaned safely?", ok: true,  tip: "That's a relief 松口气 + safely 确认安全性" },
            { text: "Silk dress do anything. Silk is strong like denim.",                 ok: false, tip: "真丝娇贵需确认：Can it be dry cleaned safely?" },
            { text: "Silk dress is mother dress. Mother scary. Be careful extra.",        ok: false, tip: "专业确认：Can the silk be dry cleaned safely?" },
          ],
          phrase: { en: "Can it be dry cleaned safely?", zh: "干洗它安全吗？", note: "贵重衣物必问句；safely 是核心" },
        },
        {
          npcLines: [
            "Silk is actually one of the safest dry-clean fabrics. I'll use our gentle process for both pieces. The dress is eighteen, the sweater fifteen.",
            "Silk loves dry cleaning — safest fabric for it, honestly! Gentle cycle for both. Eighteen for the dress, fifteen for the sweater.",
            "Silk and dry cleaning get along great! Both will get our gentle treatment. Dress is eighteen, sweater's fifteen.",
          ],
          npcZh: "真丝其实是最适合干洗的面料之一。两件都走轻柔流程。连衣裙 18，羊绒衫 15。",
          task: "询问能否加急（周末要穿）",
          options: [
            { text: "I actually need them by Friday — do you offer rush service?", ok: true,  tip: "rush service 加急服务——明确需求日期" },
            { text: "Friday! Not Saturday. Friday. Understand date?",             ok: false, tip: "专业询问：Do you offer rush service?" },
            { text: "Make fast. No pay extra. Fast free.",                       ok: false, tip: "加急通常加钱：Do you offer rush service?" },
          ],
          phrase: { en: "Do you offer rush service?", zh: "你们提供加急服务吗？", note: "rush service 加急；赶时间必备问句" },
        },
        {
          npcLines: [
            "We do! Rush is fifty percent more — the dress would be twenty-seven, the sweater twenty-two.50, ready Friday morning. Worth it?",
            "Rush service available! It's an extra fifty percent — twenty-seven and twenty-two fifty, done by Friday morning. Interested?",
            "Sure do! Rush adds fifty percent: twenty-seven for the dress, twenty-two fifty for the sweater, Friday at nine a.m. Deal?",
          ],
          npcZh: "有！加急加收 50%——连衣裙 27，羊绒衫 22.5，周五早上可取。要吗？",
          task: "算一下账，接受加急",
          options: [
            { text: "For a weekend occasion, that's worth it. Rush service for both, please!", ok: true,  tip: "明确决策 + 复述确认 rush for both" },
            { text: "Fifty percent more? Fifty percent less. Negotiate now.",                 ok: false, tip: "明码加急费：Rush service for both, please!" },
            { text: "Friday morning too late. Friday night better. Then Saturday.",           ok: false, tip: "周五早上满足需求：Rush service for both, please!" },
          ],
          phrase: { en: "That's worth it.", zh: "这钱花得值。", note: "worth it 值得；为重要场合付费的果断表达" },
          adds: [{ emoji: "⚡", label: "Rush service", wordId: "dry-urgent" }],
        },
        {
          npcLines: [
            "Rush it is — both pieces, Friday morning! I'll write 'FRAGILE — SILK & CASHMERE' on the ticket so everyone handles them with care.",
            "Excellent choice! Both on rush, ready Friday morning. Big red letters on the ticket: silk and cashmere — extra gentle handling!",
            "Rush service engaged! Friday morning, both pieces. I'm flagging the ticket for delicate handling — they'll get the white-glove treatment!",
          ],
          npcZh: "加急确认——两件都是周五早上！我会在单子上写『易损——真丝和羊绒』，让所有人都小心处理。",
          task: "感谢专业服务",
          options: [
            { text: "I love the attention to detail. Thank you — see you Friday morning!", ok: true,  tip: "attention to detail 对细节的用心——夸专业的精准词" },
            { text: "Red letters scary. Green letters nicer. Change color.",             ok: false, tip: "感谢即可：I love the attention to detail!" },
            { text: "Friday morning I sleep. Open door to my house. Bring clothes.",      ok: false, tip: "按时到店取：See you Friday morning!" },
          ],
          phrase: { en: "I love the attention to detail.", zh: "我很欣赏这种对细节的用心。", note: "attention to detail 细节控；夸专业服务的金字招牌" },
        },
      ],
    },
