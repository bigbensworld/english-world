    {
      id: "v2",
      title: "第 2 次光顾 · 收货出问题了",
      titleEn: "Delivery Trouble",
      emoji: "📦",
      desc: "等了一周的包裹终于到了——但是发错货了！联系客服：报订单号、描述问题、要照片——维权第一步。",
      reward: { en: "wrong item", zh: "你解锁了收货问题处理英语！📦➡️🔄" },
      steps: [
        {
          npcLines: [
            "ShoeTop support, this is Leo. How can I help you today?",
            "Thanks for reaching out! Leo here — what seems to be the problem?",
            "Hi, ShoeTop live chat, Leo speaking. What can I do for you?",
          ],
          npcZh: "ShoeTop 客服，我是 Leo。今天有什么可以帮您？",
          task: "说明问题：收到了错的商品",
          options: [
            { text: "Hi Leo. I received my order today, but you sent me the wrong item — I got black shoes instead of navy.", ok: true,  tip: "you sent me the wrong item 发错货 + instead of 对比正确与错误" },
            { text: "WRONG SHOES. BLACK NOT NAVY. ANGRY!",            ok: false, tip: "说清事实：You sent me the wrong item — black instead of navy" },
            { text: "Shoes arrived. Color wrong. You fix now.",       ok: false, tip: "礼貌+具体：I got black shoes instead of navy" },
          ],
          phrase: { en: "You sent me the wrong item.", zh: "你们给我发错货了。", note: "wrong item = 发错货；网购三大问题之一（错发/破损/延误）" },
        },
        {
          npcLines: [
            "Oh no, I'm sorry about that! Let me pull up your order. Could I have your order number, please?",
            "That's on us — apologies! Let me check the order. Order number, please?",
            "Ugh, a mis-ship! My apologies. May I grab your order number to investigate?",
          ],
          npcZh: "哎呀，非常抱歉！让我调出您的订单。能提供一下订单号吗？",
          task: "提供订单号",
          options: [
            { text: "Sure, it's in my confirmation email — order number 55892. Take your time.", ok: true,  tip: "order number 订单号 + Take your time 不催促（对方查系统需要时间）" },
            { text: "Number 55892. Hurry hurry hurry.",              ok: false, tip: "给对方查库时间：Take your time" },
            { text: "Order number? I delete all emails immediately always.", ok: false, tip: "订单确认邮件要保留：It's in my confirmation email" },
          ],
          phrase: { en: "May I have your order number?", zh: "能告诉我您的订单号吗？", note: "客服必问；自己找单号 = 查 confirmation email" },
        },
        {
          npcLines: [
            "Found it — one pair of Runner Pro, navy, size nine and a half. You're right, black was sent by mistake. Could you send me a photo of what you received?",
            "Got it — navy Runner Pros, nine and a half. Yep, we shipped black by accident. Quick favor: a photo of the shoes you got?",
            "There it is! Navy nine-and-a-half — and you received black. To process this, could you snap a photo of the item?",
          ],
          npcZh: "找到了——Runner Pro 藏青色 9.5 码一双。您说得对，误发了黑色。能拍张收到的鞋的照片发我吗？",
          task: "理解需要照片作为凭证",
          options: [
            { text: "Of course — I'll upload a photo right now. Is that everything you need?", ok: true,  tip: "upload a photo 上传照片 + Is that everything you need? 主动确认材料齐全" },
            { text: "Photo of shoes? Shoes are ugly, photo will be ugly.", ok: false, tip: "照片是理赔凭证：I'll upload a photo right now" },
            { text: "No photo. Trust my words only.",                   ok: false, tip: "凭证必备：I'll upload a photo right now" },
          ],
          phrase: { en: "Is that everything you need?", zh: "您需要的材料都齐了吗？", note: "主动闭环——避免来回补材料的低效沟通" },
        },
        {
          npcLines: [
            "Photo received — perfect, that's all I need! Now, how would you like to fix this: an exchange for the navy pair, or a full refund?",
            "Got the photo — we're all set! So: exchange for the navy, or full refund? Your choice!",
            "Photo's in — case complete on my end! Pick your path: navy exchange, or money back?",
          ],
          npcZh: "照片收到——完美，材料齐了！那么，您想怎么解决：换藏青色那双，还是全额退款？",
          task: "选择换货，并确认运费承担方",
          options: [
            { text: "I'd like the exchange, please. Will you cover the return shipping for the black pair?", ok: true,  tip: "cover the return shipping 承担退货运费——发错货时商家应承担" },
            { text: "Exchange! Also I keep black shoes free, yes?",    ok: false, tip: "退货是必须的：Will you cover the return shipping?" },
            { text: "Exchange fine. I pay shipping because I am nice.", ok: false, tip: "商家过错商家付运费：Will you cover the return shipping?" },
          ],
          phrase: { en: "Will you cover the return shipping?", zh: "退货运费你们出吗？", note: "cover = 承担（费用）；错发货/质量问题商家必须承担运费" },
        },
        {
          npcLines: [
            "Absolutely — we'll email you a prepaid return label. Just tape it on the box and drop it at any pickup point. The navy pair ships as soon as we scan your return!",
            "Of course! Prepaid label coming to your inbox — tape, drop, done! Navy pair ships the moment your return scans in!",
            "You bet! We'll email a prepaid label — stick it on, drop it off. The navy ships the second your return hits our system!",
          ],
          npcZh: "当然——我们会给您发预付退货面单。贴箱子上，送到任意代寄点就行。您的藏青色会在收到退货扫描后立刻发出！",
          task: "确认退货操作细节",
          options: [
            { text: "Got it: tape the label on, drop it off, and the new pair ships once you receive the return. Easy!", ok: true,  tip: "复述退货三步（label/drop-off/ship）——流程确认" },
            { text: "Label on box. Then box where? Magic box portal?", ok: false, tip: "复述流程：Tape the label, drop it at a pickup point" },
            { text: "Too many steps. You send person to my house.",    ok: false, tip: "流程其实简单，复述确认：Label, drop-off, done!" },
          ],
          phrase: { en: "Got it: ___, ___, and ___.", zh: "明白了：……、……、然后……。", note: "复述三步曲的万能模板，确认理解零偏差" },
        },
        {
          npcLines: [
            "Exactly right! Sorry again for the mix-up — the navy pair will be worth the wait. Anything else today?",
            "Perfect summary! Apologies again for the hassle — navy's on its way soon. More questions?",
            "You've got the system down! Sorry for the mix-up, and enjoy the navys. Anything else?",
          ],
          npcZh: "完全正确！再次为失误道歉——藏青色值得等待。今天还有其他需要吗？",
          task: "结束对话，给客服好评",
          options: [
            { text: "That's all — you handled this really well, Leo. Thanks for the quick fix!", ok: true,  tip: "you handled this really well 夸处理能力 + quick fix 快速解决" },
            { text: "Goodbye Leo. You are adequate.",                     ok: false, tip: "真诚夸赞：You handled this really well!" },
            { text: "Fixed? Hardly. One star review coming!",             ok: false, tip: "对方快速解决了问题：Thanks for the quick fix!" },
          ],
          phrase: { en: "Thanks for the quick fix!", zh: "谢谢你快速解决！", note: "quick fix = 快速解决；对高效客服的专属夸奖" },
        },
      ],
    },
