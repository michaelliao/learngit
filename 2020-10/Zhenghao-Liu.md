* [此文章已存档在个人博客](https://zhenghao-liu.github.io/)

### git指令

总结自[Git教程-廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)
<!-- more -->

#### (1)安装git
1. 自报家门：你的名字和Email地址
```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

#### (2)创建版本库
2. 把pwd当前这个目录变成Git可以管理的仓库
```bash
$ git init
```

3. 将文件提交至暂存区/缓冲区
```bash
$ git add filename
```
一下子提交当前所有文件至缓冲区
```bash
$ git add .
```

4. 将暂存区/缓冲区所有文件提交至当前分支/归档区
```bash
$ git commit
```
带有注释的提交
```bash
$ git commit -m "description"
```

#### (3)时光机穿梭
5. 查看当前仓库的状态
```bash
$ git status
```

6. 查看对应文件自己与之前的改动
```bash
$ git diff filename
```

#### (3.1)版本回退
7. 显示从最近到最远的提交日志
```bash
$ git log [--graph] [--pretty=oneline] [--abbrev-commit]
```
* `--graph`像图形一样展示
* `--pretty=oneline`可以将每个提交版本压缩到一行显示
* `--abbrev-commit`只显示版本号的前几位，不完整显示完
* `HEAD`指向是当前所在分支的位置
* `origin/brachname`则是对应远程仓库分支的所在位置

较完整的日志
```bash
$ git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

8. 版本号
  
`HEAD`表示当前版本  
`HEAD^`表示上一个版本  
`HEAD^^`表示上上个版本  
`HEAD~100`表示上100个版本  
commit-id是一串较长的哈希字符串，命令时可以只输入前几位，也可以输完整

9. 查看历史执行过的命令
```bash
$ git reflog
```

10. 回退版本
```bash
$ git reset [--soft | --mixed | --hard] [HEAD | commit-id]
```

* `--mixed` 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。
* `--soft` 参数用于回退到某个版本
* `--hard` 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交

#### (3.2)工作区和暂存区
* 工作区：就是你在电脑里能看到的目录。
* 暂存区(缓冲区)：英文叫 stage 或 index。一般存放在 .git 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
* 当前分支/归档区：
* 版本库：工作区有一个隐藏目录 .git，这个不算工作区，而是 Git 的版本库。

#### (3.3)管理修改
* Git跟踪并管理的是修改，而非文件
* 每次修改，如果不用`add`到暂存区，那就不会加入到`commit`中

#### (3.4)撤销修改
11. 丢弃工作区的修改
```bash
$ git checkout -- filename
```
* 一种是filename自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
* 一种是filename已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
* 总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

12. 把暂存区的修改撤销掉，将文件放回至工作区
```bash
git reset HEAD filename
```

#### (3.5)删除文件
13. 删除工作区文件
```bash
$ rm filename
```
* 但如果filename已经提交至暂存区`add`且提交`commit`，将工作区文件删除后，工作区和版本库就不一致了，用`git status`可以查看差别。
* 现在有两种选择：一是确实要从版本库中删除该文件；二是从版本库中恢复文件至工作区

14. 从版本库中删除该文件
```bash
$ git rm filename
```
且要提交至分支
```bash
$ git commit -m "description"
```
至此文件就从版本库中删除，工作区暂存区版本库保持一致

15. 从版本库中恢复文件至工作区
```bash
$ git checkout -- filename
```
* `git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”
* 但是从来没有被添加到版本库就被删除的文件，是无法恢复的

#### (4)远程仓库

#### (4.1)添加远程仓库
16. 本地仓库关联至远端仓库
```bash
$ git remote add origin xxxxxxxxxxxx.git
```
* 添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的
```bash
$ git remote [ -v | add | remove | rm]
```

17. 本地库的内容推送到远程仓库
```bash
$ git push [-u] origin master
```
* `remote`关联后，第一次推送带上`-u`，可以将当前本地分支与远端分支关联起来，后面执行命令可以简化，之后推送就不用带上`-u`了
* `origin`是远程仓库的在`remote`自定义的名字
* `master`是要推送到远程仓库的某一个分支
* 推送过去的分支则是当前所在分支

#### (4.2)从远程库克隆
18. 从远程库克隆一个仓库到本地
```
$ git clone xxxxxxxxxxxx.git
```
* `clone`支持ssh和http

#### (5)分支管理

#### (5.1)创建与合并分支
* 每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支
* 一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点
* 每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长

19. 创建分支
```bash
$ git branch branchname
```
20. 切换分支
```bash
$ git checkout branchname
$ git switch branchname
```

21. 创建并直接切换至分支
```bash
$ git checkout -b branchname
$ git switch -c branchname
```
等价于19+20的命令

22. 查看当前所有分支
```bash
$ git branch
```
* 会列出所有分支，当前所在分支前面会标一个`*`号。

23. 合并指定分支到当前分支
```bash
$ git merge branchname
```

24. 删除分支
```
$ git branch -d branchname
```

#### (5.2)解决冲突
当不同的分支对同一个文件做出了不同的修改，导致`merge`时发生冲突，可通过`git status`查看发生冲突的的文件，此时`merge`的快速合并会失效，需要手动打开文件解决冲突

#### (5.3)分支管理策略
* 通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。
* 如果要强制禁用`Fast forward`模式，Git就会在`merge`时生成一个新的`commit`，这样，从分支历史上就可以看出分支信息

25. 禁用`Fast forward`后的合并分支
```bash
$ git merge --no-ff -m "description" branchname
```

#### (5.4)Bug分支
26. 当前工作现场“储藏”起来，等以后恢复现场后继续工作
```bash
$ git stash
```

27. 查看储存的工作现场列表
```bash
$ git stash list
```

28. 从列表中恢复现场
```bash
$ git stash apply stash-id
```

29. 从列表中删除现场
```bash
$ git stash drop stash-id
```

30. 从列表中提取第一个现场恢复，并删除
```bash
$ git stash pop
```

31. 复制一个特定的提交到当前分支
```bash
$ git cherry-pick commit-id
```

#### (5.5)Feature分支
32. 删除一个没有合并过的分支(强制删除)
```bash
$ git branch -D branchname
```

#### (5.6)多人协作
33. 查看远端仓库信息
```bash
$ git remote
```
显示更详细信息
```bash
$ git remote -v
```

34. 创建一个远端仓库已有的分支并切换到该分支
```bash
$ git checkout -b branchname origin/origin_branchname
```
* `origin`是对应远端仓库的自定义名字
* `origin_branchname`是对应的远端仓库的分支名
* `branchname`是指在本地创建的分支名
* 该操作会把远程仓库`origin`的`origin_branchname`分支的内容给复制到本地的`branchname`分支上，并切换到`branchname`分支上

35. 指定本地分支与远端仓库分支的链接
```bash
$ git branch --set-upstream-to=origin/origin_branchname branchname
```

36. 从远端仓库的分支拉取下最新的提交合并到本地分支
```bash
$ git pull
```
* 拉取内容首先要想35一样建立链接

#### (5.7)Rebase
37. 把本地未push的分叉提交历史整理成直线
```bash
$ git rebase
```

#### (6)标签管理
* 发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本，即`tag`是和`commit-id`是捆绑的
* 将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。

#### (6.1)创建标签
38. 创建新标签
```bash
$ git tag tagname
```
* 默认标签是打在最新提交的commit上的

39. 在对应的版本号上打标签
```bash
$ git tag -a tagname [-m "description"] commit-id
```
* `-a`指定标签名
* `-m`则添加描述

40. 查看所有标签
```bash
$ git tag
```

41. 查看标签信息
```bash
$ git show tagname
```

#### (6.2)操作标签
42. 删除标签
```bash
$ git tag -d tagname
```

43. 推送某个标签至远程仓库
```bash
$ git push origin tagname
```

44. 一次性推送全部尚未推送到远程的本地标签
```bash
$ git push origin --tags
```

45. 标签已经推送到远程下，要删除远程标签
```bash
$ git tag -d tagname
$ git push origin :refs/tags/tagname
```

#### (7)使用Github
#### (8)使用Gitee

#### (9)自定义Git

#### (9.1)忽略特殊文件
* 忽略某些文件时，需要编写.gitignore
* .gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理

#### (9.2)配置别名
46. 配置对应命令别名
```bash
$ git config --global alias.mini_order order
```
* 删除别名：别名就在配置文件中的[alias]后面，要删除别名，直接把对应的行删掉即可。

47. 配置文件
* 每个仓库的Git配置文件都放在.git/config文件
* `--global`参数是全局参数，也就是这些命令在这台电脑的所有Git仓库下都有用
* 配置Git的时候，加上--global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。
* 而当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中

