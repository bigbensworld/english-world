// 英语世界 · 共享内核类型定义（Phase 0）
// 与 data.js / vlogs.js 现有数据结构一一对应，三端（H5/小程序/App）共用。

export interface WordItem {
  id: string;
  en: string;
  zh: string;
  phon: string;
  emoji: string;
  sent: string;
}

export interface StepOption {
  text: string;
  zh?: string;
  tip?: string;
  ok: boolean;
}

export interface OrderAdd {
  emoji: string;
  label: string;
  wordId?: string;
  badge?: boolean;
}

export interface PhraseChunk {
  en: string;
  zh: string;
  note: string;
}

export interface VisitStep {
  npc?: string;
  npcZh?: string;
  npcLines?: string[];
  task: string;
  taskZh?: string;
  options: StepOption[];
  phrase?: PhraseChunk;
  adds?: OrderAdd[];
}

export interface SceneVisit {
  id: string;
  title: string;
  titleEn?: string;
  emoji: string;
  desc?: string;
  steps: VisitStep[];
  reward: { en: string; zh: string };
}

export interface Scene {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  iconId?: string;
  cover?: string;
  theme?: string;
  accent?: string;
  accentSoft?: string;
  deco?: string;
  deco2?: string;
  intro: string;
  orderLabel?: string;
  items: WordItem[];
  steps?: VisitStep[];
  visits?: SceneVisit[];
}

export interface VlogCard {
  emoji: string;
  anim?: string;
  type?: string;
  en: string;
  zh: string;
  words?: string[];
}

export interface Vlog {
  id: string;
  title: string;
  titleZh: string;
  emoji: string;
  desc?: string;
  linkedScene?: string;
  cards: VlogCard[];
}

// vlog 词条收集进词汇册时的条目（旧版为 true，兼容两种取值）
export type CollectedValue = true | VlogCollectedEntry;
export interface VlogCollectedEntry {
  en: string;
  zh: string;
  vlog: string;
}

// ---------- 语法闯关 + 发音辨音（grammar-data.js / sound-data.js） ----------

// 三题型：fix 修句师（三选一）/ factory 句子工厂（拼词卡）/ detective 语法侦探（点错词，bad:null 为无错陷阱题）
export interface GrammarFixOption { text: string; ok: boolean; tip?: string; }
export type GrammarQuestion =
  | { type: "fix"; task: string; options: GrammarFixOption[] }
  | { type: "factory"; task: string; answer: string; extra?: string[]; tip?: string }
  | { type: "detective"; sentence: string; bad: string | null; fix?: string; tip?: string };

export interface GrammarLevel {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  color?: string;
  qs: GrammarQuestion[];
}

// 最小对立对听音选词
export interface SoundPair { a: string; b: string; zhA: string; zhB: string; }
export interface SoundGroup {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  color?: string;
  pairs: SoundPair[];
  tip: string;
}

// 错题池条目：qKey = levelId + ":" + 题号；miss 累计答错、hit 连续答对（连对 2 次出池）
export interface WrongPoolEntry { lvId: string; miss: number; hit: number; }

// ---------- 游戏状态（对应 localStorage key englishWorldV2 的 JSON 结构） ----------

export interface GameState {
  collected: Record<string, CollectedValue>;
  phrases: Record<string, PhraseChunk>;
  npcLastLines: Record<string, string>;
  progress: Record<string, number>;
  unlockedVisits: Record<string, number>;
}

export interface VlogState {
  seenCards: Record<string, boolean>;
  quizPassed: Record<string, boolean>;
}

export interface SaveData extends GameState {
  vlogSeen: Record<string, boolean>;
  vlogQuiz: Record<string, boolean>;
  grammarDone: Record<string, boolean>;
  grammarBest: Record<string, number>;
  soundDone: Record<string, boolean>;
  grammarWrongPool: Record<string, WrongPoolEntry>;
}

// ---------- 剧情会话（UI 层持有，驱动进度） ----------

export interface AdventureSession {
  scene: Scene;
  visit: SceneVisit;
  step: number;
  lock: boolean;
  stepReady: boolean;
  order: OrderAdd[];
}

export interface FinishResult {
  hasNext: boolean;
  allDone: boolean;
  learnedCount: number;
  phraseCount: number;
  nextVisit?: SceneVisit;
}
