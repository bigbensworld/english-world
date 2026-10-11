  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 感冒买药",
      titleEn: "Cold Medicine Run",
      emoji: "🤒",
      desc: "感冒了！去药店描述症状、买感冒药、听清服用剂量。最实用的自我药疗一课。",
      reward: { en: "cold medicine", zh: "你用英文买到了感冒药！💊" },
      steps: [
        {
          npcLines: [
            "Hi there! You look a bit under the weather. What can I help you find today?",
            "Hello! Oh, you sound stuffy — coming down with something? What are you looking for?",
            "Hi! Sniffles and a cough, huh? What can I get for you today?",
          ],
          npcZh: "你好！你看起来有点不舒服。今天想找点什么？",
          task: "描述感冒症状",
          options: [
            { text: "I have a runny nose and a sore throat. I need something for a cold.", ok: true,  tip: "runny nose 流鼻涕 + sore throat 喉咙痛，症状描述标配" },
            { text: "I am sick. Sick very bad. Medicine for sick.",                      ok: false, tip: "说具体症状：I have a runny nose and a sore throat" },
            { text: "Nose is water. Throat is fire. Fix it.",                            ok: false, tip: "地道说法：a runny nose and a sore throat" },
          ],
          phrase: { en: "I have a runny nose and a sore throat.", zh: "我流鼻涕、喉咙痛。", note: "感冒三大件：runny nose / sore throat / cough" },
        },
        {
          npcLines: [
            "Sounds like a classic cold! Any fever? That changes what I'd recommend.",
            "The common cold special! Do you have a fever too? That matters for what I suggest.",
            "Classic cold symptoms! Fever as well, or no? That decides my recommendation.",
          ],
          npcZh: "听起来是典型感冒！有发烧吗？这会影响我的推荐。",
          task: "说明有一点点低烧",
          options: [
            { text: "A slight fever, I think — around 37.8 degrees last night.", ok: true,  tip: "slight fever 低烧 + 报具体体温，信息给足" },
            { text: "Fever? Maybe yes maybe no. Coin flip.",                    ok: false, tip: "量过体温就报数：A slight fever, around 37.8" },
            { text: "Temperature is hot like soup body.",                       ok: false, tip: "报具体度数：A slight fever, around 37.8 degrees" },
          ],
          phrase: { en: "A slight fever.", zh: "有点低烧。", note: "slight = 轻微的；fever reducer 退烧药等着你" },
        },
        {
          npcLines: [
            "Okay, that's mild. I'd recommend this cold medicine — it covers the runny nose, sore throat, and mild fever. Does that work?",
            "Mild enough for this cold medicine then — treats all three: nose, throat, and the low fever. Sound good?",
            "Nothing scary! Take this cold medicine — one box handles all your symptoms. Shall I grab it from the counter?",
          ],
          npcZh: "还好，不算重。我推荐这款感冒药——流鼻涕、喉咙痛、低烧全覆盖。可以吗？",
          task: "接受推荐，并问怎么服用",
          options: [
            { text: "That works. How do I take it — what's the dosage?", ok: true,  tip: "How do I take it + dosage 剂量，买药必问" },
            { text: "I take all box at once. Strong cure fast.",        ok: false, tip: "先问剂量：What's the dosage?" },
            { text: "Dosage? More is better. Everyone knows.",          ok: false, tip: "遵医嘱按剂量：How do I take it — what's the dosage?" },
          ],
          phrase: { en: "How do I take it?", zh: "这个怎么服用？", note: "买药第一问；take medicine 服药（不用 eat/drink）" },
        },
        {
          npcLines: [
            "Two tablets every six hours, with food, and no more than four doses a day. It may make you drowsy — don't drive after taking it.",
            "Two tablets every six hours, take them with food, maximum four doses daily. Fair warning: it can make you drowsy, so no driving.",
            "Every six hours, two tablets, with food — and cap it at four doses a day. It might make you sleepy, so skip the driving.",
          ],
          npcZh: "每 6 小时两片，随餐服，一天不超过 4 次。可能会犯困——服药后别开车。",
          task: "复述关键信息确认（剂量+忌开车）",
          options: [
            { text: "So two tablets every six hours with food, and no driving because it makes me drowsy. Got it.", ok: true,  tip: "复述剂量和禁忌，用药安全的关键动作" },
            { text: "Six hours? I take every one hour. Speed cure.",                                               ok: false, tip: "按说明服药：Two tablets every six hours — got it" },
            { text: "Drowsy driving is fine. I drive with eyes half open always.",                                 ok: false, tip: "服药后别开车：No driving because it makes me drowsy" },
          ],
          phrase: { en: "It may make you drowsy.", zh: "它可能会让你犯困。", note: "drowsy 嗜睡；服药禁忌高频警示词" },
        },
        {
          npcLines: [
            "You've got it. One more question — are you allergic to any medications? I have to ask.",
            "Perfect recall! Standard question: any medication allergies I should know about?",
            "Nailed it! And the required question — any allergies to medications?",
          ],
          npcZh: "完全正确。还有一个问题——你对任何药物过敏吗？这是必须问的。",
          task: "说明对青霉素过敏",
          options: [
            { text: "Yes, I'm allergic to penicillin. Does this medicine contain any?", ok: true,  tip: "be allergic to 过敏 + contain 含有，双重确认" },
            { text: "Allergy? Maybe. Try medicine, we see what happen.",               ok: false, tip: "明确告知：I'm allergic to penicillin — does this contain any?" },
            { text: "Penicillin and me are enemies. Long story.",                      ok: false, tip: "正式表达：I'm allergic to penicillin" },
          ],
          phrase: { en: "I'm allergic to ___.", zh: "我对……过敏。", note: "药店必答句；allergy 名词 / allergic 形容词" },
        },
        {
          npcLines: [
            "Good thing you mentioned it — no penicillin in this one, you're safe. It's six forty-nine for the box. Cash or card?",
            "Smart to say so! This one's penicillin-free — you're in the clear. Six forty-nine, please. Cash or card?",
            "Glad you told me! Zero penicillin here, totally safe for you. That'll be six forty-nine — paying cash or card?",
          ],
          npcZh: "幸好你说了——这款不含青霉素，安全的。一盒 6.49。现金还是刷卡？",
          task: "付款并道谢",
          options: [
            { text: "Card, please. Thank you for checking the ingredients so carefully!", ok: true,  tip: "感谢对方核对成分，认可专业服务" },
            { text: "Card. Also free medicine for allergy people?",                     ok: false, tip: "正常付款致谢即可：Thank you for checking!" },
            { text: "Pay later. Medicine first, money never.",                          ok: false, tip: "先付款：Card, please — thank you!" },
          ],
          phrase: { en: "Thank you for checking.", zh: "谢谢你帮我核对。", note: "ingredients 成分；认可服务的万能句" },
          adds: [{ emoji: "💊", label: "Cold medicine", wordId: "drug-cold" }],
        },
        {
          npcLines: [
            "Of course — safety first! Feel better soon, and come back if the symptoms get worse, okay?",
            "That's the job! Rest up, drink fluids — and if anything gets worse, you come see us again, promise?",
            "Happy to help! Get some rest, and don't be a stranger if you're not better in a few days!",
          ],
          npcZh: "应该的——安全第一！早日康复，症状加重的话要再过来，好吗？",
          task: "答应并道别",
          options: [
            { text: "I promise. Thanks so much — have a good one!", ok: true,  tip: "I promise 答应对方 + have a good one 告别" },
            { text: "Come back? Never. I heal like wolf.",         ok: false, tip: "答应随访：I promise — thanks!" },
            { text: "Fluids? I drink only soda. Soda is fluid.",   ok: false, tip: "多喝水休息：I promise — thanks so much!" },
          ],
          phrase: { en: "Feel better soon!", zh: "早日康复！", note: "关心病人的万能祝福；对方对你说时回 Thanks, I will!" },
        },
      ],
    },
