<template>
  <div class="head-container">
    <div :class="{ 'nav-container-c': $store.state.browserType === 1, 'nav-container': true }">
      <div class="left-nav-container">
        <ul>
          <li><nuxt-link to="/">首页</nuxt-link></li>
        </ul>
      </div>
      <div class="right-nav-container">
        <ul>
          <template v-if="$store.state.authUser === null">
            <li><nuxt-link to="/login">登录</nuxt-link></li>
          </template>
          <template v-else>
            <li class="dropdown">
              <div class="user" tabindex="0" @focus="focus" @blur="blur">
                <a>
                  <img :src="$config.imgBaseURL + $store.state.authUser.userPhoto" class="nav-image">
                  {{$store.state.authUser.username}}
                </a>
              </div>
              <div class="dropdownContain">
                <div class="dropdown-menu anim-upbit">
                  <nuxt-link :to="{ name: 'u-id', params: { id: $store.state.authUser.userId }}" @mousedown.native="mouseDown" @mouseup.native="mouseUp">个人信息</nuxt-link>
                  <nuxt-link :to="{ name: 'u-id-secret', params: { id: $store.state.authUser.userId }}" @mousedown.native="mouseDown" @mouseup.native="mouseUp">私密页</nuxt-link>
                  <a href="javascript:void(0);" @mousedown="mouseDown" @mouseup="doAndMouseUp(logout, $event)">退出</a>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        // 使用this.$router.push('/')回到首页
        // 或者使用this.$router.go(0),优点是可以保持路径的情况下刷新当前页面并触发中间件，缺点是整个应用会重新从客户端获取重新加载
      })
    },
    // 下拉菜单获取焦点处理
    focus (e) {
      e.target.parentNode.classList.add('dropdown-selected')
    },
    // 下拉菜单失去焦点处理
    blur (e) {
      e.target.parentNode.classList.remove('dropdown-selected')
    },
    mouseDown (e) {
      // 阻止blur事件防止下拉项消失
      e.preventDefault()
    },
    mouseUp (e) {
      // 设置聚焦使下拉项消失
      e.target.focus()
    },
    doAndMouseUp (fo, e) {
      // 在鼠标抬起的同时调用一个函数
      fo()
      e.target.focus()
    }
  }
}
</script>

<style scoped>
  .nav-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    background: linear-gradient(90deg, rgba(62, 157, 109, 1), rgba(94, 217, 115, 1));
    transition: 0.5s;
    z-index: 2;
  }

  /*----------------------
    导航栏附属样式配置
    ----------------------*/
  .nav-container ul {
    padding: 0;
    margin: 0;
  }

  .nav-container ul li {
    display: block;
    width: 8rem;
    margin: 0;
    color: #fff;
    line-height: 4rem;
  }

  /*----------------------
    导航栏背景线样式配置,clip-path在ie、edge下不支持
    ----------------------*/
  .nav-container-c:after {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 50%;
    -webkit-clip-path: polygon(94% 0, 100% 60%, 100% 100%, 0 100%, 22% 0);
    clip-path: polygon(94% 0, 100% 60%, 100% 100%, 0 100%, 22% 0);
    background: linear-gradient(90deg, #72aa3f, #aaa460);
    z-index: -1;
  }

  /*----------------------
    导航栏左右容器样式配置
    ----------------------*/
  .left-nav-container {
    width: 50%;
  }

  .right-nav-container {
    width: 50%;
  }

  .left-nav-container ul li {
    float: left;
  }

  .right-nav-container ul li {
    float: right;
  }

  /*----------------------
    导览栏连接样式配置
    ----------------------*/
  .nav-container a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: inherit;
  }

  .nav-container a:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /*----------------------
    稍微再两边加点缩进,去除focus状态下的outline
    ----------------------*/
  .user {
    padding: 0 0.5rem;
    outline: none;
  }

  /*----------------------
    下拉栏样式配置
    ----------------------*/
  .dropdown-selected .dropdown-menu {
    display: block;
  }

  .dropdownContain {
    position: absolute;
    width: inherit;
    padding: 0 4px;
  }

  .dropdown-menu {
    display: none;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    margin-top: 6px;
    padding: 10px 0;
    float: left;
    background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,.1);
    border: 1px solid hsla(217,5%,71%,.45);
  }

  .dropdown-menu a {
    color: #71777c;
  }

  .dropdown-menu a:hover {
    background: #dcdcdc;
  }

  /*----------------------
    css3过度动画
    ----------------------*/
  /*参考自layui-anim-upbit*/
  .anim-upbit {
    animation-duration: .3s;
    animation-fill-mode: both;
    animation-name: upbit;
  }

  @keyframes upbit {
    0% {
      transform: translate3d(0,30px,0);
      opacity: .3;
    }
    100% {
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }
  /*----------------------
    头像样式配置
    ----------------------*/
  .nav-image {
    height: 3rem;
    width: 3rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    overflow: hidden;
    z-index: 0;
  }
</style>