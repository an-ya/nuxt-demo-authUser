<template>
  <div class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <h2 class="info">
      {{ user.username + '：' + user.userId }}
    </h2>
    <h2 class="info" v-if="isAuthUser">
      登录且为当前用户时可见
    </h2>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  validate ({ params }) {
    // 参数校验，必须是个数字
    return /^\d+$/.test(params.id)
  },
  asyncData ({ store, params, error }) {
    if (store.state.authUser && store.state.authUser.userId === params.id) {
      return { user: store.state.authUser }
    } else {
      return axios.post('/api/users/' + params.id)
        .then(({ data }) => {
          if (data.code === 1) {
            return { user: data }
          } else {
            error({ errorMessage: data.message })
          }
        })
        .catch((e) => {
          error({ statusCode: e.response.status, message: '错误码' })
        })
    }
  },
  head () {
    return {
      title: `User: ${this.user.username}`
    }
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    isAuthUser: function () {
      return this.$store.state.authUser && this.$store.state.authUser.userId === this.user.userId
    }
  },
  methods: {}
}
</script>

<style scoped>
  .title {
    margin-top: 30px;
  }

  .info {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
    margin-top: 10px;
  }
</style>