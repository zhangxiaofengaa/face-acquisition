import axios from 'axios'
import store from '@/store'

const config = require('../../config')
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
    if (store.state.user.token) {
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data;
  }
)

export default service