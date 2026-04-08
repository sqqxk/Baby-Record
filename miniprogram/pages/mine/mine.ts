// 仅保留必要属性，彻底删除错误的res属性
interface BabyItem {
  id: string;
  name: string;
  month: string;
  avatar: string;
}

Page({
  data: {
    babyList: [] as BabyItem[],
    currentBabyId: '',
    currentBaby: null as BabyItem | null,
    vipInfo: { status: '免费版', tag: '立即开通' }
  },

  onShow() {
    this.loadBabyData();
  },

  loadBabyData() {
    // 正确的默认宝宝数据，无多余属性
    const defaultBaby: BabyItem = { id: '1', name: '宝宝', month: '6', avatar: '👶' };
    const storedList = wx.getStorageSync('babyList');
    const babyList: BabyItem[] = storedList?.length ? storedList : [defaultBaby];
    const currentBabyId = wx.getStorageSync('currentBabyId') || babyList[0].id;
    const currentBaby = babyList.find(item => item.id === currentBabyId) || defaultBaby;

    this.setData({ babyList, currentBabyId, currentBaby });
  },

  switchBaby(e: any) {
    const id = e.currentTarget.dataset.id;
    const currentBaby = this.data.babyList.find(item => item.id === id);
    if (!currentBaby) return;

    this.setData({ currentBabyId: id, currentBaby });
    wx.setStorageSync('currentBabyId', id);
    wx.showToast({ title: `已切换至${currentBaby.name}` });
  },

  addBaby() {
    wx.showModal({
      title: '添加宝宝',
      editable: true,
      placeholderText: '输入宝宝姓名',
      success: (res) => {
        if (res.confirm && res.content?.trim()) {
          const newBaby: BabyItem = {
            id: Date.now().toString(),
            name: res.content.trim(),
            month: '0',
            avatar: '👶'
          };
          const list = [...this.data.babyList, newBaby];
          this.setData({ babyList: list });
          wx.setStorageSync('babyList', list);
          wx.showToast({ title: '添加成功' });
        }
      }
    });
  },

  editBaby() {
    const currentBaby = this.data.currentBaby;
    if (!currentBaby) return;

    wx.showModal({
      title: '编辑宝宝',
      editable: true,
      placeholderText: '输入新姓名',
      success: (res) => {
        if (res.confirm && res.content?.trim()) {
          const list = this.data.babyList.map(item => 
            item.id === currentBaby.id ? { ...item, name: res.content!.trim() } : item
          );
          this.setData({ babyList: list, currentBaby: { ...currentBaby, name: res.content!.trim() } });
          wx.setStorageSync('babyList', list);
          wx.showToast({ title: '修改成功' });
        }
      }
    });
  },

  goVip() {
    wx.showModal({ title: '会员中心', content: '开通会员解锁全部功能', confirmText: '立即开通' });
  },
  goOrder() { wx.showToast({ title: '订单管理', icon: 'none' }) },
  goCollect() { wx.showToast({ title: '我的收藏', icon: 'none' }) },
  goNote() { wx.showToast({ title: '育儿笔记', icon: 'none' }) },
  exportRecord() { wx.showToast({ title: '导出成功', icon: 'success' }); },
  goSetting() { wx.showToast({ title: '通用设置', icon: 'none' }) },
  goHelp() { wx.showToast({ title: '使用帮助', icon: 'none' }) },
  contactService() {
    wx.showModal({ title: '联系客服', content: '微信：kefu001', showCancel: false });
  }
});