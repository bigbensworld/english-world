  visits: [
    {
      id: "v1",
      title: "第 1 次光顾 · 剪发沟通",
      titleEn: "Getting a Haircut",
      emoji: "✂️",
      desc: "走进理发店，说清楚自己要什么发型——长度、层次、刘海、后脑勺，理发沟通零翻车。",
      reward: { en: "haircut", zh: "你用英文剪出了满意的发型！✂️" },
      steps: [
        {
          npcLines: [
            "Hey! Welcome in — take a seat. What are we doing today?",
            "Hi there! Chair's all yours. What can I do for you?",
            "Hello hello! Ready for a fresh look? What are you thinking?",
          ],
          npcZh: "嘿！欢迎光临——请坐。今天剪什么样式？",
          task: "说明想剪头发，大致修短",
          options: [
            { text: "Hi! I'd like a haircut — just a trim, about half an inch off the sides and the top.", ok: true, tip: "just a trim 只修剪 + half an inch off 剪掉半英寸（约1.3cm）" },
            { text: "Cut hair. Small cut. Not bald.",     ok: false, tip: "精确描述：Just a trim, about half an inch off" },
            { text: "Do the normal thing you do to heads.", ok: false, tip: "没有『标准头』：说明长度 half an inch off" },
          ],
          phrase: { en: "Just a trim, please.", zh: "只修一下就好。", note: "trim = 小修剪；怕剪太短的保命句" },
        },
        {
          npcLines: [
            "Got it, half an inch. What about the top — same length, or a little shorter?",
            "Half an inch on the sides. And up top — keep the length or take some off?",
            "Sure! Sides, half inch. Top — what are we thinking, same or shorter?",
          ],
          npcZh: "明白，半英寸。头顶呢——同样长度，还是稍微剪短点？",
          task: "描述头顶处理方式",
          options: [
            { text: "Keep the top a bit longer, please. I usually wear a side part.", ok: true,  tip: "side part 侧分发型 + keep it longer 保留长度" },
            { text: "Top same like sides. All one army style.", ok: false, tip: "说清造型：Keep the top longer — I wear a side part" },
            { text: "Top is top, do whatever tops do.",   ok: false, tip: "发型师需要明确指令：Keep it longer, I wear a side part" },
          ],
          phrase: { en: "I usually wear a side part.", zh: "我平时梳侧分。", note: "wear = 留（发型）；side part 侧分 / middle part 中分" },
        },
        {
          npcLines: [
            "Nice, classic look. Would you like a shampoo first? It's included.",
            "A side part — good taste! Shampoo before we start? On the house!",
            "Love it. Quick shampoo first? It comes with the haircut.",
          ],
          npcZh: "好看，经典造型。先洗个头吗？这是包含在内的。",
          task: "接受洗头服务",
          options: [
            { text: "Sure, that sounds nice. Thank you!", ok: true,  tip: "接受服务的礼貌回应 + on the house = 免费" },
            { text: "No wash. Dirty hair is strong hair.", ok: false, tip: "先洗头更卫生好剪：Sure, thank you!" },
            { text: "Water expensive? I pay extra?",      ok: false, tip: "已说明 included（包含）：Sure, that sounds nice!" },
          ],
          phrase: { en: "It's on the house.", zh: "这是免费的（店里请客）。", note: "店家免费赠送的说法；house = 店家" },
        },
        {
          npcLines: [
            "Alright, I'm going in with the scissors! How do the sides look so far?",
            "Here we go — snip snip! Check out the sides — how are we doing?",
            "Scissors time! Take a look at the sides. Good so far?",
          ],
          npcZh: "好，我要动剪刀了！两侧目前看着怎么样？",
          task: "中途查看效果，提出小调整",
          options: [
            { text: "Looking good! Could you take a little more off around the ears, though?", ok: true, tip: "Looking good 肯定 + take a little more off 剪掉一点（around the ears 耳周）" },
            { text: "Perfect. Change nothing. Genius work.",  ok: false, tip: "有需求及时提：A little more off around the ears" },
            { text: "Too late for opinion, I wait for end.",  ok: false, tip: "中途沟通好过事后后悔：Could you take a little more off?" },
          ],
          phrase: { en: "Could you take a little more off ___?", zh: "能把……再剪掉一点吗？", note: "中途调整万能句：around the ears / in the back / on the top" },
        },
        {
          npcLines: [
            "You got it. Okay — I'm done! Take a look in the mirror. How's the back?",
            "Done and done! Mirror check — how does the back look to you?",
            "All finished! Have a look — is the back okay?",
          ],
          npcZh: "没问题。好——剪完了！照照镜子，后脑勺怎么样？",
          task: "检查后脑勺，确认满意",
          options: [
            { text: "The back looks great — nice and clean. I'm happy with it!", ok: true,  tip: "the back 后脑勺（发型用语）+ nice and clean 干净利落" },
            { text: "Cannot see back. Back is mystery forever.",  ok: false, tip: "发型师会拿镜子帮你照后脑勺：The back looks great!" },
            { text: "Back OK. Front bad. All bad. Start over.",   ok: false, tip: "整体满意就明确说：I'm happy with it!" },
          ],
          phrase: { en: "How's the back?", zh: "后脑勺怎么样？", note: "理发必查项；镜子 + 手持镜看背面" },
        },
        {
          npcLines: [
            "Glad you like it! Any styling product today? This pomade works great for a side part.",
            "Awesome! Before you go — want some pomade? Perfect for holding that side part.",
            "Excellent! One last thing: a bit of pomade keeps the part in place all day. Interested?",
          ],
          npcZh: "您喜欢就好！今天要来点造型产品吗？这款发蜡对侧分造型特别好用。",
          task: "礼貌拒绝推销，只付剪发钱",
          options: [
            { text: "Not today, thanks — maybe next time. How much for the haircut?", ok: true,  tip: "Not today, thanks 婉拒推销 + 问价格自然衔接结账" },
            { text: "No pomade ever. Pomade is lies.",       ok: false, tip: "婉拒但留余地：Not today, thanks — maybe next time" },
            { text: "You already ask me things too many times.", ok: false, tip: "礼貌拒绝 + 转移话题：How much for the haircut?" },
          ],
          phrase: { en: "Not today, thanks.", zh: "今天就不必了，谢谢。", note: "婉拒推销万能句——礼貌、明确、留余地" },
        },
      ],
    },
