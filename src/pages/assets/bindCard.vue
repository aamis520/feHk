<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div>
      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">持卡人</p>
            <p class="desc">
              <input class="xc-input" type="text" placeholder="用戶名" />
            </p>
          </div>
        </div>
        <div class="cell-right">
          <img src="~@/assets/images/扫描.png" alt="">
        </div>
      </div>

      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">卡號</p>
            <p class="desc">
              <input class="xc-input" type="text" placeholder="請輸入卡號" />
            </p>
          </div>
        </div>
      </div>
      <div class="submit">
        <p class="btn">
          <mt-button>確認轉出</mt-button>
        </p>
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
      title: '綁定Mastercard',
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
      width: 16px;
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
  .desc{
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    .xc-input{
      background: transparent;
      border: none;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      padding: 5px;
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


