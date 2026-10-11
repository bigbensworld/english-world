  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 西装送洗",
      titleEn: "Dropping Off a Suit",
      emoji: "👔",
      desc: "面试在即，西装需要专业护理。学描述衣物材质、问价格、拿取衣凭单——干洗店入门第一课。",
      reward: { en: "dry cleaning", zh: "你的西装送去专业护理了！👔" },
      steps: [
        {
          npcLines: [
            "Good morning! Welcome to Bright & Fresh Dry Cleaning. What can I do for you today?",
            "Hi there! Bright & Fresh Dry Cleaning — what are we cleaning today?",
            "Morning! Welcome in. What can I take care of for you?",
          ],
          npcZh: "早上好！欢迎来到 Bright & Fresh 干洗店。今天有什么可以帮您？",
          task: "说明要干洗一套西装",
          options: [
            { text: "Hi! I'd like to drop off this suit for dry cleaning, please.", ok: true,  tip: "drop off 送洗——干洗店的 drop off/pick up 一对反义动作" },
            { text: "Wash suit! Make clean! Now!",                                ok: false, tip: "专业说法：drop off this suit for dry cleaning" },
            { text: "Suit is dirty. You fix suit. How much monies?",              ok: false, tip: "先说明服务类型：I'd like to drop off this suit for dry cleaning" },
          ],
          phrase: { en: "I'd like to drop off ___.", zh: "我要送洗……", note: "drop off 送洗 / pick up 取衣，干洗店两大核心动词" },
        },
        {
          npcLines: [
            "A suit — nice! Let me check the care label... wool blend, dry clean only. You came to the right place!",
            "Ooh, a suit! Let's see that care label... wool blend, dry clean only. Perfect, that's our specialty!",
            "Excellent! Checking the label... it says dry clean only — and that's exactly what we do best!",
          ],
          npcZh: "西装——不错！我看下洗护标签……羊毛混纺，仅可干洗。你来对地方了！",
          task: "询问价格和取衣时间",
          options: [
            { text: "Great. How much is it, and when can I pick it up?", ok: true,  tip: "价格+时间一气呵成，办事高效" },
            { text: "Money number? Say number fast.",                    ok: false, tip: "礼貌询问：How much is it, and when can I pick it up?" },
            { text: "Pick up? I never leave suit. Suit stays with me.",   ok: false, tip: "干洗要留店：How much, and when can I pick it up?" },
          ],
          phrase: { en: "When can I pick it up?", zh: "什么时候能取？", note: "pick up 取回；送洗必问时间" },
        },
        {
          npcLines: [
            "It's twelve dollars for the two-piece suit, ready by Thursday afternoon. Does that work?",
            "Two-piece suit runs twelve dollars — ready Thursday after two. Sound good?",
            "Twelve bucks for the suit, and it'll be hanging here Thursday afternoon. Okay?",
          ],
          npcZh: "两件套西装 12 美元，周四下午可取。可以吗？",
          task: "接受，但提出西装有咖啡污渍需要处理",
          options: [
            { text: "That works. One thing — there's a coffee stain on the tie area. Can you get it out?", ok: true,  tip: "get it out 弄掉污渍——描述污渍位置+询问能否去除" },
            { text: "Stain there. Fix stain. No extra talk.",                                              ok: false, tip: "说明位置：There's a coffee stain on the tie area — can you get it out?" },
            { text: "Coffee attacked suit. Coffee is enemy. Kill coffee.",                                 ok: false, tip: "客观描述：Can you get the coffee stain out?" },
          ],
          phrase: { en: "There's a coffee stain on ___.", zh: "……上有个咖啡渍。", note: "stain 污渍；说清位置店员才好预处理" },
        },
        {
          npcLines: [
            "We'll pre-treat the stain first — coffee usually comes out completely. I'll note it on the ticket.",
            "No problem — we pre-treat coffee stains, and they almost always come right out. Noting it now!",
            "Coffee's an easy one! We'll pre-treat it before cleaning. I'm writing it on the ticket.",
          ],
          npcZh: "我们会先预处理污渍——咖啡渍通常能完全去除。我记在单子上了。",
          task: "感谢并确认凭单信息",
          options: [
            { text: "Perfect. So I just show this claim ticket when I pick up on Thursday?", ok: true,  tip: "claim ticket 取衣凭单——确认取衣流程" },
            { text: "Ticket? I remember face. Face is ticket.",                             ok: false, tip: "凭单取衣：I show this claim ticket when I pick up?" },
            { text: "Thursday is long. Make tomorrow. I wait.",                             ok: false, tip: "周四可取，确认凭单即可：I show this claim ticket Thursday?" },
          ],
          phrase: { en: "claim ticket", zh: "取衣凭单。", note: "凭单取衣是行规——丢了凭单要出示证件核对" },
        },
        {
          npcLines: [
            "That's it — ticket in, suit out, easy! Anything else today? We're running a deal on shirts: five for twenty dollars.",
            "Exactly — no ticket, no suit! Anything else? Shirts are on special: five for twenty.",
            "You got it! Oh — and this week, dress shirts are five for twenty dollars. Interested?",
          ],
          npcZh: "就是这样——凭单进，西装出，简单！今天还要别的吗？衬衫有活动：5 件 20 美元。",
          task: "接受衬衫优惠，一起送洗",
          options: [
            { text: "Actually yes — five shirts for twenty is a great deal. Let me drop those off too.", ok: true,  tip: "recognize a good deal + 顺势加购" },
            { text: "Five shirt? I own two shirt only. Sad wardrobe.",                                  ok: false, tip: "按实际情况：Let me drop those off too" },
            { text: "Deal suspicious. Why cheap? Secret hole in shirts?",                               ok: false, tip: "量多优惠是常态：Five for twenty is a great deal!" },
          ],
          phrase: { en: "That's a great deal.", zh: "这价格很划算。", note: "great deal 好交易；商家促销时的自然回应" },
          adds: [{ emoji: "🧺", label: "5 shirts", wordId: "dry-lobby" }],
        },
        {
          npcLines: [
            "Perfect — six pieces total, all under one ticket. Thursday afternoon, ask for Maria. See you then!",
            "All bundled together — one ticket, six pieces! Thursday afternoon, I'll be here. See you!",
            "Six items, one claim ticket! Come Thursday and ask for me — I'll have it all pressed and ready!",
          ],
          npcZh: "完美——共 6 件，一张单子全包。周四下午找 Maria 就行。到时候见！",
          task: "道谢离开",
          options: [
            { text: "Great, thank you Maria! See you Thursday.", ok: true,  tip: "记住店员名字，回头客待遇" },
            { text: "Maria? I call you Dry Clean Lady.",        ok: false, tip: "称呼名字更亲切：Thank you Maria — see you Thursday!" },
            { text: "Thursday I maybe come Friday. Surprise day.", ok: false, tip: "按时取衣：See you Thursday!" },
          ],
          phrase: { en: "See you Thursday!", zh: "周四见！", note: "约定时间的告别；干洗店常打交道的开始" },
        },
      ],
    },
