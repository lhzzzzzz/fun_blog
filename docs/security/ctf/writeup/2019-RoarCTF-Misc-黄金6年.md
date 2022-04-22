---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2019-RoarCTF-Misc-黄金6年-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-02-06
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



下载之后是一个mp4文件，黄金六年，害，亲爱的热爱的里面的梗

使用010 Editor打开视频文件，发现最下面有base64编码

```
UmFyIRoHAQAzkrXlCgEFBgAFAQGAgADh7ek5VQIDPLAABKEAIEvsUpGAAwAIZmxhZy50eHQwAQAD``Dx43HyOdLMGWfCE9WEsBZprAJQoBSVlWkJNS9TP5du2kyJ275JzsNo29BnSZCgMC3h``+``UFV9p1QEf``JkBPPR6MrYwXmsMCMz67DN``/``k5u1NYw9ga53a83``/``B``/``t2G9FkG``/``IITuR``+``9gIvr``/``LEdd1ZRAwUEAA``=``=
```

在线解码一下

![image-20220422171555385](/assets/img/image-20220422171555385.png)

 

 可以看出来是Rar文件，编写python脚本将其输出

```python
import base64
code="UmFyIRoHAQAzkrXlCgEFBgAFAQGAgADh7ek5VQIDPLAABKEAIEvsUpGAAwAIZmxhZy50eHQwAQADDx43HyOdLMGWfCE9WEsBZprAJQoBSVlWkJNS9TP5du2kyJ275JzsNo29BnSZCgMC3h+UFV9p1QEfJkBPPR6MrYwXmsMCMz67DN/k5u1NYw9ga53a83/B/t2G9FkG/IITuR+9gIvr/LEdd1ZRAwUEAA=="
r=base64.b64decode(code)
test_file=open("test.rar","wb")
test_file.write(r)
test_file.close()
```

查看输出的test.rar文件，需要密码

我们在视频的十六进制文件里面发现了base64文件，一般来说密码就会藏在视频的播放里

这里我使用的是pr分帧查看视频

![image-20220422171608390](/assets/img/image-20220422171608390.png)

![image-20220422171616809](/assets/img/image-20220422171616809.png)

  ![image-20220422171625526](/assets/img/image-20220422171625526.png)

![image-20220422171634415](/assets/img/image-20220422171634415.png)

 

 做这种题目着实应该把屏幕调亮一点，最后一张二维码找了好久死活找不到，调亮了屏幕之后就立马找到了

扫码之后将密码拼起来

得到password:iwantplayctf

用密码解压

![image-20220422171708278](/assets/img/image-20220422171708278.png)