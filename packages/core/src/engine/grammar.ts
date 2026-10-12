// 语法错题池引擎（纯逻辑，三端共用）
// 规则与网站版 grammar.js 完全一致：
//   答错入池（miss+1 / hit 清零）；答对 hit+1；连对 2 次出池。
//   drill 序列按 miss 降序（错得最多的先来），跨关混合。

import { GRAMMAR_LEVELS } from "../data/index.ts";
import type { WrongPoolEntry, GrammarLevel, GrammarQuestion } from "../types.ts";

export type WrongPool = Record<string, WrongPoolEntry>;

// 在关卡内/drill 内答题后记账：qKey = lvId + ":" + qIdx
export function recordWrongResult(
  pool: WrongPool,
  lvId: string,
  qIdx: number,
  ok: boolean,
): WrongPool {
  const key = lvId + ":" + qIdx;
  const entry = pool[key];
  const next: WrongPool = { ...pool };
  if (ok) {
    if (!entry) return pool; // 从没错过：不入池
    const hit = (entry.hit || 0) + 1;
    if (hit >= 2) delete next[key]; // 连对 2 次：出池
    else next[key] = { ...entry, hit };
  } else {
    next[key] = { lvId, miss: (entry ? entry.miss : 0) + 1, hit: 0 };
  }
  return next;
}

export function wrongPoolCount(pool: WrongPool): number {
  return Object.keys(pool).length;
}

export interface DrillItem {
  key: string;
  lv: GrammarLevel;
  q: GrammarQuestion;
  qIdx: number;
}

// 构造错题重刷序列：按 miss 降序，跨关混合；关卡数据变动后找不到的题自动跳过
export function buildWrongPoolDrill(pool: WrongPool): DrillItem[] {
  return Object.entries(pool)
    .map(([key, e]) => ({ key, ...e }))
    .sort((a, b) => b.miss - a.miss)
    .map((e) => {
      const lv = GRAMMAR_LEVELS.find((l) => l.id === e.lvId);
      const qIdx = Number(e.key.split(":")[1]);
      return { key: e.key, lv, q: lv ? lv.qs[qIdx] : undefined, qIdx };
    })
    .filter((x): x is DrillItem => !!x.lv && !!x.q);
}
