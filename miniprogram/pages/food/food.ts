type FoodItem = {
  id: number;
  icon: string;
  name: string;
  desc: string;
  tag: string;
};

// 定义月龄-辅食的映射类型
type FoodRecommendMap = {
  [key: number]: FoodItem[];
};
Page({
  data: {
    // 月龄标签数据
    ageTabs: [
      { id: 1, name: '6月龄' },
      { id: 2, name: '7-8月龄' },
      { id: 3, name: '9-12月龄' },
      { id: 4, name: '12+月龄' }
    ],
    currentTab: 1, // 默认选中6月龄
    currentAge: 6, // 当前显示的月龄
    // 今日辅食记录
    todayRecord: [
      { id: 1, time: '09:30', name: '高铁米粉', amount: '3勺', digest: '消化正常' },
      { id: 2, time: '14:00', name: '南瓜泥', amount: '半碗', digest: '消化正常' }
    ],
    // 辅食推荐数据（按月龄分类）
    foodRecommendMap: {
      6: [
        { id: 1, icon: '🥚', name: '蛋黄', desc: '富含卵磷脂，促进大脑发育', tag: '高营养' },
        { id: 2, icon: '🍗', name: '鸡肉泥', desc: '优质蛋白，易消化吸收', tag: '高蛋白' },
        { id: 3, icon: '🥞', name: '豆腐羹', desc: '植物蛋白，补钙佳品', tag: '补钙' }
      ],
      8: [
        { id: 1, icon: '🥚', name: '蛋黄', desc: '富含卵磷脂，促进大脑发育', tag: '高营养' },
        { id: 2, icon: '🍗', name: '鸡肉泥', desc: '优质蛋白，易消化吸收', tag: '高蛋白' },
        { id: 3, icon: '🥞', name: '豆腐羹', desc: '植物蛋白，补钙佳品', tag: '补钙' }
      ],
      10: [
        { id: 1, icon: '🥩', name: '牛肉泥', desc: '补铁补锌，增强免疫力', tag: '补铁' },
        { id: 2, icon: '🥦', name: '西兰花泥', desc: '富含维生素，促进钙吸收', tag: '维生素' },
        { id: 3, icon: '🍚', name: '软烂粥', desc: '碳水化合物，补充能量', tag: '主食' }
      ],
      12: [
        { id: 1, icon: '🍜', name: '碎碎面', desc: '易消化，补充碳水', tag: '主食' },
        { id: 2, icon: '🥕', name: '胡萝卜丁', desc: '富含胡萝卜素，保护视力', tag: '护眼' },
        { id: 3, icon: '🍤', name: '虾仁泥', desc: '优质蛋白，补钙补锌', tag: '补锌' }
      ]
    } as FoodRecommendMap,
    recommendFood: [] as FoodItem[] // 给recommendFood也指定类型
  },

  onLoad() {
    // 初始化：联动宝宝数据，自动匹配月龄
    this.loadBabyData()
    // 默认加载6月龄辅食推荐
    this.setData({
      recommendFood: this.data.foodRecommendMap[6] || []
    })
  },

  onShow() {
    this.loadBabyData()
  },

  // 联动宝宝数据，自动匹配月龄
  loadBabyData() {
    const babyList = wx.getStorageSync('babyList') || []
    const currentBabyId = wx.getStorageSync('currentBabyId')
    const currentBaby = babyList.find((item: any) => item.id === currentBabyId) || babyList[0]
    
    if (currentBaby && currentBaby.month) {
      const month = Number(currentBaby.month)
      // 根据宝宝月龄自动切换标签
      let tabId = 1
      if (month >=7 && month <=8) tabId = 2
      else if (month >=9 && month <=12) tabId = 3
      else if (month >12) tabId = 4

      this.setData({
        currentTab: tabId,
        currentAge: month,
        recommendFood: this.data.foodRecommendMap[month] || this.data.foodRecommendMap[6]
      })
    }
  },

  // 切换月龄标签
  switchTab(e: any) {
    const tabId = e.currentTarget.dataset.id
    let age = 6
    if (tabId === 2) age = 8
    else if (tabId === 3) age = 10
    else if (tabId === 4) age = 12

    this.setData({
      currentTab: tabId,
      currentAge: age,
      recommendFood: this.data.foodRecommendMap[age]
    })
  }
})