import request from '@/utils/request'

// 提交人脸采集
export function uploadFaceImage(data) {
  return request({
    url: '/account/studentFaceInfo/uploadFaceImage',
    method: 'post',
    data
  })
}

// 图片质量检测
export function verifyImageQuality(image64) {
  return request({
    url: 'account/person/verifyImageQuality',
    method: 'post',
    data: image64
  })
}