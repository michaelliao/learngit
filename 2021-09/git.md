#### 准备

```
//设置用户名和邮箱
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
//检查
$ git config user.name
$ git config user.email
```

##### 远程仓库配置步骤
1.创建SSH Key
`$ ssh-keygen -t rsa -C "youremail@example.com"`
用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人
2登陆GitHub，打开“Account settings”，“SSH Keys”页面：然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容

##### 本地仓库和远程仓库关联

1.new repository取好Repository name,

Initialize this repository with:

Skip this step if you’re importing an existing repository.

(是否需要加readme，用于从零开始开发，如果导入一个本地已存在的仓库，跳过此步骤)

后create repository

2.在本地仓库下运行命令：

`$ git remote add origin git@github.com:tanbinzhi/<Repository name>.git`

把`tanbinzhi`替换成自己的GitHub账户名

`origin`是远程库的名字

#### 本地仓库->远程仓库

`$ git push -u origin master`

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送到远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

`$ git push origin master`

把本地`master`分支的最新修改推送至远程仓库的`master`分支的简写

`$ git remote -v`

查看远程库信息

`$ git remote rm <name>`

解除本地和远程的绑定关系

#### 远程仓库->本地仓库

`$ git clone git@github.com:tanbinzhi/<Repository name>.git`

#### 修复bug

`$ git stash`

把当前工作现场“储藏”起来，等以后恢复现场后继续工作

```
假定需要在`master`分支上修复，就从`master`创建临时分支
$ git checkout master
$ git checkout -b issue-101
$ git add readme.txt 
$ git commit -m "fix bug 101"
[issue-101 4c805e2] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git switch master
$ git merge --no-ff -m "merged bug fix 101" issue-101
接着回到dev分支干活
$ git switch dev
$ git stash pop     恢复工作现场的同时把stash内容也删了
```

`$ git stash list`

查看stash内容

`$ git stash apply stash@{0}`

恢复指定的stash

`$ git cherry-pick 4c805e2`

```
$ git cherry-pick 4c805e2
[master 1d4b803] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

`4c805e2`是在bug `$ git commit`时出现的，在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

#### git命令

`$ git init`

初始化一个Git仓库

`$ git add readme.txt`

把文件(例子为readme.txt)添加到仓库,可反复多次使用，添加多个文件

实际上就是把文件修改添加到暂存区

`$ git commit -m "wrote a readme file"`

把文件提交到仓库,`-m`后面输入的是本次提交的说明,方便找到改动记录

实际上就是把暂存区的所有内容提交到当前分支

`$ git checkout -b dev`

即`$ git branch dev`//创建dev分支       `$ git checkout dev`//切换到dev分支

`$ git checkout -b dev origin/dev`

在本地创建和远程分支对应的分支（包含了下面一条命令）

`$ git branch --set-upstream-to=origin/dev dev`

建立本地分支和远程分支的关联

`$ git pull`

把最新的提交从`origin/dev`抓下来(会自动合并，不需要再git merge)

`$ git merge (--no-ff -m "merged bug fix 101") dev`

切换到master分支执行该命令的含义就是：把`dev`分支的工作成果合并到`master`分支上

括号里的内容表示强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息，否则删除分支后，会丢掉分支信息

`$ git branch -d dev`

删除dev分支

`$ git branch`

列出所有分支，当前分支前面会标一个`*`号

`$ git status`

随时掌握工作区的状态

`$ git diff readme.txt `

当有文件（如readme.txt）被修改过，但是没有添加到git仓库，`git status`会告诉你有文件被修改过，用`git diff`可以查看修改内容。

`$ git log --pretty=oneline`

结果类似：

`c16001c67a129172e0ea8ed83a09c1e4e4de7550 (HEAD -> master) 修改了第一行
bd6c3e05285202f37c57149e041cca3ace303cb9 新增readme`

显示从最近到最远的提交日志,`--pretty=oneline`参数简化日志输出信息

结果里面前面的数字表示版本号

`$ git reset --hard HEAD^`

回退到上一个版本

在Git中，用`HEAD`表示当前版本,上一个版本是`HEAD^`，上上一个版本是`HEAD^^`，往上100个版本可以写成`HEAD~100`

`$ git reset --hard c16001`

回退到版本号（如c16001....）指定版本，不需要写全

`$ git reflog`

查看命令历史

`$ git restore <file>`

 to unstage(撤回暂存区)

`$  git restore --staged <file>`

 to discard changes in working directory(撤回在工作目录的改变)

```c
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   readme.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.txt

```

`$ git remote -v`

查看远程库的信息

`git tag <tagname> (commit id)` 

新建一个标签，默认为`HEAD`，也可以指定一个commit id(git log 可以查看commit id)；

- `git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
- `git tag`可以查看所有标签。
- `git show <tagname>`查看标签信息

- `git push origin <tagname>`推送一个本地标签；
- `git push origin --tags`推送全部未推送过的本地标签；
- `git tag -d <tagname>`删除一个本地标签；
- `git push origin :refs/tags/<tagname>`删除一个远程标签。

#### GitHub

点“Fork”就在自己的账号下克隆了一个xxx(repo name)仓库，然后，从自己的账号下clone：

```
git clone git@github.com:tanbinzhi/<repo name>.git
```

一定要从自己的账号下clone仓库，这样你才能推送修改。如果从xxx的作者的仓库地址如bootstrap项目`git@github.com:twbs/bootstrap.git`克隆，因为没有权限，你将不能推送修改。

