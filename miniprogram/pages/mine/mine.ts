Page({
  data: {
    babyList: [], // 多宝宝列表
    currentBabyId: '', // 当前选中宝宝ID
    currentBaby: null // 当前宝宝信息
  },

  onLoad() {
    // 初始化加载宝宝数据
    this.loadBabyData()
  },

  onShow() {
    // 每次显示页面刷新宝宝数据
    this.loadBabyData()
  },

  // 加载宝宝数据（本地存储）
  loadBabyData() {
    const babyList = wx.getStorageSync('babyList') || [
      // 默认宝宝数据（无数据时初始化）
      { id: '1', name: '宝宝', gender: '男宝', month: 6, day: 0 },
      { id: '2', name: '二宝', gender: '女宝', month: 12, day: 5 }
    ]
    // 获取当前选中的宝宝ID，无则选第一个
    let currentBabyId = wx.getStorageSync('currentBabyId') || babyList[0].id
    // 找到当前选中的宝宝信息
    const currentBaby = babyList.find(item => item.id === currentBabyId)

    this.setData({
      babyList,
      currentBabyId,
      currentBaby
    })
  },

  // 切换宝宝
  switchBaby(e: any) {
    const babyId = e.currentTarget.dataset.id
    // 更新当前宝宝ID并存储
    wx.setStorageSync('currentBabyId', babyId)
    // 重新加载数据
    this.loadBabyData()
    // 提示切换成功
    wx.showToast({ title: '已切换宝宝', icon: 'success' })
  },

  // 添加宝宝（占位，后续可完善）
  goAddBaby() {
    wx.showModal({
      title: '添加宝宝',
      content: '请输入宝宝信息',
      editable: true,
      placeholderText: '宝宝姓名',
      success: (res) => {
        if (res.confirm && res.content) {
          const babyList = this.data.babyList
          // 生成新宝宝ID
          const newId = Date.now().toString()
          // 新增宝宝数据
          babyList.push({
            id: newId,
            name: res.content,
            gender: '男宝',
            month: 8,
            day: 12
          })
          // 存储并刷新
          wx.setStorageSync('babyList', babyList)
          this.loadBabyData()
          wx.showToast({ title: '添加成功', icon: 'success' })
        }
      }
    })
  },

  // 编辑宝宝信息（占位）
  goEditBaby() {
    wx.showToast({ title: '编辑宝宝信息功能开发中', icon: 'none' })
  },

  // 功能列表跳转（占位）
  goCollection() { wx.showToast({ title: '我的收藏开发中', icon: 'none' }) },
  goBabyNote() { wx.showToast({ title: '育儿笔记开发中', icon: 'none' }) },
  goExportRecord() { wx.showToast({ title: '导出记录开发中', icon: 'none' }) },
  goNoticeSetting() { wx.showToast({ title: '通知设置开发中', icon: 'none' }) },
  goPrivacySetting() { wx.showToast({ title: '隐私设置开发中', icon: 'none' }) },
  goHelpFeedback() { wx.showToast({ title: '帮助与反馈开发中', icon: 'none' }) },
  goAboutUs() { wx.showToast({ title: '关于我们开发中', icon: 'none' }) }
})