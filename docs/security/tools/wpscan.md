---

# 这是页面的图标

icon: question
# 这是文章的标题
title: wpscan
# 设置作者
author: lhz
# 设置写作时间
time: 2021-09-06
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 解密
  -	wpscan

comment: false
typora-root-url: ..\..\..\..\.vuepress\public

---

## wpscan

WPScan是Kali Linux默认自带的一款漏洞扫描工具，它采用Ruby编写，能够扫描WordPress网站中的多种安全漏洞，其中包括WordPress本身的漏洞、插件漏洞和主题漏洞。最新版本WPScan的数据库中包含超过18000种插件漏洞和2600种主题漏洞，并且支持最新版本的WordPress。值得注意的是，它不仅能够扫描类似robots.txt这样的敏感文件，而且还能够检测当前已启用的插件和其他功能。

### 常用选项

| 参数        | 说明                                  |
| ----------- | ------------------------------------- |
| --update    | 更新到最新版本                        |
| --url       | -u 要扫描的`WordPress`站点.           |
| --force     | -f  不检查网站运行的是不是`WordPress` |
| --enumerate | -e [option(s)]  枚举                  |

 

### 其他选项

| 参数                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| u                       | 枚举用户名，默认从1-10                                       |
| u[10-20]                | 枚举用户名，配置从10-20                                      |
| p                       | 枚举插件                                                     |
| vp                      | 只枚举有漏洞的插件                                           |
| ap                      | 枚举所有插件，时间较长                                       |
| tt                      | 列举缩略图相关的文件                                         |
| t                       | 枚举主题信息                                                 |
| vt                      | 只枚举存在漏洞的主题                                         |
| at                      | 枚举所有主题，时间较长                                       |
| --exclude-content-based | 当使用枚举选项时，可以使用该参数做一些过滤，基于正则或者字符串，可以不写正则分隔符，但要用单引号或双引号包裹 |
| --config-file           | -c                                                           |
| --user-agent            | -a                                                           |
| --cookie                |                                                              |
| --random-agent          | -r 使用随机User-Agent                                        |
| --follow-redirection    | 如果目标包含一个重定向，则直接跟随跳转                       |
| --batch                 | 无需用户交互，都使用默认行为                                 |
| --no-color              | 不要采用彩色输出                                             |
| --wp-content-dir        |                                                              |
| --wp-plugins-dir        |                                                              |
| --proxy                 | <[protocol://]host:port设置一个代理，可以使用HTTP、SOCKS4、SOCKS4A、SOCKS5，如果未设置默认是HTTP协议 |
| --proxy-auth            |                                                              |
| --basic-auth            |                                                              |
| --wordlist              | -w                                                           |
| --username              | -U                                                           |
| --usernames             | path-to-file指定爆破用户名字典                               |
| --threads               | -t                                                           |
| --cache-ttl             | cache-ttl设置 cache TTL                                      |
| --request-timeout       | request-timeout请求超时时间                                  |
| --connect-timeout       | connect-timeout连接超时时间                                  |
| --max-threads           | max-threads最大线程数                                        |
| --throttle              | milliseconds当线程数设置为1时，设置两个请求之间的间隔        |
| --help                  | -h 输出帮助信息                                              |
| --verbose               | -v 输出Verbose                                               |

