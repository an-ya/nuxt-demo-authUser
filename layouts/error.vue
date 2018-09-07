<template>
  <section class="container error-page">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <template v-if="error.errorMessage !== undefined">
      <h1 class="title">
        错误
      </h1>
      <h2 class="info">
        {{ error.errorMessage }}
      </h2>
    </template>
    <template v-else>
      <h1 class="title">
        {{ error.statusCode }}
      </h1>
      <h2 class="info">
        {{ error.message }}
      </h2>
    </template>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      回到首页
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error'],
  head () {
    return {
      title: '错误'
    }
  }
}
</script>

<style scoped>
  .title
  {
    margin-top: 15px;
    font-size: 5em;
  }

  .info
  {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
  }

  .button
  {
    margin-top: 50px;
  }

  .button, .button:visited
  {
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
  }

  .button:hover, .button:focus
  {
    color: #fff;
    background-color: #000;
  }
</style>
