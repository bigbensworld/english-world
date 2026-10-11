    {
      id: "v4",
      title: "第 4 次光顾 · 改裤脚",
      titleEn: "Alterations",
      emoji: "✂️",
      desc: "新买的裤子太长！干洗店的裁缝服务：改裤脚、收腰、试身。改衣英语比想象中简单。",
      reward: { en: "alteration", zh: "你的裤子合身了！✂️" },
      steps: [
        {
          npcLines: [
            "Welcome back! Good to see you again — what brings you in today?",
            "Hey, my favorite customer! What can we do for you today?",
            "Welcome in! Back so soon — what's on the list today?",
          ],
          npcZh: "欢迎回来！又见面了——今天来办什么？",
          task: "询问是否提供改衣服务",
          options: [
            { text: "Hi! I bought new trousers, but they're too long. Do you do alterations?", ok: true,  tip: "Do you do alterations? 你们做改衣吗——服务询问万能句" },
            { text: "Pants long. Cut pants. You cut?",                                        ok: false, tip: "专业说法：Do you do alterations?" },
            { text: "I need tailor. Tailor in store? Where tailor hiding?",                   ok: false, tip: "直接问服务：Do you do alterations?" },
          ],
          phrase: { en: "Do you do alterations?", zh: "你们做改衣吗？", note: "alteration 改衣；do you do... 询问服务万能句式" },
        },
        {
          npcLines: [
            "We do — full alterations in the back! Hemming, waist adjustments, the works. How much shorter do the trousers need to be?",
            "Yes ma'am/sir, complete alteration service! Hems, waists, everything. So — how much are we taking off?",
            "Alterations are our specialty! Hemming, taking in, letting out — you name it. How much length are we losing?",
          ],
          npcZh: "做——后面有全套改衣服务！改裤脚、调腰围都行。裤子需要改短多少？",
          task: "说明大概需要改短 3 厘米左右",
          options: [
            { text: "About three centimeters — maybe an inch? I'd like them to just touch the top of my shoes.", ok: true,  tip: "just touch the top of my shoes 描述理想长度——形象化沟通" },
            { text: "Little bit short. Not too short. Medium short. You guess.",                                ok: false, tip: "给出量级：About three centimeters — they should just touch my shoes" },
            { text: "Cut until feelings right. Trust the scissors.",                                            ok: false, tip: "说明期望：About an inch, just touching the shoe tops" },
          ],
          phrase: { en: "About three centimeters.", zh: "大概三厘米。", note: "改衣沟通要给具体量；比划+数字双保险" },
        },
        {
          npcLines: [
            "Perfect description! Let me pin them while you're wearing them — that's the only accurate way. Could you step over here?",
            "Great, I can work with that! Let's pin them on you — measurements only count on a real body. Step this way?",
            "You described it perfectly! I'll pin the hem while you wear them. Over here, please!",
          ],
          npcZh: "描述得很清楚！我边穿边别针定位——这是唯一准确的方法。请到这边来好吗？",
          task: "配合别针，询问改好后能否试穿",
          options: [
            { text: "Sure. After you pin them — can I come back for a fitting before you finish?", ok: true,  tip: "come back for a fitting 回来试身——改衣质量保障" },
            { text: "Pins scary. No pins. Just cut.",                                             ok: false, tip: "别针定位是标准流程；问试穿：Can I come back for a fitting?" },
            { text: "Fitting? It fits already. Just shorter now.",                                ok: false, tip: "改后试穿更稳妥：Can I come back for a fitting before you finish?" },
          ],
          phrase: { en: "Can I come back for a fitting?", zh: "我能回来试身吗？", note: "fitting 试身；改衣的质检环节" },
        },
        {
          npcLines: [
            "Absolutely — I'll do a first pass, you try them on, and we fine-tune. Oh, these also need taking in at the waist, don't they?",
            "Of course! First pass, fitting, fine-tuning — that's our process. Say, the waist looks a bit roomy too — shall we take it in?",
            "That's our standard workflow! And while I'm at it — the waist looks loose. Want me to take it in an inch?",
          ],
          npcZh: "当然——我先做一遍，你来试穿，再精调。对了，这条腰部也偏松，要不要一起收一收？",
          task: "接受收腰建议",
          options: [
            { text: "Good eye — yes, please take it in at the waist too. One inch sounds right.", ok: true,  tip: "Good eye 好眼力 + take it in 收腰" },
            { text: "Waist is fine. I grow into pants. Future belly.",                           ok: false, tip: "需要就改：Yes, please take it in at the waist" },
            { text: "Take in? Take where? Pants going somewhere?",                                ok: false, tip: "take it in = 收窄改小：One inch sounds right" },
          ],
          phrase: { en: "Take it in at the waist.", zh: "腰部收一下。", note: "take in 改小 / let out 放大——改衣两大动词" },
        },
        {
          npcLines: [
            "Hem plus waist — twenty-two dollars total, ready Thursday. The fitting appointment would be Wednesday afternoon, okay?",
            "So that's hem and waist, twenty-two dollars, done Thursday. Fitting on Wednesday afternoon — works for you?",
            "Hem and waist together: twenty-two dollars. Wednesday fitting, Thursday pickup. Sound like a plan?",
          ],
          npcZh: "改裤脚加收腰——一共 22 美元，周四好。周三下午过来试身可以吗？",
          task: "确认时间安排",
          options: [
            { text: "Wednesday fitting, Thursday pickup — that works perfectly. See you Wednesday!", ok: true,  tip: "复述时间线确认——professional 消费者" },
            { text: "Wednesday? Make Sunday. Weekend pants day.",                                   ok: false, tip: "按流程走：Wednesday fitting, Thursday pickup — see you then!" },
            { text: "Twenty-two too many numbers. Just do pants.",                                  ok: false, tip: "确认安排：Wednesday fitting, Thursday pickup!" },
          ],
          phrase: { en: "That works perfectly.", zh: "完全没问题。", note: "works 行得通；确认安排的高频回应" },
          adds: [{ emoji: "✂️", label: "Alterations", wordId: "dry-alteration" }],
        },
        {
          npcLines: [
            "Perfect! And hey — since you're becoming a regular: our loyalty card gives you every fifth alteration half off. Want one?",
            "See you Wednesday! Oh — one more thing: our loyalty card, fifth alteration is half price. Interested?",
            "Wednesday it is! By the way, you qualify for our loyalty card — every fifth alteration, fifty percent off. Want in?",
          ],
          npcZh: "完美！对了——你已经是常客了：会员卡第五次改衣半价。要办一张吗？",
          task: "办卡并道别",
          options: [
            { text: "A regular with perks — I'll take it! Thanks, see you Wednesday.", ok: true,  tip: "perks 会员福利——高频商业词汇" },
            { text: "Fifth time half off? First time free better. Change rule.",      ok: false, tip: "接受规则：I'll take it — see you Wednesday!" },
            { text: "Card wallet full. Card army too big. Decline politely.",         ok: false, tip: "划算就办：I'll take it!" },
          ],
          phrase: { en: "I'll take it!", zh: "我要了/办一张！", note: "爽快接受提议；regular 常客 + perks 福利" },
        },
      ],
    },
