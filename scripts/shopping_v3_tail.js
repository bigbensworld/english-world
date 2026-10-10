    {
      id: "v3",
      title: "第 3 次光顾 · 退货退款拉锯战",
      titleEn: "The Refund Battle",
      emoji: "💸",
      desc: "退款迟迟不到账、被收退货手续费、客服踢皮球？升级投诉、引用政策、要补偿——维权进阶英语。",
      reward: { en: "process the refund", zh: "你解锁了退款维权英语，拉锯战不输阵！💸" },
      steps: [
        {
          npcLines: [
            "ShoeTop support, this is Rita. How may I help you?",
            "Hi, Rita from ShoeTop support! What's the issue today?",
            "Thanks for contacting ShoeTop — Rita here. What can I do for you?",
          ],
          npcZh: "ShoeTop 客服，我是 Rita。有什么可以帮您？",
          task: "说明退款超过承诺期限仍未到账",
          options: [
            { text: "Hi Rita. I returned an item two weeks ago, and your policy says refunds process within five business days. Mine still hasn't arrived.", ok: true,  tip: "引用政策原文（policy says five business days）+ 陈述事实——维权最有力的组合" },
            { text: "Money late! Very late! Give money!",            ok: false, tip: "引用政策更有力：Your policy says five business days" },
            { text: "Two weeks waiting. I cry every night about refund.", ok: false, tip: "理性陈述：My refund still hasn't arrived" },
          ],
          phrase: { en: "Your policy says ___.", zh: "你们的政策写的是……。", note: "维权核武器——引用对方承诺；客服无法反驳自家政策" },
        },
        {
          npcLines: [
            "Let me check... I see the return was received on the 3rd. Hmm, it looks like the refund was processed to a card that's now expired. That's why it bounced.",
            "Checking now... return received on the 3rd. Ah — the refund went to an expired card and bounced back. That's the issue!",
            "Found it! Return landed on the 3rd, but the refund went to an expired card and bounced. Mystery solved!",
          ],
          npcZh: "让我查一下……退货 3 号已签收。嗯，退款打到了一张已过期的卡上，所以被退回了。原因找到了。",
          task: "理解原因，询问解决方案",
          options: [
            { text: "I see — I did replace that card. How do we fix this? Can you redirect the refund to my new card?", ok: true,  tip: "redirect the refund 改道退款——问题解决路径" },
            { text: "Expired card ate my money! Card thief!",         ok: false, tip: "钱会退回原账户：Can you redirect it to my new card?" },
            { text: "Not my fault card expired. You find money, I wait.", ok: false, tip: "配合解决：Can you redirect the refund?" },
          ],
          phrase: { en: "How do we fix this?", zh: "我们怎么解决这个问题？", note: "we = 双方共同面对——比 how do YOU fix 更易促成合作" },
        },
        {
          npcLines: [
            "I can resubmit it to your new card — three to five business days. But... my system shows a restocking fee of four ninety was deducted. I'm unable to remove it myself.",
            "New card refund, no problem — three to five days. One hiccup: the system auto-deducted a four-ninety restocking fee, and I can't remove it.",
            "Redirecting now — five days tops. But heads-up: a four-ninety restocking fee was applied, and that's above my pay grade to remove.",
          ],
          npcZh: "我可以重新提交到您的新卡——3-5 个工作日。但是……系统显示扣了 4.9 美元退货手续费，我个人权限无法取消。",
          task: "质疑手续费合理性（退货政策说免手续费）",
          options: [
            { text: "Wait — your return policy says there's no restocking fee. Could you double-check, or escalate this to someone who can waive it?", ok: true,  tip: "再次引用政策 + escalate 升级处理——层级突破" },
            { text: "Four ninety? Fine, take all my money, take my house too.", ok: false, tip: "据理力争：Your policy says no restocking fee" },
            { text: "Escalate? Like elevator? To boss floor?",        ok: false, tip: "escalate = 升级给上级：Could you escalate this?" },
          ],
          phrase: { en: "Could you escalate this?", zh: "能把这个问题升级处理吗？", note: "escalate = 上报上级；一线客服权限不够时的标准动作" },
        },
        {
          npcLines: [
            "You know what, you're right — let me check with my supervisor... Yes! She's waiving the fee as a one-time courtesy, since our policy does say no restocking fees. Full refund coming!",
            "Checking with the boss... She says yes! Fee waived — policy is policy, full refund to your new card!",
            "One supervisor chat later... fee waived! You knew the policy better than my system. Full refund, three to five days!",
          ],
          npcZh: "您说得对——我跟主管确认一下……好了！她特批免收手续费，因为我们的政策确实写着免退货手续费。全额退款马上到！",
          task: "确认最终金额与到账时间",
          options: [
            { text: "Thank you! Just to confirm: full refund of fifty-nine dollars, no fees, to my new card in three to five business days?", ok: true,  tip: "Just to confirm 复述确认——金额/费用/渠道/时限四要素闭环" },
            { text: "Confirm fast yes. Money words good.",            ok: false, tip: "关键信息复述：Full refund, no fees, new card, three to five days" },
            { text: "Fifty-nine? Was it not one hundred nine?",       ok: false, tip: "按订单实际金额确认：Full refund of fifty-nine dollars" },
          ],
          phrase: { en: "Just to confirm: ___?", zh: "确认一下：……，对吗？", note: "谈判收官句——把口头承诺钉死成具体数字" },
        },
        {
          npcLines: [
            "Exactly — fifty-nine, zero fees, new card, five days max! Again, apologies for the runaround. Is there anything else I can do?",
            "Confirmed on all counts! Fifty-nine bucks, no deductions, new card, within five days. Sorry for the hassle — anything else?",
            "That's the deal — full fifty-nine, fee-free, new card, five days! Apologies for the detour. What else can I help with?",
          ],
          npcZh: "完全正确——59 美元全额、零手续费、新卡、最多 5 天！再次为折腾道歉。还有其他需要吗？",
          task: "询问是否有补偿（折腾了两周）",
          options: [
            { text: "Well, I did spend two weeks on this. Is there any goodwill gesture — maybe a discount code for my next order?", ok: true,  tip: "goodwill gesture 善意补偿——合理维权的最后一问（不是索取，是惯例）" },
            { text: "Two weeks of my life! Cash compensation! Double refund!", ok: false, tip: "合理范围内：Any goodwill gesture — a discount code?" },
            { text: "No compensation wanted. I enjoy refund battles as hobby.", ok: false, tip: "行业惯例可以问：A discount code for my next order?" },
          ],
          phrase: { en: "Is there any goodwill gesture?", zh: "有没有什么善意补偿？", note: "goodwill gesture = 商家的歉意表达；维权收尾的体面一问" },
        },
        {
          npcLines: [
            "Actually, yes — I can offer you a twenty percent coupon for your next order. Thank you for your patience, and for knowing our policies better than our system did!",
            "Funny you ask — here's twenty percent off your next order! Thanks for the patience, and honestly, for schooling us on our own policy!",
            "Absolutely — twenty percent coupon, coming right up! You deserve it for the patience AND the policy knowledge!",
          ],
          npcZh: "还真有——下次购物给您 8 折优惠券。感谢您的耐心，也感谢您比我们的系统还熟悉我们的政策！",
          task: "接受补偿，幽默收尾",
          options: [
            { text: "Haha, I'll read the fine print next time too! Thanks for sorting everything out, Rita.", ok: true,  tip: "read the fine print 看小字条款——自嘲式幽默收尾 + 点名感谢" },
            { text: "Fine print is my full-time job now. Goodbye.",   ok: false, tip: "幽默+感谢：Thanks for sorting everything out, Rita!" },
            { text: "Twenty percent only? The battle continues!",     ok: false, tip: "见好就收：Thanks for sorting everything out!" },
          ],
          phrase: { en: "read the fine print", zh: "看清小字条款。", note: "fine print = 合同/政策的小字部分——维权高手的必备习惯" },
        },
      ],
    },
  ],
},
