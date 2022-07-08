import request from '@/utils/request'

export function uploadOcrIdImage(data) {
  return request({
    url: '/qywx/faceRecognition/ocrId',
    method: 'post',
    data
  })
}