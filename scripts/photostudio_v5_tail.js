    {
      id: "v4",
      title: "第 4 次光顾 · 成片拍砸了",
      titleEn: "The Blurry Canvas",
      emoji: "🌫️",
      desc: "帆布到手一看——人脸失焦！质量纠纷：举证、免费重做、加急补偿——拍照翻车维权课。",
      reward: { en: "reshoot", zh: "重做成片，质量守住了！🌫️" },
      steps: [
        {
          npcLines: [
            "Hi! You're back fast — picking up prints? Wait, your face says something's wrong. What happened?",
            "Hey, that was quick! Prints pickup? Oh no — that's an unhappy face. Talk to me!",
            "Back so soon! Everything... okay? You've got storm-cloud face. What's up?",
          ],
          npcZh: "你好！这么快回来了——取片吗？等等，你脸色不对。怎么了？",
          task: "说明帆布人脸失焦",
          options: [
            { text: "The canvas arrived, and the faces are out of focus — it's blurry where it matters most. I brought it with me.", ok: true,  tip: "out of focus 失焦 + where it matters most 最要紧的地方——专业举证" },
            { text: "Canvas face mush! Face fog! Family of ghosts! Blurry family specters!",                                         ok: false, tip: "专业描述：The faces are out of focus — I brought it with me" },
            { text: "Photo bad. Face broken. Artistic accident? Interpretive blur?",                                                 ok: false, tip: "清晰举证：The faces are out of focus. Here's the canvas." },
          ],
          phrase: { en: "It's out of focus.", zh: "它失焦了。", note: "out of focus 失焦；摄影纠纷的技术术语" },
        },
        {
          npcLines: [
            "Oh no — let me see... You're absolutely right, the eyes are soft on the close inspection. That's a printing error on our lab's side. I'm so sorry.",
            "Show me... yep, you're completely correct — soft focus on the faces up close. This one's on our lab. Truly sorry!",
            "Let me look... confirmed, the eyes went soft in production. Lab's mistake, one hundred percent. My sincere apologies!",
          ],
          npcZh: "哦不——我看看……你说得完全对，凑近看眼睛是虚的。这是我们冲印厂的失误。非常抱歉。",
          task: "接受道歉，询问补救方案",
          options: [
            { text: "These things happen — what's the fix? The Christmas deadline is still the concern.", ok: true,  tip: "These things happen 谁都会出错 + 直奔解决方案" },
            { text: "Deadline Christmas! Gifts needed! Blur unacceptable! Fix plan now!",                  ok: false, tip: "冷静务实：These things happen — what's the fix? Christmas is still the deadline" },
            { text: "Apology noted. Blur testimony recorded. Judge will see the canvas.",                  ok: false, tip: "聚焦解决：What's the fix?" },
          ],
          phrase: { en: "These things happen.", zh: "这种事难免。", note: "宽容开场；给对方台阶的高情商句" },
        },
        {
          npcLines: [
            "The lab will redo the canvas at no charge, and I'm expediting it — five days instead of two weeks. You'll beat Christmas comfortably.",
            "Full redo on the lab's dime, and I'm rushing it — five days, not two weeks. Christmas stays safe!",
            "Free reprint, expedited on me — five-day turnaround instead of fourteen. Deadline: demolished!",
          ],
          npcZh: "冲印厂免费重做，我给你加急——5 天而不是两周。圣诞前稳稳到手。",
          task: "确认新帆布会先质检",
          options: [
            { text: "Thank you. Could someone double-check the new one for focus before it ships, so we don't have a repeat?", ok: true,  tip: "double-check 复检 + so we don't have a repeat 避免重演" },
            { text: "Check the new canvas! Check eyes! Check faces! Full canvas inspection protocol!",                         ok: false, tip: "合理请求：Could someone double-check the new one before it ships?" },
            { text: "Trust the lab again? Fool me twice? Canvas shame on lab twice?",                                          ok: false, tip: "质检请求：Double-check the new one before shipping, please" },
          ],
          phrase: { en: "Could you double-check it?", zh: "能再检查一遍吗？", note: "double-check 复核；避免二次翻车的保险" },
          adds: [{ emoji: "🔄", label: "Free reprint", wordId: "ps-reshoot" }],
        },
        {
          npcLines: [
            "Personally inspecting it myself before it leaves — I'll send you a close-up photo of the new canvas for approval first. Sound fair?",
            "I'll inspect it personally and send you close-up photos for your sign-off before shipping. Fair enough?",
            "My eyes on it, then close-up photos to you for final approval. Deal?",
          ],
          npcZh: "我亲自检验再发货——先给你发新帆布的特写照片，你确认后才发。这样公平吧？",
          task: "赞赏这个流程",
          options: [
            { text: "Photo approval before shipping — that's exactly the right process. I appreciate it.", ok: true,  tip: "exactly the right process 流程正确——认可解决方案" },
            { text: "Approval photos! Democracy of canvas! Photo voting system! Beautiful!",               ok: false, tip: "认可流程：That's exactly the right process — I appreciate it" },
            { text: "Fair is understatement. Excellent is word. Canvas justice achieved.",                 ok: false, tip: "真诚认可：I appreciate it!" },
          ],
          phrase: { en: "That's exactly the right process.", zh: "这正是正确的流程。", note: "process 流程；认可办事方式的句式" },
        },
        {
          npcLines: [
            "And for the trouble — the eight-by-ten prints are on us this time. Consider it a canvas-blur apology tax!",
            "One more thing: the eight-by-tens are free this round. The blur apology tax, as it were!",
            "Also — those eight-by-tens? Complimentary. Our official blurry-canvas apology policy!",
          ],
          npcZh: "为表歉意——这次的 8×10 照片我们免费。就当是『帆布模糊道歉税』！",
          task: "接受补偿并确认新的时间线",
          options: [
            { text: "You didn't have to do that — but thank you! So: new canvas in five days, after my photo approval?", ok: true, tip: "didn't have to do that 本不必这样做——体面接受补偿" },
            { text: "Free prints! Guilt prints! Apology economy booming!",                                               ok: false, tip: "确认时间线：New canvas in five days, after my photo approval?" },
            { text: "Apology tax! Acceptable tax! Only good tax in history!",                                            ok: false, tip: "感谢+确认：New canvas in five days, after approval — right?" },
          ],
          phrase: { en: "You didn't have to do that.", zh: "你本不必这么做的。", note: "didn't have to 本不必；接受好意的高情商句" },
        },
      ],
    },
    {
      id: "v5",
      title: "第 5 次光顾 · 黄金时刻外拍",
      titleEn: "Golden Hour Shoot",
      emoji: "🌅",
      desc: "周年纪念来一套外拍！预约黄金时刻、选外景地、成片挂墙——摄影工作室的高阶浪漫课。",
      reward: { en: "golden hour", zh: "黄金时刻的美，定格了！🌅" },
      steps: [
        {
          npcLines: [
            "Back for more — I knew you'd be hooked! What's the occasion this time?",
            "The return customers! I told you photography is addictive! What are we celebrating?",
            "You're back! As predicted — everyone gets hooked! What's the special occasion?",
          ],
          npcZh: "又来了——我就知道你会上瘾！这次是什么日子？",
          task: "说明结婚周年想要外拍",
          options: [
            { text: "Our tenth wedding anniversary is coming up — I'd love an outdoor photo session this time, not studio shots.", ok: true,  tip: "outdoor photo session 外拍——场地升级的表达" },
            { text: "Ten years married! Marriage vintage! Outdoor photos needed! Nature studio!",                                   ok: false, tip: "说明需求：I'd love an outdoor photo session for our anniversary" },
            { text: "Anniversary time! Studio boring now! Outside fancy time! Grass and sky backdrop!",                             ok: false, tip: "需求表达：An outdoor session, not studio shots" },
          ],
          phrase: { en: "I'd love an outdoor session.", zh: "我想要一次外拍。", note: "outdoor 户外的；影棚 vs 外景的经典选择" },
        },
        {
          npcLines: [
            "Tenth anniversary — that deserves golden hour! The light an hour before sunset is pure magic for couples. Interested?",
            "Ten years! That's golden hour territory — sunset light is couples' magic. Shall we chase the sun together?",
            "A decade of marriage demands the golden hour! That pre-sunset glow? Made for couples. Interested?",
          ],
          npcZh: "十周年——值得黄金时刻！日落前一小时的光线拍情侣最出魔法。有兴趣吗？",
          task: "询问黄金时刻具体是什么",
          options: [
            { text: "Golden hour — is that the hour before sunset? I've heard the term but never booked one.", ok: true,  tip: "I've heard the term 听说过这个词——大方确认概念" },
            { text: "Golden hour? Hour of gold? Gold weather? Is gold weather real weather?",                    ok: false, tip: "确认理解：Is that the hour before sunset?" },
            { text: "Golden hour sounds expensive. Golden pricing hour? Luxury light fees?",                      ok: false, tip: "了解概念：Golden hour — is that the hour before sunset?" },
          ],
          phrase: { en: "I've heard the term, but...", zh: "我听说过这个词，不过……", note: "term 术语；承认半懂的高效学习句" },
        },
        {
          npcLines: [
            "Exactly — the last hour of daylight. Everything turns warm and soft, and everyone looks their best. It books out fast though, especially for sunsets.",
            "That's it — daylight's final hour, when everything glows warm and flattering! Fair warning: sunset slots vanish quickly!",
            "Precisely! Daylight's last sixty minutes — warm, soft, universally flattering! But sunset slots are gold — they go FAST!",
          ],
          npcZh: "正是——白昼的最后一小时。一切变得温暖柔和，人人都拍出最佳状态。不过很抢手，尤其日落场。",
          task: "果断预订并问有什么要准备",
          options: [
            { text: "Book us in! What should we wear or bring to make the most of golden hour?", ok: true,  tip: "make the most of 充分利用——拍摄准备的加分问" },
            { text: "Booked! Wardrobe advice! Wear what? Golden clothes? Sun-colored outfits?",  ok: false, tip: "预订+准备：What should we wear to make the most of it?" },
            { text: "Wearing is optional question? Photo clothes matter? Surprise me with fashion.", ok: false, tip: "实用询问：What should we wear or bring?" },
          ],
          phrase: { en: "Make the most of it.", zh: "充分利用它。", note: "make the most of 充分利用；任何机会的榨汁机句式" },
          adds: [{ emoji: "🌅", label: "Golden hour", wordId: "ps-goldenhour" }],
        },
        {
          npcLines: [
            "Wear solid colors, no big logos — jewel tones photograph beautifully in golden light. And bring a change of shoes; we'll walk through some grass.",
            "Solid colors, skip the logos — jewel tones glow at sunset! Comfy shoes too — grass will happen!",
            "Solids over logos! Jewel tones were born for golden hour. Plus backup shoes — there's grass in our future!",
          ],
          npcZh: "穿纯色、别带大 logo——宝石色调在金色光线下最出片。备双鞋，我们要走过草地。",
          task: "记下建议，问拍摄地点在哪",
          options: [
            { text: "Jewel tones and walking shoes — got it. Where exactly will we be shooting?", ok: true,  tip: "复述建议 + 问外景地——外拍的信息闭环" },
            { text: "Location mystery? Surprise me! Blindfold photoshoot! Adventure marriage!",   ok: false, tip: "问地点：Where exactly will we be shooting?" },
            { text: "Grass confirmed. Grass allergies unconfirmed. Risky photoshoot of destiny.", ok: false, tip: "确认地点：Where will we be shooting?" },
          ],
          phrase: { en: "Where will we be shooting?", zh: "我们在哪儿拍？", note: "shoot 拍摄；外景地的基本信息" },
        },
        {
          npcLines: [
            "Riverside Park — the bridge and the willows at sunset. It's ten years of marriage in one frame. Saturday at seven work?",
            "Riverside Park, sunset edition — bridge, willows, the whole romance package! Saturday, seven o'clock?",
            "The plan: Riverside Park! Bridge views, weeping willows, sunset glaze — a decade in a single frame. Saturday at seven?",
          ],
          npcZh: "河滨公园——日落时的大桥和柳树。一帧装下十年婚姻。周六 7 点可以吗？",
          task: "确认预约并期待收尾",
          options: [
            { text: "The bridge at sunset — after ten years, we could use a little magic. Saturday at seven, we'll be there.", ok: true,  tip: "we could use a little magic 我们正需要一点魔法——浪漫收尾" },
            { text: "Bridge magic! Marriage glow! Ten-year sunset spectacular! Saturday sealed!",                               ok: false, tip: "感性确认：We could use a little magic — Saturday at seven" },
            { text: "Ten years deserves bridge. Ten years earned sunset. Confirmation issued.",                                 ok: false, tip: "确认到场：Saturday at seven, we'll be there" },
          ],
          phrase: { en: "We'll be there.", zh: "我们会到的。", note: "简洁的赴约承诺；比 I'll come 更笃定" },
        },
      ],
    },
  ],
},
