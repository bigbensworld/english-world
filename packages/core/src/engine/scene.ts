// 场景访问层 + 台词随机 + 进度/收集 逻辑（从 game.js 平移，去 DOM 化）
// 语义与现有实现完全一致：多轮 visits 包装单轮 steps，旧存档键兼容。

import type { GameState, Scene, SceneVisit, PhraseChunk } from "../types.ts";

// ---------- 多轮光顾访问层 ----------

export function sceneVisits(sc: Scene): SceneVisit[] {
  if (sc.visits && sc.visits.length) return sc.visits;
  return [
    {
      id: "v1",
      title: "场景剧情 · " + sc.name,
      titleEn: sc.nameEn,
      emoji: sc.emoji,
      desc: sc.intro,
      steps: sc.steps || [],
      reward: (sc as any).reward,
    },
  ];
}

export function visitKey(sc: Scene, visit: SceneVisit): string {
  return sc.visits && sc.visits.length > 1 ? sc.id + ":" + visit.id : sc.id;
}

export function unlockedVisitIndex(state: GameState, sc: Scene): number {
  const visits = sceneVisits(sc);
  const idx = state.unlockedVisits[sc.id] || 0;
  return Math.max(0, Math.min(idx, visits.length - 1));
}

export function finishedVisits(state: GameState, sc: Scene): number {
  const visits = sceneVisits(sc);
  let n = 0;
  for (const v of visits) {
    if ((state.progress[visitKey(sc, v)] || 0) >= v.steps.length) n++;
  }
  return n;
}

// ---------- 台词随机（排除上次使用的变体） ----------

export function pickNpcLine(
  state: GameState,
  sc: Scene,
  visit: SceneVisit,
  stepIndex: number,
  step: { npc?: string; npcLines?: string[] },
  rand: () => number = Math.random,
): string {
  const lines = step.npcLines && step.npcLines.length ? step.npcLines : step.npc ? [step.npc] : [];
  if (!lines.length) return "";
  const lineKey = visitKey(sc, visit) + ":" + stepIndex;
  const previousLine = state.npcLastLines[lineKey];
  const candidates = lines.length > 1 ? lines.filter((l) => l !== previousLine) : lines;
  const picked = candidates[Math.floor(rand() * candidates.length)];
  state.npcLastLines[lineKey] = picked;
  return picked;
}

// ---------- 答题推进（纯状态变更，UI 只需监听 state 渲染） ----------

export interface AnswerResult {
  correct: boolean;
  newStep: number;
  progressKey: string;
  collectedPhrase?: PhraseChunk;
  orderAdds: import("../types.js").OrderAdd[];
  collectedWordIds: string[];
}

export function applyAnswer(
  state: GameState,
  session: { scene: Scene; visit: SceneVisit; step: number; order: import("../types.js").OrderAdd[] },
  opt: { text: string; ok: boolean },
  step: import("../types.js").VisitStep,
): AnswerResult {
  const sc = session.scene;
  const vk = visitKey(sc, session.visit);

  if (!opt.ok) {
    return { correct: false, newStep: session.step, progressKey: vk, orderAdds: [], collectedWordIds: [] };
  }

  const newStep = session.step + 1;
  state.progress[vk] = newStep;
  session.step = newStep;

  let collectedPhrase: PhraseChunk | undefined;
  if (step.phrase) {
    state.phrases[vk + ":" + (newStep - 1)] = step.phrase;
    collectedPhrase = step.phrase;
  }

  const orderAdds = step.adds || [];
  if (orderAdds.length) {
    session.order = session.order.concat(orderAdds);
  }
  const collectedWordIds: string[] = [];
  orderAdds.forEach((item) => {
    if (!item.wordId) return;
    const word = sc.items.find((it) => it.id === item.wordId);
    if (word) {
      state.collected[sc.id + ":" + word.id] = true;
      collectedWordIds.push(sc.id + ":" + word.id);
    }
  });

  return { correct: true, newStep, progressKey: vk, collectedPhrase, orderAdds, collectedWordIds };
}

// ---------- 完成结算（解锁下一轮 + 奖励词收集） ----------

export function applyFinish(
  state: GameState,
  sc: Scene,
  visit: SceneVisit,
): { hasNext: boolean; allDone: boolean; unlockedNext: boolean; learnedCount: number; phraseCount: number; nextVisit?: SceneVisit } {
  const visits = sceneVisits(sc);

  if (visit.reward && visit.reward.en) {
    const it = sc.items.find((i) => i.en === visit.reward.en);
    if (it) state.collected[sc.id + ":" + it.id] = true;
  }

  const vk = visitKey(sc, visit);
  const learnedCount = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
  const phraseCount = visit.steps.filter((_st, i) => state.phrases[vk + ":" + i]).length;

  const curIdx = visits.findIndex((v) => v.id === visit.id);
  const hasNext = curIdx >= 0 && curIdx < visits.length - 1;
  let unlockedNext = false;
  if (hasNext && (state.unlockedVisits[sc.id] || 0) <= curIdx) {
    state.unlockedVisits[sc.id] = curIdx + 1;
    unlockedNext = true;
  }
  const allDone = finishedVisits(state, sc) >= visits.length;

  return { hasNext, allDone, unlockedNext, learnedCount, phraseCount, nextVisit: hasNext ? visits[curIdx + 1] : undefined };
}

// ---------- 续玩恢复（订单托盘） ----------

export function resumeOrder(visit: SceneVisit, savedStep: number): import("../types.js").OrderAdd[] {
  return visit.steps.slice(0, savedStep).flatMap((step) => step.adds || []);
}

// ---------- 场景卡状态文案（数据驱动，UI 直接用） ----------

export function sceneCardStatus(state: GameState, sc: Scene): string {
  const visits = sceneVisits(sc);
  const multi = visits.length > 1;
  const finished = finishedVisits(state, sc);
  const allDone = finished >= visits.length;
  const unlockedIdx = unlockedVisitIndex(state, sc);
  const curVisit = visits[unlockedIdx];
  const curDone = state.progress[visitKey(sc, curVisit)] || 0;
  const curFinished = curDone >= curVisit.steps.length;
  const learned = sc.items.filter((it) => state.collected[sc.id + ":" + it.id]).length;
  if (multi) {
    if (allDone) return `🏆 ${visits.length} 次光顾全部完成 · 可重玩`;
    if (curFinished) return `✨ 已完成 ${finished}/${visits.length} 轮 · 下一轮已解锁`;
    if (curDone > 0) return `📖 ${visits[unlockedIdx].emoji} ${visits[unlockedIdx].title} ${curDone}/${curVisit.steps.length} 步`;
    return `🎬 ${visits[unlockedIdx].emoji} ${visits[unlockedIdx].title}`;
  }
  if (allDone) return "🏆 剧情已完成 · 可重玩";
  if (curDone > 0) return `📖 剧情进行中 ${curDone}/${curVisit.steps.length} 步`;
  return `🎮 剧情 ${curVisit.steps.length} 步 · 已学 ${learned}/${sc.items.length} 词`;
}
