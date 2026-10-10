    {
      id: "v1",
      title: "第 1 次光顾 · 办证与借书",
      titleEn: "Getting a Card & Checking Out",
      emoji: "💳",
      desc: "第一次来图书馆：办借书证、查目录、找书架、自助借书——完整走一遍借书流程。",
      reward: { en: "library card", zh: "你拿到了借书证并借出第一本书！💳" },
      steps: [
        {
          npcLines: [
            "Hi there! Welcome to the library. How can I help you today?",
            "Good afternoon! First time here? What can I do for you?",
            "Hello! Welcome in — what brings you to the library?",
          ],
          npcZh: "您好！欢迎来到图书馆。今天有什么可以帮您？",
          task: "说明来意：办一张借书证",
          options: [
            { text: "Hi! I'd like to get a library card, please.", ok: true,  tip: "I'd like to get a library card 办证标准句；library card 借书证" },
            { text: "I want book permission paper.",               ok: false, tip: "借书证是 library card：I'd like to get a library card" },
            { text: "Give me all the books. For free. Forever.",   ok: false, tip: "先办证：get a library card" },
          ],
          phrase: { en: "I'd like to get a library card.", zh: "我想办一张借书证。", note: "get/apply for a library card 都地道；办证是使用图书馆的第一步" },
        },
        {
          npcLines: [
            "Great choice! Do you have proof of address with you — a bill or a lease?",
            "Perfect! I just need proof of address. A utility bill works.",
            "Wonderful! May I see proof of address, like a bill or lease?",
          ],
          npcZh: "好选择！您带住址证明了吗——账单或租约都行？",
          task: "出示证件并递上",
          options: [
            { text: "Sure, here's my lease and my ID.", ok: true,  tip: "Here's my lease 递证件标准动作；proof of address 住址证明" },
            { text: "Address? I live here. Just look at me.", ok: false, tip: "出示文件：Here's my lease and my ID" },
            { text: "What's a lease? I pay cash for everything.", ok: false, tip: "递上能证明住址的文件：lease / bill / ID" },
          ],
          phrase: { en: "Here's my ___ and my ID.", zh: "这是我的……和身份证件。", note: "办证/办手续万能递件句；Here you are 也可以" },
        },
        {
          npcLines: [
            "All set! Here's your card. You can borrow up to ten items at a time.",
            "You're all set! Ten items at once with this card.",
            "Here you go — one library card! The limit is ten items at a time.",
          ],
          npcZh: "办好了！这是您的卡。一次最多可以借十件。",
          task: "询问借期多长",
          options: [
            { text: "Ten items, great! How long is the loan period?", ok: true, tip: "loan period 借期——借书必问" },
            { text: "Ten? Can I borrow a hundred?", ok: false, tip: "先问借期：How long is the loan period?" },
            { text: "Loan? I will return them never.", ok: false, tip: "礼貌询问借期：How long is the loan period?" },
          ],
          phrase: { en: "How long is the loan period?", zh: "借期是多长时间？", note: "loan /ləʊn/ 在图书馆语境 = 借出、借期" },
        },
        {
          npcLines: [
            "Three weeks, and you can renew twice if no one's waiting. Looking for anything today?",
            "Three weeks with two renewals. Are you after a particular book?",
            "Three weeks, renewable twice. What are you looking for today?",
          ],
          npcZh: "三周，无人预约可续借两次。今天想找什么书吗？",
          task: "说明想找的书：一本小说，忘了书名，记得作者",
          options: [
            { text: "I'm looking for a novel. I forgot the title, but I remember the author.", ok: true, tip: "I forgot the title, but I remember the author 检索信息不全时的标准表达" },
            { text: "A book. A good one. You choose.",  ok: false, tip: "提供线索：title 书名 / author 作者" },
            { text: "The book with the red cover. Famous one.", ok: false, tip: "检索要靠 title 或 author，颜色封面查不到" },
          ],
          phrase: { en: "I'm looking for a book about / by ___.", zh: "我在找一本关于……/……写的书。", note: "look for = 寻找；about 主题 / by 作者，两个检索维度" },
        },
        {
          npcLines: [
            "No problem — let's search the catalog by author... Found it! The call number is FIC C-H-E.",
            "We can do that! Searching by author... There it is. FIC C-H-E, in the fiction stacks.",
            "Easy! The catalog lists it under the author. Call number FIC C-H-E.",
          ],
          npcZh: "没问题——按作者检索目录……找到了！索书号是 FIC C-H-E。",
          task: "确认信息并询问去哪里找",
          options: [
            { text: "Got it, FIC C-H-E. Which floor are the fiction stacks on?", ok: true, tip: "复述 call number 索书号 + 问楼层——找书两步走" },
            { text: "F-C-C? Okay, whatever that means.", ok: false, tip: "复述确认索书号：FIC C-H-E, which floor?" },
            { text: "Just bring me the book. My feet are tired.", ok: false, tip: "自助找书是惯例：Which floor are the stacks on?" },
          ],
          phrase: { en: "Which floor is ___ on?", zh: "……在几楼？", note: "馆藏分区问法：fiction stacks / nonfiction / DVDs 各有楼层" },
        },
        {
          npcLines: [
            "Second floor, past the reading tables. You can check out at the front desk or the self-checkout machine.",
            "Second floor! On your way back, borrow at the desk or the self-checkout machine.",
            "Up one floor. When you're ready, the self-checkout machines are right by the stairs.",
          ],
          npcZh: "二楼，穿过阅读区。可以在服务台或自助借书机办理借出。",
          task: "找到书后去自助机借出（表达求助）",
          options: [
            { text: "Excuse me, how do I use the self-checkout machine?", ok: true, tip: "how do I use... 求助万能句；self-checkout machine 自助借书机" },
            { text: "This machine is broken. It hates me.",  ok: false, tip: "礼貌求助：Excuse me, how do I use this machine?" },
            { text: "I will just take the book home. Trust system.", ok: false, tip: "必须办理借出：How do I use the self-checkout machine?" },
          ],
          phrase: { en: "Excuse me, how do I use this?", zh: "打扰一下，这个怎么用？", note: "对机器/流程不熟时的万能求助句" },
        },
        {
          npcLines: [
            "Easy! Scan your card, then the book's barcode — and done. Due date is printed on the receipt.",
            "Super simple: card first, then the barcode on the back cover. Your receipt shows the due date.",
            "Scan your card, lay the book flat, scan the barcode. The due date prints right out.",
          ],
          npcZh: "很简单！先扫您的卡，再扫书的条码——就好了。收据上印着应还日期。",
          task: "操作成功，确认应还日期",
          options: [
            { text: "All done — due on the 21st. Thanks so much for your help!", ok: true, tip: "复述 due date 应还日期 + 道谢收尾" },
            { text: "Twenty-one? Twenty-one what? Dogs? Years?", ok: false, tip: "确认日期：Due on the 21st, got it" },
            { text: "Receipt goes in the trash. Bye machine.",   ok: false, tip: "收据记日期：Thanks so much for your help!" },
          ],
          phrase: { en: "When is it due back?", zh: "这本书应该什么时候还？", note: "due = 到期应还；借书核心三问之一" },
        },
      ],
    },
