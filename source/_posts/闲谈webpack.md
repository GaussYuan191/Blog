---
title: 闲谈webpack
categories:
  - - 资源构建工具
tags:
  - webpack
mathjax: false
abbrlink: 7780
date: 2021-10-19 15:43:42
updated: 2021-10-19 15:43:42
---

![](/gallery/webpack-img.jpeg)

<!-- more -->

# webpack

Webpack 是一个前端资源的打包工具，它可以将js、image、css等资源当成一个模块进行打包。
中文官方网站：https://www.webpackjs.com/

**打包的好处**：

- 将许多碎小文件打包成一个整体，减少单页面内的衍生请求次数，提高网站效率。
- 将ES6的高级语法进行转换编译，以兼容老版本的浏览器。
- 将代码打包的同时进行混淆，提高代码的安全性。

1、安装
webpack支持全局安装和本地安装，官方推荐是本地安装
输入命令：npm install webpack --save-dev
webpack 4+ 版本，还需要安装 CLI ，输入命令：npm install webpack webpack-cli --save-dev
2、核心概念
学习Webpack，需要先理解四个核心概念：

入口(entry)
webpack打包的起点，可以有一个或多个，一般是js文件。webpack会从起点文件开始，寻找起点直接或间接依赖的其它所有的依赖，包括JS、CSS、图片资源等，作为将来打包的原始数据
输出(output)
出口一般包含两个属性：path和filename。用来告诉webpack打包的目标文件夹，以及文件的名称。目的地也可以有多个。
加载器（loader）
webpack本身只识别Js文件，如果要加载非JS文件，必须指定一些额外的加载器（loader），例如css-loader。然后将这些文件转为webpack能处理的有效模块，最后利用webpack的打包能力去处理。
插件(plugins)
插件可以扩展webpack的功能，让webpack不仅仅是完成打包，甚至各种更复杂的功能，或者是对打包功能进行优化、压缩，提高效率。
