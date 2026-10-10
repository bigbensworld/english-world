// 医院/药房 第 2 轮：药房取药（7 步）
{
  id: "v2",
  title: "第 2 次光顾 · 药房取药",
  titleEn: "At the Pharmacy",
  emoji: "💊",
  desc: "拿着处方去药房。递处方、听用法用量、问注意事项——学会买药必备英语。",
  reward: { en: "prescription", zh: "你用英文顺利取到了药！💊" },
  steps: [
    {
      npcLines: [
        "Hi there! How can I help you today?",
        "Hello! What can I do for you?",
        "Hi, welcome to the pharmacy. What do you need?",
      ],
      npcZh: "你好！今天有什么可以帮您？",
      task: "出示处方取药",
      options: [
        { text: "Hi, I'd like to pick up my prescription, please.", ok: true,  tip: "pick up + 处方——取药的标准说法" },
        { text: "I want buy my paper medicine.",                    ok: false, tip: "取药说 pick up my prescription" },
        { text: "Doctor give paper you read.",                      ok: false, tip: "更自然：I'd like to pick up my prescription" },
      ],
      phrase: { en: "I'd like to pick up my prescription.", zh: "我来取药（处方）", note: "pick up 表示\"取\"，药店/前台通用" },
      adds: [ { emoji: "📝", label: "Prescription", wordId: "prescription" } ],
    },
    {
      npcLines: [
        "Sure, let me check... Ah yes, Alex, right? One moment while I get it ready.",
        "Of course! Alex, is it? Give me a minute to prepare your order.",
        "Got it, Alex! I'll have your medicine ready in just a moment.",
      ],
      npcZh: "好的，我查一下……是 Alex 对吧？稍等，我去取药。",
      task: "回应并耐心等待",
      options: [
        { text: "Yes, that's me. Take your time.", ok: true,  tip: "Yes, that's me 确认身份 + Take your time 礼貌表示不急" },
        { text: "Yes me fast fast please.",        ok: false, tip: "催促可以说 No rush / Take your time 更礼貌" },
        { text: "Me hurry up medicine now.",       ok: false, tip: "更自然：Yes, that's me. Take your time." },
      ],
      phrase: { en: "Yes, that's me.", zh: "是的，是我", note: "被叫到名字时确认身份，配合 Take your time 更礼貌" },
    },
    {
      npcLines: [
        "Here you go. Take one pill three times a day, after meals, with plenty of water.",
        "All ready! One pill, three times daily — after food, and drink lots of water.",
        "Here's your medicine. One pill three times a day, after meals, OK?",
      ],
      npcZh: "给您。一天三次，一次一片，饭后服用，多喝水。",
      task: "确认听懂了用法用量",
      options: [
        { text: "Got it. One pill, three times a day, after meals.", ok: true,  tip: "复述一遍关键信息——用药安全好习惯，Got it 表示听懂了" },
        { text: "Okay I understand some word.",                      ok: false, tip: "复述具体信息更保险：One pill, three times a day" },
        { text: "Yes yes thank you bye.",                            ok: false, tip: "更安全：Got it. One pill, three times a day, after meals." },
      ],
      phrase: { en: "Got it. One ___, three times a day.", zh: "明白了。……一天三次", note: "复述确认用法，避免吃错药" },
      adds: [ { emoji: "💊", label: "Medicine", wordId: "medicine" }, { emoji: "⏱️", label: "3x daily", wordId: "dosage" } ],
    },
    {
      npcLines: [
        "Exactly right! Now, a quick question — are you allergic to any medicine?",
        "Perfect! Before you go: any medicine allergies I should know about?",
        "You got it. One thing though — are you allergic to anything?",
      ],
      npcZh: "完全正确！再问一下——您对什么药过敏吗？",
      task: "说明药物过敏情况",
      options: [
        { text: "Not that I know of, but I'm allergic to peanuts.", ok: true,  tip: "Not that I know of——\"据我所知没有\"，地道表达" },
        { text: "No allergy me body good.",                         ok: false, tip: "说 Not that I know of 更准确自然" },
        { text: "Allergic no never maybe yes.",                     ok: false, tip: "更自然：Not that I know of" },
      ],
      phrase: { en: "Not that I know of.", zh: "据我所知没有", note: "表示\"不太确定但没有\"的地道说法" },
    },
    {
      npcLines: [
        "Good to know — these pills are safe for you then. Avoid cold drinks while taking them.",
        "Noted! This medicine is fine with a peanut allergy. Just avoid iced drinks for a few days.",
        "Okay! No problem with peanuts. But skip the cold drinks while you're on this medicine.",
      ],
      npcZh: "好的，那这药对您是安全的。服药期间避免冷饮。",
      task: "询问还有什么注意事项",
      options: [
        { text: "I see. Anything else I should know?", ok: true,  tip: "Anything else...——追问信息的万能句" },
        { text: "More thing tell me what?",            ok: false, tip: "说 Anything else I should know?" },
        { text: "What other problem is?",              ok: false, tip: "更自然：Anything else I should know?" },
      ],
      phrase: { en: "Anything else I should know?", zh: "还有什么我需要知道的吗？", note: "咨询收尾万能句，药店/机场/酒店都能用" },
    },
    {
      npcLines: [
        "Just finish all the pills, even if you feel better. And come back if the fever lasts more than three days.",
        "Take the full course — don't stop early! And see a doctor again if the fever doesn't break in three days.",
        "Finish the whole pack, even when you feel fine. If the fever stays past three days, come see us.",
      ],
      npcZh: "吃完整个疗程，即使感觉好转也别停药。如果三天后还发烧，再来看医生。",
      task: "表示会照做并询问总费用",
      options: [
        { text: "Understood. How much is it altogether?", ok: true,  tip: "How much is it altogether——问总价，altogether 强调\"一共\"" },
        { text: "Money how many I give you?",             ok: false, tip: "说 How much is it altogether?" },
        { text: "Price is what number total?",            ok: false, tip: "更自然：How much is it altogether?" },
      ],
      phrase: { en: "How much is it altogether?", zh: "一共多少钱？", note: "altogether = 总共，结账问价万能句" },
    },
    {
      npcLines: [
        "That'll be twelve dollars. Insurance covered most of it!",
        "Twelve dollars, please — your insurance took care of the rest.",
        "Just twelve dollars! The insurance covered the bigger part.",
      ],
      npcZh: "一共 12 美元，保险已经覆盖了大部分！",
      task: "付款并道谢",
      options: [
        { text: "Here you go. Thank you so much for your help!", ok: true,  tip: "Here you go 递钱 + 感谢收尾，完整礼貌" },
        { text: "Money give take medicine bye.",                ok: false, tip: "说 Here you go. Thank you!" },
        { text: "Yes paying now here done.",                    ok: false, tip: "更自然：Here you go. Thank you so much!" },
      ],
      phrase: { en: "Here you go. Thank you so much!", zh: "给您，非常感谢！", note: "付钱+道谢的收尾组合句" },
      adds: [ { emoji: "💵", label: "Paid $12" } ],
    },
  ],
},
