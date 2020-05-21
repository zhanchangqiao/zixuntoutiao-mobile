import request from '@/until/request.js'
// 获取搜索列表
export const Searchresult = (params) => {
  return request({
    url: '/app/v1_0/search',
    method: 'GEt',
    params
  })
}
// 获取历史记录列表
export const Searchhistory = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'GEt'
  })
}
// 获取联想建议列表
export const Searchitem = (params) => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GEt',
    params
  })
}
// 删除用户搜索历史
export const Searechdelete = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'DELETE'
  })
}
