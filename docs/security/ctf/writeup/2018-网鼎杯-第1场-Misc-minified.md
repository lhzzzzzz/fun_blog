---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2018-网鼎杯-第1场-Misc-minified-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-01-27
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



题目：ctfhub - minified

首先用steg打开
![image-20220422160410866](/assets/img/image-20220422160410866.png)

我们不断向右查看，到red0时会发现是空白的。


![image-20220422160418454](/assets/img/image-20220422160418454.png)

猜测零通道问题，所以将alpha0，red0，green0，blue0，分别保存为bmp格式的图片
![image-20220422160427383](/assets/img/image-20220422160427383.png)

最后进行xor操作。经过一个一个的测试可以发现，对alpha0跟green0进行xor操作会得到flag。
先打开green0.bmp，然后analyse—image 打开alpha0.得到flag。
![image-20220422160433798](/assets/img/image-20220422160433798.png)
