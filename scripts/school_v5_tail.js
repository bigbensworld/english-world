    {
      id: "v5",
      title: "第 5 次光顾 · 学术诚信课",
      titleEn: "Academic Integrity",
      emoji: "⚖️",
      desc: "引用和抄袭的边界在哪？用 AI 工具算不算作弊？收到学术诚信指控怎么办？最高难度（B1+）一轮。",
      reward: { en: "academic integrity", zh: "你吃透了学术诚信规则，论文写得堂堂正正！⚖️" },
      steps: [
        {
          npcLines: [
            "Ah, come in! You emailed about an integrity question? Those are important — let's talk.",
            "Hello! Your email said 'urgent question about citations'? Pull up a chair!",
            "Right on time! You wanted to talk about academic integrity? A wise topic, truly.",
          ],
          npcZh: "啊，请进！您邮件里说有个学术诚信问题？这类问题很重要，我们聊聊。",
          task: "说明担忧：不确定引用边界在哪",
          options: [
            { text: "Yes — I want to understand where citing ends and plagiarism begins. I'm worried I might cross the line without knowing.", ok: true, tip: "where citing ends and plagiarism begins 引用与抄袭的边界——问题意识满分" },
            { text: "I copied a paragraph. It was a good paragraph. Now I panic.",  ok: false, tip: "预防式提问：Where does citing end and plagiarism begin?" },
            { text: "Plagiarism rules are confusing. Unrelated: can I borrow your essay?", ok: false, tip: "求边界认知：I might cross the line without knowing" },
          ],
          phrase: { en: "Where does ___ end and ___ begin?", zh: "……在哪里结束，……从哪里开始？", note: "边界探讨句式；学术/法律/伦理讨论通用" },
        },
        {
          npcLines: [
            "Best question a student has asked me all semester! Short version: if it's not your original idea or your original words, cite it. When in doubt, cite it.",
            "The question of the semester! Simple rule: not your idea, not your words? Cite. Unsure? Cite anyway!",
            "I love this question! The rule in one line: borrowed idea or borrowed words — cite. Still unsure? That means cite!",
          ],
          npcZh: "这是这学期学生问我的最好的问题！简版回答：如果不是您原创的观点或原创的文字，就引用。拿不准，就引用。",
          task: "追问：改写了别人的话还算吗",
          options: [
            { text: "What if I paraphrase — put it completely in my own words?", ok: true, tip: "paraphrase /ˈpærəfreɪz/ 改写——最容易被忽视的抄袭陷阱" },
            { text: "What if I change three words? Or seven words?",  ok: false, tip: "问改写规则：What if I paraphrase it?" },
            { text: "What if I memorize it and claim amnesia?",       ok: false, tip: "关键问题：Does paraphrasing still need a citation?" },
          ],
          phrase: { en: "What if I ___?", zh: "如果我……会怎样？", note: "what if 假设问句；探讨规则边界的主力句式" },
        },
        {
          npcLines: [
            "Even paraphrased ideas need citations! Changing the words doesn't change whose idea it was. And one more thing students ask about: AI tools. Using AI to write your paper is a violation here. Using it to brainstorm or check grammar? Usually fine — but check each syllabus.",
            "Paraphrase all you want — still cite! The idea belongs to someone. Now, the elephant in the room: AI. AI writing your paper? Violation. AI for brainstorming or grammar? Often fine — but every professor's syllabus differs!",
            "Paraphrasing changes words, not ownership — cite it! And since we're being honest: AI tools. AI-authored papers are violations here. AI as a brainstorm buddy or grammar check? Typically allowed — syllabus is the law, though!",
          ],
          npcZh: "就算改写了也要引用！换词不改变观点归属。还有一件学生常问的：AI 工具。用 AI 写论文在这里是违规。用它头脑风暴或查语法？一般没问题——但要看每门课的大纲。",
          task: "确认 AI 使用边界，问如何标注",
          options: [
            { text: "So AI for brainstorming is usually fine. How would I disclose that I used it?", ok: true, tip: "disclose /dɪsˈkləʊz/ 披露——透明使用是安全网" },
            { text: "So the robot does nothing? The robot is useless now?",  ok: false, tip: "问披露方式：How would I disclose that I used it?" },
            { text: "I will hide the AI. The AI and I have an understanding.", ok: false, tip: "透明使用：How do I disclose AI use?" },
          ],
          phrase: { en: "How do I disclose that ___?", zh: "我怎么说明/披露……？", note: "disclose = 披露；主动说明永远比被发现体面" },
        },
        {
          npcLines: [
            "Simple — add a line at the end: 'AI-assisted brainstorming on topic selection.' Honesty looks good on you! Now, worst-case scenario: if you ever get an integrity accusation, don't panic. You have the right to respond, and there's a formal appeal process.",
            "One sentence in your acknowledgments: 'Topic brainstormed with AI assistance.' Done! And hear me on this: an accusation isn't a verdict. You get to respond, and there's an appeals process — in writing, through the integrity office.",
            "A single honest line at the end of your paper — that's it! And should the worst happen — an accusation — remember: it's a process, not a sentence. Respond formally, appeal if needed. The system has your back when you're honest.",
          ],
          npcZh: "很简单——文末加一行：『选题阶段借助 AI 进行了头脑风暴』。诚实会让您显得更好！再说最坏情况：如果收到学术诚信指控，别慌。您有申辩权，还有正式申诉流程。",
          task: "确认：万一被误判该怎么办",
          options: [
            { text: "Good to know — and if the accusation is a misunderstanding, the appeal is where I'd explain my side?", ok: true, tip: "my side 我方说法——误判申辩的核心逻辑" },
            { text: "If accused, I will flee the country. Plan B.",  ok: false, tip: "制度内申辩：The appeal is where I'd explain my side?" },
            { text: "Accusations? I attract none. I am invisible.",  ok: false, tip: "确认流程：The appeal is where I explain my side, right?" },
          ],
          phrase: { en: "___ is where I'd ___.", zh: "……就是我……的地方。", note: "where 从句定位场景；我的主场/我的做法" },
        },
        {
          npcLines: [
            "Exactly — evidence first, calm response second. Keep your drafts; they're proof of your process! Guard them like treasure.",
            "Precisely! Evidence and composure. And those rough drafts of yours? They're receipts. Every version, dated — keep them all!",
            "That's the play! The appeal process loves documentation. Your drafts are your paper trail — never delete a single one!",
          ],
          npcZh: "正是——先摆证据，再冷静回应。保留您的草稿，那是您写作过程的证明！像宝贝一样存好。",
          task: "总结本轮收获并道谢",
          options: [
            { text: "Cite when in doubt, disclose AI use, keep my drafts — got it. Thank you, Professor. This might be the most useful conversation of my semester.", ok: true, tip: "三连复述 + 最高评价——学术诚信课毕业" },
            { text: "Rules understood. I will be extremely honest from now on. Mostly.", ok: false, tip: "复述三要点：Cite, disclose, keep drafts" },
            { text: "Most useful conversation? Higher than the pizza party?",     ok: false, tip: "真诚收尾：The most useful conversation of my semester, thank you!" },
          ],
          phrase: { en: "When in doubt, ___.", zh: "拿不准的时候，就……。", note: "when in doubt = 拿不准时；给简单规则的经典句式" },
        },
      ],
    },
  ],
},
