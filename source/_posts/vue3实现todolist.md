---
title: vue3实现todolist
categories:
  - - vue3
tags:
  - todolist
mathjax: false
abbrlink: 8383
date: 2021-10-26 21:32:55
updated: 2021-10-26 21:32:55
---

![](/gallery/vue3-todolist-index.jpg)

<!-- more -->

今天来做一个Vue3的小demo，UI框架使用Vant。

## 准备工作

### 安装依赖

```js
vue create vue3-todolist    //使用vue-cil创建vue3工程
yarn add vant@next -S       //安装vant
yarn add vue-router@4       //安装路由
yarn add vuex@next          //安装 vuex
```

### 创建文件

- 在src中创建store、router文件夹，分别在文件夹中创建index.js

![](/gallery/vue3-todolist-createpackage.jpg)

- 在main.js中引用

```js
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Vuex from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App);

app.use(Router).use(Vuex).use(Vant).mount('#app');

```

## 编写代码

### 登录页面

先在src中创建page文件夹，再在login文件下创建login.vue文件

