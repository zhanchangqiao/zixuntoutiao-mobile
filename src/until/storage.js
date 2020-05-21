// 本地存储的方法
// 获取 本地数据
export const getItem = (name) => {
  const res = window.localStorage.getItem(name)
  try {
    return JSON.parse(res)
  } catch {
    return res
  }
}
// 添加本地数据
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 删除本地数据
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
