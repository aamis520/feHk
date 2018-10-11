<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div class="xc-tab flexCen">
      <div class="xc-tab-item" :class="active ? 'active' : ''" @click="active = true">
        <span>發出的紅包</span>
      </div>
      <div class="xc-tab-item" :class="active ? '' : 'active'" @click="active = false">
        <span>收到的紅包</span>
      </div>
    </div>
    <div class="listBox" v-if="active">
      <div class="flexCen send" v-for="n in 4" :key="n">
        <div>
          <p class="main">尘沙</p>
          <p class="desc">币种:HKDT</p>
        </div>
        <div>
          <p class="main">--></p>
          <p class="desc">金额:3000.00HKDT</p>
        </div>
        <div>
          <p class="main">UID121</p>
          <p class="desc">2018/06/30</p>
        </div>
      </div>
    </div>
    <div class="listBox" v-if="!active">
      <div class="flexCen send" v-for="n in 4" :key="n">
        <div>
          <p class="main">尘沙</p>
          <p class="desc">币种:HKDT</p>
        </div>
        <div>
          <p class="main"> <-- </p>
          <p class="desc">金额:3000.00HKDT</p>
        </div>
        <div>
          <p class="main">UID121</p>
          <p class="desc">2018/06/30</p>
        </div>
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
      title: '红包记录',
      active:true
    }
  }
}
</script>
<style lang="scss" scoped>
.xc-tab{
  width: 100%;
  height: 40px;;
  background: rgba(0,0,0,.3);
  color: #fff;
  div{
    flex: 1;
    text-align: center;
  }
  div.active{
    span{
      color: #4CA1F9;
      padding-bottom: 10px;
      border-bottom:2px solid #4CA1F9;
    }
  }
}
.send{
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 0 10px;
  div{
    flex:1;
    color: #FFFFFF;
    padding-bottom: 15px;
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


