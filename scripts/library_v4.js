    {
      id: "v4",
      title: "第 4 次光顾 · 图书馆礼仪",
      titleEn: "Library Etiquette",
      emoji: "🤫",
      desc: "安静区能不能说话？手机响了怎么办？为什么不能占座？美国图书馆的潜规则一次讲透。",
      reward: { en: "quiet zone", zh: "你掌握了图书馆潜规则，融入无声世界！🤫" },
      steps: [
        {
          npcLines: [
            "Psst — welcome! Keep it down, we're near the quiet zone. How can I help?",
            "*whispers* Hi there! This is the whisper floor. What do you need?",
            "Hey — quiet voice please! What can I do for you?",
          ],
          npcZh: "嘘——欢迎！小声点，我们在安静区旁边。有什么可以帮您？",
          task: "压低声音询问：想找能小组讨论的地方",
          options: [
            { text: "*whispers* Sorry! Is there a place where my group can talk out loud?", ok: true, tip: "顺应当下氛围（低声）+ 说明需求——情境智慧" },
            { text: "HELLO! I NEED A PLACE TO TALK VERY LOUDLY!", ok: false, tip: "在安静区要低声：Is there a place where we can talk?" },
            { text: "Why whisper? Library is basically a concert hall.", ok: false, tip: "入乡随俗压低音量，再问需求" },
          ],
          phrase: { en: "Is there a place where we can talk?", zh: "有没有可以说话的地方？", note: "quiet zone 安静区外的讨论区/自习室可以出声" },
        },
        {
          npcLines: [
            "Great question! Study rooms are on the first floor — bookable for two-hour slots. Or the café corner allows normal voices.",
            "The study rooms downstairs! Two-hour bookings, soundproof-ish. The café corner works too.",
            "Group study rooms, floor one! Reserve two-hour slots online. The café corner is the chill option.",
          ],
          npcZh: "问得好！自习室在一楼——可以预订两小时的时段。咖啡角也可以正常说话。",
          task: "预订明天的自习室",
          options: [
            { text: "A study room sounds perfect. Can I book one for tomorrow, around 2 p.m.?", ok: true, tip: "book a study room 预订自习室 + 给出时间" },
            { text: "I'll take the loudest room. The loudest you have.", ok: false, tip: "正常预订：Can I book one for tomorrow at 2 p.m.?" },
            { text: "Two hours? I need ten. Minimum.", ok: false, tip: "按规则来：two-hour slots, tomorrow around 2 p.m." },
          ],
          phrase: { en: "Can I book ___ for tomorrow?", zh: "我能预订明天……吗？", note: "book = 预订；图书馆房间、设备都能 book" },
        },
        {
          npcLines: [
            "Booked! Room 3, two to four. Now, a few house rules — food is a no-go except in the café, but covered drinks are fine.",
            "You're in — Room 3, 2 to 4! House rules: no food outside the café, but covered drinks are OK.",
            "Done! Room 3, two to four. Rules of the house: café-only food, covered drinks welcome.",
          ],
          npcZh: "订好了！三号房，两点到四点。馆规：除了咖啡区不能吃食物，但有盖的饮料可以。",
          task: "确认规则细节",
          options: [
            { text: "Got it — no food, but covered drinks are fine. And what about phone calls?", ok: true, tip: "复述规则 + 追问细节（电话）——规则确认三连" },
            { text: "So I can eat a hot dog if I whisper?",  ok: false, tip: "食物规则与音量无关：no food outside the café" },
            { text: "Rules? Books fear me. I fear nothing.", ok: false, tip: "遵守馆规：Got it — and what about phone calls?" },
          ],
          phrase: { en: "What about ___?", zh: "那……呢？", note: "追问同类事项的万能句；what about = how about" },
        },
        {
          npcLines: [
            "Calls go to the lobby or stairwell — anywhere but the reading rooms. And one more thing: please don't save seats with your stuff.",
            "Take calls in the lobby! Also — we've had issues with seat-saving. Books can't hold chairs for hours.",
            "Lobby for calls! And a gentle reminder: saving seats with bags or books is frowned upon.",
          ],
          npcZh: "打电话去大厅或楼梯间——阅读区不行。还有一件事：请别用东西占座。",
          task: "询问占座规则的具体细节（离开多久算放弃）",
          options: [
            { text: "Fair enough — so if I step away for more than, say, thirty minutes, my seat is fair game?", ok: true, tip: "fair enough 行吧 + fair game 可被他人使用——追问规则细节" },
            { text: "My laptop is my baby. It stays. Forever.",  ok: false, tip: "理解规则：if I step away, my seat is fair game?" },
            { text: "I will hire a person to sit in my seat.",   ok: false, tip: "现实做法：step away 30 分钟即视为放弃" },
          ],
          phrase: { en: "Fair enough.", zh: "有道理，行吧。", note: "对规则/解释表示接受的常用口语" },
        },
        {
          npcLines: [
            "Exactly — thirty minutes and it's anyone's game. Oh, one more cultural thing: if someone's phone goes off, just give them a look. No need to say anything.",
            "You got it! Cultural tip: a phone rings, you don't call people out — a look does the talking.",
            "That's the rule! And the unwritten one: silence violations get the polite stare, not a lecture.",
          ],
          npcZh: "正是——三十分钟后谁都能坐。还有个文化点：别人手机响了，看一眼就行，不用说什么。",
          task: "表达理解（无声社会的默契）",
          options: [
            { text: "Ha — the polite stare. I've been on the receiving end of that already!", ok: true, tip: "the polite stare 礼貌凝视 + on the receiving end 被如此对待过——幽默共情" },
            { text: "A look? I will write them a formal letter.",  ok: false, tip: "文化默契：a look does the talking 看一眼足矣" },
            { text: "I will scream at phone people. Loudly. In quiet zone.", ok: false, tip: "以噪制噪不行：the polite stare 就够了" },
          ],
          phrase: { en: "on the receiving end of ___", zh: "被……过（承受方）", note: "receive end 接收端；幽默自嘲常用" },
        },
        {
          npcLines: [
            "Ha! We've all been there. You'll fit right in here. Enjoy Room 3 tomorrow!",
            "Every one of us, friend! See you at 2 p.m. tomorrow. Happy studying!",
            "Welcome to the club! Good luck with the group project tomorrow!",
          ],
          npcZh: "哈哈，我们都经历过！您会很快融入的。明天三号房见！",
          task: "轻声道别",
          options: [
            { text: "*whispers* Thanks — see you tomorrow!", ok: true,  tip: "轻声告别呼应开场的 whisper 梗——情境闭环" },
            { text: "GOODBYE FOREVER, LIBRARY FRIEND!",      ok: false, tip: "保持低声：Thanks, see you tomorrow!" },
            { text: "Bye. I will miss this conversation loudly.", ok: false, tip: "轻声收尾：See you tomorrow!" },
          ],
          phrase: { en: "See you tomorrow!", zh: "明天见！", note: "有了明确约定（Room 3, 2 p.m.）后的自然告别" },
        },
      ],
    },
