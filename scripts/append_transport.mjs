#!/usr/bin/env node
// 追加交通场景到 data.js 末尾（学医院模式），全量校验通过才写入
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const base = dirname(dirname(fileURLToPath(import.meta.url)));
const dataPath = join(base, "data.js");
let src = readFileSync(dataPath, "utf8");

if (src.includes('id: "transport"')) {
  console.error("transport scene already exists, aborting");
  process.exit(1);
}

// 去掉末尾 "];"（SCENES 数组闭合）
if (!src.trimEnd().endsWith("];")) {
  console.error("tail pattern not matched, aborting for safety");
  process.exit(1);
}
const trimmed = src.trimEnd().slice(0, -2).trimEnd(); // 去掉 "];"

const read = (f) => readFileSync(join(base, "scripts", f), "utf8").trimEnd();
const head = read("transport_head.js");   // "  {" 开头? 不——直接场景对象，含 2 空格缩进由这里保证
const v1 = read("transport_v1.js");
const v2 = read("transport_v2.js");
const v3 = read("transport_v3.js");
const tail = read("transport_tail.js");   // "  ],\n  }," 场景闭合

// 组装：trimmed 尾部可能是 "}," 或 "}"——统一去尾逗号再加
const trimmed2 = trimmed.endsWith(",") ? trimmed.slice(0, -1).trimEnd() : trimmed;
const scene = [head, v1, v2, v3, tail].join("\n");
const out = trimmed2 + ",\n\n" + scene + "\n];\n";

// 校验
try {
  const code = out.slice(out.indexOf("const SCENES =")).replace(/^const/, "var");
  const mod = { exports: {} };
  new Function("module", "exports", code + "\nmodule.exports = { SCENES };")(mod, mod.exports);
  const scenes = mod.exports.SCENES;
  if (scenes.length !== 7) throw new Error(`scenes.length=${scenes.length}, expect 7`);
  const t = scenes.find((s) => s.id === "transport");
  if (!t) throw new Error("transport missing");
  if (t.visits.length !== 3) throw new Error(`transport visits=${t.visits.length}, expect 3`);
  const enSet = new Set(t.items.map((i) => i.en));
  const idSet = new Set(t.items.map((i) => i.id));
  if (idSet.size !== t.items.length) throw new Error("duplicate item id");
  let steps = 0;
  for (const v of t.visits) {
    if (v.reward?.en && !enSet.has(v.reward.en)) throw new Error(`reward.en "${v.reward.en}" not in items`);
    for (const [si, st] of v.steps.entries()) {
      steps++;
      if (st.npcLines?.length !== 3) throw new Error(`${v.id} step${si}: npcLines`);
      if (st.options?.length !== 3 || st.options.filter((o) => o.ok).length !== 1 || !st.options.every((o) => o.tip)) throw new Error(`${v.id} step${si}: options`);
      if (!st.phrase?.en || !st.phrase?.zh || !st.phrase?.note || !st.npcZh || !st.task) throw new Error(`${v.id} step${si}: fields`);
      for (const a of st.adds || []) if (a.wordId && !idSet.has(a.wordId)) throw new Error(`${v.id} step${si}: adds wordId ${a.wordId}`);
    }
  }
  console.log(`validation OK: transport 3 visits, ${t.items.length} items, ${steps} steps`);
} catch (err) {
  console.error("VALIDATION FAILED:", err.message);
  process.exit(1);
}

writeFileSync(dataPath, out);
console.log("written, new size:", out.length);
