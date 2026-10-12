// 英语世界 - 语法闯关 + 发音辨音引擎
// 三个语法题型：修句师(fix) / 句子工厂(factory) / 语法侦探(detective)
// 发音辨音：最小对立对听音选词
// 复用 game.js 的 speak()/setMascotState()/toast()/$()，存储并入 englishWorldV2（合并式，照 vlog.js 模式）

// ---------- 状态 ----------
const grammarState = {
  levelDone: {},   // levelId -> true（通关）
  levelBest: {},   // levelId -> 本次最好成绩 n/total（重刷用，不影响通关标记）
  soundDone: {},   // soundGroupId -> true（毕业）
};

function grammarSave() {
  const d = JSON.parse(localStorage.getItem("englishWorldV2") || "{}");
  d.grammarDone = grammarState.levelDone;
  d.grammarBest = grammarState.levelBest;
  d.soundDone = grammarState.soundDone;
  localStorage.setItem("englishWorldV2", JSON.stringify(d));
}
function grammarLoad() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorldV2"));
    if (d) {
      grammarState.levelDone = d.grammarDone || {};
      grammarState.levelBest = d.grammarBest || {};
      grammarState.soundDone = d.soundDone || {};
    }
  } catch (e) { /* fresh */ }
}

// ---------- 页面路由（复用 sceneView 舞台） ----------
function openGrammarWorld() {
  const stage = $("stage");
  $("sceneTitle").textContent = "🎓 语法闯关 · Grammar Quest";
  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-grammar";
  setMascotState("idle");
  state.currentScene = null;
  state.currentVisit = null;

  const box = document.createElement("div");
  box.className = "adventure-box grammar-map";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">🎓 语法闯关</div>
    </div>
    <div class="adv-intro">三大题型打通语法关：🔧 修句师选对句 → 🏭 句子工厂拼语序 → 🔍 语法侦探揪错词。每关 8 题，通关解锁下一关。</div>
    <div class="grammar-levels" id="grammarLevels"></div>
    <div class="sound-section" id="soundSection"></div>
    <button class="btn btn-big" id="grammarBack">⬅ 返回地图</button>
  `;
  stage.appendChild(box);
  renderGrammarLevels();
  renderSoundGroups();
  $("grammarBack").onclick = backToMap;

  $("mapView").classList.add("hidden");
  $("sceneView").classList.remove("hidden");
}

function renderGrammarLevels() {
  const box = $("grammarLevels");
  if (!box) return;
  box.innerHTML = "";
  GRAMMAR_LEVELS.forEach((lv, i) => {
    const done = !!grammarState.levelDone[lv.id];
    const prevDone = i === 0 || !!grammarState.levelDone[GRAMMAR_LEVELS[i - 1].id];
    const locked = !prevDone;
    const best = grammarState.levelBest[lv.id];
    const el = document.createElement("button");
    el.type = "button";
    el.className = "grammar-level" + (done ? " done" : "") + (locked ? " locked" : "");
    el.style.animationDelay = (i * 0.06) + "s";
    el.innerHTML = `
      <div class="gl-num">${done ? "✓" : i + 1}</div>
      <div class="gl-info">
        <div class="gl-name">${lv.emoji} ${lv.name}</div>
        <div class="gl-desc">${lv.desc}</div>
        <div class="gl-meta">${locked ? "🔒 通关上一关解锁" : done ? "🎓 已通关" + (best ? " · 最佳 " + best : "") : "▶ " + lv.qs.length + " 题"}</div>
      </div>
    `;
    if (!locked) el.onclick = () => startGrammarLevel(lv);
    else el.onclick = () => toast("先通关上一关才能解锁 🔒");
    box.appendChild(el);
  });
}

function renderSoundGroups() {
  const box = $("soundSection");
  if (!box) return;
  box.innerHTML = `
    <div class="grammar-sec-title">🎧 发音辨音 · Sound Detectives</div>
    <div class="grammar-sec-sub">听声音，从两个近音词里选出你听到的那个。专治中国耳朵分不清的音对。</div>
    <div class="sound-groups" id="soundGroups"></div>
  `;
  const gbox = $("soundGroups");
  SOUND_PAIRS.forEach((g) => {
    const done = !!grammarState.soundDone[g.id];
    const el = document.createElement("button");
    el.type = "button";
    el.className = "grammar-level sound-group" + (done ? " done" : "");
    el.innerHTML = `
      <div class="gl-num">${done ? "✓" : "🎧"}</div>
      <div class="gl-info">
        <div class="gl-name">${g.emoji} ${g.name}</div>
        <div class="gl-desc">${g.desc}</div>
        <div class="gl-meta">${done ? "🎓 已毕业 · 可重刷" : "▶ " + g.pairs.length + " 题"}</div>
      </div>
    `;
    el.onclick = () => startSoundGame(g);
    gbox.appendChild(el);
  });
}

// ---------- 进入一关 ----------
function startGrammarLevel(lv) {
  grammarState.currentLevel = lv;
  grammarState.qIdx = 0;
  grammarState.correct = 0;
  grammarState.wrongSet = {}; // 题号 -> true（本关答错过）
  setMascotState("thinking");
  renderGrammarQuestion();
}

function renderGrammarQuestion() {
  const lv = grammarState.currentLevel;
  const stage = $("stage");
  const q = lv.qs[grammarState.qIdx];
  const total = lv.qs.length;
  const dots = lv.qs.map((_, i) =>
    `<span class="dot ${i < grammarState.qIdx ? "on" : ""}"></span>`).join("");

  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-grammar";
  const box = document.createElement("div");
  box.className = "adventure-box grammar-play";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">${lv.emoji} ${lv.name}</div>
      <button class="btn btn-ghost" id="gqExit">✕ 退出</button>
    </div>
    <div class="adv-progress">${dots}<span class="adv-progress-num">${grammarState.qIdx + 1}/${total}</span></div>
    <div class="grammar-body" id="grammarBody"></div>
    <div class="grammar-feedback" id="grammarFeedback"></div>
  `;
  stage.appendChild(box);
  $("gqExit").onclick = openGrammarWorld;

  if (q.type === "fix") renderFixQ(q);
  else if (q.type === "factory") renderFactoryQ(q);
  else renderDetectiveQ(q);
}

// ---------- 题型一：修句师（三选一，复用场景答错教学模式） ----------
function renderFixQ(q) {
  const body = $("grammarBody");
  body.innerHTML = `
    <div class="gq-type-tag">🔧 修句师 · 选出正确的句子</div>
    <div class="gq-task">🎯 ${q.task}</div>
    <div class="gq-opts" id="gqOpts"></div>
  `;
  const optsBox = $("gqOpts");
  const shuffled = q.options.slice().sort(() => Math.random() - 0.5);
  let answered = false;
  shuffled.forEach((opt) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "adv-opt";
    el.innerHTML = `<span class="opt-text">${opt.text}</span><span class="opt-play" title="听这句">🔊</span>`;
    el.querySelector(".opt-play").onclick = (e) => { e.stopPropagation(); speak(opt.text); };
    el.onclick = () => {
      if (answered) return;
      answered = true;
      handleGrammarAnswer(opt.ok, opt.tip, el, optsBox, opt.text);
    };
    optsBox.appendChild(el);
  });
}

// ---------- 题型二：句子工厂（点词卡组句） ----------
function renderFactoryQ(q) {
  const body = $("grammarBody");
  const words = q.answer.split(" ").concat(q.extra || []);
  const shuffled = words.slice().sort(() => Math.random() - 0.5);
  body.innerHTML = `
    <div class="gq-type-tag">🏭 句子工厂 · 按正确语序拼出句子</div>
    <div class="gq-task">🎯 ${q.task}</div>
    <div class="factory-answer" id="factoryAnswer"><span class="factory-placeholder">点击下方词卡，拼出句子…</span></div>
    <div class="factory-pool" id="factoryPool"></div>
    <div class="factory-btns">
      <button class="btn" id="factoryUndo">↩ 撤回一个</button>
      <button class="btn" id="factoryClear">🧹 清空重来</button>
      <button class="btn btn-primary" id="factoryCheck">✅ 就是这样</button>
    </div>
  `;
  const answerEl = $("factoryAnswer");
  const poolEl = $("factoryPool");
  const picked = []; // {word, chipEl}

  function renderAnswer() {
    answerEl.innerHTML = picked.length
      ? picked.map((p) => `<span class="factory-chip">${p.word}</span>`).join(" ")
      : '<span class="factory-placeholder">点击下方词卡，拼出句子…</span>';
  }
  function renderPool() {
    poolEl.innerHTML = "";
    shuffled.forEach((w, i) => {
      const used = picked.some((p) => p.i === i);
      const el = document.createElement("button");
      el.type = "button";
      el.className = "factory-word" + (used ? " used" : "");
      el.textContent = w;
      if (!used) el.onclick = () => { picked.push({ word: w, i }); setMascotState("thinking", 400); renderAnswer(); renderPool(); };
      poolEl.appendChild(el);
    });
  }
  renderPool();

  $("factoryUndo").onclick = () => { picked.pop(); renderAnswer(); renderPool(); };
  $("factoryClear").onclick = () => { picked.length = 0; renderAnswer(); renderPool(); };
  $("factoryCheck").onclick = () => {
    const mine = picked.map((p) => p.word).join(" ");
    const ok = mine === q.answer;
    handleGrammarAnswer(ok, q.tip, null, null, ok ? q.answer : mine);
  };
}

// ---------- 题型三：语法侦探（点错词） ----------
function renderDetectiveQ(q) {
  const body = $("grammarBody");
  // bad 可为 null（无错陷阱题）；多词错误（如 "you are"）拆成 token 匹配
  const badWords = q.bad ? q.bad.split(" ") : [];
  body.innerHTML = `
    <div class="gq-type-tag">🔍 语法侦探 · 句子里${q.bad ? "藏着 1 处错误" : "可能没有错误"}，点击你认为错的词</div>
    <div class="gq-sentence" id="gqSentence"></div>
  `;
  const sentEl = $("gqSentence");
  const tokens = q.sentence.split(" ");
  let answered = false;
  tokens.forEach((tok) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "detective-word";
    el.textContent = tok;
    el.onclick = () => {
      if (answered) return;
      answered = true;
      const clean = tok.replace(/[.,!?]/g, "");
      const isBad = badWords.includes(clean);
      handleGrammarDetective(isBad, q, el);
    };
    sentEl.appendChild(el);
  });
}

// ---------- 判分与推进 ----------
function handleGrammarAnswer(ok, tip, el, optsBox, spokenText) {
  const fb = $("grammarFeedback");
  const lv = grammarState.currentLevel;
  const qIdx = grammarState.qIdx;
  if (ok) {
    grammarState.correct++;
    setMascotState("happy", 700);
    if (spokenText) speak(spokenText);
    if (el) el.classList.add("right");
    if (optsBox) optsBox.querySelectorAll(".adv-opt").forEach((b) => (b.disabled = true));
    fb.innerHTML = `<div class="gq-ok">✅ ${tip || "回答正确！"}</div>`;
    setTimeout(nextGrammarQuestion, 1400);
  } else {
    grammarState.wrongSet[qIdx] = true;
    setMascotState("sad", 700);
    if (el) { el.classList.add("wrong"); el.disabled = true; }
    fb.innerHTML = `<div class="gq-no">💡 ${tip || "再想想！"}</div>`;
    setTimeout(() => { fb.innerHTML = ""; if (el) el.disabled = false; }, 1600);
  }
}

function handleGrammarDetective(isBad, q, el) {
  const fb = $("grammarFeedback");
  const qIdx = grammarState.qIdx;
  if (isBad || q.bad === null) {
    // 点对了错词，或这是无错陷阱题且用户需要看到真相
    if (q.bad === null) {
      // 陷阱题：只有点「没有错误」按钮才对——这里简化为：点任意词都提示真相，但不算对
      fb.innerHTML = `<div class="gq-no">🔍 这句话其实没有错误！${q.tip || ""}</div>`;
      setMascotState("thinking", 700);
      setTimeout(() => { nextGrammarQuestion(); }, 1800);
      return;
    }
    grammarState.correct++;
    setMascotState("happy", 700);
    el.classList.add("right");
    speak(q.sentence.replace(q.bad, q.fix));
    fb.innerHTML = `<div class="gq-ok">✅ 揪到了！<b>${q.bad}</b> → <b>${q.fix}</b>。${q.tip || ""}</div>`;
    setTimeout(nextGrammarQuestion, 2000);
  } else {
    grammarState.wrongSet[qIdx] = true;
    setMascotState("sad", 700);
    el.classList.add("wrong");
    fb.innerHTML = `<div class="gq-no">🤔 这个词没问题，再找找。${q.bad ? "错词藏在这句里。" : ""}</div>`;
    setTimeout(() => { fb.innerHTML = ""; el.classList.remove("wrong"); el.disabled = false; answered = false; }, 1200);
    // 重新允许点击（renderDetectiveQ 的 answered 是局部变量，这里靠 disabled 翻转）
    // 注：answered 局部变量已锁死——为支持重试，这里重渲染本题
    setTimeout(() => { renderGrammarQuestion(); }, 1200);
  }
}

function nextGrammarQuestion() {
  const lv = grammarState.currentLevel;
  grammarState.qIdx++;
  if (grammarState.qIdx >= lv.qs.length) return finishGrammarLevel();
  renderGrammarQuestion();
}

function finishGrammarLevel() {
  const lv = grammarState.currentLevel;
  const total = lv.qs.length;
  const correct = grammarState.correct;
  const wrongCount = Object.keys(grammarState.wrongSet).length;
  const passed = correct >= Math.ceil(total * 0.75); // 答对 75% 即通关
  if (passed) {
    grammarState.levelDone[lv.id] = true;
    const best = grammarState.levelBest[lv.id];
    if (!best || correct > best) grammarState.levelBest[lv.id] = correct;
    grammarSave();
    setMascotState("happy", 2000);
    speak("Congratulations! Grammar level complete!");
  } else {
    setMascotState("sad", 1500);
  }
  const stage = $("stage");
  stage.innerHTML = "";
  const box = document.createElement("div");
  box.className = "adventure-box grammar-play";
  box.innerHTML = `
    <div class="vlog-card quiz-card">
      <div class="finish-big">${passed ? "🎓" : "💪"}</div>
      <h3>${passed ? "通关！" : "差一点点！"}</h3>
      <p>答对 ${correct}/${total}，${passed ? "下一关已解锁！" : "答对 75% 即通关，再刷一遍，稳稳过！"}</p>
      <div class="finish-btns">
        ${passed ? "" : '<button class="btn btn-big btn-primary" id="gqRetry">🔄 再闯一次</button>'}
        <button class="btn btn-big" id="gqBackMap">🎓 返回闯关地图</button>
      </div>
    </div>
  `;
  stage.appendChild(box);
  const retry = $("gqRetry");
  if (retry) retry.onclick = () => startGrammarLevel(lv);
  $("gqBackMap").onclick = openGrammarWorld;
  if (passed) toast("🎓 " + lv.name + " 通关！");
}

// ---------- 发音辨音游戏 ----------
function startSoundGame(g) {
  grammarState.currentSound = g;
  grammarState.sqIdx = 0;
  grammarState.sCorrect = 0;
  renderSoundQuestion();
}

function renderSoundQuestion() {
  const g = grammarState.currentSound;
  const stage = $("stage");
  // 顺序刷 6 题，每题随机决定播 a 还是 b
  const pair = g.pairs[grammarState.sqIdx];
  const targetIsA = Math.random() < 0.5;
  const target = targetIsA ? pair.a : pair.b;
  const other = targetIsA ? pair.b : pair.a;
  grammarState._target = target;
  grammarState._other = other;

  stage.innerHTML = "";
  stage.className = "stage stage-wide theme-grammar";
  const dots = g.pairs.map((_, i) =>
    `<span class="dot ${i < grammarState.sqIdx ? "on" : ""}"></span>`).join("");
  const box = document.createElement("div");
  box.className = "adventure-box grammar-play";
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">${g.emoji} ${g.name}</div>
      <button class="btn btn-ghost" id="sqExit">✕ 退出</button>
    </div>
    <div class="adv-progress">${dots}<span class="adv-progress-num">${grammarState.sqIdx + 1}/${g.pairs.length}</span></div>
    <div class="sound-body">
      <div class="gq-type-tag">🎧 听声音，选出你听到的词</div>
      <button class="btn btn-big btn-primary sound-play" id="sqPlay">🔊 播放</button>
      <div class="sound-opts" id="sqOpts"></div>
      <div class="grammar-feedback" id="grammarFeedback"></div>
    </div>
  `;
  stage.appendChild(box);
  $("sqExit").onclick = openGrammarWorld;
  $("sqPlay").onclick = () => speakSlow(target, 0.7);

  const optsBox = $("sqOpts");
  const opts = [target, other].sort(() => Math.random() - 0.5);
  let answered = false;
  opts.forEach((w) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "sound-opt";
    el.innerHTML = `<span class="so-word">${w}</span>`;
    el.onclick = () => {
      if (answered) return;
      answered = true;
      const ok = w === grammarState._target;
      const zh = w === pair.a ? pair.zhA : pair.zhB;
      if (ok) {
        grammarState.sCorrect++;
        setMascotState("happy", 700);
        el.classList.add("right");
        $("grammarFeedback").innerHTML = `<div class="gq-ok">✅ 是 <b>${w}</b>（${zh}）！</div>`;
        setTimeout(nextSoundQuestion, 1200);
      } else {
        setMascotState("sad", 700);
        el.classList.add("wrong");
        $("grammarFeedback").innerHTML = `<div class="gq-no">❌ 你选了 ${w}（${zh}），其实是 <b>${grammarState._target}</b>（${grammarState._target === pair.a ? pair.zhA : pair.zhB}）。${g.tip}</div>`;
        // 双词对比播放，强化听感差异
        setTimeout(() => {
          speakSlow(grammarState._target, 0.7);
          setTimeout(() => speakSlow(grammarState._other, 0.7), 1200);
        }, 400);
        setTimeout(nextSoundQuestion, 3400);
      }
    };
    optsBox.appendChild(el);
  });

  // 进卡自动播一遍
  setTimeout(() => speakSlow(target, 0.7), 500);
}

function nextSoundQuestion() {
  const g = grammarState.currentSound;
  grammarState.sqIdx++;
  if (grammarState.sqIdx >= g.pairs.length) return finishSoundGame();
  renderSoundQuestion();
}

function finishSoundGame() {
  const g = grammarState.currentSound;
  const total = g.pairs.length;
  const correct = grammarState.sCorrect;
  const passed = correct >= Math.ceil(total * 0.75);
  if (passed) {
    grammarState.soundDone[g.id] = true;
    grammarSave();
    setMascotState("happy", 2000);
  } else {
    setMascotState("sad", 1500);
  }
  const stage = $("stage");
  stage.innerHTML = "";
  const box = document.createElement("div");
  box.className = "adventure-box grammar-play";
  box.innerHTML = `
    <div class="vlog-card quiz-card">
      <div class="finish-big">${passed ? "🎓" : "💪"}</div>
      <h3>${passed ? "耳朵毕业！" : "再磨磨耳朵！"}</h3>
      <p>答对 ${correct}/${total}。${passed ? "这组音对已经难不倒你了！" : g.tip}</p>
      <div class="finish-btns">
        ${passed ? "" : '<button class="btn btn-big btn-primary" id="sqRetry">🔄 再来一轮</button>'}
        <button class="btn btn-big" id="sqBackMap">🎓 返回闯关地图</button>
      </div>
    </div>
  `;
  stage.appendChild(box);
  const retry = $("sqRetry");
  if (retry) retry.onclick = () => startSoundGame(g);
  $("sqBackMap").onclick = openGrammarWorld;
  if (passed) toast("🎓 " + g.name + " 毕业！");
}

// ---------- 首页语法 Tab 入口（grammarEntry 容器） ----------
function renderGrammarEntry() {
  const box = $("grammarEntry");
  if (!box) return;
  const doneCount = GRAMMAR_LEVELS.filter((l) => grammarState.levelDone[l.id]).length;
  const soundDoneCount = SOUND_PAIRS.filter((g) => grammarState.soundDone[g.id]).length;
  box.innerHTML = `
    <button type="button" class="grammar-entry-card" id="geGrammar">
      <div class="ge-emoji">🎓</div>
      <div class="ge-info">
        <div class="ge-title">语法闯关</div>
        <div class="ge-desc">修句师 · 句子工厂 · 语法侦探，${GRAMMAR_LEVELS.length} 关循序渐进</div>
        <div class="ge-meta">${doneCount}/${GRAMMAR_LEVELS.length} 关已通关</div>
      </div>
    </button>
    <button type="button" class="grammar-entry-card" id="geSound">
      <div class="ge-emoji">🎧</div>
      <div class="ge-info">
        <div class="ge-title">发音辨音</div>
        <div class="ge-desc">ship 还是 sheep？磨出母语耳朵</div>
        <div class="ge-meta">${soundDoneCount}/${SOUND_PAIRS.length} 组已毕业</div>
      </div>
    </button>
  `;
  $("geGrammar").onclick = openGrammarWorld;
  $("geSound").onclick = openGrammarWorld; // 都进语法世界页，向下滚动可见辨音区
}

// ---------- 初始化（grammar.js 最后加载） ----------
grammarLoad();
