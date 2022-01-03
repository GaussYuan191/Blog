---
title: CSS面试题
categories:
  - - 面试
tags:
  - CSS
mathjax: false
abbrlink: 22871
date: 2021-04-22 21:29:53
updated: 2021-04-22 21:29:53
---

总结59道CSS面试题

<!-- more -->

CSS部分的面试题主要考察应试者对CSS基础概念模型的理解，例如文档流                                                                                                                                                                           、盒模型、浮动、定位、选择器权重、样式继承。CSS的基础知识在面试中也是十分重要的。

1、CSS有哪些基本选择器？它们的权重是如何表示的？

答：CSS基本的选择器有类型选择器、属性选择器和ID选择器。

CSS选择器的权重预示着CSS选择器样式渲染的先后顺序，元素样式渲染时，权值高的选择器样式会覆盖权重低的选择器样式。

通常将权重分为4个等级，可用0.0.0.0来表示4个等级。 ！important 关键词的等级优先级最高。

注意：！important并非选择器，而是针对选择器内的单一样式设置的。当然，不同选择器内应用！important的权重也是不一样的，例如，在id选择器中！important关键字权重要高于类选择器权重组合。

内联样式（非元素器）的优先级可看成1.0.0.0。id选择器的优先级为0.1.0.0。类属性选择器、属性选择器、伪类的优选级为0.0.1.0。

元素选择器、伪元素选择器的优先级为0.0.0.1。通配符选择器对特殊性没有任何贡献值。当把选择器组合使用的时候，相应的层级权重也会递增，例如# id .class的权重为0.1.1.0。

2、CSS引入方式有哪些？link 和 @import的区别是什么？

CSS有三种引入的方式。

- 行内式是指样式写在元素style属性内。

    ```css
    <div id = "content" style="position: fixed; bottom: 80px; right: 30px; opacity: 1; cursor: pointer;">这是一个div标签</div>
    ```

- 内嵌式是指将样式写在style元素内。

    ```CSS
    <style>
    * {
        magrin: 0;
        padding: 0;
    }
    <style>
    ```

- 外链式是指通过link标签，引入CSS文件内的样式。

通过link标签引入的样式与通过@import方式引入样式有如下区别。

1. 加载资源的限制。

link是XHTML的标签，除了加载CSS文件外，还可以加载RSS（简易信息聚合，内容包装和投递协议）等其他实务，如加载模板等。@import只能加载CSS文件。

2. 加载方式。

如果用link引入CSS，在页面载入时同时加载，及同步加载。

如果用@import引用CSS，则需要等到网页完全载入后，再加载CSS文件，即异步加载。

3. 兼容性

link是XHTML的标签，没有兼容问题。

@import是CSS2.1中提出的，不支持低版本的浏览器。

4. 改变样式

link的标签是DOM元素，支持使用JavaScript控制DOM和修改样式，@import是种方法，不支持控制DOM和修改样式。

3、浮动元素引起的问题和解决方法是什么？

引起的问题有如下几个。

- 父元素的高度无法被撑开，影响与父元素同级的元素。
- 与元素同级的非浮动元素会紧跟其后（类似遮盖现象）。
- 如果一个元素浮动，则该元素之前的元素也需要浮动；负责，会影响页面的结构（即通常所说的串行现象）。

解决方法如下：

- 为父元素设置固定高度。
- 为父元素设置overflow：hidden即可清除浮动，让父元素的高度撑开。
- 用clear：both样式属性清除元素浮动。

注意：如果只有左浮动或右浮动，可单独设置clear：left或clear：right，但是设置clear：both则都可以解决，所以此方法在工作中用得更多。

- 外墙法是指在父元素外面，添加“一道墙”，设置属性clear：both

- 内墙法是指在父元素内部，浮动元素的最后面，添加“一道墙”，设置属性clear：both

- 伪元素是指为了少创建元素，对父元素添加after伪元素，设置属性content：“”；dispaly:block;clear: both。（这里说的少创造元素，实际上并没有少创建元素，添加的伪元素也是元素，只不过没有写到HTML文档中而已）

- 使用通用类clearfix，clearfix的实现如下（推荐使用这种方法）

    ```css
    clearfix:after {
        dispaly:block;
        clear:both;
    }
    ```

    

4、position的值分别是相当于哪个位置定位的？

relative表示相对定位，相对于自己本身所在正常文档流中的位置进行定位。absolute表示绝对定位，相对于最近一级（从父元素往上数，直到根元素）定位，相对于static的父元素进行定位。fixed用于绝对定位，相对于浏览器窗口或者frame进行定位。static是默认值，没有定位，元素出现在正常的文档流中。sticky是生成粘性定位的元素，容器的位置根据正常文档流计算得出。

注意：CSS3的新增属性有类似于relative与fixed的结合体，如果目标区域在屏幕中可见，表现为relative；如果目标区域在屏幕中不可见，表现为fixed。

5、请说明position：absolute和float属性的区别。

共同点是对于内联元素设置float和absolute属性，可以让元素脱离文档流，并且可以设置其宽高。

不同点是float仍可占据位置，不会覆盖另一个BFC区域上，浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框为止，absolute会覆盖文档流中的其他元素，即遮盖现象。

6、CSS选择器有哪些

- id选择器（#myid)
- 类选择器（.my ClassName)
- 标签选择器（div、p、h1）
- 相邻选择器（h1 + p)
- 子选择器（ul > li)
- 后代选择器（li a)
- 通配符选择器（*）
- 属性选择器（button[disabled="true"])
- 伪类选择器（a:hover、li-child) 表示一种状态
- 伪元素选择器（li:before、：after、first-letter、first-line) 表示文档某个部分的表现

注意：在CSS3中规范，为了区别伪元素和伪类，CSS3建议伪类用单冒号“：”，伪元素用双冒号“：：”

7、CSS的那些样式可以继承？那些不可以继承？

可继承的样式有font-size font-famliy color，UL，LI DL DD DT

不可继承的样式有border、padding、margin、width、height

注意：为了方便辨识，与字体相关的样式通常可以继承，与尺寸相关的样式通常不能继承。

8、CSS优先级如何排序？

！import>style(内联)>id(权重100)>calss(权重10)>标签(权重1)。同类别的样式中，后面的会覆盖前面。

9、HTML是什么？CSS是什么？JavaScript是什么？

- HTML（Hyper Text Markup Language,超文本标记语言）是做网站时使用的文本标记标签，比如div、span等。
- CSS (Cascading Style Sheet,层叠样式表) 是做网站时为了美化网站而为标签添加的样式，比如background(背景)、color(字体颜色) height(高度)width(宽度)等。
- JavaScript 是网站中实现前后台交互效果、页面动画效果的一种开发语言，比如说鼠标单击（click）事件、前后台数据请求（Ajax)等。

10、为什么要初始化CSS？

应为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没有初始化CSS，往往会导致页面在不同页面在不同浏览器之间出现的差异。

11、如何居中div？如何居中一个浮动元素？

确定容器的宽高，例如宽400px、高200px的div。设置层的外边距。

```css
div {
    float:left;
    width: 400px;
    height: 200px;
    margin: -100px 0 0 -200px;
    position:relative;
    left:50%;
    top:50%;
    background-color:pink;
}
```

12、构成CSS的基本语句是什么？

构成CSS的基本语句如下

```html
选择器 {
 属性名称1：属性值1；
 属性名称2：属性值2；
}
```

13、display有哪些值？说明它们的作用。

display的值有block、none、inline、inline-block、list-item、table和inherit。其作用如下。

block是指块类型。默认宽度为父元素宽度，可设置宽高，换行显示。none是指元素不会显示，已脱离文档流。

inline是指行内元素类型，默认宽度为内容宽度，不可设置宽高，同行显示。

inline-block是指默认宽度为内容宽度，可设置宽高，同行显示。

list-item是指块类型元素一样显示，并添加样式列表标记。

14、简要描述块级元素和行内元素的区别。

块级元素的前后都会自动换行。默认情况下，块级元素会独占一行。例如<P> <h1-h6><div>都是块级元素，当显示这些元素中间的文本时，都将从新行中开始显示，其后的内容也将在新行中显示。

行内元素可以和其他行内元素位于同一行，在浏览器中显示时 不会换行。例如<a><span>等，对于行内元素，不能设置其高度和宽度。还有一种元素是行内元素，比如<img><input>元素等。这些元素可以和其他元素位于同一行，同时可以设置其高度和宽度。

15、如何用DIV+CSS实现3栏布局（左右固定200px,中间自适应）？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>实现3栏布局</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
<div class="container">
    <div class="main">
        <h2>有课前端网</h2>
    </div>
    <div class="left">左边内容</div>
    <div class="right">右边内容</div>
</div>
</body>
</html>

```

```css
.container div {
    height: 200px;
}
.container {
    padding: 0 200px;
}
.main, .left, .right {
    position: relative;
    float: left;
}
.left, .right {
    width: 200px;
}
.main {
    width: 100%;
    background: yellow;
}
.left {
    background: blue;
    margin-left: -100%;
    left: -200px;

}
.right {
    background: green;
    margin-left: -200px;
    left: 200px;
}

```

16、解释浮动及其工作原理

浮动元素可以向左或向右移动，直到它的外边缘碰到包含元素（父元素）或另一个浮动元素的边框为止。要想是元素浮动，必须为元素设置一个宽度（width）。虽然浮动的元素已不再文档流中，但是它浮动后所处的位置依然在浮动之前的水平方向上。

应为浮动元素不在文档流中，所以文档流中的块元素表现得像浮动元素不存在一样，下面的元素会填补原来的位置。

有些元素会在浮动元素的下方。但是这些元素的内容并不一定会被浮动的元素覆盖。当定位内联元素时，要考虑浮动元素的边界，围绕浮动元素放置内联元素。也可以把浮动元素想象成被块级元素忽略的元素，而内联元素会关注元素。

17、解释一下CSS Sprite,以及如何在网页或网站中使用它。

CSS Sprite其实就是把网页中一些背景图片整合到一张图片中，在利用CSS的“background-image“ ”background-repeat" "background-position"的组合进行背景定位，background-position可以用数字精确地定位出现背景图片的位置。

注意：在高级浏览器中，可以基于图片的bose64编码存储，将图片与其他的类型的文件打包。

18、在书写高效的CSS时有哪些问题需要考虑？

1. 样式、从右向左解析一个选择器
2. 类型选择器的速度，ID选择器最快，通配符（*）最慢，解析速度由快到慢依次是ID、class、tag、通配符。
3. 不要用标签限制ID选择器（如ul#main-navigation{},ID已经是唯一的，不需要Tag来限制，这样做会让选择器变慢）。
4. 后代选择器最糟糕（换句话说，HTML body ul li a{}这个选择器是很低效的）。
5. 想清楚你的需求，再去书写选择器。
6. CSS3的选择器（如nth-child )能够漂亮地定位我们想要的元素，又能保证CSS整洁易读。然而，这些神奇的会浪费很多浏览器资源。
7. 我们知道ID选择器的速度最快，但是如果都用ID选择器，会降低代码的可读性和可维护性等。在大型项目中，相对于使用ID选择器提升速度，代码的可读性和可维护性带来的收益更大。

19、说出几种解决IE6 bug的方法

解决方案如下：

1. 双边距问题是使用float引起的，解决方案是使用display：inline。

2. 3像素问题，是使用float引起的，解决方案是使用margin-right： -3px。

3. 超链接hover伪类样式，单击后失效，解决方案是使用一下正确的书写顺序：L->V->H->A(link,visited,hover,active)。

4. z-index问题，解决方案是给父级添加position：relative

5. PNG图片半透明问题，解决方法是使用Javascript代码库，或者使用IE滤镜

    

20、页面重构怎样操作？

编写CSS,让页面结构更加合理化，提升用户的良好的体验，达到良好的页面效果并提升性能。

21、display:none 和visibility:hidden的区别是什么？

display:none 隐藏对应元素，在文档流中不再给它分配空间，它各边的元素会合拢，即脱离文档流。

visibility:hidden隐藏对应元素，但是在文档流中仍然保留原来的空间。

22、内联元素可以实现浮动吗？

在CSS中，任何元素都可以浮动。不论浮动元素本身是何种元素都会生成个块级框。因此，对于内联元素，如果设置为浮动，会产生和块级框相同的效果。

23、简要描述CSS中content属性的作用。

content属性与：before及：after伪元素配合使用，用来插入生成的内容，可以在元素之前或之后放置生成的内容。可以插入文本、图像、引号，并可以结合计数器，为页面元素插入编号。比如下面的代码。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>demo</title>
    <style>
        body {
            counter-reset: chapter;
        }
        h1:before {
           content: "第" counter(chapter) "章";
        }
    </style>
</head>
<body>
<h1></h1>
<h1></h1>
<h1></h1>
</body>
</html>
```

使用content属性，并结合：before选择器和计数器counter，可以在每个h1元素前插入新的内容。

24、如何定义高度很小的容器？

因为有一个默认的行高，所以在IE6下无法定义小高度的容器。

两个解决方案分别是overflow：hidden 或font-size：容器高度px

25、如何在图片下方设置几像素的空白间隙？

定义img为display：block，或者定义父容器为font-size:0。

26、如何解决IE6双倍margin的bug？

使用display:inline

27、如何让超出宽度的文字显示省略号？

输入overflow：hidden；

width：xxx ;

white-space:nowrap;(规定段落中的文本不进行换行：)

text-overflow:ellipsis.( 显示省略符号来代表被修剪的文本。)

28、如何实现英文单词发生词内断行？

输入word-warp:break-word。

29、如何实现IE6下的position：fixed?

具体代码如下：

```css
html_ {
    overflow: hidden;
}
body_ {
    overflow: auto;
    height: 100%;
}
.fixed {
    position: fixed;
}
_position: absolute;
left: 0;
top: 0;
padding: 10px;
background: #000;
```

30、如何让min-height兼容IE6？

具体代码如下。

```css
.min-height {
    min-height: 100px;
    _height： 100px;
    background: red;
}
```

31、已知高度的容器如何在页面中水平垂直居中？

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>demo</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        div {
            display: inline-block;
            width: 200px;
            height: 200px;
            border: red solid 5px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -100px 0  0 -100px;
            text-align: center;
            align-items: center;
            box-sizing: border-box;
            line-height: 200px;

        }
    </style>
</head>
<body>
<div>这是一段文字</div>
</body>
</html>

```

32、px和em的区别是什么？

px和em都是长度单位，两者的区别是：px的值是固定的，指定为多少就是多少，计算比较容易；em的值不是固定的，是相等于容器字体的大小，并且em会继承父级元素的字体大小。

浏览器的默认字体高都是16px，所以未经调整的浏览器都符合lem=16px,那么12px=0.75em,10px=0.625em。与cm对应的另一个长度单位是rem,是相对于根元素(通常是HTML元素)字体的大小。

33、什么叫优雅降级和渐进增强？两者有什么区别？

优雅降级graceful degradation是指一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

渐进增强 progressive enhancement是指对低版本浏览器构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进并追加功能，以达到更好的用户体验。

两者的区别如下：

优雅降级从复杂的形状开始，并试图减少用户体验的供给。

渐进增强则从一个非常基础并且能够起作用的版本开始，并不断扩充，以适应未来环境的需要。

降级(功能衰减)意味着往前看，而渐进增强意味着朝前看，同时保证其根基处于安全地带。

34、网页制作会用到那些图片格式？

用于网页制作的主流图片格式有JPG、PNG、GIF等。

JPG：压缩率高、文件小、最常用。

PNG：支持无损压缩，色彩损失小，保真率高，文件稍大。

GIF：支持动画显示，但只支持256色显示，目前已被flash大量取代。

35、CSS的content属性专门应用在before、after伪元素上，用于插入生成的内容最常见的应用是利用伪类清除浮动。

36、对行内元素设置margin-top和margin-bottom是否起作用？

不起作用（需要注意行内元素的替换元素img、input，它们是行内元素，但是可以设置它们的宽度和高度，并且margin属性也对它们起作用，margin-top和margin-botton有着类似inline-block的行为)

37、div + css 的布局相较于table布局有什么优点？

1. 改版的时候更加方便，只需改动CSS文件。
2. 页面加载速度更快、结构清晰、页面简洁。
3. 表现与结构分离。
4. 搜索引擎（SEO）更友好，排名更加靠前。

38、如果设置<P>的font-size为10rem,那么当用户重置或拖曳浏览器窗口时，它的的文本会不会受到影响。

不会

39、谈谈你对BFC规范的理解。

BFC(block formatting context) 指块级格式化上下文，即创建了新的BFC的盒子是独立布局的，盒子里面的元素的样式不会影响到外面的元素。在同一个BFC中，两个相邻的块级盒在垂直方向的margin会发生折叠。

BFC决定元素如何对其内容进行布局，也决定与其他元素的关系和相互作用。

40、谈谈你对c规范的理解。

IFC(inline formatting context) 指内联格式化上下文，IFC的线框(line box)高度由其包含的内联元素中最高的实际高度计算出来而来(不受竖直方向的padding和margin的影响)。IFC中线框一般左右都贴紧整个IFC，但是会被float元素扰动。同一个IFC的多个线框的高度不同。IFC中是不可能有块级元素的，当插入块级元素时(如在p中插入div)，会产生两个匿名块，两者与div分隔开，即产生两个IFC，每个IFC对外表现为块元素，与div垂直。

41、谈谈你对GFC规范的理解。

GFC(GridLayout Formatting Context) 指网格布局格式化上下文，即当把一个display值设为grid的时候，此元素将会获得一个独立的渲染区域。可以通过在网格容器(grid container)上定义网格定义行(grid defintion row) 和 网格定义列(grid defintion column),在网格项目(grid item)上定义网格行(grid row)和网格列(grid column)来为每一个网格定义位置和空间。

42、谈谈你对FFC规范的理解。

FFC(flex formatting context)指自适应格式化上下文，及display的值为flex或line-flex的元素将会生成自适应容器。伸缩容器中的每一个元素都是一个伸缩单元。伸缩单元可以试任意数量的。伸缩单元和伸缩容器外的一切元素都不会受影响。简单地说，flexbox定义伸缩容器内伸缩单元的布局。

43、访问超链接后hover样式就不会出现的原因是什么？应该如何解决？

应为访问过的超链接样式覆盖了原有的hover和active伪类选择器样式，解决方法是将CSS属性的排列顺序改为L->V->H->A(link,visited,hover,active)。

44、什么是外边距重叠？重叠的结果是什么？

外边距重叠就是margin-collapse在CSS中，相邻的两个盒子(可能是兄妹关系也可能是祖先关系)的外边距可以结合成一个独立的外边距。这种合并外边距的方式称为折叠，因此而结合的外边距称为折叠外边距。

折叠结果遵循下列计算规则。

- 当两个相邻的外边距都是正数时，折叠的结果是它们两者中较大的值。
- 当两个相邻的外边距都是负数时，折叠的结果是两者中绝对值较大的值。
- 当两个外边距一正一负时，折叠的结果是两者相加的和。

45、rgba()与opacity的透明效果有什么不同?

rgba()和opacity都能实现透明效果，但它们最大的不同是opacity作用于元素，并且可以设置元素内所有的元素的透明度；而rgba()只作用于元素的颜色或其背景色(设置rgba透明的元素的子元素不会继承透明效果)。

46、CSS中可以让文字在垂直和水平方向上重叠的两个属性是什么？

垂直方向的属性是line-height。水平方向属性是letter-spacing。

47、你知道哪些关于letter-spacing的妙用？

可以用于消除inline-block元素间的换行符空隙。

48、有什么方法可以对一个DOM设置它的CSS？

有以下三种方式。

- 外链式：即通过link标签引入一个外部CSS文件。
- 内嵌式：即通过CSS代码写在style标签内。
- 行内式：即通过CSS代码写在元素的style属性内。

49、在CSS中可通过那些属性定义，使得一个DOM元素不显示在浏览器可视范围内？

最基本的方式如下。

设置display属性为none，或者设置visibility属性为hidden技巧性的方式如下。设置宽高为0，透明度为0，设置z-index的位置为-1000。

50、常用的块属性标签及其特征有那些？

常用块标签有div、h(1-6)、ol、ul、li、d、table、p、br、form。块标签的特征有独占一行，换行显示，可以设置宽、高，块可以套块和行。

51、常用的行内属性标签及特征有哪些？

行标签有span、a、img、var(定义变量)、em(斜体)、strong(变粗)、textarea(定义多行文本输入控件)、select(创建选择列表)、option、

```html
<select>
  <option value ="volvo">Volvo</option>
  <option value ="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
```

input。行标签的特征有在行内显示，内容撑开宽、高，不可设置宽、高(input、img、textarea等除外)，行只能套用行标签。

52、浏览器标准模式和怪异模式之间的区别是什么？

**标准模式：**是浏览器按照W3C标准解析执行代码，这样用规定的语法去渲染，就可以兼容各个浏览器，保证以正确的形式展示网页。

**怪异模式：**是使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以我们称之为怪异模式。

2、**为什么还要存在怪异模式呢？**

在HTML与CSS的标准化未完成之前，各个浏览器都有自己的解析，而有很多旧的网页都是按照这些非标准的实现去设计的。在HTML与CSS标准确定之后，浏览器一方面要按照标准去实现对HTML与CSS的支持，另一方面又要保证对非标准的旧网页的兼容。

3、**浏览器如何确定用那种渲染模式？**

如果你的页面添加了(**注意：大小写不敏感**)，那么就等同于开启了标准模式。如果省略了，浏览器会采用不符合某些标准的渲染模式。

**4.标准模式和怪异模式常见的区别是什么？**

**盒模型的处理差异****：**

1、**标准模式：总宽度=width+margin(左右)+padding(左右)+border(左右)**

2、**怪异模式：总宽度=width+margin(左右)（width直接包括了padding(左右)+border(左右) ）**。

53、如何避免文档流中的空白符合并现象？

空白符合并是标准文档流的特征之一，可以通过设置white-spac修改这一特性，属性值如下。

pre表示不会合并空白符，渲染换行符，自动换行，相当于pre元素。

pre-warp表示不会合并空白符。渲染换行符，自动换行pre-line表示合并空白符，渲染换行符，自动换行。

nowrap表示合并空白符，不会渲染换行符，不会自动换行。

normal表示默认值，按照文档流特点渲染，合并空白符，不会渲染换行符，自动换行。

 54、透明度具有继承性，如何取消透明度的继承？

使用rgba给元素的背景设置透明度的方式，来代替使用opacity设置元素透明度的方式，解决子元素继承父元素透明度的问题。

55、CSS中，自适应的单位有哪些？

自适应的单位有一下几个

- 百分比： %
- 相当于视口宽度的单位：ww
- 相对于视口高度的单位：vh
- 相对于视口宽度或高度(取决于哪个小)的单位：vm
- 相对于父元素字体大小的单位：em
- 相对于根元素字体大小的单位：rem

56、说说rem和em的区别

他们都是相对单位

rem表示相对于根元素的字体大小。

em表示相对于父元素的字体大小。 



