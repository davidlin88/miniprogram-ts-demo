/*
 * @Author: Light
 * @Date: 2020-02-28 10:53:00
 * @LastEditTime: 2020-03-06 18:26:47
 * @LastEditors: Light
 * @Description: 中台数据映射
 * @FilePath: /ts-miniprogram-demo/miniprogram/utils/map.ts
 */

import config from '../config/index'
/**
 * 获取金额显示字符串，元
 * @param num 金额，分
 */
function getPriceUi(num: number) {
  return (num / 100).toFixed(2)
}

/** 用户信息 */
export function userInfo(r: any): IDwUserInfo {
  return {
    name: r.nickname,
    avatarUrl: r.avatar_url,
    uid: r.id,
  }
}

/** 提现 */
export function withdrawInfo(r: any): IWithdrawInfo {
  const { service_rate } = r
  const serviceCharge = (r.rebate_cash * service_rate) / 1000
  const withdrawAmount = Math.min(config.withdraw.maxWithdraw, r.rebate_cash)

  return {
    balanceTotalUi: getPriceUi(r.rebate_cash),
    balanceTotal: r.rebate_cash,
    serviceChargeUi: getPriceUi(serviceCharge),
    serviceRatioUi: `${service_rate / 10}%`,
    serviceRatio:service_rate/1000,
    expectReceiveUi: getPriceUi(r.rebate_cash - serviceCharge),
    withdrawAmount: withdrawAmount,
    withdrawAmountUi: getPriceUi(withdrawAmount),
    timesLeft: r.cash_times,
  }
}

function listGoods(r: any): IListGoods {
  return {
    title: r.name,
    goodsId: r.id,
  }
}

export function indexGoodsList({ products }: any): IGoodsList {
  if (!products?.length) {
    return []
  } else {
    return products.map(listGoods)
  }
}
