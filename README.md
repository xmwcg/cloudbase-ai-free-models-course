# CloudBase 小程序成长计划 · 4 个免费模型 · 三种合规调用方式 培训课程

> 环境 ID：`jymkjtools-study-d6eipek12446b18`
> 免费模型：文本 `hy3-preview` / `hy3`；图像 `HY-Image-3.0-Plus-4090-Tob-v1.0`（文生图）/ `HY-Image-v3.0-I2I-ToB-v1.0.1`（图生图）

## 这个仓库是什么
一份面向学生的技术培训资料，讲清楚**如何合规地把「微信 AI 小程序成长计划」的免费模型额度**，用三种方式调用起来：

| # | 方式 | 调用入口 | 消耗额度 | 状态 |
|---|------|----------|----------|------|
| 1 | 云函数 / 服务端 Node SDK | `@cloudbase/node-sdk` `app.ai()` | **免费额度** | ✅ 已配置并验证 |
| 2 | 微信小程序端 SDK | `wx.cloud.extend.AI` | **免费额度** | ✅ 已配好示例代码 |
| 3 | AI 工具接入（OpenAI 兼容 + 官方 MCP） | BaseURL+APIKey / MCP | 见内文（直连走资源点套餐；桥接走免费额度） | ✅ 已配好 |

## 先看哪里
- **主教程（必读）**：[`教程-三种合规调用免费模型.md`](./教程-三种合规调用免费模型.md)
- 方式一代码：[`method-1-cloud-function/`](./method-1-cloud-function)
- 方式二代码：[`method-2-miniprogram/`](./method-2-miniprogram)
- 方式三代码：[`method-3-ai-tools/`](./method-3-ai-tools)
- 官方截图/示意图：[`assets/`](./assets)
- 开发计划：[`开发计划_4模型接入.md`](./开发计划_4模型接入.md)

## 一句话合规原理
> 免费额度**只认调用来源**：来源是「小程序」或「云函数/云开发服务端」才扣免费额度；其他来源（如直接拿 API Key 在任意后端调）扣的是「资源点套餐/代金券」。
> 所以方式一、二天然合规；方式三想继续免费用，就让 AI 工具调你的**云函数桥接**（方式三-B）。

## 快速开始（30 秒）
```bash
# 安装 CLI（需 Node.js）
npm install -g @cloudbase/cli

# 登录（首次会打开浏览器）
tcb login

# 部署方式一的云函数（已配好）
cd method-1-cloud-function
tcb fn deploy ai-chat
tcb fn deploy ai-image
```

详细每一步 + 官方截图，见主教程。
