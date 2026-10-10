// 英语世界 - 慢速生活频道（Slow Vlog）数据
// 借鉴 TikTok 慢 vlog：拿起一样东西/做一个动作 + 慢速英语讲解
// 每张卡：emoji 舞台 + 动作动词（教学重点）+ 慢速朗读 + 中文（默认折叠）
// media 字段预留升级接口：emoji（默认）/ image / video
const VLOGS = [
  {
    id: "morning",
    title: "Morning Routine",
    titleZh: "早晨的一小时",
    emoji: "🌅",
    desc: "从闹钟响到出门——一天中动作动词最密集的时刻。",
    linkedScene: "cafe",
    cards: [
      {
        emoji: "⏰", anim: "ring",
        en: "This is my alarm clock. It's seven in the morning. Time to wake up!",
        zh: "这是我的闹钟。早上七点了。该起床啦！",
        words: ["alarm clock", "wake up"],
      },
      {
        emoji: "🪟", anim: "curtain",
        en: "I open the curtains. Look — the sun is coming up. What a beautiful morning!",
        zh: "我拉开窗帘。看——太阳升起来了。多美的早晨！",
        words: ["open", "curtain"],
      },
      {
        emoji: "🪥", anim: "brush",
        en: "Now I brush my teeth. I squeeze a little toothpaste onto my brush.",
        zh: "现在我刷牙。往牙刷上挤一点牙膏。",
        words: ["brush", "squeeze", "toothpaste"],
      },
      {
        emoji: "🍞", anim: "toast",
        en: "Time for breakfast! I put two slices of bread into the toaster.",
        zh: "早餐时间！我放两片面包进烤面包机。",
        words: ["slice", "toaster"],
      },
      {
        emoji: "☕", anim: "pour",
        en: "Then I pour myself a cup of coffee. The smell wakes me up better than the alarm!",
        zh: "然后给自己倒一杯咖啡。咖啡的香味比闹钟更能叫醒我！",
        words: ["pour", "cup"],
      },
      {
        emoji: "🧥", anim: "wear",
        en: "I put on my jacket and grab my keys. Almost ready to go!",
        zh: "我穿上外套，拿上钥匙。差不多可以出门了！",
        words: ["put on", "grab"],
      },
      {
        emoji: "👟", anim: "step",
        en: "Last step — I put on my shoes and step outside. Have a great day!",
        zh: "最后一步——穿上鞋子，走出门。祝今天愉快！",
        words: ["step outside"],
      },
      {
        type: "fun-fact", emoji: "💡",
        en: "Fun fact! If someone is grumpy in the morning, you can say they 'woke up on the wrong side of the bed'!",
        zh: "冷知识！如果有人早上脾气不好，可以说他 woke up on the wrong side of the bed（从床的错误一侧醒来）！",
        words: ["grumpy"],
      },
    ],
  },
  {
    id: "cooking",
    title: "Cooking Breakfast",
    titleZh: "做一份早餐",
    emoji: "🍳",
    desc: "打蛋、搅拌、煎、翻面——厨房是最棒的英语教室。",
    linkedScene: "restaurant",
    cards: [
      {
        emoji: "🥚", anim: "crack",
        en: "First, I crack two eggs into a bowl. Careful — don't get any shells in!",
        zh: "首先，我往碗里打两个鸡蛋。小心——别把蛋壳弄进去！",
        words: ["crack", "bowl", "shell"],
      },
      {
        emoji: "🥄", anim: "stir",
        en: "I stir the eggs with a fork. Round and round, until they're all yellow.",
        zh: "我用叉子搅拌鸡蛋。一圈一圈，直到完全变成黄色。",
        words: ["stir", "fork"],
      },
      {
        emoji: "🍳", anim: "heat",
        en: "Now I heat up the pan and add a little butter. Listen — it sizzles!",
        zh: "现在我把锅烧热，加一点黄油。听——滋滋响！",
        words: ["heat up", "pan", "sizzle"],
      },
      {
        emoji: "🫗", anim: "pour",
        en: "I pour the eggs into the pan. Watch them turn from liquid to solid. It's like magic!",
        zh: "我把蛋液倒进锅里。看它从液体变成固体。像魔法一样！",
        words: ["liquid", "solid"],
      },
      {
        emoji: "🍳", anim: "flip",
        en: "Time to flip! I flip the omelette like a chef. Okay... almost like a chef.",
        zh: "翻面的时间到了！我像大厨一样翻蛋。好吧……差不多像大厨。",
        words: ["flip", "omelette"],
      },
      {
        emoji: "🥓", anim: "fry",
        en: "The bacon is frying too. It gets crispy and the whole kitchen smells amazing.",
        zh: "培根也在煎。变得脆脆的，整个厨房都是香味。",
        words: ["crispy", "bacon"],
      },
      {
        emoji: "🍽️", anim: "plate",
        en: "Everything is ready! I plate the eggs and bacon. Breakfast is served!",
        zh: "都好了！我把鸡蛋和培根装盘。早餐上桌！",
        words: ["plate"],
      },
      {
        type: "fun-fact", emoji: "💡",
        en: "Fun fact! Chefs say 'mise en place' — a French phrase that means 'everything in its place' before you start cooking!",
        zh: "冷知识！大厨会说 mise en place——法语短语，意思是下厨前\"一切就位\"！",
        words: ["mise en place"],
      },
    ],
  },
  {
    id: "coffee",
    title: "Making Coffee",
    titleZh: "手冲一杯咖啡",
    emoji: "☕",
    desc: "磨豆、烧水、绕圈注水——和咖啡店场景联动的输入训练。",
    linkedScene: "cafe",
    cards: [
      {
        emoji: "🫘", anim: "grind",
        en: "These are coffee beans. I grind them into powder. The fresh smell is the best part!",
        zh: "这些是咖啡豆。我把它们磨成粉。新鲜的香味是最棒的部分！",
        words: ["coffee bean", "grind"],
      },
      {
        emoji: "🫖", anim: "boil",
        en: "While the beans grind, I boil some water. Not too hot — just below boiling.",
        zh: "磨豆的同时我烧一些水。不能太烫——略低于沸点。",
        words: ["boil", "below"],
      },
      {
        emoji: "☕", anim: "place",
        en: "I place a paper filter in the dripper and rinse it with hot water.",
        zh: "我在滤杯里放一张滤纸，用热水润湿它。",
        words: ["filter", "rinse"],
      },
      {
        emoji: "🫗", anim: "pour",
        en: "Now the fun part — I pour the water in slow circles. Round and round, over the coffee.",
        zh: "现在是有趣的部分——我绕圈缓慢注水。一圈一圈，淋在咖啡粉上。",
        words: ["in circles"],
      },
      {
        emoji: "⏳", anim: "drip",
        en: "Then I wait. The coffee drips slowly, drop by drop. Good things take time!",
        zh: "然后我等待。咖啡慢慢地滴落，一滴一滴。好东西需要时间！",
        words: ["drip", "drop by drop"],
      },
      {
        emoji: "👃", anim: "smell",
        en: "I smell the coffee. Mmm — nutty, a little sweet. This is going to be a good cup.",
        zh: "我闻闻咖啡。嗯——坚果香，还有点甜。这会是很好的一杯。",
        words: ["nutty"],
      },
      {
        emoji: "😋", anim: "sip",
        en: "Finally, I take my first sip. Warm, smooth, perfect. Good morning to me!",
        zh: "最后，喝第一口。温润、顺滑、完美。祝我早安！",
        words: ["sip", "smooth"],
      },
      {
        type: "fun-fact", emoji: "💡",
        en: "Fun fact! Coffee people say a perfect cup has 'balance' — not too bitter, not too sour, just right!",
        zh: "冷知识！咖啡人说好咖啡讲究 balance（平衡）——不太苦、不太酸，刚刚好！",
        words: ["bitter", "balance"],
      },
    ],
  },
];
