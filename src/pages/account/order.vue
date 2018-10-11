<template>
  <div>
    <assets-header :title="title" :backUrl="'/home/account'"></assets-header>
    <div class="xc-tab flexCen">
      <div class="xc-tab-item" :class="active == 'all' ? 'active' : ''" @click="active = 'all'">
        <span>全部</span>
      </div>
      <div class="xc-tab-item" :class="active == '0' ? 'active' : ''" @click="active = '0'">
        <span>進行中</span>
      </div>
      <div class="xc-tab-item" :class="active == '1' ? 'active' : ''" @click="active = '1'">
        <span>已完成</span>
      </div>

      <div class="xc-tab-item" :class="active == '2' ? 'active' : ''" @click="active = '2'">
        <span>已取消</span>
      </div>
      <!-- <div class="xc-tab-item" :class="active == '3' ? 'active' : ''" @click="active = '3'">
        <span>申诉中</span>
      </div> -->


      <!-- <div class="xc-tab-item" :class="active == '5' ? 'active' : ''" @click="active = '5'">
        <span>已完成</span>
      </div> -->

    </div>
    <div class="listBox" :class="list.length == 0 ? '' : 'listBoxHeight'">
      <div class="flexCen send" v-for="(item,index) in list" :key="index" @click="gotoDetail(item)">
        <div>
          <p class="main" v-if="item.userId == $store.getters.getUserId">
            <span class="buy" v-if="item.type == '0'">{{item.type | typeFilter(item)}}</span>
            <span class="sell" v-else>{{item.type  | typeFilter}}</span>
          </p>
           <p class="main" v-if="item.merchantId == $store.getters.getUserId">
            <span class="sell" v-if="item.type == '0'">{{item.type | typeFilter1(item)}}</span>
            <span class="buy" v-else>{{item.type  | typeFilter1}}</span>
          </p>
          <p class="desc"  v-if="item.userId == $store.getters.getUserId">{{item.merchantName}}</p>
          <p class="desc"  v-else>{{item.userName}}</p>
        </div>
        <div>
          <p class="main"></p>
          <p class="desc">金額:{{item.total | availableFilter}}</p>
        </div>
        <div>
          <p class="main">
            <i class="apply" v-if="item.orderStatus == '0'"></i>
            <i class="success" v-if="item.orderStatus == '1'"></i>
            {{item.orderStatus | statusFilter}}</p>
          <p class="desc">{{item.createTime | timeFilter}}</p>
        </div>
      </div>
    </div>
    <div class="pageagion"></div>
    <div class="nodata" v-if="list.length == 0">暫無數據</div>
  </div>
</template>
<script>
import assetsHeader from "../assets/header";
import { timestampToTime } from '@/static/calute'
import { getOrderList } from "@/api/apiJava";
export default {
  components: {
    assetsHeader
  },
  data() {
    return {
      title: "我的訂單",
      active: "all",
      list: [],
      pageSize: 100,
      pageNo: 1
    };
  },
  watch: {
    active(val) {
      this.getList(val);
    }
  },
  filters: {
     typeFilter(val){
       if(val == '0'){
         return '買入'
       }else{
         return '賣出'
       }
     },
     typeFilter1(val){
       if(val == '1'){
         return '買入'
       }else{
         return '賣出'
       }
     },
     timeFilter(val){
      return timestampToTime(val)
     },
     statusFilter(val){
       if(val == '0'){
         return '進行中'
       }else if(val == '1'){
         return '已成交'
       }else if(val == '2'){
         return '已取消'
       }
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
  created() {
    this.getList("all");
  },
  methods: {
    getList(type) {
      this.list = []
      getOrderList({
        status: type,
        userId: this.$store.getters.getUserId,
        pageSize:this.pageSize,
        pageNo:this.pageNo
      }).then(res => {
        console.log(res)
        if(res.statusCode == 200){
          this.list = res.data.rows
        }
      })
    },
    gotoDetail(item) {
      // userid == merchantId  這個單是我發的
          // 買單 --> 付款
          // 賣單 --> 放畢
          // userId == userId 這個是別人的單
          // userID == merId == userId   判斷付款狀態 未付款--> 付款  已付款 --> 放畢  (userStatus 用戶是否付款  merchantStatus)
          // 付款  userID == merchantId  type = 0 || userId == UserId type == 1
          // 放畢  userID == merchantId  type = 1 || userId == UserId type == 0
          let userId = this.$store.getters.getUserId
      if (item.orderStatus == '0') {
        if(item.userId == item.merchantId){
          if(item.userStatus == '0'){
            this.$router.push({
              path: "/buyIn",
              query: {
                id: item.transactionId,
                orderId: item.id,
                from: 'account',
                type: 3
              }
            })
          }else{
            if(item.merchantStatus == '0'){
              this.$router.push({
              path: "/sellOut",
              query: {
                id: item.transactionId,
                orderId: item.id,
                from: 'account',
                type: 3
              }
            })
            }
          }
          this.$toast({
            message: '自賣自賣',
            duration: 1000
          })
        }else{

          if((userId == item.merchantId && item.type == '1') || (userId == item.userId && item.type == '0')){
             this.$router.push({
              path: "/buyIn",
              query: {
                id: item.transactionId,
                orderId: item.id,
                from: 'account',
                type: userId == item.merchantId ? 1 : 2
              }
            })
          }else if((userId == item.merchantId && item.type == '0') || (userId == item.userId && item.type == '1')){
             this.$router.push({
              path: "/sellOut",
              query: {
                id: item.transactionId,
                orderId: item.id,
                from: 'account',
                type: userId == item.merchantId ? 1 : 2
              }
            });
          }
        }
      } else if (item.orderStatus == '1') {
          this.$router.push({
            path: "/saveSell",
            query: {
                id: item.transactionId,
                orderId: item.id,
                from: 'account',
                type: userId == item.merchantId ? 1 : 2
              }
          });
      } else if (item.orderStatus == '2') {
        this.$router.push({
          path: "/cancelBuy",
          query: {
                id: item.transactionId,
                orderId: item.id,
                from: 'account',
                type: userId == item.merchantId ? 1 : 2
              }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nodata {
  margin: 10px;
  font-size: 14px; /*no*/
  color: #ffffff;
  opacity: 0.5;
  text-align: center;
}
.xc-tab {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  div {
    flex: 1;
    text-align: center;
  }
  div.active {
    span {
      color: #4ca1f9;
      padding-bottom: 10px;
      border-bottom: 2px solid #4ca1f9;
    }
  }
}
.send {
  padding: 0 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  div {
    flex: 1;
    color: #ffffff;
    .main {
      font-size: 14px; /*no*/
      line-height: 17px;
      margin-bottom: 14px;
      position: relative;
      .buy {
        color: #4dc379;
      }
      .sell {
        color: #e05c5c;
      }
      i {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
      }
      .success {
        background: #4ca1f9;
      }
      .apply {
        background: #ffc68c;
      }
    }
    .desc {
      font-size: 10px; /*no*/
      opacity: 0.5;
      line-height: 14px;
      margin-bottom: 20px;
    }
  }
  div:nth-child(1) {
    text-align: left;
  }
  div:nth-child(2) {
    text-align: center;
  }
  div:nth-child(3) {
    text-align: right;
  }
}
.listBox {
  margin-top: 10px;
}
.listBoxHeight {
  max-height: 500px;
  overflow: scroll;
}
</style>


