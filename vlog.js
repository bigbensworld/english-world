// 英语世界 - 慢速生活频道引擎（Slow Vlog）
// 竖向刷卡 + 慢速朗读逐词高亮 + 动作收集链 + 听音选图 Quiz
// 词汇与场景对话共享 state.collected 收集系统

// ---------- Vlog 状态 ----------
const vlogState = {
  currentVlog: null,
  seenCards: {},      // vlogId:cardIdx -> true（看过的卡）
  quizPassed: {},     // vlogId -> true（通过听音 Quiz）
};

function vlogSave() {
  const d = JSON.parse(localStorage.getItem("englishWorldV2") || "{}");
  d.vlogSeen = vlogState.seenCards;
  d.vlogQuiz = vlogState.quizPassed;
  localStorage.setItem("englishWorldV2", JSON.stringify(d));
}
function vlogLoad() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorldV2"));
    if (d) {
      vlogState.seenCards = d.vlogSeen || {};
      vlogState.quizPassed = d.vlogQuiz || {};
    }
  } catch (e) { /* fresh */ }
}

// ---------- 慢速朗读（带逐词高亮） ----------
function speakSlow(text, rate, onWord, onEnd) {
  if (!("speechSynthesis" in window)) { if (onEnd) onEnd(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate || 0.55; // 慢 vlog 语速
  if (onWord) {
    u.onboundary = (e) => {
      if (e.name === "word" || e.charIndex !== undefined) onWord(e.charIndex);
    };
  }
  if (onEnd) u.onend = onEnd;
  speechSynthesis.speak(u);
}

// 高亮当前朗读到的词：根据 charIndex 找到第几个词
function highlightWordByChar(container, charIndex) {
  const spans = container.querySelectorAll(".v-word");
  let acc = 0;
  spans.forEach((s) => {
    const start = Number(s.dataset.start);
    const end = start + s.textContent.length;
    s.classList.toggle("active", charIndex >= start && charIndex < end);
  });
}

// ---------- 频道入口（首页 Tab + 场景页内频道列表） ----------
// 渲染 vlog 集列表到指定容器（首页 tab 或场景页内均可）
function renderVlogSetsInto(container) {
  container.innerHTML = "";
  VLOGS.forEach((v, i) => {
    const passed = vlogState.quizPassed[v.id];
    const seenCount = Object.keys(vlogState.seenCards).filter((k) => k.startsWith(v.id + ":")).length;
    const seenAll = seenCount >= v.cards.filter((c) => !c.type).length;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "vlog-set" + (passed ? " passed" : "");
    el.style.animationDelay = (i * 0.06) + "s";
    el.innerHTML = `
      <div class="vlog-set-emoji">${v.emoji}</div>
      <div class="vlog-set-info">
        <div class="vlog-set-title">${v.title} · ${v.titleZh}</div>
        <div class="vlog-set-desc">${v.desc}</div>
        <div class="vlog-set-progress">${passed ? "🎓 已毕业 · 可重刷" : seenAll ? "✅ 已刷完 · 去闯 Quiz！" : seenCount > 0 ? "📖 刷到 " + seenCount + "/" + v.cards.length + " 张" : "▶ " + v.cards.length + " 张卡片"}</div>
      </div>
      ${passed ? '<div class="done-badge">✓</div>' : ""}
    `;
    el.onclick = () => openVlog(v.id);
    container.appendChild(el);
  });
}

// 首页 Tab 逻辑
function initHomeTabs() {
  const tabs = $("homeTabs");
  if (!tabs) return;
  // 恢复上次选择的 tab（默认场景）
  let active = "scenes";
  try { active = sessionStorage.getItem("ewHomeTab") || "scenes"; } catch (e) {}
  if (active !== "vlog" && active !== "scenes") active = "scenes";
  function switchTo(tab) {
    active = tab;
    try { sessionStorage.setItem("ewHomeTab", tab); } catch (e) {}
    tabs.querySelectorAll(".home-tab").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === tab);
    });
    $("paneVlog").classList.toggle("hidden", tab !== "vlog");
    $("paneScenes").classList.toggle("hidden", tab !== "scenes");
    if (tab === "vlog") renderVlogSetsInto($("homeVlogSets"));
  }
  tabs.querySelectorAll(".home-tab").forEach((b) => {
    b.onclick = () => switchTo(b.dataset.tab);
  });
  switchTo(active);
}

// 场景页内的频道列表页（从 vlog 播放器返回时用）
function openVlogChannel() {
  const stage = $("stage");
  $("sceneTitle").textContent = "📺 慢速生活频道 · Slow Vlog";
  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-vlog";
  setMascotState("idle");
  state.currentScene = null;
  state.currentVisit = null;
  vlogState.currentVlog = null;

  const box = document.createElement("div");
  box.className = "adventure-box vlog-list";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">📺 慢速生活频道</div>
    </div>
    <div class="adv-intro">像刷短视频一样学英语：拿起一样东西，做一个动作，慢速讲解。刷完一集，通过听音小测验即可毕业。</div>
    <div class="vlog-sets" id="vlogSets"></div>
    <button class="btn btn-big" id="vlogBack">⬅ 返回地图</button>
  `;
  stage.appendChild(box);
  renderVlogSetsInto($("vlogSets"));
  $("vlogBack").onclick = backToMap;

  $("mapView").classList.add("hidden");
  $("sceneView").classList.remove("hidden");
}

// ---------- 刷卡模式 ----------
function openVlog(id) {
  const v = VLOGS.find((x) => x.id === id);
  if (!v) return;
  vlogState.currentVlog = v;
  const stage = $("stage");
  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-vlog";
  setMascotState("happy", 1200);

  const normalCards = v.cards.filter((c) => !c.type);
  const box = document.createElement("div");
  box.className = "adventure-box vlog-player";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">${v.emoji} ${v.title} · ${v.titleZh}</div>
      <button class="btn btn-ghost" id="vlogExit">✕ 退出</button>
    </div>
    <div class="vlog-cardstage" id="vlogStage"></div>
    <div class="vlog-nav" id="vlogNav"></div>
  `;
  stage.appendChild(box);
  $("vlogExit").onclick = openVlogChannel;

  let idx = 0;
  const seen = (i) => {
    vlogState.seenCards[v.id + ":" + i] = true;
    vlogSave();
  };

  function renderCard() {
    const card = v.cards[idx];
    const s = $("vlogStage");
    const isFact = card.type === "fun-fact";
    const wordsHtml = card.en.split(/(\s+)/).map((w) => {
      return /^\s+$/.test(w) ? w : `<span class="v-word" data-start="${card.en.indexOf(w, 0)}">${w}</span>`;
    }).join("");
    // 精确计算每个词的 start（indexOf 会重复，改为累积法）
    let pos = 0;
    const wordSpans = [];
    card.en.split(/(\s+)/).forEach((w) => {
      if (/^\s+$/.test(w)) { pos += w.length; return; }
      wordSpans.push(`<span class="v-word" data-start="${pos}">${w}</span>`);
      pos += w.length;
    });

    s.innerHTML = `
      <div class="vlog-card ${isFact ? "fact-card" : ""}">
        <div class="vlog-count">${idx + 1} / ${v.cards.length}</div>
        <div class="vlog-anim ${isFact ? "" : "anim-" + (card.anim || "idle")}">
          <span class="vlog-emoji">${card.emoji}</span>
          ${!isFact && card.anim === "pour" ? '<span class="vlog-liquid"></span>' : ""}
          ${!isFact && card.anim === "toast" ? '<span class="vlog-fire">🔥</span>' : ""}
          ${!isFact && card.anim === "boil" ? '<span class="vlog-steam">💨</span>' : ""}
          ${!isFact && card.anim === "curtain" ? '<span class="vlog-sun">☀️</span>' : ""}
          ${isFact ? '<div class="fact-tag">💡 冷知识</div>' : ""}
        </div>
        <div class="vlog-en" id="vlogEn">${wordSpans.join(" ")}</div>
        <details class="vlog-zh"><summary>🇨🇳 中文</summary>${card.zh}</details>
        <div class="vlog-words">${(card.words || []).map((w) => `<span class="vlog-word-chip">🔑 ${w}</span>`).join("")}</div>
        <div class="vlog-actions">
          <button class="btn btn-big btn-primary" id="vlogPlay">🔊 慢速播放</button>
          <button class="btn btn-big" id="vlogNormal">🏃 常速</button>
        </div>
      </div>
    `;
    $("vlogPlay").onclick = () => {
      speakSlow(card.en, 0.55, (ci) => highlightWordByChar($("vlogEn"), ci));
    };
    $("vlogNormal").onclick = () => {
      speakSlow(card.en, 0.85, (ci) => highlightWordByChar($("vlogEn"), ci));
    };
    seen(idx);

    // 导航
    const nav = $("vlogNav");
    const isLast = idx >= v.cards.length - 1;
    nav.innerHTML = `
      ${idx > 0 ? '<button class="btn" id="vlogPrev">← 上一张</button>' : ""}
      ${!isLast
        ? '<button class="btn btn-primary" id="vlogNext">下一张 →</button>'
        : '<button class="btn btn-big btn-primary" id="vlogQuiz">🎬 去闯 Quiz！</button>'}
    `;
    if ($("vlogPrev")) $("vlogPrev").onclick = () => { idx--; renderCard(); };
    if ($("vlogNext")) $("vlogNext").onclick = () => { idx++; renderCard(); };
    if ($("vlogQuiz")) $("vlogQuiz").onclick = () => startVlogQuiz(v);

    // 自动朗读第一遍（慢速）
    setTimeout(() => {
      if (vlogState.currentVlog === v && $("vlogEn")) {
        speakSlow(card.en, 0.55, (ci) => highlightWordByChar($("vlogEn"), ci));
      }
    }, 400);
  }
  renderCard();
}

// ---------- 听音选图 Quiz ----------
function startVlogQuiz(v) {
  const normalCards = v.cards.filter((c) => !c.type);
  // 随机抽 3 张（不足则全抽）
  const pool = normalCards.slice().sort(() => Math.random() - 0.5);
  const quizCards = pool.slice(0, Math.min(3, pool.length));
  let qIdx = 0, correct = 0;
  const total = quizCards.length;

  function renderQuiz() {
    if (qIdx >= total) return finishQuiz();
    const target = quizCards[qIdx];
    // 干扰项：从其他卡随机取 2 张
    const others = normalCards.filter((c) => c !== target).sort(() => Math.random() - 0.5).slice(0, 2);
    const opts = [target, ...others].sort(() => Math.random() - 0.5);

    const s = $("vlogStage");
    s.innerHTML = `
      <div class="vlog-card quiz-card">
        <div class="quiz-head">🎬 QUIZ TIME · ${qIdx + 1}/${total}</div>
        <div class="quiz-question">🔊 听声音——刚才是哪个动作？</div>
        <button class="btn btn-big btn-primary" id="quizPlay">🔊 再听一次</button>
        <div class="quiz-opts" id="quizOpts"></div>
        <div class="quiz-result" id="quizResult"></div>
      </div>
    `;
    $("quizPlay").onclick = () => speakSlow(target.en, 0.55);
    speakSlow(target.en, 0.55);

    const optsBox = $("quizOpts");
    let answered = false;
    opts.forEach((c) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "quiz-opt";
      el.innerHTML = `<span class="quiz-emoji">${c.emoji}</span><span class="quiz-label">${c.words ? c.words[0] : ""}</span>`;
      el.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = c === target;
        if (ok) {
          correct++;
          el.classList.add("right");
          $("quizResult").innerHTML = "✅ Right! " + (target.words ? "「" + target.words[0] + "」" : "");
          setMascotState("happy", 800);
        } else {
          el.classList.add("wrong");
          // 高亮正确项
          [...optsBox.children].forEach((b, i) => { if (opts[i] === target) b.classList.add("reveal"); });
          $("quizResult").innerHTML = "❌ It was " + (target.words ? "「" + target.words[0] + "」" : target.emoji) + "——回炉重听这张卡吧";
        }
        setTimeout(() => { qIdx++; renderQuiz(); }, ok ? 1000 : 1600);
      };
      optsBox.appendChild(el);
    });
  }

  function finishQuiz() {
    const passed = correct >= total;
    if (passed) {
      vlogState.quizPassed[v.id] = true;
      vlogSave();
      // 收集本集全部词汇进词汇册（共享收集系统）
      let collected = 0;
      v.cards.forEach((c) => {
        (c.words || []).forEach((w) => {
          const key = "vlog:" + v.id + ":" + w;
          if (!state.collected[key]) { state.collected[key] = { en: w, zh: "", vlog: v.titleZh }; collected++; }
        });
      });
      save(); renderHUD();
    }
    const s = $("vlogStage");
    s.innerHTML = `
      <div class="vlog-card quiz-card">
        <div class="finish-big">${passed ? "🎓" : "💪"}</div>
        <h3>${passed ? "本集毕业！" : "差一点点！"}</h3>
        <p>${passed ? "答对 " + correct + "/" + total + "，本集词汇已全部收进词汇册！" : "答对 " + correct + "/" + total + "，再刷一遍卡片，回来复仇！"}</p>
        <div class="finish-btns">
          ${passed ? "" : '<button class="btn btn-big btn-primary" id="quizRetry">🔄 再刷卡片</button>'}
          <button class="btn btn-big" id="quizBack">📺 返回频道</button>
        </div>
      </div>
    `;
    if ($("quizRetry")) $("quizRetry").onclick = () => openVlog(v.id);
    $("quizBack").onclick = openVlogChannel;
    if (passed) toast("🎓 " + v.titleZh + " 毕业！");
  }

  const nav = $("vlogNav");
  nav.innerHTML = "";
  renderQuiz();
}

// ---------- 初始化（vlog.js 在 game.js 之后加载，在此挂载入口） ----------
vlogLoad();
initHomeTabs();
