---
# 这是页面的图标
icon: bit
# 这是文章的标题
title: JWT破解工具
# 设置作者
author: lhz
# 设置写作时间
time: 2018-10-01
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 解密

comment: false
typora-root-url: ..\..\..\.vuepress\public
---

一个用C语言编写的多线程JWT暴力破解器  
:::tip 下载
[jwt-cracker](https://github.com/brendan-rius/c-jwt-cracker)   
:::

```bash
make

#直接破解
$ > ./jwtcrack eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.cAOIAifu3fykvhkHpbuhbvtH807-Z2rI1FS3vX1XMjE

#使用参数：字母表 最大密钥长度 算法
$ > ./jwtcrack eyJ0eXAiOiJKV1Q**5WxpIZ9_v0g adimnps 9 sha512
```
示例：  
![jwt](/assets/img/tools/jwt.png)
