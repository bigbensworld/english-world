// 全局状态：core 引擎 + 存档服务的 React 封装（H5 端注入 Web 适配器）
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SCENES, VLOGS, VLOG_DICT,
  WebStorageAdapter, SaveService, SAVE_KEY,
  sceneVisits, visitKey, unlockedVisitIndex, finishedVisits,
  pickNpcLine, applyAnswer, applyFinish, resumeOrder, sceneCardStatus,
} from "@english-world/core";
import type {
  Scene, SceneVisit, VisitStep, GameState, SaveData, OrderAdd,
} from "@english-world/core";

export function emptySave(): SaveData {
  return { collected: {}, phrases: {}, npcLastLines: {}, progress: {}, unlockedVisits: {}, vlogSeen: {}, vlogQuiz: {} };
}

// ---------- TTS（H5：Web Speech） ----------
let ttsTimer: ReturnType<typeof setTimeout> | null = null;
export function speak(text: string, rate = 1, onWord?: (charIndex: number) => void, onEnd?: () => void) {
  const synth = (globalThis as any).speechSynthesis;
  if (!synth) { onEnd?.(); return; }
  try { synth.cancel(); } catch { /* noop */ }
  // Chrome cancel 后立即 speak 会被吞：延迟 150ms + resume（与原站一致）
  ttsTimer = setTimeout(() => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = rate;
    if (onWord) u.onboundary = (e: any) => onWord(e.charIndex ?? 0);
    if (onEnd) u.onend = onEnd;
    synth.speak(u);
    try { synth.resume(); } catch { /* noop */ }
  }, 150);
}
export function stopSpeak() {
  if (ttsTimer) { clearTimeout(ttsTimer); ttsTimer = null; }
  try { (globalThis as any).speechSynthesis?.cancel(); } catch { /* noop */ }
}

// ---------- 存档 ----------
const saver = new SaveService(new WebStorageAdapter());

export interface GameCtx {
  save: SaveData;
  update(fn: (draft: SaveData) => void): void;
  stats: { words: number; phrases: number; scenes: number };
}

export function useGame(): GameCtx {
  const [save, setSave] = useState<SaveData>(() => saver.load());
  const persist = useCallback((d: SaveData) => { saver.save(d); setSave({ ...d }); }, []);
  const update = useCallback((fn: (draft: SaveData) => void) => {
    setSave((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as SaveData;
      fn(next);
      saver.save(next);
      return next;
    });
  }, []);
  const stats = useMemo(() => {
    const words = Object.keys(save.collected).length;
    const phrases = Object.keys(save.phrases).length;
    const scenes = SCENES.filter((s) => finishedVisits(save, s) >= sceneVisits(s).length).length;
    return { words, phrases, scenes };
  }, [save]);
  return { save, update, stats };
}

// ---------- 场景会话 hook ----------
export interface AdvState {
  scene: Scene;
  visit: SceneVisit;
  step: number;
  npcLine: string;
  order: OrderAdd[];
  phase: "typing" | "npc" | "task" | "finish" | "retry";
  lastAnswer?: { text: string; ok: boolean; tip?: string; correctText: string; correctTip?: string };
}

export function useAdventure(scene: Scene, visit: SceneVisit, save: SaveData, update: GameCtx["update"]) {
  const steps = visit.steps;
  const vk = visitKey(scene, visit);
  const [adv, setAdv] = useState<AdvState>(() => {
    const saved = save.progress[vk] || 0;
    const step = saved >= steps.length ? 0 : saved; // 已完成轮次重玩从 0 开始
    return {
      scene, visit, step, npcLine: "", order: resumeOrder(visit, step), phase: "typing", lastAnswer: undefined,
    };
  });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const addTimer = (t: ReturnType<typeof setTimeout>) => { timers.current.push(t); };
  useEffect(() => () => { timers.current.forEach(clearTimeout); timers.current = []; stopSpeak(); }, []);

  // 打字 → 台词 → 任务的节奏链（对齐原站：900ms 打字 / +600ms 任务 / 答对 2400ms 下一步）
  const runStepFlow = useCallback((st: AdvState) => {
    setAdv({ ...st, phase: "typing", npcLine: "" });
    addTimer(setTimeout(() => {
      const line = pickNpcLine(save as GameState, scene, visit, st.step, steps[st.step]);
      setAdv((cur) => ({ ...cur, phase: "npc", npcLine: line }));
      speak(line, 1);
      addTimer(setTimeout(() => {
        setAdv((cur) => ({ ...cur, phase: "task" }));
      }, 600));
    }, 900));
  }, [scene, visit, steps, save]);

  useEffect(() => {
    // 初始 / 换步驱动（skip finish）
    if (adv.phase === "typing" && adv.step < steps.length) {
      // 已由 runStepFlow 或初始化触发；此处只在挂载时跑第一步
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => { runStepFlow(adv); }, [adv, runStepFlow]);

  const choose = useCallback((optIdx: number) => {
    if (adv.phase !== "task") return;
    const step: VisitStep = steps[adv.step];
    const opt = step.options[optIdx];
    if (!opt.ok) {
      const correct = step.options.find((o) => o.ok)!;
      setAdv((cur) => ({
        ...cur,
        phase: "retry",
        lastAnswer: { text: opt.text, ok: false, tip: opt.tip, correctText: correct.text, correctTip: correct.tip },
      }));
      speak(correct.text, 1);
      return;
    }
    // 答对：推进
    const session = { scene, visit, step: adv.step, order: adv.order };
    const result = applyAnswer(save as GameState, session, opt, step);
    update((d) => {
      d.progress[result.progressKey] = result.newStep;
      if (result.collectedPhrase) d.phrases[vk + ":" + (result.newStep - 1)] = result.collectedPhrase;
      result.collectedWordIds.forEach((id) => { d.collected[id] = true; });
      d.npcLastLines = { ...save.npcLastLines };
    });
    speak(opt.text, 1);
    const isLast = result.newStep >= steps.length;
    const nextState: AdvState = {
      ...adv, step: result.newStep, order: session.order, lastAnswer: undefined,
      phase: isLast ? "npc" : "typing",
    };
    if (isLast) {
      addTimer(setTimeout(() => setAdv((cur) => ({ ...cur, phase: "finish" })), 1200));
    } else {
      addTimer(setTimeout(() => runStepFlow(nextState), 2400));
    }
    setAdv(nextState);
  }, [adv, steps, scene, visit, save, update, vk, runStepFlow]);

  const finishInfo = useMemo(() => {
    if (adv.phase !== "finish") return null;
    update((d) => { /* applyFinish 在渲染外调用 */ });
    return null;
  }, [adv.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // 完成结算（在 choose 里最后一步后手动调用）
  const settle = useCallback(() => {
    return applyFinish(save as GameState, scene, visit);
  }, [save, scene, visit]);

  const restart = useCallback(() => {
    update((d) => { d.progress[vk] = 0; });
    setAdv({ scene, visit, step: 0, npcLine: "", order: [], phase: "typing", lastAnswer: undefined });
    runStepFlow({ scene, visit, step: 0, npcLine: "", order: [], phase: "typing", lastAnswer: undefined });
  }, [scene, visit, vk, update, runStepFlow]);

  return { adv, start, choose, restart, settle, runStepFlow };
}

export { SCENES, VLOGS, VLOG_DICT, SAVE_KEY, sceneVisits, visitKey, unlockedVisitIndex, finishedVisits, sceneCardStatus, pickNpcLine, applyAnswer, applyFinish, resumeOrder };
