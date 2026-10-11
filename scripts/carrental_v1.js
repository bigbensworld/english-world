  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 柜台取车",
      titleEn: "At the Counter",
      emoji: "🛎️",
      desc: "落地机场，到租车柜台取预订的车。报预订、选车型、自动挡确认——租车第一步。",
      reward: { en: "reservation", zh: "你顺利取到了预订的车！🚗" },
      steps: [
        {
          npcLines: [
            "Welcome to Speedy Rentals! Picking up a car today?",
            "Hi there, welcome to Speedy Rentals! Are you here to pick up a vehicle?",
            "Good afternoon! Speedy Rentals — picking up or just checking rates?",
          ],
          npcZh: "欢迎来到 Speedy 租车！今天来取车吗？",
          task: "说明有预订",
          options: [
            { text: "Yes, I have a reservation under the name Li Wei.", ok: true,  tip: "a reservation under the name 以……名字的预订" },
            { text: "I want car. Give car key.",                       ok: false, tip: "报预订信息：I have a reservation under Li Wei" },
            { text: "Maybe? You tell me if I have reservation.",       ok: false, tip: "主动报上：I have a reservation under the name Li Wei" },
          ],
          phrase: { en: "I have a reservation under ___.", zh: "我有以……名字的预订。", note: "租车酒店通用的报预订句式" },
        },
        {
          npcLines: [
            "Found it! You reserved a compact car for three days. Do you still want the compact, or would you like to see other options?",
            "Li Wei... yes, here it is! A compact for three days. Still happy with the compact, or shall I show you the lineup?",
            "Got your booking right here — compact, three days. Want to stick with it, or are you curious about an upgrade?",
          ],
          npcZh: "找到了！你预订了三天紧凑型车。还要紧凑型吗，还是看看其他选择？",
          task: "确认紧凑型就好（省油好停）",
          options: [
            { text: "The compact is perfect — it's easy to park and saves fuel.", ok: true,  tip: "给出两个理由支撑选择，交流更充实" },
            { text: "Compact too small. Big car same price. Change free.",      ok: false, tip: "确认即可：The compact is perfect — easy to park" },
            { text: "What is compact? Car name is Compact?",                    ok: false, tip: "compact car = 紧凑型：The compact is perfect" },
          ],
          phrase: { en: "It's easy to park and saves fuel.", zh: "好停车又省油。", note: "选小车两大理由；save fuel 省油" },
        },
        {
          npcLines: [
            "Great choice! Just to confirm — you wanted an automatic, right? All our cars are automatic unless you ask otherwise.",
            "Perfect! One check: automatic transmission, yes? All our cars are automatic by default.",
            "Smart pick! Let me confirm — you're after an automatic, correct? That's standard on all our vehicles.",
          ],
          npcZh: "好选择！确认一下——你要自动挡对吧？我们的车默认都是自动挡。",
          task: "确认要自动挡（开不惯手动挡）",
          options: [
            { text: "Yes, automatic please. I'm not used to driving a stick shift.", ok: true,  tip: "stick shift = 手动挡，地道说法" },
            { text: "Automatic? No, I want horse car.",                              ok: false, tip: "确认自动挡：Yes, automatic please" },
            { text: "What is automatic? Car drive me?",                              ok: false, tip: "automatic = 自动挡：Yes, automatic please" },
          ],
          phrase: { en: "Yes, automatic, please.", zh: "是的，自动挡。", note: "automatic 自动挡 / stick shift 或 manual 手动挡" },
        },
        {
          npcLines: [
            "No problem, it's automatic! Now, about insurance — our basic rate doesn't include coverage. Would you like to add full coverage?",
            "Automatic it is! Next up: insurance. The base rate doesn't include it — shall I add full coverage for you?",
            "You're set with automatic! Now, insurance-wise, the basic rate has no coverage. Want me to add full coverage?",
          ],
          npcZh: "没问题，自动挡！接下来是保险——基础价不含保险。要加全险吗？",
          task: "谨慎起见加全险（自驾游不熟悉路况）",
          options: [
            { text: "Yes, I'd like full coverage. I'm not familiar with the roads here.", ok: true,  tip: "I'd like full coverage 买全险 + 给出理由" },
            { text: "Insurance? I never crash. No money waste.",                        ok: false, tip: "异国自驾建议全险：I'd like full coverage" },
            { text: "Full coverage cover what? Everything? Moon also?",                 ok: false, tip: "先拿下基础保障：I'd like full coverage — I'm not familiar with the roads" },
          ],
          phrase: { en: "I'd like full coverage.", zh: "我要全险。", note: "coverage = 保障范围；full coverage 车险全险" },
          adds: [{ emoji: "🛡️", label: "Full coverage", wordId: "rent-coverage" }],
        },
        {
          npcLines: [
            "Smart move for a road trip! I'll need your driver's license and the credit card you booked with.",
            "Good call for unfamiliar roads! May I see your driver's license and the credit card for the booking?",
            "Very wise! Okay — driver's license and booking credit card, please, and we'll get you on the road.",
          ],
          npcZh: "自驾游的聪明选择！我需要你的驾照和预订用的信用卡。",
          task: "出示驾照和信用卡",
          options: [
            { text: "Sure, here's my license and my credit card.", ok: true,  tip: "Here's my... 递证件的万能句" },
            { text: "License at hotel. Hotel far. Wait long.",    ok: false, tip: "证件随身带：Here's my license and credit card" },
            { text: "Take card. No give back. Trust you.",        ok: false, tip: "正常出示即可：Here's my license and my credit card" },
          ],
          phrase: { en: "Here's my license and credit card.", zh: "这是我的驾照和信用卡。", note: "license 驾照 / credit card 信用卡，租车双件套" },
        },
        {
          npcLines: [
            "All processed! I'll put a two-hundred-dollar deposit hold on the card — it's released after you return the car. Just sign the rental contract here.",
            "Everything checks out! There'll be a two-hundred-dollar hold on your card as a deposit — released at drop-off. Sign here on the rental contract, please.",
            "You're approved! A two-hundred-dollar deposit hold goes on the card, released once the car's back. Just sign the contract for me.",
          ],
          npcZh: "都办好了！卡上会有 200 美元押金预授权——还车后解除。在这份租赁合同上签个字。",
          task: "签字前确认押金会退还",
          options: [
            { text: "So the deposit hold is released when I return the car? Okay, signing now.", ok: true,  tip: "签字前确认关键条款，So...? 复述确认" },
            { text: "Two hundred gone forever? Why?",                                            ok: false, tip: "预授权会退还：So the deposit is released when I return the car?" },
            { text: "Sign without reading. Fast good.",                                           ok: false, tip: "大合同先确认条款：So the deposit hold is released when I return?" },
          ],
          phrase: { en: "So ___ is released when I return?", zh: "所以……在我归还时会解除/退还？", note: "deposit hold 押金预授权；release = 解除冻结" },
        },
        {
          npcLines: [
            "Exactly! Your car is in space 23 of the parking lot — here's the key fob. Do you want a quick walk-around inspection?",
            "That's right! Space 23, just across the lot. Key fob's all yours. Would you like a walk-around inspection before you go?",
            "Correct, released at return! You're in space 23. Here's the fob — shall we do a quick walk-around inspection together?",
          ],
          npcZh: "没错！你的车在停车场 23 号位——这是电子钥匙。要快速绕车检查一下吗？",
          task: "接受绕车检查（学验车）",
          options: [
            { text: "Yes, let's do the walk-around. I want to note any scratches before I drive off.", ok: true,  tip: "drive off 开走前 + note any scratches 记录划痕" },
            { text: "Inspection? Car is new. No need look.",                                          ok: false, tip: "验车保护自己：Let's do the walk-around — I want to note any scratches" },
            { text: "Walk around? I walk every day already.",                                         ok: false, tip: "walk-around inspection = 绕车检查：Let's do it" },
          ],
          phrase: { en: "Let's do the walk-around inspection.", zh: "我们来做绕车检查吧。", note: "取车必做！记录旧划痕，还车才不背锅" },
        },
      ],
    },
