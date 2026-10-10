#!/usr/bin/env node
// 拼接医院场景分片 → 追加到 data.js（避开 Edit 锚点吃闭合括号的坑）
import { readFileSync, writeFileSync, readSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const base = dirname(dirname(fileURLToPath(import.meta.url)));
const dataPath = join(base, "data.js");
let src = readFileSync(dataPath, "utf8");

// 幂等：已有 hospital 场景则先报错退出
if (src.includes('id: "hospital"')) {
  console.error("hospital scene already exists, aborting");
  process.exit(1);
}

// 去掉末尾的 "],\n  },\n];"（最外层数组闭合 + 最后一个场景闭合）
const trimmed = src.replace(/\],\n\s*\},\n\];\s*$/, "").trimEnd();
if (trimmed === src) {
  console.error("tail pattern not matched, aborting for safety");
  process.exit(1);
}

// 各分片：part1 以 "  {" 开头（场景对象，带 2 空格缩进），part3 以 "]," 结尾 + 最终闭合
const p1 = readFileSync(join(base, "scripts/hospital_part1.js"), "utf8").trimEnd();
const p2 = readFileSync(join(base, "scripts/hospital_part2.js"), "utf8").trimEnd();
const p3 = readFileSync(join(base, "scripts/hospital_part3.js"), "utf8").trimEnd();

// part1 开头是 "{ id: hospital ..." 需要场景级缩进
const scene = ["  " + p1, p2, p3].join("\n");
const out = trimmed + ",\n\n" + scene + "\n";
writeFileSync(dataPath, out);
console.log("appended hospital scene, new size:", out.length);
