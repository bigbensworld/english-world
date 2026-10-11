    {
      id: "v3",
      title: "第 3 次光顾 · 创可贴与应急小伤",
      titleEn: "Bandages & First Aid",
      emoji: "🩹",
      desc: "切菜划了手！买创可贴、纱布和消毒喷雾。顺便聊聊体温计——家庭药箱英语小百科。",
      reward: { en: "bandages", zh: "你的家庭药箱英语配齐了！🩹" },
      steps: [
        {
          npcLines: [
            "Oh! That finger looks rough. What happened?",
            "Yikes — that's quite the bandage situation on your finger. What happened there?",
            "Whoa, what did you do to that finger? It's seen better days!",
          ],
          npcZh: "哦！你手指看着伤得不轻。怎么了？",
          task: "说明切菜划伤了手",
          options: [
            { text: "I cut myself cooking — just a small cut, but I need bandages.", ok: true,  tip: "cut myself 划伤自己 + small cut 小伤口" },
            { text: "Knife attack me. Knife fault. I innocent.",                    ok: false, tip: "平静描述：I cut myself cooking — just a small cut" },
            { text: "Finger and knife had disagreement. Finger lose.",              ok: false, tip: "直白说明：I cut myself — I need bandages" },
          ],
          phrase: { en: "I cut myself cooking.", zh: "我做饭时切到了自己。", note: "cut myself + doing 说明受伤场景" },
        },
        {
          npcLines: [
            "Ouch, kitchen casualties! For that you'll want bandages, and I'd add antiseptic spray to keep it clean. Deal?",
            "The classic cooking injury! Let's get you bandages — and I'd throw in antiseptic spray to keep infection away. Sound good?",
            "Ah, the chef's badge of honor! Bandages for sure, plus antiseptic spray so it stays clean. Yes?",
          ],
          npcZh: "哎哟，厨房伤员！你需要创可贴，我再加个消毒喷雾防感染。行吗？",
          task: "接受建议，并问还需要什么配齐家庭药箱",
          options: [
            { text: "Both please. Anything else you'd recommend for a basic first-aid kit at home?", ok: true,  tip: "first-aid kit 急救箱——主动规划家庭药箱" },
            { text: "Spray? Water is spray. Water free.",                                          ok: false, tip: "消毒更专业：Anything else for a first-aid kit?" },
            { text: "Kit? I need no kit. I need no injury again. Promise self.",                    ok: false, tip: "常备药箱有必要：What else do you recommend for a basic first-aid kit?" },
          ],
          phrase: { en: "Anything else you'd recommend?", zh: "你还有什么推荐的吗？", note: "first-aid kit 家庭急救箱；常备药品清单起点" },
        },
        {
          npcLines: [
            "Great question! A thermometer is the unsung hero — every home needs one. We have a digital one on sale this week.",
            "Now you're thinking! A thermometer — everyone should own one. Ours digital ones are on sale this week, actually.",
            "Love the initiative! Get a thermometer — a home essential. Digital ones are on sale this week, conveniently!",
          ],
          npcZh: "问得好！体温计是无名英雄——每个家都需要一个。这周我们的电子体温计在打折。",
          task: "询问体温计怎么用（口服还是额温）",
          options: [
            { text: "Good idea. How does this thermometer work — is it the forehead kind?", ok: true,  tip: "forehead kind 额温型——问清使用方式" },
            { text: "Thermometer eat? Put in mouth? Confusing machine.",                   ok: false, tip: "问使用方式：How does it work — is it the forehead kind?" },
            { text: "Sale price only matter. Use method irrelevant.",                      ok: false, tip: "会买还要会用：How does this thermometer work?" },
          ],
          phrase: { en: "How does it work?", zh: "它怎么用？", note: "买任何新器材的第一问；work = 运作/起作用" },
        },
        {
          npcLines: [
            "This one's a forehead scanner — one button, one second, done. Perfect for kids and for people who hate waiting.",
            "Forehead scanner, this model! One button, one second, reading done. Great for kids and the impatient alike!",
            "It's the touchless forehead type — press once, one second, boom, temperature. Kid-friendly and patience-friendly!",
          ],
          npcZh: "这款是额温枪——一个按钮、一秒钟、出结果。适合小孩也适合不爱等的人。",
          task: "很满意，询问小孩能用吗",
          options: [
            { text: "One second is impressive! Is it safe to use on children too?", ok: true,  tip: "先给认可再追问，Is it safe to use on...?" },
            { text: "Children use? Children break. Expensive accident.",           ok: false, tip: "问安全性：Is it safe to use on children?" },
            { text: "One second? Make it half second. Speed king.",                ok: false, tip: "1 秒已很快：Is it safe to use on children too?" },
          ],
          phrase: { en: "Is it safe to use on children?", zh: "给孩子用安全吗？", note: "买药买器械的放心句；children's dose 儿童剂量同理必问" },
        },
        {
          npcLines: [
            "Completely safe — non-contact, so no germs shared. I'll add it to your pile. Anything else for the kit?",
            "Totally safe! Non-contact means no germ swapping. Into the pile it goes! Anything more for the kit?",
            "Safe as can be — no contact, no germs. Added! What else shall we stock?",
          ],
          npcZh: "完全安全——非接触式，不传染细菌。加进你的购物堆。药箱还要别的吗？",
          task: "觉得差不多了，请对方总结一下",
          options: [
            { text: "I think that covers it. Can you summarize what I'm getting today?", ok: true,  tip: "summarize 总结清单——结账前最后核对" },
            { text: "You tell me kit list. I nod yes to all.",                          ok: false, tip: "自己主导总结：Can you summarize what I'm getting?" },
            { text: "No more talking. Surprise bag. Mystery shopping.",                  ok: false, tip: "结账前核对：Summarize what I'm getting today?" },
          ],
          phrase: { en: "Can you summarize what I'm getting?", zh: "能总结一下我买的东西吗？", note: "结账防错漏；summarize = 总结" },
        },
        {
          npcLines: [
            "Sure! One box of bandages, antiseptic spray, and a digital thermometer — twelve fifty altogether. Your first-aid kit is officially started!",
            "Let's see: bandages, antiseptic spray, digital thermometer — twelve fifty all in. Congratulations, the home kit begins!",
            "Easy! Bandages — check. Spray — check. Thermometer — check. Twelve fifty total, and your first-aid kit is born!",
          ],
          npcZh: "当然！一盒创可贴、消毒喷雾、电子体温计——一共 12.50。你的家庭急救箱正式启动！",
          task: "付款并表达满意",
          options: [
            { text: "Twelve fifty — perfect. My kitchen and I thank you!", ok: true,  tip: "幽默收尾 + 致谢，My kitchen and I 拟人化表达" },
            { text: "Kitchen thank you? Kitchen no mouth. Strange talk.", ok: false, tip: "轻松幽默即可：My kitchen and I thank you!" },
            { text: "First-aid kit is expensive hobby I start today.",    ok: false, tip: "满意致谢：My kitchen and I thank you!" },
          ],
          phrase: { en: "My kitchen and I thank you!", zh: "我和我的厨房都谢谢你！", note: "幽默致谢句式；轻松收尾拉近距离" },
          adds: [{ emoji: "🩹", label: "First-aid kit", wordId: "drug-bandaid" }],
        },
      ],
    },
