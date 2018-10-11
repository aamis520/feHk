import axios from 'axios'
import router from '../router'
import store from '../store'
import { Toast } from 'mint-ui'

const apiConfig = {
  baseURL: 'http://47.74.159.226:9100/api',
  // baseURL: 'http://api.hkdt.co/api',
  timeout: 10000*6,
  headers: {
    'Content-Type': "multipart/form-data"
  },
  validateStatus(status) {
    return true
  }
}

const instance = axios.create(apiConfig)
instance.interceptors.request.use(function (config) {
  if (store.getters.getToken) {
    config.headers['HTTP-X-Token'] = store.getters.getToken // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if(navigator.onLine){
    return config
  }else{

    return Promise.reject(config)
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 有res的拦截
    if(response.data != null){
      return response.data
    }else{
      return response
    }

  }
);




const post = (uri, params) => {
  return instance.post(uri, params).then((res) => {
    switch (res.statusCode) {
      case  200:
        if(res.data){
          return res

        }else{
          return res
        }

      default:
    }
    throw  res
  }).catch((res) => {
    throw  res
  })
}





const api = {
  // 開卡上傳
  openCardUpload(image){
    return post('auth/two',image)
  },

  // 身份認證上傳
  idCardUpload(image){
    return post('/user/img/upload/multiFile',image)
  },





}
export {api}

