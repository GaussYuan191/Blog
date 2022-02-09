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

# 继承方式

## 方式1、原型链继承

**核心：将父类实例作为子类的原型**

优点： 方法复用

​             由于方法定义在父类的原型上，复用了父类构造函数的方法。比如说say方法。

缺点：

-    创建子类的时候，不能向父类传递参数，比如说name。
- ​    子类实例共享了父类构造函数的引用属性，比如说arr属性。
- ​    无法实现多继承（同时继承多个父类）

```js
// 父类
function Parent(name) {
  this.name = name || "父亲"; //实例基本属性(该属性，强调私有，不共享)
  this.arr = [1]; //(该属性，强调私有)
}
Parent.prototype.say = function () {
  // 将要复用，共享方法定义在父类原型上
  console.log("hello");
};
// 子类
function Child(like) {
  this.like = like;
}
// 1.原型链继承
Child.prototype = new Parent(); //核心
Child.prototype.constructor = Child; // 修正constructor指向
let boy1 = new Child();
let boy2 = new Child();
// 优点：共享了父类构造函数的say方法
boy1.say();
boy2.say();
console.log(boy1.say === boy2.say); // hello , hello , true
// 缺点1：不能向父类的构造函数传参
console.log(boy1.name, boy2.name, boy1.name == boy2.name);
// 缺点2：子类实例共享了父类构造函数的应用属性，比如说arr
boy1.arr.push(2);
console.log(boy2.arr); // 注意修改boy1的name，boy2的name不影响
//注意要修改child类实例的constructor的指向

```

## 方式2、借用构造函数

**核心：借用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类。**

优点：实例之间独立

-   创建子类实例，可以向父类构造函数传递参数。
-   子类实例不共享父类构造函数中的应用属性，比如说arr属性
-   可以实现多继承（通过多个call或者apply继承多个父类）

缺点：

-   父类的方法不能复用
-  子类实例，继承不了父类原型上的属性（应为没有用到原型）

```js
// 父类
function Parent(name) {
  this.name = name || "父亲"; //实例基本属性(该属性，强调私有，不共享)
  this.arr = [1]; //(该属性，强调私有)
}
Parent.prototype.say = function () {
  // 将要复用，共享方法定义在父类原型上
  console.log("hello");
};
// 子类
function Child(name, like) {
  Parent.call(this, name); //核心 拷贝了父类的实例属性和方法
  this.like = like;
}

let boy1 = new Child("小红", "apple");
let boy2 = new Child("小明", "orange");
// 优点1: 可向父类构造函数传参
console.log(boy1.name, boy2.name); // 小红 小明
// 优点2: 不共享父类构造函数的引用类型
boy1.arr.push(2);
console.log(boy1.arr, boy2.arr);
// 缺点1：方法不能复用
console.log(boy1.say === boy2.say);
// 缺点2: 不能继承父类原型上的方法
boy1.say();   // boy1.say is not a function

```

## 方式3、组合继承

**核心：通过调用父类的构造函数，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数的复用。**

优点：

保留构造函数的优点：创建子类可以传递参数。

保留原型链的优点：父类的方法定义在父类的原型对象上，可以实现方法的复用。

不共享父类的应用属性。比如arr属性。

缺点：

由于调用了两次父类的构造方法，会存在一份多余的父类实例属性。

第⼀次Parent.call(this);从⽗类拷⻉⼀份⽗类实例属性，作为⼦类的实例属性，第⼆次 Child.prototype = new Parent();创建⽗类实例作为⼦类原型，Child.protype中的⽗类属性和⽅法会被第⼀次拷⻉来的实例属性屏蔽掉，所以多余。

```js
function Parent(name) {
  this.name = name || "父亲"; //实例基本属性(该属性，强调私有，不共享)
  this.arr = [1]; //(该属性，强调私有)
}
Parent.prototype.say = function () {
  // 将要复用，共享方法定义在父类原型上
  console.log("hello");
};
// 子类
function Child(name, like) {
  Parent.call(this, name); //核心 拷贝了父类的实例属性和方法
  this.like = like;
}
Child.prototype = new Parent(); // 核心
Child.prototype.constructor = Child; // 修正constructor的指向

let boy1 = new Child("小红", "apple");
let boy2 = new Child("小明", "orange");

// 优点1: 可向父类构造函数传参
console.log(boy1.name, boy2.name); // 小红 小明
// 优点2: 不共享父类构造函数的引用类型
boy1.arr.push(2);
console.log(boy1.arr, boy2.arr);
// 优点3：方法能复用
console.log(boy1.say === boy2.say);
// 优点4: 能继承父类原型上的方法
boy1.say();
// 缺点1：由于调⽤了2次⽗类的构造⽅法，会存在⼀份多余的⽗类实例属性
console.log(Child.prototype.__proto__ === Parent.prototype);
console.log(Child.prototype);

```

## 方式4、组合继承优化1

**核心：通过这种方式，砍掉父类的实例属性，这样在调用父类构造函数的时候，就不会初始化两次实例，**

**避免组合继承的缺点。**

优点：

- 只调用一次父类构造函数。
- 保留构造函数的优点：创建子类实例，可以向父类构造函数传递参数。
- 保留原型链的优点

缺点：

修正构造函数的指向后，父类实例的构造函数指向，同时也发生变化

原因是：不能判断子类实例的直接构造函数，到底是子类构造函数还是父类构造函数。

```js
function Parent(name) {
  this.name = name || "父亲"; //实例基本属性(该属性，强调私有，不共享)
  this.arr = [1]; //(该属性，强调私有)
}
Parent.prototype.say = function () {
  // 将要复用，共享方法定义在父类原型上
  console.log("hello");
};
// 子类
function Child(name, like) {
  Parent.call(this, name); //核心 拷贝了父类的实例属性和方法
  this.like = like;
}
Child.prototype = Parent.prototype; // 核⼼ ⼦类原型和⽗类原型，实质上是同⼀个
Child.prototype.constructor = Child;
// 缺点1：当修复⼦类构造函数的指向后，⽗类实例的构造函数指向也会跟着变了。 没修复之前：
console.log(boy1.constructor); // Parent 修复代码：
Child.prototype.constructor = Child; //修复之后：
console.log(boy1.constructor); // Child
console.log(p1.constructor); // Child 这⾥就是存在的问题(我们希望是Parent) 具体原因：因为是通过原型来实现继承的，Child.prototype的上⾯是没有constructor属性的， 就会往上找，这样就找到了Parent.prototype上⾯的constructor属性；当你修改了⼦类实例的 construtor属性，所有的constructor的指向都会发⽣变化。

```

## 方式5、组合寄生继承--完美方式

```js
function Parent(name) {
  this.name = name || "父亲"; //实例基本属性(该属性，强调私有，不共享)
  this.arr = [1]; //(该属性，强调私有)
}
Parent.prototype.say = function () {
  // 将要复用，共享方法定义在父类原型上
  console.log("hello");
};
// 子类
function Child(name, like) {
  Parent.call(this, name); //核心 拷贝了父类的实例属性和方法
  this.like = like;
}
// 核⼼ 通过创建中间对象，⼦类原型和⽗类原型，就会隔离开。不是同⼀个啦，有效避免了⽅式4的缺点。
Child.prototype = Object.create(Parent.prototype);
// 这⾥是修复构造函数指向的代码
Child.prototype.constructor = Child;
let boy1 = new Child("⼩红", "apple");
let boy2 = new Child("⼩明", "orange");
let p1 = new Parent("⼩爸爸");

```

## 为什么要修正constructor的指向

```js

function People(name){
    this.eat = function(){
        alert("eat");
    }
}
function Woman(){
    this.dance = function(){
        alert("dance");
    }
}
Woman.prototype = new People();
Women.prototype.constructor = Women;
```

1、不更正constructor的情形

```js

var man;
var gril;
(function(){
    function People(name){
        this.eat = function(){
            alert("eat");
        }
    }
    function Woman(){
        this.dance = function(){
            alert("dance");
        }
    }
    Woman.prototype = new People();
    //Women.prototype.constructor = Women;//不更正
    People.prototype.sayName = function(){
        alert(this.name);
    }
    man = new People("lili");
    gril = new Women();
})()
man.constructor.prototype.sayHi = function(){
    alert("hi");
}
gril.constructor.prototype.sayLove = function(){
    alert("i love u");
}
gril.sayHi();//"hi"
gril.sayLove();//"i love u"
man.sayHi();//"hi"		
man.sayLove();//"i love u"   (不应该添加到People类)

```

可以看到，这里给父类添加了方法sayHi，给子类添加了方法sayLove，但是并未更正constructor的时候，没有达到我们想要的效果，把sayLove也添加到了父类people中，这是因为存在如下的关系

![](/gallery/js-extend-03.png)

可以看出，gril.constructor.prototype = man.constructor.protype=People.prototype，所以sayLove被添加到父类People中也是情理之中的了。

2、更正后

```js
var man;
var gril;
(function(){
    function People(name){
        this.eat = function(){
            alert("eat");
        }
    }
    function Woman(){
        this.dance = function(){
            alert("dance");
        }
    }
    Woman.prototype = new People();
    Women.prototype.constructor = Women;//更正
    People.prototype.sayName = function(){
        alert(this.name);
    }
    man = new People("lili");
    gril = new Women();
})()
man.constructor.prototype.sayHi = function(){
    alert("hi");
}
gril.constructor.prototype.sayLove = function(){
    alert("i love u");
}
gril.sayHi();//"hi"
gril.sayLove();//"i love u"
man.sayHi();//"hi"		
man.sayLove();//报错

```

现在我们的目的就实现啦！那么我们再来看看此时的原型图吧： 

![](/gallery/js-extend-04.png)

constructor更正后就可以通过child.constructor.prototype在原型上添加方法了

# 其他问题

## 1、Object.create(object, propertiesObject)

Object.create()⽅法创建⼀个新对象，使⽤第⼀个参数来提供新创建对象的__proto__（以第⼀个参 

数作为新对象的构造函数的原型对象）； ⽅法还有第⼆个可选参数，是添加到新创建对象的属性，写法如下。

```js
const a = Object.create(Person.prototype, {
  age: { value: 12, writable: true, configurable: true },
});
```

- new 与 Object.create() 的区别？

new 产⽣的实例，优先获取构造函数上的属性；构造函数上没有对应的属性，才会去原型上查找； 

如果构造函数中以及原型中都没有对应的属性，就会报错。Object.create() 产⽣的对象，只会在原 

型上进⾏查找属性，原型上没有对应的属性，就会报错。 

```js
let Base1 = function () {
  this.a = 1;
};
let o1 = new Base1();
let o2 = Object.create(Base1.prototype);
console.log(o1.a); // 1
console.log(o2.a); // undefined
let Base2 = function () {};
Base2.prototype.a = "aa";
let o3 = new Base2();
let o4 = Object.create(Base2.prototype);
console.log(o3.a); // aa
console.log(o4.a); // aa
let Base3 = function () {
  this.a = 1;
};
Base3.prototype.a = "aa";
let o5 = new Base3();
let o6 = Object.create(Base3.prototype);
console.log(o5.a); // 1
console.log(o6.a); // aa

```

## 2、new的过程

创建新的对象（如object）

将新的对象的--proto--指向构造函数的prototype对象

执行构造函数，为这个新对象添加属性，并将this指向创建的新对象object

当构建函数本身返回值为对象时，返回该对象，否则返回新对象

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
function _new(fn, ...args) {
  // 创建一个空对象obj,并让其继承fn.prototype
  let obj = Object.create(fn.prototype);
  // 执行构造函数，并让this指向创建的空对象obj
  let result = fn.call(obj, ...args);
  // 当返回值为对象时，返回该对象，否则返回新的对象obj
  return result instanceof Object ? result : obj;
}
let ming = _new(Person, "小明", 18);
console.log(ming);
```

Object.create创建obj,使得obj.__proto__==Fn.prototype

## 3、为什么‘组合继承’这种方式，会执行两次父类函数

- 第一次：new Parent()

'new'的过程的第三步，其实就是执行父类的构造函数。

- 第二次Parent.call(this,name,like)

call的作⽤是改变函数执⾏时的上下⽂。⽐如：A.call(B)。其实，最终执⾏的还是A函数，只不过是 

⽤B来调⽤⽽已。所以，你就懂了Parent.call(this,name,like) ,也就是执⾏了⽗类构造函数Person。
