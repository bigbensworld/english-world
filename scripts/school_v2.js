    {
      id: "v2",
      title: "第 2 次光顾 · 选课风波",
      titleEn: "Course Registration Drama",
      emoji: "⏳",
      desc: "想选的课满了？被塞进候补名单？想换课时段？选课系统的攻防战全在这一轮。",
      reward: { en: "waitlist", zh: "你搞定了选课危机，候补名单也不慌！⏳" },
      steps: [
        {
          npcLines: [
            "Hi! You look like a student with a schedule problem. What can I do for you?",
            "Hello! What's the crisis today — scheduling? It's always scheduling.",
            "Hey there! Registration office. What seems to be the trouble?",
          ],
          npcZh: "您好！您看起来像个被课表难住的学生。有什么可以帮您？",
          task: "说明问题：想选的心理学课满了",
          options: [
            { text: "The psychology class I need is full. Is there anything I can do?", ok: true, tip: "is full 满员 + Is there anything I can do? 还有办法吗——选课危机标准表达" },
            { text: "The class rejected me. Psychology is my enemy now.",  ok: false, tip: "客观陈述：The class is full, anything I can do?" },
            { text: "I clicked enroll. It laughed at me. Explain.",       ok: false, tip: "说明情况：The class I need is full" },
          ],
          phrase: { en: "Is there anything I can do?", zh: "我还有什么办法吗？", note: "问题无解时的黄金问句；请对方给路径" },
        },
        {
          npcLines: [
            "You can join the waitlist — number twelve right now. People do drop classes in the first two weeks, so it's not hopeless.",
            "Waitlist is the move! You'd be thirteenth... no wait, twelfth. First two weeks always shuffle.",
            "Hop on the waitlist! You're number twelve. Lots of movement happens early — people drop like flies.",
          ],
          npcZh: "您可以进候补名单——现在排第十二位。前两周常有人退课，所以不是没希望。",
          task: "确认候补机制，同时问有没有别的时段",
          options: [
            { text: "I'll join — and is there another section that's open?", ok: true, tip: "another section 另一课次——候补之外的 Plan B" },
            { text: "Number twelve? I am patient. I will wait forever.",  ok: false, tip: "找备选：Is there another section that's open?" },
            { text: "Twelve people before me? Sabotage. Pure sabotage.",  ok: false, tip: "双轨策略：Join the waitlist + ask for another section" },
          ],
          phrase: { en: "Is there another section?", zh: "有其他课次吗？", note: "section = 同一门课的不同时段/班；换时段不换课" },
        },
        {
          npcLines: [
            "Let me check... Section B is open, but it meets at eight a.m. on Tuesdays and Thursdays. Early bird special!",
            "Good news: Section B has seats! Bad news: eight a.m., Tuesday-Thursday. Are you a morning person?",
            "Section B's wide open — if you can survive 8 a.m. twice a week. Your call!",
          ],
          npcZh: "我查查……B 班还有位置，但是周二周四早上八点上课。早鸟特供！",
          task: "权衡后决定：选 B 班，同时留在候补名单",
          options: [
            { text: "Eight a.m. is rough, but I'll take it — and keep me on the waitlist too, just in case.", ok: true, tip: "rough 艰难（口语）+ just in case 以防万一——双保险策略" },
            { text: "Eight a.m.? I don't even exist at eight a.m.",  ok: false, tip: "务实选择：I'll take it, and keep me on the waitlist" },
            { text: "No. Wake me when there's a 2 p.m. option.",     ok: false, tip: "先上保险：Take Section B + stay on the waitlist" },
          ],
          phrase: { en: "Just in case.", zh: "以防万一。", note: "口语万能后缀；双保险思维的表达" },
        },
        {
          npcLines: [
            "Smart — you're set either way. Oh, and heads-up: your biology lab has a prerequisite. Did you take Bio 101 already?",
            "Done — belt and suspenders! One flag though: your bio lab needs Bio 101 first. Did you take it?",
            "All locked in! One thing on your record — the bio lab requires Bio 101 as a prerequisite. Done already?",
          ],
          npcZh: "聪明——两头都有着落。对了，提醒：您的生物实验课有先修要求。您修过生物 101 吗？",
          task: "回答：修过，询问怎么提交证明",
          options: [
            { text: "Yes, I took it at my community college. How do I get that counted?", ok: true, tip: "How do I get that counted? 怎么算学分——转学分核心问句" },
            { text: "I took something like it. Close enough?",   ok: false, tip: "转学分要正式认定：How do I get that counted?" },
            { text: "I watched a documentary about biology once.", ok: false, tip: "提交成绩单认证：How do I get it counted?" },
          ],
          phrase: { en: "How do I get that counted?", zh: "怎么让这个被认可计入？", note: "get sth. counted = 使被计入；转学分/免修认定通用" },
        },
        {
          npcLines: [
            "Send your transcript to the registrar's office — there's a form online. It takes about a week, so don't wait!",
            "Transcript to the registrar, my friend! Online form, one-week processing. Do it today, not 'eventually'!",
            "Easy: transcript plus the online form, straight to the registrar. Week-long turnaround. Sooner started, sooner done!",
          ],
          npcZh: "把成绩单发到教务处——网上有表格。大概要一周，别拖着！",
          task: "确认流程细节（表格在哪）",
          options: [
            { text: "A week — I'll do it today. Where exactly is the form on the website?", ok: true, tip: "确认表格位置——流程最后一块拼图" },
            { text: "Eventually is my middle name though.",  ok: false, tip: "行动派：I'll do it today. Where's the form?" },
            { text: "The registrar sounds like a dragon. I must slay it.", ok: false, tip: "问具体位置：Where is the form on the website?" },
          ],
          phrase: { en: "I'll do it today.", zh: "我今天就去办。", note: "I'll + 动词原形 表承诺；办事高效的人设发言" },
        },
        {
          npcLines: [
            "Student portal, under 'Records,' then 'Transfer Credits.' Big green button — you can't miss it! Anything else today?",
            "Student portal → Records → Transfer Credits. Giant green button! What else can I do for you?",
            "Portal, Records tab, Transfer Credits. The button is huge! More questions, or are we done?",
          ],
          npcZh: "学生门户，『记录』栏目，然后『转学分』。大大的绿色按钮——不会错过的！今天还有别的吗？",
          task: "复述路径并道谢告别",
          options: [
            { text: "Portal, Records, Transfer Credits — got it. That's everything. Thank you so much!", ok: true, tip: "三连复述路径 + 道谢——选课危机毕业" },
            { text: "Green button. I fear no buttons.",  ok: false, tip: "复述防遗忘：Portal, Records, Transfer Credits. Thanks!" },
            { text: "That's everything, and also nothing. Goodbye.", ok: false, tip: "确认+感谢：Got it, that's everything, thank you!" },
          ],
          phrase: { en: "That's everything.", zh: "就这些了。", note: "办事收尾万能句；配 Thank you 完整闭环" },
        },
      ],
    },
