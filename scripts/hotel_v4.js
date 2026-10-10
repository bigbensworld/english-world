// 酒店 第 4 轮：房卡与报修（8 步）
{
  id: "v4",
  title: "第 4 次光顾 · 房卡失效与报修",
  titleEn: "Key Card & Repairs",
  emoji: "🔧",
  desc: "半夜房卡突然失效？空调罢工？别慌！学会前台换卡、房间报修、请求换房的完整流程。",
  reward: { en: "maintenance", zh: "你搞定了房卡和空调两大危机，酒店生存力满级！🔧" },
  steps: [
    {
      npcLines: [
        "Good evening, sir! How can I help you tonight?",
        "Evening! What can I do for you?",
        "Hello! Welcome to the front desk. What's up?",
      ],
      npcZh: "晚上好，先生！今晚有什么可以帮您？",
      task: "说明房卡失效，进不去房间",
      options: [
        { text: "Hi, my key card suddenly stopped working. I can't get into my room.", ok: true,  tip: "stopped working 失效了；开门失败就这么说" },
        { text: "Card bad. Door no open. Help me.",                                 ok: false, tip: "说 My key card stopped working" },
        { text: "Room locked forever me outside sad.",                              ok: false, tip: "更清楚：I can't get into my room" },
      ],
      phrase: { en: "My key card stopped working.", zh: "我的房卡失效了", note: "stop working 设备失灵万能说法：房卡、遥控器、Wi-Fi 都能用" },
    },
    {
      npcLines: [
        "Oh, I'm sorry about that! Sometimes the cards get demagnetized. Could I see your ID to verify?",
        "Apologies! Cards get demagnetized sometimes. May I see some ID to confirm?",
        "Sorry about that! Cards do lose their charge occasionally. Could I check your ID?",
      ],
      npcZh: "非常抱歉！有时卡会被消磁。能看下您的证件核实身份吗？",
      task: "出示证件",
      options: [
        { text: "Sure, here's my passport. Room 1208.", ok: true,  tip: "出示证件 + 报房号，一次说清省时间" },
        { text: "ID yes have. Which room I am?",        ok: false, tip: "主动报房号：Room 1208" },
        { text: "Why need passport? Suspicious.",       ok: false, tip: "换卡核身是常规流程，出示即可" },
      ],
      phrase: { en: "Here's my passport. Room ___.", zh: "这是我的护照，……房间", note: "前台办事组合句：证件 + 房号" },
      adds: [{ emoji: "🪪", label: "ID Verified ✓", badge: true }],
    },
    {
      npcLines: [
        "Thank you! Let me reactivate that for you... All set. Here's your new card, same room.",
        "Perfect, give me one moment... Done! Fresh card for Room 1208.",
        "Great, reactivating... There you go — brand new card, same room!",
      ],
      npcZh: "谢谢！我为您重新激活一下……好了，新卡给您，还是原房间。",
      task: "测试新卡前再想起另一个问题：空调坏了",
      options: [
        { text: "Thanks! Actually, there's one more thing — the air conditioner in my room isn't working.", ok: true,  tip: "one more thing 追加话题的经典过渡语" },
        { text: "Card okay good. Also cold room machine broken too.",                                  ok: false, tip: "说 the air conditioner isn't working" },
        { text: "New problem I have many problems tonight.",                                           ok: false, tip: "直说问题：The AC isn't working" },
      ],
      phrase: { en: "There's one more thing — ___", zh: "还有一件事——……", note: "礼貌追加话题神器，前台/客服场景高频" },
    },
    {
      npcLines: [
        "Oh no, sorry to hear that! Is it not turning on at all, or just blowing warm air?",
        "That's no good! Is the AC completely dead, or just not cooling?",
        "Ugh, sorry! So it won't turn on, or is it just warm air?",
      ],
      npcZh: "哎呀，很抱歉！是彻底不启动，还是只吹自然风？",
      task: "描述故障：启动了但只吹风不制冷",
      options: [
        { text: "It's running, but it only blows warm air. The room is really stuffy.", ok: true,  tip: "blows warm air 吹热风 + stuffy 闷，故障描述两件套" },
        { text: "Machine work but hot air only no cold.",                              ok: false, tip: "说 It only blows warm air" },
        { text: "Air bad. Room like sauna temperature.",                               ok: false, tip: "加细节：It's running but only blows warm air" },
      ],
      phrase: { en: "It's running, but it only blows warm air.", zh: "机器在转，但只吹热风", note: "running = 在运转；设备半坏的精准描述" },
    },
    {
      npcLines: [
        "I see. I'll send maintenance up right away. Would you like to wait in the room, or would you prefer a room change?",
        "Got it. Maintenance is on the way! Want to wait it out, or should I move you to another room?",
        "Understood! I'll dispatch maintenance now. Stay and wait, or switch rooms — your call.",
      ],
      npcZh: "明白了。我马上派维修上去。您想在房间等，还是换一间房？",
      task: "先试试维修，如果修不好再换房",
      options: [
        { text: "Let's try the repair first. If it can't be fixed tonight, I'd like to change rooms.", ok: true,  tip: "先 A 后 B 的条件句：If..., I'd like to...，表达清晰诉求" },
        { text: "Fix it now quick fast please hurry.",                                              ok: false, tip: "说清先后：Let's try the repair first" },
        { text: "Change room immediately biggest room upgrade free.",                                ok: false, tip: "合理表达：If it can't be fixed, I'd like to change rooms" },
      ],
      phrase: { en: "If it can't be fixed, I'd like to ___.", zh: "如果修不好，我想……", note: "条件表达法：给对方方案，也守住自己的底线" },
    },
    {
      npcLines: [
        "Perfectly reasonable. Maintenance will be there in ten minutes. Again, sorry for the trouble!",
        "Absolutely fair. Someone will knock on your door within ten minutes. Apologies again!",
        "No problem at all! Ten minutes, tops. Sorry for the inconvenience!",
      ],
      npcZh: "非常合理。维修人员十分钟内到您房间。再次为不便道歉！",
      task: "接受道歉，询问空调修好后会不会太冷",
      options: [
        { text: "No worries. Quick question — is there a way to control the temperature in the room?", ok: true,  tip: "Quick question 附加小问题的自然引导语" },
        { text: "Okay fine. Cold hot how to change it?",                                            ok: false, tip: "说 Is there a way to control the temperature?" },
        { text: "AC too strong always freezing in hotels.",                                          ok: false, tip: "先问方法：Is there a way to control the temperature?" },
      ],
      phrase: { en: "Is there a way to ___?", zh: "有没有办法……？", note: "求方法的礼貌句式，比 How to? 更客气" },
    },
    {
      npcLines: [
        "Yes! There's a thermostat on the wall — just set it to your preferred temperature. Anything else?",
        "Sure! Wall thermostat, set it to whatever you like. Anything else tonight?",
        "Of course! The thermostat on the wall lets you dial in the perfect temp. Anything more?",
      ],
      npcZh: "有的！墙上有温控器——设定您喜欢的温度就行。还有别的吗？",
      task: "顺便多要一条毛毯以防夜里冷",
      options: [
        { text: "Could I also get an extra blanket, just in case? Thank you!", ok: true,  tip: "just in case 以防万一——要备用物品的完美理由" },
        { text: "Give blanket one more yes please thanks.",                   ok: false, tip: "更自然：Could I get an extra blanket, just in case?" },
        { text: "Blanket cold night maybe need two three blankets.",          ok: false, tip: "一条备用即可：an extra blanket, just in case" },
      ],
      phrase: { en: "Could I get an extra ___, just in case?", zh: "能多给我一个……以防万一吗？", note: "毛毯/毛巾/枕头通用，just in case 显周全" },
      adds: [{ emoji: "🛏️", label: "Extra Blanket", badge: true }],
    },
    {
      npcLines: [
        "Of course! Housekeeping will bring one up with the maintenance team. Have a good night, and sorry again!",
        "Absolutely! We'll send a blanket up along with maintenance. Good night, and apologies once more!",
        "You got it! Blanket's coming up with the repair crew. Rest well, and sorry again!",
      ],
      npcZh: "当然！客房部会随维修一起送一条上去。晚安，再次抱歉！",
      task: "大度收尾，感谢高效处理",
      options: [
        { text: "Thanks for handling it so quickly. Good night!", ok: true,  tip: "Thanks for handling it 肯定处理效率，大度收尾" },
        { text: "Bye front desk person good night sleep time.", ok: false, tip: "更有温度：Thanks for handling it so quickly" },
        { text: "Next time no broken AC please okay?",          ok: false, tip: "得体道谢：Good night!" },
      ],
      phrase: { en: "Thanks for handling it so quickly.", zh: "谢谢你这么快就处理了", note: "感谢对方处理效率的万能句，投诉后修复必备" },
    },
  ],
},
