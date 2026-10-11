    {
      id: "v3",
      title: "第 3 次光顾 · 羊绒缩水了",
      titleEn: "The Shrunken Sweater",
      emoji: "💔",
      desc: "取衣时发现羊绒衫缩水了！拿出小票维权：指出问题、引用政策、谈赔偿。维权三部曲实战。",
      reward: { en: "compensation", zh: "你为羊绒衫讨回了公道！⚖️" },
      steps: [
        {
          npcLines: [
            "Good morning! Rush order for you — silk dress and cashmere sweater, right? Let me grab them.",
            "Morning! Picking up the rush order? Two delicate pieces — I've got them right here!",
            "Hi! Your Friday rush order — coming right up! Let me pull the silk and cashmere.",
          ],
          npcZh: "早上好！加急订单——真丝连衣裙和羊绒衫对吧？我去拿。",
          task: "等待取衣，先检查衣物",
          options: [
            { text: "Yes, that's mine. Let me check them before I sign anything.", ok: true,  tip: "先验货再签字——消费维权第一原则" },
            { text: "Give clothes. I sign blind. Trust everything.",               ok: false, tip: "先验货：Let me check them before I sign" },
            { text: "Check here or check home? Home is far. Check here.",          ok: false, tip: "当场验货：Let me check them right here" },
          ],
          phrase: { en: "Let me check it first.", zh: "我先检查一下。", note: "签收前验货；维权的前提是当场发现问题" },
        },
        {
          npcLines: [
            "Of course, take your time... Here's the dress — the silk came out beautiful. And the sweater... oh.",
            "Absolutely, no rush! The dress is gorgeous — silk always shines after cleaning. And the sweater... hmm.",
            "Sure thing! Silk dress first — stunning, right? Now the sweater... oh no.",
          ],
          npcZh: "当然，慢慢看……这是连衣裙——真丝洗出来很漂亮。然后羊绒衫……哦。",
          task: "指出羊绒衫明显缩水了",
          options: [
            { text: "This sweater has shrunk! It was oversized — now it looks two sizes too small. What happened?", ok: true,  tip: "指出前后对比 + What happened? 要求解释" },
            { text: "Sweater small now! Was big! You eat sweater?!",                                                 ok: false, tip: "冷静指出：It has shrunk — it was oversized before. What happened?" },
            { text: "Maybe I shrink at home. Not sure. Memory fog.",                                                 ok: false, tip: "相信自己的判断：This sweater has clearly shrunk!" },
          ],
          phrase: { en: "It has shrunk!", zh: "它缩水了！", note: "shrink-shrank-shrunk；缩水是干洗店最常见纠纷" },
        },
        {
          npcLines: [
            "You're absolutely right — that's our fault. The sweater was washed instead of dry cleaned. I'm so sorry. Let me get the manager.",
            "Oh no, you're right — this is on us. It went through the wash cycle by mistake. I deeply apologize. The manager should see this.",
            "You're completely correct, and I'm mortified. Human error — it was washed, not dry cleaned. Let me call my manager right now.",
          ],
          npcZh: "您完全正确——这是我们的失误。羊绒衫被误水洗了。非常抱歉。我去叫经理。",
          task: "等经理时，整理诉求（想好要什么补偿）",
          options: [
            { text: "Thank you. I'd like to discuss compensation — this was expensive cashmere.", ok: true,  tip: "compensation 赔偿——直接但礼貌地表明诉求" },
            { text: "Manager! Manager! Big manager! Bring biggest manager!",                    ok: false, tip: "明确诉求即可：I'd like to discuss compensation" },
            { text: "Sorry is enough. Free hug. Go.",                                            ok: false, tip: "贵重受损应谈赔偿：I'd like to discuss compensation" },
          ],
          phrase: { en: "I'd like to discuss compensation.", zh: "我想谈谈赔偿。", note: "维权第三步：承认错误后，谈钱要平静而明确" },
        },
        {
          npcLines: [
            "Sir/Ma'am, I'm the manager, and I've reviewed the ticket. We made a serious mistake. What would be a fair resolution for you?",
            "I'm the manager — I've seen the ticket and the sweater. We clearly erred. What resolution would you consider fair?",
            "Manager here. I've read the ticket — the fault is ours, no question. What would you consider fair?",
          ],
          npcZh: "我是经理，我看过单子了。我们犯了严重错误。您认为怎样解决才公平？",
          task: "提出合理的补偿方案（洗衣费全免+现金赔偿）",
          options: [
            { text: "I'd like the cleaning fees waived, plus compensation for the sweater — it was a two-hundred-dollar cashmere.", ok: true,  tip: "诉求具体：退费 + 按价值赔偿，有理有据" },
            { text: "One million dollars. Cash. Small bills. Now.",                                                                 ok: false, tip: "合理诉求：Waive the fees plus compensation — it was a two-hundred-dollar sweater" },
            { text: "You buy new sweater. Also new wardrobe. Also car.",                                                            ok: false, tip: "按实际价值索赔：Compensation for the sweater — it was two hundred dollars" },
          ],
          phrase: { en: "I'd like the fees waived, plus compensation.", zh: "我希望免除费用，外加赔偿。", note: "waive 免除；维权诉求的标准结构" },
        },
        {
          npcLines: [
            "That's more than fair. Here's what we'll do: both cleaning fees refunded — thirty-seven fifty back — plus eighty dollars for the sweater. Our policy caps garment compensation at a percentage, but for this error, I'm authorizing the maximum.",
            "Completely reasonable. Two things: full refund of both fees — that's thirty-seven fifty — plus eighty dollars compensation. Company policy has a cap, but given the mistake, I'm approving the maximum payout.",
            "Fair ask! Here's my offer: both fees refunded, thirty-seven fifty total, and eighty dollars for the sweater. Policy usually caps lower, but I'm overriding it — you deserve the maximum.",
          ],
          npcZh: "非常公平。这样办：两笔洗衣费全退——退您 37.5——外加羊绒衫赔 80 美元。政策对衣物赔偿有比例上限，但这次失误我特批最高额度。",
          task: "复述方案确认，同意解决",
          options: [
            { text: "So that's the thirty-seven fifty refund plus eighty for the sweater — that works. Thank you for handling this fairly.", ok: true,  tip: "复述金额确认 + 认可对方处理——完美收官" },
            { text: "Numbers heard. Brain processing. Wait.",                                                                              ok: false, tip: "复述确认：37.50 refund plus eighty — thank you" },
            { text: "Eighty? Make eight hundred. Multiply by ten.",                                                                        ok: false, tip: "方案合理就接受：That works — thank you" },
          ],
          phrase: { en: "Thank you for handling this fairly.", zh: "谢谢你公正地处理。", note: "维权成功后的体面收尾；fairly 公平地" },
          adds: [{ emoji: "💵", label: "Compensation", wordId: "dry-compensation" }],
        },
        {
          npcLines: [
            "It's the least we can do. And please — your next three cleanings are on the house. We'd love a second chance.",
            "The very least! Plus, take three free cleanings on us. We really hope you'll give us another chance.",
            "Minimum we could offer! And three future cleans, free of charge. We'd be honored to earn back your trust.",
          ],
          npcZh: "这是我们应该做的。另外——您下次三次清洗免费。希望您给我们一次机会。",
          task: "大度接受，给店家机会",
          options: [
            { text: "Everyone makes mistakes — it's how you fix them that counts. I'll be back.", ok: true,  tip: "it's how you fix them that counts 强调补救态度——高级表达" },
            { text: "Second chance? Baby chance. Tiny chance. Very tiny.",                      ok: false, tip: "得体表态：Everyone makes mistakes — I'll be back" },
            { text: "Free cleanings forever. Lifetime. Write contract.",                        ok: false, tip: "三次已很诚意：I'll be back!" },
          ],
          phrase: { en: "It's how you fix them that counts.", zh: "重要的是怎么补救。", note: "强调态度的金句；对服务失误的高级回应" },
        },
      ],
    },
