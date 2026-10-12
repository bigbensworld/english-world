// 英语世界 - 语法闯关 + 发音辨音引擎
// 三个语法题型：修句师(fix) / 句子工厂(factory) / 语法侦探(detective)
// 发音辨音：最小对立对听音选词
// 复用 game.js 的 speak()/setMascotState()/toast()/$()，存储并入 englishWorldV2（合并式，照 vlog.js 模式）

// ---------- 状态 ----------
const grammarState = {
  levelDone: {},   // levelId -> true（通关）
  levelBest: {},   // levelId -> 本次最好成绩 n/total（重刷用，不影响通关标记）
  soundDone: {},   // soundGroupId -> true（毕业）
  // 错题池（简化遗忘曲线）：qKey -> { lvId, miss, hit }
  // qKey = levelId + ":" + 题号；miss = 累计答错次数；hit = 连续答对次数（连对 2 次出池）
  wrongPool: {},
};

function grammarSave() {
  const d = JSON.parse(localStorage.getItem("englishWorldV2") || "{}");
  d.grammarDone = grammarState.levelDone;
  d.grammarBest = grammarState.levelBest;
  d.soundDone = grammarState.soundDone;
  d.grammarWrongPool = grammarState.wrongPool;
  localStorage.setItem("englishWorldV2", JSON.stringify(d));
}
function grammarLoad() {
  try {
    const d = JSON.parse(localStorage.getItem("englishWorldV2"));
    if (d) {
      grammarState.levelDone = d.grammarDone || {};
      grammarState.levelBest = d.grammarBest || {};
      grammarState.soundDone = d.soundDone || {};
      grammarState.wrongPool = d.grammarWrongPool || {};
    }
  } catch (e) { /* fresh */ }
}

// ---------- 错题池（简化遗忘曲线） ----------
// 在关卡内答题时记录：qKey = lvId:qIdx
function recordWrongResult(lvId, qIdx, ok) {
  const key = lvId + ":" + qIdx;
  const entry = grammarState.wrongPool[key];
  if (ok) {
    if (!entry) return; // 从没错过：不入池
    entry.hit = (entry.hit || 0) + 1;
    if (entry.hit >= 2) {
      delete grammarState.wrongPool[key]; // 连对 2 次：出池
    }
  } else {
    grammarState.wrongPool[key] = {
      lvId, miss: (entry ? entry.miss : 0) + 1, hit: 0,
    };
  }
  grammarSave();
}
function wrongPoolCount() {
  return Object.keys(grammarState.wrongPool).length;
}
// 构造错题重刷序列：按 miss 降序（错得最多的先来），跨关混合
function buildWrongPoolDrill() {
  return Object.entries(grammarState.wrongPool)
    .map(([key, e]) => ({ key, ...e }))
    .sort((a, b) => b.miss - a.miss)
    .map((e) => {
      const lv = GRAMMAR_LEVELS.find((l) => l.id === e.lvId);
      const qIdx = Number(e.key.split(":")[1]);
      return { lv, q: lv && lv.qs[qIdx], qIdx };
    })
    .filter((x) => x.q); // 防御：关卡数据变动后找不到的题跳过
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
  const poolN = wrongPoolCount();
  box.innerHTML = `
    <div class="adv-head">
      <div class="adv-title">🎓 语法闯关</div>
    </div>
    <div class="adv-intro">三大题型打通语法关：🔧 修句师选对句 → 🏭 句子工厂拼语序 → 🔍 语法侦探揪错词。每关 8 题，通关解锁下一关。</div>
    <button type="button" class="grammar-drill-entry${poolN ? " has-pool" : ""}" id="drillEntry">
      <div class="gl-num">🔥</div>
      <div class="gl-info">
        <div class="gl-name">错题重刷</div>
        <div class="gl-desc">答错的题自动入池，连对 2 次出池——磨到彻底掌握</div>
        <div class="gl-meta">${poolN ? "🔥 池中 " + poolN + " 题，错得多的先刷" : "✅ 池子是空的，去闯关积累吧"}</div>
      </div>
    </button>
    <div class="grammar-levels" id="grammarLevels"></div>
    <div class="sound-section" id="soundSection"></div>
    <button class="btn btn-big" id="grammarBack">⬅ 返回地图</button>
  `;
  stage.appendChild(box);
  renderGrammarLevels();
  renderSoundGroups();
  $("drillEntry").onclick = () => {
    if (!poolN) { toast("错题池是空的，先去闯关吧！🎉"); return; }
    startWrongPoolDrill();
  };
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
    // 该关在错题池中的题数
    const lvWrong = Object.values(grammarState.wrongPool).filter((e) => e.lvId === lv.id).length;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "grammar-level" + (done ? " done" : "") + (locked ? " locked" : "");
    el.style.animationDelay = (i * 0.06) + "s";
    el.innerHTML = `
      <div class="gl-num">${done ? "✓" : i + 1}</div>
      <div class="gl-info">
        <div class="gl-name">${lv.emoji} ${lv.name}</div>
        <div class="gl-desc">${lv.desc}</div>
        <div class="gl-meta">${locked ? "🔒 通关上一关解锁" : done ? "🎓 已通关" + (best ? " · 最佳 " + best : "") + (lvWrong ? " · 🔥" + lvWrong : "") : "▶ " + lv.qs.length + " 题" + (lvWrong ? " · 🔥" + lvWrong : "")}</div>
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
  grammarState.drill = null; // 进入正常关卡时清掉 drill 会话
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
    <div class="gq-type-tag">🔍 语法侦探 · 点击你认为错的词，没有错就点下面的按钮</div>
    <div class="gq-sentence" id="gqSentence"></div>
    <div class="factory-btns" style="margin-top:12px">
      <button class="btn" id="detNoError">✨ 这句话没有错误</button>
    </div>
  `;
  const sentEl = $("gqSentence");
  const tokens = q.sentence.split(" ");
  let answered = false;
  function answer(isCorrect, el, feedback) {
    if (answered) return;
    answered = true;
    // 错题池记账（drill 或关卡内）
    if (grammarState.drill) {
      recordWrongResult(lvIdForPool(), grammarState.drill.list[grammarState.drill.idx].qIdx, isCorrect);
    } else {
      recordWrongResult(grammarState.currentLevel.id, grammarState.qIdx, isCorrect);
    }
    if (isCorrect) {
      grammarState.correct++;
      setMascotState("happy", 700);
      if (el) el.classList.add("right");
      const spoken = q.bad ? q.sentence.replace(q.bad, q.fix || "") : q.sentence;
      if (q.bad) speak(spoken);
      feedback.innerHTML = `<div class="gq-ok">${q.bad ? `✅ 揪到了！<b>${q.bad}</b>${q.fix ? " → <b>" + q.fix + "</b>" : " → 直接删掉"}。` : "✅ 好眼力！"}${q.tip || ""}</div>`;
      setTimeout(nextGrammarQuestion, 2000);
    } else {
      grammarState.wrongSet[grammarState.qIdx] = true;
      setMascotState("sad", 700);
      if (el) { el.classList.add("wrong"); el.disabled = true; }
      const hint = q.bad === null
        ? `🤔 其实这句话没有错误，别被骗啦。${q.tip || ""}`
        : el
          ? `🤔 这个词没问题，错词还藏在句子里。`
          : `🤔 这句话里确实有错误，再找找。`;
      feedback.innerHTML = `<div class="gq-no">${hint}</div>`;
      // 答错重试：重渲染本题（保留 wrongSet 记录，计入成绩）
      setTimeout(() => { renderGrammarQuestion(); }, 1600);
    }
  }
  const fb = $("grammarFeedback");
  tokens.forEach((tok) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "detective-word";
    el.textContent = tok;
    el.onclick = () => {
      const clean = tok.replace(/[.,!?]/g, "");
      const isBad = badWords.includes(clean);
      answer(isBad, el, fb);
    };
    sentEl.appendChild(el);
  });
  $("detNoError").onclick = () => answer(q.bad === null, null, fb);
}

// ---------- 判分与推进 ----------
// drill 模式下 nextGrammarQuestion 推进 drill 序列，而不是关卡内 qIdx
function nextGrammarQuestion() {
  if (grammarState.drill) return nextDrillQuestion();
  const lv = grammarState.currentLevel;
  grammarState.qIdx++;
  if (grammarState.qIdx >= lv.qs.length) return finishGrammarLevel();
  renderGrammarQuestion();
}

// drill 模式下取当前题所属关卡 id（错题池记账用）
function lvIdForPool() {
  if (grammarState.drill) {
    const item = grammarState.drill.list[grammarState.drill.idx];
    return item ? item.lv.id : grammarState.currentLevel.id;
  }
  return grammarState.currentLevel.id;
}

// ---------- 错题重刷（drill）模式 ----------
// drill 会话：{ list: [{lv, q, qIdx}], idx, correct, exited }
function startWrongPoolDrill() {
  const list = buildWrongPoolDrill();
  if (!list.length) { toast("错题池是空的，先去闯关吧！🎉"); return; }
  grammarState.drill = { list, idx: 0, correct: 0 };
  setMascotState("thinking");
  renderDrillQuestion();
}

function renderDrillQuestion() {
  const d = grammarState.drill;
  const item = d.list[d.idx];
  if (!item) return finishDrill();
  // 借用关卡答题渲染：临时把 currentLevel/qIdx 指到该题，题型渲染函数直接复用
  grammarState.currentLevel = item.lv;
  grammarState.qIdx = item.qIdx;
  renderGrammarQuestion();
  // 覆盖标题与进度行：显示 drill 语境
  const advTitle = document.querySelector(".grammar-play .adv-title");
  if (advTitle) advTitle.innerHTML = `🔥 错题重刷 · ${item.lv.name}`;
  const prog = document.querySelector(".grammar-play .adv-progress");
  if (prog) prog.innerHTML = `<span class="gq-type-tag">第 ${d.idx + 1}/${d.list.length} 题 · 连对 2 次自动出池</span>`;
}

function nextDrillQuestion() {
  const d = grammarState.drill;
  d.idx++;
  if (d.idx >= d.list.length) return finishDrill();
  renderDrillQuestion();
}

function finishDrill() {
  const d = grammarState.drill;
  const remaining = wrongPoolCount();
  grammarState.drill = null;
  setMascotState(remaining === 0 ? "happy" : "idle", 2000);
  const stage = $("stage");
  stage.innerHTML = "";
  const box = document.createElement("div");
  box.className = "adventure-box grammar-play";
  box.innerHTML = `
    <div class="vlog-card quiz-card">
      <div class="finish-big">${remaining === 0 ? "🎉" : "🔥"}</div>
      <h3>${remaining === 0 ? "错题池清空！" : "本轮重刷完！"}</h3>
      <p>${remaining === 0 ? "连对 2 次的题都已出池，全部消灭！" : "还有 " + remaining + " 题在池子里，继续加油！"}</p>
      <div class="finish-btns">
        ${remaining > 0 ? '<button class="btn btn-big btn-primary" id="drillAgain">🔥 继续重刷</button>' : ""}
        <button class="btn btn-big" id="drillBack">🎓 返回闯关地图</button>
      </div>
    </div>
  `;
  stage.appendChild(box);
  const again = $("drillAgain");
  if (again) again.onclick = () => startWrongPoolDrill();
  $("drillBack").onclick = openGrammarWorld;
  if (remaining === 0) toast("🎉 错题池已清空！");
}

function handleGrammarAnswer(ok, tip, el, optsBox, spokenText) {
  const fb = $("grammarFeedback");
  const lv = grammarState.currentLevel;
  const qIdx = grammarState.qIdx;
  // 错题池记账（非 drill 模式才入池；drill 模式记出池进度）
  if (grammarState.drill) {
    recordWrongResult(lv.id, grammarState.drill.list[grammarState.drill.idx].qIdx, ok);
  } else {
    recordWrongResult(lv.id, qIdx, ok);
  }
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

function finishGrammarLevel() {
  if (grammarState.drill) return finishDrill();
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
  const poolN = wrongPoolCount();
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
    <button type="button" class="grammar-entry-card" id="geDrill">
      <div class="ge-emoji">🔥</div>
      <div class="ge-info">
        <div class="ge-title">错题重刷</div>
        <div class="ge-desc">答错的题自动入池，连对 2 次出池</div>
        <div class="ge-meta">${poolN ? "🔥 池中 " + poolN + " 题" : "✅ 池子空空的"}</div>
      </div>
    </button>
  `;
  $("geGrammar").onclick = openGrammarWorld;
  $("geSound").onclick = openGrammarWorld; // 都进语法世界页，向下滚动可见辨音区
  $("geDrill").onclick = () => {
    if (!poolN) { openGrammarWorld(); toast("错题池是空的，先去闯关吧！🎉"); return; }
    openGrammarWorld();
    startWrongPoolDrill();
  };
}

// ---------- 初始化（grammar.js 最后加载） ----------
grammarLoad();
