// ============================================================
// 方式二：微信小程序端 SDK 直连（免费「小程序成长计划」额度）
// 合法来源 = 小程序。wx.cloud.extend.AI 调用消耗免费额度。
// 参考官方文档：
//   https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/guide/ai/QuickStart.html
//   https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/guide/ai/IntegratingLLM/model.html
// 前提：
//   1. 微信小程序基础库 >= 3.15.1
//   2. 已在「微信开发者工具 → 云开发 → AI」开启 hy3 / hy3-preview 等模型
//   3. 已开通云开发环境（环境 ID 见 CloudBase 控制台概览）
// ============================================================

App({
  onLaunch() {
    wx.cloud.init({
      env: 'jymkjtools-study-d6eipek12446b18', // 替换为你的云开发环境 ID
      traceUser: true,
    });
  },
});
