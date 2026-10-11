    {
      id: "v3",
      title: "第 3 次光顾 · 镜架急救",
      titleEn: "Broken Frames",
      emoji: "🔩",
      desc: "眼镜坐断了！镜架维修、临时救急、保修条款——眼镜党的紧急时刻。",
      reward: { en: "repair", zh: "你的眼镜起死回生了！🔩" },
      steps: [
        {
          npcLines: [
            "Oh no — you're holding your glasses like a tragedy! What happened?",
            "Whoa, that's the saddest walk-in I've seen today. What happened to them?",
            "Oh honey, you're cupping those glasses like a wounded bird. Talk to me — what happened?",
          ],
          npcZh: "哦不——你捧眼镜的样子像捧着悲剧！怎么了？",
          task: "说明眼镜被坐断了",
          options: [
            { text: "I sat on them. The hinge snapped and the lens popped out. Please tell me you can fix this!", ok: true,  tip: "hinge 铰链 + lens popped out 镜片弹出——精确描述损伤" },
            { text: "Glasses dead. Me sad. Sit accident. Butt crime.",                                            ok: false, tip: "描述损伤：The hinge snapped and the lens popped out" },
            { text: "Glasses fight chair. Chair win. Glasses lose. Revenge needed.",                              ok: false, tip: "技术性描述：The hinge snapped — can you fix it?" },
          ],
          phrase: { en: "The hinge snapped.", zh: "铰链断了。", note: "snap 咔嚓折断；hinge 镜腿铰链" },
        },
        {
          npcLines: [
            "The classic chair-vs-glasses battle — chairs always win! Let me look... The hinge is snapped, but the lens and frame are intact. Very fixable!",
            "Ah, the timeless chair battle — never bet against the chair! Let's see... snapped hinge, but lens and frame are fine. Totally fixable!",
            "Chair wins again — it always does! Good news though: only the hinge is gone, lens and frame are perfect. We can absolutely fix this!",
          ],
          npcZh: "经典的椅子大战——椅子总赢！我看看……铰链断了，但镜片和镜框完好。完全可以修！",
          task: "松口气，询问维修费用和时间",
          options: [
            { text: "What a relief! How much would the repair cost, and how long does it take?", ok: true,  tip: "What a relief 松口气 + 费用时间双确认" },
            { text: "Fix free? Fix now? Fix magic?",                                            ok: false, tip: "双确认：How much and how long?" },
            { text: "Money no object. Time no object. Fix glasses object.",                     ok: false, tip: "常规询问：How much would it cost, and how long?" },
          ],
          phrase: { en: "How long does it take?", zh: "需要多久？", note: "take + 时间；维修问询双件套" },
        },
        {
          npcLines: [
            "The hinge replacement is twenty-five dollars, and I can do it in fifteen minutes while you wait. Want me to start?",
            "New hinge, twenty-five bucks, fifteen minutes — you can even watch! Start now?",
            "Hinge swap: twenty-five dollars, done in fifteen while you wait. Shall I begin?",
          ],
          npcZh: "换铰链 25 美元，15 分钟立等可取，你可以看着。现在开始？",
          task: "接受维修，顺便问保修期内的旧镜框问题",
          options: [
            { text: "Yes, please! Also — these frames are under warranty, right? Would a snapped hinge be covered?", ok: true,  tip: "under warranty 在保修期内 + covered 被覆盖——保修必问" },
            { text: "Warranty! Magic paper! Free money! Activate warranty!",                                        ok: false, tip: "正常询问：Would a snapped hinge be covered by the warranty?" },
            { text: "Warranty cover chair damage? Chair pay? Sue chair?",                                           ok: false, tip: "问覆盖范围：Would that be covered?" },
          ],
          phrase: { en: "Is it covered by the warranty?", zh: "这在保修范围内吗？", note: "warranty 保修；covered 被涵盖" },
        },
        {
          npcLines: [
            "Good news and honest news! The warranty covers manufacturing defects, not accidents. A snapped hinge from sitting would be... an accident. But — I'll apply a loyalty discount, so fifteen dollars instead of twenty-five.",
            "Two answers: warranty covers defects, not chair accidents — that's the honest part. The good part: loyalty discount brings it from twenty-five down to fifteen!",
            "Real talk: warranty is for defects, and chairs are not defects! But you're a regular, so let's do fifteen instead of twenty-five. Deal?",
          ],
          npcZh: "有好消息也有实话！保修覆盖制造缺陷，不覆盖意外。坐断铰链属于……意外。不过——我给你个忠实客户折扣，25 降为 15。",
          task: "接受折扣并感谢诚实解释",
          options: [
            { text: "That's fair — thanks for being upfront about what's covered. Fifteen it is!", ok: true,  tip: "upfront 坦诚的——认可诚信服务" },
            { text: "Accident? Chair attacked me! I am victim! Free repair for victims!",         ok: false, tip: "接受方案：Thanks for being upfront — fifteen it is!" },
            { text: "Fifteen? Make five. Negotiate harder. Walk away drama.",                     ok: false, tip: "合理就接受：That's fair — fifteen it is!" },
          ],
          phrase: { en: "Thanks for being upfront.", zh: "谢谢你这么坦诚。", note: "upfront 直率坦诚；被诚实对待时的最佳回应" },
          adds: [{ emoji: "🔩", label: "Hinge fixed", wordId: "opt-repair" }],
        },
        {
          npcLines: [
            "All done — good as new! Try them on... How's the fit? Same as before, or shall I fine-tune anything?",
            "Ta-da! Resurrected! Try them... Fit check: same as always, or any tweaks?",
            "Finished! Better than new, if I do say so! How do they feel — need any adjusting?",
          ],
          npcZh: "修好了——跟新的一样！戴上试试……贴合度如何？要微调吗？",
          task: "检查维修质量，顺便让调紧一点",
          options: [
            { text: "The hinge feels solid. Could you just tighten them slightly? They were sliding down my nose before.", ok: true, tip: "solid 结实 + tighten 调紧——验货+微调一步到位" },
            { text: "Perfect forever. No change. Never change. Frozen face.",                                              ok: false, tip: "提出微调：Could you tighten them slightly?" },
            { text: "Tighten until face numb. Maximum tight. Face clamp.",                                                 ok: false, tip: "适度调整：Slightly — they slide down my nose" },
          ],
          phrase: { en: "Could you tighten them slightly?", zh: "能稍微调紧一点吗？", note: "tighten 调紧 / loosen 调松；眼镜调整双子星" },
        },
        {
          npcLines: [
            "One slight tightening, coming right up... There! Perfect fit, solid hinge, fifteen dollars. Anything else today?",
            "Slight tighten, easy... Done! Solid hinge, perfect fit, fifteen bucks. Anything more for you?",
            "Tightened! Fit's perfect, hinge is solid, total's fifteen. What else can I do?",
          ],
          npcZh: "稍调紧……好了！贴合完美、铰链结实，15 美元。今天还要别的吗？",
          task: "道谢并请教防再次坐坏的秘籍",
          options: [
            { text: "You've saved my week. One last thing — any tips so I never do this again?", ok: true,  tip: "求预防建议——把事故变成学习机会" },
            { text: "Tips? Buy chair-proof butt? Where buy? Sell me?",                           ok: false, tip: "请教建议：Any tips so I never do this again?" },
            { text: "I will sit on them again. It is destiny. Accept fate.",                     ok: false, tip: "预防为主：Any tips to avoid this?" },
          ],
          phrase: { en: "Any tips?", zh: "有什么诀窍吗？", note: "tips 实用建议；主动求教的高效问句" },
        },
      ],
    },
