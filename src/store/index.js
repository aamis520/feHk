import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'



Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: null,
    userId: '',
    selected: '1',
    authToken: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  mutations: {
    SET_TOKEN(state, token){
      state.authToken = token
    },
    user_login(state, params) {
      state.userInfo = params
      state.userId = params.userId

    },
    logout(state) {
      state.userInfo = {}
      router.replace({path: '/login'})
    },
    GO_REGIST(state){
      router.replace({path: '/regist'})
    },
    LoginLong(state){
      state.userInfo = {}
      localStorage.removeItem('userInfo')
      router.replace({path: '/home'})
    },
    setSelected(state,params){
      state.selected = params
    },
    CHANGE_BANK_STATUS(state){
      let userInfo = state.userInfo
      userInfo.bankStatus = 1
      state.userInfo = userInfo
      localStorage.removeItem('userInfo')
      localStorage.setItem('userInfo',JSON.stringify(userInfo))
    },
    CHANGE_USER_STATUS(state){
      let userInfo = state.userInfo
      userInfo.userStatus = 3
      state.userInfo = userInfo
      localStorage.removeItem('userInfo')
      localStorage.setItem('userInfo',JSON.stringify(userInfo))
    }
  },
  getters: {
    getToken: (state) => {
      return state.authToken
    },
    getUserInfo: (state) => {
      return state.userInfo
    },
    getUserId: (state) => {
      return state.userId
    }
  },
  actions: {
    SET_TOKEN({commit},token){
      commit('SET_TOKEN',token)
    },
    USER_LOGIN({commit}, params) {
      commit('user_login', params)
    },
    USER_LOGOUT({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      commit('SET_TOKEN','')
      commit('logout')
      router.replace('./login')
    },
    changeBankStatus({commit}){
      commit('CHANGE_BANK_STATUS')
    },
    changeUserStatus({commit}){
      commit('CHANGE_USER_STATUS')
    },
    // 登陆超时
    LOGIN_LONG({commit}){
      commit('SET_TOKEN','')
      commit('LoginLong')
    },
    // 重复注册
    RE_REGIST({commit}){
      commit('logout')
    },
    // 未注册
    NO_REGIST({commit}){
      commit('GO_REGIST')
    }
  }
})

export default store
