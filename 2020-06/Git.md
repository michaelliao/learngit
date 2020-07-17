# Git

[TOC]

## 入门

git init

git add

git commit -m ""

git status		查看状态

git log	查看提交记录



git tag 	加tag名

git tag tagname commit_id	亦可以

git tag -d tag_name	删除tag

git push origin tag_name	将tag推送到origin

git push origin --tags

git push origin :refs/tags/\<tagname>	删除远程标签





git branch		加名字创建新分支

git checkout	加名字转换到哪个分支

git switch 		

git switch -c \<name\>	创建加切换都某个分支

git checkout -b \<name\>

git merge \<name\>		将name合并到当前branch	通常是在master情况下merge

git branch -d \<name\>	删除分支

git branch -D \<name>	强制删除分支 一般是新写的分支没merge

通常是创建新分支工作	工作完后合并 删除分支

​	



git reset --hard	+commit id前几位

git reflog		查看reset记录



git cheackout -- filename	让文件回到上次add或commit的状态

git reset HEAD filename	可以把提交到暂存区的的文件撤回



git rm filename		然后commit可以删除文件

## Github

关联远程库

git remote add origin git@server-name:path/repo-name.git

关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容

此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

git clone 加github给的地址



push master之前要pull下来最新的master再merge

## 分支管理

![image-20200624195414617](C:\Users\whx\AppData\Roaming\Typora\typora-user-images\image-20200624195414617.png)

两个分支修改同一个文件 就会冲突

源文件就会变成 冲突详细信息 保留要保留的后重新add merge



git stash		保存现在场景

git stash pop	恢复同时删除

git stash apply	git stash drop 	



git cherry-pick commit_id	在master修改bug后	更换branch修改dev



如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；