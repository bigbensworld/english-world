// 交通场景 第 1 轮：公交与地铁（8 步）
{
  id: "v1",
  title: "第 1 次光顾 · 公交与地铁",
  titleEn: "Bus & Subway",
  emoji: "🚌",
  desc: "第一次坐国外的公交和地铁！问路线、看站牌、刷卡进闸、听报站——顺利抵达目的地。",
  reward: { en: "subway", zh: "你搞定了英文公交地铁出行，城市任你穿行！🚌" },
  steps: [
    {
      npcLines: [
        "Good morning! How can I help you today?",
        "Morning! Need some help with directions?",
        "Hi there! You look a little lost — anything I can do?",
      ],
      npcZh: "早上好！今天有什么可以帮您？",
      task: "询问去市中心图书馆坐几路公交",
      options: [
        { text: "Excuse me, which bus goes to the City Library?", ok: true,  tip: "Which bus goes to...? 问公交线路的万能句" },
        { text: "Library bus where which number take?",          ok: false, tip: "说 Which bus goes to the City Library?" },
        { text: "I want library, bus me there.",                ok: false, tip: "更礼貌：Excuse me, which bus goes to...?" },
      ],
      phrase: { en: "Which bus goes to ___?", zh: "去……坐几路公交？", note: "问公交线路标准句；地铁则问 Which line goes to...?" },
    },
    {
      npcLines: [
        "The Number 12 bus goes straight there. It stops right in front of the library!",
        "You'll want the 12 — it drops you off right at the library door!",
        "Hop on the Number 12, it stops right outside the library!",
      ],
      npcZh: "12 路公交直达。就停在图书馆门口！",
      task: "询问在哪一站上车、多久一班",
      options: [
        { text: "Great! Where's the nearest stop, and how often does it run?", ok: true,  tip: "how often does it run? 问发车频率" },
        { text: "Bus stop where is? Bus come many time?",                     ok: false, tip: "说 Where's the stop, and how often does it run?" },
        { text: "12 bus stop near here find for me.",                          ok: false, tip: "两个问题一起问：Where's the stop + how often?" },
      ],
      phrase: { en: "How often does it run?", zh: "多久一班？", note: "run 指车辆运行；公交/地铁/班车都这么问" },
    },
    {
      npcLines: [
        "The stop is just around the corner. Buses run every ten minutes. Do you have a transit card?",
        "Right around the corner! A bus every ten minutes or so. Got a transit card?",
        "Corner right there — buses every ten minutes. You have a transit card with you?",
      ],
      npcZh: "站台就在拐角处。公交每十分钟一班。您有交通卡吗？",
      task: "没有交通卡，问怎么买票",
      options: [
        { text: "No, I don't. Where can I buy a ticket or a transit card?", ok: true,  tip: "transit card 交通卡；买票/办卡一次问清" },
        { text: "No card. Give ticket to me please.",                      ok: false, tip: "问地点：Where can I buy a ticket?" },
        { text: "I have money cash only, work on bus?",                    ok: false, tip: "先问购买点：Where can I buy a ticket or card?" },
      ],
      phrase: { en: "Where can I buy a transit card?", zh: "哪里能买交通卡？", note: "transit card 泛指公交卡；纽约叫 MetroCard，伦敦叫 Oyster" },
    },
    {
      npcLines: [
        "There's a vending machine right at the stop. You can also pay exact cash when you board. Just have coins ready!",
        "Vending machine at the stop, or exact change on board. Keep some coins handy!",
        "Machine's at the stop — or exact cash as you get on. Coins are key!",
      ],
      npcZh: "站台就有自动售票机。上车投币（需精确金额）也行。备好硬币！",
      task: "在售票机买票时遇到问题，找人帮忙",
      options: [
        { text: "Excuse me, could you show me how to use this machine? It's my first time.", ok: true,  tip: "It's my first time 说明新手身份，获得耐心讲解" },
        { text: "Machine broken? My money not go in.",                                     ok: false, tip: "求助模板：Could you show me how to use it?" },
        { text: "Help me buy ticket do it for me fast.",                                    ok: false, tip: "求指导而非代劳：Could you show me how?" },
      ],
      phrase: { en: "Could you show me how to use this?", zh: "能教我怎么用吗？", note: "机器求助万能句（售票机/自助机/闸机通用）" },
      adds: [{ emoji: "🎫", label: "Ticket ✓", badge: true }],
    },
    {
      npcLines: [
        "Sure! Tap where you want to go, insert coins here, and your ticket prints. Easy!",
        "No problem! Choose your stop, pop in the coins, and out comes the ticket!",
        "Happy to help! Destination first, coins second, ticket third. You got this!",
      ],
      npcZh: "当然！点目的地、投币、出票。很简单！",
      task: "上车后向司机确认到站提醒",
      options: [
        { text: "Thank you! Could you let me know when we get to the City Library?", ok: true,  tip: "Could you let me know when...? 请人到站提醒的礼貌句" },
        { text: "Driver, library time you tell me yes?",                            ok: false, tip: "说 Could you let me know when we get there?" },
        { text: "Wake me library stop shout loudly.",                                ok: false, tip: "更自然：Could you let me know when we get to...?" },
      ],
      phrase: { en: "Could you let me know when we get to ___?", zh: "到……站能叫我一下吗？", note: "公交/火车请人提醒到站，听不懂报站时的保命句" },
    },
    {
      npcLines: [
        "Of course! It's the ninth stop — about twenty minutes. I'll give you a shout!",
        "You got it! Ninth stop, roughly twenty minutes. I'll holler when we're there!",
        "Sure thing! Nine stops, twenty minutes. I'll let you know!",
      ],
      npcZh: "当然！第九站，大约二十分钟。到时我叫您！",
      task: "换乘地铁时看不懂线路图，问工作人员",
      options: [
        { text: "Excuse me, which line should I take for Central Station, and where do I transfer?", ok: true,  tip: "transfer 换乘；line 线路——地铁问路两大关键词" },
        { text: "Central Station where? Which train I go?",                                        ok: false, tip: "说 Which line should I take, and where do I transfer?" },
        { text: "Subway map too confusing, just tell me everything.",                              ok: false, tip: "精准提问：Which line + where to transfer" },
      ],
      phrase: { en: "Which line should I take, and where do I transfer?", zh: "该坐哪条线，在哪换乘？", note: "地铁问路黄金句，一次问清线路 + 换乘点" },
    },
    {
      npcLines: [
        "Take the Blue Line eastbound, then transfer to the Red Line at Union Square. It's four stops from there.",
        "Blue Line heading east, switch to the Red at Union Square. Four more stops and you're there!",
        "Blue Line east, Red Line at Union Square, then just four stops. Easy peasy!",
      ],
      npcZh: "坐蓝线往东，在联合广场换红线。再坐四站就到。",
      task: "确认理解路线（复述一遍）",
      options: [
        { text: "Got it — Blue Line east, transfer to Red at Union Square. Thank you!", ok: true,  tip: "复述路线确认理解，问路最稳的一步" },
        { text: "Blue red square union okay I remember maybe.",                        ok: false, tip: "完整复述：Blue Line east, transfer to Red at Union Square" },
        { text: "Too many words, write it down for me paper.",                         ok: false, tip: "口头复述巩固记忆：Got it — Blue Line east..." },
      ],
      phrase: { en: "Got it — ___. Thank you!", zh: "明白了——……。谢谢！", note: "复述确认 + 致谢，问路闭环句式" },
      adds: [{ emoji: "🚇", label: "Blue Line ✓", badge: true }],
    },
    {
      npcLines: [
        "That's right! Mind the gap when boarding, and have a great day!",
        "Exactly! Watch the gap as you board. Enjoy your ride!",
        "Perfect! Mind the gap now — safe travels!",
      ],
      npcZh: "没错！上车注意站台空隙。祝您愉快！",
      task: "总结今天学到的交通要点",
      options: [
        { text: "Which bus, how often, where to transfer — I've got the full toolkit now. Thanks a lot!", ok: true,  tip: "要点串联总结：问线路/频率/换乘三大件" },
        { text: "Bus subway English very hard but okay finished.",                                     ok: false, tip: "列要点更有收获感：Which bus, how often, where to transfer" },
        { text: "Thank you I go now goodbye see you never.",                                            ok: false, tip: "带着知识走：I've got the full toolkit now!" },
      ],
      phrase: { en: "Mind the gap.", zh: "小心站台空隙", note: "地铁广播名句；mind = 小心，通用警示语" },
    },
  ],
},
