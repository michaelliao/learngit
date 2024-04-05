

# 学习记录
Thanks a lot!
This is my summury for now. I will share it for all mates learing this course.

## 初始化git库
git init                初始化git库

## 提交文件
git add 文件地址 
git commit -m "修改说明"
git commit -a -m "修改说明 直接将工作区内容，跨过stage暂存区，提交到git库"

git status      查看工作区状态
git diff 文件名         查看对比差别

## 查看指令日志
git log  查看提交日志
git log --graph --pretty=oneline --abbrev-commit  // 图形化记录该分支上的提交日志
git reset --hard 日志编码    用于回溯版本
git reflog  查看git指令日志


## 库模型


## 撤销stupid操作
git checkout -- file   让这个文件回到最近一次git commit或git add时的状态。
git checkout -- file 命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。
场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。



# 远程仓库 - Github

## 添加github仓库关联
命令：git remote add <远端仓库的本地指代命： 如 origin> git@github.com:<github账户名：仓库名，如：michaelliao/learngit.git>

## 本地文件推送到仓库
git push -u origin master   第一次推送需要使用-u建立关联，后续直接 git push origin master

## 解除本地和远程的绑定关系

name 即是添加时的名称 <远端仓库的本地指代命： 如 origin>
git remote rm <name>
如果name不明确，可以  git remote -v  查看目前建立的链接名称。


## Git鼓励大量使用分支：
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>或者git switch <name>
创建+切换分支：git checkout -b <name>或者git switch -c <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>


## branch conflict
多分支合并时矛盾怎么办

方案：
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

git branch master   // 先切换到要被合并的分支
git merge dev1      // 合并某分支到当前分支
若出现矛盾，查看矛盾状态
git status          // 看到矛盾的文件和位置
需要手动权衡修改矛盾所在
git commit -a -m "conflict fixed: 如何解决"    // 将解决后的文件提交
git branch -d dev1  // 删除分支

合并分支保留原分支记录，而不是 ff 的方式
git merge --no-ff -m "merge with no-ff" dev


## 暂存工作区内容的方式
git stash       // 冻结保存工作区git 
git stash pop   // 恢复工作区（不保留备份）
git stash apply (stash名称 )  // 恢复工作区（保留备份）
git stash list  // 查看stash 名称

// 将其他分支上的某个点的修改（如 修复bug的操作）同样应用到本分支
git cherry-pick <log中的编码>（如 4c805e2）

## 抓取远程的内容
git clone git@github.com:michaelliao/learngit.git
默认只能抓取master分支的内容
如果要在dev分支上进行作业，主要抓取其他分支，需要
git checkout -b dev origin/dev
抓取远程分支以创建本地分支

修改好本地分支后，需要推送到远端dev分支，git push origin dev

如果推送到远端的时候，和其他小伙伴的推送冲突时，就会推送失败
解决：需要将远端的冲突分支下到本地，本地解决冲突后再上传

git branch --set-upstream-to=origin/dev dev  // 指定本地分支与远端分支的链接
git pull  // 必须先建立本地分支与远端分支的链接，才能直接使用这个命令，抓取远端分支
使用这个命令抓取，必然产生merge conflict
需要本地手动解决，再上传
git commit -a -m "fix env conflict"
git push origin dev


多人协作的工作模式通常是这样：
首先，可以试图用git push origin <branch-name>推送自己的修改；
如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
如果合并有冲突，则解决冲突，并在本地提交；
没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！
如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
这就是多人协作的工作模式，一旦熟悉了，就非常简单。


git rebase操作可以把本地未push的分叉提交历史整理成直线；


## 标签管理
标签本质上是一个指向commit的指针，用来方便取出关键性节点的提交，比如版本发布的commit

命令git tag <tagname>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
命令git tag -a <tagname> -m "blablabla..."可以指定标签信息；
命令git tag可以查看所有标签。

删除标签  git tag -d v0.1
git push origin v1.0        // 推送标签
git push origin --tags

删除远端信息：
git tag -d v0.9         // 先删除本地
git push origin :refs/tags/v0.9     // 再推送远端


# Github
在GitHub上，可以任意Fork开源仓库；
自己拥有Fork后的仓库的读写权限；
可以推送pull request给官方仓库来贡献代码。
