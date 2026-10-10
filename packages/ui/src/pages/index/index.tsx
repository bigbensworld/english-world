// 首页：双 Tab（慢速生活 / 场景冒险）+ 场景地图 + vlog 列表
import { useState, useMemo } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import { SCENES, VLOGS, sceneCardStatus, finishedVisits, sceneVisits } from "../../gameStore";
import type { Scene, Vlog } from "@english-world/core";
import ScenePage from "./scene";
import VlogPage from "./vlog";
import BookPage from "./book";

const SCENE_GROUPS = [
  { id: "daily", title: "🏠 日常高频", sub: "Daily Life · 天天都用得上的英语", scenes: ["cafe", "restaurant", "market", "transport", "barber", "gym", "shopping", "vet"] },
  { id: "travel", title: "✈️ 旅行出行", sub: "Travel · 机场酒店一手搞定", scenes: ["airport", "hotel"] },
  { id: "emergency", title: "🚑 应急保障", sub: "Essentials · 医院银行邮局关键时刻", scenes: ["hospital", "bank", "postoffice"] },
  { id: "campus", title: "🎓 校园生活", sub: "Campus · 图书馆学校新生必备", scenes: ["library", "school"] },
];

type View2 =
  | { kind: "home" }
  | { kind: "scene"; scene: Scene }
  | { kind: "vlog"; vlog: Vlog }
  | { kind: "book" };

export default function Index() {
  const [tab, setTab] = useState<"vlog" | "scenes">("vlog");
  const [view, setView] = useState<View2>({ kind: "home" });

  const groups = useMemo(() => {
    const grouped = new Set(SCENE_GROUPS.flatMap((g) => g.scenes));
    const rest = SCENES.filter((s) => !grouped.has(s.id)).map((s) => s.id);
    const gs = SCENE_GROUPS.map((g) => ({ ...g, list: g.scenes.map((id) => SCENES.find((s) => s.id === id)!).filter(Boolean) }));
    if (rest.length) gs.push({ id: "more", title: "🧭 更多场景", sub: "More", list: rest.map((id) => SCENES.find((s) => s.id === id)!).filter(Boolean) } as any);
    return gs;
  }, []);

  if (view.kind === "scene") return <ScenePage scene={view.scene} onBack={() => setView({ kind: "home" })} onOpenBook={() => setView({ kind: "book" })} />;
  if (view.kind === "vlog") return <VlogPage vlog={view.vlog} onBack={() => setView({ kind: "home" })} />;
  if (view.kind === "book") return <BookPage onBack={() => setView({ kind: "home" })} />;

  return (
    <View className="page-pad">
      {/* HUD */}
      <View className="hud">
        <View className="hud-chip"><b>{SCENES.length}</b>场景</View>
        <View className="hud-chip" onClick={() => setView({ kind: "book" })}><b>📖</b>词汇册</View>
        <View className="hud-chip"><b>{VLOGS.length}</b>集 vlog</View>
      </View>

      {/* 双 Tab */}
      <View className="home-tabs">
        <View className={`home-tab ${tab === "vlog" ? "active" : ""}`} onClick={() => setTab("vlog")}>📺 慢速生活</View>
        <View className={`home-tab ${tab === "scenes" ? "active" : ""}`} onClick={() => setTab("scenes")}>🗺️ 场景冒险</View>
      </View>

      {tab === "vlog" ? (
        <View>
          <View className="value-prop">
            <View className="vp-title">不敢开口？先从你每天都会遇到的英语开始</View>
            <View className="vp-sub">看慢速生活短片，听懂最日常的英语。零门槛，点词就能查。</View>
          </View>
          <View className="path-steps">
            <View className="path-step"><b>① 先听懂</b>慢速 vlog</View>
            <View className="path-step"><b>② 再开口</b>场景对话</View>
            <View className="path-step"><b>③ 反复练</b>词汇册</View>
          </View>
          <ScrollView className="vlog-list" scrollY style={{ maxHeight: "62vh" }}>
            {VLOGS.map((v) => (
              <View key={v.id} className="vlog-set" onClick={() => setView({ kind: "vlog", vlog: v })}>
                <View className="vs-emoji">{v.emoji}</View>
                <View>
                  <View className="vs-title">{v.title} · {v.titleZh}</View>
                  <View className="vs-desc">{v.desc} ▶ {v.cards.length} 张卡片</View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View className="scene-groups">
          {groups.map((g) => (
            <View key={g.id}>
              <View className="scene-group-head">
                <View className="scene-group-title">{g.title}</View>
                <View className="scene-group-sub">{g.sub} · {g.list.length} 个场景</View>
              </View>
              <View className="scene-grid">
                {g.list.map((sc) => (
                  <View key={sc.id} className="scene-card" onClick={() => setView({ kind: "scene", scene: sc })}>
                    <View className="sc-cover">{sc.cover || sc.emoji}</View>
                    <View className="sc-name">{sc.emoji} {sc.name}</View>
                    <View className="sc-name-en">{sc.nameEn}</View>
                    <View className="sc-status">{sceneCardStatus(stateOf(sc), sc)}</View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// sceneCardStatus 需要 GameState：这里从 localStorage 每次读取（轻量，场景数少）
import { useGame } from "../../gameStore";
function stateOf(_sc: Scene) {
  // 延迟取存档（简化：读一次）
  try {
    const raw = (globalThis as any).localStorage?.getItem("englishWorldV2");
    return raw ? JSON.parse(raw) : { collected: {}, phrases: {}, npcLastLines: {}, progress: {}, unlockedVisits: {} };
  } catch {
    return { collected: {}, phrases: {}, npcLastLines: {}, progress: {}, unlockedVisits: {} };
  }
}
