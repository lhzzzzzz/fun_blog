---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2019-ECSC-CyberEDU-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-02-10
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



## [ECSC 2019] Out of the image (10 points)

[Link: https://cyberedu.ro/app/challenges/55d041e0-7f21-11ea-be5e-c9459c7a94df](https://cyberedu.ro/app/challenges/55d041e0-7f21-11ea-be5e-c9459c7a94df)

The task can be easily solved using [stegcracker](https://github.com/Paradoxis/StegCracker) with rockyou.txt as the wordlist.

```
stegcracker pic.jpg /usr/share/wordlists/rockyou.txt
```

![image-20220422164100251](/assets/img/image-20220422164100251.png)

## [D-CTF 2019] address (10 points)

[Link: https://cyberedu.ro/app/challenges/55df47c0-7f21-11ea-b35d-457ba9a78ba1](https://cyberedu.ro/app/challenges/55df47c0-7f21-11ea-b35d-457ba9a78ba1)

This is a web-based CTF challenge. Let’s take a look on the page and the source code.

![image-20220422164107105](/assets/img/image-20220422164107105.png)

![image-20220422164113037](/assets/img/image-20220422164113037.png)

Hint on the bottom of the source code, **admin.php**.

![image-20220422164118798](/assets/img/image-20220422164118798.png)

Two meme materials on the same site, you got me there. By the way, it seems that only the local able to bypass this page. Guess what, we can spoof our way in using X-forward-for header. There are two ways to solve the task

### A) Curl command

Simply input the following command and you should get the flag. Please change the assigned IP and port.

```
curl -XGET http://<IP:port>/admin.php -H 'X-Forwarded-For: 127.0.0.1'
```

![image-20220422164149480](/assets/img/image-20220422164149480.png)

### B) Burp suite

You can use repeater mode in burp suite by adding an extra request header (X-Forwarded-For: 127.0.0.1)

![image-20220422164154221](/assets/img/image-20220422164154221.png)