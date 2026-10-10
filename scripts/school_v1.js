    {
      id: "v1",
      title: "第 1 次光顾 · 新生报到",
      titleEn: "First Day on Campus",
      emoji: "🎉",
      desc: "迎新周第一天：报到注册、见学业导师、弄懂课表——校园生活开场全流程。",
      reward: { en: "semester", zh: "你的新学期正式开始了！🎓" },
      steps: [
        {
          npcLines: [
            "Good morning! Welcome to orientation! Are you a new student?",
            "Hi there! You look new — first day? Welcome!",
            "Welcome, welcome! New student check-in is right here. How's it going?",
          ],
          npcZh: "早上好！欢迎来到迎新周！您是新生吗？",
          task: "自我介绍：新生，来报到注册",
          options: [
            { text: "Yes, I'm a new student. Where do I register for classes?", ok: true, tip: "register for classes 选课注册——开学第一问" },
            { text: "I am new. Very new. I know nothing. Help.",  ok: false, tip: "具体提问：Where do I register for classes?" },
            { text: "New? I've been here twenty years. I just look young.", ok: false, tip: "正常报到：I'm a new student, where do I register?" },
          ],
          phrase: { en: "Where do I register for ___?", zh: "我在哪里注册……？", note: "register 注册；选课系统注册是开学第一道门槛" },
        },
        {
          npcLines: [
            "Great! Registration is all online this year, but you'll want to meet your academic advisor first. Have you been assigned one?",
            "Perfect! Everything's online now — but see your advisor before you pick anything. Do you know who your advisor is?",
            "Welcome aboard! Registration's digital this year. Step one: meet your academic advisor. Got one yet?",
          ],
          npcZh: "好的！今年注册全在线上，但您得先见学业导师。给您分配了吗？",
          task: "询问去哪见导师",
          options: [
            { text: "Not yet — where can I find them?", ok: true,  tip: "Where can I find them? 问地点——简洁直接" },
            { text: "Advisor? I make my own decisions. Alone. Forever.", ok: false, tip: "问位置：Where can I find them?" },
            { text: "Find them? They should find me. I'm new.", ok: false, tip: "主动询问：Where can I find my advisor?" },
          ],
          phrase: { en: "Where can I find ___?", zh: "我在哪能找到……？", note: "找人/找地点/找部门通用；校园日常第一句" },
        },
        {
          npcLines: [
            "Advising office, second floor of this building. Tell them your major and they'll walk you through everything. What are you studying, by the way?",
            "Upstairs, room 210! Tell them your major and they'll set you up. So — what's your major?",
            "Advising is upstairs. Say your major, they handle the rest. Which is...?",
          ],
          npcZh: "导师办公室在本栋二楼。告诉他们您的专业，他们会带您走完全部流程。顺便问，您学什么专业？",
          task: "回答专业：还没定，正在探索",
          options: [
            { text: "I'm undecided — still exploring. Is that okay?", ok: true, tip: "undecided 未定专业（美式大学常态）+ Is that okay? 求确认" },
            { text: "My major is chaos, with a minor in confusion.",  ok: false, tip: "正常回答：I'm undecided, still exploring" },
            { text: "I will decide by reading every book in the library.", ok: false, tip: "未定很正常：I'm undecided — is that okay?" },
          ],
          phrase: { en: "I'm undecided.", zh: "我还没定专业。", note: "undecided 是正式用词；约两成美国新生如此入学" },
        },
        {
          npcLines: [
            "Totally fine — half the students here started undecided! You have two years to declare. Now, one pro tip: register early. Popular classes fill up fast!",
            "Completely normal! Half of us started that way. You've got two years. Big tip: register ASAP — the good classes go quick!",
            "The most normal thing in the world! Two years to decide. Pro tip from a veteran: register early, or cry later!",
          ],
          npcZh: "完全没问题——这里一半学生入学时都没定专业！您有两年时间。一个忠告：尽早注册，热门课满得很快！",
          task: "询问注册截止时间",
          options: [
            { text: "Good to know — when's the registration deadline?", ok: true, tip: "registration deadline 注册截止——时间线必问" },
            { text: "I registered yesterday. Wait, can I register twice?", ok: false, tip: "问截止日：When's the registration deadline?" },
            { text: "Deadlines are for people with plans.",  ok: false, tip: "确认时间线：When's the deadline?" },
          ],
          phrase: { en: "When's the deadline?", zh: "截止日期是什么时候？", note: "deadline /ˈdedlaɪn/；错过它 = 进候补名单" },
        },
        {
          npcLines: [
            "Friday at five — put it in your phone right now! And join the campus tour this afternoon. It's cheesy, but you'll learn where everything is!",
            "Friday, five p.m. — set an alarm! Also: campus tour at two. It's dorky but genuinely useful!",
            "This Friday, five sharp! Phone reminder, do it now! And take the two o'clock campus tour — silly but worth it!",
          ],
          npcZh: "周五下午五点——现在就记到手机里！另外参加今天下午的校园导览。虽然有点傻，但您能知道所有地方在哪！",
          task: "答应参加，询问集合地点",
          options: [
            { text: "Alarm set! Where does the campus tour meet?", ok: true, tip: "Alarm set（提醒设好了）+ Where does it meet? 集合点" },
            { text: "Tours are for tourists. I am a scholar.", ok: false, tip: "实用主义：Where does the campus tour meet?" },
            { text: "I will find the tour by wandering. Spiritually.", ok: false, tip: "问集合点：Where does the tour meet?" },
          ],
          phrase: { en: "Where does it meet?", zh: "在哪儿集合？", note: "meet 作动词表集合地点；校园活动通用" },
        },
        {
          npcLines: [
            "Main gate, two o'clock — look for the blue umbrella! Last thing: the club fair starts tomorrow. Trust me, that's where you'll make your real friends. Enjoy your first week!",
            "Main gate, blue umbrella, two p.m.! And don't sleep on the club fair tomorrow — friendships live there. Have a great first week!",
            "Two o'clock, main gate, blue umbrella! Oh, and the club fair tomorrow? Life-changing. Go. Make friends. Be happy!",
          ],
          npcZh: "正门，两点——找蓝色雨伞！最后一件事：社团集市明天开始。相信我，真正的朋友都是在那儿交到的。第一周愉快！",
          task: "感谢并告别",
          options: [
            { text: "Blue umbrella, club fair — got it all. Thanks, you've been super helpful!", ok: true, tip: "复述两件事+道谢——信息密集时复述防遗忘" },
            { text: "Friends? I have books. Books are friends.",   ok: false, tip: "接受建议并道谢：Got it, thanks a lot!" },
            { text: "You talk too much. Just kidding. Thanks!",    ok: false, tip: "礼貌收尾：You've been super helpful!" },
          ],
          phrase: { en: "You've been super helpful!", zh: "你帮了大忙！", note: "比 Thank you 更具体的热情感谢" },
        },
      ],
    },
