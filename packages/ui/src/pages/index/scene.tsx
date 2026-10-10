// 场景对话页：多轮 tab + 聊天流 + 订单托盘 + 语块卡 + 完成页
import { useMemo, useState, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import {
  useGame, useAdventure, speak, SCENES, VLOGS, VLOG_DICT,
  sceneVisits, visitKey, unlockedVisitIndex, finishedVisits, sceneCardStatus,
} from "../../gameStore";
import type { Scene, SceneVisit } from "@english-world/core";

export default function ScenePage({ scene, onBack, onOpenBook }: { scene: Scene; onBack: () => void; onOpenBook: () => void }) {
  const game = useGame();
  const visits = useMemo(() => sceneVisits(scene), [scene]);
  const [visitIdx, setVisitIdx] = useState(() => unlockedVisitIndex(game.save, scene));
  const visit = visits[Math.min(visitIdx, visits.length - 1)];
  const [chat, setChat] = useState<{ role: "npc" | "me"; text: string; zh?: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const advRef = useRef<any>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const adv = useAdventure(scene, visit, game.save, game.update);
  advRef.current = adv;

  const vk = visitKey(scene, visit);
  const savedStep = game.save.progress[vk] || 0;
  const total = visit.steps.length;
  const learned = scene.items.filter((it) => game.save.collected[scene.id + ":" + it.id]).length;

  // adv.phase 变化 → 追加聊天记录
  useEffect(() => {
    if (!started) return;
    const a = adv.adv;
    if (a.phase === "npc" && a.npcLine) {
      setChat((prev) => {
        if (prev.length && prev[prev.length - 1].text === a.npcLine) return prev;
        const stepData = visit.steps[Math.min(a.step, total - 1)];
        return [...prev, { role: "npc", text: a.npcLine, zh: stepData?.npcZh }];
      });
    }
    if (a.phase === "finish" && !finished) {
      setFinished(true);
      const r = adv.settle();
      if (r.unlockedNext) game.update((d) => { d.unlockedVisits[scene.id] = (d.unlockedVisits[scene.id] || 0) + 1; });
      if (visit.reward?.en) {
        const it = scene.items.find((i) => i.en === visit.reward.en);
        if (it) game.update((d) => { d.collected[scene.id + ":" + it.id] = true; });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adv.adv.phase, adv.adv.npcLine, adv.adv.step]);

  const startRun = () => {
    setStarted(true); setFinished(false); setChat([]);
    adv.start();
  };

  const chooseOpt = (i: number) => {
    const a = adv.adv;
    if (a.phase !== "task") return;
    const step = visit.steps[a.step];
    const opt = step.options[i];
    if (opt.ok) {
      setChat((prev) => [...prev, { role: "me", text: opt.text }]);
      if (step.phrase) {
        setChat((prev) => [...prev, { role: "phrase", text: "", zh: "" } as any]);
      }
    }
    adv.choose(i);
  };

  const correctIdx = adv.adv.phase === "retry" ? visit.steps[adv.adv.step].options.findIndex((o) => o.ok) : -1;

  return (
    <View className="page-pad">
      <View className="top-bar">
        <View className="btn" onClick={onBack}>← 返回</View>
        <View className="tb-title">{scene.emoji} {scene.name} · {scene.nameEn}</View>
        <View className="btn" onClick={onOpenBook}>📖</View>
      </View>

      {/* 轮次 tab */}
      <ScrollView className="visit-tabs" scrollX>
        {visits.map((v, i) => {
          const unlocked = i <= unlockedVisitIndex(game.save, scene) || finishedVisits(game.save, scene) > i;
          return (
            <View
              key={v.id}
              className={`visit-tab ${i === visitIdx ? "active" : ""} ${unlocked ? "" : "locked"}`}
              onClick={() => unlocked && setVisitIdx(i)}
            >{v.emoji} {v.title.replace(/^第 \d+ 次光顾 · /, "")}{unlocked ? "" : " 🔒"}</View>
          );
        })}
      </ScrollView>

      {/* HUD */}
      <View className="hud">
        <View className="hud-chip"><b>{Math.min(savedStep, total)}</b>/{total} 步</View>
        <View className="hud-chip"><b>{learned}</b>/{scene.items.length} 词汇</View>
        <View className="hud-chip"><b>{Object.keys(game.save.phrases).filter((k) => k.startsWith(vk + ":")).length}</b>语块</View>
      </View>

      {/* 订单托盘 */}
      {adv.adv.order.length > 0 && (
        <View className="order-tray">
          <Text style={{ fontSize: 12, color: "#7d766b", width: "100%" }}>{scene.orderLabel || "📦 进度"}</Text>
          {adv.adv.order.map((o, i) => <View key={i} className="order-chip">{o.emoji} {o.label}</View>)}
        </View>
      )}

      {!started ? (
        /* 开始 / 继续面板 */
        <View className="finish-panel">
          <View className="fp-title">{visit.emoji} {visit.title}</View>
          <View className="fp-sub">{visit.desc || scene.intro}</View>
          <View style={{ marginTop: 14 }}>
            <View className="btn btn-primary btn-big" onClick={startRun}>
              {savedStep > 0 && savedStep < total ? `继续（第 ${savedStep + 1} 步）` : savedStep >= total ? "再玩一次" : "开始剧情"}
            </View>
          </View>
        </View>
      ) : finished ? (
        /* 完成页 */
        <View className="finish-panel">
          <View className="fp-title">🎉 {visit.title} 完成！</View>
          <View className="fp-sub">
            {visit.reward?.zh || "干得漂亮！"}<br />
            收集语块 {visit.steps.filter((_s, i) => game.save.phrases[vk + ":" + i]).length}/{total} · 词汇 {learned}/{scene.items.length}
          </View>
          <View style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <View className="btn btn-primary btn-big" style={{ flex: 1 }} onClick={() => { setVisitIdx(Math.min(visitIdx + 1, visits.length - 1)); setStarted(false); }}>下一轮 →</View>
            <View className="btn btn-big" style={{ flex: 1 }} onClick={() => { adv.restart(); setChat([]); setFinished(false); }}>再玩一次</View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View className="btn" onClick={onBack}>返回地图</View>
          </View>
        </View>
      ) : (
        /* 聊天流 + 选项 */
        <ScrollView scrollY style={{ maxHeight: "58vh" }} className="chat-list">
          {chat.map((m, i) =>
            (m as any).role === "phrase" ? (
              <View key={i} className="phrase-card">
                <View className="pc-en">💬 {visit.steps[0].phrase?.en}</View>
              </View>
            ) : (
              <View key={i} className={`bubble ${m.role === "npc" ? "bubble-npc" : "bubble-me"}`}>
                {m.text}
                {m.zh ? <View className="bubble-zh">{m.zh}</View> : null}
              </View>
            ),
          )}
          {adv.adv.phase === "typing" && <View className="bubble bubble-npc typing">店员正在输入…</View>}
          {adv.adv.phase === "retry" && adv.adv.lastAnswer && (
            <View className="bubble bubble-me" style={{ opacity: 0.6 }}>{adv.adv.lastAnswer.text}</View>
          )}
        </ScrollView>
      )}

      {/* 答错教学卡 + 选项 */}
      {started && !finished && (
        <View>
          {adv.adv.phase === "retry" && adv.adv.lastAnswer && (
            <View className="task-hint" style={{ margin: "4px 16px" }}>
              <b>❌ 错因：</b>{adv.adv.lastAnswer.tip}<br />
              <b>✅ 正确句：</b>{adv.adv.lastAnswer.correctText}<br />
              {adv.adv.lastAnswer.correctTip}
            </View>
          )}
          {adv.adv.phase === "task" && (
            <View className="task-hint" style={{ margin: "4px 16px" }}>🎯 {visit.steps[adv.adv.step].task}</View>
          )}
          {(adv.adv.phase === "task" || adv.adv.phase === "retry") && (
            <View className="options">
              {visit.steps[adv.adv.step].options.map((o, i) => (
                <View
                  key={i}
                  className={`option ${adv.adv.phase === "retry" ? (i === correctIdx ? "ok" : "") : ""}`}
                  onClick={() => adv.adv.phase === "task" && chooseOpt(i)}
                >
                  {o.text}
                  {adv.adv.phase === "retry" && i === correctIdx && o.tip ? <View className="option-tip">{o.tip}</View> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
