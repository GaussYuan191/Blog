---
title: antd中Table的dataSource不更新？？
categories:
  - - 深拷贝
tags:
  - 'antd, 深拷贝'
mathjax: false
abbrlink: 34168
date: 2022-01-14 10:08:55
updated: 2022-01-14 10:08:55
---

答应我，别再修改对象属性的时候不深拷贝原对象了！

![](/gallery/bg-001.jpeg)

<!-- more -->

# 背景

   前几天在快乐的使用antd组件时，做了一个选择权限的表格，表格的结构是树形的，单元格中有select框，选择是否有权限，写完了，啪，出问题了。

![](/gallery/antd-table-error-01.gif)

# 分析

   在图中可以看出问题来，当选择的权限后，表格组件没有重新渲染

![](/gallery/problem.jpeg)

在代码中也调用了this.setState去重新渲染页面

![](/gallery/antd-table-error-02.png)

**是我写的修改权限树的算法耗费太多时间了吗？**

在调用函数之前写上 console.time('aaa')

在调用函数之后写上console.timeEnd('aaa')

![](/gallery/antd-table-error-03.png)

从图中，我们基本上可以确定问题了，修改权限树的函数调用的时间是0.17ms,肯定不是算法的问题，我们选择了select框，但是控制台上没有打印render，可以证明没有调用table的渲染。

**为什么Table没有重新渲染呢？**

冷静的再看下代码，猛的发现，我好像是直接修改了原对象的引用指向的内存数据，没有修改引用，`React`认为虚拟`DOM`并没有改变，因此，不会重新渲染页面，这就会照成Table组件的dataSource改变了，但是Table并没有重新渲染。

# 解决

  既然问题出在对象的引用没有改变，那么我们让他改变就行了，我只需要对原对象进行拷贝就行了，这时候就要请出我们的深拷贝了，先来手写一个深拷贝函数。

```js
deepCopy = (obj) => {
    if (!obj || typeof obj != 'object') return;
    // 判断对象是不是数组
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        // 防止拷贝对象原型链上的属性 hasOwnProperty,不会判断原型链上的属性
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] == 'object' ? deppCopy(obj[key]) : obj[key]
        }
    }
    return newObj;
}
```

看看改进的效果

![](/gallery/antd-table-error-04.gif)

![](/gallery/good.jpg)

# 总结

答应我，别再修改对象属性的时候不深拷贝原对象了！
