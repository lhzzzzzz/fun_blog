---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2020-CSICTF-Misc-Panda-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-02-18
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



Crack zip passwords using:

```
zip2john panda.zip > hash.txt
john.exe --wordlist=real_human hash.txt
```

Then run this **one-liner**:

```
print(''.join([chr(i) for i, j in zip(open('panda1.jpg', 'rb').read(), open('panda.jpg', 'rb').read()) if i!= j]))
```

Which gives us the flag:

```
csictf{kung_fu_p4nd4}
```