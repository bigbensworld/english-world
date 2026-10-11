    {
      id: "v4",
      title: "第 4 次光顾 · 初戴隐形",
      titleEn: "First Contact Lenses",
      emoji: "👁️",
      desc: "想告别眼镜！第一次戴隐形眼镜：学习戴取、日抛月抛、护理液——手指和眼睛的和平谈判。",
      reward: { en: "contact lenses", zh: "你成功戴上了第一片隐形！👁️" },
      steps: [
        {
          npcLines: [
            "Welcome back! Glasses still treating you well? Or... are you here to talk about contact lenses? I saw you eyeing the display!",
            "Hey, welcome in! How are the glasses? Or — wait — are you thinking what I think you're thinking? Contacts, perhaps?",
            "Good afternoon! Glasses behaving? Or is today the day we talk about the contact lens life? You've got that curious look!",
          ],
          npcZh: "欢迎回来！眼镜还好吗？还是……今天来聊聊隐形眼镜？我看见你在看展示柜了！",
          task: "表达想尝试隐形眼镜",
          options: [
            { text: "You read my mind! I'd like to try contact lenses — glasses fog up when I cook.", ok: true,  tip: "You read my mind 你懂我 + fog up 起雾——真实痛点" },
            { text: "Yes contacts! Put contacts in eyes! Eyes accept contacts!",                      ok: false, tip: "说明动机：Glasses fog up when I cook — I'd like to try contacts" },
            { text: "Contacts? No. Just browsing display. Aggressive display.",                       ok: false, tip: "大胆表达意愿：You read my mind — I'd like to try contact lenses" },
          ],
          phrase: { en: "You read my mind!", zh: "你读懂了我的心思！", note: "read one's mind 心灵感应；被猜中心思的惊喜回应" },
        },
        {
          npcLines: [
            "The fog-up struggle is real! Great news: your prescription works for contacts. First decision — dailies or monthlies?",
            "Every cook's nightmare, that fog! Good news: contacts work with your prescription. First choice: dailies or monthlies?",
            "Fog is the enemy of chefs! Lucky you — contacts suit your prescription perfectly. So: dailies, or monthlies?",
          ],
          npcZh: "起雾之痛太真实了！好消息：你的处方可以配隐形。第一个决定——日抛还是月抛？",
          task: "询问两者区别再决定",
          options: [
            { text: "What's the difference between dailies and monthlies, in terms of cost and care?", ok: true,  tip: "in terms of 在……方面——多维度提问" },
            { text: "Daily means day. Monthly means month. Explain deeper. Go deeper.",                ok: false, tip: "问利弊：In terms of cost and care?" },
            { text: "Which is best? Tell me best. Buy best. Best only.",                              ok: false, tip: "了解差异：What's the difference?" },
          ],
          phrase: { en: "What's the difference between A and B?", zh: "A 和 B 有什么区别？", note: "in terms of cost and care 从成本和护理角度" },
        },
        {
          npcLines: [
            "Dailies: fresher, zero cleaning, better for occasional wear — pricier per lens. Monthlies: cheaper long-term, but need nightly cleaning in solution. Occasional cook-warrior? Dailies.",
            "Dailies: hygienic, no cleaning, perfect for part-timers — but more per lens. Monthlies: budget-friendly over time, requires nightly solution care. For your use? Dailies all the way.",
            "Dailies win on hygiene and convenience — pop in, toss out — but cost more each. Monthlies save money but demand nightly cleaning. Occasional user like you? Dailies, easily.",
          ],
          npcZh: "日抛：更新鲜、免清洗、适合偶尔戴——单价更高。月抛：长期更省，但每晚要用护理液清洗。你这种偶尔下厨的勇士？日抛。",
          task: "选日抛（偶尔戴）",
          options: [
            { text: "Dailies sound perfect for me — I'd only wear them a few times a week.", ok: true,  tip: "确认选择 + 频率说明，决策有依据" },
            { text: "Dailies! Throwaway eyes! Exciting garbage!",                            ok: false, tip: "理性决策：Dailies sound perfect — I'd wear them a few times a week" },
            { text: "Monthlies cheaper. I choose cheap. Clean never. Sleep in lenses.",      ok: false, tip: "按需选择：Dailies sound perfect for my usage" },
          ],
          phrase: { en: "Dailies sound perfect for me.", zh: "日抛很适合我。", note: "sound perfect 听起来完美；A sound... B 的决策句式" },
        },
        {
          npcLines: [
            "Excellent choice! Now, the fun part — I'll teach you how to put them in. Step one: wash your hands. Step two: balance the lens on your fingertip like a tiny bowl.",
            "Great pick! Time for the hands-on lesson — literally! First: clean hands. Second: lens on the fingertip, little bowl shape.",
            "Perfect for you! Now, the rite of passage: insertion training! Step one — hands washed. Step two — lens balanced on your fingertip, bowl-side up!",
          ],
          npcZh: "好选择！现在，有趣的部分——我教你戴。第一步：洗手。第二步：镜片放指尖上像个小碗。",
          task: "学习判断镜片正反面",
          options: [
            { text: "A tiny bowl — got it. How do I know if it's inside out?", ok: true,  tip: "inside out 里外翻转——戴隐形经典问题" },
            { text: "Bowl of what? Soup bowl? Eye soup? Questionable soup.",  ok: false, tip: "关键提问：How do I know if it's inside out?" },
            { text: "Bowl balance easy. I am bowl master. Skip steps.",        ok: false, tip: "问正反面：How do I know if it's inside out?" },
          ],
          phrase: { en: "How do I know if it's inside out?", zh: "怎么判断是不是戴反了？", note: "inside out 内外翻转；碗边外翻=反面" },
        },
        {
          npcLines: [
            "If the edges flare out like a UFO, it's inside out — flip it. If it's a smooth bowl, you're good. Now look up, pull down your lower lid, and place it gently on the white... then blink, and it settles!",
            "UFO edges = inside out, flip it! Smooth bowl = correct. Now: eyes up, pull the lower lid down, lens on the white of the eye, blink — and it glides right into place!",
            "Flared edges like a flying saucer? Reversed! Nice smooth curve? Perfect! Look up, lower lid down, gentle placement, blink — magic!",
          ],
          npcZh: "如果边缘像飞碟一样外翻，就是反面——翻过来。边缘平滑的碗状就对了。现在眼睛往上看、拉下眼睑、轻放到眼白上……眨眼，它自己就位！",
          task: "第一次尝试佩戴（紧张但配合）",
          options: [
            { text: "Okay... eyes up, lower lid... I can do this. Gently... and — it's on! I blinked and it just settled!", ok: true, tip: "跟做指令 + 成功惊喜——第一次的真实体验" },
            { text: "Eye attack! Finger attack! Everything attack! Abort!",                                                ok: false, tip: "跟随步骤：Eyes up, lower lid, gently — I can do this" },
            { text: "Cannot do. Eyes closed forever. New life as closed-eye person.",                                      ok: false, tip: "耐心尝试：Gently... it's on!" },
          ],
          phrase: { en: "It just settled!", zh: "它自己就位了！", note: "settle 安顿到位；隐形佩戴成功的瞬间" },
          adds: [{ emoji: "👁️", label: "First lens", wordId: "opt-contacts" }],
        },
        {
          npcLines: [
            "First try — you're a natural! Most people take twenty minutes! Here's your starter pack of thirty dailies plus solution for any emergencies. Any last questions?",
            "One shot, one success — beginner's brilliance! Thirty-day starter pack and some solution, just in case. Final questions?",
            "First attempt, instant success — superstar! Thirty dailies to start, plus solution for emergencies. What else can I answer?",
          ],
          npcZh: "一次成功——你是天才！多数人要练 20 分钟！这是 30 片日抛装和应急护理液。还有问题吗？",
          task: "问最后一个实用问题（能戴着睡午觉吗）",
          options: [
            { text: "Just one — can I nap in them, or is that a hard no?", ok: true,  tip: "a hard no 明确不行——口语化确认禁忌" },
            { text: "Sleep in lenses? Full sleep? Sleep marathon?",        ok: false, tip: "确认禁忌：Can I nap in them?" },
            { text: "No questions. I know all eye things now. Eye doctor.", ok: false, tip: "问清禁忌：Can I nap in them, or is that a no?" },
          ],
          phrase: { en: "Is that a hard no?", zh: "那是绝对不行吗？", note: "hard no 斩钉截铁的拒绝；确认禁忌的地道说法" },
        },
      ],
    },
    {
      id: "v5",
      title: "第 5 次光顾 · 偏光太阳镜",
      titleEn: "Sunglasses Upgrade",
      emoji: "🕶️",
      desc: "夏日公路旅行前，配一副真正的偏光太阳镜。镜片颜色、UV 防护、偏光原理——墨镜里的科学课。",
      reward: { en: "sunglasses", zh: "你配到了专业级太阳镜！🕶️" },
      steps: [
        {
          npcLines: [
            "Welcome in! You've got that 'road trip energy' today. What are we outfitting you with?",
            "Hey! Someone's got vacation written all over them. What do you need for the trip?",
            "Afternoon! I sense adventure. What can I set you up with today?",
          ],
          npcZh: "欢迎光临！你今天满身公路旅行的气场。要配点什么？",
          task: "说明要买开车用的太阳镜",
          options: [
            { text: "Spot on! I'm driving to the coast next week — I need good sunglasses for the road glare.", ok: true,  tip: "road glare 路面眩光——开车痛点 + 用途导向购物" },
            { text: "Sun too bright. Eyes cry. Buy dark eye covers.",                                           ok: false, tip: "专业表述：I need sunglasses for the road glare" },
            { text: "Coast trip! Sunglasses for fashion. Style only. Eyes irrelevant.",                          ok: false, tip: "功能优先：Good sunglasses for the road glare" },
          ],
          phrase: { en: "I need sunglasses for ___.", zh: "我需要用于……的太阳镜。", note: "用途导向购物句式；场景决定选购方向" },
        },
        {
          npcLines: [
            "For driving, you want polarized lenses — they cut the glare bouncing off the road and other cars. Regular dark lenses just dim everything; polarized actually filter the glare.",
            "Driving calls for polarized! They block glare reflecting off asphalt and hoods. Regular tints just darken; polarization selectively kills the glare.",
            "For the road: polarized, no debate. They neutralize reflections from the road surface. Normal dark lenses? Just dim the whole world.",
          ],
          npcZh: "开车要选偏光镜片——能消除路面和车身的反光眩光。普通墨镜只是整体变暗；偏光镜是真正过滤眩光。",
          task: "追问偏光和普通墨镜的区别",
          options: [
            { text: "So the difference is: polarized filters glare, while regular lenses just make everything darker?", ok: true,  tip: "复述核心区别确认理解——学习型消费者" },
            { text: "Polarized is magic word? Magic lenses? Wizard shop?",                                              ok: false, tip: "复述确认：Polarized filters glare, regular just darkens — right?" },
            { text: "Words confusing. Both dark. Buy darker one. Darkness champion.",                                   ok: false, tip: "确认理解：Polarized filters glare while regular just dims?" },
          ],
          phrase: { en: "So the difference is...", zh: "所以区别是……", note: "So...? 复述式确认；把别人的解释变成自己的理解" },
        },
        {
          npcLines: [
            "Exactly! And all our sunglasses — polarized or not — have full UV400 protection. Glare comfort and UV safety are two different things, and you get both here.",
            "That's it precisely! Every pair here, polarized or standard, carries UV400 protection. Glare reduction and UV blocking — separate features, both covered!",
            "You got it! And important note: all our sunglasses have UV400 regardless of polarization. Glare comfort and eye safety — different jobs, both done!",
          ],
          npcZh: "完全正确！我们所有的太阳镜——无论偏光与否——都有 UV400 防护。眩光舒适和紫外线安全是两回事，这里两者都有。",
          task: "确认 UV400 的含义",
          options: [
            { text: "UV400 means it blocks all UVA and UVB rays, right? That's the standard I should look for?", ok: true, tip: "确认技术标准——买防护产品的专业素养" },
            { text: "UV400? Four hundred what? Four hundred suns? Bees?",                                       ok: false, tip: "确认标准：UV400 blocks UVA and UVB — right?" },
            { text: "Numbers big. Big number good. Buy big number glasses.",                                    ok: false, tip: "理解含义：UV400 blocks all UVA and UVB rays?" },
          ],
          phrase: { en: "UV400 protection", zh: "UV400 防护。", note: "阻挡 400nm 以下全部紫外线；太阳镜的安全底线" },
        },
        {
          npcLines: [
            "Perfectly said! Now, try these two polarized pairs — one gray lens, one brown. Gray keeps colors true; brown boosts contrast. Drivers love both.",
            "Exactly right! Try these two: gray polarized — true colors — or brown — extra contrast. Driver favorites, both of them.",
            "Couldn't have said it better! Here, two polarized options: gray for color accuracy, brown for contrast pop. Both beloved by drivers.",
          ],
          npcZh: "说得对！试试这两副偏光——灰片和棕片。灰片色彩真实；棕片增强对比度。司机两个都爱。",
          task: "对比试戴，选棕片（山路多）",
          options: [
            { text: "The brown gives me better contrast for mountain roads — I'll take those. Can I get them prescription?", ok: true, tip: "better contrast 更强对比 + 有度数需求，决策+追加" },
            { text: "Brown! Brown like bear! Bear driver! Rawr! Buy!",                                                        ok: false, tip: "理性决策：The brown gives better contrast — can I get them prescription?" },
            { text: "Prescription sunglasses? Too fancy. Magic not real.",                                                    ok: false, tip: "有度数太阳镜很常见：Can I get them prescription?" },
          ],
          phrase: { en: "Can I get them prescription?", zh: "能配度数吗？", note: "prescription sunglasses 有度数的太阳镜；近视党的救星" },
          adds: [{ emoji: "🕶️", label: "Polarized", wordId: "opt-sunglasses" }],
        },
        {
          npcLines: [
            "Prescription polarized, absolutely! It's one hundred eighty with the lenses — ready in five days, before your trip. Want a case and cleaning cloth included? On the house!",
            "Polarized with your prescription — no problem! One-eighty total, five-day turnaround — beats your departure! Case and cloth are free with purchase!",
            "Custom prescription polarized, coming up! One hundred eighty, ready in five days, trip-safe timing. And a case plus microfiber cloth, complimentary!",
          ],
          npcZh: "偏光带度数，没问题！含镜片 180 美元，5 天后好，赶得上你出发。镜盒和镜布免费送！",
          task: "确认时间线并下单",
          options: [
            { text: "One eighty, ready in five days, in time for the coast — let's do it. Thanks for the free case!", ok: true,  tip: "复述关键信息 + 感谢赠品——完美下单" },
            { text: "Five days exactly? Day six? Day four? Precision demands.",                                      ok: false, tip: "确认即可：Ready in five days, in time — let's do it!" },
            { text: "Free case? Free everything? Store losing money! Charity store!",                                 ok: false, tip: "欣然接受：Thanks for the free case!" },
          ],
          phrase: { en: "In time for ___.", zh: "赶得上……。", note: "in time for 及时赶上；时间敏感型消费的确认句" },
        },
        {
          npcLines: [
            "Enjoy the coast — and those mountain switchbacks will look incredible through brown polarized lenses! Safe driving!",
            "Have an amazing trip! Those brown lenses will make the coastal cliffs pop! Drive safe out there!",
            "Road trip of a lifetime incoming! Brown polarization + mountain roads = chef's kiss! Safe travels!",
          ],
          npcZh: "享受海岸吧——透过棕色偏光镜，山路发卡弯会美到窒息！一路平安！",
          task: "兴奋道别",
          options: [
            { text: "Glare-free driving ahead — I'm ready! Thanks for the science lesson and the shades!", ok: true,  tip: "science lesson 科学课——幽默认可专业知识" },
            { text: "Bye shade store! Shade man! Shade knowledge!",                                       ok: false, tip: "完整致谢：Thanks for the science lesson and the shades!" },
            { text: "Cliffs pop? Cliff music? Cliffs dangerous sound?",                                   ok: false, tip: "轻松收尾：I'm ready — thanks!" },
          ],
          phrase: { en: "Thanks for the science lesson!", zh: "谢谢你上的科学课！", note: "把购物变成学习——夸专业知识的高级说法" },
        },
      ],
    },
  ],
},
