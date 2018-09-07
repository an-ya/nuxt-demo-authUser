const express = require('express')
const axios = require('axios')

// 生成初始化的实例，设置基础后台服务器api地址
const Axios = axios.create({
  baseURL: 'https://www.lrowy.com/api'
})

// Add a request interceptor
Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  console.log('========在与后台服务器通信时发生错误========:')
  // 错误处理，全部摘自官方文档
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
  return Promise.reject(error)
})

// Create express router
const router = express.Router()

// Add POST - /api/login
router.post('/login', (req, res) => {
  return Axios({
    method: 'post',
    url: 'loginUser',
    params: {
      email: req.body.username,
      password: req.body.password
    }
  }).then(function ({ data }) {
    if (data.code === 1) {
      // session中存储登录用户信息
      req.session.authUser = data
      // 返回登录用户信息
      res.json(data)
    } else {
      res.json({ code: 2, message: '用户名或密码错误' })
    }
  }).catch(function () {
    res.json({ code: -1, message: '获取后台服务器数据时发生错误，请测试后台数据服务器功能是否正常' })
    // if (error.response) {
    //   // 设置status会跳的下一层的catch()
    //   res.status(error.response.status).json({})
    // } else {
    //   // 这里会跳的下一层的then()
    //   res.json({ code: 3, message: '获取后台服务器数据时发生错误，请测试后台数据服务器功能是否正常' })
    // }
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Add POST - /api/users
router.post('/users/:id', function (req, res) {
  let id = parseInt(req.params.id)
  return Axios({
    method: 'post',
    url: 'getUserById',
    params: {
      userId: id
    }
  }).then(function ({ data }) {
    if (data.code === 1) {
      res.json(data)
    } else {
      res.json({ code: 2, message: '未找到指定用户信息' })
    }
  }).catch(function () {
    res.json({ code: -1, message: '获取后台服务器数据时发生错误，请测试后台数据服务器功能是否正常' })
  })
})

router.post('/userPhoto', function (req, res) {
  let email = req.body.email
  return Axios({
    method: 'post',
    url: 'getUserPhoto',
    params: {
      email: email
    }
  }).then(function ({ data }) {
    if (data.code === 1) {
      res.json(data)
    } else {
      res.json({ code: 2, message: '未找到指定用户' })
    }
  }).catch(function () {
    res.json({ code: -1, message: '获取后台服务器数据时发生错误，请测试后台数据服务器功能是否正常' })
  })
})

module.exports = router
