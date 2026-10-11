// 首页：双 Tab（慢速生活 / 场景冒险）+ 场景地图 + vlog 列表
import { useState, useMemo } from "react";
import { View, Text, Image } from "@tarojs/components";
import { SCENES, VLOGS, sceneCardStatus, finishedVisits, sceneVisits } from "../../gameStore";
import type { Scene, Vlog } from "@english-world/core";
// 回到地图/频道列表 → idle（对齐原站 game.js:620 backToMap、vlog.js:733 openVlogChannel）
import { setMascotState } from "../../mascotStore";
import ScenePage from "./scene";
import VlogPage from "./vlog";
import BookPage from "./book";

const SCENE_GROUPS = [
  { id: "daily", title: "🏠 日常高频", sub: "Daily Life · 天天都用得上的英语", scenes: ["cafe", "restaurant", "market", "transport", "barber", "gym", "shopping", "vet", "bookstore"] },
  { id: "travel", title: "✈️ 旅行出行", sub: "Travel · 机场酒店租车一手搞定", scenes: ["airport", "hotel", "carrental"] },
  { id: "emergency", title: "🚑 应急保障", sub: "Essentials · 医院药店银行邮局关键时刻", scenes: ["hospital", "drugstore", "bank", "postoffice"] },
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

  // 回到顶层（地图 / 频道列表）→ 吉祥物回 idle
  const backToHome = () => { setMascotState("idle"); setView({ kind: "home" }); };
  const switchTab = (t: "vlog" | "scenes") => { setMascotState("idle"); setTab(t); };

  const groups = useMemo(() => {
    const grouped = new Set(SCENE_GROUPS.flatMap((g) => g.scenes));
    const rest = SCENES.filter((s) => !grouped.has(s.id)).map((s) => s.id);
    const gs = SCENE_GROUPS.map((g) => ({ ...g, list: g.scenes.map((id) => SCENES.find((s) => s.id === id)!).filter(Boolean) }));
    if (rest.length) gs.push({ id: "more", title: "🧭 更多场景", sub: "More", list: rest.map((id) => SCENES.find((s) => s.id === id)!).filter(Boolean) } as any);
    return gs;
  }, []);

  if (view.kind === "scene") return <ScenePage scene={view.scene} onBack={backToHome} onOpenBook={() => setView({ kind: "book" })} />;
  if (view.kind === "vlog") return <VlogPage vlog={view.vlog} onBack={backToHome} />;
  if (view.kind === "book") return <BookPage onBack={backToHome} />;

  return (
    <View className="page-pad">
      {/* 顶部品牌栏 */}
      <View className="brand-bar">
        <View className="brand-mark">
          <Text className="brand-globe">🌍</Text>
          <Text className="brand-zh">英语世界</Text>
          <Text className="brand-en">English World</Text>
        </View>
        <View className="brand-stats">
          <View className="brand-stat"><Text className="stat-ico">📖</Text><Text className="stat-value">{Object.keys(readSaveOnce().collected || {}).length}</Text><Text className="stat-label">词</Text></View>
          <View className="brand-stat"><Text className="stat-ico">💬</Text><Text className="stat-value">{Object.keys(readSaveOnce().phrases || {}).length}</Text><Text className="stat-label">表达</Text></View>
          <View className="brand-btn" onClick={() => setView({ kind: "book" })}>
            <Text className="bb-ico">📚</Text><Text className="bb-text">词汇册</Text>
          </View>
        </View>
      </View>

      {/* 双 Tab：分段控件 */}
      <View className="tabs-wrap">
        <View className="home-tabs">
          <View className={`home-tab ${tab === "vlog" ? "active" : ""}`} onClick={() => switchTab("vlog")}>📺 慢速生活</View>
          <View className={`home-tab ${tab === "scenes" ? "active" : ""}`} onClick={() => switchTab("scenes")}>🗺️ 场景冒险</View>
        </View>
      </View>

      {tab === "vlog" ? (
        <View className="home-pane">
          <View className="hero">
            <View className="map-title">不敢开口？先从你每天都会遇到的英语开始</View>
            <View className="map-sub">像刷视频一样，听懂日常英语<br/>5 分钟一集，慢速朗读，逐词跟读</View>
            <View className="learn-path">
              <View className="lp-step lp-current">① 先听懂</View>
              <Text className="lp-arrow">→</Text>
              <View className="lp-step">② 再开口</View>
              <Text className="lp-arrow">→</Text>
              <View className="lp-step">③ 反复练</View>
            </View>
          </View>

          <View className="vlog-list">
            {VLOGS.map((v) => {
              const seen = readSaveOnce().vlogSeen || {};
              const done = v.cards.filter((_c, i) => seen[`${v.id}:${i}`]).length;
              const passed = v.cards.every((_c, i) => seen[`${v.id}:${i}`]);
              return (
                <View key={v.id} className={`vlog-set ${passed ? "passed" : ""}`} onClick={() => setView({ kind: "vlog", vlog: v })}>
                  <View className="vs-art"><Text className="vs-emoji">{v.emoji}</Text></View>
                  <View className="vs-info">
                    <View className="vs-title">{v.title} · {v.titleZh}</View>
                    <View className="vs-desc">{v.desc}</View>
                    <View className="vs-meta">{done > 0 ? `已看 ${done}/${v.cards.length} 张卡片` : `▶ ${v.cards.length} 张卡片`}</View>
                  </View>
                  <Text className="vs-chevron">›</Text>
                </View>
              );
            })}
            <View className="path-next">
              <View className="path-next-text">🎧 听懂之后？去真实场景里<b>说出第一句</b></View>
              <View className="btn btn-primary btn-big" onClick={() => setTab("scenes")}>🗺️ 进入场景冒险</View>
            </View>
          </View>
        </View>
      ) : (
        <View className="home-pane scene-pane">
          <View className="hero">
            <View className="map-title">去哪儿冒险？</View>
            <View className="map-sub">Pick a place. Chat with real people. Learn step by step.</View>
          </View>
          <View className="scene-groups">
          {groups.map((g) => (
            <View key={g.id}>
              <View className="scene-group-head">
                <View className="scene-group-title">{g.title}<Text className="scene-group-count">{g.list.length} 个场景</Text></View>
                <View className="scene-group-sub">{g.sub}</View>
              </View>
              <View className="scene-grid">
                {g.list.map((sc) => (
                  <View key={sc.id} className="scene-card" onClick={() => setView({ kind: "scene", scene: sc })}>
                    <View
                      className="sc-cover"
                      style={{ background: sc.accentSoft ? `linear-gradient(165deg, ${sc.accentSoft}, #fdfcfa)` : undefined }}
                    >
                      <SceneArt scene={sc} />
                    </View>
                    <View className="sc-info">
                      <View className="sc-name">{sc.name} · {sc.nameEn}</View>
                      <View className="sc-status">{sceneCardStatus(stateOf(sc), sc)}</View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
          </View>
        </View>
      )}
    </View>
  );
}

// 场景封面图标：优先 Fluent Emoji 3D PNG（对齐原站 iconHtml），加载失败降级为 emoji
const ICON_IDS = new Set([
  "coffee", "menu", "cart", "hotel", "airport", "hospital", "transport",
  "bank", "barber", "gym", "shopping", "postbox", "books", "paw", "school",
]);

function SceneArt({ scene }: { scene: Scene }) {
  const iconId = (scene as any).iconId || scene.id;
  const [failed, setFailed] = useState(false);
  const hasIcon = ICON_IDS.has(iconId) && !failed;
  if (hasIcon) {
    return (
      <Image
        className="sc-img"
        src={`/static/icons/${iconId}.png`}
        mode="aspectFit"
        onError={() => setFailed(true)}
      />
    );
  }
  return <Text className="sc-art">{scene.emoji}</Text>;
}

// sceneCardStatus 需要 GameState：走跨端统一读档（不直接依赖 localStorage）
import { useGame, readSaveOnce } from "../../gameStore";
function stateOf(_sc: Scene) {
  try {
    return readSaveOnce();
  } catch {
    return { collected: {}, phrases: {}, npcLastLines: {}, progress: {}, unlockedVisits: {} };
  }
}
