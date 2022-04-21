---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 Metasploitable1 Walkthrough
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



扫描目标IP

```bash
┌──(root💀kali)-[/home/kali]
└─# nmap -sS 192.168.197.0/24                                          127 ⨯
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-11 04:41 EST
Nmap scan report for 192.168.197.1
Host is up (0.00042s latency).
All 1000 scanned ports on 192.168.197.1 are in ignored states.
Not shown: 1000 filtered tcp ports (no-response)
MAC Address: 00:50:56:C0:00:01 (VMware)

Nmap scan report for 192.168.197.129
Host is up (0.0015s latency).
Not shown: 988 closed tcp ports (reset)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
23/tcp   open  telnet
25/tcp   open  smtp
53/tcp   open  domain
80/tcp   open  http
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
3306/tcp open  mysql
5432/tcp open  postgresql
8009/tcp open  ajp13
8180/tcp open  unknown
MAC Address: 00:0C:29:80:6A:26 (VMware)

Nmap scan report for 192.168.197.254
Host is up (0.000099s latency).
All 1000 scanned ports on 192.168.197.254 are in ignored states.
Not shown: 1000 filtered tcp ports (no-response)
MAC Address: 00:50:56:FA:70:CD (VMware)

Nmap scan report for 192.168.197.128
Host is up (0.0000030s latency).
All 1000 scanned ports on 192.168.197.128 are in ignored states.
Not shown: 1000 closed tcp ports (reset)

Nmap done: 256 IP addresses (4 hosts up) scanned in 34.43 seconds

```



发现ip `192.168.197.129`

扫描主机

```
┌──(kali㉿kali)-[~]
└─$ nmap -T5 -A -v -p- 192.168.197.129
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-11 04:45 EST
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 04:45
Completed NSE at 04:45, 0.00s elapsed
Initiating NSE at 04:45
Completed NSE at 04:45, 0.00s elapsed
Initiating NSE at 04:45
Completed NSE at 04:45, 0.00s elapsed
Initiating Ping Scan at 04:45
Scanning 192.168.197.129 [2 ports]
Completed Ping Scan at 04:45, 0.00s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 04:45
Completed Parallel DNS resolution of 1 host. at 04:45, 13.01s elapsed
Initiating Connect Scan at 04:45
Scanning 192.168.197.129 [65535 ports]
Discovered open port 80/tcp on 192.168.197.129
Discovered open port 139/tcp on 192.168.197.129
Discovered open port 53/tcp on 192.168.197.129
Discovered open port 23/tcp on 192.168.197.129
Discovered open port 3306/tcp on 192.168.197.129
Discovered open port 21/tcp on 192.168.197.129
Discovered open port 445/tcp on 192.168.197.129
Discovered open port 22/tcp on 192.168.197.129
Discovered open port 25/tcp on 192.168.197.129
Discovered open port 8180/tcp on 192.168.197.129
Discovered open port 3632/tcp on 192.168.197.129
Discovered open port 5432/tcp on 192.168.197.129
Discovered open port 8009/tcp on 192.168.197.129
Completed Connect Scan at 04:45, 1.56s elapsed (65535 total ports)
Initiating Service scan at 04:45
Scanning 13 services on 192.168.197.129
Completed Service scan at 04:46, 21.02s elapsed (13 services on 1 host)
NSE: Script scanning 192.168.197.129.
Initiating NSE at 04:46
Completed NSE at 04:46, 22.17s elapsed
Initiating NSE at 04:46
Completed NSE at 04:47, 67.23s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Nmap scan report for 192.168.197.129
Host is up (0.0044s latency).
Not shown: 65522 closed tcp ports (conn-refused)
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         ProFTPD 1.3.1
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
| ssh-hostkey: 
|   1024 60:0f:cf:e1:c0:5f:6a:74:d6:90:24:fa:c4:d5:6c:cd (DSA)
|_  2048 56:56:24:0f:21:1d:de:a7:2b:ae:61:b1:24:3d:e8:f3 (RSA)
23/tcp   open  telnet      Linux telnetd
25/tcp   open  smtp        Postfix smtpd
|_smtp-commands: metasploitable.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN
53/tcp   open  domain      ISC BIND 9.4.2
| dns-nsid: 
|_  bind.version: 9.4.2
80/tcp   open  http        Apache httpd 2.2.8 ((Ubuntu) PHP/5.2.4-2ubuntu5.10 with Suhosin-Patch)
|_http-server-header: Apache/2.2.8 (Ubuntu) PHP/5.2.4-2ubuntu5.10 with Suhosin-Patch
|_http-title: Site doesn't have a title (text/html).
| http-methods: 
|   Supported Methods: GET HEAD POST OPTIONS TRACE
|_  Potentially risky methods: TRACE
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
3306/tcp open  mysql       MySQL 5.0.51a-3ubuntu5
|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug)
|_tls-alpn: ERROR: Script execution failed (use -d to debug)
|_ssl-cert: ERROR: Script execution failed (use -d to debug)
|_ssl-date: ERROR: Script execution failed (use -d to debug)
|_sslv2: ERROR: Script execution failed (use -d to debug)
| mysql-info: 
|   Protocol: 10
|   Version: 5.0.51a-3ubuntu5
|   Thread ID: 17
|   Capabilities flags: 43564
|   Some Capabilities: SupportsCompression, SwitchToSSLAfterHandshake, ConnectWithDatabase, SupportsTransactions, Support41Auth, Speaks41ProtocolNew, LongColumnFlag
|   Status: Autocommit
|_  Salt: b+Jv39beSOrqar<n9pGT
3632/tcp open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
5432/tcp open  postgresql  PostgreSQL DB 8.3.0 - 8.3.7
|_ssl-date: 2022-03-11T09:46:55+00:00; +21s from scanner time.
| ssl-cert: Subject: commonName=ubuntu804-base.localdomain/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX
| Issuer: commonName=ubuntu804-base.localdomain/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2010-03-17T14:07:45
| Not valid after:  2010-04-16T14:07:45
| MD5:   dcd9 ad90 6c8f 2f73 74af 383b 2540 8828
|_SHA-1: ed09 3088 7066 03bf d5dc 2373 99b4 98da 2d4d 31c6
8009/tcp open  ajp13       Apache Jserv (Protocol v1.3)
|_ajp-methods: Failed to get a valid response for the OPTION request
8180/tcp open  http        Apache Tomcat/Coyote JSP engine 1.1
|_http-title: Apache Tomcat/5.5
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-favicon: Apache Tomcat
Service Info: Host:  metasploitable.localdomain; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 1h40m21s, deviation: 2h53m12s, median: 20s
| smb-security-mode: 
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| nbstat: NetBIOS name: METASPLOITABLE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   METASPLOITABLE<00>   Flags: <unique><active>
|   METASPLOITABLE<03>   Flags: <unique><active>
|   METASPLOITABLE<20>   Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
|   WORKGROUP<00>        Flags: <group><active>
|   WORKGROUP<1d>        Flags: <unique><active>
|_  WORKGROUP<1e>        Flags: <group><active>
|_smb2-time: Protocol negotiation failed (SMB2)
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: metasploitable
|   NetBIOS computer name: 
|   Domain name: localdomain
|   FQDN: metasploitable.localdomain
|_  System time: 2022-03-11T04:46:26-05:00

NSE: Script Post-scanning.
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Initiating NSE at 04:47
Completed NSE at 04:47, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 125.30 seconds
```

## 

发现139端口，使用nslookup查看主机名

![image-20220421172748715](/assets/img/image-20220421172748715.png)

使用smbclient，查看共享

![image-20220421172752181](/assets/img/image-20220421172752181.png)

查看tmp下内容，未发现特殊内容

![image-20220421172757852](/assets/img/image-20220421172757852.png)

根据前面发现的samba 3.0.20版本，搜索可以发现存在漏洞，可以使用metasploit攻击

![image-20220421172802769](/assets/img/image-20220421172802769.png)

![image-20220421172808330](/assets/img/image-20220421172808330.png)

![image-20220421172813254](/assets/img/image-20220421172813254.png)

![image-20220421172817905](/assets/img/image-20220421172817905.png)

攻击成功，拿到root
