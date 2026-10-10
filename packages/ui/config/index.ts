import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import path from "path";

const CORE_DIR = path.resolve(__dirname, "..", "..", "core");

// core 包在项目 src 之外，扩展 script 规则 include 让 babel 处理它
// （Taro H5/mini 的 webpack script rule 默认只编译项目 src；include 是 ChainedSet，用 .add()）
function includeCore(chain: any) {
  const rules = (chain.module as any).rules;
  const sr: any = rules.get("script");
  if (sr) sr.include.add(CORE_DIR);
}

export default defineConfig(async (merge) => {
  const base: UserConfigExport = {
    projectName: "english-world-ui",
    date: "2026-10-10",
    designWidth: 375,
    // 样式按 375 视觉稿编写（原站 web 版实际像素迁移）：1px -> 0.5rem，真机 375 宽根字号 20px 时 16px 仍渲染 16px
    // 若用 750 会导致真机所有尺寸缩小一半（根字号 20px 时 16px 只渲染 8px）
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
        includeCore(chain);
      },
    },
    mini: {
      postcss: {
        pxtransform: { enable: true },
        cssModules: { enable: false },
      },
      webpackChain(chain) {
        includeCore(chain);
      },
    },
  };
  return base;
});
