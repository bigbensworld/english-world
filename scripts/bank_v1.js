  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 开户",
      titleEn: "Opening an Account",
      emoji: "🧾",
      desc: "刚到这个城市，需要一个银行账户。选账户类型、交证件、设密码、拿借记卡——全流程英文开户。",
      reward: { en: "account", zh: "你用英文开好了自己的银行账户！🏦" },
      steps: [
        {
          npcLines: [
            "Good morning! Welcome to First City Bank. What can I do for you today?",
            "Hi there! Welcome in. How may I help you?",
            "Good morning! You look like you have a mission — what can I do for you?",
          ],
          npcZh: "早上好！欢迎来到第一城市银行。今天有什么可以帮您？",
          task: "说明来意：开一个账户",
          options: [
            { text: "Hi! I'd like to open a checking account, please.", ok: true,  tip: "I'd like to open an account 开户标准句；checking account 活期账户" },
            { text: "I want bank. Give me bank account thing.",        ok: false, tip: "说 I'd like to open a checking account" },
            { text: "Account! Me! New! Now!",                          ok: false, tip: "礼貌完整：I'd like to open an account, please" },
          ],
          phrase: { en: "I'd like to open a(n) ___ account.", zh: "我想开一个……账户。", note: "checking 活期（日常消费）/ savings 储蓄（存钱生息）" },
        },
        {
          npcLines: [
            "Great choice! May I see your passport and a second form of ID?",
            "Perfect. I'll need your passport, plus one more ID — a student card works.",
            "Sure thing! Passport and one other form of ID, please.",
          ],
          npcZh: "好选择！请出示您的护照和第二种身份证件。",
          task: "递上护照，说明没带第二种证件",
          options: [
            { text: "Here's my passport. I'm afraid I don't have a second ID on me — is that a problem?", ok: true, tip: "Here's my passport 递证件 + I'm afraid... 委婉说明 + Is that a problem? 礼貌询问" },
            { text: "Passport here. No other paper. Deal with it.",   ok: false, tip: "委婉表达：I'm afraid I don't have a second ID on me" },
            { text: "Why two IDs? One ID enough in my country.",      ok: false, tip: "入乡随俗，先说明情况：Is that a problem?" },
          ],
          phrase: { en: "I'm afraid I don't have ___ on me.", zh: "恐怕我没带……在身上。", note: "on me = 随身携带；委婉承认没带某物" },
        },
        {
          npcLines: [
            "No problem at all — your passport will do for today, just bring the second one later. Now, would you also like a savings account?",
            "That's fine! Passport alone works for now. Say — want a savings account to go with it?",
            "Not an issue! We can start with the passport. Quick question: any interest in a savings account too?",
          ],
          npcZh: "完全没问题——今天护照就行，第二种证件之后补上。对了，您还需要一个储蓄账户吗？",
          task: "接受捆绑建议，同时问清有没有费用",
          options: [
            { text: "Sure, that sounds useful. Are there any monthly fees I should know about?", ok: true,  tip: "Are there any fees? 问费用——开户必问" },
            { text: "Yes yes whatever, next question fast.",         ok: false, tip: "接受前问清条件：Are there any monthly fees?" },
            { text: "Fees? Nobody mentioned fees! This is a trap!",  ok: false, tip: "冷静核实：Are there any monthly fees I should know about?" },
          ],
          phrase: { en: "Are there any fees I should know about?", zh: "有什么我该知道的手续费吗？", note: "礼貌挖坑式提问：让对方主动交代所有费用" },
        },
        {
          npcLines: [
            "Good news — no monthly fee for students! Now, please choose a four-digit PIN for your debit card.",
            "You're in luck — the student account is free! Time to pick a four-digit PIN.",
            "No fees for you! Last step before the card: choose a four-digit PIN.",
          ],
          npcZh: "好消息——学生账户免月费！现在请为您的借记卡设置一个四位密码。",
          task: "在密码键盘上设置密码",
          options: [
            { text: "Got it — a four-digit PIN. Should I just type it in on the keypad?", ok: true,  tip: "type it in on the keypad 在键盘上输入 + PIN = Personal Identification Number" },
            { text: "Here is my password: one two three four.",       ok: false, tip: "密码不能口头说出：在键盘上静默输入" },
            { text: "I tell you number, you type it for me.",        ok: false, tip: "密码必须本人输入：on the keypad" },
          ],
          phrase: { en: "a four-digit PIN", zh: "四位密码", note: "digit = 数字；银行场景高频：四位数密码" },
        },
        {
          npcLines: [
            "Perfect, your card is ready! It'll arrive by mail in about a week. Would you like online banking too?",
            "All set! The card comes in the mail within seven days. How about online banking — want me to set that up?",
            "Done! Expect the card in your mailbox in a week. Shall I activate online banking for you as well?",
          ],
          npcZh: "完美，卡片办好！一周左右邮寄到您家。需要开通网上银行吗？",
          task: "同意开通，并询问如何查余额",
          options: [
            { text: "Yes, please! And how can I check my balance — is there an app for that?", ok: true, tip: "check my balance 查余额 + Is there an app? 问工具" },
            { text: "Online banking yes. Money see where? Tell me.",  ok: false, tip: "问余额：How can I check my balance?" },
            { text: "No app. I will come to bank every day to ask.", ok: false, tip: "更高效：Is there an app for that?" },
          ],
          phrase: { en: "How can I check my balance?", zh: "我怎么查余额？", note: "balance = 账户余额；ATM/柜员/APP 都能查" },
        },
        {
          npcLines: [
            "Absolutely — everything's in the app: balance, statements, transfers. Here's your welcome packet. Welcome to First City Bank!",
            "Of course! The app does it all — balances, transfers, even deposits. Here's your paperwork. Welcome aboard!",
            "You bet! Balance, transfer, pay bills — all in the app. Welcome to the family!",
          ],
          npcZh: "当然——APP 里什么都有：余额、流水、转账。这是您的欢迎资料包。欢迎加入第一城市银行！",
          task: "感谢柜员，完成开户",
          options: [
            { text: "That's very convenient! Thank you so much for your help — have a great day!", ok: true, tip: "That's very convenient + Thank you so much 圆满收尾" },
            { text: "OK bye.",                                       ok: false, tip: "完整致谢：Thank you so much for your help!" },
            { text: "Finally! That took forever, goodbye.",           ok: false, tip: "礼貌收尾：Have a great day!" },
          ],
          phrase: { en: "Thank you for your help!", zh: "谢谢你的帮助！", note: "业务办完的万能收尾句" },
        },
      ],
    },
