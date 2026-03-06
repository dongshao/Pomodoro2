# 🍅 Pomodoro Web 应用技术架构文档

## 1. 架构概览 (Architecture Overview)

本项目采用现代前端技术栈构建纯静态的单页应用程序 (SPA)。系统无后端服务器支持，所有功能逻辑和数据存储均在客户端的浏览器环境中完成并进行本地持久化，最后由 GitHub Pages 提供静态资源托管与分发服务。

### 1.1 技术栈选型
*   **核心框架:** Vue 3 (Composition API / `<script setup>` 语法)。
*   **构建工具:** Vite (极速的冷启动、轻量的开发环境)。
*   **状态管理:** Pinia (直观、模块化且支持 TypeScript 的官方状态管理库)。
*   **路由管理:** (可选) 基于单页面结构，如果只是简单的计时器+设置面板，考虑直接使用状态切换视图，以最大程度保持轻量。若后续迭代页数增多，可引入 Vue Router 4。
*   **样式方案:** Vanilla CSS配合 CSS 变量（CSS Custom Properties） 或 Tailwind CSS。建议采用 CSS 变量以方便实现多主题色的动态无缝切换。
*   **图标库:** 用户可通过 SVG 直出或使用轻量的图标方案如 Lucide 或 Heroicons。
*   **字体:** 引入清晰易读的现代无衬线字体 (如 Inter 或 Google Fonts 提供的 Roboto)。

## 2. 系统模块设计 (System Modules)

应用主要由四个松耦合的核心功能模块组成：

### 2.1 计时引擎核心 (Timer Core Engine)
该模块是应用的心脏，负责管理和驱动 `25分钟番茄钟`、`5分钟短休`、`15分钟长休` 三个核心生命周期。

*   **职责:** 维持高精度的秒级递减，处理“开始(Start)”、“暂停(Pause)”、“继续(Resume)”和“重置(Reset)”。
*   **技术实现:** 利用原生 JavaScript 的 `setInterval` 或更精确的 `requestAnimationFrame` API 构建基础心跳。心跳数据与 Vue 的响应式引用 (`ref`) 绑定以驱动页面重新渲染。
*   **生命周期钩子:** 暴露计时结束事件 (`onComplete`) 供 UI 层面或音效播放服务调用。

### 2.2 数据协同与状态管理层 (State Management Store)
利用 Pinia 为应用提供统一的数据存取管道，拆分成若干 Store：

*   **`useTimerStore`:** 存放当前时间段（秒）、当前模式（Pomodoro/Short/Long Break）、计时运行状态（isActive）及本轮完成番茄数。
*   **`useSettingsStore`:** 配置项控制中心，存取用户个人偏好的各种自定义时长与开关设定。
*   **`useTodoStore`:** 维护简易任务清单的增删改查数组，及记录当前被高亮“聚焦”的任务。

### 2.3 本地持久化缓存 (LocalStorage Mapper)
作为唯一的数据持久化引擎，处理页面刷新后的恢复与重建。

*   **实现机制:** 通过 Vue 的 `watch` / `watchEffect` 深层监听 Pinia 里的 `settings` 与 `todos` 状态引用。一旦检测到修改，立刻通过 `JSON.stringify` 序列化最新状态写入 `window.localStorage`。并在应用首次挂载(`onMounted`)时读取重建。

### 2.4 主题样式适配器 (Theme & Styles Adapter)
实现视觉设计的动态反馈体系，强化专注氛围。

*   **技术逻辑:** 预定义三套全局的 CSS 变量颜色调色板 (例如 `var(--color-primary)`)。
*   **触发条件:** 当 `useTimerStore` 中定义的当前模式 (Mode) 发生变更时，由顶层组件捕捉，通过动态切换 `<body>` 标签的 class 或向根节点注入内联 style 来全局平滑过渡主题色。

## 3. UI 视图组件树 (View Components Tree)

采用基于组件粒度的拆分，保持单一职责。

```text
src/
├── App.vue  (入口与布局容器，在此根据当前状态渲染对应的主题背景色与核心内容)
│
├── components/
│   ├── layout/
│   │   └── TopHeader.vue     (应用顶部导航条，含 Logo、设置入口及轻量打卡摘要)
│   │
│   ├── timer/
│   │   ├── TimerControls.vue (Pomodoro / Short Break / Long Break 模式切换按钮组)
│   │   ├── TimerDisplay.vue  (中央超大数字倒计时显示与 Tab Title 更新逻辑)
│   │   └── ActionButtons.vue (开始/暂停/重置 核心操作栏)
│   │
│   ├── todo/
│   │   ├── TodoList.vue      (任务卡片渲染容器)
│   │   ├── TodoItem.vue      (单条任务，含完成勾选、修改按钮及设置“聚焦”按钮)
│   │   └── AddTodo.vue       (简单的输入表单组件)
│   │
│   └── settings/
│       └── SettingsPanel.vue (呼出的悬浮或侧滑面板，提供时长调节与音量控制组件)
```

## 4. 关键技术难点与处理方案

### 4.1 核心后台计时挂起 (Tab Background Throttling)
**问题:** 现代浏览器为节省电池和 CPU，当标签页不可见或处于后台时，原生 `setInterval` 的触发频率会被强行降频 (通常至 1次/秒甚至更高)。
**策略:**
1.  **基于时间戳差值进行校验:** `setInterval` 内部不仅执行 `--seconds`，还要在启动时记录 `startTime = Date.now()` 并结合预计结束时间进行高精度比对补偿。
2.  **Web Worker (可选优化):** 如发现严重飘移，可以采用 Web Worker 异步线程进行独立读秒和事件通知，绕开主界面的休眠降频机制。

### 4.2 Tab Title 的动态同步更新
**策略:** 将更新逻辑挂载在 `useTimerStore` 中倒计时驱动状态(`remainingTime`)的计算属性(`computed`)上。通过 Vue 的 `watch` 监听该值的格式化结果 (如 `24:59`)，直接对 `document.title` 进行覆写同步。

## 5. 项目构建与发布通道 (CI/CD Pipeline)

基于完全利用免费资源的理念，采用 **GitHub Actions -> GitHub Pages** 工作流。

### 5.1 构建部署策略
*   项目将在仓库根目录放置 `.github/workflows/deploy.yml`。
*   每次代码成功推送 (`push`) 至 `main` / `master` 分支，即触发流水线任务。

### 5.2 Flow 步骤
1.  检出代码 (Checkout Source)
2.  设置 Node.js 运行环境体系。
3.  通过 `npm ci` 执行构建级的依赖隔离安装。
4.  运行 `npm run build` 打包构建 Vite 生产优化版资源文件至 `/dist/`。
5.  应用利用官方 Action (如 `peaceiris/actions-gh-pages`) 推送产物给特殊的 `gh-pages` 部署分支，完成静态更新与分发。
