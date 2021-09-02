---
# 这是页面的图标
icon: restrict
# 这是文章的标题
title: Gopherus
# 设置作者
author: lhz
# 设置写作时间
time: 2018-10-01
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 渗透

comment: false
---
  ### Gopherus
  如果您知道某个地方存在 SSRF 漏洞，那么此工具将帮助您生成 Gopher 负载以利用 SSRF（服务器端请求伪造）并获得 RCE（远程代码执行）。它还可以帮助您在受害服务器上获得反向 shell。  
  :::tip 下载
  [Gopherus](https://github.com/tarunkant/Gopherus)   
  :::
  ```
  此工具可以为以下内容生成有效负载：
        MySQL (Port-3306)
        PostgreSQL(Port-5432)
        FastCGI (Port-9000)
        Memcached (Port-11211)
            如果存储的数据被反序列化：
              * Python
              * Ruby
              * PHP
        Redis (Port-6379)
        Zabbix (Port-10050)
        SMTP（端口 25）
  ```
  ```
  使用:
        gopherus --exploit fastcgi
        gopherus --exploit redis
  ```