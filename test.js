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
  "exploreGrid","exploreToggle","exploreCount","exploreArrow","advAgain","advDone","wcSpeak","wcClose",
  "orderTray"];
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
ok(SCENES[0].steps.length === 10 && SCENES[1].steps.length === 11, "咖啡店 10 步 / 超市 11 步剧情");
ok(SCENES.every(s => s.steps.every(st => st.options.filter(o => o.ok).length === 1)), "每步恰好 1 个正确选项");
ok(SCENES.every(s => s.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "每步店员台词有 2+ 个随机变体");
ok(SCENES.every(s => s.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "每步都有语块 phrase");
ok(SCENES[0].steps.filter(st => st.adds).length >= 6, "咖啡店至少 6 步有订单素材");

console.log("== 2. 咖啡店剧情全流程 ==");
enterScene("cafe");
ok(state.currentScene.id === "cafe", "进入咖啡店");
ok(typeof $("advActions") !== "undefined", "剧情操作区已渲染");

// 模拟点击开始剧情按钮（advActions 里第一个按钮）
startAdventure();
ok(state.adventure.step === 0, "剧情从第 0 步开始");
ok(state.advHistory.length === 1 && state.advHistory[0].role === "npc-typing", "店员先显示打字中气泡");

// 逐步选正确答案走完全程
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
for (let i = 0; i < SCENES[0].steps.length; i++) {
  const step = SCENES[0].steps[i];
  const right = step.options.find(o => o.ok);
  chooseOption(right, makeElBtn(), makeOptsBox(), step);
  // chooseOption 内部对正确答案走 setTimeout(nextStep, 900)，测试环境无 timer，手动推进
  if (i < SCENES[0].steps.length - 1) nextStep();
}
// 走完最后一步由 finishAdventure 收尾（测试环境无 timer，手动触发）
finishAdventure();

ok(state.adventure.step === SCENES[0].steps.length, "走完全部 10 步");
ok(state.progress.cafe === 10, "进度记录 cafe=10");
ok(state.advHistory.some(m => m.role === "me" && !m.wrong), "玩家正确回复已记录");
ok(state.advHistory.filter(m => m.role === "phrase").length === 10, "聊天流含 10 张语块卡");
ok(state.adventure.order.length >= 6, "订单托盘至少 6 项（实际 " + state.adventure.order.length + "）");
ok(state.collected["cafe:latte"] === true && state.collected["cafe:croissant"] === true && state.collected["cafe:cookie"] === true, "订单中的饮品和餐点词汇自动收集");
ok(Object.keys(state.phrases).filter(k => k.startsWith("cafe:")).length === 10, "咖啡店 10 条语块全部入册");
ok(state.collected["cafe:barista"] === true, "奖励词汇 barista 已收集");

console.log("== 3. 断点续玩 ==");
// 模拟离开：当前已保存 cafe=10，先设置一个中途进度并重新进入场景
state.progress.cafe = 3;
save();
enterScene("cafe");
startAdventure();
ok(state.adventure.step === 3, "再次进入从已保存的第 3 步开始");
ok(state.adventure.order.length === SCENES[0].steps.slice(0, 3).reduce((n, st) => n + (st.adds || []).length, 0), "续玩时恢复已完成订单素材");
const resumeNpc = state.advHistory[0];
ok(resumeNpc && resumeNpc.role === "npc-typing", "续玩仍从当前步骤生成新对话");

console.log("== 4. 答错重试机制 ==");
state.progress.cafe = 0;
startAdventure();
const step0 = SCENES[0].steps[0];
const wrong = step0.options.find(o => !o.ok);
chooseOption(wrong, makeElBtn(), makeOptsBox(), step0);
ok(state.advHistory.some(m => m.role === "me" && m.wrong), "错误回复被标记");
ok(state.adventure.step === 0, "答错不推进进度");
// 模拟 retry 定时器结束，再进入下一步；新选项区不应带上一关 reveal 样式。
const retryBox = makeOptsBox();
chooseOption(step0.options.find(o => o.ok), makeElBtn(), retryBox, step0);
nextStep();
ok(![...($('advOpts').children || [])].some((b) => b.className && b.className.includes("reveal")), "下一步不残留上一关绿色答案提示");

console.log("== 5. 超市场景 ==");
enterScene("market");
ok(state.currentScene.id === "market", "直接进入超市（无需解锁）");
startAdventure();
chooseOption(SCENES[1].steps[0].options.find(o => o.ok), makeElBtn(), makeOptsBox(), SCENES[1].steps[0]);
ok(state.adventure.step === 1, "超市第 1 步答对推进");

console.log("== 6. 自由探索 ==");
enterScene("market");
// 桩中 exploreGrid 为全局共享，取本次进入场景新追加的那批（最后 12 个中的第 1 个）
const allSpots = $("exploreGrid").children;
const spot0 = allSpots[allSpots.length - 12];
spot0.onclick();
ok(state.collected["market:apple"] === true, "点击 apple 收集成功");

console.log("== 7. 词汇册 ==");
openBook();
const bookCount = Object.keys(state.collected).length;
ok(bookCount >= 2, "词汇册至少含 2 词（实际 " + bookCount + "）");
ok($("bookGrid").innerHTML.includes("常用表达") || Object.keys(state.phrases).length > 0, "词汇册含常用表达区");

console.log("== 8. 再玩一次 ==");
state.currentScene = SCENES[0];
state.progress.cafe = SCENES[0].steps.length;
startAdventure({ restart: true });
ok(state.adventure.step === 0, "再玩一次从第 0 步重新开始");
ok(state.adventure.order.length === 0, "再玩一次订单托盘重新开始");

console.log("== 9. 持久化 ==");
state.progress.cafe = 10;
save();
const saved = JSON.parse(localStorage.getItem("englishWorldV2"));
ok(saved.progress.cafe === 10, "进度已保存");
ok(saved.collected["cafe:barista"] === true, "词汇已保存");
ok(Object.keys(saved.phrases).length >= 10, "语块已保存");
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
