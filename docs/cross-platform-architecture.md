# 英语世界 · 跨端（网站 / 微信小程序 / App）技术架构方案

> 版本 v1.0 · 2026-10-10 · Phase 0 已落地（见第五节）
> 决策记录：Taro（React）跨端框架 + Capacitor App 壳 + 预生成音频 + 微信登录云同步（Phase 3）。

## 一、总体架构

```
packages/
├── core/        # 共享内核（TS）：数据模型、场景引擎、存储/TTS 接口、单测  ← Phase 0 已建
├── ui/          # Taro (React) UI 层：一套代码编译 weapp + h5            ← Phase 1
├── audio/       # 预生成 mp3 + 每词时间戳 JSON                           ← Phase 2
└── app/         # Capacitor 壳（复用 H5 产物出 iOS/Android）             ← Phase 3
```

核心原则：**数据、引擎逻辑、测试全部下沉 core；平台层只剩 UI 壳与适配器（storage / TTS / 支付）注入。**

| 平台 | 技术选型 | 说明 |
|---|---|---|
| 网站 (H5) | Taro 编译 H5 → Cloudflare Pages | 替换现有纯静态站，UI 像素级对齐 |
| 微信小程序 | Taro 编译 weapp | 一套 React 代码，微信审核发布 |
| App (iOS/Android) | Capacitor 壳包 H5 产物 | 无需原生开发，后续可加原生插件 |

## 二、静态资源能否打包进小程序 / App？

**结论：可以，且本项目资源体量完全在打包限制之内。**

| 资源 | 当前体积 | 打包进小程序 | 打包进 App |
|---|---|---|---|
| Fluent Emoji PNG 图标（24 个） | 816 KB | ✅ 直接放主包 | ✅ 无限制 |
| 数据 JS（SCENES+VLOGS+词典） | ~240 KB | ✅ 主包代码 | ✅ |
| style.css / 动画 | ~37 KB | ⚠️ 小程序不支持 `<style>` 原样复用，Taro 会转换大部分；17 组 emoji 动画 keyframes 需用小程序 animation/CSS（Taro 支持 CSS 动画）重验 | ✅ |
| 音频 mp3（Phase 2 预生成） | 估算：300 句 × ~30KB ≈ **9-15 MB** | ✅ 但**不能全塞主包**（见下） | ✅ 全部本地打包，离线可用 |

**小程序包体硬限制（关键）：**
- 主包 ≤ **2 MB**（代码+图标+数据已约 1.1 MB，音频不能进主包）
- 单个分包 ≤ 2 MB，总包（主包+全部分包）≤ **30 MB**
- **对策：音频按场景分包**——主包放引擎+首页+图标（~1.1 MB），每个场景一个分包（音频 2-5 MB/场景），进入场景时微信自动下载分包。30 MB 上限按当前规划（20 场景 × 音频压缩到 24kbps 单声道约 1.5MB/场景）可容纳，扩到 30+ 场景时再评估 CDN 方案（需备案域名）。
- App 端无任何包体压力，全部资源本地化，**天然离线可用**——这正是 App 相对小程序的体验优势。

**内容生产建议**：新内容一律先写进 core（单一数据源），小程序/H5 由构建管线分发——避免三端内容不同步。

## 三、TTS / 音频方案（Phase 2）

| 端 | 方案 |
|---|---|
| H5（现状） | Web Speech API（保留为兜底），逐步切换预生成 mp3 |
| H5（目标）+ 小程序 + App | 预生成 mp3 + **每词时间戳 JSON**（`{word: "alarm", start: 120, end: 480}`），播放器按时间戳驱动逐词高亮——替代 Web Speech 的 onboundary，三端行为完全一致、离线可用、音色稳定 |
| 生成管线 | edge-tts / Azure TTS 批量生成 → 强制校验时间戳 → 入 audio/ 包；许可合规按 docs/content-plan.md 执行（商用前锁定条款明确的供应商） |

## 四、合规前置（小程序上线前必须解决）

1. **类目**：教育类目需企业主体；个人主体只能工具类目，含系统教学内容有拒审风险 → 建议注册个体工商户/公司
2. **域名**：小程序内网络请求（若音频走 CDN / 云同步 API）必须 ICP 备案域名——pages.dev 无法备案，需另购域名
3. 若全部资源打包本地（第二节方案），小程序可**零网络请求**运行，域名校验可大幅简化，这是 Phase 2 首选
4. web-view 套壳与小游戏类目（需版号）已排除

## 五、Phase 0 已落地（本次提交）

| 产出 | 位置 | 说明 |
|---|---|---|
| 类型定义 | `packages/core/src/types.ts` | Scene/Visit/Step/Vlog/GameState 等，与现有数据一一对应 |
| 数据层 | `packages/core/src/data/_raw.js` + `index.ts` | 从 data.js/vlogs.js/vlog.js 脚本化提取（内容零变化），`findScene/findVlog` 查询 |
| 场景引擎 | `packages/core/src/engine/scene.ts` | sceneVisits/visitKey/unlockedVisitIndex/finishedVisits/pickNpcLine/applyAnswer/applyFinish/resumeOrder/sceneCardStatus——去 DOM 化的纯逻辑 |
| 平台接口 | `packages/core/src/platform/adapters.ts` | StorageAdapter/TTSAdapter 接口 + Web/Memory 实现 + SaveService |
| 内核测试 | `packages/core/test/core.test.ts` | 60/60 通过（数据完整性 + 引擎全流程，迁移自 test.js） |
| 同步守卫 | `packages/core/test/sync-guard.test.ts` | 4/4 通过：内核数据与网站源逐字节比对，防漂移 |
| 提取脚本 | `scripts/extract_core_data.mjs` | 改源数据后重跑提取 |
| 网站回归 | `test.js` | 85/85 通过，**网站行为零变化** |

**工作流约定**：改 data.js / vlogs.js / vlog.js 后 → `node scripts/extract_core_data.mjs` → 跑两个测试目录。

## 六、路线图

| 阶段 | 内容 | 状态 |
|---|---|---|
| Phase 0 | 抽内核（数据/引擎/接口/测试） | ✅ 本次完成 |
| Phase 1 | Taro 重建 UI，先 H5 对齐现站 | ⬜ 待启动（建议内容再冲 1-2 批后） |
| Phase 2 | 音频管线（预生成 mp3+时间戳）+ 分包方案 | ⬜ |
| Phase 3 | 小程序 MVP → Capacitor App → 微信登录+云同步 | ⬜ |
