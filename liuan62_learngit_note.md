# Git学习笔记

参考链接https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

## 添加信息

```
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

> `git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置

## 创建版本库

在新建的目录下，执行`git init`命令

## 把文件添加到版本库

`git add`把文件添加到仓库

`git commit -m "description"` 把文件提交到仓库

>`-m`后面输入本次提交的说明

> 可以多次`add`不同文件，`commit` 一次提交

## 版本回溯

![](http://m.qpic.cn/psb?/13a7c876-b883-42c5-b9ab-f249a2adea99/Mga4nS0D2fzwoO4e3LK9ZzHn53KS6yQ4h8wShRkwuKs!/b/dGwBAAAAAAAA&bo=VAI1AQAAAAARF0I!&rf=viewer_4)

![](http://m.qpic.cn/psb?/13a7c876-b883-42c5-b9ab-f249a2adea99/mjAVhyv0L4W8tOQzaz5d9TFBkrp8fBAoAPLpc.Tm3dM!/b/dPQAAAAAAAAA&bo=TgI5AQAAAAARF1Q!&rf=viewer_4)

`git status`查看信息，掌握仓库当前状态

`git diff file`查看修改内容，或 `git diff HEAD -- file`

`git log`或`git log --pretty=oneline`查看提交历史

`git reset --hard HEAD^`返回上一个版本

`git reset --hard HEAD^^`返回上上一个版本

`git reset --hard HEAD~10`返回往上10给版本

`git reset --hard id`根据commit id返回指定版本

`git reflog` 查看命令历史

`git checkout -- file`丢弃工作区的修改，即让文件回到最近一次`commit`或者`add`时的状态

`git reset HEAD file`撤销暂存区的修改

`git rm file`从版本库中删除文件

## 远程仓库

`ssh-keygen -t rsa -C "youremail@example.com"`创建`SSH KEY `

在`/c/Users/user_name/.ssh`中查看`id_sra.pub`

将`id_sra.pub`添加到GitHub中，`Account settings`-`Add SSH Key`

`git remote add origin git@github.com:name/LearnGit`将本地仓库关联到远程库

`git push -u origin master`将当前分支`master`推送到远程

> 第一次`push`时加上`-u`参数，之后的`push`或`pull`时可以简化命令
>
> `origin`表示远程库的名字标签，可以随便更改，但是前后要统一

`git clone git@github.com:liuan62/gitskills.git`克隆远程仓库

## 分支管理

`git checkout -b dev`创建并切换到分支`dev`上

> `-b`表示创建并切换
>
> 相当于`git branch dev` && `git checkout dev`

`git branch`查看当前分支

`git branch -vv`查看分支情况，及最后一次`commit`的标签

> 当前分支前会有一个`*`

`git checkout master`切换回`master`分支

`git merge dev`将`dev`分支的结果合并到`master`中

`git branch -d dev`删除分支

`git merge --abort`忽略冲突，以当前分支为主进行融合

`git log --graph --pretty=oneline --abbrev-commit`查看分支合并情况

`git merge --no-ff -m "merge with no-ff" dev`禁用`Fast forward`模式合并`dev`分支

`git stash`暂存工作现场

`git stash pop`恢复工作现场，并删除`stash`内容

`git stash list`查看暂存历史

`git stash apply stash@{0}`恢复指定的`stash`

`git stash drop`删除`stash`

`git branch -D dev`强行删除未保留的分支

## 多人协作

`git remote`查看远程库信息

`git remote -v`显示更详细的信息

> fetch表示可抓取，push表示可以推送

`git push origin dev` 推送`dev`分支到`origin`远程库

> 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并

`git clone git@github.com:name/learngit`将远程库的`learngit`repo克隆到本地

> 只能将`master`主分支克隆下来

`git checkout -b feature1 origin/feature1`将远程库的`feature1`分支克隆到本地

> 等同于
>
> ​	`git checkout feature1`
>
> ​	`git branch --set-upstream-to=origin/feature1  feature1`

`git pull`更新当前分支，同远程库同步

## 标签管理

`git tag`查看当前分支的标签

`git tag <tagname>`给当前分支打上标签

`git tag <tagname> <commit id>`给某个指定`commit`打标签

`git tag -a <tagname> -m <"description"> <commit id>`添加标签信息

`git show <tagname>`查看标签信息

`git tag -d <tagname>`删除标签

`git push origin <tagname>`推送某个标签到远程

`git push origin -- tags`一次性推送所有尚未推送到远程的本地标签

`git push origin :refs/tags/<tagame>`删除远程标签

> 删除远程标签前，必须先删除本地标签

