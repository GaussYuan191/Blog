---
title: JavaScript中的对象
categories:
  - - 学习总结
tags:
  - js对象
mathjax: false
abbrlink: 10347
date: 2021-04-17 21:03:37
updated: 2021-05-09 8:54:31
---

JS对象总结

<!-- more -->

学习js也有一段时间了，是时候来总结一下js中的对象以及它们的方法了。

## Array对象

array对象用于单个变量中存储多个值。

###  创建Array对象的语法

```js
new Array();
new Array(size);   //参数size是期望的数组的个数，返回的数组，length字段被设为size的值。
new Array(element0, element1, element2, element3, ....);
//element.. 为参数列表。当使用这些参数来调用构造函数Array()时
```

### 返回值

返回新创建并初始化了数组。

如果调用了构造函数Array()时没有使用参数，那么返回的数组为空，length字段为0。

当调用构造函数时只传递给它一个数字参数，该构造函数将返回具有指定个数、元素为undefined的数组。

当其他参数调用Array()时，该构造函数将用参数指定的值初始化数组。

当构造函数作为函数调用，不用new运算符时，它的行为与使用new运算符调用它时的行为完全一样。

### Array 对象属性

#### constructor

##### 定义和用法

constructor属性返回对创建此对象的数组函数的引用。

##### 语法

```html
object.constructor
```

例子1

```js
//构造函数创建数组
var test = new Array();
if (test.constructor == Array) {
  console.log("This is an Array");
} else {
  console.log("hello world");
}
//输出
This is an Array
//字面量的方式
 var arr2=[];
```

### Array 对象方法

1、Array.isArray(对象)---->判断这个对象是不是数组

```js
//判断对象是不是数组类型:两种
var arr1=new Array();
//1 instanceof
var obj=[];
console.log(obj instanceof Array);//true

//2 使用数组的isArray
console.log(Array.isArray(obj));//true
```

2、Array.concat(数组,数组,数组,...) 组合一个新的数组

```js
var arr1=[10,20,30];
var arr2=[40,50,60];
console.log(arr1.concat(arr2));//[10, 20, 30, 40, 50, 60]
```

3 、Array.every(函数)--是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true。every从迭代开始，一旦有一个不符合条件，则不会继续迭代下去。

返回值是布尔类型,函数作为参数使用,函数中有三个参数,第一个参数是元素的值，第二个参数是索引值,第三个参数是原来的数组(没用)、如果这个数组中的每个元素的值都符合条件,最后才返回的是true

```js
var arr = [1, 2, 3, 4, 5, 6];
console.log(arr.every(function (item, index, array) {
    console.log('item=' + item + ',index=' + index + ',array=' + array);
    //item是数组的值 index自动循环的值 array 自身的数组（一般没用 只用前面两项参数）
    return item > 0;
    //这里写函数的判断 只要有一个不是true就停止继续循环 只有全部函数判断结果为true才返回true
}));//true

var arr=["小明明lkko","小曹操674","小白白bd","笑眯眯a"];
var flag=arr.every(function (ele,index) {
    //数组中的每个元素的长度是不是大于4
    return ele.length>4;
});
console.log(flag);//false 
```

4、Array.some()(函数)--是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true。some一直在找符合条件的值，一旦找到，则不会继续迭代下去

```js
var arr = [ 1, 2, 3, 4, 5, 6 ]; 
console.log( arr.some( function( item, index, array ){ 
    console.log( 'item=' + item + ',index='+index+',array='+array ); 
    //item是数组的值 index自动循环的值 array 自身的数组（一般没用 只用前面两项参数）
    return item > 3; 
    //这里写函数的判断 只要有一个是true就停止继续循环 有一个函数判断结果为true就返回true
})); //true
```

5、Array.filter(函数);返回的是数组中每一个元素都复合条件的元素,组成了一个新的数组

```js
var arr = [10, 20, 30, 40, 50, 60, 70, 80];
var newArr = arr.filter(function (ele) {//ele---每个元素
    return ele > 40;
});
console.log(newArr);//[50, 60, 70, 80]

//可以用来去重
var arr = [10, 0, 20, 0, 40, 0, 60, 100];
var newArr = arr.filter(function (ele) {
    return ele != 0;
});
console.log(newArr);//[10, 20, 40, 60, 100]
```

6、Array.push(值);--->把值追加到数组中,加到最后了---返回值也是追加数据之后的数组长度（重点+++）

```js
var arr =[10,20,30];
console.log(arr.push(40));//返回值是 增加后的数组涨肚
console.log(arr);//[10, 20, 30, 40]
```

7、Array.pop();--->删除数组中最后一个元素,返回值就是删除的这个值（重点+++）

```js
var arr =[10,20,30,40];
console.log(arr.pop());//返回值是删除的值
console.log(arr);//[10, 20, 30]
```

8、Array.shift();--->删除数组中第一个元素,返回值就是删除的这个值（重点+++）

```js
var arr =[10,20,30,40];
console.log(arr.shift());//返回值是删除的值
console.log(arr);//[ 20, 30，40]
```

9、Array.unshift();--->向数组的第一个元素前面插入一个新的元素,----返回值是插入后的程度（重点+++）

```js
var arr=[10,20,30,40,50];
var result=arr.unshift(5);
console.log(result);//返回现在的长度
console.log(arr);//[5,10,20,30,40,50]
```

10、Array.forEach(函数)方法---遍历数组用---相当于for循环

```js
var arr = [10, 20, 30, 40];
arr.forEach(function (ele,index) {
    console.log("数组的值："+ele+'----'+"自迭代的值："+index);
});
// 数组的值：10----自迭代的值：0
// 数组的值：20----自迭代的值：1
// 数组的值：30----自迭代的值：2
// 数组的值：40----自迭代的值：3
```

 11、Array.map(函数);--->数组中的每个元素都要执行这个函数,把执行后的结果重新的全部的放在一个新的数组中

```js
function f1(a) {
    return Math.pow(a, 2);
}
var arr = [1, 2, 3, 4, 5];
console.log(arr.map(f1));//[1, 4, 9, 16, 25] 
```

12、Array.indexOf(元素值);返回的是索引,没有则是-1

```js
var arr=[10,20,30,40];
console.log(arr.indexOf(10)); // 返回对于字符串的索引
console.log(arr.indexOf(50));//找不到就返回-1
```

13、Array.join("字符串");----数组中每个值与字符串拼接 返回的是一个字符串

```js
var arr=["小白","小黑","小红","小芳","小绿","小苏"];
var str=arr.join("|");
console.log(str);//小白|小黑|小红|小芳|小绿|小苏
```

14、Array.reverse();----->反转数组

```js
var arr=[10,20,30,40,50];
arr.reverse();//反转
console.log(arr);//[50, 40, 30, 20, 10]
```

15、Array.sort();---排序

```js
//一维数组 倒序
var arr=[10,20,30,40,50,60,70,80,90,100];
arr.sort((a, b) => {
    return b - a;
})

//二维数组 倒序
var arr=[[3,2,1],[5,7,4],[4,6,2],[8,2,1],[4,1,7]];
arr.sort((a, b) => {
    return b[0] - a[0];
})
/*
0: (3) [8, 2, 1]
1: (3) [5, 7, 4]
2: (3) [4, 6, 2]
3: (3) [4, 1, 7]
4: (3) [3, 2, 1]
*/

```

16、Array.slice(开始的索引,结束的索引);把截取的数组的值放在一个新的数组中,但是不包含结束的索引对应的元素值

```js
var arr=[10,20,30,40,50,60,70,80,90,100];
var newArr= arr.slice(3,7);
console.log(newArr);// [40, 50, 60, 70]
```

17、Array.splice(开始的位置,要删除的个数,替换的元素的值);一般是用于删除数组中的元素,或者是替换元素,或者是插入元素（重点++）

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
myFish.splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
console.log(myFish);//["angel", "clown", "drum", "mandarin", "sturgeon"]

myFish.splice(2, 1); // 从索引为2的位置删除一项（也就是'drum'这一项）
console.log(myFish);//["angel", "clown", "mandarin", "sturgeon"]
```

## String对象

**charAt()**: 返回在指定位置的字符。

**charCodeAt()**: 返回在指定的位置的字符的 Unicode 编码。

```js
var s = "Smile forever!";
s.charAt(2);  //i
s.charCodeAt(2);  //105
```

**concat()**: 连接字符串，参数可以是多个字符串。

```js
var s1 = "Smile forever!";
var s2 = "extend";
s1.concat(s2);  //Smile forever!extend
s1.concat("a","b") //Smile forever!ab
```

**split()**: 用于把一个字符串分割成字符串数组。

```js
var s = "get out";
s.split("");  //g,e,t, ,o,u,t
s.split(" ");  //get,out
s.split("",3);  //g,e,t 第二个参数指定返回的数组的最大
```

**replace()**: 替换字符串。该方法接受两个参数，第一个参数是被替换的字符串或正则表达式(RegExp对象)，第二参数是一个字符串或函数。如第一个参数是字符串，则只会替代第一个子字符串，需要全部替换，需要用正则表达式，指定全局标志g。

```js
var s = "cat, bat, sat";
s.replace("at","od");  //cod, bat, sat
s.replace(/at/g,"od");  //cod, bod, sod
```

**indexOf()**: 返回某个指定的字符串值在字符串中首次出现的位置。该方法对大小写敏感！

**lastIndexOf()**: 从后向前搜索字符串。该方法对大小写敏感！

```js
var s = "Smile forever!";
s.indexOf("smile");  //-1
s.indexOf("Smile");  //0
s.indexOf("e",6);  //9,第二个参数规定在字符串中开始检索的位置。
s.indexOf("e");  //4
s.lastIndexOf("e");  //11
```

**match()**: 在字符串内检索指定的**值**，或找到一个或多个正则表达式的匹配。注意标志g(全局搜素模式)。

**search()**: 参数与match()相同，返回字符串中第一个匹配项的**索引**，若没有找到匹配项，则返回-1。

```js
var str="1 plus 2 plus 3";
str.match("p");  //p
str.match(/\d+/); //1 
str.match(/\d+/g); //1,2,3

var s = "Smile forever!";
s.search("smile");  //-1
s.search(/le/);  //3
```

**slice()**: 提取字符串。slice(start,[end])

```js
var s = "Smile forever!";
s.slice(2);  //ile forever!
s.slice(2,4);  //il
s.slice(-4,-2); //ve
```

**substr()**: substr(start,[length])  ！注意：ECMAscript 没有对该方法进行标准化，因此反对使用它。

```js
var s = "Smile forever!";
s.substr(2);  //ile forever!
s.substr(2,5);  //ile f
s.substr(-4,2); //ve
```

**substring()**: substring(start,[stop]) 其内容是从 *start* 处到 *stop*-1 处的所有字符。如*start* 与 *stop* 相等，则返回空串。不接受负值！

```js
var s = "Smile forever!";
s.substring(2);  //ile forever!
s.substring(2,4);  //il
s.substring(2,2);  //
```

**toLowerCase()**: 把字符串转换为小写。

**toUpperCase()**: 把字符串转换为大写。

```js
var s = "Smile forever!";
s.toLowerCase();  //smile forever!
s.toUpperCase();  //SMILE FOREVER!
```

另外，toLocaleUpperCase()、toLocaleLowerCase()方法按照本地方式把字符串转换为大小写。只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与上面两张方法一样。

**trim()**: 删除字符串首位的空格。该方法只是创建字符串的副本，不会改变原字符串。

```js
var s = "   Smile   ";
s.trim();  //Smile
```

## Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

　　很多时候我们把Set叫做 集合,但是，Set可以是集合，集合不一定是Set。

　　特性：唯一性=>不重复=>能够对数据进行去重操作。

注：集合去重，是全等匹配，===。

### 创建Set

　　Set 本身是一个构造函数，调用构造函数用来生成 Set 数据结构。　　
　　　　关键词　　标识符　= new Set();
　　例 　　 let　　　　i　　 = new Set();　　
　　Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来进行数据初始化。

　　　　　 let i = new Set([1, 2, 3, 4, 4]);　　会得到　　set{1, 2, 3, 4,}

注：如果初始化时给的值有重复的，会自动去除。集合并没有字面量声明方式。

### Set的属性

　　常用的属性就一个：size 　　返回 Set 实例的成员总数。

　　let s = new Set([1, 2, 3]);

　　console.log( s.size ); // 3

### Set的方法

　　Set 实例的方法分为两大类：操作方法（用于数据操作）和遍历方法（用于遍历数据）。

### 操作方法:

| add(value)    | 添加数据，并返回新的 Set 结构              |
| ------------- | ------------------------------------------ |
| delete(value) | 删除数据，返回一个布尔值，表示是否删除成功 |
| has(value)    | 查看是否存在某个数据，返回一个布尔值       |
| clear()       | 清除所有数据，没有返回值                   |

```js
let set = new Set([1, 2, 3, 4, 4]);
// 添加数据 5
let addSet = set.add(5);
console.log(addSet); // Set(5) {1, 2, 3, 4, 5}
// 删除数据 4s
let delSet = set.delete(4);
console.log(delSet); // true
// 查看是否存在数据 4
let hasSet = set.has(4);
console.log(hasSet); // false
// 清除所有数据
set.clear();
console.log(set); // Set(0) {}
```

### 遍历方法

Set 提供了三个遍历器生成函数和一个遍历方法。

| values()  | 返回一个键值的遍历器     |
| --------- | ------------------------ |
| entries() | 返回一个键值对的遍历器   |
| forEach() | 使用回调函数遍历每个成员 |

```js
let color = new Set(["red", "green", "blue"]);
for(let item of color.keys()){
 console.log(item);
}
// red
// green
// blue
for(let item of color.values()){
 console.log(item);
}
// red
// green
// blue
for(let item of color.entries()){
 console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
color.forEach((item) => {
 console.log(item)
})
// red
// green
// blue
```

### 与数组相关操作

#### Set 转数组：

由于扩展运算符...，内部的原理也是使用的 for-of 循环，所以也可以用于操作 Set 结构。

例如将 Set 结构转换为数组结构：　　　　　　　

```
let color = new Set(["red", "green", "blue"]);
let colorArr = [...color];
```

#### 数组去重：

扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。

```js
let arr = [1,2,2,2,2,"2",24,5,6];
//step1:数组转集合
let set = new Set(arr);//已经去掉重复值，当前不是数组，而集合　　Set { 1, 2, '2', 24, 5, 6 }
//step2:集合转数组
arr = [...set];//[ 1, 2, '2', 24, 5, 6 ]
```

#### 扩展

```js
let num1 = new Set([1, 2, 3, 4]);
let num2 = new Set([3, 4, 5, 6]);

//并集
let union = new Set([...num1,...num2]);
console.log(union);//Set { 1, 2, 3, 4, 5, 6 }

//交集
let intersect = new Set(
    [...num1].filter(x=> num2.has(x))
)
console.log(intersect); //Set { 3, 4 }

//差集
let difference = new Set(
    [...num1].filter(x => !num2.has(x))
)
console.log(difference); //Set { 1, 2 }
```

## Map：

Map是一组键值对的结构，具有极快的查找速度。

举个例子，假设要根据同学的名字查找对应的成绩，如果用Array实现，需要两个Array：

```js
var names = ['Michael', 'Bob', 'Tracy'];
var scores = [95, 75, 85];
```

给定一个名字，要查找对应的成绩，就先要在names中找到对应的位置，再从scores取出对应的成绩，Array越长，耗时越长。

如果用Map实现，只需要一个“名字”-“成绩”的对照表，直接根据名字查找成绩，无论这个表有多大，查找速度都不会变慢。用JavaScript写一个Map如下：

```js
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```

初始化`Map`需要一个二维数组，或者直接初始化一个空`Map`。`Map`具有以下方法：

```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

```js
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```
