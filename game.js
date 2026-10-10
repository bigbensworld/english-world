// 英语世界 - 剧情对话引擎
// 核心玩法：进入场景 = 开启一段连续剧情，用户选对回复推进对话，一步步完成整个场景任务
// 辅助玩法：自由探索点物品学词（可折叠）、词汇册、TTS 发音

const $ = (id) => document.getElementById(id);
const state = {
  collected: {},        // wordId -> true
  progress: {},         // sceneId -> 已完成的步骤数
  currentScene: null,
  adventure: null,      // 当前冒险会话 { scene, step, lock }
  advHistory: [],       // 当前场景的聊天记录（用于重渲染）
};

// ---------- 持久化（换新 key，避免旧金币数据干扰）----------
function save() {
  localStorage.setItem("englishWorldV2", JSON.stringify({
    collected: state.collected, progress: state.progress,
  }));
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorldV2"));
    if (d) {
      state.collected = d.collected || {};
      state.progress = d.progress || {};
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
    const done = state.progress[sc.id] || 0;
    const finished = done >= sc.steps.length;
    const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "scene-card";
    card.style.animationDelay = (i * 0.08) + "s";
    card.innerHTML = `
      <div class="scene-cover">${iconHtml({ id: sc.iconId || sc.id, emoji: sc.emoji }, "cover-img")}</div>
      <div class="scene-info">
        <div class="scene-name">${sc.name} · ${sc.nameEn}</div>
        <div class="scene-words">${finished
          ? "🏆 剧情已完成 · 可重玩"
          : done > 0
            ? `📖 剧情进行中 ${done}/${sc.steps.length} 步`
            : `🎮 剧情 ${sc.steps.length} 步 · 已学 ${learned}/${sc.items.length} 词`}</div>
      </div>
      ${finished ? '<div class="done-badge">✓ 完成</div>' : ""}
    `;
    card.onclick = () => enterScene(sc.id);
    grid.appendChild(card);
  });
}

// ---------- 场景 ----------
function enterScene(id) {
  const sc = SCENES.find((s) => s.id === id);
  state.currentScene = sc;
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
  const done = state.progress[sc.id] || 0;
  const finished = done >= sc.steps.length;
  advBox.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">🎬 场景剧情 · ${sc.name}</div>
      <div class="adv-progress" id="advProgress"></div>
    </div>
    <div class="adv-intro">${sc.intro}</div>
    <div class="chat" id="chatBox"></div>
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
    ? "🔄 重新开始剧情"
    : done > 0 ? "▶ 继续剧情" : "▶ 开始剧情";
  startBtn.onclick = startAdventure;
  $("advActions").appendChild(startBtn);

  if (done > 0 && !finished) {
    const resumeNote = document.createElement("div");
    resumeNote.className = "resume-note";
    resumeNote.textContent = `上次进行到第 ${done} 步，可以接着来！`;
    $("advActions").appendChild(resumeNote);
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
function startAdventure() {
  const sc = state.currentScene;
  if (!sc) return;
  setMascotState("thinking");
  state.adventure = { scene: sc, step: 0, lock: false };
  state.advHistory = [];
  $("advActions").innerHTML = "";
  renderChat();
  nextStep();
}

function renderChat() {
  const box = $("chatBox");
  if (!box) return;
  box.innerHTML = state.advHistory.map((m) => chatMsgHtml(m)).join("");
  box.scrollTop = box.scrollHeight;
}

function chatMsgHtml(m) {
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
  if (adv.step >= sc.steps.length) return finishAdventure();
  const step = sc.steps[adv.step];
  adv.lock = false;

  // 更新进度点
  renderAdvProgress(sc);
  setMascotState("thinking");

  // 店员说话
  state.advHistory.push({ role: "npc", text: step.npc, zh: step.npcZh, scene: sc });
  renderChat();
  speak(step.npc);

  // 任务提示 + 选项
  const actions = $("advActions");
  actions.innerHTML = `
    <div class="task-hint">🎯 ${step.task}</div>
    <div class="adv-opts" id="advOpts"></div>
  `;
  const optsBox = $("advOpts");
  // 选项顺序打乱，避免正确答案总在第一个
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
    state.progress[adv.scene.id] = adv.step;
    save(); renderAdvProgress(adv.scene);
    setTimeout(nextStep, 900);
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

function renderAdvProgress(sc) {
  const el = $("advProgress");
  if (!el) return;
  const done = state.adventure ? state.adventure.step : (state.progress[sc.id] || 0);
  el.innerHTML = sc.steps.map((_, i) =>
    `<span class="dot ${i < done ? "on" : ""}"></span>`
  ).join("");
}

function finishAdventure() {
  const sc = state.currentScene;
  setMascotState("happy", 2000);
  speak("Congratulations! You did it!");
  // 收集奖励词汇
  if (sc.reward && sc.reward.en) {
    const it = sc.items.find((i) => i.en === sc.reward.en);
    if (it) {
      state.collected[sc.id + ":" + it.id] = true;
      save(); renderHUD(); updateExploreCount(sc);
    }
  }
  const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
  state.advHistory.push({ role: "npc", text: "Congratulations! You completed the " + sc.nameEn + " challenge!", zh: sc.reward.zh, scene: sc });
  renderChat();
  renderAdvProgress(sc);
  $("advActions").innerHTML = `
    <div class="adv-finish">
      <div class="finish-big">🎉</div>
      <h3>场景完成！</h3>
      <p>${sc.reward.zh} 本场景已收集 ${learned}/${sc.items.length} 个词汇。</p>
      <div class="finish-btns">
        <button class="btn btn-big btn-primary" id="advAgain">🔄 再玩一次</button>
        <button class="btn btn-big" id="advDone">🗺️ 返回地图</button>
      </div>
    </div>
  `;
  $("advAgain").onclick = startAdventure;
  $("advDone").onclick = backToMap;
  toast("🎉 剧情完成！");
}

function backToMap() {
  setMascotState("idle");
  state.currentScene = null;
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
  const keys = Object.keys(state.collected);
  if (keys.length === 0) {
    grid.innerHTML = '<div class="book-empty">还没有收集到词汇，去场景里玩玩看！</div>';
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
