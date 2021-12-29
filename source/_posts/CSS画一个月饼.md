---
title: CSS画一个月饼
categories:
  - - CSS
tags:
  - CSS
mathjax: false
abbrlink: 4214
date: 2021-09-21 22:09:07
updated: 2021-09-21 22:09:07
---

今天是中秋节准备整个活，用CSS画一个月饼

![](/gallery/moon.png)

<!-- more -->

开始整活

工具：webstorm，nginx，阿里云服务器

## 画一个月饼

### 画一个圆

使用flex布局画一个圆同时给上背景色

```html
<div class="main">
    <div class="cake">
    </div>
</div>
```



```css
body {
    background-image: linear-gradient(110deg, rgba(73, 93, 109, 1) 0%, rgba(49, 55, 82, 1) 100%);
}  /*线性渐变*/
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
}
.cake {
    width: 250px;
    height: 250px;
    left: 10px;
    border-radius: 50%;
    position: relative;
    background-color: var(--base-color);
    animation: moon 4s infinite ;
}
```

![](/gallery/moon-1.jpg)

使用伪元素画月饼的边

```html
<div class="main">
    <div class="cake">
        <div class="edge"></div>
        <div class="edge"></div>
    </div>
</div>
```



```css
.edge {
    background-color: var(--base-color);
    width: 100px;
    height: 250px;
    position: absolute;
    border-radius: 50px;
    transform: translateX(-50%) scale(1.05);
    left: 50%;
    top: 0;
    box-shadow: inset 0px 0px 18px rgba(0, 0, 0, .2);
}
.edge::before,
.edge::after {
    content: '';
    display: block;
    background-color: inherit;
    width: inherit;
    height: inherit;
    position: inherit;
    border-radius: inherit;
    left: inherit;
    top: inherit;
    box-shadow: inherit;
}

.edge::before {
    transform: translateX(-50%) scale(1.03) rotateZ(-30deg);
}

.edge::after {
    transform: translateX(-50%) scale(1.03) rotateZ(-60deg);
}

.edge:nth-child(2) {
    transform: translateX(-50%) scale(1.05) rotateZ(90deg);
}
```

![](/gallery/moon-2.jpg)

以同样的方法画月饼里面

```html
<div class="main">
    <div class="cake">
        <div class="edge"></div>
        <div class="edge"></div>
        <div class="bevel">
            <div class="edge"></div>
            <div class="edge"></div>
        </div>
        <div class="inner">
            <div class="edge"></div>
            <div class="edge"></div>
        </div>
    </div>
</div>
```

```css
.bevel {
    width: 250px;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-sizing: border-box;
    transform: scale(0.93);
}
.bevel .edge {
    background-color: var(--light-color);
    box-shadow: none;
}

.bevel .edge::before,
.bevel .edge::after {
    box-shadow: none;
}

.inner {
    width: 250px;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-sizing: border-box;
    transform: scale(0.88);
}

.inner .edge {
    background-color: var(--surface-color);
    box-shadow: none;
}

.inner .edge::before,
.inner .edge::after {
    box-shadow: none;
}
```

![](/gallery/moon-3.jpg)

写上文字

```html
<div class="text">
    <span>中秋快乐</span>
</div>
```

```css
.text {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);

    display: flex;
    justify-content: center;
    align-items: center;

    border: 8px solid var(--light-color);
    border-radius: 40px;

    background-image: linear-gradient(315deg, rgba(211, 129, 18, 1) 0%, rgba(233, 141, 30, 1) 100%);
}

.text span {
    font-size: 60px;
    line-height: 60px;
    width: 120px;
    font-family: Helvetica;
    font-weight: bold;
    color: var(--light-color);
}
```

![](/gallery/moon-4.jpg)

## 添加背景图片

先从网上那个找一张背景图片

![](/gallery/moon-old.jpeg)

使用PS把图上文字P掉加上去

![](/gallery/moon-new.png)

```html
<img class="img" src="img/moon.png" alt="X">
```

```css
.img {
    display: block;
    height: auto;
    max-width: 100%;
}
```

 调整下图片的位置，效果图如下

![](/gallery/moon-5.jpg)

## 给月饼添加一个简单的动画

给月饼添加一个旋转的动画

```css
@keyframes moon {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
```

## 添加一首音乐

```HTML
<audio autoplay="autoplay" controls="controls" loop="loop" id="bg-music">
    <source src="audio/但愿人长久-王菲.mp3" type="audio/mpeg" hidden="true"></source>
</audio>
```

搞定了 最终的效果图如下

![](/gallery/moon-6.jpg)

附上源码：https://github.com/GaussYuan191/CSSTest/tree/main/%E6%9C%88%E9%A5%BC
