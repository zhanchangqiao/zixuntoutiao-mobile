import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 全局使用中文
dayjs.locale('zh-cn')
// 或者 CommonJS
// var dayjs = require('dayjs');
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
