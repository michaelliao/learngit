#Git教程 笔记
> 教程链接：http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

##创建版本库
+ `git init`:将当前目录变为Git管理的仓库
+ `git add <filename>`：把文件添加到仓库（stage中）
+ `git commit -m "版本描述"`：把文件按提交到仓库

---------------------
##时光机穿梭
+ `git status`：显示仓库当前状态
+ `git diff <filename>`：展示文件详细修改内容
###版本回退
+ `git log`:显示从最近到最远的提交日志
	+ --pretty=oneline：以单行形式显示提交日志
+ `git reset --hard commit_id`:回退/前进到commit_id指向的版本
+ `git reset --hard HEAD^`:回退到上一版本
+ `git log`:查看提交历史
+ `git reflog`:查看各个版本的commit_id

###管理修改
+ git 管理的是修改，而非文件。
+ 第一次修改 -> git add -> 第二次修改 -> git commit

###撤销修改
+ `git checkout -- <filename>`:丢弃工作区的修改，返回最近一次add/commit时的文件状态
+ `git reset HEAD <filename>`:丢弃暂存区的修改

###删除文件
+ `git rm <filename>`:从版本库中删除文件

--------------------
##远程仓库

###添加远程库
1. 登陆GitHub，“Create a new repository”
2. 添加远程库：`git remote add origin git@github.com:<username>/<repository name>.git`
3. 推送并关联本地master分支:`git push -u origin master`
4. 提交master分支修改到远程库:`git push origin master`

###从远程库克隆
+ `git clone git@github.com:<username>/<repository name>.git`
+ GitHub支持ssh/https协议

---------------------
##分支管理

###创建和合并分支
+ `git branch <name>`:创建分支
+ `git branch`:查看分支
+ `git checkout <name>`:切换分支
+ `git checkout -b <name>`:创建+切换分支
+ `git merge <name>`:合并某分支到当前分支
+ `git branch -d <name>`:删除分支

###解决冲突
+ 当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成
+ `git log --graph`:看到分支合并图

###分支管理策略
1. `git merge <name>`:`fast forward`模式合并，删除分支，分支信息被丢弃
2. `git merge --no-ff`:普通模式合并，合并后历史有分支，可通过`git log --graph`看到分支合并记录

###Bug分支
+ `git stash`:储存当前工作现场
+ `git stash list`:列出所有stash
+ `git stash apply`:恢复最近一次储存的stash
+ `git stash drop`:删除最近一次储存的stash
+ `git stash pop`:恢复+删除最近一次stash
+ `git stash stash@{num}`:恢复指定stash

###feature分支
+ `git branch -D <name>`:强行删除没有被合并的分支

###多人协作
+ `git remote -v`:查看远程库的详细信息
+ `git checkout -b dev origin/dev`:创建远程origin的dev分支到本地
+ `git branch --set-upstream dev origin/dev`:建立本地分支和远程分支的关联
+ `git pull`:抓取远程的新提交
+ `git push origin branch-name`:从本地推送分支

---------------------
##标签管理
+ 是指向某个commit的指针
+ 标签不能移动
+ 创建和删除标签都是瞬间完成的

###创建标签
+ `eg：git tag v1.0`
+ `git tag`:列出所有标签（按字母排序）
+ `git tag <tagname>`:新建一个标签，默认为HEAD，也可以指定一个commit id
+ `git tag -a <tagname> -m "description":指定标签信息
+ `git show <tagname>`:查看标签信息

###操作标签
+ `git push origin <tagname>`:推送本地标签到远程库
+ `git push origin --tags`:推送全部未推送过的本地标签
+ `git tag -d <tagname>`:删除本地标签
+ `git push origin :refs/tags/<tagname>`:删除远程标签

---------------------
##使用GitHub
+ 自己拥有`Fork`后的仓库的读写权限
+ 可以推送`pull request`给官方仓库来贡献代码

---------------------
##自定义Git
+ `git config --global color.ui true`:让Git显示颜色

###忽略特殊文件
1. `.gitignore`:配置要忽略的文件
2. `https://github.com/github/gitignore`:`.gitignore`文件模板

###配置别名
+ 别名是命令的缩写
+ 例子：
	1. `git config --global alias.st status`:配置status别名为st
	2. `git config --global alias.co checkout`:
	3. `git config --global alias.ci commit`:
	4. `git config --global alias.br branch`:
	5. `git config --global alias.unstage 'reset HEAD'`:
	6. `git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`:
+ 配置文件：
	1. `.git/config`:仓库的Git配置文件
	2. `.gitconfig`:当前用户的Git配置文件，放在用户主目录下

---------------------
##搭建Git服务器
1. 安装git:`sudo apt-get install git`
2. 创建git用户:`sudo adduser git`
3. 创建证书登录：搜集登陆用户公钥（id_rsa.pub）文件，导入`/home/git/.ssh/authorized_keys`文件，一行一个
4. 初始化Git仓库
	+ `sudo git init --bare sample.git`
	+ `sudo chown R git:git sample.git`:修改裸仓库owner，防止其他用户篡改工作区
5. 禁用shell登陆(git-shell一登陆就自动退出)
	+ `vi /etc/passwd`
	+ `git:x:........:/bin/bash`-->`git:x:......:/usr/bin/git-shell`
6. 克隆远程仓库，本地运行，修改后推送
	+ `git clone git@server:/srv/sample.git`
	+ `git push`
7. 要方便管理公钥，用Gitosis
8. 要像SVN那样变态地控制权限，用Gitolite

=======

------------------
