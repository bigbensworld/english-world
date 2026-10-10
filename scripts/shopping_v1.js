  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 下单前咨询",
      titleEn: "Before You Order",
      emoji: "🛒",
      desc: "看中一双鞋：问尺码、问库存、问运费、找折扣码——下单前的精明买家英语。",
      reward: { en: "size chart", zh: "你解锁了下单咨询英语，网购不踩坑！🛒" },
      steps: [
        {
          npcLines: [
            "Thanks for contacting ShoeTop support! This is Maya. How can I help you today?",
            "ShoeTop live chat, Maya speaking! What can I do for you?",
            "Hi there, Maya from ShoeTop support! What's on your mind today?",
          ],
          npcZh: "感谢联系 ShoeTop 客服！我是 Maya。今天有什么可以帮您？",
          task: "询问心仪鞋款的尺码建议",
          options: [
            { text: "Hi! I'm looking at the Runner Pro shoes. I'm usually a size 9 — should I order my usual size, or size up?", ok: true,  tip: "size up 买大一号——网购鞋服关键问题" },
            { text: "Shoes! Feet! Number nine! Correct?!",         ok: false, tip: "问尺码建议：Should I order my usual size, or size up?" },
            { text: "Size 9 always fits all humans of size 9.",    ok: false, tip: "不同品牌尺码有差：Should I size up?" },
          ],
          phrase: { en: "Should I size up?", zh: "我要买大一号吗？", note: "size up 大一号 / size down 小一号；网购鞋服必问" },
        },
        {
          npcLines: [
            "Great question! The Runner Pro runs a little small — most customers size up half a size. I'd go with nine and a half for you!",
            "Heads-up: Runner Pros run small! Nine and a half is your safest bet based on the size chart.",
            "Good instinct to ask — this model runs small! The size chart says nine and a half for a true nine.",
          ],
          npcZh: "问得好！Runner Pro 偏小——多数客户会买大半码。建议您选 9.5 码！",
          task: "询问喜欢的颜色是否有货",
          options: [
            { text: "Perfect, nine and a half it is. Is the navy blue still in stock?", ok: true,  tip: "in stock 有货——下单前确认库存" },
            { text: "Navy blue shoes exist? Yes no maybe?",       ok: false, tip: "问库存：Is the navy blue still in stock?" },
            { text: "Stock check please. Blue navy color. Or navy blue. Same thing.", ok: false, tip: "标准问法：Is it still in stock?" },
          ],
          phrase: { en: "Is it still in stock?", zh: "还有货吗？", note: "in stock 有货 / sold out 售罄 / back in stock 补货" },
        },
        {
          npcLines: [
            "Oh, I'm sorry — navy is sold out right now! It'll be back in stock next Tuesday. Want me to notify you?",
            "Bad news: navy's gone for now! Restock lands Tuesday — shall I ping you when it's back?",
            "Navy flew off the shelves! Tuesday's the restock date — want a notification?",
          ],
          npcZh: "哦抱歉——藏青色现在售罄了！下周二补货。要我到货时通知您吗？",
          task: "接受通知，并问运费政策",
          options: [
            { text: "Yes, please notify me. Also, how much is shipping — is it free over a certain amount?", ok: true,  tip: "free over a certain amount 满额包邮——省钱关键" },
            { text: "Notify by telepathy please. Shipping money talk also.", ok: false, tip: "通知+运费一起问：Notify me. Is shipping free over a certain amount?" },
            { text: "Shipping free always? I only accept free.",     ok: false, tip: "问门槛：Is it free over a certain amount?" },
          ],
          phrase: { en: "Is shipping free over a certain amount?", zh: "满多少钱包邮？", note: "certain amount = 一定金额；凑单免运费的依据" },
        },
        {
          npcLines: [
            "Shipping's five ninety, but free over fifty dollars! The Runner Pros are fifty-nine, so you're covered. Oh — and there's a first-order discount code: WELCOME10!",
            "Five ninety shipping, free past fifty! The shoes are fifty-nine — free shipping unlocked! Plus, code WELCOME10 for ten percent off your first order!",
            "Shipping: five ninety, or free over fifty bucks. Shoes cost fifty-nine — you qualify! And use WELCOME10 at checkout for ten percent off!",
          ],
          npcZh: "运费 5.9 美元，满 50 美元包邮！这双鞋 59 美元，已经免运费了。对了——首单折扣码：WELCOME10！",
          task: "确认折扣码如何使用",
          options: [
            { text: "Nice, thank you! Where do I enter the WELCOME10 code — at checkout?", ok: true,  tip: "Where do I enter the code + at checkout 结账页——折扣码使用路径" },
            { text: "Code WELCOME10. I shout it at package when arrive?", ok: false, tip: "结账时输入：Where do I enter the code?" },
            { text: "Ten percent? Make it fifty percent, I am new customer.", ok: false, tip: "新手礼遇只有 10%：Where do I enter the code at checkout?" },
          ],
          phrase: { en: "Where do I enter the code?", zh: "我在哪里输入折扣码？", note: "enter = 输入；checkout = 结账页——电商两大高频词" },
        },
        {
          npcLines: [
            "Exactly — there's a promo code box at checkout, paste it there. Anything else I can help with before you order?",
            "You got it — promo box at checkout, paste away! Anything else before you hit that order button?",
            "Right at checkout, promo code field! Any other questions, smart shopper?",
          ],
          npcZh: "没错——结账页有个优惠码输入框，粘贴进去就行。下单前还有其他问题吗？",
          task: "确认下单后如何查物流",
          options: [
            { text: "Just one more thing — how do I track my order once it ships?", ok: true,  tip: "track my order 查物流 + once it ships 发货后" },
            { text: "Track order how? Package GPS where?",          ok: false, tip: "标准问法：How do I track my order?" },
            { text: "Tracking unnecessary. Packages find me eventually.", ok: false, tip: "查物流心里有数：How do I track my order once it ships?" },
          ],
          phrase: { en: "How do I track my order?", zh: "我怎么查我的订单物流？", note: "track = 追踪；订单邮件里一般有 tracking link" },
        },
        {
          npcLines: [
            "You'll get an order confirmation email right away, then a tracking link once it ships — usually within 24 hours. Happy shopping!",
            "Confirmation email immediately, tracking link within a day of shipping! Enjoy your new shoes!",
            "Email confirmation now, tracking link within 24 hours of shipping! Thanks for shopping with ShoeTop!",
          ],
          npcZh: "您马上会收到订单确认邮件，发货后（通常 24 小时内）会收到物流链接。购物愉快！",
          task: "感谢客服，结束咨询",
          options: [
            { text: "You've been super helpful, Maya — thanks! I'll order on Tuesday when navy is back.", ok: true,  tip: "点名感谢（Maya）+ 呼应前文（等周二补货）——完美的咨询收尾" },
            { text: "Bye chat person. Shoes Tuesday maybe.",        ok: false, tip: "点名致谢更真诚：You've been super helpful, Maya!" },
            { text: "OK ending chat now.",                          ok: false, tip: "完整收尾：Thanks, Maya — I'll order on Tuesday!" },
          ],
          phrase: { en: "You've been super helpful!", zh: "你帮了大忙！", note: "对客服的满分评价；super 加强语气" },
        },
      ],
    },
