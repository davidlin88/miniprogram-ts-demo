/*
 * @Author: Light
 * @Date: 2020-03-06 14:15:02
 * @LastEditTime: 2020-03-06 17:26:55
 * @LastEditors: Light
 * @Description: 实时日志
 * @FilePath: /ts-miniprogram-demo/miniprogram/utils/log.ts
 */
var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
 
export default {
  info(...args:any) {
    if (!log) return
    log.info.call(log, ...args)
  },
  warn(...args:any) {
    if (!log) return
    log.warn.call(log, ...args)
  },
  error(...args:any) {
    if (!log) return
    log.error.call(log, ...args)
  },
  setFilterMsg(msg: string) {
    // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return
    if (typeof msg !== 'string') return
    log.setFilterMsg(msg)
  },
  addFilterMsg(msg: string) {
    // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return
    if (typeof msg !== 'string') return
    log.addFilterMsg(msg)
  },
}
