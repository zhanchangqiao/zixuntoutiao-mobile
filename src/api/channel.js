// 频道相关请求
import request from '@/until/request.js'
// 频道新闻列表
export const getallchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 添加新闻列表
export const addchannels = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
// 添加新闻列表
export const delchannels = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
