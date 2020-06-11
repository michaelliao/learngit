
Autor: WZX  
Date: 2020-02-24  
Github: <https://github.com/WanZixin>  
Weibo: <https://weibo.com/u/5979719536>  

---

# Git笔记

## 题外话
首先，感谢廖雪峰老师的Git教程，您的Git教程有完整的体系，风趣幽默的语言。最欣赏您对重要概念的配图及解释，这对Git的学习有许多帮助，我于此获益良多。以下记录常用的git命令。

## 1.创建版本库
```
mkdir <directoryname>     创建一个空目录
```
```
$ git init      把某目录变成Git可以管理的仓库
``` 
```
$ git add <filename>      把文件添加到仓库
```

```
$ git commit -m "discription"       从暂存区提交到master分支
```
> discription是本次提交的说明

## 2.时光机穿梭
```
$ git log       查看提交历史

$ git log --pretty=oneline      减少输出信息，提高可读性
```

---

```
$ git reset --hard HEAD^        回退到上一版本

$ git reset --hard <commitid>     命令行窗口未关闭时，回退到commit id对应的版本；版本号不必写全，写前几位即可

$git reflog     命令行窗口关闭时：查看命令历史，找到目的版本的commit id，再利用上一条命令返回目的版本
```
>HEAD 表示当前版本，HEAD^ 表示上一个版本，HEAD^^ 表示上上一个版本……

---

```
$ git status        查看状态
```
```
$ git checkout --<file>     丢弃工作区的修改

$ git reset HEAD <file>     取消暂存

$ git restore --staged <file>       取消暂存
```
```
$ git rm <file>     删除文件
```
>删除后，记得commit

## 3.远程仓库
```
$ git remote add origin git@github.com:WanZixin/learngit.git        关联我的远程库
```
```
$ git push -u origin master     把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

$ git push origin master        推送最新修改
```
```
$ git clone git@github.com:WanZixin/gitskills.git       克隆到本地库，也可用https协议，但原生ssh协议速度最快
```

## 4.分支管理

### 4.1创建与合并分支
```
$ git branch        查看当前分支
```
```
$ git branch <branchname>        创建分支
```
```
$ git branch -d <branchname>        删除分支
```
```
$ git switch <branchname>        切换到指定分支
$ git checkout <branchname>     同上
```
```
$ git switch -c <branchname>        创建并切换到指定分支
$ git checkout -b <name>        同上
```
```
$ git merge <branchname>        合并指定分支到当前分支
```

### 4.2解决冲突
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

```
$ git log --graph       查看分支合并图
```
### 4.3分支管理策略
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

```
$ git merge --no-ff -m "merge with no-ff" dev       使用no-ff方式合并，表示禁用Fast forward
```    

**在实际开发中，我们应该按照几个基本原则进行分支管理：**
>首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

>那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

>你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

### 4.4bug分支
软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。
```
$ git stash     把当前工作现场“储藏”起来，等以后恢复现场后继续工作
```
```
$ git stash list        查看工作现场
```
```
$ git stash apply       恢复现场后并不删除stash的内容

$ git stash drop        删除stash的内容

$ git stash pop     恢复现场的同时把stash也删除了
```
```
$ git stash apply stash@{0}     恢复到指定的stash
```
```
$ git cherry-pick <commitid>       复制一个特定的提交到当前分支

```
>**在master分支上修复的bug，合并到当前dev分支,避免重复劳动**

### 4.5 feature分支
软件开发中，总有无穷无尽的新的功能要不断添加进来。添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。
>Git友情提醒，feature-vulcan分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用大写的-D参数。
```
$ git branch -d feature-vulcan
$ git branch -D feature-vulcan
```

### 4.6多人协作
+ master分支是主分支，因此要时刻与远程同步；

+ dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

+ bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

+ feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
```
$ git remote        查看远程库信息

$ git remote -v     显示更详细的信息
```
多人协作的工作模式：
1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；

2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；

3. 如果合并有冲突，则解决冲突，并在本地提交；

4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

5. 如果`git pull`提示 no tracking information ，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

## 5.标签管理
tag是一个让人容易记住的有意义的名字，跟某个commit绑在一起。
```
$ git tag <tagname>        打一个标签，默认标签是打在最新提交的commit上的
```
```
$ git tag         查看所有标签
```
```
$ git tag -a <tagname> -m "description"     指定标签信息；
```
```
$ git tag <tagname> <commitid>       给指定commit添加标签   
```
```
$ git tag -d <tagname>      删除标签
```
```
$ git push origin <tagname>      推送标签到远程库

$ git push origin --tags        一次性推送全部尚未推送到远程的本地标签
```
如果标签已经推送到远程，要删除远程标签需要两步：
1. 先从本地删除 `$ git tag -d <tagname>`
2. 再从远程删除 `$ git push origin :refs/tags/<tagname>`

## 6.自定义Git
### 6.1忽略特殊文件
+ 忽略某些文件时，需要编写 `.gitignore`
+ `.gitignore` 文件本身要放到版本库里，并且可以对.gitignore做版本管理！
+ **忽略文件的原则**
    >1.忽略操作系统自动生成的文件，比如缩略图等；

    >2.忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；

    >3.忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

### 6.2配置别名
配置Git的时候，加上--global是针对当前用户(这台电脑的所有Git仓库)起作用的，如果不加，那只针对当前的仓库起作用。
```
example： $ git config --global alias.st status     用st表示status
```
每个仓库的配置文件都放在 `.git/config` 文件中，其中别名在 `[alias]` 后面，要删除别名，把对应的行删除即可。

### 6.3搭建Git服务器
略

