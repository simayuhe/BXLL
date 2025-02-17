Component({
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/home/home",
      text: "首页",
      iconPath: "/assets/images/home.png",
      selectedIconPath: "/assets/images/home_selected.png"
    }, {
      pagePath: "/pages/discover/discover",
      text: "发现",
      iconPath: "/assets/images/planet.png",
      selectedIconPath: "/assets/images/planet_selected.png"
    }, {
      pagePath: "/pages/message/message",
      text: "消息",
      iconPath: "/assets/images/message.png",
      selectedIconPath: "/assets/images/message_selected.png"
    }, {
      pagePath: "/pages/profile/profile",
      text: "我的",
      iconPath: "/assets/images/profile.png",
      selectedIconPath: "/assets/images/profile_selected.png"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url,
        success: () => {
          this.setData({
            selected: data.index
          });
        }
      });
    }
  }
}); 