---
# 这是页面的图标
icon: page
# 这是文章的标题
title: web信息泄露
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-15
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - 信息收集
# 此页面会在文章列表指定
sticky: true
# 此页面会出现在首页的文章板块中
star: true

comment: false
---

## 目录遍历  
  由于配置错误导致网站的目录可被遍历，一般该类漏洞可以为后续利用提供一些信息上的帮助
   * **phpinfo()**： phpinfo中会泄露很多服务端的一些信息
   * **备份文件下载**： 当开发人员在线上环境中对源代码进行了备份操作，并且将备份文件放在了 web 目录下，就会引起网站源码泄露
     * zip、tar、tar.gz、rar
     * .bak
   * **vim缓存**： 当开发人员在线上环境中使用 vim 编辑器，在使用过程中会留下 vim 编辑器缓存，当vim异常退出时，缓存会一直留在服务器上，引起网站源码泄露
     * .swp
     * .swo
     * .swn
   * **.DS_Store缓存**：.DS_Store 是 Mac OS 保存文件夹的自定义属性的隐藏文件。通过.DS_Store可以知道这个目录里面所有文件的清单

   * **版本控制文件泄露**：当前大量开发人员使用git进行版本控制，对站点自动部署。如果配置不当,可能会将.git文件夹直接部署到线上环境。这就引起了git泄露漏洞
       * 使用.git泄露利用工具[GitHack](https://github.com/BugScanTeam/GitHack)可以根据.get文件将代码clone到本地
       * 针对.svn等其他版本控制工具，可使用[dvcs-ripper](https://github.com/kost/dvcs-ripper)收集代码和信息
       * 工具使用见[版本控制泄露利用工具](/docs/security/tools/dvcs)
