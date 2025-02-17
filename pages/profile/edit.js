Page({
  data: {
    statusBarHeight: 0,
    isEdit: false, // 是否是编辑模式
    userInfo: {
      nickname: 'yyq',
      phone: '13866109056',
      wechat: '13866109056',
      userId: '787807'
    }
  },

  onLoad(options) {
    // 获取状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    });
    
    // 根据options判断是编辑还是注册模式
    this.setData({
      isEdit: options.type === 'edit'
    });
  },

  // 输入处理函数
  onNicknameInput(e) {
    this.setData({
      'userInfo.nickname': e.detail.value
    });
  },

  onPhoneInput(e) {
    this.setData({
      'userInfo.phone': e.detail.value
    });
  },

  onWechatInput(e) {
    this.setData({
      'userInfo.wechat': e.detail.value
    });
  },

  // 表单验证
  validateForm() {
    const { nickname, phone } = this.data.userInfo;
    if (!nickname.trim()) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return false;
    }
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return false;
    }
    return true;
  },

  // 提交表单
  onSubmit() {
    if (!this.validateForm()) return;

    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    // 这里应该调用实际的接口
    wx.showLoading({
      title: this.data.isEdit ? '保存中' : '注册中'
    });

    setTimeout(() => {
      wx.hideLoading();
      
      // 更新上一页数据
      if (prevPage) {
        prevPage.setData({
          userInfo: this.data.userInfo
        });
      }

      wx.navigateBack();
    }, 1000);
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
}); 