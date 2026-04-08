Page({
  data: {
    height: "",
    weight: "",
    note: "",
    list: []
  },

  onShow() {
    this.loadList()
  },

  save() {
    const { height, weight, note } = this.data
    if (!height || !weight) {
      wx.showToast({ title: "请填写身高体重", icon: "none" })
      return
    }

    const data = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      height,
      weight,
      note
    }

    let arr = wx.getStorageSync('growth') || []
    arr.unshift(data)
    wx.setStorageSync('growth', arr)

    wx.showToast({ title: '保存成功' })
    this.setData({ height: "", weight: "", note: "" })
    this.loadList()
  },

  loadList() {
    const list = wx.getStorageSync('growth') || []
    this.setData({ list })
  }
})