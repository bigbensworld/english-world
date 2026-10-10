    {
      id: "v5",
      title: "第 5 次光顾 · 慢性病与处方粮",
      titleEn: "Chronic Care & Prescription Food",
      emoji: "💊",
      desc: "Max 体检出血糖偏高：慢性病管理、处方粮、长期用药——进阶医疗英语（B1 难度）。",
      reward: { en: "dose", zh: "你掌握了慢性病长期管理的英语表达！💊" },
      steps: [
        {
          npcLines: [
            "So, Max's bloodwork came back. Overall he's healthy, but his blood sugar is running a little high.",
            "Good news and watch-out news: Max is generally healthy, but we're seeing elevated blood sugar.",
            "Let's talk results. The big picture is good — one flag, though: his blood sugar is slightly high.",
          ],
          npcZh: "Max 的血检结果出来了。总体健康，但血糖偏高。",
          task: "询问严重程度和下一步",
          options: [
            { text: "How high are we talking? What's the next step?", ok: true, tip: "How high are we talking? 到底多高（口语）+ next step 下一步——医患沟通" },
            { text: "Blood sugar? He only drinks water. Plain water!",  ok: false, tip: "问严重程度：How high? What's the next step?" },
            { text: "Is he dying? Tell me everything at once.",        ok: false, tip: "理性问询：How high, and what's the next step?" },
          ],
          phrase: { en: "How ___ are we talking?", zh: "到底有多……？", note: "…are we talking 口语强调程度；先量化再决策" },
        },
        {
          npcLines: [
            "It's in the pre-diabetic range — not diabetes yet. Caught early like this, it's often manageable with diet alone.",
            "Pre-diabetic zone — not full diabetes. The early catch means diet could fix this without medication.",
            "Pre-diabetes territory. Great that we caught it — a strict diet often turns this around, no meds needed.",
          ],
          npcZh: "处于糖尿病前期——还不是糖尿病。这么早发现，通常仅靠饮食就能控制。",
          task: "询问具体饮食方案",
          options: [
            { text: "That's a relief. What changes should we make to his diet?", ok: true, tip: "What changes should we make? 具体怎么改——慢病管理第一步" },
            { text: "Diet? He will hunger strike for justice.", ok: false, tip: "问方案：What changes should we make to his diet?" },
            { text: "Can I just describe vegetables to him?",   ok: false, tip: "务实提问：What changes to his diet?" },
          ],
          phrase: { en: "What changes should we make?", zh: "我们需要做哪些改变？", note: "should 表征求专业意见；make changes 做调整" },
        },
        {
          npcLines: [
            "High-protein, low-carb, and portion control. I'd start him on a prescription diet — it's formulated exactly for this. It costs more than regular food, but it works.",
            "The formula: high protein, low carb, measured portions. There's a prescription food made precisely for this — pricier, but effective.",
            "Prescription diet is the move: high protein, low carb, strict portions. Costs more than kibble, but that's the trade-off for results.",
          ],
          npcZh: "高蛋白、低碳水、控制份量。我建议他吃处方粮——就是为这种情况配制的。比普通粮贵，但有效。",
          task: "确认处方粮的获取方式",
          options: [
            { text: "Prescription food — do I need a prescription every time, or can I reorder online?", ok: true, tip: "reorder 再订购 + online 线上——长期用药/粮的实操问题" },
            { text: "Prescription food. Like food with a diploma.",  ok: false, tip: "实操提问：Can I reorder it online?" },
            { text: "I will write the prescription myself. I have a pen.", ok: false, tip: "问流程：Do I need a prescription every time?" },
          ],
          phrase: { en: "Do I need a prescription for ___?", zh: "买……需要处方吗？", note: "prescription 处方；宠物处方粮确实需要兽医授权" },
        },
        {
          npcLines: [
            "The prescription stays on file with us — you can reorder from our online store anytime. Now, in case diet alone isn't enough, there's a medication option too, but let's try food first.",
            "We keep it on file — reorder online as much as you need. And if the diet doesn't do the trick, there's medicine as plan B. But food first, always.",
            "One-time authorization, unlimited refills through our site. If three months of food doesn't move the needle, we discuss medication. Food first, though!",
          ],
          npcZh: "处方留在我们这存档——您随时可以在我们的网店复购。万一单靠饮食不够，还有药物方案，但咱们先试饮食。",
          task: "同意先饮食干预，问复查频率",
          options: [
            { text: "Food first sounds right. When should we recheck his blood sugar?", ok: true, tip: "recheck 复查——慢病管理需要跟踪周期" },
            { text: "Medication later, food now, dessert never. When do we recheck?", ok: false, tip: "标准问法：When should we recheck?" },
            { text: "Recheck? I have trust issues with needles.",  ok: false, tip: "问复查时间：When should we recheck his blood sugar?" },
          ],
          phrase: { en: "When should we recheck?", zh: "什么时候复查？", note: "re- 前缀 = 重新；慢病管理三件套：饮食/用药/复查" },
        },
        {
          npcLines: [
            "Three months, then we retest. If the numbers improve, we stay the course. One more thing — treats count toward carbs, by the way. That's usually the hidden culprit!",
            "Three months and we test again. Numbers better? Keep going. Oh — and those treats? Pure carbs. Usually the secret saboteur!",
            "Retest in twelve weeks. Improvement means stay the course. And I'm obligated to say: treats are carbs. The couch-side snack tax is real!",
          ],
          npcZh: "三个月后复查。如果数值改善，就继续当前方案。另外——零食也算碳水。那通常才是隐藏的元凶！",
          task: "苦笑承认零食问题，问替代方案",
          options: [
            { text: "Guilty as charged — he gets treats daily. What can I use instead?", ok: true, tip: "Guilty as charged 我认罪（幽默）+ What can I use instead? 替代方案" },
            { text: "Treats are his only joy. I refuse.",  ok: false, tip: "问替代品：What can I use instead?" },
            { text: "I will eat the treats myself. Problem solved.", ok: false, tip: "求替代方案：What can I use instead?" },
          ],
          phrase: { en: "What can I use instead?", zh: "我可以用什么来替代？", note: "instead = 代替；换方案不改目标的务实问法" },
        },
        {
          npcLines: [
            "Baby carrots, green beans, small apple pieces — dogs love them and they're low-carb. Max won't even know the difference. Well... he'll know. But he'll forgive you!",
            "Carrots, green beans, apple bits — the diabetic-friendly snack squad! He'll notice the switch. He will not approve. But he'll adjust!",
            "The holy trinity: baby carrots, green beans, apple chunks. Low-carb and dog-approved-ish! He'll sulk for a week, then come around.",
          ],
          npcZh: "小胡萝卜、西兰花豆、苹果小块——狗狗爱吃而且低碳水。Max 会发现区别的……不过他会原谅您的！",
          task: "总结方案并道谢告别",
          options: [
            { text: "Carrots and green beans it is — a small price for more healthy years together. Thank you, Doc!", ok: true, tip: "a small price for... 用小代价换…… + Thank you, Doc——慢病管理毕业" },
            { text: "He will not forgive me. I accept this.",  ok: false, tip: "总结+感谢：Carrots it is. Thank you, Doc!" },
            { text: "Years together? He is immortal. We agreed.", ok: false, tip: "理性收尾：A small price for more healthy years, thanks!" },
          ],
          phrase: { en: "A small price to pay for ___.", zh: "换取……这点代价不算什么。", note: "a small price = 微小代价；表达价值排序的金句" },
        },
      ],
    },
  ],
},
