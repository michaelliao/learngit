﻿#git命令

> - `git config --global user.name "Your Name"` => 改变全局name
> - `git config --global user.email "iwzyuan@163.com"` => 改变全局邮箱
> - `git add filepath`  => 将本地文件`添加`值暂存区
> - `git log`  => 仓库的上传版本信息
> - `git log --pretty=online`  => 单行显示仓库的上传版本信息
> - `git reset --hard HEAD^` => HEAD后面一个^代表往回穿梭一级
> - `git reset --hard HEAD~100` => HEAD后面的`~100`代表往前找100级
> - `git reset --hard 1eks2`  => 1eks2代表每一个版本的内存地址
> - `git reflog`  => 查看所有每一条版本命令
> - `git commit -m "instructions"` => 将暂存区文件`上传`至仓库
> - `git checkout -- filepath`  => 在没上传至暂存区的时候，同步仓库的版本，忽略本次修改
> - `git reset HEAD filepath` => 从暂存区脱离取消add模式
> - `vi filepath`  => 进入编辑文件模式，`i`:开始编辑,`esc + :wq`保存推出
> - `mkdir` => 创建一个文件夹
> - `cat filepath`  => 查看一个文件详情
> 
> 远程仓库：
> - `ssh-keygen -t rsa -C "your-email"` => 创建本地id_rsa和id_ras.pub文件，然后将.pub内容复制到githubSSL加密中，添加密匙
> 添加远程仓库有两个办法：
> 1.先创建本地项目与远程仓库进行链接

> - `$ git remote add origin git@github.com:iwzyuan/learngit.git` => 建立链接

> 2.现在github上创建项目，克隆仓库到本地

> - `$ git clone git@github.com:iwzyuan/gitskills.git` => 克隆成功后已经实现了与远程仓库的链接
> 

> - `git push origin master` => 向远程仓库名为origin的master分支上传文件
> - `git branch` | `git branch <name>` => 茶看分支 | 创建分支
> - `git checkout <name>` => 切换分支
> - `git checkout - b <name>` => 创建切换分支
> - `git merge <name>`  => 合并某分支到当前分支
> - `git branch -d <name>`  => 删除分支
> - `git branch -D <name>`  => 强行删除未合并的分支
> - `git merge --no-ff -m "merge width no--ff" dev` => 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并
> - `git stash`  =>  隐藏当前工作区域
> - `git stash list`  => 查看隐藏的stash内容
> - `git stash pop`  => 将隐藏区域删除并将内容复原(git stash apply：复原内容。git stash drop:删除stash空间)
> - `git remote -v`  => 产看远程库信息
> - `git push origin <brach-name>`  => 从本地推送分支
> - `git checkout -b <branch-name> origin/<branch-name>`  => 建立本地分支和远程分支的关联
> `git pull`  => 从远程抓取分支，如有冲突先处理冲突

> - `git tag <tagname>`  => 新建一个标签
> - `git tag -a <tagname> -m "des"`  => 可以置顶标签信息
> - `git tag`  => 可以查看所有标签
> - `git show <tagname>`  => 查看某一个标签的详情
> - `git push origin <tagname>`  => 可以往github上推送一个本地标签
> - `git push origin --tags`  => 可以推送全部未推送过的本地标签
> - `git tag -d <tagname>`  => 可以删除一个本地标签
> - `git push origin :refs/tags/<tagname>`  => 可以删除一个远程标签