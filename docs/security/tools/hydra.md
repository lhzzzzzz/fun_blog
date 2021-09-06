---

# 这是页面的图标
icon: question
# 这是文章的标题
title: hydra
# 设置作者
author: lhz
# 设置写作时间
time: 2021-09-06
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 渗透
  -	hydra

comment: false
---
  ## hydra
```
# hydra [[[-l LOGIN|-L FILE] [-p PASS|-P FILE]] | [-C FILE]] [-e ns]
[-o FILE] [-t TASKS] [-M FILE [-T TASKS]] [-w TIME] [-f] [-s PORT] [-S] [-vV]
server service [OPT]

-R
继续从上一次进度接着破解

-S
大写，采用SSL链接

-s <PORT>
小写，可通过这个参数指定非默认端口

-l <LOGIN>
指定破解的用户，对特定用户破解

-L <FILE>
指定用户名字典

-p <PASS>
小写，指定密码破解，少用，一般是采用密码字典

-P <FILE>
大写，指定密码字典

-e <ns>
可选选项，n：空密码试探，s：使用指定用户和密码试探

-C <FILE>
使用冒号分割格式，例如“登录名:密码”来代替-L/-P参数

-M <FILE>
指定目标列表文件一行一条

-o <FILE>
指定结果输出文件

-f
在使用-M参数以后，找到第一对登录名或者密码的时候中止破解

-t <TASKS>
同时运行的线程数，默认为16

-w <TIME>
设置最大超时的时间，单位秒，默认是30s

-v / -V
显示详细过程

server
目标ip

service
指定服务名，支持的服务和协议：telnet ftp pop3[-ntlm] imap[-ntlm] smb smbnt http[s]-{head|get} http-{get|post}-form http-proxy cisco cisco-enable vnc ldap2 ldap3 mssql mysql oracle-listener postgres nntp socks5 rexec rlogin pcnfs snmp rsh cvs svn icq sapr3 ssh2 smtp-auth[-ntlm] pcanywhere teamspeak sip vmauthd firebird ncp afp等等

OPT
可选项
```

### 破解ssh

```bash
hydra -L users.txt -P password.txt -t 1 -vV -e ns 192.168.1.104 ssh
```

### 破解ftp

```bash
hydra ip ftp -l 用户名 -P 密码字典 -e ns -vV
```

### get方式提交，破解web登录

```bash
hydra -l 用户名 -p 密码字典 -t 线程 -vV -e ns -f ip http-get /admin/index.php
```

### 破解https

```bash
hydra -m /index.php -l muts -P pass.txt 10.36.16.18 https
```

### 破解teamspeak

```bash
hydra -l 用户名 -P 密码字典 -s 端口号 -vV ip teamspeak
```

### 破解cisco

```bash
hydra -P pass.txt 10.36.16.18 cisco
hydra -m cloud -P pass.txt 10.36.16.18 cisco-enable
```

### 破解smb

```bash
hydra -l administrator -P pass.txt 10.36.16.18 smb
```

### 破解pop3

```bash
hydra -l muts -P pass.txt my.pop3.mail pop3
```

### 破解rdp

```bash
hydra ip rdp -l administrator -P pass.txt -V
```

### 破解http-proxy

```bash
hydra -l admin -P pass.txt http-proxy://10.36.16.18
```

### 破解imap

```bash
hydra -L user.txt -p secret 10.36.16.18 imap PLAIN
hydra -C defaults.txt -6 imap://[fe80::2c:31ff:fe12:ac11]:143/PLAIN
```

### 破解telnet

```bash
hydra ip telnet -l 用户 -P 密码字典 -t 32 -s 23 -e ns -f -V
```
