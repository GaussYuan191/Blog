---
title: leetcode-重新学动态规划
categories:
  - - 刷题
tags:
  - 动态规划
mathjax: false
abbrlink: 17343
date: 2021-09-22 22:13:00
updated: 2021-09-22 22:13:00
---

最近在刷动态规划的题目 ，决定重新整理一下关于动态规划的知识

<!-- more -->

## 什么是动态规划

动态规划，英文：Dynamic Programming，简称DP，如果某一问题有很多重叠子问题，使用动态规划是最有效的。

所以动态规划中每一个状态一定是由上一个状态推导出来的，**这一点就区分于贪心**，贪心没有状态推导，而是从局部直接选最优的，

## 动态规划的解题步骤

1. 确定dp数组（dp table）以及下标的含义
2. 确定递推公式
3. dp数组如何初始化
4. 确定遍历顺序
5. 举例推导dp数组

## 实战

### 打家劫舍

[力扣题目链接](https://leetcode-cn.com/problems/house-robber/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

**示例：**

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

**分析：**

1.确定dp数组，这里我们可以设dp[i]表示i间房偷窃的最高金额

2.由题意可知偷第i间房可得dp[i] = dp[i - 2] + nums[i],偷i - 1间房(**重点是偷i- 1间房，应为不能连着偷，即不偷i间房**)可得dp[i] = dp[i - 1]

3.由题意可知 dp[0] = nums[0], dp[1] = max(nums[0], nums[1])

4.由2可知是从前往后遍历的

5.输入[2,7,9,3,1]

dp[i] = [2,7,11,11,12]

```js
var rob = function(nums) {
    let dp = [];
    if (len < 2) {
        return len === 1 ? nums[0] : Math.max(nums[0], nums[1]);
    }
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[nums.length - 1];
};
//压缩一下 可以用三个变量代替
```

### 打家劫舍II

[力扣题目链接](https://leetcode-cn.com/problems/house-robber-ii/)

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

**示例：**

```
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**分析**

本题和上题的区别就是首尾不能同时选，所以只考虑包含头或者尾的情况。

```js
var rob = function(nums) {
    const len = nums.length;
    if (len <= 2) {
        return len == 1 ? nums[0] : Math.max(nums[0], nums[1]);
    }
    const robs = ((i, j) => {
        let a = nums[i];
        let b = Math.max(nums[i], nums[i + 1]);
        let res = 0;
        if (j - i <= 2) {
            return j - i == 1 ? a : b;
        }
        for (let k = i + 2; k < j; k++) {
            res = Math.max(a + nums[k], b);
            a = b;
            b = res;
        }
        return res;
    })
    let ans1 = robs(0, len - 1);
    let ans2 = robs(1, len);
    return ans1 > ans2 ? ans1 : ans2; 
};
```

## 337.打家劫舍 III

[力扣题目链接](https://leetcode-cn.com/problems/house-robber-iii/)

给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例:**

```
输入: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \ 
     3   1

输出: 7 
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.

输入: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \ 
 1   3   1

输出: 9
解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
```

**分析**
1.由题可知每个结点有两种状态[偷，不偷]

val1表示偷该结点盗取最大的值，val2表示不偷该结点盗取最大的值

2.偷该结点则不偷儿子结点 val1 = val + left[1] + right[1]

  不偷该结点则为两个儿子结点两种状态的最大值的和

  val2 = max(left[0], left[1]) + max(right[0], right[1])

3.偷的结点是空 则返回 [0, 0]

4.由上可知由儿子结点推父结点则采用后续遍历

```js
var rob = function(root) {
   const dfs = (node) => {
     if (node == null) return [0, 0];
     let left = dfs(node.left);
     let right = dfs(node.right);
     let val1 = node.val + left[1] + right[1];
     let val2 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
     return [val1, val2]; 
   }
   let ans = dfs(root);
   return Math.max(...ans);

};
```

