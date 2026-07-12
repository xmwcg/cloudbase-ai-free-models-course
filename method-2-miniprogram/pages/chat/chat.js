// ============================================================
// 方式二：小程序聊天页逻辑（文本 + 图像，均走免费额度）
// 文本：wx.cloud.extend.AI.createModel('cloudbase').streamText(...)
// 图像：wx.cloud.extend.AI.createImageModel('hunyuan-image').generateImage(...)
// ============================================================

Page({
  data: {
    messages: [],
    inputValue: '',
    isLoading: false,
    model: 'hy3-preview', // 免费文本模型：hy3-preview / hy3
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  async sendMessage() {
    const { inputValue, messages, model } = this.data;
    if (!inputValue.trim() || this.data.isLoading) return;

    const next = [...messages, { role: 'user', content: inputValue }];
    this.setData({ messages: next, inputValue: '', isLoading: true });

    try {
      const ai = wx.cloud.extend.AI;
      const m = ai.createModel('cloudbase');

      // 流式调用（推荐，逐字显示）
      const res = await m.streamText({
        data: {
          model, // hy3-preview / hy3
          messages: next,
        },
      });

      let acc = '';
      for await (const text of res.textStream) {
        acc += text;
        this.setData({ messages: [...next, { role: 'assistant', content: acc }] });
      }
      this.setData({ messages: [...next, { role: 'assistant', content: acc }] });
    } catch (e) {
      this.setData({
        messages: [...next, { role: 'assistant', content: '调用失败：' + e.message }],
      });
    } finally {
      this.setData({ isLoading: false });
    }
  },

  // 文生图：HY-Image-3.0-Plus-4090-Tob-v1.0（免费生图额度）
  async generateImage() {
    const prompt = this.data.inputValue.trim();
    if (!prompt) return;
    this.setData({ isLoading: true });
    try {
      const ai = wx.cloud.extend.AI;
      const imgModel = ai.createImageModel('hunyuan-image');
      const res = await imgModel.generateImage({
        model: 'HY-Image-3.0-Plus-4090-Tob-v1.0',
        prompt,
        size: '1024x1024',
      });
      const url = res.data && res.data[0] && res.data[0].url;
      if (url) {
        wx.previewImage({ urls: [url] });
      }
    } catch (e) {
      wx.showToast({ title: '生图失败：' + e.message, icon: 'none' });
    } finally {
      this.setData({ isLoading: false });
    }
  },
});
