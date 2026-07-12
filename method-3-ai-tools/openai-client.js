// ============================================================
// 方式三-A：AI 工具直连接入（OpenAI 兼容协议）
// 适用：Cursor / Claude Code / CodeBuddy / WorkBuddy 等支持 OpenAI 协议的工具。
//
// ⚠️ 合规提示（重要）：
//   直连 API 网关（BaseURL + APIKey）默认消耗的是「资源点套餐」额度
//   （或代金券），并非「小程序成长计划」免费额度。
//   若想继续用免费额度，请改用同目录下的 ai-proxy 云函数（方式三-B）：
//   AI 工具 / MCP 调你的云函数，云函数内用 node-sdk 调模型 → 合法来源=云函数 → 免费额度。
//
// 参考官方文档：
//   https://docs.cloudbase.net/ai/quickstart/ai-tools
//   https://docs.cloudbase.net/ai/model/openai-sdk-access
// ============================================================

import OpenAI from 'openai';

const ENV_ID = 'jymkjtools-study-d6eipek12446b18';

const client = new OpenAI({
  apiKey: process.env.CLOUDBASE_API_KEY, // 控制台 → 环境配置 → API Key
  baseURL: `https://${ENV_ID}.api.tcloudbasegateway.com/v1/ai/cloudbase`,
});

// 文本：hy3 / hy3-preview（资源点套餐额度）
export async function chat(prompt) {
  const res = await client.chat.completions.create({
    model: 'hy3-preview',
    messages: [{ role: 'user', content: prompt }],
    stream: false,
  });
  return res.choices[0].message.content;
}

// 流式
export async function chatStream(prompt, onToken) {
  const stream = await client.chat.completions.create({
    model: 'hy3-preview',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
  let acc = '';
  for await (const chunk of stream) {
    const t = chunk.choices[0]?.delta?.content || '';
    acc += t;
    onToken?.(t, acc);
  }
  return acc;
}

// 多轮对话：自行维护 messages 数组
export async function multiTurn(history) {
  const res = await client.chat.completions.create({
    model: 'hy3-preview',
    messages: history,
  });
  return res.choices[0].message.content;
}

// 图像：走 ai-proxy 云函数（免费额度），避免猜测图像 API 端点。
// 这里仅演示文本路径；图像请见 ai-proxy/index.js 与 README 说明。
