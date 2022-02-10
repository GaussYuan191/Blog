---
title: 传统diff与diff优化
categories:
  - - 总结
tags:
  - diff
mathjax: false
abbrlink: 49936
date: 2022-02-10 20:45:26
updated: 2022-02-10 20:45:26
---

![](/gallery/nor-diff-01.jpeg)

<!-- more -->

# 传统的diff

计算两颗树形结构差异并进行转换，传统diff算法是这样做的：循环递归每一个节点

![](/gallery/nor-diff-02.webp)

比如说左侧的树会依次和右侧的树比较，时间复杂度为O(n^2),找到不同后，还需要对不同的地方做出处理，时间复杂度为O(n),所以总的时间复杂度为O(n^3)，非常消耗性能

# diff的优化

- 只比较同一层，不跨级比较
- tag不相同，则会直接删除重建，不做深度比较
- tag和key都相同，则认为其为相同的节点，不再深度比较

