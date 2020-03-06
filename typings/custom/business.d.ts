/*
 * @Author: Light
 * @Date: 2020-02-28 10:55:51
 * @LastEditTime: 2020-03-04 15:59:31
 * @LastEditors: Light
 * @Description:
 * @FilePath: /ts-miniprogram-demo/typings/custom/business.d.ts
 */

/** 用户信息 */
type IDwUserInfo = {
  name: string
  avatarUrl: string
  uid: number
}

interface IWithdrawInfo {
  /** 余额，元 */
  balanceTotalUi: string
  /** 余额，分 */
  balanceTotal: number
  /** 服务费，元 */
  serviceChargeUi: string
  /** 预计到账，元 */
  expectReceiveUi: string
  /** 提现金额，元 */
  withdrawAmountUi: string
  /** 提现金额，分 */
  withdrawAmount: number
  /** 剩余可提现次数 */
  timesLeft: number
  /** 提现费率，百分比 */
  serviceRatioUi:string
  /** 提现费率 */
  serviceRatio:number
}
interface IListWithdraw {
  amountUi: string
  serviceChargeUi: string
  timeApply: string
  timeToAccount: string
  amountUiToAccount: string
  isOngoing: boolean
  isDone: boolean
  isFailed:boolean
}
type IWithdrawHistory = Array<IListWithdraw>

interface IEarningInfo {
  amountUiTotal: string
  amountUiExpect: string
  amountUiValid: string
}

interface IRebate {
  title: string
  dateBought: string
  dateSettled: string
  isOngoing?: boolean
  isSettled?: boolean
  isFailed?: boolean
  amountUiRebate: string
  imgUrl: string
}

type IRebateHistory = Array<IRebate>

/**
 * 优惠券
 */
interface IListCoupon {
  title: string
  date: string
  priceUiDiscount: string
  priceUiMin: string
  amountWorth: number
  imgUrl: string
  isUsed?: boolean
  isToUse?: boolean
  isOverdue?: boolean
}
type ICouponHistory = Array<IListCoupon>
