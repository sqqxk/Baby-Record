const foodOptions: any = {
  "6月龄": ["高铁米粉", "南瓜泥", "土豆泥", "苹果泥", "香蕉泥"],
  "7-8月龄": ["蛋黄", "鸡肉泥", "猪肉泥", "鳕鱼泥", "豆腐羹"],
  "9-12月龄": ["烂面条", "肉末粥", "小馄饨", "虾仁", "软粥"],
  "1岁+": ["软饭", "饺子", "馒头", "水果块", "蔬菜块"]
}

Page({
  data: {
    monthList: Object.keys(foodOptions),
    monthIdx: 0,
    foodList: foodOptions["6月龄"],
    foodIdx: 0,
    unitList: ["1勺", "2勺", "3勺", "小半碗", "半碗", "一碗", "50g", "100g"],
    unitIdx: 0,
    allergy: false,
    todayList: []
  },

  onShow() {
    this.loadToday()
  },

  setMonth(e: any) {
    const idx = e.detail.value
    const key = this.data.monthList[idx]
    this.setData({
      monthIdx: idx,
      foodList: foodOptions[key],
      foodIdx: 0
    })
  },

  setFood(e: any) {
    this.setData({ foodIdx: e.detail.value })
  },

  setUnit(e: any) {
    this.setData({ unitIdx: e.detail.value })
  },

  setAllergy(e: any) {
    this.setData({ allergy: e.detail.value })
  },

  save() {
    const { foodList, foodIdx, unitList, unitIdx, allergy } = this.data
    const food = foodList[foodIdx]
    const unit = unitList[unitIdx]
    const today = new Date().toISOString().split('T')[0]
    const time = new Date().toLocaleTimeString().slice(0, 5)

    const data = {
      id: Date.now(),
      date: today,
      time,
      food,
      unit,
      allergy
    }

    let arr = wx.getStorageSync('food') || []
    arr.unshift(data)
    wx.setStorageSync('food', arr)

    wx.showToast({ title: '保存成功' })
    this.loadToday()
  },

  loadToday() {
    const today = new Date().toISOString().split('T')[0]
    const all = wx.getStorageSync('food') || []
    const list = all.filter((i: any) => i.date === today)
    this.setData({ todayList: list })
  }
})