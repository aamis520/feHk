<template>
  <div class="login">
    <hkheader :title="title"></hkheader>
    <div class="nationTip">*请填写注册时的手机号</div>
    <div class="login-form">

      <div class="nation">
        <div class="title" @click="choosenationalNbr = true">{{form.nationalNbr}} ▼</div>
        <div class="value">
          <input type="number" class="phone"  v-model="form.mobile" placeholder="手機號">
        </div>
        <div class="icon"></div>
      </div>

      <mt-button  @click="next" class="loginBtn">下一步</mt-button>

    </div>
    <mt-actionsheet
      class="userActionSheet"
      :actions="nationalNbrs"
      v-model="choosenationalNbr">
    </mt-actionsheet>
  </div>
</template>

<script>
import hkheader from '../assets/header'
import { api } from '@/api/index'
import { getPhoneCode } from '@/api/apiJava'
import { reg } from '@/static/common'
export default {
  components: {
    hkheader
  },
  data () {
    return {
      title: '找回密碼',
      showBack: false,
      choosenationalNbr: false,
      nationalNbrs: [
        {
          name: '+86',
          method: this.chooseCode
        },
        {
          name: '+852',
          method: this.chooseCode
        },
        {
          name: '+886',
          method: this.chooseCode
        }
      ],
      form: {
        mobile: '',
        nationalNbr: '+86'
      }
    }
  },
  methods: {
    chooseCode(val){
      this.form.mobile = ''
      this.form.nationalNbr = val.name
    },
    next () {
      if(this.form.mobile == ''){
        this.$toast({
          message: '請輸入手機號碼',
          duration: 1000
        })
        return
      }
      if(this.form.nationalNbr == '+86'){
        // 驗證大陸手機號
        if(!reg.cnPhone.test(this.form.mobile)){
          this.$toast({
            message: '請輸入正確的手機號碼',
            duration: 1000
          })
          return
        }
      }else if(this.form.nationalNbr == '+852'){
        // 驗證香港手機號
        if(!reg.hkPhone.test(this.form.mobile)){
          this.$toast({
            message: '請輸入正確的手機號碼',
            duration: 1000
          })
          return
        }
      }else if(this.form.nationalNbr == '+886'){
        // 驗證台灣手機號
        if(!reg.twPhone.test(this.form.mobile)){
          this.$toast({
            message: '請輸入正確的手機號碼',
            duration: 1000
          })
          return
        }
      }
      getPhoneCode(this.form).then(res => {
        if(res.statusCode == 200){
          this.$router.push('/findPass/2?mobile=' + this.form.mobile + '?nationalNbr=' + this.form.nationalNbr)
          ({
            path: '/findPass/2',
            query:{
              mobile: this.form.mobile,
              nationalNbr: this.form.nationalNbr
            }
          })
        }else{
          this.$toast({
            message: res.msg,
            duration: 1000
          })
        }
      })
      // api.forgetFirst(this.form).then(res => {
      //   if(res.error_code == 1000){
      //     this.$router.push('/findPass/2?mobile=' + this.form.mobile + '?nationalNbr=' + this.form.nationalNbr)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/main";
  .login-form{
    margin-top: 30px;
  }
  .nationTip{
    height: 64px;
    line-height: 64px;
    background: #57576B;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0.34px;
    padding: 0 20px;
  }
  .nation{
    position: relative;
    display: flex;
    width: 100%;
    background: #fff;
    height: 50px;
    margin-bottom: 25px;
    border-radius: 100px;
    div{
      line-height: 50px;
      font-size: 14px
    }
    .title{
      flex: 3;
      color: #30303D;
      text-align: right;
    }
    .value{
      flex: 8;
      padding: 0 10px;
      color: #000000;
      span{
        opacity: .3;
      }
      .phone{
        height: 50px;
        line-height: 50px;
        border: none;
        background: none;
        width: 100%;
        padding: 0 15px;
        opacity: 1;
      }
    }
    .icon{
      flex:1;
      color: #57576B;
    }
  }
</style>
