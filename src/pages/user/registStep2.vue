<template>
  <div>
    <yzm :headerTitle="headerTitle" :type="type"></yzm>
  </div>
</template>
<script>
import yzm from './yzm'
export default {
  components: {
    yzm
  },
  data () {
    return {
      headerTitle: '註冊',
      type: 'regist'
    }
  }
}
</script>

