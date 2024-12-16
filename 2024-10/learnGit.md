## 创建版本库
使用`git init`创建版本库，在创建版本库后需要至少一次的提交对版本库进行初始化。
+ 初始化前
```
root@localhost:~/useGit# git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```
+ 初始化后
```
root@localhost:~/useGit# git status
On branch master
nothing to commit, working tree clean
```
## 添加/修改文件
当在工作区修改或添加某个文件后，使用`git add <file>`添加修改记录至暂存区。
```
root@localhost:~/useGit# git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   helloworld

no changes added to commit (use "git add" and/or "git commit -a")
```
```
root@localhost:~/useGit# git add <file>
root@localhost:~/useGit# git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   helloworld
```
在已修改未添加的时候，使用`git restore <file>`撤销在工作区的修改，使用`git checkout -- <file>`恢复至和版本库一样的状态。
在已添加未提交的时候，使用`git restore --staged <file>`或`git reset HEAD <file>`撤销该文件的添加，使用`git checkout -- <file>`撤销修改回到添加至暂存区后的状态（可能添加后又作了修改）。
在已提交的时候，使用`git reset HEAD^`回到上一次的提交状态。
>`git reset <attribute> HEAD^`
> --hard：回退到上个版本的已提交状态
> --soft：回退到上个版本的未提交状态
> --mixed：回退到上个版本的已添加但未提交状态
> 如果不加属性，则虽然提交历史回退，但工作区文件状态并未回退。
> `git reflog`查询每一次的git命令，可用于确定所有命令的提交状态标签，方便版本回退后返回最新版本。
## 删除文件
当在工作区删除某个文件后，使用`git add/rm <file>`添加删除记录至暂存区。
```
root@localhost:~/useGit# git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    helloworld

no changes added to commit (use "git add" and/or "git commit -a")
```
```
root@localhost:~/useGit# git rm helloworld
rm 'helloworld'
root@localhost:~/useGit# git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    helloworld
```
对一个已经被跟踪且工作区存在也没被修改的文件，执行`git rm <file>`时会做两件事，一是从工作区删除文件，二是将删除记录添加到暂存区。
如果对一个从未被跟踪的文件（从未被添加到版本库）使用，会提示这个文件没有被跟踪，并且不会执行删除操作。
```
root@localhost:~/useGit# git rm demo
fatal: pathspec 'demo' did not match any files
```
如果对一个已经被跟踪但当前工作区不存在的文件使用，会将删除记录添加到暂存区。
如果对一个已经被跟踪且在当前工作区作了修改的文件使用，会出错。
```
root@localhost:~/useGit# git rm helloworld
error: the following file has local modifications:
    helloworld
(use --cached to keep the file, or -f to force removal)
```
使用了`git rm <file>`后，只能恢复到版本库已有的最新状态，会丢失最近一次提交后修改的内容。
对于删除文件的还原操作，和添加/修改是一致的。
> 对于`git add .`会将工作区所有做了添加/修改/删除的文件添加到暂存区。
> 同样对应过来，有`git rm -rf .`。
## 远程仓库
使用`git remote add origin git@github.com:xxx/xx.git`关联远程仓库。
使用`git remote -v`查看远程库信息。
使用`git remote rm origin`解除本地和远程仓库的绑定关系。
## 分支管理
创建、切换分支
```
git branch dev
git checkout dev # (git switch dev)
# ==
git checkout -b dev # (git switch -c dev)
```
查看当前分支
```
git branch
```
合并分支
```
# 在需要合并（如master）的分支下
git merge <branch-name>
```
删除分支
```
# 不在需要删除的分支下
git branch -d <branch-name>
```
查看分支合并情况
```
git log --graph --pretty=oneline --abbrev-commit
```
`Fast forward`模式下删除分支会丢掉分支信息，使用`--no-ff`参数需要手动创建多一个commit，所以需要加上提交信息
```
git merge --no-ff -m "<message>" dev
```
> 在实际开发中，分支管理的基本原则如下：
> 1. master分支应该非常稳定，仅用于发布新版本，平常不能在上面随意修改
> 2. 在dev分支上干活，再从dev分支上分出每个人独立的分支，每个人合并至dev，最后测试稳定后发布版本再将dev合并至master
> 3. 一般、尽量使用--no-ff的形式，合并更清晰，不丢失分支合并的信息

**创建文件会检测到工作区有修改，创建文件夹不会。**
## 修复BUG
在需要修复的分支上创建一个新的临时分支来修复BUG
对于已被版本库追踪的文件（即非创建文件），当所处分支和欲切换分支不指向同一个提交状态时（指向同一个提交状态一般出现在创建新分支时，而且此情况下切换也会同步未提交的信息，算是当前分支的完全克隆），修改过未提交会导致无法切换，报如下错误：
```
error: Your local changes to the following files would be overwritten by checkout:
        helloworld
Please commit your changes or stash them before you switch branches.
Aborting
```
使用`git stash`可以存储当前的工作现场，使得工作树干净（未被版本库跟踪的文件除外）
使用`git stash list`查看工作现场
恢复工作现场有两种方式：可以指定恢复哪个工作现场
```
git stash apply
git stash drop
# ==
git stash pop
```
使用`cherry-pick`命令，复制一个特定的提交到当前分支（会将对应的修改合并进来）
使用`git branch -D <branch-name>`强行删除一个未合并的分支
## 多人协作
使用`git branch`查看本地分支，`git branch -r`查看远程分支，`git branch -a`查看所有分支。使用`git remote -v`查看远程库的信息，可以查看是否有拉取和推送的权限。
`git clone`下来后只能看到master本地分支，使用`git checkout -b <branch-name> origin/<branch-name>`创建一个和远程某个分支关联的本地分支，会获取到对应分支的所有提交历史。
使用`git push -u origin <branch-name>`可以设置本地和远程分支的跟踪关系，之后的推送、拉取和合并可以简化成`git push`、`git pull`和`git merge`；也可以使用`git branch --set-upstream-to=origin/<branch-name> <branch-name>`/`git branch --set-upstream <branch-name> origin/<branch-name>`来设置。
`git fetch`会拉取远程的最新状态。远程比本地分支提交历史更多时但未拉取，使用`git status`不会提示落后远程分支；远程比本地分支提交历史更少时但未推送，使用`git status`会提示超前于远程分支。
`git pull`相当于`git fetch` + `git merge`，拉取最新状态并尝试合并。本地存在多个分支时第一次使用`git pull`会提示需要配置合并的模式，有`rebase false`、`fastForward only`等。

> rebase：变基
> 将存在冲突（需要手动解决再提交或者是生成一个合并提交信息[类--no-ff]）合并的分支修改塞进分支创建出来时已有的最后一个提交历史后，相当于模拟在另外分支所做的工作是在当前分支完成的，再在这些工作基础上做本来存在于当前分支的工作，并将合并提交信息删除，最新的提交指向当前分支的最新工作提交。
> *  xxxxxx (HEAD -> dev) merge temp to dev
> |  \\
> |  *  xxxxxx (temp) work in temp
> *  |  xxxxxx latest work in dev
> |  /
> *  xxxxxx before of create new branch
> 
>======== `git rebase` ==>
>
> *  xxxxxx (HEAD -> dev) latest work in dev
> *  xxxxxx (temp) work in temp
> *  xxxxxx before of create new branch


理想状态是每个仓库的提交历史都保持一致，所以当远程与本地不一致时，需要先拉取并合并远程的修改，才能将本地分支进行提交。如果在合并过程中存在冲突，需要手动解决冲突后再在本地提交一次，相当于手动合并。

