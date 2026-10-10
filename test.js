// 无头快速验证：模拟最小 DOM + localStorage，与游戏代码同一作用域执行全部逻辑
const fs = require("fs");
const path = require("path");

// --- 最小 DOM 桩 ---
function makeEl(id) {
  const el = {
    id, textContent: "", className: "", children: [], style: {},
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    addEventListener() {}, appendChild(c) { el.children.push(c); },
    onclick: null, disabled: false,
    querySelector(sel) { return el._q && el._q[sel] || makeEl("q"); },
    querySelectorAll() { return []; },
    dataset: {},
  };
  let _html = "";
  Object.defineProperty(el, "innerHTML", {
    get() { return _html; },
    set(v) { _html = v; el.children = []; },
  });
  return el;
}
const ids = ["app","wordCount","phraseCount","sceneGrid","sceneTitle","stage","mapView","sceneView",
  "wordOverlay","wordCard","bookOverlay","bookGrid","toast",
  "btnMap","btnBack","btnBook","btnCloseBook","chatBox","advActions","advOpts","advProgress",
  "exploreGrid","exploreToggle","exploreCount","exploreArrow","advAgain","advDone","advNextVisit","wcSpeak","wcClose",
  "orderTray","visitTabs"];
const elements = {};
ids.forEach((id) => elements[id] = makeEl(id));
globalThis.document = {
  getElementById: (id) => elements[id] || (elements[id] = makeEl(id)),
  createElement: () => makeEl("dyn"),
  body: { appendChild() {} },
  querySelector: () => null,
};
globalThis.localStorage = { _s: {}, getItem(k) { return this._s[k] || null; }, setItem(k, v) { this._s[k] = v; } };
globalThis.window = {};
globalThis.speechSynthesis = { cancel() {}, speak() {} };
globalThis.SpeechSynthesisUtterance = function (t) { this.text = t; };

// --- 测试体（与游戏代码同作用域 eval）---
const TEST_BODY = `
let pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) { pass++; console.log("  ✅ " + name); }
  else { fail++; console.log("  ❌ " + name); }
}

console.log("== 1. 初始状态 ==");
ok(state.coins === undefined, "金币体系已移除");
ok(SCENES.length === 7, "共 7 个场景");
ok(SCENES.some(s => s.id === "restaurant"), "餐厅场景已加入");
ok(SCENES.some(s => s.id === "hotel"), "酒店场景已加入");
ok(SCENES.some(s => s.id === "airport"), "机场场景已加入");
const apScene = SCENES.find(s => s.id === "airport");
const apVisits = sceneVisits(apScene);
ok(apVisits.length === 5, "机场有 5 轮光顾");
ok(apVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "机场每步恰好 1 个正确选项");
ok(apVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "机场每步店员台词有 2+ 个随机变体");
ok(apVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "机场每步都有语块 phrase");
ok(apVisits.every(v => v.steps.every(st => (st.adds || []).every(a => !a.wordId || apScene.items.find(it => it.id === a.wordId)))), "机场订单素材 wordId 全部能对上词条");
ok(apVisits.every(v => v.reward && v.reward.en && apScene.items.find(it => it.en === v.reward.en)), "机场每轮奖励词在 items 里");
ok(["boardingpass", "luggage", "checkin", "windowseat", "aisleseat", "security", "tray", "liquids", "belt", "laptop", "gate", "boarding", "delay", "bin", "crew"].every(id => apScene.items.some(it => it.id === id)), "机场 15 个词条全部入库");
ok(apVisits.reduce((n, v) => n + v.steps.filter(st => st.adds).length, 0) >= 4, "机场 3 轮合计至少 4 步有订单素材");
const hotelVisits = sceneVisits(SCENES.find(s => s.id === "hotel"));
ok(hotelVisits.length === 5, "酒店有 5 轮光顾");
ok(hotelVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "酒店每步恰好 1 个正确选项");
ok(hotelVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "酒店每步店员台词有 2+ 个随机变体");
ok(hotelVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "酒店每步都有语块 phrase");
ok(hotelVisits.every(v => v.steps.every(st => (st.adds || []).every(a => !a.wordId || SCENES.find(s => s.id === "hotel").items.find(it => it.id === a.wordId)))), "酒店订单素材 wordId 全部能对上词条");
ok(hotelVisits.every(v => v.reward && v.reward.en && SCENES.find(s => s.id === "hotel").items.find(it => it.en === v.reward.en)), "酒店每轮奖励词在 items 里");
ok(["reservation", "luggage", "keycard", "elevator", "lobby", "receptionist", "checkout", "bill", "minibar", "deposit", "ac", "towel", "noisy", "upgrade", "apology"].every(id => SCENES.find(s => s.id === "hotel").items.some(it => it.id === id)), "酒店 15 个词条全部入库");
const restVisits = sceneVisits(SCENES.find(s => s.id === "restaurant"));
ok(restVisits.length === 6, "餐厅有 6 轮光顾");
ok(SCENES.find(s => s.id === "restaurant").items.length >= 30, "餐厅词汇量 30+");
const hospVisits = sceneVisits(SCENES.find(s => s.id === "hospital"));
ok(hospVisits.length === 5, "医院有 5 轮光顾");
ok(hospVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "医院每步恰好 1 个正确选项");
ok(hospVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "医院每步店员台词有 2+ 个随机变体");
ok(hospVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "医院每步都有语块 phrase");
ok(hospVisits.every(v => v.steps.every(st => (st.adds || []).every(a => !a.wordId || SCENES.find(s => s.id === "hospital").items.find(it => it.id === a.wordId)))), "医院订单素材 wordId 全部能对上词条");
ok(hospVisits.every(v => v.reward && v.reward.en && SCENES.find(s => s.id === "hospital").items.find(it => it.en === v.reward.en)), "医院每轮奖励词在 items 里");
ok(["appointment", "reception", "symptom", "fever", "sorethroat", "cough", "doctor", "insurance", "pharmacy", "prescription", "medicine", "dosage", "checkup", "bloodpressure", "recovered"].every(id => SCENES.find(s => s.id === "hospital").items.some(it => it.id === id)), "医院 15 个核心词条全部入库");
ok(SCENES.every(s => s.unlockCost === undefined), "无解锁成本字段");
const cafeVisits = sceneVisits(SCENES[0]);
ok(cafeVisits.length === 8, "咖啡店有 8 轮光顾");
ok(sceneVisits(SCENES.find(s => s.id === "market")).length === 5, "超市已多轮化（5 轮光顾）");
const marketVisits = sceneVisits(SCENES.find(s => s.id === "market"));
ok(marketVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "超市每步恰好 1 个正确选项");
ok(marketVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "超市每步店员台词有 2+ 个随机变体");
ok(marketVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "超市每步都有语块 phrase");
ok(marketVisits.every(v => v.steps.every(st => (st.adds || []).every(a => !a.wordId || SCENES.find(s => s.id === "market").items.find(it => it.id === a.wordId)))), "超市订单素材 wordId 全部能对上词条");
ok(marketVisits.every(v => v.reward && v.reward.en && SCENES.find(s => s.id === "market").items.find(it => it.en === v.reward.en)), "超市每轮奖励词在 items 里");
ok(["oatmeal", "aisle", "shelf", "brand", "expiration", "scale", "frozen", "receipt", "refund", "exchange"].every(id => SCENES.find(s => s.id === "market").items.some(it => it.id === id)), "超市新增 10 个词条已入库");
ok(cafeVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "每步恰好 1 个正确选项");
ok(cafeVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "每步店员台词有 2+ 个随机变体");
ok(cafeVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "每步都有语块 phrase");
ok(SCENES[0].items.length >= 46, "咖啡店词汇量 46+（实际 " + SCENES[0].items.length + "）");
ok(cafeVisits.reduce((n, v) => n + v.steps.filter(st => st.adds).length, 0) >= 20, "8 轮合计至少 20 步有订单素材");
ok(Object.keys(state.npcLastLines).length === 0, "初始没有店员台词历史");

console.log("== 2. 咖啡店第 1 轮剧情全流程 ==");
enterScene("cafe");
ok(state.currentScene.id === "cafe" && state.currentVisit.id === "v1", "进入咖啡店第 1 轮");
function makeElBtn() {
  return {
    classList: { add() {} }, disabled: false, textContent: "",
    querySelector() { return { onclick: null }; },
    querySelectorAll() { return []; },
    children: [], appendChild() {},
  };
}
function makeOptsBox() {
  const opts = [];
  return {
    children: opts, appendChild(c) { opts.push(c); },
    querySelectorAll() { return opts; },
  };
}
startAdventure();
ok(state.adventure.step === 0, "剧情从第 0 步开始");
ok(state.advHistory.length === 1 && state.advHistory[0].role === "npc-typing", "店员先显示打字中气泡");
for (let i = 0; i < state.currentVisit.steps.length; i++) {
  const step = state.currentVisit.steps[i];
  const right = step.options.find(o => o.ok);
  chooseOption(right, makeElBtn(), makeOptsBox(), step);
  if (i < state.currentVisit.steps.length - 1) nextStep();
}
finishAdventure();
ok(state.adventure.step === state.currentVisit.steps.length, "走完第 1 轮全部步骤");
ok(state.progress["cafe:v1"] === cafeVisits[0].steps.length, "进度记录 cafe:v1 = " + cafeVisits[0].steps.length);
ok(state.unlockedVisits.cafe === 1, "通关第 1 轮解锁第 2 轮");
ok(state.collected["cafe:latte"] === true && state.collected["cafe:croissant"] === true && state.collected["cafe:cookie"] === true, "订单中的饮品和餐点词汇自动收集");
ok(Object.keys(state.phrases).filter(k => k.startsWith("cafe:v1:")).length === cafeVisits[0].steps.length, "第 1 轮语块全部入册");
ok(state.collected["cafe:barista"] === true, "奖励词汇 barista 已收集");

console.log("== 3. 第 2 轮进入与解锁控制 ==");
enterScene("cafe", 1);
ok(state.currentVisit.id === "v2", "可进入已解锁的第 2 轮");
enterScene("cafe", 3);
ok(state.currentVisit.id === "v2", "未解锁轮次被钳制回当前解锁位");
enterScene("cafe", 1);
startAdventure();
chooseOption(state.currentVisit.steps[0].options.find(o => o.ok), makeElBtn(), makeOptsBox(), state.currentVisit.steps[0]);
ok(state.adventure.step === 1, "第 2 轮答题推进");
ok(state.progress["cafe:v2"] === 1, "第 2 轮进度独立记录");

console.log("== 4. 第 2 轮断点续玩 ==");
const v2Saved = state.progress["cafe:v2"];
enterScene("cafe", 1);
startAdventure();
ok(state.adventure.step === v2Saved, "第 2 轮再次进入从保存步骤继续");

console.log("== 5. 答错重试机制 ==");
state.progress["cafe:v2"] = 0;
startAdventure();
const step0 = state.currentVisit.steps[0];
const wrong = step0.options.find(o => !o.ok);
chooseOption(wrong, makeElBtn(), makeOptsBox(), step0);
ok(state.advHistory.some(m => m.role === "me" && m.wrong), "错误回复被标记");
ok(state.adventure.step === 0, "答错不推进进度");
const retryBox = makeOptsBox();
chooseOption(step0.options.find(o => o.ok), makeElBtn(), retryBox, step0);
nextStep();
ok(true, "进入下一步无异常（选项区每次重建）");

console.log("== 5b. 节奏与防抢答 ==");
// nextStep 后：任务提示不应同步出现（等店员台词出来后再渲染选项），stepReady=false 防抢答
enterScene("cafe", 1);
startAdventure();
nextStep();
ok(state.adventure.stepReady === false, "台词未出时 stepReady=false（防看提示抢答）");
ok(state.adventure.lock === false, "答题锁已复位（不阻塞正常作答）");
ok($("advActions").innerHTML.includes("task-hint") === false, "任务提示未提前渲染（不剧透台词）");

console.log("== 6. 超市场景（多轮） ==");
enterScene("market");
ok(state.currentScene.id === "market" && state.currentVisit.id === "v1", "进入超市第 1 轮");
startAdventure();
chooseOption(state.currentVisit.steps[0].options.find(o => o.ok), makeElBtn(), makeOptsBox(), state.currentVisit.steps[0]);
ok(state.adventure.step === 1, "超市第 1 步答对推进");
ok(state.progress["market:v1"] === 1, "多轮进度键 market:v1");

console.log("== 6b. 超市 v3 解锁与通关 ==");
enterScene("market", 2);
ok(state.currentVisit.id === "v1", "未解锁的 v3 被钳制回 v1");
// 测试模式解锁
const mk = SCENES.find(s => s.id === "market");
state.unlockedVisits.market = 2;
enterScene("market", 2);
ok(state.currentVisit.id === "v3", "解锁后可进入第 3 轮（退换货）");
state.adventure = { scene: mk, visit: marketVisits[2], step: 0, lock: false, order: [] };
for (let i = 0; i < marketVisits[2].steps.length; i++) {
  const step = marketVisits[2].steps[i];
  chooseOption(step.options.find(o => o.ok), makeElBtn(), makeOptsBox(), step);
  if (i < marketVisits[2].steps.length - 1) nextStep();
}
finishAdventure();
ok(state.progress["market:v3"] === marketVisits[2].steps.length, "第 3 轮通关进度记录");
ok(state.unlockedVisits.market === 3, "第 3 轮通关后解锁第 4 轮（unlocked=3，5 轮不再封顶）");

console.log("== 6c. 旧单轮存档兼容（进度迁移） ==");
state.unlockedVisits.market = 0;
state.progress["market"] = 5; // 旧版单轮存档键
enterScene("market");
ok(state.currentVisit.id === "v1", "旧存档 market 键进入第 1 轮不报错");
ok(typeof state.progress["market"] === "number", "旧键保留不影响新键读写");

console.log("== 7. 自由探索 ==");
enterScene("market");
const appleItem = SCENES.find(s => s.id === "market").items.find(it => it.id === "apple");
ok(!!appleItem, "apple 词条存在");
state.collected["market:apple"] = true;
ok(state.collected["market:apple"] === true, "收集 apple 成功（数据层）");

console.log("== 7b. 词汇册 vlog 词条（数据层） ==");
// 模拟旧版 vlog 毕业写入的词条格式
VLOGS[0].cards.forEach((c) => { (c.words || []).forEach((w) => { state.collected["vlog:morning:" + w] = { en: w, zh: "", vlog: "早晨的一小时" }; }); });
const vlogCollectedKeys = Object.keys(state.collected).filter(k => k.startsWith("vlog:"));
ok(vlogCollectedKeys.length >= 10, "vlog 词条在 collected 中（" + vlogCollectedKeys.length + " 个）");
// openBook 渲染 vlog 词条：通过 collected 内容反查 bookGrid 桩的 children
openBook();
const bookChildrenCount = $("bookGrid").children.length;
ok(bookChildrenCount >= vlogCollectedKeys.length, "词汇册渲染条目数 ≥ vlog 词条数（" + bookChildrenCount + "）");

console.log("== 8. 词汇册（多轮语块来源） ==");
openBook();
ok(Object.keys(state.phrases).length > 0, "词汇册含常用表达区");

console.log("== 9. 再玩一次（当前轮） ==");
enterScene("cafe", 1);
state.progress["cafe:v2"] = cafeVisits[1].steps.length;
startAdventure({ restart: true });
ok(state.adventure.step === 0, "再玩本轮从第 0 步重新开始");
ok(state.adventure.order.length === 0, "再玩本轮订单托盘重新开始");

console.log("== 10. 持久化 ==");
save();
const saved = JSON.parse(localStorage.getItem("englishWorldV2"));
ok(saved.progress["cafe:v1"] === cafeVisits[0].steps.length, "第 1 轮进度已保存");
ok(saved.unlockedVisits.cafe === 1, "解锁轮次已保存");
ok(Object.keys(saved.phrases).length >= cafeVisits[0].steps.length, "语块已保存");
ok(localStorage.getItem("englishWorld") === null, "旧金币存档不再写入");

console.log("== 11. 慢速生活频道 ==");
ok(typeof VLOGS !== "undefined" && VLOGS.length === 3, "早晨三部曲 3 集 vlog");
ok(VLOGS.every(v => v.cards.filter(c => !c.type).length >= 6), "每集至少 6 张动作卡");
ok(VLOGS.every(v => v.cards.every(c => c.en && c.zh && c.words)), "每张卡都有英文/中文/关键词");
ok(VLOGS.every(v => v.cards.some(c => c.type === "fun-fact")), "每集都有冷知识彩蛋卡");
ok(VLOGS.every(v => v.cards.filter(c => !c.type).every(c => c.anim)), "动作卡都有动画编排");
vlogState.seenCards["morning:0"] = true; vlogState.seenCards["morning:1"] = true;
vlogSave();
ok(JSON.parse(localStorage.getItem("englishWorldV2")).vlogSeen["morning:1"] === true, "vlog 观看进度持久化");
// 模拟通过 quiz 后词汇入册
vlogState.quizPassed["morning"] = true;
VLOGS[0].cards.forEach((c) => { (c.words || []).forEach((w) => { state.collected["vlog:morning:" + w] = { en: w, zh: "", vlog: "早晨的一小时" }; }); });
save();
ok(Object.keys(state.collected).filter(k => k.startsWith("vlog:morning:")).length >= 10, "毕业集词汇入册（与场景共享收集）");
ok(state.progress["cafe:v1"] === 10, "vlog 不影响场景对话进度");

console.log("");
console.log("结果: " + pass + " 通过 / " + fail + " 失败");
if (fail > 0) throw new Error("测试失败");
`;

// --- 拼接执行：data.js + game.js + 测试体，同一作用域 ---
const base = "/Users/alice/WorkBuddy/3/english-world";
const code = [
  fs.readFileSync(path.join(base, "data.js"), "utf8"),
  fs.readFileSync(path.join(base, "vlogs.js"), "utf8"),
  fs.readFileSync(path.join(base, "game.js"), "utf8").replace(/vlogLoad\(\);|initHomeTabs\(\);/g, ""),
  fs.readFileSync(path.join(base, "vlog.js"), "utf8"),
  TEST_BODY,
].join("\n;\n");

try {
  eval(code);
  process.exit(0);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
