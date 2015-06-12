##Git 初步
初始化一个Git仓库，使用`git init`命令。

添加文件到Git仓库，分两步：

1. 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
2. 使用命令`git commit`，完成。
通常使用 `git commit -m "something to comment"`
3.  注意，每次commit前都先要`add commit`,如果在commit前没有add，那么只会commit到之前add时候的内容

##Git查看
* 要随时掌握工作区的状态，使用`git status`命令。
* 如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。
* 使用`git log`来查看git commit记录 
* 也可以使用`git log --pretty=oneline` 一行显示

##版本回退
HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令：

* `git reset --hard commit_id` 回退到id的版本
* `git reset --hard HEAD^` 	 回退一个版本
* `git reset --hard HEAD^^`   回退两个版本
* `git reset --hard HEAD~100` 回退一百个版本

穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

##工作区与暂存区
`git add`命令实际上就是把要提交的所有修改放到暂存区（Stage）

![git add](/Users/Des/Documents/Coding/notes/image/git add.jpeg)
`git commit`就可以一次性把暂存区的所有修改提交到分支。

![git commit](/Users/Des/Documents/Coding/notes/image/git commit.jpeg)

##撤销修改 撤销删除
删除文件 使用 rm file，但是如果想要版本库也删除的话 需要使用 `git rm file`

1. 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。 git checkout其实是用版本库里的版本替换工作区的版本，如果在无论工作区是修改还是删除，比如不小心删掉文件了，使用`git checkout --file`都可以“一键还原”，将这个工作区的文件用版本库里边的恢复。

2. 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，即已经进行了`add`操作，想丢弃修改，分两步，第一步用命令`git reset HEAD file`，就回到了场景1，第二步按场景1操作。

3. 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

##远程连接
####从本地拷贝到远程库
cd到要拷贝的git的文件夹

1. 要关联一个远程库，使用命令 `git remote add origin git@server-name:path/repo-name.git`； 
2. 比如 `git remote add origin git@github.com:rwang23/xx.git`

2. 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容,如果不是master分支，换名字就可以；

3. 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！

####从远程库克隆到本地
进入要克隆到的文件夹，
`git clone git@github.com:michaelliao/gitskills.git`
Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

##分支管理
Git鼓励大量使用分支：

* 查看分支：`git branch`
* 创建分支：`git branch <name>`
* 切换分支：`git checkout <name>`
* 创建+切换分支：`git checkout -b <name>`
* 合并某分支到当前分支：`git merge <name>`
* 删除分支：`git branch -d <name>`
* 开发一个新feature，最好新建一个分支；如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

合并分支的时候如果出现冲突，那么将会出现冲突提醒
并在当前分支上出现：

	<<<<<<< HEAD
	Creating a new branch is quick & simple.
	=======
	Creating a new branch is quick AND simple.
	>>>>>>> feature1
修改好后再次提交就可以了
同时 可以使用 git log 或者git log --graph指令来查看分支与分支合并情况

通常情况下使用合并分支Git会自动使用`Fast forward`模式，但是这种情况下删除分支后，会丢失分支信息，
这个时候我们可以使用--no-ff方式下的`git merge`，它会提交一个新的commit 
`git merge --no-ff -m "merge with no-ff" dev`


###分支策略

* master分支应该是非常稳定的，也就是仅用来发布新版本的
* 一般干活都在dev分支上的，一般来说dev分支是不稳定的，比如到了某个时候才合并到master上边，在master上边发布新版本
![git branch merge](/Users/Des/Documents/Coding/notes/image/git branch&merge.png

####Bug出现的修复

* 当正在新的branch进行工作时，想要修复原来的branch比如master的bug，这个时候就想切换到master。

* 但是此时由于branch还没完成不能提交，所以我们可以使用`git stash`来储存当前工作现场

* 然后就可以切换到要修改Bug的branch然后创建bug新分支再用原分支合并，再切换到刚才的新brach工作

如何储存工作现场？

1. 使用`git stash`来储存当前工作现场

2. 可以使用`git stash list`来查看当前工作现场

3. 工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

* 一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

* 另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：

##多人协作
查看远程库信息，使用git remote -v；

多人协作的工作模式通常是这样：

1. 首先，可以试图用git push origin branch-name推送自己的修改；

2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

3. 如果合并有冲突，则解决冲突，并在本地提交；

4. 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！

5. 如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

##标签管理

###创建标签
* 命令git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
* git tag commit_id 在该commit_id上打上标签 
* git tag -a <tagname> -m "blablabla..." commit_id可以指定标签信息；
* git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
* 命令git tag可以查看所有标签。

###修改标签
因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

* 命令`git push origin tagname`可以推送一个本地标签；
* 命令`git push origin --tags`可以推送全部未推送过的本地标签；
* 命令`git tag -d tagname`可以删除一个本地标签；
* 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。