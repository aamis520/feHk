<template>
  <div class="login">
    <hkheader :title="title"></hkheader>
    <div class="nationTip">*國家或地區註冊后不可更改</div>
    <div class="login-form">
      <div class="nation" @click="chooseNation = true">
        <div class="title">國籍：</div>
        <div class="value">
          <span v-if="form.areacode == ''">請選擇</span>
          <i v-else>{{form.areacode}}</i>
        </div>
        <div class="icon">▼</div>
      </div>
      <div class="nation">
        <div class="title" @click="choosenationalNbr = true">{{form.nationalNbr}} ▼</div>
        <div class="value">
          <input type="number" class="phone"  v-model="form.mobile" placeholder="手機號">
        </div>
        <div class="icon"></div>
      </div>

      <mt-button  @click="regist" class="loginBtn">下一步</mt-button>

    </div>

    <mt-actionsheet
      class="userActionSheet"
      :actions="nations"
      v-model="chooseNation">
    </mt-actionsheet>
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
      title: '注册',
      showBack: false,
      chooseNation: false,
      nations: [
        {
          name: '中國大陸',
          method: this.chooseNational
        },
        {
          name: '香港',
          method: this.chooseNational
        },
        {
          name: '台灣',
          method: this.chooseNational
        }
      ],
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
        areacode: '',
        nationalNbr: '+86',
        mobile: '',
      }
    }
  },
  methods: {
    chooseNational(val){
      console.log(val)
      this.form.areacode = val.name
    },
    chooseCode(val){
      this.form.mobile = ''
      this.form.nationalNbr = val.name
    },
    regist () {
      if(this.form.areacode == ''){
        this.$toast({
          message: '請選擇地區',
          duration: 1000
        })
        return
      }
      if(this.form.nationalNbr == ''){
        this.$toast({
          message: '請選擇區號',
          duration: 1000
        })
        return
      }
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
          this.$router.push({
            path: '/regist/2',
            query: {
              mobile: this.form.mobile,
              nationalNbr: this.form.nationalNbr,
              areacode: this.form.areacode
            }
          })
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
      i{
        font-style: normal;
        color: #333;
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
  .userActionSheet{
    width: 101%;
    overflow: hidden;
    border-radius: 7px 7px 0 0;
  }
</style>
