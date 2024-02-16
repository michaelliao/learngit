# Git入门
>git学习笔记 
>Git官网：http://git-scm.com 
>本文主要是[Git教程 | 廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)的学习总结  
><!--[笔记收藏](https://www.jianshu.com/p/36342812cd3a)--> 
>[常用Git命令清单 | 阮一峰](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
>[Pro Git](/assets/progit.pdf)
>[git-cheat-sheet](/assets/git-cheat-sheet.pdf) 
>author: gyc514893758
---
## git简介
### 什么是git
git 是分布式版本控制系统
对于一个项目，有不同版本，可以记录每次改动，可以有不同分支  
方便回退、协作等

### 分布式版本控制系统
每个人电脑上都是一个完整的版本库，不联网也能工作
方便拉取分支、合并修改

### 安装git
[Windows下载地址](https://git-scm.com/downloads)  
按默认选项安装即可。  
安装完成后，在开始菜单里找到<i>“Git”->“Git Bash”</i>，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

打开“Git Bash”，输入：
```git
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
**注意**：`git config`中的`--global`表示此电脑上所有git仓库都使用该配置。你也可以为某个仓库指定不同的用户名和E-mail地址。  

使用``git config --list``命令可以查看所有设置

---
## 创建版本库
版本库，也叫仓库，**repository**。  
可以理解成一个被Git管理的目录、文件夹。git可以跟踪每个文件的修改删除。

1. 新建文件夹，创建一个空目录（*目录名最好不含中文*）  
2. 右键``Open Git Bash here``  
3. 输入指令``git init``建立仓库  
   此时生成一个`.git`目录（默认隐藏），**不要改动**  
4. 添加文件
   (1) 在仓库中创建文件
   (2) ``git add <file>``，添加成功没有消息  
   (3) ``git commit -m"<message>"``，将文件提交到仓库，`-m`输入本次提交的说明，执行成功会告诉你改动  
   `add`可以添加多个文件，`commit`一次提交

当``git commit``不带`-m`参数时，进入*vim编辑器*。编辑完成，退出时：  
按`Esc`键退出编辑模式，然后：
- 保存并退出：  
  输入英文`wq` `ZZ` + `回车`
- 不保存退出
  输入英文`q!` `qa!` + `回车`

---
## 版本控制
### 工作区与暂存区
- **工作区**：  
  电脑中能看到的目录
- **版本库**：  
  隐藏目录`.git`。版本库包括：
  - **暂存区**（*stage、index*）
  - 自动创建的第一个分支`master`
  - 指向`master`的一个指针`HEAD`
![alt text](/assets/image.png)

### 修改文件
指令``git status``告诉我们当前仓库的状态。  
- `Untracked files:`表示仍在工作区的文件  
- `Changes to be commited:`表示在缓存区，还没有提交的文件
- 如果没有改动，会告诉你`nothing`  

指令``git diff <file>``会告诉你修改的内容

### 版本回退
命令``git log``告诉我们提交的历史记录，按`Q`键退出查看  
（``git log --pretty=oneline``可以简化输出信息）  
一长串16进制数字是版本号**commit id**

在git中，`HEAD`表示当前版本，`HEAD^`表示上个版本（上上个`HEAD^^`，上100个`HEAD~100`）

``git reset --hard HEAD^``回退到上个版本  
``git reset --hard <commit id>``回退到版本号对应版本（id不用写全，只写前几位可识别就行）  
**重设，此版本之后的版本消失**。此时log中不能查询目前回退到的版本之后的版本。  
可以使用``git reflog``查看每一次命令对应id，以回退到消失的版本  

``git revert --hard``不会丢失版本，它实际上是新的一版使用了以前的内容，本质上不是回滚。而`reset`是完全退回到之前的版本。  

### 撤销修改
1. 工作区修改，未添加到暂存区`git restore <file>`
2. 修改已添加到暂存区，未提交`git restore --staged <file>`，再转1
3. 已提交版本，直接`git reset --hard HEAD^`回退

### 删除文件
直接在文件管理器中删除，或者指令`rm <file>`  
此时，工作区和版本库不一致。

如果确实要从版本库删除，就用`git rm`删除，并且`git commit`提交。

如果删错了，可以从版本库还原误删文件`git checkout --<file>`  
`git checkout`其实是用版本库版本替换工作区版本，无论工作区是修改还是删除，都可以“一键还原”。

---
## 远程仓库
### 设置Github
GitHub提供Git仓库托管服务。本地Git仓库与GitHub仓库之间的传输通过SSH加密。
1. 创建SSH Key  
   打开Git Bash，输入``ssh-kyygen -t rsa -C"youremail@example.com"``。使用自己邮箱，并且一直回车（使用默认值）。成功后，在用户主目录(`C:\Users\用户名`)里可以找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。
2. 登录GitHub  
   打开账户设置，"SSH Keys"，点击"add SSH Key"，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容。（Github允许添加多个Key）

### 添加远程库
#### 创建远程库
在本地创建一个git仓库后，想要在GitHub上创建一个同步的远程仓库。
1. 登录GitHub，"create a new repo"，填写基础信息，创建仓库。
2. 在本地仓库运行``git remote add origin git@github.com:<user/repo.git>``。  
   此时远程库名字叫`origin`，默认叫法，也可以改成别的。
3. ``git push -u origin master``把本地库内容推送到远程库。  
   由于远程库是空的，我们第一次推送master分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会关联二者。在以后的推送或者拉取时就可以简化命令``git push origin master``。

#### SSH警告
当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告：
```
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```
这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，**输入yes回车**即可。

Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：
``Warning: Permanently added 'github.com' (RSA) to the list of known hosts.``
这个警告只会出现一次，后面的操作就不会有任何警告了。

### 从远程库克隆
先有远程库，从远程库克隆到本地
1. GitHub上先建好远程库
2. ``git clone git@github.com:<user/repo.git> <新建本地仓库名>``  
   会在当前目录下生成一个子目录仓库（省略后者默认同名）

上述使用的是`ssh`协议，速度最快。

有时也使用`https`协议：``git remote add origin https://github.com/user/repo.git``。  
比较慢，且每次推送必须输入口令。

#### 删除远程库
运行``git remote rm <name>``命令。  
使用前，建议先用``git remote -v``查看远程库信息。然后，根据名字删除。比如删除origin：``git remote rm origin``

此处的“删除”其实是解除了本地和远程的绑定关系，远程的仓库仍存在。

## Git分支管理
创建一个属于自己的分支，不影响其他人的工作。可以和之前讲的一样管理。到开发完毕再一次性合并分支。

分支可以理解为当前工作目录的一个副本（平行世界）。  
将项目划分成多条线，例如：在开发线（*dev*）上修改，之后合并到主线（*master，main*）上，保证主线的稳定性。
### 创建与合并分支
``git branch``查看分支，`*`标明当前分支，附加参数：
  - `-r`远程库分支列表
  - `-a`所有分支，`remotes`开头表示远程分支
  - `-v`查看一个分支的最后一次提交
  - `--merged`查看已合并到当前分支的分支
  - ``--no-merged``查看所有未合并的分支


``git branch <name>``创建分支
``git switch <name>``，``git checkout <name>``转到分支
``git switch -c <name>``，``git checkout -b <name>``创建并转到分支
切换分支时**工作区和暂存区应该是干净的**。

``git merge <name>``将分支合并到当前分支
``git branch -d <name>``删除分支（已合并或者未修改
``git branch -D <name>``强制删除分支（没有合并过，丢失修改）

``git branch -m <old name> <new name>``重命名分支
### 解决冲突
不能自动合并的冲突，需手动解决（此时分支名变化）：   
```
<<<<<<<HEAD
<当前更改>
=======
<传入的更改>
>>>>>>><commit id>
```
**手动编辑更改之后再提交**。

``git log --graph``可以查看合并分支图。

### bug分支
``git stash``保存、隐藏当前工作状态，此时用`git status`查看工作树是干净的。
``git stash list``查看保存状态。

恢复工作状态（两种方法）：
- ``git stash pop``恢复并删除stash
- 1. ``git stash apply``恢复stash
  2. ``git stash drop``删除stash

可以多次stash，恢复指定的stash：
``git apply stash@{0}``

保存stash，创建bug分支、修改、提交、合并，删除bug分支，恢复stash。

此时修改了master分支的bug，该bug在dev分支上也存在，只复制这次提交：
``git cherry-pick <commit id>``
这个操作仍会生成一个commit id，虽然提交的内容相同，但本质不是同一次提交

### 多人协作
从远程仓库克隆时，自动将本地的`master`分支和远程的`master`分支对应。远程库默认名称`origin`。  

``git remote``查看远程库信息
``git remote -v``显示远程库详细信息

``git push <remote> <branch>``推送分支，将该分支所有本地提交推送到远程库。（需指定本地分支）
`master`和`dev`分支应与远程库同步，其他分支视情况而定。

推送分支前，应该先拉取分支（远程库可能比本地更新）。如有冲突，先解决冲突。
``git pull``

```
git branch --set-upstream <branch-name> origin/<branch-name>
```
建立本地分支与远程分支的关联。

``git pull <remote> <remote branch>:<branch>``
拉取远程分支，如果省略本地分支，默认同名

``git push <remote> :<branch>``删除远程分支

---
## 标签管理
给版本库打一个标签tag，取某个标签的版本。  
就像给commit id起个名字加书签。
### 创建标签
``git tag <name>``给最新一次提交打标签  
``git tag <name> <commit id>``给历史某次提交打标签  
``git tag -a <tagname> -m'message'`` 可以指定标签信息  
``git tag``查看所有标签（*按字母排序*，不是时间）  
``git show <tagname>``查看某个标签信息  

### 操作标签
标签存储在本地，不会自动推送到远程。如果要推送到远程：
- ``git push origin <tagname>``某个标签  
- ``git push origin --tags``所有标签

删除标签： 
- 标签只在本地：  
  ``git tag -d <tagname>``删除本地标签  
- 标签推送到远程：
  1. ``git tag -d <tagname>``删除本地标签
  2. ``git push origin :refs/tags/<tagname>``删除远程标签

## 自定义Git
### 忽略特殊文件
忽略文件的原则是：
- 忽略操作系统自动生成的文件，比如缩略图等；
- 忽通过另一个文件自动生成的中间文件，比如Java编译产生的.class文件；
- 忽略带有敏感信息的配置文件，比如存放口令的配置文件。

在工作区根目录创建`.gitignore`文件，写入要忽略的文件名。  
不需要从头写`.gitignore`文件。所有配置文件可以直接在线浏览：https://github.com/github/gitignore. 组合即可。

如果想添加被忽略的文件：  
``git add -f <file>``强制添加  
``git check-ignore``检查哪条规则忽略了该文件。

`.*`排除所有`.`开头的隐藏文件
`*.class`排除所有`.class`类型文件
`!.gitignore`不排除文件

可以通过https://gitignore.itranswarp.com 在线生成`.gitignore`文件。

### 配置别名
```
$ git config --global alias.co checkout
$ git config --global alias.cm commit
$ git config --global alias.br branch
$ git config --global alias.unstage 'reset HEAD'
$ git config --global alias.last 'log -1'
```
代替的命令是一个单词可以直接写，有空格加引号，有引号则单双引号交替。

每个仓库的配置文件在`.git/config`中，当前用户的配置文件在用户主目录下隐藏文件`.gitconfig`中。  
别名就在`[alias]`后面，可以直接修改。

### 其他
```
# 适当显示颜色
$ git config --global color.ui true
```

## 搭建Git服务器
https://www.liaoxuefeng.com/wiki/896043488029600/899998870925664

## Git的图形界面工具
SourceTree
https://www.liaoxuefeng.com/wiki/896043488029600/1317161920364578