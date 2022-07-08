import axios from 'axios'
import store from '@/store'

import config from '~config'
const { baseURL } = config[process.env.NODE_ENV]

// 创建axios实例
const service = axios.create({
  baseURL, // url = base url + request url
  timeout: 5000, 
  maskTip: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  error => {
    console.log('error',error)
    return Promise.reject(error)
    // console.error(error.message)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service