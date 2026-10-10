    {
      id: "v3",
      title: "第 3 次光顾 · 取件与查询",
      titleEn: "Picking Up & Tracking",
      emoji: "📮",
      desc: "收到取件通知单，来邮局取一个包裹，再顺手查另一个包裹的物流。取件、核对、签收全流程。",
      reward: { en: "pick up", zh: "你用英文顺利取到了包裹！📮" },
      steps: [
        {
          npcLines: [
            "Good morning! What can I do for you?",
            "Hi there! How can I help today?",
            "Hello! What brings you in?",
          ],
          npcZh: "早上好！有什么可以帮您？",
          task: "说明来意：凭取件通知单取包裹",
          options: [
            { text: "Hi! I got a delivery notice — I'm here to pick up a package.", ok: true, tip: "delivery notice 取件通知单 + pick up 取件——取件双关键词" },
            { text: "Package! Give me my package now.",      ok: false, tip: "说明凭据：I got a delivery notice, I'm here to pick up a package" },
            { text: "The mailman kidnapped my box. Rescue it.", ok: false, tip: "正常表述：I'm here to pick up a package" },
          ],
          phrase: { en: "I'm here to pick up ___.", zh: "我来取……。", note: "pick up = 取走；也可取快递、取票、取洗好的衣服" },
        },
        {
          npcLines: [
            "Sure! Do you have the notice with you?",
            "Of course — got the notice handy?",
            "No problem. May I have your delivery notice?",
          ],
          npcZh: "好的！通知单带了吗？",
          task: "递上通知单和证件",
          options: [
            { text: "Here's the notice, and here's my ID.", ok: true,  tip: "Here's... 递物万能句——取件通常通知单+证件一起给" },
            { text: "No paper. But I am the package owner.", ok: false, tip: "取件要凭证：Here's the notice and my ID" },
            { text: "Take my face as my ID.",               ok: false, tip: "出示证件：Here's my ID" },
          ],
          phrase: { en: "Here's my ID.", zh: "这是我的证件。", note: "Here's/Here are... 递东西标准句；ID = 身份证件" },
        },
        {
          npcLines: [
            "Perfect, let me check the back... Yes, we have a package under your name. One moment.",
            "Everything checks out! There's a box waiting for you. I'll grab it.",
            "Found you in the system! One package, held at the counter. Be right back.",
          ],
          npcZh: "没问题，我查一下后面……有的，有一个以您姓名留存的包裹。稍等。",
          task: "等待时确认柜台取件的存放时长",
          options: [
            { text: "Great! Just out of curiosity — how long do you hold packages here?", ok: true, tip: "hold = 暂存；how long do you hold... 问存放期限——晚取会被退回" },
            { text: "Hurry up, I have no time for waiting.",  ok: false, tip: "取件窗口耐心等待，可顺便问：How long do you hold packages?" },
            { text: "How many years can it stay here?",       ok: false, tip: "问期限：How long do you hold packages?" },
          ],
          phrase: { en: "How long do you hold ___?", zh: "……可以存放多久？", note: "hold 暂存；包裹通常存 15 天左右，逾期退回" },
        },
        {
          npcLines: [
            "Fifteen days, then it goes back to the sender. Here's your package — just need your signature.",
            "Two weeks is the limit. Found it! Sign right here for me, please.",
            "We keep them fifteen days. And... here it is! Just sign on the line.",
          ],
          npcZh: "十五天，之后退回寄件人。您的包裹来了——请签个名。",
          task: "签收前先检查包裹是否完好",
          options: [
            { text: "Before I sign — could I check if the package is intact?", ok: true, tip: "intact 完好无损；签收前验货是正当权利" },
            { text: "Sign first, think later. Always.",  ok: false, tip: "先验后签：Could I check if it's intact?" },
            { text: "No sign. Signature is for lawyers only.", ok: false, tip: "签收确认：Could I check it first, then sign?" },
          ],
          phrase: { en: "Before I sign, could I check ___?", zh: "签字前我能先检查一下……吗？", note: "Before I sign... 先验后签——收贵重/易碎品的自我保护句" },
        },
        {
          npcLines: [
            "Of course — give it a once-over. All good? Then just sign and print your name here.",
            "Go right ahead! Looks fine? Sign on the bottom line, and print your name next to it.",
            "Absolutely, take a look. Happy with it? I just need your signature, and your name in print.",
          ],
          npcZh: "当然——您检查一下。没问题的话在这里签名，旁边再正楷写一遍姓名。",
          task: "签名并用正楷写出姓名",
          options: [
            { text: "Looks good. Signed and printed — like this?", ok: true, tip: "print (your name) = 用印刷体正楷书写（非打印）——美国签字文化" },
            { text: "I signed. My name is printed on my face.",    ok: false, tip: "print your name = 正楷誊写姓名" },
            { text: "Why write name two times? One time enough.",  ok: false, tip: "签名+正楷姓名是惯例：signed and printed" },
          ],
          phrase: { en: "Sign here and print your name.", zh: "这里签名，并在旁边正楷写姓名。", note: "print = 工整手写（非连笔）；官方表格标准要求" },
        },
        {
          npcLines: [
            "Perfect, all done! Anything else for you today?",
            "You're all set! Anything else I can help with?",
            "That does it! One more thing before you go?",
          ],
          npcZh: "完美，办好了！今天还有其他事吗？",
          task: "顺便查询另一个包裹的物流",
          options: [
            { text: "Actually yes — could you check the status of another package for me?", ok: true, tip: "check the status 查状态/进度——查物流标准句" },
            { text: "Yes. Find my other package too. It is lost, probably.", ok: false, tip: "先查状态再下结论：Could you check its status?" },
            { text: "No. Actually yes. Actually no. Bye.",       ok: false, tip: "说明需求：Could you check another package's status?" },
          ],
          phrase: { en: "Could you check the status of ___?", zh: "能帮我查一下……的状态吗？", note: "status /ˈsteɪtəs/ 状态；查物流也常说 track a package" },
        },
        {
          npcLines: [
            "Sure, do you have the tracking number handy?",
            "No problem! Tracking number, please?",
            "Happy to! Just need that tracking number.",
          ],
          npcZh: "好的，您手边有追踪单号吗？",
          task: "报出追踪单号",
          options: [
            { text: "Yes, let me read it out: 9-4-0-7-1... and the ZIP is 10001.", ok: true, tip: "read it out 读出来——数字逐位报，单号+邮编一起给" },
            { text: "The number is... some numbers. Many numbers.", ok: false, tip: "准确逐位报出：Let me read it out" },
            { text: "Tracking number is written on the package you just gave me.", ok: false, tip: "查件通常查另一个：准确报出单号" },
          ],
          phrase: { en: "Let me read it out.", zh: "我念出来。", note: "read out = 读出来；报单号/电话/账号逐位念，避免听错" },
        },
        {
          npcLines: [
            "Let's see... it says 'out for delivery' — you should get it today before six.",
            "Good news — it's on the truck! Delivery by six p.m. today.",
            "Tracking says out for delivery. Keep an ear out for the doorbell!",
          ],
          npcZh: "我看一下……显示『派送中』——今天六点前应该能送到。",
          task: "确认理解并感谢",
          options: [
            { text: "Out for delivery today — got it. Thanks so much for checking!", ok: true, tip: "复述确认 + 感谢——out for delivery = 派送中" },
            { text: "Out for... what? Explain every word.",  ok: false, tip: "复述确认即可：Out for delivery today, got it" },
            { text: "Six o'clock. I will wait forever until then.", ok: false, tip: "自然收尾：Thanks so much for checking!" },
          ],
          phrase: { en: "It's out for delivery.", zh: "包裹正在派送中。", note: "物流状态高频词：out for delivery = 已装车派送，当日可达" },
        },
      ],
    },
  ],
},
