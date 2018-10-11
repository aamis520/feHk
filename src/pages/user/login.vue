<template>
  <div class="login">
    <hkheader :title="title" :showBack="showBack"></hkheader>
    <div class="login-form">
      <mt-field placeholder="請輸入手機號" v-on:keyup.enter= "login" v-model="form.mobile"></mt-field>
      <mt-field placeholder="密碼" type="password" v-on:keyup.enter= "login" v-model="form.password"></mt-field>
      <mt-button type="primary" @click="login" class="loginBtn">登錄</mt-button>
      <p class="forgetPass" @click="$router.push('/findPass')">忘記密碼</p>
      <p class="nomobile">沒有HKDT賬號？
        <router-link to="/regist">註冊</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import hkheader from '@/components/header'
import { api } from '@/api/index'
import { login } from '@/api/apiJava'
import { reg } from '@/static/common'
export default {
  components: {
    hkheader
  },
  data () {
    return {
      title: '登錄',
      showBack: false,
      form: {
        mobile: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      if(this.form.mobile == ''){
        this.$toast({
          message: '請輸入手機號碼',
          duration: 1000
        })
        return
      }
      if( this.form.password == '' ){
        this.$toast({
          message: '请输入密码',
          duration: 1000
        })
        return
      }
      login(this.form).then(res => {
        // 存userId 獲取用戶信息 存localstorage  存token
        if(res.statusCode == 200){
          let userInfo = res.data
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('token', userInfo.token)
          this.$store.dispatch('USER_LOGIN', userInfo)
          this.$store.dispatch('SET_TOKEN', userInfo.token)
          this.$router.push('/home')
        }else{
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/main";
  .forgetPass{
    text-align: center;
    font-size: 14px; /*no*/
    color: #4CA1F9;
    letter-spacing: 0.34px;
    margin-top: 16px;
  }
  .login-form .nomobile{
    margin-top: 154px;
    text-align: left;
    color: #fff;
    a {
      color: #4CA1F9;
    }
  }
</style>
