# Git 使用教程

## 创建仓库

```shell
# 创建仓库文件夹
$ mkdir learngit
# 进入仓库文件夹
$ cd learngit
# 初始化一个代码仓库
$ git init
# 使用命令git add <file>，注意，可反复多次使用，添加多个文件；
$ git add <file>
# 添加所有新文件到暂存区
$ git add --all
# 提交改动
$ git commit -m <message>
```



##  版本控制

- 要随时掌握工作区的状态，使用`git status`命令。
- 如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。

```shell
$ git status
----------------------------
E:\ScanMine>git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
----------------------------


# 文件有修改，但是没有add 和 commit,可以使用git diff 查看修改的地方
$ git diff 
-----------------------------
E:\ScanMine>git diff readme.txt
diff --git a/readme.txt b/readme.txt
index d8036c1..7b4104a 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed  version control system.
 Git is free software.
\ No newline at end of file
-------------------------------
```

提交修改

add 是 把工作区的更新到暂存区，commit是把缓冲区更新到仓库。

```shell
$ git add readme.txt
$ git commit -m "add distributed"
```



### 版本回退

- `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。

- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。

- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

```shell
# 输出提交日志
$ git log
# 简略输出提交日志
$ git log --pretty=oneline 
```



### 工作区和暂存区

add 是 把工作区的更新到暂存区，commit是把缓冲区更新到仓库。

git diff比较的是暂存区域快照与工作目录中当前文件之间的差异， 也就是修改之后还没有暂存起来的变化内容。

git diff --cached 比较的是暂存区域快照与分支中文件之间的差异，也就是暂存起来但是还没有提交的变化内容。

**如果git add之后，git status 虽然什么都不给我们显示（感觉暂存区没有东西了）， 但是此时暂存区是和分支一样子的，git diff 还是和暂存区作比较的，可以理解为暂存区有和分支一模一样的东西，但是不给我们显示。**

```shell
$ git diff   #是工作区(work dict)和暂存区(stage)的比较
$ git diff --cached   #是暂存区(stage)和分支(master)的比较
$ git diff HEAD   #是工作区(work dict)和分支(master)的比较
```



### 管理修改

每次修改，如果不用`git add`到暂存区，那就不会加入到`commit`中。

### 撤销修改

丢弃工作区文件修改，与暂存区保持一致

```shell
# 过时
$ git checkout -- <file>...
# 新指令
$ git restore <file>...
```

从暂存区撤销到工作区

```shell
# 过时
$ git reset HEAD <file>
# 新指令
$ git restore --staged <file>...
```

**小结**

原来的git checkout 可以使用 git restore 代替

原来的git reset HEAD 可以使用 git restore --staged 代替

最新版的git提示都已经更换成了restore

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git restore <file>...`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git restore --staged <file>`，就回到了场景1，第二步按场景1`git resore <file>`操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节`git reset --hard <commit_id>`，不过前提是没有推送到远程库。

### 删除文件

方法一：手动删除并提交到暂存区，然后commit

```shell
$ rm <file>
$ git add <file>
$ git commit -m "delete <file>"
```

方法二：git rm删除并提交到暂存区，然后commit

```shell
$ git rm <file>
$ git commit -m "delete <file>"
```

如果删错了

情况一：删除后没有提交到暂存区

```shell
$ git restore <file>
```

情况二：删除后提交到暂存区，没有提交到版本库

```shell
$ git restore --staged <file>
$ git restore <file>
```

情况三：删除后提交到版本库

```shell
$ git reset --hard <commit_id>
```



## 远程仓库

ssh-keygen 生成私钥和公钥，github.com上输入公钥，自己电脑保存私钥。

```shell
# 测试
$ ssh -T git@github.com
```



### 添加远程库

要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git`；

关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；

此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作.

### 从远程库克隆

1. 先有本地库，后有远程库，那么github.com新建空仓库，本地添加remote,然后push
2. 从零开发，最好是先github.com创建新仓库，然后从远程库克隆。

```shell
git clone git@github.com:ismyblue/gitlearning.git
```

Git支持多种协议，包括`https`，但`ssh`协议速度最快。

## 分支管理

1. master：主分支（主分支，合并release分支之后发布产品）
2. release：测试版分支（合并了develop分支之后进行测试，测试完成合并到master分支进行发布）
3. develop_ready：预测试分支（等待测试的分支，从release分支创建，合并最新的master分支代码。等待合并了多个团队的feature分支之后，再一起合并到release分支进行测试）
4. feature_teamname_xxx：新功能分支（团队新功能开发分支，从develop分支新建，几周后新功能开发完毕，合并到develop分支等待测试，然后删除）
5. priv_username_xxx：单人开发分支（每天上班前从feature新建分支，下班前合并到feature，然后删除)
6. bugfix_xxx：bug修复分支（用于修复release或master中出现的bug，直接从release或master中创建，修复后直接合并到release或者master，然后删除）

### 创建与合并分支

master、develop、release指针指向版本号，HEAD指向master、develop、release等指针

Git鼓励大量使用分支：

```shell
# 查看分支：
$ git branch
# 创建分支：
$ git branch <name>
# 切换分支：
$ git checkout <name>或者git switch <name>
# 创建+切换分支：
$ git checkout -b <name>或者git switch -c <name>
# 合并某分支到当前分支：
$ git merge <name>
# 删除分支：
$ git branch -d <name>
```

### 解决冲突

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

```shell
# 新建feature分支并切换
$ git switch -c feature
# to do sth ...
# 修改文件后，添加到暂存区
$ git add --all 
# 提交暂存区文件到feature分支
$ git commit -m "feature update"

# 切换到master分支
$ git switch master
# to do sth ...
# 修改文件后，添加到暂存区
$ git add --all 
# 提交暂存区文件到master分支
$ git commit -m "master update"

# 从master主分支合并feature分支
$ git merge feature
# 当两个分支修改了同一个文件时，会产生冲突conflict,必须解决完冲突后，master再次add、commit.
# 修改文件，解决冲突，to do sth...
# 添加文件到暂存区
$ git add --all
# 提交暂存区文件到master分支，修复完冲突conflict
$ git commit -m "conflict fixed"

# 查看分支合并情况
$ git log --graph --pretty=oneline --abbrev-commit

*   cf810e4 (HEAD -> master) conflict fixed
|\  
| * 14096d0 (feature1) AND simple
* | 5dc6824 & simple
|/  
* b17d20e branch test
* d46f35e (origin/master) remove test.txt
* b84166e add test.txt
* 519219b git tracks changes
* e43a48b understand how stage works
* 1094adb append GPL
* e475afc add distributed
* eaadf4e wrote a readme file

# 删除合并完成的分支feature
$ git branch -d feature
```



### 分支管理策略

分支合并禁用Fast Forward，保留分支信息

```shell
# 创建并切换分支
$ git switch -c dev
# 修改文件并保存到暂存区
$ git add --all
# 提交修改到dev分支
$ git commit -m "add merge"
# 切换master分支
$ git switch master
# 合并分支dev
$ git merge --no-ff -m "merge with no-ff" dev 
# 查看仓库日志
$ git log --graph --pretty=oneline --abbrev-commit
```

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。



### Bug分支

当在priv或者feature或者develop分支开发时，release或者master分支出现bug时，可以先暂时保存工作现场。

```shell
$ git stash
```

然后切换到release或者master分支，从release或者master新建bugfix分支，修复bug之后，在release和master上合并bugfix分支，删除bugfix分支。

```shell
# 切换到有bug的分支
$ git switch release
# 新建bugfix分支，用来修复bug
$ git switch -c bugfix-xxx
# 修改，添加到暂存区
$ git add --all
# commit bugfix
$ git commit -m "bugfix-xxx"
# 切换到有bug的分支
$ git switch release release
# 合并修复bug的分支(bugfix)
$ git merge bugfix-xxx
# 删除bugfix分支
$ git branch -d bugfix-xxx
```

修复完bug之后，恢复工作现场，继续工作。
```shell
# 回到之前工作的分支
$ git switch priv-username-xxx
# 恢复工作现场(法一)
$ git stash pop
# 恢复工作现场(法二)
$ git stash apply
$ git stash drop
```

另：

主分支(master、release)修复了bug之后，次分支要合并主分支，新增修复部分的代码。

```shell
# 切换到develop分支
$ git switch develop
# 合并主分支，增加master中修复bug部分的代码
$ git merge master
$ git merge release
```

主分支(master、release)上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，指定某一个具体的commit_id，把bug提交的修改“复制”到当前分支，避免重复劳动。



### Feature分支

master是稳定版本分支，一般不直接在上面修改。release是测试分支，一般只用来测试是否存在bug。develop是开发分支，用来合并开发各种新功能的分支，是预测试分支。而要开发新功能，就在develop分支上开新分支feature，在feature上开发完新功能，就直接合并到develop分支，然后删除feature。

```shell
# 强制删除某分支，丢弃一个没有被合并的分支
$ git branch -D feature-xxx
```



### 多人协作

一般通过远程仓库来进行多人协作。

```shell
# 查看远程仓库
$ git remote
$ git remote -v
# 推送代码
$ git push origin master
$ git push origin release
$ git push origin develop
# 拉取代码
$ git pull origin master
$ git pull origin release
$ git pull origin develop
```

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

### Rebase

在上一节我们看到了，多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。

每次合并再push后，分支变成了这样：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
* d1be385 (HEAD -> master, origin/master) init hello
*   e5e69f1 Merge branch 'dev'
|\  
| *   57c53ab (origin/dev, dev) fix env conflict
| |\  
| | * 7a5e5dd add env
| * | 7bd91f1 add new env
| |/  
* |   12a631b merged bug fix 101
|\ \  
| * | 4c805e2 fix bug 101
|/ /  
* |   e1e9c68 merge with no-ff
|\ \  
| |/  
| * f52c633 add merge
|/  
*   cf810e4 conflict fixed
```

Git有一种称为rebase的操作，有人把它翻译成“变基”，可以把分叉的提交变成直线。

在和远程分支同步后，我们对`hello.py`这个文件做了两次提交。用`git log`命令看看：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
* 582d922 (HEAD -> master) add author
* 8875536 add comment
* d1be385 (origin/master) init hello
*   e5e69f1 Merge branch 'dev'
|\  
| *   57c53ab (origin/dev, dev) fix env conflict
| |\  
| | * 7a5e5dd add env
| * | 7bd91f1 add new env
...
```

注意到Git用`(HEAD -> master)`和`(origin/master)`标识出当前分支的HEAD和远程origin的位置分别是`582d922 add author`和`d1be385 init hello`，本地分支比远程分支快两个提交。

现在我们尝试推送本地分支：

```shell
$ git push origin master
To github.com:michaelliao/learngit.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

很不幸，失败了，这说明有人先于我们推送了远程分支。按照经验，先pull一下：

```shell
$ git pull
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:michaelliao/learngit
   d1be385..f005ed4  master     -> origin/master
 * [new tag]         v1.0       -> v1.0
Auto-merging hello.py
Merge made by the 'recursive' strategy.
 hello.py | 1 +
 1 file changed, 1 insertion(+)
```

再用`git status`看看状态：

```shell
$ git status
On branch master
Your branch is ahead of 'origin/master' by 3 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

加上刚才合并的提交，现在我们本地分支比远程分支超前3个提交。

用`git log`看看：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
*   e0ea545 (HEAD -> master) Merge branch 'master' of github.com:michaelliao/learngit
|\  
| * f005ed4 (origin/master) set exit=1
* | 582d922 add author
* | 8875536 add comment
|/  
* d1be385 init hello
...
```

对强迫症童鞋来说，现在事情有点不对头，提交历史分叉了。如果现在把本地分支push到远程，历史记录有分叉

这个时候，rebase就派上了用场。我们输入命令`git rebase`试试：

```shell
$ git rebase
First, rewinding head to replay your work on top of it...
Applying: add comment
Using index info to reconstruct a base tree...
M	hello.py
Falling back to patching base and 3-way merge...
Auto-merging hello.py
Applying: add author
Using index info to reconstruct a base tree...
M	hello.py
Falling back to patching base and 3-way merge...
Auto-merging hello.py
```

输出了一大堆操作，到底是啥效果？再用`git log`看看：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
* 7e61ed4 (HEAD -> master) add author
* 3611cfe add comment
* f005ed4 (origin/master) set exit=1
* d1be385 init hello
...
```

原本分叉的提交现在变成一条直线了！Git把我们本地的提交“挪动”了位置，放到了`f005ed4 (origin/master) set exit=1`之后，这样，整个提交历史就成了一条直线。rebase操作前后，最终的提交内容是一致的，但是，我们本地的commit修改内容已经变化了，它们的修改不再基于`d1be385 init hello`，而是基于`f005ed4 (origin/master) set exit=1`，但最后的提交`7e61ed4`内容是一致的。

这就是rebase操作的特点：把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。

最后，通过push操作把本地分支推送到远程：

```shell
Mac:~/learngit michael$ git push origin master
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 576 bytes | 576.00 KiB/s, done.
Total 6 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 1 local object.
To github.com:michaelliao/learngit.git
   f005ed4..7e61ed4  master -> master
```

再用`git log`看看效果：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
* 7e61ed4 (HEAD -> master, origin/master) add author
* 3611cfe add comment
* f005ed4 set exit=1
* d1be385 init hello
...
```

远程分支的提交历史也是一条直线。

- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。



## 标签管理

发布一个版本时，为了方便查找和对话描述，通常在一个commit上打上标签tag，tag虽然是版本库的快照，但是实际上是指向某个commit的指针（tag不能移动），所以创建和删除标签都是瞬间完成的。

### 创建标签

标签总是打在commit上，如果多个分支都包含这个commit，那么这几个分支上都会有这个tag.

```shell
# 切换到要打标签的分支
$ git switch master
# 给要发布的版本打上标签，默认为HEAD
$ git tag v1.0
# 查询标签
$ git tag
# 给某一特定的commit_id打上标签
$ git tag -a v0.9 -m "周一发布版本v0.9" 98a6
# 查询某一标签详细信息
$ git show <tag_name>
```

- 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。

### 操作标签

```shell
# 删除本地标签
$ git tag -d <tagname>
# 推送标签到远程仓库
$ git push origin <tagname1> <tagname2>
# 或者
$ git push origin --tags

# 删除远程标签
# 1.先删除本地标签
$ git tag -d <tagname1>
# 2.再删除远程标签
$ git push origin :refs/tags/<tagname1>
```

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

## 使用GitHub

名词解释：

- master：其实就是你的本地(Local)项目（在你自己电脑里面）
- origin：是你GitHub上Fork的远程项目（托管在GitHub上项目，属于你自己的）
- upstream： 别人的开源项目，origin项目最开始就是从那fork过来的。（托管在GitHub上项目，属于别人的）

fetch 命令可以直接把开源项目代码抓到本地来再合并(merge)，push 命令是把本地代码推送到远程GitHub上自己的那个Fork项目中去。如果要把自己的代码合并到开源项目中去，就需要在GitHub中发起 Pull Request，再由开源项目负责人把你代码进行合并。

工作流程：

1. 先fork别人的仓库，然后本地git clone自己账号上的仓库(`git clone git@github.com:originauthor/gitlearning.git`)。
2. 配置上游项目地址(`git remote add upstream git@github.com:originauthor/gitlearning.git`)，获取最新源码(`git pull upstream master`)。
3. 在本地仓库新建一个分支`git switch -c feature1`，在此分支上进行修改代码提交`git commit -a -m “new commit”`。
4. 合并修改。

此时，可能会遇到一个问题，即远程的 upstream (originauthor/gitlearning) 有了新的更新，导致我们提交的 **Pull Request** 引起了冲突。因此，我们可以在提交前，先把远程其他开发者的`commit`和我们的`commit`合并。
```shell
# 切换到 master 分支：
$ git checkout master
# 再pull远程的最新代码：
$ git pull upstream master
# 切换回 branch1:
$ git checkout feature1
# 把 master 的 commit 合并到 feature1分支：
$ git rebase master
# 把更新代码提交到自己远程仓库的 feature1 分支中：
$ git push origin feature1
```

5. 发起pull request到官方仓库，请求作者合并自己的分支，贡献代码。

6. 合并开源项目最新代码到自己的Fork项目中

```shell
# 1、获取上游项目更新
git fetch upstream
# 2、合并到本地分支
git merge upstream/master
# 3、提交推送
git push origin master
```

## 使用Gitee

同github添加远程库，注意同时添加两个远程库的时候

```shell
# 添加远程库
$ git remote add github git@github.com:ismyblue/gitlearning.git
$ git remote add gitee git@gitee.com:ismyblue/gitlearning.git
# 查看远程库
$ git remote -v 
# 推送
$ git push github master
$ git push gitee master
```

