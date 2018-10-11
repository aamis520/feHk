<template>

  <div v-show="showKline">
    <iframe style="width:100%;height:15rem;" id="show-iframe" frameborder=0  allowtransparency="true" name="showHere" scrolling=auto allowfullscreen :src="iframUrl"></iframe>
  </div>
</template>
<script>
export default {
  props: {
    showKline: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: ''
    },
    tradeCurrency: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    iframUrl() {
      return 'http://k.mb.sxurl.cn/'
    }
  }

}
</script>
<style lang="scss" scoped>
body{
  padding: 0 !important;
}
</style>


