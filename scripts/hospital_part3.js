// 医院/药房 第 3 轮：复诊复查（7 步）
{
  id: "v3",
  title: "第 3 次光顾 · 复诊复查",
  titleEn: "Follow-up Visit",
  emoji: "🔁",
  desc: "三天后复诊。汇报恢复情况、量血压、听医嘱——把\"病好了\"用英文说清楚。",
  reward: { en: "recovered", zh: "你完全康复，还学会了英文复诊！🎉" },
  steps: [
    {
      npcLines: [
        "Good morning! Welcome back. How are you feeling today?",
        "Hello again! Good to see you — how are you doing now?",
        "Morning! You're back for the follow-up, right? How do you feel?",
      ],
      npcZh: "早上好！欢迎回来。今天感觉怎么样？",
      task: "说明来意：复诊",
      options: [
        { text: "Much better, thanks! I'm here for my follow-up.", ok: true,  tip: "follow-up = 复诊/后续跟进，看病常用词" },
        { text: "I come again check body.",                       ok: false, tip: "复诊说 follow-up 或 check-up" },
        { text: "Back again doctor look me.",                     ok: false, tip: "更自然：I'm here for my follow-up" },
      ],
      phrase: { en: "I'm here for my follow-up.", zh: "我来复诊", note: "follow-up 复诊；check-up 体检，看病高频词" },
    },
    {
      npcLines: [
        "Great to hear! How's the fever? And the sore throat?",
        "Glad you're better! Is the fever gone? What about the throat?",
        "Nice! So — no more fever? How does your throat feel?",
      ],
      npcZh: "很高兴听你这么说！烧退了吗？喉咙还痛吗？",
      task: "汇报恢复情况：不烧了，喉咙还有点痛",
      options: [
        { text: "The fever is gone, but my throat still hurts a little.", ok: true,  tip: "The fever is gone + still hurts a little——汇报\"好转但没痊愈\"的标准说法" },
        { text: "Hot is finish throat still pain small.",                ok: false, tip: "说 The fever is gone" },
        { text: "No more fire in body, throat a bit ouch.",              ok: false, tip: "更自然：The fever is gone, but my throat still hurts a little." },
      ],
      phrase: { en: "The ___ is gone, but ___ still hurts a little.", zh: "……好了，但……还有点痛", note: "汇报病情变化的对比句型" },
    },
    {
      npcLines: [
        "Good progress! Let me check your throat... Say \"aah\" for me.",
        "You're getting there! Open up and say \"aah\", let me take a look.",
        "Much better than before! Now say \"aah\" so I can see your throat.",
      ],
      npcZh: "恢复得不错！我看看喉咙……说\"啊——\"",
      task: "配合检查",
      options: [
        { text: "Aah... How does it look, doctor?", ok: true,  tip: "配合检查后主动询问结果，How does it look 自然得体" },
        { text: "Aaaah you look good my mouth?",    ok: false, tip: "说 How does it look, doctor?" },
        { text: "Aah mouth is okay or not?",        ok: false, tip: "更自然：How does it look, doctor?" },
      ],
      phrase: { en: "How does it look?", zh: "看起来怎么样？", note: "请医生判断结果的问句" },
    },
    {
      npcLines: [
        "Almost healed! Let's also check your blood pressure. Please roll up your sleeve.",
        "Nearly there! Now let's do your blood pressure — arm out, please.",
        "Looking good! Just a quick blood pressure check. Sleeve up, please.",
      ],
      npcZh: "快好了！再量个血压，请把袖子卷起来。",
      task: "配合量血压并询问结果",
      options: [
        { text: "Sure. Is my blood pressure normal?", ok: true,  tip: "Is my ___ normal——询问指标是否正常的标准句" },
        { text: "Okay my blood is normal yes?",       ok: false, tip: "血压说 blood pressure，问法 Is it normal?" },
        { text: "Arm ready what number good?",        ok: false, tip: "更自然：Is my blood pressure normal?" },
      ],
      phrase: { en: "Is my ___ normal?", zh: "我的……正常吗？", note: "问体检指标万能句：blood pressure / heart rate / temperature" },
      adds: [ { emoji: "🩸", label: "BP Normal", wordId: "bloodpressure" } ],
    },
    {
      npcLines: [
        "One-twenty over eighty — perfectly normal! You're almost fully recovered.",
        "120 over 80, textbook perfect! You've nearly made a full recovery.",
        "Great numbers — 120 over 80. Just about fully recovered!",
      ],
      npcZh: "120/80，非常正常！你基本康复了。",
      task: "询问是否需要继续吃药",
      options: [
        { text: "That's great! Should I keep taking the medicine?", ok: true,  tip: "keep taking...——\"继续吃（药）\"的固定搭配" },
        { text: "I continue eat the pill more days?",              ok: false, tip: "吃药用 take，说 keep taking the medicine" },
        { text: "Medicine still need or finish already?",          ok: false, tip: "更自然：Should I keep taking the medicine?" },
      ],
      phrase: { en: "Should I keep taking the medicine?", zh: "我要继续吃药吗？", note: "keep + doing = 继续做某事" },
    },
    {
      npcLines: [
        "Finish this last pack, then you can stop. Drink warm water and get plenty of rest this week.",
        "Just finish the current pack and you're done. Warm drinks and good sleep this week, okay?",
        "One last pack and then stop. Keep it easy this week — warm water, early nights.",
      ],
      npcZh: "把最后一盒吃完就可以停了。这周多喝温水、好好休息。",
      task: "确认医嘱并表示感谢",
      options: [
        { text: "I will. Thank you so much for everything, doctor!", ok: true,  tip: "I will 简短承诺会照做，感谢收尾" },
        { text: "Okay bye doctor see you never.",                   ok: false, tip: "感谢更真诚些：Thank you so much for everything" },
        { text: "Yes I do it maybe probably.",                       ok: false, tip: "更自然：I will. Thank you so much!" },
      ],
      phrase: { en: "I will. Thank you for everything.", zh: "我会的。谢谢您做的一切", note: "I will 承诺 + 致谢，就诊完美收尾" },
      adds: [ { emoji: "🎉", label: "Recovered", wordId: "recovered" } ],
    },
    {
      npcLines: [
        "You're very welcome! Take care of yourself, and stay healthy!",
        "My pleasure! Look after yourself — hope to never see you in here again!",
        "Anytime! Take care, and here's to good health!",
      ],
      npcZh: "不客气！照顾好自己，保持健康！",
      task: "礼貌告别",
      options: [
        { text: "Thank you! Have a great day. Goodbye!", ok: true,  tip: "Have a great day——告别万能句，任何场合都适用" },
        { text: "Bye bye hospital good day you too.",    ok: false, tip: "说 Have a great day. Goodbye!" },
        { text: "Goodbye doctor person thanks bye.",     ok: false, tip: "更自然：Thank you! Have a great day. Goodbye!" },
      ],
      phrase: { en: "Have a great day!", zh: "祝您愉快！", note: "告别收尾万能句，正式与随意场合通用" },
    },
  ],
},
],
},
];
