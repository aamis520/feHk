<template>
  <div>
    <assets-header v-if="backUrl != ''" :backUrl="backUrl" :title="title"></assets-header>
    <assets-header v-else :title="title" :backUrl="'/account/safe'"></assets-header>
    <div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">姓名</p>
            <p class="desc">
              <input class="xc-input" v-model="form.name" placeholder="请输入姓名" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">開戶銀行</p>
            <p class="desc">
              <input class="xc-input" v-model="form.bankName" placeholder="请输入開戶銀行" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">開戶支行</p>
            <p class="desc">
              <input class="xc-input" v-model="form.branchName" placeholder="请输入開戶支行" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">銀行卡號</p>
            <p class="desc">
              <input class="xc-input" type="text" v-model="form.accountNo"  placeholder="請輸入銀行卡號" />
            </p>
          </div>
        </div>
      </div>
      <div class="submit">
        <p class="btn">
          <mt-button @click="sendSuccess">確認添加</mt-button>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
import assetsHeader from '../../assets/header'
import { addBankCard } from '@/api/apiJava'
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '添加銀行卡',
      number: '',
      dlsgShow: false,
      backUrl: '',
      users: '',
      form:{
        accountNo: '',
        bankName: '',
        branchName: '',
        name: '',
        type: 1,
        userId: this.$store.getters.getUserId
      },
      query: {}
    }
  },
  created () {
    if(this.$router.currentRoute.query){
      this.query = this.$router.currentRoute.query
    }
    if(this.query.from && this.query.from == 'exchange'){
      this.backUrl="/home/otc"
    }
  },
  methods: {
    sendSuccess(){
      addBankCard(this.form).then(res => {
        if(res.statusCode == 200){
          // 改變銀行卡狀態
          this.$store.dispatch('changeBankStatus')
          if(this.query.from && this.query.from == 'exchange'){
            this.$router.push('/home/otc')
          }else{
            this.$router.push('/home/account')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.openDlsgBg{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
}
.openDlsg{
  width: 84%;
  height: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  overflow: hidden;
  background: #fff;
  z-index: 3001;
  border-radius: 7px;
  .img{
    text-align: center;
    margin-top: 28px;
    margin-bottom: 20px;
    img{
      width: 44px;
      height: 44px;
      display: inline-block;
    }
  }
  .tip{
    font-size: 16px; /*no*/
    color: #393948;
    letter-spacing: 0;
    text-align: center;
    line-height: 18px;
    padding-bottom: 28px;
    border-bottom: 1px solid #ddd;
  }
  .btn{
    width: 100%;
    height: 60px;
    line-height: 60px;
    button {
      display: block;
      width: 100%;
      height: 100%;
      background: #fff;
      line-height: 60px;
      font-size: 16px; /*no*/
      color: #4CA1F9;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
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


