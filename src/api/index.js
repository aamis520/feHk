import axios from 'axios'
import router from '../router'
import { Toast } from 'mint-ui'

const apiConfig = {
  baseURL: 'http://f.mb.sxurl.cn/server.php',
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  validateStatus(status) {
    return true
  }
}

const instance = axios.create(apiConfig)
instance.interceptors.request.use(function (config) {
  if(navigator.onLine){
    return config
  }else{

    return Promise.reject(config)
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 有res的拦截
    if (response.status < 200 || response.status >= 300) {

    }
    if(response.data != null){
      return response.data
    }else{
      return response
    }

  }
);


// 错误统一处理，成功单独处理
function handleStatusCode(response) {
  if (response.status >= 400 && response.status <= 500) {
    alert('出错了')
    return Promise.reject(response)
  }
  return response
}

const post = (uri, params) => {
  return instance.post(uri, params).then((res) => {
    switch (res.error_code) {
      case  1000:
        if(res.data){
          return res.data

        }else{
          return res
        }

      default:
    }
    throw  res
  }).catch((res) => {
    throw  res
  })
}

const get = (uri, params) => {
  return instance.get(uri, {params}).then((res) => {
    if(res.error_code == 2015 || res.jump_login){
      localStorage.removeItem('userinfo')
      // TODO
      // router.replace('/login')
    }else if(res.error_code == 1000){
      return res
    }else{
      throw  res
    }
  }).catch((res) => {
    if(res.error_desc && res.error_desc != "" && res.isShow){
      Toast(res.error_desc)
    }

    throw  res

  })

}



const api = {

  /*
  * 账户
  */
  // 發送驗證碼
  sendCode(params){
    return get('/sms',params)
  },
  // 註冊第一步
  registFirst(params) {
    return get('/register/first', params)
  },
  registSecond(params) {
    return get('/register/second', params)
  },
  registThird(params){
    return get('/register/third', params)
  },

  // 忘記密碼
  forgetFirst(params){
    return get('/reset/first',params)
  },
  forgetSecond(params){
    return get('/reset/second',params)
  },
  forgetThird(params){
    return get('/reset/third',params)
  },
  // 登陆
  userLogin(params) {
    return  get('/user/login', params)
  },
  userRegist(params) {
    return get('/user/register',params)
  },

  // 實名認證
  userauthFirst(params) {
    return get('/userauth/first',params)
  },

  // 创建钱包地址
  wallet(params) {
    return  get('/user/wallet', params)
  },
  // 备份钱包:
  wallet(params) {
    return  get('/user/backup', params)
  },
  // 助记词提交:
  wallet(params) {
    return  get('/user/keywords', params)
  },
  // 我的地址:
  myaddress(params) {
    return  get('/user/myaddress',params)
  },
  // 发送红包:
  redbag(params) {
    return  get('/user/redbag', params)
  },
  // 用户转账:
  out(params) {
    return  get('/user/out', params)
  },
  // 账户余额::
  balance(params) {
    return  get('/user/balance', params)
  },

  // 市场行情
  market(params) {
    return  get('/market', params)
  },

  /*
  * 资产
  */

  // 资产列表
  assetsList(params) {
    return  get('/assets/list', params)
  },
  //添加资产,页面（全部币种显示）
  getAddAssets(params) {
    return  get('/assets/addlist', params)
  },
  //添加资产,功能
  addAssets(params) {
    return  get('/assets/add_assets', params)
  },
  //删除资产,功能
  delAssets(params) {
    return  get('/assets/del_assets', params)
  },
  //资产行情,(应该是获取汇率)
  assetsQuotation(params) {
    return  get('/assets/quotation_assets', params)
  },
  //当个币种详情,(页面上写的总资产)
  assetsInfo(params) {
    return  get('/assets/assets_info', params)
  },
  //划转数据获取,(页面上写的总资产
  assetsTransferInfo(params) {
    return  get('/assets/transfer_info', params)
  },
  //划转提交
  addTransfer(params) {
    return  get('/assets/add_transfer', params)
  },

  // OTC 交易

  //资产详情中，有个交易记录
  pay_assets_info(params) {
    return  get('/pay/pay_assets_info', params)
  },
  //交易，我要买，（我要买，后面跟着买入按钮）
  pay_buy_list(params) {
    return  get('/pay/pay_buy_list', params)
  },
  //交易，我要卖，（我要卖，后面跟着卖出按钮）
  pay_sell_list(params) {
    return  get('/pay/pay_sell_list', params)
  },
  //发布交易单页面显示数据
  publish_pay_info(params) {
    return  get('/pay/publish_pay_info', params)
  },
  //取消订单
  pay_cancel(params) {
    return  get('/pay/cancel', params)
  },
  //点击我已付款
  pay_paid(params) {
    return  get('/pay/have_paid', params)
  },
  // 放币
  pay_money(params) {
    return  get('/pay/put_money', params)
  },
  //挂单记录
  pay_order_record(params) {
    return  get('/pay/pay_order_record', params)
  },
  //交易，挂单,买入
  pay_order_buy(params) {
    return  get('/pay/pay_order_buy', params)
  },
  //交易，挂单,卖出
  pay_order_sell(params) {
    return  get('/pay/pay_order_sell', params)
  },
  //交易，成交,卖出
  pay_transaction_sell(params) {
    return  get('/pay/pay_transaction_sell', params)
  },
  //交易，成交,买入
  pay_transaction_buy(params) {
    return  get('/pay/pay_transaction_buy', params)
  },
  //挂单成功后，点击订单，显示详情
  pay_order_info(params) {
    return  get('/pay/pay_order_info', params)
  },
  //我的订单
  order_list(params) {
    return  get('/pay/order_list', params)
  },
  exchange(params) {
    return  get('/pay/exchange', params)
  },
  // 身份认证
  idStep1(params){
    return get('/auth/one',params)
  },
  idStep12(params){
    return get('/auth/two',params)
  },

  // 兑换
  // 币种信息以及比例
  exchange_info(){
    return get('/exchange/exchange_info',{currency_id:1})
  },
  exchangeConfirm(params){
    return get('/exchange/exchange',params)
  },
  exchange_list(){
    return get('/exchangelist')
  }


}
export {api}

