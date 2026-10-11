    {
      id: "v4",
      title: "第 4 次光顾 · 高速爆胎",
      titleEn: "Flat Tire on the Highway",
      emoji: "🛞",
      desc: "自驾半路爆胎！给租车行打救援电话：报位置、说情况、等道路救援。自驾游最怕也最该会的一课。",
      reward: { en: "roadside assistance", zh: "你处理了一次英文道路救援！🆘" },
      steps: [
        {
          npcLines: [
            "Speedy Rentals roadside assistance, this is Marcus. Is this an emergency?",
            "Speedy Rentals, roadside assistance line, Marcus speaking. Are you in an emergency situation?",
            "Roadside assistance, Marcus here. First things first — are you safe and is this an emergency?",
          ],
          npcZh: "Speedy 租车道路救援，我是 Marcus。是紧急情况吗？",
          task: "说明情况：高速上爆胎，人已安全撤到路肩",
          options: [
            { text: "I got a flat tire on Highway 10. I've pulled over to the shoulder — I'm safe.", ok: true,  tip: "pull over to the shoulder 靠边停车到路肩，安全第一" },
            { text: "Tire is dead. Car angry. Help fast!",                                          ok: false, tip: "先报安全状态：I've pulled over to the shoulder — I'm safe" },
            { text: "Emergency! Big emergency! Movie style!",                                       ok: false, tip: "冷静说明：I got a flat tire — I've pulled over, I'm safe" },
          ],
          phrase: { en: "I got a flat tire.", zh: "我的车爆胎了。", note: "flat tire 爆胎/瘪胎；高速事故先靠边再求助" },
        },
        {
          npcLines: [
            "Glad you're safe — that's what matters. Can you tell me your location? A mile marker or the nearest exit would help.",
            "Safety first, well done! Now, where exactly are you? A mile marker number or the nearest exit works great.",
            "You did the right thing pulling over! Okay — location check: do you see a mile marker or an exit sign nearby?",
          ],
          npcZh: "人安全就好——这才是最重要的。能告诉我你的位置吗？里程标或最近的出口都行。",
          task: "报出位置信息",
          options: [
            { text: "I'm near mile marker 42 on Highway 10, heading north.", ok: true,  tip: "mile marker 里程标 + heading north 朝北行驶，精确报位" },
            { text: "I am near... road. Road is long. Many cars.",          ok: false, tip: "找参照物报位：near mile marker 42, heading north" },
            { text: "Between two trees. Big tree and small tree.",          ok: false, tip: "里程标最准：I'm near mile marker 42 on Highway 10" },
          ],
          phrase: { en: "I'm near mile marker ___.", zh: "我在……里程标附近。", note: "mile marker 高速里程碑；报位置最有效的方式" },
        },
        {
          npcLines: [
            "Found it on the map. Since you have full coverage, roadside assistance is included — a tow truck and a replacement car are on the way.",
            "Got you on the map! Good news: full coverage means roadside assistance is included. A tow truck plus a replacement car are rolling out now.",
            "Located! And here's why full coverage pays off — assistance is fully covered. Tow truck and a swap car, dispatched.",
          ],
          npcZh: "地图上找到了。你买了全险，道路救援是包含的——拖车和替换车都在路上了。",
          task: "确认拖车和换车都免费（全险包含）",
          options: [
            { text: "So the tow truck and the replacement car are both covered by my insurance?", ok: true,  tip: "确认免费范围，账单零惊喜" },
            { text: "Free? Everything free? Even the driver?",                                     ok: false, tip: "确认覆盖范围：Are both covered by my insurance?" },
            { text: "Tow truck tow my car where? To ocean?",                                       ok: false, tip: "先确认费用：Are the tow truck and replacement car covered?" },
          ],
          phrase: { en: "Is that covered by my insurance?", zh: "这个在保险范围内吗？", note: "covered = 被保险覆盖；出状况时先问这句" },
        },
        {
          npcLines: [
            "Both fully covered — zero out of pocket. The tow will be there in about forty minutes. Do you want to wait inside the car?",
            "One hundred percent covered, nothing out of pocket! The truck's about forty minutes out. You waiting in the car?",
            "Everything's covered, not a cent from you! ETA for the tow: forty minutes or so. Will you be waiting in the vehicle?",
          ],
          npcZh: "全包——一分钱不用掏。拖车大约 40 分钟到。你要在车里等吗？",
          task: "问清楚在高速上等待的正确做法",
          options: [
            { text: "Is it safe to wait inside the car on the shoulder, or should I stand behind the barrier?", ok: true,  tip: "高速等待安全常识：护栏后比车内安全" },
            { text: "I wait on road middle. Best view of truck.",                                              ok: false, tip: "太危险！问安全位置：Should I stand behind the barrier?" },
            { text: "I nap in car. Wake me by knocking loud.",                                                 ok: false, tip: "确认安全等待方式：Is it safe to wait inside, or behind the barrier?" },
          ],
          phrase: { en: "Should I stand behind the barrier?", zh: "我应该站到护栏后面吗？", note: "高速抛锚安全守则：人离车道越远越好" },
        },
        {
          npcLines: [
            "Great question — stand behind the guardrail if you can, away from traffic. The driver will call when he's five minutes out.",
            "Smart thinking! Behind the guardrail is safest, well away from traffic. The driver will ring you at the five-minute mark.",
            "Exactly the right instinct! Get behind the guardrail, clear of the road. Driver will call you five minutes before arrival.",
          ],
          npcZh: "问得好——尽量站到护栏后面，远离车流。司机到前 5 分钟会打给你。",
          task: "感谢专业指导",
          options: [
            { text: "Will do. Thank you so much for walking me through it!", ok: true,  tip: "walk sb through 带某人一步步做，地道表达" },
            { text: "Guardrail is cold metal. Bring blanket.",              ok: false, tip: "安全最重要：Thank you for walking me through it!" },
            { text: "Five minute call? I no answer stranger number.",       ok: false, tip: "接司机来电即可：Thank you — will do!" },
          ],
          phrase: { en: "Thank you for walking me through it.", zh: "谢谢你一步步指导我。", note: "walk through 逐步讲解；感谢客服指导的绝佳句" },
        },
        {
          npcLines: [
            "That's what we're here for! The replacement car will meet you at the next exit, Exit 15 — there's a gas station right there. Safe travels!",
            "All part of the service! Your swap car will be waiting at Exit 15 — the gas station lot. Take care out there!",
            "Happy to help! New car's waiting at Exit 15, right by the gas station. Look after yourself!",
          ],
          npcZh: "这就是我们的工作！替换车在下一个出口（15 号出口）等你——那里就有加油站。一路平安！",
          task: "确认交接地点并道别",
          options: [
            { text: "Exit 15 by the gas station — got it. Thanks again, Marcus!", ok: true,  tip: "复述交接地点确认 + 称呼对方名字拉近距离" },
            { text: "Exit 15? Make Exit 1. Closer to me.",                       ok: false, tip: "按安排走：Exit 15 by the gas station — got it!" },
            { text: "Gas station? I need no gas. Only car.",                     ok: false, tip: "加油站是地标：Exit 15 by the gas station — thanks!" },
          ],
          phrase: { en: "Got it. Thanks again!", zh: "明白了，再次感谢！", note: "复述关键信息 + 收尾致谢，电话办事标准动作" },
        },
      ],
    },
