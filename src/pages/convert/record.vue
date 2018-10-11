<template>
  <div>
    <assets-header :backUrl="backUrl" :title="title"></assets-header>

    <div class="listBox">
      <div class="flexCen send" v-for="(item,index) in data" :key="index">
        <div>
          <p class="main">HKDT兌換{{ item.type | typeFilter}}</p>
          <p class="desc">數量: {{Number(item.result_number).toFixed(6)}} {{ item.type | typeFilter}}</p>
        </div>
        <div>
          <p class="main">&nbsp;</p>
          <p class="desc">{{item.create_time}}</p>
        </div>
      </div>
      <div class="nodata" v-if="data.length == 0">暫未數據</div>
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
      title: '兌換記錄',
      backUrl: '/home/account',
      active:true,
      data: []
    }
  },
  created () {
    this.getData()
  },
  filters: {
    typeFilter(val){
      if(val == 1) return 'HKDT'
      if(val == 2) return 'BTC'
      if(val == 4) return 'BCH'
      if(val == 3) return 'ETH'
      if(val == 5) return 'EOS'
    }
  },
  methods: {
    getData(){
      api.exchange_list().then(res => {
        console.log(res)
        if(res.error_code == 1000){
          if(res.exchangelist.data){
            this.data = res.exchangelist.data
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.nodata{
  font-size: 14px; /*no*/
  color: #FFFFFF;
  opacity: 0.5;
  text-align: center
}
.send{
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 0 10px;
  margin-bottom: 10px;
  div{
    flex:1;
    color: #FFFFFF;
    .main{
      font-size: 14px; /*no*/
      line-height: 17px;
      margin-bottom: 14px;
    }
    .desc{
      font-size: 10px; /*no*/
      opacity: 0.5;
      line-height: 14px;
      margin-bottom: 20px;
    }
  }
  div:nth-child(1){
    text-align: left;
  }
  div:nth-child(2){
    text-align: center;
  }
  div:nth-child(3){
    text-align: right;
  }
}
.listBox{
  margin-top: 10px;
}
</style>


