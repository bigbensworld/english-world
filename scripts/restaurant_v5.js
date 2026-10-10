// 餐厅 第 5 轮：上错菜投诉（8 步）
{
  id: "v5",
  title: "第 5 次光顾 · 上错菜了怎么办",
  titleEn: "Wrong Dish",
  emoji: "❌",
  desc: "菜上错了？汤里有异物？学会冷静、礼貌地指出问题并争取补偿——投诉也可以很体面。",
  reward: { en: "apology", zh: "你用英文优雅地解决了一场餐厅危机！❌➡️✅" },
  steps: [
    {
      npcLines: [
        "Here's your mushroom soup — enjoy!",
        "One mushroom soup for you. Careful, the bowl is hot!",
        "Soup's up! Mushroom soup, right?",
      ],
      npcZh: "您的蘑菇汤来了——请慢用！",
      task: "指出这不是你点的菜（你点的是海鲜汤）",
      options: [
        { text: "Excuse me, I'm afraid this isn't what I ordered. I asked for the seafood soup.", ok: true,  tip: "I'm afraid... 委婉指出错误，投诉不吵架的标准开场" },
        { text: "Wrong! Soup wrong! Me no order this.",                                          ok: false, tip: "更礼貌：Excuse me, this isn't what I ordered" },
        { text: "What is this? I hate mushrooms, take it back.",                                  ok: false, tip: "先说明事实：I ordered the seafood soup" },
      ],
      phrase: { en: "I'm afraid this isn't what I ordered.", zh: "恐怕这不是我点的菜", note: "I'm afraid + 委婉指出问题，投诉第一句" },
    },
    {
      npcLines: [
        "Oh no, I'm so sorry about that! Let me double-check your order...",
        "You're absolutely right — my apologies! Give me one second to check...",
        "Oh dear, that's my mistake! Sorry about that. Let me verify...",
      ],
      npcZh: "哎呀，非常抱歉！让我核对一下您的订单……",
      task: "理解并等待，主动说明你点的东西",
      options: [
        { text: "No worries. I ordered the seafood soup, not the mushroom one.", ok: true,  tip: "No worries 表大度 + 重复正确订单，高效沟通" },
        { text: "I say already! Seafood! You not listen!",                      ok: false, tip: "保持礼貌：No worries, I ordered the seafood soup" },
        { text: "Hurry up check fast please.",                                   ok: false, tip: "加 No worries 缓和气氛，再说明订单" },
      ],
      phrase: { en: "No worries. I ordered the ___.", zh: "没关系。我点的是……", note: "No worries 大度回应 + 复述正确信息" },
    },
    {
      npcLines: [
        "You're right, it was the seafood soup. I'll take this back and get you the right one right away!",
        "My mistake — seafood soup it is! I'll swap it immediately.",
        "So sorry! Seafood soup, coming right up. This won't take long.",
      ],
      npcZh: "您说得对，是海鲜汤。我马上撤掉这碗，给您换正确的！",
      task: "询问大约要等多久",
      options: [
        { text: "Thank you. How long will it take?", ok: true,  tip: "How long will it take? 询问时长的万能句" },
        { text: "How many time need wait soup?",     ok: false, tip: "说 How long will it take?" },
        { text: "Long time or fast?",                ok: false, tip: "更自然：How long will it take?" },
      ],
      phrase: { en: "How long will it take?", zh: "大概要多久？", note: "任何等待场景都能用的时长问句" },
    },
    {
      npcLines: [
        "About ten minutes, and the soup is on the house for the mix-up. Again, I'm really sorry!",
        "Ten minutes tops — and the soup is free, of course. Our apologies!",
        "Just ten minutes. And don't worry about the bill for it — it's on us. Sorry again!",
      ],
      npcZh: "大约十分钟。给您添麻烦了，这碗汤免费，算我们的。再次抱歉！",
      task: "接受道歉并致谢（on the house = 免费）",
      options: [
        { text: "That's very kind. Thank you for fixing it so quickly!", ok: true,  tip: "接受补偿 + 肯定对方的处理，得体收尾" },
        { text: "Free good. I accept the sorry thing.",                 ok: false, tip: "更自然：That's very kind. Thank you!" },
        { text: "Okay but more free food maybe?",                       ok: false, tip: "适度接受即可：Thank you for fixing it" },
      ],
      phrase: { en: "on the house", zh: "店家免费赠送", note: "餐厅道歉常用的补偿说法，= free, paid by the restaurant" },
    },
    {
      npcLines: [
        "Here's your seafood soup — freshly made! And I brought some extra bread for the wait.",
        "Seafood soup, extra hot! Plus some warm bread to make up for the delay.",
        "One seafood soup! And a little bread on the side — again, our apologies.",
      ],
      npcZh: "您的海鲜汤来了——新鲜出炉！还为您准备了额外的面包，补偿久等。",
      task: "检查无误并表达满意",
      options: [
        { text: "This is exactly what I ordered. Thank you!", ok: true,  tip: "exactly what I ordered 确认无误的地道表达" },
        { text: "Yes this is the correct soup thing.",       ok: false, tip: "说 This is exactly what I ordered" },
        { text: "Soup good now right yes.",                  ok: false, tip: "更自然：This is exactly what I ordered" },
      ],
      phrase: { en: "This is exactly what I ordered.", zh: "这正是我点的", note: "确认正确的标准句，exactly 加强语气" },
      adds: [{ emoji: "🍲", label: "Seafood Soup ✓", wordId: "soup" }],
    },
    {
      npcLines: [
        "Great! Your main course will be out shortly. Is there anything else I can do for you?",
        "Perfect! Your main dish is coming right up. Anything else at all?",
        "Wonderful! The main course is on its way. Can I get you anything in the meantime?",
      ],
      npcZh: "太好了！主菜马上就来。还有其他需要吗？",
      task: "顺便反馈：叉子有点脏，想换一把",
      options: [
        { text: "Actually, could I get a clean fork? This one has a spot on it.", ok: true,  tip: "could I get...? + 具体原因，提出小要求的模板" },
        { text: "Fork dirty. Change fork now.",                                  ok: false, tip: "更礼貌：Could I get a clean fork?" },
        { text: "This fork is bad you gave me dirty one.",                       ok: false, tip: "说明现象即可：This one has a spot on it" },
      ],
      phrase: { en: "Could I get a clean ___?", zh: "能给我换一个干净的……吗？", note: "换餐具/杯子的小请求万能句" },
    },
    {
      npcLines: [
        "Of course! So sorry about that — I'll bring a fresh one immediately.",
        "Absolutely, my apologies! A clean fork, right away.",
        "Yes, of course! Sorry about that, fresh cutlery coming up!",
      ],
      npcZh: "当然！非常抱歉——我马上给您拿一把新的。",
      task: "表示感谢，说明小事一桩",
      options: [
        { text: "Thanks. It's not a big deal — just wanted to let you know.", ok: true,  tip: "not a big deal 轻描淡写，给双方台阶下" },
        { text: "Okay thanks no problem for you.",                          ok: false, tip: "说 It's not a big deal" },
        { text: "Thank you I am very angry but okay.",                       ok: false, tip: "保持轻松：It's not a big deal" },
      ],
      phrase: { en: "It's not a big deal.", zh: "不是什么大事", note: "化解尴尬、表明不计较的常用语" },
    },
    {
      npcLines: [
        "You're very understanding, thank you. Enjoy the rest of your meal!",
        "That's very kind of you. Enjoy your dinner!",
        "Thank you for your patience! Please enjoy your meal.",
      ],
      npcZh: "非常感谢您的理解。请享用您的晚餐！",
      task: "礼貌收尾",
      options: [
        { text: "Thank you. Everyone makes mistakes — the service is still great!", ok: true,  tip: "宽慰对方 + 正面评价，投诉后的完美收尾" },
        { text: "Yes mistake okay bye now.",                                     ok: false, tip: "大度一点：Everyone makes mistakes" },
        { text: "Fine. I still remember the wrong soup.",                        ok: false, tip: "得体收场：The service is still great!" },
      ],
      phrase: { en: "Everyone makes mistakes.", zh: "人人都会犯错", note: "宽慰金句：给对方台阶，也显自己大度" },
    },
  ],
},
