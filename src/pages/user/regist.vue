<template>
  <div class="login">
    <hkheader :title="title"></hkheader>
    <div class="login-form">
      <mt-field placeholder="請輸入手機號" v-model="form.account"></mt-field>
      <mt-field placeholder="密碼" type="password" v-model="form.password"></mt-field>
      <mt-field placeholder="確認密碼" type="password" v-model="form.repassword"></mt-field>
      <mt-button  @click="regist" class="loginBtn">註冊</mt-button>

    </div>
  </div>
</template>

<script>
import hkheader from '../assets/header'
import { api } from '@/api/index'
import { reg } from '@/static/common'
export default {
  components: {
    hkheader
  },
  data () {
    return {
      title: '註冊',
      showBack: false,
      form: {
        account: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    regist () {

      if(this.form.account == ""){
        this.$toast({
          message:'请輸入手機號',
          during: 1000
        })
        return
      }
      if(this.form.password == ""){
        this.$toast({
          message: '請輸入手機號碼',
          duration: 1000
        })
        this.$toast('请輸入密碼')
        return
      }
      if(this.form.repassword == ""){
        this.$toast({
          message: '请輸入確認密碼',
          duration: 1000
        })
        return
      }
      if(this.form.password != this.form.repassword){
        this.$toast({
          message: '兩次輸入的密碼不一致',
          duration: 1000
        })
        return
      }
      if(!reg.phone.test(this.form.account)){
        this.$toast({
          message: '請輸入正確的手機號碼',
          duration: 1000
        })
        this.$toast('')
        return
      }
      if(!reg.pwdReg.test(this.form.password)){
        this.$toast({
          message: '請輸入手機號碼',
          duration: 1000
        })
        this.$toast('请输入3~12位密码')
        return
      }

      api.userRegist(this.form).then(res => {
        if(res.error_code == 1000){
          this.$toast({
            message: '請輸入手機號碼',
            duration: 1000
          })
          this.$toast('注册成功')
          this.form.account = ''
          this.form.password = ''
          this.form.repassword = ''
          this.$router.push('/login')
        }else{
          this.$toast(res.error_desc)
        }
      }).catch(err => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/main";

</style>
