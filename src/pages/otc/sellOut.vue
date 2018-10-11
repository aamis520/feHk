<template>
  <div style="height:100%;">
    <assets-header :title="title" :backUrl="backUrl"></assets-header>
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
      <div class="outer">
        <div class="container">
          <span>
            <p class="orderAmount">交易金额</p>
            <p class="orderAmountNum">{{orderInfo.total | availableFilter}} HKD</p>
            <p class="orderPrice">價格：{{orderInfo.price}} HKD</p>
            <p class="orderNum">数量：{{orderInfo.amount}}</p>
          </span>
          <span>
            <p></p>
            <p class="orderId">訂單號：{{orderInfo.id}}</p>
            <p class="savePay orderStatus">{{orderInfo.orderStatus | statusFilter}}</p>
            <!-- <p style="font-size: 10px; /*no*/color: #4ca1f9;opacity: 0.5;">(14分钟59秒)</p> -->
          </span>
        </div>
        <!-- 支付信息 -->
        <!-- <div class="payInfo">
          <p class="title">支付信息</p>
          <div style="margin:10px 0 0 25px;">
            <img style="width:22px;height:22px;" src="~@/assets/images/银行卡.png" alt="pay">
            <span class="bankName">{{pay_info.accountNo}}</span>
          </div>
          <div class="bankUserInfo">
            <p class="bankUserInfoTop">
              <span style="margin-left:20px;">{{pay_info.name}}</span>
              <span style="margin-left:50px;">{{pay_info.bankName}}</span>
            </p>
            <p class="bankUserInfoSchool">
              <span style="margin-left:20px;">{{pay_info.branchName}}</span>
            </p>
          </div>
        </div> -->

      </div>
    </div>
      <div class="footer">
        <!-- <span class="footerContent">
          <img style="margin-top:8px;" src="~@/assets/images/银行卡.png" alt="">
          <br>
          <span class="contactOther">联系对方</span>
        </span> -->
        <!-- <span class="footerContent" style="margin-top:12px;">
          <mt-button @click="cancelPay" style="color:white;opacity:.5;background:#3E3E4E;height:32px;width:100px;font-size:14px;">取消交易</mt-button>
          <mt-button size="small">取消交易</mt-button>
        </span> -->
        <span class="footerContent" style="padding:15px 0;">
          <mt-button @click="alreadyPay" :diabled="orderInfo.userStatus == 0"  class="saveBtn" style="height:32px;width:90%;" type="primary">放幣</mt-button>
          <!-- <mt-button size="small">我已付款</mt-button> -->
        </span>
      </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import { custormConfirm,getTransactionById, merchantConfirm, getOrderDetailById  } from '@/api/apiJava'
import { MessageBox, Popup } from "mint-ui";
import { timestampToTime } from '@/static/calute'
export default {
  components: {
    assetsHeader
  },
  filters: {
    statusFilter(val){
       if(val == '0'){
         return '進行中'
       }else if(val == '1'){
         return '已成交'
       }else if(val == '2'){
         return '已撤銷'
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
      title: '賣出HKDT',
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
      query:{},
      backUrl: '/home/otc'
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
    // 调用放幣接口
    outBeanPort() {
      var data = {}
      data.userId = this.$store.getters.getUserId
      data.orderId = this.orderInfo.id
      // this.$router.push('/saveSell')
      if(this.query.type == 1){
        merchantConfirm(data).then(res => {
          if(res.statusCode == 200){
            this.$router.push('/home/account')
          }
        })
      }else if(this.query.type == 2){
        custormConfirm(data).then(res => {
          if(res.statusCode == 200){
            this.$router.push('/home/account')
          }
        })
      }
    },
    // 取消付款事件
    cancelPay(){
      this.$router.push('/cancelBuy')
    },
    // 点击放幣事件
    alreadyPay(){
      // if(this.query.type == '1'){
      //   if(this.orderInfo.userStatus == '0'){
      //     this.$toast({
      //       message: '買家暫未付款',
      //       duration: 1000
      //     })
      //     return
      //   }
      // }else if(this.query.type == '2'){
      //   if(this.orderInfo.merchantStatus == '0'){
      //     this.$toast({
      //       message: '買家暫未付款',
      //       duration: 1000
      //     })
      //     return
      //   }
      // }
      let data = {}
      data.userId = this.$store.getters.getUserId
      data.orderId = this.orderInfo.id

      if(this.query.type == 1){
        merchantConfirm(data).then(res => {
          if(res.statusCode == 200){
            this.$toast({
            message: '放幣成功',
            duration: 1000
          })
            this.$router.push('/home/account')
          }
        }).catch(err => {
          this.$toast({
            message: err.msg,
            duration: 1000
          })
        })
      }else if(this.query.type == 2){
        custormConfirm(data).then(res => {
          if(res.statusCode == 200){
            this.$toast({
              message: '放幣成功',
              duration: 1000
            })
            this.$router.push('/home/account')
          }
        }).catch(err => {
          this.$toast({
            message: err.msg,
            duration: 1000
          })
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
    getOrderDetailById(query.orderId).then(res => {
      if(res.statusCode == 200){
        // TODO 現在只有一個訂單
        this.orderInfo = res.data
        this.pay_info = res.data.paymentInfos[0]
      }
    })
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/otc/sellOut'

</style>


