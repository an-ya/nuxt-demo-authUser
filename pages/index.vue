<template>
  <div class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      首页
    </h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Index'
    }
  }
}
</script>

<style scoped>
  .title {
    margin: 30px 0;
  }

  .users {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .logo {
    width: 100%;
    height: auto;
    max-width: 400px;
    max-height: 289px;
  }

  .user {
    margin: 10px 0;
  }
</style>
