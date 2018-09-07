<template>
  <div>
    <top-navbar></top-navbar>
    <nuxt></nuxt>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import topNavbar from '~/components/Navbar.vue'
import bottomFooter from '~/components/Footer.vue'

export default {
  components: {
    topNavbar,
    bottomFooter
  }
}
</script>

<style>
  .container
  {
    min-height: 660px;
    margin: 0;
    padding: 100px 0;
    text-align: center;
  }

  .title
  {
    color: #000;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
  }
</style>
