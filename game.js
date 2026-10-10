// 英语世界 - 剧情对话引擎
// 核心玩法：进入场景 = 开启一段连续剧情，用户选对回复推进对话，一步步完成整个场景任务
// 辅助玩法：自由探索点物品学词（可折叠）、词汇册、TTS 发音

const $ = (id) => document.getElementById(id);

// ---------- 多轮光顾访问层（兼容单轮 steps 与多轮 visits） ----------
// sceneVisits(sc)：返回该场景的轮次数组 [{id, title, steps, ...}]
// 单轮场景包装成一个虚拟轮次，保持旧逻辑完全兼容。
function sceneVisits(sc) {
  if (sc.visits && sc.visits.length) return sc.visits;
  return [{
    id: "v1",
    title: "场景剧情 · " + sc.name,
    titleEn: sc.nameEn,
    emoji: sc.emoji,
    desc: sc.intro,
    steps: sc.steps,
    reward: sc.reward,
  }];
}
// visitKey(sc, visit)：进度等持久化用的轮次键
function visitKey(sc, visit) {
  return sc.visits && sc.visits.length > 1 ? sc.id + ":" + visit.id : sc.id;
}
// unlockedVisitIndex(sc)：当前已解锁到第几轮（0-based）
function unlockedVisitIndex(sc) {
  const visits = sceneVisits(sc);
  const idx = state.unlockedVisits[sc.id] || 0;
  return Math.max(0, Math.min(idx, visits.length - 1));
}
// finishedVisits(sc)：已完成轮次数
function finishedVisits(sc) {
  const visits = sceneVisits(sc);
  let n = 0;
  for (const v of visits) {
    if ((state.progress[visitKey(sc, v)] || 0) >= v.steps.length) n++;
  }
  return n;
}

const state = {
  collected: {},        // wordId -> true
  phrases: {},          // sceneId(或 visitKey):stepIdx -> phrase（语块收集）
  npcLastLines: {},     // sceneId(或 visitKey):stepIdx -> 上次使用的店员台词
  progress: {},         // sceneId(或 visitKey) -> 已完成的步骤数
  unlockedVisits: {},   // sceneId -> 已解锁轮次数（多轮场景用）
  currentScene: null,
  currentVisit: null,   // 当前进行中的轮次
  adventure: null,      // 当前冒险会话 { scene, step, lock, order }
  advHistory: [],       // 当前场景的聊天记录（用于重渲染）
};

// ---------- 持久化（换新 key，避免旧数据干扰）----------
function save() {
  localStorage.setItem("englishWorldV2", JSON.stringify({
    collected: state.collected,
    phrases: state.phrases,
    npcLastLines: state.npcLastLines,
    progress: state.progress,
    unlockedVisits: state.unlockedVisits,
  }));
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorldV2"));
    if (d) {
      state.collected = d.collected || {};
      state.phrases = d.phrases || {};
      state.npcLastLines = d.npcLastLines || {};
      state.progress = d.progress || {};
      state.unlockedVisits = d.unlockedVisits || {};
    }
  } catch (e) { /* fresh start */ }
}

// ---------- TTS 发音 ----------
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  speechSynthesis.speak(u);
}

// ---------- Toast ----------
let toastTimer = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 1800);
}

// ---------- HUD ----------
function renderHUD() {
  $("wordCount").textContent = Object.keys(state.collected).length;
  const p = $("phraseCount");
  if (p) p.textContent = Object.keys(state.phrases).length;
}

// ---------- 图标渲染：优先 Fluent Emoji 3D PNG，emoji 作降级 ----------
function iconHtml(it, cls) {
  const src = "assets/icons/" + it.id + ".png";
  return `<img class="${cls}" src="${src}" alt="${it.en}"
    onerror="this.outerHTML='<span class=\\'${cls} emoji-fallback\\'>${it.emoji}</span>'">`;
}

// ---------- 地图 ----------
function renderMap() {
  const grid = $("sceneGrid");
  grid.innerHTML = "";
  SCENES.forEach((sc, i) => {
    const visits = sceneVisits(sc);
    const multi = visits.length > 1;
    const finished = finishedVisits(sc);
    const allDone = finished >= visits.length;
    const unlockedIdx = unlockedVisitIndex(sc);
    const curVisit = visits[unlockedIdx];
    const curDone = state.progress[visitKey(sc, curVisit)] || 0;
    const curFinished = curDone >= curVisit.steps.length;
    const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "scene-card";
    card.style.animationDelay = (i * 0.08) + "s";
    const statusLine = multi
      ? (allDone
          ? `🏆 ${visits.length} 次光顾全部完成 · 可重玩`
          : curFinished
            ? `✨ 已完成 ${finished}/${visits.length} 轮 · 下一轮已解锁`
            : curDone > 0
              ? `📖 ${visits[unlockedIdx].emoji} ${visits[unlockedIdx].title} ${curDone}/${curVisit.steps.length} 步`
              : `🎬 ${visits[unlockedIdx].emoji} ${visits[unlockedIdx].title}`)
      : (allDone
          ? "🏆 剧情已完成 · 可重玩"
          : curDone > 0
            ? `📖 剧情进行中 ${curDone}/${curVisit.steps.length} 步`
            : `🎮 剧情 ${curVisit.steps.length} 步 · 已学 ${learned}/${sc.items.length} 词`);
    card.innerHTML = `
      <div class="scene-cover">${iconHtml({ id: sc.iconId || sc.id, emoji: sc.emoji }, "cover-img")}</div>
      <div class="scene-info">
        <div class="scene-name">${sc.name} · ${sc.nameEn}</div>
        <div class="scene-words">${statusLine}</div>
      </div>
      ${allDone ? '<div class="done-badge">✓ 完成</div>' : ""}
    `;
    card.onclick = () => enterScene(sc.id);
    grid.appendChild(card);
  });
}

// ---------- 场景 ----------
function enterScene(id, visitIndex) {
  const sc = SCENES.find((s) => s.id === id);
  state.currentScene = sc;
  const visits = sceneVisits(sc);
  const maxIdx = unlockedVisitIndex(sc);
  const idx = typeof visitIndex === "number" ? Math.min(visitIndex, maxIdx) : maxIdx;
  state.currentVisit = visits[idx];
  state.adventure = null;
  state.advHistory = [];
  $("sceneTitle").textContent = `${sc.emoji} ${sc.name} · ${sc.nameEn}`;
  const stage = $("stage");
  stage.innerHTML = "";
  const theme = sc.theme || sc.id || "default";
  stage.className = "stage stage-wide theme-" + theme;
  if (stage.style.setProperty) {
    stage.style.setProperty("--scene-accent", sc.accent || "var(--brand-green)");
    stage.style.setProperty("--scene-accent-soft", sc.accentSoft || "var(--brand-green-soft)");
  }
  stage.dataset.deco = sc.deco || "";
  stage.dataset.deco2 = sc.deco2 || "";
  setMascotState("idle");

  // ---- 左列：剧情对话 ----
  const advBox = document.createElement("div");
  advBox.className = "adventure-box";

  // 轮次切换条（多轮场景显示）
  let visitTabsHtml = "";
  if (visits.length > 1) {
    visitTabsHtml = `
      <div class="visit-tabs" id="visitTabs">
        ${visits.map((v, i) => {
          const locked = i > maxIdx;
          const done = (state.progress[visitKey(sc, v)] || 0) >= v.steps.length;
          return `<button type="button" class="visit-tab${i === idx ? " active" : ""}${locked ? " locked" : ""}${done ? " done" : ""}"
            data-idx="${i}" ${locked ? "disabled" : ""} title="${locked ? "通关上一轮后解锁" : v.title}">
            ${done ? "✓ " : ""}${v.emoji} ${v.title.replace(/^第 \d+ 次光顾 · /, "")}${locked ? " 🔒" : ""}
          </button>`;
        }).join("")}
      </div>`;
  }

  const vk = visitKey(sc, state.currentVisit);
  const done = state.progress[vk] || 0;
  const finished = done >= state.currentVisit.steps.length;
  advBox.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">${visits.length > 1 ? "🎬 " + state.currentVisit.title : "🎬 场景剧情 · " + sc.name}</div>
      <div class="adv-progress" id="advProgress"></div>
    </div>
    ${visitTabsHtml}
    <div class="adv-intro">${state.currentVisit.desc || sc.intro}</div>
    <div class="chat" id="chatBox"></div>
    <div class="order-tray" id="orderTray"></div>
    <div class="adv-actions" id="advActions"></div>
  `;
  stage.appendChild(advBox);

  // ---- 右列：自由探索（次要，可折叠） ----
  const exploreBox = document.createElement("div");
  exploreBox.className = "explore-box";
  exploreBox.innerHTML = `
    <button type="button" class="explore-toggle" id="exploreToggle">
      🔍 自由探索学词 <span class="explore-count" id="exploreCount"></span> <span class="explore-arrow" id="exploreArrow">▾</span>
    </button>
    <div class="explore-grid hidden" id="exploreGrid"></div>
  `;
  stage.appendChild(exploreBox);

  // 自由探索网格
  const grid = $("exploreGrid");
  sc.items.forEach((it, i) => {
    const wordKey = sc.id + ":" + it.id;
    const spot = document.createElement("button");
    spot.type = "button";
    spot.className = "spot" + (state.collected[wordKey] ? " collected" : "");
    spot.style.animationDelay = (i * 0.05) + "s";
    spot.innerHTML = `
      <div class="ico">${iconHtml(it, "spot-img")}</div>
      <div class="en">${it.en}</div>
      <div class="zh">${it.zh}</div>
    `;
    spot.onclick = () => {
      const isNew = !state.collected[wordKey];
      state.collected[wordKey] = true;
      save(); renderHUD(); updateExploreCount(sc);
      if (isNew) {
        setMascotState("happy", 900);
        spot.classList.add("collected");
        const spark = document.createElement("div");
        spark.className = "spark";
        spark.textContent = "✨";
        spot.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
      }
      showWordCard(it, isNew);
    };
    grid.appendChild(spot);
  });
  $("exploreToggle").onclick = () => {
    grid.classList.toggle("hidden");
    $("exploreArrow").textContent = grid.classList.contains("hidden") ? "▾" : "▴";
  };
  updateExploreCount(sc);

  // ---- 启动/继续剧情 ----
  const startBtn = document.createElement("button");
  startBtn.type = "button";
  startBtn.className = "btn btn-big btn-primary adv-start";
  startBtn.innerHTML = finished
    ? "🔄 重新开始本轮"
    : done > 0 ? "▶ 继续剧情" : "▶ 开始剧情";
  startBtn.onclick = startAdventure;
  $("advActions").appendChild(startBtn);

  if (done > 0 && !finished) {
    const resumeNote = document.createElement("div");
    resumeNote.className = "resume-note";
    resumeNote.textContent = `上次进行到第 ${done} 步，可以接着来！`;
    $("advActions").appendChild(resumeNote);
  }

  // 轮次切换事件（多轮场景）
  const tabs = $("visitTabs");
  if (tabs) {
    tabs.querySelectorAll(".visit-tab").forEach((tab) => {
      tab.onclick = () => {
        const i = Number(tab.dataset.idx);
        if (i !== idx) enterScene(sc.id, i);
      };
    });
  }

  $("mapView").classList.add("hidden");
  $("sceneView").classList.remove("hidden");
  renderAdvProgress(sc);
  speak("Welcome to the " + sc.nameEn + "!");
}

function updateExploreCount(sc) {
  const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
  const el = $("exploreCount");
  if (el) el.textContent = `(${learned}/${sc.items.length})`;
}

// ---------- 剧情对话引擎 ----------
function startAdventure(options = {}) {
  const sc = state.currentScene;
  const visit = state.currentVisit || sceneVisits(sc)[0];
  if (!sc || !visit) return;
  state.currentVisit = visit;
  const vk = visitKey(sc, visit);
  setMascotState("thinking");
  const forceRestart = options.restart === true;
  const savedStep = forceRestart
    ? 0
    : Math.max(0, Math.min(state.progress[vk] || 0, visit.steps.length));
  const isResume = savedStep > 0 && savedStep < visit.steps.length;
  state.adventure = { scene: sc, visit, step: savedStep, lock: false, order: [] };
  if (isResume) {
    // 续玩时恢复已完成步骤对应的订单素材，避免托盘从空白开始。
    state.adventure.order = visit.steps
      .slice(0, savedStep)
      .flatMap((step) => step.adds || []);
  }
  state.advHistory = [];
  $("advActions").innerHTML = "";
  renderChat();
  renderOrder(sc, state.adventure.order);
  nextStep();
}

function renderChat() {
  const box = $("chatBox");
  if (!box) return;
  box.innerHTML = state.advHistory.map((m) => chatMsgHtml(m)).join("");
  box.scrollTop = box.scrollHeight;
}

function chatMsgHtml(m) {
  if (m.role === "npc-typing") {
    return `
      <div class="msg npc">
        <div class="avatar">${m.scene.emoji}</div>
        <div class="bubble npc-bubble"><div class="typing"><span></span><span></span><span></span></div></div>
      </div>`;
  }
  if (m.role === "npc") {
    return `
      <div class="msg npc">
        <div class="avatar">${m.scene.emoji}</div>
        <div class="bubble npc-bubble">
          <div class="msg-en">${m.text} <span class="speak-icon" title="再听一次" onclick="speak('${m.text.replace(/'/g, "\\'")}')">🔊</span></div>
          <div class="msg-zh">${m.zh}</div>
        </div>
      </div>`;
  }
  if (m.role === "phrase") {
    return `
      <div class="phrase-card">
        <div class="phrase-tag">💬 语块收集</div>
        <div class="phrase-en">${m.phrase.en} <span class="speak-icon" title="听这个表达" onclick="speak('${m.phrase.en.replace(/'/g, "\\'")}')">🔊</span></div>
        <div class="phrase-zh">${m.phrase.zh}</div>
        <div class="phrase-note">💡 ${m.phrase.note}</div>
      </div>`;
  }
  return `
    <div class="msg me ${m.wrong ? "wrong" : ""}">
      <div class="bubble me-bubble">${m.text}</div>
      <div class="avatar me-avatar">🙂</div>
    </div>
    ${m.tip ? `<div class="tip-row">${m.wrong ? "💡" : "✅"} ${m.tip}</div>` : ""}`;
}

function nextStep() {
  const adv = state.adventure;
  if (!adv) return;
  const sc = adv.scene;
  const visit = adv.visit;
  if (adv.step >= visit.steps.length) return finishAdventure();
  const step = visit.steps[adv.step];
  adv.lock = false;

  // 每一步都重新创建选项区，清除上一关遗留的 reveal / retry 状态。
  const actions = $("advActions");
  actions.innerHTML = `
    <div class="task-hint">🎯 ${step.task}</div>
    <div class="adv-opts" id="advOpts"></div>
  `;

  // 更新进度点
  renderAdvProgress(sc);
  setMascotState("thinking");

  // 店员先显示打字中…，再出正式台词（随机变体）
  state.advHistory.push({ role: "npc-typing", scene: sc });
  renderChat();
  const lineKey = visitKey(sc, visit) + ":" + adv.step;
  const lines = step.npcLines && step.npcLines.length ? step.npcLines : [step.npc];
  const previousLine = state.npcLastLines[lineKey];
  const candidates = lines.length > 1
    ? lines.filter((line) => line !== previousLine)
    : lines;
  const npcText = candidates[Math.floor(Math.random() * candidates.length)];
  state.npcLastLines[lineKey] = npcText;
  save();
  setTimeout(() => {
    if (state.adventure !== adv) return; // 已被重置
    state.advHistory[state.advHistory.length - 1] = { role: "npc", text: npcText, zh: step.npcZh, scene: sc };
    renderChat();
    speak(npcText);
  }, 700);

  // 任务提示 + 选项
  const optsBox = $("advOpts");
  // 选项顺序打乱，避免正确答案总在第一个
  // 轻量随机化：每次进入/重玩都会重新打乱选项顺序。
  const shuffled = step.options.slice().sort(() => Math.random() - 0.5);
  shuffled.forEach((opt) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "adv-opt";
    el.innerHTML = `<span class="opt-text">${opt.text}</span><span class="opt-play" title="听这句">🔊</span>`;
    el.querySelector(".opt-play").onclick = (e) => { e.stopPropagation(); speak(opt.text); };
    el.onclick = () => chooseOption(opt, el, optsBox, step);
    optsBox.appendChild(el);
  });
}

function chooseOption(opt, el, optsBox, step) {
  const adv = state.adventure;
  if (!adv || adv.lock) return;
  adv.lock = true;

  state.advHistory.push({ role: "me", text: opt.text, tip: opt.tip, wrong: !opt.ok });
  renderChat();
  el.classList.add(opt.ok ? "right" : "wrong");
  optsBox.querySelectorAll(".adv-opt").forEach((b) => (b.disabled = true));

  if (opt.ok) {
    setMascotState("happy", 700);
    speak(opt.text);
    adv.step++;
    const vk = visitKey(adv.scene, adv.visit);
    state.progress[vk] = adv.step;
    save(); renderAdvProgress(adv.scene);

    // 语块入册 + 聊天流
    if (step.phrase) {
      const pKey = vk + ":" + (adv.step - 1);
      state.phrases[pKey] = step.phrase;
      state.advHistory.push({ role: "phrase", phrase: step.phrase });
      renderChat();
      renderHUD();
    }
    // 订单素材入托盘
    if (step.adds && step.adds.length) {
      adv.order = adv.order.concat(step.adds);
      // 订单中出现的实体也算学会：完成真实点单，不应只收集 barista 奖励词
      step.adds.forEach((item) => {
        if (!item.wordId) return;
        const word = adv.scene.items.find((it) => it.id === item.wordId);
        if (word) state.collected[adv.scene.id + ":" + word.id] = true;
      });
      save(); renderHUD(); updateExploreCount(adv.scene);
      renderOrder(adv.scene, adv.order);
    }
    setTimeout(nextStep, 1100);
  } else {
    setMascotState("sad", 700);
    // 高亮正确答案，让用户再选一次
    setTimeout(() => {
      const right = [...optsBox.children].find((b) =>
        step.options.find((o) => o.ok && b.textContent.includes(o.text))
      );
      if (right) right.classList.add("reveal");
      const retry = document.createElement("div");
      retry.className = "retry-hint";
      retry.textContent = "🤔 再试一次吧！绿色的是正确说法";
      optsBox.appendChild(retry);
      adv.lock = false; // 解锁允许重选
      optsBox.querySelectorAll(".adv-opt").forEach((b) => (b.disabled = false));
      el.disabled = true; // 错的选项保持禁用
    }, 800);
  }
}

// ---------- 订单托盘 ----------
function renderOrder(sc, order) {
  const tray = $("orderTray");
  if (!tray) return;
  const items = order && order.length
    ? order.map((o) => `<span class="order-chip${o.badge ? " badge" : ""}" title="${o.label}">${o.emoji} ${o.label}</span>`).join("")
    : `<span class="order-empty">${sc.orderLabel || "🧾 订单"} · 空空如也，点单后慢慢变满 🌱</span>`;
  tray.innerHTML = `<div class="order-label">${sc.orderLabel || "🧾 订单"}</div><div class="order-chips">${items}</div>`;
}

function renderAdvProgress(sc) {
  const el = $("advProgress");
  if (!el) return;
  const visit = state.adventure
    ? state.adventure.visit
    : (state.currentVisit || sceneVisits(sc)[0]);
  const vk = visitKey(sc, visit);
  const done = state.adventure ? state.adventure.step : (state.progress[vk] || 0);
  el.innerHTML = visit.steps.map((_, i) =>
    `<span class="dot ${i < done ? "on" : ""}"></span>`
  ).join("");
}

function finishAdventure() {
  const sc = state.currentScene;
  const visit = state.currentVisit || (state.adventure && state.adventure.visit) || sceneVisits(sc)[0];
  const visits = sceneVisits(sc);
  setMascotState("happy", 2000);
  speak("Congratulations! You did it!");
  // 本轮奖励词汇
  if (visit.reward && visit.reward.en) {
    const it = sc.items.find((i) => i.en === visit.reward.en);
    if (it) {
      state.collected[sc.id + ":" + it.id] = true;
      save(); renderHUD(); updateExploreCount(sc);
    }
  }
  const vk = visitKey(sc, visit);
  const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
  const phraseCount = visit.steps.filter((st, i) => state.phrases[vk + ":" + i]).length;
  const orderHtml = state.adventure && state.adventure.order && state.adventure.order.length
    ? `<div class="finish-order">${state.adventure.order.map((o) => `<span class="order-chip big${o.badge ? " badge" : ""}">${o.emoji} ${o.label}</span>`).join("")}</div>`
    : "";
  state.advHistory.push({ role: "npc", text: "Congratulations! You completed the " + sc.nameEn + " challenge!", zh: visit.reward.zh, scene: sc });
  renderChat();
  renderAdvProgress(sc);

  // 多轮场景：通关本轮 → 解锁下一轮
  const curIdx = visits.findIndex((v) => v.id === visit.id);
  const hasNext = curIdx >= 0 && curIdx < visits.length - 1;
  if (hasNext && (state.unlockedVisits[sc.id] || 0) <= curIdx) {
    state.unlockedVisits[sc.id] = curIdx + 1;
    save();
  }
  const allDone = finishedVisits(sc) >= visits.length;

  $("advActions").innerHTML = `
    <div class="adv-finish">
      <div class="finish-big">🎉</div>
      <h3>${visits.length > 1 ? visit.title + " 完成！" : "场景完成！"}</h3>
      ${orderHtml}
      <p>${visit.reward.zh} 收集语块 ${phraseCount}/${visit.steps.length}，词汇 ${learned}/${sc.items.length}。</p>
      ${hasNext && !allDone ? `<div class="next-visit-note">✨ 已解锁下一轮：${visits[curIdx + 1].emoji} ${visits[curIdx + 1].title}</div>` : ""}
      <div class="finish-btns">
        ${hasNext && !allDone ? `<button class="btn btn-big btn-primary" id="advNextVisit">➡️ 开始下一轮</button>` : ""}
        <button class="btn btn-big ${hasNext ? "" : "btn-primary"}" id="advAgain">🔄 再玩本轮</button>
        <button class="btn btn-big" id="advDone">🗺️ 返回地图</button>
      </div>
    </div>
  `;
  const nextBtn = $("advNextVisit");
  if (nextBtn) nextBtn.onclick = () => enterScene(sc.id, curIdx + 1);
  $("advAgain").onclick = () => startAdventure({ restart: true });
  $("advDone").onclick = backToMap;
  toast("🎉 " + (visits.length > 1 ? visit.title : "剧情") + "完成！");
}

function backToMap() {
  setMascotState("idle");
  state.currentScene = null;
  state.currentVisit = null;
  state.adventure = null;
  state.advHistory = [];
  $("sceneView").classList.add("hidden");
  $("mapView").classList.remove("hidden");
  renderMap();
}

// ---------- 词卡 ----------
function showWordCard(it, isNew) {
  const card = $("wordCard");
  card.innerHTML = `
    <div class="word-emoji">${iconHtml(it, "word-img")}</div>
    <div class="word-en">${it.en}</div>
    <div class="word-phon">${it.phon}</div>
    <div class="word-zh">${it.zh}</div>
    <div class="word-sent">"${it.sent}"</div>
    ${isNew ? '<div style="color:var(--green);font-size:13px;margin-top:10px;font-weight:600">✨ 新词已收集！</div>' : ""}
    <div class="word-actions">
      <button class="btn btn-big btn-primary" id="wcSpeak">🔊 再听一次</button>
      <button class="btn btn-big" id="wcClose">关闭</button>
    </div>
  `;
  $("wordOverlay").classList.remove("hidden");
  speak(it.en);
  $("wcSpeak").onclick = () => speak(it.en);
  $("wcClose").onclick = () => $("wordOverlay").classList.add("hidden");
}

// ---------- 词汇册 ----------
function openBook() {
  const grid = $("bookGrid");
  grid.innerHTML = "";

  // 常用表达区（语块）
  const phraseKeys = Object.keys(state.phrases);
  if (phraseKeys.length > 0) {
    const phHead = document.createElement("div");
    phHead.className = "book-section-head";
    phHead.innerHTML = `💬 常用表达 · ${phraseKeys.length} 条`;
    grid.appendChild(phHead);
    phraseKeys.forEach((k) => {
      // 多轮场景键形如 cafe:v1:0（visitKey:step），单轮形如 market:0
      const parts = k.split(":");
      let sid, ph;
      const sc = SCENES.find((s) => s.id === parts[0]);
      if (!sc) return;
      if (sc.visits && sc.visits.length) {
        // 多轮：cafe:v1:0 -> 找 visit 再找 step
        const v = sc.visits.find((vv) => vv.id === parts[1]);
        ph = state.phrases[k];
        sid = sc;
        var srcLabel = v ? v.title : "";
      } else {
        ph = state.phrases[k];
        sid = sc;
        var srcLabel = sc.name;
      }
      if (!ph) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "phrase-item";
      el.innerHTML = `
        <div class="p-en">${ph.en} 🔊</div>
        <div class="p-zh">${ph.zh}</div>
        <div class="p-note">${ph.note}</div>
        <div class="p-from">${sc.emoji} ${srcLabel}</div>`;
      el.onclick = () => speak(ph.en.replace(/___/g, "..."));
      grid.appendChild(el);
    });
  }

  // 词汇区
  const keys = Object.keys(state.collected);
  const wh = document.createElement("div");
  wh.className = "book-section-head";
  wh.textContent = `📖 词汇 · ${keys.length} 个`;
  grid.appendChild(wh);
  if (keys.length === 0) {
    grid.innerHTML += '<div class="book-empty">还没有收集到词汇，去场景里玩玩看！</div>';
  } else {
    keys.forEach((k) => {
      const [sid, iid] = k.split(":");
      const sc = SCENES.find((s) => s.id === sid);
      const it = sc && sc.items.find((i) => i.id === iid);
      if (!it) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "book-item";
      el.innerHTML = `<div class="e">${iconHtml(it, "book-img")}</div><div class="en">${it.en}</div><div class="zh">${it.zh}</div>`;
      el.onclick = () => speak(it.en);
      grid.appendChild(el);
    });
  }
  $("bookOverlay").classList.remove("hidden");
}

// ---------- 吉祥物 ----------
const MASCOT_LINES = [
  "Tap anything you like!",
  "You can do it!",
  "New words = new powers!",
  "Hello, my friend!",
  "Take it step by step!",
];
let mascotTimer = null;
let mascotStateTimer = null;
let mascotState = "idle";

function setMascotState(nextState, duration = 0) {
  const m = $("mascot");
  if (!m) return;
  const allowed = ["idle", "happy", "thinking", "sad"];
  const next = allowed.includes(nextState) ? nextState : "idle";
  clearTimeout(mascotStateTimer);
  mascotState = next;
  m.classList.remove("state-idle", "state-happy", "state-thinking", "state-sad");
  m.classList.add("state-" + next);
  m.dataset.state = next;
  if (duration > 0 && next !== "idle") {
    mascotStateTimer = setTimeout(() => setMascotState("idle"), duration);
  }
}

function initMascot() {
  const m = document.createElement("div");
  m.className = "mascot state-idle";
  m.id = "mascot";
  if (m.setAttribute) {
    m.setAttribute("role", "status");
    m.setAttribute("aria-label", "英语学习助手，当前状态：休息");
  }
  m.innerHTML = `
    <div class="body">
      <div class="eye l"></div><div class="eye r"></div>
      <div class="cheek l"></div><div class="cheek r"></div>
      <div class="mouth"></div>
      <div class="leaf">🌱</div>
    </div>
  `;
  document.body.appendChild(m);
  m.onclick = () => {
    setMascotState("happy", 650);
    const line = MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)];
    speak(line);
    const old = m.querySelector(".bubble");
    if (old) old.remove();
    const b = document.createElement("div");
    b.className = "bubble";
    b.textContent = line;
    m.appendChild(b);
    clearTimeout(mascotTimer);
    mascotTimer = setTimeout(() => b.remove(), 2600);
  };
}

// ---------- 绑定 ----------
load();
renderHUD();
renderMap();
initMascot();

$("btnMap").onclick = backToMap;
$("btnBack").onclick = backToMap;
$("btnBook").onclick = openBook;
$("btnCloseBook").onclick = () => $("bookOverlay").classList.add("hidden");

[$("wordOverlay"), $("bookOverlay")].forEach((ov) => {
  ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.add("hidden"); });
});
