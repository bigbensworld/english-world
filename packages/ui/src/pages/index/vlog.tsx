// vlog 播放器：卡片流 + emoji 舞台动画 + 逐词高亮 + 点击查词 + 慢速播放 + 听音 Quiz
import { useMemo, useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import { useGame, speak, stopSpeak, VLOG_DICT } from "../../gameStore";
import { pgLoadIndex, pgPlay, pgStop, pgPlayWord } from "../../pgAudio";
// 吉祥物状态：对齐原站 vlog.js 调用点
//   764 happy 1200（打开某一集）、906 happy 800（Quiz 答对）、733 idle（返回频道列表）
import { setMascotState } from "../../mascotStore";
import type { Vlog, VlogCard } from "@english-world/core";

// 词形还原查词（与原站 lookupWord 同款逻辑）
function lookupWord(raw: string): string | null {
  const w = raw.toLowerCase().replace(/[^a-z'-]/g, "");
  if (!w) return null;
  if ((VLOG_DICT as any)[w]) return (VLOG_DICT as any)[w];
  const tries = [
    w.replace(/'s$/, ""), w.replace(/'re$/, ""),
    w.replace(/s$/, ""), w.replace(/es$/, ""), w.replace(/ing$/, ""), w.replace(/ed$/, ""),
    w.replace(/d$/, ""), w.replace(/ies$/, "y"),
  ];
  for (const t of tries) {
    if (t && t.length > 2 && (VLOG_DICT as any)[t]) return (VLOG_DICT as any)[t] + "（原形 " + t + "）";
  }
  return null;
}

export default function VlogPage({ vlog, onBack }: { vlog: Vlog; onBack: () => void }) {
  const game = useGame();
  const [idx, setIdx] = useState(0);
  const [wordDef, setWordDef] = useState<{ word: string; def: string | null } | null>(null);
  const [hi, setHi] = useState(-1);
  const [replayBusy, setReplayBusy] = useState(false);
  const [mode, setMode] = useState<"cards" | "quiz">("cards");
  const card = vlog.cards[idx];
  const isFact = card.type === "fun-fact";

  // 打开某一集 → happy 1200（对齐原站 vlog.js:764 openVlog）；
  // 返回频道列表 → idle（对齐 vlog.js:733 openVlogChannel）
  // 预生成音频索引懒加载（失败静默降级 Web Speech）
  useEffect(() => {
    setMascotState("happy", 1200);
    pgLoadIndex();
    return () => setMascotState("idle");
  }, [vlog.id]);
  const backToHome = () => { setMascotState("idle"); stopSpeak(); pgStop(); onBack(); };

  // 统一播放入口：预生成音频优先（词序高亮），降级 Web Speech（charIndex → 词序）
  // 注意：索引是异步加载的——先等 pgLoadIndex() 完成再 pgPlay，否则首张卡永远走降级
  const playCard = (text: string, rate: number, cardIdx: number) => {
    const key = vlog.id + "_" + cardIdx;
    pgLoadIndex().then(() => {
      const ok = pgPlay(key, (wi) => setHi(wi));
      if (!ok) {
        speak(text, rate, (ci) => {
          const words = text.split(/\s+/);
          let pos = 0, wi = -1;
          for (let i = 0; i < words.length; i++) {
            if (ci >= pos && ci < pos + words[i].length) { wi = i; break; }
            pos += words[i].length + 1;
          }
          setHi(wi);
        });
      }
    });
  };

  // 卡片进入自动慢速播放 + 标记已看（预生成优先）
  useEffect(() => {
    if (mode !== "cards") return;
    setHi(-1);
    const t = setTimeout(() => playCard(card.en, 0.55, idx), 800);
    game.update((d) => { d.vlogSeen[vlog.id + ":" + idx] = true; });
    return () => { clearTimeout(t); stopSpeak(); pgStop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vlog.id, idx, mode]);

  const words = useMemo(() => card.en.split(/(\s+)/), [card.en]);
  const bareWords = useMemo(() => card.en.split(/\s+/), [card.en]);

  const onWordClick = (raw: string) => {
    const clean = raw.toLowerCase().replace(/[^a-z'-]/g, "");
    if (!clean) return;
    // 先停整句预生成 mp3；清除旧 TTS 后重新触发当前词
    pgStop();
    stopSpeak();
    if (!pgPlayWord(clean)) speak(clean, 0.6);
    setReplayBusy(false);
    setWordDef({ word: raw, def: lookupWord(raw) });
  };

  const seenAll = useMemo(
    () => vlog.cards.every((_c, i) => game.save.vlogSeen[vlog.id + ":" + i]),
    [game.save.vlogSeen, vlog.id],
  );
  const passed = !!game.save.vlogQuiz[vlog.id];

  return (
    <View className="page-pad">
      <View className="top-bar">
        <View className="btn" onClick={backToHome}>← 返回</View>
        <View className="tb-title">{vlog.emoji} {vlog.title} · {vlog.titleZh}</View>
      </View>

      {mode === "quiz" ? (
        <VlogQuiz vlog={vlog} onFinish={() => setMode("cards")} />
      ) : (
        <View>
          <View className="vlog-stage">
            <View className="vlog-count">{idx + 1} / {vlog.cards.length} {isFact ? "· 💡 冷知识" : ""}</View>
            <View className={`vlog-anim ${isFact ? "" : "anim-" + (card.anim || "idle")}`}>
              <View className="vlog-emoji">{card.emoji}</View>
            </View>
            <View className="vlog-en vlog-tappable">
              {words.map((w, i) =>
                /^\s+$/.test(w) ? w : (
                  <Text
                    key={i}
                    className={`v-word ${hi >= 0 && bareWords[hi] === w ? "active" : ""}`}
                    onClick={() => onWordClick(w)}
                  >{w}</Text>
                ),
              )}
            </View>
            <View className="vlog-zh">🇨🇳 {card.zh}</View>
            {card.words && card.words.length > 0 && (
              <View className="vlog-words">
                {card.words.map((w) => <View key={w} className="vlog-word-chip">🔑 {w}</View>)}
              </View>
            )}
            <View style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <View className="btn btn-primary" style={{ flex: 1 }} onClick={() => playCard(card.en, 0.55, idx)}>🔊 慢速播放</View>
              <View className="btn" style={{ flex: 1 }} onClick={() => speak(card.en, 0.85)}>🏃 常速</View>
            </View>
          </View>

          {/* 查词卡 */}
          {wordDef && (
            <View className="finish-panel" style={{ background: "#fff", color: "#2a2620", border: "1.5px solid #e8e2d8" }}>
              <View className="fp-title" style={{ color: "#2a2620" }}>🔤 {wordDef.word}</View>
              <View className="fp-sub" style={{ color: "#7d766b" }}>{wordDef.def || "📖 暂无内置释义，先听发音跟读吧"}</View>
              <View style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <View className="btn btn-primary" onClick={() => {
                  const clean = wordDef.word.toLowerCase().replace(/[^a-z'-]/g, "");
                  if (!clean || replayBusy) return;
                  setReplayBusy(true);
                  pgStop();
                  stopSpeak();
                  if (!pgPlayWord(clean, () => setReplayBusy(false))) {
                    speak(clean, 0.6, undefined, () => setReplayBusy(false));
                  }
                }}>{replayBusy ? "🔊 播放中…" : "🔊 再听一次"}</View>
                <View className="btn" onClick={() => setWordDef(null)}>关闭</View>
              </View>
            </View>
          )}

          {/* 导航 */}
          <View style={{ display: "flex", gap: 10, margin: "12px 16px" }}>
            {idx > 0 && <View className="btn" style={{ flex: 1 }} onClick={() => setIdx(idx - 1)}>← 上一张</View>}
            {idx < vlog.cards.length - 1 ? (
              <View className="btn btn-primary" style={{ flex: 1 }} onClick={() => setIdx(idx + 1)}>下一张 →</View>
            ) : seenAll ? (
              <View className="btn btn-primary" style={{ flex: 1 }} onClick={() => setMode("quiz")}>
                {passed ? "🎬 再闯一次 Quiz" : "🎬 去闯 Quiz！"}
              </View>
            ) : (
              <View className="btn btn-primary" style={{ flex: 1 }} onClick={() => setIdx(0)}>↺ 回到第一张</View>
            )}
          </View>
          <View style={{ textAlign: "center", fontSize: 12, color: passed ? "#3d8b5f" : "#7d766b", paddingBottom: 20 }}>
            {passed ? "🎓 本集已毕业 · 可重刷" : seenAll ? "✅ 已刷完 · 去闯 Quiz 毕业！" : "看完所有卡片解锁 Quiz"}
          </View>
        </View>
      )}
    </View>
  );
}

// ---------- 听音选图 Quiz（对齐原站逻辑） ----------
function VlogQuiz({ vlog, onFinish }: { vlog: Vlog; onFinish: () => void }) {
  const game = useGame();
  const [qIdx, setQIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<{ ok: boolean; target: VlogCard } | null>(null);
  const [done, setDone] = useState(false);
  const [quizKey, setQuizKey] = useState(0); // 重刷用

  const normalCards = useMemo(() => vlog.cards.filter((c) => !c.type), [vlog]);
  const quizCards = useMemo(() => {
    const pool = normalCards.slice().sort(() => Math.random() - 0.5);
    return pool.slice(0, Math.min(3, pool.length));
  }, [vlog.id, quizKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = quizCards.length;

  const target = quizCards[qIdx];
  const opts = useMemo(() => {
    if (!target) return [];
    const others = normalCards.filter((c) => c !== target).sort(() => Math.random() - 0.5).slice(0, 2);
    return [target, ...others].sort(() => Math.random() - 0.5);
  }, [qIdx, target]); // eslint-disable-line react-hooks/exhaustive-deps

  // 播放目标句（预生成优先：需找回卡片索引作 key；等索引就绪防竞态）
  useEffect(() => {
    if (!target || done) return;
    const cardIdx = vlog.cards.indexOf(target);
    const t = setTimeout(() => {
      pgLoadIndex().then(() => {
        if (!pgPlay(vlog.id + "_" + cardIdx, () => {})) speak(target.en, 0.55);
      });
    }, 900);
    return () => clearTimeout(t);
  }, [qIdx, target, done]);

  const pick = (c: VlogCard) => {
    if (picked) return;
    const ok = c === target;
    setPicked({ ok, target });
    // Quiz 答对 → happy 800（对齐原站 vlog.js:906；答错原站不切状态，保持一致）
    if (ok) { setCorrect((n) => n + 1); setMascotState("happy", 800); }
    setTimeout(() => {
      setPicked(null);
      if (qIdx + 1 >= total) setDone(true);
      else setQIdx(qIdx + 1);
    }, ok ? 1000 : 1600);
  };

  if (done) {
    const passed = correct >= total;
    if (passed) {
      // 毕业收集（只跑一次：利用 done 状态切换的时机）
      game.update((d) => {
        d.vlogQuiz[vlog.id] = true;
        vlog.cards.forEach((c) => {
          (c.words || []).forEach((w) => {
            const key = "vlog:" + vlog.id + ":" + w;
            if (!d.collected[key]) d.collected[key] = { en: w, zh: "", vlog: vlog.titleZh };
          });
        });
      });
    }
    return (
      <View className="vlog-stage">
        <View style={{ fontSize: 48, margin: "12px 0" }}>{passed ? "🎓" : "💪"}</View>
        <View className="fp-title" style={{ color: "#2a2620" }}>{passed ? "本集毕业！" : "差一点点！"}</View>
        <View className="fp-sub" style={{ color: "#7d766b", marginTop: 8 }}>
          {passed ? `答对 ${correct}/${total}，本集词汇已全部收进词汇册！` : `答对 ${correct}/${total}，再刷一遍卡片，回来复仇！`}
        </View>
        <View style={{ display: "flex", gap: 10, marginTop: 16 }}>
          {!passed && <View className="btn btn-primary" style={{ flex: 1 }} onClick={onFinish}>🔄 再刷卡片</View>}
          <View className="btn" style={{ flex: 1 }} onClick={onFinish}>📺 返回</View>
        </View>
      </View>
    );
  }

  return (
    <View className="vlog-stage">
      <View className="vlog-count">🎬 QUIZ TIME · {qIdx + 1}/{total}</View>
      <View style={{ fontSize: 17, fontWeight: 700, margin: "12px 0" }}>🔊 听声音——刚才是哪个动作？</View>
      <View className="btn btn-primary" style={{ maxWidth: 220, margin: "0 auto 14px" }} onClick={() => target && pgLoadIndex().then(() => { if (!pgPlay(vlog.id + "_" + vlog.cards.indexOf(target), () => {})) speak(target.en, 0.55); })}>🔊 再听一次</View>
      <View style={{ display: "flex", gap: 10 }}>
        {opts.map((c, i) => {
          const cls = picked ? (c === picked.target ? "option ok" : "option wrong") : "option";
          return (
            <View key={i} className={cls} style={{ flex: 1, textAlign: "center" }} onClick={() => pick(c)}>
              <View style={{ fontSize: 40 }}>{c.emoji}</View>
              <View style={{ fontSize: 12, marginTop: 6 }}>{c.words ? c.words[0] : ""}</View>
            </View>
          );
        })}
      </View>
      {picked && (
        <View style={{ marginTop: 12, fontSize: 13, color: picked.ok ? "#3d8b5f" : "#c2564b" }}>
          {picked.ok ? "✅ Right! " + (target.words ? "「" + target.words[0] + "」" : "") : "❌ It was " + (target.words ? "「" + target.words[0] + "」" : target.emoji)}
        </View>
      )}
    </View>
  );
}
