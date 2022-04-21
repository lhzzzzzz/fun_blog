---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 MrRobots Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-03-28
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false

typora-root-url: ..\..\..\.vuepress\public
---



靶机介绍

```
Description
Back to the Top
Based on the show, Mr. Robot.

This VM has three keys hidden in different locations. Your goal is to find all three. Each key is progressively difficult to find.

The VM isn't too difficult. There isn't any advanced exploitation or reverse engineering. The level is considered beginner-intermediate.
```

nmap发现IP

```
┌──(root㉿kali)-[/home/kali]
└─# nmap -sP 192.168.182.0/24
Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-02 05:58 EDT
Nmap scan report for 192.168.182.1
Host is up (0.00046s latency).
MAC Address: 00:50:56:C0:00:08 (VMware)
Nmap scan report for 192.168.182.2
Host is up (0.00037s latency).
MAC Address: 00:50:56:EF:50:5D (VMware)
Nmap scan report for 192.168.182.130
Host is up (0.00037s latency).
MAC Address: 00:0C:29:C9:23:94 (VMware)
Nmap scan report for 192.168.182.254
Host is up (0.00020s latency).
MAC Address: 00:50:56:E9:D6:FF (VMware)
Nmap scan report for 192.168.182.128
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 3.20 seconds

```

nmap扫描目标

```
┌──(root㉿kali)-[/home/kali]
└─# nmap -T5 -A -v -p- 192.168.182.130
Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-02 05:58 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 05:58
Completed NSE at 05:58, 0.00s elapsed
Initiating NSE at 05:58
Completed NSE at 05:58, 0.00s elapsed
Initiating NSE at 05:58
Completed NSE at 05:58, 0.00s elapsed
Initiating ARP Ping Scan at 05:58
Scanning 192.168.182.130 [1 port]
Completed ARP Ping Scan at 05:58, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:58
Completed Parallel DNS resolution of 1 host. at 05:58, 0.00s elapsed
Initiating SYN Stealth Scan at 05:58
Scanning 192.168.182.130 [65535 ports]
Discovered open port 80/tcp on 192.168.182.130
Discovered open port 443/tcp on 192.168.182.130
SYN Stealth Scan Timing: About 45.18% done; ETC: 06:00 (0:00:38 remaining)
Completed SYN Stealth Scan at 05:59, 53.93s elapsed (65535 total ports)
Initiating Service scan at 05:59
Scanning 2 services on 192.168.182.130
Completed Service scan at 06:00, 12.04s elapsed (2 services on 1 host)
Initiating OS detection (try #1) against 192.168.182.130
adjust_timeouts2: packet supposedly had rtt of -178034 microseconds.  Ignoring time.
adjust_timeouts2: packet supposedly had rtt of -178034 microseconds.  Ignoring time.
NSE: Script scanning 192.168.182.130.
Initiating NSE at 06:00
Completed NSE at 06:00, 0.42s elapsed
Initiating NSE at 06:00
Completed NSE at 06:00, 0.03s elapsed
Initiating NSE at 06:00
Completed NSE at 06:00, 0.00s elapsed
Nmap scan report for 192.168.182.130
Host is up (0.00030s latency).
Not shown: 65532 filtered tcp ports (no-response)
PORT    STATE  SERVICE  VERSION
22/tcp  closed ssh
80/tcp  open   http     Apache httpd
|_http-title: Site doesn't have a title (text/html).
|_http-favicon: Unknown favicon MD5: D41D8CD98F00B204E9800998ECF8427E
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache
443/tcp open   ssl/http Apache httpd
|_http-title: Site doesn't have a title (text/html).
|_http-favicon: Unknown favicon MD5: D41D8CD98F00B204E9800998ECF8427E
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| ssl-cert: Subject: commonName=www.example.com
| Issuer: commonName=www.example.com
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2015-09-16T10:45:03
| Not valid after:  2025-09-13T10:45:03
| MD5:   3c16 3b19 87c3 42ad 6634 c1c9 d0aa fb97
|_SHA-1: ef0c 5fa5 931a 09a5 687c a2c2 80c4 c792 07ce f71b
|_http-server-header: Apache
MAC Address: 00:0C:29:C9:23:94 (VMware)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.10 - 4.11
Uptime guess: 198.047 days (since Thu Sep 16 04:52:50 2021)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=257 (Good luck!)
IP ID Sequence Generation: All zeros

TRACEROUTE
HOP RTT     ADDRESS
1   0.30 ms 192.168.182.130

NSE: Script Post-scanning.
Initiating NSE at 06:00
Completed NSE at 06:00, 0.00s elapsed
Initiating NSE at 06:00
Completed NSE at 06:00, 0.00s elapsed
Initiating NSE at 06:00
Completed NSE at 06:00, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 68.68 seconds
           Raw packets sent: 131145 (5.772MB) | Rcvd: 5483 (1.856MB)
```

nikto扫描

```
┌──(kali㉿kali)-[~]
└─$ nikto -host 192.168.182.130
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          192.168.182.130
+ Target Hostname:    192.168.182.130
+ Target Port:        80
+ Start Time:         2022-04-02 05:59:28 (GMT-4)
---------------------------------------------------------------------------
+ Server: Apache
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type
+ Retrieved x-powered-by header: PHP/5.5.29
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ Uncommon header 'tcn' found, with contents: list
+ Apache mod_negotiation is enabled with MultiViews, which allows attackers to easily brute force file names. See http://www.wisec.it/sectou.php?id=4698ebdc59d15. The following alternatives for 'index' were found: index.html, index.php                                                                          
+ OSVDB-3092: /admin/: This might be interesting...                                                    
+ Uncommon header 'link' found, with contents: <http://192.168.182.130/?p=23>; rel=shortlink           
+ /wp-links-opml.php: This WordPress script reveals the installed version.                             
+ OSVDB-3092: /license.txt: License file found may identify site software.                             
+ /admin/index.html: Admin login page/section found.                                                   
+ Cookie wordpress_test_cookie created without the httponly flag                                       
+ /wp-login/: Admin login page/section found.                                                          
+ /wordpress: A Wordpress installation was found.                                                      
+ /wp-admin/wp-login.php: Wordpress login found                                                        
+ /wordpresswp-admin/wp-login.php: Wordpress login found                                               
+ /blog/wp-login.php: Wordpress login found                                                            
+ /wp-login.php: Wordpress login found                                                                 
+ /wordpresswp-login.php: Wordpress login found                                                        
+ 7915 requests: 0 error(s) and 18 item(s) reported on remote host                                     
+ End Time:           2022-04-02 06:01:56 (GMT-4) (148 seconds)                                        
---------------------------------------------------------------------------                            
+ 1 host(s) tested                                                 
```

发现目标运行有web服务，且运行的是wordpress

在robot.txt中发现2个文件

![image-20220421172947591](/assets/img/image-20220421172947591.png)

key-1-of-3.txt

![image-20220421172952627](/assets/img/image-20220421172952627.png)

有3部分key，这是第一部分

访问fsocity.dic，下载文件后查看内容，很多内容，应该是一个字典

![image-20220421172957634](/assets/img/image-20220421172957634.png)

先对字典去重

```
cat fsocity.dic|sort -u >fs.dic 
```

下来使用生成的字典爆破，先爆破账号，在登录界面https://192.168.182.130/wp-admin 发现有找回密码功能，输入账号后明确返回了账号是否存在，使用这个功能来爆破账号

![image-20220421173006050](/assets/img/image-20220421173006050.png)

爆破成功，获得账号 elliot

![image-20220421173011863](/assets/img/image-20220421173011863.png)

再去登录页面爆破密码

![image-20220421173017142](/assets/img/image-20220421173017142.png)

爆破获得密码ER28-0652

![image-20220421173022151](/assets/img/image-20220421173022151.png)

使用elloit/ER2-0652登录，下来可用主题、插件方式获得shell，我们选择主题方式，直接修改404页面内容为php反弹shell

![image-20220421173029742](/assets/img/image-20220421173029742.png)

本地使用nc监听4444端口

`nc -nvlp 4444`

访问404页面，触发反弹shell `https://192.168.182.130/wp-admin/404.php`

![image-20220421173035619](/assets/img/image-20220421173035619.png)

在/home/robot下，发现key2,但是没有权限访问，访问另个一文件`password.raw-md5`，应该是robot账号的密码，md5解密得到密码

![image-20220421173044684](/assets/img/image-20220421173044684.png)

![image-20220421173049635](/assets/img/image-20220421173049635.png)

切换到robot用户，这里需要先获得tty 

`python -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm`

![image-20220421173056882](/assets/img/image-20220421173056882.png)

切换成功后可以查看文件内容

按照常规套路，最后一个key需要获得root权限查看

使用`find / -perm -u=s 2>/dev/null` 查看有suid的命令

![image-20220421173101929](/assets/img/image-20220421173101929.png)

发现nmap，可以用来提权，先查看版本，5.20之前

![image-20220421173107321](/assets/img/image-20220421173107321.png)

使用

`nmap --interactive
!sh`

提权

![image-20220421173112288](/assets/img/image-20220421173112288.png)

提权成功，在/root/下获得key

完成
