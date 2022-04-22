---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2020-CSICTF-Crypto-little RSA-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-02-03
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---

 

题目包含一个flag.zip 有加密密码，一个enc.txt
 ent.txt中的数据



```swift
c=32949
n=64741
e=42667
```

那么我们就可以利用网站将n分解然后使用脚本解密



```python
import gmpy2
c = 32949
n = 64741
e = 42667
p = 101
q = 641
phi = (p - 1) * (q - 1)  # φ(n)
d = gmpy2.invert(e, phi)
a = pow(c, d, n)  # c的d次方 mod n
print(a)
```



输出a的结果`18429` 便是flag.zip的解压密码，然后解压后就是flag的文本文件
flag`csictf{gr34t_m1nds_th1nk_4l1ke}`