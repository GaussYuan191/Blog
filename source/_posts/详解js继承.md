---
title: 详解js继承
categories:
  - - 继承
tags:
  - JavaScript
mathjax: false
abbrlink: 31746
date: 2022-02-08 21:17:24
updated: 2022-02-08 21:17:24
---

![](/gallery/js-extend-01.png)

<!-- more -->

# 预备知识

# 1、构造函数属性

```js
function A(name) {
    this.name = name; // 实例基本的属性（该属性，强调私有，不共享）
    this.arr = [1] // 实例引用属性（该属性，强调私有，不共享）
    this.say = function () {
        // 实例引用属性吗，强调共享
        console.log('hello')
    }
}
```

## 2、什么是原型对象

简单来说，每个函数都有prototype属性，它就是原型对象，通过函数实例化出来的对象有个**__proto__**属性，指向原型对象

```js
let a = new A()
a.__proto__ == A.prototype
// prototype的结构如下
A.prototype = {
    constructor: A
    ...其他属性和方法
}
```

## 3、原型链

每个对象都有原型，当访问这个变量的时候，这个变量不存在就访问他的原型，就这样一直循环下去就产生了原型链！

![](/gallery/js-extend-02.png)

首先，fn的构造函数是Foo()。所以：
fn._ _ proto _ _=== Foo.prototype
又因为Foo.prototype是一个普通的对象，它的构造函数是Object，所以：
Foo.prototype._ _ proto _ _=== Object.prototype
通过上面的代码，我们知道这个toString()方法是在Object.prototype里面的，当调用这个对象的本身并不存在的方法时，它会一层一层地往上去找，一直到null为止。


所以当fn调用toString()时，JS发现fn中没有这个方法，于是它就去Foo.prototype中去找，发现还是没有这个方法，然后就去Object.prototype中去找，找到了，就调用Object.prototype中的toString()方法。


这就是原型链，fn能够调用Object.prototype中的方法正是因为存在原型链的机制。

另外，在使用原型的时候，一般推荐将需要扩展的方法写在构造函数的prototype属性中，避免写在_ _ proto _ _属性里面。

## 4、原型对象的作用

原型对象的用途是为每个实例对象存储共享的方法和属性，它仅仅是一个普通的对象而已。并且所有的实例是共享同一个原型对象,因此有别于实例方法或属性，原型对象仅一份。实例对象有很多份且实例属性和⽅法是独⽴的。在构造函数中：为了属性(实例基本属性)的私有性、以及⽅法(实例引⽤属性)的复⽤、共享。我们提倡： 

- 将属性封装在构造函数中
- 将方法定义在原型对象上

```js
function A(name) {
  this.name = name; // (该属性，强调私有，不共享)
}
A.prototype.say = function () {
  // 定义在原型对象上的⽅法 (强调复⽤，需要共享)
  console.log("hello");
};
// 不推荐的写法：[原因](https://blog.csdn.net/kkkkkxiaofei/article/details/46474303)
A.prototype = {
  say: function () {
    console.log("hello");
  },
};

```

