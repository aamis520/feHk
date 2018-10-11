<!--  -->
<template>
  <div class="order">
    <assets-header :title="title" :showRecord="true" :recordUrl = "'/orderDetail'"></assets-header>
    <div>
      <!-- <div style="display:flex;text-align:center; margin-top:15px;">
        <span class="orderTitle">HKDT</span>
        <span class="orderTitle">HK$92.83</span>
        <span class="headerText">+1%</span>
      </div> -->
      <div class="xc-tab flexCen">
        <div class="xc-tab-item" :class="selected == '1' ? 'active' : ''" @click="selected = '1'">
          <span>買入HKDT</span>
        </div>
        <div class="xc-tab-item" :class="selected == '2' ? 'active' : ''" @click="selected = '2'">
          <span>賣出HKDT</span>
        </div>
      </div>

      <!-- <mt-navbar style="margin-top:10px;" v-model="selected">
        <mt-tab-item id="1">买入HKDT</mt-tab-item>
        <mt-tab-item id="2">賣出HKDT</mt-tab-item>
      </mt-navbar> -->
      <div class="listBox" v-if="selected == 1">
        <div class="transNum">
          <span class="price">價格</span>
          <input type="number" step="0.0001" class="number" @keyup="num(form.price,1)"  placeholder="請輸入買入價格" v-model="form.price">
          <span class="transNumRight">HKD</span>
        </div>
        <div class="transNum">
          <span class="price">數量</span>
          <input type="number" step="0.0001" class="number" @keyup="num(form.amount,2)"  placeholder="请输入交易數量" v-model="form.amount">
          <span class="transNumRight">HKDT</span>
        </div>
        <div class="transNum">
          <span class="price">金額</span>
          <input type="number" step="0.0001" class="number"  :disabled="true" v-model="numberAll" placeholder="">
          <span class="transNumRight">HKD</span>
        </div>
        <!-- <div class="transNum">
          <span class="limitPrice">限额</span>
          <input type="number" step="0.0001" class="limitNumber"  placeholder="单笔最低(HKD)" v-model="form.min_limit_price">
          <span class="limitTo">至</span>
          <input type="number" step="0.0001" class="limitNumber"  placeholder="单笔最高(HKD)" v-model="form.max_limit_price">
        </div> -->
        <p style="margin-top:20px;margin-left:5%;display:none;">
          <span class="contentTitle">
            HKDT/HKD
          </span>
        </p>
        <div style="margin:5%;background: #393948;padding:5px;display:none;">
          <p class="contentTime">1. 订单有效期为15分钟，请及时付款并点击“我已付款”按钮</p>
          <p class="contentTime">2. 币由系统锁定托管，请安心下单</p>
        </div>
      </div>
      <div class="listBox" v-if="selected == 2">
        <div class="transNum">
            <span class="price">價格</span>
            <input class="number" type="number" step="0.01"  placeholder="請輸入賣出價格" @keyup="num(form.price,1)" v-model="form.price">
            <span class="transNumRight">HKD</span>
          </div>
          <div class="transNum">
            <span class="price">數量</span>
            <input class="number" type="number" step="0.01"  placeholder="请输入交易數量" @keyup="num(form.amount,2)" v-model="form.amount">
            <span class="transNumRight">HKDT</span>
          </div>
          <div class="transNum">
            <span class="price">金額</span>
            <input class="number" :disabled="true" v-model="numberAll"  placeholder="">
            <span class="transNumRight">HKD</span>
          </div>
          <!-- <div class="transNum">
            <span class="limitPrice">限额</span>
            <input class="limitNumber"  placeholder="单笔最低(HKD)" v-model="form.min_limit_price">
            <span class="limitTo">至</span>
            <input class="limitNumber"  placeholder="单笔最高(HKD)" v-model="form.max_limit_price">
          </div> -->
          <p style="margin-top:20px;margin-left:5%;display:none;">
            <span class="contentTitle">
              HKDT/HKD
            </span>
          </p>
          <div style="margin:5%;background: #393948;padding:5px;display:none;">
            <p class="contentTime">1. 订单有效期为15分钟，请及时付款并点击“我已付款”按钮</p>
            <p class="contentTime">2. 币由系统锁定托管，请安心下单</p>
          </div>
      </div>


      <div class="orderFooter">
        <mt-button @click="publishOrder" class="saveBtn" type="primary">
          發布交易單
        </mt-button>
      </div>
      <mt-popup
        v-model="pubishPopupVisible"
        class="codePop"
        position="bottom">
        <div style="margin-top:50px; text-align:center;">
          <mt-button size="small" @click="ssavepublishOrder" class="saveBtn" type="primary">
            確認
          </mt-button>
          <mt-button size="small" @click="pubishPopupVisible=false" class="cancelBtn"  >
            取消
          </mt-button>
        </div>
        <div class="closePop" @click="pubishPopupVisible=false">
          <img src="~@/assets/images/x.png" alt="">
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import assetsHeader from '../assets/header'
import { api } from '@/api/index'
import { mul } from '@/static/calute.js'
import { publishTransaction } from '@/api/apiJava'
import { MessageBox,Toast } from 'mint-ui';
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      form: {
        id: '1', //交易对 币种id
        type: '',
        // userId: this.$store.getters.getUserId,
        userId: this.$store.getters.getUserId,
        currency: 'HKDT',
        price: '', //價格
        amount: '' //數量
      },
      getBackData: {},
      pubishPopupVisible: false,
      userArr: [],
      title: '發布交易單',
      selected: '1'
    };
  },
  watch:{
    'selected': function(value) {
      this.form.price = ''
      this.form.amount = ''
    }
  },
  computed: {
    numberAll(){
      if(this.form.price && this.form.amount){
        // 这里处理

        let val =  mul(Number(this.form.price),Number(this.form.amount))
        let arr = String(val).split('.')
        let str = ''
        if(arr.length > 1){
          str  = arr[1].slice(0,2)
        }
        if(str){
          return Number(arr[0] + '.' + str)
        }else{
          return Number(arr[0])
        }
      }
    }
  },
  methods: {
    num(e,str){
      if (!e) return
      if(str == 1){
        if (!/^\d*\.?\d{0,2}$/.test(e)) {
          let num = Number(e).toFixed(3)
          let numTwo = num.substring(0, num.lastIndexOf('.') + 3)
          this.form.price = numTwo
        }

      }else if(str == 2){
        if (!/^\d*\.?\d{0,4}$/.test(e)) {
          let num = Number(e).toFixed(5)
          let numTwo = num.substring(0, num.lastIndexOf('.') + 5)
          this.form.amount = numTwo
        }

      }
    },
    // 弹框確認
    ssavepublishOrder(){
      this.$router.push('/orderDetail')
    },
    // 確認發布交易單
    publishOrder(){
      if(!this.form.price || !this.form.amount) {
        Toast({
          message: '请补全交易单信息！',
          duration: 1000
        })
        return
      }

      MessageBox.confirm('確認發布交易單?').then(action => {
        console.log('確認發布交易單')
        this.getPort()
      })
    },
    // 调用發布交易單买入接口
    getPort(){
      if (this.selected == '1'){
        this.form.type = 0
        publishTransaction(this.form).then(res => {
          console.log(res)
          if(res.statusCode == 200){
            this.$router.push('/orderDetail')
          }
        })
      }else if(this.selected == '2') {
        this.form.type = 1
        publishTransaction(this.form).then(res => {
          if(res.statusCode == 200){
            this.$router.push('/orderDetail')
          }
        })
      }
    }
  },
  mounted(){
    this.form.price = ''
    this.form.amount = ''
    var userInfo =  localStorage.getItem('userInfo')
    var id = JSON.parse(userInfo).user_id
    this.form.id = id
    this.$store.commit('setSelected', this.$route.query.id)
  }
}
</script>
<style lang='scss' scoped>
  @import '../../assets/css/order/order';
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
</style>
