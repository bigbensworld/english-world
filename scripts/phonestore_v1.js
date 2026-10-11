  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 开新套餐",
      titleEn: "New Plan, New Phone",
      emoji: "📋",
      desc: "刚搬来新城市，需要新手机号！选套餐、比较流量、以旧换新——数字生活安家第一步。",
      reward: { en: "phone plan", zh: "你拥有了自己的美国手机号！📱" },
      steps: [
        {
          npcLines: [
            "Welcome to Connect Mobile! New customer, I'm guessing — you've got that 'fresh start' look. How can I help?",
            "Hi there! Connect Mobile — you look new around here! What do you need?",
            "Welcome in! First time at Connect? Great — what can I set up for you?",
          ],
          npcZh: "欢迎来到 Connect Mobile！我猜是新客户——你满脸新开始的样子。需要什么？",
          task: "说明要开新号码和套餐",
          options: [
            { text: "Good guess! I just moved here — I need a new phone plan and number.", ok: true,  tip: "a new phone plan and number 开新套餐和新号" },
            { text: "Phone! Number! New life! Give phone life!",                           ok: false, tip: "说明需求：I need a new phone plan and number" },
            { text: "How you know fresh start? Mind reader? Psychic store?",               ok: false, tip: "确认需求：A new phone plan and number, please" },
          ],
          phrase: { en: "I need a new phone plan.", zh: "我需要一个新的手机套餐。", note: "phone plan 套餐；开户第一句" },
        },
        {
          npcLines: [
            "Welcome to the neighborhood! First question: how much data do you use? Are you a scroller, a streamer, or mostly on Wi-Fi?",
            "Congrats on the move! Let's talk data: heavy scroller? Video streamer? Or mostly Wi-Fi person?",
            "New in town — exciting! Data check: how much do you burn? Endless scrolling, video binging, or mostly Wi-Fi?",
          ],
          npcZh: "欢迎成为邻居！第一个问题：你用多少流量？刷手机型、看视频型，还是主要连 Wi-Fi？",
          task: "说明使用习惯（通勤刷视频）",
          options: [
            { text: "I stream videos on my commute, so I'd say I need a fair amount of data — maybe unlimited?", ok: true,  tip: "stream videos 刷视频 + a fair amount 相当量——按习惯推需求" },
            { text: "Data? What is data? Give biggest data. Data king.",                                       ok: false, tip: "描述使用场景：I stream videos on my commute — maybe unlimited?" },
            { text: "No phone use. Phone decorative. Phone paperweight. Zero data.",                           ok: false, tip: "按实际使用：I stream videos on my commute" },
          ],
          phrase: { en: "I stream videos on my commute.", zh: "我通勤时刷视频。", note: "stream 流媒体播放；usage-based 推荐的前提" },
        },
        {
          npcLines: [
            "A streamer! Then the unlimited plan fits — fifty-five a month, with autopay. Or the ten-gigabyte plan at thirty-five, if you want to gamble.",
            "Streamer detected! Unlimited at fifty-five monthly with autopay. Or risk it with ten gigabytes for thirty-five?",
            "Video on the go! Unlimited plan: fifty-five a month, autopay discount included. Or the ten-gig, thirty-five — for optimists!",
          ],
          npcZh: "刷视频党！那无限流量套餐合适——自动扣款每月 55。或者 10GB 套餐 35，如果你想赌一把。",
          task: "比较两个方案（贵 20 换无限值不值）",
          options: [
            { text: "What happens if I go over the ten gigabytes — extra charges?", ok: true,  tip: "go over 超出 + extra charges 额外扣费——比价要问清超套后果" },
            { text: "Gamble? I love gamble! Bet small! Regret big!",                ok: false, tip: "问超套费：What happens if I go over?" },
            { text: "Fifty-five? Make five. Haggle time. Battle begin.",           ok: false, tip: "问细节：Extra charges if I go over the ten gigabytes?" },
          ],
          phrase: { en: "What happens if I go over?", zh: "超出了会怎样？", note: "go over the limit 超出限额；隐藏费用的入口" },
        },
        {
          npcLines: [
            "Overage is fifteen dollars per gigabyte — one weekend of video binging, and the unlimited plan pays for itself!",
            "Fifteen bucks per extra gig — one heavy streaming weekend and you'll wish you'd chosen unlimited!",
            "Overage runs fifteen a gigabyte — a single binge weekend and unlimited becomes the bargain!",
          ],
          npcZh: "超出部分每 GB 15 美元——一个刷剧周末下来，无限套餐就回本了！",
          task: "果断选无限套餐",
          options: [
            { text: "Fifteen dollars a gigabyte? Unlimited it is — I'd rather pay for peace of mind.", ok: true,  tip: "pay for peace of mind 为安心付费——理性决策" },
            { text: "Unlimited! Infinity data! Download the internet!",                                ok: false, tip: "理性选择：Unlimited it is — I'd rather pay for peace of mind" },
            { text: "I will never go over. I have discipline of monk. Monk data plan.",               ok: false, tip: "按风险决策：Unlimited it is!" },
          ],
          phrase: { en: "I'd rather pay for peace of mind.", zh: "我宁愿为安心买单。", note: "would rather 宁愿；peace of mind 购买决策的经典理由" },
          adds: [{ emoji: "♾️", label: "Unlimited", wordId: "ph-unlimited" }],
        },
        {
          npcLines: [
            "Smart customer! Now — do you need a new phone, or bringing your own? We also do trade-ins if your old phone is recent.",
            "Wise choice! Phone situation: need a new one, bringing yours, or interested in trading in the old one?",
            "Excellent decision! Now the hardware: new phone, keep yours, or trade in for credit?",
          ],
          npcZh: "聪明的客户！现在——需要新手机吗，还是用自己的？旧机较新的话我们也可以以旧换新。",
          task: "询问旧手机能抵多少钱",
          options: [
            { text: "I have my old phone — how much would I get if I trade it in?", ok: true,  tip: "trade in 以旧换新 + how much would I get 问估值" },
            { text: "Old phone = treasure? Price the treasure! Value my baby!",     ok: false, tip: "问估值：How much would I get if I trade it in?" },
            { text: "Trade? Never. Old phone sentimental. Phone forever.",          ok: false, tip: "问折价：How much would I get for a trade-in?" },
          ],
          phrase: { en: "How much would I get if I trade it in?", zh: "以旧换新能抵多少钱？", note: "trade in 折抵换新；换机省钱必问" },
        },
        {
          npcLines: [
            "Let me check the model... two hundred dollars in credit toward a new phone! Not bad for a two-year-old, right? Want to finish the setup — I'll need your ID for the new number.",
            "Checking... two hundred dollars trade-in credit! Solid for a two-year-old device! Ready to finish? I'll just need your ID to activate the number.",
            "Model lookup... two hundred in credit! Respectable for its age! Shall we complete it? ID please, and I'll activate your new number.",
          ],
          npcZh: "查一下型号……可抵 200 美元购新机！两年的机器不错了吧？完成办理？我需要你的证件来激活新号。",
          task: "出示证件，完成办理",
          options: [
            { text: "Two hundred back — great deal! Here's my ID. Let's finish this.", ok: true,  tip: "认可估值 + 出示证件——办结利落" },
            { text: "Two hundred? Two thousand! Phone is family! Family price!",      ok: false, tip: "接受估值：Great deal — here's my ID" },
            { text: "ID? Why ID? Suspicious. Am I arrested? Phone jail?",             ok: false, tip: "正常流程：Here's my ID — let's finish this" },
          ],
          phrase: { en: "Let's finish this.", zh: "把它办完吧。", note: "办理收尾句；办事效率的口头宣言" },
        },
      ],
    },
