---
20181108
---
# git简介
## 集中式和分布式
## git的诞生
# 安装git
# 创建版本库
# 版本管控
版本管控，可以在管控各个版本，
## 版本回退
## 工作区和缓存区
## 管理修改
## 撤销修改
## 删除文件
```shell
#删除版本库文件，并需要commit
git rm file
#从版本库恢复文件
git checkout -- file
```
----
20181109
---
# 远程仓库
远程仓库的作用：分布式协同，没有网也能管控
## 添加远程库
在github添加远程库，并将远程库与自己本地库关联，提交本地修改
## 从远程库克隆
使用git clone命令从远程库copy仓库。git支持多种协议，例如https，ssh，使用ssh协议要更快一些。
# 分支管理
git分支管理切换很快，不会影响其他人的工作。
## 创建与合并分支
```shell
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建并切换分支：git checkout -b <name>
合并某分支到当前：git merge <name>
删除分支：git branch -d <name>
```
## 解决冲突
git版本冲突时，需要手工解决冲突，解决之后在提交，合并。使用```git log --graph``` 查看版本分支图。
## 分支管理策略
尽可能使用dev分支，并使用--no-ff参数使用普通模式合并，保留曾经做过的合并
## bug分支
修复bug时，需要添加bug分支进行修复，然后合并，最后删除。
使用```git stash``` 保留未完成的工作现场，然后使用```git stash pop```恢复。

## feature分支
开发一个新的功能 最好新添加一个分支。
如果要丢弃一个没有被合并过的分支，可以通过```git branch -D <name>```强行删除。
## 多人协作
一般情况下，远程仓库会有一个master主分支，还有n个开发分支。每个开发人员都需要clone出dev分支，然后在dev分支上开发。
一般bug分支和feature分支不用同步到远程仓库，只是在本地由本地开发人员使用。
提交的时候
1. 首先clone master，然后创建自己的分支，可以在本地master下执行```git branch --set-upstream-to <branch-name> origin/<branch-name>```简历分支
2. 其次，可以使用```git push origin <branch-name>```推送自己的修改
3. 如果推送失败，则远程分支比本地要新，需要先更新```git pull origin <branch-name>```。如果```git pull```提示```no tracking information```,则使用命令```git branch --set-upstream-to <branch-name> origin/<branch-name>```添加，
4. 如果合并有冲突，则解决冲突再合并
5. 重新提交```git push origin <branch-name>```

## Rebase
- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

# 标签管理
标签与某个commit关联，是指向某个commit的指针，速度很快
## 创建标签
1. 命令```git tag <tagname>```用于新建一个标签，默认为HEAD，也可以指定一个commit id；
2. 命令```git tag -a <tagname> -m "blablabla..."```可以指定标签信息；
3. 命令```git tag```可以查看所有标签。
## 操作标签
1. 命令```git push origin <tagname>```可以推送一个本地标签；
2. 命令```git push origin --tags```可以推送全部未推送过的本地标签；
3. 命令```git tag -d <tagname>```可以删除一个本地标签；
4. 命令```git push origin :refs/tags/<tagname>```可以删除一个远程标签。

##问题
1. 标签与stash的区别

# 使用github
1. 可以在github任意fork仓库
2. 可以将自己在github上fork的仓库，clone到本地修改 提交
3. 可以提交pull request 给官方库贡献代码

# 使用码云
使用方法同github。同一个本地仓库可以既对应github 又对应码云。  
使用关联远程库命令，更改远程库的名词，
```
git remote add github git@github.com:michaelliao/learngit.git
git remote add gitee git@gitee.com:liaoxuefeng/learngit.git
```
这时再推送到远程，需要修改远程库的名词
```
git push github master
git push gitee master
```
# 自定义git
## 忽略特殊文件
1. 忽略某些文件时，需要编写.gitignore；
2. .gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！
3. 常用的配置https://github.com/github/gitignore
## 配置别名
可以配置全局或个人用户级别的别名，通过设置别名，减少命令复杂度。  
比如
```shell
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
$ git config --global alias.unstage 'reset HEAD'
$ git config --global alias.last 'log -1'
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
查看配置
```shell
#查看全局配置
$ cat .git/config 
#查看当前用户配置
$ cat .gitconfig
```
## 搭建git服务器
使用gitlab搭建