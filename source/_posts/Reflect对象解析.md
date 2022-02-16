---
title: Reflect对象解析
categories:
  - - null
tags:
  - null
mathjax: false
abbrlink: 60673
date: 2022-02-12 09:57:43
updated: 2022-02-12 09:57:43
---

![](/gallery/js-2022-2-16.jpeg)

<!-- more -->

# Reflect

Reflect是一个内置对象，其原型是Object.prototype。它不是一个函数，不能执行函数的调用和构造函数调用。

Reflect对象的设计目的主要有：

1、将Object对象的一些明显属于语言层面的方法放到了Reflect对象上。

2、修改某些Object方法的返回结果，使其根据合理。

3、让对象操作都变成函数行为。

4、Reflect对象的方法和Proxy对象的方法一一对应，只要是Proxy对象的方法，都能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便的调用对应的Reflect方法完成默认行为。

# 静态方法

## 1、Reflect.apply(target, thisArgument, argumentsList)

等同于Function.prototype.apply.call( target, thisArgument, argumentsList )。一般来说，如果要绑定一个函数的this对象，可以写成fn.apply(obj, args)。但如果函数自己定义了apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)。而采用Reflect对象可以简化这种操作。

```js
var obj = {a:1}
function test(b) {
  return this.a + b;
}
Reflect.apply(test, obj, [2])
// 3
```

没有**Reflect.call**()

## 2、Reflect.construct(target, argumentList)

这里提供了一种不使用new来调用构造函数的方法。

```js
new Array(1,2,3); // [1,2,3] 
// 等价于
Reflect.construct(Array, [1,2,3]); // [1,2,3]
```

## 3、Reflect.defineProperty ( target, propertyKey, attributes )

用于定义或修改对象属性，返回一个布尔值表示是否操作成功。其对应的Object方法如果操作失败的话，会抛出异常。

```js
var obj = { a: 1 };
Object.getOwnPropertyDescriptor(obj, 'a'); 
// {value: 1, writable: true, enumerable: true, configurable: true}
// 现在将其修改为不可配置
Object.defineProperty(obj, 'a', {configurable: false});
// 再将其改回可配置
Object.defineProperty(obj, 'a', {configurable: true});
// TypeError: Cannot redefine property
// 如果使用Reflect.defineProperty将返回一个布尔值，而不是抛出异常。
Reflect.defineProperty(obj, 'a', {configurable: true}); // false
```

## 4、Reflect.deleteProperty(target, propertyKey)

该方法主要是将Object操作变成函数行为。等同于delete obj[name];

```js
var obj = { a: 1 };
Reflect.deleteProperty(obj, 'a'); // true
obj.a; // undefined
```

## 5、Reflect.get ( target, propertyKey [ , receiver ] )

查找并返回target对象的propertyKey属性。如果没有该属性，则返回undefined。如果propertyKey属性部署了读取函数，则读取函数的this绑定到receiver。

```js
var obj = {
    get foo() { return this.bar(); },
    bar() { return 1; }
};

Reflect.get(obj, 'foo'); // 1

var wrapper = { bar() { return 2; }};
Reflect.get(obj, 'foo', wrapper); // 2
```

## 6、Reflect.getOwnPropertyDescriptor ( target, propertyKey )

```js
var obj = { a: 1 };
Object.getOwnPropertyDescriptor(obj, 'a');
// {value: 1, writable: true, enumerable: true, configurable: true}
Reflect.getOwnPropertyDescriptor(obj, 'a');
// {value: 1, writable: true, enumerable: true, configurable: true}

```

## 7、Reflect.getPrototypeOf ( target )

获取对象的原型。相当于Object.getPrototypeOf(target);

```js
var obj = {};
Object.getPrototypeOf(obj) === Object.prototype;  // true
Reflect.getPrototypeOf(obj) === Object.prototype; // true
```

## 8、Reflect.has ( target, propertyKey )

相当于propertyKey in target，将该操作变成函数行为。

```js
var obj = { a:1 };
'a' in obj; // true
Reflect.has(obj, 'a'); // true
```

## 9、Reflect.isExtensible ( target )

等同于Object.isExtensible ( target )，判断对象是不是可拓展的

```js
var obj = {};
Object.isExtensible(obj);  // true
Reflect.isExtensible(obj); // true
```

## 10、Reflect.ownKeys ( target )

等同于Object.getOwnPropertyNames(target)和Object.getOwnPropertySymbols(target)的返回值组合。

```js
var obj = { a: 1 };
obj[Symbol('b')] = 2;
Object.getOwnPropertyNames(obj); // ['a'];
Object.getOwnPropertySymbols(obj); // [Symbol(b)]
Reflect.ownKeys(obj); // ["a", Symbol(b)]
```

**与Object.keys()的区别**

Object.keys()返回属性key,但不包括不可枚举的属性

Reflect.ownKeys()返回所有属性的key

## 11、Reflect.preventExtensions ( target )

禁止对象扩展，相当于Object.preventExtensions ( target )

```js
var obj = { a: 1 };
Reflect.preventExtensions ( obj );
obj.b = 2;
obj.b; // undefined
```

## 12、Reflect.set ( target, propertyKey, V [ , receiver ] )

设置target对象propertyKey属性的值等于V。如果propertyKey属性设置了赋值函数，则赋值函数的this绑定到receiver上。

```js
var obj = { a: 1 };
Reflect.set(obj, 'a', 2);
obj.a; // 2

var obj2 = {
    set foo(a) {
        this.a = a;
    }
};
var wrapper = { a: 3 };
Reflect.set(target, 'foo', 4, wrapper);
wrapper.a; // 4
```

## 13、Reflect.setPrototypeOf ( target, proto )

将target的原型对象设置为proto，等同于Object.setPropertyOf方法。

```js
var array = {};
Reflect.setPrototypeOf(array, Array.prototype);
array.length; // 0
```

