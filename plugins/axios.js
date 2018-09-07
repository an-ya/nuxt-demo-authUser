import * as axios from 'axios'
import iView from 'iview'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

let Axios = axios.create(options)

Axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

Axios.interceptors.response.use(function (response) {
  if (response.data.code === -1 && !process.server) {
    iView.Notice.error({
      title: '错误',
      desc: response.data.message
    })
  }
  return response
}, function (error) {
  let result = '未知错误'
  if (error.response) {
    result = 'express服务器传出错误码:' + error.response.status
  } else {
    result = '有没响应，请检查express服务器是否启动，网络连接是否正常'
  }
  if (process.server) {
    console.log(result)
  } else {
    iView.Notice.error({
      title: '错误',
      desc: result
    })
  }
  return Promise.reject(error)
})

export default Axios
