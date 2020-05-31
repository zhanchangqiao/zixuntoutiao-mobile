import request from '@/until/request.js'
// 登录验证
export const Login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 验证码验证
export const Logincode = target => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${target}`
  })
}
// 获取当前登录用户的信息
export const Getuser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取当前登录用户的个人资料
export const Getuserprofile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 修改当前登录用户的个人资料
export const Updatauserprofile = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
export const Updatauserphoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
// 获取用户的频道了列表
export const Getchannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
