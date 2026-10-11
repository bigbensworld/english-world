// Phase 2 预生成音频（mp3 + 词级时间戳）：H5 优先加载预生成，缺失时降级 speechSynthesis
// weapp 端无 fetch/Audio（音频属 Phase 2 后续小程序适配），直接走降级
export interface PgWord { w: string; s: number; e: number }
export interface PgEntry { vlog: string; card: number; dur: number; words: PgWord[] }

let PG_INDEX: Record<string, PgEntry> | null = null;
let pgLoading: Promise<Record<string, PgEntry> | null> | null = null;
let audioEl: HTMLAudioElement | null = null;

const IS_H5 = typeof process !== "undefined" && process.env && process.env.TARO_ENV === "h5";

export function pgLoadIndex(): Promise<Record<string, PgEntry> | null> {
  if (!IS_H5) return Promise.resolve(null);
  if (PG_INDEX) return Promise.resolve(PG_INDEX);
  if (pgLoading) return pgLoading;
  pgLoading = fetch("audio/vlog/index.json")
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { PG_INDEX = d || {}; pgLoading = null; return PG_INDEX; })
    .catch(() => { PG_INDEX = {}; pgLoading = null; return PG_INDEX; });
  return pgLoading;
}

export function pgStop() {
  if (audioEl) { try { audioEl.pause(); } catch (e) { /* ignore */ } audioEl = null; }
}

// 播放预生成句子；返回 false = 无预生成（调用方降级 speak()）
export function pgPlay(key: string, onWordIndex: (i: number) => void, onEnd?: () => void): boolean {
  if (!IS_H5 || !PG_INDEX || !PG_INDEX[key]) return false;
  const entry = PG_INDEX[key];
  pgStop();
  audioEl = new Audio("audio/vlog/" + key + ".mp3");
  audioEl.play().catch(() => { if (onEnd) onEnd(); });
  let raf = 0;
  const tick = () => {
    if (!audioEl) return;
    const t = audioEl.currentTime;
    let cur = -1;
    for (let i = 0; i < entry.words.length; i++) {
      if (t >= entry.words[i].s - 0.02) cur = i; else break;
    }
    onWordIndex(cur);
    if (!audioEl.ended && !audioEl.paused) raf = requestAnimationFrame(tick);
  };
  audioEl.addEventListener("play", () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
  audioEl.addEventListener("ended", () => { if (raf) cancelAnimationFrame(raf); if (onEnd) onEnd(); });
  return true;
}
