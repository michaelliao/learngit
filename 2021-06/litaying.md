廖雪峰Git教程

# 一、Git简介

分布式版本控制系统

C语言

## 1、安装配置：Git bash

```
git config -- global user.name "Your Name"
git config -- global user.email "Email@example.com"
```

## 2、创建版本库

版本库，仓库，repository，目录，追踪更改历史并还原

```
mkdir learngit //创建文件夹
cd learngit //进入目录
pwd //显示当前目录

git init //初始化以管理

git add readme.txt //把文件添加到仓库
git commit -m "wrote a readme file" //提交到仓库并记录改动内容

```

# 二、版本控制（时光机穿梭)

```
git status //查看仓库状态
git diff //查看修改内容
```

## 1、版本回退

```
git log //查看最近到最远的提交日志
git log --pretty=oneline //仅展示版本号及变更内容
git reset --hard HEAD^ //回退到上个版本 ^代表回退次数git reset --hard HEAD~100 //回退到上一百个版本
git reset --hard 1094a //指定回到某个版本
git reflog //查看命令记录以回退到未来版本
```

## 2、工作区和暂存区

工作区(Working Directory): learngit文件夹

版本库(Repository): 存放stage的暂存区以及自动创建的分支master和指针HEAD

## 3、管理修改

Git跟踪并管理的是修改

## 4、撤销修改

```
git checkout -- readme.txt //丢弃工作区的修改，回到最近一次add或commit状态
git reset HEAD readme.txt 回退到最新的版本或把暂存区的修改回退到工作区
```

## 5、删除文件

```
rm test.txt //删除文件
git commit
git checkout //撤销添加到版本库文件的删除
```

# 三、远程仓库

创建SSH Key 

生成id_rsa和id_rsa.pub文件

```
ssh-keygen -t rsa -C "Youremail@mail.com"
```

使用默认值配置

在远程仓库添加秘钥

## 1、添加远程库

创建库learngit

把本地库推送到远程仓库

```
git remote add origin git@gitee.com:taying/learngit.git //关联本地仓库

git push -u orign master //推送当前master分支到远程 -u关联远程库
git push origin master //关联后推送方式
```

在本地删除远程库

```
git remote -v //查看远程库信息
git remote rm origin //根据名字删除（解除绑定）
```

## 2、从远程库克隆

建立远程库---命名---初始化

```
git clone git@gitee.com:taying/gitskills.git //克隆远程库

cd gitskills
ls //查看文件列表
```

# 四、分支管理

## 1、创建与合并分支

```
git switch -c dev //创建并切换到dev分支 -b表示创建并切换---新特性
git checkout -b dev //创建并切换到dev分支 -b表示创建并切换
//相当于
git branch dev //创建dev分支
git checkout to branch dev //切换到dev分支

git branch //查看当前分支，*为当前分支

git switch master //切换到master分支---新特性
git checkout master //切换到master分支

git merge dev // 合并指定分支到当前分支
git branch -d dev //删除dev分支
```

## 2、解决冲突

相同文件的相同内容各自都有新的提交无法“快速合并”，需要手动修改冲突后，重新提交再合并。

## 3、分支策略管理

```
git merge --no-ff -m "merge with no-ff" dev //强制禁用Fast forward模式以保留分支历史来合并分支
```

## 4、Bug分支

```
git stash //临时储藏当前工作现场
git stash list //查看储藏的工作现场
git stash apply //恢复stash但不删除stash
git stash drop //删除stash
git stash pop//恢复stash并删除stash
git stash apply stash@{0} //恢复指定stash

git cherry--pick 4c805e2 //"复制"提交所做的修改
```

## 5、feature分支

```
git branch -D feature-vulcan //强制删除分支
```

## 6、多人协作

首先，可以试图用git push origin <branch-name>推送自己的修改；

如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

如果合并有冲突，则解决冲突，并在本地提交；

没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！

如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。

```
git remote //查看远程库信息
git push origin <branch-name> //本地推送分支
git pull //抓取远程的新提交
git checkout -b <branch-name> origin/<branch-name> //在本地创建和远程分支对应的分支
git branch --set-upstream-to=origin/<branch-name> <branch-name> //建立本地分支和远程分支的联系
```

## 7、rebase

```
git rebase //rebase操作可以把本地未push的分叉提交历史整理成直线
```

# 五、标签管理

版本库中打一个标签（tag），唯一标识版本（commit号），方便查找。

类似域名和IP地址。

## 1、创建标签

```
git tag <tagname> //新建一个标签，默认为HEAD，也可以指定一个commit id
git tag //查看所有标签
git tag -a <tagname> -m "describe" //指定标签信息
git show <tagname> //查看标签信息
```

## 2、操作标签

```
git tag -d v0.1 //删除未推送的本地标签
git push origin v1.0 //推送标签到远程
git push origin --tags //推送所有标签到远程
git push origin :refs/tags/v0.9 //删除远程标签
```

参考链接

[Git教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600)

[GitHub Git 备忘单 - GitHub Cheatsheets](https://training.github.com/downloads/zh_CN/github-git-cheat-sheet/)

[Git - Reference (git-scm.com)](https://git-scm.com/docs)

[Git - Book (git-scm.com)](https://git-scm.com/book/zh/v2)



