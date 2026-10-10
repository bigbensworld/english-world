// 医院 第 5 轮：疫苗与体检（8 步）
{
  id: "v5",
  title: "第 5 次光顾 · 疫苗与体检",
  titleEn: "Shots & Check-up",
  emoji: "💉",
  desc: "开学要打流感疫苗？公司要求年度体检？学会预约疫苗、看懂体检项目、听懂医生的健康建议！",
  reward: { en: "flu shot", zh: "你完成了疫苗 + 体检双任务，健康管理英文全掌握！💉" },
  steps: [
    {
      npcLines: [
        "Good morning! Welcome to City Care Clinic. How can I help you?",
        "Morning! City Care Clinic — what can I do for you?",
        "Hi there! What brings you in today?",
      ],
      npcZh: "早上好！欢迎来到 City Care 诊所。有什么可以帮您？",
      task: "预约流感疫苗",
      options: [
        { text: "Hi, I'd like to make an appointment for a flu shot, please.", ok: true,  tip: "flu shot 流感疫苗；make an appointment for + 项目" },
        { text: "I want flu medicine injection thing.",                      ok: false, tip: "疫苗专业说法：a flu shot" },
        { text: "Vaccine for sick season please give me.",                    ok: false, tip: "说 I'd like to make an appointment for a flu shot" },
      ],
      phrase: { en: "I'd like to make an appointment for ___.", zh: "我想预约……", note: "预约万能句：疫苗/体检/洗牙都能套" },
    },
    {
      npcLines: [
        "Of course! Flu shots are available every day this week. Do you have a preferred time?",
        "No problem — flu shots all week! Morning or afternoon work better for you?",
        "Sure thing! We're doing flu shots daily this week. When suits you best?",
      ],
      npcZh: "当然可以！这周每天都有流感疫苗。您有偏好的时间吗？",
      task: "约明天上午，顺便问能不能同时体检",
      options: [
        { text: "Tomorrow morning works. Could I also get a routine check-up at the same time?", ok: true,  tip: "Could I also...? 一站式问法；routine check-up 常规体检" },
        { text: "Tomorrow morning time good. Check body also maybe same day?",                ok: false, tip: "说 Could I also get a routine check-up?" },
        { text: "Morning yes. Everything check all together fast do.",                        ok: false, tip: "更自然：Could I also get a routine check-up?" },
      ],
      phrase: { en: "Could I also get a ___ at the same time?", zh: "能同时做……吗？", note: "一次跑两件事的省时问法，办事效率拉满" },
    },
    {
      npcLines: [
        "Absolutely, that saves you a trip! Please fill out this form — medical history and current medications.",
        "We can do both, easy! First, this form — medical history and any medications you take.",
        "Of course! Kill two birds with one stone. Just fill this in — history and current meds.",
      ],
      npcZh: "当然，这样省您跑一趟！请填这张表——病史和正在服用的药物。",
      task: "询问某栏不懂的地方（过敏史）",
      options: [
        { text: "Sure. Just to clarify — does \"allergies\" here mean medicine allergies or food allergies?", ok: true,  tip: "Just to clarify...? 澄清式提问模板" },
        { text: "Form too difficult English medical words hard.",                                         ok: false, tip: "不懂就问：Does allergies mean medicine or food?" },
        { text: "Allergy section I skip write nothing okay?",                                            ok: false, tip: "先问清楚再填：Does it mean medicine or food allergies?" },
      ],
      phrase: { en: "Just to clarify — does ___ mean ___?", zh: "想确认一下——……是指……吗？", note: "填表澄清神器；Just to clarify 听起来专业又礼貌" },
    },
    {
      npcLines: [
        "Great question — both! Medicine, food, and environmental allergies all go in that section.",
        "Both! Meds, food, pollen — all of it belongs there.",
        "All of the above! Medicine, food, seasonal — write them all in.",
      ],
      npcZh: "问得好——都算！药物、食物和环境过敏都填在那栏。",
      task: "填写：青霉素过敏",
      options: [
        { text: "Got it. I'm allergic to penicillin, so I'll write that down.", ok: true,  tip: "be allergic to + 过敏原；青霉素 penicillin 必须主动申报" },
        { text: "I write allergy doctor medicine bad reaction yes.",         ok: false, tip: "说 I'm allergic to penicillin" },
        { text: "Penicillin sick me long ago maybe still problem.",          ok: false, tip: "明确填写：I'm allergic to penicillin" },
      ],
      phrase: { en: "I'm allergic to ___.", zh: "我对……过敏", note: "就医最重要的安全句，务必让每个医生都知道" },
      adds: [{ emoji: "📋", label: "Form ✓", wordId: "form" }],
    },
    {
      npcLines: [
        "Perfect, thank you! The nurse will call you shortly for the flu shot first. Little pinch, that's all!",
        "All filled out? Great! Nurse will grab you for the flu shot first — just a tiny pinch!",
        "Thank you! We'll start with the flu shot — quick pinch and it's over!",
      ],
      npcZh: "填好了，谢谢！护士待会儿先叫您打流感疫苗——就轻轻一捏！",
      task: "打针时表达紧张，问护士缓解方法",
      options: [
        { text: "I'm a little nervous about needles. Any tips to make it easier?", ok: true,  tip: "Any tips? 求建议万能句；承认紧张反而更放松" },
        { text: "Needle scary no like. Do fast hide it from me.",                ok: false, tip: "更自然：I'm nervous about needles. Any tips?" },
        { text: "Pain I fear fainting before maybe.",                            ok: false, tip: "大方沟通：I'm a little nervous. Any tips?" },
      ],
      phrase: { en: "I'm nervous about needles.", zh: "我有点怕打针", note: "承认紧张不丢人；护士会用聊天转移你的注意力" },
    },
    {
      npcLines: [
        "Totally normal! Look away, take a deep breath... and done! That was it — you survived!",
        "Don't worry, happens all the time! Look away, big breath... and we're finished! Easy!",
        "You're in good company! Deep breath, look away... all done! You didn't even flinch!",
      ],
      npcZh: "完全正常！看别处、深呼吸……好了！就这么快——你挺过来了！",
      task: "惊讶于速度，感谢护士",
      options: [
        { text: "Wait, that's it? That was so quick. Thank you!", ok: true,  tip: "Wait, that's it? 表惊讶的口语神器" },
        { text: "Finished already really no pain zero?",          ok: false, tip: "说 Wait, that's it? That was so quick!" },
        { text: "You trick me no injection happened?",            ok: false, tip: "护士手速是真的快：Thank you!" },
      ],
      phrase: { en: "Wait, that's it?", zh: "等等，这就完了？", note: "惊讶于速度/简单程度的万能反应句" },
      adds: [{ emoji: "💉", label: "Flu Shot ✓", badge: true }],
    },
    {
      npcLines: [
        "You're welcome! Now for the check-up: blood pressure, height, weight, and a blood test. Please follow me.",
        "Anytime! Check-up time now — blood pressure, height, weight, and blood work. This way!",
        "My pleasure! Now for the physical: BP, height, weight, and blood test. Right this way!",
      ],
      npcZh: "不客气！现在开始体检：血压、身高、体重和血液检查。请跟我来。",
      task: "跟随体检，问血检多久出结果",
      options: [
        { text: "Sure. How long will it take to get the blood test results?", ok: true,  tip: "results 结果；体检/化验必问出报告时间" },
        { text: "Blood result when come back to me?",                       ok: false, tip: "说 How long will it take to get the results?" },
        { text: "Test finish today know everything?",                       ok: false, tip: "问时长：How long will it take to get the results?" },
      ],
      phrase: { en: "How long will it take to get the results?", zh: "多久能出结果？", note: "体检/化验/申请进度通用；results 复数=检查结果" },
    },
    {
      npcLines: [
        "Results in two days — we'll send them through your patient portal. Everything looks great so far. Stay healthy!",
        "Two days, and it'll be on your patient portal! You look healthy as a horse. Take care!",
        "Couple of days! Check your patient portal. All looks good from here — stay well!",
      ],
      npcZh: "两天后出结果——会发到您的患者门户。目前一切看起来都很好。保持健康！",
      task: "完整总结今天的双任务",
      options: [
        { text: "Flu shot done, check-up done, results in two days. Thanks for making it painless!", ok: true,  tip: "三项成果总结 + 幽默收尾，任务闭环" },
        { text: "Busy day today many things finished bye.",                                       ok: false, tip: "列成果更有收获感：Flu shot done, check-up done..." },
        { text: "Pain less today good hospital nice people.",                                     ok: false, tip: "完整总结：Flu shot done, check-up done, results in two days" },
      ],
      phrase: { en: "Thanks for making it painless!", zh: "谢谢你让过程毫无痛苦！", note: "幽默致谢：双关 painless（不痛/不麻烦），好记好用" },
    },
  ],
},
