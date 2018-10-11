<template>
  <div>
    <assets-header :title="title" :showRecord="true" :recordUrl="recordUrl"></assets-header>
    <div class="form">

      <div class="xc-cell" @click="sheetVisible=true">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">請選擇兌換的畢種</p>
            <p class="desc">{{coin}}</p>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>
      <div class="transNum">
        <input class="number" type="number"  @keyup="computedUseful" v-model="number" placeholder="请输入HKDT数量">
        <mt-button @click="allIn">全部兌換</mt-button>
      </div>
      <div class="flexCen balance">
        <div>
          <p class="left">餘額：{{Number(available).toFixed(6)}}</p>
        </div>
        <div>
          <p class="right">可兌換：{{userFul}} {{coin}}</p>
        </div>
      </div>
      <div class="submit">
        <p class="btn">
          <mt-button @click="success">確認兌換</mt-button>
        </p>
      </div>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import { api } from '@/api/index'
import { Toast } from 'mint-ui';
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: 'HKDT兌換',
      recordUrl: '/convert/record',
      sheetVisible: false,
      actions: [],
      coin: '',
      number: '',
      available: 0.00,
      userFul: 0.00,
      exchange: null
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo(){
      api.exchange_info().then(res => {
        if(res.error_code == 1000){
          let data = []
          this.available = res.available
          data = res.exchange_list
          data.map((item) => {
            item.method = this.coinChange
          })
          this.actions = data
        }
      })
    },
    coinChange(val){
      this.coin = val.name
      let exchange = 1
      for(let i=0;i<this.actions.length;i++){
        if(this.coin == this.actions[i].name){
          exchange = Number(this.actions[i].exchange)
          break
        }
      }
      this.exchange = exchange
      if(this.number){
        this.userFul = (this.number / exchange).toFixed(6)
      }
    },
    computedUseful(){
      if(this.coin != ''){
        if(this.exchange){
          this.userFul = (this.number / this.exchange).toFixed(6)
        }
      }
    },
    allIn(){
      if(this.coin == ''){
        return
      }else{
        this.number = this.available
        this.userFul = (this.number / this.exchange).toFixed(6)

      }
    },
    success(){
      if(this.coin != '' && this.number != ''){
        let id = ''
        for(let i=0;i<this.actions.length;i++){
        if(this.coin == this.actions[i].name){
            id = this.actions[i].id
            break
          }
        }
        if(id == '') { return }
        api.exchangeConfirm({
          id: id,   // TODO
          number: this.number
        }).then(res => {
          if(res.error_code == 1000){
            Toast('兌換成功')
            this.coin = ''
            this.number = ''
            this.userFul = 0
            this.exchange = null
            this.available = 0
            this.$router.push('/convert/record')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.balance{
  width: 90%;
  margin: 10px auto;
  div{
    flex: 1;
    p{
      font-size: 14px; /*no*/
      color: #fff;
      opacity: 0.5;
    }
    .left {
      text-align: left;
    }
    .right {
      text-align: right;
    }
  }
}
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
    height: 30px;
    line-height: 30px;
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


