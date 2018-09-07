<template>
  <div>
    <template v-if="!$store.state.authUser || $store.state.authUser.userId != $route.params.id">
      <error :error="error"></error>
    </template>
    <template v-else>
      <section class="container">
        <h1>私密页</h1>
        <p>userId:{{$route.params.id}}</p>
        <p>未登录用户无法看到</p>
        <nuxt-link to="/">Back to the home page</nuxt-link>
      </section>
    </template>
  </div>
</template>

<script>
import error from '~/layouts/error'

export default {
  validate ({ params }) {
    // 参数校验，必须是个数字
    return /^\d+$/.test(params.id)
  },
  // 这里做页面拦截有两种，一是用中间件，简单，可复用，但是发现bug：error页面生成速度过快，前一个页面还没有隐藏error页面就显示了，且无法设置transition过度动画
  // 这个bug在github上的地址：https://github.com/nuxt/nuxt.js/issues/3210
  // 而且中间件只会在路由从其他路径进入当前路径时触发，store.state状态改变是不会触发中间件的，也就是页面在渲染后就不会与中间件有任何关系
  //  middleware: 'auth',
  // 二是根据store.state.authUser进行替换，缺点是很麻烦，不够优雅
  // 如果当前页面要响应退出登录的话还是要依据$store.state.authUser进行显隐，只能这么做，或者退出登录后this.$router.go(0)，那么就可以只使用中间件，但是整个页面会重新加载
  // 退出登录后this.$router.go('/')跳到首页的话，只用中间件就可以了
  components: {
    error
  },
  head () {
    return {
      title: '私密页'
    }
  },
  data () {
    return {
      error: {
        statusCode: 403,
        message: '用户未登陆'
      }
    }
  }
}
</script>
