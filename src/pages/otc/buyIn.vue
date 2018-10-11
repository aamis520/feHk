<template>
  <div style="height:100%;">
    <assets-header :title="title" :backUrl="backUrl"></assets-header>
    <!-- 點擊我已付款 -->
    <div class="header">
      <div style="height:100px;display:flex;margin-top:20px;">
        <span class="headContent">
          <div class="headPic">
            <img src="~@/assets/images/avatar.png" alt="">
          </div>
          <div class="headUser" v-if="query.type == '2'">
            <div class="headName">{{orderInfo.merchantName}}</div>
            <div class="headDate">{{orderInfo.merchantPhone}}</div>
          </div>
          <div class="headUser" v-if="query.type == '1'">
            <div class="headName">{{orderInfo.userName}}</div>
            <div class="headDate">{{orderInfo.userPhone}}</div>
          </div>
        </span>
        <span class="headContent">
          <div class="headName"></div>
          <div class="headDate"></div>
        </span>
      </div>
      <div class="container">
        <span>
          <p class="orderAmount">交易金额</p>
          <p class="orderAmountNum">{{orderInfo.total | availableFilter}} HKD</p>
          <p class="orderPrice">價格：{{orderInfo.price}} HKD</p>
          <p class="orderNum">数量：{{orderInfo.amount}}</p>
        </span>
        <span>
          <p></p>
          <p class="orderId" >訂單號：{{orderInfo.id}}</p>
          <p class="savePay orderStatus">{{orderInfo.orderStatus | statusFilter}}</p>
          <p style="font-size: 10px; /*no*/color: #4ca1f9;opacity: 0.5;">
            <countdown v-if="Number(orderInfo.remainingTime) > 0 && orderInfo.userStatus == 0 && orderInfo.merchantStatus == 0"
							:time="Number(orderInfo.remainingTime)"
							:leadingZero="false"
							@countdownend="countDownEnd">
              <template slot-scope="props" ><span v-if="props.minutes || props.seconds">付款截止：{{ props.minutes }}分鐘 {{props.seconds}}秒</span>
                <span  v-else>付款時間已過期</span>
              </template>
					</countdown>
          </p>
        </span>
      </div>
      <!-- 支付信息 -->
     <!-- <div style="color:#fff;"> {{orderInfo}}</div> -->
      <div class="payInfo">
        <p class="title">支付信息</p>
        <div style="margin:10px 0 0 25px;">
          <img style="width:22px;height:22px;" src="~@/assets/images/银行卡.png" alt="pay">
          <span class="bankName">{{pay_info.accountNo}}</span>
        </div>
        <!-- 银行用户信息 -->
        <div class="bankUserInfo">
          <p class="bankUserInfoTop">
            <span style="margin-left:20px;">{{pay_info.name}}</span>
            <span style="margin-left:50px;">{{pay_info.bankName}}</span>
          </p>
          <p class="bankUserInfoSchool">
            <span style="margin-left:20px;">{{pay_info.branchName}}</span>
          </p>
        </div>
      </div>
      <div class="footer">
        <span class="footerContent" style="margin-top:12px;" v-show="orderInfo.userStatus == 0">
          <mt-button @click="alreadyPay" v-if="orderInfo.orderStatus != '2'" :disabled="payTimeOut" class="saveBtn" style="height:32px;" type="primary">我已付款</mt-button>
          <!-- <mt-button v-else size="small" :disabled="true" class="saveBtn" style="height:32px;" type="primary">訂單已撤銷</mt-button> -->
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import { timestampToTime } from '@/static/calute'
import countdown from '@xkeshi/vue-countdown'
import { custormConfirm,getTransactionById, merchantConfirm, getOrderDetailById  } from '@/api/apiJava'
export default {
  components: {
    assetsHeader,
    countdown
  },
  filters: {
    statusFilter(val){
       if(val == '0'){
         return '進行中'

       }else if(val == '1'){

         return '已成交'
       }else if(val == '2'){
         return '訂單取消'
       }
    },
    timeFilter(val){
      return timestampToTime(val)
    },
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,2)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    }
  },
  data () {
    return {
      pay_info: '',
      user_info: '',
      order_info: '',
      title: '買入HKDT',
      orderInfo: {
        account: 0,
        merchantName: '',
        merchantPhone: '',
        merchantRegionNo: '',
        merchantStatus: '',
        orderStatus: '',
        paymentInfos: [],
        price: '',
        remainingTime: '',
        userName: '',
        userPhone: '',
        userStatus: '',
        total: ''
      },
      query: {},
      backUrl: '/home/otc',
      payTimeOut: false
    }
  },
  watch: {
  },
  methods: {
    // 调用接口
    getPort() {
      var obj = {}
      obj.order_id = this.$route.query.order_id
      obj.id = this.$route.query.id
      api.pay_order_info(obj).then(res => {
        this.pay_info = res.pay_info
        this.order_info = res.order_info
        this.user_info = res.user_info
      })
    },
    // 取消付款事件
    cancelPay(){
      this.getCancelPort()
      this.$router.push('/cancelBuy')
    },
    // 调用取消接口
    getCancelPort(){
      var obj = {}
      obj.id = this.$route.query.id
      obj.order_id = this.$route.query.order_id
      api.pay_cancel(obj)
        .then(res => {
          Toast({
            message: '取消成功',
            duration: 1000
          })
          console.log(res)
        })
    },
    // 15 分鐘倒計時
    countDownEnd(){
      this.orderInfo.orderStatus = 2
      this.payTimeOut = true
    },
    // 点击我已付款事件
    alreadyPay(){
      let data = {}
      // TODO 判斷是商家還是用戶
      data.userId = this.$store.getters.getUserId
      data.orderId = this.orderInfo.id
      if(this.query.type == 1){
        merchantConfirm(data).then(res => {
          this.orderInfo.remainingTime = -1
          if(res.statusCode == 200){
            this.$toast({
              message: '付款成功',
              durtion: 1000
            })
            this.$router.push('/home/account')
          }
        })
      }else if(this.query.type == 2){
        this.orderInfo.remainingTime = -1
        custormConfirm(data).then(res => {
          if(res.statusCode == 200){
            this.$toast({
              message: '付款成功',
              durtion: 1000
            })
            this.$router.push('/home/account')
          }
        })
      }
    }
  },
  created () {
    let query = this.$router.currentRoute.query
    this.query = query
    if(query.from && query.from == 'account'){
      this.backUrl = '/account/order'
    }
    //  type (query的type 1 商家 2 用戶  3 又是商家又是用戶)
    getOrderDetailById(query.orderId).then(res => {
      if(res.statusCode == 200){
        // TODO 現在只有一個訂單
        this.orderInfo = res.data
        this.pay_info = res.data.paymentInfos[0]
      }
    })

  },
  mounted(){
    // this.getPort()

  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/otc/buyIn';
</style>


