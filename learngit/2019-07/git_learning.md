## 学习 Git

#### 1. 常用命令的使用场景

- 初始化一个 Git 仓库，使用 `git init` 命令。
- 添加文件到 Git 仓库，分两步：
  1. 使用命令 `git add <file>`，注意，可反复多次使用，添加多个文件；
  2. 使用命令 `git commit -m <message>`，完成。
- 要随时掌握工作区的状态，使用`git status`命令。
- 如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。
- `HEAD`指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。（HEAD ^：上个版本，HEAD ^^：上上个版本，HEAD~100：前 100 个版本）
- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。
-  Git 跟踪并管理的是修改，而非文件。每次修改，如果不用`git add`到暂存区，那就不会加入到`commit`中。
- `git reset -- files` 使用当前分支上的修改覆盖暂存区，用来撤销最后一次 `git add files`
- `git checkout -- files` 使用暂存区的修改覆盖工作目录，用来撤销本地修改
-  命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**。
- ![1562835756114](C:\Users\cynthia\AppData\Roaming\Typora\typora-user-images\1562835756114.png)

* 可以跳过暂存区域直接从分支中取出修改，或者直接提交修改到分支中。
  - `git commit -a `直接把所有文件的修改添加到暂存区然后执行提交
  - `git checkout HEAD -- files `取出最后一次修改，可以用来进行回滚操作

![1562847965491](C:\Users\cynthia\AppData\Roaming\Typora\typora-user-images\1562847965491.png)

* 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；

* 关联后，使用命令`git push -u origin master`第一次推送 master 分支的所有内容；

* 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

* 查看分支：`git branch`

* 创建分支：`git branch <name>`

* 切换分支：`git checkout <name>`

* 创建 + 切换分支：`git checkout -b <name>`

* 合并某分支到当前分支：`git merge <name>`

* 删除分支：`git branch -d <name>`

* 用`git log --graph` 命令可以看到分支合并图。

* 合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。

* 当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复 bug，修复后，再`git stash pop`，回到工作现场。

* 开发一个新 feature，最好新建一个分支；如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

* 查看远程库信息，使用`git remote -v`；

* 本地新建的分支如果不推送到远程，对其他人就是不可见的；

* 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；

* 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；

* 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；

* 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

* 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个 commit id；

* 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；

* 命令`git tag`可以查看所有标签。

  

  



#### 2. 名词解释

##### 2.1 工作区

新建一个仓库之后，当前目录就成为了工作区

##### 2.2 版本库

工作区下有一个隐藏目录 .git，它属于 Git 的版本库 History。

Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存区，还有 Git 为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

##### 2.3 



![1562832757309](C:\Users\cynthia\AppData\Roaming\Typora\typora-user-images\1562832757309.png)

#### 3. 分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如 1.0 版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布 1.0 版本；

你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`master`分支上合并就可以了。