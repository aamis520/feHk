<template>
  <div>
    <assets-header :title="title" :backUrl="'/home/account'"></assets-header>
    <div>
      <div class="xc-cell" @click="noTip">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">手機</p>
          </div>
          <div class="content-right">
            <span class="tip">{{$store.getters.getUserInfo.userMobile}}</span>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>
      <div class="xc-cell" @click="noTip">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">郵箱</p>
          </div>
          <div class="content-right">
            <span class="tip"></span>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>
      <p class="bankDesc">OTC交易支付方式</p>
      <div class="xc-cell" @click="changeBank">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">銀行卡</p>
          </div>
          <div class="content-right">
            <span class="tip">{{bankInfo.accountNo}}</span>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>
      <!-- <div class="xc-cell" @click="$router.push('/account/safe/alipay')">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">支付寶</p>
          </div>
          <div class="content-right">
            <span class="tip">123123@qq.com</span>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div> -->

    </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import { Toast } from 'mint-ui';
import { getBankCardInfo } from '@/api/apiJava'
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '安全中心',

      bankInfo: {
        accountNo: '',
        payId: ''
      }
    }
  },
  created () {
    this.getBankInfo()
  },
  methods: {
    noTip(){
      this.$toast({
        message: '功能暫未開放',
        duration: 1000
      })
    },
    getBankInfo(){
      getBankCardInfo(this.$store.getters.getUserId).then(res => {
        console.log(res)
        if(res.statusCode == 200){
          this.bankInfo = res.data
        }
      })
    },
    changeBank(){
      console.log(this.bankInfo.accountNo )
      if(this.bankInfo.accountNo){
        this.$router.push({
          path: '/account/safe/bank',
          query: {
            bankInfo: JSON.stringify(this.bankInfo)
          }
        })
      }else{
        this.$router.push('/account/safe/addBank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bankDesc{
  font-size: 14px; /*no*/
  color: #fff;
  opacity: 0.5;
  line-height: 17px;
  margin: 20px;
}
.balance{
  width: 90%;
  opacity: 0.5;
  font-size: 14px; /*no*/
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 1;
  margin: 30px auto 20px auto;
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
    height: 40px;
    img{
      width: 8px;
      position: relative;
      top: 3px;
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
      text-align: right;
      .tip {
        font-size: 14px; /*no*/
        opacity: 0.5;
      }
    }
  }
  .title{
    opacity: 0.5;
    font-size: 10px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    margin-bottom: 6px;
  }
  .desc_choose{
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    opacity: 0.4;
  }
  .desc{
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    .xc-input{
      background: transparent;
      width: 100%;
      border: none;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      padding: 5px;
    }
    .xc-input:focus{
      border: none;
    }
  }
}
.xc-cell:first-child{
  margin-top: 30px;
}
.submit{
  width: 90%;
  margin: 0 auto;
  margin-top: 52px;
  margin-bottom:52px;
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
}
</style>


