Page({
  data: {
    todayFood: 0,
    todayGrowth: 0,
    foodList: [],
    growthList: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const today = new Date().toISOString().split('T')[0]
    const food = wx.getStorageSync('food') || []
    const growth = wx.getStorageSync('growth') || []

    const todayFood = food.filter((i: any) => i.date === today).length
    const todayGrowth = growth.filter((i: any) => i.date === today).length

    this.setData({
      todayFood,
      todayGrowth,
      foodList: food.slice(0, 5),
      growthList: growth.slice(0, 5)
    })
  },

  goFood() { wx.switchTab({ url: '/pages/food/food' }) },
  goGrowth() { wx.switchTab({ url: '/pages/growth/growth' }) }
})