---
# 这是页面的图标
icon: api
# 这是文章的标题
title: DC2-Walkthrough
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

靶机地址：

><https://www.vulnhub.com/entry/dc-2,311/>

DESCRIPTION

Much like DC-1, DC-2 is another purposely built vulnerable lab for the purpose of gaining experience in the world of penetration testing.

As with the original DC-1, it's designed with beginners in mind.

Linux skills and familiarity with the Linux command line are a must, as is some experience with basic penetration testing tools.

Just like with DC-1, there are five flags including the final flag.

And again, just like with DC-1, the flags are important for beginners, but not so important for those who have experience.

In short, the only flag that really counts, is the final flag.

For beginners, Google is your friend. Well, apart from all the privacy concerns etc etc.

I haven't explored all the ways to achieve root, as I scrapped the previous version I had been working on, and started completely fresh apart from the base OS install.

根据靶机说明，需要找到5个flag

下载镜像, 使用vmware打开, 网络选择NAT模式

## 0x02 信息收集
nmap扫描网段
```bash
nmap -sP 192.168.122.0/24
```
![image-20210908220310895](/C:/Users/liuzh/AppData/Roaming/Typora/typora-user-images/image-20210908220310895.png)
发现目标IP:`192.168.122.130

进一步扫描端口
```bash
nmap -T5 -A -v -p-  192.168.122.130
```
扫描结果：
```
Starting Nmap 7.70 ( https://nmap.org ) at 2021-09-08 21:51 CST
NSE: Loaded 148 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 21:51
Completed NSE at 21:51, 0.00s elapsed
Initiating NSE at 21:51
Completed NSE at 21:51, 0.00s elapsed
Initiating ARP Ping Scan at 21:51
Scanning 192.168.122.130 [1 port]
Completed ARP Ping Scan at 21:51, 0.05s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 21:51
Completed Parallel DNS resolution of 1 host. at 21:51, 13.02s elapsed
Initiating SYN Stealth Scan at 21:51
Scanning 192.168.122.130 [65535 ports]
Discovered open port 80/tcp on 192.168.122.130
Discovered open port 7744/tcp on 192.168.122.130
Completed SYN Stealth Scan at 21:51, 1.73s elapsed (65535 total ports)
Initiating Service scan at 21:51
Scanning 2 services on 192.168.122.130
Completed Service scan at 21:51, 7.44s elapsed (2 services on 1 host)
Initiating OS detection (try #1) against 192.168.122.130
NSE: Script scanning 192.168.122.130.
Initiating NSE at 21:51
Completed NSE at 21:51, 1.60s elapsed
Initiating NSE at 21:51
Completed NSE at 21:51, 0.00s elapsed
Nmap scan report for 192.168.122.130
Host is up (0.00073s latency).
Not shown: 65533 closed ports
PORT     STATE SERVICE VERSION
80/tcp   open  http    Apache httpd 2.4.10 ((Debian))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.10 (Debian)
|_http-title: Did not follow redirect to http://dc-2/
7744/tcp open  ssh     OpenSSH 6.7p1 Debian 5+deb8u7 (protocol 2.0)
| ssh-hostkey: 
|   1024 52:51:7b:6e:70:a4:33:7a:d2:4b:e1:0b:5a:0f:9e:d7 (DSA)
|   2048 59:11:d8:af:38:51:8f:41:a7:44:b3:28:03:80:99:42 (RSA)
|   256 df:18:1d:74:26:ce:c1:4f:6f:2f:c1:26:54:31:51:91 (ECDSA)
|_  256 d9:38:5f:99:7c:0d:64:7e:1d:46:f6:e9:7c:c6:37:17 (ED25519)
MAC Address: 00:0C:29:2F:8F:B1 (VMware)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.9
Uptime guess: 199.639 days (since Sun Feb 21 06:31:22 2021)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=252 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.73 ms 192.168.122.130

NSE: Script Post-scanning.
Initiating NSE at 21:51
Completed NSE at 21:51, 0.00s elapsed
Initiating NSE at 21:51
Completed NSE at 21:51, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 29.00 seconds
           Raw packets sent: 65558 (2.885MB) | Rcvd: 65550 (2.623MB)
```

发现80端口和运行ssh的7744端口

## 0x03 漏洞利用

按照靶机信息提示

```bash
echo "192.168.122.130 dc-2" >> /etc/hosts
```

### flag1

使用浏览器访问目标机80端口，发现运行的wordpress

![image-20210908222655582](/C:/Users/liuzh/AppData/Roaming/Typora/typora-user-images/image-20210908222655582.png)

在flag连接下发现flag1

![image-20210908222007827](/C:/Users/liuzh/AppData/Roaming/Typora/typora-user-images/image-20210908222007827.png)

### flag2

根据flag1的提示，使用cewl生成字典

```bash
cewl http://dc-2 -w pass.txt
```

密码有了，使用wpscan枚举用户

```
wpscan --url http://dc-2 --enumerate u
```

s
