##安装好git后，第一步配置：
	git config --global user.name = "lecion"
	git config --global user.email = "ylc931116@gmail.com"

#初始化一个Repository
	mkdir rep
	cd rep	
	git init

#add，commit
	git add ***
	git commit -m "***"

#log
	git log --pretty=oneline
	git log --graph --pretty=online --abbrev-commit
	git reflog

#回到历史版本
	git reset --hard HEAD^ //HEAD表示当前版本，HEAD^ 上一个版本 HEAD^^ 上两个版本 HEAD~100 前100个版本

#diff 查看差异
	git diff ***

#工作区（Working Directory）
>电脑里能看到的目录 （比如创建的learngit文件夹就是一个`工作区`）
#版本库（Repository）
>工作区有一个隐藏目录`.git`，这个不算工作区，而是Git版本库。Git的版本库里存了很多东西，最重要的称为`stage`的`暂存区`。git add 后的内容就是放在暂存区，直到被commit

#撤销修改
	git checkout -- *** //把***在工作区的修改全部撤销
*	没有git add，则恢复到和版本库一模一样
*	如果git add，则恢复到缓存区的状态

#撤销缓存区（unstage）
	git reset HEAD *** //把***的修改从缓存区移除

#删除文件
	rm test.txt
	git rm test.txt
	git commit -m "del test.txt"
>如果删错了，用git checkout -- test.txt 即可将版本库的test.txt恢复到工作区，无论是删除或是修改都可以采用此操作

#远程仓库
*	使用Git，创建SSH Key

		ssh-keygen -t rsa -C "ylc931116@gmail.com"
*	登陆Github， 打开Account Settings， "SSH Keys"页面，填入	id_rsa.pub里的内容
*	Github上创建Repository `learngit`
*	将本地现有仓库和git关联

		git remote add origin git@github.com:lecion/learngit.git
		git push -u origin master
	>因为是第一次提交，需要用`-u`，不但把本地master分支内容推送到远程新的master分支，还把本地的master分支和远程master分支关联起来，以后提交就可简化命令
*	如果以后本地做了修改，就可以通过以下命令提交

		git push orgin master

#最好的方式
>在远程建立一个Repository后，从远程clone
	
	git clone git@github.com:lecion/gitskills.git
#创建新分支
	git checkout -b dev
>`-b`表示创建并切换

	git branch dev
>此种方式也可以

#查看分支
	git branch
>会列出所有分支，在当前分支前以`*`标注

#切换分支
	git checkout master
#合并分支
	git merge dev
#删除分支
	git branch -d dev
	git branch -D dev
>`-D`强制删除没有合并的分支

#修复Bug
	git stash
>暂存当前工作区，处理完bug后，回到该分支

	git stash list
>查看暂存列表

	git stash pop
>弹出最近的stash
	
	git stash apply
	git stash drop
	git stash apply@{0}

#查看远程库
	git remote -v
>`-v`显示详细信息

#推送分支
	git push origin master
	git push origin dev
*	master分支是主分支，因此要时刻与远程同步；
*	dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同	步；
*	bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每	周到底修复了几个bug；
*	feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

#使用标签
	git tag v1.0
	git tag -a v0.9 -m "version 0.9 released" 234234
	git show v0.1
	git tag -d v1.0
	git push origin v1.0
	git push origin --tag
	git push origin:refs/tags/v1.0

