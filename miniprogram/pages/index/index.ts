Page({
  data: {
    todayDate: '', // 今日日期
    currentBaby: null, // 当前宝宝数据（和mine页联动）
    // 今日状态数据
    todayStatus: {
      milk: 600,
      food: 3,
      sleep: 12,
      poop: 1
    },
    // 今日待办列表
    todoList: [
      { id: 1, content: '上午辅食 - 高铁米粉', isDone: true },
      { id: 2, content: '下午辅食 - 南瓜泥', isDone: true },
      { id: 3, content: '晚间辅食 - 鸡肉泥', isDone: false }
    ],
    // 【新增】推荐辅食数据（和UI完全对应）
    recommendFood: [
      { id: 1, name: '南瓜泥', icon: '🎃', age: '7-8月龄' },
      { id: 2, name: '鸡肉泥', icon: '🍗', age: '7-8月龄' },
      { id: 3, name: '蛋黄泥', icon: '🥚', age: '7-8月龄' }
    ]
  },

  onLoad() {
    this.initDate()
    this.loadBabyData() // 联动你之前的宝宝数据
  },

  onShow() {
    this.loadBabyData() // 每次显示页面刷新宝宝数据
  },

  // 初始化今日日期
  initDate() {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
    this.setData({
      todayDate: `${month}月${day}日 ${week}`
    })
  },

  // 联动你之前的宝宝数据（和mine页共用）
  loadBabyData() {
    const babyList = wx.getStorageSync('babyList') || []
    const currentBabyId = wx.getStorageSync('currentBabyId')
    const currentBaby = babyList.find((item: any) => item.id === currentBabyId) || babyList[0] || { name: '小宝贝', month: 8, day: 12 }
    
    this.setData({ currentBaby })
    // 后续可以根据宝宝月龄筛选推荐辅食
    this.filterFoodByAge(currentBaby?.month || 8)
  },

  // 【新增】根据宝宝月龄筛选推荐辅食（示例：8个月显示7-8月龄辅食）
  filterFoodByAge(month: number) {
    // 这里可以根据不同月龄配置不同辅食，现在先显示所有
    const allFood = [
      { id: 1, name: '南瓜泥', icon: '🎃', age: '7-8月龄' },
      { id: 2, name: '鸡肉泥', icon: '🍗', age: '7-8月龄' },
      { id: 3, name: '蛋黄泥', icon: '🥚', age: '7-8月龄' },
      { id: 4, name: '菠菜泥', icon: '🥬', age: '8-9月龄' },
      { id: 5, name: '猪肝泥', icon: '🐷', age: '9-10月龄' }
    ]
    // 示例：8个月只显示7-8月龄的辅食
    const filteredFood = allFood.filter(item => item.age.includes(`${month}`))
    this.setData({ recommendFood: filteredFood.length ? filteredFood : allFood.slice(0,3) })
  },

  // 待办勾选切换
  toggleTodo(e: any) {
    const id = e.currentTarget.dataset.id
    const todoList = this.data.todoList.map((item: any) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone }
      }
      return item
    })
    this.setData({ todoList })
    wx.setStorageSync('todoList', todoList)
  },

  // 快捷按钮跳转
  goAddFood() {
    wx.switchTab({ url: '/pages/food/food' }) // 跳转到辅食tab页
  },
  goRecordGrow() {
    wx.switchTab({ url: '/pages/growth/growth' }) // 跳转到成长tab页
  },
  goWriteDiary() {
    wx.showToast({ title: '写日记功能开发中', icon: 'none' })
  },
  goTakePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: (res) => {
        wx.showToast({ title: '照片已拍摄', icon: 'success' })
      }
    })
  },

  // 辅食卡片点击事件
  goFoodDetail(e: any) {
    const id = e.currentTarget.dataset.id
    const food = this.data.recommendFood.find((item: any) => item.id === id)
    wx.showToast({ title: `查看${food?.name}详情`, icon: 'none' })
    // 后续可以跳转到辅食详情页
  },
  goFoodList() {
    wx.switchTab({ url: '/pages/food/food' })
  },
  goTodoList() {
    wx.showToast({ title: '待办列表开发中', icon: 'none' })
  }
})