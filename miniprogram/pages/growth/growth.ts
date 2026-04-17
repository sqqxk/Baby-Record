Page({
  data: {
    // 成长数据（可联动宝宝实际数据）
    growthData: {
      height: '72.5',
      heightChange: '+2.5cm',
      weight: '9.2',
      weightChange: '+0.3kg',
      headCircum: '44',
      headCircumStatus: '正常'
    },
    // 发育里程碑数据
    milestoneList: [
      { id: 1, name: '独坐稳固', time: '7个月达成', status: 'done' },
      { id: 2, name: '爬行', time: '7个半月达成', status: 'done' },
      { id: 3, name: '扶站', time: '预计8-9个月', status: 'pending' },
      { id: 4, name: '叫爸爸妈妈', time: '预计9-10个月', status: 'pending' }
    ],
    // 疫苗提醒数据
    vaccineInfo: {
      name: '麻腮风疫苗',
      time: '4月15日'
    }
  },

  onLoad() {
    // 联动宝宝数据，自动匹配月龄相关信息
    this.loadBabyData()
  },

  onShow() {
    this.loadBabyData()
  },

  // 联动宝宝数据（和mine页、首页共用）
  loadBabyData() {
    const babyList = wx.getStorageSync('babyList') || []
    const currentBabyId = wx.getStorageSync('currentBabyId')
    const currentBaby = babyList.find((item: any) => item.id === currentBabyId) || babyList[0]
    
    if (currentBaby && currentBaby.month) {
      // 可根据宝宝月龄动态更新里程碑/疫苗提醒
      console.log('当前宝宝月龄：', currentBaby.month)
    }
  },

  // 功能按钮跳转（占位，后续可完善）
  goRecordData() {
    wx.showToast({ title: '记录身高体重功能开发中', icon: 'none' })
  },
  goVaccineRemind() {
    wx.showToast({ title: '疫苗提醒详情开发中', icon: 'none' })
  },
  goGrowthEval() {
    wx.showToast({ title: '发育评估功能开发中', icon: 'none' })
  },
  goGrowthAlbum() {
    wx.showToast({ title: '成长相册功能开发中', icon: 'none' })
  },
  goVaccineDetail() {
    wx.showToast({ title: `麻腮风疫苗接种提醒：${this.data.vaccineInfo.time}`, icon: 'none' })
  }
})
