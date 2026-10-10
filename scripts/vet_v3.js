    {
      id: "v3",
      title: "第 3 次光顾 · 急诊：Max 误食袜子",
      titleEn: "Emergency: The Sock Incident",
      emoji: "🚨",
      desc: "Max 吞了一只袜子！急诊电话、X 光、费用预估——最紧张的宠物急诊英语全流程。",
      reward: { en: "X-ray", zh: "你陪 Max 渡过了袜子危机，急诊英语通关！🚨" },
      steps: [
        {
          npcLines: [
            "Happy Paws Veterinary Clinic, emergency line — what's happening?",
            "Happy Paws, this is an emergency line. What's wrong?",
            "Emergency line, Happy Paws! Go ahead — what's going on?",
          ],
          npcZh: "欢乐爪爪诊所，急诊线——发生什么事了？",
          task: "紧急说明：狗狗吞了一只袜子",
          options: [
            { text: "My dog just swallowed a sock! Should I bring him in?", ok: true,  tip: "swallowed a sock 吞了袜子 + Should I bring him in? 要不要送来——急诊开场三要素：什么宠物+什么事+怎么办" },
            { text: "Emergency! Dog broken! Everything broken!",  ok: false, tip: "说清事件：He swallowed a sock, should I bring him in?" },
            { text: "He ate a sock and now he's smiling. Cute, right?", ok: false, tip: "误食是急事：Should I bring him in?" },
          ],
          phrase: { en: "My dog just swallowed ___!", zh: "我的狗刚吞了……！", note: "just 强调刚刚发生；swallow /ˈswɒləʊ/ 吞下" },
        },
        {
          npcLines: [
            "Yes — come in right away. Don't make him vomit at home. How long ago did he eat it?",
            "Come now! And no home remedies — no making him throw up. When did this happen?",
            "Head straight over! Don't induce vomiting. How long ago are we talking?",
          ],
          npcZh: "是的——马上过来。别在家催吐。他多久前吃的？",
          task: "回答时间：大概二十分钟前",
          options: [
            { text: "About twenty minutes ago. We're leaving the house right now.", ok: true, tip: "about twenty minutes ago 报时间 + 立即出发——急诊时间线很关键" },
            { text: "Time is a human concept. Dogs live in the now.",  ok: false, tip: "报准确时间：about twenty minutes ago" },
            { text: "Yesterday? No, today. Or yesterday. Both.",       ok: false, tip: "尽量准确：about twenty minutes ago" },
          ],
          phrase: { en: "About ___ ago.", zh: "大约……之前。", note: "about + 时间段 + ago 报时间；急诊句式越短越好" },
        },
        {
          npcLines: [
            "There you are! Bring him straight to room one. How's he acting — lethargic, drooling, trying to vomit?",
            "You made it! Room one, quick quick. Is he lethargic? Drooling? Retching?",
            "Right on time — room one, please! Symptoms check: sleepy? Drooling? Trying to throw up?",
          ],
          npcZh: "来了！直接去一号诊室。他状态怎么样——无精打采、流口水、干呕吗？",
          task: "描述症状：有点蔫，干呕了两次",
          options: [
            { text: "He seems lethargic and he's tried to vomit twice but nothing came out.", ok: true, tip: "lethargic 无精打采 + tried to vomit 干呕——急诊症状描述" },
            { text: "He's totally normal. Sock is his lifestyle now.",  ok: false, tip: "描述真实症状：lethargic, tried to vomit twice" },
            { text: "He is dramatic, like all of us.",                  ok: false, tip: "关键症状：lethargic + dry heaving" },
          ],
          phrase: { en: "He seems ___.", zh: "他看起来……。", note: "seem + 形容词描述观察到的状态；急诊信息越具体越好" },
        },
        {
          npcLines: [
            "Okay, we'll take an X-ray to see where the sock is. It might pass on its own — or he might need surgery. Let's look first.",
            "X-ray time! The sock may pass naturally, or it may not. Pictures before decisions.",
            "Let's get an X-ray. Best case, it passes on its own. Worst case, minor surgery. Images first, then we talk.",
          ],
          npcZh: "好，我们先拍个 X 光看看袜子在哪。可能自己排出来——也可能需要手术。先看片子。",
          task: "同意拍片，询问费用",
          options: [
            { text: "Please do. Could you give me a cost estimate for both scenarios?", ok: true, tip: "cost estimate 费用预估 + both scenarios 两种情况——急诊必备问法（美国医疗惯例）" },
            { text: "Money is no object. Sell my car if needed.",  ok: false, tip: "稳妥问法：a cost estimate for both scenarios" },
            { text: "No X-ray. Just guess where the sock is.",     ok: false, tip: "配合检查：Could you give me a cost estimate?" },
          ],
          phrase: { en: "Could you give me a cost estimate?", zh: "能给我一个费用预估吗？", note: "estimate 名词读 /ˈestɪmət/；兽医费高昂，先问价是惯例" },
        },
        {
          npcLines: [
            "Of course — X-ray is one-fifty. If it passes naturally, that's it. If we need endoscopy, around eight hundred. Surgery would be fifteen hundred, plus anesthesia.",
            "Totally fair to ask! X-ray: $150. Natural passage: no more cost. Endoscopy: about $800. Surgery: $1,500 plus anesthesia.",
            "Smart question! X-ray runs one-fifty. If it passes, done. Endoscopy ~$800, surgery up to $1,500 with anesthesia.",
          ],
          npcZh: "当然——X 光一百五。如果自然排出就这些钱。如果要做内镜约八百。手术要一千五，加麻醉。",
          task: "确认理解，询问是否有保险可用",
          options: [
            { text: "Understood. Do you take pet insurance? I have a policy with PawCover.", ok: true, tip: "take insurance 接受保险 + policy 保单——宠物保险救命问句" },
            { text: "Eight hundred dollars for a sock hunt?!",  ok: false, tip: "先确认保险：Do you take pet insurance?" },
            { text: "I will pay in socks. I have many.",        ok: false, tip: "问保险：Do you take pet insurance?" },
          ],
          phrase: { en: "Do you take ___ insurance?", zh: "你们接受……保险吗？", note: "take = 接受；宠物险多为先付后理赔（reimburse）" },
        },
        {
          npcLines: [
            "We work with all major insurers — you'd pay upfront and file a claim for reimbursement. X-ray's back! Good news: the sock is in the stomach, and it's small enough to pass. No surgery!",
            "PawCover's great — pay us, then claim it back. And... the X-ray's in! The sock's in his stomach but small enough to pass on its own. No surgery, my friend!",
            "You'd file for reimbursement — standard stuff. Okay, images are up... The sock will pass! It's small and already moving. Phew!",
          ],
          npcZh: "我们和主流保险公司都有合作——您先付款再申请理赔。X 光出来了！好消息：袜子在胃里，而且小到可以自己排出。不用手术！",
          task: "松一口气，确认居家观察注意事项",
          options: [
            { text: "What a relief! What should I watch for at home?", ok: true, tip: "What a relief 松口气 + What should I watch for 观察要点——回家护理必备" },
            { text: "Relief? I was ready for the fifteen dollar sock.", ok: false, tip: "居家观察：What should I watch for at home?" },
            { text: "So the sock will return to me. Poetic.",  ok: false, tip: "问观察事项：What should I watch for at home?" },
          ],
          phrase: { en: "What should I watch for?", zh: "我需要留意什么？", note: "watch for = 留意观察（异常信号）；急诊离院必问" },
        },
        {
          npcLines: [
            "Watch his poop for the next two or three days — the sock will show up, I promise. Call us if he vomits, stops eating, or seems in pain. And maybe... keep the laundry basket closed!",
            "Sock watch begins! Check his business for 48 to 72 hours. Any vomiting, appetite loss, or pain — call us. And buy a laundry basket with a lid!",
            "Poop patrol for two or three days! No eating, vomiting, or pain means call us right away. Basket with a lid, my friend. Learn from this!",
          ],
          npcZh: "接下来两三天观察他的便便——袜子会出来的，我保证。如果呕吐、不吃饭或看起来疼就打电话。还有……洗衣篮最好盖上盖！",
          task: "苦笑接受建议，道谢",
          options: [
            { text: "Poop patrol it is — and yes, a lid for the basket. Thank you so much, truly!", ok: true, tip: "Poop patrol it is 幽默接受 + 真诚道谢——急诊毕业" },
            { text: "I will watch nothing. Ignorance is bliss.",  ok: false, tip: "接受医嘱：Poop patrol it is, thank you!" },
            { text: "The basket has been judged. It will be punished.", ok: false, tip: "幽默+感谢：Thank you so much, truly!" },
          ],
          phrase: { en: "___ it is.", zh: "那就……吧。/ 就这么办。", note: "重复对方关键词表接受；laundry basket 洗衣篮" },
        },
      ],
    },
