// 医院 第 4 轮：急诊与保险（8 步）
{
  id: "v4",
  title: "第 4 次光顾 · 急诊与保险",
  titleEn: "Emergency & Insurance",
  emoji: "🚨",
  desc: "深夜发烧必须看医生！没预约直接去 clinic 行不行？copay 是什么？保险怎么用？搞定美国看病最头疼的一环。",
  reward: { en: "copay", zh: "你搞定了没预约看病 + 保险支付，美国就医最难的一关！🚨" },
  steps: [
    {
      npcLines: [
        "Good evening, this is City Care Clinic. How can I help you?",
        "Evening, City Care Clinic — what's going on?",
        "Hi, City Care Clinic. How may I help you tonight?",
      ],
      npcZh: "晚上好，这里是 City Care 诊所。有什么可以帮您？",
      task: "没预约，问今晚能否直接看病",
      options: [
        { text: "Hi, I don't have an appointment. Is it possible to see a doctor tonight?", ok: true,  tip: "walk-in = 无预约就诊；Is it possible to...? 礼貌请求" },
        { text: "I sick very bad come now see doctor immediately.",                       ok: false, tip: "更清楚：I don't have an appointment. Is it possible tonight?" },
        { text: "Appointment I have none. Doctor where?",                                 ok: false, tip: "说 Is it possible to see a doctor tonight?" },
      ],
      phrase: { en: "Is it possible to see a doctor without an appointment?", zh: "没预约能看病吗？", note: "walk-in clinic = 免预约诊所，急诊轻症首选" },
    },
    {
      npcLines: [
        "Yes, we accept walk-ins until 9 p.m. What brings you in tonight?",
        "You're in luck — walk-ins welcome till 9! What seems to be the problem?",
        "We do take walk-ins until nine. What's troubling you tonight?",
      ],
      npcZh: "可以的，晚上 9 点前都接受无预约就诊。您今晚怎么了？",
      task: "描述症状：发烧 38.5 度，喉咙很痛",
      options: [
        { text: "I have a fever of 38.5 degrees and a really sore throat.", ok: true,  tip: "a fever of + 度数；症状 + 程度，一句话说清" },
        { text: "Body very hot and throat pain much.",                     ok: false, tip: "说 I have a fever of 38.5 degrees" },
        { text: "I am sick whole body bad feeling.",                        ok: false, tip: "具体描述：a fever and a really sore throat" },
      ],
      phrase: { en: "I have a fever of ___ degrees.", zh: "我发烧……度", note: "报体温标准句；美国用华氏，38.5°C ≈ 101°F" },
    },
    {
      npcLines: [
        "I'm sorry to hear that. Do you have your insurance card with you?",
        "That sounds rough! Did you bring your insurance card?",
        "Oh no! Okay — do you have insurance tonight?",
      ],
      npcZh: "很抱歉听到这个。您带保险卡了吗？",
      task: "出示保险卡并问是否可用",
      options: [
        { text: "Yes, here's my insurance card. Do you accept this plan?", ok: true,  tip: "Do you accept this plan? 问诊所是否接受你的保险计划" },
        { text: "Card here take it is good card yes?",                    ok: false, tip: "说 Do you accept this insurance plan?" },
        { text: "Insurance I have maybe works here maybe not.",            ok: false, tip: "直接出示并询问：Do you accept this plan?" },
      ],
      phrase: { en: "Do you accept my insurance?", zh: "你们接受我的保险吗？", note: "就诊前必问；out-of-network = 不在保险网络内，费用高" },
      adds: [{ emoji: "🪪", label: "Insurance ✓", wordId: "insurance" }],
    },
    {
      npcLines: [
        "Yes, we're in-network with your plan. There'll be a $30 copay for the visit today.",
        "Good news — we take your plan! Just a $30 copay for today's visit.",
        "You're covered! There's a $30 copay for tonight, though.",
      ],
      npcZh: "接受的，我们在您的保险网络内。今天就诊有 30 美元的自付额。",
      task: "理解 copay，付款",
      options: [
        { text: "No problem. Here's $30. Can I pay by card?", ok: true,  tip: "copay = 每次就诊的固定自付额，保险覆盖其余部分" },
        { text: "Copay word meaning what is this?",           ok: false, tip: "copay 是自付额，就诊时直接支付即可" },
        { text: "Why extra money? Insurance should pay all.",  ok: false, tip: "copay 是保险常规设计：Here's $30" },
      ],
      phrase: { en: "copay", zh: "自付额", note: "保险术语三件套：copay 自付额 / deductible 免赔额 / premium 保费" },
      adds: [{ emoji: "💵", label: "Copay $30", badge: true }],
    },
    {
      npcLines: [
        "Card works great, thank you. Please have a seat — the wait is about twenty minutes.",
        "All paid up! Take a seat, doctor will see you in about twenty minutes.",
        "Got it, thanks! Have a seat — roughly a twenty-minute wait tonight.",
      ],
      npcZh: "刷卡没问题，谢谢。请坐——大约等二十分钟。",
      task: "等待时询问是否能先吃退烧药",
      options: [
        { text: "While I wait, is it okay to take ibuprofen for the fever?", ok: true,  tip: "is it okay to...? 请求许可；用药前确认是好习惯" },
        { text: "I have pill in bag eat now okay?",                        ok: false, tip: "说 Is it okay to take ibuprofen?" },
        { text: "Fever killing me, medicine time now yes?",                 ok: false, tip: "先问后吃：Is it okay to take ibuprofen?" },
      ],
      phrase: { en: "Is it okay to take ___?", zh: "可以服用……吗？", note: "用药询问模板；ibuprofen 布洛芬，acetaminophen 对乙酰氨基酚" },
    },
    {
      npcLines: [
        "Good question — a nurse will confirm with the doctor. But typically, yes, ibuprofen is fine for your symptoms.",
        "Smart to ask! The nurse will double-check with the doctor, but ibuprofen should be safe for you.",
        "Great instinct to ask! We'll confirm with the doctor, but usually ibuprofen is fine.",
      ],
      npcZh: "问得好——护士会跟医生确认。不过一般而言，布洛芬对您的症状是安全的。",
      task: "表示感谢，配合等待",
      options: [
        { text: "Thank you. I'll wait for the nurse to confirm before taking it.", ok: true,  tip: "before taking it 先确认再用药——安全意识满分" },
        { text: "Okay I eat pill right now immediately.",                       ok: false, tip: "等护士确认：I'll wait for the nurse to confirm" },
        { text: "No need confirm I know my body best.",                          ok: false, tip: "专业确认更安全：I'll wait for the nurse to confirm" },
      ],
      phrase: { en: "I'll wait for confirmation.", zh: "我会等确认后再行动", note: "谨慎负责的表达，医疗场景尤其加分" },
    },
    {
      npcLines: [
        "The nurse will call your name shortly. Do you need anything else right now?",
        "They'll call you soon! Anything else you need in the meantime?",
        "You're up next-ish! Anything else before the doctor sees you?",
      ],
      npcZh: "护士马上会叫您的名字。现在还有其他需要吗？",
      task: "问药费是否也在保险内",
      options: [
        { text: "Yes — if the doctor prescribes medicine, will my insurance cover it?", ok: true,  tip: "cover 承保；处方药费用提前问，拿药不踩坑" },
        { text: "Medicine from doctor free or must pay?",                            ok: false, tip: "说 Will my insurance cover it?" },
        { text: "Drug price how much cost money expensive?",                          ok: false, tip: "保险语境：Will my insurance cover it?" },
      ],
      phrase: { en: "Will my insurance cover it?", zh: "我的保险会覆盖吗？", note: "cover 承保；药费/检查费/治疗费都可以这样问" },
    },
    {
      npcLines: [
        "Most prescriptions are covered with a small copay, usually $5 to $15. The doctor will go over everything with you. Take care!",
        "Typically yes — prescriptions run a $5–$15 copay. The doctor will explain all the details. Feel better!",
        "Usually, yes! Small copay on meds, five to fifteen bucks. Doctor's got all the details. Hope you feel better soon!",
      ],
      npcZh: "大部分处方药都有小额自付，一般 5 到 15 美元。医生会跟您详细说明。保重！",
      task: "总结今天学到的保险知识",
      options: [
        { text: "Got it: walk-in clinic, copay for visits, small copay for medicine. Thank you so much!", ok: true,  tip: "三项总结 = 闭环学习；Got it: + 列点复述" },
        { text: "Too many insurance words confusing English hard.",                                    ok: false, tip: "复述要点巩固：copay for visits, small copay for medicine" },
        { text: "Okay thanks. America healthcare very expensive bye.",                                  ok: false, tip: "总结成果：Got it: walk-in clinic, copay..." },
      ],
      phrase: { en: "The doctor will go over everything with you.", zh: "医生会跟你详细说明", note: "go over = 详细讲解；听懂这句就放心等叫号" },
    },
  ],
},
