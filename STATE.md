# english-world 项目状态（STATE）

> 更新时间：2026-10-10 晚（第五批内容上线）· 最新 commit 见第七节
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

**场景冒险（15 个场景，79 轮光顾）**：
| 场景 | 轮次 | 状态 |
|---|---|---|
| ☕ 咖啡店 | 8 轮（点单/下午茶/赶时间/定制/出错投诉/问推荐忌口/文化深潜/会员优惠） | ✅ 完整 |
| 🍽️ 餐厅 | 6 轮（入座点餐/牛排酒水/账单打包/特殊饮食/上错菜投诉/小费文化） | ✅ 完整 |
| 🛒 超市 | 5 轮（日常采购/找特定商品/退换货/会员折扣/生鲜称重，词条 22→30） | ✅ 完整 |
| 🏨 酒店 | 5 轮（入住/退房/投诉房间/房卡报修/设施服务，词条 15→24） | ✅ 完整 |
| ✈️ 机场 | 5 轮（值机托运/安检口/登机起飞/延误改签/入境海关，词条 15→23） | ✅ 完整 |
| 🏥 医院 | 5 轮（挂号问诊/药房取药/复诊复查/急诊保险/疫苗体检，词条 20→28） | ✅ 完整 |
| 🚌 交通出行 | 5 轮（公交地铁/街头问路/打车网约车/坐过站落东西/小费打车文化，38 词条） | ✅ 完整 |
| 🏦 银行 | 5 轮（开户/换汇取现/银行卡出问题/**支票信用分文化/国际汇款**，42 词条） | ✅ 完整 |
| 💈 理发店 | 5 轮（剪发沟通/染发护理/办卡预约/**剪坏了投诉/小费沙龙文化**，40 词条） | ✅ 完整 |
| 🏋️ 健身房 | 5 轮（办卡参观/首次训练/会员问题私教/**受伤求助/健身文化与礼仪**，42 词条） | ✅ 完整 |
| 📦 网购与退货 | 5 轮（下单咨询/收货问题/退款拉锯战/**包裹丢失/评价售后文化**，41 词条） | ✅ 完整 |
| 📮 邮局 | 5 轮（**寄包裹/寄信与邮票/取件与查询/寄件出状况/邮局文化课**，40 词条） | ✅ 完整 |
| 📚 图书馆 | 5 轮（**办证借书/预约热门书/还书逾期/图书馆礼仪/研究服务深潜**，37 词条） | ✅ 完整（第五批新增） |
| 🐾 宠物医院 | 5 轮（**预约体检/疫苗预防/急诊袜子事件/宠物文化课/慢性病处方粮**，36 词条） | ✅ 完整（第五批新增） |
| 🎓 学校 | 5 轮（**新生报到/选课风波/邮件礼仪/小组作业/学术诚信**，34 词条） | ✅ 完整（第五批新增） |

合计：**79 轮 / 564 步 / 538 词条**（此前 64 轮 / 471 步 / 431 词条）。
**场景分组 UI 已更新**：🏠 日常高频（咖啡/餐厅/超市/交通/理发/健身/网购/**宠物医院**，8 个）· ✈️ 旅行出行（机场/酒店，2 个）· 🚑 应急保障（医院/银行/邮局，3 个）· 🎓 **校园生活（图书馆/学校，2 个，新增组）**；未分组场景自动归入『更多场景』防丢卡。

**慢速生活频道（12 集）**：Morning Routine / Cooking Breakfast / Making Coffee + Grocery Run / Doing Laundry / Cleaning the House + The Morning Commute / Walking the Dog / Weekend Errands + **Cooking Dinner / Gardening / Home Workout**；每集 7 动作卡 + 1 冷知识卡；新 3 集动画全部复用既有 keyframes（无新增）；单词点击查词（VLOG_DICT 448→**565** 词条带词形还原，含新 3 集功能词缺口补全）

**内容充足度标准（2026-10-10 定型，新增内容按此判定）**：
- 功能覆盖矩阵 6 位：①常态流程 ②变化定制 ③出错意外 ④文化潜规则 ⑤金钱会员 ⑥难度分层——每格至少 1 轮
- 底线数值：≥5 轮 / ≥30 步 / 词条 ≥22
- 停手信号（新知密度）：每轮新知单元（新词条+新语块+新文化点）≤2 → 该场景讲透，开新场景
- 分类：10~12 个场景后再分组（频率×场景域：日常高频/旅行出行/应急保障），现在平铺

**内容路线图（已定）**：
1. ✅ 第一批：餐厅 4 轮
2. ✅ 超市多轮化 3 轮（日常采购/找特定商品/退换货）
3. ✅ 第二批：酒店 3 轮（入住/退房/投诉房间）
4. ✅ 第三批：机场 3 轮（值机/安检/登机）
5. ✅ 第四批：医院/药房 3 轮（挂号问诊/药房取药/复诊复查）
6. ✅ 第五批补轮（对标咖啡店 8 轮标杆）：餐厅 +2（上错菜投诉/小费文化）、超市 +2（会员折扣/生鲜称重）、酒店 +2（房卡报修/设施服务）、机场 +2（延误改签/入境海关）、医院 +2（急诊保险/疫苗体检）
7. ✅ 交通+问路 3 轮（公交地铁/街头问路/打车网约车）
8. ✅ vlog 新主题集 3 集（Grocery Run / Doing Laundry / Cleaning the House）
9. ✅ 交通补轮 2 轮（坐过站落东西/小费打车文化——补齐功能位③④）
10. ✅ 新场景：银行 3 轮（开户/换汇取现/银行卡出问题）
11. ✅ 新场景：理发店 3 轮（剪发沟通/染发护理/办卡预约）
12. ✅ 银行/理发店补轮至 5 轮（v4 文化深潜/出错维权 + v5 金钱进阶）
13. ✅ 新场景：健身房 3 轮（办卡参观/首次训练/会员问题与私教）
14. ✅ 新场景：网购退货 3 轮（下单咨询/收货问题/退款拉锯战）
15. ✅ 健身房/网购补轮至 5 轮（v4 出错意外 + v5 文化潜规则）——**全站 11 场景功能矩阵 6/6 全覆盖**
16. ✅ 场景分组 UI（频率×场景域三分组）
17. ✅ 新场景：邮局 5 轮（寄包裹/寄信与邮票/取件与查询 + v4 出错意外/v5 文化潜规则）——第 12 个场景，应急保障组成 3 个
18. ✅ vlog 新主题集 3 集（The Morning Commute / Walking the Dog / Weekend Errands），VLOG_DICT 448 词条
19. ✅ 第五批：图书馆/宠物医院/学校 3 场景各 5 轮 + vlog 3 集（Cooking Dinner / Gardening / Home Workout），VLOG_DICT 565 词条
20. ⬜ 候选：更多场景（书店/药房独立/租车）、vlog 新主题（Meal Prep / Car Wash / Hiking）、Phase 1 Taro 重建 UI（内容已达 15 场景，架构迁移优先级上升）

**跨端架构（2026-10-10 拍板，Phase 0 已落地）**：
- 目标：一套架构同时支持网站/微信小程序/App；三端统一**静态离线优先**（网站纯静态 CF Pages、小程序全资源分包零网络请求、App Capacitor 全本地）。
- `packages/core/` 共享内核（TS）：types + 数据（_raw.js 从源提取）+ 场景引擎（去 DOM 纯逻辑）+ Storage/TTS 适配器接口。方案详见 `docs/cross-platform-architecture.md`。
- **内容生产标准流程**：改 data.js/vlogs.js/vlog.js → `node scripts/extract_core_data.mjs` → 三组测试全过（core.test.ts + sync-guard.test.ts + test.js）。
- 路线：Phase 1 Taro 重建 UI（建议医院+交通两批上线后启动）→ Phase 2 预生成音频 mp3+时间戳 → Phase 3 小程序 MVP + Capacitor App + 云同步。

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
63e2ac9 内容扩展: 新增图书馆/宠物医院/学校场景 15 场景 79 轮 564 步 538 词条 + vlog 补 3 集（12 集）
ce90770 文档: STATE.md 同步第四批内容（12 场景 64 轮 471 步 431 词条，vlog 9 集）（API 逐文件上传等价提交）
874664c 内容扩展: 新增邮局场景 5 轮 + vlog 补 3 集（12 场景 64 轮 471 步 431 词条 + vlog 9 集）
ce129dc 场景分组 UI + 健身房/网购补至 5 轮（11 场景 59 轮 431 步 391 词条）
1d7c558 文档: STATE.md 同步第二批内容（11 场景 55 轮 407 步，分组临界点提示）
9471b21 文档: STATE.md 同步内容扩展（9 场景 45 轮 350 步，vlog 6 集，内容充足度标准）
0c416e8 内容扩展: vlog 补 3 集 + 交通补 2 轮 + 新增银行/理发店场景（9 场景 45 轮 350 步 + vlog 6 集）
0b0beee 文档: STATE.md 同步交通场景（7 场景 37 轮 297 步 210 词条）
d552948 内容扩展: 五场景各补 2 轮进阶光顾（34 轮/275 步/188 词条）+ 修复咖啡店 v8 奖励词匹配
2e07315 内容扩展: 新增医院场景（挂号问诊/药房取药/复诊复查 3 轮光顾，20 词条）
93be5ef 文档: 跨端架构 v1.1——网站也走纯静态（三端统一离线优先）
9a548dd 跨端架构 Phase 0: 抽出共享内核 packages/core（TS 类型+数据+场景引擎+平台接口）
5a3f8ff 文档: STATE.md 同步学习者视角改造
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
