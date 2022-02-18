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

## 单列布局

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

**上下固定，中间自适应的单列布局**

- flex

父元素设置flex布局，flex-direction:column,上下固定高度，中间flex设为1即可

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>中间自适应的上中下布局</title>
    <style>
      .box {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 400px;
        margin: 0 auto;
      }
      .main {
        flex: 1;
        background-color: red;
      }
      .header {
        height: 100px;
        background-color: yellow;
      }
      .footer {
        height: 100px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="header"></div>
      <div class="main"></div>
      <div class="footer"></div>
    </div>
  </body>
</html>

```

- float+calc

给元素设置float，固定宽度，元素会纵向排布，上下固定高度，中间元素利用calc计算出高度

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>浮动单列布局</title>
    <style>
      .box {
        height: 100vh;
        width: 400px;
        margin: 0 auto;
      }
      .header, .main, .footer {
        float: left;
        width: 400px;
      }
      .main {
        background-color: red;
        height: calc(100vh - 200px);
      }
      .header {
        height: 100px;
        background-color: yellow;
      }
      .footer {
        height: 100px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="header"></div>
      <div class="main"></div>
      <div class="footer"></div>
    </div>
  </body>
</html>

```

gird

父元素设置display:grid,grid-template:rows:100px 1fr 100px;

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>grid布局</title>
  <style>
     .box {
        display: grid;
        height: 100vh;
        width: 400px;
        margin: 0 auto;
        grid-template-rows: 100px 1fr 100px;
      }
      .main {
        background-color: red;
      }
      .header {
      
        background-color: yellow;
      }
      .footer {
      
        background-color: green;
      }
  </style>
</head>
<body>
  <div class="box">
    <div class="header"></div>
    <div class="main"></div>
    <div class="footer"></div>
  </div>
</body>
</html>
```



## 两列自适应布局

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

## 三栏布局

**特征：中间列自适应宽度，旁边两侧固定宽度**

### 圣杯布局

圣杯布局特点
（1）父元素包含三个元素，分别设置他们左浮动
（2）中间的盒子宽度设置为100%，自适应，并且在三个元素的最前面显示，第一个渲染
（3）左右两边使用margin-left的负值，使他们与中间的盒子同行，（左边：-100%，右边：-右边盒子的宽度）
（4）中间的盒子width:100%后，需要父元素通过padding设置左右两边空白，为左右两边的盒子留同等大小的空间
（5）设置左右两边position:relative,通过left移动位置

**比较特殊的三栏布局，同样也是两边固定宽度，中间自适应，唯一区别是dom结构必须是先写中间列部分，这样实现中间列可以优先加载**。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>圣杯布局-float</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        padding: 0 100px;
        overflow: hidden;
      }
      .middle {
        background: paleturquoise;
        float: left;
        width: 100%;
      }
      .left {
        background: palevioletred;
        float: left;
        width: 100px;
        margin-left: -100%;
        position: relative;
        left: -100px;
      }
      .right {
        background: purple;
        float: left;
        width: 100px;
        margin-left: -100px;
        position: relative;
        left: 100px
      }
      header,
      footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid deeppink;
        background: pink;
      }
    </style>
  </head>
  <body>
    <header>上</header>
    <div class="container">
      <div class="middle">中</div>
      <div class="left">左</div>
      <div class="right">右</div>
    </div>
    <footer>下</footer>
  </body>
</html>

```

![](/gallery/css-shengbei.png)

### 双飞翼布局

**同（1）（2）（3）同上
  （4）给中间元素设置子元素，并给其设置其margin-left 和 margin-right值，为左右盒子留位置**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>圣杯布局-float</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        overflow: hidden;
      }
      .middle {
        background: paleturquoise;
        float: left;
        width: 100%;
      }
      .middle div {
          margin: 0 100px;
      }

      .left {
        background: palevioletred;
        float: left;
        width: 100px;
        margin-left: -100%;
      }
      .right {
        background: purple;
        float: left;
        width: 100px;
        margin-left: -100px;
      
      }
      header,
      footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid deeppink;
        background: pink;
      }
    </style>
  </head>
  <body>
    <header>上</header>
    <div class="container">
      <div class="middle">
          <div>中</div>
      </div>
      <div class="left">左</div>
      <div class="right">右</div>
    </div>
    <footer>下</footer>
  </body>
</html>

```

![](/gallery/css-shuangfeiyi.png)

### flex

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      header,
      footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid deeppink;
        background: pink;
      }
      .container {
        display: flex;
      }
      .middle {
        background: paleturquoise;
        width: 100%;
        flex: 1;
      }
      .middle div {
        margin: 0 100px;
      }

      .left {
        background: palevioletred;
        width: 100px;
      }
      .right {
        background: purple;

        width: 100px;
      }
    </style>
  </head>
  <body>
    <header>上</header>
    <div class="container">
      <div class="left">左</div>
      <div class="middle">
        <div>中</div>
      </div>
      <div class="right">右</div>
    </div>
    <footer>下</footer>
  </body>
</html>

```

### grid

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      header,
      footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid deeppink;
        background: pink;
      }
      .container {
        display: grid;
        grid-template-columns: 100px 1fr 100px;
      }
      .middle {
        background: paleturquoise;
      }
      .middle div {
        margin: 0 100px;
      }

      .left {
        background: palevioletred;

      }
      .right {
        background: purple;


      }
    </style>
  </head>
  <body>
    <header>上</header>
    <div class="container">
      <div class="left">左</div>
      <div class="middle">
        <div>中</div>
      </div>
      <div class="right">右</div>
    </div>
    <footer>下</footer>
  </body>
</html>

```

