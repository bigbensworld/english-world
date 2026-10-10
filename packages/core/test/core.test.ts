// 内核单测：迁移 test.js 中的纯逻辑断言（Node 22 原生 TS 直跑，无需 vitest 依赖）
// 运行：node packages/core/test/core.test.ts
import {
  SCENES, VLOGS, VLOG_DICT,
  sceneVisits, visitKey, unlockedVisitIndex, finishedVisits,
  pickNpcLine, applyAnswer, applyFinish, resumeOrder, sceneCardStatus,
  MemoryStorageAdapter, SaveService,
} from "../src/index.ts";
import type { GameState, Scene, SceneVisit } from "../src/index.ts";

let pass = 0, fail = 0;
function ok(cond: unknown, name: string) {
  if (cond) { pass++; console.log("  ✅ " + name); }
  else { fail++; console.log("  ❌ " + name); }
}
function freshState(): GameState {
  return { collected: {}, phrases: {}, npcLastLines: {}, progress: {}, unlockedVisits: {} };
}
function scene(id: string): Scene {
  const sc = SCENES.find(s => s.id === id);
  if (!sc) throw new Error("scene not found: " + id);
  return sc;
}

console.log("== 1. 数据完整性（迁移自 test.js 断言） ==");
ok(SCENES.length === 9, "共 9 个场景");
ok(VLOGS.length === 6, "慢速生活 6 集 vlog");
ok(VLOGS.every(v => v.cards.filter(c => !c.type).length >= 6), "每集至少 6 张动作卡");
ok(VLOGS.every(v => v.cards.every(c => c.en && c.zh && c.words)), "每张卡都有英文/中文/关键词");
ok(VLOGS.every(v => v.cards.some(c => c.type === "fun-fact")), "每集都有冷知识彩蛋卡");
ok(VLOGS.every(v => v.cards.filter(c => !c.type).every(c => c.anim)), "动作卡都有动画编排");
ok(Object.keys(VLOG_DICT).length >= 100, "VLOG_DICT 词条 100+（实际 " + Object.keys(VLOG_DICT).length + "）");
ok(SCENES.every(s => (s as any).unlockCost === undefined), "无解锁成本字段");

const apVisits = sceneVisits(scene("airport"));
ok(apVisits.length === 5, "机场有 5 轮光顾");
ok(apVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "机场每步恰好 1 个正确选项");
ok(apVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "机场每步店员台词有 2+ 个随机变体");
ok(apVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "机场每步都有语块 phrase");
ok(apVisits.every(v => v.steps.every(st => (st.adds || []).every(a => !a.wordId || scene("airport").items.find(it => it.id === a.wordId)))), "机场订单素材 wordId 全部能对上词条");
ok(apVisits.every(v => v.reward && v.reward.en && scene("airport").items.find(it => it.en === v.reward.en)), "机场每轮奖励词在 items 里");
ok(["boardingpass", "luggage", "checkin", "windowseat", "aisleseat", "security", "tray", "liquids", "belt", "laptop", "gate", "boarding", "delay", "bin", "crew"].every(id => scene("airport").items.some(it => it.id === id)), "机场 15 个词条全部入库");

const hotelVisits = sceneVisits(scene("hotel"));
ok(hotelVisits.length === 5, "酒店有 5 轮光顾");
ok(hotelVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "酒店每步恰好 1 个正确选项");
ok(hotelVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "酒店每步都有语块 phrase");
ok(["reservation", "luggage", "keycard", "elevator", "lobby", "receptionist", "checkout", "bill", "minibar", "deposit", "ac", "towel", "noisy", "upgrade", "apology"].every(id => scene("hotel").items.some(it => it.id === id)), "酒店 15 个词条全部入库");

const hospVisits = sceneVisits(scene("hospital"));
ok(hospVisits.length === 5, "医院有 5 轮光顾");
ok(hospVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "医院每步恰好 1 个正确选项");
ok(hospVisits.every(v => v.steps.every(st => st.phrase && st.phrase.en && st.phrase.note)), "医院每步都有语块 phrase");
ok(["appointment", "fever", "sorethroat", "cough", "prescription", "medicine", "checkup", "recovered"].every(id => scene("hospital").items.some(it => it.id === id)), "医院核心词条全部入库");
const restVisits = sceneVisits(scene("restaurant"));
ok(restVisits.length === 6, "餐厅有 6 轮光顾");
ok(scene("restaurant").items.length >= 30, "餐厅词汇量 30+");

const cafeVisits = sceneVisits(scene("cafe"));
ok(cafeVisits.length === 8, "咖啡店有 8 轮光顾");
ok(scene("cafe").items.length >= 46, "咖啡店词汇量 46+（实际 " + scene("cafe").items.length + "）");
ok(cafeVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "咖啡店每步恰好 1 个正确选项");
ok(cafeVisits.every(v => v.steps.every(st => st.npcLines && st.npcLines.length >= 2)), "咖啡店每步店员台词有 2+ 个随机变体");
ok(cafeVisits.reduce((n, v) => n + v.steps.filter(st => st.adds).length, 0) >= 20, "咖啡店 8 轮合计至少 20 步有订单素材");

const marketVisits = sceneVisits(scene("market"));
ok(marketVisits.length === 5, "超市已多轮化（5 轮光顾）");
ok(marketVisits.every(v => v.steps.every(st => st.options.filter(o => o.ok).length === 1)), "超市每步恰好 1 个正确选项");
ok(["oatmeal", "aisle", "shelf", "brand", "expiration", "scale", "frozen", "receipt", "refund", "exchange"].every(id => scene("market").items.some(it => it.id === id)), "超市新增 10 个词条已入库");

console.log("== 2. 访问层与键规则 ==");
ok(visitKey(scene("cafe"), cafeVisits[0]) === "cafe:v1", "多轮场景键 cafe:v1");
ok(visitKey(scene("market"), marketVisits[0]) === "market:v1", "多轮场景键 market:v1");

console.log("== 3. 咖啡店 v1 全流程（applyAnswer/applyFinish） ==");
{
  const state = freshState();
  const sc = scene("cafe");
  const visit = cafeVisits[0];
  const session = { scene: sc, visit, step: 0, order: [] as any[] };
  for (let i = 0; i < visit.steps.length; i++) {
    const step = visit.steps[i];
    const right = step.options.find(o => o.ok)!;
    const r = applyAnswer(state, session, right, step);
    ok(r.correct && r.newStep === i + 1, "第 " + (i + 1) + " 步答对推进");
  }
  ok(state.progress["cafe:v1"] === visit.steps.length, "进度记录 cafe:v1 = " + visit.steps.length);
  ok(Object.keys(state.phrases).filter(k => k.startsWith("cafe:v1:")).length === visit.steps.length, "第 1 轮语块全部入册");
  ok(state.collected["cafe:latte"] === true, "订单词汇 latte 自动收集");
  ok(state.collected["cafe:croissant"] === true, "订单词汇 croissant 自动收集");
  const fin = applyFinish(state, sc, visit);
  ok(fin.unlockedNext && state.unlockedVisits.cafe === 1, "通关第 1 轮解锁第 2 轮");
  ok(state.collected["cafe:barista"] === true, "奖励词汇 barista 已收集");
  ok(fin.hasNext && fin.nextVisit?.id === "v2", "下一轮为 v2");
}

console.log("== 4. 答错不推进 ==");
{
  const state = freshState();
  const visit = cafeVisits[0];
  const session = { scene: scene("cafe"), visit, step: 0, order: [] as any[] };
  const wrong = visit.steps[0].options.find(o => !o.ok)!;
  const r = applyAnswer(state, session, wrong, visit.steps[0]);
  ok(!r.correct && session.step === 0 && state.progress["cafe:v1"] === undefined, "答错不推进进度");
  ok(session.order.length === 0, "答错不加订单素材");
}

console.log("== 5. 台词随机排除上次 ==");
{
  const state = freshState();
  const sc = scene("cafe");
  const visit = cafeVisits[0];
  const step = visit.steps[0];
  const lines = step.npcLines!;
  ok(lines.length >= 2, "第 1 步有 2+ 变体");
  let seq = 0;
  const rand = () => { seq++; return seq === 1 ? 0 : 0; }; // 第一次取第 0 个，之后仍取候选第 0 个
  const first = pickNpcLine(state, sc, visit, 0, step, rand);
  const second = pickNpcLine(state, sc, visit, 0, step, rand);
  ok(first !== second, "两次连续取词不相同（" + first.slice(0, 20) + "… ≠ " + second.slice(0, 20) + "…）");
}

console.log("== 6. 断点续玩订单恢复 ==");
{
  const visit = cafeVisits[0];
  const saved = 3;
  const order = resumeOrder(visit, saved);
  const expected = visit.steps.slice(0, saved).flatMap(s => s.adds || []);
  ok(order.length === expected.length && order.length > 0, "续玩恢复订单素材 " + order.length + " 项");
}

console.log("== 7. 超市 v3 通关解锁下一轮 ==");
{
  const state = freshState();
  const sc = scene("market");
  state.unlockedVisits.market = 2;
  const visit = marketVisits[2];
  const session = { scene: sc, visit, step: 0, order: [] as any[] };
  for (let i = 0; i < visit.steps.length; i++) {
    applyAnswer(state, session, visit.steps[i].options.find(o => o.ok)!, visit.steps[i]);
  }
  const fin = applyFinish(state, sc, visit);
  ok(state.progress["market:v3"] === visit.steps.length, "第 3 轮通关进度记录");
  ok(state.unlockedVisits.market === 3 && fin.hasNext, "第 3 轮通关后解锁第 4 轮（unlocked=3，5 轮不再封顶）");
}

console.log("== 8. 存档服务（MemoryStorageAdapter） ==");
{
  const svc = new SaveService(new MemoryStorageAdapter());
  const state = freshState();
  state.progress["cafe:v1"] = 10;
  state.unlockedVisits.cafe = 1;
  svc.save({ ...state, vlogSeen: {}, vlogQuiz: {} });
  const loaded = svc.load();
  ok(loaded.progress["cafe:v1"] === 10, "进度读写一致");
  ok(loaded.unlockedVisits.cafe === 1, "解锁读写一致");
  const empty = new SaveService(new MemoryStorageAdapter()).load();
  ok(empty.collected && empty.progress && empty.vlogSeen, "空存档返回完整默认结构");
}

console.log("== 9. 场景卡状态文案 ==");
{
  const state = freshState();
  ok(sceneCardStatus(state, scene("cafe")).includes("🎬"), "新玩家咖啡店显示开始文案");
  state.progress["cafe:v1"] = 3;
  ok(sceneCardStatus(state, scene("cafe")).includes("📖"), "进行中显示继续文案");
}

console.log("");
console.log("结果: " + pass + " 通过 / " + fail + " 失败");
if (fail > 0) process.exit(1);
