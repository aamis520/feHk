<template>
  <div style="padding:15px 0;">
    <mt-header :title="title">
      <mt-button slot="left" v-if="backTitle" :icon="icon" @click="back">{{backTitle}}</mt-button>
      <mt-button slot="left" v-else :icon="icon" @click="back"></mt-button>
      <!-- <mt-button v-if="showSao" class="saomiao" slot="right">
        <img src="~@/assets/images/扫描.png" alt="扫描" @click="scan">
      </mt-button> -->
      <mt-button v-if="showRecord" slot="right" @click="toRecord">
        <img src="~@/assets/images/文件.png" alt="文件">
      </mt-button>
    </mt-header>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
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
    },
    recordUrl: {
      type: String,
      default: ''
    },
    backUrl:{
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    back(){
      if(this.backUrl){
        this.$router.push(this.backUrl)
      }else{
        this.$router.go(-1)

      }
    },
    toRecord(){
      if(this.recordUrl != ''){
        this.$router.push(this.recordUrl)
      }else{
        this.$router.push('/assets/record')
      }
    },
    scan(){
      Toast('功能暫未開放')
    }
  }
}
</script>
<style scoped lang="scss">
.mint-header{
  background:transparent;
  color: #fff;
  font-size: 16px; /*no*/
  line-height: 34px;
  letter-spacing: 1px;
  background-image: none;
}
.mint-button-text{
  font-size: 14px; /*no*/
}
</style>


