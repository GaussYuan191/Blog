---
title: ts学习笔记1
categories:
  - - typescript
tags:
  - 学习笔记
mathjax: false
abbrlink: 61000
date: 2022-09-07 21:07:54
updated: 2022-09-07 21:07:54
---



<!-- more -->

整理一下最近学的ts知识

## 对比原理

- 他是JavaScript的一个超集，在原有的基础上，添加了可选静态类型和基于类的面向对象编程方式

## TS的使用场景 

-  面向项目

TS - 面向解决大型复杂项目，复杂架构以及代码维护场景

JS - 脚本化语言，用于面向简单页面场景

- 自主检测
TS - 编译期间，主动发现并指出错误
JS - 无编译阶段

- 类型检测
TS - 强类型
JS - 弱类型

- 运行流程
TS - 依赖编译，依靠编译打包后，编译成JS
JS - 可以直接运行与浏览器中

- 复杂特性
TS - 模块化、泛型、接口

考点：ts相较于js优势 功能 => 以上4个点，ts如何实现这个功能 => 多了编译时 => ts官方编译器  / babel

## TS的基础类型与写法

### 布尔值(boolean)

```tsx
let idDone: boolean = false
```

### 枚举(enmu)

enum类型是对JavaScript的标准类型的一个补充

- 数字类型枚举，默认情况下，从0开始为元素编号，依次递增，也可以手动指定成员的数值

```tsx
enum Score {
    BAD,
    NG,
    GOOD = 4,
    PERFET
}
```

- 字符串类型枚举,有值取值

```tsx
enum Score {
    BAD = "BAD",
    NG = "NG",
    GOOD = "GOOD",
    PERFET = "PERFET"
}
```

- 反向映射 - 正反向双重mapping

```tsx
enum Score {
    BAD,
    NG,
    GOOD,
    PERFET
}
```

- 异构类型

```tsx
enum ENUM {
    A,
    B,
    C = "C",
    D = "D",
    E = "6",
    F
}
```



### 数字(number)

和JavaScript一样，TypeScirpt里所有的数字都是浮点数，`0b1010`和`0o744`在ES6中会被编译成十进制数字

```js
let decLiteral: number = 6;
let hexLiteral: number = 0o744
```

#### 元组





### 字符串(string)

使用`string`定义字符串类型：

```js
let myName: string = 'Tom'
let sentence: string = `Hello, my name is ${myName}`
```

### 空值(void)

JavaScript没有空值（Void）的概念，在TypeScript中，可以用`void`表示没有任何返回值的函数

```js
function alterName(): void {
    alter('My name is Tom');
}
```

### Null和Undefined

与`void `的区别是，`undefined`和`null`是所有类型的子类型。也就是说`undefined`类型的变量，可以赋值给`number`

类型的变量，而`void`类型的变量不能赋值给`number`类型的变量

```js
let u:undefined;
let num: number = u;
let u:void;
let num:number = u 
// Type 'void' is not assignable to type 'number'.
```

### any和unknown、never

1.`any`绕过所有类型检查 => 类型检测和编译筛查功能全部取消。2.`unknown` 绕过赋值检查 => 禁止更改传递

#### Object / ObjectConstructor / {}

`Object` -> Object.prototype 上的属性，`ObjectConstructor`->定义了Object本身的属性, `{}`-定义空属性

## 接口(interface)

他是对行为的一种抽象，具体行动由类去实现

```tsx
interface Person {
    readonly id: number;  //只读
    name: string,
    age?: number， // 可选
    [propName: string]: any //任意
}
let tom:Person = {
    name: 'Tom',
    age: 25
}
```

### 交叉类型

```tsx
interface A {
  x: D;
}
interface B {
  x: E;
}
interface C {
  x: F;
}
interface D {
  d: boolean;
}
interface E {
  e: string;
}
interface F {
  f: number;
}
type ABC = A & B & C;
let abc: ABC = {
  x: {
    d: false,
    e: "class",
    f: 5,
  },
};
```

合并冲突

```

```

