<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div class="account-list">
      <div class="list-box flexCen" @click="mastercard">
        <div>開卡</div>
        <p class="tip">未設置</p>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
      <div class="list-box flexCen" @click="noTip">
        <div>激活</div>
        <p class="tip">未激活</p>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: 'Mastercard',
      userInfo: {
        user_email: '',
        user_id: ''
      }
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('userinfo')
      this.$store.dispatch('resetUser')
      this.$router.push('/login')
    },
    noTip(){
      this.$toast({
        message: '功能暫未開放',
        duration: 1000
      })
    },
    mastercard(){
      this.$router.push('/openCard/idstep1')
    }
  },
  created () {
    if(localStorage.getItem('userinfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userinfo'))

    }
  }
}
</script>

<style lang="scss" scoped>

.account-list{
  padding-bottom: 15px;
  .list-box{
    width: 90%;
    padding: 15px 0;
    margin: 0 auto;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 10px;
    div{
      flex: 1;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .img{
      width: 17px;
      height: 14px;
      background: #ccc;
      margin: 0 20px;
    }
    .tip{
      text-align: right;
      font-size: 14p;
      color: #fff;
      opacity: .5;
      margin-right: 15px;
    }
    .imgLeft{
      width: 20px;
      height: 20px;
      img{
        display: block;
        width: 8px;
      }
    }
  }
}
</style>

