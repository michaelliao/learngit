![图图图](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cdd69f80aab4818a9b02bd5296a685e~tplv-k3u1fbpfcp-zoom-1.image)

集中式版本控制系统：CVS、SVN

分布式版本控制系统：Git

#### 本地操作命令

```bash
git init #在当前目录创建git仓库
git add readme.txt #将工作区readme.txt文件添加到暂存区
git commit -m"add readme.txt - touch 1" #将暂存区内容添加至该分支

git status #查看仓库状态
git diff readme.txt #查看文件修改的内容
git log #查看修改记录 --pretty=oneline : 简化输出信息

git reset --hard HEAD~1 #回退至前一个版本，后面的数字是几就回退到第前几个版本
git reflog #查询操作记录
git reset --hard dda8ec0 #跳跃至该版本

git diff HEAD -- readm2.txt #查看工作区和版本库最新版本的区别

git restore readme.txt #文件处于未add状态，恢复至修改前状态, git checkout --  readme.txt也可以完成此功能，并不再推荐
git restore --staged readme.txt #文件处于已add状态，恢复至未add状态, git reset HEAD readme.txt也可以完成此功能，并不再推荐

git rm test.txt #从版本库中删除test.txt,同样该操作仍可以使用restore命令恢复到暂存区
git restore --staged test.txt #恢复刚才删除的test.txt到暂存区
git restore test.txt #恢复删除的test.txt文件到工作区
```

#### 远程操作命令

```bash
git remote add origin origon_url#本地仓库关联远程仓库origon_url
git push -u origin master#本地库推送到远程，-u：关联本地推送分支到远程master

git clone origin_url#克隆远程仓库到本地
```

#### 分支管理

```bash
git checkout -b dev / git switch -c dev #从当前分支创建dev分支并切换到dev分支

...update readme.txt
git add readme.txt #将工作区修改提交至dev分支缓存区
git commit -m"dev update 1"
git checkout master / git switch master
git merge dev #将dev分支的修改合并到master，Fast-forward快进模式
```

##### 分支管理

--no-ff: 默认的合并（merge）代码为Fast-forward模式，该模式下删除分支后会丢掉分支信息（前提合并无冲突），添加--no-ff（强制使用普通模式）参数merge时会生成一个commit，这样就可以保留修改的分支信息

```bash
git merge --no-ff -m"merge with --no-ff" dev
```

#### Bug分支

应用场景：正在开发新的功能，release版本突发Bug，急需修复

```bash
git stash #保存当前开发进度
git switch master #定位到需要修复bug的节点，此处为master
git switch -c issue-101 #创建临时分支
...修复bug
git switch master #切换到master
git merge --no-ff  -m"merged fix bug 101" issue=101  #合并修复bug的代码
git switch dev
git stash pop #恢复工作区
```

dev分支也需要将此次bug fix内容合并过来

```bash
git cherry-pick 668eb199
#但是会出现该错误：
#error: commit 668eb199fd466fb7c180e441f7ed810446a46dd6 is a merge but no -m #option was given.
#fatal: cherry-pick failed
git cherry-pick 668eb199 -m 1
```

#### 删除分支

```bash
git branch -d feature001 #删除已合并过的分支
git branch -D feature001 #强制删除未合并过的分支

git push origin feature002 #推送本地分支到远程
git push origin --delete feature002 #删除远程分支 git push origin :feature002
```

#### 多人协作

```bash
git branch --set-upstream-to=origin/dev dev #指定本地dev分支与远程origin/dev分支链接
git rebase #整理本地提交记录
```

### 标签管理

 ```bash
git tag v1.0 #创建标签
git tag #查看所有标签
git tag -a tagname -m"tag msg"

git push origin --tags #推送所有标签
git push origin v1.0

git tag -d v1.0 # 删除本地标签
git push origin --delete v1.0 # 删除远程标签,git push origin :v1.0
 ```

