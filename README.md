# 基金实时

一个基于 Next.js 14 的基金持仓实时看板，支持 OCR 识别截图、一键同步持仓，并展示实时估值和资讯快讯。

## 功能简介

- 持仓列表：展示自选基金的名称、代码、实时估值涨跌幅等
- 手动添加持仓：输入基金代码、持有金额、持有收益后加入列表
- OCR 同步：上传支付宝等 App 的持仓截图，自动识别基金名称、金额和收益并匹配基金代码
- 实时刷新：
  - 定时刷新持仓估值（默认 5s，可在代码中调整）
  - 下拉刷新手动触发更新
- 持仓编辑与删除：支持修改单只基金的持有金额、持有收益，或删除/清空全部持仓
- 快讯列表：拉取东财快讯列表，显示最新基金相关资讯
- 快讯详情：通过 `/api/news-detail` 路由获取快讯正文内容并在弹窗中展示

## 技术栈

- Next.js 14（App Router，`app` 目录）
- React 18
- tesseract.js：用于本地 OCR 识别持仓截图
- 原生 DOM + JSONP：调用东财、天天基金等公开接口获取基金和快讯数据
- GitHub Pages：通过 GitHub Actions 自动部署静态站点

## 本地开发

环境要求：

- Node.js ≥ 18.17.0（与 Next.js 官方要求保持一致）
- npm 或其他兼容包管理器

安装依赖并启动开发服务器：

```bash
npm install
npm run dev
```

默认访问地址为：`http://localhost:3000`

## 构建与部署

项目内置了 GitHub Pages 工作流文件：[.github/workflows/nextjs.yml](.github/workflows/nextjs.yml)，大致流程：

- 在指定分支（默认 `main`）上推送代码时触发
- 安装依赖并执行 `next build`
- 将构建产物上传到 GitHub Pages 环境并自动发布

你可以在 GitHub 仓库中：

- 打开 Settings → Pages
- 将 Source 设置为 **GitHub Actions**

部署完成后，可通过 `https://<你的用户名>.github.io/funds-realtime/` 访问站点。

> 提示：如果需要完全静态化导出到 `out` 目录并在 GitHub Pages 托管，请在 `next.config.js` 中配置 `output: 'export'`，并确保工作流上传的目录与之对应。

## 注意事项

- 本项目的 `/api/news-detail` 使用 Next.js Route Handler 实现，在纯静态 GitHub Pages 环境下无法运行，需要部署到支持 Node 运行时的平台（如 Vercel）才能正常通过该接口获取快讯详情。
- 由于依赖第三方公开接口，若接口策略调整或限流，可能会导致部分实时数据获取失败。

## 许可证

仅供个人学习与研究使用，如需商用请自行评估相关数据源和合规性。
