  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 初次报税",
      titleEn: "Filing for the First Time",
      emoji: "📝",
      desc: "第一次报税！带齐 W-2 和证件到税务局。学 file taxes、申报身份、扣除项——新移民报税第一课。",
      reward: { en: "file taxes", zh: "你完成了人生第一次英文报税！📝" },
      steps: [
        {
          npcLines: [
            "Next in line, please! Good afternoon — how can I help you today?",
            "Next please! Afternoon! What can the tax office do for you?",
            "Next! Hi there, welcome to the Taxpayer Assistance Center. What brings you in?",
          ],
          npcZh: "下一位！下午好——今天有什么可以帮您？",
          task: "说明是第一次报税需要帮助",
          options: [
            { text: "Hi! This is my first year filing taxes, and I'd like some help getting started.", ok: true,  tip: "first year filing taxes 第一年报税——直接说明新手身份" },
            { text: "Tax! Me! First! Confused! Help!",                                                  ok: false, tip: "清晰表述：This is my first year filing taxes" },
            { text: "I received scary letters. Letters have numbers. Numbers scare me.",               ok: false, tip: "先说核心需求：I'd like some help filing my taxes" },
          ],
          phrase: { en: "This is my first time filing taxes.", zh: "这是我第一次报税。", note: "file taxes 报税；file = 提交正式文件" },
        },
        {
          npcLines: [
            "Congratulations on your first filing! Do you have your W-2 form from your employer? That's our starting point.",
            "Welcome to the club nobody wants to join! Do you have your W-2? That's where we start.",
            "Ah, a first-timer! Let's begin with the basics — do you have your W-2 from your employer?",
          ],
          npcZh: "恭喜第一次申报！你有雇主给的 W-2 表吗？那是我们的起点。",
          task: "出示 W-2 表",
          options: [
            { text: "Yes, here's my W-2, and I also brought my ID and SSN card.", ok: true,  tip: "W-2 + ID + SSN 报税三件套一次备齐" },
            { text: "W-2? I have paper. Many papers. Paper soup.",                ok: false, tip: "带齐证件：Here's my W-2, my ID, and my SSN card" },
            { text: "No W-2. Employer say no paper. Trust employer.",            ok: false, tip: "W-2 是雇主必须提供的：Here's my W-2" },
          ],
          phrase: { en: "Here's my W-2.", zh: "这是我的 W-2 表。", note: "W-2 工资税单；报税的核心文件" },
        },
        {
          npcLines: [
            "Perfect, all three documents! Now, what's your filing status — single, or married filing jointly?",
            "All three — you came prepared! Next question: filing status. Single? Married filing jointly?",
            "Excellent preparation! Now, your filing status: are you single, or married filing jointly?",
          ],
          npcZh: "三份文件齐了！现在，你的申报身份是——单身，还是已婚合并申报？",
          task: "说明单身申报",
          options: [
            { text: "Single. It's just me — no dependents either.", ok: true,  tip: "dependent 受抚养人——申报身份的关键概念" },
            { text: "Single like coffee. Alone like Monday.",       ok: false, tip: "正式回答：Single — no dependents" },
            { text: "Married to my job. Job is spouse. File with job?", ok: false, tip: "按实际婚姻状况：Single, no dependents" },
          ],
          phrase: { en: "Single, no dependents.", zh: "单身，无受抚养人。", note: "filing status 申报身份：single/married jointly/married separately/head of household" },
        },
        {
          npcLines: [
            "Single, easy enough! Now — did you have any student loan interest or tuition payments this year? Those can be deductions.",
            "Single it is! One more thing: any student loan interest or tuition this year? Those count as deductions.",
            "Simple status! Question: student loans or tuition payments this year? Both are potential deductions.",
          ],
          npcZh: "单身，简单！再问——今年有学生贷款利息或学费支出吗？那些可以成为扣除项。",
          task: "询问 deduction（扣除项）是什么意思",
          options: [
            { text: "I'm not sure what counts as a deduction. Could you explain what I can deduct?", ok: true,  tip: "主动问清概念——政府窗口不懂就问，天经地义" },
            { text: "Deduct? Like detective? Deduct mystery?",                                        ok: false, tip: "问清规则：What can I deduct?" },
            { text: "I deduct everything. Life is deduction. Deduct sadness?",                        ok: false, tip: "了解范围：Could you explain what I can deduct?" },
          ],
          phrase: { en: "What can I deduct?", zh: "我能扣除什么？", note: "deduction 扣除项——从收入中减去的部分，能省税" },
        },
        {
          npcLines: [
            "Of course! Deductions reduce your taxable income. Student loan interest, tuition, and even some job-search costs qualify. Did you pay student loan interest?",
            "Great question! Deductions lower your taxable income. Student loan interest, tuition, job-search expenses — all qualify. So: student loans?",
            "Happy to explain! A deduction shrinks the income you're taxed on. Student loan interest and tuition are the common ones. Did you have either?",
          ],
          npcZh: "当然！扣除项会减少你的应税收入。学生贷款利息、学费、甚至部分求职费用都算。你有学生贷款利息吗？",
          task: "说明有学生贷款，每年收到利息单",
          options: [
            { text: "Yes, I pay student loans — I receive an interest statement every January.", ok: true,  tip: "interest statement 利息对账单——记得留档的意识" },
            { text: "Student loans! Big loans. Bigger than dreams. Yes have.",                  ok: false, tip: "说明凭证：I receive an interest statement every January" },
            { text: "Statement? I throw mail. All mail. Mail is enemy.",                        ok: false, tip: "报税季要留信：I receive an interest statement every January" },
          ],
          phrase: { en: "I receive an interest statement.", zh: "我会收到利息对账单。", note: "1 月收到的对账单别扔——报税全靠它们" },
        },
        {
          npcLines: [
            "That January statement is exactly what we need — bring it when you file. You're all set for your appointment next week. Any final questions?",
            "Perfect — that January statement is the key document. You're booked for next week. Anything else before you go?",
            "That's the golden ticket! Bring it to your filing appointment next week. Final questions?",
          ],
          npcZh: "1 月那张对账单正是我们需要的——报税时带来。下周的预约已安排好。还有什么问题吗？",
          task: "确认截止日期避免误期",
          options: [
            { text: "Just one — what's the deadline this year? I want to file well before it.", ok: true,  tip: "deadline 截止日期 + well before 提前——双重保险意识" },
            { text: "Deadline? Deadlines are suggestions. Flexible dates.",                     ok: false, tip: "截止日很严格：What's the deadline this year?" },
            { text: "Next week appointment? Cancel. I file year 3000. Future me problem.",      ok: false, tip: "按时申报：What's the deadline?" },
          ],
          phrase: { en: "What's the deadline?", zh: "截止日期是什么时候？", note: "美国报税截止通常是 4 月 15 日——错过会有罚金" },
        },
        {
          npcLines: [
            "April fifteenth — but with your appointment next week, you'll be done by March! See you then, and welcome to adulthood!",
            "April fifteenth is the deadline, but you'll be finished in March! See you next week — and congrats on adulting!",
            "April fifteenth! Though with next week's appointment, you'll beat the rush by a month. See you soon — welcome to being a taxpayer!",
          ],
          npcZh: "4 月 15 日——不过你下周预约办完，3 月就搞定了！到时候见，欢迎步入成年人的世界！",
          task: "幽默回应并道别",
          options: [
            { text: "Filing in March — I'm officially an adult now! Thank you so much for your patience.", ok: true,  tip: "幽默自嘲 + 感谢耐心——新人标配收尾" },
            { text: "Adulthood? I want refund of adulthood. Return me.",                                 ok: false, tip: "轻松回应：I'm officially an adult — thank you!" },
            { text: "March me thank January me. Time travel success.",                                    ok: false, tip: "致谢即可：Thank you for your patience!" },
          ],
          phrase: { en: "Thank you for your patience.", zh: "谢谢你的耐心。", note: "新手办事的标配致谢；patience 耐心" },
        },
      ],
    },
