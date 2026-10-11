    {
      id: "v2",
      title: "第 2 次光顾 · 全家福大作战",
      titleEn: "Family Portrait",
      emoji: "👨‍👩‍👦",
      desc: "全家福拍摄日！协调全家姿势、逗娃表情、抓拍 chaos——家庭摄影的欢乐战场。",
      reward: { en: "family portrait", zh: "全家的幸福定格了！👨‍👩‍👦" },
      steps: [
        {
          npcLines: [
            "The whole family, all at once! Welcome! Who do we have here — let me guess, mom, dad, and the star of the show?",
            "Oh, the full crew! Welcome in! Mom, dad, and — clearly — the boss of the family?",
            "A family portrait day! My favorite! So that's mom, dad, and the small CEO running things?",
          ],
          npcZh: "全家一起来！欢迎！都有谁——我猜猜，妈妈、爸爸，还有这位主角？",
          task: "介绍家人",
          options: [
            { text: "You guessed it! This is my husband, and the boss is our daughter Emma — she's three, so brace yourself.", ok: true,  tip: "brace yourself 做好心理准备——带娃拍摄的真实预告" },
            { text: "Family of three! Emma is boss! Toddler tyrant! Wish us luck!",                                              ok: false, tip: "自然介绍：My husband, and our daughter Emma — she's three, so brace yourself" },
            { text: "Emma does not cooperate. Emma rules with iron fist. Send prayers.",                                          ok: false, tip: "幽默介绍：The boss is our daughter Emma — brace yourself!" },
          ],
          phrase: { en: "Brace yourself.", zh: "做好心理准备。", note: "brace 支撑住；预告混乱的幽默用语" },
        },
        {
          npcLines: [
            "Three-year-olds are my specialty — I have puppet tricks you wouldn't believe! Shall we start with the whole family, or Emma solo first?",
            "Toddlers are my superpower — my puppet game is legendary! Order of operations: family first, or Emma's solo debut?",
            "Age three is my sweet spot — puppets, silly noises, the works! Start with the group, or the star's solo shots?",
          ],
          npcZh: "三岁娃是我的专长——我有你不敢相信的玩偶绝技！先拍全家还是先拍 Emma 单人？",
          task: "采纳建议（先拍单人热身）",
          options: [
            { text: "Emma solo first to warm her up — smart. Whatever gets a real smile, we'll do it.", ok: true,  tip: "warm up 热身 + real smile 真笑——目标导向决策" },
            { text: "Puppet tricks! Show puppets! Puppet magic now! Emma will obey puppets!",           ok: false, tip: "信任策略：Emma solo first to warm her up — whatever gets a real smile" },
            { text: "Family first! Suffer together! Group chaos immediately!",                         ok: false, tip: "合理排序：Let's warm her up with solo shots first" },
          ],
          phrase: { en: "Whatever it takes.", zh: "不惜一切手段。", note: "whatever it takes 用尽一切办法——目标的最高承诺" },
        },
        {
          npcLines: [
            "Emma, look at this! [puppet appears] Look at THIS guy! ...And she's laughing — quick, natural smiles from mom and dad too!",
            "Emma! What's THIS?! [puppet] ...There's the laugh! Parents — smile while the magic lasts!",
            "Hey Emma, meet my friend! [puppet] ...GOT the giggle! Mom, dad — faces, quick, quick!",
          ],
          npcZh: "Emma，看这个！（玩偶出现）看这家伙！……她笑了——爸爸妈妈也赶紧自然地笑！",
          task: "配合抓拍，互相逗笑",
          options: [
            { text: "[tickle Emma] You can't laugh! Don't you dare laugh! ...She's laughing — perfect chaos!", ok: true,  tip: "反向逗娃法 Don't you dare laugh——真实互动出真笑" },
            { text: "EMMA SMILE! SMILE NOW! DEMAND JOY! JOY IS MANDATORY!",                                     ok: false, tip: "自然互动：[tickle] Don't you dare laugh! — perfect chaos!" },
            { text: "I stand stiff. Statue parent. No help. Professional stillness.",                           ok: false, tip: "参与互动：逗她笑——perfect chaos!" },
          ],
          phrase: { en: "Don't you dare laugh!", zh: "你敢笑试试！", note: "don't you dare 你敢……！；反向激将逗娃法" },
          adds: [{ emoji: "🧸", label: "Real smiles", wordId: "ps-saycheese" }],
        },
        {
          npcLines: [
            "That's the stuff — genuine laughter beats 'say cheese' every time! Okay, let's try one formal pose now: dad behind, mom and Emma in front.",
            "THAT is portrait gold — real laughs destroy 'say cheese'! Now a classic formation: dad in the back, mom and Emma front and center!",
            "Genuine beats posed, always! Formal attempt now: dad as the backdrop, mom and Emma in front!",
          ],
          npcZh: "就是这个——真笑完胜『说 cheese』！来个正式姿势：爸爸在后，妈妈和 Emma 在前。",
          task: "全家摆正式姿势",
          options: [
            { text: "Like this? Emma, hold my hand — and everyone look at the camera on three!", ok: true,  tip: "on three 数到三——集体照口令" },
            { text: "Pose assembled! Human pyramid next! Portrait acrobatics! Extreme family!",  ok: false, tip: "自然引导：Emma, hold my hand — look at the camera on three!" },
            { text: "Formal face on. Serious family. No fun allowed. History portrait style.",  ok: false, tip: "口令协调：Everyone look at the camera on three!" },
          ],
          phrase: { en: "On three!", zh: "数到三！", note: "on three 数三下；集体照的同步暗号" },
        },
        {
          npcLines: [
            "One, two, three! [click] ...One more, someone blinked — dad, that was all you! One, two, three! [click] Perfect!",
            "Three, two, one! [click] Blink alert — dad, the eyes were closed! Again! Three, two, one! [click] Nailed it!",
            "On three! [click] Ooh — dad blinked that round! Reset! Three! [click] Frame-worthy!",
          ],
          npcZh: "一、二、三！（咔嚓）……再来，有人眨眼了——爸爸，就是你！一、二、三！（咔嚓）完美！",
          task: "拿爸爸眨眼开玩笑",
          options: [
            { text: "Dad's famous blink strikes again — good thing you're patient. How many shots do we have to choose from?", ok: true,  tip: "拿家人打趣 + 问底片数量——选片前置" },
            { text: "Blinking dad! Family curse! Dad eyes broken! More chances needed!",                                       ok: false, tip: "幽默+提问：Good thing you're patient — how many shots do we have?" },
            { text: "I never blink. I am camera god. Blame dad forever. Dad is blink villain.",                               ok: false, tip: "轻松提问：How many shots do we choose from?" },
          ],
          phrase: { en: "How many shots do we have?", zh: "我们有多少张可选？", note: "shots 拍摄张数；选片的基数概念" },
        },
        {
          npcLines: [
            "About forty shots total! I'll have your online proof gallery ready tonight — pick your favorites, and prints arrive in a week. The kids were troopers!",
            "Roughly forty frames! Proof gallery lands in your inbox tonight — pick the winners, prints in a week. Emma was a rockstar!",
            "Forty-ish keepers! Gallery link coming tonight — choose your favorites, prints in seven days. What a family!",
          ],
          npcZh: "总共约 40 张！今晚线上小样相册就好——选出最喜欢的，一周后成片到。孩子们太给力了！",
          task: "感谢并道别",
          options: [
            { text: "Forty shots and zero meltdowns — a miracle. Thank you for making it fun!", ok: true,  tip: "zero meltdowns 零崩溃——带娃拍摄的最高评价" },
            { text: "No crying! No running! No chaos! Impossible result! Studio wizardry!",     ok: false, tip: "幽默总结：Forty shots and zero meltdowns — thank you!" },
            { text: "Emma will remember this day. Or not. She is three. Memories optional.",    ok: false, tip: "真诚致谢：Thank you for making it fun!" },
          ],
          phrase: { en: "Zero meltdowns!", zh: "零崩溃！", note: "meltdown 崩溃（尤其指小孩）；家庭活动的成功指标" },
        },
      ],
    },
