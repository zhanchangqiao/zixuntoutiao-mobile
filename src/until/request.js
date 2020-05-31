import axios from 'axios'
import store from '@/store/index.js'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
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
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token 无效
    const { user } = store.state
    if (!user || !user.token) {
      // 直接跳转到登录页
      return redirectLogin()
    }
    // 使用 refresh_token 请求获取新的 token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 拿到新的 token 之后把它更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      // 把失败的请求重新发出去
      // error.config 是本次请求的相关配置信息对象
      // 这里使用 request 发请求，它会走自己的拦截器
      // 它的请求拦截器中通过 store 容器访问 token 数据
      return request(error.config)
    } catch (err) {
      // 刷新 token 都失败了，直接跳转登录页
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.replace({
    name: 'login',
    // 传递查询参数，查询参数会以 ？ 作为分隔符放到 url 后面
    query: {
      // 数据名是自己起的
      // router.currentRoute 和我们在组件中获取的 this.$route 是一个东西
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
