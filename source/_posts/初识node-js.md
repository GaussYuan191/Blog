---
title: node.js搭建服务器
categories:
  - - node.js
tags:
  - - 搭建服务器
mathjax: false
abbrlink: 47877
date: 2021-03-27 09:51:40
updated: 2021-03-27 09:51:40
---

# Nodejs搭建服务器及express编写接口

<!-- more -->

 Nodejs用http模块搭建http服务器：

```js
//引入http模块
var http = require("http");
var url = require('url');
//设置主机名
var hostName = '192.168.1.7';
//设置端口
var port = 8092;
 
//创建服务
var server = http.createServer(function (req, res) {
    var string = url.parse(req.url, true);
    console.log("URL:" + req.url + "  " + string.pathname);
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'text/plain');
    res.end("hello nodejs");
 
});
server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
});
```

效果如图所示

![](/gallery/node-http-server.png)

用Nodejs的express搭建http服务器：

```js
var express = require('express')
var bodyParser = require('body-parser');
//设置主机名
var hostName = '192.168.1.7';//172.50.4.113  192.168.1.130
//设置端口
var port = 8092;//8086
var app = express();
var routes = express.Router();
//设置路由访问路径和静态资源目录
app.use("/a", express.static('public'))
app.use("/a", routes);
// app.use(express.static('./'));
var server = app.listen(port, hostName, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`服务开启成功【端口号:${port}】`)
    }
});
```

用express搭建GET请求接口：

```js
/**
 * express建立GET接口
 * http://192.168.1.7:8092/a/ab?name='name12'&pwd='123'
 */
routes.get('/ab', (req, res) => {
    var string = url.parse(req.url, true);
    //解析参数
    var params = url.parse(req.url, true).query;
    console.log(params)
    var user = {};
    user.name = params.name;
    user.pwd = params.pwd;
    var responseJson = { name: 'abc', pwd: '123' };
    var response = { status: 2, data: user };
    res.send(JSON.stringify(response));
    console.log("URL:" + req.url + "  " + string.pathname);
    res.status(200).json(response);
    //有数据返回用res.send();
    //无数据返回用res.end();
    // res.end("hello nodejs");
});
```

用express搭建POST请求接口：

```js
/**
 * express建立POST接口
 */
routes.post('/r', (req, res) => {
    var string = url.parse(req.url, true);
    console.log("URL:" + req.url + "  " + string.pathname);
    //解析参数
    var params = req.body;
    var user = {};
    user.name = params.name;
    user.pwd = params.pwd;
    var response = { status: 1, data: user };
    res.send(JSON.stringify(response));
    res.send('post:' + string.pathname + "  " +
        JSON.stringify(text));
    res.end();
    console.log(req.method);//post
    console.log(req.body);//{ a: '3', b: '4', c: '5' }
    // console.log(req.body.a); //3
    // res.end("hello nodejs");
});
```

