常用git命令
    git config --global user.name "your name"
    git config --global user.email "email@example.com"

    mkdir learngit
    cd learngit
    pwd

    git init

    ls -ah

    git add readme.txt
    git commit -m "message"

    git status
    git diff

    git log
    git diff --pretty=oneline

    git reset --hard HEAD^
    git reset --hard HEAD~n

    git reflog


    git diff HEAD -- filename.txt

> 撤销修改
1. 撤销工作区的修改
    - git checkout -- filename.txt
       注释：-- 很重要，没有--，就变成了“切换到另一个分支”的命令了
    - git restore --worktree filename.txt
2. 把暂存区的修改退回到工作区
    - git reset HEAD filename.txt 把暂存区的修改退回到工作区
    - git restore --staged filename.txt
3. 把版本库退回一个版本
    - git reset --hard HEAD^
4. 同时恢复暂存区和工作区
    - git restore --source=HEAD --staged --worktree filename.txt

> 远程仓库
1. 添加远程仓库
    - ssh-keygen -t rsa -C "youremail.@example.com" 创建SSH Key
    - git remote add origin https://gitee.com/renel/learngit.git
2. 从远程仓库克隆
> 切换分支
- git checkout branchName
- git switch branchName

> 删除文件
- 


## 分支管理
1. 创建于合并分支
    - 查看分支：git branch
    - 创建分支：git branch <name>
    - 切换分支：git checkout <name> / git switch <name>
    - 创建+切换分支：git checkout -b <name> / git switch -c <name>
    - 合并某分支到当前分支：git merge <name>
    - 删除分支：git branch -d <name>

2. 解决冲突
    - git log --graph --pretty=oneline --abbrev-commit 用带参数的 git log 查看分支合并情况
    - git branch -d <name> 删除分支

3. 分支管理策略
    - git merge --no-ff -m 'commit message' dev
        --no-ff 参数，表示禁用 Fast forward，用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而 fast forward 合并就看不出来曾经做过合并
        本次合并要创建一个新的 commit

4. Bug 分支
    - git stash
    - git stash list
    - git stash pop 恢复的同时，也删除内容
    - git stash apply 恢复，但是恢复后，stash 内容并不删除
    - git cherry-pick <id> 复制一个特定的提交到当前分支

5. Feature 分支
    - git branch -D <name> 强行删除一个没有被合并过的分支

6. 多人协作
    - git remote 查看远程库的信息
    - git remote -v 显示更详细的信息
    - git push origin master 把本地的 master 分支推送到远程分支上
    - git push origin dev 把本地的 dev 分支推送到远程分支上
    - git clone git@github.com:profile/project.git
    - git checkout -b dev origin/dev
    - git push origin dev
    - git pull
    - git branch --set-upstream=origin/dev dev
    - git push origin <branch-name>
    - git pull 提示 no tracking information 说明本地分支和远程分支的连接关系没有创建，用命令 git branch --set-upstream-to <branch-name> origin/<branch-name>
    - 小结
        - 查看远程信息：git remote -v
        - 从本地推送分支：git push origin <branch-name>，推送失败，先用 git pull 抓取远程分支的新提交
        - 在本地创建和远程分支对应的分支：git checkout -b <branch-name> origin/<branch-name>，本地和远程分支的名称最好一致
        - 建立本地分支和远程分支的关联：git branch --set-upstream <branch-name> origin/<branch-name>
        - 从远程抓取分支：git pull，有冲突要先处理冲突

7. Rebase
    - rebase 操作可以把本地未 push 的分叉提交历史整理成直线
    - rebase 的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

## 标签管理
    - git tag <name> 打标签，默认标签是打在最新提交的 commit 上
    - git tag 查看所有标签
    - git tag <name> <commit-id>
    - git show <tagname> 查看标签信息
    - git tag -a <tagname> -m 'tag description' <commit-id>
    - git tag -d <tabname> 删除标签
    - git push origin <tagname> 推送标签到远程
    - git push origin --tags 一次性推送全部尚未推送到远程的本地标签
    - 要删除远程标签麻烦一点，先从本地删除
        git tag -d <tagname>
        git push origin :refs/tags/<tagname>

## 使用 GitHub
    - github
        - 免费的远程仓库
        - 开源协作社区
## 使用 Gitee

## 自定义 Git

## 使用 SourceTree

## 期末总结


