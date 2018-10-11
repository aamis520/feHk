<template>
  <div>
    <div class="account-header">帳戶</div>
    <div class="userInfo flexCen" @click="$toast({message: '功能暂未开放',duration: 1000})">
      <p class="img">
        <img src="~@/assets/images/avatar.png" alt="">
      </p>
      <div>
        <p class="userName" v-if="userInfo.userRealName">{{userInfo.userRealName}}</p>
        <p class="uid">UID:{{userInfo.userId}}</p>
      </div>
    </div>
    <div class="exchange flexCen">
      <div class="name">HKDT交易區</div>
      <div class="btn">
        <!-- <mt-button @click="$router.push('/convert')">兑换</mt-button> -->
        <mt-button @click="noTip">兑换</mt-button>
      </div>
    </div>
    <div class="account-list">
      <div class="list-box flexCen" @click="goIndent">
        <p class="img">
          <img src="~@/assets/images/身份证.png" alt="">
        </p>
        <div>身份認證</div>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
      <div class="list-box flexCen" @click="noTip">
      <!-- <div class="list-box flexCen" @click="mastercard"> -->
        <p class="img">
          <img src="~@/assets/images/银行卡.png" alt="">
        </p>
        <div>Mastercard</div>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
      <div class="list-box flexCen" @click="noTip">
      <!-- <div class="list-box flexCen" @click="$router.push('/account/redbag')"> -->
        <p class="img">
          <img src="~@/assets/images/红包.png" alt="">
        </p>
        <div>紅包</div>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
      <div class="list-box flexCen" @click="$router.push('/account/order')">
        <p class="img">
          <img src="~@/assets/images/file-text1.png" alt="">
        </p>
        <div>訂單管理</div>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
      <div class="list-box flexCen" @click="$router.push('/account/safe')">
        <p class="img">
          <img src="~@/assets/images/shield.png" alt="">
        </p>
        <div>安全中心</div>
        <p class="imgLeft">
          <img src="~@/assets/images/Shape.png" alt="">
        </p>
      </div>
    </div>
    <div class="quitBtn">
        <mt-button @click="logout">退出</mt-button>
      </div>
  </div>
</template>
<script>
import { logout } from '@/api/apiJava'
export default {
  data () {
    return {
      userInfo: {
        userRealName: '',
        userId: ''
      }
    }
  },
  methods: {
    logout(){
      let userId = this.$store.getters.getUserId
      logout(userId).then(res => {
        console.log(res)
        if(res.status_code == 200){
          this.$router.push('/login')
          localStorage.removeItem('userInfo')
          this.$store.dispatch('USER_LOGOUT')
          }
        this.$router.push('/login')
        localStorage.removeItem('userInfo')
        this.$store.dispatch('USER_LOGOUT')
      })
    },
    goIndent(){
      let userInfo = this.$store.getters.getUserInfo
      if(userInfo.userStatus <= 1 || userInfo.userStatus == 4){
        this.$router.push('/idIndentify')
      }else{
        this.$toast({
          message: '您已進行過實名認證',
          duration: 1000
        })
      }
    },
    mastercard(){
      this.$router.push('/openCard')
    },
    noTip(){
      this.$toast({
        message: '功能暫未開放',
        duration: 1000
      })
    }
  },
  created () {
    if(localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))

    }
  }
}
</script>

<style lang="scss" scoped>
.account-header{
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 18px; /*no*/
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
}
.userInfo{
  margin-bottom: 24px;
  .img{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto 20px;
    img{
      display: block;
      width: 100%;
    }
  }

  div{
    flex: 1;
    .userName{
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 24px;
    }
    .uid{
      font-size: 10px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      opacity: 0.5;
      line-height: 14px;
    }
  }

}
.exchange{
  margin-bottom: 22px;

  div{
    flex: 1;
    font-size: 14px; /*no*/
  }
  .name{
    color: #FFFFFF;
    letter-spacing: 0;
    padding-left: 20px;
  }
  .btn{
    text-align: right;
    padding-right: 20px;
    .mint-button--normal{
      height: 26px;
      line-height: 26px;
      background-image: linear-gradient(131deg, #4CE6F9 0%, #4C54F9 100%);
      border-radius: 6px;
      padding: 0 25px;
      font-size: 10px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: right;
    }
  }
}
.account-list{
  background: #393948;
  height: 8rem;
  overflow-y: scroll;
  .list-box{
    width: 90%;
    padding: 15px 0;
    margin: 0 auto;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 10px;
    div{
      flex: 1;
      font-size: 12px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .img{
      width: 14px;
      height: 14px;
      margin: 0 20px;
      img{
        display: block;
        width: 100%;
      }
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
  .list-box:last-child{
    border: none;
  }
  .quitBtn{
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 30px;
    .mint-button--normal{
      display: block;
      width: 100%;
      background: #57576B;
      border-radius: 6px;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0.29px;
      text-align: center;
    }
  }
}
.quitBtn{
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    .mint-button--normal{
      display: block;
      width: 100%;
      background: #57576B;
      border-radius: 6px;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0.29px;
      text-align: center;
    }
  }
</style>

