---

title: leetcode刷题
categories:
  - - 刷题
tags:
  - 刷题
mathjax: false
abbrlink: 35458
date: 2021-09-10 21:42:49
updated: 2022-1-2 21:42:49
---

本篇博客记录每天刷题的记录，每天更新(已更新第十天)。

<!-- more -->

## 第一天

#### [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

**示例：**

```html
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

**暴力解法**

想法很简单直接比较nums1 nums2，小的插到大的前面，然后把最后的元素抛出(因为最后的元素都是0)如果nums1遍历完了就直接把nums2插入就行。

```js
var merge = function(nums1, m, nums2, n) {
    let j = 0;
    for (let i = 0; i < m + n; i++) {
        if (nums1[i] > nums2[j]) {
            nums1.splice(i, 0, nums2[j]);
            j++;
            i++;
            nums1.pop();
        }
        if (i - j >= m) {
            nums1.splice(i, 0, nums2[j]);
            j++;
            nums1.pop();
        }
    }
};
```

**暴击法2**

直接从后开始比较，大的插到最后，直到nums2插完。

```js
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let end = m + n - 1;
    while(j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[end] = nums1[i];
            i--;
            end--;
        } else {
            nums1[end] = nums2[j];
            j--;
            end--;
        }
    } 
};
```

## 第二天

#### [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

**示例：**

```js
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**暴力法**

找一个最小值，然后每个值与最小值相减取最大值

```js
    var maxProfit = function(prices) {
      const len = prices.length;
      if (len <= 1) return 0;
      let min = prices[0], max = 0;
      for (let i = 0; i < len; i++) {
        max = Math.max(max, prices[i] - min);
        min = Math.min(min, prices[i]);
      }
 }
```

**动态规划**

```js
易知每天有两种状态
dp[i][0] 表示第i天持股能获得最多的利润
dp[i][1] 表示第i天不持股能获得最多的利润
i天持股     i天买入股份                         i - 1天持股
           -prices[i]                        dp[i - 1][0]
i天不持股   i天卖股份                           i - 1天卖股份 
   i - 1天持股 + prices[i]                    dp[i - 1][1]
   
取最大值，易知不持股的状态的利润大于持股的状态，即答案为dp[len - 1][1]
var maxProfit = function(prices) {
    const len = prices.length;
    if (len <= 1) return 0;
    let dp = new Array(len).fill([0, 0]);
    dp[0][0] = -prices[0];
    dp[0][1] = 0;
    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
    }
    return dp[len - 1][1];
};
```

## 第三天

#### [字符串相加](https://leetcode-cn.com/problems/add-strings/)

给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。

你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

**示例：**

```js
输入：num1 = "11", num2 = "123"
输出："134"
输入：num1 = "456", num2 = "77"
输出："533"
输入：num1 = "0", num2 = "0"
输出："0"
```

暴力法

```js
//每一位进行运行 最后判断是否有进位，然后把结果字符串反向就行了
var addStrings = function(num1, num2) {
  let ans = '', ten = 0, one = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;
  if (num1 == '0') return num2;
  if (num2 == '0') return num1;
  if (num1 == '0' && num2 == '0') return num1;
  while(i >= 0 || j >= 0) {
    let val1 = num1[i] == undefined ? 0 : num1[i] - '0';
    let val2 = num2[j] == undefined ? 0 : num2[j] - '0';
    one = (val1 + val2 + ten ) % 10;
    ans += one;
    ten = val1 + val2 + ten - 10 >= 0 ? 1 : 0; 
    i--;
    j--;
  }
  if (ten == 1) {
    ans += 1;
  }
  return ans.split('').reverse().join('');
};
// 可稍微优化下
var addStrings = function(num1, num2) {
    var index1 = num1.length - 1;
    var index2 = num2.length - 1;
    var res = [];
    var up = 0;
    while(index1 >= 0 || index2 >= 0){
        var n1 = parseInt(index1 >= 0 ? num1[index1] : 0);
        var n2 = parseInt(index2 >= 0 ? num2[index2] : 0);
        var sum = n1 + n2 + up;
        up = sum >= 10 ? 1 : 0;
        res.unshift(sum % 10);
        index1--;
        index2--;
    }
    // 最后判断一下进位是否为1，为1则加入到res
    if(up === 1){
        res.unshift(1);
    }
    return res.join('');
};
```

## 第四天

#### [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例：**

```js
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串
输入: s = ""
输出: 0
```

滑动窗口

```js
//维护一个数组 如果有重复的 就从重复的那里分隔字符串
var lengthOfLongestSubstring = function(s) {
  let maxStr = [];
  let res = 0;
  if (s.length == 0) return 0;
  for (let i = 0; i < s.length; i++) {
    let index = maxStr.indexOf(s[i]);
    if (index == -1) {
      maxStr.push(s[i]);
    } else {
      maxStr = maxStr.splice(index + 1);
      maxStr.push(s[i]);
    }
    res = Math.max(res, maxStr.length);
  }
  return res;
};
```

Map  

```js
// 用map维护最大字符串的下标的长度，最大长度为下标+1
var lengthOfLongestSubstring = function(s) {
  let map = new Map(),max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i);
      console.log(i);
    }
    max = Math.max(max, j - i + 1);
    map.set(s[j], j);
  }
  return max;
};
```

## 第五天

#### [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

给你两个版本号 version1 和 version2 ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

- 如果 `*version1* > *version2*` 返回 `1`，
- 如果 `*version1* < *version2*` 返回 `-1`，
- 除此之外返回 `0`。

**示例：**

```js
输入：version1 = "1.01", version2 = "1.001"
输出：0
解释：忽略前导零，"01" 和 "001" 都表示相同的整数 "1"
输入：version1 = "0.1", version2 = "1.1"
输出：-1
解释：version1 中下标为 0 的修订号是 "0"，version2 中下标为 0 的修订号是 "1" 。0 < 1，所以 version1 < version2
输入：version1 = "1.0.1", version2 = "1"
输出：1
```

split

```js
// 用split把字符串分割，然后用parseInt比较大小
var compareVersion = function(version1, version2) {
  let ver1 = version1.split('.');
  let ver2 = version2.split('.');
  let i = 0, j = 0;
  while (i < ver1.length || j < ver2.length) {
     if (i < ver1.length) {
         ver1[i] = ver1[i++];
     }
      if (j < ver2.length) {
          ver2[j] = ver2[j++];
      }
     if (parseInt(ver1[i]) > parseInt(ver2[j])) {
       return 1;
     } 
     if (parseInt(ver1[i]) < parseInt(ver2[j])) {
       return -1;
     } 
  }
  return 0;

};
```

双指针

```js
// 双指针 碰到. 停止 比较一下
var compareVersion = function(version1, version2) {
    let len1 = version1.length, len2 = version2.length;
    let i = 0, j = 0;
    while (i < len1 || j < len2) {
        let num1 = 0, num2 = 0;
        while (i < len1 && version1[i] != '.') {
            num1 += num1 * 10 + version1[i] - '0';
            i++;
        }
        i++;
        while (j < len2 && version2[j] != '.') {
            num2 += num2 * 10 + version2[j] - '0';
            j++;
        }
        j++;
        if (num1 > num2) {
            return 1;
        }
        if (num1 < num2) {
            return -1;
        }
    }
    return 0;
};
```

## 第六天

#### [ 两数之和](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例：**

```js
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
输入：nums = [3,2,4], target = 6
输出：[1,2]
输入：nums = [3,3], target = 6
输出：[0,1]
```

Map

```js
 // map 存 nums[i], i 判断target - nums[i] 在不在map中
var twoSum = function(nums, target) {
    let map = new Map();
    let len = nums.length;
    for(let i = 0; i < len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};
```

## 第七天

#### [最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例：**

```js
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
输入：nums = [1]
输出：1
输入：nums = [0]
输出：0
```

动态规划

```js
// dp[i]表示包含i最大的子序列和 取最大值即为答案
//dp[i] = max(dp[i - 1] + nums[i], nums[i])
var maxSubArray = function(nums) {
  let cnt = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cnt = Math.max(cnt + nums[i],  nums[i]);
    max = Math.max(max, cnt);
  }
  return max;
};

```

详细的过程：https://leetcode-cn.com/problems/maximum-subarray/solution/dong-tai-gui-hua-fen-zhi-fa-python-dai-ma-java-dai/

贪心

```js
 // 贪心 如果这个序列 + nums[i] 大于0 则继续相加 否则赋0 更新最大值 
var maxSubArray = function(nums) {
  let len = nums.length, max = 0, res = -100005;
  for (let i = 0; i < len; i++) {
     max += nums[i];
     if (max > res) {
        res = max;
     }
     if (max < 0) max = 0;
  }
  return res;
  
};
```

## 第八天

#### [全排列](https://leetcode-cn.com/problems/permutations/)

给定一个不含重复数字的数组 `nums` ，返回其 **所有可能的全排列** 。你可以 **按任意顺序** 返回答案。

**示例：**

```js
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
输入：nums = [0,1]
输出：[[0,1],[1,0]]
输入：nums = [1]
输出：[[1]]
```

回溯法，如果对回溯法不了解的同学可以看下

https://programmercarl.com/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC

```js
var permute = function(nums) {
  let res = [], path = [];
  backtracking(nums, nums.length, []);
  return res;
  function backtracking(n, k, used) {
    // 设置出口
    if (path.length == k) {
      res.push(Array.from(path));
      return;
    }
      //横向遍历
    for (let i = 0; i < k; i++) {
      if (used[i]) continue;
      path.push(n[i]);
      used[i] = true;
      backtracking(n, k, used);  //纵向遍历
      path.pop();                //回溯
      used[i] = false;
    }
  }
};
```

#### [全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

**示例：**

```js
输入：nums = [1,1,2]
输出：
[[1,1,2],
[1,2,1],
[2,1,1]]
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

回溯+剪枝

```js
var permuteUnique = function(nums) {
    let res = [], path = [];
    nums.sort();
    backtracking(nums, nums.length, []);
    return res;
    function backtracking(n, k, used) {
        // 设置出口
        if (path.length == k) {
            res.push(Array.from(path));
            return;
        }
        for (let i = 0; i < k; i++) {
            // used[i - 1] = false为树剪枝 used[i - 1] = true 为层剪枝
            if (nums[i] == nums[i - 1]&& used[i - 1] == false) {
                continue;
            }
            if (!used[i]) {
                path.push(n[i]);
                used[i] = true;
                backtracking(n, k, used);
                path.pop();
                used[i] = false;
            }
        }
    }
};
```

## 第九天

假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：**给定 *n* 是一个正整数。

**示例：**

```js
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

动态规划

```js
//f(x)=f(x−1)+f(x−2)
var climbStairs = function(n) {
  let dp1 = 1, dp2 = 2, dp3 = 0;
  if (n <= 2) return n;
  for (let i = 2; i < n; i++) {
    dp3 = dp1 + dp2;
    dp1 = dp2;
    dp2 = dp3; 
  }
  return dp3;
};
```

~~**矩阵快速幂**~~

具体解答可看

https://leetcode-cn.com/problems/climbing-stairs/solution/pa-lou-ti-by-leetcode-solution/

https://www.cnblogs.com/cmmdc/p/6936196.html

```js
var climbStairs = function(n) {
    const q = [[1, 1], [1, 0]];
    const res = pow(q, n);
    return res[0][0];
};

const pow = (a, n) => {
    let ret = [[1, 0], [0, 1]];
    while (n > 0) {
        if ((n & 1) === 1) {
            ret = multiply(ret, a);
        }
        n >>= 1;
        a = multiply(a, a);
    }
    return ret;
}

const multiply = (a, b) => {
    const c = new Array(2).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
        }
    }
    return c;
}
```

## 第十天

#### [ 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

**示例：**

```js
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
输入：head = [1,2]
输出：[2,1]
```

栈

```js
// 先存到栈中 在建一个新的链表
var reverseList = function(head) {
    let stack = [], p = head, i = 0, tail, nhead = new ListNode(-1);
    let len = 0;
    while (p) {
        stack.push(p.val);
        p = p.next;
    }
    tail = nhead;
    len = stack.length;
    while (i < len) {
        p = new ListNode(stack.pop());
        tail.next = p;
        tail = tail.next;
        i++;
    }
    return nhead.next;

};
```

链表头插法

```js
var reverseList = function(head) {
    let p = head, pnew, nhead = null;
    while (p) {
        pnew = new ListNode(p.val);
        if (!nhead) {
            nhead = pnew;
            p = p.next;
            continue;
        }
        pnew.next = nhead;
        nhead = pnew;
        p = p.next;
    } 
    return nhead;
};
```

### 第十一天

#### [数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `**k**` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

**示例：**

```js
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

快排的思想

```js
//，随机选取数组中的数，把数组分成大于这个数的和小于这个数的,求一下比它大的数组的长度就这个该数在数组中的大小了
var findKthLargest = function(nums, k) {
    function findK(nums, k){
        let right = [],left = [], mid = Math.floor(Math.random()*nums.length),cnt = 0;
        cnt = nums[mid];
        nums.splice(mid, 1);
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > cnt) {
                right.push(nums[i]);
            } else {
                left.push(nums[i]);
            }
        }
        //  console.log(k, cnt, left, right, nums);
        if (right.length == k - 1) return cnt;
        else if (right.length > k - 1) return findK(right
                                                    , k);
        else return findK(left, k - right.length - 1);

    }
    let res = findK(nums, k);
    return res;	
};
```

### 第十二天

#### [ 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

**示例：**

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

快慢指针

```js
//快指针走两步，慢指针走一步 ，如果快慢指针相遇则证明有环
var hasCycle = function(head) {
    let fast = head, slow = head;
    if (head == null) return false;
    while (fast) {
        if (fast.next == null)  return false;
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast ) return true;
    }
    return false;
};
```

### 第十三天

#### [求根节点到叶节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
每条从根节点到叶节点的路径都代表一个数字：

例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
计算从根节点到叶节点生成的 所有数字之和 。

叶节点 是指没有子节点的节点。

**示例：**

```js
输入：root = [1,2,3]
输出：25
解释：
从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25
```

```js
//dfs
var sumNumbers = function(root) {
    const getValue = (node, sum) => {
        if (node == null) return 0;
        let nsum = sum * 10 + node.val;
        if (node.left == null && node.right == null) {
            return nsum;
        } else {
            return getValue(node.left, nsum) + getValue(node.right, nsum);
        }
    }
    return getValue(root, 0);
};
```

### 第十四天

#### [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

**示例：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
输入：s = "cbbd"
输出："bb"
```

```js
//动态规划     
var longestPalindrome = function(s) {
      const len = s.length;
      if (len == 1) return s;
      if (len == 2) return s[0] == s[1] ? s : s[0];
      let dp = Array(len).fill().map(() => Array(len).fill(0));
      let maxlen = 1, st = 0;
      for (let i = 0; i < len; i++) {
        dp[i][i] = 1;
      }
      for (let i = 2; i <= len; i++) {
        for (let j =  0; j + i <= len; j++) {
          let t = i + j - 1;
          if (s[j] != s[t]) continue;
          if (i > 2 && !dp[j + 1][t - 1]) continue;
          dp[j][t] = 1;
          maxlen = i;
          st = j;
        }
      }
      return s.slice(st, maxlen + st);
    };
```

### 第十五天

#### [盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

**示例：**

![](/gallery/Xnip2021-11-21_21-50-56.jpg)

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

```
// 双指针法 从较矮的一端开始移动
var maxArea = function(height) {
  let max = 0, l = 0, r = height.length - 1;
  while (l < r) {
    let maxVal = Math.min(height[l], height[r]) * (r - l);
    max = Math.max(max, maxVal);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
};
```

### 第十六天

#### [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![](/gallery/Xnip2021-11-23_22-13-12.jpg)

```js
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
输入：digits = ""
输出：[]
```

```js
//递归 回溯法
var letterCombinations = function(digits) {
  let res= [];
  if (digits == null) return res;
  let map = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  const dfs = (cur, t) => {
    if (cur == digits.length) {
      res.push(t);
      return;
    }
    let index = digits[cur] - '0' - 2;
    for (let c of map[index]) {
      dfs(cur + 1, t + c);
    }

  };
  dfs(0, "");
  return res;
};
//bfs 层次遍历
var letterCombinations = function(digits) {
  let res = [];
  if (digits.length == 0) return res;
  let map = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  res.push('');
  for (let i = 0; i < digits.length; i++) {
    const levelSize = res.length;
    for (let j = 0; j < levelSize; j++) {
      const curStr = res.shift();
      console.log(curStr);
      const letters = map[digits[i] - '2'];
      for (const l of letters) {
        res.push(curStr + l);
      }
    }
  }
  return res;
};
```

### 十七天

#### [最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

给两个整数数组 `A` 和 `B` ，返回两个数组中公共的、长度最长的子数组的长度。

**示例：**

```js
输入：
A: [1,2,3,2,1]
B: [3,2,1,4,7]
输出：3
解释：
长度最长的公共子数组是 [3, 2, 1] 。
```

```js
// 方法1 滑动窗口 时间复杂度（m + n) * min (m, n);
var findLength = function(nums1, nums2) {
    const maxLen = (arr1, i, arr2, j, len) => {
        let count = 0, max = 0;
        for (let k = 0; k < len; k++) {
            if (arr1[i + k] == arr2[j + k]) {
                count++;
            } else {
                count = 0;
            }
            max = Math.max(max, count);
        }
        return max;
    }
   
    let res = 0;
    let m = nums1.length, n = nums2.length;
    for (let i = 0; i < m; i++) {
        let len = Math.min(n, m - i);
        let max = maxLen(nums1, i, nums2, 0, len);
        res = Math.max(res, max);
    }
    for (let i = 0; i < n; i++) {
        let len = Math.min(m, n - i);
        let max = maxLen(nums1, 0, nums2, i, len);
        res = Math.max(max, res);

    }
    return res;

    
};
```

![](/gallery/最长重复字串.gif)

```js
// dp[i]][j] 表示以[i][j] 结尾的最长重复字串的长度
// 从后往前遍历 dp[i][j] 由dp[i + 1][j + 1] 决定的
var findLength = function(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    let dp = Array.from({length: m + 1}).map(item => new Array(n + 1).fill(0));
    let res = 0;
    for (let i = m - 1 ; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            dp[i][j] = nums1[i] === nums2[j] ? dp[i + 1][j + 1] + 1 : 0;
            res = Math.max(res, dp[i][j]);
        }
    }
    return res;
};
```

## 十八天

#### [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

**示例**：

```js
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
输入：target = 4, nums = [1,4,4]
输出：1
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

```js
// 暴力法 n^2 遍历i, j
var minSubArrayLen = function(target, nums) {
    let res = Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum >= target) {
                res = Math.min(res, j - i + 1);
            }
        }
    }
    return res == Number.MAX_VALUE ? 0 : res;
};
// 滑动窗口
var minSubArrayLen = function(target, nums) {
    let n = nums.length;
    if (n == 0) return 0;
    let ans = Number.MAX_VALUE;
    let start = 0, end = 0, sum = 0;
    while (end < n) {
        sum += nums[end];
        while (sum >= target) {
            ans = Math.min(ans, end- start + 1);
            sum -= nums[start];
            start++;
        }
        end++;
    }
    return ans == Number.MAX_VALUE ? 0 : ans;
};
```

## 十九天

#### [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

图示两个链表在节点 c1 开始相交：

![](/gallery/letcode-160.png)

题目数据 保证 整个链式结构中不存在环。

注意，函数返回结果后，链表必须 保持其原始结构 。

自定义评测：

评测系统 的输入如下（你设计的程序 不适用 此输入）：

intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
listA - 第一个链表
listB - 第二个链表
skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。

注意，相等不是数值相等，而是地址相等

```js
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let pA = headA, pB = headB;
    while (pA  != pB) {
        pA = pA != null ? pA.next : headB;
        pB = pB != null ? pB.next : headA;
    }
    return pA;
};
```

# 二十天

#### [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

 **示例：**

```js
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

```js
// 暴力法： 直接遍历每个下标
var minSubArrayLen = function(target, nums) {
    let res = Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum >= target) {
                res = Math.min(res, j - i + 1);
            }
        }
    }
    return res == Number.MAX_VALUE ? 0 : res;
};
// 滑动数组 找到一个满足条件的数组 然后缩短它的边界
var minSubArrayLen = function(target, nums) {
    let n = nums.length;
    if (n == 0) return 0;
    let ans = Number.MAX_VALUE;
    let start = 0, end = 0, sum = 0;
    while (end < n) {
        sum += nums[end];
        while (sum >= target) {
            ans = Math.min(ans, end- start + 1);
            sum -= nums[start];
            start++;
        }
        end++;
    }
    return ans == Number.MAX_VALUE ? 0 : ans;
};
```

#### [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。

**示例：**

```js
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

```js
// 辅助栈 另一个栈来存最小的

var MinStack = function() {
    this.res = [];
    this.min = [Number.MAX_VALUE];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    const item = this.min[this.min.length - 1];
    if (item > val) {
        this.min.push(val);
    } else {
        this.min.push(item);
    }
    this.res.push(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.res.pop();
    this.min.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.res[this.res.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min[this.min.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// 不用额外的空间，栈中存的进栈值与最小值的差值 
var MinStack = function() {
    this.min = Number.MAX_VALUE;
    this.res = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    const minV = this.min;
    if (val < minV) {
        // 更新最小值
        this.min = val;
    }
    // 保存最小值
    this.res.push(val - minV);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const item = this.res.pop();
    // 如果最栈顶的值是大于0，则不会影响最小值，如果大于0 ，最小值 - 减去差值
    if (item < 0) {
        this.min = this.min - item;
    }  // 返回差值+最小值
    return item + this.min;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    const lastValue = this.res[this.res.length - 1];
    // 如果栈顶小于0，则返回最小值
    return lastValue > 0 ? this.min + lastValue : this.min;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

# 二十一天

#### [ K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

进阶：

你可以设计一个只使用常数额外空间的算法来解决此问题吗？
你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

```js
// 将k个一组的反转链表的问题分解为n个反转链表的子问题
var reverseKGroup = function(head, k) {
    // 反转链表函数
    var reversList = function(a, b) {
        // 反转区间a, b上的节点
       
        let pre, cur, nxt;
        pre = null;
        cur = a; //用于循环
        nxt = a;
        // 进行的操作是每次循环将cur->pre, 注意b的方向没有改变
        while (cur != b) {
            // 保存a的下一个的值next
            nxt = cur.next;
            // 将cur指向上一个值的pre（反转指向）
            cur.next = pre;
            // 将pre 赋予当前值，当做下次循环的pre
            pre = cur;
            cur = nxt;
        }
        // pre 相当于 从后遍历到头，所有循环结束后，pre指向头节点
        
        return pre;
    }
    if (!head) {
        return null;
    }
    let a = head;
    let b = head;
    // 判断区间a,b可以分为多少个长度为k的子区间
    for (let i = 0; i < k; i++) {
        // 剩余的节点不足k个，反转结束
        if (b == null) {
            return head;
        } else {
            b = b.next;
        }
        
    }
    // 反转前k个元素
        let newHead = reversList(a, b);
        a.next = reverseKGroup(b, k);
        return newHead;
};
```

# 二十二天

#### [ 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

给定一个包含非负整数的 `*m* x *n*` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

**示例**

![](/gallery/minimun-path-sum.png)

```js
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
```

```js
// 简单的一道dp题 和之前走楼梯的思路差不多，不过这里dp[i][j]存的是从左或者从上来的最小值加上本身的数字

// dp[i][j] 表示到达i, j 所走的最短路径
 // dp[i][j] = Math.min(dp[i - 1][j], grid[i][j] ) +  + dp[i][j - 1]
var minPathSum = function(grid) {
    if (grid == null || grid.length == null || grid[0].length == null) return 0;
    let m = grid.length, n = grid[0].length;
    let dp = new Array(m).fill(0).map(item => new Array(n).fill(0));
    dp[0][0] = grid[0][0];
    for (let i = 1; i < n; i++) {
        dp[0][i] =  grid[0][i] + dp[0][i - 1];
    }
    for (let j = 1; j < m; j++) {
        dp[j][0] = grid[j][0] + dp[j - 1][0];
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
};
// 压缩状态 压缩列
var minPathSum = function(grid) {
    if (grid == null || grid.length == null || grid[0].length == null) return 0;
    let m = grid.length, n = grid[0].length;
    let dp = new Array(m).fill(0).map(item => new Array(n).fill(0));
    // dp[j] = dp[i - 1][j];
    // dp[j - 1] = dp[i][j - 1]
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) {
                dp[j] = grid[i][j]
            }
            else if (j == 0) {
                dp[j] = dp[j] + grid[i][j];
            }
            else if (i == 0) {
                dp[j] = dp[j - 1] + grid[i][j];
            } else {
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
            }
            
        }
    }
    return dp[n - 1];
};
```

# 二十三天

#### [翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

给你一个字符串 s ，逐个翻转字符串中的所有 单词 。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。

说明：

输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
翻转后单词间应当仅用一个空格分隔。
翻转后的字符串中不应包含额外的空格。

**示例：**

```js
输入：s = "the sky is blue"
输出："blue is sky the"
输入：s = "  hello world  "
输出："world hello"
解释：输入字符串可以在前面或者后面包含多余的空格，但是翻转后的字符不能包括。
```

```js
// 利用api trim去除字符串两端的空格， split以一个或多个空格(\s)分隔， reverse()反转， join(" ") 
// 以空格分开
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(" ")
};
// 利用双端队列 找出单词，然后连接
var reverseWords = function(s) {
    let left = 0, right = s.length - 1;
  let ans = [], word = ""
  while (s.charAt(left) == " ") left++;
  while (s.charAt(right) == " ") right--;
  while (left <= right) {
    let char = s.charAt(left);
    if (char == " " && word) {
      ans.unshift(word);
      word = ""
    } else if (char != " ") {
      word += char;
    }
    left++;
  }
  ans.unshift(word)
  return ans.join(" ");
};

```

