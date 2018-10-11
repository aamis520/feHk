import Vue from 'vue'
import Router from 'vue-router'

// 登錄 註冊 找回密碼
import Index from '@/pages/index/index'
import Login from '@/pages/user/Login'
import Regist from '@/pages/user/RegistStep1'
import Regist2 from '@/pages/user/RegistStep2'
import findPass1 from '@/pages/user/findPass'
import findPass2 from '@/pages/user/findPass2'
import setPass from '@/pages/user/setPass'

// 身份認證
import idIndentify from '@/pages/idCard/idIndentify'
import uploadIdCard from '@/pages/idCard/uploadIdCard'
// 創建錢包

// assets

import Assets from '@/pages/assets/index'
import AssetsDeatil from '@/pages/assets/detail'
import AssetsTransfer from '@/pages/assets/transfer'
import AssetsRollout from '@/pages/assets/rollOut'
import AssetsRolloutYzm from '@/pages/assets/rollOutYzm'
import AssetsTransferAccount from '@/pages/assets/transferAccount'
import AssetsRecord from '@/pages/assets/record'
import AssetsAddAddress from '@/pages/assets/addAssets'
import BindCard from '@/pages/assets/bindCard'


// OTC
import saveBuy from '@/pages/otc/saveBuy' // 我已付款
import buyIn from '@/pages/otc/buyIn' // 确认买入-进入组件
import cancelBuy from '@/pages/otc/cancelBuy' // 取消付款
import order from '@/pages/otc/order' // 发布交易单
import orderDetail from '@/pages/otc/orderDetail' // 发布交易单
import sellOut from '@/pages/otc/sellOut' // 发布交易单
import saveSell from '@/pages/otc/saveSell' // 发布交易单


// 账户相关
import AccountAll from '@/pages/account/allCoin' // 总资产
import AccountRedBag from '@/pages/account/redbag' // 红包
import AccountRedRecord from '@/pages/account/redrecord' // 红包记录
import AccountOrder from '@/pages/account/order' // 订单
import AccountCancelExchange from '@/pages/account/cancelExchange' // 取消交易
import AccountChangeAli from '@/pages/account/changeAli' // 修改支付宝
import AccountChangeBank from '@/pages/account/changeBank' // 修改银行卡
import AccountSafe from '@/pages/account/safeCenter' // 安全中心

import bindPhone from '@/pages/account/phone/index'    // 綁定手機
import bindEmail from '@/pages/account/email/index'     // 綁定郵箱
import bindBank from '@/pages/account/bank/index'       // 修改銀行卡
import addBank from '@/pages/account/bank/addCard'       // 添加銀行卡
import bindAlipay from '@/pages/account/alipay/index'   // 綁定支付寶

import AccountVertify from '@/pages/account/vertify' // 身份验证

// 兑换
import Convert from '@/pages/convert/index' //
import ConvertRecord from '@/pages/convert/record' //

// KLINE
import Kline from '@/pages/kline/index' //

// 开卡激活
import OpenCard from '@/pages/openCard/index' //
import OpenCardIdFirst from '@/pages/openCard/idStep1' //
import OpenCardIdSecond from '@/pages/openCard/idStep2' //

import store from '../store/index'
Vue.use(Router)


export let constantRouterMap = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Index,
  },
  {
    path: '/home/:name',
    component: Index,
  },
  {
    path: '/kline',
    component: Kline,
  },
  {
    path: '/saveBuy', // 确认购买
    component: saveBuy,
  },
  {
    path: '/buyIn', // 确认买入
    component: buyIn,
  },
  {
    path: '/cancelBuy', // 取消买入
    component: cancelBuy,
  },
  {
    path: '/order', // 发布交易单
    component: order,
  },
  {
    path: '/orderDetail', // 交易单详情
    component: orderDetail,
  },
  {
    path: '/sellOut', // 卖出
    component: sellOut,
  },
  {
    path: '/saveSell', // 卖出
    component: saveSell,
  },
  // account 賬戶
  {
    path: '/account/all',
    component: AccountAll
  },
  {
    path: '/account/cancelEx',
    component: AccountCancelExchange
  },
  {
    path: '/account/changeAli',
    component: AccountChangeAli
  },
  {
    path: '/account/changeBank',
    component: AccountChangeBank
  },
  {
    path: '/account/order',
    component: AccountOrder
  },
  {
    path: '/account/redbag',
    component: AccountRedBag
  },
  {
    path: '/account/redrecord',
    component: AccountRedRecord
  },
  {
    path: '/account/safe',
    component: AccountSafe
  },
  {
    path: '/account/vertify',
    component: AccountVertify
  },
  // 安全中心
  {
    path: '/account/safe/phone',
    component: bindPhone
  },
  {
    path: '/account/safe/email',
    component: bindEmail
  },
  {
    path: '/account/safe/bank',   // 修改銀行卡
    component: bindBank
  },
  {
    path: '/account/safe/addBank',
    component: addBank
  },
  {
    path: '/account/safe/alipay',
    component: bindAlipay
  },
  // 資產
  {
    path: '/assets', // 资产首页
    name: 'assets',
    component: Assets,
  },
  {
    path: '/assets/detail', // 总资产
    component: AssetsDeatil
  },
  {
    path: '/assets/transfer', // 划转1
    component: AssetsTransfer
  },
  {
    path: '/assets/rollOut', // 转账出
    component: AssetsRollout
  },
  {
    path: '/assets/rollOutYzm',
    component: AssetsRolloutYzm
  },
  {
    path: '/assets/transferAccount', // 转账到卡
    component: AssetsTransferAccount
  },
  {
    path: '/assets/record', // 划转记录
    component: AssetsRecord
  },
  {
    path: '/assets/bindCard', // 綁卡
    component: BindCard
  },
  {
    path: '/assets/addAddr', // 添加地址
    component: AssetsAddAddress
  },
  {
    path: '/convert', //
    component: Convert
  },
  {
    path: '/convert/record', //
    component: ConvertRecord
  },
  // 开卡激活
  {
    path: '/opencard', //
    component: OpenCard
  },
  {
    path: '/opencard/idstep1', //
    component: OpenCardIdFirst
  },
  {
    path: '/opencard/idstep2', //
    component: OpenCardIdSecond
  },
  // 註冊
  {
    path: '/regist',
    component: Regist
  },
  {
    path: '/regist/2',
    component: Regist2
  },
  // 找回密碼
  {
    path: '/findPass',
    component: findPass1
  },
  {
    path: '/findPass/2',
    component: findPass2
  },
  // 設置密碼
  {
    path: '/setPass',
    component: setPass
  },
  // idIndentify 身份認證
  {
    path: '/idIndentify',
    component: idIndentify
  },
  {
    path: '/uploadIdCard',
    component: uploadIdCard
  },
  {
    path: '/login',
    component: Login
  }
]


let router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
router.beforeEach((to,from,next) => {
  if(to.path == '/regist' || to.path == '/regist/2' || to.path == '/findPass' || to.path == '/findPass/2' || to.path == '/setPass'){
    if(localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != ''){
      next('/home')
    }else{
      next()
    }
  }else if(to.path != '/login'){
    if(localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != ''){
      next()
    }else{
      next('/login')
      // next()
    }
  }else{
    next()
  }
})
export default router
