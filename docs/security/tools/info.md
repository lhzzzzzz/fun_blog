---
# 这是页面的图标
icon: page
# 这是文章的标题
title: 信息收集
# 设置作者
author: lhz
# 设置写作时间
time: 2018-10-01
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 信息收集

comment: false
---
## 版本控制文件泄露利用工具
  ### .git利用工具
  git 泄漏利用工具，可还原历史版本，还原后的代码文件在 dist/ 目录下
  :::tip 下载
  [HackGit](https://github.com/BugScanTeam/GitHack)
  :::

  ```bash
  python GitHack.py http://www.example.com/.git/
  ```


### svn/git/Mercurial/Bazaar利用工具
  :::tip 下载
  [dvcs-ripper](https://github.com/kost/dvcs-ripper)
  :::
  ```bash
  rip-git.pl -v -u http://www.example.com/.git/
  rip-hg.pl -v -u http://www.example.com/.hg/
  rip-bzr.pl -v -u http://www.example.com/.bzr/
  rip-svn.pl -v -u http://www.example.com/.svn/
  ```
  ```
  隐藏文件名：
  git: .git  
  svn: .svn
  Bazaar: .Bzr  
  Mercurial: .hg
  ```
