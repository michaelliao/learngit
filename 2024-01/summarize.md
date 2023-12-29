# git 学习总结
## 安装
### linux
`sudo apt-get install git`
### mac
两种方法：
1. 安装homebrew
2. Xcode集成了Git
### windows
1. 官网下载
### 配置个人信息
`git config --global user.name yourname`
`git config --global user.email youremail`
## 本地创建版本库
1. 在代码目录下`git init`
## 常用命令
1. `git init`: 初始化代码仓库
2. `git add filename`: 添加代码文件到暂存区
3. `git commit -m 'message'`: 提交文件到本地仓库
4. `git status`: 查看状态
5. `git diff filename`: 查看修改
6. `git log`: 查看提交日志
7. `git log --pretty=oneline`: 提交日志行展示
8. `git reflog`: 查看记录的每次命令
9. `git checkout -- filename`: 丢弃工作区的修改
10. `git reset HEAD filename`: 撤销暂存区的修改，重新放回到工作区
11. `git reset --hard HEAD^`: 版本回退到上一个版本
12. `git reset --hard commitId`: 版本回退到指定版本
13. `git remote add origin git@github.com/zzm1220/learngit`: 本地库添加远程仓库
14. `git push -u origin master`: 首次向远程库推送
15. `git push origin master`: 非首次推送远程库
16. `git remote -v`: 查看远程库
17. `git remote rm origin`: 删除和远程库绑定关系
18. `git clone git@github.com/zzm1220/learngit`:克隆远程库
19. `git checkout -b name`: 创建并切换到name 分支
20. `git branch`: 查看当前分支
21. `git merge dev`: 把dev分支合并到当前分支
22. `git branch -d dev`: 删除dev 分支
23. `git stash`: 储藏当前工作现场
24. `git stash list`: 查看储藏
25. `git stash pop`: 恢复储藏代码并删除储藏
26. `git stash apply`: 恢复储藏代码但不删除储藏内容
27. `git cherry-pick commitId`: 复制特定提交到当前分支
28. `git checkout -b branch-name origin/branch-name`: 在本地创建和远程对应的分支
29. `git pull`: 拉取代码
30. `git branch --set-upstream branch-name origin/branch-name`: 建立本地分支和远程分支关联
31. `git tag <name>`: 本地创建标签
32. `git tag`: 查看所有标签
33. `git tag -a <name> -m 'message' commitId`: 在对应的commitId下创建tag
34. `git show tagname`: 查看对应的tag
35. `git push origin <name>`: 推送标签到远程
36. `git push origin --tags`: 推送所有标签到远程
37. `git tag -d name`: 删除本地库标签
38. `git push origin :refs/tags/name`: 删除远程标签