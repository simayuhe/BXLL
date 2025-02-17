# 微信小程序TabBar实现指南

## 1. 项目初始化
- 创建新的微信小程序项目
- 选择基础模板
- 开启ES6转ES5功能

## 2. 目录结构
- assets/images：存放tabBar图标
  - 需准备4组图标（普通态和选中态）
  - home/home_selected
  - planet/planet_selected
  - message/message_selected
  - profile/profile_selected
- custom-tab-bar：自定义tabBar组件目录
- pages：页面目录
  - home：首页
  - discover：发现页
  - message：消息页
  - profile：我的页面

## 3. 配置要点
- app.json配置：
  - 添加四个页面路径
  - 设置custom tabBar
  - 配置tabBar列表和样式
  - 设置图标路径

## 4. 自定义TabBar组件
- 创建组件必需文件
- 实现页面切换逻辑
- 配置选中态样式
- 确保图标和文字都可点击

## 5. 页面实现
- 统一页面结构：
  - 居中显示页面标题
  - 实现tabBar联动
  - 设置正确的selected值

## 6. 样式规范
- 统一视觉标准：
  - 主色：#07C160（微信绿）
  - 图标尺寸：48rpx
  - 文字大小：20rpx
  - 选中态动画效果

## 7. 注意事项
- 图标命名规范
- selected值对应关系
- 样式统一性
- 适配底部安全区域

## 10. 地图功能配置
- 申请腾讯地图key (已完成)
- 下载并集成腾讯地图SDK
  - 创建utils目录
  - 添加qqmap-wx-jssdk.min.js文件
  - 在页面中引入并实例化SDK
- 配置位置权限 (已完成)
  - permission 配置用户授权提示
  - requiredPrivateInfos 声明位置接口
- 配置request域名
  - 开发环境：可在开发工具中关闭域名校验
  - 正式环境：在小程序管理后台添加域名
    - https://apis.map.qq.com
- 实现地图标记功能 (已完成)
- 实现搜索功能 (已完成)

## 11. 错误处理
- key配额超限处理
  - 准备备用key
  - 实现自动切换key机制
  - 添加重试逻辑
- 搜索结果处理
  - 处理空结果情况
  - 添加友好提示
  - 实现错误重试

## 12. 发现页面实现
- 页面结构
  - 顶部切换栏（团队作品/个人游记）
  - 内容区域（swiper实现切换）
  - 底部新建按钮
- 功能实现
  - Tab切换功能
  - 列表展示
  - 排名徽章（1-3名特殊样式）
  - 新建游记入口
- 样式规范
  - 主色：#07C160
  - 卡片圆角：12rpx
  - 徽章样式
    - 金牌：#FFD700
    - 银牌：#C0C0C0
    - 铜牌：#CD7F32
  - 阴影效果：rgba(7,193,96,0.4)
- 交互优化
  - 切换动画
  - 按钮点击反馈
  - 滚动优化
- 适配处理
  - 自定义导航栏适配
  - 底部安全区域适配
  - 列表高度自适应

## 13. 发布页面实现
- 页面跳转
  - 从发现页面中间加号按钮跳转
  - 使用wx.navigateTo实现页面跳转
  ```javascript
  createPost() {
    wx.navigateTo({
      url: '/pages/post/create'
    });
  }
  ```
- 页面结构
  - 顶部导航栏（带返回按钮）
  - 图片上传区域
  - 表单区域
    - 标题输入
    - 提示词输入
    - 音乐选择
    - 板块选择
    - 活动选择
    - 偏好选择（图文/视频）
  - 底部按钮组
    - 存草稿
    - 预览
    - 发布
- 样式规范
  - 表单项高度：90rpx
  - 内边距：30rpx
  - 底部按钮
    - 高度：80rpx
    - 圆角：40rpx
    - 居中对齐
    - 间距：20rpx
  - 分隔线：1rpx solid #eee
- 交互优化
  - 按钮文字完全居中
  - 表单项点击反馈
  - 底部按钮阴影效果

## 14. "我的"页面实现
### 页面结构
- 用户信息区域
  - 头像（圆形，120rpx）
  - 用户名
  - 等级标签（绿色背景）
  - 用户ID

- 数据统计栏
  - 关注数
  - 粉丝数
  - 获赞数
  - 布局：flex均分三列

- 成就展示区
  - 标题："我的成就"
  - 三个成就项（打卡点数、组队次数、坚持周数）
  - 每项包含：图标、标签、数值
  - 布局：flex均分三列

- 足迹和活动区（并排布局）
  - 我的足迹
    - 嵌入腾讯地图
    - 显示当前位置标记
    - 支持缩放和滚动
  - 参与活动
    - 活动统计图表
    - 显示月份和次数
    - 绿色进度条展示

- 内容展示区
  - Tab切换栏（内容、收藏、喜欢）
  - 内容列表
    - 第一个内容占满一行
    - 其他内容两列布局
    - 图片比例：首个2:1，其他4:3
    - 渐变文字遮罩

### 样式规范
- 颜色
  - 主题色：#07C160（绿色）
  - 背景色：#f7f7f7
  - 文字颜色：
    - 主要文字：#333
    - 次要文字：#666
    - 辅助文字：#999
    - 白色文字：#fff

- 尺寸
  - 头像：120rpx
  - 内边距：30rpx
  - 间距：20rpx
  - 圆角：
    - 大圆角：40rpx
    - 小圆角：8rpx
  - 字号：
    - 大标题：32rpx
    - 常规文字：28rpx
    - 小文字：24rpx

- 布局特点
  - 区块间隔：2rpx
  - 区块背景：白色
  - 内容区支持滚动
  - 响应式适配

### 交互功能
- Tab切换
  - 点击切换内容类型
  - 底部绿色条状指示器
  - 切换时平滑过渡

- 地图交互
  - 支持缩放和拖动
  - 点击标记显示位置信息
  - 显示当前位置

- 数据加载
  - 页面初始化加载数据
  - Tab切换时更新列表
  - 支持空状态展示

### 组件依赖
- 地图组件
  ```javascript
  "usingComponents": {
    "map": "xxx"
  }
  ```

## 15. 个人信息编辑页面
### 页面结构
- 自定义导航栏
  - 左侧返回按钮（←）
  - 居中标题："个人信息"
  - 右侧预留空间
  - 适配状态栏高度

- 表单区域
  - 昵称
    - 标签："昵称"
    - 右侧文本输入框
    - 右侧文本对齐
    - 值：yyq
  - 电话
    - 标签："电话"
    - 右侧数字输入框
    - 右侧文本对齐
    - 值：13866109056
  - 微信
    - 标签："微信"
    - 右侧数字输入框
    - 右侧文本对齐
    - 值：13866109056
  - ID
    - 标签："ID"
    - 右侧只读文本
    - 右侧文本对齐
    - 值：787807

- 底部提示
  - 文本："注册相关咨询："
  - 链接文本："微信号"
  - 文本颜色：#999

- 底部按钮
  - 注册/保存按钮（根据场景切换文案）
  - 宽度：满宽减去左右边距
  - 高度：90rpx
  - 背景色：#07C160
  - 文字颜色：白色
  - 圆角：45rpx

### 样式规范
- 颜色
  - 背景色：白色
  - 文字颜色：
    - 标签文字：#333
    - 输入框文字：#333
    - 提示文字：#999
  - 分割线：#eee

- 布局
  - 导航栏高度：44px + 状态栏高度
  - 表单项高度：110rpx
  - 左侧内边距：40rpx
  - 右侧内边距：40rpx
  - 分割线高度：1rpx
  - 底部按钮边距：
    - 左右：40rpx
    - 底部：40rpx + 安全区域

- 字体
  - 导航栏标题：32rpx
  - 返回箭头：36rpx
  - 标签文字：28rpx
  - 输入框文字：28rpx
  - 提示文字：24rpx
  - 按钮文字：32rpx

### 交互功能
- 页面触发
  - 首次进入"我的"页面自动弹出
  - 点击头像和用户信息区域手动触发
  - 使用wx.navigateTo跳转

- 返回功能
  - 点击左上角返回按钮
  - 使用wx.navigateBack返回
  - delta设置为1

- 表单验证
  - 昵称：必填
  - 电话：11位数字
  - 微信号：选填
  - ID：只读不可修改

- 场景区分
  - 首次注册：显示"注册"按钮
  - 信息修改：显示"保存"按钮

- 保存功能
  - 注册场景：调用注册接口
  - 修改场景：调用更新接口
  - 成功后返回上一页
  - 失败显示错误提示

### 数据结构
```javascript
{
  nickname: 'yyq',
  phone: '13866109056',
  wechat: '13866109056',
  userId: '787807'
}
```

### 页面跳转
```javascript
// 跳转到个人信息页
wx.navigateTo({
  url: '/pages/profile/edit?type=edit'
});

// 首次进入检查
const isFirstTime = wx.getStorageSync('isFirstTime') !== 'false';
if (isFirstTime) {
  wx.navigateTo({
    url: '/pages/profile/edit'
  });
  wx.setStorageSync('isFirstTime', 'false');
}
```

## 整体风格优化建议

### 1. 视觉风格统一
- 颜色系统
  - 主色：#07C160（微信绿）
  - 辅助色：
    - 警告：#FA5151
    - 链接：#576B95
    - 成功：#07C160
  - 中性色：
    - 标题：#333333
    - 正文：#666666
    - 描述：#999999
    - 分割线：#EEEEEE
    - 背景：#F7F7F7

- 字体规范
  - 大标题：36rpx
  - 小标题：32rpx
  - 正文：28rpx
  - 描述文本：24rpx
  - 辅助文本：20rpx

- 间距规范
  - 页面边距：30rpx
  - 内容间距：20rpx
  - 组件内边距：24rpx
  - 列表项间距：16rpx

- 圆角规范
  - 大圆角：45rpx（按钮）
  - 中圆角：12rpx（卡片）
  - 小圆角：8rpx（标签）

### 2. 交互反馈优化
- 点击态效果
  - 按钮：opacity: 0.7
  - 列表项：background: rgba(0,0,0,0.05)
  - 图标：transform: scale(0.95)

- 加载状态
  - 下拉刷新：自定义loading动画
  - 上拉加载：自定义loading动画
  - 页面切换：渐变过渡

- 动画效果
  - Tab切换：滑动过渡
  - 列表加载：渐显动画
  - 按钮点击：缩放反馈

### 3. 需要后台数据支持的功能 [!]

#### 首页
- [ ] 用户登录状态管理
- [ ] 用户权限控制

#### 发现页
- [ ] 团队作品列表数据
  ```javascript
  {
    id: string,
    title: string,
    cover: string,
    author: string,
    likes: number,
    views: number,
    rank: number // 排名
  }
  ```
- [ ] 个人游记列表数据
- [ ] 点赞功能
- [ ] 排名计算

#### 消息页
- [ ] 消息列表数据
- [ ] 消息状态管理
- [ ] 消息推送

#### 个人页
- [ ] 用户基本信息
  ```javascript
  {
    avatar: string,
    nickname: string,
    level: number,
    userId: string
  }
  ```
- [ ] 数据统计
  ```javascript
  {
    follows: number,
    fans: number,
    likes: number
  }
  ```
- [ ] 成就系统数据
  ```javascript
  {
    checkPoints: number,
    teamCount: number,
    exerciseWeeks: number
  }
  ```
- [ ] 足迹数据
  ```javascript
  {
    locations: [{
      latitude: number,
      longitude: number,
      title: string,
      date: string
    }]
  }
  ```
- [ ] 活动参与记录
  ```javascript
  {
    monthlyStats: [{
      month: string,
      count: number
    }]
  }
  ```
- [ ] 内容管理
  ```javascript
  {
    contents: [],
    favorites: [],
    likes: []
  }
  ```

#### 个人信息编辑页
- [ ] 用户信息的读取与更新
  ```javascript
  {
    nickname: string,
    phone: string,
    wechat: string,
    userId: string
  }
  ```
- [ ] 首次注册逻辑
- [ ] 信息修改权限验证

### 4. API接口建议 [!]
- 用户相关
  - /api/user/login
  - /api/user/register
  - /api/user/update
  - /api/user/profile

- 内容相关
  - /api/content/list
  - /api/content/create
  - /api/content/update
  - /api/content/delete

- 互动相关
  - /api/interaction/like
  - /api/interaction/favorite
  - /api/interaction/comment

- 数据统计
  - /api/stats/user
  - /api/stats/content
  - /api/stats/activity

- 消息通知
  - /api/message/list
  - /api/message/read
  - /api/message/delete
