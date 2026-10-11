  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 日托第一天",
      titleEn: "First Day of Daycare",
      emoji: "🎾",
      desc: "狗狗第一天上日托！性格测试、疫苗检查、见面适应——毛孩子家长的第一次分离课。",
      reward: { en: "doggy daycare", zh: "狗狗交到了新朋友！🎾" },
      steps: [
        {
          npcLines: [
            "Well hello, and hello to this handsome fellow! First day at Happy Tails? We love first days!",
            "Hi there! And who is THIS gorgeous boy? First day at Happy Tails Daycare? First days are our favorite!",
            "Welcome! And welcome to the fluffy gentleman too! First day? Excellent — the best days start here!",
          ],
          npcZh: "你好呀，还有这位帅哥狗狗！Happy Tails 第一天？我们最爱第一天了！",
          task: "介绍狗狗并说明第一次来",
          options: [
            { text: "Thanks! This is Mochi — it's his first daycare ever, and honestly, I'm more nervous than he is!", ok: true,  tip: "I'm more nervous than he is 我比它还紧张——自嘲式真诚" },
            { text: "This dog! Mochi! Nervous me! Dog calm! Human mess!",                                           ok: false, tip: "自然表达：I'm more nervous than he is!" },
            { text: "Mochi is warrior dog. Fear nothing. I fear everything. Role reverse.",                         ok: false, tip: "介绍+心情：This is Mochi — I'm more nervous than he is!" },
          ],
          phrase: { en: "I'm more nervous than he is.", zh: "我比它还紧张。", note: "more...than... 比较；家长送娃的真实写照" },
        },
        {
          npcLines: [
            "The owner-nerves — we see it daily, promise he's in good hands! First step is the temperament test: fifteen minutes with our handler, just watching how he plays.",
            "Classic first-day parent! He'll be fine — our temperament test is step one: fifteen supervised minutes to see his play style.",
            "The nervous parent special — totally normal! Step one: temperament test. Fifteen minutes with a handler, observing his vibes.",
          ],
          npcZh: "主人的紧张——我们天天见，放心交给我们！第一步是性格测试：和饲养员待 15 分钟，观察它怎么玩。",
          task: "询问性格测试主要看什么",
          options: [
            { text: "What does the temperament test look for — how do you decide if he passes?", ok: true,  tip: "look for 考察 + pass 通过——测试标准问句" },
            { text: "Pass? Fail? Dog exam? What if dog bad at exam? Dog dropout?!",              ok: false, tip: "问标准：What does the test look for?" },
            { text: "Fifteen minutes only? Extend to hour! Full personality scan!",              ok: false, tip: "了解机制：How do you decide if he passes?" },
          ],
          phrase: { en: "What does the test look for?", zh: "测试考察什么？", note: "look for 寻找/考察；报名任何测试的标配问题" },
        },
        {
          npcLines: [
            "We watch for sharing, reading other dogs' signals, and handling corrections. No judgment — some dogs just prefer solo suites, and that's fine!",
            "Sharing, signal-reading, how he takes feedback. It's not pass-fail really — some dogs are social butterflies, some are suite-lounge types. All welcome!",
            "We're looking at play style, sharing, and dog-language skills. And there's no failing — just matching him to the right group!",
          ],
          npcZh: "我们观察分享、读取其他狗信号、接受纠正的能力。没有评判——有的狗就爱独处套房，也完全没问题！",
          task: "询问疫苗材料是否备齐",
          options: [
            { text: "That's reassuring. I brought his vaccination records — rabies, distemper, and the Bordetella. Is that everything?", ok: true, tip: "报疫苗清单 + Is that everything? 确认补漏" },
            { text: "Papers! Dog papers! So many papers! Here all papers! Paper festival!",                                              ok: false, tip: "清单式确认：I brought rabies, distemper, and Bordetella — is that everything?" },
            { text: "Vaccines? He is strong dog. Natural immunity. Wolf blood. No papers needed.",                                       ok: false, tip: "规范确认：Is that everything for vaccinations?" },
          ],
          phrase: { en: "Is that everything?", zh: "这就齐了吗？", note: "材料清单式核对；办事收尾确认句" },
        },
        {
          npcLines: [
            "Perfect records — you came so prepared! Last thing: any medications, allergies, or special diet we should know about?",
            "Model pet parent — look at this paperwork! Final question: medications, allergies, special diets? Anything to flag?",
            "Immaculate documentation! Last intake question: meds, allergies, or special food needs?",
          ],
          npcZh: "记录完美——你准备得太充分了！最后一项：有药物、过敏或特殊饮食需要知道吗？",
          task: "说明对鸡肉过敏",
          options: [
            { text: "One thing: he's allergic to chicken — it's in a lot of treats, so please only the salmon ones.", ok: true,  tip: "点明过敏 + 指出隐藏风险——宠物家长的细致" },
            { text: "Chicken = enemy! No chicken! Chicken war! Salmon friend only!",                                  ok: false, tip: "清晰告知：He's allergic to chicken — only salmon treats, please" },
            { text: "Allergies? He eats everything. Iron stomach. Garbage gut champion.",                             ok: false, tip: "如实强调：He's allergic to chicken — please be careful with treats" },
          ],
          phrase: { en: "He's allergic to ___.", zh: "他对……过敏。", note: "chicken allergy 狗界最常见过敏原——零食里无处不在" },
          adds: [{ emoji: "⚠️", label: "No chicken!", wordId: "pb-allergy2" }],
        },
        {
          npcLines: [
            "Chicken allergy — flagged in bright red on his profile! We'll put him in the small-dog playgroup for the test. Want to watch from the viewing window?",
            "Allergy noted, giant red letters! Small-dog playgroup for testing, and the viewing window is all yours — helicopter parenting encouraged!",
            "Red-flagged and locked in! Test group: small dogs. Viewing window's right there — hover away, we don't judge!",
          ],
          npcZh: "鸡肉过敏——档案上标大红字！测试安排在小型犬组。想隔着观察窗看吗？",
          task: "选择不看着，信任专业（但很挣扎）",
          options: [
            { text: "I'll trust the process... and take a walk. But maybe just one look first.", ok: true,  tip: "trust the process 信任流程 + one look 破功——真实可爱" },
            { text: "ONE LOOK? I watch whole day! Window life now! I live here!",                ok: false, tip: "信任+挣扎：I'll trust the process... maybe just one look first" },
            { text: "No look! Strong parent! Cold turkey! Goodbye forever dog!",                ok: false, tip: "人之常情：Just one look first — then a walk" },
          ],
          phrase: { en: "I'll trust the process.", zh: "我信任这个流程。", note: "trust the process 信任过程；放手难的家长必修课" },
        },
        {
          npcLines: [
            "Take your walk! He'll be playing when you're back... And you can check the webcam anytime — we call it the 'pupdate channel'!",
            "Enjoy the stroll! He won't even notice you're gone! Oh — the webcam's called the pupdate channel. You're welcome!",
            "Walk it off, nervous parent! And the webcam — the pupdate channel — streams all day. See you at pickup!",
          ],
          npcZh: "去散步吧！你回来时他早就玩开了……随时可以看远程监控——我们叫它『狗狗近况频道』！",
          task: "记下接宠时间并道别",
          options: [
            { text: "The pupdate channel — love it already. Pickup is before seven, right? See you then!", ok: true,  tip: "before seven 之前——时限确认防滞留费" },
            { text: "Pupdate! Cute word! Buy word! Trademark word! Now pickup when?",                      ok: false, tip: "确认接宠：Pickup is before seven, right?" },
            { text: "Seven p.m.? I come midnight. Dog party all night. Surprised dog.",                    ok: false, tip: "时间确认：See you at pickup!" },
          ],
          phrase: { en: "See you at pickup.", zh: "接的时候见。", note: "pickup 取回；日托家长的交接暗号" },
        },
      ],
    },
