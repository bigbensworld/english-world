// 平台适配层接口定义（Phase 0）：存储与 TTS 由各端注入实现。
// 网页端：localStorage + Web Speech；小程序端：wx storage + 预生成音频；App：混合。

import type { SaveData } from "../types.ts";

export const SAVE_KEY = "englishWorldV2";

export interface StorageAdapter {
  read(): SaveData | null;
  write(data: SaveData): void;
}

// ---------- 网页端实现（localStorage） ----------

export class WebStorageAdapter implements StorageAdapter {
  read(): SaveData | null {
    try {
      const raw = (globalThis as any).localStorage?.getItem(SAVE_KEY);
      return raw ? (JSON.parse(raw) as SaveData) : null;
    } catch {
      return null;
    }
  }
  write(data: SaveData): void {
    try {
      (globalThis as any).localStorage?.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {
      /* 存储满等异常：静默失败，与现状一致 */
    }
  }
}

// 内存实现（测试/SSR 用）
export class MemoryStorageAdapter implements StorageAdapter {
  private _d: SaveData | null = null;
  read(): SaveData | null {
    return this._d;
  }
  write(data: SaveData): void {
    this._d = JSON.parse(JSON.stringify(data));
  }
}

// ---------- TTS 接口 ----------

export interface TTSAdapter {
  // 正常语速朗读（场景欢迎语、店员台词等）
  speak(text: string): void;
  // 慢速朗读（vlog、查词），返回 cancel 句柄
  speakSlow?(text: string): void;
  stop(): void;
}

// ---------- 存档服务（三端统一读写语义） ----------

import { sceneVisits } from "../engine/scene.ts";

export class SaveService {
  private storage: StorageAdapter;
  constructor(storage: StorageAdapter) {
    this.storage = storage;
  }

  load(): SaveData {
    const d = this.storage.read();
    return {
      collected: d?.collected || {},
      phrases: d?.phrases || {},
      npcLastLines: d?.npcLastLines || {},
      progress: d?.progress || {},
      unlockedVisits: d?.unlockedVisits || {},
      vlogSeen: (d as any)?.vlogSeen || {},
      vlogQuiz: (d as any)?.vlogQuiz || {},
    };
  }

  save(data: SaveData): void {
    this.storage.write(data);
  }
}
