// pages/profile/profile.js
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 33.908823,
    longitude: 116.397470,
    markers: [],
    currentTab: 0, // 当前选中的tab
    tabs: ['内容', '收藏', '喜欢'],
    currentList: [], // 添加当前显示的列表
    contentList: [
      {
        image: '/assets/MinePage/content1.png',
        title: '本地草稿',
        desc: '有1篇笔记待发布'
      },
      {
        image: '/assets/MinePage/content2.png',
        title: '西土山露营',
        desc: '早就计划去西土山...'
      },
      {
        image: '/assets/MinePage/content3.png',
        title: '团建活动',
        desc: '美好的回忆'
      },
      {
        image: '/assets/MinePage/content4.png',
        title: '雪山之旅',
        desc: '难忘的经历'
      }
    ],
    favoriteList: [
      {
        image: '/assets/MinePage/content2.png',
        title: '西土山露营',
        desc: '早就计划去西土山...'
      },
      {
        image: '/assets/MinePage/content3.png',
        title: '团建活动',
        desc: '美好的回忆'
      },
      {
        image: '/assets/MinePage/content4.png',
        title: '雪山之旅',
        desc: '难忘的经历'
      },
      {
        image: '/assets/MinePage/content1.png',
        title: '本地草稿',
        desc: '有1篇笔记待发布'
      }
    ],
    likeList: [
      {
        image: '/assets/MinePage/content4.png',
        title: '雪山之旅',
        desc: '难忘的经历'
      },
      {
        image: '/assets/MinePage/content3.png',
        title: '团建活动',
        desc: '美好的回忆'
      },
      {
        image: '/assets/MinePage/content2.png',
        title: '西土山露营',
        desc: '早就计划去西土山...'
      },
      {
        image: '/assets/MinePage/content1.png',
        title: '本地草稿',
        desc: '有1篇笔记待发布'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 实例化地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'YOUR_MAP_KEY' // 使用你的地图key
    });
    this.getUserLocation();
    this.updateCurrentList(); // 初始化时更新列表
    
    // 检查是否首次进入
    const isFirstTime = wx.getStorageSync('isFirstTime') !== 'false';
    if (isFirstTime) {
      wx.navigateTo({
        url: '/pages/profile/edit'
      });
      wx.setStorageSync('isFirstTime', 'false');
    }
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
        selected: 3
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

  // 获取用户位置
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.getFootprints();
      },
      fail: (err) => {
        console.error('获取位置失败：', err);
        wx.showToast({
          title: '请授权位置信息',
          icon: 'none'
        });
      }
    });
  },

  // 获取足迹标记点
  getFootprints() {
    // 这里可以从后端获取用户的足迹数据
    // 示例数据
    const footprints = [
      {
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        title: '当前位置'
      },
      // 可以添加更多足迹点
    ];

    const markers = footprints.map((point, index) => ({
      id: index,
      latitude: point.latitude,
      longitude: point.longitude,
      title: point.title,
      iconPath: '/assets/MinePage/marker.png', // 更新图标路径
      width: 30,
      height: 30
    }));

    this.setData({ markers });
  },

  // 点击标记点
  onMarkerTap(e) {
    const marker = this.data.markers.find(item => item.id === e.markerId);
    if (marker) {
      wx.showToast({
        title: marker.title,
        icon: 'none'
      });
    }
  },

  // 切换tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    }, () => {
      this.updateCurrentList(); // 切换后更新列表
    });
  },

  // 更新当前显示的列表
  updateCurrentList() {
    const { currentTab, contentList, favoriteList, likeList } = this.data;
    let list;
    switch(currentTab) {
      case 0:
        list = contentList;
        break;
      case 1:
        list = favoriteList;
        break;
      case 2:
        list = likeList;
        break;
      default:
        list = [];
    }
    this.setData({
      currentList: list
    });
  },

  // 在profile.js中添加点击事件处理
  goToEdit() {
    console.log('点击头像'); // 添加调试日志
    wx.navigateTo({
      url: '/pages/profile/edit?type=edit',
      success: () => {
        console.log('跳转成功');
      },
      fail: (error) => {
        console.error('跳转失败:', error);
      }
    });
  }
})