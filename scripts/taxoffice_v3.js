    {
      id: "v3",
      title: "第 3 次光顾 · 退税去哪了",
      titleEn: "Where's My Refund?",
      emoji: "💰",
      desc: "说好的退税迟迟不到账！查询退税状态、核对账户、处理填错的 routing number——追钱要有方法。",
      reward: { en: "refund", zh: "你追回了自己的退税！💰" },
      steps: [
        {
          npcLines: [
            "Next in line! Good afternoon — what can I do for you?",
            "Next! Afternoon — how can I help?",
            "Good afternoon! What brings you to the tax office today?",
          ],
          npcZh: "下一位！下午好——有什么可以帮您？",
          task: "说明退税超过 8 周还没到账",
          options: [
            { text: "My refund was approved eight weeks ago, but I still haven't received it. Can you check the status?", ok: true,  tip: "approved + 8 周未到 + check the status，要素齐全" },
            { text: "Money late! Government slow! Where money?",                                                         ok: false, tip: "专业表述：My refund was approved but I haven't received it — can you check?" },
            { text: "Refund ghost. Money ghost. Sad wallet ghost.",                                                      ok: false, tip: "正式查询：Can you check the status of my refund?" },
          ],
          phrase: { en: "Can you check the status of my refund?", zh: "能查一下我的退税状态吗？", note: "refund 退税；approved 是已批准，deposited 才是已打款" },
        },
        {
          npcLines: [
            "Eight weeks is longer than normal. Let me pull up your file... I see the refund was sent — to a bank account ending in 4471. Does that sound right?",
            "Eight weeks does exceed the usual window. Pulling your file... the refund went out — to an account ending 4471. Yours?",
            "That's past the normal timeline. Checking... the refund was issued — deposited to account ending in 4471. Recognize those digits?",
          ],
          npcZh: "8 周确实超出正常时限。我调出你的档案……退税已发出——打到一个尾号 4471 的账户。是你的吗？",
          task: "发现问题：不是自己的账号（填错了）",
          options: [
            { text: "No, that's not my account — mine ends in 8890. I think I entered the wrong routing number.", ok: true,  tip: "routing number 汇款路线号——填错则钱进不了账" },
            { text: "4471? Mystery account! Rich stranger! Lucky stranger!",                                      ok: false, tip: "指出问题：My account ends in 8890 — I must have entered the wrong routing number" },
            { text: "Not mine. Money lost forever. Goodbye money. Write eulogy.",                                 ok: false, tip: "可追回：I entered the wrong routing number — what now?" },
          ],
          phrase: { en: "I entered the wrong routing number.", zh: "我填错了汇款路线号。", note: "routing number 银行路由号；填错账户退税会退回或误入" },
        },
        {
          npcLines: [
            "A common mistake — the good news is the money bounces back to us when the account doesn't match. It's not lost, it's in a holding status.",
            "Super common mix-up! Silver lining: mismatched deposits bounce back to us automatically. Your money's safe in a holding status.",
            "You'd be surprised how often that happens! The upside — failed deposits return to us automatically. Nothing's lost; it's in holding.",
          ],
          npcZh: "常见失误——好消息是账号不符时钱会自动退回我们这里。没丢，处于冻结保管状态。",
          task: "松口气，询问如何把钱转回正确账户",
          options: [
            { text: "That's a relief! How do I get it redirected to my correct account?", ok: true,  tip: "redirected 改道/重定向——追钱的关键动词" },
            { text: "Holding status? Money in jail? Bail out money!",                     ok: false, tip: "申请改道：How do I get it redirected to my correct account?" },
            { text: "Bounce back? Money athletic. Money gymnast.",                        ok: false, tip: "问流程：How do I get it redirected?" },
          ],
          phrase: { en: "How do I get it redirected?", zh: "怎么让它改道重发？", note: "redirect 改道；退税改地址/改账户的标准用词" },
        },
        {
          npcLines: [
            "Simple — fill out this change-of-account form, and we reissue the deposit. It takes about four to six weeks after processing. I know, patience!",
            "Easy fix! This change-of-account form, we reissue the deposit, and in four to six weeks you'll have it. Patience required!",
            "No problem — complete this form changing your account, we re-deposit, and four to six weeks later — money! I know, the waiting!",
          ],
          npcZh: "简单——填这张账户变更表，我们重新打款。处理后再等 4-6 周。我知道，需要耐心！",
          task: "填表前问清能否核对账户信息避免再错",
          options: [
            { text: "Before I submit — could you double-check my account details this time? I'd hate to wait another eight weeks.", ok: true, tip: "double-check 复核 + I'd hate to... 表达顾虑" },
            { text: "Four to six weeks?! Speed machine broken? Pedal faster!",                                                       ok: false, tip: "请窗口复核：Could you double-check my account details this time?" },
            { text: "Another form! Form collection complete! Museum of forms!",                                                       ok: false, tip: "规避再错：Could you double-check my details this time?" },
          ],
          phrase: { en: "Could you double-check it?", zh: "能帮我复核一下吗？", note: "double-check 复核；高风险信息提交前的保险动作" },
        },
        {
          npcLines: [
            "Absolutely — read me the routing and account numbers, and I'll verify them against your bank card... These match. You're safe to submit.",
            "Of course! Read me both numbers — routing first... Perfect match with your card. Submit away!",
            "Smart ask! Read them out loud — routing, then account... Confirmed, they match your card. You're clear to submit!",
          ],
          npcZh: "当然——把路由号和账号念给我，我和你银行卡核对……一致了。可以放心提交。",
          task: "感谢并提交表格",
          options: [
            { text: "Thank you — that double-check gives me real peace of mind. Submitting now.", ok: true,  tip: "peace of mind 安心——被帮助后的深度致谢" },
            { text: "Numbers match! Numbers kiss! Happy numbers!",                              ok: false, tip: "表达安心：That gives me real peace of mind" },
            { text: "Peace of mind? Mind never peace. Mind is storm.",                           ok: false, tip: "致谢收尾：Thank you — submitting now!" },
          ],
          phrase: { en: "That gives me peace of mind.", zh: "这让我很安心。", note: "peace of mind 内心安宁；感谢把关的高频句" },
          adds: [{ emoji: "💰", label: "Refund redirected", wordId: "tax-refund" }],
        },
        {
          npcLines: [
            "Submitted and processed! Your refund will land in the right account within six weeks. Anything else for you today?",
            "All through! Six weeks max and the money finds its way home. Anything else today?",
            "Done and done! Six weeks, correct account, happy ending. What else can I do?",
          ],
          npcZh: "提交并处理完成！退税会在 6 周内到正确账户。今天还有别的吗？",
          task: "没有其他事，礼貌收尾",
          options: [
            { text: "That's everything — thank you for untangling this mess for me!", ok: true,  tip: "untangle the mess 理清乱麻——形象化致谢" },
            { text: "Money home! I also home! We all go home!",                      ok: false, tip: "形象致谢：Thank you for untangling this mess!" },
            { text: "More things? No. Energy gone. Tax energy annual limit.",        ok: false, tip: "收尾致谢：Thank you for untangling this!" },
          ],
          phrase: { en: "Thank you for untangling this.", zh: "谢谢你帮我理清了这团乱麻。", note: "untangle 解开缠结；感谢处理复杂问题的妙语" },
        },
      ],
    },
