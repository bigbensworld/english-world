import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import path from "path";
import fs from "fs";

const CORE_DIR = path.resolve(__dirname, "..", "..", "core");

export default defineConfig(async (merge) => {
  const base: UserConfigExport = {
    projectName: "english-world-ui",
    date: "2026-10-10",
    designWidth: 750,
    deviceRatio: { 640: 2.34 / 2, 750: 1, 828: 1.81 / 2, 375: 2 },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    framework: "react",
    compiler: "webpack5",
    alias: {
      "@english-world/core": path.resolve(CORE_DIR, "src", "index.ts"),
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      miniCssExtractPluginOption: { ignoreOrder: true },
      postcss: {
        autoprefixer: { enable: true, config: {} },
        cssModules: { enable: false },
      },
      webpackChain(chain) {
        try {
          const dump: any = { ruleNames: [], scriptRule: null, afterFix: null };
          const rules = (chain.module as any).rules;
          for (const key of rules.store.keys()) dump.ruleNames.push(key);
          const sr: any = rules.get("script");
          if (sr) {
            dump.scriptRule = sr.toConfig();
            // include 是 ChainedSet：用 .add() 追加 core 目录
            sr.include.add(CORE_DIR);
            dump.afterFix = sr.toConfig();
          }
          fs.writeFileSync("/tmp/taro-rules-debug.json", JSON.stringify(dump, (k, v) => (typeof v === "function" ? "FN" : v), 2));
        } catch (e: any) {
          fs.writeFileSync("/tmp/taro-rules-debug.json", "ERROR: " + (e && e.stack));
        }
      },
    },
    mini: {
      postcss: {
        pxtransform: { enable: true },
        cssModules: { enable: false },
      },
    },
  };
  return base;
});
