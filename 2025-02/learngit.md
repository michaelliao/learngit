# 1.创建版本库

## 初始化版本库

1. 初始化一个Git仓库，使用`git init`命令。

2. 添加文件到Git仓库，分两步：
	- 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
	- 使用命令`git commit -m <message>`，完成。

# 2.时光机穿梭

- 要随时掌握工作区的状态，使用git status命令。

- 如果git status告诉你有文件被修改过，用git diff可以查看修改内容。
## 2.1 版本回退

- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`

- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。

- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

## 2.2 撤销修改

- 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`

- 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

- 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

## 2.3 删除文件

- 命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

# 3.远程仓库

- 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；

- 关联一个远程库时必须给远程库指定一个名字，origin是默认习惯命名；

- 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；

- 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

# 4.分支管理

## 4.1 创建与合并分支

- Git鼓励大量使用分支：

- 查看分支：`git branch`

- 创建分支：`git branch <name>`

- 切换分支：`git checkout <name>或者git switch <name>`

- 创建+切换分支：`git checkout -b <name>或者git switch -c <name>`

- 合并某分支到当前分支：`git merge <name>`

- 删除分支：`git branch -d <name>`

## 4.2 解决冲突
- 用`git log --graph`命令可以看到分支合并图。

## 4.3 分支管理策略
- Git分支十分强大，在团队开发中应该充分应用。

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。

## 4.4 Bug分支

- 修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

- 当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场；

- 在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

## 4.5 Feature分支

- 开发一个新功能，最好新建一个分支；

- 如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

## 4.6 多人协作

- 查看远程库信息，使用`git remote -v`；

- 本地新建的分支如果不推送到远程，对其他人就是不可见的；

- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；

- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；

- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；

- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

# 5. 标签管理

## 5.1 创建标签

- 命令`git tag <tagname>`用于新建一个标签，默认为HEAD，也可以指定一个commit id；

- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；

- 命令`git tag`可以查看所有标签。

## 5.2 操作标签

- 命令`git push origin <tagname>`可以推送一个本地标签；

- 命令`git push origin --tags`可以推送全部未推送过的本地标签；

- 命令`git tag -d <tagname>`可以删除一个本地标签；

- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。