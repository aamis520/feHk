<template>
  <div style="height:100%;" class="OTCDIV">
    <!-- 头部 -->
    <div class="header">
      <p class="title">
        <span>{{title}}</span>
        <!-- <span @click="openSheet">{{title}}</span> -->
        <!-- <span class="sanjiao">
          <i :class="upOrDown ? 'up' : 'down'"></i>
        </span> -->
      </p>
      <!-- <div @click="publishTrading" id="brokenLine">
        <img src="~@/assets/images/折线.png" alt="图标">
      </div> -->
      <div @click="publishTrading" id="add">
        <img src="~@/assets/images/添加资产.png" alt="图标">
      </div>
    </div>
    <!-- container -->
    <div class="list">
      <!-- 下边是导航菜单 -->

      <div class="xc-tab flexCen">
        <div class="xc-tab-item" :class="selected == '1' ? 'active' : ''" @click="selected = '1'">
          <span>我要買</span>
        </div>
        <div class="xc-tab-item" :class="selected == '2' ? 'active' : ''" @click="selected = '2'">
          <span>我要賣</span>
        </div>
      </div>

      <!-- <div class="containerBody"> -->
        <div class="listBox" v-if="selected == 1" :class="getBackBuyData.length == 0 ? '' : 'listBoxHeight'">>
          <table>
            <tbody>
              <tr v-for="(item, index) in getBackBuyData" :key="index">
                <td>
                  <p class="title">{{item.merchantName}}</p>
                  <!-- <img style="width:22px;height:22px;" src="~@/assets/images/支付宝.png" alt="pay"> -->
                  <img style="width:22px;height:22px;" src="~@/assets/images/银行卡.png" alt="zichan">
                </td>
                <td>
                  <p class="title">價格：{{item.price}}</p>
                  <!-- <p class="limit">限额：{{item.limit_price}}</p> -->
                  <p class="limit">数量：{{item.amount}}</p>
                </td>

                <td>
                  <mt-button @click="buyBtn(item)" style="color:white;background:#4DC379;height:25px;width:60px;font-size:10px;">買入</mt-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="listBox" v-if="selected == 2" :class="getBackSellData.length == 0 ? '' : 'listBoxHeight'">>>
          <table>
            <tbody>
              <tr v-for="(item, index) in getBackSellData" :key="index">
                <td>
                  <p class="title">{{item.merchantName}}</p>
                  <!-- <img style="width:22px;height:22px;" src="~@/assets/images/支付宝.png" alt="pay"> -->
                  <img style="width:22px;height:22px;" src="~@/assets/images/银行卡.png" alt="zichan">
                </td>
                <td>
                  <p class="title">價格：{{item.price}}</p>
                  <!-- <p class="limit">限额：{{item.limit_price}}</p> -->
                  <p class="limit">数量：{{item.amount}}</p>
                </td>
                <td>
                  <mt-button @click="buyBtn(item)" style="color:white;background:#E05C5C;height:25px;width:60px;font-size:10px;">賣出</mt-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      <!-- </div> -->
    </div>
    <mt-popup
      v-model="popupVisible"
      class="codePop"
      position="bottom">
      <div class="codePopContent">
        <p class="title">{{dialogShow.buyorSell}}</p>
        <p class="limit">{{dialogShow.price}}</p>
        <!-- <p class="tip">限额：{{dialogShow.limit_price}}</p> -->
        <!-- <p class="tip">限额：{{dialogShow.price * dialogShow.number}}</p> -->
        <div style="position:relative;">
          <input class="inputMax" :disabled="true" :placeholder="placeHoderOne" v-model="buyOrSellAll">
          <span class="allBuyone">
            <span style="color: #1E1E39;">HKD</span>
            <!-- <span style="color:#CBCBCB;">|</span>
            <span @click="allBuyBtn">
              {{dialogShow.status}}
            </span> -->
            </span>
        </div>
        <div style="position:relative;">
          <input class="inputMax" :disabled="true" :placeholder="placeHoderTwo" v-model="dialogShow.amount">
          <span class="allBuyTwo">
            <span style="color: #1E1E39;">HKDT</span>
            <!-- <span style="color:#CBCBCB;">|</span>
            <span @click="allBuyBtnTwo">
              {{dialogShow.status}}
            </span> -->
          </span>
        </div>
        <!-- <mt-button type="info">(15s)后自动消失</mt-button>
        <mt-button type="primary">確認</mt-button> -->
        <div style="display:flex;margin-top:50px;">
          <span style="flex:1;text-align:center;">
            <mt-button class="appearCancel" @click="iconCancel">取消</mt-button>
          </span>
          <span style="flex:1;text-align:center;">
            <mt-button @click="saveBuyIn" class="saveBtn" type="primary">
              確認
            </mt-button>
          </span>
        </div>
        <!-- <p class="codeImg"></p> -->
        <!-- <p class="appearCancel">
          <mt-button type="info">(15s)后自动消失</mt-button>
          <mt-button type="primary">確認</mt-button>
        </p> -->
        <div class="closePop" @click="iconCancel">
          <img src="~@/assets/images/x.png" alt="">
        </div>
      </div>
    </mt-popup>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
import { api } from "@/api/index";
import { getTransactionsInfo, getTransactionById, AddOrder } from "@/api/apiJava";
import { MessageBox, Popup, Toast } from "mint-ui";
export default {
  data() {
    return {
      clock: '',
      beanId: '1',
      sheetVisible: false,
      title: 'HKDT',
      upOrDown: false,
      count: 15, // 倒计时秒数
      saveItem: "",
      dialogShow: {
        buyorSell: "買入HKDT",
        status: "全部買入",
        price: "",
        number: "",
        min_limit_price: "",
        max_limit_price: ""
      },
      getBackBuyData: [],
      getBackSellData: [],
      selected: "1",
      popupVisible: false,
      // title: "gate.io",
      upOrDown: false,
      placeHoderOne: '',
      placeHoderTwo: '',
      actions: [
        {
          name: 'HKD',
          method: this.gateIo
        }
      ]
    }
  },
  computed: {
    buyOrSellAll(){
      if(this.dialogShow.amount && this.dialogShow.price){
        let val = 0
        val = this.dialogShow.amount * this.dialogShow.price
        let arr = String(val).split('.')
        let str = ''
        if(arr.length > 1){
          str  = arr[1].slice(0,2)
        }
        console.log(str)
        return arr[0] + '.' + str
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.iconCancel()

        this.selected = '1';
        if (this.selected == "1") {
          this.getBuyPort();
        } else if (this.selected == "2") {
          this.getSellPort();
        }
      },
      // 深度观察监听
      deep: true
    },
    beanId(value){
     console.log(value)
     this.getBuyPort()
    },
    sheetVisible(value){
      if(value == false){
        this.upOrDown = false
      }
    },
    selected(value) {
      this.$store.commit("setSelected", this.selected)
      if (value == "1") {
        this.getBuyPort()
        this.dialogShow.buyorSell = "買入HKDT"
        this.dialogShow.status = "全部買入"
      } else if (value == "2") {
        this.getSellPort()
        this.dialogShow.buyorSell = "賣出HKDT"
        this.dialogShow.status = "全部賣出"
      }
    }
  },
  mounted() {
    // this.selected = this.$store.state.selected;
    this.selected = '1';
    if (this.selected == "1") {
      this.getBuyPort();
    } else if (this.selected == "2") {
      this.getSellPort();
    }
    // getTransactionById(1).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // 点击图标取消弹窗
    iconCancel(){
      window.clearInterval(this.clock)
      this.popupVisible = false;
    },
    openSheet(){
      this.upOrDown = true
      this.sheetVisible = true
    },

    allBuyBtnTwo() {
      var str = this.dialogShow.limit_price
      var arr = str.split("--")
      this.dialogShow.max_limit_price = arr[1]
      this.dialogShow.min_limit_price = this.dialogShow.max_limit_price
    },
    allBuyBtn() {
      var str = this.dialogShow.limit_price
      var arr = str.split("--")
      // this.dialogShow.min_limit_price = this.dialogShow.price * this.dialogShow.number;
      this.dialogShow.min_limit_price = arr[1];
      this.dialogShow.max_limit_price = this.dialogShow.min_limit_price
      // this.dialogShow.
    },

    // 调用我要買接口
    getBuyPort() {
      getTransactionsInfo({ type: '1',currency: 'HKDT',pageNo: 1,pageSize: 100,userId: this.$store.getters.getUserId}).then(res => {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data){
            this.getBackBuyData = res.data.rows;
          }
        }
      })
      // api.pay_buy_list(obj).then(res => {
      //   this.getBackBuyData = res.buy_info;
      // });
    },
    // 调用我要賣接口
    getSellPort() {
      getTransactionsInfo({ type: '0',currency: 'HKDT',pageNo: 1,pageSize: 100,userId: this.$store.getters.getUserId}).then(res => {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data){
            this.getBackSellData = res.data.rows;
          }
        }
      })
    },
    // 发布交易单
    publishTrading() {
      if(this.$store.getters.getUserInfo.userStatus == '1'){
        this.$toast({
          message: '請進行實名認證',
          durtion: 1000
        })
        this.$router.push({
          path: '/idIndentify',
          query: {
            from :'otc'
          }
        })
        return
      }else if(this.$store.getters.getUserInfo.userStatus == '4'){
        this.$toast({
          message: '實名認證失敗',
          durtion: 1000
        })
        this.$router.push({
          path: '/idIndentify',
          query: {
            from :'otc'
          }
        })
        return
      }
      if(this.$store.getters.getUserInfo.bankStatus == '0'){
        this.$toast({
          message: '請添加銀行卡,才能進行交易',
          durtion: 1000
        })
        this.$router.push({
          path: '/account/safe/addBank',
          query: {
            from: 'otc'
          }
        })
        return
      }
      this.$router.push({
        path: "/order",
        query: {
          // id: this.selected
        }
      });
    },
    // 点击確認買入事件
    saveBuyIn() {
      AddOrder({transactionId: this.dialogShow.id,userId: this.$store.getters.getUserId}).then(res => {
        if(res.statusCode == 200){
          this.iconCancel()
          if(this.selected == '1'){
            this.$router.push({
              path: '/buyIn',
              query: {
                id: this.dialogShow.id,
                orderId: res.data,
                type: 2
              }
            })
          }else{
            this.$router.push({
              path: '/sellOut',
              query: {
                id: this.dialogShow.id,
                orderId: res.data,
                type: 2
              }
            })
          }

        }
      }).catch(err => {
        this.iconCancel()
        this.$toast({
          message: err.msg,
          duration: 1000
        })
      })
      if (this.selected == "1") {

      } else if (this.selected == "2") {

      }
      // AddOrder()
    },
    // 倒计时事件
    countDown() {
      this.clock = window.setInterval(() => {
        if (this.count > 0 ) {
          this.count--
        } else if (this.count == 0){
          // this.popupVisible = false;
          window.clearInterval(this.clock)
        }
      },1000)
    },
    // 点击買入事件
    buyBtn(item) {

      window.clearInterval(this.clock)
      if(this.$store.getters.getUserInfo.userStatus == '1'){
        this.$toast({
          message: '請進行實名認證',
          durtion: 1000
        })
        this.$router.push({
          path: '/idIndentify',
          query: {
            from :'otc'
          }
        })
        return
      }else if(this.$store.getters.getUserInfo.userStatus == '4'){
        this.$toast({
          message: '實名認證失敗',
          durtion: 1000
        })
        this.$router.push({
          path: '/idIndentify',
          query: {
            from :'otc'
          }
        })
        return
      }
      if(this.$store.getters.getUserInfo.bankStatus == '0'){
        this.$toast({
          message: '請添加銀行卡,才能進行交易',
          durtion: 1000
        })
        this.$router.push({
          path: '/account/safe/addBank',
          query: {
            from: 'otc'
          }
        })
      }
      this.dialogShow = JSON.parse(JSON.stringify(item))
      this.count = 15
      this.popupVisible = true;
      this.countDown()
    },
    openSheet() {
      this.upOrDown = true;
      this.sheetVisible = true;
    },
    gateIo() {
      this.upOrDown = false;
      this.beanId = '1'
      this.title = "HKD";
    },
    coin() {
      this.upOrDown = false;
      this.beanId = '2'
      this.title = "HKDT";
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "../../assets/css/otc/index";
  .divdemo{
    color:white;
    width:75px;
    height:75px;
    border: 1px solid red;
    // background: red;
    margin: 0 auto;
  }
  .codePop .codePopContent .closePop{
    height: 1rem;
    width: 1rem;
    img{
      width: 0.4rem;
      position: relative;
      left: 0.3rem;
      top: 0.3rem;
    }
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
  .listBox{
    margin-top: 10px;
  }
  .listBoxHeight {
    max-height: 470px;
    overflow: scroll;
  }
</style>


