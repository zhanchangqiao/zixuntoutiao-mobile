import request from '@/until/request.js'
// 根据id获取文章详情
export const Getarticle = (id) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${id}`
  })
}
// 关注用户
export const Setfollowimg = (id) => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: id
    }
  })
}
// 取消关注用户
export const Delfollowimg = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${id}`
  })
}
// 对文章点赞
export const Setlikings = (id) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
// 取消对文章点赞
export const Dellikings = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${id}`
  })
}
// 收藏
export const Setcollected = (id) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: {
      target: id
    }
  })
}
// 取消收藏
export const Delcollected = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${id}`
  })
}
// 对文章评论点赞
export const Setcommentlikings = (id) => {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: {
      target: id
    }
  })
}
// 取消对文章评论点赞
export const Delcommentlikings = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${id}`
  })
}
