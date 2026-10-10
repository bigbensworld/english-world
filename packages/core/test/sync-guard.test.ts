// 数据同步守卫：校验 core/src/data/_raw.js 与网站源 data.js/vlogs.js/vlog.js 保持一致。
// 防止两边内容漂移（任何人改了源数据但忘了重新提取时会失败）。
// 运行：node packages/core/test/sync-guard.test.ts
import { SCENES, VLOGS, VLOG_DICT } from "../src/data/_raw.js";
import { readFileSync } from "node:fs";

let pass = 0, fail = 0;
function ok(cond: unknown, name: string) {
  if (cond) { pass++; console.log("  ✅ " + name); }
  else { fail++; console.log("  ❌ " + name); }
}

const base = new URL("../../../", import.meta.url).pathname;
const dataSrc = readFileSync(base + "data.js", "utf8");
const vlogsSrc = readFileSync(base + "vlogs.js", "utf8");
const vlogSrc = readFileSync(base + "vlog.js", "utf8");

function evalConst(src: string, name: string): any {
  const sandbox: Record<string, any> = {};
  new Function("module", src + "\nmodule.exports = " + name + ";")(sandbox);
  return sandbox.exports;
}

console.log("== 数据同步守卫：内核 _raw vs 网站源文件 ==");
const srcScenes = evalConst(dataSrc, "SCENES");
const srcVlogs = evalConst(vlogsSrc, "VLOGS");
const dictMatch = vlogSrc.match(/const VLOG_DICT = \{[\s\S]*?\n\};/);
const srcDict = dictMatch ? evalConst(dictMatch[0] + ";", "VLOG_DICT") : null;

ok(srcDict && Object.keys(srcDict).length === Object.keys(VLOG_DICT).length, "VLOG_DICT 词条数一致（" + Object.keys(VLOG_DICT).length + "）");
ok(srcScenes.length === SCENES.length, "场景数一致（" + SCENES.length + "）");
ok(JSON.stringify(srcScenes) === JSON.stringify(SCENES), "SCENES 内容逐字节一致");
ok(JSON.stringify(srcVlogs) === JSON.stringify(VLOGS), "VLOGS 内容逐字节一致");

console.log("");
console.log("结果: " + pass + " 通过 / " + fail + " 失败");
if (fail > 0) {
  console.error("⚠️  内核数据与网站源不一致！请重新运行提取：node scripts/extract_core_data.mjs");
  process.exit(1);
}
