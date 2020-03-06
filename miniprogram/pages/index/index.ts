/*
 * @Author: Light
 * @Date: 2020-02-24 10:06:17
 * @LastEditTime: 2020-03-06 14:37:36
 * @LastEditors: Light
 * @Description:
 * @FilePath: /ts-miniprogram-demo/miniprogram/pages/index/index.ts
 */

const limit = 30
Page({
  isLoaded: false,
  lockLoadGoodsList: false,
  data: {
    goodsList: <IGoodsList>[],
    userInfo: { uid: 0, name: '', avatarUrl: '' },
  },
  onLoad() {
    this.reload().then(_ => {
      this.isLoaded = true
    })
  },
  onShow() {
    if (this.isLoaded) {
      this.reload()
    }
  },
  reload() {
    return Promise.all([])
  },
  async onPullDownRefresh() {
    wx.showLoading({
      title: '刷新中',
    })
    await this.reload()
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage() {
    return {}
  },
})
