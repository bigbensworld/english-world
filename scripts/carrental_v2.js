    {
      id: "v2",
      title: "第 2 次光顾 · 绕车验车",
      titleEn: "The Walk-Around",
      emoji: "🔍",
      desc: "和工作人员一起绕车检查：划痕、凹痕、油量、里程数。逐项记录在验车单上，保护自己。",
      reward: { en: "scratch", zh: "你完成了一次专业的英文验车！🔍" },
      steps: [
        {
          npcLines: [
            "Okay, here's your car! Let's start at the front. Do you see any damage on the bumper?",
            "Alright, this one's yours! Starting at the front end — anything you notice on the bumper?",
            "Here we are! Let's begin up front. Spot anything on the bumper — dings, scratches, anything?",
          ],
          npcZh: "好了，这是你的车！从前脸开始。保险杠上有什么损伤吗？",
          task: "指出保险杠上有一处旧划痕",
          options: [
            { text: "Yes — there's a scratch on the bumper, on the left side. Should we note that down?", ok: true,  tip: "指出位置 + note it down 记录在案" },
            { text: "Bumper has scratch. You fix now. I wait.",                                          ok: false, tip: "记录即可：There's a scratch on the left side — should we note that down?" },
            { text: "Scratch? Where? I see nothing ever.",                                               ok: false, tip: "看到就说：There's a scratch on the bumper, on the left side" },
          ],
          phrase: { en: "There's a scratch on the ___.", zh: "……上有一道划痕。", note: "验车报告句式；scratch 划痕 / dent 凹痕" },
        },
        {
          npcLines: [
            "Good eye! Noting it now — scratch on the front bumper, left side. Let's check the mileage together, shall we?",
            "Sharp eyes! Writing it down: front bumper scratch, left side. Now, mileage check — come look at this.",
            "Nice catch! Logged: scratch, front bumper, left. Next up — let's verify the mileage together.",
          ],
          npcZh: "好眼力！记下了——前保险杠左侧划痕。接下来一起核对里程数好吗？",
          task: "一起确认里程数并记录",
          options: [
            { text: "Sure. It shows 12,450 miles — let's both note that on the form.", ok: true,  tip: "It shows ___ 报读数 + note it on the form" },
            { text: "Mileage is number. Number good number.",                          ok: false, tip: "读数并记录：It shows 12,450 miles — note that on the form" },
            { text: "Why check mileage? Car is car.",                                   ok: false, tip: "里程数是还车结算依据：It shows 12,450 miles" },
          ],
          phrase: { en: "It shows 12,450 miles.", zh: "显示 12,450 英里。", note: "mileage 里程数；还车按里程结算，务必记录" },
        },
        {
          npcLines: [
            "12,450, noted! Now the fuel — the tank should be full when you drive off. Can you confirm the fuel gauge shows full?",
            "12,450 on the form! Fuel next — you should leave with a full tank. Does the fuel gauge read full?",
            "Got it, 12,450! Now, fuel level — policy is full-to-full. Can you check that the gauge shows full?",
          ],
          npcZh: "12,450，记下了！然后是油量——开出停车场时油箱应该是满的。确认油表显示满格吗？",
          task: "确认油表满格",
          options: [
            { text: "Yes, the fuel gauge shows full. Good to go!", ok: true,  tip: "fuel gauge 油表 + Good to go 万能确认" },
            { text: "Fuel is half. Half is full enough.",         ok: false, tip: "取车应满油：The fuel gauge shows full" },
            { text: "Gauge? What is gauge? Gauze?",               ok: false, tip: "fuel gauge = 油表：The fuel gauge shows full" },
          ],
          phrase: { en: "The fuel gauge shows full.", zh: "油表显示满格。", note: "full-to-full 满油取满油还，租车行规" },
        },
        {
          npcLines: [
            "Full tank confirmed! Last thing — inside the car. Take a look around: any stains, tears, or anything broken?",
            "Fuel's full, we're golden! Final check — the interior. Give it a once-over: stains, tears, anything broken?",
            "Full and noted! One last thing — check inside the car. Any stains on the seats, rips, broken bits?",
          ],
          npcZh: "满油确认！最后一项——车内。环顾一下：有污渍、破损或坏的地方吗？",
          task: "发现后座有污渍，报告并记录",
          options: [
            { text: "There's a small stain on the back seat. Let's add that to the form too.", ok: true,  tip: "发现问题立刻上报，和划痕一样记录在案" },
            { text: "Stain? I will clean later. My problem now.",                             ok: false, tip: "记录在案才免责：There's a stain on the back seat — add that to the form" },
            { text: "Inside perfect. I close eyes, see nothing.",                             ok: false, tip: "如实上报：There's a small stain on the back seat" },
          ],
          phrase: { en: "Let's add that to the form.", zh: "把这个也记到单子上。", note: "验车记录句；先记录后开车，免责靠它" },
        },
        {
          npcLines: [
            "Added! You're all set — the form matches the car exactly. Here's your copy. The car's yours for three days!",
            "On the form it goes! Perfect — everything matches. Here's your copy of the inspection sheet. Enjoy the next three days!",
            "Noted down! You and the car are officially in sync. Your copy of the form — and the open road for three days!",
          ],
          npcZh: "已加！都办妥了——单子和车况完全一致。这是你的那份。这车归你三天！",
          task: "收好验车单，出发前最后确认 GPS",
          options: [
            { text: "Thanks! One more thing — does the car have a GPS built in?", ok: true,  tip: "One more thing 追加提问 + built in 内置" },
            { text: "GPS? I use stars to navigate. Natural way.",                ok: false, tip: "问导航：Does the car have a GPS built in?" },
            { text: "Form go in trash now. Paper useless.",                      ok: false, tip: "验车单要保存好，然后问：Does the car have a GPS?" },
          ],
          phrase: { en: "Does the car have a GPS built in?", zh: "车里有内置导航吗？", note: "built in 内置；自驾前确认导航很重要" },
        },
        {
          npcLines: [
            "It does — the GPS is already in the car, English and voice guidance. Have a great trip, and drive safe!",
            "Built-in GPS, all set to go — voice guidance included! Have an amazing trip and stay safe out there!",
            "Yes ma'am/sir — GPS on board with voice guidance! Wonderful travels, and safe driving!",
          ],
          npcZh: "有——导航已经在车里了，英文语音引导。旅途愉快，注意驾驶安全！",
          task: "道谢出发",
          options: [
            { text: "Perfect. Thank you for the thorough inspection — see you in three days!", ok: true,  tip: "thorough 周到的 + 预告还车时间" },
            { text: "Three days? I keep car month. Surprise!",                                ok: false, tip: "确认租期即可：See you in three days!" },
            { text: "Drive safe? You drive. I sit.",                                          ok: false, tip: "礼貌收尾：Thank you — see you in three days!" },
          ],
          phrase: { en: "See you in three days!", zh: "三天后见！", note: "取车收尾 + 预告还车，店员会记住你" },
        },
      ],
    },
