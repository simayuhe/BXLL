Page({
  data: {
    title: '',
    hint: '',
    music: 'Fun Fun Fun Fun Fun',
    section: '模块1',
    activity: '参与某个活动',
    type: 'image', // 'image' 或 'video'
    images: [],
    maxImageCount: 9,
  },

  // 上传图片
  chooseImage() {
    const { images, maxImageCount } = this.data;
    wx.chooseMedia({
      count: maxImageCount - images.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(file => file.tempFilePath);
        this.setData({
          images: [...images, ...newImages]
        });
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({ images });
  },

  // 输入标题
  onTitleInput(e) {
    this.setData({ title: e.detail.value });
  },

  // 输入提示词
  onHintInput(e) {
    this.setData({ hint: e.detail.value });
  },

  // 选择音乐
  chooseMusic() {
    // 这里可以跳转到音乐选择页面
    wx.showToast({
      title: '选择音乐功能开发中',
      icon: 'none'
    });
  },

  // 选择板块
  chooseSection() {
    wx.showActionSheet({
      itemList: ['团队作品', '个人游记'],
      success: (res) => {
        const sections = ['团队作品', '个人游记'];
        this.setData({ section: sections[res.tapIndex] });
      }
    });
  },

  // 选择活动
  chooseActivity() {
    // 这里可以跳转到活动选择页面
    wx.showToast({
      title: '选择活动功能开发中',
      icon: 'none'
    });
  },

  // 切换类型
  switchType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ type });
  },

  // 存草稿
  saveDraft() {
    // 这里实现存草稿功能
    wx.showToast({
      title: '已保存草稿',
      icon: 'success'
    });
  },

  // 预览
  preview() {
    // 这里实现预览功能
    wx.showToast({
      title: '预览功能开发中',
      icon: 'none'
    });
  },

  // 发布
  publish() {
    // 这里实现发布功能
    if (!this.data.title) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      });
      return;
    }
    if (this.data.images.length === 0) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      });
      return;
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success'
    });
  },

  // 添加返回方法
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  },
}); 