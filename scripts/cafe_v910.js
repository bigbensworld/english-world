// 咖啡店职场线 v9-v10（角色反转：玩家扮演咖啡师，听顾客点单做输出）
// 注意：npcLines 在本线中是【顾客】的台词；玩家选项是【咖啡师的回应】
    {
      id: "v9",
      title: "第 9 次光顾 · 角色反转：你当咖啡师",
      titleEn: "Role Reversal: You're the Barista",
      emoji: "🧑‍🍳",
      desc: "换个身份！这次你站在吧台后面，听顾客点单、复述订单、处理特殊要求。听力+输出的终极考验。",
      reward: { en: "barista", zh: "你通过了咖啡师上岗考核！🧑‍🍳" },
      steps: [
        {
          npcLines: [
            "Hi there! Wow, first day as a barista? Welcome to the other side of the counter!",
            "Hey, new barista! Welcome behind the bar — very different view from here, right?",
            "Oh hi! You're our new barista? Welcome to the team! Ready to take your first order?",
          ],
          npcZh: "（店长）你好！哇，第一天当咖啡师？欢迎来到柜台另一边！",
          task: "向店长表态准备好接单了",
          options: [
            { text: "Ready as I'll ever be! Send the first customer my way.", ok: true,  tip: "Ready as I'll ever be 我已全力以赴准备好了——地道自信表达" },
            { text: "Yes! I am ready! Probably ready. Fifty percent ready.",  ok: false, tip: "自信应答：Ready as I'll ever be!" },
            { text: "Maybe ready. Coffee is mystery liquid. We shall see.",   ok: false, tip: "自信表态：Send the first customer my way!" },
          ],
          phrase: { en: "Ready as I'll ever be.", zh: "我已全力以赴准备好了。", note: "as...as I'll ever be 到达个人最佳状态；幽默又自信" },
        },
        {
          npcLines: [
            "Morning! Could I get a large oat milk latte with an extra shot, please?",
            "Hi! Large oat milk latte, extra shot, please!",
            "Good morning! Can I get a large latte with oat milk and an extra shot?",
          ],
          npcZh: "（顾客）早上好！来杯大杯燕麦奶拿铁，加一份浓缩，谢谢！",
          task: "复述订单确认（咖啡师基本功）",
          options: [
            { text: "So that's a large oat milk latte with an extra shot — coming right up!", ok: true,  tip: "So that's... 复述订单——咖啡师防错第一关" },
            { text: "One coffee! Coffee coming! Coffee done!",                                ok: false, tip: "复述细节：A large oat milk latte with an extra shot" },
            { text: "Large... something? Milk something? Shot of something?",                 ok: false, tip: "完整复述：Large oat milk latte, extra shot!" },
          ],
          phrase: { en: "So that's a large oat milk latte with an extra shot.", zh: "所以是一杯大杯燕麦奶拿铁加一份浓缩。", note: "复述订单 = 主动确认；So that's... 是标准开头" },
          adds: [{ emoji: "☕", label: "Oat latte", wordId: "latte" }],
        },
        {
          npcLines: [
            "Perfect, you got it! Oh — actually, could you make it iced instead of hot? It's warm out today.",
            "That's right! Oh wait — switch it to iced? It's too hot outside for a hot drink.",
            "Exactly! Actually, one change — iced instead of hot? Today's weather demands it!",
          ],
          npcZh: "（顾客）没错！哦——其实能改成冰的吗？今天外面挺热的。",
          task: "爽快接受修改并再次确认",
          options: [
            { text: "No problem — one iced large oat milk latte with an extra shot. Anything else?", ok: true,  tip: "No problem + 更新后的完整复述——改单也要确认到底" },
            { text: "Change?! Order is forever! No changes allowed!",                                ok: false, tip: "改单是常态：No problem — one iced oat milk latte, extra shot" },
            { text: "Iced hot latte? Make mind up, customer!",                                       ok: false, tip: "愉快接受改单：No problem — anything else?" },
          ],
          phrase: { en: "No problem — one iced...", zh: "没问题——一杯冰的……", note: "改单先说 No problem 再复述——服务话术黄金结构" },
        },
        {
          npcLines: [
            "That's all, thank you! You know, for a new barista, you repeat orders like a pro!",
            "That's everything — thanks! Hey, you repeat orders better than some veterans I've seen!",
            "Nope, that's it! By the way — your order-confirmation game is already pro-level!",
          ],
          npcZh: "（顾客）就这些，谢谢！说实话，作为新人，你复述订单的样子很专业！",
          task: "谦虚回应并告知取餐位置",
          options: [
            { text: "Thank you! Your drink will be ready at the end of the bar in just a few minutes.", ok: true,  tip: "at the end of the bar 吧台尽头——指路+时限，服务闭环" },
            { text: "Yes I am pro. Pro-est barista. Bow to pro barista.",                              ok: false, tip: "谦虚+专业：Your drink will be ready at the end of the bar" },
            { text: "Drink ready someday. Wait somewhere. Time unknown.",                              ok: false, tip: "给出时限：In just a few minutes, at the end of the bar" },
          ],
          phrase: { en: "It'll be ready in a few minutes.", zh: "几分钟后就好。", note: "服务承诺三要素：what + where + when" },
        },
        {
          npcLines: [
            "Hi, sorry to bother you — is it possible to get a drink with no caffeine at all? I'm super sensitive.",
            "Excuse me! Quick question — something totally caffeine-free? Even a little coffee keeps me up all night.",
            "Hi! Random request — any drinks with zero caffeine? I'm sadly very sensitive to it.",
          ],
          npcZh: "（顾客）你好，打扰一下——有没有完全不含咖啡因的饮品？我对咖啡因超敏感。",
          task: "推荐无咖啡因选项",
          options: [
            { text: "Of course! Our herbal teas are completely caffeine-free — the chamomile is lovely.", ok: true,  tip: "caffeine-free 无咖啡因 + 具体推荐，专业又贴心" },
            { text: "No caffeine? Coffee shop wrong shop. Go juice shop.",                              ok: false, tip: "有无咖啡因选项：Our herbal teas are completely caffeine-free" },
            { text: "All drinks have caffeine. Caffeine is law here.",                                   ok: false, tip: "推荐合适产品：The chamomile herbal tea is caffeine-free" },
          ],
          phrase: { en: "It's completely caffeine-free.", zh: "它完全不含咖啡因。", note: "caffeine-free / decaf（低因）是两个概念——decaf 仍含微量" },
          adds: [{ emoji: "🍵", label: "Herbal tea", wordId: "tea" }],
        },
        {
          npcLines: [
            "Chamomile sounds perfect, thank you! What a great first day you're having — see you next time!",
            "Chamomile it is — thanks! You're a natural at this! See you around, new barista!",
            "Lovely recommendation, thank you! Excellent first day energy — I'll be back!",
          ],
          npcZh: "（顾客）洋甘菊听起来完美，谢谢！你第一天干得真好——下次见！",
          task: "感谢顾客并道别",
          options: [
            { text: "Thank you! Enjoy your evening — hope to see you again soon!", ok: true,  tip: "Enjoy your evening 时段祝福——服务的最后一毫米" },
            { text: "Yes I am natural! Nature barista! Forest coffee!",           ok: false, tip: "双向祝福收尾：Enjoy your evening — see you again soon!" },
            { text: "Come back every day. Twice daily. Coffee dependency.",      ok: false, tip: "热情道别：Hope to see you again soon!" },
          ],
          phrase: { en: "Hope to see you again soon!", zh: "希望很快再见到你！", note: "服务收尾万能句；soon 让人感到被期待" },
        },
      ],
    },
    {
      id: "v10",
      title: "第 10 次光顾 · 高压早高峰",
      titleEn: "Rush Hour Challenge",
      emoji: "⚡",
      desc: "早高峰大军压境！连续处理点单、会员积分、听不清的订单——咖啡师的听力与应变终极测试。",
      reward: { en: "rush", zh: "你扛住了早高峰的考验！⚡" },
      steps: [
        {
          npcLines: [
            "Brace yourself — morning rush starts in two minutes! Remember: speed AND accuracy. You've got this!",
            "Okay, deep breath — the rush is coming! Speed plus accuracy, that's the motto. You're ready!",
            "Two minutes to rush hour! Our motto: fast and correct. You've trained for this — go!",
          ],
          npcZh: "（店长）准备好——早高峰两分钟后开始！记住：速度和准确都要。你可以的！",
          task: "表态迎接挑战",
          options: [
            { text: "Let's do this! Speed and accuracy — got it!", ok: true,  tip: "Let's do this! 迎战宣言 + 复述目标" },
            { text: "Rush hour? I know rush. I am rush. Rush is me.", ok: false, tip: "表态+复述：Speed and accuracy — got it!" },
            { text: "Maybe hide in storage room until afternoon? Asking for friend.", ok: false, tip: "迎战：Let's do this!" },
          ],
          phrase: { en: "Let's do this!", zh: "放马过来吧！", note: "迎接挑战的战斗口号；rush hour 早晚高峰" },
        },
        {
          npcLines: [
            "Morning! Grande soy latte, and I have my rewards card — can you scan it?",
            "Hi! Grande soy latte, and here's my rewards card for the points!",
            "Good morning! Can I get a grande soy latte — oh, and scan my rewards card?",
          ],
          npcZh: "（顾客）早上好！大杯豆奶拿铁，我有积分卡——能扫一下吗？",
          task: "接单并处理积分卡",
          options: [
            { text: "One grande soy latte — and yes, let me scan that for you. You've earned a free drink soon!", ok: true,  tip: "接单 + 扫卡 + 积分反馈——一气呵成的服务流" },
            { text: "Card? Card slow. Line long. Skip card. Coffee fast.",                                      ok: false, tip: "积分是顾客权益：Let me scan that for you" },
            { text: "Scan card? Machine scary. Machine no like me. Skip scan?",                                  ok: false, tip: "正常流程：One grande soy latte — let me scan your card" },
          ],
          phrase: { en: "Let me scan that for you.", zh: "我帮您扫一下。", note: "let me... 主动服务的万能开头；scan 扫码" },
          adds: [{ emoji: "💳", label: "Rewards", wordId: "rewards" }],
        },
        {
          npcLines: [
            "Hi, hi, sorry — I'm late for work! Tall americano, no room, and can you write 'Boss's coffee' on the cup? It's a whole thing.",
            "Morning! Huge rush — tall americano, no room, and label it 'Boss's coffee'? Long story, no time!",
            "Hey! Running late! Tall americano, no room — and could the cup say 'Boss's coffee'? Trust me, it matters!",
          ],
          npcZh: "（顾客）你好你好，抱歉——我上班要迟到了！中杯美式不加空间，杯子上能写『老板的咖啡』吗？说来话长。",
          task: "处理特殊要求（no room = 不要留加奶空间）",
          options: [
            { text: "One tall americano, no room, labeled 'Boss's coffee' — on it! Good luck at work!", ok: true,  tip: "no room 行话：美式不留空间=装满 + Good luck 顺祝" },
            { text: "No room? Every cup has room. Room is physics. Explain room.",                     ok: false, tip: "no room = 装满不加奶空间：One tall americano, no room — on it!" },
            { text: "Write on cup? Cups are sacred. No writing on cups.",                              ok: false, tip: "满足合理要求：Labeled 'Boss's coffee' — good luck!" },
          ],
          phrase: { en: "No room, please.", zh: "请装满（不留空间）。", note: "点美式行话：with room 留空间加奶 / no room 直接装满" },
          adds: [{ emoji: "⚡", label: "Americano", wordId: "coffee" }],
        },
        {
          npcLines: [
            "Um, hi — sorry, could you repeat my order? I said it really fast... grande, um, half-caf, um, with almond milk and honey?",
            "Hi, sorry — I mumbled my order! Was it... grande half-caf almond milk with honey? I honestly forget what I said!",
            "Oh no, I ordered too fast! Can you check — grande, half sweet? Half caf? Almond milk? Honey? Something!",
          ],
          npcZh: "（顾客）呃，你好——抱歉，能复述一下我的订单吗？我说太快了……大杯，半因，杏仁奶加蜂蜜来着？",
          task: "优雅处理顾客自己都不确定的订单",
          options: [
            { text: "No worries — I caught it: grande half-caf latte with almond milk and honey. Correct?", ok: true,  tip: "I caught it 我记下了 + Correct? 让顾客拍板——混乱订单的解法" },
            { text: "You order mystery. I guess drink. Mystery latte surprise!",                            ok: false, tip: "给出你听到的版本：Grande half-caf with almond milk and honey — correct?" },
            { text: "Customer forget order? Then order never happen. Next customer!",                       ok: false, tip: "复述确认：I caught it — correct?" },
          ],
          phrase: { en: "I caught it — correct?", zh: "我记下了——对吗？", note: "caught = 听清了；half-caf 半因咖啡是高峰高频单" },
        },
        {
          npcLines: [
            "Yes, exactly that! Phew — you're a lifesaver. Add a blueberry muffin and I'm out of here!",
            "That's it! Amazing memory — you saved me! Plus a blueberry muffin, and I'm gone!",
            "Perfect! You're a mind reader! Throw in a blueberry muffin and dash!",
          ],
          npcZh: "（顾客）对，就是这个！呼——你救命了。加个蓝莓玛芬我就撤了！",
          task: "快速完成加购并收尾",
          options: [
            { text: "One muffin added — that's eight seventy-five. Have a great morning!", ok: true,  tip: "报总价 + 时段祝福——高频场景极速服务" },
            { text: "Muffin added! Price is number! Pay number! Go!",                      ok: false, tip: "清晰报价：That's eight seventy-five — have a great morning!" },
            { text: "Muffin free for you! Muffin on house! Muffin chaos!",                 ok: false, tip: "正常收费：That's eight seventy-five!" },
          ],
          phrase: { en: "That's eight seventy-five.", zh: "一共 8.75 美元。", note: "收银报价用连读数字：eight seventy-five = $8.75" },
          adds: [{ emoji: "🧁", label: "Muffin", wordId: "muffin" }],
        },
        {
          npcLines: [
            "And... breathe! The rush is over. The manager just told me you handled eleven orders with zero mistakes. Zero!",
            "Okay, exhale! Rush complete! Manager's tally: eleven orders, zero errors. ZERO. Some veterans can't claim that!",
            "Rush hour, survived! Manager counted — eleven perfect orders from you today. Not a single mistake!",
          ],
          npcZh: "（店长）然后……呼！高峰结束了。经理刚告诉我你处理了 11 单，零失误。零！",
          task: "庆祝自己的表现",
          options: [
            { text: "Eleven orders, zero mistakes — not bad for my first rush hour! Thanks for the coaching!", ok: true,  tip: "not bad for... 对……来说不错了——谦虚式庆祝 + 感谢带教" },
            { text: "ZERO mistakes?! I am coffee god now. Retire at peak. Legend status.",                    ok: false, tip: "谦虚庆祝：Not bad for my first rush hour — thanks!" },
            { text: "Eleven is small number. Give hundred. Hundred orders. Challenge me.",                    ok: false, tip: "复盘庆祝：Not bad for my first rush — thank you!" },
          ],
          phrase: { en: "Not bad for my first try!", zh: "对第一次来说还不错！", note: "not bad for... 谦虚自夸句式；收放自如的庆祝" },
        },
      ],
    },
