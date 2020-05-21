import axios from 'axios'
import store from '@/store/index.js'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理,允许修改响应数据
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// // 添加响应拦截器
// request.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   console.log(response)
//   response.data.data.results
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })
export default request
