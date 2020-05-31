import request from '@/until/request.js'
// 获取评论列表
export const Getcomments = (params) => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}
// 发送评论
export const Postcomment = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
