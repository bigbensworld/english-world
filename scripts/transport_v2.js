// 交通场景 第 2 轮：街头问路（7 步）
{
  id: "v2",
  title: "第 2 次光顾 · 街头问路",
  titleEn: "Asking for Directions",
  emoji: "🗺️",
  desc: "在陌生街区迷路了！找路人问方向、听懂 left/right/直行、确认距离——做个礼貌的问路达人。",
  reward: { en: "directions", zh: "你学会了英文问路，从此走到哪都不慌！🗺️" },
  steps: [
    {
      npcLines: [
        "Oh, hi! You look like you're searching for something. Can I help?",
        "Hi there! Lost? I know this neighborhood pretty well!",
        "Hello! You've got the map-upside-down look — need a hand?",
      ],
      npcZh: "哦，你好！您看起来在找什么。需要帮忙吗？",
      task: "礼貌开口：找 Central 咖啡馆但迷路了",
      options: [
        { text: "Excuse me, I'm looking for the Central Café. Am I going in the right direction?", ok: true,  tip: "I'm looking for... 说明目标 + 确认方向，问路开场白" },
        { text: "Coffee place Central where is it tell me now.",                                  ok: false, tip: "礼貌版：Excuse me, I'm looking for the Central Café" },
        { text: "I am lost completely help me please everything.",                                ok: false, tip: "说具体目标：I'm looking for the Central Café" },
      ],
      phrase: { en: "I'm looking for ___. Am I going in the right direction?", zh: "我在找……，我走的方向对吗？", note: "问路开场双连问：目标 + 方向确认" },
    },
    {
      npcLines: [
        "Hmm, the Central Café... you're actually going the wrong way! You need to turn around and go back to the corner.",
        "Oh, the Central Café? Wrong direction, I'm afraid! Turn around and head back to the corner.",
        "Ha, you've wandered off! The café's the other way — back to the corner you go!",
      ],
      npcZh: "嗯，Central 咖啡馆……您走反了！需要掉头回到那个路口。",
      task: "理解指路信息，确认怎么走",
      options: [
        { text: "Oh no! So I should turn around and walk back to the corner?", ok: true,  tip: "So I should...? 复述确认方向，别走第二次冤枉路" },
        { text: "Turn around means what exactly? Show me.",                  ok: false, tip: "turn around = 掉头；复述确认即可" },
        { text: "Wrong way?! I walk so far already so tired.",                ok: false, tip: "确认路线：So I should turn around and go back?" },
      ],
      phrase: { en: "So I should ___?", zh: "所以我应该……？", note: "复述指路信息求确认，问路人必备安全阀" },
    },
    {
      npcLines: [
        "Exactly! Then turn left at the corner and walk two blocks. You'll see the café on your right, next to a bookstore.",
        "That's it! Left at the corner, two blocks down, and it's on your right — right by the bookstore.",
        "You got it! Hang a left at the corner, two blocks, café on your right next to the bookshop!",
      ],
      npcZh: "没错！路口左转，走两个街区。咖啡馆就在右手边，书店旁边。",
      task: "完整复述路线确认",
      options: [
        { text: "Turn left at the corner, two blocks, and it's on my right next to the bookstore. Got it!", ok: true,  tip: "完整复述 = 路线刻进脑子，问路最稳一步" },
        { text: "Left corner two blocks right side near books yes.",                                    ok: false, tip: "完整版：Turn left at the corner, two blocks, on my right" },
        { text: "I remember maybe left maybe right I will see.",                                        ok: false, tip: "确定每个方位词：left at the corner, on my right" },
      ],
      phrase: { en: "Turn left at ___, and it's on your ___.", zh: "在……左转，就在你的……边", note: "指路核心句型：turn left/right + on your left/right" },
    },
    {
      npcLines: [
        "Perfect! Is it far from here? Oh wait, that's your next question, isn't it? It's about a ten-minute walk.",
        "You've got it! And yes, it's walkable — ten minutes, give or take.",
        "Nailed it! Just a ten-minute stroll from here.",
      ],
      npcZh: "完全正确！走路大概十分钟就到。",
      task: "询问步行距离确认",
      options: [
        { text: "Is it within walking distance?", ok: true,  tip: "within walking distance 步行可达——问距离的地道表达" },
        { text: "Far or near? Legs tired question.", ok: false, tip: "说 Is it within walking distance?" },
        { text: "How many minutes more walking time exactly?", ok: false, tip: "经典问法：Is it within walking distance?" },
      ],
      phrase: { en: "Is it within walking distance?", zh: "步行能到吗？", note: "距离问句首选；回答常见 It's a ten-minute walk" },
    },
    {
      npcLines: [
        "Totally walkable! But heads-up — the crosswalk on Fifth Avenue is closed for construction. Use the underpass instead.",
        "Oh yes, walkable! One thing though — the Fifth Avenue crosswalk's closed for construction. Take the underpass.",
        "Sure, on foot! Just know the Fifth Avenue crossing is shut for construction — underpass is your friend!",
      ],
      npcZh: "完全可以走到！不过提醒您——第五大道的人行横道因施工关闭了。请走地下通道。",
      task: "理解提醒并询问地下通道位置",
      options: [
        { text: "Thanks for the heads-up! Where's the underpass?", ok: true,  tip: "heads-up 提醒；Thanks for the heads-up! 回应提醒的地道说法" },
        { text: "Underpass? What is this word meaning?",          ok: false, tip: "underpass = 地下通道；回应提醒先说 Thanks!" },
        { text: "Closed road annoying, other way good fine.",      ok: false, tip: "先致谢再追问：Thanks for the heads-up! Where's it?" },
      ],
      phrase: { en: "Thanks for the heads-up!", zh: "多谢提醒！", note: "heads-up = 提前告知；美式口语高频词" },
    },
    {
      npcLines: [
        "The underpass entrance is right after the corner — you'll see a yellow sign. You can't miss it!",
        "Right past the corner, look for the yellow sign. Impossible to miss!",
        "Just beyond the corner there's a big yellow sign — that's your underpass!",
      ],
      npcZh: "地下通道入口就在路口过去一点——有黄色标识，不会错过的！",
      task: "最后确认并致谢",
      options: [
        { text: "You can't miss it — got it! Thank you so much for your help!", ok: true,  tip: "You can't miss it 很显眼——连指路人常用语都学会了" },
        { text: "Yellow sign okay bye thank you person.",                     ok: false, tip: "活用刚学的表达：You can't miss it — got it!" },
        { text: "Hope sign really yellow not lie to me.",                      ok: false, tip: "信任指路：You can't miss it — got it!" },
      ],
      phrase: { en: "You can't miss it.", zh: "很好找，不会错过的", note: "指路收尾金句；听懂它 = 放心走" },
    },
    {
      npcLines: [
        "You're welcome! Enjoy the café — their blueberry muffins are amazing!",
        "Anytime! Oh, and try the blueberry muffins at the café. Life-changing!",
        "No problem at all! Pro tip: blueberry muffin. Thank me later!",
      ],
      npcZh: "不客气！享受咖啡时光——他们家的蓝莓玛芬超好吃！",
      task: "问路任务完成，友好收尾",
      options: [
        { text: "A muffin tip and directions in one — you're the best! Have a great day!", ok: true,  tip: "风趣总结 + 祝好，问路的完美谢幕" },
        { text: "Muffin okay I will eat maybe if hungry.",                              ok: false, tip: "更有温度：You're the best! Have a great day!" },
        { text: "Bye strange street person who knows muffins.",                          ok: false, tip: "热情道谢：You're the best!" },
      ],
      phrase: { en: "You're the best!", zh: "你人真好！", note: "对帮助者的最高口语致谢，配上微笑满分" },
    },
  ],
},
