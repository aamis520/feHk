<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div class="header">
      <div style="height:100%;display:flex;margin-top:20px;">
        <!-- <p>李**</p>
        <p>李**</p> -->
        <!-- <img src="" alt=""> -->
        <span class="headContent">
          <div class="headPic">

          </div>
          <div>
            <div class="headName">李**</div>
            <div class="headDate">30日成交:7388</div>
          </div>
        </span>
        <span class="headContent">
          <div class="headName"></div>
          <div class="headDate">申诉:7388</div>
        </span>
      </div>
      <div class="container">
        <span>

          <p style="font-size: 14px; /*no*/opacity: 0.5;">交易金额</p>
          <p style="font-size: 18px; /*no*/color: #FFFFFF;">2412.00HKDT</p>
          <p style="font-size: 10px; /*no*/color: #FFFFFF;opacity: 0.5;">价格：35.00</p>
          <p style="font-size: 10px; /*no*/color: #FFFFFF;opacity: 0.5;">数量：66.0822</p>
        </span>
        <span>
          <p></p>
          <p style="font-size: 10px; /*no*/color: #FFFFFF;opacity: 0.5;">#1231231231232323</p>
          <p class="savePay" style="color: #4CA1F9;font-size:18px;margin:30px;">订单取消</p>
        </span>
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
      title: '购买HKDT',
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid #393948;
    height:100px;
    width: 100%;
    .headContent{
      height:100%;
      text-align: center;
      flex: 1;
      .headPic{
        background: #D8D8D8;
        margin:5px 0  0 25px;
        float: left;
        height: 44px;
        width: 44px;
        border-radius: 50%;
        // border: 1px solid red;

      }
      .headName{
        margin-bottom: 20px;
        line-height: 20px;
        position: relative;
        left: -25px;
        height:18px;
        font-family: PingFangSC-Regular;
        font-size: 14px; /*no*/
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
      .headDate{
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 10px; /*no*/
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
      .headUser{
        float: left;
        padding-left: 20px;
        text-align: left;
        .headName{
          left: 0;
          text-align: left;
        }
      }
    }
  }
  .container{
    display: flex;
    p{
      height: 20px;
      // line-height: 20px;
      margin:10px 0 10px 30px;
      font-family: PingFangSC-Regular;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0.29px;
      // .savePay{
      //   color: #4CA1F9;
      //   font-family: PingFangSC-Regular;
      //   font-size: 18px; /*no*/
      //   color: #4CA1F9;
      //   letter-spacing: 0.38px;
      //   text-align: right;
      // }
    }
    span{
      flex: 1;
    }
  }
</style>


