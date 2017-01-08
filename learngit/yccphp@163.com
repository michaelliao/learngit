

	
git init 
	命令把这个目录变成git 可以管理的仓库

git add 文件名
	 把文件添加到仓库


git status 
	git 仓库的状态


git commit -m "add readme.text file”
	
	把文件提交到仓库
	
	-m 是本次的提交说明

git diff readme.txt
	
	查看文件修改内容

git log 
	查看版本提交记录

	--pretty=oneline 只显示版本号和提交注视


在 git 中，当前版本用 HEAD 表示，上一个版本是 HEAD^ ,上上个版本是 HEAD^^

往上 100 个版本就是 100 个 ^ ,难写，所以写成 HEAD~100


git reset --hard HEAD^
	
	回到上一个版本

git reset --hard eb7378897e8996f1e
	
	根据版本号回到此版本

git reflog
	
	查看每一次的版本id

git diff HEAD -- readme.txt 
	
	查看工作区与版本库里面的文件区别






git checkout -- readme.txt 
	
	把 readme.txt 文件在工作区的修改全部撤销

	1、如果文件修改后，还没有放到暂寸区，撤销后，和版本的一样
	2、如果文件已经放到暂存区，撤销户，回到暂存区的状态


git reset HEAD readme.txt 
	
	把暂存区的文件撤销掉，重新放回工作区
	

git rm test.php
	
	删除版本库里面的文件，需要再次 commit 





生成 ssh key 

	ssh-keygen -t rsa -C “youremail@example.com"

	一路默认

	/Users/yuanchao/.ssh  里面保存了生成的 key .pub 是公钥

 


添加远程仓库
	
	在 git 新建一个仓库

	把这个仓库与本地仓库关联
		git remote add origin git@github.com:yccphp/testgit.git （每个仓库不同）

	
	把我们本地仓库的所有内容推送到远程库
		git push -u origin master （第一次）

	以后每次提交
		git push origin master

	







从远程仓库克隆

	
	git clone git@github.com:yccphp/gitclonetest.git 

	不同的 git 不同的地址

	然后修改后，需要推送的话，还是使用推送命令 push


创建合并分支


 checkout -b   分支名
	
	-b 表示创建并且切换

git branch 分支名
	
	 创建一个分支


git checkout 分支名
	
	切换到某个分支

git branch
	
	查看当前分支



git merge dev
	
	合并指定分支 到当前分支上

git branch -d dev

	删除指定分支


git log --graph --pretty=oneline -—abbrev-commit 
	
	查看分支合并情况


git merge --no-ff -m "merge with on-ff" dev

	合并创建一个新的提交

	—no-ff 普通合并，合并后的历史有分支，能看的出来曾经做过合并




bug 分支

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交：



git stash

	将当前工作区储存起来，等恢复以后继续工作


git stash pop
	将存储起来的内容，恢复


强行删除分支
	git branch -D feature-vulcan

	如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。



git remote

	－v 显示更详细的信息

	查看远程分支的信息




标签



切换到需要打标签的分支上


git tag <name>

	打一个新的标签  <name> 标签名

git tag

	查看所有标签


git tag v789 7a7e436

	根据某个提交id ,打新的标签

git show v789
	查看标签信息


git tag -a dev1.0 -m “开发版"

	-a 标签名
	-m 说明


git tag -d <name>

	删除标签 <name> 标签名


git push origin v1.0

	推送标签到远程服务器


git push origin —tags
	
	推送本地所有未推送的标签


删除远程服务器上面的标签

1、先从本地删除
	
	git tag -d v789	
	
2、删除远程上的tag

	git push origin :refs/tags/v0.9


