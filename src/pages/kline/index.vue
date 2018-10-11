<template>
  <div>
    <assets-header :title="title"></assets-header>
    <kline></kline>
  </div>
</template>

<script>
import kline from '@/components/kline'
import assetsHeader from '../assets/header'
export default {
  components: {
    kline,
    assetsHeader
  },
  data () {
    return {
      title: '行情'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>


