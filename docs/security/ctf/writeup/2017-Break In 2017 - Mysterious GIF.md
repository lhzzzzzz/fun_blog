---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2017-Break In 2017 - Mysterious GIF-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-01-27
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



## Break In 2017 - Mysterious GIF

>题目

Aalekh 是 Felicity 的铁杆粉丝，他决定根据今年的 Felicity 主题制作一个 GIF（图形交换格式）。美好的一天，Parth，一位动漫爱好者给了 Aalekh 和 Animesh 一面旗帜，以便将其隐藏在 GIF 中。突然，Aalekh 想起了他之前生成的 GIF，并决定将旗帜隐藏在其中。他认为这面旗帜是如此神秘，只有喜欢费利西蒂的人才能找到这面旗帜。你是幸福的粉丝吗？如果是，则找到标志
![Question](/assets/img/Question-165061423261411.gif)

>write up:

使用binwalk查看gif
```bash
binwalk Question.gif  
```
发现gif后存在zip文件
![image-20220422155731916](/assets/img/image-20220422155731916.png)
使用dd提取出1.zip

```bash
dd if=Question.gif of=1.zip skip=2670386 bs=1
```
![image-20220422155746847](/assets/img/image-20220422155746847.png)
继续解压1.zip，`unzip 1.zip` 得到temp.zip
使用`binwalk temp.zip`查看，发现很多`.enc`文件
使用 `identify` 提取GIF元数据中的数据

```bash
    root in ~/Desktop/tmp λ identify -format "%s %c \n" Question.gif 
    0 4d494945767749424144414e42676b71686b6947397730424151454641415343424b6b776767536c41674541416f4942415144644d4e624c3571565769435172 
    1 5832773639712f377933536849507565707478664177525162524f72653330633655772f6f4b3877655a547834346d30414c6f75685634364b63514a6b687271 
    ... 
    24 484b7735432b667741586c4649746d30396145565458772b787a4c4a623253723667415450574d35715661756278667362356d58482f77443969434c684a536f 
  25 724b3052485a6b745062457335797444737142486435504646773d3d
```
    解码得到
  ```
    MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDdMNbL5qVWiCQr
    X2w69q/7y3ShIPueptxfAwRQbROre30c6Uw/oK8weZTx44m0ALouhV46KcQJkhrq
    g8Oy3s5Y5FV1wCK766u2WLwVrWMIUJG1jDDrRvYPIcQ5UqCp5EDQCioRMGcUZEg2
    uvl142LDBAaeOLzFM4e2JczS+0r85mPRrCSxjLKLaLwIIQnZXIpXSURV/wjhwWR1
    fJGG8Q+ucEApaXscNCUF44bPm4HPCJ/0mrDCTWH/Y2CPVJkNk+o0V7VOtHKsML4N
    CNAJH44W/IRwJntNW+N8HrgpRkFughmNjcwlEkrtUKG1sRCy//WhuDunV2phSRQv
    HotBZvydAgMBAAECggEBAJyaN3mlkunw+aq7pKUagv6CzdBGyd9JxDyApk1K7OI8
    TBhsFM/3tBFeA1Y/Av+uhCLrygrkBye/ic7/+05o8S9+egMkRXNHKAuyR3gRikwY
    vxEKcJgjZZLRFVyAY7/lGv4wNBh3bIPDfF1Dg9szYnkwIH9lLEFyemM74AiAYlcq
    dVdZIE/bq2Z4JO0t9HCgHZNfQ7JdRfejNJQVYUD01Qu5dMtOR4eIMdbWkhbVXw2T
    E0H7xQxtjwT6zUrpqEvvO7e3FHEsBIX65VRXRLbv9OoayJxcRqX8eJkRi4L/Yzo4
    KTpEmkduJLXsFwt3aqQTbjZHXOlTT4NEdsH2p0TsCAECgYEA/e1bszO0a1+cBaDQ
    jQO+Pv9BsJFDB3o1LGuUHMNS8FDpn3J46UkYyk52vIa0v4TcjqSSHNIvXW0TDEUk
    bNFA1HpUxVxlw0Bieeh8Bg3HfXyQBhXvdTD7k0lsDmMEo4UPKYS6D5cYWyrwhd5n
    CD0LrxebgO75RxL5QEIE+4CVIQkCgYEA3v8R/XKRVJPE4aEeg7pQ4uTvcFxjENNe
    xxf6K4xpY4Lf9clIvdecRhC2t1HdR+xSulU/RSaRrzHcw3xg+L1uO0s1t5S7f3nu
    3aihIXkcgGSqXCZ1VHzBmeC40TVsfAybs7qJ0xY6T5q8Mnx2Ob5Z3lIGuyhjeVat
    FII2Sdz2J/UCgYEAteA15zQojSPNH+bgmbBNqtev2GUjSo7I2UkwrC1nEYQS4cbf
    PdDCdd0fhMdDXU4vn+fWU9hkXpmKpCY+AccblVUNtNMKfIB4SHMxqjBia8o1anZ5
    rknoV8WmJOPdZbYfdxB/KD2ED4DBCFGVILyAyuew1PfWCodXiiP/Z5jgt+kCgYEA
    rsxqoa0o1o9uiR7u+HsX5INoXT9OOGY3qQDWjURnaCWywMujRYy5ZwK690AooLRS
    tNUV33K4SAhh8KqSqOh0e+4ckWb5Apfl8cK5a6+v88T09X8AAdY5PBG3Teb+vs5z
    TpMublTCKJw2YazGT8UyVN8ff53NO9QBoE3hmEyod/ECgYA9k0xyCJzcveKdxry6
    pjQxk9FZz3AtEp1ocV5VowagV+ONez/HccF8GJO8BDqlP6XkcLUtsnp6tYReEICI
    HKw5C+fwAXlFItm09aEVTXw+xzLJb2Sr6gATPWM5qVaubxfsb5mXH/wD9iCLhJSo
    rK0RHZktPbEs5ytDsqBHd5PFFw==
  ```

  这只不过是一个私钥（稍后将用于解密那些 .enc 文件）。同样，当您查看 .enc 文件的实际大小时，您会发现它们正好是 256 字节，这是您使用 rsa 公钥加密文件时创建的加密文件的大小。因此，我们可以从这里猜测给定的 .enc 文件是使用公钥加密的文件，其对应的私钥是从元数据中获得的。

  使用此私钥解密所有那些 partaa.enc ... partke.enc 并让我们以名称（例如）partaa、partab、... partke 保存解密的文件（这可以使用来完成`openssl rsautl -decrypt -inkey private_key_breakin -in encrypted_file -out decrypted_file`）

  显然，这些是我们`split`在特定文件上使用命令时获得的部分。因此，我们只是简单地使用`cat part* > final` On 观察文件来连接它们`final`，我们看到给定的文件是一个图像。打开图像（链接[在这里](https://goo.gl/LeNzrw)），你会得到你的旗帜。

>flag: `FelicityIsFun`


------
#  引用本文

- [图片分析](../Misc/4.图片分析.md)
