/*
 * @Author: Light
 * @Date: 2020-02-24 10:06:17
 * @LastEditTime: 2020-03-06 14:54:27
 * @LastEditors: Light
 * @Description:
 * @FilePath: /ts-miniprogram-demo/miniprogram/app.ts
 */
import utils from './utils/utils'
import hack from './utils/hack'

hack()

App({
  globalData: {
    dwUserInfo: {
      name: '',
      openId: '',
      id: '',
    },
    deviceInfo: <IDeviceInfo | null>null,
    options: {}, // tab页options
  },
  onLaunch() {
    console.log('onLaunch', arguments[0])

  },
  onShow() {
  },
  getDeviceInfo() {
    return new Promise((resolve, reject) => {
      if (this.globalData.deviceInfo) {
        resolve(this.globalData.deviceInfo)
      } else {
        wx.getSystemInfo({
          success: res => {
            console.log('设备信息', res)
            this.globalData.deviceInfo = {
              ratio: 750 / res.windowWidth,
              ...res,
            }
            resolve(res)
          },
          fail(e) {
            wx.showToast({
              title: '获取设备信息失败',
              icon: 'none',
            })
            reject(e)
          },
        })
      }
    })
  },
  isIpx() {
    return this.getDeviceInfo().then((res: any) => {
      return res.model.indexOf('iPhone X') >= 0
    })
  },
  getSharePath({ withInviterInfo = true, page = 'index', ...params } = {}) {
    const { dwUserInfo } = this.globalData
    let inviterInfo = {
      inviterOpenId: dwUserInfo.openId,
      inviterUID: dwUserInfo.id,
      inviterName: dwUserInfo.name,
    }
    console.log('params:', params)
    console.log(utils.getQsStringify(params))
    return `/pages/${page}/${page}${
      params || withInviterInfo ? '?' : ''
    }${utils.getQsStringify(params)}${params && withInviterInfo ? '&' : ''}${
      withInviterInfo ? utils.getQsStringify(inviterInfo) : ''
    }`
  },
  toPage(e: any) {
    const { url } = e.currentTarget.dataset
    utils.toPage({ url })
  },
  onError() {},
})

export {}
