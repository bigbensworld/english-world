# 英语世界视觉升级：执行 Prompt

你现在是一个可以直接修改文件、运行命令并完成验证的开发代理。请不要只给方案，直接在项目中执行，直到本轮任务完成并通过验收。

## 项目位置

项目目录：

`/Users/alice/WorkBuddy/3/english-world`

项目类型：纯 HTML + CSS + JavaScript 静态网页游戏，无构建工具、无 npm 依赖。

当前已有能力：

- 地图选择场景
- 咖啡店和超市场景
- 点击物品弹出英文词卡
- 单词、音标、中文、例句和浏览器 TTS
- 词汇收集册
- 顾客点单/购物清单小游戏
- 金币与场景解锁
- localStorage 持久化
- Fluent Emoji 3D 本地图标
- CSS 弹跳、浮动、摇摆、挤压、吉祥物等基础动效
- `test.js` 无头 DOM 回归测试

相关文档：

`/Users/alice/WorkBuddy/3/english-world/docs/visual-implementation-acceptance.md`

请先阅读该文档，并以它作为本轮实施和验收标准。

## 本轮目标

执行“阶段 0：冻结视觉基线”以及“阶段 3：完成吉祥物状态机”的开发，不要扩展新场景，不要购买或生成外部素材，不要引入第三方依赖。

目标是让游戏在现有零成本基础上更统一、更精致、更灵动：

1. 统一视觉变量、颜色、圆角、阴影和主题。
2. 让咖啡店/超市场景主题由数据字段驱动。
3. 让吉祥物具备可验证的 `idle`、`happy`、`thinking`、`sad` 状态。
4. 让收集新词、答对、答错、开始游戏等事件触发角色状态。
5. 保留现有 Fluent Emoji 3D 图标和所有核心玩法。
6. 保留图片加载失败时的 emoji 降级。
7. 保留 `prefers-reduced-motion` 支持。

## 必须先做

1. 阅读以下文件：
   - `index.html`
   - `style.css`
   - `data.js`
   - `game.js`
   - `test.js`
   - `docs/visual-implementation-acceptance.md`
2. 检查当前 git 状态和已有改动，不要覆盖用户未提交的无关修改。
3. 先运行现有测试，确认基线结果。
4. 根据实际代码结构实施，不要假设函数名或 DOM 结构一定存在。

## 具体实施要求

### 一、视觉基线

在 `style.css` 中：

- 统一使用 CSS 变量管理：
  - 页面背景
  - 主文字和次文字
  - 主绿色
  - 奖励黄色
  - 错误色
  - 咖啡店主题色
  - 超市主题色
  - 卡片圆角
  - 按钮圆角
  - 阴影层级
- 不使用纯黑背景。
- 不引入霓虹、过饱和渐变或复杂第三方视觉库。
- 动画优先使用 `transform`、`opacity`、`filter`。
- 保持现有页面结构和玩法，不做大规模重写。

### 二、场景主题数据驱动

在 `data.js` 中，为每个现有场景补充或统一以下字段，字段名可根据当前代码合理调整：

```js
theme: "cafe",
accent: "#...",
accentSoft: "#...",
deco: "...",
deco2: "..."
```

在 `game.js` 中：

- 进入场景时把主题字段应用到场景容器。
- 不要为咖啡店和超市分别复制完整渲染逻辑。
- 主题字段缺失时必须有安全默认值。

### 三、吉祥物状态机

检查现有吉祥物实现，尽量在现有 DOM 和 CSS 上增量修改，不要重复创建多个吉祥物。

至少实现以下状态：

| 状态 | 触发时机 | 期望表现 |
|---|---|---|
| `idle` | 默认 | 呼吸、偶尔眨眼，动作轻微 |
| `happy` | 新词收集、答对、解锁成功 | 短暂弹跳/开心反馈，然后回到 idle |
| `thinking` | 小游戏开始、题目出现、等待选择 | 轻微思考动作 |
| `sad` | 答错 | 短暂下沉/摇头，然后回到 idle 或 thinking |

建议实现一个统一函数，例如：

```js
setMascotState("happy", 900)
```

要求：

- 防止快速连续触发造成 class 堆叠和状态错乱。
- 状态结束后回到 `idle` 或当前合理状态。
- 角色不遮挡按钮、词卡、游戏选项和 toast。
- 角色动画不超过 700ms，除非是 idle 循环动画。
- 角色状态同时有文字、颜色、图标或其他非动画反馈。

### 四、事件接入

把角色状态接入真实事件：

- 点击新物品并首次收集：`happy`
- 进入小游戏或渲染新题：`thinking`
- 答对：`happy`
- 答错：`sad` 或 `thinking`
- 场景解锁成功：`happy`
- 返回地图/关闭游戏：`idle`

如果现有函数命名不同，请按实际代码定位，不要为了迎合示例强行改名。

### 五、无障碍和移动端最低要求

确认并补齐：

- `prefers-reduced-motion: reduce` 时停用非必要动画。
- 主要按钮和交互元素有清晰的 `:focus-visible` 样式。
- 吉祥物有 `aria-label` 或等价可访问描述。
- 3D 图标有准确 alt，纯装饰图不干扰读屏。
- 主要触控目标约 44×44 CSS px。
- 在 375×667 和 390×844 下无横向滚动。
- 不依赖 hover 才能完成核心玩法。

## 测试要求

完成修改后必须按顺序执行：

1. JavaScript 语法检查：

```bash
node --check /Users/alice/WorkBuddy/3/english-world/game.js
node --check /Users/alice/WorkBuddy/3/english-world/data.js
node --check /Users/alice/WorkBuddy/3/english-world/test.js
```

2. 运行回归测试：

```bash
node /Users/alice/WorkBuddy/3/english-world/test.js
```

要求原有测试全部通过；如果修改了行为导致测试需要补充，请先判断是否是真 bug，再更新测试。

3. 检查本地资源路径，确认图标至少存在并可访问：

- `assets/icons/`
- `assets/licenses/`

4. 启动或复用本地 HTTP 服务进行真实浏览器验证。不要使用会触发 shell 环境问题的 `cd <path> && ...` 写法。可以使用：

```bash
python3 -m http.server 8765 --directory /Users/alice/WorkBuddy/3/english-world
```

5. 浏览器中逐项验证：

- 地图加载
- 进入咖啡店
- 点击一个未收集物品
- 词卡显示
- 吉祥物切换 happy 后恢复 idle
- 进入小游戏
- 吉祥物切换 thinking
- 答对时 happy
- 答错时 sad/thinking
- 返回地图
- 进入超市场景
- 刷新页面后进度仍存在
- 图片加载失败时 emoji 仍能显示

## 不要做的事情

- 不要引入 npm、React、Three.js、PixiJS、GSAP、Lottie。
- 不要下载或引用外部图片、外部 CDN、占位图或未知远程脚本。
- 不要删除 `.workbuddy` 文件夹。
- 不要覆盖或撤销用户已有的无关修改。
- 不要修改内容方案和词汇数据，除非为了修复本轮视觉功能。
- 不要只描述代码，不实际修改和验证。
- 不要在测试失败时直接宣布完成。

## 最终交付格式

完成后请用中文简洁汇报：

1. 修改了哪些文件。
2. 每个文件的关键改动。
3. 测试结果，包括语法检查和回归测试数量。
4. 浏览器实际验证了哪些流程。
5. 尚未解决的问题或风险。
6. 如果项目有 git 变更，请给出 `git diff --stat` 和当前状态；不要擅自提交，除非我明确要求提交。

只有在 P0 验收项全部通过后，才能说本轮完成。
