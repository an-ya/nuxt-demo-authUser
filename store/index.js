import axios from '~/plugins/axios'

export const state = () => ({
  authUser: null,
  browserType: 1 // 浏览器类型
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_BROWSERTYPE: function (state, browserType) {
    state.browserType = browserType
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    // 每次刷新页面如果session中存在登录用户信息，则设置到state中
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }

    let userAgent = req.headers['user-agent']
    let type
    if (userAgent.indexOf('Trident') > -1 ||
      (userAgent.indexOf('Opera') > -1)) {
      // ie以及Opera
      type = 3
    } else if ((userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edge') > -1)) {
      // Microsoft Edge
      type = 2
    } else {
      // chrome等
      type = 1
    }
    commit('SET_BROWSERTYPE', type)
  },
  login ({ commit }, { username, password }) {
    // axios依赖于ES6 Promise语法
    // 上一层为api/routes/users中的express后端接收请求接口，下一层为pages/login.vue中的登录调用
    return axios.post('/api/login', { username, password }).then(({ data }) => {
      if (data.code === 1) {
        commit('SET_USER', data)
      }
      return Promise.resolve(data)
    })
  },
  logout ({ commit }) {
    return axios.post('/api/logout').then(() => {
      commit('SET_USER', null)
    })
  }

}
