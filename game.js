// 英语世界 - 游戏主逻辑
// 纯场景探索：点物品学词 + TTS 发音 + 词汇收集 + 场景小游戏赚金币解锁新场景

const $ = (id) => document.getElementById(id);
const state = {
  coins: 0,
  collected: {},      // wordId -> true
  unlocked: { cafe: true },
  currentScene: null,
};

// ---------- 持久化 ----------
function save() {
  localStorage.setItem("englishWorld", JSON.stringify({
    coins: state.coins, collected: state.collected, unlocked: state.unlocked,
  }));
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorld"));
    if (d) {
      state.coins = d.coins || 0;
      state.collected = d.collected || {};
      state.unlocked = d.unlocked || { cafe: true };
      if (!state.unlocked.cafe) state.unlocked.cafe = true;
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
function renderHUD(bumpCoins) {
  $("coinCount").textContent = state.coins;
  $("wordCount").textContent = Object.keys(state.collected).length;
  if (bumpCoins) {
    const c = document.querySelector(".coins");
    if (c) { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
  }
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
    const unlocked = !!state.unlocked[sc.id];
    const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "scene-card" + (unlocked ? "" : " locked");
    card.style.animationDelay = (i * 0.08) + "s";
    card.innerHTML = `
      <div class="scene-cover">${unlocked ? iconHtml({ id: sc.iconId || sc.id, emoji: sc.emoji }, "cover-img") : "🔒"}</div>
      <div class="scene-info">
        <div class="scene-name">${sc.name} · ${sc.nameEn}</div>
        <div class="scene-words">📖 已学 ${learned}/${sc.items.length} 词 · 🎮 ${sc.game.name}</div>
      </div>
      ${unlocked ? "" : `<div class="lock-badge">🪙 ${sc.unlockCost} 金币解锁</div>`}
    `;
    card.onclick = () => {
      if (unlocked) enterScene(sc.id);
      else tryUnlock(sc);
    };
    grid.appendChild(card);
  });
}

function tryUnlock(sc) {
  if (state.coins >= sc.unlockCost) {
    state.coins -= sc.unlockCost;
    state.unlocked[sc.id] = true;
    save(); renderHUD(); renderMap();
    setMascotState("happy", 900);
    toast(`🎉 解锁「${sc.name}」！`);
    enterScene(sc.id);
    speak("Welcome to the " + sc.nameEn + "!");
  } else {
    toast(`还差 ${sc.unlockCost - state.coins} 金币，去玩小游戏赚金币吧！`);
  }
}

// ---------- 场景 ----------
function enterScene(id) {
  const sc = SCENES.find((s) => s.id === id);
  state.currentScene = sc;
  $("sceneTitle").textContent = `${sc.emoji} ${sc.name} · ${sc.nameEn}`;
  const stage = $("stage");
  stage.innerHTML = "";
  const theme = sc.theme || sc.id || "default";
  stage.className = "stage theme-" + theme;
  if (stage.style.setProperty) {
    stage.style.setProperty("--scene-accent", sc.accent || "var(--brand-green)");
    stage.style.setProperty("--scene-accent-soft", sc.accentSoft || "var(--brand-green-soft)");
  }
  stage.dataset.deco = sc.deco || "";
  stage.dataset.deco2 = sc.deco2 || "";
  setMascotState("idle");
  sc.items.forEach((it, i) => {
    const wordKey = sc.id + ":" + it.id;
    const spot = document.createElement("button");
    spot.type = "button";
    spot.className = "spot" + (state.collected[wordKey] ? " collected" : "");
    spot.style.animationDelay = (i * 0.06) + "s";
    spot.innerHTML = `
      <div class="ico">${iconHtml(it, "spot-img")}</div>
      <div class="en">${it.en}</div>
      <div class="zh">${it.zh}</div>
    `;
    spot.onclick = () => {
      const isNew = !state.collected[wordKey];
      state.collected[wordKey] = true;
      save(); renderHUD();
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
    stage.appendChild(spot);
  });
  $("mapView").classList.add("hidden");
  $("sceneView").classList.remove("hidden");
  speak("Welcome to the " + sc.nameEn + "!");
}

function backToMap() {
  setMascotState("idle");
  state.currentScene = null;
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
    grid.innerHTML = '<div class="book-empty">还没有收集到词汇，去场景里点点看！</div>';
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

// ---------- 小游戏：点单 / 购物清单 ----------
let game = null;

function startGame() {
  const sc = state.currentScene;
  if (!sc) return;
  setMascotState("thinking");
  game = { scene: sc, round: 0, total: 5, score: 0, lock: false };
  nextRound();
}

function pickDistractors(sc, answer) {
  const pool = sc.items.filter((i) => i.id !== answer.id);
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(5, pool.length));
}

function nextRound() {
  if (game.round >= game.total) return endGame();
  game.round++;
  game.lock = false;
  const sc = game.scene;
  const answer = sc.items[Math.floor(Math.random() * sc.items.length)];
  const opts = [answer, ...pickDistractors(sc, answer)].sort(() => Math.random() - 0.5);

  const isOrder = sc.game.type === "order";
  const lines = isOrder ? ORDER_LINES : SHOPPING_LINES;
  const line = lines[Math.floor(Math.random() * lines.length)].replace("{item}", answer.en);

  setMascotState("thinking");
  $("gamePanel").innerHTML = `
    <div class="game-head">
      <div class="game-title">${isOrder ? "☕ 顾客点单" : "🛒 购物清单"}</div>
      <div class="game-sub">${isOrder ? "顾客点了什么？点选正确的物品！" : "清单上写了什么？把它放进购物车！"}</div>
    </div>
    <div class="game-order">
      <span class="speak" id="gSpeak" title="再听一次">🔊</span>
      "${line}"
    </div>
    <div class="game-opts" id="gOpts"></div>
    <div class="game-progress">第 ${game.round} / ${game.total} 单 · 得分 ${game.score}</div>
    <div style="text-align:center;margin-top:14px">
      <button class="btn btn-ghost" id="gQuit">不玩了</button>
    </div>
  `;
  $("gameOverlay").classList.remove("hidden");
  speak(line);

  $("gSpeak").onclick = () => speak(line);
  $("gQuit").onclick = () => { $("gameOverlay").classList.add("hidden"); };

  const optsBox = $("gOpts");
  opts.forEach((it) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "game-opt";
    el.innerHTML = `<div class="e">${iconHtml(it, "opt-img")}</div><div class="en">${it.en}</div>`;
    el.onclick = () => {
      if (game.lock) return;
      game.lock = true;
      if (it.id === answer.id) {
        setMascotState("happy", 650);
        el.classList.add("right");
        game.score++;
        speak(it.en + "! Great!");
        setTimeout(nextRound, 900);
      } else {
        setMascotState("sad", 650);
        el.classList.add("wrong");
        const right = [...optsBox.children].find((c) => c.querySelector(".en").textContent === answer.en);
        if (right) right.classList.add("right");
        speak("Oops! It is " + answer.en);
        setTimeout(nextRound, 1400);
      }
    };
    optsBox.appendChild(el);
  });
}

function endGame() {
  const earned = game.score * 2;
  state.coins += earned;
  save(); renderHUD(true);
  const stars = game.score >= 5 ? "🏆" : game.score >= 3 ? "🥈" : "💪";
  $("gamePanel").innerHTML = `
    <div class="game-result">
      <div class="big">${stars}</div>
      <h3>完成 ${game.score} / ${game.total} 单！</h3>
      <p>获得 🪙 ${earned} 金币</p>
      <button class="btn btn-big btn-primary" id="gAgain">🎮 再来一局</button>
      <button class="btn btn-big" id="gDone">回去逛逛</button>
    </div>
  `;
  $("gAgain").onclick = startGame;
  $("gDone").onclick = () => { setMascotState("idle"); $("gameOverlay").classList.add("hidden"); };
}

// ---------- 吉祥物 ----------
const MASCOT_LINES = [
  "Tap anything you like!",
  "You can do it!",
  "New words = new powers!",
  "Play the game, get coins!",
  "Hello, my friend!",
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
    speak(MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)]);
    const old = m.querySelector(".bubble");
    if (old) old.remove();
    const b = document.createElement("div");
    b.className = "bubble";
    b.textContent = MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)];
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
$("btnGame").onclick = startGame;

[$("wordOverlay"), $("bookOverlay")].forEach((ov) => {
  ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.add("hidden"); });
});
