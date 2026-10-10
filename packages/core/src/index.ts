// 英语世界 · 共享内核出口
// 数据 + 类型 + 引擎 + 平台接口。UI 层（H5/小程序/App）只 import 这里。

export { SCENES, VLOGS, VLOG_DICT, findScene, findVlog } from "./data/index.ts";
export {
  sceneVisits,
  visitKey,
  unlockedVisitIndex,
  finishedVisits,
  pickNpcLine,
  applyAnswer,
  applyFinish,
  resumeOrder,
  sceneCardStatus,
} from "./engine/scene.ts";
export type { AnswerResult } from "./engine/scene.ts";
export {
  SAVE_KEY,
  WebStorageAdapter,
  MemoryStorageAdapter,
  SaveService,
} from "./platform/adapters.ts";
export type { StorageAdapter, TTSAdapter } from "./platform/adapters.ts";
export type {
  WordItem,
  StepOption,
  OrderAdd,
  PhraseChunk,
  VisitStep,
  SceneVisit,
  Scene,
  VlogCard,
  Vlog,
  CollectedValue,
  VlogCollectedEntry,
  GameState,
  VlogState,
  SaveData,
  AdventureSession,
  FinishResult,
} from "./types.ts";
