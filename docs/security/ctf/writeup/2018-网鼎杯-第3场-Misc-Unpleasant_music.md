---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2018-网鼎杯-第3场-Misc-Unpleasant_music-Writeup
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



这是一道音频题目，打开是一个wav文件，`music.wav`。
播放的时候就是kukukuku的声音，基本听不出啥来。

使用`Audacity`打开进行分析，查看波形。

![image-20220422160739040](/assets/img/image-20220422160739040.png)

如果低的波峰为0，高的波峰为1，那么可以组成`0101001001100001011100100010000100011010 ...`

太长了，用脚本来实现才行,这里我直接生成了二进制转十六进制，然后写文件保存成RAR。为什么是rar呢？因为`0101001001100001011100100010000100011010 ...`解码得到的是rar。

```python
import wave as we
import numpy as np
 
wavfile =  we.open(u'music.wav',"rb")
params = wavfile.getparams()
framesra,frameswav= params[2],params[3]
datawav = wavfile.readframes(frameswav)
wavfile.close()
datause = np.fromstring(datawav,dtype = np.short)
 
result_bin=''
result_hex=''
max=0
for i in range(len(datause)-1):
    if datause[i]> max:
        max=datause[i]
    try:
        if(datause[i]<0 and datause[i+1]>=0):
            if (max-24000 >0):![image-20220218114516752](../../src/image-20220218114516752.png)
                result_bin+='1'
                max=datause[i+1]
            else:
                result_bin+='0'
                max=datause[i+1]
    except:
        break
 
print result_bin    
for i in range(0,len(result_bin),4):
    result_hex+=hex(int(result_bin[i:i+4],2))[2:]
 
print result_hex
 
file_rar = open("test.rar","wb")
file_rar.write(result_hex.decode('hex'))  
file_rar.close()    
```

但是解压被告知没有flag 。



`010 Editor`打开发现有png。没有显示说明压缩包格式出了问题，这是个老套路了。



rar 文件头分析：由文件块结构组成：

```
一、标记块
二、压缩文件头块
三、文件头块
四、注释头
五、用户身份信息
六、字块
七、恢复记录块
```

每个文件块均由下列结构开始

```
HEAD_CRC        2 字节    所有块或块部分的CRC
HEAD_TYPE       1 字节    块类型 
HEAD_FLAGS      2 字节    块标记 
HEAD_SIZE       2 字节    块大小 #如果块标记的第一位被置1的话，还存在： 
ADD_SIZE        4 字节    可选结构 - 增加块大小
-------------------
那么，文件块的第3个字节为块类型，也叫头类型。
头类型是0x72表示是标记块
头类型是0x73表示是压缩文件头块
头类型是0x74表示是文件头块
头类型是0x75表示是注释头
……
```

这个RAR中块类型显示`0x7A`,这显然是不对的，改成`0x74`文件头。



多了个STM，解压出来，增加png后缀。



好了，接下来是PNG隐写套路了。



显示CRC校验有问题，要么替换，要么可能是高度数据不对。

计算宽度和高度的脚本：

```python
import os
import binascii
import struct
crcbp = open("STM.png","rb").read()
for i in range(1024):
    for j in range(1024):
        data = crcbp[12:16] + struct.pack('>i',i) + struct.pack('>i',j) + crcbp[24:29]
        crc32 = binascii.crc32(data) & 0xffffffff
        if crc32 == 0x08ec7edb:
            print i,j
```

计算得到高度和宽度都是`280`，即`0x0118`。



改过来：



得到完整二维码，扫码得Flag。



```
flag{4dcfda814ec9fd4761c1139fee3f65eb}
```