# 临界知识

1. 概念，git，解决版本控制的问题的操作体系，基本形式是分布式
2. 概念，提交，一个保存的工作状态，整个git的基本元素，类似于还原点的作用，可以查到版本号
3. 概念，工作区，暂存区，master分支，head指针。基本是工作区和版本库，版本库包含暂存区和提交区（分支区），工作区是工作文件夹，暂存区是作为提交缓存以及确保不会提交错用的，master是默认的分支，head指针指向当前分支。指针结果类似c++。所有看起来复杂的操作，背后的逻辑都是这4个概念
4. 技巧，status查看状态时会给出操作提示
5. 概念，分支，本质是一种提交, 准确来说应该是提交区，基于分支概念，修复bug开发feature的时候都应该应用这种手段。另一方面，基于分支概念，开发的基本模式，master稳定发布版本，dev提交开发版，其他另开支线



### git

**本质上是用于版本控制**，准确的讲，分布式版本控制管理系统

分布式：每台机器都又独立的资源，有一个总服务器强调用于资源交换更新

集中式：资源都处于一个服务器中，每台机器连接后操作

### 创建版本库

```
$ mkdir learngit 创建文件夹
$ cd learngit    进入
$ pwd			查看目录
$ git init       初始化为版本库
$ git add readme.txt 添加的暂存区
$ git commit -m "wrote a readme file"  提交
```

### 时光穿梭

##### 基本操作

```
$ git status 查看状态（工作区和暂存区）
$ git diff	 查看修改（对比工作区和提交中）
```

##### 版本回退

```
$ git log 查看日志
$ git reflog 查看未来日记
$ git log --pretty=oneline 简化日志
两种回退
$ git reset --hard HEAD^ 上一个版本 ^^和~100
$ git reset --hard 3628164

```

##### 撤销修改

```
$ cat readme.txt 查看
$ git checkout -- readme.txt 恢复，原理是和版本库同步
$ git reset HEAD readme.txt 取消添加到暂存区
```

##### 删除文件

```
$ rm test.txt 文件管理器中删除
$ git rm test.txt 添加删除操作到暂存区
$ git commit -m "remove test.txt" 提交
$ git checkout -- test.txt 用于取消删除，原理是和版本库同步
```

##### 远程仓库

github就是git的托管网站，相关操作参考

http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001374385852170d9c7adf13c30429b9660d0eb689dd43a000

### 概念.分支

**本质上一种提交**,master指针和其他指针操作,方便于开发来回操作的一种体系.要注意,本质上区别于平行世界.

##### 分支的基本

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

##### 解决冲突: 两条分支都修改

merge后提示错误，只需要再进入文件，按提示修改后提交即可

文件中是这样的

```
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1
```

##### 分支管理策略：形成一套开发体系

基本操作是基于**合并的时候保存该分支的提交**

查看分支图：`git log --graph --pretty=oneline --abbrev-commit`

合并保存（禁用fast forward`git merge --no-ff -m "merge with no-ff" dev`

##### 遇到bug需要开发新feature：保存当前分支，切取修bug

保存现场 `git status`

查看stash `git status list`

恢复现场两种

1. 应用某一个` git stash apply stash@{0}`,删除第一个（0）`git stash drop`
2. 应用并删除`git stash pop`

### 远程相关

```
$ git remote -v  查看连接 -v为详细信息参数
$ git push origin master 推送分支
克隆到本地
$ git clone git@github.com:michaelliao/learngit.git
设置修改人和邮箱
$ git config --global user.name "Your Name"  设置修改人 --global为全局参数
$ git config --global user.email "email@example.com" 设置邮箱
查看修改其他分支
$ git checkout -b dev origin/dev

```

解决多人修改同一个分支的问题

1. 首先，可以试图用`git push origin branch-name`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！

如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。

### 标签

本质同样是提交，和分支类似，只不过分支可以移动，标签不可以

```
添加
$ git tag v1.0 当前指针标签
$ git tag v0.9 6224937 版本号标签
$ git show v0.9 详情
$ git tag -s v0.2 -m "signed version 0.2 released" fec145a -s用私钥签名一个标签安装gpg（GnuPG）
删除
$ git tag -d v0.1 本地
git push origin :refs/tags/<tagname> 远程（需要先删本地）
推送
$ git push origin v1.0 推送一个
$ git push origin --tags 推送全部
```

