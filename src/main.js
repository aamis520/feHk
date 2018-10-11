// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import axios from 'axios'
import 'lib-flexible'
import VueI18n from 'vue-i18n' // 引入语言包

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)







import { Toast } from 'mint-ui'
// 下边是设置默认语言
let localeDefault = localStorage.getItem('lang')
if(localeDefault != null){
  localStorage.setItem('lang', localeDefault)
} else {
  localStorage.setItem('lang', 'zh-CN')
}
if(localStorage.getItem('userInfo')){
  store.dispatch('USER_LOGIN', JSON.parse(localStorage.getItem('userInfo')))
}
Vue.use(MintUI)

Vue.use(VueI18n) // 注册应用
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en-US', // set locale   // 语言标识
  messages: {
    'zh-CN': require('./common/lang/zh.js'),   // 中文语言包
    'en-US': require('./common/lang/en.js')    // 英文语言包
  }
})
import './assets/css/index.scss'
Vue.config.productionTip = false
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
