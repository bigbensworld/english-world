    {
      id: "v4",
      title: "第 4 次光顾 · 帮爸妈选手机",
      titleEn: "Phone for Parents",
      emoji: "👨‍👩‍👦",
      desc: "爸妈来探亲，要给妈妈买第一部智能机！大字体、长续航、简单套餐——代际沟通的科技翻译课。",
      reward: { en: "phone insurance", zh: "妈妈有了她的第一部智能机！👨‍👩‍👦" },
      steps: [
        {
          npcLines: [
            "Welcome back! Oh — are you translating for your mom today? I recognize that look of heroic patience!",
            "Hey! Is this the famous mom I've heard about? Welcome! Are you the official translator today?",
            "Good afternoon! Mom's first smartphone, I'm sensing? And you're the tech translator, I assume!",
          ],
          npcZh: "欢迎回来！哦——今天给妈妈当翻译？我认得那种英勇耐心的表情！",
          task: "介绍妈妈并说明需求（第一部智能机）",
          options: [
            { text: "Yes, official translator reporting for duty! This is my mom — it's her very first smartphone.", ok: true,  tip: "reporting for duty 报到——幽默开场 + very first 第一次" },
            { text: "Mom phone! Simple phone! Phone for mother unit!",                                               ok: false, tip: "自然介绍：This is my mom — it's her very first smartphone" },
            { text: "Translator? I am hostage. Phone hostage. Send help. Joking. Sort of.",                          ok: false, tip: "轻松介绍：Official translator reporting for duty!" },
          ],
          phrase: { en: "It's her very first smartphone.", zh: "这是她的第一部智能机。", note: "very first 第一份/第一部；强调初次" },
        },
        {
          npcLines: [
            "A milestone day! Mom, welcome! For first-timers, I always ask: what will you mostly use it for?",
            "What an occasion! Welcome, Mom! Newbie question, always: what's the phone mainly for?",
            "Historic day! Hi Mom! First-timer intake question: what would you mostly do with it?",
          ],
          npcZh: "里程碑的一天！妈妈，欢迎！对新手我总要问：您主要想用它做什么？",
          task: "替妈妈翻译需求（视频通话+拍照）",
          options: [
            { text: "Mom says: video calls with family back home, and taking photos of her grandson. That's basically it.", ok: true,  tip: "翻译需求 + that's basically it 就这些——替长辈精炼表达" },
            { text: "Mom wants apps. All apps. Every app ever made. Translate exactly.",                                    ok: false, tip: "精准翻译：Video calls with family, and photos of her grandson" },
            { text: "Grandson photos? Mom said no comment. Privacy grandma. Mystery woman.",                                 ok: false, tip: "如实传达：Video calls and photos — that's basically it" },
          ],
          phrase: { en: "That's basically it.", zh: "基本就这些。", note: "basically 基本上；收住话题的口语缓冲词" },
        },
        {
          npcLines: [
            "The two classics — video calls and grandkid photos! Then she needs exactly this: big screen, big battery, big buttons mode. This model is our senior favorite.",
            "The golden duo! For that, this one's perfect: large display, two-day battery, and an easy mode with big icons. Our most-loved phone for parents!",
            "Video calls plus grandbaby paparazzi — the universal parent combo! This model: huge screen, marathon battery, simplified mode. Senior MVP!",
          ],
          npcZh: "两大经典需求——视频通话和孙子照片！那她正需要这台：大屏、大电池、大按钮模式。这是我们的长辈人气王。",
          task: "询问「简易模式」是什么",
          options: [
            { text: "Easy mode — what does that change on the phone?", ok: true,  tip: "追问功能细节——替爸妈把好关" },
            { text: "Easy mode? Phone too easy? Insult phone? Mom smart!", ok: false, tip: "了解功能：What does easy mode change?" },
            { text: "Easy mode sounds easy. Explain easy. Easy explanation.", ok: false, tip: "问清细节：What does that change on the phone?" },
          ],
          phrase: { en: "What does that change?", zh: "那会改变什么？", note: "功能追问句；easy mode 长辈模式的本质是简化界面" },
        },
        {
          npcLines: [
            "Easy mode makes everything bigger and simpler: giant icons, bigger text, no app clutter. And the best part — you can set it up remotely and video-call her anytime to help troubleshoot.",
            "Easy mode: massive icons, larger text, zero clutter! Bonus feature for you: remote management — you can fix her phone from your couch, and video-call anytime.",
            "It declutters everything — huge buttons, giant fonts, nothing confusing! And here's the parent-whisperer feature: you control settings remotely. Troubleshooting from your sofa!",
          ],
          npcZh: "简易模式把一切变大变简单：巨大图标、更大字体、无应用杂乱。最棒的是——你可以远程帮她设置、随时视频指导排障。",
          task: "眼睛一亮——这正是需要的",
          options: [
            { text: "Remote setup? That's a lifesaver for both of us. Mom, this phone fixes everything!", ok: true,  tip: "lifesaver 救星——发现关键功能的惊喜" },
            { text: "Remote control? Mom phone spy? I am phone Big Brother now! Power!",                  ok: false, tip: "认可功能：That's a lifesaver for both of us!" },
            { text: "Video-call troubleshooting? Family tech support forever. My destiny.",                ok: false, tip: "翻译+认可：This phone fixes everything!" },
          ],
          phrase: { en: "That's a lifesaver.", zh: "这真是救星。", note: "lifesaver 救命稻草；发现实用功能的高频赞语" },
          adds: [{ emoji: "🔋", label: "Big battery", wordId: "ph-battery" }],
        },
        {
          npcLines: [
            "And for the plan — does she need her own line, or share yours? Our family plan adds a line for twenty-five dollars with two gigabytes, perfect for calls and photos.",
            "Now the plan: separate line, or family share? Adding a line costs twenty-five with two gigs — ideal for calls and photo-sending!",
            "Plan options: her own number, or join your family plan? Twenty-five a month for an extra line, two gigabytes — calls and photos covered!",
          ],
          npcZh: "套餐方面——她要自己的号，还是共享你的？家庭套餐加一个号 25 美元含 2GB，打电话发照片正好。",
          task: "问妈妈的短期居留该选什么",
          options: [
            { text: "She's only visiting for three months — is there a shorter option, like a prepaid plan?", ok: true,  tip: "prepaid 预付费——短期居留的最优解" },
            { text: "Three months? Three year plan! Commitment phone! Mom trapped!",                          ok: false, tip: "问短期方案：Is there a prepaid option?" },
            { text: "Share plan? Share mom? Mom is not shareable resource!",                                   ok: false, tip: "询问预付：She's visiting for three months — any prepaid plans?" },
          ],
          phrase: { en: "Is there a prepaid option?", zh: "有预付费的选项吗？", note: "prepaid plan 预付费套餐；无合约、按月买、随停" },
        },
        {
          npcLines: [
            "Perfect thinking! Prepaid month-to-month: thirty dollars, unlimited calls, and you can stop it whenever she flies home. Shall I set everything up — phone, easy mode, and prepaid?",
            "Great question! Prepaid runs thirty monthly, unlimited calling, cancel anytime when she heads home! Full setup — phone, easy mode, prepaid — ready to go?",
            "Smart! Prepaid: thirty a month, endless calls, stop whenever her visit ends! Complete package today — phone, easy mode, prepaid line?",
          ],
          npcZh: "想得周到！月付预付卡：30 美元无限通话，她回国随时停。全套现在办吗——手机、简易模式、预付卡？",
          task: "全套办理，请店员对妈妈说一句欢迎",
          options: [
            { text: "Let's do all three. And could you tell her 'welcome' in the setup — she'd love that.", ok: true,  tip: "人情味请求——让服务有温度" },
            { text: "All three! Full phone! Maximum setup! Mom storm the digital age!",                    ok: false, tip: "全套+温度：Could you tell her 'welcome' during setup?" },
            { text: "Setup now. No words. Silence setup. Robot efficiency.",                               ok: false, tip: "温暖请求：Tell her welcome — she'd love that" },
          ],
          phrase: { en: "Let's do all three.", zh: "三样都办。", note: "批量决策的爽快句；let's do 拍板感十足" },
        },
      ],
    },
    {
      id: "v5",
      title: "第 5 次光顾 · 出国漫游前哨站",
      titleEn: "Before You Fly",
      emoji: "✈️",
      desc: "下周飞回国！漫游套餐、eSIM、飞行模式——出发前把国际通信安排明白。数字时代的行前检查。",
      reward: { en: "roaming", zh: "你的国际通信已就绪！✈️" },
      steps: [
        {
          npcLines: [
            "Welcome back! Rumor has it you're flying soon — international roaming questions?",
            "Hey! I heard jet engines in your future! Flying abroad? Let's talk roaming!",
            "Good afternoon! Someone's got a boarding pass coming! International trip questions today?",
          ],
          npcZh: "欢迎回来！听说你快起飞了——国际漫游的问题？",
          task: "说明下周回国两周，问怎么办",
          options: [
            { text: "Yes, flying home for two weeks next week. What are my options for using my phone there?", ok: true,  tip: "What are my options 选项式提问——信息收集第一步" },
            { text: "Fly day soon! Phone work there? Make phone work there! Magic!",                          ok: false, tip: "选项式提问：What are my options for using my phone abroad?" },
            { text: "Two weeks home. Home is far. Phone is confused. Help phone.",                            ok: false, tip: "问方案：What are my options?" },
          ],
          phrase: { en: "What are my options?", zh: "我有哪些选择？", note: "options 选项；决策前信息收集万能句" },
        },
        {
          npcLines: [
            "Three paths! One: our international roaming add-on — ten dollars a day, uses your same number. Two: a local eSIM when you land. Three: airplane mode plus Wi-Fi calling.",
            "Three routes! Option one: roaming add-on, ten a day, same number. Option two: local eSIM on arrival. Option three: airplane mode with Wi-Fi calling!",
            "The trio of choices! One: roaming add-on at ten daily — keep your number. Two: grab a local eSIM after landing. Three: airplane mode plus Wi-Fi calling!",
          ],
          npcZh: "三条路！一：国际漫游包——每天 10 美元，用原号码。二：落地买当地 eSIM。三：飞行模式 + Wi-Fi 通话。",
          task: "算账：两周哪种最划算",
          options: [
            { text: "Ten dollars a day for fourteen days is a hundred and forty — that rules out option one. What's the eSIM route like?", ok: true, tip: "当场算账排除法——消费者的高光时刻" },
            { text: "Math! Ten times fourteen! Big number! Scary number! Next option!",                                                   ok: false, tip: "算账+追问：That's $140 — what's the eSIM route like?" },
            { text: "Ten a day? I pay per sun? Sun tax? Daylight fee?",                                                                    ok: false, tip: "排除+继续：That rules out option one — tell me about the eSIM?" },
          ],
          phrase: { en: "That rules out ___.", zh: "那就排除……了。", note: "rule out 排除；算账后做减法的地道表达" },
        },
        {
          npcLines: [
            "Sharp math! The eSIM route: buy a local data package when you land — roughly twenty dollars for two weeks of data. Your US number goes dormant but keeps receiving texts over Wi-Fi.",
            "Number-crunching champion! Local eSIM: about twenty dollars buys two weeks of local data. Your US number sleeps but still gets texts via Wi-Fi!",
            "Love the mental math! eSIM plan: land, buy a local package — twentyish for two weeks of data. US number hibernates, texts still arrive on Wi-Fi!",
          ],
          npcZh: "算得精明！eSIM 路线：落地买当地流量包——大约 20 美元两周。你的美国号码休眠，但通过 Wi-Fi 仍能收短信。",
          task: "关心验证码收不到的问题",
          options: [
            { text: "Wait — my bank sends verification codes by text. If the number is dormant, will I still get those?", ok: true,  tip: "verification codes 验证码——跨境生活的命门问题" },
            { text: "Bank codes! Magic numbers! Bank miss me? Codes lonely?",                                             ok: false, tip: "关键追问：Will I still get my bank verification codes?" },
            { text: "Dormant number? Number sleeps? Wake number with alarm?",                                             ok: false, tip: "问验证码：Will I still get texts from my bank?" },
          ],
          phrase: { en: "Will I still get those?", zh: "我还能收到那些吗？", note: "verification code 验证码；跨境金融的生死线" },
        },
        {
          npcLines: [
            "Great question — yes! Texts still arrive over Wi-Fi with our Wi-Fi calling feature turned on. Just enable it before you fly, and keep your US SIM active at home.",
            "Critical thinking — and yes! With Wi-Fi calling enabled, texts reach you anywhere there's Wi-Fi. Toggle it on before departure, keep the US SIM active!",
            "The question of a seasoned traveler! Yes — Wi-Fi calling delivers your texts over any Wi-Fi. Turn it on before takeoff, leave the US SIM active, done!",
          ],
          npcZh: "问得好——能收到！只要提前打开 Wi-Fi 通话功能，有 Wi-Fi 短信就到你手机。出发前开好，美国卡保持激活即可。",
          task: "请对方现在就帮忙开启 Wi-Fi 通话",
          options: [
            { text: "Could you turn on Wi-Fi calling for me right now, so I don't forget before the flight?", ok: true,  tip: "right now 当场办——消灭遗忘风险" },
            { text: "Turn on now! Future me unreliable! Distracted flyer! Help!",                           ok: false, tip: "当场办理：Could you turn it on right now?" },
            { text: "I remember things always. Perfect memory. Remember this moment forever.",               ok: false, tip: "请店员代办：Turn on Wi-Fi calling for me now, please" },
          ],
          phrase: { en: "Could you do that right now?", zh: "能现在就帮我办吗？", note: "right now 立刻；把待办变成已办的高效句" },
          adds: [{ emoji: "🌍", label: "Wi-Fi calling", wordId: "ph-roaming" }],
        },
        {
          npcLines: [
            "Done — Wi-Fi calling is on! I'll also text you the eSIM setup guide so you have it when you land. Anything else before you fly?",
            "Activated! And I'm texting you an eSIM walkthrough for landing day. Last questions before wheels up?",
            "On and confirmed! Sending the eSIM guide to your messages now — you'll have it in hand when you land. Anything else?",
          ],
          npcZh: "好了——Wi-Fi 通话已开启！我再给你发一份 eSIM 设置指南，落地就能用。起飞前还有别的吗？",
          task: "问最后一个冷知识型问题（飞机上能用 Wi-Fi 通话吗）",
          options: [
            { text: "One more: on the plane itself, can I text over the airplane Wi-Fi, or is calling banned?", ok: true, tip: "banned 被禁——规则边界型提问" },
            { text: "Plane Wi-Fi? Sky internet? Cloud texting? How does sky work?",                            ok: false, tip: "问规则：Can I text over airplane Wi-Fi, or is calling banned?" },
            { text: "No more questions. I am travel expert now. Certification needed.",                        ok: false, tip: "边界确认：Can I text on plane Wi-Fi — or is calling banned?" },
          ],
          phrase: { en: "Or is it banned?", zh: "还是说那是被禁止的？", note: "banned 明令禁止；合规确认的简短问法" },
        },
      ],
    },
  ],
},
