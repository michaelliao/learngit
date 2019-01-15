# Git使用

标签（空格分隔）： Git

---
[官方文档](https://git-scm.com/docs)

## Windows上安装
**设置用户和邮箱**
```
git config --global user.name "Rambo555"
git config --global user.email "1434694372@qq.com"
```
**设置ssh key**
```
ssh-keygen -t rsa -C "1434694372@qq.com"
```

## 时光机穿梭

- 版本回退
```
git log --pretty=oneline #显示commit信息
git reset --hard head^ #回退到上一个版本, head^可以用版本号代替
git reflog #参考日志
```
- 工作区与暂存区
`git diff <file>`

- 暂存区和版本库
`git diff --cached <file>`

- 工作区和版本库
`git diff head <file>`

- 撤销工作区文件的修改
`git checkout -- <file>`

- 将暂存区恢复到head版本
`git reset head <file>`

- 删除暂存区文件
`git rm --cached -f <file>`

## 远程仓库
- 添加远程库
`git remote add origin git@github.com:Rambo55555/learngit.git`
`git push -u origin master`

- 从远程库克隆
`git clone git@github.com:Rambo55555/learngit.git`

## 分支管理
- 查看分支： `git branch`
- 创建分支： `git branch <name>`
- 切换分支： `git checkout <name>`
- 创建+切换： `git branch -b <name>`
- 合并分支到当前分支： `git merge <name>`
- 删除分支：`git branch -d <name>`
- 查看分支合并图：`git log --graph --pretty=oneline --abbrev-commit`
- 分支合并不用fast forward：`git merge --no-ff -m "merge with no-ff" dev`
- bug分支 `git stash`保存工作区的现场 
`git stash list` 查看工作区
`git stash apply stash@{0}`恢复指定工作区 
`git stash drop stash@{0}`删除工作区
`git stash pop` 恢复并删除

## 远程库
- 查看库信息： `git remote -v`
- 推送：`git push origin <branch-name>`
- 拉取：`git pull`
- 创建连接关系：`git branch --set-upstream-to <branch-name> origin/<branch-name>`
- 整理本地提交历史：`git rebase`

## 打标签
`git tag <tag-name>` 当前commit创建标签
`git tag -a <tag-name> -m 'description' <version>` 指定标签名、说明文字、commit创建标签
`git show <tag-name>` 显示标签信息
`git tag -d <tag-name>` 删除标签
`git push origin <tag-name>` 推送标签到远程
`git push origin --tags` 推送全部未推送过的本地标签
`git push origin :refs/tags/<tag-name>` 删除一个远程标签







