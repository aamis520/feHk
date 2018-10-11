<template>
  <div class="login">
    <hkheader :title="title" :backUrl="'/'"></hkheader>
    <div class="nationTip">*密码为8-20位字符，不可以纯数字</div>
    <div class="login-form">
      <div class="nation">
        <div class="value">
          <input type="password" class="phone" v-model="form.password" placeholder="設置密碼">
        </div>
      </div>
      <div class="nation">
        <div class="value">
          <input type="password" class="phone" v-model="form.confirmPassword" placeholder="確認密碼">
        </div>
      </div>
      <mt-button  @click="confirm" class="loginBtn">確認</mt-button>

    </div>
  </div>
</template>

<script>
import hkheader from '../assets/header'
import { register, findPass } from '@/api/apiJava'
import { reg } from '@/static/common'
export default {
  components: {
    hkheader
  },
  data () {
    return {
      title: '設置密碼',
      showBack: false,
      form: {
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    confirm () {
      // 驗證密碼
      if(this.form.password == ''){
        this.$toast({
          message: '請輸入密碼',
          duration: 1000
        })
        return
      }
      if(!reg.pwdReg.test(this.form.password)){
        this.$toast({
          message: '請輸入6-12位數字、字母密碼',
          duration: 1000
        })
        return
      }
      if(this.form.confirmPassword == ''){
        this.$toast({
          message: '請再輸入一次密碼',
          duration: 1000
        })
        return
      }
      if(this.form.password !== this.form.confirmPassword){
        this.$toast({
          message: '兩次輸入的密碼不一致，請重新輸入',
          duration: 1000
        })
        return
      }
      let type = this.$router.currentRoute.query.type
      let mobile  = this.$router.currentRoute.query.mobile
      this.form.mobile = mobile

      if(type == 'regist'){
        let nationalNbr =  this.$router.currentRoute.query.nationalNbr
        let areacode = this.$router.currentRoute.query.areacode
        this.form.nationalNbr = nationalNbr
        this.form.areacode = areacode
        register(this.form).then(res => {
          if(res.statusCode == 200){
            this.$router.push('/login')
          }else{
            this.$toast({
              message: res.msg,
              duration: 1000
            })
          }
        })
      }else{
        findPass(this.form).then(res => {
          if(res.statusCode == 200){
            this.$router.push('/login')
          }else{
            this.$toast({
              message: res.msg,
              duration: 1000
            })
          }
        })
      }
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
    overflow: hidden;
    border-radius: 100px;
    div{
      line-height: 50px;
      font-size: 14px
    }
    .title{
      flex: 2;
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
