---
title: HTML5标签大全
categories:
  - - null
tags:
  - null
mathjax: false
abbrlink: 15479
date: 2021-04-15 20:15:16
updated: 2021-04-15 20:15:16
---

HTML5标签总结

<!-- more -->

本篇文章想梳理下HTML5 中的标签，下面就让我们开始吧。

### HTML5 <!DOCTYPE>标签

 这个标签是我们打开一个HTML文件看到的第一个标签，那它有什么作用吗？ 我们来看解释 <!DOCTYPE>是一种标准通用标记语言的文档类型声明，该声明很重要。通过该标签，浏览器能够了解HTML5文档正在使用HTML规范，它是起点，必须位于文档的第一行。如果少了，有些标签可能不支持了。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>文档标题</title>
</head> 
<body>
文档内容......
</body> 
</html>
```

### 简要介绍

```html
1、Web标准介绍
    * web应用领域：
        PC端
        移动端
    * 网页介绍
        ** 组成：文字、图片、按钮、视频、音频。。。。这些元素组成
        ** web标准：制作网页的规范
            结构标准（HTML）
            表现标准（CSS:美化网页）
            行为标准(JavaScript：非常强大的语言)
2、基本工具介绍
    subline:
        Ctrl+N,Ctrl+S
        HTML文件：按住！+tab可以自动生成模板
        快速复制：Ctrl+Shift+D或者p*10+tab
        快速输入标签：div.(标签.)+tab
        快速选中一行：Ctrl+N
        查找替换：Ctrl+H

3、HTML标签
    * 单标签：
        注释：<!--注释信息--> 快捷键：Ctrl+/
        换行标签：<br>
        横线标签：<hr>
    * 双标签：
        标题标签：<h1></h1>;<h2></h2>;<h3></h3>;<h4></h4>;<h5></h5>;<h6></h6>(从大到小)
            注意：一个网页中1号标题标签最好出现一次
        段落标签：<p></p>
        强调标签：
            文本标签:<font color="颜色属性" size="大小">改变属性</font>   
            加粗标签:<strong>加粗</strong>或者<b>加粗</b>
            文字斜体:<em>斜体</em>或者<i>斜体</i>
            下划线:<ins>下划线</ins>或者<u>下划线</u>
            删除线:<del>删除线</del>或者<s>删除线</s>
        没有语义的双标签：
                <div>实现网页布局</div> <!-- 自己独占一行（块元素），可以包含任何标签-->
                <span>在网页布局过程中使用</span> <!-- 不会发生换行（行元素） -->

    * 多媒体标签
        图片标签:<img src="设置一个图片的路径" title="显示鼠标悬停文字提示" alt="图片显示不出来时，显示对图片的描述信息，并不是给用户看的，给搜索引擎提供搜索服务" width="宽度(有一个宽高比，防止图片失真，改变一个属性就可以)" height="高度">
    * 路径问题
        绝对路径：
            ** 带有磁盘目录的路径
            ** 带有具体网址

        相对路径：
            ** 如果资源文件(img)和当前文件(html)文件在同一个文件夹中，只要写文件的名称即可
            ** 如果资源文件(img)在当前文件的下一级目录:src='image/1.bmp'
            ** 如果资源文件(img)在当前文件的上一级目录:src='../../image/1.bmp'
    * 超链接
        <a href="涉及到相对路径和绝对路径问题" title="显示文字提示">不跳转到任何页面写"#"</a>
        <a href="#" target="默认值'_self':在当前页面中显示跳转页面，'_blank':跳转到新的窗口中打开页面">不跳转到任何页面</a>
        超链接跳转页面的其他写法：在<head><base target="_blank"></head>，跳转到新的窗口中（对当前页面的任何超链接都有效）

    * 锚链接(超链接的另外一种用法，实现的是本页面的内部的跳转)
        <a href="#">跳转到顶部</a>
        <a href="#ID值">跳转到固定部分</a>
    * 特殊符号
        "空格字符": &nbsp:
        "<": &lt;
        ">": &gt;
        "&":&amp;
        "￥":&yen;
        "版权":&copy;
        "注册商标":&reg;
        "摄氏度":&deg;
        "正负号":&plusmn;
        "乘号":&times;
        "除号":&divide;
        "平方2":&sup2;
        "平方3":&sup3;
    * HTML5里面的标签(补充):
        *  版本介绍;
            html:4s+tab或者4t+tab或者xt=tab：产生不同的HTML版本，过渡版本和严格版本
            过渡版本Transitional：可以包含所有的html元素(标签)和属性
            严格版本strict：可以包含所有的html元素(标签)和属性，但是不包含已经废弃掉的标签，例如font、i和属性（align属性）

        * 新标签：
            <nav>导航标签</nav>
            <section>区域</section>
            <footer>底部</footer>
            <aside>侧边栏</aside>
            <article>文章</article>
            <!-- 注意:以上的标签和div的用法一样，如果在IE浏览器中无法显示上面的标签，只需要CSS样式中动态的写一个相同名字的标签即可 -->
            <!-- 视频标签 -->
            <video src="movie.mp4" controls="显示控制面板" autoplay="自动播放" loop="循环播放"></video>
            <video src="movie.mp4" controls autoplay loop width="500"></video>
            <!-- 宽度高度只设置一个即可 -->
            <!-- 多种视频格式 -->
            <video controls >
                <source src="movie.mp4" type="">
                <source src="movie.mp3" type="">
                <source src="movie.rmvb" type="">

            </video>

            <!-- 音频标签 -->
            <audio src="See You Again.mp3" controls autoplay loop></audio>
            <audio src="See You Again.mp3"></audio>



```

