---
# 这是页面的图标
icon: api
# 这是文章的标题
title: DC1-Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2021-09-01
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - vulnhub
  - walkthrough
comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---

## 0x01 部署
下载镜像, 使用vmware打开, 网络选择NAT模式

## 0x02 信息收集
nmap扫描网段
```
nmap -sP 192.168.190.0/24
```
![dc1](/assets/img/target/dc1.png)  
发现目标IP:`192.168.190.134`  

进一步扫描端口
```
nmap -T5 -A -v -p- 192.168.190.134
```
扫描结果：
```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-01 17:38 CST
Happy 24th Birthday to Nmap, may it live to be 124!
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 17:38
Completed NSE at 17:38, 0.00s elapsed
Initiating NSE at 17:38
Completed NSE at 17:38, 0.00s elapsed
Initiating NSE at 17:38
Completed NSE at 17:38, 0.00s elapsed
Initiating Ping Scan at 17:38
Scanning 192.168.190.134 [2 ports]
Completed Ping Scan at 17:38, 0.00s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 17:38
Completed Parallel DNS resolution of 1 host. at 17:38, 0.00s elapsed
Initiating Connect Scan at 17:38
Scanning 192.168.190.134 [65535 ports]
Discovered open port 80/tcp on 192.168.190.134
Discovered open port 22/tcp on 192.168.190.134
Discovered open port 111/tcp on 192.168.190.134
Discovered open port 48247/tcp on 192.168.190.134
Completed Connect Scan at 17:38, 2.57s elapsed (65535 total ports)
Initiating Service scan at 17:38
Scanning 4 services on 192.168.190.134
Completed Service scan at 17:38, 11.01s elapsed (4 services on 1 host)
NSE: Script scanning 192.168.190.134.
Initiating NSE at 17:38
Completed NSE at 17:39, 1.62s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.11s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Nmap scan report for 192.168.190.134
Host is up (0.00019s latency).
Not shown: 65531 closed ports
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 6.0p1 Debian 4+deb7u7 (protocol 2.0)
| ssh-hostkey:
|   1024 c4:d6:59:e6:77:4c:22:7a:96:16:60:67:8b:42:48:8f (DSA)
|   2048 11:82:fe:53:4e:dc:5b:32:7f:44:64:82:75:7d:d0:a0 (RSA)
|_  256 3d:aa:98:5c:87:af:ea:84:b8:23:68:8d:b9:05:5f:d8 (ECDSA)
80/tcp    open  http    Apache httpd 2.2.22 ((Debian))
|_http-favicon: Unknown favicon MD5: B6341DFC213100C61DB4FB8775878CEC
|_http-generator: Drupal 7 (http://drupal.org)
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 36 disallowed entries (15 shown)
| /includes/ /misc/ /modules/ /profiles/ /scripts/
| /themes/ /CHANGELOG.txt /cron.php /INSTALL.mysql.txt
| /INSTALL.pgsql.txt /INSTALL.sqlite.txt /install.php /INSTALL.txt
|_/LICENSE.txt /MAINTAINERS.txt
|_http-server-header: Apache/2.2.22 (Debian)
|_http-title: Welcome to Drupal Site | Drupal Site
111/tcp   open  rpcbind 2-4 (RPC #100000)
| rpcinfo:
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          46013/udp   status
|   100024  1          47802/tcp6  status
|   100024  1          48247/tcp   status
|_  100024  1          58175/udp6  status
48247/tcp open  status  1 (RPC #100024)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 19.83 seconds
```
