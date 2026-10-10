    {
      id: "v2",
      title: "第 2 次光顾 · 换汇与取现",
      titleEn: "Exchange & Withdrawal",
      emoji: "💱",
      desc: "要出国旅行了！换外币、问汇率、ATM 取现、要小面额纸币——和钱打交道的英语。",
      reward: { en: "cash", zh: "你搞定了换汇取现全套英语！💱" },
      steps: [
        {
          npcLines: [
            "Good afternoon! Number 42 at window three, please. How can I help you?",
            "Hi there, window three — what can I do for you today?",
            "Afternoon! You're up. What do you need?",
          ],
          npcZh: "下午好！42 号请到 3 号窗口。有什么可以帮您？",
          task: "说明要换欧元，询问今天的汇率",
          options: [
            { text: "Hi! I'd like to exchange some dollars for euros. What's the exchange rate today?", ok: true, tip: "exchange A for B 换汇 + exchange rate 汇率" },
            { text: "I need Europe money. Give me good rate.",        ok: false, tip: "说 I'd like to exchange dollars for euros" },
            { text: "Change money now. How much profit for you?",     ok: false, tip: "问汇率：What's the exchange rate today?" },
          ],
          phrase: { en: "I'd like to exchange ___ for ___.", zh: "我想把……换成……。", note: "换汇万能句；也可说 Do you exchange...?" },
        },
        {
          npcLines: [
            "Today's rate is one dollar to ninety-two euro cents. How much would you like to exchange?",
            "The rate right now is zero point nine two euros per dollar. How much are we talking?",
            "Ninety-two euro cents for one dollar — not bad, right? How much do you need?",
          ],
          npcZh: "今天汇率是 1 美元换 0.92 欧元。您想换多少？",
          task: "表达换 500 美元",
          options: [
            { text: "Five hundred dollars, please. Could I get some of that in smaller bills?", ok: true,  tip: "smaller bills 小面额纸币——出行实用需求" },
            { text: "Five hundred. All big money only.",             ok: false, tip: "出行更需要零钱：Could I get some in smaller bills?" },
            { text: "Give maximum money minimum paper.",             ok: false, tip: "清楚表达：Five hundred dollars, please" },
          ],
          phrase: { en: "Could I get it in smaller bills?", zh: "能给我小面额的纸币吗？", note: "bill = 纸币；小面额 = smaller/smaller bills" },
        },
        {
          npcLines: [
            "Sure thing — I'll do four sixty in euros. There's a three-dollar service fee, is that okay?",
            "No problem. That comes to four hundred sixty euros. Just a heads-up: three-dollar service fee.",
            "You got it — four sixty in euros, minus the usual three-dollar fee. Still good?",
          ],
          npcZh: "没问题——您可以换 460 欧元。有 3 美元手续费，可以吗？",
          task: "确认手续费并完成交易",
          options: [
            { text: "That's fine, thank you. Could I also get a receipt for the exchange?", ok: true,  tip: "That's fine 确认 + receipt 回执——报销/留证要收好" },
            { text: "Fee?! Surprise fee is illegal fee!",            ok: false, tip: "手续费已明示，确认即可：That's fine" },
            { text: "No receipt. Receipts are for weak people.",     ok: false, tip: "换汇回执务必保留：Could I also get a receipt?" },
          ],
          phrase: { en: "Could I get a receipt?", zh: "能给我一张回执吗？", note: "银行业务万能句——存款、换汇、转账都该拿回执" },
        },
        {
          npcLines: [
            "Here's your receipt and your euros. Anything else for you today?",
            "Receipt's printing... and there's your euros! Anything else I can help with?",
            "All done — receipt and four sixty in euros. What else can I do for you?",
          ],
          npcZh: "这是您的回执和欧元。今天还有其他业务吗？",
          task: "询问 ATM 取现每日限额",
          options: [
            { text: "Yes — what's the daily limit for ATM withdrawals? I'm traveling and might need cash.", ok: true, tip: "daily limit 每日限额 + ATM withdrawals 取款机取现" },
            { text: "Machine money how much maximum?",              ok: false, tip: "标准问法：What's the daily limit for ATM withdrawals?" },
            { text: "ATM infinite money yes? I hope?",               ok: false, tip: "ATM 有每日限额：What's the daily limit?" },
          ],
          phrase: { en: "What's the daily limit?", zh: "每日限额是多少？", note: "取现/转账都有 daily limit；旅行前务必问清" },
        },
        {
          npcLines: [
            "Your account allows five hundred a day. Oh — and a travel tip: tell us your travel dates, so we don't freeze your card abroad!",
            "Five hundred daily. Pro tip: file a travel notice before your trip, or security might freeze your card overseas!",
            "You can take out five hundred per day. Heads-up: set a travel notice, or the fraud system might block you in Europe!",
          ],
          npcZh: "您的账户每天可取 500。对了——旅行提示：告诉我们您的出行日期，免得您的卡在国外被冻结！",
          task: "感谢提醒，登记出行日期",
          options: [
            { text: "Oh, good to know! I'm traveling to Europe next week — June 10th to 20th. Could you add a travel notice?", ok: true, tip: "travel notice 出行登记——防卡被风控冻结" },
            { text: "Freeze my card? Do your worst, machine!",      ok: false, tip: "海外用卡前登记：Could you add a travel notice?" },
            { text: "I love surprises. No notice needed.",          ok: false, tip: "被冻结很麻烦：主动登记出行日期" },
          ],
          phrase: { en: "Could you add a travel notice?", zh: "能帮我登记出行通知吗？", note: "出国用卡前必做；否则银行风控可能冻结你的卡" },
        },
        {
          npcLines: [
            "Done! Travel notice added for June 10 to 20. Have a wonderful trip — and enjoy those euros!",
            "All set, June 10th through 20th on file. Safe travels, and enjoy Europe!",
            "Notice is in! You're covered for the whole trip. Bon voyage!",
          ],
          npcZh: "搞定！6 月 10 日到 20 日的出行通知已登记。旅途愉快——好好享受那些欧元吧！",
          task: "告别柜员",
          options: [
            { text: "You've been super helpful. Thanks a lot — have a great day!", ok: true,  tip: "You've been super helpful 夸赞帮助 + 道别" },
            { text: "Bye bank person.",                             ok: false, tip: "热情收尾：You've been super helpful!" },
            { text: "OK. Leaving now. Fast.",                        ok: false, tip: "完整道别：Thanks a lot — have a great day!" },
          ],
          phrase: { en: "You've been super helpful.", zh: "你帮了大忙。", note: "对服务人员的真诚夸赞，道别前的好句子" },
        },
      ],
    },
