// 数据出口：现阶段直接复用从 data.js / vlogs.js / vlog.js 提取的 _raw.js（内容零变化），
// 后续内容生产管线就绪后可切换为 JSON 生成。
export { SCENES, VLOGS, VLOG_DICT } from "./_raw.js";

import { SCENES, VLOGS } from "./_raw.js";
import type { Scene, Vlog } from "../types.ts";

export function findScene(id: string): Scene | undefined {
  return SCENES.find((s) => s.id === id);
}

export function findVlog(id: string): Vlog | undefined {
  return VLOGS.find((v) => v.id === id);
}
