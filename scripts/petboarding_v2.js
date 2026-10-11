    {
      id: "v2",
      title: "第 2 次光顾 · 出差寄养",
      titleEn: "Boarding for a Trip",
      emoji: "🏡",
      desc: "要出差五天，狗狗得寄养过夜！选房型、安顿安抚物、了解作息——出远门前的托付课。",
      reward: { en: "boarding", zh: "毛孩子安顿好了，出差无忧！🏡" },
      steps: [
        {
          npcLines: [
            "Mochi's favorite person! What's up — daycare day, or something more?",
            "Well if it isn't Mochi's human! Regular daycare, or special occasion today?",
            "Hello! Mochi's staff awaits orders! Standard play day, or something bigger?",
          ],
          npcZh: "Mochi 最爱的人！今天怎么了——普通日托，还是别的？",
          task: "说明要出差五天需要寄养",
          options: [
            { text: "Something more — I have a business trip for five days. I need overnight boarding for Mochi.", ok: true,  tip: "overnight boarding 过夜寄养——出差的刚需" },
            { text: "Five days gone! Dog hotel time! Mochi vacation matching my vacation!",                        ok: false, tip: "正式需求：I need overnight boarding for five days" },
            { text: "Trip! Sad parent! Guilt trip! Also actual trip. Boarding please.",                            ok: false, tip: "明确需求：I need overnight boarding for five days" },
          ],
          phrase: { en: "I need overnight boarding.", zh: "我需要过夜寄养。", note: "boarding 寄宿；overnight 强调过夜" },
        },
        {
          npcLines: [
            "Five days of slumber parties — Mochi's in luck! We have two options: the standard kennel at forty a night, or the luxury suite at sixty-five with webcam access.",
            "Five-night pajama party for Mochi! Room choices: standard kennel, forty a night. Or the luxury suite — sixty-five, webcam included!",
            "A five-day sleepover — his dreams came true! Standard kennel runs forty nightly; the luxury suite is sixty-five with a private webcam feed!",
          ],
          npcZh: "五天的睡衣派对——Mochi 走运了！两种房型：标准犬舍每晚 40，豪华套房 65 含远程监控。",
          task: "算账后选豪华套房（五天差价 125 换安心）",
          options: [
            { text: "The webcam access decides it — five days without him is long enough. Luxury suite, please.", ok: true,  tip: "The webcam decides it 监控决定一切——为情绪价值付费" },
            { text: "Luxury! Dog royalty! Suite life! Cash poor now! Worth it!",                                  ok: false, tip: "理性决策：The webcam access decides it — luxury suite, please" },
            { text: "Standard kennel. I am strong. No webcam. No crying. (Webcam?)",                             ok: false, tip: "为安心买单：Luxury suite with webcam, please" },
          ],
          phrase: { en: "___ decides it.", zh: "……决定了选择。", note: "A decides it = A 是决定性因素；消费决策的简练表达" },
          adds: [{ emoji: "📹", label: "Suite + cam", wordId: "pb-suite" }],
        },
        {
          npcLines: [
            "Suite booked! For overnight guests, we suggest a comfort item from home — a blanket or toy with your scent. It eases nighttime settling.",
            "Suite secured! Overnight tip from us: bring a comfort item — blanket, toy, anything smelling like you. Night one goes smoother!",
            "The suite is his! Pro tip for boarders: a comfort item with your scent. First nights can be wobbly — your smell steadies them!",
          ],
          npcZh: "套房订好！过夜寄养建议带一件家里的安抚物——有你的气味的毯子或玩具，晚上更容易入睡。",
          task: "拿出准备好的旧毯子",
          options: [
            { text: "Great minds — I brought his favorite blanket. It's seen better days, but it smells like home.", ok: true,  tip: "seen better days 已经旧了——含蓄描述旧物" },
            { text: "Blanket here! Old blanket! Smell blanket! Everyone smell blanket!",                            ok: false, tip: "自然交付：I brought his favorite blanket — it smells like home" },
            { text: "New blanket bought! Plastic smell! Factory fresh! Dog loves plastic!",                        ok: false, tip: "气味才是关键：It's old, but it smells like home" },
          ],
          phrase: { en: "It's seen better days.", zh: "它已经旧了。", note: "see better days 曾经风光；描述旧物的幽默说法" },
        },
        {
          npcLines: [
            "The well-loved blanket — perfect! What's his bedtime routine like at home? We try to mirror it.",
            "A properly loved blanket — ideal! Tell us his home bedtime routine — we copy it as closely as we can.",
            "Well-worn and wonderful! Now, his bedtime ritual at home? We do our best mirror impression!",
          ],
          npcZh: "这条被爱过的毯子——完美！他家里的睡前流程是什么样的？我们尽量照做。",
          task: "描述睡前习惯（摸肚子+说晚安）",
          options: [
            { text: "He needs a belly rub and to hear 'good night, buddy' before sleep. Silly, but it's his ritual.", ok: true,  tip: "ritual 仪式感——睡前流程的准确用词" },
            { text: "Belly rub! Magic belly! Rub the belly! Sleep comes! Also say words to dog!",                     ok: false, tip: "温馨描述：A belly rub and hearing 'good night, buddy'" },
            { text: "No routine. Dog is machine. Sleep mode activated automatically. Robot dog.",                    ok: false, tip: "分享仪式：His ritual is a belly rub and 'good night, buddy'" },
          ],
          phrase: { en: "It's his ritual.", zh: "这是他的仪式。", note: "ritual 仪式/惯例；宠物习惯的温馨说法" },
        },
        {
          npcLines: [
            "Belly rubs and good nights — we can absolutely deliver that! Maria's his handler this week, and she's a professional belly-rubber. One more thing: meal schedule?",
            "Belly rub plus good night, coming up! Maria the handler — certified belly-rub specialist — has him all week! Last detail: his meal schedule?",
            "Consider it done — Maria's on belly duty all week! Final logistics: feeding times and portions?",
          ],
          npcZh: "摸肚子和道晚安——完全办得到！Maria 这周负责他，她是专业摸肚师。还有：喂食时间怎么安排？",
          task: "交代喂食细节并请教每日报告",
          options: [
            { text: "Breakfast at seven, dinner at six, salmon food only. And will I get daily updates while I'm away?", ok: true,  tip: "喂食细节 + daily updates 日常报告——出差家长的安心来源" },
            { text: "Food times! Food types! Fish only! Also spam me dog photos constantly!",                            ok: false, tip: "细节+询问：Salmon food only — will I get daily updates?" },
            { text: "He grazes all day. Free range dog. Buffet lifestyle. No schedule.",                                ok: false, tip: "明确喂食：Breakfast at seven, dinner at six — will I get updates?" },
          ],
          phrase: { en: "Will I get daily updates?", zh: "我每天能收到近况吗？", note: "daily update/report 每日报告；寄养服务的核心权益" },
        },
        {
          npcLines: [
            "Daily report with photos, playgroup notes, and — in Mochi's case — a rating of how many belly rubs he demanded! Have a safe trip!",
            "Photos, play notes, and a special belly-rub counter for Mochi's reports! Travel safe — he's family here!",
            "Report includes photos, playgroup highlights, and Mochi's personal belly-rub tally! Bon voyage!",
          ],
          npcZh: "每日报告含照片、玩耍记录，Mochi 的话还有摸肚子需求量统计！一路平安！",
          task: "安心道别",
          options: [
            { text: "A belly-rub counter — that's the customer service I didn't know I needed. Thank you, see you in five days!", ok: true,  tip: "I didn't know I needed 意外惊喜的惊喜" },
            { text: "Rub counter! Data! Dog analytics! Business metrics! Beautiful!",                                             ok: false, tip: "真诚致谢：See you in five days!" },
            { text: "Five days. So long. Dog time and human time different. Dog years. Sad math.",                                ok: false, tip: "幽默收尾：See you in five days!" },
          ],
          phrase: { en: "See you in five days.", zh: "五天后见。", note: "寄养交接的道别；数字+名词的简洁告别" },
        },
      ],
    },
