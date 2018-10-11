<template>
  <div>
    <div class="assets-info">
      <p class="name">{{userinfo.userRealName}}</p>
      <p class="assets-title">總資產HKD</p>
      <p class="assets-number">{{assetsInfo.available | availableFilter}}</p>
      <!-- <div class="assets-add">
        <div class="address" @click="popupVisible= true">
          <p><img src="~@/assets/images/二维码.png" alt=""></p>
          <p>資產地址</p>
        </div>
        <div class="addAssets" @click="addAddr">
          <p><img src="~@/assets/images/添加资产.png" alt=""></p>
          <p>添加資產</p>
        </div>
      </div>
      <div class="sao" @click="$toast('功能暂未开放')">
        <img src="~@/assets/images/扫描.png" alt="">
      </div> -->

      <p class="addressDesc">收款地址</p>
      <div class="flexCen address" >
        <div class="myAddress">{{addr.address}}</div>
        <div class="copyBtn"><mt-button type="primary" v-clipboard:copy="addr.address" v-clipboard:success="onCopy" v-clipboard:error="onError">複製</mt-button></div>
      </div>
      <div></div>
    </div>
    <div class="assets-list">
      <div class="list-box" v-for="(item,index) in data" :key="index" @click="goDetail(item)">
        <div class="coinAddr">
          <img v-if="item.image" :src="item.image" alt="">
          <img v-else src="~@/assets/images/HKDT.png" alt="">
        </div>
        <div class="list-item fl">
          <p v-show="item.symbol">{{item.symbol}}</p>
          <!-- <p class="desc">1HKD</p> -->
        </div>
        <div class="list-item fr">
          <p>{{item.available | availableFilter}}</p>
          <!-- <p class="desc">{{item.available | availableFilter}}</p> -->
        </div>
        <div class="arrow">
          <img src="~@/assets/images/Shape.png" alt="">
        </div>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      class="codePop"
      position="bottom">
      <div class="codePopContent">
        <p class="title">我的地址</p>
        <p class="address">{{addr.address}}</p>
        <!-- TODO -->
        <p class="copyBtn"><mt-button type="primary" v-clipboard:copy="addr.address" v-clipboard:success="onCopy" v-clipboard:error="onError">複製</mt-button></p>
        <p class="tip">* 本字符串地址是您的專屬接收地址，轉賬/收款造成的損失，後果自負</p>
        <p class="codeImg"></p>
        <p class="codeInfo">錢包地址二維碼</p>
        <div class="closePop" @click="popupVisible=false">
          <img src="~@/assets/images/x.png" alt="">
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { api } from '@/api/index'
import { getUserAccountByCurrency,getAccountInfo, getMyAddr } from '@/api/apiJava'
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      popupVisible: false,
      total:{
        unit: 'HKD',
        total: 100
      },
      data: [],
      assetsInfo:{
        symbol: 'HKDT',
        available: ''
      },
      addr: {
        address: ''
      },
      userinfo:JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.getAssetsList()
        this.getMyaddr()
      },
      // 深度观察监听
      deep: true
    },
  },
  filters: {
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,2)
      }
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    }
  },
  methods: {
    goDetail(item){
      this.$router.push({
        path: '/assets/detail',
        query: item
      })
    },
    addAddr(){
      this.$router.push('/assets/addAddr')
    },
    getAssetsList(){
      let id = this.$store.getters.getUserId
      getAccountInfo(id).then(res => {
        if(res.statusCode == 200){
          this.data = res.data
          this.assetsInfo = this.data[0]
        }
      })
    },
    getMyaddr(){
      getMyAddr(this.$store.getters.getUserId, 'HKDT').then(res => {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data){
            this.addr = res.data
          }
        }
      })
    },
    onCopy(){
      this.$toast({
        message: '複製成功',
        duration: 1000
      })
      this.popupVisible = false
    },
    onError(){
      this.$toast({
        message: '複製失敗',
        duration: 1000
      })
      this.popupVisible = false
    },
  },
  mounted(){
    this.getAssetsList()
    this.getMyaddr()
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/main";
.addressDesc{
  font-size: 14px; /*no*/
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: left;
  margin: 0 5%;
  margin-bottom: 8px;
  margin-top: 30px;
}
.address {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 30px;
  .myAddress {
    flex: 3;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .copyBtn{
    flex: 1;
    text-align: right;
    .mint-button--normal{
      background: #57576B;
      border-radius: 6px;
      width: 96px;
      height: 26px;
      line-height: 26px;
      font-size: 10px; /*no*/
    }
  }
}
.assets-info{
  position: relative;
  width: 100%;
  padding-top: 40px;
  .sao{
    position: absolute;
    width: 16px;
    height: 16px;
    right: 20px;
    top: 20px;
  }
}
p{
  text-align: center;
  color: #fff;
}
.name {
  font-size: 18px; /*no*/
  line-height: 25px;
}
.assets-title{
  font-size: 14px; /*no*/
  line-height: 17px;
}
.assets-number{
  font-size: 36px;
  line-height: 50px;
}
.assets-add{
  position: relative;
  display: flex;
  margin-top: 25px;
  margin-bottom: 15px;
}
.assets-add p{
  margin-bottom: 10px;
}
.assets-add div{
  flex: 1;
  text-align: center;
  color: #fff;
}
.mint-cell-wrapper{
  border: none !important;
}
.assets-list{
  width: 90%;
  margin: 20px auto;
}
.list-box{
  display: flex;
  height: 56px;
  background: #393948;
  box-shadow: 0 0 33px 0 rgba(34,34,44,0.25);
  border-radius: 6px;
  -webkit-align-items:center;
  align-items:center;
  -webkit-justify-content:center;
  justify-content:center;
  margin-bottom: 10px;
}

.list-item{
  flex: 1;
  text-align: left;
  .desc {
    opacity: 0.5;
  }
}
.list-item.fl p{
  font-size: 14px; /*no*/
  text-align: left;
}
.list-item.fr p{
  text-align: right;
}
.coinAddr{
  width: 24px;
  height: 24px;
  margin: 0 20px;
  img{
    display: block;
    width: 100%;
  }
}
.arrow{
  width: 40px;
  text-align: center
}
.codePop{
  width: 101%;
  padding: 1%;
}
.codePop .codePopContent{
  position: relative;
  p{
    color: #1e1e39;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 18px; /*no*/
    line-height: 25px;
    letter-spacing: 0.3px;
    margin-top: 40px;
  }
  .address {
    font-family: PingFangSC-Regular;
    font-size: 14px; /*no*/
    color: #57576B;
    letter-spacing: 0.29px;
    text-align: center;
    margin: 10px auto;
  }
  .copyBtn {
    margin: 20px auto;
    .mint-button {
      padding: auto 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0.29px;
      text-align: center;
      background-image: linear-gradient(131deg, #4CE6F9 0%, #4C54F9 100%);
      border-radius: 6px;
    }
    .mint-button--normal{
      padding:  0 30px;
    }
  }
  .tip {
    opacity: 0.4;
    font-family: PingFangSC-Regular;
    font-size: 10px; /*no*/
    color: #1E1E39;
    letter-spacing: 0.21px;
    text-align: center;
  }
  .codeImg {
    background: #D8D8D8;
    border: 1px solid #979797;
    width: 140px;
    height: 140px;
    margin: 80px auto 13px auto;
  }
  .codeInfo {
    opacity: 0.5;
    font-family: PingFangSC-Medium;
    font-size: 14px; /*no*/
    line-height: 20px;
    color: #1E1E39;
    letter-spacing: 0.29px;
    text-align: center;
    margin-bottom: 54px;
  }
  .closePop{
    position: absolute;
    width: 12px;
    height: 12px;
    right: 20px;
    top: -20px;
    img{
      display: block;
      width: 100%;
    }
  }
}
</style>


