---
title: ts学习笔记1
categories:
  - - typescript
tags:
  - 学习笔记
mathjax: false
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

和JavaScript一样，TypeScirpt里所有的数字都是浮点数
