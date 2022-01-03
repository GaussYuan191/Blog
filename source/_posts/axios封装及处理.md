---
title: axios封装及处理
categories:
  - - 网络请求
tags:
  - axios
mathjax: false
abbrlink: 47662
date: 2021-10-14 18:02:28
updated: 2021-10-14 18:02:28
---

![](/gallery/axios.jpg)

<!-- more -->

# axios封装以处理

### 接口封装必要性

在大型前端项目中，当有很多接口实现数据输入、流出并附加拦截，结合状态管理，抵御XSRF攻击等时，统一管理API接口就成为大型前端项目必须面对的环节。axios作为最流行的基于Promise的HTTP库可以同时运行在浏览器端和服务器端，已经成为大部分前端项目的首选。

### POST序列化

通过`JSON.stringify`我们同样可以实现序列化,但是对于复杂`ObjectJSON.stringify`的支持行不如`qs.stringify`。所以通过引入qs这个库，qs可以帮我们对深层嵌套的JSON以及Array形式进行序列化，让我们的API封装兼容更多的场景。

```js
var a = {name:'hehe',age:10};
 qs.stringify(a)
// 'name=hehe&age=10'
JSON.stringify(a)
// '{"name":"hehe","age":10}'
```

例外：现在后台工程大多可以在body里面获取json，array等，某些情况下，可能后台是直接读取的字符串信息，这种情况下，qs.stringify封装参数中的JSON以及Array格式无法获取，需要使用`JSON.stringify`去处理

### axios 对于配置的处理

在正式进行axios二次封装之前，简单了解一下axios对于配置项的处理；可以从axios暴露出来的方法了解，可以在axios.defaults上配置config，也可以在拦截器上以及新的instance config上去配置；通过阅读源码，发现其实axios的config配置是通过merge方法去实现的：

```js
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```

axios default以及新的instance的config之外，也提供了初始化的默认config；

```js
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}
```

axios的config是这样一个逻辑：

1.默认的初始化config与defaultconfig进行merge

2.将第一步得到的结果和新instance上的config进行merge

通过分析，我们可以直接将请求的接口进行配置化处理，更方便的一步化适应各种场景

#### default config

axios给我提供了一个default系列的属性，可以直接向`axios.default`的一些属性赋值，这个`axios.default`的赋值会作用给所用axios请求；官方文档给我提供了一些参考：比如设置默认的baseURL，为基于token的请求把token放到header的Authorization中，以及设置post的请求类型；

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#### 请求拦截以及响应拦截

作为一个出色的http请求库，axios提供了强大请求拦截和响应拦截功能。

##### 请求拦截

```js
//引入vuex
import store from '@/store'
...
axios.interceptors.request.use(config => {
  //将token添加到了request的header里面
  const token = store.state.token;
  config.headers.common['Authorization'] = token
  // loading
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})
```

通过拦截器可以实现请求的前置操作，例如，这里实现了比较常见的将token添加到header中。当然，在default中处理token也是可以的。所以网上大部分对拦截器的操作都是可以放到defaults中执行的，并没有什么区别；个人认为请求前拦截可以结合一些定时器已经前端监控相关插件的使用。

##### 响应拦截

需要注意一下响应拦截的执行顺序，先执行`axios.interceptors.response.use`然后再执行正常的响应处理;

```js
// 响应拦截器
axios.interceptors.response.use(    
    response => {
        // 这里的response返回的HTTP状态码为2XX的情况，可以在这里集中处理200+JSON形式中JSON中前后端约定的状态码
    },   
    //这里的error返回的是HTTP状态码不是2XX的情况，可以在这里处理不同HTTP的status
    error => {            
        if (error.response.status) {            
            switch (error.response.status) {                
                case 401:                    
                //未登录的处理              
                case 403:
                //权限不足的处理                
                    break; 
                case 404:
              // 404请求不存在的处理
                    break;
                // 其他错误，直接抛出错误提示
                default:
                //默认处理
            }
            return Promise.reject(error.response);
        }
    }    
});
```

### axios完全配置化

通过上面对axios的具体config分析，我们可以通过增加merge结合封装方法来实现多种场景的配置；可以实现诸如，是否跨域携带cookie，是否附带loading，配置特殊接口的请求时常等待等

可以创建一个config.js

```js
const configMap = {
  defaultConfig: {
    withCredentials: false,
    baseURL: path.baseUrl,
    headers: {
      post: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    },
  },
  long: {
    timeout: 60000,
  },
  nocookie: {
    withCredentials: false,
  },
  ...
```

通过在httpjs中引入

```js
import configMap from './config'
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
import merge from 'lodash.merge'
...
merge(axios.defaults, configMap['defaultConfig'])
function handleTypeString(type) {
  type.toLowerCase().split('-').map(item => merge(axios.defaults, configMap[item]))
}
export default {
  post(url, data, type) {
    handleTypeString(type)
    return axios({
      method: 'post',
```

这样可以实现多个接口请求的配置组合，后面的会覆盖前面的，一个接一个，实现axios请求的完全配置化处理；

在vue中使用

```js
import http from "@/api/http";
import path from "@/api/path";
//配合async await更加优雅
async test() {
  const res = await http.post(path.test, params, "long-nocookie");
```

有些人比较喜欢使用偏函数的方式再包装一层，也可以再增加封装一层使调用时候直接使用。

```js
test(param)
```

### 全局loading状态的处理

封装loading.js来处理部分url请求接口需要loading菊花图的情况；需要设置needLoadingCount来记录处理多个需要loading请求接口处理的情况。

```js
import { Loading } from 'element-ui';
let loading; 
function startLoading() { // 使用Element loading.tart 方法
  loading = Loading.service({
    lock: true,
    text: 'loading……',
    background: 'rgba(0, 0, 0, 0.5)',
  });
}
function endLoading() { // 使用Element loading.close 方法
  loading.close();
}
//通过needLoadingCount来记录，在多个地方使用loading时候处理
let needLoadingCount = 0;
export function showLoading() {
  if (needLoadingCount === 0) {
    startLoading();
  }
  needLoadingCount++;//eslint-disable-line
}
export function tryHideLoading() {
  if (needLoadingCount >= 0) needLoadingCount--;//eslint-disable-line
  if (needLoadingCount === 0) {
    endLoading();
  }
}
```

在http中配置

```js
    if (type === 'long') {
      showFullScreenLoading()
      return axios(config).then(response=>{
         tryHideFullScreenLoading()
         rerurn response;
      })
    }
    //其他无loading的axios请求
     return axios(config)
```

### 多种环境切换的封装

在前后端分离的spa场景下，axios的baseUrl等各种环境参数是预先设定好的；然后打包成静态文件，上传到nginx或者tomcat类似的http服务器中，从本地开发到测试，提供静态文件给不同的后台去使用，可能不同后台设置的接口地址是不一样的，为了避免一个个的去打包，我们需要配置一个针对不同域名环境的封装；

```js
import merge from 'lodash.merge'
const path = {
  baseUrl: 'http://localhost:3000',
  login: '/users/login',
  test: '/test',
};
const pathMap = {
  'http://localhost:3001': { baseUrl: 'http://localhost:3001' },
    'http://localhost:3002': { baseUrl: 'http://localhost:3002',login:'/login' },
}

const getClientIdByLocation = () => {
  const { href } = window.location;
  const matchedKey = Object.keys(pathMap).filter(url => href.indexOf(url) > -1);
  merge(path, pathMap[matchedKey])
};
getClientIdByLocation();
export default path;
```

可以通过直接在pathMap中配置不同的url对应的path对象，来实现处理不同的url对应的baseUrl以及各种子路由情况不同时候的情况
