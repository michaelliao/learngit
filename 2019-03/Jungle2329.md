# gitlearn

### 1.创建
- 创建git版本库：  
`$ git init`

- 查看git状态：  
`git status`

- 添加文件到缓冲区：  
```
git add <file>
git add -A  提交所有变化
git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
git add .  提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
```

- 删除文件：  
`git rm <file>`

- 提交缓冲区内容，-m <msg> 是添加提交日志：  
`git commit -m "<msg>"`

- 查看提交日志：  
```
//查看多行日志
git log
//查看简易日志
git log --pretty=oneline
```

### 2.版本回退
- 回退上一个版本：  
`$ git reset --hard HEAD^`

- 跳转到某一个版本：  
`$ git reset --hard 1094a`  
其中1094af就是在log中看到的版本号中的某几位，不用写全也可以

- 查看输入的命令记录：  
`git reflog`

- 总结
HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。  
穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。  
要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

### 3.撤销修改
- 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- <file>`

- 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

- 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

### 4.提交到github
- 查看远程库：  
`$ git remote`

- 添加远程库:
```
$ git remote add <remotename> git@github.com:Jungle2329/getlearn.git
其中<remotename>一般默认是origin
github的服务器 git@github.com
github的名字和项目名 Jungle2329/getlearn.git
```
- 这里有个很重要的点，远程库不一定是github的，局域网的地址，或者本地不同文件夹下都可以作为远程库  
可以选择remotename用来提交到不同的远程库
```
$ git remote add <remotename> <url>
url：
github服务器 	 git@github.com:Jungle2329/gitlearn.git
本地				 D:/test/gitlearn
局域网			 <ip>D:/test/gitlearn
```

- 从远程库克隆到本地：  
`$ git clone git@github.com:Jungle2329/getlearn.git`

- 提交到远程库：  
`$ git push <name>`

- 从远程库拉取：  
`$ git pull`


### 5.分支
- 查看分支：  
`git branch`

- 创建分支name：  
`git branch <name>`

- 切换分支name：  
`git checkout <name>`

- 创建并切换分支name：  
`git checkout -b <name>`

- 在本地创建dev并切换到远程origin分支dev：  
`$ git checkout -b dev origin/dev`

这时就可以在分支工作了，工作完再合并到master上

- 合并name到当前分支：  
`git merge <name>`

- 删除分支name：  
`git branch -d <name>`

### 6.解决冲突
用带参数的git log也可以看到分支的合并情况：
`git log --graph --pretty=oneline --abbrev-commit`

### 7.分支管理策略
使用`git merge dev`的时候默认使用`Fast forword`模式，这种模式下，删除分支后，会丢掉分支信息  
如果想要强制禁用`Fast forword`可以使用如下方法：  
```
$ git merge --no-ff -m "提交日志" dev
本次合并会创建一个commit所以需要 -m "日志"
```

### 8.bug修复使用stash功能保存当前工作进度
当开发一半的时候，有bug需要修改，可以把当前进度使用stash功能保存  
`$ git stash`  
保存后当前分支就是完全clean的状态，这时可以查看保存的信息
```
$ git stash list
stash@{0}: WIP on dev: f52c633 add merge
```
保存后可以再任意修改bug或者使用分支修改bug后提交，提交后使用

现在需要还原保存的stash，有两种方法：  
一是用`git stash apply`恢复，但是恢复后，`stash`内容并不删除，你需要用`git stash drop`来删除；  
二是用`git stash pop`同时恢复并且删除`stash`

你可以多次`stash`，恢复的时候，先用`git stash list`查看，然后恢复指定的`stash`，用命令：  
`$ git stash apply stash@{0}`

### 9.使用-D来强制删除未合并的分支
当正在开发的分支不用的时候，不能合并进主分支，又想要删除当前分支的数据：  
```
使用		git branch -d feature 是删不掉的
要使用	git branch -D feature 强制删除未合并的分支
```

### 10.多人协作
- 查看远程库的信息：  
`$ git remote`

- 查看远程库的具体信息：  
`$ git remote -v`

- 推送分支：  
`$ git push origin master`

- 推送其他分支：  
`$ git push origin dev`

`master`分支是主分支，因此要时刻与远程同步；

`dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

`bug`分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

`feature`分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

- 多人开发的流程：  
 1. 查看远程库信息，使用git remote -v；
 - 本地新建的分支如果不推送到远程，对其他人就是不可见的；
 - 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
 - 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
 - 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
 - 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

### 11.标签

- 给当前`HEAD`打标签：  
`$ git tag v1.0`
- 给某个版本打标签：  
`$ git tag v1.1 65f5d1f`  
- 打带有信息的标签：  
`$ git tag -a v1.2 -m "msg"`
- 查看所有标签：  
`$ git tag`
- 展示标签：  
`$ git show v1.1`
- 删除标签：  
`$ git tag -d v1.0`
- 推送某个标签到远程：  
`$ git push origin v1.0`
- 推送所有尚未推送的标签到远程：  
`$ git push origin --tags`
- 如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：  
`$ git tag -d v1.0`  
然后，从远程删除。删除命令也是push，但是格式如下：  
`$ git push origin :refs/tags/v1.0`