# english-world 项目状态（STATE）

> 更新时间：2026-10-10 16:05 · 最新 commit 见第七节
> 新会话冷启动指南：读完本文即可继续开发，无需翻历史对话。

## 一、项目是什么

**英语世界（English World）**——教育游戏网站，"剧本化英语场景学习"，对标 TikTok 慢 vlog + 场景对话。

核心差异化（已确认的产品战略）：
- **无 AI、剧本化、零门槛**——纯静态前端，无 API 依赖，离线可用
- 输入训练（慢 vlog）+ 输出训练（场景对话）双模式
- 服务"还不敢开口"的初学者（AI 陪练产品的用户漏斗上游）

- 线上地址：**https://english-world.pages.dev**
- 仓库：GitHub bigbensworld/english-world（main）
- 本地路径：`/Users/alice/WorkBuddy/3/english-world`

## 二、技术架构

纯静态站（无构建、无框架、无后端）：

| 文件 | 职责 |
|---|---|
| `index.html` | 页面骨架：首页 Tab + 场景页 + 词汇册/词卡弹窗 |
| `data.js` | 场景对话数据（SCENES） |
| `vlogs.js` | 慢 vlog 数据（VLOGS） |
| `game.js` | 场景对话引擎 + 全局 state + 词汇册 |
| `vlog.js` | vlog 引擎 + 内置词典 VLOG_DICT + speakSlow |
| `style.css` | 全部样式 + CSS 动画库 |
| `test.js` | 无头回归测试（85 个断言，node 直接跑） |
| `assets/icons/` | Fluent Emoji 3D PNG 图标 |

**关键机制**：
- localStorage key `englishWorldV2`：collected / phrases / npcLastLines / progress / unlockedVisits / vlogSeen / vlogQuiz
- 首页双 Tab：📺 慢速生活 / 🗺️ 场景冒险（**新访客默认慢速生活**——"先听懂，再开口"路径；sessionStorage 记住选择）
- vlog 首屏含价值主张文案（"不敢开口？先从你每天都会遇到的英语开始"）+ 学习路径三步（①先听懂→②再开口→③反复练）+ 底部 CTA「进入场景冒险」
- 多轮光顾：场景由 visits 数组组成，通关一轮解锁下一轮（unlockedVisits）；单轮场景用 steps（向后兼容，访问层 sceneVisits() 统一）
- 台词防重复：npcLastLines 记录每步上次台词，重玩排除上一句
- 对话节奏：打字动画 900ms → 店员台词 + 朗读 → 停 600ms 才渲染任务提示/选项（防剧透抢答，adv.stepReady 控制）；答对后停 2400ms 再进下一步（给回复朗读 + 语块卡留时间）
- 答错教学反馈（f8c81ed）：错选 tip 讲错因 + `<b>正确句</b>` + 正确项 tip + 自动朗读正确答案 + 绿色高亮，教学卡 .retry-teach 样式
- 隐藏测试模式：场景页连点标题 5 次解锁全部轮次（验收用）
- TTS：Web Speech API；speakSlow() 已修 Chrome cancel+speak 吞音 bug（延迟 150ms + resume）；vlog 进卡/切卡即自动慢速播放
- 词汇册：vlog 词条（键 `vlog:vlogId:词组`）单独分区展示，释义走 VLOG_DICT（含词形还原），旧格式（true）兼容
- 逐词高亮：SpeechSynthesisUtterance.onboundary (charIndex) → .v-word.active

## 三、内容现状

**场景冒险（5 个场景）**：
| 场景 | 轮次 | 状态 |
|---|---|---|
| ☕ 咖啡店 | 8 轮（点单/下午茶/赶时间/定制/出错投诉/问推荐忌口/文化深潜/会员优惠） | ✅ 完整 |
| 🍽️ 餐厅 | 4 轮（入座点餐/牛排酒水/账单打包/特殊饮食） | ✅ 完整 |
| 🛒 超市 | 3 轮（日常采购 11 步/找特定商品 9 步/退换货 6 步，词条 12→22） | ✅ 完整 |
| 🏨 酒店 | 3 轮（入住 8 步/退房 6 步/投诉房间 7 步，15 词条） | ✅ 完整 |
| ✈️ 机场 | 3 轮（值机托运 8 步/安检口 6 步/登机起飞 7 步，15 词条） | ✅ 完整 |

**慢速生活频道（3 集）**：Morning Routine / Cooking Breakfast / Making Coffee，每集 7 动作卡 + 1 冷知识卡；17 组 CSS 动作动画 keyframes；单词点击查词（VLOG_DICT ~150 词条带词形还原）

**内容路线图（已定）**：
1. ✅ 第一批：餐厅 4 轮
2. ✅ 超市多轮化 3 轮（日常采购/找特定商品/退换货）
3. ✅ 第二批：酒店 3 轮（入住/退房/投诉房间）
4. ✅ 第三批：机场 3 轮（值机/安检/登机）
5. ⬜ 第四批：医院/药房 3 轮（描述症状）
6. ⬜ 第五批：交通+问路 3 轮

## 四、开发与部署流程

```bash
# 测试（必须全过再部署）
/Users/alice/.workbuddy/binaries/node/versions/22.22.2-3/bin/node /Users/alice/WorkBuddy/3/english-world/test.js

# 部署（Pages 为直传模式，push GitHub 不会自动部署！）
env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY -u all_proxy \
  CLOUDFLARE_API_TOKEN=$(cat ~/.wrangler/config/api-token | tr -d ' \n') \
  npx wrangler pages deploy /Users/alice/WorkBuddy/3/english-world --project-name english-world

# Git push（github.com 443 有时超时；API 逐文件上传可作 fallback）
env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY -u all_proxy \
  git -C /Users/alice/WorkBuddy/3/english-world push origin main
```

线上验证：用 cdp-live-web-verify skill（headless Chrome 真实点击流 + console errors 断言 0）。

## 五、已知坑（务必看）

1. **Write 工具单次上限 ~4.5KB**——长文件分片写入（Write 骨架 + Edit 追加）
2. **多 script 加载顺序**：game.js 顶层不能调用 vlog.js 的函数（vlog.js 在其后加载）→ ReferenceError 中断整个初始化链且不易察觉。vlog 初始化在 vlog.js 尾部自执行
3. **git 命令前加 `env -u http_proxy ...`** 绕代理；`GIT_PAGER=cat` 防 pager 卡死
4. **Chrome speechSynthesis**：cancel() 后立即 speak() 会被吞（已修，见 speakSlow）
5. **macOS 无 timeout 命令**；无头测试别用 `| tail`（会缓冲）
6. 验收时中文文案断言需带 `?lang=zh-CN`（headless Chrome 默认 en-US）

## 六、遗留事项 / 下一步建议

- [ ] 语音打分模式（Web Speech API SpeechRecognition，第二期游戏化）
- [ ] 导演排序模式（卡片排序 + TTS 连播）
- [ ] vlog 新主题集（Grocery Run / Doing Laundry / Cleaning）
- [ ] `media` 字段已预留：单卡可升级 AI 图/视频（A 方案 emoji 舞台覆盖 ~85% 动作，硬伤用分镜拆卡）
- [x] 词汇册对 vlog 词条的展示（已修：vlog 分区 + VLOG_DICT 释义 + 旧格式兼容，ae4990e）
- [x] 机场场景（已完成：值机/安检/登机 3 轮，15 词条，85 断言 + 线上 CDP 14/14 验证通过）
- [ ] 小程序适配（微信生态，独立工程，验证后再做）

## 七、近期 commit 索引（倒序）

```
f8c81ed 学习者视角改造: 默认慢速生活Tab + 首屏价值主张 + 学习路径CTA + 答错教学反馈
782ee36 内容扩展: 新增机场场景（值机/安检/登机 3 轮光顾，15 词条）
be49dfb 节奏修复: 选项延后至店员台词后渲染（防剧透）+ 答对间隔 1100ms→2400ms
7220752 内容扩展: 新增酒店场景（入住/退房/投诉房间 3 轮光顾，15 词条）
a4ae963 文档: STATE.md commit 索引同步 rebase 后 hash
46d0d5a 文档: STATE.md 更新（超市多轮化完成）
ae4990e 超市多轮化 3 轮 + vlog 进卡自动播放 + 词汇册 vlog 词条展示
f2cf936 文档: 新增 STATE.md 项目交接文档（新会话冷启动指南）
a4ba6b3 修复: 慢速播放偶发不生效
ba6288a 体验优化: 单词点击查词 + vlog 进入体验修复
31d9ad8 首页改版: Tab 分离慢速生活与场景冒险
76066f3 新功能: 慢速生活频道（Slow Vlog）
b25e5bf 内容扩展: 新增餐厅场景（4 轮光顾）
9e4e8ac 功能: 隐藏测试模式
f1c5c0f 内容升级: 咖啡店补齐 v5-v8（8 轮全集）
65ff88a 内容升级: 咖啡店多轮光顾模式
594da63 增强: 台词防重复
f874702 修复: 跨关提示清理 + 再玩重新开始
bec5a63 修复: 断点续玩
```
