// 语法世界页：关卡列表 + 三题型答题 + 错题池 drill + 发音辨音（对齐原站 grammar.js）
// 状态机：world（地图）→ play（关卡/drill 答题）→ sound（辨音）→ finish（结算）
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { View, Text } from "@tarojs/components";
import {
  useGame, speak, readSaveOnce, GRAMMAR_LEVELS, SOUND_PAIRS,
  recordWrongResult, wrongPoolCount, buildWrongPoolDrill,
} from "../../gameStore";
import { setMascotState } from "../../mascotStore";
import type { GrammarLevel, GrammarQuestion, SoundGroup } from "@english-world/core";
import type { DrillItem } from "@english-world/core";

type Phase =
  | { kind: "world" }
  | { kind: "play"; lv: GrammarLevel; qIdx: number }
  | { kind: "drill"; list: DrillItem[]; idx: number }
  | { kind: "sound"; g: SoundGroup }
  | { kind: "finish"; pass: boolean; correct: number; total: number; scope: "level" | "drill" | "sound"; tip?: string; lv?: GrammarLevel; g?: SoundGroup }
  | { kind: "drillDone"; remaining: number };

export default function GrammarPage({ onBack }: { onBack: () => void }) {
  const game = useGame();
  const [phase, setPhase] = useState<Phase>({ kind: "world" });
  const [toast, setToast] = useState("");
  // 本轮答题内：答错过的题号集合（计入成绩：答对数 < 75% 则不通关）
  const wrongSetRef = useRef<Set<number>>(new Set());
  const correctRef = useRef(0);

  const toastMsg = (t: string) => { setToast(t); setTimeout(() => setToast(""), 1800); };

  useEffect(() => { setMascotState("idle"); }, []);

  const pool = game.save.grammarWrongPool || {};
  const poolN = wrongPoolCount(pool);

  // ---------- 错题池记账（存档） ----------
  const record = useCallback((lvId: string, qIdx: number, ok: boolean) => {
    game.update((d) => {
      d.grammarWrongPool = recordWrongResult(d.grammarWrongPool || {}, lvId, qIdx, ok);
    });
  }, [game]);

  // ---------- 进入一关 ----------
  const startLevel = (lv: GrammarLevel) => {
    wrongSetRef.current = new Set();
    correctRef.current = 0;
    setMascotState("thinking");
    setPhase({ kind: "play", lv, qIdx: 0 });
  };

  // ---------- 答对推进（所有题型共用） ----------
  // ⚠️ setTimeout 闭包会捕获旧 phase：改用 ref 追踪最新 phase，定时器触发时读 ref，
  //    避免「答对 → setPhase(drillDone) → 旧定时器再跑一次 nextQuestion 把状态打回去」。
  const phaseRef = useRef<Phase>(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  const onCorrect = (spoken?: string, delay = 1400) => {
    correctRef.current += 1;
    setMascotState("happy", 700);
    if (spoken) speak(spoken, 1);
    setTimeout(() => nextQuestion(), delay);
  };
  const nextQuestion = () => {
    const cur = phaseRef.current;
    if (cur.kind === "play") {
      const { lv, qIdx } = cur;
      if (qIdx + 1 >= lv.qs.length) {
        const total = lv.qs.length;
        const passed = correctRef.current >= Math.ceil(total * 0.75);
        if (passed) {
          game.update((d) => {
            d.grammarDone = { ...(d.grammarDone || {}), [lv.id]: true };
            d.grammarBest = { ...(d.grammarBest || {}) };
            if (!d.grammarBest[lv.id] || correctRef.current > d.grammarBest[lv.id]) {
              d.grammarBest[lv.id] = correctRef.current;
            }
          });
          setMascotState("happy", 2000);
          speak("Congratulations! Grammar level complete!", 1);
        } else {
          setMascotState("sad", 1500);
        }
        setPhase({ kind: "finish", pass: passed, correct: correctRef.current, total, scope: "level", lv });
      } else {
        setPhase({ kind: "play", lv, qIdx: qIdx + 1 });
      }
    } else if (cur.kind === "drill") {
      const { list, idx } = cur;
      if (idx + 1 >= list.length) {
        // ⚠️ game.save 是本次渲染闭包快照，record 的 setState 可能尚未反映到这里——
        //    直接从 storage 读最新档算剩余，绝不取旧值
        let remaining = 0;
        try {
          remaining = wrongPoolCount(readSaveOnce().grammarWrongPool || {});
        } catch { /* 读档失败按 0 处理 */ }
        setMascotState(remaining === 0 ? "happy" : "idle", 2000);
        setPhase({ kind: "drillDone", remaining });
      } else {
        setPhase({ kind: "drill", list, idx: idx + 1 });
      }
    }
  };

  const startDrill = () => {
    const list = buildWrongPoolDrill(game.save.grammarWrongPool || {});
    if (!list.length) { toastMsg("错题池是空的，先去闯关吧！🎉"); return; }
    setMascotState("thinking");
    setPhase({ kind: "drill", list, idx: 0 });
  };

  // ---------- 渲染 ----------
  return (
    <View className="page-pad">
      <View className="top-bar">
        <View className="btn" onClick={() => { setMascotState("idle"); onBack(); }}>← 返回</View>
        <View className="tb-title">🎓 语法闯关 · Grammar Quest</View>
      </View>

      {toast ? <View className="ew-toast">{toast}</View> : null}

      {phase.kind === "world" ? (
        <GrammarWorld
          save={game.save}
          poolN={poolN}
          onStart={startLevel}
          onDrill={startDrill}
          onSound={(g) => { setPhase({ kind: "sound", g, qIdx: 0 }); }}
        />
      ) : phase.kind === "play" ? (
        <PlayView
          key={"lv:" + phase.lv.id + ":" + phase.qIdx}
          lv={phase.lv}
          qIdx={phase.qIdx}
          record={record}
          onCorrect={onCorrect}
          onWrong={(qIdx) => { wrongSetRef.current.add(qIdx); setMascotState("sad", 700); }}
          onExit={() => setPhase({ kind: "world" })}
        />
      ) : phase.kind === "drill" ? (
        <DrillView
          key={"drill:" + phase.idx}
          item={phase.list[phase.idx]}
          idx={phase.idx}
          total={phase.list.length}
          record={record}
          onCorrect={onCorrect}
          onWrong={() => setMascotState("sad", 700)}
          onExit={() => setPhase({ kind: "world" })}
        />
      ) : phase.kind === "sound" ? (
        <SoundView
          key={"snd:" + phase.g.id}
          g={phase.g}
          onDone={(correct, total, passed) => {
            if (passed) {
              game.update((d) => { d.soundDone = { ...(d.soundDone || {}), [phase.g.id]: true }; });
              setMascotState("happy", 2000);
            } else {
              setMascotState("sad", 1500);
            }
            setPhase({ kind: "finish", pass: passed, correct, total, scope: "sound", tip: phase.g.tip, g: phase.g });
          }}
          onExit={() => setPhase({ kind: "world" })}
        />
      ) : phase.kind === "finish" ? (
        <FinishCard
          pass={phase.pass}
          correct={phase.correct}
          total={phase.total}
          scope={phase.scope}
          tip={phase.tip}
          onRetry={
            phase.scope === "sound" && phase.g ? () => setPhase({ kind: "sound", g: phase.g! })
              : phase.scope === "level" && phase.lv && !phase.pass ? () => startLevel(phase.lv!)
              : undefined
          }
          onBackWorld={() => setPhase({ kind: "world" })}
        />
      ) : phase.kind === "drillDone" ? (
        <View className="adventure-box grammar-play">
          <View className="quiz-card">
            <View className="finish-big">{phase.remaining === 0 ? "🎉" : "🔥"}</View>
            <View className="finish-h">{phase.remaining === 0 ? "错题池清空！" : "本轮重刷完！"}</View>
            <View className="finish-p">{phase.remaining === 0 ? "连对 2 次的题都已出池，全部消灭！" : `还有 ${phase.remaining} 题在池子里，继续加油！`}</View>
            <View className="finish-btns">
              {phase.remaining > 0 ? (
                <View className="btn btn-big btn-primary" onClick={startDrill}>🔥 继续重刷</View>
              ) : null}
              <View className="btn btn-big" onClick={() => setPhase({ kind: "world" })}>🎓 返回闯关地图</View>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

// ---------- 语法世界地图：关卡列表 + 辨音区 ----------
function GrammarWorld({ save, poolN, onStart, onDrill, onSound }: {
  save: any;
  poolN: number;
  onStart: (lv: GrammarLevel) => void;
  onDrill: () => void;
  onSound: (g: SoundGroup) => void;
}) {
  const done = save.grammarDone || {};
  const best = save.grammarBest || {};
  const soundDone = save.soundDone || {};
  const wrongPool = save.grammarWrongPool || {};
  return (
    <View className="adventure-box grammar-map">
      <View className="adv-intro">三大题型打通语法关：🔧 修句师选对句 → 🏭 句子工厂拼语序 → 🔍 语法侦探揪错词。每关 8-9 题，通关解锁下一关。</View>
      <View
        className={`grammar-drill-entry${poolN ? " has-pool" : ""}`}
        onClick={() => { if (!poolN) return; onDrill(); }}
      >
        <View className="gl-num">🔥</View>
        <View className="gl-info">
          <View className="gl-name">错题重刷</View>
          <View className="gl-desc">答错的题自动入池，连对 2 次出池——磨到彻底掌握</View>
          <View className="gl-meta">{poolN ? `🔥 池中 ${poolN} 题，错得多的先刷` : "✅ 池子是空的，去闯关积累吧"}</View>
        </View>
      </View>
      <View className="grammar-levels">
        {GRAMMAR_LEVELS.map((lv, i) => {
          const lvDone = !!done[lv.id];
          const prevDone = i === 0 || !!done[GRAMMAR_LEVELS[i - 1].id];
          const locked = !prevDone;
          const lvWrong = Object.values(wrongPool).filter((e: any) => e.lvId === lv.id).length;
          const b = best[lv.id];
          return (
            <View
              key={lv.id}
              className={`grammar-level${lvDone ? " done" : ""}${locked ? " locked" : ""}`}
              onClick={() => locked ? undefined : onStart(lv)}
            >
              <View className="gl-num">{lvDone ? "✓" : i + 1}</View>
              <View className="gl-info">
                <View className="gl-name">{lv.emoji} {lv.name}</View>
                <View className="gl-desc">{lv.desc}</View>
                <View className="gl-meta">
                  {locked ? "🔒 通关上一关解锁"
                    : lvDone ? `🎓 已通关${b ? " · 最佳 " + b : ""}${lvWrong ? " · 🔥" + lvWrong : ""}`
                    : `▶ ${lv.qs.length} 题${lvWrong ? " · 🔥" + lvWrong : ""}`}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <View className="sound-section">
        <View className="grammar-sec-title">🎧 发音辨音 · Sound Detectives</View>
        <View className="grammar-sec-sub">听声音，从两个近音词里选出你听到的那个。专治中国耳朵分不清的音对。</View>
        <View className="sound-groups">
          {SOUND_PAIRS.map((g) => {
            const gDone = !!soundDone[g.id];
            return (
              <View
                key={g.id}
                className={`grammar-level sound-group${gDone ? " done" : ""}`}
                onClick={() => onSound(g)}
              >
                <View className="gl-num">{gDone ? "✓" : "🎧"}</View>
                <View className="gl-info">
                  <View className="gl-name">{g.emoji} {g.name}</View>
                  <View className="gl-desc">{g.desc}</View>
                  <View className="gl-meta">{gDone ? "🎓 已毕业 · 可重刷" : `▶ ${g.pairs.length} 题`}</View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ---------- 关卡答题视图（三题型分发） ----------
function PlayView({ lv, qIdx, record, onCorrect, onWrong, onExit }: {
  lv: GrammarLevel;
  qIdx: number;
  record: (lvId: string, qIdx: number, ok: boolean) => void;
  onCorrect: (spoken?: string, delay?: number) => void;
  onWrong: (qIdx: number) => void;
  onExit: () => void;
}) {
  const q = lv.qs[qIdx];
  return (
    <View className="adventure-box grammar-play">
      <View className="adv-head">
        <View className="adv-title">{lv.emoji} {lv.name}</View>
        <View className="btn btn-ghost" onClick={onExit}>✕ 退出</View>
      </View>
      <View className="adv-progress">
        {lv.qs.map((_x, i) => <View key={i} className={`dot${i < qIdx ? " on" : ""}`} />)}
        <Text className="adv-progress-num">{qIdx + 1}/{lv.qs.length}</Text>
      </View>
      <View className="grammar-body">
        {q.type === "fix" ? <FixQ q={q} lvId={lv.id} qIdx={qIdx} record={record} onCorrect={onCorrect} onWrong={onWrong} />
          : q.type === "factory" ? <FactoryQ q={q} lvId={lv.id} qIdx={qIdx} record={record} onCorrect={onCorrect} onWrong={onWrong} />
          : <DetectiveQ q={q} lvId={lv.id} qIdx={qIdx} record={record} onCorrect={onCorrect} onWrong={onWrong} />}
      </View>
      <View className="grammar-feedback" />
    </View>
  );
}

// ---------- drill 答题视图（复用三题型，标题/进度覆写） ----------
function DrillView({ item, idx, total, record, onCorrect, onWrong, onExit }: {
  item: DrillItem;
  idx: number;
  total: number;
  record: (lvId: string, qIdx: number, ok: boolean) => void;
  onCorrect: (spoken?: string, delay?: number) => void;
  onWrong: () => void;
  onExit: () => void;
}) {
  const lv = item.lv;
  const q = lv.qs[item.qIdx];
  return (
    <View className="adventure-box grammar-play">
      <View className="adv-head">
        <View className="adv-title">🔥 错题重刷 · {lv.name}</View>
        <View className="btn btn-ghost" onClick={onExit}>✕ 退出</View>
      </View>
      <View className="adv-progress">
        <Text className="gq-type-tag">第 {idx + 1}/{total} 题 · 连对 2 次自动出池</Text>
      </View>
      <View className="grammar-body">
        {q.type === "fix" ? <FixQ q={q} lvId={lv.id} qIdx={item.qIdx} record={record} onCorrect={onCorrect} onWrong={() => onWrong()} />
          : q.type === "factory" ? <FactoryQ q={q} lvId={lv.id} qIdx={item.qIdx} record={record} onCorrect={onCorrect} onWrong={() => onWrong()} />
          : <DetectiveQ q={q} lvId={lv.id} qIdx={item.qIdx} record={record} onCorrect={onCorrect} onWrong={() => onWrong()} />}
      </View>
    </View>
  );
}

// ---------- 题型一：修句师（三选一） ----------
function FixQ({ q, lvId, qIdx, record, onCorrect, onWrong }: any) {
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; tip: string } | null>(null);
  const [shuffled] = useState(() => shuffle(q.options.slice()));
  const [pickedText, setPickedText] = useState("");
  const pick = (opt: any) => {
    if (answered) return;
    setAnswered(true);
    setPickedText(opt.text);
    record(lvId, qIdx, opt.ok);
    setFeedback({ ok: opt.ok, tip: opt.tip || "" });
    if (opt.ok) onCorrect(opt.text, 1400);
    else { onWrong(qIdx); setTimeout(() => { setAnswered(false); setFeedback(null); setPickedText(""); }, 1600); }
  };
  return (
    <View>
      <View className="gq-type-tag">🔧 修句师 · 选出正确的句子</View>
      <View className="gq-task">🎯 {q.task}</View>
      <View className="gq-opts">
        {shuffled.map((opt: any, i: number) => (
          <View
            key={i}
            className={`adv-opt${answered && opt.ok ? " right" : ""}${answered && !opt.ok && opt.text === pickedText ? " wrong" : ""}`}
            onClick={() => pick(opt)}
          >
            <Text className="opt-text">{opt.text}</Text>
            <Text className="opt-play" onClick={(e) => { e.stopPropagation(); speak(opt.text, 1); }}>🔊</Text>
          </View>
        ))}
      </View>
      {feedback ? (
        <View className={feedback.ok ? "gq-ok" : "gq-no"}>
          {feedback.ok ? "✅ " : "💡 "}{feedback.tip || (feedback.ok ? "回答正确！" : "再想想！")}
        </View>
      ) : null}
    </View>
  );
}

// ---------- 题型二：句子工厂（点词卡组句） ----------
function FactoryQ({ q, lvId, qIdx, record, onCorrect, onWrong }: any) {
  const words = useMemo(() => q.answer.split(" ").concat(q.extra || []), [q]);
  const [shuffled] = useState(() => shuffle(words.slice()));
  const [picked, setPicked] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ ok: boolean; tip: string; mine: string } | null>(null);

  const pick = (i: number) => {
    if (feedback?.ok) return;
    setPicked((p) => [...p, i]);
    setMascotState("thinking", 400);
  };
  const undo = () => setPicked((p) => p.slice(0, -1));
  const clear = () => setPicked([]);
  const check = () => {
    if (feedback?.ok) return;
    const mine = picked.map((i) => shuffled[i]).join(" ");
    const ok = mine === q.answer;
    record(lvId, qIdx, ok);
    setFeedback({ ok, tip: q.tip || "", mine });
    if (ok) onCorrect(q.answer, 1400);
    else { onWrong(qIdx); setTimeout(() => setFeedback(null), 2000); }
  };
  return (
    <View>
      <View className="gq-type-tag">🏭 句子工厂 · 按正确语序拼出句子</View>
      <View className="gq-task">🎯 {q.task}</View>
      <View className="factory-answer">
        {picked.length
          ? picked.map((i, k) => <Text key={k} className="factory-chip">{shuffled[i]}</Text>)
          : <Text className="factory-placeholder">点击下方词卡，拼出句子…</Text>}
      </View>
      <View className="factory-pool">
        {shuffled.map((w: string, i: number) => (
          <Text key={i} className={`factory-word${picked.includes(i) ? " used" : ""}`} onClick={() => pick(i)}>{w}</Text>
        ))}
      </View>
      <View className="factory-btns">
        <View className="btn" onClick={undo}>↩ 撤回一个</View>
        <View className="btn" onClick={clear}>🧹 清空重来</View>
        <View className="btn btn-primary" onClick={check}>✅ 就是这样</View>
      </View>
      {feedback ? (
        <View className={feedback.ok ? "gq-ok" : "gq-no"}>
          {feedback.ok ? "✅ " : `💡 你拼的是「${feedback.mine}」。`}{feedback.tip}
        </View>
      ) : null}
    </View>
  );
}

// ---------- 题型三：语法侦探（点错词 + 无错陷阱） ----------
function DetectiveQ({ q, lvId, qIdx, record, onCorrect, onWrong }: any) {
  const badWords = q.bad ? q.bad.split(" ") : [];
  const tokens = q.sentence.split(" ");
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [wrongTok, setWrongTok] = useState<string | null>(null);

  const answer = (isCorrect: boolean, tok?: string) => {
    if (answered) return;
    setAnswered(true);
    record(lvId, qIdx, isCorrect);
    if (isCorrect) {
      const spoken = q.bad ? q.sentence.replace(q.bad, q.fix || "") : q.sentence;
      setFeedback({
        ok: true,
        text: q.bad
          ? `✅ 揪到了！${q.bad}${q.fix ? " → " + q.fix : " → 直接删掉"}。${q.tip || ""}`
          : `✅ 好眼力！${q.tip || ""}`,
      });
      onCorrect(q.bad ? spoken : undefined, 2000);
    } else {
      if (tok) setWrongTok(tok);
      onWrong(qIdx);
      setFeedback({
        ok: false,
        text: q.bad === null
          ? `🤔 其实这句话没有错误，别被骗啦。${q.tip || ""}`
          : tok ? "🤔 这个词没问题，错词还藏在句子里。"
          : "🤔 这句话里确实有错误，再找找。",
      });
      // 答错重试：重渲染本题（保留记录，计入成绩）
      setTimeout(() => { setAnswered(false); setFeedback(null); setWrongTok(null); }, 1600);
    }
  };
  return (
    <View>
      <View className="gq-type-tag">🔍 语法侦探 · 点击你认为错的词，没有错就点下面的按钮</View>
      <View className="gq-sentence">
        {tokens.map((tok: string, i: number) => {
          const clean = tok.replace(/[.,!?]/g, "");
          const isRight = answered && feedback?.ok && badWords.includes(clean);
          const isWrong = wrongTok === tok;
          return (
            <Text
              key={i}
              className={`detective-word${isRight ? " right" : ""}${isWrong ? " wrong" : ""}`}
              onClick={() => answer(badWords.includes(clean), tok)}
            >{tok}</Text>
          );
        })}
      </View>
      <View className="factory-btns" style={{ marginTop: 12 }}>
        <View className="btn" onClick={() => answer(q.bad === null)}>✨ 这句话没有错误</View>
      </View>
      {feedback ? <View className={feedback.ok ? "gq-ok" : "gq-no"}>{feedback.text}</View> : null}
    </View>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- 发音辨音（听音选词）：一局内部管理全部题目 ----------
function SoundView({ g, onDone, onExit }: {
  g: SoundGroup;
  onDone: (correct: number, total: number, passed: boolean) => void;
  onExit: () => void;
}) {
  const [qIdx, setQIdx] = useState(0);
  const correctRef = useRef(0);
  return (
    <View className="adventure-box grammar-play">
      <View className="adv-head">
        <View className="adv-title">{g.emoji} {g.name}</View>
        <View className="btn btn-ghost" onClick={onExit}>✕ 退出</View>
      </View>
      <View className="adv-progress">
        {g.pairs.map((_x, i) => <View key={i} className={`dot${i < qIdx ? " on" : ""}`} />)}
        <Text className="adv-progress-num">{qIdx + 1}/{g.pairs.length}</Text>
      </View>
      <SoundQ
        key={qIdx}
        g={g}
        qIdx={qIdx}
        correctRef={correctRef}
        onNext={() => {
          if (qIdx + 1 >= g.pairs.length) {
            const total = g.pairs.length;
            onDone(correctRef.current, total, correctRef.current >= Math.ceil(total * 0.75));
          } else {
            setQIdx(qIdx + 1);
          }
        }}
      />
    </View>
  );
}

// 单题：随机决定播 a/b，选对推进，选错双词对比播放
function SoundQ({ g, qIdx, correctRef, onNext }: {
  g: SoundGroup;
  qIdx: number;
  correctRef: { current: number };
  onNext: () => void;
}) {
  const pair = g.pairs[qIdx];
  const [targetIsA] = useState(() => Math.random() < 0.5);
  const target = targetIsA ? pair.a : pair.b;
  const other = targetIsA ? pair.b : pair.a;
  const [shuffled] = useState(() => shuffle([target, other]));
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [pickedW, setPickedW] = useState("");

  // 进卡自动播一遍
  useEffect(() => {
    const t = setTimeout(() => speak(target, 0.7), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zhOf = (w: string) => (w === pair.a ? pair.zhA : pair.zhB);

  const pick = (w: string) => {
    if (answered) return;
    setAnswered(true);
    setPickedW(w);
    if (w === target) {
      correctRef.current += 1;
      setMascotState("happy", 700);
      setFeedback({ ok: true, text: `✅ 是 ${w}（${zhOf(w)}）！` });
      setTimeout(onNext, 1200);
    } else {
      setMascotState("sad", 700);
      setFeedback({
        ok: false,
        text: `❌ 你选了 ${w}（${zhOf(w)}），其实是 ${target}（${zhOf(target)}）。${g.tip}`,
      });
      // 双词对比播放，强化听感差异
      setTimeout(() => {
        speak(target, 0.7);
        setTimeout(() => speak(other, 0.7), 1200);
      }, 400);
      setTimeout(onNext, 3400);
    }
  };
  return (
    <View className="sound-body">
      <View className="gq-type-tag">🎧 听声音，选出你听到的词</View>
      <View className="btn btn-big btn-primary sound-play" onClick={() => speak(target, 0.7)}>🔊 播放</View>
      <View className="sound-opts">
        {shuffled.map((w) => (
          <View
            key={w}
            className={`sound-opt${answered && w === target ? " right" : ""}${answered && w === pickedW && w !== target ? " wrong" : ""}`}
            onClick={() => pick(w)}
          ><Text className="so-word">{w}</Text></View>
        ))}
      </View>
      {feedback ? <View className={feedback.ok ? "gq-ok" : "gq-no"}>{feedback.text}</View> : null}
    </View>
  );
}

// ---------- 结算卡 ----------
function FinishCard({ pass, correct, total, scope, tip, onRetry, onBackWorld }: {
  pass: boolean;
  correct: number;
  total: number;
  scope: "level" | "drill" | "sound";
  tip?: string;
  onRetry?: () => void;
  onBackWorld: () => void;
}) {
  const isSound = scope === "sound";
  return (
    <View className="adventure-box grammar-play">
      <View className="quiz-card">
        <View className="finish-big">{pass ? (isSound ? "🎓" : "🎓") : "💪"}</View>
        <View className="finish-h">{pass ? (isSound ? "耳朵毕业！" : "通关！") : (isSound ? "再磨磨耳朵！" : "差一点点！")}</View>
        <View className="finish-p">
          答对 {correct}/{total}。{pass
            ? isSound ? "这组音对已经难不倒你了！" : "下一关已解锁！"
            : isSound ? (tip || "") : "答对 75% 即通关，再刷一遍，稳稳过！"}
        </View>
        <View className="finish-btns">
          {!pass && onRetry ? <View className="btn btn-big btn-primary" onClick={onRetry}>🔄 再来一轮</View> : null}
          <View className="btn btn-big" onClick={onBackWorld}>🎓 返回闯关地图</View>
        </View>
      </View>
    </View>
  );
}
