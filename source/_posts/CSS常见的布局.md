---
title: CSS常见的布局
categories:
  - - null
tags:
  - null
mathjax: false
abbrlink: 3613
date: 2021-10-17 19:01:42
updated: 2021-10-17 19:01:42
---

![](/gallery/css-layout.jpg)

几种常见的布局

<!-- more -->

## 一、单列布局

![](/gallery/layout-one-way.jpg)

常见的单列布局有两种：

- header,content和footer等宽的单列布局
- header与footer等宽,content略窄的单列布局

先通过对header,content,footer统一设置width：1000px;或者max-width：1000px(这两者的区别是当屏幕小于1000px时，前者会出现滚动条，后者则不会，显示出实际宽度);然后设置margin:auto实现居中即可得到。text-align:center 文字水平居中，line-height:高度文字垂直居中。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>一栏布局</title>
    <style>
        .header {
            margin: 20px auto;
            max-width: 960px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background-color: red;
        }
        .content {
            margin: 20px auto;
            max-width: 960px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background-color: blue;
        }
        .footer {
            margin: 20px auto;
            max-width: 960px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background-color: yellow;
        }
    </style>
</head>
<body>
    <div class="header">头部</div>
    <div class="content">内容</div>
    <div class="footer">尾部</div>
</body>
</html>

```

![](/gallery/layout-one.jpg)

## 二、两列自适应布局

### 1.float+overflow:hidden

如果是普通的两列布局，**浮动+普通元素的margin**便可以实现，但如果是自适应的两列布局，利用**float+overflow:hidden**便可以实现，这种办法主要通过overflow触发BFC,而BFC不会重叠浮动元素。由于设置overflow:hidden并不会触发IE6-浏览器的haslayout属性，所以需要设置zoom:1来兼容IE6-浏览器。具体代码如下

```html
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>        
</div>
```

```html
.parent {
  overflow: hidden;
  zoom: 1;
}
.left {
  float: left;
  margin-right: 20px;
}
.right {
  overflow: hidden;
  zoom: 1;
}
```

## 三、三栏布局

**特征：中间列自适应宽度，旁边两侧固定宽度**

### 1.圣杯布局

#### ① 特点

**比较特殊的三栏布局，同样也是两边固定宽度，中间自适应，唯一区别是dom结构必须是先写中间列部分，这样实现中间列可以优先加载**。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>圣杯布局</title>
    <style>
        .container{
            padding: 0 200px;
        }
        .middle{
            width: 100%;
            background: paleturquoise;
            height: 200px;
            margin: 0 auto;
            float: left;
        }
        .left{
            background: palevioletred;
            width: 200px;
            height: 200px;
            float: left;
            font-size: 40px;
            color: #fff;
            margin-left:-100%;


        }
        .right{
            width: 200px;
            height: 200px;
            background: purple;
            font-size: 40px;
            float: left;
            color: #fff;
            margin-left:-200px;

        }

    </style>
</head>
<body>
<div class="container">
    <div class="middle">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
</body>
</html>

```

![](/gallery/layout-shengbei.jpg)

### 2.双飞翼布局

#### ① 特点

**同样也是三栏布局，在圣杯布局基础上进一步优化，解决了圣杯布局错乱问题，实现了内容与布局的分离。而且任何一栏都可以是最高栏，不会出问题**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>双飞翼布局</title>
    <style>
        .middle-container {
            width: 100%;
            background: paleturquoise;
            height: 200px;
            float: left;
        }
        .middle{
            margin-left: 200px;
            margin-right: 200px;
        }
        .left{
            background: palevioletred;
            width: 200px;
            height: 200px;
            float: left;
            font-size: 40px;
            color: #fff;
            margin-left:-100%;


        }
        .right{
            width: 200px;
            height: 200px;
            background: purple;
            font-size: 40px;
            float: left;
            color: #fff;
            margin-left:-200px;

        }

    </style>
</head>
<body>
<div class="container">
    <div class="middle-container">
        <div class="middle">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测</div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
</body>
</html>

```

![](/gallery/layout-shuangfeiyan.jpg)
