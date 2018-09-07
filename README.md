# nuxt-demo-authUser

nuxt实例项目，以nodejs作为中间层负责保存session存储用户状态，并向后台服务器请求数据。

项目使用vue-cli安装的express-template模板：

``` bash
$ vue init nuxt-community/express-template <project-name>
```

模板使用eslint做代码规范，建议设置缩进：

``` javascript
js: {
    Tab size: 2,
    Indent: 2,
    Continuation indent: 2 
}
css: {
    Tab size: 2,
    Indent: 2,
    Continuation indent: 4 
}
html: {
    Tab size: 2,
    Indent: 2,
    Continuation indent: 4 
}
```

项目用户认证逻辑思路主要参考[nuxt-AuthRoutes-example](https://nuxtjs.org/examples/auth-routes)

## 启动

``` bash
# 安装
$ npm install # Or yarn install

# 在localhost:3000启动热重载服务器
$ npm run dev

# 打包并运行
$ npm start
```

## 注意

该项目并非独立运行，需要向后台服务器请求数据，接口包括：

 - `/api/loginUser    //处理登录`
 - `/api/getUserById    //获取指定id用户信息`
 - `/api/getUserPhoto    //获取指定用户名（邮箱）用户的头像图片路径`

实例spring框架代码如下：

``` java
{
    @Autowired
    UserDao udb;

    @RequestMapping(value = "/api/loginUser", produces = "text/json; charset=utf-8")
    @ResponseBody
    public String apiLoginUser(String email, String password) {
        String result = "";
        User tempUser = udb.findByEmail(email);
        if (tempUser == null) {
            result = "{\"code\": " + 2 + "}";
        } else {
            String photo = tempUser.getPhoto();
            if (photo == null) {
                result = "{\"code\": " + 1 + ",\"username\":\"" + tempUser.getName() + "\",\"userId\":" + tempUser.getUser_id() + ",\"userPhoto\":\"/img/user/default.png\"}";
            } else {
                result = "{\"code\": " + 1 + ",\"username\":\"" + tempUser.getName() + "\",\"userId\":" + tempUser.getUser_id() + ",\"userPhoto\":\"" + "/upload/img/user/" + tempUser.getPhoto() + "\"}";
            }
        }

        return result;
    }

    @RequestMapping(value = "/api/getUserById", produces = "text/json; charset=utf-8")
    @ResponseBody
    public String apiGetUserById(int userId) {
        System.out.println(userId);
        String result = "";
        User tempUser = udb.findById(userId);
        if (tempUser == null) {
            result = "{\"code\": " + 2 + "}";
        } else {
            String photo = tempUser.getPhoto();
            if (photo == null) {
                result = "{\"code\": " + 1 + ",\"username\":\"" + tempUser.getName() + "\",\"userId\":" + tempUser.getUser_id() + ",\"userPhoto\":\"/img/user/default.png\"}";
            } else {
                result = "{\"code\": " + 1 + ",\"username\":\"" + tempUser.getName() + "\",\"userId\":" + tempUser.getUser_id() + ",\"userPhoto\":\"" + "/upload/img/user/" + tempUser.getPhoto() + "\"}";
            }
        }

        return result;
    }

    @RequestMapping(value = "/api/getUserPhoto", produces = "text/json; charset=utf-8")
    @ResponseBody
    public String apiGetUserPhoto(String email) {
        String result = "";
        User tempUser = udb.findByEmail(email);
        if (tempUser == null) {
            result = "{\"code\": " + 2 + "}";
        } else {
            String photo = tempUser.getPhoto();
            if (photo == null) {
                result = "{\"code\": " + 1 + ",\"userPhoto\":\"/img/user/default.png\"}";
            } else {
                result = "{\"code\": " + 1 + ",\"userPhoto\":\"" + "/upload/img/user/" + tempUser.getPhoto() + "\"}";
            }
        }

        return result;
    }
}
```

上述代码我在服务器`https://www.lrowy.com`上已经提供，配置在：

1、项目目录`api/routes/users.js`中：

``` javascript
// 生成初始化的实例，设置基础后台服务器api地址
const Axios = axios.create({
  baseURL: 'https://www.lrowy.com/api'
})
```

2、项目目录`plugins/http.js`中：

``` javascript
let config = {
  // 如果图片在接口中返回了全路径就不需要此项
  imgBaseURL: 'https://www.lrowy.com'
}
```

## 线上样例

[https://www.lrowy.com:7990](https://www.lrowy.com:7990)
