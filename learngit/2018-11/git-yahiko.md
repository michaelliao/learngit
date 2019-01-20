## git
	1. 命令
	• git diff   查看这次修改内容
	• git log    查看所有修改时间线
	• 当前版本为HEAD,上个版本为HEAD^,上上一个为HEAD^,前一百个为HEAD~100
	• git reset --hard HEAD^   回退到上个版本
	• git reset --hard 版本号（前几位就行了） 回退之后，返回到最新版本，命令行窗口没关。
	• git reflog   记录这每一次命令
	2. 原理
	• git add 把修改放到stage，
	• git commit  把修改提交到分支
	• git checkout --<file>把文件在工作区的修改全部撤销，也可以撤销误删除的文件。两种情况：
		○ file修改后还没有放到暂存区，撤销就回到版本库一样
		○ 已经添加到暂存区，再修改，撤销后回到添加到暂存区后的状态。
	• git reset HEAD <file>可以把暂存区的修改撤销掉。重新放回工作区
	• git remove <file> 从版本库中删除文件，需要提交   git commit
	3.分支
	• git branch 查看分支
	• git checkout -b dev  创建并切换
		○ git branch dev    新建dev分支，
		○ git checkout dev    切换到dev
	• git merge dev   融合分支到当前分支
	• git branch -d dev    删除dev分支
	• 编辑文件之后，add并commit
	• git log --graph    命令可以看到分支合并图
	• 合并时，会使用fast forward模式， （若没有冲突信息）此时删除分支后，会丢掉分支信息。使用--no-ff会保留分支信息
	• git stash  把当前工作储存起来。
	• git stash list 来查看储存内容
	• git stash apply  来恢复，恢复后，stash内容并不删除，
	• git stash pop  恢复并删除
	• git stash apply stash@{0}  指定的stash
	4.远程
	• git push origin dev    推送到远程dev分支
	• git branch --set-upsream-to=origin/dev dev   设置dev和远程origin/dev连接
	• git push origin <branch-name>推送
	• 如果失败，git pull来合并。
	• 如果冲突，解决冲突，本地提交。
	• 再远程提交。
	• 如果git pull提示no tracking information,则本地分支与远程分支连接没有创建， 用git branch --set-upstream-to <branch-name> origin/<branch-name>
	• 本地创建和远程分支对应的分支，git checkout -b branch-name origin/branch-name,本地和远程分支的名称最好一致
	• git rebase 把本地未push的分叉提交历史整理成直线， 使查看历史提交时更容易。只对尚未推送或分享给别人的本地修改执行变基操作清理历史
	5.标签
	• tag指向某个commit的指针。
	• 默认搭载最新提交的commit上，
	• git tag v1 f52c633  给某个commit打标签
	• git tag  查看标签
	• git show <tagname>  查看标签信息。
	• git tag -a v1 -m"version 1" 1094adb   创建带说明的标签
	• git tag -d v1   删除标签
	• git push origin <tagname>   推送标签到远程
	• git push origin --tags 推送所有本地标签到远程
		○ git tag -d v1
        • git push origin :refs/tags/<tagname>      删除远程标签
