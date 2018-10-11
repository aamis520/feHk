<template>
  <div>
    <assets-header :title="title" :backTitle="backTitle" :showSao="true"></assets-header>
    <div>
      <p class="balance">錢包餘額:{{assetsInfo.available | availableFilter }} HKDT</p>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">地址</p>
            <p class="desc">
              <input class="xc-input" v-model="form.address" type="text" placeholder="请輸入收款地址" />
            </p>
          </div>
        </div>
        <div class="cell-right">
          <!-- <img src="~@/assets/images/扫描.png" alt="" @click="scan"> -->
        </div>
      </div>

      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">金額</p>
            <p class="desc">
              <input class="xc-input" v-model="form.amount" type="number" @keyup="getFee" placeholder="请輸入轉賬金額" />
            </p>
          </div>
        </div>
      </div>
      <p class="balance">傳輸費：{{rollFee}} HKDT</p>
      <p class="balance">实际到账：{{form.amount - rollFee}} HKDT</p>
      <div class="submit">
        <p class="btn">
          <mt-button :disabled="!addressValid" @click="submit">確認轉出</mt-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from './header'
import { getTransferFee, getTransferCode } from '@/api/apiJava'
import { Toast } from 'mint-ui';
export default {
  components: {
    assetsHeader
  },
  filters: {
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
      title: '轉出HKDT',
      backTitle: '我的資產',
      assetsInfo: {
        available: 0
      },
      addressValid: false,
      form:{
        amount: '',
        address: ''
      },
      rollFee: 0
    }
  },
  created () {
    if(this.$store.getters.getUserInfo.userStatus == '1'){
      this.$toast({
        message: '請進行實名認證',
        duration: 1000
      })
      this.$router.push({
        path: '/idIndentify',
        query: {
          from :'exchange'
        }
      })
      return
    }
    this.getInfo()
    let query = this.$router.currentRoute.query
    if(query.available){
      this.assetsInfo.available = query.available
    }
  },
  methods: {
    getFee(){
      this.rollFee = 0
      if(this.form.amount != "" && this.form.address != ''){
        getTransferFee('HKDT',this.form.address).then(res => {
          // TODO
          if(res.statusCode == 200){
            let data = res.data
            this.rollFee = data
            this.addressValid = true
          }
        }).catch(err => {
          this.addressValid = false
          this.$toast({
            message: err.msg,
            duration: 1000
          })
        })
      }
    },
    getInfo(){
      // api.balance().then(res => {
      //   this.assetsInfo = res.data
      // })
    },
    submit(){
      if(this.form.amount < 500){
        this.$toast({
          message: '轉賬額度不能低於500',
          duration: 1000
        })
        return
      }
      if(this.addressValid == false){
        this.$toast({
          message: '请输入正确的转账地址',
          duration: 1000
        })
        return
      }
      if(this.form.account > this.assetsInfo.available){
        this.$toast({
          message: '餘額不足',
          duration: 1000
        })
        return
      }
      if(this.form.address != "" && this.form.amount != ""){
        let data = {}
        data.address = this.form.address
        data.amount = this.form.amount
        data.num = this.rollFee
        let userInfo = this.$store.getters.getUserInfo
        data.userId = userInfo.userId
        data.mobile = userInfo.userMobile
        getTransferCode(data).then(res => {
          console.log(res)
          if(res.statusCode == 200){
            // TODO
            this.$toast({
              message: '發送驗證碼成功',
              duration: 1000
            })
            this.$router.push({
              path: '/assets/rollOutYzm',
              query:data
            })
            }
        }).catch(err => {
          this.$toast({
            message: err.msg,
            duration: 1000
          })
        })

      }
    },
    scan(){

      // Toast( '功能暫未開放')
    }
  }
}
</script>
<style lang="scss" scoped>
.balance{
  width: 90%;
  opacity: 0.5;
  font-size: 12px; /*no*//*no*/
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
    img{
      width: 16px;
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
  }
}
.xc-cell:first-child{
  margin-top: 30px;
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
}
</style>


