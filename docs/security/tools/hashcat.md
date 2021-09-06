---
# 这是页面的图标
icon: float
# 这是文章的标题
title: Hashcat
# 设置作者
author: lhz
# 设置写作时间
time: 2018-10-01
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 解密
  -	Hashcat

comment: false
typora-root-url: ..\..\..\..\.vuepress\public

---

Hashcat号称是世界上最快的密码破解软件，可调用GPU进行密码破解，早在Hashcat 4.x版本就宣称可破解256个字符长度的密码，而且支持上百种算法，基本市面上所有的算法都支持。

```
-m                           	指定哈希类型
-a                            	指定破解模式
-V                            	查看版本信息
-o                            	将输出结果储存到指定文件
--force                     	忽略警告
--show                    		仅显示破解的hash密码和对应的明文
--remove                 		从源文件中删除破解成功的hash
--username             			忽略hash表中的用户名
-b                             	测试计算机破解速度和相关硬件信息
-O                            	限制密码长度
-T                            	设置线程数
-r                             	使用规则文件
-1                             	自定义字符集  -1 0123asd     ?1={0123asd}
-2                             	自定义字符集  -2 0123asd    ?2={0123asd}
-3                             	自定义字符集  -3 0123asd    ?3={0123asd}
-i                              启用增量破解模式
--increment-min       			设置密码最小长度
--increment-max      			设置密码最大长度
```

hashcat破解模式介绍

```
0    straight                                字典破解
1    combination                             将字典中密码进行组合（1 2>11 22 12 21）
3    brute-force                             使用指定掩码破解
6    Hybrid Wordlist + Mask                  字典+掩码破解
7    Hybrid Mask  + Wordlist                 掩码+字典破解
```

举例
使用Hashcat破解NTLMv2:
```
	hashcat -m 5600 Net-NTLM-Hash  password.txt
```
爆破Drupal密码(密码hash保存在hash.txt中)：
```
	hashcat -m 7900 -a 0 hash.txt password_dict.txt
```
