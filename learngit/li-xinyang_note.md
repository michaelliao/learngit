---
BookTitle: Git-Tutorial
Author:lv
URL: http://lvwzhen.gitbooks.io/git-tutorial/
---

# Git-Tutorial

Git 为分布式版本控制系统（类似的有 Mercurial 和 Bazaar），它用于纪录文件修改详情。其他版本控制系统有 CVS（Concurrent Versions System）和 SVN （Apache Subversion） 均为集中式版本控制系统。集中式版本控制系统将版本库存放于中央服务器，需要联网且每次修改与提交均需要与服务器交换信息效率很低。分布式则使每一个使用者都拥有一个版本库（无中央服务器），这提高了效率和安全性。除此外 Git 还提供强大的分支管理。

**创建版本库**

`$ git init` 将当前目录建为管理仓库。`.git` 文件来跟踪版本库。版本控制只可跟踪文本文件的改动，但无法追踪二进制变化（可知文件大小改变）。不同语言尽量使用统一编码 UTF-8 来支持全平台。

**文件入仓**

首先将文件添加至仓库 `$ git add filename.txt` 然后将文件提交 `$ git commit -m "message"` （`-m` 为本次提交说明）。`commit` 可一次提交多个文件，所以可多次 `add` 不同文件，例如下面的例子。

```
$ git add file1.txt
$ git add file2.txt
$ git add file3.txt
$ git commit -m "add 3 files"
```

**修改文本**

`git status` 输出仓库当前状态。`git diff` 显示修改内容。

**版本回退**

`git log` 查看历史纪录，其可用 `--pretty=oneline` 修改显示方式。16进制数组为版本号（Commit ID）和 SVN 不同，Git 版本号为 SHA1 计算所得（用自动递加会造成版本号冲突）。Git 使用 `HEAD` 表示当前版本，上一个版本为 `HEAD^`，再上一个为 `HEAD^^`，之后的为 `HEAD~100`（以100为例）。下面的代码返回特定版本：

```
$ git reset --hard HEAD^
```

返回特点版本后，与其之后的所有提交均不会显示。只能使用版本号来进行之后版本的恢复操作，如下：

```
$ git reset --hard 3628164
```

Git 内部使用 `HEAD` 指针来选当前版本。且 Git 提供 `$ git reflog` 记录每一次的命令。

**工作区和暂存区**

工作区（Working Directory），版本库（Repository）中有暂存区（stage 或 index）还有第一个分支 master 以及指向它的指针 HEAD。将文件添加到版本库里分两步执行，第一步，将文件添加至暂存区，第二步，将暂存区文件提交至当前分支。既每次修改不添加暂存区将不会被添加至版本库。

**管理修改**

Git 跟踪并管理*修改*，并非文件。

**撤销修改**

`$ git checkout -- readme.md` 撤销全部 `readme.md` 在工作区的修改。这又分两种情况，第一种，文件并未存放至暂存区，撤销即返回和版本库相同状态。第二种，撤销返回至添加到暂存区时的状态。`--` 在此处极为重要，它在此区分撤销与创建新分支。用下面的代码将暂存区的文件回归至工作区：

```
$ git reset HEAD readme.md
# 放弃工作区修改
$ git checkout -- readme.md
```

若修改版本已从暂存区提交至版本库，只可用版本回退的方法进行撤销，如若推送至远程库则无法撤销。文件只可恢复至当前版本库的最新版本，最近提交后的修改将丢失。

**删除文件**

Git 中删除也属于修改操作。删除后的两种情况，第一种为确认删除用 `$ git rm test.txt` 将文件从工作区删除并将删除动作添加至暂存区。第二种为误删，可用 `$ git checkout -- test.txt` 恢复删除文件。

**远程仓库**

GitHub 提供 Git 仓库托管，本地 Git 仓库与 GitHub 仓库间的传输通过 SSH 加密。第一步创建 SSH Key。如在用户目录下无 `.ssh` 目录，使用下面的代码创建即可：

```
$ ssh-keygen -t rsa -C "youremail@example.com"
```

在文件夹内，`id_rsa` 为私钥（Private Key），`id_rsa.pub` 为公钥（Public Key）。第二步，在 GitHub 添加 SSH Key，只需将公钥中内容粘贴至 Key 文本框即可。需要添加 SSH Key 的原因是确认身份，如有若干电脑仅需把每台设备的公钥添加即可。

**添加远程库**

此时的 GitHub 仓库即可当备份也可支持多人协作。添加远程库，首先需在 GitHub 新建新库，创建后可从此仓库克隆新仓库也可使之与本地仓库相关联。关联本地仓库与远程仓库的方法：

```
$ git remote add origin git@github.com:username/repositoryname.git

$ git push -u origin master
```

由于远程仓库为空，使用 `-u` 可推送并关联本地 master 与远程 master。在此之后的远程提交均可用 `$ git push origin master` 来完成。

**克隆远程库**

`git clone` 在当前位置克隆一个本地库。当多人协作开发时，只需各自从远程服务器克隆即可。Git 支持多种协议，默认为 `git://`（速度最快）使用 SSH，但也可使用 https（速度慢且每次需要输入口令，适用于仅开放 https 端口的情况） 等其他协议。

**分支管理**

在 Git 中分支的创建、切换以及删除都可以快速完成（无文件数量无关，仅为指针改变）。每一次提交 Git 都会将其串联成时间线，主线称之为*主分支*即 master 分支而 HEAD 指向的为当前分支。使用 `$ git checkout -b branchname` 创建新分支，`-b` 表示创建并切换，等同于下面的代码：

```
# 创建分支
$ git branch dev
# 切换分支
$ git checkout dev
```

`git branch` 用于查看当前分支，当前分支用 `*`表示。创建分支后即可在其中进行操作。操作完成后即可切换分支 `$ git checkout master`, `$ git merge dev` 合并指定分支与当前分支(Fast-forward，直接把 master 指向 dev 分支)。合并后即可删除不必要分支 `$ git branch -d dev`，因为分支操作非常便捷与迅速，所以 Git 鼓励使用分支进行任务并在完成后合并删除分支。其效果与 master 分支上工作相同但过程更安全。

**解决冲突**

发生冲突后需手动解决再提交，`git status` 可以显示冲突文件。Git 用 `<<<<<<<`，`=======`，`>>>>>>>` 标记不同分支。使用带参数的 `git log` 也可查看分支合并情况：

```
$ git log --graph --pretty=oneline --abbrev-commit
# 查看分支合并图
$ git log --graph
```
**分支管理策略**

Git 在使用 Fast-forward 时因为改变指针（无合并痕迹），删除分支后会丢失分支信息。强制禁用 Fast-forward 模式，Git 会在 merge 时进行新的 commit 这样可将分支历史查看分支信息。

```
$ git merge --no-ff -m "merge with no-ff" dev
# no-ff 为禁用 Fast-forward
```

分支策略在开发时的几项原则，首先 master 分支最为稳定仅用于发布新版本，其次开发工作全部都应该在 dev 的分支上进行。

**Bug分支**

因为 Git 中分支的强大，修复 Bug 也可使用新建临时分支的方法，修复后在合并并删除临时分支。 Git 提供 `stash` 来存储当前工作现场。

```
# 查看以储存的工作区
$ git stash list
# 恢复且不删除 stash 内容
$ git stash apply
# 恢复指定 stash 内容（以0为例）
$ git stash apply stash@{0}
# 恢复并删除 stash 内容
$ git stash pop
```

**Feature分支**

使用 `$ git branch -D branchname` 删除未被 merge 的分支。开发新功能最好新建分支。

**多人协作**

Git 自动对应本地及远程 master 分支，远程仓库默认名为 origin。

```
# 查看远程仓库
$ git remote
# 远程仓库详细信息
$ git remote -v

# 推送分支会推送到相应分支
$ git push origin master
$ git push origin dev
```

master 为主分支需时刻于远程同步，dev 为团队工作分支也学时刻同步。

团队克隆（clone）默认只有 master 分支，如需其他分支则必须在本地创建远程 origin 的 dev 分支。

```
$ git checkout -b dev origin/dev
```

使用 `git pull` 抓取最新版本，解决冲突本地合并后再次推送。多人协作流程为，首先 `git push origin branch-name` 推送修改，若失败则表示远程分支比本地更新需 `git pull` 合并。如有冲突，解决冲突后本地提交再推送，如显示 "no tracking information" 则表示本地分支与远程分支未创建链接关系，使用 `git branch --set-upstream branch-name origin/branch-name` 来创建。

**标签管理**

标签为版本库快照，它为指向某个 commit 的指针（分支可移动，标签不可）。

创建标签可用 `git tag v1.0` 创建有说明的标签可用 `git tag -a v0.1 -m "version 1.0 release"`，查看可以 `git tag` 其顺序为字母顺序排列。为特点体检打标签可用 `git tag v1.1 6224937` 后跟 commit id 即可。查看标签信息可用 `git show v1.0` 可用查看文字说明。

删除标签可用 `git tag -d v0.1`。推送标签至远程 `git push origin v0.1` 或 `git push origin --tags` 推送全部本地标签。删除远程标签用如下代码：

```
# 先删除本地标签
$ git tag -d v0.0
# 删除远程标签
$ git push origin :refs/tags/v0.0
```

**忽略文件**

GitHub [提供](https://github.com/github/gitignore)忽略文件配置文件。

**配置别名**

```
$ git config --global alias.st status
# st 设置等同于 status 更多例子如下
$ git config --global alias.br branch
$ git config --global alias.co checkout

# 很酷 log 显示
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

**Git Cheatsheet**

[Download](https://dl.dropboxusercontent.com/u/1725146/00_InfoHosting/tower_cheatsheet_grey_EN.pdf)




















