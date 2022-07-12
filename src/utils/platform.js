

// 从手机App里面打开的
export const isApp = () =>  {
  const ua = window.navigator.userAgent.toLowerCase();
  console.log('ua.match',ua.match(/isapp/i))
  if (ua.match(/isapp/i) == "isapp") {
    return true
  }
}