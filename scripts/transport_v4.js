// 交通 v4：坐过站 / 落东西 / 绕路争议（出错意外）
{
  id: "v4",
  title: "第 4 次光顾 · 坐过站与落东西",
  titleEn: "Missed Stop & Lost Item",
  emoji: "😰",
  desc: "睡着了坐过站？手机落车上？怀疑司机绕路？出状况时最需要的应急英语。",
  reward: { en: "transfer", zh: "你解锁了出行应急英语，坐过站也不慌！😰➡️😌" },
  steps: [
    {
      npcLines: [
        "End of the line, sleepyhead! This is the last stop — everybody off!",
        "Wakey wakey! Last stop — time to get off, my friend!",
        "Sir? Ma'am? Last stop! The bus doesn't go any further than this!",
      ],
      npcZh: "终点站到啦，瞌睡虫！这是最后一站——所有人都下车！",
      task: "发现自己坐过站，询问怎么坐回去",
      options: [
        { text: "Oh no, I missed my stop! Which bus takes me back to Main Street?", ok: true,  tip: "I missed my stop! 坐过站的标准说法 + takes me back 问回程" },
        { text: "I sleep too much, bus gone past, how back?",                       ok: false, tip: "说 I missed my stop! How do I get back?" },
        { text: "Driver! Why you not wake me up at my stop?",                       ok: false, tip: "司机没义务提醒每位乘客：主动用 I missed my stop 寻求帮助" },
      ],
      phrase: { en: "I missed my stop!", zh: "我坐过站了！", note: "missed = 错过；公共交通应急第一句，司机一听就懂" },
    },
    {
      npcLines: [
        "No worries — the Number 12 across the street goes right back. It comes every ten minutes.",
        "Easy fix! Just hop on the 12 across the street — back to Main Street in fifteen minutes.",
        "Happens all the time! The 12 across the street will take you right back.",
      ],
      npcZh: "别担心——街对面的 12 路直接回去。每十分钟一班。",
      task: "确认方向，避免又坐反",
      options: [
        { text: "Thank you! Just to confirm — it's eastbound, right? I don't want to go the wrong way again.", ok: true,  tip: "Just to confirm 确认信息 + eastbound 向东行驶，防坐反" },
        { text: "OK bus 12 I take now fast fast.",                                 ok: false, tip: "先确认方向：Just to confirm — it's eastbound, right?" },
        { text: "Wrong way? Impossible, all buses same direction.",                ok: false, tip: "公交线路分方向：eastbound / westbound 要分清" },
      ],
      phrase: { en: "Just to confirm, ___?", zh: "确认一下，……对吗？", note: "防错三连：确认方向、确认站名、确认线路，出门在外多问一句" },
    },
    {
      npcLines: [
        "Taxi! Taxi! Where to, buddy? Hop in — where can I take you?",
        "Hey there! Need a cab? Jump in — where are we headed?",
        "You flagged me down, so I guess you need a ride! Where to?",
      ],
      npcZh: "打车！去哪儿，朋友？上车吧——带您去哪？",
      task: "报出目的地（火车站），并要求走最快路线",
      options: [
        { text: "Hi! Central Station, please — and could you take the fastest route? I'm in a bit of a hurry.", ok: true,  tip: "take the fastest route 走最快路线 + in a hurry 赶时间" },
        { text: "Station! Go go go! Very fast, very hurry!",                      ok: false, tip: "礼貌+清楚：Central Station, please. Could you take the fastest route?" },
        { text: "Train place. You know. The one with trains.",                    ok: false, tip: "报具体名：Central Station；含糊说法司机听不懂" },
      ],
      phrase: { en: "Could you take the fastest route?", zh: "能走最快的路线吗？", note: "赶时间搭车标准句；也可说 the quickest way" },
    },
    {
      npcLines: [
        "Hmm... the meter says eighteen fifty. We're here — Central Station!",
        "Okay, we made good time! That'll be eighteen fifty on the meter.",
        "Central Station! Meter says eighteen fifty, buddy.",
      ],
      npcZh: "嗯……计价器显示 18.5 元。到了——中央车站！",
      task: "觉得路线比平时长，礼貌质疑是否绕路",
      options: [
        { text: "Excuse me, that seems higher than usual. Did we take a longer route? I usually pay about twelve.", ok: true,  tip: "seems higher than usual 比平时贵 + Did we take a longer route? 礼貌质疑绕路" },
        { text: "You cheating me! Too much money! Bad driver!",                   ok: false, tip: "指控性语言升级冲突；礼貌质疑更有效：That seems higher than usual" },
        { text: "OK OK here money take it.",                                      ok: false, tip: "有疑虑先核实：Did we take a longer route?" },
      ],
      phrase: { en: "Did we take a longer route?", zh: "我们是不是绕路了？", note: "礼貌质疑 = 陈述观察（seems higher）+ 提问，不直接指控" },
    },
    {
      npcLines: [
        "Oh! You're right, sorry about that — there was construction, I should've told you. Let's make it fifteen, fair?",
        "Fair point! There was road work and I forgot to mention it. Fifteen even, okay?",
        "You got me — construction detour, my bad for not saying. I'll knock it down to fifteen.",
      ],
      npcZh: "哦！您说得对，抱歉——刚才有施工，我该提前说的。算 15 元，公平吧？",
      task: "接受司机的折中方案，表达理解",
      options: [
        { text: "That's fair — thanks for being honest. Construction happens!",    ok: true,  tip: "That's fair 接受方案 + Thanks for being honest 肯定坦诚" },
        { text: "Fifteen still too much! Ten or I call police!",                  ok: false, tip: "已获折中方案，得理饶人：That's fair" },
        { text: "Hmph. Fine. Never taxi again ever.",                             ok: false, tip: "表达理解留下好印象：Thanks for being honest" },
      ],
      phrase: { en: "That's fair.", zh: "这样公平。", note: "接受折中方案的体面表达；fair = 公平合理" },
    },
    {
      npcLines: [
        "Whoa whoa — the door! Careful! Did you leave your phone on the seat back there?",
        "Hold on! Sir! I think that's your phone on the back seat!",
        "Wait wait wait — something's beeping back there... your phone, buddy!",
      ],
      npcZh: "哎哎——车门！等等！您的手机是不是落在后座了？",
      task: "感谢司机提醒，取回手机",
      options: [
        { text: "Oh my gosh, my phone! I can't believe I almost left it. Thank you so much!", ok: true,  tip: "I can't believe I almost left it 后怕感叹 + Thank you so much 真诚致谢" },
        { text: "Phone? Not mine. Maybe other passenger.",                        ok: false, tip: "先检查是不是自己的：Oh my gosh, my phone!" },
        { text: "Yes give. Bye.",                                                 ok: false, tip: "差点丢手机，值得一句真诚感谢：Thank you so much!" },
      ],
      phrase: { en: "I can't believe I almost ___!", zh: "真不敢相信我差点……！", note: "后怕感叹句型：almost left it / almost missed it" },
    },
    {
      npcLines: [
        "No problem — happens every single day in this city! Have a safe trip, and check your pockets next time!",
        "All good, buddy! Twenty years of driving, I've returned a thousand phones! Take care!",
        "Anytime! You'd be surprised how many phones I find back there. Safe travels!",
      ],
      npcZh: "没事——这城市每天都会发生！旅途平安，下次记得检查口袋！",
      task: "告别并感谢热心司机",
      options: [
        { text: "I will! You really saved my day. Thanks again — take care!",     ok: true,  tip: "You saved my day 你帮了我大忙 + take care 道别" },
        { text: "Bye bye taxi man.",                                              ok: false, tip: "告别升级：You saved my day. Thanks again — take care!" },
        { text: "OK end talk now goodbye.",                                       ok: false, tip: "真诚收尾：You really saved my day!" },
      ],
      phrase: { en: "You saved my day!", zh: "你真是帮了我大忙！", note: "save the day = 挽救局面；对帮助者的高频感谢语" },
    },
  ],
},
