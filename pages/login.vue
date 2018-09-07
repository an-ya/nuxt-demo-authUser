<template>
  <div class="container">
    <div class="flexBox" v-if="!$store.state.authUser">
      <div class="imgSwiper">
        <img v-if="loginUserPhotoUrl !== ''" :src="loginUserPhotoUrl" :style="{ opacity: showPhoto ? '1' : '0' }" class="userPhoto"/>
      </div>
      <div style="">
        <Form ref="formLogin" :model="form" :rules="formRule" :label-width=0>
          <FormItem prop="username">
            <Input v-model="form.username" name="username" placeholder="输入用户名">
              <Icon type="ios-contact" slot="prefix"/>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input v-model="form.password" name="password" placeholder="输入密码" type="password">
              <Icon type="md-key" slot="prefix"/>
            </Input>
          </FormItem>
          <div>
            <Button type="primary" style="width: 200px;margin-right: 20px;" :loading="load" @click="confirm('formLogin')">登录</Button>
            <Button type="default" @click="$router.push('/')">回到首页</Button>
          </div>
        </Form>
      </div>
    </div>
    <div v-else>
      <h1 class="title">Hi ! {{ $store.state.authUser.username }}!</h1>
      <h2 class="info">您已经登录</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      load: false,
      form: {
        username: '',
        password: ''
      },
      formRule: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      },
      showPhoto: true,
      loginUserPhotoUrl: '/img/default.png'
    }
  },
  head () {
    return {
      title: '登录'
    }
  },
  created () {
    this.debouncedGetUserPhoto = this._.debounce(this.getUserPhoto, 500)
  },
  mounted () {},
  watch: {
    'form.username' (newOne, oldOne) {
      this.debouncedGetUserPhoto(newOne)
    }
  },
  methods: {
    confirm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    login () {
      this.load = true
      return this.$store.dispatch('login', {
        username: this.form.username,
        password: this.form.password
      }).then((data) => {
        if (data.code === 1) {
          this.form.username = ''
          this.form.password = ''
          this.loginUserPhotoUrl = '/img/default.png'
        } else if (data.code === 2) {
          this.$Notice.error({
            title: '失败',
            desc: data.message
          })
        }
        this.load = false
      })
    },
    getUserPhoto (val) {
      if (val !== '' && val !== undefined) {
        this.$http.post('api/userPhoto', { email: val }).then(({ data }) => {
          if (data.code === 1) {
            this.showPhoto = false
            setTimeout(() => {
              this.loginUserPhotoUrl = this.$config.imgBaseURL + data.userPhoto
              this.showPhoto = true
            }, 300)
          } else {
            if (this.loginUserPhotoUrl !== '/img/default.png') {
              this.showPhoto = false
              setTimeout(() => {
                this.loginUserPhotoUrl = '/img/default.png'
                this.showPhoto = true
              }, 300)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .imgSwiper {
    margin-right: 20px;
  }

  .userPhoto {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transition: 0.3s;
  }

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