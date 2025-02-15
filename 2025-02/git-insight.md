## git 常见命令

### 1 创建版本库

git init

### 2 添加到暂存区（stage）

git add file.name

### 3 提交暂存区 (git status查看状态)

git commit -m "注释"

### 4 版本回退(git log查看提交记录,git reflog记录了每一次命令)

git reset --hard HEAD^ (一个^表示回退到上一级)
OR
git reset --hard 1094a (回退到指定记录)

### 5 撤销修改

(5-1）没有存到暂存区
git checkout -- file.name
(5-2）存到了暂存区，但是没有提交
先git reset HEAD file.name，再 checkout

### 6 删除文件

git rm file.name --> git commit -m "remove file"
OR
rm file.name --> git rm/add file.name -->git commit -m ""
如果要撤销删除，git checkout -- file.name

如果已经提交，但反悔了，git reset --hard 指定记录 

### 7 远程仓库

1）添加远程库关联
git remote add origin "git@github.com:ChengqiP/Java_code2025.git"
2）提交到远程库
git push -u origin master

### 8 分支的创建和切换

1）查看分支
git branch
2）创建分支(如 name=dev)
git branch <name>
3）切换分支(如 name=dev)
git checkout <name>
OR
git switch <name>
4）创建+切换分支(如 name=dev)
git checkout -b <name>
OR
git switch -c <name>
5）合并某分支(如 name=dev)到当前分支(master)
git merge <name>
6）删除分支(如 name=dev)
git branch -d <name>

### 9  分支管理

1)冲突
git merge 后，Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容
手动更改文件，再提交

2)禁用Fast forward 模式（删除分支后，会丢掉分支信息）
$ git merge --no-ff -m "merge with no-ff" dev
Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

3)Bug分支
先用git stash保存一下工作现场，然后修复bug,然后再git stash pop回到工作现场;
为了让bug改动操作也合并到dev分支，可以用git cherry-pick <commit.name>复制操作

4）未合并Feature分支的删除
如果要丢弃一个没有被合并过的分支，git branch -D <name>强行删除

5）推送分支
git remote 显示远程名称为origin
git remote -v显示更详细的信息
git push origin master 把分支上的所有本地提交推送到远程库
OR 其他分支 git push origin dev
git pull 从远程库拉取信息，如果有冲突，则解决冲突，再提交
* git checkout -b dev origin/dev 在本地创建远程origin/dev分支到本地
* git branch --set-upstream-to=origin/dev dev 设置本地dev链接到远程库里的dev