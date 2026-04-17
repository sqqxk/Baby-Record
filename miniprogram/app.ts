// app.ts
App<IAppOption>({
  globalData: {
    statusBarHeight: 0, // 状态栏高度（TS需定义类型）
    navBarHeight: 0     // 导航栏总高度
  },

  onLaunch() {
    // 1. 获取系统信息（TS需指定类型，避免类型报错）
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight;
    const navBarHeight = statusBarHeight + 44; // 导航栏总高度

    // 2. 赋值给全局变量（TS需确保类型匹配）
    this.globalData.statusBarHeight = statusBarHeight;
    this.globalData.navBarHeight = navBarHeight;

    // 3. 核心：强制设置状态栏背景色+文字颜色（消除割裂感的关键）
    wx.setNavigationBarColor({
      frontColor: '#ffffff',       // 状态栏文字：白色（仅支持white/black）
      backgroundColor: '#FFB6C1',  // 状态栏背景：和粉色卡片/标题栏一致
      animation: {
        duration: 0,               // 无动画，立即生效
        timingFunc: 'linear'
      },
      // TS需处理回调，避免报错
      success: () => {
        console.log('状态栏颜色设置成功');
      },
      fail: (err) => {
        console.error('状态栏颜色设置失败：', err);
      }
    });

    // 可选：注入CSS变量（供全局样式使用）
    wx.setStorageSync('statusBarHeight', statusBarHeight);
  }
});

// TS类型定义（放在app.ts顶部/单独的类型文件里）
interface IAppOption {
  globalData: {
    statusBarHeight: number;
    navBarHeight: number;
  };
}