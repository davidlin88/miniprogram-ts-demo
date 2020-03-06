/*
 * @Author: Light
 * @Date: 2020-02-24 15:14:52
 * @LastEditTime: 2020-03-06 18:27:39
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/typings/custom/index.d.ts
 */
/// <reference path="./request.d.ts" />

declare module ''

type IPath = string
type IData = object
type IMethod = | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
type ISession = string
type ISessionFuture = Promise<{}> | null

interface IDeviceInfo extends WechatMiniprogram.GetSystemInfoSuccessCallbackResult {
  ratio:number
}