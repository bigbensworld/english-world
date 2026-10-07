// 无头快速验证：模拟最小 DOM + localStorage，与游戏代码同一作用域执行全部逻辑
const fs = require("fs");
const path = require("path");

// --- 最小 DOM 桩 ---
const elements = {};
function makeEl(id) {
  const el = {
    id, textContent: "", className: "", children: [], style: {},
    classList: { add() {}, remove() {}, contains() { return false; } },
    addEventListener() {}, appendChild(c) { el.children.push(c); },
    onclick: null, querySelector() { return null; }, querySelectorAll() { return []; },
    dataset: {},
  };
  let _html = "";
  Object.defineProperty(el, "innerHTML", {
    get() { return _html; },
    set(v) { _html = v; el.children = []; },
  });
  return el;
}
const ids = ["app","coinCount","wordCount","sceneGrid","sceneTitle","stage","mapView","sceneView",
  "wordOverlay","wordCard","bookOverlay","bookGrid","gameOverlay","gamePanel","toast",
  "btnMap","btnBack","btnBook","btnCloseBook","btnGame","wcSpeak","wcClose","gSpeak","gQuit","gAgain","gDone","gOpts"];
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
ok(state.coins === 0, "初始金币为 0");
ok(state.unlocked.cafe === true, "咖啡店默认解锁");
ok(SCENES.length === 2, "共 2 个场景");
ok(SCENES[0].items.length === 12 && SCENES[1].items.length === 12, "每场景 12 个物品");

console.log("== 2. 进入咖啡店 + 点词收集 ==");
enterScene("cafe");
ok(state.currentScene.id === "cafe", "进入咖啡店");
const spot0 = document.getElementById("stage").children[0];
spot0.onclick();
ok(state.collected["cafe:coffee"] === true, "点击 coffee 后被收集");
ok(document.getElementById("wordCard").innerHTML.includes("/ˈkɒfi/"), "词卡含音标");
ok(document.getElementById("wordCard").innerHTML.includes("新词已收集"), "新词提示显示");
spot0.onclick();
ok(state.collected["cafe:coffee"] === true, "重复点击不报错");

console.log("== 3. 点单小游戏 ==");
startGame();
ok(game.round === 1 && game.total === 5, "游戏开局第 1/5 轮");
ok(typeof document.getElementById("gamePanel").innerHTML === "string"
  && document.getElementById("gamePanel").innerHTML.includes("game-opt"), "选项渲染正常");
game.score = 5;
endGame();
ok(state.coins === 10, "5 单全对得 10 金币（实际 " + state.coins + "）");

console.log("== 4. 解锁超市 ==");
state.coins = 30;
const market = SCENES.find((s) => s.id === "market");
tryUnlock(market);
ok(state.unlocked.market === true, "30 金币解锁超市成功");
ok(state.coins === 0, "解锁后金币清零");

console.log("== 5. 超市场景 ==");
enterScene("market");
ok(state.currentScene.id === "market", "进入超市");
document.getElementById("stage").children[0].onclick();
ok(state.collected["market:apple"] === true, "超市 apple 收集成功");

console.log("== 6. 词汇册 ==");
openBook();
ok(Object.keys(state.collected).length === 2, "词汇册含 2 词");

console.log("== 7. 持久化 ==");
save();
const saved = JSON.parse(localStorage.getItem("englishWorld"));
ok(saved.unlocked.market === true, "localStorage 保存正确");

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
