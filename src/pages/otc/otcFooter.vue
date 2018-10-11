<!--  -->
<template>
  <div class="footer">
    <img style="vertical-align: middle;" src="~@/assets/images/message-square.png" alt="联系对方">
    <span class="textContent">联系对方</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .footer{
    line-height: 52px;
    height: 52px;
    width: 100%;
    text-align: center;
    .textContent{
      margin-left: 15px;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0.29px;
      text-align: center;
    }
  }
</style>
