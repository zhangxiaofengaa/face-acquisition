module.exports = {
  local: {
    baseURL: '/apis',
    // mockURL: 'http://192.168.80.220:18081',
    mockURL: 'http://192.168.51.176',
    unifiedLoginURL: 'http://xnzhsg.szhtxx.cn:18081'
  },
  development: {
    baseURL: '/apis',
    mockURL: 'http://192.168.51.176',
    unifiedLoginURL: 'http://xnzhsg.szhtxx.cn:18081'
  },
  production: {
    baseURL: 'https://api.xwhx.top',
    mockURL: 'https://api.xwhx.top',
    unifiedLoginURL: 'http://xnzhsg.szhtxx.cn:18081'
  }
}
