import axios from 'axios'
import qs from 'qs'

import url from '../config'

// axios 配置
axios.defaults.timeout = 15000 * 4
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = url

// let AUTH_TOKEN = (function () {
//   return localStorage.getItem('token')
// })()

// var instance = axios.create({
// })

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
// instance.interceptors.request.use(function (config) {
//   let url = config.url
//   if (url.indexOf('login') > -1) {
//     localStorage.setItem('token', '')
//     config.headers.Authorization = ''
//   }
//   if (url.indexOf('user') > -1 && url.indexOf('login') < 0) {
//     config.headers.Authorization = localStorage.getItem('token')
//   }
//   return config
// }, function (err) {
//   return Promise.reject(err)
// })
// instance.interceptors.response.use(function (res) {
//   if (res.headers.token) {
//     localStorage.setItem('token', res.headers.token)
//   }
//   return res
// }, function (err) {
//   return err
// })

// POST传参序列化
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('Authorization')
  if (token) {
    config.headers.Authorization = token
  }
  if (config.method === 'post' && axios.dataType === 'FormData') {
    // console.log(config)
    config.headers['content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.data = qs.stringify(config.data) // key-value传参
  }
  if (config.method === 'post' && axios.dataType === 'Json') {
    config.data = qs.parse(config.data) // 传参
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (!res) { // 状态码
    return Promise.reject(res)
  }
  return res
}, (error) => {
  // 404等问题处理
  return Promise.reject(error)
})

export default function fetch (dataType, url, params) {
  return new Promise((resolve, reject) => {
    axios.dataType = dataType
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
