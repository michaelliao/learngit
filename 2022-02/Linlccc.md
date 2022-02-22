## Thank you very much for your git tutorial. Here are the learning notes of the tutorial


### 基础
~~~
查看当前目录路径
pwd

创建目录
mkdir <目录名>

删除文件
rm <文件名>

~~~
### Git

~~~
用git来管理当前目录
git init

将文件添加到仓库(其实是把文件提交的暂存区)
git add <文件名> [文件名]..

将文件从暂存区撤销
git restore --staged <文件名>

将文件提交到仓库
git commit -m "[说明]"

查看当前仓库状态
git status

查看修改的内容
git diff
指定文件和前两个版本做比较
git diff <head~2> <要比较的文件名>

查看所有命令日志
git reflog

回退到上一个版本
git reset --hard head^
head^ 表示上一个版本,等同于head~1
head^ = head~1
head^^^ = head~3

回到指定版本,commit id只用前几位就可以了
git reset --hard <commit id>

将文件回退到最近一次git commit或git add时的状态，也可以恢复被删除的文件
git restore <文件名>
~~~

### 远程仓储

~~~
查看远程库信息
git remote -v

将本地仓库和远程仓库建立连接（origin 连接名，可自定义）
git remote add <origin> <ssh>

删除远程库连接(origin 就是添加时的远程连接名称)
git remote rm <origin>

将远程仓库克隆到本地
git clone <ssh>

将远程分支克隆到本地
git switch -c <local branch name> <origin>/<remote branch name>

设置本地分支和远程分支的链接
git branch --set-upstream-to=<origin>/<remote branch name> <local branch name>

从远程仓库拉取最新
git pull

向远程推送分支的所有内容
git push -u origin <branch name>
向远程推送分支最新内容
git push origin <branch name>
~~~

### 分支

~~~
查看分支信息
git branch

创建分支
git branch <branch name>

删除分支
git branch -d <branch name>

切换分支
git switch <branch name>

创建并且切换到分支
git switch -c <branch name>
~~~

#### 合并

~~~
合并分支(如果<Fast forward>模式下合并分支，没有日志记录)
git merge <branch name>

合并分支，并保留分支合并记录（禁用<Fast forward>模式）
git merge --no-ff -m "[说明]" <branch name>

合并某一个提交
git cherry-pich <commit id>
~~~



### 储藏工作现场

~~~
建议不要有多个工作现场，还搞得不是很清楚。（以后有机会可以详细看一下）

将当前分支没用提交的修改隐藏起来（存档）
git stash

查看隐藏起来的工作列表
git stash list

恢复工作现场
git stash apply <stash name>

删除工作现场
git stash drop <stash name>

恢复并删除工作现场
git stash pop
~~~



### 标签（Tag）

~~~
查看所有标签
git tag

打一个标签
git tag <tag name> [commit id]

打标签时添加说明
git tag -a <tag name> -m "[说明]" <commit id>

删除本地标签
git tag -d <tag name>

查看标签信息
git show <tag name>

将标签推送到远程
git push origin <tag name>
一次性推送所有未推送的标签
git push origin --tags

删除已经推送到远程的标签
git push origin :refs/tags/<tag name>
~~~





### 日志

~~~
一行显示一个日志
	--pretty=oneline

显示多分支路线图
	--graph

简化commit id
	--abbrev-commit


查看日志
git log

美观的显示日志
git log --pretty=oneline

查看分支日志
git log --graph
git log --pretty=oneline --graph
git log --pretty=oneline --graph --abbrev-commit

将本地为push的分支提交历史整理成直线(可以将历史提交记录整理得更好理解)
git rebase
~~~

