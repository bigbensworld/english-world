    {
      id: "v2",
      title: "第 2 次光顾 · 疫苗与预防",
      titleEn: "Vaccines & Prevention",
      emoji: "💉",
      desc: "Max 该打疫苗了：狂犬加强针、驱虫、跳蚤预防——预防保健的全套英语。",
      reward: { en: "booster", zh: "Max 的疫苗本更新完毕，预防到位！💉" },
      steps: [
        {
          npcLines: [
            "Welcome back! Max's turn for vaccines today, right?",
            "Hi again! We've got boosters on the schedule for this handsome guy?",
            "Good to see you two! Vaccine day for Max, I believe?",
          ],
          npcZh: "欢迎回来！Max 今天是来打疫苗的吧？",
          task: "确认来意并问疫苗是否都齐全",
          options: [
            { text: "Yes! Is he due for any shots? I want to make sure he's up to date.", ok: true, tip: "be due for 到期该做 + up to date 最新状态——疫苗核对标准句" },
            { text: "Yes. Inject him with all vaccines. All of them.", ok: false, tip: "核对再打：Is he due for any shots?" },
            { text: "Shots? He fears nothing. Do his fears need shots?", ok: false, tip: "确认疫苗状态：make sure he's up to date" },
          ],
          phrase: { en: "Is he due for ___?", zh: "他是不是到时间该……了？", note: "due for = 到期该做（疫苗/体检/洗牙通用）" },
        },
        {
          npcLines: [
            "Let me pull up his record... He's due for the rabies booster — that one's required by law, by the way.",
            "Checking his chart... Rabies booster's due! And that one's not optional — it's the law.",
            "His file says... rabies booster time! Legally required, as always.",
          ],
          npcZh: "我调一下病历……他该打狂犬病加强针了——顺便说，这个是法律规定的。",
          task: "询问法律对疫苗的具体要求",
          options: [
            { text: "Required by law — good to know. How often does he need it?", ok: true, tip: "How often 频率必问；required by law 法律强制" },
            { text: "The law has opinions about my dog? Rude.",  ok: false, tip: "了解规定：How often does he need it?" },
            { text: "Rabies is a suggestion, surely.",           ok: false, tip: "狂犬疫苗是法律强制：required by law" },
          ],
          phrase: { en: "How often does he need it?", zh: "他需要多久打一次？", note: "How often 问频率；疫苗周期因种类而异" },
        },
        {
          npcLines: [
            "Every one to three years depending on the formula. Now, while he's here — is he current on deworming and flea prevention?",
            "One to three years, depends on the shot. Also — deworming and flea meds, is he up to date on those?",
            "Every one to three years. Quick check while we're at it: deworming and flea prevention — current?",
          ],
          npcZh: "一到三年一次，看具体药剂。趁他今天在——驱虫和跳蚤预防药也都用着吗？",
          task: "如实回答：驱虫做了，跳蚤药上个月用完了",
          options: [
            { text: "Deworming is done, but I ran out of his flea medication last month.", ok: true, tip: "ran out of 用完了——如实回答，方便医生补齐" },
            { text: "Yes to everything. All of it. Forever.",  ok: false, tip: "如实说明：I ran out of his flea medication" },
            { text: "Fleas? Max and I have an arrangement.",    ok: false, tip: "如实汇报：deworming yes, flea meds ran out" },
          ],
          phrase: { en: "I ran out of ___.", zh: "我的……用完了。", note: "run out of = 用完；报实情医生才能补上" },
        },
        {
          npcLines: [
            "Easy fix — we'll restock you today. One more thing: has he been scratching his ears or chewing his paws a lot?",
            "No worries, we'll send you home with more. Now — lots of ear scratching or paw chewing lately?",
            "We'll fix that right up! And how about this: been scratching his ears or biting his paws?",
          ],
          npcZh: "好办——今天给您补上。还有一件事：他最近经常挠耳朵或啃爪子吗？",
          task: "回答：偶尔挠耳朵，问是否正常",
          options: [
            { text: "He scratches his ears sometimes. Is that normal?", ok: true, tip: "Is that normal? 问正常与否——症状描述+求判断" },
            { text: "He never touches his ears. They are decorative.", ok: false, tip: "描述实情：He scratches his ears sometimes" },
            { text: "He chews everything. Including my sofa.",         ok: false, tip: "聚焦问到的症状：scratches his ears sometimes" },
          ],
          phrase: { en: "Is that normal?", zh: "这正常吗？", note: "描述现象后的求判断句；也可说 Should I be worried?" },
        },
        {
          npcLines: [
            "Occasional scratching is fine, but let's peek in those ears... A little wax buildup — nothing serious. I'll clean them while he's here.",
            "Let me see... Slight wax in the left ear, totally manageable. Ear cleaning, on the house with the visit!",
            "Checking... Just some wax. I'll give them a quick clean today — easy as that.",
          ],
          npcZh: "偶尔挠一下没事，不过我看看耳朵……有一点耳垢堆积——不严重。趁他在，我给清理一下。",
          task: "同意处理并询问在家护理建议",
          options: [
            { text: "That would be great. Anything I should do at home to keep his ears healthy?", ok: true, tip: "Anything I should do at home? 求居家护理建议——主动管理健康" },
            { text: "Clean them with my toothbrush?",  ok: false, tip: "问专业建议：Anything I should do at home?" },
            { text: "Ears clean themselves. Like cats.", ok: false, tip: "求护理建议：Anything I should do at home?" },
          ],
          phrase: { en: "Anything I should do at home?", zh: "我在家需要注意什么吗？", note: "就诊收尾万能问；医生/牙医/兽医都吃这套" },
        },
        {
          npcLines: [
            "Just a weekly check — sniff for anything odd, and dry his ears well after swims. Alright, Max is getting his shot now... And done! He didn't even flinch.",
            "Weekly sniff test, dry ears after swimming. Okay, little pinch coming... All done! What a brave boy.",
            "Check weekly, dry after swims. Here we go — one booster... Done! Didn't even blink, the legend.",
          ],
          npcZh: "每周检查一下——闻闻有没有异味，游泳后把耳朵擦干。好，现在打针……好了！他都没缩一下。",
          task: "安抚表扬 Max，确认后续安排",
          options: [
            { text: "Good boy, Max! So when should we come back for the next round?", ok: true, tip: "Good boy 表扬宠物 + 问下次时间——预约闭环" },
            { text: "Max, you have shamed our family name.",  ok: false, tip: "表扬勇敢的狗狗：Good boy! When should we come back?" },
            { text: "Next round? Of shots? Never again.",     ok: false, tip: "确认后续：When should we come back?" },
          ],
          phrase: { en: "When should we come back?", zh: "我们下次什么时候来？", note: "就诊收尾三问之一：下次时间/居家注意/怎么联系" },
        },
        {
          npcLines: [
            "See you in a year for his next checkup — unless anything comes up, of course. Flea meds and ear cleaner are at the front desk. Take care, you two!",
            "Annual visit next year, sooner if anything changes! His goodies are waiting up front. Bye, Max!",
            "One year from today — or any time you're worried! Meds at checkout. See you next year, big guy!",
          ],
          npcZh: "明年来做下一次体检——当然，有任何情况随时来。跳蚤药和耳部清洁剂在前台。你们俩保重！",
          task: "道谢告别",
          options: [
            { text: "Thank you so much — he's in great hands. Bye!", ok: true,  tip: "You're in great hands 夸医护+道别——疫苗轮毕业" },
            { text: "Farewell, needle person.",       ok: false, tip: "自然告别：Thank you so much, bye!" },
            { text: "Max says nothing. Max is stoic.", ok: false, tip: "替 Max 道别：Thank you, he's in great hands!" },
          ],
          phrase: { en: "He's in great hands.", zh: "有你照顾我很放心。", note: "in good/great hands = 被照顾得很好；夸奖医护的地道说法" },
        },
      ],
    },
