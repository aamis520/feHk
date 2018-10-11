<template>
  <div>
    <assets-header :title="title" :backUrl="backUrl"></assets-header>
    <div class="header">
      <div style="height:100%;display:flex;margin-top:20px;">
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
          <p class="savePay orderStatus">訂單取消</p>
        </span>
      </div>
      <div class="footer">
        <!-- <otc-footer></otc-footer> -->
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import otcFooter from './otcfooter'
import { timestampToTime } from '@/static/calute'
import { custormConfirm,getTransactionById, merchantConfirm,getOrderDetailById  } from '@/api/apiJava'
export default {
  components: {
    assetsHeader,
    otcFooter
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
      backUrl: '/home/otc',
      query: {}
    }
  },
  created () {
    let query = this.$router.currentRoute.query
    this.query = query
    //  type (query的type 1 商家 2 用戶  3 又是商家又是用戶)
    if(query.from && query.from == 'account'){
      this.backUrl = '/account/order'
    }
    getOrderDetailById(query.orderId).then(res => {
      if(res.statusCode == 200){
        // TODO 現在只有一個訂單
        this.orderInfo = res.data
        // if(this.orderInfo.userStatus == 1){
        //   this.$toast('您已付款')
        //   // this.$router.push('/home/account')
        //   return
        // }
      }
    })
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid #393948;
    height:100px;
    width: 100%;
    .headContent{
      height:100%;
      text-align: center;
      flex: 1;
      .headPic{
        background: #D8D8D8;
        margin:5px 0  0 25px;
        float: left;
        height: 44px;
        width: 44px;
        border-radius: 50%;
        overflow: hidden;
        img{
          display: block;
          width: 100%;
        }
        // border: 1px solid red;

      }
      .headName{
        margin-bottom: 20px;
        line-height: 20px;
        position: relative;
        left: -25px;
        height:18px;
        font-family: PingFangSC-Regular;
        font-size: 14px; /*no*/
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
      .headDate{
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 10px; /*no*/
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
      .headUser{
        float: left;
        padding-left: 20px;
        text-align: left;
        .headName{
          left: 0;
          text-align: left;
        }
      }
    }
  }
  .container{
    display: flex;
    p{
      height: 20px;
      margin:10px 0 10px 30px;
      font-family: PingFangSC-Regular;
      letter-spacing: 0.29px;
    }
    span{
      flex: 1;
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
  }
/*
* 订单详情 展示信息
*/
.container{
  color: #fff;
}
.orderAmount {
  font-size: 14px; /*no*/
  opacity: 0.5;
}
.orderAmountNum {
  font-size: 18px; /*no*/
}
.orderId, .orderNum, .orderPrice {
  font-size: 10px; /*no*/
  opacity: 0.5;
}
.orderStatus {
  color: #4ca1f9;
  font-size: 18px; /*no*/
  line-height: 24px;
}
</style>


