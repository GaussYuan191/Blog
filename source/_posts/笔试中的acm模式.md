---
title: 笔试中的acm模式
categories:
  - - null
tags:
  - null
mathjax: false
abbrlink: 61258
date: 2021-10-09 14:15:08
updated: 2021-10-09 14:15:08
---

ACM模式下JS的输入与输出

<!-- more -->

总结一下遇到的ACM模式

## 牛客网

### v8环境

以计算a + b 为例

输入

```
1 5
10 20
```

输出

```js
6
30
```

代码如下

```js
while (line=readline()) {
    let num1 = parseInt(line.split(' ')[0]);
    let num2 = parseInt(line.split(' ')[1]);
    print(num1 + num2);
}
```

小结：v8模式下的输入是**readline()**,读的是字符串，一行一行地读，如果有空格用spilt(' ')分割，如果要运行用parseInt()转成数字，toFixed(n)保留n位有效数字。输出用console.log()或者print()

### node.js

以计算a + b 为例

输入

```
1 5
10 20
```

输出

```js
6
30
```

代码如下

```js
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function(line){
    var tokens = line.split(' ');
    console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});
```

小结：node环境下需要引入 readline模块，相对于v8来说比较麻烦，所以有v8就用v8

## 赛码网

### v8

## [版本](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=版本-3)

> Google V8 Engine(6.2.340)

## [输入API](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=输入api)

### [读取一行输入](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=读取一行输入)

> read_line()

> 将读取至多1024个字符，当还未达到1024个时如果遇到回车或结束符，提前结束。

> 读取多行最简单的办法是while((line = read_line()) != '')。

> 或者使用下一个API。

### [读取n个字符](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=读取n个字符)

> gets(n)

> 将读取至多n个字符，当还未达到n个时如果遇到回车或结束符，会提前结束。

> 回车符可能会包含在返回值中。

### [读取一个（长）整数](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=读取一个（长）整数)

> readInt()

### [读取一个浮点型](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=读取一个浮点型)

> readDouble()

## [输出API](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=输出api)

### [不加回车的输出](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=不加回车的输出)

> printsth(sth, ...)

> 往控制台输出sth，当有多个参数时，空格分隔；最后不加回车。

### [带回车的输出](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=带回车的输出)

> print(sth, ...)

> console.log(sth, ...)

> 往控制台输出sth，当有多个参数时，空格分隔；最后加回车。

## [示例代码1](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=示例代码1)

```js
var a, b;
var solveMeFirst = (a,b) => a+b;
while((a=readInt())!=null && (b=readInt())!=null){
    let c = solveMeFirst(a, b);
    print(c);
}
```

## [示例代码2](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=示例代码2)

```js
var line;
var solveMeFirst = (a,b) => a+b;
while((line = read_line()) != ''){
    let arr = line.split(' ');
    let a = parseInt(arr[0]);
    let b = parseInt(arr[1]);
    let c = solveMeFirst(a, b);
    print(c);
}
```

## [V8源码](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=v8源码)

> https://github.com/acmcodercom/v8/tree/forstdio_baseon_6.2.340/samples

# [Nodejs](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=nodejs)

## [版本](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=版本-4)

> 6.9.1

## [输入输出](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=输入输出-1)

> process.stdin、process.stdout

> readline

> node-stdio (https://www.npmjs.com/package/node-stdio)

## [示例代码1](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=示例代码1-1)

```js
var cmd = require('node-stdio')
var a, b;
var solveMeFirst = (a,b) => a+b;
while((a=cmd.readInt())!=null && (b=cmd.readInt())!=null){
    let c = solveMeFirst(a, b);
    cmd.print(c);
}
```

## [示例代码2](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=示例代码2-1)

```js
process.stdin.resume();
process.stdin.setEncoding('utf-8');
 
var input = "";
var input_array = "";

//这里不灵活，需要全部读取数据后再处理，容易超内存。
process.stdin.on('data', function (data) {
    input += data;
});

var solveMeFirst = (a, b) => a+b;

process.stdin.on('end', function () {
    let arr = input.split("\n");
    for (var i=0; i<arr.length; i++) {
        if (arr[i] != '') {
            input_array = arr[i].split(" ");
            
            let inline = 0;
            let res;
            let _a = parseInt(input_array[inline].trim(), 10);
            inline += 1;
        
            let _b = parseInt(input_array[inline].trim(), 10);
            inline += 1;
        
            res = solveMeFirst(_a, _b);
            process.stdout.write("" + res + "\n");
        }
    }
});
```

## [示例代码3](https://labfiles.acmcoder.com/ojhtml/index.html#/?id=示例代码3)

```js
var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});
rl.prompt();

var solveMeFirst = (a, b) => a+b;

rl.on('line', function (data) {
    let arr = data.split(' ');
    if (arr && arr.length==2) {
        let c = solveMeFirst(+arr[0], +arr[1]);
        process.stdout.write('' + c + '\n');
    }
});
```

