// 词汇册：场景词汇分区 + vlog 词条分区 + 常用表达
import { useMemo } from "react";
import { View, ScrollView } from "@tarojs/components";
import { useGame, speak, SCENES, VLOGS, VLOG_DICT } from "../../gameStore";

export default function BookPage({ onBack }: { onBack: () => void }) {
  const game = useGame();
  const collected = game.save.collected;
  const phrases = game.save.phrases;

  const sceneEntries = useMemo(() => {
    const out: { scene: string; emoji: string; items: { en: string; zh: string; id: string }[] }[] = [];
    for (const sc of SCENES) {
      const items = sc.items.filter((it) => collected[sc.id + ":" + it.id]);
      if (items.length) out.push({ scene: sc.name, emoji: sc.emoji, items: items.map((it) => ({ en: it.en, zh: it.zh, id: it.id })) });
    }
    return out;
  }, [collected]);

  const vlogEntries = useMemo(() => {
    return Object.entries(collected)
      .filter(([k, v]) => k.startsWith("vlog:") && typeof v === "object")
      .map(([k, v]) => ({ key: k, ...(v as any) })) as { key: string; en: string; zh: string; vlog: string }[];
  }, [collected]);

  const phraseList = useMemo(() => Object.values(phrases), [phrases]);

  return (
    <View className="page-pad">
      <View className="top-bar">
        <View className="btn" onClick={onBack}>← 返回</View>
        <View className="tb-title">📖 我的词汇册</View>
      </View>
      <View className="hud">
        <View className="hud-chip"><b>{Object.keys(collected).length}</b>词汇</View>
        <View className="hud-chip"><b>{phraseList.length}</b>常用表达</View>
      </View>

      {Object.keys(collected).length === 0 && (
        <View className="finish-panel">
          <View className="fp-title">词汇册还是空的</View>
          <View className="fp-sub">去场景冒险答题收集词汇、去慢速生活点词查义吧！</View>
        </View>
      )}

      <ScrollView scrollY style={{ maxHeight: "calc(100vh - 210px)" }}>
        {phraseList.length > 0 && (
          <View className="book-section">
            <View className="book-section-title">💬 常用表达（{phraseList.length}）</View>
            <View className="book-grid">
              {phraseList.map((p, i) => (
                <View key={i} className="book-chip"><b>{p.en}</b>{p.zh}</View>
              ))}
            </View>
          </View>
        )}
        {sceneEntries.map(({ scene, emoji, items }) => (
          <View className="book-section" key={scene}>
            <View className="book-section-title">{emoji} {scene}（{items.length}）</View>
            <View className="book-grid">
              {items.map((it) => (
                <View key={it.id} className="book-chip" onClick={() => speak(it.en)}>
                  <b>{it.en}</b>{it.zh}
                </View>
              ))}
            </View>
          </View>
        ))}
        {vlogEntries.length > 0 && (
          <View className="book-section">
            <View className="book-section-title">📺 慢速生活（{vlogEntries.length}）</View>
            <View className="book-grid">
              {vlogEntries.map((e) => (
                <View key={e.key} className="book-chip" onClick={() => speak(e.en)}>
                  <b>{e.en}</b>{e.zh || (VLOG_DICT as any)[e.en.toLowerCase()] || e.vlog}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
