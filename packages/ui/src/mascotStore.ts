// 吉祥物（悬浮球）状态单例：对齐原站 game.js 的 setMascotState / initMascot。
// 原站把 .mascot 直接 append 到 document.body（全局单例、跨"页面"常驻）；
// Taro 无全局 DOM，故用模块级 store + 常驻组件复刻同一套语义：
//   setMascotState(next, duration) —— duration>0 且非 idle 时自动回落 idle
//   pokeMascot()                  —— 点击：happy 650ms + 随机台词气泡 2600ms + TTS
import { useSyncExternalStore } from "react";
import { speak } from "./gameStore";

export type MascotState = "idle" | "happy" | "thinking" | "sad";

// 与 game.js MASCOT_LINES 逐字一致
export const MASCOT_LINES = [
  "Tap anything you like!",
  "You can do it!",
  "New words = new powers!",
  "Hello, my friend!",
  "Take it step by step!",
];

const ALLOWED: MascotState[] = ["idle", "happy", "thinking", "sad"];

type Listener = () => void;
type Snapshot = { state: MascotState; bubble: string };

let state: MascotState = "idle";
let bubble = "";
let snapshot: Snapshot = { state, bubble };
let stateTimer: ReturnType<typeof setTimeout> | null = null;
let bubbleTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<Listener>();

function emit() {
  snapshot = { state, bubble };
  listeners.forEach((l) => l());
}

export function subscribeMascot(l: Listener): () => void {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

// useSyncExternalStore 要求 getSnapshot 返回稳定引用（仅在 emit 时换新对象）
export function getMascotSnapshot(): Snapshot {
  return snapshot;
}

/** 切换吉祥物状态；duration > 0 且非 idle 时到点自动回落到 idle（对齐原站） */
export function setMascotState(next: MascotState, duration = 0) {
  const n = ALLOWED.includes(next) ? next : "idle";
  if (stateTimer) { clearTimeout(stateTimer); stateTimer = null; }
  state = n;
  emit();
  if (duration > 0 && n !== "idle") {
    stateTimer = setTimeout(() => { stateTimer = null; setMascotState("idle"); }, duration);
  }
}

/** 点击悬浮球：happy 650ms + 随机台词气泡 + 朗读（对齐原站 m.onclick） */
export function pokeMascot() {
  setMascotState("happy", 650);
  const line = MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)];
  speak(line);
  bubble = line;
  emit();
  if (bubbleTimer) clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => { bubbleTimer = null; bubble = ""; emit(); }, 2600);
}

/** React 订阅入口 */
export function useMascot(): Snapshot {
  return useSyncExternalStore(subscribeMascot, getMascotSnapshot, getMascotSnapshot);
}

// 验收调试句柄：原站 setMascotState 本就是全局函数（任何代码可调），此处等价暴露，
// 供 CDP 端到端验证直接驱动状态机（见 scripts/verify_mascot.py）。
try { (globalThis as any).__ewSetMascot = setMascotState; } catch { /* noop */ }