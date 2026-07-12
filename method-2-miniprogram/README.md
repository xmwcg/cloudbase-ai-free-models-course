# 方式二：微信小程序端 SDK 直连（免费「小程序成长计划」额度）

> 合规来源：小程序。`wx.cloud.extend.AI` 在小程序内调用，消耗的是「小程序成长计划」免费额度（文本 10 亿 Token + 生图 10 万张）。

## 适用场景
- 你正在做一个微信小程序，想让用户直接在 App 内用上 hy3 / hy3-preview 文本模型与混元生图模型。
- 不需要自建后端，调用发生在小程序与云开发之间。

## 前置条件
1. 注册微信小程序账号，拿到 AppID。
2. 在「微信开发者工具 → 云开发」开通环境（环境 ID 例如 `jymkjtools-study-d6eipek12446b18`）。
3. 报名「微信 AI 小程序成长计划」，免费额度自动到账（或领取 120 元代金券）。
4. 在「云开发控制台 → AI → 生文模型」勾选 `hy3-preview` / `hy3`；在「生图模型」开启混元生图。
5. 小程序基础库 >= 3.15.1。

## 文件说明
- `app.js`：`wx.cloud.init({ env })` 初始化云开发。
- `pages/chat/chat.js`：用 `wx.cloud.extend.AI.createModel('cloudbase')` 流式文本 + `createImageModel('hunyuan-image')` 生图。
- `pages/chat/chat.wxml` / `.wxss`：聊天 UI。

## 关键代码
```js
// 文本（流式）
const m = wx.cloud.extend.AI.createModel('cloudbase');
const res = await m.streamText({ data: { model: 'hy3-preview', messages } });
for await (const t of res.textStream) { /* 逐字显示 */ }

// 图像（文生图）
const img = wx.cloud.extend.AI.createImageModel('hunyuan-image');
const r = await img.generateImage({ model: 'HY-Image-3.0-Plus-4090-Tob-v1.0', prompt, size: '1024x1024' });
// r.data[0].url 即生成图
```

## 运行
用「微信开发者工具」打开本目录，填好 `app.js` 的 `env` 与 `project.config.json` 的 `appid`，点「云开发 → 开通」，编译即可在模拟器对话/生图。
