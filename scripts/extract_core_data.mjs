#!/usr/bin/env node
// 从网站源 data.js / vlogs.js / vlog.js 重新提取数据到 packages/core/src/data/_raw.js
// 用法：node scripts/extract_core_data.mjs
// 改了源数据后必须跑这个，否则 sync-guard.test.ts 会失败。
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const base = dirname(dirname(fileURLToPath(import.meta.url)));
const data = readFileSync(join(base, "data.js"), "utf8");
const vlogs = readFileSync(join(base, "vlogs.js"), "utf8");
const vlogJs = readFileSync(join(base, "vlog.js"), "utf8");

const scenesCode = data.replace(/^\/\/.*$/gm, "").trim();
const vlogsCode = vlogs.replace(/^\/\/.*$/gm, "").trim();
const dictMatch = vlogJs.match(/const VLOG_DICT = \{[\s\S]*?\n\};/);
if (!dictMatch) { console.error("VLOG_DICT not found in vlog.js"); process.exit(1); }

const out = join(base, "packages/core/src/data/_raw.js");
writeFileSync(out, scenesCode + "\n\n" + vlogsCode + "\n\n" + dictMatch[0] + "\nexport { SCENES, VLOGS, VLOG_DICT };\n");
console.log("extracted ->", out, "(" + readFileSync(out).size + " bytes)");
console.log("remember to run: node packages/core/test/sync-guard.test.ts");
