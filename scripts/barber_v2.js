    {
      id: "v2",
      title: "第 2 次光顾 · 染发与护理",
      titleEn: "Color & Treatment",
      emoji: "🎨",
      desc: "想换发色！挑染还是全染？漂不漂？发质干枯怎么办？美发进阶英语一次学会。",
      reward: { en: "dye my hair", zh: "你解锁了染发护理英语，换发色不踩坑！🎨" },
      steps: [
        {
          npcLines: [
            "Welcome back! Ooh, are we doing something adventurous today?",
            "Back again! You have that look — the 'I want a change' look. Am I right?",
            "Hey, welcome back! Something tells me you're ready for something new!",
          ],
          npcZh: "欢迎回来！哦，今天要来点大胆的尝试吗？",
          task: "说明想染发，但还没定颜色",
          options: [
            { text: "Yes! I'm thinking about dyeing my hair, but I'm not sure about the color. What do you recommend?", ok: true, tip: "dye my hair 染发 + What do you recommend? 让专业的人给建议" },
            { text: "Color! Hair! New! Surprise me completely!",  ok: false, tip: "先沟通方向再动手：I'm thinking about dyeing my hair" },
            { text: "Dye everything rainbow colors.",            ok: false, tip: "大改动前先咨询：What do you recommend?" },
          ],
          phrase: { en: "I'm thinking about dyeing my hair.", zh: "我在考虑染头发。", note: "dye = 染；进行时表\"考虑中\"，留商量空间" },
        },
        {
          npcLines: [
            "With your skin tone, a warm brown would look amazing. Full color, or just some highlights?",
            "Ooh, warm brown would suit you perfectly! Question is — all over, or highlights?",
            "I'd say warm brown for you! Now, full dye or just a few highlights?",
          ],
          npcZh: "以您的肤色，暖棕色会非常好看。全染，还是只做挑染？",
          task: "询问两者区别后再决定",
          options: [
            { text: "What's the difference in maintenance? I've never colored my hair before.", ok: true, tip: "maintenance 保养/维护成本 + never done it before 让对方解释基础概念" },
            { text: "Which one is less money? Money decides all.", ok: false, tip: "问维护成本更专业：What's the difference in maintenance?" },
            { text: "Highlight like Instagram. Do Instagram.",  ok: false, tip: "说清自身情况：I've never colored my hair before" },
          ],
          phrase: { en: "What's the difference?", zh: "两者有什么区别？", note: "二选一纠结时的万能提问" },
        },
        {
          npcLines: [
            "Highlights grow out more naturally — you only need touch-ups every three months. Full color shows roots in four weeks!",
            "Highlights are low-maintenance — roots barely show. Full color? You'll see roots in a month!",
            "Highlights are easier to keep up — no obvious roots. Full dye needs touch-ups every few weeks!",
          ],
          npcZh: "挑染长出来更自然——三个月补一次就行。全染的话，四个星期就见发根了！",
          task: "理解后选择挑染，并提出加护理",
          options: [
            { text: "Highlights it is! My hair is a bit dry though — could I add a deep treatment?", ok: true,  tip: "My hair is dry 头发干 + deep treatment 深度护理" },
            { text: "Roots are natural, roots are beautiful. No treatment, roots only.", ok: false, tip: "发干可加护理：Could I add a deep treatment?" },
            { text: "Four weeks?! Cancel all plans forever!",  ok: false, tip: "选挑染+护理：Highlights it is! Could I add a deep treatment?" },
          ],
          phrase: { en: "My hair is a bit dry.", zh: "我头发有点干。", note: "描述发质基础句：dry 干 / oily 油 / frizzy 毛躁" },
        },
        {
          npcLines: [
            "Smart choice — treatment first, then color. Speaking of which: any chance you'd want to go lighter? That needs bleach.",
            "Good call! We'll treat, then highlight. Say — want to go lighter than your natural color? That means bleach.",
            "Treatment and highlights, perfect combo! Quick question — lighter than natural? That requires bleaching.",
          ],
          npcZh: "聪明——先护理再上色。对了，您想染得更浅吗？那需要漂发。",
          task: "担心伤发，询问漂发伤害",
          options: [
            { text: "Hmm, doesn't bleach damage your hair? I'd rather keep it healthy.", ok: true,  tip: "bleach 漂发 + damage 伤害 + would rather 更愿意（健康优先）" },
            { text: "Bleach? Like cleaning bleach? On head?!",  ok: false, tip: "漂发是常规美发项目：Doesn't bleach damage your hair?" },
            { text: "Damage whatever, beauty is pain.",         ok: false, tip: "顾虑正当且该表达：I'd rather keep it healthy" },
          ],
          phrase: { en: "Doesn't ___ damage your hair?", zh: "……不会伤头发吗？", note: "提出顾虑的标准句式；发型师会据此调整方案" },
        },
        {
          npcLines: [
            "Totally — bleach is rough on hair. We'll stay close to your natural shade, just a touch lighter. No bleach needed!",
            "You're right to ask! Let's skip the bleach — a shade close to natural, slightly brighter. Healthy and pretty!",
            "Smart customer! No bleach today — just lift it a little with gentle color. Your hair will thank you!",
          ],
          npcZh: "完全正确——漂发很伤头发。我们就用接近您自然发色的色号，只提亮一点。不用漂！",
          task: "同意方案，询问日常护理建议",
          options: [
            { text: "Perfect, let's do that. Any tips for taking care of colored hair at home?", ok: true,  tip: "taking care of colored hair 染后护理 + Any tips? 求建议" },
            { text: "Yes. Do everything now. Talking overrated.", ok: false, tip: "问护理建议：Any tips for taking care of colored hair?" },
            { text: "Home tips? I never wash hair anyway.",  ok: false, tip: "染后护理保色关键：Any tips for colored hair at home?" },
          ],
          phrase: { en: "Any tips for ___?", zh: "关于……有什么建议吗？", note: "求实用建议万能句，哪儿都能用" },
        },
        {
          npcLines: [
            "Wash with cool water, use color-safe shampoo, and come back in three months for a touch-up. Ready when you are!",
            "Cool water, purple shampoo, less heat — that's the secret! See you in three months!",
            "Three rules: cool water, color-safe shampoo, easy on the heat. Let's get you started!",
          ],
          npcZh: "用凉水洗、用固色洗发水、少加热——三个月后回来补染。随时开始！",
          task: "复述确认护理要点，避免理解偏差",
          options: [
            { text: "Got it — cool water, color-safe shampoo, and less heat. Let's start!", ok: true,  tip: "复述确认 = 把听到的信息用自己的话说一遍，理解零偏差" },
            { text: "Cool water. Got. Other things. Forgot.",   ok: false, tip: "复述全部要点确认：Cool water, color-safe shampoo, less heat" },
            { text: "Yes yes whatever you say, begin.",         ok: false, tip: "护理要点值得记牢：复述一遍确认" },
          ],
          phrase: { en: "Got it — ___. Let's start!", zh: "明白了——……。开始吧！", note: "复述确认（active listening）：把要点复述一遍再行动" },
        },
      ],
    },
