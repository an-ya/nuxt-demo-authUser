<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <h2 class="info">
      {{ user.name + 'dsadsa' }}
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
export default {
//  asyncData ({ params, error }) {
//    return axios.get('/api/users/' + params.id)
//      .then((res) => {
//        return { user: res.data }
//      })
//      .catch((e) => {
//        error({ statusCode: 404, message: 'User not found' })
//      })
//  },
//  async asyncData () {
//    let { data } = await axios.get('/testApi/getUserName')
//    return { user: { name: data.userName } }
//  },
//  name: 'id',
  data () {
    return {
      user: {
        name: this.$store.state.authUser !== null ? this.$store.state.authUser.username : '未登陆'
      }
    }
  },
  head () {
    return {
      title: `User: ${this.user.name}`
    }
  }
}
</script>

<style scoped>
  .title
  {
    margin-top: 30px;
  }
  .info
  {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
    margin-top: 10px;
  }
  .button
  {
    margin-top: 30px;
  }
</style>
