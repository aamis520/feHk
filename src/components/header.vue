<template>
  <div>
    <mt-header :title="title">
      <router-link v-if="showBack" to="/" slot="left">
        <mt-button :icon="icon"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'back'
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.mint-header{
  font-family: '微软雅黑';
  background:transparent;
  color: #fff;
  font-size: 18px; /*no*/
  line-height: 34px;
  background-image: none;
}
</style>


