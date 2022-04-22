#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build


git init
git add -A
git commit -m 'modify'

git push -f git@github.com:lhzzzzzz/fun_blog.git master


# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
echo 'pill0w.xyz' > CNAME



git init 

cp ../baidu_verify_code-8uVaS4w7Pu.html ./
scp -r D:\fun_blog\dist\* root@124.220.17.207:/www/wwwroot/pill0w.xyz

#git add -A
#git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
#git push -f git@github.com:lhzzzzzz/lhzzzzzz.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
