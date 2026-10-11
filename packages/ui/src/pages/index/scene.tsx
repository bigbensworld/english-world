// 场景对话页：多轮 tab + 聊天流 + 订单托盘 + 语块卡 + 完成页
import { useMemo, useState, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import {
  useGame, useAdventure, speak, SCENES, VLOGS, VLOG_DICT,
  sceneVisits, visitKey, unlockedVisitIndex, finishedVisits, sceneCardStatus,
} from "../../gameStore";
import type { Scene, SceneVisit } from "@english-world/core";
// 吉祥物状态：对齐原站 game.js 调用点
//   348/451 thinking（进入剧情 / 选项就绪）、486 happy 700（答对）、
//   516 sad 700（答错）、569 happy 2000（完成）、204/620 idle（进入场景 / 返回地图）
import { setMascotState } from "../../mascotStore";

export default function ScenePage({ scene, onBack, onOpenBook }: { scene: Scene; onBack: () => void; onOpenBook: () => void }) {
  const game = useGame();
  const visits = useMemo(() => sceneVisits(scene), [scene]);
  const [visitIdx, setVisitIdx] = useState(() => unlockedVisitIndex(game.save, scene));
  const visit = visits[Math.min(visitIdx, visits.length - 1)];
  const [chat, setChat] = useState<{ role: "npc" | "me"; text: string; zh?: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [toast, setToast] = useState("");
  // retry 阶段已选错的选项下标：保持禁用（对齐原站答错后 el.disabled = true）
  const [triedWrong, setTriedWrong] = useState<number[]>([]);
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advRef = useRef<any>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // 隐藏测试模式：连点标题 5 次 → 解锁全部轮次（验收用，对齐原站）
  const onTitleTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 1500);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      game.update((d) => { d.unlockedVisits[scene.id] = visits.length - 1; });
      setToast("🧪 测试模式：已解锁全部轮次");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const adv = useAdventure(scene, visit, game.save, game.update);
  advRef.current = adv;

  // 进入场景 → idle（对齐原站 game.js:204 enterScene）
  useEffect(() => {
    setMascotState("idle");
  }, [scene.id]);

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
    // 选项就绪、等玩家作答 → thinking（对齐原站 game.js:451 renderStep 末尾）。
    // ⚠️ 只在 task 阶段置位：若在 typing/npc 阶段也置位，会立刻覆盖刚刚设置的
    //    happy/sad（chooseOpt 同步调用后 adv.choose 马上切 phase），导致答对/答错动画看不到。
    //    原站同样是「答完 happy 700 → 回落 idle → 下一轮 renderStep 才 thinking」。
    if (a.phase === "task") setMascotState("thinking");
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

  // 完成本轮 → happy 2000（对齐原站 game.js:569 finishAdventure）
  useEffect(() => {
    if (finished) setMascotState("happy", 2000);
  }, [finished]);

  const startRun = () => {
    setStarted(true); setFinished(false); setChat([]);
    // 开始剧情 → thinking（对齐原站 game.js:348 startAdventure）
    setMascotState("thinking");
    adv.start();
  };

  const chooseOpt = (i: number) => {
    const a = adv.adv;
    // ⚠️ 允许 retry 阶段重答（对齐原站 game.js:534 adv.lock=false）：
    //    原站答错后解锁选项、仅禁用已选错的那一项，玩家可再选；迁移时只放行 task 阶段，
    //    导致答错即卡死、无法完成剧情，悬浮球也再等不到 happy。
    if (a.phase !== "task" && a.phase !== "retry") return;
    if (a.phase === "retry" && triedWrong.includes(i)) return;
    const step = visit.steps[a.step];
    const opt = step.options[i];
    // 答对 → happy 700 / 答错 → sad 700（对齐原站 game.js:486 / 516）
    setMascotState(opt.ok ? "happy" : "sad", 700);
    if (opt.ok) {
      setTriedWrong([]);
      setChat((prev) => [...prev, { role: "me", text: opt.text }]);
      if (step.phrase) {
        setChat((prev) => [...prev, { role: "phrase", text: "", zh: "" } as any]);
      }
    } else {
      // 记录已选错的项，保持禁用（对齐原站 el.disabled = true）
      setTriedWrong((prev) => (prev.includes(i) ? prev : [...prev, i]));
    }
    adv.choose(i);
  };

  // 返回地图 → idle（对齐原站 game.js:620 backToMap）
  const backToHome = () => { setMascotState("idle"); onBack(); };

  const correctIdx = adv.adv.phase === "retry" ? visit.steps[adv.adv.step].options.findIndex((o) => o.ok) : -1;

  return (
    <View className="page-pad">
      <View className="top-bar">
        <View className="btn" onClick={backToHome}>← 返回</View>
        <View className="tb-title" onClick={onTitleTap}>{scene.emoji} {scene.name} · {scene.nameEn}</View>
        <View className="btn" onClick={onOpenBook}>📖</View>
      </View>

      {toast && <View className="finish-panel" style={{ margin: "0 16px 8px", padding: "10px 14px", background: "#0d1117" }}><View className="fp-sub">{toast}</View></View>}

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
            <View className="btn" onClick={backToHome}>返回地图</View>
          </View>
        </View>
      ) : (
        /* 聊天流 + 选项 */
        <ScrollView scrollY style={{ maxHeight: "calc(100vh - 300px)" }} className="chat-list">
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
              {visit.steps[adv.adv.step].options.map((o, i) => {
                const wrongPicked = adv.adv.phase === "retry" && triedWrong.includes(i);
                const cls = adv.adv.phase === "retry"
                  ? (i === correctIdx ? "ok" : (wrongPicked ? "wrong" : ""))
                  : "";
                return (
                  <View
                    key={i}
                    className={`option ${cls}`}
                    onClick={() => chooseOpt(i)}
                  >
                    {o.text}
                    {adv.adv.phase === "retry" && i === correctIdx && o.tip ? <View className="option-tip">{o.tip}</View> : null}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
