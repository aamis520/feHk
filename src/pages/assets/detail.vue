<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div class="assets-info">
      <p class="img">
          <img v-if="assetsInfo.image" :src="assetsInfo.image" alt="">
          <img v-else src="~@/assets/images/HKDT.png" alt="">
      </p>
      <p class="number">{{assetsInfo.available | availableFilter}}HKDT</p>
      <!-- <div class="assets-add">
        <div class="address" @click="popupVisible= true">
          <p class="th-title">行情價(HKDT)</p>
          <p class="price">{{assetsInfo.quotation}}</p>
        </div>
        <div class="addAssets">
          <p class="th-title">合計(HKD)</p>
          <p class="price">{{assetsInfo.quotation_tatal}}</p>
        </div>
      </div> -->
    </div>
    <p class="addressDesc">收款地址</p>
    <div class="flexCen address" >
      <div class="myAddress">{{addr.address}}</div>
      <div class="copyBtn"><mt-button type="primary" v-clipboard:copy="addr.address" v-clipboard:success="onCopy" v-clipboard:error="onError">複製</mt-button></div>
    </div>
    <div class="assets-list">
      <p class="title"></p>
      <div class="list-Record">
          <table>
          <thead>
            <tr>
              <th>類別</th>
              <th>數量</th>
              <th style="width:100px;">時間</th>
              <th style="width:25%;">地址</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for= "(item,index) in assetsList" :key="index">
              <td>{{item.bizType | typeFilters}}</td>
              <td>{{item.amount | availableFilter}}</td>
              <td>{{item.createTime | timeFilter}}</td>
              <td style="width:40%;text-overflow: ellipsis;overflow:break;word-break: break-all;">{{item.address}}</td>
            </tr>
            <tr v-if="assetsList.length == 0">
              <td colspan="4" style="text-align:center;">暫無數據</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <p class="out">
        <mt-button @click="gotoTransfer">划转</mt-button>
      </p> -->
      <div class="pay">
        <div>
          <mt-button class="exchangeAccount" @click="gotToRollout">轉賬</mt-button>
        </div>
        <!-- <p class="zone"></p>
        <div>
          <mt-button @click="$toast('功能暂未开放')">收款</mt-button>
        </div> -->
      </div>
    </div>
    <mt-actionsheet
      class="chooseCard"
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
import assetsHeader from './header'
import { api } from '@/api/index'
import { timestampToTime } from '@/static/calute'
import { getAccountBySymbol, getMyAddr, getTransferList } from '@/api/apiJava'

export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '總資產',
      sheetVisible: false,
      addr: {
        address: ''
      },
      actions: [{
        name: '轉出到自己的Mastercard',
        method: this.gotoTransfer
      },{
        name: '轉出',
        method: this.gotToRollout
      }],
      query:{},
      assetsInfo: {
        available: 0,
        currency: 'HKDT'
      },
      assetsList: []
    }
  },
  filters: {
    typeFilters(val){
      if(val == 1){
        return '轉入'
      }else{
        return '轉出'
      }
    },
    timeFilter(val){
      return timestampToTime(val)
    },
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
  wactch:{
    $route: {
      handler: function(val, oldVal){
        this.getMyAssetsById()
        this.getRecordById()
        this.getMyaddr()
      },
      // 深度观察监听
      deep: true
    },
  },
  created () {
    console.log(this.$router.currentRoute)
    this.query = this.$router.currentRoute.query
    this.getMyAssetsById()
    this.getRecordById()
    this.getMyaddr()
  },
  methods: {
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
    gotoTransfer(){
      this.$toast({
        message: '功能暫未開放',
        duration: 1000
      })
      // this.$router.push('/assets/transfer')
    },
    gotToRollout(){
      if(this.$store.getters.getUserInfo.userStatus == '1'){
        this.$toast({
          message: '請進行實名認證',
          duration: 1000
        })
        this.$router.push({
          path: '/idIndentify',
          query: {
            from :'exchange'
          }
        })
        return
      }else if(this.$store.getters.getUserInfo.userStatus == '4'){
        this.$toast({
          message: '實名認證失敗',
          duration: 1000
        })
        this.$router.push({
          path: '/idIndentify',
          query: {
            from :'exchange'
          }
        })
        return
      }

      this.$router.push({
        path :'/assets/rollOut',
        query: {
          available: this.assetsInfo.available
        }
      })
    },
    getMyAssetsById(){
      getAccountBySymbol(this.$store.getters.getUserId,'HKDT').then(res => {
        if(res.statusCode == 200){
          if(res.data){
            this.assetsInfo = res.data
          }
        }
      })
      // api.assetsInfo({id: this.query.id}).then(res => {
      //   console.log(res)
      //   this.assetsInfo = res.info
      // })
    },
    getRecordById(){
      console.log(this.query)
      getTransferList(this.$store.getters.getUserId,'HKDT').then(res => {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data){
            this.assetsList = res.data
          }
        }
      })
      // api.pay_assets_info({id: this.query.id}).then(res => {
      //   console.log(res)
      //   this.assetsList = res.info
      // })
    }
  }
}
</script>
<style lang="scss" scoped>

.assets-info{
  position: relative;
  width: 100%;

  p{
    text-align: center;
    color: #fff;
  }
  .img {
    width: 36px;
    height: 36px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 18px; /*no*/
    line-height: 25px;
    img{
      display: block;
      width: 100%;
    }
  }
  .number{
    font-size: 20px; /*no*/
    line-height: 28px;
  }
  .assets-add{
    position: relative;
    display: flex;
    margin-top: 25px;
    margin-bottom: 15px;
    .th-title{
      opacity: 0.6;
      font-size: 10px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
    }
    .price{
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
    }
  }
  .assets-add p{
    margin-bottom: 10px;
  }
  .assets-add div{
    flex: 1;
    text-align: center;
    color: #fff;
  }
}
.assets-list {
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(50deg, #383848, #22222c);
  padding-bottom: 30px;
  .list-Record{
    width: 90%;
    margin: 0 auto;
    padding: 10px 10px;
    background: #393948;
    box-shadow: 0 0 34px 0 rgba(34,34,44,0.25);
    border-radius: 6px;
    max-height: 300px;
    overflow: scroll;
  }
  .mint-button--normal{
    background: #57576B;
    border-radius: 6px;
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0.29px;
    text-align: center;
  }
  .out{
    margin: 10px auto;
    .mint-button--normal{
      display: block;
      background: #4CA1F9;
      width: 100%;
    }
  }
  .pay{
    display: flex;
    width: 90%;
    margin: 30px auto;
    div{
      flex: 1;
      .mint-button--normal{
        display: block;
        width: 100%;
        background-image: linear-gradient(131deg, #4CE6F9 0%, #4C54F9 100%);
        border-radius: 6px;
      }
    }
    .zone{
      width: 20px;
    }
  }
  table {
    color: #fff;
    border-spacing: 0px;
    width: 100%;
    tr{
      height: 60px;
      margin-bottom: 2px;
    }
    thead{
      tr {
        th{
          border-bottom: 1px solid rgba(255,255,255,0.4);
          font-weight: normal;
          text-align: left;
          font-size: 14px; /*no*/
          letter-spacing: 0.4px;
          min-width: 40px;
        }
      }
    }
    tbody{
      tr{
        td{
          opacity: 0.5;
          font-size: 12px; /*no*/
          color: #FFFFFF;
          letter-spacing: 0.25px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.4);
        }
      }
      tr:last-child{
        td{
          border-bottom: none;
        }
      }
    }
  }
}
.mint-actionsheet-listitem, .mint-actionsheet-button{
  border-radius: 6px;
}
.chooseCard{
  width: 101%;
  border-radius: 10px 10px 0 0;
}
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
</style>


