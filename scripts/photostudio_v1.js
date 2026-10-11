  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 证件照救急",
      titleEn: "Passport Photo Rush",
      emoji: "🪪",
      desc: "签证材料明天就要，证件照还没拍！加急拍摄、规格要求、修图尺度——救急第一课。",
      reward: { en: "passport photo", zh: "加急证件照到手！🪪" },
      steps: [
        {
          npcLines: [
            "Welcome to Focus Studio! You look like a person on a mission — how can I help?",
            "Hi there, Focus Studio! You've got deadline energy written all over you. What do you need?",
            "Good afternoon! Focus Studio — you seem urgent! What can we do?",
          ],
          npcZh: "欢迎来到 Focus 摄影工作室！你看着像有任务在身——需要什么？",
          task: "说明需要加急证件照（明天要交）",
          options: [
            { text: "You read me well — I need passport photos for a visa application due tomorrow. Can you do it today?", ok: true,  tip: "due tomorrow 明天截止 + Can you do it today? 今天能办吗" },
            { text: "Deadline tomorrow! Photo emergency! Panic picture! Help fast!",                                        ok: false, tip: "说明时限：The application is due tomorrow — can you do it today?" },
            { text: "Photos. Passport ones. Yesterday. Time travel photo request.",                                         ok: false, tip: "正常加急：I need passport photos today — the visa is due tomorrow" },
          ],
          phrase: { en: "Can you do it today?", zh: "今天能办吗？", note: "due 到期；加急服务的开门问句" },
        },
        {
          npcLines: [
            "Passport photos take ten minutes, and you'll walk out with them printed — no rush fee needed! Which country's specs? They differ.",
            "Ten minutes start to finish, printed before you leave — no rush charge! Quick question: which country's requirements? They vary!",
            "Easy — ten minutes, printed on the spot, zero rush fee! Now, whose specifications? Every country differs!",
          ],
          npcZh: "证件照 10 分钟，打印好带走——不收加急费！哪个国家的规格？各国不同。",
          task: "说明是中国签证规格并出示要求",
          options: [
            { text: "It's for a Chinese visa — I have the exact size requirements on my phone. Here, let me show you.", ok: true,  tip: "exact size requirements 精确尺寸要求——自己先做功课" },
            { text: "China visa! Phone has rules! Phone is smart! Look at phone rules!",                                ok: false, tip: "出示要求：I have the size requirements on my phone" },
            { text: "Chinese visa photo. Standard? Universal photo? One photo rules all countries?",                    ok: false, tip: "主动出示：Here are the exact requirements" },
          ],
          phrase: { en: "Let me show you.", zh: "我给你看一下。", note: "show 展示；出示材料的自然引导语" },
        },
        {
          npcLines: [
            "Perfect, thirty-three by forty-eight millimeters — got it. Now, quick tips: no glasses, neutral expression, and both ears visible if possible. Ready?",
            "Thirty-three by forty-eight — locked in! Prep notes: glasses off, neutral face, ears showing. Ready when you are!",
            "Specs confirmed: thirty-three by forty-eight! Checklist: glasses off, neutral expression, ears visible. Shall we?",
          ],
          npcZh: "完美，33×48 毫米——记下了。快速提示：摘眼镜、表情自然、双耳尽量露出。准备好了吗？",
          task: "按要求摆姿势",
          options: [
            { text: "Glasses off, neutral face — should I look at the camera or slightly above it?", ok: true,  tip: "视线方向确认——证件照的细节讲究" },
            { text: "Ears? My ears are shy ears. Ears hide. Ear negotiations needed.",              ok: false, tip: "技术确认：Look at the camera or slightly above?" },
            { text: "Neutral face is my whole face. Face is permanently neutral. Ready.",           ok: false, tip: "姿势确认：Where should I look — at the camera?" },
          ],
          phrase: { en: "Where should I look?", zh: "我看哪里？", note: "look 看；拍摄时的视线指令必确认" },
        },
        {
          npcLines: [
            "Right at the lens, chin slightly down... perfect! [click, click] A few more... [click] Done! Let me show you.",
            "Straight into the lens, chin down a touch... [click] Beautiful! [click click] All set — come see!",
            "Direct eye contact with the lens, small chin drop... [click] Excellent! [click] Finished! Preview time!",
          ],
          npcZh: "直视镜头，下巴微收……完美！（咔嚓咔嚓）再来几张……好了！给你看。",
          task: "看照片，指出额头有反光",
          options: [
            { text: "These look good! One thing — there's a glare on my forehead. Can that be fixed, or should we reshoot?", ok: true,  tip: "glare 反光 + fix or reshoot 两条路——发现问题给方案" },
            { text: "Shiny head! Forehead sun! Head is light house! Fix the beacon!",                                        ok: false, tip: "专业指出：There's a glare on my forehead — fix or reshoot?" },
            { text: "Perfect photos. No notes. Flawless human. Print all.",                                                  ok: false, tip: "指出瑕疵：There's a glare — can it be fixed?" },
          ],
          phrase: { en: "Can that be fixed?", zh: "那个能修掉吗？", note: "glare 眩光/反光；证件照油光的高频问题" },
        },
        {
          npcLines: [
            "Glare is a two-second fix — retouching is included! ...Done. Four prints, all regulation-compliant. Anything else before you run off?",
            "Glare? Watch it vanish... fixed! Four regulation prints coming up. Anything else, speedy customer?",
            "Two-second retouch, on the house... et voilà! Four compliant prints, still warm. More needs before you dash?",
          ],
          npcZh: "反光两秒修好——含修图！……好了。4 张符合规格的成片。跑之前还要别的吗？",
          task: "顺便问能否要电子版",
          options: [
            { text: "Could I also get a digital copy, in case the application is submitted online?", ok: true,  tip: "in case 以防——线上提交时代证件照刚需" },
            { text: "Digital version also! Internet times! Email photo to computer space!",          ok: false, tip: "实用追问：Could I also get a digital copy, in case it's submitted online?" },
            { text: "No digital. Paper only. I distrust computers. Print worship.",                  ok: false, tip: "要电子版：A digital copy too, please — in case it's online" },
          ],
          phrase: { en: "In case it's submitted online.", zh: "以防要线上提交。", note: "in case 以防万一；数字时代办事思维" },
          adds: [{ emoji: "🪪", label: "4 prints + digital", wordId: "ps-passport" }],
        },
        {
          npcLines: [
            "Smart thinking — digital copy sent to your email, prints in hand. Total is twenty dollars. Good luck with the visa!",
            "Digital's on its way to your inbox, prints are yours! Twenty even. Visa luck to you!",
            "Email dispatched, prints delivered — twenty dollars total! Fingers crossed for that visa!",
          ],
          npcZh: "想得周到——电子版已发邮箱，纸质在手。一共 20 美元。签证顺利！",
          task: "付款并道谢",
          options: [
            { text: "Ten minutes, prints, digital, and no rush fee — you saved my application. Thank you!", ok: true,  tip: "you saved my application 救了我的申请——具体化的感谢" },
            { text: "Saved! Hero studio! Visa gods pleased! Sacrifice of twenty dollars accepted!",         ok: false, tip: "具体致谢：You saved my application — thank you!" },
            { text: "Rush fee really free? Free is suspicious. Hidden rush tax?",                          ok: false, tip: "愉快收尾：Thank you — you saved my application!" },
          ],
          phrase: { en: "You saved my ___.", zh: "你救了我的……", note: "save 挽救；感谢的高光动词" },
        },
      ],
    },
