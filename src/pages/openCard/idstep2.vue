<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div>


      <div class="xc-cell">
        <div class="cell-wrapper">
          <div class="content-left">
            <p class="title">身份證</p>
            <p class="desc">
              <input class="xc-input" type="number"  v-model="idNumber" placeholder="请输入身份證號碼" />
            </p>
          </div>
        </div>
      </div>
      <div class="xc-upload flexCen">
        <p class="imgUp">
          <span class="uploadInput">
            <p class="plus">+</p>
            <p class="upTitle">身份證A面</p>
             <form id="idMainP"><input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="idMain" @change="getIdHand($event,'idMainSrc')"></form>
          </span>
          <img v-if="idMainSrc" class="uploadImg" :src="idMainSrc" alt="">
          <i class="delImg" @click="delImage('idMainP','idMainSrc')">
            <img src="~@/assets/images/Group 8.png" alt="">
          </i>
        </p>
        <div>
          <p class="desc">*請上傳身份證A面</p>
        </div>
      </div>

      <div class="xc-upload flexCen">
        <p class="imgUp">
          <span class="uploadInput">
            <p class="plus">+</p>
            <p class="upTitle">身份證B面</p>
            <form id="idBackP"><input type="file"  accept="image/gif,image/jpeg,image/jpg,image/png"  ref="idBack" @change="getIdHand($event,'idBackSrc')"></form>
          </span>
          <img v-if="idBackSrc" class="uploadImg" :src="idBackSrc" alt="">
          <i class="delImg" @click="delImage('idBackP','idBackSrc')">
            <img src="~@/assets/images/Group 8.png" alt="">
          </i>
        </p>
        <div>
          <p class="desc">*請上傳身份證B面</p>
        </div>
      </div>

      <div class="xc-upload flexCen">
        <p class="imgUp">
          <span class="uploadInput">
            <p class="plus">+</p>
            <p class="upTitle">手持證件照</p>
            <form id="idHandP"><input type="file"  accept="image/gif,image/jpeg,image/jpg,image/png" ref="idHand" @change="getIdHand($event,'idHandSrc')"></form>
          </span>
          <img v-if="idHandSrc" class="uploadImg" :src="idHandSrc" alt="">
          <i class="delImg" @click="delImage('idHandP','idHandSrc')">
            <img src="~@/assets/images/Group 8.png" alt="">
          </i>
        </p>
        <div>
          <p class="desc">*請上傳手持證件照</p>
        </div>
      </div>

      <div class="submit">
        <p class="btn">
          <mt-button @click="sendSuccess">確認</mt-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import { api } from '@/api/upload'

export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '開卡1/2',
      idHandSrc: '',
      idMainSrc:'',
      idBackSrc:'',
      idNumber: '',
      users: '',
    }
  },
  created () {
  },
  methods: {
    closeSheet(val){
      this.chooseCoin = val.name
    },
    sendSuccess(){
      // console.log(this.axios.get)
      if(this.idHandSrc == "") return
      if(this.idBackSrc == "") return
      if(this.idMainSrc == "") return

      let image = new FormData()
      image.append('file1',this.$refs['idMain'].files[0])
      image.append('file2',this.$refs['idBack'].files[0])
      image.append('file3',this.$refs['idHand'].files[0])
      image.append('id_number',this.idNumber)
      api.openCardUpload(image).then(res => {
        console.log(res)
        if(res.error_code == 1000){
          this.$router.push('/home/account')
        }
      }).catch(err => {
        this.$toast(err.error_desc)
      })

    },
    delImage(name,src){
      document.getElementById(name).reset();
      this[src] = ''
    },
    getIdHand(e,src){
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that[src] = this.result
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.xc-upload{
  border-bottom: 1px solid rgba(255,255,255,.05);
    margin: 10px 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  div{
    flex:1;
    color: #fff;
    text-align: center;
    .desc{
      opacity: 0.5;
    }
  }
  .imgUp{
    width: 72px;
    height: 72px;
    padding: 10px 0;
    position: relative;
    z-index: 1;
    .delImg{
      position: absolute;
      width: 16px;
      height: 16px;
      top: 2px;
      left: -7px;
      z-index:200;
      img{
        display: block;
        width: 100%;
      }
    }
    .uploadImg{
      display: block;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 100;
      img{
        display: block;
        width: 100%;
      }
    }
    .uploadInput{
      border: 1px solid #fff;
      position: relative;
      width: 72px;
      height: 72px;
      display: inline-block;
      overflow: hidden;
      .plus{
        font-size: 30px;
        color: #fff;
        font-weight: 100;
        opacity: 0.8;
        text-align: center
      }
      .upTitle{
        text-align: center;
        opacity: 0.8;
        color: #fff;
      }
      input {
         position: absolute;
          left: 0px;
          top: 0px;
          opacity: 0;
          -ms-filter: 'alpha(opacity=0)';
          font-size: 200px;
      }
    }
  }
}
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
      width: 8px;
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
  .desc_choose{
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    opacity: 0.4;
  }
  .desc{
    font-size: 14px; /*no*/
    color: #FFFFFF;
    letter-spacing: 0;
    .xc-input{
      background: transparent;
      width: 100%;
      border: none;
      font-size: 14px; /*no*/
      color: #FFFFFF;
      letter-spacing: 0;
      padding: 5px;
    }
    .xc-input:focus{
      border: none;
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


