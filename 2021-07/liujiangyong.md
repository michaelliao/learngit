创建版本库：`git init`把当前目录变成Git可以管理的仓库

查看文件内容：`cat [文件名]`

把文件添加到版本库（提交修改和提交新文件是一样的步骤）：

1. `git add [文件名]`把文件添加到仓库

2. `git commit -m "wrote a file"`把文件提交到仓库

   `commit`可以一次提交很多文件:

   ```bash
   $ git add file1.txt
   $ git add file2.txt file3.txt
   $ git commit -m "add 3 files."
   ```

查看仓库当前状态：`git status`

查看修改内容：`git diff [文件名]`

显示提交日志：`git log	[--pretty=oneline]`

显示历史命令：`git reflog`

版本回退： `git reset --hard HEAD~1`

- HEAD:当前版本；HEAD~n:前n个版本；HEAD^:前一个版本

- 回退到指定版本：`git reset --hard [commit_id]`

- 撤销前一次 commit：`git revert HEAD` 

- git revert 和 git reset的区别 ：git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。 

撤销修改：

- 丢弃工作区的修改：`git restore <file>`	or	`git checkout -- <file>`

- 把暂存区的修改撤销：`git restore --staged <file>`	or	`git reset HEAD <file>`

删除文件：在Git中，删除也是一个修改操作

- 在版本库中删除文件：`git rm <file>`	→	`git commit`

##### **远程仓库**

###### 创建GitHub仓库:

1、在用户主目录下创建SSH Key（本地Git仓库和GitHub仓库之间的传输是通过SSH加密的）

`$ ssh-keygen -t rsa -C "youremail@example.com"`

2、在GitHub上添加SSH Keys，使用`id_rsa.pub`

###### 关联一个远程库：

1、在GitHub上创建一个新的仓库

2、`$ git remote add origin https://github.com/Senor-Liu/learngit.git` or

 `$ git remote add origin git@github.com:Senor-Liu/learngit.git`

关联一个远程库时必须给远程库指定一个名字，`origin`是默认习惯命名；

3、`git push -u origin master`第一次推送master分支的所有内容

`git push origin master`推送最新修改

查看远程库信息：`git remote -v`

删除远程库：`$ git remote rm origin`	(这里只是删除了本地和远程库的绑定关系，要真正删除需要登录GitHub删除)

从远程库克隆：

`$ git clone git@github.com:Senor-Liu/gitskills.git`	or 

`$ git clone https://github.com/Senor-Liu/gitskills.git`

(Git支持多种协议，`git://`使用ssh，也可以使用`https`等其他协议;`https`除了速度慢以外，每次推送都必须输入口令，但是在某些只开放`http`端口的公司内部就无法使用`ssh`协议而只能用`https`。)

##### **分支管理：**

###### 创建与合并分支

- 查看分支：`git branch`

- 创建分支：`git branch <name>`

- 切换分支：`git switch <name>` or `git checkout <name>`

- 创建并切换分支：`git switch -c <name>` or `git checkout -b <name>`

- 合并某分支到当前分支：`git merge <name>`

- 删除分支：`git branch -d <name>`

  如果要删除没有合并的分支Git会提示使用-D才能删除分支，删除后不可恢复

###### 解决冲突

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

`git status` 可以查看冲突的文件。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

` git log --graph --pretty=oneline --abbrev-commit` 可以查看分支的合并情况。

###### 分支管理策略

合并分支时，如果可以，Git默认会用`Fast forward`模式，但这种模式下，删除分支后会丢失分支信息。如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样就能看到历史合并信息。

`git merge --no-ff -m "merge with no-ff" dev`使用--no-ff参数可以用普通模式合并。

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。

![git-br-policy](https://www.liaoxuefeng.com/files/attachments/919023260793600/0)

###### BUG分支

如果当前工作进行到一半，需要先修复一个bug，Git提供了一个stash功能，可以把当前工作“藏”起来，等以后恢复继续工作：`git stash`。

现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件）；这时就可以放心的切换到需要修复bug的分支，然后创建一个临时分支修复bug。

修复并合并完成后，切换到原来工作的分支：

- 用`git stash list`查看stash的工作现场

- 恢复工作现场：`git stash apply`恢复不删除stash内容 or `git stash pop`恢复并删除stash内容

- 但此时当前分支的bug并没有修复，需要把刚才debug的修改复制到当前分支，Git专门提供了`cherry-pick`命令，可以复制一个特定的提交到当前分支：`git cherry-pick <commit_id>`

  这时Git自动给当前分支做了一次提交，把修bug的过程重复一遍

##### 多人协作

###### 推送分支

`git push origin dev`

###### 抓取分支

当从远程库clone时，默认情况下只能看到本地的master分支；如果要在dev分支下开发，就必须创建远程origin的dev到本地：`git checkout -b dev origin/dev`

###### push失败

如果多人在同一分支下工作，如果远程的版本比本地的新，就会push失败，就先用`git pull`把最新的提交从`origin/dev`抓下来，然后在本地合并，如果有冲突解决冲突，再推送：

```bash
//指定本地dev分支与远程origin/dev分支的链接
git branch --set-upstream-to=origin/dev dev
//再pull
git pull
```

这时就可以在本地合并&解决冲突了，之后commit再push。

##### 标签管理

tag就是一个让人容易记住的有意义的名字，它其实就是指向某个commit的指针。

- 查看所有标签：`git tag`
- 查看标签信息：`git show <tagname>`
- 创建标签：`git tag <tagname>`，默认标签是打在最新提交的commit(HEAD)上的。
- 对指定的commit打标签：`git tag <tagname> <commit_id>`
- 创建带有说明的标签：`git tag -a <tagname> -m "explanation" <commit_id>`
- 删除标签：`git tag -d <tagname>`
- 把某个标签push到远程：`git push origin <tagname>`
- 一次性推送全部尚未推送到远程的本地标签：`git push origin --tags`
- 删除远程的标签：从本地删除 → `git push origin :refs/tags/<tagname>`
