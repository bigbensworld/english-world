    {
      id: "v1",
      title: "第 1 次光顾 · 预约体检",
      titleEn: "Annual Checkup",
      emoji: "🩺",
      desc: "带狗狗 Max 做年度体检：打电话预约、前台报到、向医生描述近况——宠物就诊第一步。",
      reward: { en: "appointment", zh: "你帮 Max 约上了体检，第一步完成！📅" },
      steps: [
        {
          npcLines: [
            "Good morning, Happy Paws Veterinary Clinic! How can I help you?",
            "Thanks for calling Happy Paws! What can I do for you?",
            "Happy Paws Vet Clinic, this is Amy speaking. How may I help?",
          ],
          npcZh: "早上好，欢乐爪爪兽医诊所！有什么可以帮您？",
          task: "说明来意：给狗狗预约年度体检",
          options: [
            { text: "Hi! I'd like to make an appointment for my dog's annual checkup.", ok: true,  tip: "make an appointment 预约 + annual checkup 年度体检——电话预约标准句" },
            { text: "My dog needs a doctor. Today. Right now. Hurry.",  ok: false, tip: "礼貌预约：I'd like to make an appointment for a checkup" },
            { text: "Hello. Dog exists. Please inspect the dog.",      ok: false, tip: "标准表达：make an appointment for my dog's annual checkup" },
          ],
          phrase: { en: "I'd like to make an appointment for ___.", zh: "我想给……预约一下。", note: "make an appointment 预约；医生/理发/宠物诊所通用" },
        },
        {
          npcLines: [
            "Of course! What's your pet's name, and what kind of dog is he?",
            "Sure thing! Who's the patient — name and breed, please?",
            "No problem! Dog's name and breed for the chart?",
          ],
          npcZh: "当然可以！您的宠物叫什么名字，是什么品种的狗？",
          task: "介绍宠物：Max，金毛，三岁",
          options: [
            { text: "His name is Max — he's a three-year-old golden retriever.", ok: true, tip: "报宠物信息：name + breed + age，病历建档需要" },
            { text: "He's Max. A very good boy. The best boy.",  ok: false, tip: "建档要具体信息：a three-year-old golden retriever" },
            { text: "Dog. Normal dog. Dog-shaped.",             ok: false, tip: "说明品种和年龄：golden retriever, three years old" },
          ],
          phrase: { en: "He's a ___-year-old ___.", zh: "它是一只……岁的……。", note: "age + breed 组合描述宠物；golden retriever 金毛" },
        },
        {
          npcLines: [
            "Max sounds lovely! We have openings Thursday at ten or Friday at two thirty. Which works better?",
            "A golden! Sweet. Thursday ten a.m. or Friday two thirty — your pick.",
            "Love goldens! We can do Thursday at ten or Friday at two thirty. What's best?",
          ],
          npcZh: "Max 听起来很可爱！周四上午十点或周五下午两点半有空位。哪个合适？",
          task: "选时间并确认",
          options: [
            { text: "Thursday at ten works great for us.", ok: true,  tip: "…works great for us 时间合适——选时段标准回应" },
            { text: "Give me Monday at midnight exactly.", ok: false, tip: "从给出的选项里选：Thursday at ten" },
            { text: "When is never o'clock?",              ok: false, tip: "选定时段：Thursday at ten works great" },
          ],
          phrase: { en: "___ works (great) for me.", zh: "……（非常）适合我。", note: "works = 行得通、合适；拒绝时说 That doesn't work for me" },
        },
        {
          npcLines: [
            "Booked — Thursday at ten for Max! Just a heads-up: dogs must be on a leash, and cats in carriers. See you then!",
            "You're all set, Thursday ten a.m.! Reminder: leashes for dogs, carriers for cats. See you Thursday!",
            "Done and done! Thursday, ten o'clock, Max the golden. Leash him up and we'll see you then!",
          ],
          npcZh: "订好了——周四十点，Max！提醒一下：狗必须戴牵引绳，猫要装背包。到时候见！",
          task: "确认要求并致谢",
          options: [
            { text: "Got it — leash for Max. Thank you so much, see you Thursday!", ok: true, tip: "Got it 复述确认 + 道谢——预约收尾" },
            { text: "Leash? Max walks me. It's fine.",    ok: false, tip: "遵守规定：Got it, leash for Max" },
            { text: "He will be free. Freedom Max.",      ok: false, tip: "接受规定：Thank you, see you Thursday!" },
          ],
          phrase: { en: "Just a heads-up: ___.", zh: "提醒一下：……。", note: "heads-up = 预先提醒（名词）；对方善意告知时回 Got it" },
        },
        {
          npcLines: [
            "Hi, welcome to Happy Paws! Checking in for Max?",
            "Hello! Max's ten o'clock, right? Let's get you checked in.",
            "Good morning! You must be Max's human. Check in right here, please.",
          ],
          npcZh: "您好，欢迎来到欢乐爪爪！是 Max 来报到吗？",
          task: "前台报到，说明有预约",
          options: [
            { text: "Yes, we have a ten o'clock appointment for a checkup.", ok: true, tip: "check in 报到 + 报上预约时间——到店第一步" },
            { text: "We are here. Witness us.",        ok: false, tip: "报到用语：We have a ten o'clock appointment" },
            { text: "Max made the appointment himself.", ok: false, tip: "替宠物说话：We have an appointment at ten" },
          ],
          phrase: { en: "We have an appointment at ___.", zh: "我们约了……点。", note: "报到万能句；前台会据此调出病历" },
        },
        {
          npcLines: [
            "Found it! The vet will call you in shortly. How's Max been doing — any changes since last year?",
            "All checked in! While we wait — how's he been? Anything new or different?",
            "You're in the system! Quick question while the vet finishes up: any changes with Max this year?",
          ],
          npcZh: "找到了！医生马上叫您。Max 最近怎么样——和去年比有什么变化吗？",
          task: "描述近况：一切都好，就是有点胖",
          options: [
            { text: "He's been great, just a little overweight — he loves treats too much.", ok: true, tip: "overweight 超重 + loves treats too much 幽默坦诚——描述近况" },
            { text: "He is perfect. A circle of perfection.",   ok: false, tip: "具体描述：a little overweight" },
            { text: "Changes? He changed my life. For the better.", ok: false, tip: "说健康近况：He's been great, just a little overweight" },
          ],
          phrase: { en: "He's been ___.", zh: "它最近……。", note: "been + 形容词描述状态；接 just 带出细节" },
        },
        {
          npcLines: [
            "Ha, classic golden! The vet will chat about his diet then. She's ready for you now — room two, please!",
            "Treats are life! Dr. Lee will go over a diet plan. Room two — she's ready for Max!",
            "A man after my own heart! Okay, Dr. Lee's ready — room two, on the left!",
          ],
          npcZh: "哈哈，典型金毛！医生会聊聊饮食方案。她现在有空——请去二号诊室！",
          task: "道谢并前往诊室",
          options: [
            { text: "Perfect, thank you! Come on, Max — let's go!", ok: true,  tip: "引导宠物+道谢——报到流程毕业" },
            { text: "Room two. Max, translate for me.",  ok: false, tip: "正常收尾：Thank you! Let's go, Max!" },
            { text: "I will carry Max like a suitcase.", ok: false, tip: "自然引导：Come on, Max, let's go!" },
          ],
          phrase: { en: "Come on, ___. Let's go!", zh: "来吧，……。我们走！", note: "呼唤宠物/孩子出发的口语；come on 表催促引导" },
        },
      ],
    },
