## 廖雪峰—Git

#### 创建版本库

1.创建空目录	mkdir cd pwd  
2.将目录变成Git可管理仓库	git init	ls -ah  

#### 文件添加版本库

1.文件添加到仓库	git add xxx  
2.文件提交到仓库	git commit -m "xxx"		git commit -a --allow-empty-message -m ""  

#### 更改文件与提交

1.更改文件  
2.查看更改	查看状态git status	对比git diff xxx  
3.提交更改	①git add xxx	看状态(将要提交的修改)git status	②提交git commit -m "xxx"	(看状态)  
看历史记录	git log		git log --pretty==oneline  

#### 版本回退

Head 当前版本	Head^上一版	 Head^^上上一版本	HEAD~100  
1.退回上一版本	git reset --hard HEAD^  
&ensp;&ensp;&ensp;&ensp; 查看版本库状态(历史提交版本)	git log --pretty=oneline	[已无最新的版本]  
&ensp;&ensp;&ensp;&ensp; 显示文档 cat xxx  
2.返回上一版(重返未来)		git reset --hard xxx(commit_id)		  
&ensp;&ensp;&ensp;&ensp; 若clear了看不到新id(查看命令历史)	git **reflog**  

#### 工作区和暂存区

工作区——	文件夹(电脑可看目录)  
版本库——	.git  
git add 文件由**工作区**添加到**暂存区**，即stage(index)；git commit将**暂存区**内容提交到**分支**(仓库)  
需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。  
对比：  
git diff xxx	比较的是**工作区**文件与**暂存区**文件的区别  
git diff --cached xxx	**暂存区**和HEAD(**仓库**)的不同  
git diff HEAD --xxx	查看**工作区**和**仓库**(版本库**最新版本**)的差异  
git checkout xxx	把**暂存区**最新版本转移到**工作区**(撤销工作区修改)		git add的反向命令  
git reset HEAD xxx	把**仓库**最新版本转移到**暂存区**	git commit反向命令  

Git跟踪修改：每次修改，如果不用git add到暂存区，那就不会加入到commit中。  

#### 撤销修改

1.丢弃**工作区**的修改	git checkout -- xxx  
&ensp;&ensp;&ensp;&ensp; 1.修改后还没有被放到暂存区，撤销回到和版本库一模一样的状态  
&ensp;&ensp;&ensp;&ensp; 2.已经添加到暂存区，撤销回到添加到**暂存区**后的状态  
即，让这个文件回到最近一次 git commit 或 git add 时的状态。  
2.丢弃**暂存区**的修改	  
&ensp;&ensp;&ensp;&ensp; 1.git reset HEAD xxx	(把暂存区的修改撤销(unstage)，重新放回**工作区**)  
&ensp;&ensp;&ensp;&ensp; 2.git checkout -- xxx 	丢弃工作区修改  
3.丢弃**版本库**的修改	即版本回退  

#### 删除文件

1.删除目标文件	手动 / rm命令  
&ensp;&ensp;&ensp;&ensp; 工作区和版本库不一致	通过git status可以查看哪些文件被删除  
2.两种情况：  
&ensp;&ensp;&ensp;&ensp; 1.从版本库中删除该文件	①git rm xxx	②git commit -m "xxx"  
&ensp;&ensp;&ensp;&ensp; 2.误删，需要恢复(到版本库最新版本)	git checkout -- xxx	[用版本库里的版本替换工作区的版本，不论工作区修改/删除，皆还原]  
&ensp;&ensp;&ensp;&ensp; 注：如果从版本库中删除了文件又想恢复，可以用版本回退。  

#### 远程仓库

1.通过SSH连接远程仓库		在主目录	ssh-keygen -t rsa -C "xxx@example.com"  
&ensp;&ensp;&ensp;&ensp; 有 id_rsa 和 id_rsa.pub 这两个文件  
2.登陆Github-SSH Keys		粘贴 id_rsa.pub 内容(公钥)  

###### 添加远程库

1.github-create a new repo-输入name，create。成功创建一个新的Git仓库(空的)。  
2.**关联远程库**	git remote add **origin** https://github.com/XiaochengYe/learngit.git  
3.本地库内容**推送**	git push -u origin master	(远程仓库不为空，不用-u)  
&ensp;&ensp;&ensp;&ensp; 1.若报错OpenSSL SSL_read: Connection was reset, errno 10054  
&ensp;&ensp;&ensp;&ensp; 解决方法：查询下面三个域名ip：github.com、github.global.ssl.fastly.net、codeload.Github.com。找到hosts文件，将上述三行（带ip）放在末尾，保存。https://blog.csdn.net/qq_29493173/article/details/113092656  
&ensp;&ensp;&ensp;&ensp; 也可以解除SSL验证	git config --global http.sslVerify "false"  
&ensp;&ensp;&ensp;&ensp; 2.若报错failed to push some refs to https://github.com/XiaochengYe/learngit.git  
&ensp;&ensp;&ensp;&ensp; 解决方法：新创建的那个仓库里面的README文件不在本地仓库目录中，这时可以同步内容。git pull --rebase origin master 再 push。  
&ensp;&ensp;&ensp;&ensp; 3。若验证连接ssh -T git@github.com提示输入	输入yes  
之后，只要本地做了提交。git push origin master	即可将本地master分支**最新修改**推送至Github。	  

###### 删除远程库

1.先用 git remote -v 查看远程库信息。  
2.根据名字删除	git remote rm xxx  
“删除”其实是**解除**了本地和远程的绑定关系，并不是物理上删除了远程库。  

###### 从远程库克隆

git clone git@github.com:michaelliao/gitskills.git 或 git clone https://github.com/XiaochengYe/gitskills  
(前者Git用ssh协议会更好)  

#### 分支管理

###### 创建与合并分支

![git-br-initial](./pic/0.png)  
1.**创建并切换**dev分支	git checkout -b dev  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 即：**创建分支**git branch dev； **切换分支**git checkout dev  
&ensp;&ensp;&ensp;&ensp; **查看当前分支**	git branch  
2.git add和commit修改  
3.分支工作完成切换回master分支  
&ensp;&ensp;&ensp;&ensp; 法一：git checkout master  
&ensp;&ensp;&ensp;&ensp; 法二：**创建并切换**到dev分支git switch -c dev		**切换**已有分支	git switch master[同1]  
4.将dev分支的工作成果**合并到当前**(master)分支	git merge dev  
5.**删除**dev分支	git branch -d dev  
&ensp;&ensp;&ensp;&ensp; git branch 查看，只有master  

###### 解决冲突

1.新分支	git switch -c feature1  
&ensp;&ensp;&ensp;&ensp; 修改readme.txt		在feature1分支上提交(add commit)  
2.切换 master		 git switch master  
&ensp;&ensp;&ensp;&ensp; 修改readme.txt		在master分支上提交(add commit)  
3.合并	git merge feature1  
&ensp;&ensp;&ensp;&ensp; 冲突！git status查看，cat xxx查看readme.txt的内容。  
&ensp;&ensp;&ensp;&ensp; 修改文件，再提交。(add commit)  
4.查看分支合并情况	**git log --graph** --pretty=oneline --abbrev-commit  
5.删除feature1分支	git branch -d feature1  
**小结**：当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。  

###### 分支管理策略

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。  

1.创建并切换dev分支	git switch -c dev  
2.修改readme.txt文件，提交。  
3.切换回master		git switch master  
4.合并dev分支	git merge --no-ff -m "merge with no-ff" dev		(禁用Fast forward)  
&ensp;&ensp;&ensp;&ensp; 本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。  
5.查看分支历史	git log --graph --pretty=oneline --abbrev-commit  
&ensp;&ensp;&ensp;&ensp; 不使用Fast forward模式。可以看到dev分支。  

###### bug分支

1.查看工作区		git status 	(有未提交内容)  
2.储藏工作现场	git stash  
&ensp;&ensp;&ensp;&ensp; git status，工作区干净状态。  
3.在master分支修复bug，创建临时分支。  
&ensp;&ensp;&ensp;&ensp; git checkout master  
&ensp;&ensp;&ensp;&ensp; git checkout -b issue-101  
&ensp;&ensp;&ensp;&ensp; 提交add、commit。  
4.修复完成，切回master，并完成合并，删除issue-101分支。  
&ensp;&ensp;&ensp;&ensp; git switch master  
&ensp;&ensp;&ensp;&ensp; git merge --no-ff -m "merged bug fix 101" issue-101  
&ensp;&ensp;&ensp;&ensp; git branch -d issue-101  
5.回dev干活。恢复工作区  
&ensp;&ensp;&ensp;&ensp; 1.git switch dev  
&ensp;&ensp;&ensp;&ensp; 2.git status查看，工作区是干净的。  
&ensp;&ensp;&ensp;&ensp; 3.git stash list查看列表，恢复。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1.git stash apply	stash内容并不删除		git stash drop删除  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 2.git stash pop	把stash内容也删  
**小结**：  
1.修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除。  
2.当手头工作没有完成时，先把工作现场 `git stash` 一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场。  
3.在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，把bug提交的修改“复制”到当前分支，避免重复劳动。  

###### Feature分支
开发一个新 feature，最好新建一个分支。  
如果要丢弃一个没有被合并过的分支，可以通过 git branch **-D** <name> 强行删除。  

###### 多人协作




















