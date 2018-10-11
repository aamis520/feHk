<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div>


      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">郵箱</p>
            <p class="desc">
              <input class="xc-input" v-model="form.email" placeholder="请輸入郵箱地址" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">國籍或地區</p>
            <p class="desc">
              <input class="xc-input" v-model="form.nationality" type="text" placeholder="请輸入國籍或地區" />
            </p>
          </div>
        </div>
      </div>

      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">省份</p>
            <p class="desc">
              <input class="xc-input" v-model="form.province" placeholder="请輸入省份" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">城市</p>
            <p class="desc">
              <input class="xc-input" v-model="form.city" type="text" placeholder="请輸入城市" />
            </p>
          </div>
        </div>
      </div>

      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">地址</p>
            <p class="desc">
              <input class="xc-input" v-model="form.address_first" placeholder="请輸入地址" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">郵政編碼</p>
            <p class="desc">
              <input class="xc-input" v-model="form.postcode" type="text" placeholder="请輸入郵政編碼" />
            </p>
          </div>
        </div>
      </div>

      <div class="submit">
        <p class="btn">
          <mt-button @click="sendSuccess">下一步</mt-button>
        </p>
      </div>
    </div>
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
      title: '開卡1/2',
      number: '',
      users: '',
      form:{
        email: '',
        nationality: '',
        province: '',
        city: '',
        area: '',
        address_first: '',
        address_second: '',
        postcode: '',
      }
    }
  },
  methods: {
    closeSheet(val){
      this.chooseCoin = val.name
    },
    sendSuccess(){
      api.idStep1(this.form).then(res=> {
        console.log(res)
        if(res.error_code == 1000){
          this.$router.push('/openCard/idstep2')

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


