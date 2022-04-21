---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 KIOPTRIX:LEVEL 5 Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-03-25
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false

typora-root-url: ..\..\..\.vuepress\public
---



扫描IP

![image-20220421172506729](/assets/img/image-20220421172506729.png)

nmap扫描

```
└─# nmap -T5 -A -v -p- 192.168.197.132
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-23 06:50 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 06:50
Completed NSE at 06:50, 0.00s elapsed
Initiating NSE at 06:50
Completed NSE at 06:50, 0.00s elapsed
Initiating NSE at 06:50
Completed NSE at 06:50, 0.00s elapsed
Initiating ARP Ping Scan at 06:50
Scanning 192.168.197.132 [1 port]
Completed ARP Ping Scan at 06:50, 0.05s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 06:50
Completed Parallel DNS resolution of 1 host. at 06:50, 13.01s elapsed
Initiating SYN Stealth Scan at 06:50
Scanning 192.168.197.132 [65535 ports]
Discovered open port 8080/tcp on 192.168.197.132
Discovered open port 80/tcp on 192.168.197.132
SYN Stealth Scan Timing: About 46.72% done; ETC: 06:51 (0:00:35 remaining)
Completed SYN Stealth Scan at 06:51, 53.64s elapsed (65535 total ports)
Initiating Service scan at 06:51
Scanning 2 services on 192.168.197.132
Completed Service scan at 06:51, 6.01s elapsed (2 services on 1 host)
Initiating OS detection (try #1) against 192.168.197.132
NSE: Script scanning 192.168.197.132.
Initiating NSE at 06:51
Completed NSE at 06:52, 14.53s elapsed
Initiating NSE at 06:52
Completed NSE at 06:52, 1.00s elapsed
Initiating NSE at 06:52
Completed NSE at 06:52, 0.00s elapsed
Nmap scan report for 192.168.197.132
Host is up (0.00036s latency).
Not shown: 65532 filtered tcp ports (no-response)
PORT     STATE  SERVICE VERSION
22/tcp   closed ssh
80/tcp   open   http    Apache httpd 2.2.21 ((FreeBSD) mod_ssl/2.2.21 OpenSSL/0.9.8q DAV/2 PHP/5.3.8)
| http-methods: 
|_  Supported Methods: HEAD
8080/tcp open   http    Apache httpd 2.2.21 ((FreeBSD) mod_ssl/2.2.21 OpenSSL/0.9.8q DAV/2 PHP/5.3.8)
|_http-server-header: Apache/2.2.21 (FreeBSD) mod_ssl/2.2.21 OpenSSL/0.9.8q DAV/2 PHP/5.3.8
MAC Address: 00:0C:29:61:02:8E (VMware)
Too many fingerprints match this host to give specific OS details
Network Distance: 1 hop

TRACEROUTE
HOP RTT     ADDRESS
1   0.36 ms 192.168.197.132

NSE: Script Post-scanning.
Initiating NSE at 06:52
Completed NSE at 06:52, 0.00s elapsed
Initiating NSE at 06:52
Completed NSE at 06:52, 0.00s elapsed
Initiating NSE at 06:52
Completed NSE at 06:52, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 91.00 seconds
           Raw packets sent: 131166 (5.774MB) | Rcvd: 51 (2.136KB)

```

nikto扫描

```
└─# nikto -host 192.168.197.132       
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          192.168.197.132
+ Target Hostname:    192.168.197.132
+ Target Port:        80
+ Start Time:         2022-03-23 06:52:45 (GMT-4)
---------------------------------------------------------------------------
+ Server: Apache/2.2.21 (FreeBSD) mod_ssl/2.2.21 OpenSSL/0.9.8q DAV/2 PHP/5.3.8
+ Server may leak inodes via ETags, header found with file /, inode: 67014, size: 152, mtime: Sat Mar 29 13:22:52 2014
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type
+ mod_ssl/2.2.21 appears to be outdated (current is at least 2.8.31) (may depend on server version)
+ PHP/5.3.8 appears to be outdated (current is at least 7.2.12). PHP 5.6.33, 7.0.27, 7.1.13, 7.2.1 may also current release for each branch.
+ Apache/2.2.21 appears to be outdated (current is at least Apache/2.4.37). Apache 2.2.34 is the EOL for the 2.x branch.
+ OpenSSL/0.9.8q appears to be outdated (current is at least 1.1.1). OpenSSL 1.0.0o and 0.9.8zc are also current.
+ Allowed HTTP Methods: GET, HEAD, POST, OPTIONS, TRACE 
+ OSVDB-877: HTTP TRACE method is active, suggesting the host is vulnerable to XST
+ mod_ssl/2.2.21 OpenSSL/0.9.8q DAV/2 PHP/5.3.8 - mod_ssl 2.8.7 and lower are vulnerable to a remote buffer overflow which may allow a remote shell. http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2002-0082, OSVDB-756.

+ 8724 requests: 0 error(s) and 11 item(s) reported on remote host
+ End Time:           2022-03-23 06:54:08 (GMT-4) (83 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested

```

发现mod_ssl存在问题

搜索exp

![image-20220421172516377](/assets/img/image-20220421172516377.png)

编译764.c，发现错误

![image-20220421172522539](/assets/img/image-20220421172522539.png)

安装 libssl1.0-dev, 头文件添加

```
#include <openssl/rc4.h>
#include <openssl/md5.h>
```

编译通过,运行失败，mod_ssl漏洞不能利用，尝试其他办法

访问web，查看页面代码，发现一个注释隐藏页面，访问

![image-20220421172531510](/assets/img/image-20220421172531510.png)

![image-20220421172539432](/assets/img/image-20220421172539432.png)

从url中可以看出使用了pchart，搜索exp

![image-20220421172545636](/assets/img/image-20220421172545636.png)

存在目录遍历漏洞，访问http://192.168.197.132/pChart2.1.3/examples/index.php?Action=View&Script=/../../etc/passwd，确实存在漏洞

![image-20220421172549864](/assets/img/image-20220421172549864.png)

查看配置文件 /usr/local/etc/apache22/httpd.conf  

![image-20220421172554391](/assets/img/image-20220421172554391.png)

有一段访问限制

```
curl -H "User-Agent:Mozilla/4.0" http://192.168.1.68:8080
```

![image-20220421172559974](/assets/img/image-20220421172559974.png)

![image-20220421172603600](/assets/img/image-20220421172603600.png)

这里使用了phptax，*PhpTax*是美国收入所得税计算软件。搜索exp

![image-20220421172608440](/assets/img/image-20220421172608440.png)

使用msf

![image-20220421172612545](/assets/img/image-20220421172612545.png)

![image-20220421172616949](/assets/img/image-20220421172616949.png)

![image-20220421172621352](/assets/img/image-20220421172621352.png)

![image-20220421172625399](/assets/img/image-20220421172625399.png)

拿到shell，不是root权限，查看linux版本提权exp

![image-20220421172629941](/assets/img/image-20220421172629941.png)

但是目标不支持wget命令，尝试nc命令支持，利用nc上传提权代码

![image-20220421172634994](/assets/img/image-20220421172634994.png)

![image-20220421172642313](/assets/img/image-20220421172642313.png)

编译，运行，提权成功

![image-20220421172646403](/assets/img/image-20220421172646403.png)
