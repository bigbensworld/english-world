    {
      id: "v2",
      title: "第 2 次光顾 · 手机进水了",
      titleEn: "Water Damage",
      emoji: "💦",
      desc: "手机掉进了泳池！进水急救、数据抢救、保险理赔——数字时代的灾难应对课。",
      reward: { en: "phone insurance", zh: "你的数据和手机都得救了！💦" },
      steps: [
        {
          npcLines: [
            "Sir/Ma'am? You're cradling a phone in a bag of rice — I know exactly what happened.",
            "Oh no — the rice bag walk. Pool? Toilet? Ocean? I've seen them all. Let me guess — pool?",
            "The classic rice-bag entrance! Let me predict: dropped it in water sometime in the last hour?",
          ],
          npcZh: "这位客户？你捧着装满米的手机袋——我完全知道发生了什么。",
          task: "承认手机掉泳池了",
          options: [
            { text: "Pool, twenty minutes ago. It fell in while I was taking a photo. The rice was my best idea.", ok: true,  tip: "时间+场景+应急措施——灾情汇报三要素" },
            { text: "Phone swim. Phone drown. Rice cemetery. Sad story.",                                          ok: false, tip: "清晰汇报：It fell in the pool twenty minutes ago" },
            { text: "Rice? What rice? This is... decorative rice bag. Coincidence.",                               ok: false, tip: "如实说明：It fell in the pool while I was taking a photo" },
          ],
          phrase: { en: "My phone fell in water.", zh: "我的手机掉水里了。", note: "fall-fell-fallen；rice 只是安慰剂，专业烘干才有效" },
        },
        {
          npcLines: [
            "The rice trick is a myth, by the way — it does almost nothing. Quick question: did the phone die immediately, or does it still turn on?",
            "Heads up — rice is basically a placebo! Key question: is it dead, or does it still power on?",
            "Fun fact: rice saves maybe five percent of phones. Critical question: does it turn on at all?",
          ],
          npcZh: "顺便说，大米偏方基本是玄学——几乎没用。关键问题：手机是直接黑屏了，还能开机吗？",
          task: "说明还能开机但屏幕闪烁",
          options: [
            { text: "It turns on, but the screen flickers and there are dark spots. Is my data safe?", ok: true,  tip: "flicker 闪烁 + dark spots 暗斑 + 关心数据——准确描述+分清主次" },
            { text: "Screen blink! Screen spooky! Ghost screen! Exorcist needed!",                     ok: false, tip: "技术描述：The screen flickers and there are dark spots" },
            { text: "Data? No important data. Only photos. All memories. No big deal.",                ok: false, tip: "数据优先：Is my data safe? It flickers with dark spots" },
          ],
          phrase: { en: "Is my data safe?", zh: "我的数据安全吗？", note: "送修第一问——手机可换，数据无价；back up 备份是护身符" },
        },
        {
          npcLines: [
            "If it turns on, your data is likely intact. We'll run diagnostics — free — and check the water damage indicators. Do you have phone insurance on your plan?",
            "It powers on? Data's probably fine! Free diagnostics coming up — we'll check the internal moisture indicators. Quick thing: do you carry our phone insurance?",
            "A working phone means your data probably survived! Diagnostics are free — including the water indicator check. Question: did you add phone insurance to your plan?",
          ],
          npcZh: "能开机的话数据大概率还在。我们跑个免费诊断，检查进水指示标。你套餐里有手机保险吗？",
          task: "确认有保险，询问理赔流程",
          options: [
            { text: "I think I do have the insurance — what's the claim process if the phone is dead?", ok: true,  tip: "claim process 理赔流程 + if 假设性提问" },
            { text: "Insurance? I signed many papers. One paper was insurance? Maybe?",                ok: false, tip: "查询确认：What's the claim process if the phone is dead?" },
            { text: "Claim? Money claim? I claim new phone! Claim everything!",                        ok: false, tip: "问流程：What's the claim process?" },
          ],
          phrase: { en: "What's the claim process?", zh: "理赔流程是什么？", note: "claim 索赔；保险兑现的标准动词" },
        },
        {
          npcLines: [
            "You do have it — I see it on the account! If the diagnostics confirm water damage, insurance replaces the phone for the deductible: forty-nine dollars. Your data transfers over if the phone still boots.",
            "Good news — insurance is active on your line! If water damage is confirmed: replacement for a forty-nine-dollar deductible. And if it still boots, everything transfers to the new one!",
            "You're covered — insurance confirmed on the account! Water damage verdict means a replacement at forty-nine deductible. Phone still boots? Full data transfer to the new device!",
          ],
          npcZh: "有的——你账户上有！如果诊断确认进水损坏，保险换新机只付 49 美元免赔额。只要还能开机，数据全部迁移到新机。",
          task: "确认数据迁移的方式",
          options: [
            { text: "So if it still boots, my photos and everything move to the new phone? How does the transfer work?", ok: true, tip: "How does the transfer work? 问清机制——数据无价必须确认" },
            { text: "Transfer magic! Data teleport! Beam my photos to new phone!",                                     ok: false, tip: "问机制：How does the transfer work?" },
            { text: "Deductible? Deduct me zero. Zero dollars best dollars.",                                         ok: false, tip: "确认关键：How does the transfer work?" },
          ],
          phrase: { en: "How does the transfer work?", zh: "数据迁移是怎么操作的？", note: "transfer data 数据迁移；换机保数据的必问句" },
          adds: [{ emoji: "📦", label: "Data transfer", wordId: "ph-transfer" }],
        },
        {
          npcLines: [
            "We do it right here — cable between the two phones, fifteen minutes, everything moves: photos, contacts, apps. Shall I start the diagnostics and prep a replacement?",
            "In-store transfer: one cable, two phones, fifteen minutes — photos, contacts, apps, everything. Ready for diagnostics and a replacement prep?",
            "Cable transfer, done here, quarter of an hour — all photos, contacts, and apps cross over. Diagnostics and replacement — shall we?",
          ],
          npcZh: "就在店里办——两台手机连根线，15 分钟，照片、联系人、应用全部迁移。现在开始诊断并准备换新机吗？",
          task: "感谢上天，痛快接受",
          options: [
            { text: "You just saved three years of photos. Yes — start everything. You're my hero today.", ok: true,  tip: "You're my hero 你是我的英雄——真诚致谢" },
            { text: "Hero?! You are mere mortal! Kidding. Kind mortal. Thank you!",                        ok: false, tip: "真诚致谢：You just saved three years of photos" },
            { text: "Fifteen minutes? Make five. Speed round. Chop chop.",                                 ok: false, tip: "感激致谢：Start everything — you're my hero today!" },
          ],
          phrase: { en: "You just saved my photos.", zh: "你刚刚救了我的照片。", note: "save 拯救；数据失而复得时的真情实感" },
        },
        {
          npcLines: [
            "Diagnostics running... Water damage confirmed, screen is corroding. Replacement is on its way — you'll walk out with a new phone and all your memories. Takeaway tip: cloud backup, every night!",
            "Running the tests... Water confirmed, corrosion beginning. Replacement incoming — new phone, same memories! Pro tip from me: nightly cloud backups, no excuses!",
            "Results are in: water damage, early corrosion. The replacement ships now — you leave with new hardware, old memories! Free advice: automatic cloud backup, tonight!",
          ],
          npcZh: "诊断中……确认进水，屏幕开始腐蚀。换新机已在路上——你将带着新手机和全部回忆离开。送你一句：每晚云备份！",
          task: "记下教训并道谢",
          options: [
            { text: "Lesson burned into my brain — cloud backup tonight, and a waterproof case next. Thank you so much!", ok: true,  tip: "burned into my brain 刻进脑子——教训式收尾" },
            { text: "Backup? Too late. Regret forever. Tell friends my story. Legend of pool phone.",                    ok: false, tip: "行动导向：Cloud backup tonight — thank you!" },
            { text: "Waterproof case? Buy most waterproof. Submarine case. Phone submarine.",                            ok: false, tip: "落实预防：Cloud backup tonight, and a waterproof case — thanks!" },
          ],
          phrase: { en: "Lesson learned.", zh: "教训记住了。", note: "lesson learned 吸取教训；从事故中收获的标准收尾" },
        },
      ],
    },
