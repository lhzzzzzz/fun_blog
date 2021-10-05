---

# 这是页面的图标

icon: question
# 这是文章的标题
title: wpscan
# 设置作者
author: lhz
# 设置写作时间
time: 2021-09-06
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 解密
  -	wpscan

comment: false
typora-root-url: ..\..\..\..\.vuepress\public

---

## wpscan

WPScan是Kali Linux默认自带的一款漏洞扫描工具，它采用Ruby编写，能够扫描WordPress网站中的多种安全漏洞，其中包括WordPress本身的漏洞、插件漏洞和主题漏洞。最新版本WPScan的数据库中包含超过18000种插件漏洞和2600种主题漏洞，并且支持最新版本的WordPress。值得注意的是，它不仅能够扫描类似robots.txt这样的敏感文件，而且还能够检测当前已启用的插件和其他功能。

访问wordpress默认登录链接： /*wp*-admin 或 /*wp*-login.php

![image-20210915152509561](/assets/img/image-20210915152509561.png)

![image-20210915152532122](/assets/img/image-20210915152532122.png)

### 常用选项

- 更新漏洞库

  ```
  wpscan --update
  ```

- 扫描站点

  ```
  wpscan --url http://192.168.15.176/wordpress
  ```

- 对主题进行扫描

  ```
  wpscan --url http://192.168.15.176/wordpress --enumerate t
  ```

- 扫描主题中存在的漏洞

  ```
  wpscan --url http://192.168.15.176/wordpress --enumerate vt
  ```

- 扫描安装的插件

  ```
  wpscan --url http://192.168.15.176/wordpress --enumerate p
  ```

- 扫描安装的插件的漏洞

  ```
  wpscan --url http://192.168.15.176/wordpress --enumerate vp
  ```

- 枚举wordpress的用户

  ```
  wpscan --url http://192.168.15.176/wordpress --enumerate u
  ```

- 使用wpscan进行暴力破解

  ```
  wpscan --url http://xxxx --passwords 密码字典 --usernames 用户名或者密码字典
  ```

- 命令集合

  ```
  wpscan --url http://192.168.15.176/wordpress --enmuerate vp,vt,tt,u
  ```

  

