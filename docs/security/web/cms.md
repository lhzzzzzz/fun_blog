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
