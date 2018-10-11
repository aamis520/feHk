<template>
  <div>
    <assets-header :title="title" :showRecord="true"></assets-header>
    <div class="form">

      <div class="xc-cell" @click="sheetVisible=true">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">从HKDT钱包转出</p>
            <p class="desc">{{coin}}</p>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>

      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">HKDT钱包余额</div>
          <div class="content-right">{{balance}}</div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">Fcoin账户余额</div>
          <div class="content-right">{{fcoinBanlance}}</div>
        </div>
      </div>
      <div class="transNum">
        <input class="number" type="number" >
        <mt-button>全部兑换</mt-button>
      </div>
      <div class="submit">
        <p class="btn">
          <mt-button @click="success">划转</mt-button>
        </p>
        <p class="tip">* 从HKDT钱包与交易所划转手续费全免</p>
      </div>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
import assetsHeader from './header'
import { api } from '@/api/index'
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '我的资产',
      coin:'',
      sheetVisible: false,
      balance: '',
      fcoinBanlance: '',
      actions: []
    }
  },
  created (){
    this.getInfo()
  },
  methods: {
    chooseCoin(){
    },
    getInfo(){
      api.assetsTransferInfo({id:1}).then(res => {
        console.log(res)
        this.actions = []
        this.balance = res.account_info.price
        let actions = []
        actions = res.exchange_all
        actions.map(item =>{
          item.method = this.changeCoin
        })
        this.actions = actions
        this.fcoinBanlance = res.wallet_info.price
      })
    },
    changeCoin(val){
      this.coin = val.name
    },
    success(){
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.xc-cell{
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  -webkit-align-items:center;
  align-items:center;
  -webkit-justify-content:center;
  justify-content:center;
  color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  .cell-left,.cell-right{
    width: 40px;
    text-align: center;
    img{
      width: 8px;
    }
  }
  .cell-wrapper{
    flex: 1;
    display: flex;
    padding-bottom:12px;
    .content-left,.content-right{
      flex: 1;
    }
    .content-left{
      text-align: left;
    }
    .content-right{
      text-align: right
    }
  }
  .title{
    opacity: 0.5;
    font-size: 10px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    margin-bottom: 6px;
  }
  .desc{
    opacity: 0.2;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
  }
}
.xc-cell:first-child{
  margin-top: 30px;
}
.transNum{
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  .number {
    background: transparent;
    border: none;
    width: 4rem;
    line-height: 41px;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    padding: 0 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .mint-button--normal{
    margin-left: 20px;
    background: #57576B;
    border-radius: 6px;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: right;
    padding: 0 25px;
  }
}
.submit{
  width: 90%;
  margin: 0 auto;
  margin-top: 52px;
  .btn{
    margin-bottom: 10px;
    .mint-button--normal{
      display: block;
      width: 100%;
      font-size: 14px; /*no*/
      height: 30px;
      line-height: 30px;
      color: #FFFFFF;
      letter-spacing: 0.29px;
      text-align: center;
      background-image: linear-gradient(131deg, #4CE6F9 0%, #4C54F9 100%);
      border-radius: 6px;
    }
  }
  .tip{
    opacity: 0.2;
    font-size: 10px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>


