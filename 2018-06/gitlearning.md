#### 1.Git简介
**Git**是目前世界上最先进的分布式控制系统，由Linux创作者**Linus**花了两周用`C`写成。

与之相对应的是集中式控制系统**CVS**及**SVN**

#### 2.Git初始化
```
$ cd learngit
$ git init
```
当前目录会多一个`.git`目录，不要轻易修改该目录下的内容，这个目录是默认隐藏的，用`ls -ah`显示，**所有的版本控制系统，只能跟踪文本文件的改动**

#### 3.Git基本命令

##### git add 

```
$ git add [path] # 将[path]添加到索引库，[path]可以是文件也可以是目录
$ git add .      # 将所有修改添加到暂存区
$ git add -i [<path>] # 查看中被所有修改过或已删除文件但没有提交的文件，并通过其revert子命令可以查看<path>中所有未跟踪的文件，同时进入一个子命令系统。
$ git add -i
           staged     unstaged path
  1:        +0/-0      nothing branch/t.txt
  2:        +0/-0      nothing branch/t2.txt
  3:    unchanged        +1/-0 readme.txt

*** Commands ***
  1: [s]tatus     2: [u]pdate     3: [r]evert     4: [a]dd untracked
  5: [p]atch      6: [d]iff       7: [q]uit       8: [h]elp
```

这里的`t.txt`和`t2.txt`表示已经被执行了`git add`，待提交。即已经添加到索引库中。
`readme.txt`表示已经处于`tracked`下，它被修改了，但是还没有执行`git add`。即还没添加到索引库中。

##### git commit
```
$ git commit -sm "descriptions(签名和此处提交的说明描述)" # m 说明描述，改动记录 s 签名
$ git commit -m "the commit message" #
$ git commit -a # 会先把所有已经track的文件的改动`git add`进来，然后提交(有点像svn的一次提交,不用先暂存)。对于没有track的文件,还是需要执行`git add <file>` 命令。
$ git commit --amend # 增补提交(修改最后一次提交)，会使用与当前提交节点相同的父节点进行一次新的提交，旧的提交将会被取消。

$ git add readme.txt
$ git commit -m "commit --amend test"
$ git add forggotenfile.txt
$ git commit --amend
#上面四条命令最终只产生一个提交，第二个提交命令修正了第一个提交内容
```

取消已经暂存的文件
```
$ git add . #不小心将所有的添加到了暂存区
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage) #查看文件状态时提示如何撤销
        modified:   README.txt
        modified:   benchmarks.rb
$ git reset HEAD benchmarks.rb
Unstaged changes after reset:
M       benchmarks.rb
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.txt
#这样benchmarks.rb 就回到了修改未暂存的状态了
```

#### 4.版本回退<div id="4"></div>
```
$ git reset --hard HEAD^ # 表示回退到上一个版本，HEAD^表示上一个版本，HEAD^表示上上个版本，回退100个版本不用写100个^，用HEAD^~100表示
$ git reset --hard <commitId> #回退到当前commitId对应的版本
$ git reflog # 用来记录每一次的命令，这里可以查看到commitId。
```

#### 5.工作去和暂存区
`gitlearning`文件夹就是一个工作区

工作区有一个隐藏目录`.git`，这个不算工作区，是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是成为stage(或者叫index)的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

![image](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)

第一步`git add`，将文件修改添加到暂存区

第二步`git commit`，把暂存区的所有内容提交到当前分支。

#### 6.撤销修改
```
$ git checkout -- file #放弃工作区的修改，将文件恢复到上一个版本的状态
#一种是file自修改后还没有被添加到暂存区，现在撤销修改就回到和版本库一样的状态。
#一种是已经添加到暂存区后，又做了修改，现在撤销，就回到添加到暂存区后的状态
```
场景1: 如果修改了工作区的内容，想直接丢弃工作区修改时，用命令`git checkout -- file`

场景2: 如果工作区的内容已添加到暂存区，想丢弃修改，需要两步，一是`git reset HEAD file`，然后`git checkout -- file`就能放弃修改

场景3: 如果修改已经提交到版本库中，则想要撤销此次修改，参考[版本回退](#4)

#### 7.删除文件
```
$ git rm file #删除文件
$ git commit -m ""
```

#### 8.远程仓库
如何创建远程仓库以Github为例

第一步：创建SSH Key
```
$ ssh-keygen -t rsa -C "zhoulei1510@qq.com"
```
在用户的主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，`id_rsa.pub`是公钥

第二步： 登录github，打开Account settings，"SSH Keys"界面：然后将公钥`id_rsa.pub`粘贴到文本框内，点击Add key

第三步: 在github上创建一个新的仓库

第四步: 将自己已有的本地仓库和远程仓库关联，然后把本地仓库的内容推送到远程仓库
```
$ git remote add origin https://github.com/ungenius/gitlearning.git
$ git push -u origin master
```
添加后远程仓库的名字就是origin，这是Git的默认叫法，，`git push`命令，实际上是将当前分master推送到远程，加上`-u`参数，git会把本地的master分支的内容推送到远程新的master分支，还会将本地`master`分支和远程的`master`分支关联起来，在以后的推送或者拉去时就可以简化命令。

在以后，再提交到远程仓库时就只用
```
$ git push origin master
```
要克隆一个仓库，使用`git clone`命令克隆。

#### 9.创建与合并分支
```
$ git merge dev (master) # 将dev分支的工作合并到master上
Updating d46f35e..b17d20e
Fast-forward
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
$ git log --graph --pretty=oneline --abbrev-commit # 查看分支合并图
```
注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是"快进模式"，也就是直接把`master`直接指向`dev`的当前提交，所以合并速度非常快

```
$ git log --graph --pretty=oneline --abbrev-commit
*   cf810e4 (HEAD -> master) conflict fixed
|\  
| * 14096d0 (feature1) AND simple
* | 5dc6824 & simple
|/  
* b17d20e branch test
* d46f35e (origin/master) remove test.txt
* b84166e add test.txt
* 519219b git tracks changes
* e43a48b understand how stage works
* 1094adb append GPL
* e475afc add distributed
* eaadf4e wrote a readme file
```

```
$ git merge --no-ff -m "merge without fast-forward" #强制禁止Fast-forward模式
$ git log --graph --pretty=oneline --abbrev-commit
*   e1e9c68 (HEAD -> master) merge with no-ff
|\  
| * f52c633 (dev) add merge #之前的分支的commit会保留
|/  
*   cf810e4 conflict fixed
...
```

本次合并会产生新的commit，所以需要加上`-m`参数。

合并分支时，加上`no-ff`参数就可以用普通模式合并，合并的历史有分支，能看出来曾经做过合并，而`fast-forward`合并就看不出来曾今做过合并。

#### 10.Bug分支 `git stash`
当工作区的工作进行到一半时，需要去别的分支上修改一个小bug，而当前分支上的事情不能立刻处理好时，可以利用`git stash`命令将当前工作现场保存起来，等以后恢复现场后继续工作。
```
$ git stash 
Saved working directory and index state WIP on dev: f52c633 add merge
$ git stash list # 查看刚刚保存的工作现场
stash@{0}: WIP on dev: f52c633 add merge
$ git stash pop # 恢复的同时把stash内容也删除了
```

`git stash apply`恢复后，stash内容并不删除，需要用`git stash drop`来删除

`git branch -D <name>`强行删除分支

#### 11.多人协作

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；

2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；

3. 如果合并有冲突，则解决冲突，并在本地提交；

4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

5. 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

**小结**

* 查看远程库信息，使用`git remote -v`；

* 本地新建的分支如果不推送到远程，对其他人就是不可见的；

* 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；

* 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；

* 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；

* 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

#### 12.标签
```
$ git tag <tagname> [<commit id>] # 用于创建一个标签，也可以指定一个commitId;
$ git tag <tagname> -m "comment" #指定标签的信息
$ git tag # 查看所有的标签
$ git tag -d <tagname> # 删除本地标签
$ git push origin <tagname> # 将标签推送到远程
$ git push origin --tags # 一次性推送全部尚未推送到远程的本地标签
$ git tag -d <tagname> # 删除本地标签
$ git push orign :refs/tags/<tagname> # 删除远程标签
```

因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。