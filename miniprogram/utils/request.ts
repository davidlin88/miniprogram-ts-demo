import config from '../config/index'
import * as map from './map'

// const map = require('../utils/map')
import log from './log'

let dwSession = ''
let dwSessionFuture: ISessionFuture = null

let lockShowReloadModal = false // 阻止重复弹重载弹窗

const POST = 'POST'
const GET = 'GET'

const V1 = 'v1/'

function showReloadModal() {
  wx.showModal({
    title: '网络出错',
    content: '网络出错，是否刷新页面？',
    success(res) {
      let reloadCurrentPage = () => {
        let pages = getCurrentPages()
        const len = pages.length
        let currentPage = pages[len - 1]
        currentPage.onUnload()
        // currentPage.onLoad(currentPage.options) // 因为onload存在rxjs的订阅发布模式，直接onload可能不会刷新页面数据，改onshow
        currentPage.onShow()
        console.log('所有页面栈:', pages)
        console.log('当前页面:', currentPage)
      }
      if (res.confirm) {
        reloadCurrentPage()
      }
      lockShowReloadModal = false
    },
    fail: e => {
      console.error(e)
      lockShowReloadModal = false
    },
  })
}
function tryReload() {
  console.warn('尝试重启')
  if (!lockShowReloadModal) {
    lockShowReloadModal = true
    showReloadModal()
  }
}

// 1.wx.login 获取code
const _getCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: res => {
        // console.log('got code', res.code)
        resolve(res)
      },
      fail: res => {
        reject(res)
      },
    })
  })
}

// 2、拿code换取session
const _codeToSession = (code: string) => {
  return _dwrequest(`${V1}login`, POST, {
    code: code,
  })
    .then((res: any) => {
      // return Promise.reject(500) // test network error
      dwSession = res.data.token
      // console.log('got session', dwSession)
      return dwSession
    })
    .catch(e => {
      console.error(e)
      wx.showToast({
        title: '登录失败',
        icon: 'none',
      })
      return Promise.reject(e)
    })
}

// 3.1 封装通用wx.request
const _dwrequest = (
  path: IPath,
  method: IMethod = 'GET',
  data: IData = {},
  session?: any
) => {
  let url = `${config.baseUrl}${path}`
  let header: any = {
    'content-type': 'application/json', // 默认值
  }

  if (session != null) {
    header['Authorization'] = session
  }
  return new Promise<any>((resolv, reject) => {
    wx.request({
      url: url,
      header: header,
      data: data || {},
      method: method,
      success: res => {
        if (res.statusCode == 200) {
          resolv(res.data)
        } else {
          log.addFilterMsg('request')
          log.addFilterMsg('server_error')
          log.info(path, method, data)
          log.error(res.statusCode, res)
          reject(res.data)
        }
      },
      fail: res => {
        log.addFilterMsg('request')
        log.addFilterMsg('wx_request_fail')
        log.info(path, method, data)
        log.error(res)
        getApp().onError(`wx_request_fail:${res.errMsg}`)
        tryReload()
        reject(res)
      },
      complete: res => {
        console.debug(path)
        console.debug(data)
        console.debug(res)
      },
    })
  })
}
// 3.2 封装后台微信服务的request

const _wxRequest = (
  path: IPath,
  method: any,
  data: object,
  session?: string
) => {
  const url = `${config.wxBaseUrl}${path}`
  const header: any = {
    'content-type': 'application/json', // 默认值
  }

  if (session != null) {
    header['X-DWHUB-SESSION'] = session
    // header['X-DWHUB-SESSION'] = 'test';
  }
  return new Promise((resolv, reject) => {
    wx.request({
      url: url,
      header: header,
      data: data || {},
      method: method,
      success: res => {
        if (res.statusCode == 200) {
          resolv(res.data)
        } else {
          log.addFilterMsg('wx_server')
          log.addFilterMsg('request')
          log.addFilterMsg('server_error')
          log.info(path, method, data)
          log.error(res.statusCode, res)
          reject(res.data)
        }
      },
      fail: res => {
        log.addFilterMsg('wx_server')
        log.addFilterMsg('request')
        log.addFilterMsg('request_fail')
        log.info(path, method, data)
        log.error(res)
        reject(res)
      },
      complete: res => {
        console.debug(path)
        console.debug(data)
        console.debug(res)
      },
    })
  })
}
// 3.3 封装后台微信服务的upload请求

const _wxUpload = (path: IPath, filePath: string) => {
  console.error(path, filePath)

  const url = `${config.wxBaseUrl}${path}`

  return new Promise((resolv, reject) => {
    wx.uploadFile({
      url,
      filePath,
      name: 'media',
      success: res => {
        if (res.statusCode == 200) {
          resolv(res.data)
        } else if (res.statusCode === 413) {
          reject({ msg: '文件过大', ...res })
        } else {
          reject(res)
        }
      },
      fail: res => reject(res),
      complete: res => {
        console.debug(path)
        console.debug(filePath)
        console.debug(res)
      },
    })
  })
}

export const imgValidator = (filePath: string) => {
  return _wxUpload(`img_sec_check?appid=${config.appId}`, filePath).catch(e => {
    if (e.statusCode === 403) {
      e = {
        ...e,
        msg: '图片违规',
      }
    }
    return Promise.reject(e)
  })
}

export const msgValidator = (msg: string) => {
  return _wxRequest(`msg_sec_check?appid=${config.appId}`, POST, {
    content: msg,
  })
}

// 4、封装通用请求
export const __request = (path: IPath, method: IMethod, data?: IData) => {
  return getSession().then(session => _dwrequest(path, method, data, session))
}

const _request = (path: IPath, method: IMethod, data?: IData) => {
  return __request(path, method, data)
    .catch((e: any) => {
      console.error(path, e)
      // 捕获网络异常
      tryReload()
      wx.showToast({
        title: e.message || '网络异常，稍后重试哦~',
        icon: 'none',
        duration: 2500,
      })
      return Promise.reject(e)
    })
    .then((res: any) => {
      // 捕获业务异常
      if (res.code !== 0) {
        console.error(path, res)
        wx.showToast({
          title: res.message || '网络异常，稍后重试哦~',
          icon: 'none',
          duration: 3500,
        })
        return Promise.reject(res)
      }
      return Promise.resolve(res.data)
    })
}

const getSession = () => {
  if (dwSessionFuture) {
    // 正在登录
    return dwSessionFuture
  } else {
    if (dwSession === '') {
      // 如果本地依然没有，则尝试登录获取
      // console.log('内存无session，调login接口')
      dwSessionFuture = _getCode()
        .then((res: any) => {
          return _codeToSession(res.code)
        })
        .catch(e => {
          tryReload()
          // 登录流程已失败，销毁promise，重新登录，防止refresh页面时直接走老的reject
          dwSessionFuture = null
          return Promise.reject(e)
        })
      return dwSessionFuture
    }
    // 说明本地有合法的session了，那么返回
    return Promise.resolve(dwSession)
  }
}

export const getUserInfo = () => {
  return _request(`${V1}user`, GET).then(map.userInfo)
}

export const getIndexGoodsList = ({ limit = 30, offset = 0 } = {}) => {
  return _request(`${V1}product/list`, GET, { limit, offset }).then(
    map.indexGoodsList
  )
}
