<!--  -->
<template>
  <div style="height:100%;">
    <assets-header :title="title"></assets-header>
    <div class="containBody">
      <div  v-for="(item,index) in content" :key="index" @click="goToDetail(item)" class="container">
        <div class="contentOne">
          <span class="titleSpan">{{item.type | typeFilter}}</span>
          <span class="textBottom">&nbsp;</span>
          <!-- type 0 買 1 賣 -->
          <!-- 订单状态    0：未成交    1：已成交    2：已取消"  -->
          <span class="textBottom">價格：{{item.price}} HKD</span>
        </div>
        <div class="content">
          <span class="textBottom">&nbsp;</span>
          <span class="textBottom">&nbsp;</span>
          <span class="textBottom">数量:{{item.amount}}</span>
        </div>
        <div class="content">
          <span v-if="item.status == '0'" class="icon"></span>
          <span style="margin-right:10px;" :class="item.status !== '0' ? 'titleSpan' : 'colorBule'">{{item.status | statusFilter}}</span>
          <div class="btnBox">
              <mt-button v-if="item.status == '0'" size="small" @click.stop="cancel(item)" style="heigth:25px;color:white;" type="default">
              取消
            </mt-button>
          </div>
          <span class="textBottom">{{item.createTime | timeFilter}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHeader from '../assets/header'
import { api } from '@/api/index'
import { timestampToTime } from '@/static/calute'
import { getMerchantTransactionsInfo, cancelTransaction } from '@/api/apiJava'

export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      backData: {},
      title: '我的發佈',
      showColor: true,
      content:[]
    };
  },
  computed: {},
  filters: {
    typeFilter(val){
      if(val == 1){
        return '賣出HKDT'
      }else {
        return '買入HKDT'
      }
    },
    timeFilter(val){
      return timestampToTime(val)
    },
    statusFilter(val){
      if(val == '0'){
        return '未成交'
      }else if(val == '1'){
        return '已成交'
      }else{
        return '已取消'
      }
    }
  },
  methods: {
    goToDetail(item){
      console.log(item)
      if(!item.validOrderId){
        this.$toast({
          message: '暫無交易信息',
          duration: 1000
        })
        return
      }
      // 1.未付款，2.已付款，3.申述中，4.已取消，5.已完成
      // 現在只有三個狀態  進行中 已完成 已取消 0 1 2 type 0 買 1 賣
      // 這裡 我是商家
      if (item.status == '0') {
        if(item.type == '0'){
          this.$router.push({
            path: "/buyIn",
            query: {
              id: item.id,
              orderId: item.validOrderId,
              type: 1
            }
          })

        }else{
          this.$router.push({
            path: "/sellOut",
            query: {
              id: item.id,
              orderId: item.validOrderId,
              type: 1
            }
          });
        }
      } else if (item.status == '1') {
          this.$router.push({
            path: "/saveSell",
            query: {
              id: item.id,
              type: 1
            }
          });
      } else if (item.status == '2') {
        this.$router.push({
          path: "/cancelBuy",
          query: {
              id: item.id,
              type: 1
            }
        });
      }
    },
    // 点击取消事件
    cancel(item){

      cancelTransaction(item.id)
      .then(res => {
        this.getRemarkPort()
        console.log(res)
      })
      // item.status = '已取消'
    },
    getRemarkPort() {
      // var userInfo =  localStorage.getItem('userInfo')
      // var id = JSON.parse(userInfo).user_id
      getMerchantTransactionsInfo(this.$store.getters.getUserId).then(res => {
        if(res.statusCode == 200){
          this.content = res.data
        }
      })
      var obj = {}
      obj.id = '1'
      // api.pay_order_record(obj).then(res => {
      //   // this.content = res.list
      //   // this.getBackBuyData = res.buy_info
      //   // console.log(res)
      // })
      // api.publish_pay_info(obj).then(res => {
      //   this.backData = res
      //   // this.getBackBuyData = res.buy_info
      //   // console.log(res)
      // })
    },
  },
  mounted(){
    this.getRemarkPort()
  }
}

</script>
<style lang='scss' scoped>
.containBody{
  height:calc(100% - 70px);
  overflow-y: scroll;
}
.container{
  margin-top: 15px;
  width: 100%;
  text-align: center;
  // height:60px;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  .content{
    flex: 1;
    .icon{
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4CA1F9;
    }
    .btnBox{
      text-align: center;
      margin: 10px auto;
    }
    .mint-button--small{
      text-align: right;
      background: #57576B;
      height: 25px !important;
    }
    line-height: 25px;
    padding: 10px;
    flex: 1;
    .titleSpan{
      font-family: PingFangSC-Regular;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .colorBule{
      font-family: PingFangSC-Regular;
      font-size: 10px; /*no*/
      color: #4CA1F9;
      letter-spacing: 0;
    }
    .textBottom{
      display: block;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 10px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .contentOne{
    text-align: left;
    line-height: 25px;
    padding: 10px;
    flex: 1.1;
    .titleSpan{
      display: block;
      font-family: PingFangSC-Regular;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .textBottom{
      opacity: 0.5;
      display: block;
      font-family: PingFangSC-Regular;
      font-size: 10px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
}
</style>
