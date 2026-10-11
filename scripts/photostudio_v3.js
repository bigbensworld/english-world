    {
      id: "v3",
      title: "第 3 次光顾 · 选片的艺术",
      titleEn: "Picking Favorites",
      emoji: "❤️",
      desc: "40 张全家福小样到了！选片、比价套餐、版权授权——照片拍完后的消费决策课。",
      reward: { en: "pick your favorites", zh: "选片完成，就等成片了！❤️" },
      steps: [
        {
          npcLines: [
            "The proof gallery is up! Come sit — let's look at these together. Spoiler: there are some gems.",
            "Gallery's live! Grab a seat — let's review as a team. Warning: choosing will be hard!",
            "Proofs are in! Sit with me — time for the hardest game in photography: picking favorites!",
          ],
          npcZh: "小样相册上线了！来坐——一起看。剧透：有不少宝贝。",
          task: "开始看片，先说整体感受",
          options: [
            { text: "I've looked through them all twice already — we love so many. How do we even narrow it down?", ok: true,  tip: "narrow it down 缩小范围——选片的核心难题" },
            { text: "All photos good! Choosing impossible! Choice paralysis! Help me choose!",                      ok: false, tip: "提出难点：How do we even narrow it down?" },
            { text: "I have system. Spreadsheet. Photo rankings. Column for Emma face quality.",                   ok: false, tip: "求助式开场：We love so many — how do we narrow it down?" },
          ],
          phrase: { en: "How do we narrow it down?", zh: "我们怎么缩小范围？", note: "narrow down 缩小；选择困难的解法句" },
        },
        {
          npcLines: [
            "Start with your gut: star every photo you love without overthinking. Then we look at your shortlist together and get practical.",
            "Gut first: heart every shot you love, no analysis allowed! Then we take the shortlist and get real about it.",
            "Instinct round one: star the loves, ban the overthinking! Round two, we get practical with your shortlist!",
          ],
          npcZh: "先凭直觉：不加思考地给每张喜欢的照片标星。然后一起过你的候选清单再实际分析。",
          task: "标星后展示候选清单",
          options: [
            { text: "Okay, going with my gut... [clicking] Done — I starred twelve. Is that too many?", ok: true,  tip: "going with my gut 跟着直觉 + Is that too many? 询问基准" },
            { text: "Twelve stars! Star shower! Star budget exceeded? Too many love?",                   ok: false, tip: "直觉选片：I starred twelve — is that too many?" },
            { text: "Twelve is discipline. I wanted forty stars. I restrained heroically.",               ok: false, tip: "报数+询问：I starred twelve — too many?" },
          ],
          phrase: { en: "I'm going with my gut.", zh: "我凭直觉来。", note: "gut 直觉；选片/决策的高效策略" },
        },
        {
          npcLines: [
            "Twelve is a healthy shortlist! Now the practical lens: which walls need photos, and what are they for? Grandparents gifts? Holiday cards?",
            "Twelve — beautiful curation! Practical filter time: where do these live? Walls? Gifts for grandparents? Holiday cards?",
            "A solid twelve! Now the real talk: what's the destination? Wall space, grandparent gifts, holiday cards?",
          ],
          npcZh: "12 张是健康的候选量！现在实际分析：哪些墙需要照片？有什么用途？送祖父母的礼物？节日贺卡？",
          task: "说明用途（一张挂客厅+送祖父母）",
          options: [
            { text: "We want one big one for the living room, and a couple of smaller prints as gifts for the grandparents.", ok: true, tip: "用途导向选片——一张大的+两张送礼" },
            { text: "Living room giant photo! Grandparents gift photos! Wall of family! Photo empire!",                       ok: false, tip: "清晰用途：One big one for the living room, plus gifts for the grandparents" },
            { text: "All twelve for walls. House becomes gallery. Rent out gallery house.",                                   ok: false, tip: "明确需求：One for the living room and a couple for gifts" },
          ],
          phrase: { en: "One big one for the living room.", zh: "一张大的挂客厅。", note: "用途决定尺寸与数量；选片的实际主义" },
        },
        {
          npcLines: [
            "Classic combo! Our family package: one sixteen-by-twenty canvas, two eight-by-tens, and all twelve digital copies — two hundred ten dollars.",
            "The traditional trio! Family package: sixteen-by-twenty canvas, pair of eight-by-tens, all twelve digitals — two hundred ten.",
            "Perfect combo! Package deal: the big canvas, two eights-by-ten, twelve digital files — two ten total!",
          ],
          npcZh: "经典组合！家庭套餐：一张 16×20 帆布、两张 8×10、12 张全部电子版——210 美元。",
          task: "确认电子版包含版权授权",
          options: [
            { text: "The digital copies include a copyright release, right? I'd want to print extras at Costco sometime.", ok: true, tip: "copyright release 版权授权——电子照片的法律钥匙" },
            { text: "Copyright paper! Photo ownership paper! Legal photo freedom document? Included?",                    ok: false, tip: "版权确认：Does it include a copyright release?" },
            { text: "Digital mine forever? Or digital rented? Digital lease? Photo landlord?",                            ok: false, tip: "关键确认：The digital copies include a copyright release, right?" },
          ],
          phrase: { en: "Does it include a copyright release?", zh: "包含版权授权书吗？", note: "copyright release 允许自行冲印；买电子照的必问" },
          adds: [{ emoji: "📜", label: "Copyright release", wordId: "ps-copyright" }],
        },
        {
          npcLines: [
            "Full copyright release included — print anywhere, anytime, as many as you like! Shall I finalize the order with the canvas?",
            "Complete release: print at will, everywhere, forever! Ready to lock in the canvas order?",
            "Full release, unlimited printing rights, all yours! Finalize the package?",
          ],
          npcZh: "含完整版权授权——随时随地随意打印！确认下单帆布版吗？",
          task: "下单并问交付时间",
          options: [
            { text: "Let's finalize it. What's the turnaround time — we're hoping to gift the prints at Christmas.", ok: true,  tip: "turnaround time 交付周期 + 节日 deadline——时间管理" },
            { text: "Christmas deadline! Santa needs photos! Reindeer photo delivery speed?",                        ok: false, tip: "问周期：What's the turnaround time — we need them by Christmas" },
            { text: "Fast turnaround! Yesterday turnaround! Time machine photos!",                                    ok: false, tip: "实际询问：What's the turnaround time?" },
          ],
          phrase: { en: "What's the turnaround time?", zh: "交付周期是多久？", note: "turnaround 周转；制作类消费的时间必问" },
        },
        {
          npcLines: [
            "One week for prints, two for the canvas — Christmas is safe! Your order's in. It was a joy photographing your family.",
            "Prints in a week, canvas in two — holidays covered! All ordered. Truly a pleasure, this family!",
            "One week prints, two-week canvas, Christmas secured! Order placed. What a delightful crew you are!",
          ],
          npcZh: "纸质一周、帆布两周——赶得上圣诞！订单已下。给你们全家拍照很愉快。",
          task: "满意收尾",
          options: [
            { text: "You captured our family perfectly — expect us back for next year's portrait!", ok: true,  tip: "expect us back 等我们回来——客户忠诚的预告" },
            { text: "Annual photos now! Family tradition begun! Calendar family forever!",          ok: false, tip: "忠诚预告：Expect us back next year!" },
            { text: "Next year Emma will be four. New chaos. New portrait. See you then.",         ok: false, tip: "感谢+复购：Expect us back for next year's portrait!" },
          ],
          phrase: { en: "Expect us back!", zh: "等我们下次再来！", note: "expect sb back 等某人回来；回头客的温暖宣言" },
        },
      ],
    },
