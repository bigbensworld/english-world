    {
      id: "v4",
      title: "第 4 次光顾 · 小组作业风波",
      titleEn: "Group Project Drama",
      emoji: "👥",
      desc: "小组作业组员玩消失？分数被拖累怎么办？presentation 紧张到发抖？团队协作全场景英语。",
      reward: { en: "group project", zh: "你扛住了小组作业，团队合作英语满级！👥" },
      steps: [
        {
          npcLines: [
            "Come in! Oh — you have the group project thousand-yard stare. What happened?",
            "Hi! That face says group project trouble. Am I right?",
            "Hello! Let me guess: group project? Take a seat, tell me everything.",
          ],
          npcZh: "请进！哦——您这是小组作业 PTSD 的眼神。怎么了？",
          task: "说明情况：组员消失了，作业周五截止",
          options: [
            { text: "You guessed it. One of my group members has gone completely silent, and the project is due Friday.", ok: true, tip: "gone completely silent 彻底失联 + due Friday 周五截止——情况汇报两要素" },
            { text: "My group is three people. Two are ghosts. I am alone.",  ok: false, tip: "说清时间线：gone silent + due Friday" },
            { text: "Group projects were invented by villains.",             ok: false, tip: "陈述事实：One member has gone silent, due Friday" },
          ],
          phrase: { en: "The project is due ___.", zh: "作业……截止。", note: "due + 时间 = 截止；最简洁的 deadline 表达" },
        },
        {
          npcLines: [
            "The classic free rider! Have you tried emailing them directly, with a clear deadline and a list of their tasks?",
            "Ah, the free rider special! Did you email them directly — tasks listed, deadline in bold?",
            "Every semester, the same story! First step: a direct email. Their tasks, their deadline, in writing.",
          ],
          npcZh: "经典搭便车！您试过直接发邮件吗——写清任务清单和截止时间？",
          task: "回答：发过两封了，石沉大海",
          options: [
            { text: "Two emails already, both ignored. It's all documented.", ok: true, tip: "both ignored 都没回 + It's all documented 都有记录——申诉前的证据意识" },
            { text: "Emails? I sent a message in a bottle.",   ok: false, tip: "说明已努力：Two emails, both ignored and documented" },
            { text: "I emails him. He no reply. English hard.", ok: false, tip: "正式表达：Two emails already, both ignored" },
          ],
          phrase: { en: "It's all documented.", zh: "这些都有记录。", note: "documented = 有书面记录；处理纠纷的底气所在" },
        },
        {
          npcLines: [
            "Perfect — that's exactly what I need to hear. Bring the emails to me and I'll reach out. If they don't respond to me by Wednesday, we redo the group split and you're not penalized for their share.",
            "Documentation! My favorite word. Forward me the emails — if they ghost me too by Wednesday, I'll restructure the groups and grade your work separately.",
            "You've done everything right! Send me the email trail. No response by Wednesday means new groups, and you'll be graded on your parts only.",
          ],
          npcZh: "很好——这正是我想听到的。把邮件转给我，我来联系他。如果他周三前连我都不回，我们就重组分组，您不用为他的部分扣分。",
          task: "确认理解：自己的分数不受影响",
          options: [
            { text: "So my grade won't suffer because of their part — that's a huge relief.", ok: true, tip: "So... 复述确认 + that's a huge relief——重大担忧解除" },
            { text: "Their part was the fun part. Now I'm sad AND stressed.", ok: false, tip: "确认关键点：My grade won't suffer, right?" },
            { text: "Grade me on my genius alone. Correct choice.",  ok: false, tip: "复述确认：So my grade won't suffer because of them?" },
          ],
          phrase: { en: "That's a huge relief.", zh: "那真是让我松了一大口气。", note: "relief /rɪˈliːf/ 放心；担忧解除的标准感叹" },
        },
        {
          npcLines: [
            "Exactly. Now, the presentation part — I saw your name as the speaker. How do you feel about presenting?",
            "Your grade is safe! One more thing: you're the presenter on Friday, yes? How do you feel about that?",
            "Not a point off your grade! So — the presentation. You're speaking? Nerves okay?",
          ],
          npcZh: "正是。还有，展示环节——我看到您是主讲人。对上台演讲感觉如何？",
          task: "坦白：紧张，特别是当众讲英语",
          options: [
            { text: "Honestly? Nervous — presenting in English in front of everyone is the hard part for me.", ok: true, tip: "Honestly? 说实话（自问自答式开场）+ 坦白具体难点" },
            { text: "I feel nothing. I am a presentation machine.",  ok: false, tip: "诚实求助：Nervous — presenting in English is the hard part" },
            { text: "My English hides when people look at me.",      ok: false, tip: "标准表达：Presenting in English is the hard part for me" },
          ],
          phrase: { en: "Honestly? ___.", zh: "说实话？……。", note: "自问自答引出真话；拉近距离的沟通技巧" },
        },
        {
          npcLines: [
            "That's so common, and you know what helps? Practice out loud — not in your head. Your notes are just safety nets. Want to run through your intro with me right now?",
            "Half my students feel that way! The fix: practice out loud, in the actual room if possible. Want to test your intro on me? Free audience!",
            "Totally normal! Speaking out loud is the only real practice. Try your opening line on me — right now, no stakes!",
          ],
          npcZh: "这太常见了，知道什么有用吗？大声练——不是在心里练。讲稿只是安全网。现在想不想对我过一遍开场白？",
          task: "现场演练开场白",
          options: [
            { text: "Okay... 'Good morning, everyone. Today we'll look at how social media changed sleep habits.'", ok: true, tip: "Good morning, everyone 开场 + 一句话说清主题——标准 presentation 开头" },
            { text: "Um... hi... so... yeah... social media... sleep... stuff.",  ok: false, tip: "完整开场：Good morning everyone, today we'll look at..." },
            { text: "Testing, one two three. Is this thing on?",    ok: false, tip: "正式演练：Today we'll look at how social media changed sleep habits" },
          ],
          phrase: { en: "Today we'll look at ___.", zh: "今天我们来看……。", note: "presentation 开场三件套：问好 + 主题句 + 预告结构" },
        },
        {
          npcLines: [
            "See? You've got this! Clear, confident, done. Do that on Friday and you'll shine. Anything else?",
            "That was excellent! Natural pace, clear thesis. Friday, same energy! More questions?",
            "Now THAT's an opening! Deliver that Friday and you're golden. Anything else on your mind?",
          ],
          npcZh: "看吧？您可以的！清晰、自信、完整。周五就这么讲，您会很出彩。还有别的吗？",
          task: "道谢告别",
          options: [
            { text: "That really boosted my confidence. Thank you so much, Professor!", ok: true,  tip: "boost my confidence 提升信心——小组作业风波毕业" },
            { text: "I came in broken and leave fixed. Thank you!",   ok: false, tip: "标准感谢：That boosted my confidence, thank you!" },
            { text: "I owe you my firstborn. Or a coffee.",           ok: false, tip: "真诚道谢：Thank you so much, Professor!" },
          ],
          phrase: { en: "That boosted my confidence.", zh: "这让我信心大增。", note: "boost = 提升；对帮助的具体反馈" },
        },
      ],
    },
