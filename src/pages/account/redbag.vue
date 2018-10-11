<template>
  <div>
    <assets-header :title="title" :showRecord="true" :recordUrl="recordUrl"></assets-header>
    <div>
      <div class="xc-cell" @click="sheetVisible = true">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">選擇畢種</p>
            <p class="desc_choose">
              {{chooseCoin}}
            </p>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>

      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">总额</p>
            <p class="desc">
              <input class="xc-input" type="number"  v-model="number" placeholder="输入数量" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">红包对象</p>
            <p class="desc">
              <input class="xc-input" v-model="users" type="text" placeholder="请填写领红包人uid/手机号/邮箱" />
            </p>
          </div>
        </div>
      </div>
      <div class="submit">
        <p class="btn">
          <mt-button @click="sendSuccess">确认转出</mt-button>
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
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '红包',
      recordUrl: '/account/redrecord',
      chooseCoin: '',
      number: '',
      users: '',
      sheetVisible: false,
      actions:[
        {
          name: "BTC",
          method: this.closeSheet
        },
        {
          name: "ETH",
          method: this.closeSheet
        },
        {
          name: "EOS",
          method: this.closeSheet
        },
        {
          name: "HKDT",
          method: this.closeSheet
        }
      ]
    }
  },
  methods: {
    closeSheet(val){
      this.chooseCoin = val.name
    },
    sendSuccess(){
      if(this.chooseCoin == ''){
        this.$toast({
          message: '请选择币种',
          duration: 1000
        })
        return
      }
      if(this.number == ''){
        this.$toast({
          message: '请输入红包金额',
          duration: 1000
        })
        return
      }
      if(this.users == ''){
        this.$toast({
          message: '请输入红包对象',
          duration: 1000
        })
        return
      }
      api.redbag({
        currency: this.chooseCoin,
        amount: this.number,
        number:1,
        users: this.users,
      }).then(res => {
        console.log(res)
        if(res.error_code == 1000){
          setTimeout(() => {
            this.$router.go(-1)
          },1000)
        }else{
          Toast(res.error_desc)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
    img{
      width: 8px;
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
  margin-bottom: 52px;
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


