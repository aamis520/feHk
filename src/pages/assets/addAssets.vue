<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div class="box">
        <div class="list" v-for="(item,index) in data" :key="index">
        <div class="list-item">
          <p class="img">
            <img v-if="item.image" :src="item.image" alt="">
            <img v-else src="~@/assets/images/HKDT.png" alt="">
          </p>
          <div>
            <p class="coin">{{item.name}}</p>
            <p class="price">行情價格:{{item.price}}HKD</p>
          </div>
          <p class="switch">
            <mt-switch v-model="item.status" @change="change(item)"></mt-switch>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from './header'
import { api } from '@/api/index'
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '資產種類',
      value: '',
      data: []
    }
  },
  created () {
    this.getAddList()
  },
  methods: {
    getAddList(){
      api.getAddAssets().then(res => {
        console.log(res)
        this.data = res.data
      })
    },
    // TODO
    change(item){
      console.log(item)
      if(item.status){
        // 添加
        api.addAssets({id:item.id}).then(res => {
          console.log(res)
        })
      }else{
        api.delAssets({id:item.id}).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list{
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 20px;
  .list-item{
    width: 90%;
    margin: 0 auto;
    display: flex;
    -webkit-align-items:center;
    align-items:center;
    -webkit-justify-content:center;
    justify-content:center;
    div {
      flex: 1;
      .coin{
        font-size: 14px; /*no*/
        color: #FFFFFF;
        letter-spacing: 0.29px;
      }
      .price{
        opacity: 0.5;
        font-size: 14px; /*no*/
        color: #FFFFFF;
        letter-spacing: 0.25px;
      }
    }
    .img{
      width: 40px;
      height: 40px;
      margin:  auto 20px;
      img {
        display: block;
        width: 100%;
      }
    }
    .switch{
      width: 52px;
      transform: scale(0.8);
      text-align: right;
    }
  }
}
.box{
  margin-top: 30px;
}
</style>


