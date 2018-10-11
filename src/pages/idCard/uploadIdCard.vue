<template>
  <div>
    <assets-header :title="title"></assets-header>
    <div>
      <div class="xc-upload flexCen">
        <p class="imgUp">
          <span class="uploadInput">
            <p v-show="!idMainSrc" class="plus">+</p>
            <p v-show="!idMainSrc" class="upTitle">身份证A面</p>
             <form id="idMainP"><input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="idMain" @change="getIdHand($event,'idMainSrc')"></form>
          </span>
          <img v-if="idMainSrc" class="uploadImg" :src="idMainSrc" alt="">
          <i class="delImg" v-if="idMainSrc" @click="delImage('idMainP','idMainSrc')">
            <img src="~@/assets/images/Group 8.png" alt="">
          </i>
        </p>
        <div>
          <p class="desc">*请上传身份证A面</p>
        </div>
      </div>

      <div class="xc-upload flexCen">
        <p class="imgUp">
          <span class="uploadInput">
            <p v-show="!idBackSrc" class="plus">+</p>
            <p v-show="!idBackSrc" class="upTitle">身份证B面</p>
            <form id="idBackP"><input type="file"  accept="image/gif,image/jpeg,image/jpg,image/png"  ref="idBack" @change="getIdHand($event,'idBackSrc')"></form>
          </span>
          <img v-if="idBackSrc" class="uploadImg" :src="idBackSrc" alt="">
          <i class="delImg" v-show="idBackSrc" @click="delImage('idBackP','idBackSrc')">
            <img src="~@/assets/images/Group 8.png" alt="">
          </i>
        </p>
        <div>
          <p class="desc">*请上传身份证B面</p>
        </div>
      </div>

      <div class="xc-upload flexCen">
        <p class="imgUp">
          <span class="uploadInput">
            <p v-show="!idHandSrc" class="plus">+</p>
            <p v-show="!idHandSrc" class="upTitle">手持证件照</p>
            <form id="idHandP"><input type="file"  accept="image/gif,image/jpeg,image/jpg,image/png" ref="idHand" @change="getIdHand($event,'idHandSrc')"></form>
          </span>
          <img v-if="idHandSrc" class="uploadImg" :src="idHandSrc" alt="">
          <i class="delImg" v-show="idHandSrc" @click="delImage('idHandP','idHandSrc')">
            <img src="~@/assets/images/Group 8.png" alt="">
          </i>
        </p>
        <div>
          <p class="desc">*请上传手持证件照</p>
        </div>
      </div>

      <div class="submit">
        <p class="btn">
          <mt-button @click="sendSuccess">确认</mt-button>
        </p>
      </div>
    </div>

    <div class="openDlsgBg" v-if="dlsgShow"></div>
    <div class="openDlsg" v-if="dlsgShow">
      <p class="img">
        <img src="~@/assets/images/confirm.png" alt="">
      </p>
      <p class="tip">身份認證成功</p>
      <p class="btn">
        <button @click="dlsgShow = false">去交易</button>
      </p>
    </div>
  </div>
</template>
<script>
import assetsHeader from '../assets/header'
import { api } from '@/api/upload'
import { getUserInfo } from '@/api/apiJava'
import { Toast } from 'mint-ui';

export default {
  components: {
    assetsHeader
  },
  data () {
    return {
      title: '身份認證',
      idHandSrc: '',
      idMainSrc:'',
      idBackSrc:'',
      dlsgShow: false
    }
  },
  created () {
  },
  methods: {
    sendSuccess(){
      // console.log(this.axios.get)
      if(this.idHandSrc == "") return
      if(this.idBackSrc == "") return
      if(this.idMainSrc == "") return

      let image = new FormData()
      image.append('userFaceImage',this.$refs['idMain'].files[0])
      image.append('userBackImage',this.$refs['idBack'].files[0])
      image.append('userBodyImage',this.$refs['idHand'].files[0])
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      image.append('userId',userInfo.userId)
      api.idCardUpload(image).then(res => {
        if(res.statusCode == 200){
          getUserInfo(userInfo.userId).then(res => {
            if(res.statusCode == 200){
              let userInfoNew = res.data
              localStorage.removeItem('userInfo'),
              localStorage.setItem('userInfo',userInfoNew)
              this.$store.dispatch('USER_LOGIN', userInfoNew)
              this.$store.dispatch('changeUserStatus')
              this.$router.push('/home/account')
            }
          })

        }
      }).catch(err => {
        this.$toast({
          message: err.msg,
          duration: 1000
        })
        if(err.statusCode == '1015'){
          this.$router.push('/home/account')
        }else{
        }
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
    // padding: 10px 0;
    position: relative;
    z-index: 1;
    .delImg{
      position: absolute;
      width: 16px;
      height: 16px;
      top: -7px;
      left: -7px;
      z-index:200;
      img{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
      }
    }
    .uploadImg{
      display: block;
      width: 100%;
      max-height: 100%;
      height: 100%;
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
          font-size: 200px; /*no*/
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


