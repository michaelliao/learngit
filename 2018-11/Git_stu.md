## Git 学习笔记

> 感谢廖老师



**参考廖雪峰老师的 Git 教程，下面是教程链接**

[Git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)



#### 创建版本库

- 初始化一个 Git 仓库， 使用 `git init` 命令
- 添加文件到 Git 仓库，分两步：
  - 使用命令`git add <file_name>`   , 注意：可以反复多次使用，添加多个文件
  - 使用命令 `git commit -m <message>` ,   完成

#### 修改后查看

- `git status` 可以查看工作区的状态

  如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。 

#### 版本回退

- `HEAD`  指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`
- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

#### 工作区和暂存区

- 工作区：在电脑中能看到的目录就是工作区，

  暂存区：隐藏目录 `.git`  ，是Git 的版本库，其中最重要的是暂存区 stage， 还有 Git 自动创建的第一个分支 `master`， 以及 指向 `master` 的一个指针叫 `HEAD` 

  `git add`就是把修改加到暂存区

  `git commit` 提交更改，就是把暂存区的所有内容提交到当前分支

#### 管理修改

- Git追踪修改：每次修改后，如果不用 `Git add`  到暂存区，那就不会加入到 `commit`中

####  撤销修改

- 文件已修改，未add到暂存区: 

`git checkout -- file`可还原

- 文件已修改，并add到暂存区未`commit`：

  `git read HEAD file `     `git checkout -- file`可还原

#### 删除文件

- 新建一个文件并提交，然后删除工作区的文件，现在有两个选择：
  - 一是确实要从版本库中删除该文件，那就使用命令 `git rm file_name` 删掉，然后使用 `git commit ` 提交，此时，文件就从版本库中删除了
    - 使用 `git commit` 进行提交之后就不能使用 `git checkout`来恢复，不过可以使用  `git reset --hard HEAD^`   版本回滚来重新找到文件
  - 另一种情况是误删，因为已经提交到了版本库，可以把误删的文件恢复出来
    - 使用命令  `git checkout -- file_name`   
    - `git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以进行“一键还原”
- 命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**。 



#### 添加远程仓库

- 注册一个 GitHub 账号，因为本地 Git 仓库和 GitHub 仓库之间的传输是通过 SSH 加密的，所以，需要一点设置：

  1. 创建 SSH key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key ：

     `ssh-keygen -t rsa -C "youremail@example.com"`

     需要把邮件地址换成你自己的邮件地址，然后路回车，使用默认值即可，无需设置密码，如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。 

  2. 登陆GitHub，打开“Account settings”，“SSH Keys”页面： 

     然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容

- 登录，创建一个新的仓库
- 根据提示在本地的仓库下运行

>git remote add origin https://github.com/QYFabc/learngit.git

>git push -u origin master

把本地库的内容推送到远程，用 `git push`命令，实际上是把当前分支 `master` 推送到远程。

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。 

- **Git 提示fatal: remote origin already exists 错误解决办法**

1、先删除远程 Git 仓库

> git remote rm origin

2、再添加远程 Git 仓库

> git remote add origin https://github.com/QYFabc/learngit.git
>
> git push -u origin master

从现在起，只要本地作了提交，就可以通过命令：

```
$ git push origin master
```

把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！



#### 从远程库克隆

- 新建一个 gitskills 库
- 远程库建好，使用命令 `git clone` 克隆一个本地库

> $ git clone git@github.com:QYFabc/gitskills.git
> Cloning into 'gitskills'...
> remote: Counting objects: 3, done.
> remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
> Receiving objects: 100% (3/3), done.



#### 分支管理

分支就是科幻电影里面的平行宇宙，当你正在电脑前努力学习Git的时候，另一个你正在另一个平行宇宙里努力学习SVN。

如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，结果，你既学会了Git又学会了SVN！

分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

分支就是创建一份属于自己的内容，在完成时才会去提交。

使用 Git 创建、切换和删除分支，速度都会非常快。



#### 创建与合并分支

[参考文章链接](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840038939c291467cc7c747b1810aab2fb8863508000#0)

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`



#### 解决冲突

创建并切换到一个分支，切换到分支，进行修改，并在分支上提交，切换回主分支，修改并提交，此时有了两个分支都有了提交，这种情况下，Git 无法执行快速合并，会发生合并冲突：

```
$ git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.
```

此时再进行更改并提交，使用 `git log` 带参数可以查看分支的合并情况：

```
$ git log --graph --pretty=oneline
*   48f8f9145084295866fa60d6646d6ffffae6bfe5 (HEAD -> master) conflict fixed
|\
| * ac01d142d89c22935a4f629c9f554b712ee8f825 (featurel) AND simple
* | 938e790d67259a88ebc2b885761bea57301af4f3 & simple
|/
* e1cd9d452c43de5566b392f154789f1cb102e887 branch test
* 8fb274d15549396ba7eba7ee28740b42bc0ffbd3 (origin/master) delete test.txt again
* 12b4378baa621324ad95a386faa4eead536007e7 add test.txt
* 3a421a1abeab9a803cc97b67ecb7d43cd1c10a2d change files
* 772e344215644b9e17053273efbc54b704dfe293 git tracks changes
* 8a087cb81374fcd99a8cc3a601446dfc9aa55ae1 delete
* c2f15d8ceff27982b529c9b25da3ac2b75ed4907 understand how stage works
* 9893eb78ffdc85a91cb34d91164683631c671bf6 append GPL
* 366d4ead9a2a36ca0a6bb17d69b4ca98be2fb7a9 add distributed
* 604de7608464649980cd55a9081fac07d0b6f887 wrote a readme file
```

**小结**

当无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git的合并失败的文件手动编辑为我们希望的内容，再提交。

用`git log --graph`命令可以看到分支合并图产品。



#### 分支管理策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；

你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。



合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。 



#### BUG 分支

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场。

用`git stash list`命令 查看存储的工作现场



#### Feature 分支

开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。



#### 多人协作

> 多人协作的工作模式通常是这样：
>
> 1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
> 2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
> 3. 如果合并有冲突，则解决冲突，并在本地提交；
> 4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！
>
> 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。



- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。



#### Rebase

> `git rebase`
>
> - rebase操作可以把本地未push的分叉提交历史整理成直线；
> - rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。



#### 标签管理

###### 查找历史提交命令

> ```
>  git log --pretty=oneline --abbrev-commit
>  
>  git tag v0.9  f5076b77
> ```



- 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。
- 命令 `git show <tagname> `  查看标签信息



#### 操作标签

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。