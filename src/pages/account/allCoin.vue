<template>
  <div>
    <assets-header></assets-header>
    <div class="myCoin">
      <p class="coinType">HKDT</p>
      <p class="coinDesc">總資產（HKDT）</p>
      <p class="coinNum">HK233.34</p>
    </div>
    <div class="box">
        <div class="list" v-for="n in 4" :key="n">
        <div class="list-item">
          <p class="img">

          </p>
          <div>
            <p class="coin">HKDT</p>
          </div>
          <div>
            <p class="priceR rise">6489.54</p>
            <p class="price">0.00HKDT</p>
          </div>
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
      title: '資產種類',
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.myCoin{
  text-align: center;
  padding: 30px 0;
  color: #fff;
  .coinType{
    font-size: 14px; /*no*/
    padding-bottom: 15px;
  }
  .coinDesc{
    font-size: 14px; /*no*/
    opacity: 0.6;
    padding-bottom: 8px;
  }
  .coinNum{
    font-size: 36px;
    line-height: 50px
  }
}
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
      .priceR{
        font-size: 14px; /*no*/
        line-height: 20px;
      }
      .rise{
        color: #4DC379;
      }
      .fall{
        color: #E05C5C;
      }
    }
    div:last-child{
      text-align: center;
    }
    .img{
      width: 40px;
      height: 40px;
      background: #ccc;
      margin:  auto 20px;
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


