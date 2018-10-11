<template>
  <div>
    <!-- 此组件暂未使用 -->
    <mt-header :title="title">
      <mt-button slot="left" v-if="backTitle" :icon="icon" @click="back">{{backTitle}}</mt-button>
      <mt-button slot="left" v-else :icon="icon" @click="back"></mt-button>
      <mt-button v-if="showSao" class="saomiao" slot="right">
        <img src="~@/assets/images/扫描.png" alt="">
      </mt-button>
      <mt-button v-if="showRecord" slot="right" @click="toRecord">
        <img src="~@/assets/images/menu.png" alt="">
      </mt-button>
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
      default: false,
    },
    backTitle:{
      type: String,
      default: ''
    },
    showSao: {
      type: Boolean,
      default: false,
    },
    showRecord: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {

    }
  },
  methods: {
    back(){
      console.log('11111')
      this.$router.go(-1)
    },
    toRecord(){
      this.$router.push('/assets/record')
    }
  }
}
</script>
<style scoped lang="scss">
.mint-header{
  background:transparent;
  color: #fff;
  font-size: 18px; /*no*/
  line-height: 34px;
  background-image: none;
}
</style>


