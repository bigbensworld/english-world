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
ok(SCENES.length === 2, "共 2 个场景");
ok(SCENES.every(s => s.unlockCost === undefined), "无解锁成本字段");
const cafeVisits = sceneVisits(SCENES[0]);
ok(cafeVisits.length === 8, "咖啡店有 8 轮光顾");
ok(sceneVisits(SCENES[1]).length === 1, "超市保持单轮（向后兼容）");
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

console.log("== 6. 超市场景（单轮兼容） ==");
enterScene("market");
ok(state.currentScene.id === "market" && state.currentVisit.id === "v1", "进入超市（单轮兼容）");
startAdventure();
chooseOption(state.currentVisit.steps[0].options.find(o => o.ok), makeElBtn(), makeOptsBox(), state.currentVisit.steps[0]);
ok(state.adventure.step === 1, "超市第 1 步答对推进");
ok(state.progress["market"] === 1, "单轮场景进度键保持 sceneId");

console.log("== 7. 自由探索 ==");
enterScene("market");
const allSpots = $("exploreGrid").children;
const spot0 = allSpots[allSpots.length - 12];
spot0.onclick();
ok(state.collected["market:apple"] === true, "点击 apple 收集成功");

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

console.log("");
console.log("结果: " + pass + " 通过 / " + fail + " 失败");
if (fail > 0) throw new Error("测试失败");
`;

// --- 拼接执行：data.js + game.js + 测试体，同一作用域 ---
const base = "/Users/alice/WorkBuddy/3/english-world";
const code = [
  fs.readFileSync(path.join(base, "data.js"), "utf8"),
  fs.readFileSync(path.join(base, "game.js"), "utf8"),
  TEST_BODY,
].join("\n;\n");

try {
  eval(code);
  process.exit(0);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
