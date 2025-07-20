		-分布式版本控制系统
- 记录每次改动
- 没有“中央服务器”，每个人电脑有完整版本库
git bash 里面配置global姓名和邮箱
```
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/

```

<font color="#953734">在仓库上传文件</font>
![[Pasted image 20250713171153.png]]
<font color="#953734">修改文件</font>
![[Pasted image 20250715182802.png]]

<font color="#953734">更改版本</font>
![[Pasted image 20250715184433.png]]
`--hard`参数有啥意义？`--hard`会回退到上个版本的已提交状态，而`--soft`会回退到上个版本的未提交状态，`--mixed`会回退到上个版本已添加但未提交的状态。

版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。

前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

- 第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；
- 第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

<font color="#953734">关于更改文件</font>

除了在文件夹打开vscode直接编辑保存，还可以
- 在 Git Bash / Linux / macOS 里常用的：<font color="#b2a2c7">nano</font>（简单易用）
  `nano filename.txt`
  进入nano编辑器，**标准流程是**
  **Ctrl + O**（写入 = 保存）
  **Enter**（确认文件名）
  **Ctrl + X**（退出）

- **<font color="#b2a2c7">vim</font>**（功能很强但上手稍复杂）
    `vim filename.txt`
    
    i 进入插入模式编辑
    按 `Esc` 退出插入模式
    输入 `:wq` 回车保存并退出
    
- **vi**（和 vim 类似）
- <font color="#b2a2c7">notepad</font>（会弹出记事本）
  `notepad filename.txt`
  会打开记事本，修改完后点保存。
  如果用 **PowerShell 或 CMD** 也可以用同样的 `notepad` 命令。
- 如果只是想替换成一行短文本，可以用<font color="#b2a2c7"><font color="#b2a2c7"> ech</font>o</font>：
  `echo "new content here" > filename.txt`
  要追加内容：
  `echo "extra line" >> filename.txt`
- <font color="#b2a2c7">code</font>
  `code filename.txt`
  会在 VSCode 里打开这个文件。

<font color="#953734">撤销修改</font>
`git checkout -- file`可以丢弃工作区的修改：

```plain
$ git checkout -- readme.txt
```

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。
用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区：

![[Pasted image 20250717035802.png]]
> [!NOTE] note
> 先手动删除文件，然后使用`git rm <file>`和`git add<file>`效果是一样的。

> [!NOTE] note
> 从来没有被添加到版本库就被删除的文件，是无法恢复的！

如果你不想让别人看到Git库，有两个办法，一个是交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。另一个办法是自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的

<font color="#953734">远程库</font>
要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；

关联一个远程库时必须给远程库指定一个名字，`origin`是默认习惯命名；

关联后，使用命令`git push -u origin master`第一次推送`master`分支的所有内容；

此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

删除远程库，可以用`git remote rm <name>`命令。使用前，建议先用`git remote -v`查看远程库信息：

```plain
$ git remote -v
origin  git@github.com:michaelliao/learn-git.git (fetch)
origin  git@github.com:michaelliao/learn-git.git (push)
```

然后，根据名字删除，比如删除`origin`：

```plain
$ git remote rm origin
```

此处的“删除”其实是解除了本地和远程的绑定关系，并不是物理上删除了远程库。远程库本身并没有任何改动。要真正删除远程库，需要登录到GitHub，在后台页面找到删除按钮再删除。

最方便：先建远程仓库
你也许还注意到，GitHub给出的地址不止一个，还可以用`https://github.com/michaelliao/gitskills.git`这样的地址。实际上，Git支持多种协议，默认的`git://`使用`ssh`，但也可以使用`https`等其他协议。
使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放`http`端口的公司内部就无法使用`ssh`协议而只能用`https`。

## 如果你想把仓库放到 **D 盘的指定位置**，方法如下：

进入目标文件夹再执行 `git clone`
`cd /d/你想放的文件夹路径 git clone git@github.com:xxx/yyy.git`

要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。
Git支持多种协议，包括`https`，但`ssh`协议速度最快。

<font color="#953734">分支管理</font>

Git鼓励大量使用分支：

查看分支：`git branch`
创建分支：`git branch <name>`
切换分支：`git checkout <name>`或者`git switch <name>`
创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`
合并某分支到当前分支：`git merge <name>`
删除分支：`git branch -d <name>`
查看远程库信息，使用`git remote -v`；
本地新建的分支如果不推送到远程，对其他人就是不可见的；
从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

[<font color="#e36c09">git 常用命令汇总</font>](https://liaoxuefeng.com/books/git/conclusion/git-cheat-sheet.pdf)

