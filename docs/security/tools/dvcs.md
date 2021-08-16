---
# 这是页面的图标
icon: page
# 这是文章的标题
title: 版本控制文件泄露利用工具
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-14
# 一个页面只能有一个分类
category: 安全工具
# 一个页面可以有多个标签
tag:
  - 安全工具
  - 信息收集
# 此页面会在文章列表指定
sticky: true
# 此页面会出现在首页的文章板块中
star: true

comment: false
---

## .git利用工具

.git 泄漏利用工具，可还原历史版本

- [HackGit](https://github.com/BugScanTeam/GitHack)
```bash
	python GitHack.py http://www.example.com/.git/
```
::: tip
	还原后的文件在 dist/ 目录下
:::

## svn/git/Mercurial/Bazaar利用工具
- [dvcs-ripper](https://github.com/kost/dvcs-ripper)
```bash
  rip-git.pl -v -u http://www.example.com/.git/
  rip-hg.pl -v -u http://www.example.com/.hg/
  rip-bzr.pl -v -u http://www.example.com/.bzr/
  rip-svn.pl -v -u http://www.example.com/.svn/
```
:::tip  
  git: .git  

  svn: .svn

  Bazaar: .Bzr  

  Mercurial: .hg  
:::
