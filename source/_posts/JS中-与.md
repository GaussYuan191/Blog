---
title: JS中==与===
categories:
  - - null
tags:
  - null
mathjax: false
abbrlink: 33716
date: 2022-02-4 16:45:56
updated: 2022-02-4 16:45:56
---

![](/gallery/js-2022-2-12.jpeg)

<!-- more -->

```js
if(a == 1 && a == 2 && a == 3) { 
	console.log('成功');		// 成功
}
```

问：a取什么值的时候会输出**成功**

解答：明显这道题考了“==”的判断，先复习一下“===”和“==”的比较过程

**===**

1.如果类型不同，就**不相等**

2.如果两个都是数值，并且是同一个值，那么**相等**，如果数值是NaN,则**不相等**

3.如果两个是字符串，每个位置的字符都是一样的，那么**相等**，否则**不相等**

4.如果两个都是true、false、null、undefined，那么**相等**，否则**不相等**

5.如果两个值都是引用同一个对象或者函数，那么**相等**，否则**不相等**

**==**

1.如果两个值类型形同，进行===比较

2.如果两个类型不同，他们可能相等，规则如下

a、如果是一个null、一个undefined，那么相等

b、如果一个是字符串，一个是数值，把字符串转换成数值再进行比较

c、如果任一值是true，把它变成1再比较；如果任一值是false，把它转换成0再比较

(undefined、null、false、-0、NaN,'' ,这个6个值会解释成false，其他的值都会被解释为true)

d、如果是一个对象，另一个是数值或者字符串，把对象转换成基础类型的值再比较。对象转换成基础类型，利用它的toSting或者valueOf方法。js核心内置类，会尝试valueOf先于toString;例外的是Date，Date利用的是toString转换。

e、其他组合都不相等

所以，改写a的toString方法即可，每次进行“==”判断的时候动态改变a的值

```js

let a = { 
	i: 1,
	toString () { 		//或者valueOf 
		return a.i++ 	//根据逻辑，这里是先返return后加 
	} 
} 

if(a == 1 && a == 2 && a == 3) { 
	console.log('成功');		// 成功
}

console.log(a.i)  // 4  每调用一次toString方法i自增，证明确实有在自动调用toString方法
```

