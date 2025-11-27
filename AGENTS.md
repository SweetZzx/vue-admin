# Vue Admin 项目 - Agent 指南

## 项目概述
这是一个基于 Vue 3 的现代化管理后台，使用 TypeScript 和完整的工具链构建。

## 技术栈
- Vue 3 组合式 API + TypeScript
- Element Plus UI 框架
- Pinia 状态管理 + 持久化
- Vue Router 路由系统
- Vite 构建工具
- UnoCSS 原子化 CSS
- ECharts 数据可视化
- Axios HTTP 请求库

## 核心特性
- Vue API 和组件自动导入
- 开发环境 API 代理 (`/dev-api` -> `http://localhost:9999`)
- 响应式仪表盘，包含用户资料、数据表格和图表
- 基于角色的路由系统
- Husky Git 钩子保证代码质量

## 项目结构
```
src/
├── api/          # API 服务模块
├── assets/       # 静态资源
├── components/   # 可复用组件
├── hooks/        # 自定义 hooks/composables
├── layout/       # 布局组件
├── plugins/      # 插件配置
├── router/       # 路由配置（静态+动态路由）
├── stores/       # Pinia 状态存储
├── style/        # 全局样式
├── utils/        # 工具函数和 composables
├── views/        # 页面组件
│   ├── dashboard/    # 主仪表盘和图表
│   ├── login/        # 登录页面
│   ├── register/     # 注册页面
│   ├── role/         # 角色管理页面
│   └── ...           # 其他功能页面
├── App.vue       # 根组件
└── main.ts       # 应用入口点
```

## 开发命令
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 生产环境构建
- `pnpm lint` - 运行 ESLint
- `pnpm lint:fix` - 修复 ESLint 问题
- `pnpm format` - 使用 Prettier 格式化代码
- `pnpm format:check` - 检查代码格式
- `pnpm preview` - 预览生产构建

## 配置亮点
- Vite 配置包含自动导入和 Element Plus 集成
- 开发环境 API 代理设置
- 路径别名：`@` 指向 `src/`
- GitHub Pages 部署路径：`/vue-admin/`
- 自动导入目录：`src/composables/**`, `src/utils/**`
- 组件自动检测：`src/components` 和 `src/layout/components`

## 当前仪表盘功能
主仪表盘 (`src/views/dashboard/index.vue`) 包含：
- 用户资料（头像和登录信息）
- 课程购买统计数据表格
- 带图标的财务指标汇总卡片
- 多个 ECharts 可视化：
  - 订单趋势折线图
  - 用户活跃度柱状图
  - 视频数据分布饼图

## 路由系统
- 静态路由：仪表盘、登录、注册、重定向
- 动态路由：文档、测试、指南、角色管理、外部链接
- 基于布局的路由，支持嵌套子路由
- 路由元数据用于图标、标题和权限控制

## 代码风格指南
- 使用组合式 API 和 `<script setup>`
- 遵循 TypeScript 最佳实践
- 组件特定样式使用 SCSS
- 利用自动导入的 Vue APIs
- 保持一致的命名约定
- 使用 Element Plus 组件作为 UI 元素

## API 集成
- Axios 配置用于 HTTP 请求
- 全局 API 代理：组件中可用 `$api`
- 不同环境的 Base URL 处理
- 仪表盘图表的模拟数据结构

## 测试和质量
- ESLint + Prettier 保证代码质量
- Husky Git 钩子进行提交前检查
- Lint-staged 优化 linting
- Commitlint 规范化提交信息

## 开发注意事项
- 项目中部分 UI 文本和注释使用中文
- 图标来自 Iconify 的 Ant Design 图标集
- UnoCSS 配置了原子化样式预设
- Pinia 存储启用了状态持久化
- 通过 unplugin 实现组件自动注册

---

## 项目初始化发现的技术细节 (新增)

### 环境配置状态
- **Node.js**: v22.19.0 (最新 LTS 版本，性能优异)
- **npm**: v10.9.3
- **pnpm**: v10.18.3 (推荐包管理器，节省磁盘空间)

### Vite 配置深度解析
- 开发模式代理：/dev-api → http://localhost:9999
- 生产模式基础路径：/vue-admin/ (GitHub Pages 部署)
- 自动导入：Vue、Vue Router、Pinia APIs
- 组件自动注册：Element Plus + 自定义组件
- 路径别名：@ → src/
- ESLint 自动生成配置

### 主应用入口分析
```typescript
// src/main.ts 启动序列
1. 导入基础样式：normalize.css (重置样式)
2. 注册 Element Plus 插件
3. 配置 Pinia + 持久化插件
4. 导入 UnoCSS 原子化样式
5. 导入自定义全局样式 @/style/index.scss
```

### 路由架构详情
- **静态路由** (无权限控制):
  - /dashboard → 主仪表盘 (固定标签)
  - /login → 登录页面
  - /register → 注册页面  
  - /redirect → 重定向处理

- **动态路由** (可权限控制):
  - /documentation → 文档管理
  - /test/:id → 测试页面 (支持参数)
  - /guide → 指南页面
  - /role → 角色管理 (4个子页面：admin, user, person, changepassword)
  - /external-link → 外部链接

### 仪表盘技术实现细节
```vue
<!-- 数据流程 -->
1. 用户信息展示：头像 + 登录时间地点
2. 表格数据：课程购买统计 (今日/本月/总计)
3. 汇总卡片：4个财务指标 + 彩色图标
4. ECharts 图表：
   - 折线图：订单趋势数据 (多系列)
   - 柱状图：用户活跃度 (新增 vs 活跃)
   - 饼图：视频数据分布 (7个分类)
5. 响应式处理：ResizeObserver 自动调整图表大小
```

### 代码质量工具链
- **代码检查**: ESLint + Vue Plugin + TypeScript
- **代码格式化**: Prettier + 统一代码风格
- **Git 钩子**: Husky (commit-msg + pre-commit)
- **提交规范**: Commitlint (conventional commits)
- **性能优化**: Lint-staged (只检查变更文件)

### API 代理配置
开发环境请求代理配置：
```typescript
// /dev-api/login → http://localhost:9999/login
// 支持错误日志和请求日志输出
proxy: {
  '/dev-api': {
    target: 'http://localhost:9999',
    changeOrigin: true,
    rewrite: (p) => p.replace(/^\/dev-api/, '')
  }
}
```

### 自动导入机制
- **Vue APIs**: ref, reactive, computed, watch 等自动导入
- **组件**: Element Plus 和自定义组件无需手动导入
- **工具函数**: src/utils/** 和 src/composables/** 自动导入
- **类型声明**: auto-imports.d.ts 和 components.d.ts 自动生成

### 状态管理架构
- **app.ts**: 应用全局状态
- **user.ts**: 用户信息和权限
- **settings.ts**: 系统设置
- **tagsView.ts**: 标签页导航状态
- 所有存储都启用了持久化

### 样式系统
- **UnoCSS**: 原子化 CSS，预设包含 attributify 和 uno
- **SCSS**: 组件特定样式，支持模块化
- **全局样式**: normalize.css + 自定义变量
- **Element Plus**: 主题定制和按需导入

### 图标系统
- **Iconify**: 统一图标解决方案
- **Ant Design**: 主要图标集 (ant-design:*)
- **自动导入**: 图标组件无需手动引入
- **路由图标**: 通过 meta.icon 配置

### 部署配置
- **GitHub Pages**: 生产构建路径 /vue-admin/
- **环境变量**: .env.development 和 .env.production
- **构建优化**: Vite 代码分割和 Tree Shaking
- **预览模式**: pnpm preview 本地预览生产构建
