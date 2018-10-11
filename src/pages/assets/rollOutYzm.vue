<template>
  <div>
    <yzm :headerTitle="headerTitle" :type="type"></yzm>
  </div>
</template>
<script>
import yzm from '../user/yzm'
export default {
  components: {
    yzm
  },
  data () {
    return {
      headerTitle: '轉出HKDT',
      type: 'rollout'
    }
  }
}
</script>

