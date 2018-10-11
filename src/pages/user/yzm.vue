<template>
  <div>
      <hkheader :title="headerTitle"></hkheader>
    <div class="login-form">
      <!-- <div class="header">{{headerTitle}}</div> -->
      <p class="tip">*若未收到短信驗證碼，請點擊重新發送</p>
      <div class="identifyCode">
        <div class="identifyCodeBox">{{identifyCode[0]}}</div>
        <div class="identifyCodeBox">{{identifyCode[1]}}</div>
        <div class="identifyCodeBox">{{identifyCode[2]}}</div>
        <div class="identifyCodeBox">{{identifyCode[3]}}</div>
        <div class="identifyCodeBox">{{identifyCode[4]}}</div>
        <div class="identifyCodeBox">{{identifyCode[5]}}</div>
        <div class="identifyCodeInput">
          <input type="number" v-model="identifyCode"  :maxlength="6" @keyup="checkidentifyCode" ref="identifyCode">
        </div>
      </div>
      <p class="reSend">
        <countdown v-if="countingidentifyCode"
          :time="countTime"
          :leadingZero="false"
          @countdownend="countidentifyCodeDownEnd">
          <template slot-scope="props" >
            <span v-if="props.seconds">{{ props.seconds }}s</span>
          </template>
        </countdown>
        <span @click="reSend">重新發送</span>
      </p>

      <mt-button :disabled="identifyCode.length != '6'"  @click="regist" class="loginBtn">{{btnTitle}}</mt-button>
    </div>
  </div>
</template>

<script>

import countdown from "@xkeshi/vue-countdown";
import hkheader from '../assets/header'
import { checkPhoneCode, transferByUser, getTransferCode,getPhoneCode } from '@/api/apiJava'
import { reg } from '@/static/common'
export default {
  props:{
    headerTitle:{
      type: String,
      default: ''
    },
    type:{
      type: String,
      default: 'regist'
    }
  },
  components: {
    countdown,
    hkheader
  },
  data () {
    return {
      identifyCode: '',
      countingidentifyCode: true,
      countTime: 60000,
      btn:{
        regist:{
          btnTitle: '註冊'
        },
        find:{
          btnTitle: '設置密碼'
        },
        rollout: {
          btnTitle: '確認轉出'
        }
      }
    }
  },
  computed: {
    btnTitle(){
      return this.btn[this.type].btnTitle
    }
  },
  methods: {
    regist(){
      if(this.identifyCode.length != 6){
        this.$toast({
          message: '請輸入正確的驗證碼',
          duration: 1000
        })
        return
      }
      if(this.type == 'regist'){
        // 註冊 驗證碼
        checkPhoneCode({mobile: this.$router.currentRoute.query.mobile,identifyCode: this.identifyCode}).then(res => {
          console.log(res)
          if(res.statusCode == 200){
            this.$router.push({
              path: '/setPass',
              query: {
                type: this.type,
                mobile: this.$router.currentRoute.query.mobile,
                nationalNbr: this.$router.currentRoute.query.nationalNbr,
                areacode: this.$router.currentRoute.query.areacode
              }
            })
          }else{
            this.$toast({
              message: res.msg,
              duration: 1000
            })
          }
        })
      }else if(this.type == 'find'){
        // 找回密碼驗證碼
        checkPhoneCode({mobile: this.$router.currentRoute.query.mobile,identifyCode: this.identifyCode}).then(res => {
          if(res.statusCode == 1000){
            this.$router.push({
              path: '/setPass',
              query: {
                type: this.type,
                mobile: this.$router.currentRoute.query.mobile,
                nationalNbr: this.$router.currentRoute.query.nationalNbr,
                areacode: this.$router.currentRoute.query.areacode
              }
            })
          }
        }).catch(err => {
          this.$toast({
            message: err.msg,
            duration: 1000
          })
        })
      }else if(this.type == 'rollout'){
        // 發起轉賬申請
        let query = this.$router.currentRoute.query
        query.symbol = 'HKDT'
        query.verifyCode = this.identifyCode
        transferByUser(query).then(res => {
          console.log(res)
          if(res.statusCode == 200){
            this.$toast({
              message: '轉賬成功',
              duration: 1000
            })
            this.$router.push('/home/assets')
          }
        })
        this.$router.push('/home/assets')
      }
      // this.$router.push('/setPass')
    },
    reSend(){
      // 重新發送驗證碼
      if(this.countingidentifyCode){
        return
      }else{
        this.countingidentifyCode = false
        let query = this.$router.currentRoute.query
        if(this.type == 'rollout'){
          // TODO 轉賬申請的驗證碼 調用不同的接口
          getTransferCode(query).then(res => {
            console.log(res)
            if(res.statusCode == 200){
              this.countingidentifyCode = true
            }
          })
        }else{

          getPhoneCode(query).then(res => {
            if(res.statusCode == 200){
              this.$toast({
                message: '获取验证码成功',
                duration: 1000
              })
              this.countingidentifyCode = true
            }
          })
        }
      }
    },
    checkidentifyCode(){
      if(this.identifyCode.length > 6){
        this.identifyCode = this.identifyCode.substr(0,6)
      }
    },
    countidentifyCodeDownEnd(){
      this.countingidentifyCode = false
    }
  },
  created () {
    console.log(this.$router.currentRoute.query.mobile)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/main";
.login-form {
  margin-top: 0px;
  .header {
    height: 60px;
    line-height: 60px;
    text-align:center;
    font-size: 18px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0.1px;
  }
  .tip {
    opacity: 0.8;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    text-align: center;
    margin-top: 54px;
    letter-spacing: 0.34px;
  }
  .identifyCode{
    position: relative;
    display: flex;
    height: 40px;
    margin-top: 20px;
    .identifyCodeBox{
      flex: 1;
      width: 34px;
      height: 34px;
      line-height: 34px;
      margin: 0 10px;
      text-align: center;
      font-size: 18px; /*no*/
      color: #fff;
      background: #464658;
      border: 1px solid #797991;
    }
    .identifyCodeBox:first-child{
      margin-left: 0;
    }
    .identifyCodeBox:last-child{
      margin-right: 0;
    }
    .identifyCodeInput {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      input{
        width: 100%;
        height: 40px;
        background: transparent;
        border: none;
        opacity: 0;
      }
    }
  }
  .reSend{
    text-align: center;
    margin-top: 20px;
    font-size: 14px; /*no*/
    color: #4CA1F9;
    letter-spacing: 0.4px;
  }
}
</style>

