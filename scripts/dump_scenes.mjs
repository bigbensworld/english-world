// 从 data.js 提取 SCENES 导出为 JSON（供 Python 音频管线消费）
// 用法: node dump_scenes.mjs > /tmp/scenes.json
import { readFileSync, writeFileSync } from 'fs';
const src = readFileSync(new URL('../data.js', import.meta.url), 'utf8');
const sandbox = {};
new Function('module', src)(sandbox); // data.js 末尾若有 module.exports 走它；否则取 SCENES
const SCENES = sandbox.exports || globalThis.__SCENES__;
if (!SCENES) {
  // data.js 只声明 const SCENES = [...]，用 eval 提取
  const m = src.match(/const SCENES =\s*(\[[\s\S]*\]);?\s*$/);
  if (!m) throw new Error('SCENES not found');
  const sc = eval(m[1]);
  writeFileSync('/tmp/scenes.json', JSON.stringify(sc));
} else {
  writeFileSync('/tmp/scenes.json', JSON.stringify(SCENES));
}
console.error('dumped /tmp/scenes.json');
