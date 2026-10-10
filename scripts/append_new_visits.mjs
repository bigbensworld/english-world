#!/usr/bin/env node
// 统一注入脚本 v3：用括号计数精确定位场景对象边界，把 v4/v5 补轮插到 visits 数组末尾
// 全部校验通过才写入。用法：node scripts/append_new_visits.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const base = dirname(dirname(fileURLToPath(import.meta.url)));
const dataPath = join(base, "data.js");
let src = readFileSync(dataPath, "utf8");

const read = (f) => readFileSync(join(base, "scripts", f), "utf8").trimEnd();

const plan = [
  { scene: "restaurant", itemFiles: ["restaurant_items.js"], visitFiles: ["restaurant_v5.js", "restaurant_v6.js"] },
  { scene: "market",     itemFiles: ["market_items.js"],     visitFiles: ["market_v4.js", "market_v5.js"] },
  { scene: "hotel",      itemFiles: ["hotel_items.js"],      visitFiles: ["hotel_v4.js", "hotel_v5.js"] },
  { scene: "airport",    itemFiles: ["airport_items.js"],    visitFiles: ["airport_v4.js", "airport_v5.js"] },
  { scene: "hospital",   itemFiles: ["hospital_items.js"],   visitFiles: ["hospital_v4.js", "hospital_v5.js"] },
];
const expected = { cafe: 8, restaurant: 6, market: 5, hotel: 5, airport: 5, hospital: 5 };

if (src.includes('titleEn: "Tipping Culture"')) {
  console.error("already injected, aborting");
  process.exit(1);
}

// 括号计数：找 sceneId 所属对象的 [open, close]
function sceneRange(text, sceneId) {
  const idPos = text.indexOf(`id: "${sceneId}"`);
  if (idPos < 0) return null;
  const open = text.lastIndexOf("{", idPos);
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") { depth--; if (depth === 0) return [open, i]; }
  }
  return null;
}

for (const p of plan) {
  const [open, close] = sceneRange(src, p.scene) || [];
  if (open == null) { console.error(`scene ${p.scene} not found`); process.exit(1); }
  const sceneText = src.slice(open, close + 1);

  // ---- 1) items 注入：visits: [ 前的 "]," 闭合 ----
  const vm = sceneText.match(/(\s*)\],\n\s*visits: \[/);
  if (!vm) { console.error(`items close not found in ${p.scene}`); process.exit(1); }
  const itemsCloseRel = sceneText.indexOf(vm[0]);
  const itemsAdd = p.itemFiles.map(read).join("\n");
  const itemsIndent = vm[1]; // 场景缩进风格："    "(4空格词条行) or "  "(2空格)
  src = src.slice(0, open + itemsCloseRel) + itemsAdd + "\n" + src.slice(open + itemsCloseRel);
  console.log(`  ${p.scene}: items +${p.itemFiles.length} files`);

  // ---- 2) visits 注入：重新定位（文本已变）----
  const [open2, close2] = sceneRange(src, p.scene) || [];
  const sceneText2 = src.slice(open2, close2 + 1);
  // 场景末尾结构（4空格场景）："...},\n    ],\n  }"；hospital（2空格）："\n  ],\n},"
  // 即：最后一个 visit 的 "}," + visits 闭合 "]" + 场景闭合 "}"
  let visitTail = null, sceneTailPat = null;
  for (const pat of ["},\n    ],\n  }", "},\n  ],\n}"]) {
    if (sceneText2.endsWith(pat)) { visitTail = pat; break; }
  }
  if (!visitTail) { console.error(`visits tail not found in ${p.scene}, tail=` + JSON.stringify(sceneText2.slice(-40))); process.exit(1); }
  const tailRel = sceneText2.length - visitTail.length;
  // visit 分片重排缩进：4空格场景（items 缩进 4sp → 词条行 6sp）加 6 空格；hospital（词条行 4sp）保持原样
  let visitAdd = p.visitFiles.map(read).join("\n");
  if (itemsIndent === "    ") {
    visitAdd = visitAdd.split("\n").map((l) => (l.trim() ? "      " + l : l)).join("\n");
  }
  // visitTail[0] === "}"：在最后一个 visit 的 "}," 之后插入新 visit（以 ",\n" 开头衔接）
  // 插入点 = open2 + tailRel + 1（"}" 之后）；新文本 = ",\n" + visitAdd + visitTail.slice(1)
  src = src.slice(0, open2 + tailRel + 1) + ",\n" + visitAdd + visitTail.slice(1) + src.slice(open2 + tailRel + visitTail.length);
  console.log(`  ${p.scene}: visits +${p.visitFiles.length}`);
}

// ---- 3) 强校验：结构 + 数量 + 每步完整性 + reward 匹配 ----
try {
  const code = src.slice(src.indexOf("const SCENES =")).replace(/^const/, "var");
  const mod = { exports: {} };
  new Function("module", "exports", code + "\nmodule.exports = { SCENES };")(mod, mod.exports);
  const scenes = mod.exports.SCENES;
  if (scenes.length !== 6) throw new Error(`scenes.length=${scenes.length}, expect 6`);
  let totalSteps = 0;
  for (const sc of scenes) {
    const n = sc.visits.length;
    if (expected[sc.id] !== n) throw new Error(`${sc.id}: ${n} visits, expect ${expected[sc.id]}`);
    const enSet = new Set(sc.items.map((i) => i.en));
    const idSet = new Set(sc.items.map((i) => i.id));
    if (idSet.size !== sc.items.length) throw new Error(`${sc.id}: duplicate item id`);
    for (const v of sc.visits) {
      if (!v.id || !v.title || !v.steps?.length) throw new Error(`${sc.id}/${v.id}: missing fields`);
      if (v.reward?.en && !enSet.has(v.reward.en)) throw new Error(`${sc.id}/${v.id}: reward.en "${v.reward.en}" not in items`);
      for (const [si, st] of v.steps.entries()) {
        totalSteps++;
        if (st.npcLines?.length !== 3) throw new Error(`${sc.id}/${v.id} step${si}: npcLines=${st.npcLines?.length}`);
        if (!st.npcZh || !st.task) throw new Error(`${sc.id}/${v.id} step${si}: missing npcZh/task`);
        if (st.options?.length !== 3) throw new Error(`${sc.id}/${v.id} step${si}: options=${st.options?.length}`);
        if (st.options.filter((o) => o.ok).length !== 1) throw new Error(`${sc.id}/${v.id} step${si}: ok count != 1`);
        if (!st.options.every((o) => o.tip)) throw new Error(`${sc.id}/${v.id} step${si}: option missing tip`);
        if (!st.phrase?.en || !st.phrase?.zh || !st.phrase?.note) throw new Error(`${sc.id}/${v.id} step${si}: phrase incomplete`);
        for (const a of st.adds || []) if (a.wordId && !idSet.has(a.wordId)) throw new Error(`${sc.id}/${v.id} step${si}: adds wordId "${a.wordId}" invalid`);
      }
    }
    console.log(`  ✓ ${sc.id}: ${n} visits, ${sc.items.length} items`);
  }
  console.log(`all checks passed. total steps: ${totalSteps}`);
} catch (err) {
  console.error("VALIDATION FAILED:", err.message);
  process.exit(1);
}

writeFileSync(dataPath, src);
console.log("written, new size:", src.length);
