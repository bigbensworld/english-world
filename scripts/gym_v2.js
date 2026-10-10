    {
      id: "v2",
      title: "第 2 次光顾 · 第一次训练",
      titleEn: "First Workout",
      emoji: "💪",
      desc: "办卡后第一次正式训练：热身、用跑步机、举哑铃、找人数组、练完拉伸——健身英语实战。",
      reward: { en: "warm up", zh: "你完成了第一次英文环境训练！💪" },
      steps: [
        {
          npcLines: [
            "Welcome back — you came! Nice. First workout? Start light, okay?",
            "Hey, you showed up! That's half the battle. First time on the floor? Go easy today!",
            "Look who's back! First workout is the most important one — let's make it count, but gently!",
          ],
          npcZh: "欢迎回来——你真的来了！好样的。第一次训练？从轻量开始，好吗？",
          task: "请教今天的训练流程",
          options: [
            { text: "Thanks! What's a good routine for a beginner? I don't even know where to start.", ok: true,  tip: "routine 训练流程 + don't know where to start 坦白新手身份" },
            { text: "Routine? I know everything. Watch and learn.",  ok: false, tip: "新手求教不吃亏：What's a good routine for a beginner?" },
            { text: "Just point at biggest machine. I do biggest machine.", ok: false, tip: "循序渐进：I don't know where to start" },
          ],
          phrase: { en: "I don't know where to start.", zh: "我不知道从哪儿开始。", note: "求助万能句——坦白新手的最佳开场" },
        },
        {
          npcLines: [
            "Classic beginner day: five minutes of cardio to warm up, then some light weights, then stretch. Treadmill's right there — do you know how it works?",
            "The formula: five cardio minutes, light weights, stretching. The treadmill's free — need a quick tutorial?",
            "Beginner blueprint: warm up on the treadmill, light dumbbells, stretch it out. Ever used one of these bad boys?",
          ],
          npcZh: "经典新手日：5 分钟有氧热身，然后轻量力量，最后拉伸。跑步机在那边——您会用吗？",
          task: "询问跑步机操作",
          options: [
            { text: "A quick tutorial would be great. How do I set the speed and the incline?", ok: true,  tip: "set the speed and the incline 调速度和坡度——跑步机两大参数" },
            { text: "Treadmill simple. Feet go, machine follow.",   ok: false, tip: "问操作：How do I set the speed and the incline?" },
            { text: "Speed maximum please. Incline maximum. Everything maximum.", ok: false, tip: "新手从低速开始：How do I set the speed?" },
          ],
          phrase: { en: "How do I set the speed?", zh: "怎么调速度？", note: "set = 设置/调节；跑步机、健身车、椭圆机通用" },
        },
        {
          npcLines: [
            "Speed's the big buttons, incline is the little ones. Start at three — that's a brisk walk. Now let's grab some dumbbells!",
            "Big buttons: speed. Little ones: incline. Level three to start — walking pace! Now, dumbbell time!",
            "Speed on the left, incline on the right. Start at three, walk it out. Then we lift small things!",
          ],
          npcZh: "大按钮是速度，小按钮是坡度。从 3 开始——快走速度。现在去拿哑铃！",
          task: "选择合适重量的哑铃",
          options: [
            { text: "Got it. Which weight should I start with? I'd rather go lighter and keep good form.", ok: true,  tip: "keep good form 保持标准姿势——宁轻勿歪，健身第一原则" },
            { text: "Heaviest dumbbell. I lift heaviest for respect.", ok: false, tip: "姿势>重量：I'd rather go lighter and keep good form" },
            { text: "Form? I have many forms. All forms good.",        ok: false, tip: "form 指动作标准度：Lighter weight, good form" },
          ],
          phrase: { en: "I'd rather go lighter.", zh: "我宁愿用轻一点的。", note: "would rather 宁愿；健身 humility 是安全的第一步" },
        },
        {
          npcLines: [
            "Perfect attitude — form over weight, every time! Try these ten-pounders: three sets of ten reps. Rest one minute between sets.",
            "That's the spirit! Ten-pound dumbbells: three sets, ten reps each, one minute of rest between. Simple math!",
            "Smart lifter! Grab the tens: three sets of ten, minute rest between. You'll feel it tomorrow!",
          ],
          npcZh: "完美的态度——永远姿势优先于重量！试试这副 10 磅的：3 组，每组 10 次，组间休息 1 分钟。",
          task: "复述训练参数确认理解",
          options: [
            { text: "So: three sets of ten reps, one minute rest in between. Got it!", ok: true,  tip: "复述 sets/reps/rest 三要素——健身房沟通的数字骨架" },
            { text: "Three tens of ten threes. Or ten threes of three tens.", ok: false, tip: "准确复述：Three sets of ten reps, one minute rest" },
            { text: "Sets, reps, rest — too much math for muscles.", ok: false, tip: "记住三要素：3 sets, 10 reps, 1 min rest" },
          ],
          phrase: { en: "Three sets of ten reps.", zh: "三组，每组十次。", note: "训练计划万能格式：sets 组 / reps 次数" },
        },
        {
          npcLines: [
            "Exactly! Last thing — don't skip stretching after. And drink plenty of water. Feeling okay so far?",
            "Perfect recall! Stretch when you're done, and stay hydrated. How're you feeling?",
            "You got it! After-workout stretch, water all day. Surviving the beginner day?",
          ],
          npcZh: "完全正确！最后——练完别跳过拉伸，多喝水。目前感觉还好吗？",
          task: "表达肌肉有点酸但感觉不错",
          options: [
            { text: "My arms are a little sore, but it feels great! I'll definitely be back.", ok: true,  tip: "sore 酸痛 + I'll be back 我会再来——正向反馈闭环" },
            { text: "Arms broken. Life broken. Never return.",       ok: false, tip: "酸痛是正常适应：A little sore, but it feels great!" },
            { text: "No feeling. Muscles sleeping. Wake muscles never.", ok: false, tip: "描述真实感受：A little sore, but it feels great!" },
          ],
          phrase: { en: "I'm a little sore, but it feels great!", zh: "有点酸，但感觉真好！", note: "sore = 迟发性肌肉酸痛；健身人的自豪宣言" },
        },
        {
          npcLines: [
            "That's the beginner glow! See you next workout — and remember, the soreness means it's working!",
            "Sore today, strong tomorrow! Welcome to the family — see you soon!",
            "That soreness? That's progress you can feel! Great work today. See you next time!",
          ],
          npcZh: "这就是新手光环！下次训练见——记住，酸痛说明训练起效了！",
          task: "感谢教练，结束首次训练",
          options: [
            { text: "Thanks for all the help today — you made my first workout way less scary!", ok: true,  tip: "way less scary 没那么可怕了——way + 比较级强化语气" },
            { text: "Bye scary gym man!",                              ok: false, tip: "真诚感谢：You made my first workout way less scary!" },
            { text: "First workout done. Scary level unchanged.",       ok: false, tip: "夸对方帮助：Thanks — you made it way less scary!" },
          ],
          phrase: { en: "way less scary", zh: "没那么可怕了。", note: "way + 形容词比较级 = 「……多了」；口语强化神器" },
        },
      ],
    },
