    {
      id: "v2",
      title: "第 2 次光顾 · 寄信与邮票",
      titleEn: "Mailing a Letter",
      emoji: "💌",
      desc: "给爸妈手写一封信。买信封邮票、算邮资、写回信地址、选航空——复古又实用的寄信英语。",
      reward: { en: "stamp", zh: "你亲手寄出了一封国际信件！💌" },
      steps: [
        {
          npcLines: [
            "Welcome back! What brings you in today?",
            "Hey, familiar face! What can I do for you?",
            "Good to see you again! What's on the agenda?",
          ],
          npcZh: "欢迎回来！今天来办什么？",
          task: "说明来意：寄一封信到国外",
          options: [
            { text: "Hi! I'd like to mail a letter overseas.", ok: true,  tip: "mail a letter 寄信；overseas = 到国外" },
            { text: "I want to send paper to other country.",  ok: false, tip: "地道说法：mail a letter overseas" },
            { text: "One letter service please, international size.", ok: false, tip: "简单直接：I'd like to mail a letter overseas" },
          ],
          phrase: { en: "I'd like to mail a letter ___.", zh: "我想寄一封信到……。", note: "overseas / abroad 都表示国外；国际信件常配 airmail" },
        },
        {
          npcLines: [
            "Lovely — a real handwritten letter! Do you have an envelope, or do you need one?",
            "How nice, a paper letter! Got an envelope with you?",
            "Old school — I love it. Do you have your own envelope?",
          ],
          npcZh: "真好——一封真正的手写信！您有信封吗，还是需要一个？",
          task: "购买一个信封",
          options: [
            { text: "I need one, please. How much is the envelope?", ok: true, tip: "How much is...? 问价——小额消费直接礼貌询价" },
            { text: "Give envelope. Free one, I hope.",       ok: false, tip: "礼貌询价：How much is the envelope?" },
            { text: "No envelope. Use your box instead.",     ok: false, tip: "信封单独购买：I need one, please" },
          ],
          phrase: { en: "How much is the ___?", zh: "……多少钱？", note: "最基础的问价句型，任何柜台通用" },
        },
        {
          npcLines: [
            "Fifty cents for the envelope. Do you know how much postage you'll need?",
            "That'll be fifty cents. Now — do you know your postage?",
            "Fifty cents, please. Any idea how much postage this letter needs?",
          ],
          npcZh: "信封五十美分。您知道需要多少邮资吗？",
          task: "不知道邮资，请对方帮忙计算",
          options: [
            { text: "I'm not sure — could you help me figure out the postage?", ok: true, tip: "figure out 搞清楚/算出来——请柜台代算邮资" },
            { text: "You tell me. That is your job.",       ok: false, tip: "礼貌请求：Could you help me figure it out?" },
            { text: "One million stamps please.",           ok: false, tip: "如实说明：I'm not sure, could you help me?" },
          ],
          phrase: { en: "Could you help me figure out ___?", zh: "能帮我算一下……吗？", note: "figure out = 弄明白；邮局/银行/办事窗口万能句" },
        },
        {
          npcLines: [
            "Let me weigh it... One ounce, so that's a dollar twenty in postage for international airmail.",
            "On the scale... one ounce. A dollar twenty for international airmail.",
            "Weighing it now... one ounce even. A dollar twenty to fly it overseas.",
          ],
          npcZh: "我称一下……一盎司，国际航空邮件邮资一美元二十美分。",
          task: "购买邮票，顺便问邮票种类",
          options: [
            { text: "I'll take it. Do you have any special stamps, or just the standard ones?", ok: true, tip: "special stamps 纪念邮票——集邮/寄信文化彩蛋" },
            { text: "One stamp. The cheapest and ugliest one.", ok: false, tip: "可以问问种类：Do you have special stamps?" },
            { text: "Stamps are all the same, aren't they?",    ok: false, tip: "其实有纪念版：special/commemorative stamps" },
          ],
          phrase: { en: "Do you have any ___ stamps?", zh: "有……样的邮票吗？", note: "纪念邮票 = commemorative/special stamps，常比面值更好看" },
        },
        {
          npcLines: [
            "We've got a butterfly series and the standard flag stamps. Which would you like?",
            "Butterfly series or the regular flag stamps — your call!",
            "There's a butterfly series just in, or the classic flags. What'll it be?",
          ],
          npcZh: "我们有蝴蝶系列和标准国旗邮票，您要哪种？",
          task: "选择蝴蝶系列邮票",
          options: [
            { text: "Butterflies, please — they're for my parents, so I want them to look nice.", ok: true, tip: "说明选择理由让表达更自然——寄给爸妈想要好看的邮票" },
            { text: "Butterfly. Fly letter like butterfly flies.",  ok: false, tip: "正常表达理由：they're for my parents" },
            { text: "Whatever sticks the letter down best.",       ok: false, tip: "大方选择：Butterflies, please" },
          ],
          phrase: { en: "They're for my parents.", zh: "这是寄给我父母的。", note: "for + 收件人——寄东西/买礼物时说明用途的高频句" },
        },
        {
          npcLines: [
            "Sweet. Before you seal it — did you write a return address on the back?",
            "Great choice! Quick check: return address on the envelope?",
            "Butterflies coming up. One thing — does the envelope have your return address?",
          ],
          npcZh: "真贴心。封口前——您在背面写回信地址了吗？",
          task: "还没写，询问写在哪里",
          options: [
            { text: "Oh, not yet — where should I put it?", ok: true,  tip: "Where should I put it? 位置确认——回信地址通常在信封背面或左上角" },
            { text: "Return address? Is that my email?",    ok: false, tip: "return address = 回信地址，写在信封上" },
            { text: "No address. It's a mystery letter.",   ok: false, tip: "没回信地址无法退回：Where should I put it?" },
          ],
          phrase: { en: "Where should I put the return address?", zh: "回信地址写在哪里？", note: "return address 寄不出去时退回的地址——国际寄件强烈建议写" },
        },
        {
          npcLines: [
            "Top-left corner on the front, or anywhere on the back is fine. Pen's right there if you need it.",
            "Front top-left or the back — either works. There's a pen on the counter.",
            "Left corner up front, or flip it to the back. Grab that pen!",
          ],
          npcZh: "正面左上角，或者背面任何位置都行。柜台有笔可以用。",
          task: "借笔写好地址，最后确认航空标识",
          options: [
            { text: "Thanks! All done. Should I mark it 'airmail' anywhere?", ok: true, tip: "mark it airmail 标注航空——国际信件贴 AIR MAIL 标更稳妥" },
            { text: "Wrote it. Now throw letter into sky for airmail.", ok: false, tip: "航空件贴标识：Should I mark it 'airmail'?" },
            { text: "Airmail happens automatically, like magic.",  ok: false, tip: "标注 AIR MAIL：Should I mark it anywhere?" },
          ],
          phrase: { en: "Should I mark it ___?", zh: "我需要标注……吗？", note: "mark = 做标记；AIR MAIL 标识让分拣更快" },
        },
        {
          npcLines: [
            "Just drop it in the blue box outside — airmail sticker's already on the stamp. Safe travels to your letter!",
            "The blue collection box out front will do it. Your letter's ready for takeoff!",
            "Blue box, front door. Tell your parents to watch the mailbox!",
          ],
          npcZh: "投到外面的蓝色邮筒就行——航空标识已经在邮票上了。祝您的信一路顺风！",
          task: "完成寄信，感谢道别",
          options: [
            { text: "Will do. Thank you so much for your help!", ok: true,  tip: "Will do. 简洁应允 + 感谢收尾" },
            { text: "OK. Leave now.",                     ok: false, tip: "更礼貌：Will do, thank you so much!" },
            { text: "You should pay me for this letter.", ok: false, tip: "正常道谢：Thanks for your help" },
          ],
          phrase: { en: "Will do. Thanks!", zh: "好的，这就去。谢谢！", note: "Will do = 我会照做的——应允对方指示的口语高频句" },
        },
      ],
    },
