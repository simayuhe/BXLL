// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    teamPosts: [
      {
        id: 1,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '2.1',
        likes: '969',
        comments: '12',
        author: {
          name: '子豪',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      },
      {
        id: 2,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '1.6',
        likes: '121',
        comments: '12',
        author: {
          name: '夏天的骆驼',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      },
      {
        id: 3,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '1.1',
        likes: '99',
        comments: '12',
        author: {
          name: '魏魏',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      },
      {
        id: 4,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '0.9',
        likes: '81',
        comments: '12',
        author: {
          name: '子豪',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      }
    ],
    personalPosts: [
      {
        id: 1,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '1.6',
        likes: '121',
        comments: '12',
        author: {
          name: '夏天的骆驼',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      },
      {
        id: 2,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '1.1',
        likes: '99',
        comments: '12',
        author: {
          name: '魏魏',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      },
      {
        id: 3,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '0.9',
        likes: '81',
        comments: '12',
        author: {
          name: '子豪',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      },
      {
        id: 4,
        title: '大家一起去徒步，这次大家玩的都很开心。',
        image: '/assets/DiscoverPage/avatar.png',
        views: '0.8',
        likes: '76',
        comments: '12',
        author: {
          name: '夏天的骆驼',
          avatar: '/assets/DiscoverPage/avatar.png'
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 点击顶部tab切换
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  // 滑动切换
  swiperChange(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  // 创建新游记
  createPost() {
    wx.navigateTo({
      url: '/pages/post/create'
    });
  }
})