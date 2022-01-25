---
title: React的生命周期验证
categories:
  - - 验证
tags:
  - React，父子组件
mathjax: false
abbrlink: 36377
date: 2022-01-24 09:25:12
updated: 2022-01-24 09:25:12
---

![](/gallery/react-bg.jpeg)

<!-- more -->

今天我们来验证一下`React`类组件的声明周期，本文基于`React17.2`。

![](/gallery/react-life-constructor.png)

# 单组件

## 组件挂载

### constructor()

```js
constructor(props) {
    super(props);
    this.state = {}
    console.log("constructor!!");
}
```

**如果不初始化state或不进行方法的绑定，则不需要为React组件实现构造函数**

实现构造函数的时候要调用super(),初始化父类

在构造函数仅用于以下两种情况：

- 通过this.state赋值对象来初始化内部的state。
- 为事件处理函数绑定实例

不要在constructor()中调用**setState()方法**，用this.state初始化state

```js
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作位置放到`componentDidMount`

### static getDerivedStateFromProps()

```js
static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps!!");
    return null;
}
```

`getDerivedStateFromPros` 会在调用render方法之前调用，并且在初始挂载及后续更新时都会被调用。它返回一个新的state，如果是null则不更新任何内容，state的值在任何时候都取决于prop。

派生状态会导致代码冗余，并使组件难以维护，可以使用以下代替方案：

- 如果你需要执行副作用(例如，数据提取或动画)以响应props中的更改，请改用componentDidUpdate。
- 如果只想在props更改时重新计算某些数据，请使用menoization helper代替
- 如果你想在props更改时“重置”某些state，请考虑组件完全受控或使用key使组件完全不受控代替

请注意，不管原因是什么，都会在*每次*渲染前触发此方法。这与 `UNSAFE_componentWillReceiveProps` 形成对比，后者仅在父组件重新渲染时触发，而不是在内部调用 `setState` 时。

### render()

```js
render()
```

`render`方法是class组件中唯一必需实现的方法

当`render`被调用时，它会检查`this.props`和`this.state`的变化返回以下类型之一：

- React元素。通常通过JSX创建
- 数组或者fragments
- Portals 可以 渲染子节点到不同的DOM树上
- 字符串或者数值类型  它们在DOM树上渲染文本节点
- 布尔类型或null 什么都不渲染

`render()`函数为纯函数

**注意 如果shouldComponentUpdate() 返回false，则不会调用render()**

### componentDidMount()

```js
componentDidMount()
```

`componentDidMount`会在组件挂载后(插到DOM树上)立即调用。依赖于DOM节点的初始化应该放到在这里。

如果是通过网络请求获取的数据也应该放到这里请求。也可以在这里添加订阅，如果订阅了，请不要忘记在`componentWillUnmount()`里取消订阅

## 组件更新

**static getDerivedStateFromProps()**

### shouldComponentUpdate()

```
shouldComponentUpdate(nextprops, nextState)
```

![](/gallery/shouldcomponentupdate.png)

nextprops, nextState都是将要改变的值

根据`shouldComponentUpdate()`的返回值，判断React组件的输出是否受当前state或props更改的影响。默认行为是state每次发生变化组件都会重新渲染。大部分情况下都应遵守默认行为。当props或state发生改变时。`shouldComponentUpdate()`会在渲染执行前调用，返回值默认是true。首次渲染或者使用`forceUpdate()`时不会调用。该方法仅作为**性能优化**的方式存在。

**render()**

### getSnapshotBeforeUpdate()

```js
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()`在最近一次渲染输出(提交到DOM节点)之前调用。它使得组件能在发生更改之前从DOM 中捕获一些信息(例如，滚动位置)。此生命周期方法的任何返回值将作为参数传递给`componentDidUpdate()`,在UI处理中，如需以特殊方式处理滚动位置的聊天线程可用此生命周期，应返回snapshot的值(或null)

### componentDidUpdate()
```js
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()`会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对DOM进行操作，如果你对更新的props进行了比较，也可以选择在此处进行网络请求。例如，当props未发生变化时，则不会执行网络请求。可以在这里使用setState(), 但它必需被包裹在一个条件语句里，否则还会导死循环,它还会导致额外的重新渲染，影响组件性能，不要将props镜像给state

## 组件卸载

### componentWillUnmount()

```
componentWillUnmount()
```

`componentWillUnmount()`会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除timer、网络请求、订阅，不能调用setState(),因为不会重新渲染。