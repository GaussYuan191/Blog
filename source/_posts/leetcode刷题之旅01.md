---
title: leetcode刷题之旅01
categories:
  - - 算法刷题
tags:
  - 栈
mathjax: false
abbrlink: 9594
date: 2021-03-09 16:51:58
updated: 2021-03-09 16:51:58
---

Js中String自带栈的效果

<!-- more -->

题目如下：

给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

在 S 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

 

示例：

```html
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```



**提示：**

1. `1 <= S.length <= 20000`
2. `S` 仅由小写英文字母组成。



解法：用栈可以解决，新加入的和栈顶的相比较，如果相同就出栈，不相同就进栈，当循环完后只要把栈里剩下的元素循环输出就行了。代码如下

```js
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
   let obj = []
   for(const ans of S) {
       if(obj.length && obj[obj.length - 1] === ans) {
           obj.pop()
       }
       else {
           obj.push(ans)
       }
   }
   return obj.join('')
   
};
```



题目链接：https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/

