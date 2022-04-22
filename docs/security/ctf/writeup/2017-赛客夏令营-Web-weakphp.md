---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2017-赛客夏令营-Web-weakphp-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-01-30
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



居然是git泄露

![image-20220422154804116](/assets/img/image-20220422154804116.png)

通过利用工具得到目录

![image-20220422154848720](/assets/img/image-20220422154848720.png)

得到index.php

![image-20220422154854638](/assets/img/image-20220422154854638.png)

求是user和pass不相同而MD5却相等，验证了php弱类型的想法
🐻：
PHP在处理哈希字符串时，它把每一个以“0E”开头的哈希值都解释为0，所以如果两个不同的密码经过哈希以后，其哈希值都是以“0E”开头的，那么PHP将会认为他们相同，都是0。

以下值在md5加密后以0E开头：

QNKCDZO
240610708
s878926199a
s155964671a
s214587387a
s214587387a

![image-20220422154903954](/assets/img/image-20220422154903954.png)

GET传入user=QNKCDZO&pass=240610708就能绕过了

![image-20220422154914119](/assets/img/image-20220422154914119.png)