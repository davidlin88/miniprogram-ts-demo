/*
 * @Author: Light
 * @Date: 2020-02-25 15:05:21
 * @LastEditTime: 2020-03-03 17:19:00
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/cli/config/env_config/dev.ts
 */
const baseUrl = 'http://192.168.2.18:8080/cpapi/'

const wssUrl = 'wss://api.dwhub.com.cn'
const wxBaseUrl = 'https://api.dwhub.com.cn/wx_api/'
const env = 'development'

export default {
  baseUrl,
  env,
  wssUrl,
  wxBaseUrl
}
