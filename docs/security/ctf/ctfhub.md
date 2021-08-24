---
# 这是页面的图标
icon: page
# 这是文章的标题
title: CTFHub-SSRF
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
