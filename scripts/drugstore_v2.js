    {
      id: "v2",
      title: "第 2 次光顾 · 药品柜台的规矩",
      titleEn: "Behind the Counter",
      emoji: "🗄️",
      desc: "有些药不在货架上，在柜台后面。学 over-the-counter 与柜台药的区别、看标签、问副作用。",
      reward: { en: "over-the-counter", zh: "你搞懂了药店柜台的门道！🔓" },
      steps: [
        {
          npcLines: [
            "Welcome back! Feeling better, I hope? What brings you in today?",
            "Hey, look who's back! All recovered from the cold? What can I do for you today?",
            "Welcome in! Survived the cold, I see? What are we hunting for today?",
          ],
          npcZh: "欢迎回来！感冒好点了吧？今天来买点什么？",
          task: "说明好多了，这次想买止痛药",
          options: [
            { text: "Much better, thanks! Today I need a painkiller for headaches.", ok: true,  tip: "Much better 回应关心 + painkiller 止痛药" },
            { text: "Cold is gone. New problem: head hurts. Painkiller.",          ok: false, tip: "先回应再说明：Much better — I need a painkiller for headaches" },
            { text: "I collect medicine now. Hobby.",                              ok: false, tip: "说明来意：I need a painkiller for headaches" },
          ],
          phrase: { en: "I need a painkiller for ___.", zh: "我需要治……的止痛药。", note: "for + 症状；买药万能句式" },
        },
        {
          npcLines: [
            "Good to hear! For headaches, the stronger stuff is kept behind the counter — I can get it for you. The milder ones are on shelf four.",
            "Glad the cold cleared up! Headache-wise: the stronger painkillers live behind the counter — I'll fetch them. Milder options are on shelf four.",
            "Excellent! Now, for headaches — heavier-duty painkillers are behind the counter, I can grab those. The gentle stuff is on shelf four if you prefer.",
          ],
          npcZh: "那就好！治头痛的话，药效强一点的在柜台后面——我可以帮你拿。温和一些的在 4 号货架。",
          task: "询问柜台后面的药和普通货架药有什么区别",
          options: [
            { text: "What's the difference between the counter ones and the shelf ones?", ok: true,  tip: "What's the difference between A and B 万能比较句" },
            { text: "Counter drug strong? Shelf drug weak? Which win?",                  ok: false, tip: "标准比较句：What's the difference between the two?" },
            { text: "Behind counter is secret drug? Mysterious.",                        ok: false, tip: "直接问区别：What's the difference?" },
          ],
          phrase: { en: "What's the difference between A and B?", zh: "A 和 B 有什么区别？", note: "购物决策第一句；compare 的口语版" },
        },
        {
          npcLines: [
            "The counter ones have a higher dose, so I just check your ID and note the sale. The shelf ones are over-the-counter — anyone can buy those freely.",
            "The behind-the-counter versions have higher dosages — I check ID and log the sale, that's all. The shelf ones are true over-the-counter, no questions asked.",
            "Dosage is the big one — counter drugs are stronger, so there's a quick ID check and a log entry. OTC shelf medicines? Grab and go, totally free sale.",
          ],
          npcZh: "柜台的药剂量更高，所以我需要看下你的证件并登记销售。货架上的属于非处方药——任何人都能自由购买。",
          task: "询问能不能看看药的标签（副作用）",
          options: [
            { text: "I see. Could I look at the label first? I want to check the side effects.", ok: true,  tip: "看标签查副作用——买药应有的谨慎" },
            { text: "Label boring. Give strongest. Head must die.",                             ok: false, tip: "看副作用很重要：Could I look at the label first?" },
            { text: "Side effects? I fear nothing. I am iron.",                                 ok: false, tip: "谨慎查看：I want to check the side effects" },
          ],
          phrase: { en: "Could I look at the label?", zh: "我能看下标签吗？", note: "label 标签；副作用/成分/剂量全在上面" },
        },
        {
          npcLines: [
            "Of course — here. The main side effects are upset stomach and mild drowsiness. Take it with food to protect your stomach.",
            "Absolutely, take a look. Main side effects: stomach upset and slight drowsiness. Have it with food — your stomach will thank you.",
            "Here you go! Side effects to know: an upset stomach, maybe a bit sleepy. Food helps with the stomach part.",
          ],
          npcZh: "当然——给你。主要副作用是胃部不适和轻微犯困。随餐服用可以保护胃。",
          task: "确认「与食物同服」的细节",
          options: [
            { text: "So I should take it with food to avoid the stomach problem — understood.", ok: true,  tip: "avoid the stomach problem 避免胃部不适，复述确认" },
            { text: "Food with pill? Sandwich enough? Whole cake?",                            ok: false, tip: "正常随餐即可：I should take it with food — understood" },
            { text: "Stomach is strong stomach. No food needed.",                              ok: false, tip: "按说明服用：Take it with food to protect my stomach" },
          ],
          phrase: { en: "Take it with food.", zh: "随餐服用。", note: "药品说明书高频指令；protect your stomach 护胃" },
        },
        {
          npcLines: [
            "Exactly! One more thing — are you taking any other medications? Some drugs interact with each other.",
            "That's it! Standard check: any other medications right now? Mixing drugs can cause interactions.",
            "You got it! Last question — currently on any other medicines? I ask because of possible interactions.",
          ],
          npcZh: "完全正确！还有一件事——你现在在服用其他药物吗？有些药会相互作用。",
          task: "说明正在吃维生素，询问是否有影响",
          options: [
            { text: "I take daily vitamins. Will they interact with this painkiller?", ok: true,  tip: "interact with 与……相互作用，专业又实用" },
            { text: "Vitamins only. Vitamin is not real medicine. Ignore.",           ok: false, tip: "如实说明并询问：Will they interact with this?" },
            { text: "I eat many mystery pills. Names unknown. Colors pretty.",        ok: false, tip: "说清具体药物：I take daily vitamins — will they interact?" },
          ],
          phrase: { en: "Will it interact with ___?", zh: "它会和……相互作用吗？", note: "药物相互作用 = interaction；同时服药必问" },
        },
        {
          npcLines: [
            "Vitamins are fine — no interaction there. You're all set! That'll be four twenty-nine.",
            "Daily vitamins? No interaction at all, you're safe. Alright — four twenty-nine, please!",
            "Vitamins and this one get along fine! Total is four twenty-nine. Good to go?",
          ],
          npcZh: "维生素没问题——不会相互作用。都办好了！一共 4.29。",
          task: "付款，对这次专业服务表达感谢",
          options: [
            { text: "Perfect. Thanks for being so thorough — this is exactly why I come to this drugstore.", ok: true,  tip: "thorough 周到细致 + 说明回头理由" },
            { text: "Four twenty-nine? Round to zero. Friendship price.",                                    ok: false, tip: "正常付款：Thanks for being so thorough!" },
            { text: "You ask too many question. Next time lie to you.",                                      ok: false, tip: "这些提问是专业负责：Thanks for being so thorough!" },
          ],
          phrase: { en: "Thanks for being so thorough.", zh: "谢谢你这么周到细致。", note: "夸服务专业的精准用词；thorough = 全面仔细" },
        },
      ],
    },
