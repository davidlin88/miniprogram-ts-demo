/*
 * @Author: Light
 * @Date: 2020-02-24 10:06:17
 * @LastEditTime: 2020-03-06 14:45:36
 * @LastEditors: Light
 * @Description: 工具箱
 * @FilePath: /ts-miniprogram-demo/miniprogram/utils/utils.ts
 */
import config from '../config/index'

const LOAD_TIMEOUT = 2.5 * 1000 // promise reject的最大时间

/**
 * 返回对象类型
 * @param obj 任意值
 */
function type(obj: any) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

/**
 * 获取页面名
 * @param url 页面路径
 */
function getPageName(url = '') {
  const start = url.lastIndexOf('/') + 1
  const end = url.indexOf('?')
  if (end < 0) {
    return url.slice(start)
  } else {
    return url.slice(start, end)
  }
}
export default {
  getRandomListItem(list:any) {
    if (type(list) === 'Array') {
      const len = list.length
      const index = parseInt(String(Math.random() * len), 10)
      return list[index]
    } else {
      return null
    }
  },
  /**
   * 输入的时间是否是今天
   * @param time 日期
   */
  isDateToday(time: string) {
    if (new Date(time).toDateString() === new Date().toDateString()) {
      debugger
      return true
    } else {
      return false
    }
  },
  // query字符串转对象
  getQsParse(url: string) {
    let start = url.indexOf('?')
    if (start < 0) {
      return null
    }
    start += 1
    url = url.slice(start)
    let result = <any>{}
    const arr = url.split('&')
    arr.forEach(v => {
      const param = v.split('=')
      result[param[0]] = param[1]
    })
    return result
  },
  formatDate: (date: any, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    if (date instanceof Date === false) {
      date = new Date(date)
    }
    const o: any = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    }
    return fmt
  },

  toPage: (options: { url: string }) => {
    const url = options.url
    // 是否是页面路径
    function isAppPageUrl(url: string) {
      return url.includes('pages/')
    }
    // 获取页面名
    function getPageName(url: string) {
      const start = url.lastIndexOf('/') + 1
      const end = url.indexOf('?')
      if (end < 0) {
        return url.slice(start)
      } else {
        return url.slice(start, end)
      }
    }
    // 获取页面打开方式
    function getPageOpenType(pageName: string) {
      return config.tabPageList.includes(pageName) ? 'switchTab' : 'navigateTo'
    }

    if (isAppPageUrl(options.url)) {
      wx[getPageOpenType(getPageName(url))]({ url })
    }
  },

  /**
   *
   * @param {Promise} promise 原始promise
   * @param {Number} timeoutNumber 超时等待时间 毫秒
   */
  promiseWithTimeout(promise: Promise<{}>, timeoutNumber = LOAD_TIMEOUT) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        reject('time out')
      }, timeoutNumber)
      promise
        .then(res => {
          clearTimeout(timeout)
          resolve(res)
        })
        .catch(e => {
          console.error(e)
          clearTimeout(timeout)
          reject(e)
        })
    })
  },

  // 对象转query字符串
  getQsStringify(params: any) {
    let str = ''
    if (type(params) !== 'Object') {
      console.error('params 不为Object')
      return ''
    }
    for (let key in params) {
      str += `${str ? '&' : ''}${key}=${params[key]}`
    }
    return str
  },
  getPageName,
}
