

```

# git 安装
git:输入git,看看系统有没有安装git
sudo apt-get install git:Linux（Debian,Ubuntu linux）上安装git
sudo apt-get install git-core:老Linux系统上安装git

git config --global user.name "Your Name":写入Name
git config --global user.email "email@example.com：写入email

#创建版本库
mkdir:Linux上创建一个folder
git init:通过git init命令把这个目录变成git可以管理的目录
git add:告诉git,把文件添加到仓库
git commit -m"notes":把文件提交到仓库

git status:查看仓库状态
git diff readme.txt：查看文件差异（工作区（work dict）与暂存区(stage)的比较）
git diff --cached:暂存区（stage）和分支（master）的比较

git log:显示从最近到最远的提交日志
git log --pretty=oneline:一行显示从最近到最远的提交日志
git reflog:查看历史log,可以看到commit id和所有commit

git reset --hard HEAD^:回到上一个版本
git reset --hard HEAD^^:回到上两个版本
git reset --hard HEAD~100:回到上100个版本
git reset --hard 3628164:回到commit id这个版本

git checkout -- readme.txt:(其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。)
一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。


git reset HEAD readme.txt：把暂存区的修改撤销掉（unstage）


# 远程仓库
ssh-keygen -t rsa -C "youremail@example.com"
在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key


# 关联远程仓库
$ git remote add origin git@github.com:michaelliao/learngit.git

# 第一次推送本地master到远程仓库
$ git push -u origin master：注意第一次要加-u
$ git push origin master：推送

# clone

github创建仓库：Initialize this repository with a README
$ git clone git@github.com:michaelliao/gitskills.git:将远程库克隆成一个本地库
（ssh,https）

# 创建与合并分支
HEAD指向master,master指向commit


$ git checkout -b dev:创建并切换到dev分支
$ git branch dev:创建dev分支
$ git checkout dev:切换到dev分支

$ git branch:显示所有分支
$ git merge dev:用于合并指定分支(dev)到当前分支(master)

Fast-forward:“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快

$ git branch -d dev:删除分支

# 解决冲突
Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容

# 查看合并情况
$ git log --graph --pretty=oneline --abbrev-commit


$ git log --graph:可以看到分支合并图


# --no--ff普通模式合并
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
$ git merge --no-ff -m "merge with no-ff" dev
![image](http://www.liaoxuefeng.com/files/attachments/001384909239390d355eb07d9d64305b6322aaf4edac1e3000/0.png)

# git stash
$ git stash:可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作
$ git stash list:查看所有的stash
一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
另一种方式是用git stash pop，恢复的同时把stash内容也删了：


你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：
$ git stash apply stash@{0}

# Feature分支
如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

```


```
# 多人协作
你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。
要查看远程库的信息，用git remote：
或者，用git remote -v显示更详细的信息


# 推送分支
推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上

如果要推送其他分支，比如dev，就改成：$ git push origin dev

但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

master分支是主分支，因此要时刻与远程同步；

dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。


# 抓取分支
$ git checkout -b dev origin/dev:创建本地dev分支

$ git branch --set-upstream dev origin/dev:指定本地dev分支与远程origin/dev分支的链接



# 多人协作的工作模式通常是这样
1. 首先，可以试图用git push origin branch-name推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功


如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。


```


```
# 创建标签
$ git tag v1.0:打v1.0标签,默认标签是打在最新提交的commit上的
$ git tag:查看所有标签
$ git tag v0.9 6224937:对commit id= 6224937打上v0.9的标签
$ git show v0.9:查看标签信息
$ git tag -a v0.1 -m "version 0.1 released" 3628164:
创建带有说明的标签，用-a指定标签名，-m指定说明文字


还可以通过-s用私钥签名一个标签：
$ git tag -s v0.2 -m "signed version 0.2 released" fec145a
签名采用PGP签名，因此，必须首先安装gpg（GnuPG），如果没有找到gpg，或者没有gpg密钥对，就会报错：
gpg: signing failed: secret key not available
error: gpg failed to sign the data
error: unable to sign the tag

# 操作标签
$ git tag -d v0.1：删除v0.1标签
因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。


如果要推送某个标签到远程，使用命令git push origin <tagname>：
或者，一次性推送全部尚未推送到远程的本地标签：$ git push origin --tags



如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除
$ git tag -d v0.9
然后，从远程删除。删除命令也是push，但是格式如下：
$ git push origin :refs/tags/v0.9
```



```
# 使用github
如何参与一个开源项目呢？
点Fork
再克隆到本地
再推送更新
https://www.zhihu.com/question/21682976




# 自定义git
$ git config --global color.ui true: 让Git显示颜色，会让命令输出看起来更醒目


# 忽略特殊文件
好在Git考虑到了大家的感受，这个问题解决起来也很简单，在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。

不需要从头写.gitignore文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：https://github.com/github/gitignore

# 忽略特殊文件

有些时候，你必须把某些文件放到Git工作目录中，但又不能提交它们，比如保存了数据库密码的配置文件啦，等等，每次git status都会显示Untracked files ...，有强迫症的童鞋心里肯定不爽。

好在Git考虑到了大家的感受，这个问题解决起来也很简单，在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。

不需要从头写.gitignore文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：https://github.com/github/gitignore

忽略文件的原则是：

忽略操作系统自动生成的文件，比如缩略图等；
忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。



强制添加：
$ git add -f App.class

git check-ignore -v App.class：可能是.gitignore写得有问题，需要找出来到底哪个规则写错了，可以用git check-ignore命令检查

# # 
忽略某些文件时，需要编写.gitignore；
.gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！





配置别名
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
配置Git的时候，加上--global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。

撤销：
$ git config --global alias.unstage 'reset HEAD'




# 配置文件
配置文件放哪了？每个仓库的Git配置文件都放在.git/config文件中：
$ cat .git/config



```
