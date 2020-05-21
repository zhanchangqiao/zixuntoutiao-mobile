import request from '@/until/request.js'
export const Getcomments = (params) => {
  return request({
    url: '/app/v1_0/comments',
    methods: 'GET',
    params
  })
}
