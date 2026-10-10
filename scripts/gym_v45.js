// 健身房 v4：受伤与器械故障（功能位③出错意外）
{
  id: "v4",
  title: "第 4 次光顾 · 受伤与求助",
  titleEn: "Injury & Help",
  emoji: "🩹",
  desc: "手腕突然刺痛？跑步机坏了卡在上面？健身房出状况时的求助与应急英语。",
  reward: { en: "sore", zh: "你解锁了健身房应急英语，受伤不慌！🩹" },
  steps: [
    {
      npcLines: [
        "Whoa, easy there — you okay? You're holding your wrist kinda funny.",
        "Hey hey, you good? That wrist grab looks painful...",
        "You alright? You winced pretty hard on that last rep!",
      ],
      npcZh: "哇，慢点——你还好吗？你扶手腕的姿势有点不对劲。",
      task: "描述手腕突然刺痛",
      options: [
        { text: "I felt a sharp pain in my wrist during that last set. I think I should stop.", ok: true,  tip: "a sharp pain 刺痛 + I should stop 及时止损——受伤第一原则" },
        { text: "Pain is weakness leaving body! Continue!",            ok: false, tip: "刺痛≠正常酸痛：A sharp pain — I should stop" },
        { text: "Wrist broken probably. Will fix with more lifting.",   ok: false, tip: "锐痛要停：I felt a sharp pain — I should stop" },
      ],
      phrase: { en: "I felt a sharp pain.", zh: "我感到一阵刺痛。", note: "sharp pain 刺痛 vs sore 酸痛——前者要停，后者正常" },
    },
    {
      npcLines: [
        "Smart call — never push through sharp pain. Let's ice it. The first aid kit's at the front desk, can you walk over?",
        "Good instinct! Sharp pain means stop. Ice pack's up front — think you can walk there?",
        "Exactly right! Pushing through sharp pain is how injuries happen. Ice is at the desk — walk with me?",
      ],
      npcZh: "明智的决定——刺痛绝不能硬撑。来冰敷一下。急救箱在前台，能走过去吗？",
      task: "询问需要看医生吗",
      options: [
        { text: "I can walk. Should I see a doctor, or is rest and ice enough for now?", ok: true,  tip: "see a doctor 看医生 + or is...enough 分级判断" },
        { text: "Doctor? Doctors are for weak! Ice fix everything!",  ok: false, tip: "判断伤情等级：Should I see a doctor?" },
        { text: "Schedule surgery immediately. I self-diagnosed.",     ok: false, tip: "先分级：Rest and ice, or see a doctor?" },
      ],
      phrase: { en: "Should I see a doctor?", zh: "我需要看医生吗？", note: "伤情分级标准问句——让对方（往往有急救培训）给建议" },
    },
    {
      npcLines: [
        "Ice and rest today; if it's still swollen tomorrow, get it checked. Now sit — I'll grab the ice pack. Be right back!",
        "Today: ice and rest. Tomorrow: if swollen, doctor! Sit tight, ice incoming!",
        "RICE it today — rest, ice! Swelling tomorrow means a check-up. Wait here!",
      ],
      npcZh: "今天冰敷休息；明天还肿就去检查。坐一下——我去拿冰袋，马上回！",
          task: "等待时发现旁边跑步机有人在拍打机器",
      options: [
        { text: "Excuse me — is the treadmill not working? That banging sounds frustrating.", ok: true,  tip: "is it not working 坏了吗 + 主动关心——帮助他人也是练习" },
        { text: "Stop banging machine! Machine innocent!",           ok: false, tip: "友好询问：Is the treadmill not working?" },
        { text: "I watch quietly. Drama is free entertainment.",       ok: false, tip: "主动关心：Is the treadmill not working?" },
      ],
      phrase: { en: "Is it not working?", zh: "它坏了吗？", note: "疑问否定式确认故障——比 What's wrong 更直接" },
    },
    {
      npcLines: [
        "It just stopped dead mid-run! The belt froze and the screen went black. Third time this week!",
        "Dead treadmill! Belt froze, screen black — twice this week already! I just want to run!",
        "Machine died mid-sprint! Belt locked, screen dark. This treadmill has trust issues!",
      ],
      npcZh: "跑一半突然死了！履带卡住，屏幕黑屏。这周第三次了！",
      task: "帮她向工作人员报告故障",
      options: [
        { text: "That sounds dangerous. Let's report it together — staff should put an out-of-order sign on it before someone gets hurt.", ok: true,  tip: "out-of-order sign 故障停用牌 + before someone gets hurt 预防伤害" },
        { text: "Bad machine! I also hit machine in solidarity!",      ok: false, tip: "正确动作：Report it — put an out-of-order sign on it" },
        { text: "Third time? Machine obviously hates you personally.",  ok: false, tip: "一起报修：Let's report it together" },
      ],
      phrase: { en: "It's out of order.", zh: "它故障停用了。", note: "out of order = 故障中（电梯/跑步机/售货机通用）；告示牌叫 out-of-order sign" },
    },
    {
      npcLines: [
        "You two are lifesavers! I'll tag it right now and call maintenance. Ma'am, here's your ice pack — and a free smoothie for the wrist!",
        "Reporting like pros! Tagging it now, maintenance is on speed dial. And here — ice for you, smoothie on the house for the pain!",
        "Teamwork! Machine gets tagged, maintenance gets called, and you get ice plus a smoothie. Everybody wins!",
      ],
      npcZh: "你们俩救了大家！我马上挂牌并叫维修。这位女士，您的冰袋——另外送一杯果饮慰问手腕！",
      task: "感谢帮助，总结今天的教训",
      options: [
        { text: "Thanks! Lesson learned: listen to your body, and speak up when equipment acts up.", ok: true,  tip: "listen to your body 听身体的信号 + speak up 大声说出来——双总结" },
        { text: "Lesson learned: gym is dangerous, never return.",      ok: false, tip: "积极总结：Listen to your body, and speak up" },
        { text: "Smoothie received. All pain forgotten. Lessons none.",  ok: false, tip: "总结经验：Listen to your body, speak up" },
      ],
      phrase: { en: "Listen to your body.", zh: "听身体的话。", note: "健身安全第一课——sharp pain = stop；soreness = grow" },
    },
    {
      npcLines: [
        "Couldn't have said it better! Rest that wrist, and we'll see you when you're healed. Heal fast!",
        "Words to lift by! Ice up, rest up, come back strong. Get well soon!",
        "That's the wisdom right there! Heal up — the dumbbells will miss you!",
      ],
      npcZh: "说得太好了！让手腕休息，好了再见。祝早日康复！",
      task: "告别并确认暂停训练的建议",
      options: [
        { text: "Will do — light cardio only until it heals? Or complete rest?", ok: true,  tip: "light cardio 轻量有氧 + or complete rest 二选一确认恢复方案" },
        { text: "Heal fast? I will train wrist extra hard for revenge!", ok: false, tip: "确认恢复方案：Light cardio only, or complete rest?" },
        { text: "Goodbye forever gym people!",                          ok: false, tip: "问恢复方案再走：Light cardio, or complete rest?" },
      ],
      phrase: { en: "Light cardio, or complete rest?", zh: "轻度有氧，还是完全休息？", note: "恢复期训练分级问法——受伤不等于完全不动，但要问专业人士" },
    },
  ],
},
// 健身房 v5：健身房文化与礼仪深潜（功能位④文化潜规则）
{
  id: "v5",
  title: "第 5 次光顾 · 健身文化与礼仪",
  titleEn: "Gym Culture 101",
  emoji: "🤝",
  desc: "为什么没人说话但都在点头？要不要给教练圣诞礼物？健身房不成文的规矩与人情世故。",
  reward: { en: "spot me", zh: "你解锁了健身房文化密码，成为真正的圈内人！🤝" },
  steps: [
    {
      npcLines: [
        "Hey, healed up and back! Ready for a light day?",
        "Look who's back! Wrist all better? Light session today?",
        "The return! How's the wrist — ready for easy mode?",
      ],
      npcZh: "嘿，养好回来了！今天来个轻量日？",
      task: "确认康复，请教健身房的\"点头文化\"",
      options: [
        { text: "All healed, thanks! Quick question — people here always nod at me but never talk. Is that a gym thing?", ok: true,  tip: "nod at me 对我点头 + Is that a gym thing? 这是健身房的规矩吗——文化观察式提问" },
        { text: "Why nodding strangers? Nodding cult?",              ok: false, tip: "观察+提问：People nod but never talk — is that a gym thing?" },
        { text: "Everyone nods. I nod back. We are nod brothers now.", ok: false, tip: "问文化内涵：Is that a gym thing?" },
      ],
      phrase: { en: "Is that a gym thing?", zh: "这是健身房的什么讲究吗？", note: "Is that a ___ thing? = 这是……的规矩吗？——文化观察万能句" },
    },
    {
      npcLines: [
        "Ha! Yes — the gym nod! It means 'I see you, I respect the effort, I won't interrupt your workout.' It's the highest form of gym friendship!",
        "The sacred gym nod! Translation: 'Respect. Keep going. No words needed.' It's basically a friendship bracelet!",
        "You've unlocked the nod! It says: mutual respect, zero small talk. Gym friendship level: achieved!",
      ],
      npcZh: "哈！是的——健身房点头礼！意思是\"我看见你了，我尊重你的努力，我不打断你的训练\"。这是健身友谊的最高形式！",
      task: "追问还有哪些不成文的规矩",
      options: [
        { text: "That's actually kind of beautiful. What other unwritten rules should I know?", ok: true,  tip: "What other unwritten rules? 深挖潜规则——文化深潜核心句" },
        { text: "Nod is enough friendship. No more rules needed ever.", ok: false, tip: "继续挖：What other unwritten rules should I know?" },
        { text: "Rules without writing? Illegal rules?",              ok: false, tip: "unwritten rules = 潜规则/不成文惯例：What other ones should I know?" },
      ],
      phrase: { en: "What other unwritten rules?", zh: "还有哪些不成文的规矩？", note: "每个圈子都有自己的潜规则——此句一问，圈内人立刻打开话匣" },
    },
    {
      npcLines: [
        "Big three: wipe down your equipment, never sit on a machine scrolling your phone between sets, and don't drop the weights unless you're failing a rep.",
        "The holy trinity: wipe your bench, no phone camps on machines, and no weight-dropping unless it's life or death!",
        "Rule one: wipe. Rule two: phones down between sets, not hour-long camps. Rule three: weights get dropped only in emergencies!",
      ],
      npcZh: "三大铁律：擦干净器械、别坐在器械上刷手机、非力竭别摔杠铃。",
      task: "对\"摔杠铃\"规矩表示好奇",
      options: [
        { text: "Wait — dropping weights is allowed sometimes? When exactly?", ok: true,  tip: "allowed sometimes 何时允许 + When exactly 精确追问" },
        { text: "Drop weights = strong person announcement, yes?",    ok: false, tip: "问例外情形：When exactly is it allowed?" },
        { text: "Never drop weights. Weights are family.",            ok: false, tip: "有例外：When exactly is dropping allowed?" },
      ],
      phrase: { en: "When exactly?", zh: "具体是什么时候？", note: "exactly 逼出精确边界——把模糊规则问成清晰规则" },
    },
    {
      npcLines: [
        "Only on your last rep when your muscles fail — that's a 'failed rep,' and dropping beats injuring. But a bicep curl drop? That's just noise!",
        "Safety drop on a failed rep: totally fine! Dropping dumbbells after curls to look strong: gym crime!",
        "Failing a heavy squat? Drop it, live! Showing off with ten-pound curls? Keep it quiet, please!",
      ],
      npcZh: "只在最后一组力竭时——那叫\"力竭组\"，扔掉杠铃好过受伤。但弯举完摔哑铃？那纯粹是噪音！",
      task: "请教年底要不要给教练送礼物",
      options: [
        { text: "Good to know! One more: do people give their trainers gifts during the holidays?", ok: true,  tip: "give sb gifts 送礼 + during the holidays 节日期间——人情世故边界" },
        { text: "Trainer gift? I pay money already. Money is gift.",  ok: false, tip: "行业惯例可问：Do people give trainers holiday gifts?" },
        { text: "Gift-giving analysis needed. Complete gift taxonomy.", ok: false, tip: "简单问：Do people give their trainers gifts?" },
      ],
      phrase: { en: "Do people give ___ gifts?", zh: "大家会给……送礼吗？", note: "Do people...? 问惯例而非问个人——得到的是社会规范答案" },
    },
    {
      npcLines: [
        "Totally optional, but a small gift or a heartfelt thank-you card goes a long way. Twenty to fifty dollars, or something homemade. Never expected, always appreciated!",
        "Optional but powerful! A card, a small gift, maybe twenty-fifty bucks. Trainers never expect it — and never forget it!",
        "No obligation, all heart! Handwritten card or small gift — that stuff keeps trainers going for months!",
      ],
      npcZh: "完全自愿，但小礼物或手写感谢卡意义很大。20-50 美元或自制小物。从不强求，但永远被感激！",
      task: "追问新手最常犯的文化错误",
      options: [
        { text: "Noted! Last question — what's the most common mistake newbies make here, culture-wise?", ok: true,  tip: "culture-wise 在文化方面 + most common mistake 最常见错误——避坑收官问" },
        { text: "Newbie mistakes? I make all mistakes. List them all.", ok: false, tip: "聚焦文化类：The most common mistake, culture-wise?" },
        { text: "I fear no mistakes. Mistakes fear me.",               ok: false, tip: "提前避坑：What's the most common cultural mistake?" },
      ],
      phrase: { en: "What's the most common mistake?", zh: "最常犯的错误是什么？", note: "wise 后缀 = 在……方面（culture-wise / money-wise）；老手最爱答的问题" },
    },
    {
      npcLines: [
        "Hogging the squat rack for an hour with phone breaks! You'll see the death stares. But you? You ask questions and respect the rules — you're already gym fluent!",
        "The rack hogger — forty-minute phone sessions at the squat rack! You though? You're basically a local already. Gym fluent!",
        "Rack campers with phones — public enemy number one! You? You ask, you wipe, you nod — certified regular!",
      ],
      npcZh: "占着深蹲架刷一小时手机！你会收到死亡凝视的。但你呢？你提问、守规矩——你已经\"健身房母语\"了！",
      task: "幽默回应『健身房母语』认证",
      options: [
        { text: "Gym fluent — I'll put that on my resume! Thanks for the culture lessons today!", ok: true,  tip: "put that on my resume 写进简历——自嘲式幽默接梗 + 感谢收尾" },
        { text: "Resume is for jobs. Muscles are for life.",          ok: false, tip: "接住幽默：Gym fluent — I'll put that on my resume!" },
        { text: "Fluent? I still nod wrong probably.",                 ok: false, tip: "自信接梗：I'll put that on my resume!" },
      ],
      phrase: { en: "I'll put that on my resume!", zh: "我要把这写进简历！", note: "幽默自夸固定句——任何小技能认证都能用" },
    },
  ],
},
