// vlog 播放器：卡片流 + 逐词高亮 + 点击查词 + 慢速播放
import { useMemo, useState, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import { useGame, speak, stopSpeak, VLOG_DICT } from "../../gameStore";
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
  const [hi, setHi] = useState(-1); // 高亮词索引
  const card = vlog.cards[idx];
  const isFact = card.type === "fun-fact";

  // 卡片进入自动慢速播放 + 标记已看
  useEffect(() => {
    setHi(-1);
    const t = setTimeout(() => speak(card.en, 0.55, (ci) => {
      // 逐词高亮：按 charIndex 找词索引
      const words = card.en.split(/\s+/);
      let pos = 0, wi = -1;
      for (let i = 0; i < words.length; i++) {
        if (ci >= pos && ci < pos + words[i].length) { wi = i; break; }
        pos += words[i].length + 1;
      }
      setHi(wi);
    }), 800);
    game.update((d) => { d.vlogSeen[vlog.id + ":" + idx] = true; });
    return () => { clearTimeout(t); stopSpeak(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vlog.id, idx]);

  const words = useMemo(() => card.en.split(/(\s+)/), [card.en]);
  const bareWords = useMemo(() => card.en.split(/\s+/), [card.en]);

  const onWordClick = (raw: string) => {
    const clean = raw.toLowerCase().replace(/[^a-z'-]/g, "");
    if (!clean) return;
    speak(clean, 0.6);
    setWordDef({ word: raw, def: lookupWord(raw) });
  };

  const collectWords = () => {
    // 毕业收集：观看最后一卡时把 words 收进词汇册（与原站一致的键格式）
    game.update((d) => {
      (card.words || []).forEach((w) => {
        d.collected["vlog:" + vlog.id + ":" + w] = { en: w, zh: (VLOG_DICT as any)[w.toLowerCase()] || "", vlog: vlog.titleZh };
      });
    });
  };

  const seenAll = useMemo(
    () => vlog.cards.every((_c, i) => game.save.vlogSeen[vlog.id + ":" + i]),
    [game.save.vlogSeen, vlog.id],
  );

  return (
    <View className="page-pad">
      <View className="top-bar">
        <View className="btn" onClick={() => { stopSpeak(); onBack(); }}>← 返回</View>
        <View className="tb-title">{vlog.emoji} {vlog.title} · {vlog.titleZh}</View>
      </View>

      <View className="vlog-stage">
        <View className="vlog-count">{idx + 1} / {vlog.cards.length} {isFact ? "· 💡 冷知识" : ""}</View>
        <View className="vlog-emoji" style={{ marginTop: 10 }}>{card.emoji}</View>
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
          <View className="btn btn-primary" style={{ flex: 1 }} onClick={() => speak(card.en, 0.55, (ci) => setHi(ci))}>🔊 慢速播放</View>
          <View className="btn" style={{ flex: 1 }} onClick={() => speak(card.en, 0.85)}>🏃 常速</View>
        </View>
      </View>

      {/* 查词卡 */}
      {wordDef && (
        <View className="finish-panel" style={{ background: "#fff", color: "#2a2620", border: "1.5px solid #e8e2d8" }}>
          <View className="fp-title" style={{ color: "#2a2620" }}>🔤 {wordDef.word}</View>
          <View className="fp-sub" style={{ color: "#7d766b" }}>{wordDef.def || "📖 暂无内置释义，先听发音跟读吧"}</View>
          <View style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <View className="btn btn-primary" onClick={() => speak(wordDef.word.toLowerCase(), 0.6)}>🔊 再听一次</View>
            <View className="btn" onClick={() => setWordDef(null)}>关闭</View>
          </View>
        </View>
      )}

      {/* 导航 */}
      <View style={{ display: "flex", gap: 10, margin: "12px 16px" }}>
        {idx > 0 && <View className="btn" style={{ flex: 1 }} onClick={() => setIdx(idx - 1)}>← 上一张</View>}
        {idx < vlog.cards.length - 1 ? (
          <View className="btn btn-primary" style={{ flex: 1 }} onClick={() => setIdx(idx + 1)}>下一张 →</View>
        ) : (
          <View className="btn btn-primary" style={{ flex: 1 }} onClick={collectWords}>🎓 收集本集词汇</View>
        )}
      </View>
      {seenAll && <View style={{ textAlign: "center", fontSize: 12, color: "#3d8b5f" }}>✅ 本集已看完</View>}
    </View>
  );
}
