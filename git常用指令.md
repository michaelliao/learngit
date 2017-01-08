##git简单笔记
* git是目前最先进的分布式版本控制系统（svn是集中式的）
* 安装好后用下面指令进行全局设置，即电脑上的所有仓库都使用这个配置。也可以对每个仓库进行本地配置。
```
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```
* `git init`在该路径下新建一个空的本地仓库（repository），会产生隐藏的.git目录，用于跟踪管理的版本库，可用`ls -ah`指令来查看所有目录
* 向仓库中添加文件有两步：1）`git add 文件名.格式`先将文件添加到暂存区（index，stage，缓存区都是一个意思）2）`git commit -m "提交说明"`文件将会从暂存区提交到本地仓库，可以多次add一次commit
* `git status`可以查看仓库当前的转态。`git diff 文件名`工作区和暂存区的比较。
* `git log`可以查看提交的日志，`git log --pretty=oneline`可以更直观的查看日志。`git reflog`可以查看所有的提交日志，我们可以看到所有的`commit_id`。
* `head`是指向当前版本的指针，版本的回退或前进伴随着指针的移动。
* 版本回退（或前进）可以使用`git reset --hard commit_id`,如果只是回退到上一个版本，`commit_id`位置可以使用`head^`，上上版本`head^^`以此类推，也可以使用`head~10`这种形式。
* 自己的目录就是工作区，隐藏的.git文件是版本库，里面有暂存区以及git为我们自动创建的第一个分支master，还有指向master的指针head。整个过程是将工作区的改动（包括新增）add到暂存区，然后commit到分支。
* `git diff --cached`可以比较暂存区和最新版本的不同。
* git跟踪管理的是**修改**而不是文件本身，加入对文件进行修改后add到暂存区，再次对文件进行修改，然后直接commit，那么第二次的修改并不会commit，因为暂存区存放的是修改而不是文件本身，如果是文件本身的话第二次对文件的修改应该也会提交。
* `git diff head -- 文件名`可以比较工作区和最新版本。
* `git checkout -- 文件名`放弃工作区的改动，和最后一次commit或add保持一致，即如果有添加到暂存区就和暂存区的保持一致，如果没有添加到暂存区就和最新版本（最后一次提交）保持一致。
* `git reset head 文件名`放弃暂存区对文件修改的存储，就是add的逆过程，工作区不会变化（只是单纯的直接撤销）。
* `git rm 文件名`删除文件（也是一次修改），`commit`之后就直接删除了，如果要放弃删除，首先撤销暂存区，然后回滚到最新版本
* 将本地仓库和github的远程仓库建立联系：先在github上新建一个空的仓库，`git remote add origin git@github.com:账户名/远程仓库名.git`这是ssh的形式，也可以是https的形式（每次推送都必须输入口令，并且速度慢），`git remote add origin https:github.com/账户名/远程仓库名.git`，origin是默认的这个远程仓库的名字，也可以改成其他的。然后把本地仓库的所有内容推送到指定的远程仓库。`git push -u origin master` `-u`在第一次推送时使用，后面可以不用加。`git pull origin master`可以从远处仓库中拉取资源。
* 在用户的主目录下新建ssh key可以避免不必要的麻烦。
* 从github上克隆一个项目：在本地指定目录下`git clone git@github.com:账户名/文件名.git`
* head具体来说不是指向最新版本，而是当前分支指向最新版本，head指向当前分支，这样就能确定对应的分支和最新版本。git创建分支很快，因为只要创建这个分支的指针（这个分支当然执行最新版本），然后head指向这个分支即可。
* `git branch`查看分支，`git branch 分支名`新建分支，`git checkout 分支名`切换到指定分支。`git checkout -b 分支名`新建分支并切换到该分支。`git branch -d 分支名`删除分支（如果有改动的话需要合并才可以删除）`git branch -D 分支名`可以强制删除分支 `git merge 分支名`合并某分支到当前分支。`git push origin :分支名`可以在本地删除远程仓库的分支。
* 其他分支合并到master分支的时候出现冲突，手动解决后add然后commit，这是其他的分支和master可能就不一样了，实际上合并后其他分支也就没有用处了可以直接删除，如果不想删除并且想和master保持一致可以在该分支上合并master分支并且以master分支为准。
* `git log --graph --pretty=oneline --abbrev-commit`可以直观的查看分支的合并情况。
* 如果可能的情况下分支合并会使用`fast forward`模式，即不产生新的commit，master直接指向了分支，可以使用`git merge --no-ff -m "提交记录" 分支名`，因为有新的commit所以要写提交记录
* `git stash`可以保护现场转而去做其他的事情，因为工作区和暂存区是公用的（个人理解），所以可以保护这个分支的现场以免被破坏。`git stash list`可以列出所有的现场，当然也因为公用的工作区和暂存区，现在可以恢复到任何的分支，可能忽悠冲突（会自动合并），还是恢复到自己的分支比较好`git stash apply 编号` `git stash drop 编号`这两条命令是先恢复后删除，可以用一条命令代替`git stash pop`
* 远程仓库和本地仓库是保持一致的，本地master分支对应远程master分支，其他分支也是如此。
* 从远程仓库上克隆的时候本地只有master分支，其他分支没有克隆过来，要将远程的其他分支创建到本地可以使用`git checkout -b 分支名 origin/分支名`就是后面多加了`origin/分支名
* 多人协作的时候如果本地分支和远程分支没有建立联系则用`git branch --track branch-name origin/branch-name`这个和上面的指令相似。
* 为版本添加标签`git tag 标签名 commit_id`没有`commit_id`就是给最新版本加标签。`git tag`可以查看所有的标签，`git show 标签名`详细查看指定的标签 `git tag -a 标签名 -m 说明 commit_id`可以加说明。`git tag -d 标签名`可以删除指定标签。`git push origin 标签名`可以推送指定的标签到远程仓库 `git push origin --tags`推送所有的标签到远程仓库，如果远程仓库的标签要删除首先要删除本地的标签，然后`git push origin :refs/tags/标签名`即可删除，`git push origin :标签名`也可以删除，和远程分支类似。
