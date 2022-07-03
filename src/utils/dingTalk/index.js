import * as dd from 'dingtalk-jsapi';

/* 判断是否是钉钉打开 */
 export const isDD = () => {
  if (dd.env.platform !== "notInDingTalk") {
    return true
  }
};

/* 根据钉钉企业id获取微应用免登授权码code */
export function getCode(callback) {
  const corpId = 'xxxxxxxxx' //钉钉企业id
  if (dd.env.platform !== 'notInDingTalk') {
    dd.ready(() => {
      dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: (info) => {
          callback(info.code)
        },
        onFail: (err) => {
          alert('fail')
          alert(JSON.stringify(err))
        }
      })
    })
  }
}

// 使用方法
// getCode(code => {
//   // 存入cookie
//   this.ddCode = code;
  
// })