搜索
me and my brokenheart

git的常用命令

git init

git add  xx.txt

git commit xx.txt -m"此处填写修改注释"

git status //查看状态

git diff  //查看修改明细

git log  //查看日志

git log --pretty=oneline //查看简明日志

cat xx.txt  //读取文件内容

git reset --hard HEAD^  //退回上个版本、HEAD^^:上上个版本、HEAD~20:前第20个版本

git reflog   //所有的版本id

git reset --hard 1094a  //指定回到未来的某个版本 1094a是版本id的前几位

git diff HEAD -- readme.txt //查看工作区（leangit）与版本库（.git）的区别

git checkout -- readme.txt //让这个文件回到最近一次git commit或git add时的状态

git checkout -b xxx  //创建一个新的分支xxx并切换

git merge xxx  //将分支xxx合并到当前分支

git branch -d xxx  //删除分支分支xxx

git branch -D xxx  //强行删除一个没有被合并过的分支

cat .git/HEAD  //查看当前分支及路径

git branch  //查看当前分支是哪个

创建分支：git branch <name>

切换分支：git checkout <name>

git push origin master  //推送某条分支

git pull  //把最新的提交从远程分支抓下来
【主要四条分支】
master分支是主分支，因此要时刻与远程同步；

dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

【多人协作的工作模式通常是这样】

首先，可以试图用git push origin <branch-name>推送自己的修改；

如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

如果合并有冲突，则解决冲突，并在本地提交；

没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！

如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。

【配置远程库时遇到的错误】
提示信息为：$ git push -u origin master
fatal: unable to access 'https://github.com/MessiCoutinho/learngit.git/': error setting certificate verify locations:
  CAfile: D:/xxx/Git/mingw64/ssl/certs/ca-bundle.crt
  CApath: none

具体解决办法是： 
使用git 客户端输入一下命令即可：

$ git config --global http.sslverify "false"

git push  /在commit之后，提交到远程仓库
git log --graph命令可以看到分支合并图
最肯忘却古人诗：万般皆下品，唯有读书高。

issue101修复成功