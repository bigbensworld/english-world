    {
      id: "v3",
      title: "第 3 次光顾 · 看不懂的账单",
      titleEn: "The Mystery Bill",
      emoji: "🧾",
      desc: "月账单突然暴涨 30 美元！逐行对账、发现隐藏扣费、礼貌而坚定地要说法——账单维权实战。",
      reward: { en: "extra charge", zh: "你追回了多扣的费用！🧾" },
      steps: [
        {
          npcLines: [
            "Welcome in! You've got a bill in your hand and a look on your face — account questions?",
            "Hi there! That's the 'my bill confused me' face. What's up with the account?",
            "Good afternoon! Bill in hand, storm on brow — let's fix whatever's wrong. What happened?",
          ],
          npcZh: "欢迎光临！你手里拿着账单、脸上有话要说——账户问题？",
          task: "说明月账单突然涨了 30 美元",
          options: [
            { text: "My monthly bill jumped from fifty-five to eighty-five dollars, and I didn't change anything. Can we go through it line by line?", ok: true, tip: "jumped from A to B 暴涨 + line by line 逐行——对账开场白" },
            { text: "Bill big! Bill wrong! Bill evil! Fix bill angry!",                                                                                  ok: false, tip: "专业对账：Can we go through it line by line?" },
            { text: "Thirty more dollars! Inflation? Tax? Government? Who to blame?",                                                                    ok: false, tip: "逐行核对：My bill jumped from 55 to 85 — let's go through it" },
          ],
          phrase: { en: "Let's go through it line by line.", zh: "我们逐行过一遍。", note: "go through 核对；line by line 逐行——账单维权的标准动作" },
        },
        {
          npcLines: [
            "Absolutely — let's pull it up... Okay, your base plan is fifty-five, correct. Then: 'Premium Visual Voicemail' at ten dollars, 'Device Protection Plus' at twelve, and an 'International SMS' add-on at eight. Did you add these?",
            "Of course — pulling it now... Base plan, fifty-five, checks out. Then: Premium Voicemail, ten dollars. Device Protection Plus, twelve. International SMS, eight. Ring any bells?",
            "Let's see the damage... Plan itself: fifty-five, all good. But here's Premium Visual Voicemail — ten bucks. Device Protection Plus — twelve. International SMS — eight. Do these look familiar?",
          ],
          npcZh: "当然——调出来……基础套餐 55 没错。然后：『高级可视化语音信箱』10 美元、『设备保护加强版』12 美元、『国际短信』包 8 美元。这些是你加的吗？",
          task: "坚决否认添加过这些服务",
          options: [
            { text: "I never signed up for any of those. I don't even know what visual voicemail is. When were they added?", ok: true,  tip: "never signed up 从未开通 + When? 追溯时间——立场清晰" },
            { text: "Visual voicemail? I no do voicemail. Voicemail fear me.",                                              ok: false, tip: "明确否认：I never signed up for any of those" },
            { text: "Maybe I add? Sleepwalking shopper? Dream purchases?",                                                   ok: false, tip: "坚决澄清：I never signed up — when were they added?" },
          ],
          phrase: { en: "I never signed up for that.", zh: "我从没开通过那个。", note: "sign up 开通/订阅；被莫名扣费的核心声明" },
        },
        {
          npcLines: [
            "Checking the timestamps... all three added on the same day — the day you came in for the water-damage claim. They were bundled during the replacement setup. That was our error.",
            "Looking at dates... all three hit the same day — your water-damage claim day! They got bundled into the replacement paperwork. That's on us, honestly.",
            "Timestamps say it all: same day as your insurance claim! The features got tacked onto the replacement transaction. Our mistake, I admit it.",
          ],
          npcZh: "查时间戳……三项都是同一天加的——就是你办进水理赔那天。是在换机办理时被打包勾选了。这是我们的失误。",
          task: "要求全额退款取消",
          options: [
            { text: "I appreciate the honesty. I'd like all three removed, and the thirty dollars refunded to this bill.", ok: true,  tip: "诉求明确：remove + refund——退款三要素齐全" },
            { text: "Refund! Refund triple! Pain and suffering dollars! Emotional invoice!",                               ok: false, tip: "合理诉求：Remove all three, and refund the thirty dollars" },
            { text: "Keep voicemail. Voicemail my friend now. Forced friendship.",                                          ok: false, tip: "明确诉求：Removed, and refunded, please" },
          ],
          phrase: { en: "I'd like it refunded.", zh: "我要求退款。", note: "refund 退款；维权诉求的标准动词" },
        },
        {
          npcLines: [
            "Removing all three and applying a thirty-dollar credit to this bill — your total goes back to fifty-five. And I'm flagging the account so no add-ons can be added without your PIN confirmation.",
            "All three removed, thirty-dollar credit applied — back to fifty-five even! Plus, I'm setting a PIN requirement: no features get added without your confirmation. Ever.",
            "Consider it done: three features gone, thirty bucks credited, fifty-five restored! And I'm adding a PIN lock — nothing gets added to this account without your say-so.",
          ],
          npcZh: "三项全撤，本月账单抵扣 30 美元——恢复到 55。另外我给账户加标记：没有你的 PIN 确认，任何附加服务都加不上。",
          task: "对解决方案表示满意并确认",
          options: [
            { text: "Refunded and PIN-protected — that's exactly the right fix. Thank you for sorting this out so quickly.", ok: true,  tip: "exactly the right fix 正确的解法——认可方案收尾" },
            { text: "PIN protection? Phone has bodyguard now. Account fortress. Safe phone kingdom.",                       ok: false, tip: "确认方案：That's exactly the right fix — thank you" },
            { text: "Quick? Took whole conversation. Time is money. Bill me time.",                                          ok: false, tip: "满意收尾：Thank you for sorting this out!" },
          ],
          phrase: { en: "That's exactly the right fix.", zh: "这正是正确的解决办法。", note: "fix 解法；认可解决方案的地道说法" },
          adds: [{ emoji: "❗", label: "Refund won", wordId: "ph-charge2" }],
        },
        {
          npcLines: [
            "One more suggestion while you're here: switch to autopay and paperless billing — it knocks five dollars off every month. And you'll never miss a payment.",
            "Since you're here: autopay plus paperless saves you five dollars monthly, forever. And no more late-payment panics!",
            "Free money tip: autopay + paperless billing = five dollars off each month. Plus, goodbye late fees!",
          ],
          npcZh: "趁你在这儿再提个建议：改自动扣款和无纸化账单——每月再省 5 美元，而且永远不会错过付款。",
          task: "接受建议（本次推荐确实可信）",
          options: [
            { text: "After this honesty display? Yes — set up autopay and paperless. You've earned my trust today.", ok: true,  tip: "earned my trust 赢得信任——从维权到信任的转变" },
            { text: "Autopay? Auto-take money! Auto-suspicious! But yes.",                                           ok: false, tip: "信任决策：You've earned my trust — set it up" },
            { text: "Five dollars? Make it ten. Loyalty escalating demands.",                                        ok: false, tip: "接受好建议：Set up autopay and paperless, please" },
          ],
          phrase: { en: "You've earned my trust.", zh: "你赢得了我的信任。", note: "earn trust 赢得信任；从纠纷到加购的转变句" },
        },
        {
          npcLines: [
            "Autopay and paperless, all set! Here's your corrected bill — fifty-five even. Have a great day, and thank you for your patience with our mistake.",
            "Both activated! Corrected bill: fifty-five flat. Thank you for the patience while we cleaned up our own mess!",
            "Done and done — fifty-five on the nose! We appreciate your grace in handling our error. See you next time!",
          ],
          npcZh: "自动扣款和无纸化都设好了！这是修正后的账单——正好 55。祝你有美好的一天，也谢谢你对我们的失误保持耐心。",
          task: "体面收尾",
          options: [
            { text: "Mistakes happen — it's the fixing that counts. Thanks for making it right. See you around!", ok: true,  tip: "呼应干洗店 v3 的金句——it's the fixing that counts" },
            { text: "Fifty-five! Beautiful number! Nicest number! Frame the bill!",                              ok: false, tip: "大度收尾：It's the fixing that counts — thanks!" },
            { text: "Next time no mistake. Perfect service only. High standards store.",                        ok: false, tip: "体面道别：Thanks for making it right!" },
          ],
          phrase: { en: "Thanks for making it right.", zh: "谢谢你把事情处理好。", note: "make it right 纠正错误；维权成功的完美收尾" },
        },
      ],
    },
