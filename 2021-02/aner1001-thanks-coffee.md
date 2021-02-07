---
layout: post
title: Git学习笔记
categories:
  - - 技术知识
    - 工具
tags:
  - Git
pin: false
date: 2021-02-04 10:14:11
updated: 2021-02-04 10:10:11
description: Git工具学习笔记。主要参考了廖雪峰老师的学习网站。本文中如果使用了<file>,<branchname>，<>这些标签为了好的区分和显示效果才加上。实际写命令时不需要带上<>,直接写里面的名称内容就可以。
---





## 命令整理：

### 创建版本库

**`init`**

```bash
git init
```

将当前所在目录变成Git可以管理的仓库。初始化本地版本库。

**`clone`**

```bash
git clone <url>   #从远程仓库克隆,并关联远程仓库。
```





### 修改和提交

**`add `**

```bash
git add [文件名] 			#添加单个文件
git add [文件名] [文件名]    #添加多个文件
git add . 				  #将所有修改的文件添加到暂存区。
git add -f 				  #强制添加。
```

| 参数 | 描述                                             |
| ---- | ------------------------------------------------ |
| `-f` | 强制添加到git,使其修改被跟踪，跳过忽略文件验证。 |

**`commit`**

```bash
git commit –m ”提交备注信息”   #将文件提交到本地仓库。提交的是暂存区的版本。
git commit --amend			#覆盖上一次的提交内容和修改上一次提交描述。
```

| 参数      | 描述                                       |
| --------- | ------------------------------------------ |
| `--amend` | 覆盖上一次的提交内容和修改上一次提交描述。 |



**`status`**

```bash
git status
```

查看仓库的状态(文件的修改和提交状态)。
:star:当需要切换分支时，如果status命令查出当前分支有修改，先要stash，再切换，符合规范。否则会造成，切换后，被修改的文件，无法切换成目标分支所对应的实际状态。



**`diff`**

```bash
git diff [文件名]     #比较指定文件修改的地方。当前工作区中指定的文件进行比较。暂存区有add时，优先和暂存区比。未加到暂存区，和本地版本库最新的提交版本进行比较。
git diff 			#如果不写文件名，比较所有被修改的文件，功能相同，下方类似。
git diff HEAD [文件名]   	#比较的是工作区中指定的文件与版本库中文件的差异。HEAD指针指向当前，也可以写为HEAD^或者commit_id
git diff HEAD    		   #比较所有被修改的文件。
git diff --cached 		   #比较暂存区和版本库的所有文件差异。
git diff --cached [文件名]  #指定文件进行比较。
```

| 参数                       | 说明               |
| -------------------------- | ------------------ |
| `--cached`<br />`--staged` | 指定为暂存区文件。 |



**`rm`**

```bash
git rm <file>
```

 删除文件，文件区删除了文件，也需要将删除文件的修改操作记录到暂存区，才能commit。



**`stash`**

```bash
git stash  			#保存工作现场,工作区和暂存区。
git stash apply		#恢复工作现场。
git stash drop		#删除工作现场。
git stash pop		#恢复并删除工作现场。
git stash list		#查看保存的工作现场列表。
git stash apply/drop/pop stash@{0}	#操作指定工作现场。
```







### 查看提交日志

**`log`**

```bash
git log						#查看版本库从开始直到当前的commit记录日志，最新的提交显示在第一行。
git log –-pretty=oneline	  #美化成一行显示修改日志。
git log --graph				 #可以看到分支合并图。
git log --graph --pretty=oneline --abbrev-commit	#美化查看分支合并情况。
git log -p <file>		#查看指定文件的提交历史。
```

输入`wq`可以退出查看日志。

| 参数               | 描述                         |
| ------------------ | ---------------------------- |
| `--pretty=oneline` | 显示成一行。                 |
| `--graph`          | 将合并情况显示成图表形式。   |
| `--abbrev-commit`  | 简化CommitId，取前几位显示。 |

**`reflog`**

```bash
git reflog	# 查看所有commit版本的提交和回退的记录。
```

 git reflog用来记录你的每一次命令。

**`blame`**

```bash
git blame <file>	#以列表的方式查看指定文件的提交历史。
```





### 撤销

**`reset`**

```bash
git reset --hard HEAD
git reset --hard HEAD
git reset --hard commit_id		
#版本强制回退，HEAD^表示上一版本  HEAD^^表示上上版本，以此类推。这个版本回退是针对commit管理的所有版本库中的文件，包括了新增和删除的文件和单个文件本身内容的删除和修改。回退时，会将暂存区和文件区版本都被覆盖，和本地仓库指定回退到的版本一致。可以用cimmit_id来代替。

git reset HEAD <file>
git reset HEAD^ <file>
git reset Commit_id <file>
#重置指定文件的暂存区内容,工作区内容不变。当HEAD为当前最新提交时，是丢弃暂存区。HEAD指向历史提交，则是将历史版本放入暂存区中。
```





**`checkout`**/**`restore`**

```bash
git checkout <file>
git restore <file>	#(新版)
```

两个语句功能一致，撤销工作区的修改，回到让这个文件回到最近一次git commit或git add时的状态。



**`revert`**

```bash
git revert <commitId>	#撤销指定的提交。针对cherry-pick命令。单个的commitId回退操作。某个提交夹在了中间，就可以将该提交抽出来撤销掉。
```







### 分支与标签

![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205081459.png)

**`branch`**

```bash
git branch				#查看本地的所有分支，已经当前指向的分支。
git branch dev			#基于当前分支的版本，创建一个平行的分支。
git branch -d dev		#删除本地某个分支。如果创建后进行提交过，则此命令会失效。
git branch -D Feature	#强制删除本地某个分支。
git barnch -r			#查看远程的分支。
git branch -a 			#查看本地和远程的所有分支。
git branch -d -r <branchname> #删除远程分支(只是在本地上删除，删除后还需推送到服务器).
git branch -m <oldbranch> <newbranch> #重命名本地分支
```

| 参数                    | 描述                                 |
| ----------------------- | ------------------------------------ |
| `-d`,`--delete`         | 删除分支。                           |
| `-f`,`--force`          | 强制。                               |
| `-D`,`--delete --force` | 强制删除，即使分支上有过修改和提交。 |
| `-r`,`--remote`         | 远程操作。                           |
| `-a`,`--all`            | 查看本地和远程的所有分支。           |
| `-m`,`--move`           | 移动或重命名。                       |
| `-M`,`-move --force`    | 强制移动或重命名。                   |



**`checkout`**

```bash
git checkout dev		#切换分支。
git checkout -b dev		#创建并切换分支
```

| 参数 | 描述       |
| ---- | ---------- |
| `-b` | 创建分支。 |

**`switch`**

```bash
git switch dev		#切换分支(新)。
git switch -c dev	#创建并切换分支(新)。
```

| 参数 | 描述       |
| ---- | ---------- |
| -c   | 创建分支。 |

**:imp:注意：**
		分支的切换，工作区会保留已修改的内容，暂存区会保存已添加到暂存区的内容。已提交但是还没被修改的内容会在工作区实时同步。
		所以切换分支使用前，尽量将所有分支内容都提交或者如果不能提交的`stash`起来，更加符合分支的时用思想。



**`tag`**

```bash
git tag V1.0	#为当前分支最新的commit创建标签。
git tag			#查看所有标签。
git tag tagName commitId	#为历史中指定的commit打上标签。
git tag -a tagName -m "message" commitId	#创建带说明的标签
git show tagName	#查看标签信息所关联的提交信息(commitid，提交信息等)。
git tag -d tagName	#删除标签(删除的是本地的标签)。
git push origin <tagname>	#推送某个标签到远程。
git push origin --tags		#一次性推送尚未推送的所有标签到远程。
```

标签和commitId都没有分支划分，是针对整个仓库的。





### 合并

**`merge`**

```bash
git merge dev	#合并分支。
git merge --no-ff -m "merge with no-ff" dev   #记录分支历史合并法。就是普通模式合并。
git merge --abort #回滚到合并之前
```

| 参数      | 描述                                           |
| --------- | ---------------------------------------------- |
| `--no-ff` | 普通模式合并。不会覆盖当前提交，生成新的提交。 |
| `--abort` | 回滚到合并之前。                               |

`merge`从合并的角度可理解为合并merge右侧指定的分支到当前分支。







**`cherry-pick`**

```bash
git cherry-pick commitId	#针对某次修改的提交，合并到当前分支。
```



**`rebase`**

```bash
git rebase		#整理历史提交记录为一条直线。
git rebase	<branch>	#指定分支操作。
```

如果是先提交，后拉取的操作，合并后，历史提交记录中会有合并产生。历史日志记录会显示合并的分叉线。该命令修改优化提交记录了抓变成先拉取后提交的操作，抹去合并的记录，使日志展现为一条直线。





### 远程操作

**`remote`**

```bash
git remote 		#查看远程库。
git remote show origin	#查看本地分支和追踪情况。
git remote -v	#查看远程库详细信息。
git remote add origin git@server-name:path/repo-name.git 	#添加远程库地址。
git remote rm origin	#删除已有的远程仓库origin。
git remote prune origin   #同步删除远程已删除的远程分支。
```



**`push `**

```bash
git push -u origin master   #远程库推送并绑定。
git push origin master		#指定远程库和分支进行推送。
git push --force		    #强制提交。
git push origin:<branchname>	#删除分支后推送至服务器。
git push origin <tagname>	#推送某个标签到远程。
git push origin --tags		#一次性推送尚未推送的所有标签到远程。
```

| 参数    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| -u      | 将当前分支与远程库分支绑定。一般在第一次本地提交远程的时候使用。<br />因为已经绑定，以后直接使用简写`git push`命令即可。拉取的时候使用git pull。 |
| --force | 进行强制覆盖提交。                                           |
| --tags  | 一次性推送尚未推送的所有标签到远程。                         |



**`checkout`**

```bash
git checkout -b dev origin/dev		#创建本地库中拉取到的远程origin的dev分支，到本地并关联绑定.
git branch --set-upstream-to=origin/dev dev		#将本地分支与远程分支绑定，绑定后才能使用fetch和pull拉取。
```

本地分支与远程分支绑定，如果未绑定是不能抓取分支的。(master分支再clone的时候默认绑定了。)(一般是本地push上去的分支，需要使用这个语句再绑定。名字尽量起得一样。)





**`pull`**

```bash
git pull 	#抓取并合并已绑定的分支。
git pull git@github.com:aner1001/gitlearn1.git master --allow-unrelated-histories  #将本地仓库从一个commit不一致，无关的远程仓库中拉取，甚至名字都不一样。
git pull <远程主机名> <远程分支名>:<本地分支名>	#将远程主机的某个分支的更新取回，并与本地指定的分支合并，如果不指定，就是默认当前分支。
```

| 参数                          | 描述                                                 |
| ----------------------------- | ---------------------------------------------------- |
| `--allow-unrelated-histories` | 将本地仓库从一个commit不一致，无关的远程仓库中拉取。 |
| `-f`,`--force`                | 强制覆盖本地版本。                                   |



**`fetch`**

```bash
git fetch <远程主机名> #这个命令将某个远程主机的更新全部取回本地.
git fetch <远程主机名> <分支名> #只想取回特定分支的更新,注意之间有空格. 本地会产生一个 FETCH_HEAD分支。

```







### 验证

**`check-ignore`**

```bash
git check-ignore -v db.ini		#验证查看文件匹配到的忽略ignore规则。
```



### 子模块

**`submodule`**

```bash
git submodule add  仓库地址   路径			  #1.为当前工程添加submodule。
git submoudle init 							 #2.初始化子模块。
git submoudle update						 #3.更新子模块。
git submodule update --init --recursive		   #递归初始化并拉取更新所有子模块，效果=2和3.
git submodule foreach  git checkout master      #foreach对每个子模块进行操作。这里是切换到主分支。
git submodule foreach git pull 				   #拉取所有子模块，跳过父工程的版本号记录。
git submodule deinit <submodule-name>			#删除子模块。不是真正的删除，下方常用操作中详细说明。
```





### 配置

**`config`**
```bash
git config --global user.name "Your Name"    			#设置终端管理git仓库的用户名。
git config --global user.email "email@example.com"	#设置终端管理git仓库的邮件地址。
git config --golbal color.ui.true					#让Git显示颜色，会让命令输出看起来更醒目。
git config --golbal alias.st status					#为命令配置别名。
```
| 参数       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| `--global` | global参数表示终端所有的仓库中都会使用这个配置，也可以对某个仓库指定不同的用户名和Email地址。<br/>配置Git的时候，加上--global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。 |



## 常用操作

### 生成SSH密钥，绑定Git服务器。

1. 生成密钥:
   命令：

   ```bash
   ssh-keygen -t rsa -C "youremail@example.com"
   ```

   你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

2. 绑定git服务器
   登陆Git服务器，找到类似“Account settings”，“SSH Keys”页面：
   然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容

3. 完成后在命令行链接测试，首次建立链接会要求信任主机。
   命令:

   ```bash
   ssh -T git@具体git服务器域名
   ```



### 本地库关联远程库，推送远程库

这种情况针对于先有本地后有远程库。

1. 关联远程库。

```bash
git remote add origin git@server-name:path/repo-name.git
```

参数注释：

| 参数        | 描述                   |
| ----------- | ---------------------- |
| orgin       | 远程地址库标识变量名。 |
| server-name | git网站地址。          |
| path        | 账户名                 |
| repo-name   | 远程仓库名             |


当本地项目没有生成秘钥，或者不方便生成秘钥，配置在服务器上。比如云端自动化部署场景。也可以使用https协议，在远程地址上添加用户名和密码或者使用生成的token，进行拉取和上传操作，密码和token类的一般存放在环境变量中比较安全。

```bash
git remote add origin https://用户名:密码@github.com/用户名/仓库名.git
git remote add origin https://${GITHUB_TOKEN}@github.com/用户名/仓库名.git
```

在.git配置文件中可以进行修改。
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205075832.png)



2. 将本地库的内容推送到远程库上。

   ```bash
   git push -u origin master
   ```

   参数注释：

   | 参数   | 描述                                                         |
   | ------ | ------------------------------------------------------------ |
   | -u     | Git不但会把本地的master分支内容推送的<br />远程新的master分支，还会把本地的master分支<br />和远程的master分支关联起来，在以后的推送<br />或者拉取时就可以简化命令。 |
   | origin | 远程库标识名                                                 |
   | master | 分支名                                                       |




### 从远程仓库克隆

命令：

```bash
git clone git@github.com:michaelliao/gitskills.git		#SSH协议拉取。
git clone https://github.com/aner1001/gitskills.git		#Https协议。
git clone -b dev  https://github.com/aner1001/gitskills.git	 #指定分支拉取。
```

| 参数 | 描述               |
| ---- | ------------------ |
| `-b` | 指定分支进行拉取。 |

当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。

### 撤回修改

1.需要丢弃工作期的修改，已提交到暂存区的，回退单最近的暂存区状态。未提交到暂存区，回退到最新的版本库状态。

```bash
 git checkout file
 git restore file（高版本）
```

2.丢弃已提交到暂存区的修改文件，丢弃后工作区内容不变。HEAD指向当前最新提交。

```bash
git reset HEAD file
```



3.已经提交了一次到版本库，要撤回提交。使用版本撤回命令，回到上一版本，但是是针对所有文件的。

```bash
git reset --hard HEAD^
```



4.针对单个文件恢复到版本库的状态，但是已提交了一版到暂存区。1和2配合使用。

```bash
git reset HEAD file 	#1
git checkout file		#2
```

​    

5.针对单个文件恢复到历史版本库的某个状态。

```bash
git reset HEAD^/Commit_id file	 #1.将文件的历史版本拉到暂存区。
git checkout file				#2.从暂存区中将历史版本同步到文件区。
```

**:heart:理解reset命令：**
		当HEAD为当前最新提交时，是丢弃暂存区。指向历史提交，则是将历史版本放入暂存区中。可以体会一下Git体会一下GIt丢弃暂存区和存入暂存区的想法。指向最新提交***<u>丢弃</u>***暂存区是因为版本库当前就是最新提交，checkout/restore直接就可以恢复到最新版，不需要再放到暂存区。指向历史版本**<u>*存入*</u>**暂存区是因为，checkout/restore命令，首先恢复的是暂存区中的内容，就会直接恢复到指定历史版本，而不会恢复最新版本库中的提交了。





### 改写提交

```bash
git commit --amend			#覆盖上一次的提交内容和修改上一次提交描述。
```







### 删除分支同步远程

```bash
git branch -d <branchname>		#删除本地分支。
git branch -d -r <branchname>	#删除本地记录的远程分支。
git push origin:<branchname>	#将删除的分支同步到远程。
```



### 重命名分支

```bash
git branch -m <oldbranch> <newbranch>  #重命名分支
git branch -d -r <oldbranch>	#删除旧远程分支。
git push origin:<branchname>	#将删除旧分支同步到远程。
git push -u origin <newbranch>	#push本地新分支到远程服务器。
```



### 同步已删除的远程分支

```bash
git remote show origin		#查看分支的追踪情况。
git remote prune origin		 #同步已删除的远程分支。
git remote -D  <branchname>	 #删除本地多余分支。
```



### 解决冲突

当两个分支都在原修改基础上做过提交，合并时，对于修改同一个内容的地方会存在冲突。![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205101929.png)

```bash
git merge feature1
```

这个时候使用合并分支语句，Git无法判断，只能试图把各自的修改合并起来。**这时候就必须首先解决冲突。解决冲突后，再提交，合并完成。**Git用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容，`<<<<<<<`和`>>>>>>>`对应不同分支中的内容，`=======`表示间隔。


注意：参与和合成的feature分支内容不会被改变。合成后，可以删除。如果feature分支要继续使用合并后的内容，直接和现有的master分支合并就可以，这时候就不会有冲突，应为已经合并过了，直接指向的是master分支。



**Fast Forward 和 no fast foward**

翻译为中文是：
快速向前合并，和非快速向前合并。
合并分支时，如果可能，在非指定的情况下git会使用Fast Forward模式，这时候会将当前的修改ID和被合并的修改内容直接对应覆盖原修改内容，放弃了原分支的修改内容，会丢掉此次的修改信息。
如果使用no fast foward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
命令：

```bash
git merge --no-ff -m "merge with no-ff" dev
```

图文理解：
 no fast foward `--no-ff `模式：
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205102627.png)

Fast Forward 模式(默认)
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205103721.png)



### **分支策略**

> 在实际开发中，我们应该按照几个基本原则进行分支管理：
> 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
> 那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
> 你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
> 所以，团队合作的分支看起来就像这样：

![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205103800.png)



Feature分支当开发一个新功能时，创建Feature分支。但是当该功能不需要，也不需要再合并到主分支的时候，需要将其销毁。

销毁命令：

Feature还未修改时，小D还可以验证，Feature是否已经被合并。

```bash
git branch -d Feature
```

Feature已修改，但是还没有合并，使用大D，强制删除。

```bash
git branch -D Feature
```



### 处理紧急BUG，但是当前分支有修改还不能提交

场景：当需要放下手头现在正在开发的工作，现在的工作还没开发完成，无法提交。而要立马去从事其他开发工作，例如短时间的修复BUG，或者紧急功能开发。

1. 保存工作现场

   ```bash
   git stash
   ```

   保存对象：——>工作区的修改,和暂存区的修改与文件。 没有被Git管理的文件不会被保存。
   保存之后，当前工作区和暂存区所有的内容都被还原。

2. 当修复BUG完后，回到刚才的工作分支，需要还原之前保存的工作现场。

   查看保存的工作现场列表

   ```bash
   git stash list
   ```

3. 恢复工作现场

   ```bash
   git stash apply
   ```

4. 删除工作现场

   ```bash
   git stash drop
   ```

5. 恢复并删除工作现场

   ```bash
   git stash pop
   ```

6. 操作指定的工作现场

   ```bash
   git stash apply stash@{0}
   ```

   注意：当文件恢复时，如果修改的地方有冲突，那么会像合并分支一样，产生冲突文件。需要手工去解决冲突。



当修改BUG后，BUG分支已经合并到主分支，并且BUG分支已经删除。这时候想在其他分支上也修复此BUG，但是其他分支不能和主分支完全合并，只需要修改BUG的那个提交。
针对某次提交到当前分支。

```bash
git cherry-pick commitId
```

:heart:个人理解：针对某个单次提交进行的合并。merge实际上是针对所有的提交，多次的提交进行合并。合并的单操作和多操作的区别。



### 拉取fetch&pull

![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205204446.jpg)



> 可以简单的概括为：git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。而git pull 则是将远程主机的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。

git fetch 命令：

```bash
git fetch <远程主机名> 			#这个命令将某个远程主机的所有分支的更新全部取回本地。
```

如果只想取回特定分支的更新，可以指定分支名：

```bash
git fetch <远程主机名> <分支名> 	#注意之间有空格
```

最常见的命令如取回origin 主机的master 分支：

```bash
git fetch origin master
```

取回更新后，会返回一个FETCH_HEAD ，指的是某个branch在服务器上的最新状态，我们可以在本地通过它查看刚取回的更新信息：

```bash
git log -p FETCH_HEAD
```

![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205205342.png)

可以看到返回的信息包括更新的文件名，更新的作者和时间，以及更新的代码（19行红色[删除]和绿色[新增]部分）。我们可以通过这些信息来判断是否产生冲突，以确定是否将更新merge到当前分支。
前面提到，git pull 的过程可以理解为：

```bash
git fetch origin master #从远程主机的master分支拉取最新内容
git merge FETCH_HEAD #将拉取下来的最新内容合并到当前所在的分支中
git merge origin/master		#这样写应该也可以。拉个多个远程分支下来的时候。
```



git pull命令：

即将远程主机的某个分支的更新取回，并与本地指定的分支合并，完整格式可表示为：

```bash
git pull <远程主机名> <远程分支名>:<本地分支名>
```

如果远程分支是与当前分支合并，则冒号后面的部分可以省略：

```bash
git pull origin next
```

-`f` 参数，远程库强制覆盖本地版本。push 指令后也可以加入，强制提交覆盖远程版本。





### **Rebase**

整理历史提交记录为一条直线。
针对多人合作的单条分支上，单人的分支合并仍然会显示三角。

```bash
git rebase
```

会将GIt合并(远程与本地同分支)的三叉分支，整理为一条直线。但是这样也看不出来那几个分支做了合并。根据实际情况，需要再使用。
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205112559.png)

会将pull的版本提前，使其顺理成章的变成一条直线。
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205112644.png)

rebase操作可以把本地未push的分叉提交历史整理成直线；
rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。
缺点是本地的分叉提交已经被修改过了。相当于将pull放在commit顺序后，重新进行了按次序多次修改，重新生成了commitID，变成了本地的最后一次commitID。需要再重新pull一次。
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205155127.png)![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205155136.png)



### **忽略特殊文件：**

> 忽略某些文件时，需要编写.gitignore

> 在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。

> .gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！

> 在文本编辑器里“保存”或者“另存为”就可以把文件保存为.gitignore了。

> GitHub上已经成型的准备好的配置文件库，可在线浏览， https://github.com/github/gitignore

> 忽略文件的原则是：
>
> 1. 忽略操作系统自动生成的文件，比如缩略图等；
> 2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
> 3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

查看文件匹配到的忽略规则

```bash
git check-ignore -v db.ini
```

强制添加到Git,使其修改被跟踪，跳过忽略文件验证。

```bash
git add -f Desktop.ini
```

如果强制添加到Git的文件，就匹配不到规则了。



### **配置别名**

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

撤销暂存区提交

```bash
git config --global alias.unstage 'reset HEAD'
```

显示最后一次提交信息

```bash
git config --global alias.last 'log -1'
```

配置漂亮的log

```bash
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

:baby_chick:效果展示：
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205161652.png)



### 配置文件

1.每个仓库单独的Git配置文件都放在.git/config文件中

```bash
cat .git/config
```

2.当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中。也就是---global  时配置的会保存在这里面。
![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205162913.png)

删除别名时，修改这个配置文件，找到对应的行，删除即可。需要全部重新配置，删除配置文件，重新配置也可以。单独修改时，重新输入命令修改，覆盖原配置。



### **子模块共代码库的版本管理**

开发过程中，经常会有一些通用的部分希望抽取出来做成一个公共库来提供给别的工程来使用，而公共代码库的版本管理是个麻烦的事情。使用git的git submodule命令，问题迎刃而解了。

#### **添加**子模块

为当前工程添加submodule，命令如下：

```bash
git submodule add  仓库地址   路径
```

仓库地址是指子模块仓库地址，路径指将子模块放置在当前工程下的路径       注意：路径不能以 / 结尾（会造成修改不生效）、不能是现有工程已有的目录（不能順利 Clone）
命令执行完成，会在当前工程根路径下生成一个名为“.gitmodules”的文件，其中记录了子模块的信息。添加完成以后，再将子模块所在的文件夹添加到工程中即可，远程仓库中则会出现子模块@版本号的快捷方式。
![image-20210205165548895](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210205165548.png)



#### **查看子模块**

查看  `.gitmodules`



#### **下载子模块**

当使用git clone下来的工程中带有submodule时，初始的时候，submodule的内容并不会自动下载下来的，此时，只需执行如下命令：
方式1：

```bash
git submoudle init         #注：这个方法是根据.gitmodule的配置在.git的config配置中增加子模块配置。
git submoudle update   #注意：这个方法的意思是，更新到父工程中记录的子模块版本号，不会更新子模块版本库中最新的版本号。
```


方式2：

```bash
git submodule update --init --recursive
```

即可将子模块内容下载下来后工程才不会缺少相应的文件。

方式3：

```bash
#在克隆父工程时，直接使用递归命令
git clone 父工程地址 --recursive
```





#### ❤子模块切换主线分支

当子模块有多个分支时，根据实际的使用情况。cd到子模块目录中，切换主线分支。否则修改子模块会被记录到临时创建的分支上。

```bash
cd 'submodule'
git checkout master
```

全部统一切换：

```bash
git submodule foreach git checkout master
```



#### 更新子模块

**场景1：当父工程记录的子模块版本更新后，更新父工程中的子模块。**

```bash
git submodule update
```



**场景2：子模块更新，但是父工程记录的子模块未更新时，更新子模块操作。**

单个子模块更新：
    进入子模块中，调整主线分支，使用git操作pull。最终父工程再提交一次，记录子模块更新后的版本。

多个子模块跟新：

```bash
git submodule foreach git pull #拉取所有子模块，跳过父工程的版本号记录。
```

更新完成后，需要将父工程中新的子模块版本号，`commit +push`。



#### **删除**

经过网上的各个版本总结的一个有效方案：

1. 删除子模块文件和.git config的配置信息。

   ```bash
   git submodule deinit <submodule-name>
   ```

2. 删除子模块缓存：

   ```bash
   git rm --cached path_to_submodule
   #补充：参数-r  =递归
   git rm -r --cached .  #文件夹下的所有文件缓存删除。如果缓存删不干净用这个。
   ```

3. 删除子模块空文件夹

   ```bash
   rm -rf 子模块文件夹
   ```

4. 删除.git下的缓存模块。

   ```bash
   rm -rf .git/module/path_to_submodule
   ```

5. 删除.gitmodules中的配置信息，在全部清除的情况下或者整个文件都可以删除。

6. 前五部就将子模块删除干净了。如果需要重新添加子模块。`git submodule  add`新子模块即可。



### 自定义第三方库，同时保持第三方库的官方更新。

1. 自己有一个 fork 的三方项目。没有的话直接去第三方项目fork。

2. 克隆自己fork的第三方项目,或者添加到子模块的方式，将fork库添加到本地。

   ```bash
   git clone /   git submodule add  [address]  [path]
   ```

4. cd进入仓库，查看远程库信息。

```bash
    git remote -v
    ```

5. 自己fork的项目中，本地添加一个三方的源。

    ```bash
    git remote add dist_upstream  [第三方源地址]
    ```

6. 在自己fork的项目进行自定义改造并提交。如果是子模块则按照子模块的方式提交。

7. 当原第三方库有了更新后。需要将更新纳入自己的fork中时。
     方法1：
    pull拉取合并一个分支的方式.

    ```bash
    git pull dist_upstream master
    ```

    如果有冲突，解决冲突合并后,进行提交。

    ```bash
    git push origin master
    ```

     方法2：
    fetch拉取全部的分支，选择一个合并的分支,如果有冲突，解决冲突后，进行提交。

    ```bash
    git fetch dist_upstream
    git merge dist_upstream/master
    git push origin master
    ```



+++

## 知识整理

- 图片、视频、Word文件这些二进制文件，git无法跟踪变化，只能知道改动大小。


- 千万不要使用Windows自带的记事本编辑任何文本文件。
      原因是Microsoft开发记事本的团队使用了一个非常弱智的行为来保存UTF-8编码的文件，他们自作聪明地在每个文件开头添加了0xefbbbf（十六进制）的字符，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，都是由记事本的弱智行为带来的。使用EditPlus或者比较主流的编辑器。

- Git中存在指向本地支线的一个指针叫HEAD。


- HEAD与master
      一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点。
  ![Image](https://cdn.jsdelivr.net/gh/aner1001/picBed/blog/2021/02/04/20210204110129.png)



- id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。


- Git支持多种传输协议
      ssh协议: git@github.com:michaelliao/gitskills.git    -本地Git仓库和远程仓库之间的传输是通过SSH加密的。

  ​      https协议: https://github.com/michaelliao/gitskills.git

  ​	  区别：使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。SSH协议只认机器，HTTPS协议只认账号；也即为：		如果使用SSH操作远程仓库的话，我们需要使用公钥和私钥对来做权限的认证，如果使用HTTPS操作远程		仓库，则需要使用账号密码来做权限的认证。无论是公钥私钥对，还是账号密码，都只做权限的认证；



- 邮箱：
  1.关于git邮箱涉及到三处：   
         1）git config 时为仓库配置的提交者邮箱。$ git config --global user.email "email@example.com"
         2）git 生成秘钥时，所使用的的邮箱。        $ ssh-keygen -t rsa -C youremail@example.com
         3）git网站，账号所注册的邮箱。

  2.三个邮箱有没有直接关联和验证同步。
          测试结果：当git生成秘钥时所使用的邮箱和git网站所注册的邮箱不一致时，仍然可以进行操作网站中的git仓库。

  3.理解：
  		1 )git config 时为仓库配置的提交者邮箱，只为了远程仓库记录下这些操作是由谁来完成的。远程仓库里需要记录这些提交记录是由谁来完成的；所以我们需要给本地的git设置用户名和邮箱，用于从本地仓库向远程仓库提交记录时，在远程仓库记录下这些操作是由谁来完成的。

  ​		2 )生成秘钥的邮箱只为了，验证机器而存在。

  ​		3 ) git网站所注册的邮箱，就是注册时绑定的，可能用来找回密码，或者GIt上做了一些操作进行实时通知。



  4、官方解释：
          1）为什么要配置用户名和邮箱？
          因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址（名字和邮箱都不会进行验证），这样远程仓库才知道哪次提交是由谁完成的。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。

   		2）配置的用户名和邮箱对push代码到远程仓库有什么影响？
     	 首先，配置的用户名和邮箱对push代码到远程仓库时的身份验证没有作用，即不用他们进行身份验证；他们仅仅会出现在远程仓库的commits里。
      其次，按正常操作来说，你应该配置你的真实用户名和邮箱，这样一来在远程仓库的commits里可以看到哪个操作是你所为。
      最后，这个用户名和邮箱是可以随便配置的（不提倡），如果你配置的邮箱是github里真实存在的邮箱，则commits里显示的是这个邮箱对应的账号；如果配置的邮箱是一个在github里不存在的邮箱，则commits里显示的是你配置的用户名。



- Git的优秀之处：
   	1. 因为Git跟踪并管理的是修改，而非文件。
   	2. 分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！


- **下载：**如果下载太慢可以用镜像网站：https://npm.taobao.org/mirrors/git-for-windows/
