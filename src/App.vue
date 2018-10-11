<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  document.querySelector('#app').addEventListener('touchstart', function (ev) {
　　let a=$('#app')[0].scrollTop
　　if($('#app')[0].scrollTop <=0){
　　　　$('#app')[0].scrollTop =1
　　}
  })
  // var screenHeight;
  // if (window.innerHeight){
  //   screenHeight = window.innerHeight;
  // } else if ((document.body) && (document.body.clientHeight)){
  //   screenHeight = document.body.clientHeight;
  // }
  // // TODO
  // document.querySelector('html').style.height = screenHeight + 'px'
  // document.querySelector('body').style.height = screenHeight + 'px'
export default {
  name: 'app',
  created () {
  }
}

</script>
<style style="css">
#app {
  width: 100%;
  height: 100%;
}
</style>
