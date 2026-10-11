    {
      id: "v2",
      title: "第 2 次光顾 · 选镜框的艺术",
      titleEn: "Choosing Frames",
      emoji: "👓",
      desc: "镜框墙前挑花眼！试戴、问材质、脸型搭配、镀膜加购——选框的艺术与科学。",
      reward: { en: "frames", zh: "你选中了命定镜框！👓" },
      steps: [
        {
          npcLines: [
            "Okay, frame wall! Based on your face shape, I'd point you to these three racks. Want to start trying?",
            "Welcome to the wall of choices! For your face shape, these three racks are gold. Ready to try some on?",
            "Here's the fun part — the frame wall! These three sections suit your face shape beautifully. Start trying?",
          ],
          npcZh: "好，镜框墙！根据你的脸型，我推荐这三个架子。开始试戴吗？",
          task: "开始试戴，先试一款方框",
          options: [
            { text: "Let's start with those square frames — I like the retro look.", ok: true,  tip: "square frames 方框 + retro look 复古风——描述风格" },
            { text: "Give most expensive frames. Money glasses. Rich look.",        ok: false, tip: "描述喜好：Those square frames — I like the retro look" },
            { text: "Try all frames. Every frame. One by one. All day here.",       ok: false, tip: "先试一款：Let's start with the square frames" },
          ],
          phrase: { en: "Let's start with ___.", zh: "先从……开始吧。", note: "start with 从……开始；决策有序的表达" },
        },
        {
          npcLines: [
            "Ooh, good instinct! Try them on... The mirror's right there. How do they feel?",
            "Nice choice! Pop them on and check the mirror. What's the verdict?",
            "Great instinct! Try them... mirror's to your left. Well? How do they feel?",
          ],
          npcZh: "哦，好眼光！戴上试试……镜子在那边。感觉如何？",
          task: "反馈：好看但鼻托有点紧",
          options: [
            { text: "I like the look, but the nose pads feel a little tight. Is that fixable?", ok: true,  tip: "外观好评 + 指出佩戴问题 + 问能否调整" },
            { text: "Look good. Face hurt. Pain is fashion. Buy.",                             ok: false, tip: "舒适度可调：The nose pads feel tight — is that fixable?" },
            { text: "Mirror shows stranger. Stranger wears my glasses. Weird.",                 ok: false, tip: "真实反馈：I like the look, but the nose pads feel tight" },
          ],
          phrase: { en: "They feel a little tight.", zh: "感觉有点紧。", note: "nose pads 鼻托；佩戴不适要当场说" },
        },
        {
          npcLines: [
            "Totally fixable — we adjust the pads for free, forever! So the style works. Now, material: these are acetate — light and flexible. We also have titanium — pricier, but nearly indestructible.",
            "Easy fix — free pad adjustments for life! Style approved then! Material-wise: acetate — lightweight, flexible. Or titanium — spendier but basically unbreakable.",
            "Completely adjustable — pads are a lifetime free service! Great style for you! Now materials: acetate, light and bendy. Titanium, more expensive, basically bomb-proof.",
          ],
          npcZh: "完全可修——鼻托终身免费调整！风格对了。材质方面：这是醋酸纤维——轻且有弹性。还有钛——更贵但几乎坚不可摧。",
          task: "询问两种材质的差价",
          options: [
            { text: "What's the price difference between the acetate and the titanium?", ok: true,  tip: "price difference 差价——比价核心句" },
            { text: "Numbers! Give numbers! Both numbers! Now!",                        ok: false, tip: "礼貌比价：What's the price difference?" },
            { text: "Titanium is metal? Metal cold? Cold face? Confused.",              ok: false, tip: "问差价：between the acetate and the titanium?" },
          ],
          phrase: { en: "What's the price difference?", zh: "差价多少？", note: "difference 差异；比价购物必问" },
        },
        {
          npcLines: [
            "Acetate frames are ninety dollars, titanium is two hundred. Both include the lenses from your prescription!",
            "Acetate: ninety bucks. Titanium: two hundred. And both prices include your prescription lenses!",
            "Ninety for acetate, two hundred for titanium — lenses included either way!",
          ],
          npcZh: "醋酸镜框 90 美元，钛框 200。都含你的处方镜片！",
          task: "加购防眩光镀膜（天天看屏幕）",
          options: [
            { text: "Let's go with the acetate. And since I stare at screens all day, should I add the anti-glare coating?", ok: true,  tip: "stare at screens 看屏幕 + anti-glare coating 防眩光膜——按需加购" },
            { text: "Cheap one. Also coating. Free coating. Coating gift.",                                                  ok: false, tip: "合理表述：Should I add the anti-glare coating? I work on screens all day" },
            { text: "No coating. Glare builds character. Strong eyes.",                                                      ok: false, tip: "屏幕族建议加膜：Should I add the anti-glare coating?" },
          ],
          phrase: { en: "Should I add the anti-glare coating?", zh: "我要加防眩光镀膜吗？", note: "coating 镀膜；屏幕族的护眼标配" },
          adds: [{ emoji: "✨", label: "Anti-glare", wordId: "opt-coating" }],
        },
        {
          npcLines: [
            "For screen work — absolutely, it reduces eye strain a lot. That's thirty dollars more. Total: one hundred twenty, ready in five business days.",
            "Screen users love it — real eye strain relief! Thirty dollars extra, so one hundred twenty total. Ready in about five business days.",
            "With your screen time? Non-negotiable! Thirty bucks more, one-twenty all in. Five business days to fabricate.",
          ],
          npcZh: "对屏幕党——绝对要加，大幅缓解眼疲劳。加 30 美元。共 120，5 个工作日后可取。",
          task: "确认订单和取镜时间",
          options: [
            { text: "One twenty total, ready next week — sounds good. Can you also adjust the nose pads before I pick them up?", ok: true, tip: "确认订单 + 预约调整服务，一步到位" },
            { text: "Five days?! Glasses simple. Make fast. Fast glasses.",                                                    ok: false, tip: "确认即可：One twenty, ready next week — sounds good" },
            { text: "Adjust pads when? Now? Later? Sometime? Whenever?",                                                        ok: false, tip: "取镜时调整：Can you adjust the pads before I pick them up?" },
          ],
          phrase: { en: "Sounds good. It's a deal.", zh: "不错，就这么定了。", note: "it's a deal 成交；确认订单的爽快说法" },
        },
        {
          npcLines: [
            "Adjustments are always free and instant — come in anytime! We'll text you when your glasses are ready. See you next week!",
            "Free and instant, forever — walk in whenever! Text notification the moment they're done. Next week it is!",
            "Anytime, no charge, takes two minutes! You'll get a text when they're ready. Looking forward to it!",
          ],
          npcZh: "调整永远免费且立等可取——随时来！眼镜好了我们发短信。下周见！",
          task: "道谢离开",
          options: [
            { text: "Free lifetime adjustments — you've earned a loyal customer. Thank you!", ok: true,  tip: "loyal customer 忠实客户——认可服务价值" },
            { text: "Free forever? Promise? Written promise? Lawyer call.",                 ok: false, tip: "信任致谢：You've earned a loyal customer!" },
            { text: "Text me carrier pigeon instead. Pigeons reliable.",                    ok: false, tip: "常规致谢：Thank you — see you next week!" },
          ],
          phrase: { en: "You've earned a loyal customer.", zh: "你们赢得了一位忠实客户。", note: "earn 赢得；对服务的最高评价" },
        },
      ],
    },
