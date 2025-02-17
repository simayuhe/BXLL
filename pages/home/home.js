const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const MAP_KEY = 'LB5BZ-C43KZ-TUUX5-7SOOZ-L75GS-6PFD4'; // 主key
const BACKUP_MAP_KEY = 'BSEBZ-3WX6I-23DGY-UI3QC-FM2HO-CUBAR'; // 备用key，需要自行申请
let currentKeyIndex = 0;
const MAX_RETRY = 2; // 最大重试次数
let qqmapsdk;

Page({
  data: {
    latitude: 39.908823,
    longitude: 116.397470,
    markers: [],
    searchValue: '',
    searchResults: [],
    isShowResults: false,  // 控制搜索结果的显示
    recentViews: [
      {
        id: 1,
        title: '岗什卡雪山-岗什卡雪山三丰初体验活动',
        image: '/assets/HomePage/clubEvents.png'
      },
      // ... 可以添加更多
    ]
  },

  onLoad() {
    this.initMap();
    this.getUserLocation();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
    if (e.detail.value) {
      this.searchLocation(e.detail.value)
    }
  },

  // 初始化地图
  initMap(keyIndex = 0) {
    const key = keyIndex === 0 ? MAP_KEY : BACKUP_MAP_KEY;
    qqmapsdk = new QQMapWX({
      key: key
    });
  },

  // 处理API调用错误
  handleMapError(error, retryCallback) {
    console.error('地图API调用失败：', error);
    if (error.status === 121) { // key超出配额
      if (currentKeyIndex < MAX_RETRY) {
        currentKeyIndex++;
        this.initMap(currentKeyIndex);
        if (typeof retryCallback === 'function') {
          retryCallback();
        }
        return;
      }
    }
    wx.showToast({
      title: '服务暂时不可用，请稍后重试',
      icon: 'none'
    });
  },

  // 搜索地点
  searchLocation(keyword) {
    qqmapsdk.search({
      keyword: keyword,
      boundary: `nearby(${this.data.latitude},${this.data.longitude},5000)`,
      page_size: 20,
      success: (res) => {
        console.log('搜索结果：', res);
        if (res.status === 0) {
          if (res.data.length === 0) {
            wx.showToast({
              title: '未找到相关地点',
              icon: 'none'
            });
            return;
          }
          const markers = res.data.map((item, index) => ({
            id: index,
            latitude: item.location.lat,
            longitude: item.location.lng,
            title: item.title,
            iconPath: '/assets/images/marker.png',
            width: 30,
            height: 30
          }));
          this.setData({
            markers,
            searchResults: res.data,
            isShowResults: true
          });
        }
      },
      fail: (err) => {
        this.handleMapError(err, () => {
          this.searchLocation(keyword); // 重试
        });
      }
    });
  },

  // 点击地图标记
  onMarkerTap(e) {
    const marker = this.data.markers.find(item => item.id === e.markerId)
    if (marker) {
      wx.showToast({
        title: marker.title,
        icon: 'none'
      })
    }
  },

  // 优化滚动体验
  onPageScroll(e) {
    // 可以根据滚动位置动态调整UI
    if (e.scrollTop > 400) {
      this.setData({
        isShowResults: true
      })
    } else {
      this.setData({
        isShowResults: false
      })
    }
  },

  // 获取用户位置
  getUserLocation() {
    console.log('开始获取用户位置');
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('获取位置成功：', res);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.getNearbyPOI();
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

  // 获取周边POI
  getNearbyPOI() {
    console.log('开始搜索周边POI');
    qqmapsdk.search({
      keyword: '景点',
      location: `${this.data.latitude},${this.data.longitude}`,
      boundary: `nearby(${this.data.latitude},${this.data.longitude},1000)`,
      page_size: 20,
      success: (res) => {
        console.log('搜索POI成功：', res);
        if (res.data.length === 0) {
          wx.showToast({
            title: '附近暂无景点',
            icon: 'none'
          });
          return;
        }
        const markers = res.data.map((item, index) => ({
          id: index,
          latitude: item.location.lat,
          longitude: item.location.lng,
          title: item.title,
          iconPath: '/assets/images/marker.png',
          width: 30,
          height: 30
        }));
        this.setData({ 
          markers,
          searchResults: res.data
        });
      },
      fail: (err) => {
        this.handleMapError(err, () => {
          this.getNearbyPOI(); // 重试
        });
      }
    });
  }
}) 