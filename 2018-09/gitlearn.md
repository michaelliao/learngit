---
layout: post
title:  "常用工具-git"
date:   2018-09-08 20:37:31 +0800
categories: 常用工具
tags: git 
---

* content
{:toc}

本文记录一些比较常用的git命令并给出响应的使用场景。
主要参考博客：
[廖雪峰git教程][1]
非常感谢廖老师的博客，学习了很多。

## 常用操作
1. 配置用户
> git config --global user.name "Your Name"
git config --global user.email "email@example.com"

2. 版本回退
在Git中，用`HEAD`表示当前版本,上一个版本就是HEAD^，上上一个版本就是`HEAD^^`，当然往上100个版本写100个^比较容易数不过来，所以写成`HEAD~100`。
> // 查看要回退到哪一个版本 
git log
// 回退到HEAD的上一个版本
git reset --hard HEAD^
// 查看操作记录
git reflog
// 返回到回退前的版本
git reset --hard (commit_id)

3. 撤销修改
> git checkout -- readme.txt

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后**还没有被放到暂存区**，现在，撤销修改就回到和**版本库一模一样的状态；**

一种是readme.txt.**已经添加到暂存区后**，又作了修改，现在，**撤销修改就回到添加到暂存区后的状态。**

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

Git同样告诉我们，用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区
 > git reset HEAD readme.txt

`git reset`命令既可以`回退版本`，也可以把`暂存区的修改回退到工作区`。当我们用HEAD时，表示最新的版本。

以上命令使用场景：
场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，使用`git reset --hard commit_id`回退到相应版本，不过前提是没有推送到远程库。

![history-stage-working directory][2]

## 远程操作
这里以Github远程仓库为例，由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：
1. 创建·`SSH Key`。在用户主目录下（Windows系统`在C:\Users\'youraccount'\.ssh`目录下），看看有没有`.ssh`目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
> ssh-keygen -t rsa -C "youremail@example.com"

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是`SSH Key`的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

2. 登陆GitHub，打开“Account settings”，“SSH Keys”页面,点`Add SSH Key`，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

3. 创建GitHub远程仓库，并给本地仓库添加远程仓库，然后推送到远程仓库。
> // 创建远程仓库 
git remote add origin git@github.com:'youaccount'/learngit.git
// 推送到远程仓库
git push -u origin master

由于远程库是空的，我们第一次推送master分支时，加上了`-u`参数**，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来**，在以后的推送或者拉取时就可以简化命令。

## 分支管理
### 创建与合并分支
1.创建dev分支，然后切换到dev分支：
> git checkout -b dev

git checkout命令加上`-b`参数表示创建并切换，相当于以下两条命令：
> // 新建branch dev
git branch dev
// 转到dev
git checkout dev

用`git branch`命令查看当前分支.

2.用`git merge 'branch'`命令用于合并指定分支到当前分支。合并之后可以选择用`git branch -d dev`删除分支。

3.如果要merge的分支的连个分支同时修改了同一个文件，那么就会出现冲突
> git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.

此时修改产生冲突的文件就可以解决。
> git add readme.txt 
 git commit -m "conflict fixed"

3.通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的`commit`，这样，从分支历史上就可以看出分支信息。

以合并dev分支为例，--no-ff参数，表示禁用Fast forward
> git merge --no-ff -m "merge with no-ff" dev

### 分支策略
在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：
![分支策略][3]

### bug分支
当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交：
Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。
> $ git stash
Saved working directory and index state WIP on master: 747daa8 merge with noff

现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

现在可以开始修复bug，首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支
> // 切换到master分支
git checkout master
// 切到bug分支
git checkout -b issue-101
git add .
git commit -m "fix bug 101"
// 切到master开始合并分支
git checkout master
git merge --no-ff -m "merged bug fix 101" issue-101

bug修好后可以返回到dev分支继续干活.
1.先用`git stash list`命令查看之前保存的记录。
2.恢复保存的工作记录，有两种方法.
一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；另一种方式是用`git stash pop`，恢复的同时把stash内容也删了

当然，你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令
`git stash apply stash@{0}`

小结：
修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场。

## 多人合作
### 推送分支
把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上。
>  git push origin master
git push origin dev

### 抓取分支
多人协作时，大家都会往`master`和`dev`分支上推送各自的修改。

当有xiao'hui'b从GitHub上clone下代码准备开发时，默认情况下只能看到本地的master分支。现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：
> git checkout -b dev origin/dev


### 小结
- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

## 标签管理
### 创建标签

在Git中打标签非常简单.

1. 首先，切换到需要打标签的分支上,`git checkout <branch>`
2. 然后，敲命令`git tag <name>`就可以打一个新标签.
3. 可以用命令`git tag`查看所有标签，也可以使用`git tag v0.9 <commit_id>`给对应的commit打标签。
4. 
注意，标签不是按时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息.

5. 还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
> git tag -a v0.1 -m "version 0.1 released" 1094adb

### 操作标签
1. 如果要删除tag可以使用`git tag -d <tag_name>`
2. 因为创建的标签都只存储在本地，不会自动推送到远程，如果要推送某个标签到远程，使用命令`git push origin <tagname>`,或者，一次性推送全部尚未推送到远程的本地标签`git push origin --tags`
3. 如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除`git tag -d v0.9`, 然后，从远程删除。删除命令也是push，但是格式是`git push origin :refs/tags/v0.9`



  [1]: https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
  [2]: http://static.zybuluo.com/xiaocorn/3lc5zkkwskradgw8lidl2kc4/image_1cn4a58eb1ouari51h5u1oj71rmf2p.png
  [3]: http://static.zybuluo.com/xiaocorn/nlrpcqlk27f4brfzfxzrqtch/image_1cn4cbhtc1s4q1jo3jf9q8h9pb4m.png