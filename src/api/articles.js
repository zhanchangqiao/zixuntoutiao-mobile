import request from '@/until/request.js'
// 频道新闻列表
export const Loginarticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
