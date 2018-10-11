<template>
  <div>
    <assets-header :title="title" :backTitle="backTitle"></assets-header>
    <div class="assetsRecord">
      <div class="list" v-for="n in 4" :key="n">
        <div class="record">
          <div class="itemL">
            <p class="title">HKDT錢包賬戶</p>
            <p class="desc">畢種:HKDT</p>
          </div>
          <section class="itemCen">
            <p class="title">
              <img src="~@/assets/images/arrow-left.png" alt="">
            </p>
            <p class="desc">劃轉數量:3000.00HKDT</p>
          </section>
          <div class="itemR">
            <p class="title">Fcoin交易所</p>
            <p class="desc">2018/06/30</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from './header'
export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '劃轉記錄',
      backTitle: '我的資產'
    }
  }
}
</script>
<style lang="scss" scoped>
.list{
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 20px;
  margin-bottom: 20px;
  .record{
    width: 90%;
    margin: 0 auto;
    display: flex;
    -webkit-align-items:center;
    align-items:center;
    -webkit-justify-content:center;
    justify-content:center;
    .title{
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      margin-bottom: 10px;
    }
    .desc{
      opacity: 0.5;
      font-size: 10px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
    }
    div {
      flex: 1;
    }
    .itemR{
      text-align: right;
    }
    .itemCen{
      width: 50%;
      text-align: center;
    }
  }
}
.assetsRecord{
  margin-top: 30px;
}
</style>


