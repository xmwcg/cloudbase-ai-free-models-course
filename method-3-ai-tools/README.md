# 方式三：AI 工具接入（OpenAI 兼容 BaseURL + APIKey）与 CloudBase 官方 MCP

> 目标：把 hy3 / hy3-preview 文本模型与 HY-Image 生图模型接进 Cursor / Claude Code / CodeBuddy / WorkBuddy 等 AI 编程工具。

## 合规边界（必须读懂）
「小程序成长计划」免费额度 **仅限小程序与云函数/云开发服务端** 调用（官方原文：*AI 资源包仅限小程序和云函数中使用，其他来源均不可使用*）。

| 子方式 | 调用入口 | 消耗的额度 | 是否免费额度 |
|--------|----------|------------|--------------|
| 三-A：直连 API 网关 | BaseURL + APIKey（任意后端/工具） | 资源点套餐 / 代金券 | 否（另一套额度，合规但收费） |
| 三-B：云函数桥接 | AI 工具 → 你的 `ai-proxy` 云函数 → node-sdk | 小程序成长计划 | **是（免费）** |

**结论**：想"免费且合规"地用 AI 工具调这 4 个模型，走 **三-B 云函数桥接**（本目录 `ai-proxy/index.js`）；只想快速接工具、接受走资源点套餐，走 **三-A 直连**。

## 三-A：直连（资源点套餐额度）
1. 控制台 → 环境配置 → API Key，创建并复制 Key。
2. 在工具里填：
   - Base URL：`https://jymkjtools-study-d6eipek12446b18.api.tcloudbasegateway.com/v1/ai/cloudbase`
   - API Key：上面复制的
   - 模型：`hy3-preview`
3. 见 `openai-client.js` 示例（Node/Python 通用 OpenAI SDK）。

## 三-B：云函数桥接（免费额度）—— 推荐
1. 部署桥接云函数：`tcb fn deploy ai-proxy`（代码见 `ai-proxy/index.js`）。
2. 在你的 AI 工具/MCP 里，把"调用模型"改为 POST 你的云函数地址，body 如：
   ```json
   { "type": "text", "model": "hy3-preview", "messages": [{ "role": "user", "content": "你好" }] }
   ```
   ```json
   { "type": "image", "model": "HY-Image-3.0-Plus-4090-Tob-v1.0", "prompt": "一只赛博朋克猫", "size": "1024x1024" }
   ```
   ```json
   { "type": "image", "model": "HY-Image-v3.0-I2I-ToB-v1.0.1", "prompt": "转水彩风格", "images": ["<base64>" ] }
   ```
3. 返回里 `quotaSource: "小程序成长计划免费额度"` 即证明走的是免费额度。

## CloudBase 官方 MCP（让 AI 工具直接操作云开发）
`mcp.json` 提供本地模式配置（推荐，功能最全）：
```json
{
  "mcpServers": {
    "cloudbase": {
      "command": "npx",
      "args": ["@cloudbase/cloudbase-mcp@latest"],
      "env": { "INTEGRATION_IDE": "WorkBuddy", "CLOUDBASE_ENV_ID": "jymkjtools-study-d6eipek12446b18", "CLOUDBASE_API_KEY": "<你的Key>" }
    }
  }
}
```
托管模式（远程/团队，HTTP 连接）：
```
https://tcb-api.cloud.tencent.com/mcp/v1?env_id=jymkjtools-study-d6eipek12446b18
```
自建服务器务必加环境变量 `CLOUDBASE_MCP_CLOUD_MODE=true` 禁用本地文件操作类工具。

接入后在 AI 对话里输入："用 CloudBase 帮我做一个调用 hy3-preview 的云函数并部署"，AI 会通过 MCP 完成创建与部署（最终模型调用仍经云函数 → 免费额度）。
