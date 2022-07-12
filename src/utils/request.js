import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';

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
      config.headers['Authorization'] = store.state.token
    }
    return config
  },
  error => {
    console.log('error',error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('?????????response',response)
    const res = response.data
    if (!res.success) {
      Toast(res.message)
      return Promise.reject(new Error(res || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.error(error)
    Toast('服务器异常，请稍后重试')
    return Promise.reject(error)
  }
)

export default service