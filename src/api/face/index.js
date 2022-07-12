import request from '@/utils/request'

export function uploadOcrIdImage(data) {
  return request({
    url: '/account/person/ocrId',
    method: 'post',
    data
  })
}