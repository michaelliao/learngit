### Git

---

[参考原文廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)

#### 简介

> Git 分布式版本控制系统，由Linus创造。

##### 集中式vs分布式

集中式是将版本集中存放在中央服务器，使用时需先联网从中央服务器中获取最新的版本。

分布式版本控制则没有中央服务器，每个人的电脑都是一个完整的版本库。

#### 安装Git

##### Linux

```shell
sudo apt-get install git
```

##### Win

[官网](https://git-scm.com/downloads)下载安装

安装完成后需要设置用户名和email，打开`Git bash`，在命令行中输入：

```bash
git config --global user.name "Your name"
git config --global user.email "Your email"
```

> 注：`--global`参数，代表这台电脑上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和email地址

#### 创建版本库

> 版本库（repository），可以简单理解成一个目录，这个目录里面的所有文件都可以被git管理，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史遗迹还原。

##### 步骤

1. 创建版本库，首先选择一个合适路径，在路径下开启git bash

   ```bash
   $ mkdir demo
   $ cd demo
   ```

   > 注：若使用win系统，为了避免问题，目录名尽量不包含中文

2. 通过 `git init` 命令可以把目录变成Git可以管理的版本库

   ```bash
   $ git init
   $ Initialized empty Git repository in XXX/demo/.git/
   ```
   
   仓库建好之后，会提示是一个empty Git repository，目录中会多出一个 **.git**的目录（隐藏目录），这是Git原来跟踪管理版本库的，不能随意修改。

   注：所有的版本控制系统，其实只能跟踪文本文件的改动，比如TXT、HTML、code文件等。版本控制系统可以告诉你每次的改动，比如在第几行增加或减少什么单词。而图片、视频这些二进制文件，没法跟踪文件的具体变化，只知道文件的大小发生了变化。
   
   而word是二进制文件，所以Git是不能跟踪word文档的改动。首先文本是由编码的，中文常见的由GBK编码，建议使用标准的UTF-8编码，所有的语言统一使用UTF-8。所有的平台都能够支持。
   
   Win系统不建议使用记事本来编辑任何文件，记事本保存UTF-8会在每个文件的开头添加0xefbbf（十六进制）的字符，会导致各种问题。建议使用[Notepad++](https://notepad-plus-plus.org/)，并将默认编码设置为UTF-8 without BOM。
   
3. 编写一个readme.txt文件（内容任意）必须放入demo目录下（根目录或子目录）

   ```
   hello Git!
   ```

4. 将编写好的文件放入Git仓库

   ```bash
   $ git add readme.txt
   
   $ git commit -m "wrote a readme file"
   [master (root-commit) c4753e1] wrote a readme.txt file
    1 file changed, 1 insertion(+)
    create mode 100644 readme.txt
   ```

   > `git commit`: -m后面输入的是对本次提交的一个说明
   >
   > `git add A.XXX B.XXX ...` 可以一次提交多个文件，也可反复使添加文件，最后commit一次提交所有的文档
   >
   > 1 file changed: 一个文件被改动
   >
   > 1 insertion: 插入一行内容

5. 再次修改readme文档

   ```
   Hello Git!
   Let's do it!
   ```

   ```bash
   $ git status
   On branch master
   Changes not staged for commit:
     (use "git add <file>..." to update what will be committed)
     (use "git restore <file>..." to discard changes in working directory)
           modified:   readme.txt
   
   no changes added to commit (use "git add" and/or "git commit -a")
   ```

   使用`git status` 可以掌握仓库当前的状态，上面的命令输出代表，readme被修改，但是还没有准备提交的修改，使用`git restore` 可以退回修改前的版本。

   ```bash
   $ git diff
   diff --git a/readme.txt b/readme.txt
   index fdc3d3c..6945b16 100644
   --- a/readme.txt
   +++ b/readme.txt
   @@ -1 +1,2 @@
   -Hello Git!
   \ No newline at end of file
   +Hello Git!
   +Let's do it!
   \ No newline at end of file
   ```

   使用 `git diff` 可以查看修改前后的不同

   对文档做出修改后，再提交给仓库，步骤与提交新文件一致。

   ```bash
   $ git add readme.txt
   
   $ git commit -m "add sth"
   [master cd0ef31] add sth
    1 file changed, 2 insertions(+), 1 deletion(-)
   ```

6. 不断的修改文件，再不断的 add和 commit，而每commit一次仓库就会保存一个快照，丢失了文件可以以最近的一个commit进行恢复。

   ```bash
   $ git log
   commit cd0ef3118ae70d8e950040e40a4a9d48e070b849 (HEAD -> master)
   Author: Guhua <ttscj_chen@foxmail.com>
   Date:   Tue May 5 22:46:13 2020 +0800
   
       add sth
   
   commit c4753e1cbac5832ae9a7da97f036fd61bbf27dff
   Author: Guhua <ttscj_chen@foxmail.com>
   Date:   Tue May 5 22:32:00 2020 +0800
   
       wrote a readme.txt file
       
   $ git log --pretty=oneline
   cd0ef3118ae70d8e950040e40a4a9d48e070b849 (HEAD -> master) add sth
   c4753e1cbac5832ae9a7da97f036fd61bbf27dff wrote a readme.txt file
   ```

   使用 `git log` 可以看到更改文件的历史纪录和时间.

   后面添加参数 `--pretty=oneline`可以更加简洁的看历史变更。前面的一大串数字是commit id（版本号），是一个SHA1计算出来的，由十六进制表示。其中HEAD表示当前的版本，即最新的版本，再上一个版本就是`HEAD^`，上上个就是`HEAD^^`，也可以使用`HEAD~NUM`(NUM代表往上多少个版本)。

   ```bash
   $ git reset --hard HEAD^
   bash: $: command not found
   ```

   使用 `git reset` 回退版本。

   ```bash
   $ git log
   commit c4753e1cbac5832ae9a7da97f036fd61bbf27dff (HEAD -> master)
   Author: Guhua <ttscj_chen@foxmail.com>
   Date:   Tue May 5 22:32:00 2020 +0800
   
       wrote a readme.txt file
   ```

   使用`git log`观察版本库的状态，可以发现add sth那个版本已经不见了。如果这时想回到add sth的版本可以往前找到其commit id

   ```bash
   $ git reset --hard cd0ef3118ae70d8e950040e40a4a9d48e070b849
   HEAD is now at cd0ef31 add sth
   ```

   > 版本号没必要写全，前几位就行，Git会自动去寻找
   >
   > Git的版本回退速度很快，是因为Git在内部有个指向当前版本的`HEAD`指针，当你回退回退版本的时候，Git仅仅是把`HEAD`指向了 add sth 

   若找不到id可以使用`git reflog`，会记录你每次命令

   ```bash
   $ git reflog
   cd0ef31 (HEAD -> master) HEAD@{0}: reset: moving to cd0ef3118ae70d8e950040e40a4a9d48e070b849
   c4753e1 HEAD@{1}: reset: moving to HEAD^
   cd0ef31 (HEAD -> master) HEAD@{2}: commit: add sth
   c4753e1 HEAD@{3}: commit (initial): wrote a readme.txt file
   ```

##### 工作区和暂存区

> Git和其他版本控制系统如SVN的一个不同之处就是由暂存区的概念

**工作区（working directory）**

就是当前目录，比如`demo`文件夹就是一个工作区

**版本库（repository）**

工作区有一个隐藏目录`.git`，这个不算是工作区，而是Git的版本库

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git自动创建的第一个分支`master`，以及指向`master`的一个指针`HEAD`

![image-20200506190011155](https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506190011155.png)

将文件往Git版本库添加的时候，是分两部执行的：

1. `git add`：实际上就是把文件修改添加到暂存区
2. `git commit`：提交更改，实际上就是把暂存区的所有内容提交到当前分支

在我们创建Git版本库时，Git自动为我们创建了一个`master`分支，所以`git commit`就是往`master`分支上提交更改

**Q1：为什么Git比其他版本控制系统设计得优秀？**

> 因为Git跟踪并管理的是修改，而非文件。具体情况我们来实验一下。

第一步，对readme进行修改，加了两行内容。

```bash
$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
```

然后，添加readme

```bash
$ git add readme.txt

$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   readme.txt
```

然后再次修改readme，并提交

```bash
$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
Cool!

$ git commit -m readme.txt
[master a090910] readme.txt
 1 file changed, 3 insertions(+), 1 deletion(-)

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

可以看到第二次修改并没有被提交，是因为第二次修改并没有放入暂存区，而`git commit`只会将暂存区的修改提交到分支。提交后可以使用 `git diff HEAD -- readme.txt`查看工作区和版本库里面最新版本的区别。

```bash
$ git diff HEAD -- readme.txt
diff --git a/readme.txt b/readme.txt
index 992123b..6ee0c52 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,5 @@
 Hello Git!
 Let's do it!
 Git has a mutable index called stage.
-Git tracks changes of files.
\ No newline at end of file
+Git tracks changes of files.
+Cool!
\ No newline at end of file
```

##### 还原文档

在修改文档之后，发现有错误修改。但是**还未提交**，可以手动修改文档，也可以使用 `git restore`

```bash
$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
How can we restore the file?

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

可以看到 Git 提示使用 `git restore`可以丢弃工作区的更改

```bash
$ git restore readme.txt

$ git status
On branch master
nothing to commit, working tree clean
```

但是如果我们已经将文件**提交到暂存区**怎么办呢？

```bash
$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
How can we restore the file?

$ git add readme.txt

$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   readme.txt
```

可以看到Git提示我们可以使用 `git restore --stage filename`去将文件unstage相当于取消提交的操作，将文件从暂存区中取出。而此时文件内容实质并未改变，再一次使用 `git restore`就可以恢复文件到最新的状态。

```bash
$ git restore --stage readme.txt

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
How can we restore the file?
```

**小结**

1. 修改文档之后想直接丢弃工作区文档的修改内容，可以使用`git restore`
2. 修改文档并提交到了暂存区，想丢弃修改，分为两步，第一步命令`git restore --stage <file>`，第二步命令如1一致
3. 修改文档后并提交到了版本库，想要撤销本次提交，使用 `git reset --hard HEAD^`

##### 删除文档

建立新文档并提交到版本库后，删除了该文档，使用 `git status`会告诉你哪些文档被删除了，有两个选择：一是从版本库中删除该文件，用 `git rm <file>`，并且 `git commit`
二是从版本库中恢复该文件 `git restore <file>`

```bash
$ touch test.txt

$ git add test.txt

$ git commit -m "add test.txt"
[master 78fc447] add test.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 test.txt

$ rm test.txt

$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git rm test.txt
rm 'test.txt'

$ git commit -m "remove test.txt"
[master 9341e91] remove test.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 test.txt

$ git status
On branch master
nothing to commit, working tree clean
```

#### 远程仓库

这里使用Github作为远程仓库，先注册Github账号，需要配置SSH key。[官方文档](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

##### SSH keys配置

1. 检查电脑是否由SSH Key

   `~/.ssh` 或者 `~/.ssh ls` ，如果由就会返回 is a directory，没有就会返回 No such file...

   ![image-20200506185651731](https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506185651731.png)

2. 如果没有就需要创建SSH key

   在git bash中输入 `ssh-kengen -t rsa -C "your email"`

   会提示你输入文件名，一般不需要输入，直接回车，就会生成`id_rsa`和`id_rsa.pub`两个文件。
   其中`id_rsa`是私钥 `id_rsa.pub`是公钥，私钥一般不能随意泄露，而公钥可以随意告诉任何人

   之后会提示你输入密码，建议无须设置，直接回车。

3. 添加SSH key到Github

   打开GitHub网页在个人settings中找到SSH and GPG keys，点击New SSH key

   Title随意取，文本框中复制`id_rsa.pub`中的内容

4. 测试，在bash中输入 `ssh -T git@github.com`，第一次会提示你是否建立选择yes，成功之后会输出以下提示。

   ![image-20200506184433323](https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506184433323.png) 

> 为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。
>
> 当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。
>
> Github免费托管Git库，但是任何人都能看见，只有自己能修改。

##### 添加远程库

1. 先在GitHub新建一个repository

   <img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506185609614.png" alt="image-20200506185609614"  />

   创建好之后，Github会提示你，可以创建一个新的仓库，也可以与现有的本地仓库关联

   <img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506190156336.png" alt="image-20200506190156336" style="zoom: 80%;" />

   

2. 将本地仓库与GIthub关联，Guuhua需要换成自己的用户名

   ```bash
   git remote add origin git@github.com:Guuhua/learngit.git
   ```

   其中origin就是远程库的名字，这是Git默认的叫法，可以修改

3. 推送本地库的所有内容到远程库上

   ```bash
   $ git push -u origin master
   Enumerating objects: 18, done.
   Counting objects: 100% (18/18), done.
   Delta compression using up to 8 threads
   Compressing objects: 100% (13/13), done.
   Writing objects: 100% (18/18), 1.54 KiB | 525.00 KiB/s, done.
   Total 18 (delta 3), reused 0 (delta 0), pack-reused 0
   remote: Resolving deltas: 100% (3/3), done.
   To github.com:Guuhua/learngit.git
    * [new branch]      master -> master
   Branch 'master' set up to track remote branch 'master' from 'origin'.
   ```

   `git push`实际上是把当前分支`master`推送到远程

   由于第一次推送`master`分支，加上`-u`参数，Git不但会把本地的`master`分支内容推送到远程新的`master`分支上，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或拉取时就可以简化命令为 `git push origin master`

#### 分支管理

##### 创建与合并分支

每次提交，Git会把提交的版本串成一条时间线，这条时间线就是一个分支，截止到目前，只有一条时间线，在Git里这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向版本文件，而是指向`master`，而`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

一开始`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506223750801.png" alt="image-20200506223750801" style="zoom:50%;" />

每次提交，`master`分支都会向前移动一步，随着不断的提交，`master`分支的线也越来越长。

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506224115248.png" alt="image-20200506224115248" style="zoom:50%;" />

这就是为什么Git创建一个分支很快的原因，Git只是增加了一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化。

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506224431402.png" alt="image-20200506224431402" style="zoom:50%;" />

假如我们在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506224639518.png" alt="image-20200506224639518" style="zoom:50%;" />

因此Git合并分支也很快

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一个`master`分支

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200506225219372.png" alt="image-20200506225219372" style="zoom:50%;" />

**实战**

先创建`dev`分支，然后切换到`dev`分支

```bash
$ git checkout -b dev
Switched to a new branch 'dev'
```

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令

```bash
$ git branch dev
$ git checkout dev
Switched to a new branch 'dev'
```

然后可以使用`git branch`命令查看当前分支，会列出所有分支，当前使用分支前面会加上一个*号

```bash
$ git branch
* dev
  master
```

这时对`readme`进行修改，再提交

```bash
$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
How can we restore the file?
Creating a new branch is quick.

$ git add readme.txt

$ git commit -m "branch test"
[dev 2d585c8] branch test
 1 file changed, 2 insertions(+), 1 deletion(-)
```

完成`dev`分支的工作后，现在可以切换回`master`分支，可以发现刚刚做的变动消失了

```bash
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
```

现在把dev分支的工作成果合并到master分支上

```bash
$ git merge dev
Updating 9341e91..2d585c8
Fast-forward
 readme.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```

`git merge`命令用于合并指定分支到当前分支。合并后，再查看`readme.txt`的内容，就可以看到，和`dev`分支的最新提交是完全一样的

注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快

合并完成后，就可以放心地删除`dev`分支了

```bash
$ git branch -d dev
Deleted branch dev (was 2d585c8).
```

因为创建、合并和删除分支非常的快，所以Git鼓励使用分支完成某个任务，合并后再删掉分支，这和直接再`master`分支上工作效果一致，但是过程更加的安全

**切换分支--switch**

我们注意到切换分支使用 `git checkout <branch>`，而撤销更改则是 `git checkout -- <file>`

实际上，切换分支，用`switch`更科学，创建并切换新的`dev`分支如下：

```bash
$ git switch -c dev
```

切换到已有分支`master`

```bash
$ git switch master
```

##### 小结

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>` or `git switch <name>`

创建+切换分支：`git checkout -b <name>` or `git switch -c <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

#### 解决冲突

1. 准备新的 `feature1` 分支，继续新分支的开发

```bash
$ git switch -c feature1
Switched to a new branch 'feature1'
```

2. 修改`readme.txt`最后一行，改为：

```
Creating a new branch is quick & simple.
```

3. 在分支`feature1`提交，然后切换到`master`分支

```bash
$ git add readme.txt

$ git commit -m "And simple"
[feature1 09ab010] And simple
 1 file changed, 2 insertions(+), 1 deletion(-)
 
$ git switch master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
```

4. Git自动提示我们当前`master`分支比远程的`master`分支要超前一个提交

在`master`分支上把`readme.txt`文件的最后一行改为：

```
Creating a new branch is quick and simple.
```

5. 提交：

```bash
$ git add readme.txt

$ git commit -m "& simple"
[master 1e9acfc] & simple
 1 file changed, 2 insertions(+), 1 deletion(-)
```

6. 现在，`master`分支和`feature1`分支各自都分别有新的提交，变成了这样：

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200507135209915.png" alt="image-20200507135209915" style="zoom:50%;" />

7. 这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：

```bash
$ git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.
```

8. 冲突发生了，使用 `git status`也可以查看冲突，也可以直接查看readme内容：

```bash
$ git status
On branch master
Your branch is ahead of 'origin/master' by 5 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ cat readme.txt
Hello Git!
Let's do it!
Git has a mutable index called stage.
Git tracks changes of files.
How can we restore the file?
Creating a new branch is quick.
<<<<<<< HEAD
Creating a new branch is quick and simple.
=======
Creating a new branch is quick & simple.
>>>>>>> feature1
```

Git用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容，我们手动修改如下后保存：

```
Creating a new branch is qucik and simple.
```

9. 再次提交

```bash
$ git add readme.txt

$ git commit -m "confict fixed"
[master df422bb] confict fixed
```

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200507144532809.png" alt="image-20200507144532809" style="zoom:50%;" />

10. 使用 `git log`可以可能到分支的合并情况：

```bash
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

11. 最后，删除 `feature1`

```bash
$ git branch -d feature1
Deleted branch feature1 (was 1143f76).
```

##### 小结

当Git无法自动合并分支时，就必须手动解决冲突，解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

用`git log --graph`命令可以看到分支合并图。

#### 分支管理策略

> 通常，合并分支时，Git可能会用 `Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。如果要强制禁用`Fast forward`模式，Git就会再merge生成一个新的commit，这样从分支历史就可以看出分支信息。

##### 实战

1. 首先创建并切换dev分支：

   ```bash
   $ git switch -c dev
   Switched to a new branch 'dev'
   ```

2. 修改readme，并提交一个新的commit：

   ```vim
   $ git add readme.txt
   
   $ git commit -m "add merge"
   [dev 3d3a166] add merge
    1 file changed, 1 insertion(+)
   ```

3. 切换回`master`：

   ```bash
   $ git switch master
   Switched to branch 'master'
   Your branch is ahead of 'origin/master' by 7 commits.
     (use "git push" to publish your local commits)
   ```

4. 准备合并`dev`分支，请注意 `--no-ff`参数，表示禁用 `Fast forward`：

   ```bash
   $ git merge --no-ff -m "merge with no-ff" dev
   Merge made by the 'recursive' strategy.
    readme.txt | 1 +
    1 file changed, 1 insertion(+)
   ```

5. 查看分支历史：

   ```bash
   $ git log --graph --pretty=onelin --abbrev-commit
   *   bcb35a4 (HEAD -> master) merge with no-ff
   |\
   | * 3d3a166 (dev) add merge
   |/
   *   df422bb (origin/master) confict fixed
   ```

   <img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200507150654708.png" alt="image-20200507150654708" style="zoom:50%;" />

   可以看到不使用 `Fast forward`模式，merge就像这样

##### 分支策略

实际开发中，我们应当按照几个基本原则进行分支管理：

1. `master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面工作
2. 工作应当在`dev`分支上，也就是说dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本

所以，团队合作的分支看起来就像这样：

<img src="https://raw.githubusercontent.com/Guuhua/PicBed/master/imgdllwin10/image-20200507151311367.png" alt="image-20200507151311367" style="zoom:67%;" />

##### 小结

Git分支十分强大，在团队开发中应该充分应用。

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。

#### Bug分支

软件开发中，bug不可避免。有了bug当然就需要修复。在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支`issue-101`来修复它，但是，等等，当前正在`dev`上进行的工作还没有提交：

```bash
$ git status
On branch dev
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   hello.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt
```

这时工作进行到一半，还没有办法提交，预计完成还需要1天时间。但是，必须在两个小时内修复bug该怎么办？

可以用`stash`功能，把当前工作现场储藏起来，等以后恢复现场后继续工作：

```bash
$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
```

首先确定在哪个分支上修复bug，假如在`master`分支上修复，就从`master`创建临时分支：

```bash
$ git switch master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

$ git switch -c issue-100
Switched to a new branch 'issue-100'
```

现在修复bug，需要把“Git is free software ...”改为“Git is a free software ...”，然后提交：

```bash
$ git add readme.txt 
$ git commit -m "fix bug 101"
[issue-101 4c805e2] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

修复完切换到`master`分支，并完成合并，最后删除`issue-100`分支：

```bash
$ git switch master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git merge --no-ff -m "merged bug fix 101" issue-101
Merge made by the 'recursive' strategy.
 readme.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

完成之后，返回到`dev`分支工作，发现工作区clean，用`git stash list`命令查看

```bash
$ git status
On branch dev
nothing to commit, working tree clean

$ git stash list
stash@{0}: WIP on dev: 3d3a166 add merge
```

工作现场还在，Git把stash内容存在某个地方，需要恢复，有两个方法：

1. `git stash apply`：但是恢复之后，stash中的内容并不会删除，需要用`git stash drop`来删除
2. `git stash pop`：恢复的同时把stash的内容也删除了

```bash
$ git stash pop
On branch dev
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (f91f37bc6e31377f4d5a895b1d52524629d80aef)
```

允许多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：

```bash
$ git stash apply stash@{0}
```

**Q2  虽然我们在master分支上修复了bug，但是dev分支上还是存在bug，那怎么在dev分支上修复同样的bug呢？**

**A1**. 重复操作一次，再次提交

**A2**. 同样的bug，要在dev上修复，我们只需要把`4c805e2 fix bug 101`这个提交所做的修改“复制”到dev分支。注意：我们只想复制`4c805e2 fix bug 101`这个提交所做的修改，并不是把整个master分支merge过来。为了方便操作，Git专门提供了一个`cherry-pick`命令，让我们能复制一个特定的提交到当前分支：

```bash
$ git branch
* dev
  master
$ git cherry-pick 4c805e2
[master 1d4b803] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Git自动给dev分支做了一次提交，注意这次提交的commit是`1d4b803`，它并不同于master的`4c805e2`，因为这两个commit只是改动相同，但确实是两个不同的commit。用`git cherry-pick`，我们就不需要在dev分支上手动再把修bug的过程重复一遍。

##### 小结

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除

当工作进行到一半时，可以先用`git stash`，然后去修复bug，修复后，使用 `git stash pop`

在master分支修复的bug，想要合并到当前分支，可以用`git cherry-pick <commit>`，把bug提交的修改”复制“到当前分支

#### 多人协作

当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`

要查看远程库的信息，用`git remote`，详细信息 `git remote -v`

```bash
$ git remote
origin

$ git remote -v
origin  git@github.com:Guuhua/learngit.git (fetch)
origin  git@github.com:Guuhua/learngit.git (push)
```

上面显示了可以抓取和推送的 `origin`  地址。如果没有推送权限，就看不到push的地址

##### 推送分支

推送分支就是把该分支所有本地提交推送到远程库。推送时，要制定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：

```bash
$ git push origin master
```

如果要推送其他分支，比如 `dev`，就改成：

```bash
$ git push origin dev
Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 374 bytes | 374.00 KiB/s, done.
Total 4 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
remote:
remote: Create a pull request for 'dev' on GitHub by visiting:
remote:      https://github.com/Guuhua/learngit/pull/new/dev
remote:
To github.com:Guuhua/learngit.git
 * [new branch]      dev -> dev
```

但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

##### 抓取分支

多人协作时，大家都会往 `master` 和 `dev` 分支上推送各自的推送

现在，模拟一个你的小伙伴，可以在另一台电脑（注意要把SSH Key添加到GitHub）或者同一台电脑的另一个目录下克隆：

```bash
$ git clone git@github.com:Guuhua/learngit.git
Cloning into 'learngit'...
remote: Enumerating objects: 41, done.
remote: Counting objects: 100% (41/41), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 41 (delta 14), reused 39 (delta 12), pack-reused 0
Receiving objects: 100% (41/41), done.
Resolving deltas: 100% (14/14), done.
```

当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的`master`分支。不信可以用`git branch`命令看看：

```bash
$ git branch
* master
```

现在，你的小伙伴要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：

```bash
$ git checkout -b dev origin/dev
Switched to a new branch 'dev'
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
```

现在，他就可以在`dev`上继续修改，然后，时不时地把`dev`分支`push`到远程：

```bash
$ touch env.txt

$ vim env.txt

$ git add env.txt
warning: LF will be replaced by CRLF in env.txt.
The file will have its original line endings in your working directory

$ git commit -m "add env"
[dev 2f5488e] add env
 1 file changed, 1 insertion(+)
 create mode 100644 env.txt

$ git push origin dev
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 339 bytes | 339.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:Guuhua/learngit.git
   082abb1..2f5488e  dev -> dev
```

你的小伙伴已经向`origin/dev`分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：

```bash
$ git push origin dev
To github.com:Guuhua/learngit.git
 ! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to 'git@github.com:Guuhua/learngit.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用`git pull`把最新的提交从`origin/dev`抓下来，然后，在本地合并，解决冲突，再推送：

```bash
$ git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev
```

`git pull`也失败了，原因是没有指定本地`dev`分支与远程`origin/dev`分支的链接，根据提示，设置`dev`和`origin/dev`的链接：

```bash
$ git branch --set-upstream-to=origin/dev dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.

$ git pull
CONFLICT (add/add): Merge conflict in env.txt
Auto-merging env.txt
Automatic merge failed; fix conflicts and then commit the result.
```

这回`git pull`成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：

```bash
$ git add env.txt

$ git commit -m "fix env confict"
[dev a1efc07] fix env confict

$ git push origin dev
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 456 bytes | 456.00 KiB/s, done.
Total 4 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), done.
To github.com:Guuhua/learngit.git
   2f5488e..a1efc07  dev -> dev
```

##### 工作模式

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin `推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin `推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to  origin/`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

##### 小结

- 查看远程信息：`git remote -v`

- 本地新建的分支如果不推送到远程，对其他人就不可见

- 从本地推送分支，使用 `git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交
- 从本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致 （）
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

#### rebase

多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。每次合并再push后，分支变成了这样：

```bash
$ git log --graph --pretty=oneline --abbrev-commit
* d1be385 (HEAD -> master, origin/master) init hello
*   e5e69f1 Merge branch 'dev'
|\  
| *   57c53ab (origin/dev, dev) fix env conflict
| |\  
| | * 7a5e5dd add env
| * | 7bd91f1 add new env
| |/  
* |   12a631b merged bug fix 101
|\ \  
| * | 4c805e2 fix bug 101
|/ /  
* |   e1e9c68 merge with no-ff
|\ \  
| |/  
| * f52c633 add merge
|/  
*   cf810e4 conflict fixed
```

总之看上去很乱，有强迫症的童鞋会问：为什么Git的提交历史不能是一条干净的直线？

其实是可以做到的！

Git有一种称为rebase的操作，有人把它翻译成“变基”。

在和远程分支同步后，我们对`hello.py`这个文件做了两次提交。用`git log`命令看看：

#### 标签管理

发布一个版本时，通常在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。

Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。

Git有commit，为什么还要引入tag？

“请把上周一的那个版本打包发布，commit号是6a5819e...”

“一串乱七八糟的数字不好找！”

如果换一个办法：

“请把上周一的那个版本打包发布，版本号是v1.2”

“好的，按照tag v1.2查找commit就行！”

所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

##### 创建标签

在Git中打标签非常简单，首先，切换到需要打标签的分支上，然后，敲命令`git tag `就可以打一个新标签，可以用命令`git tag`查看所有标签：

```bash
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'

$ git tag v1.0
$ git tag
V1.0
```

默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？

方法是找到历史提交的commit id，然后打上就可以了：

比方说要对`add merge`这次提交打标签，它对应的commit id是`f52c633`，敲入命令：

```bash
$ git tag V0.9 f52c633

$ git tag
V0.9
V1.0
```

注意，标签不是按时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息：

```bash
$ git show V0.9
commit 3d3a16663e8c739bfe4fcfb830f5aeae0e41266e (tag: V0.9)
Author: Guhua <ttscj_chen@foxmail.com>
Date:   Thu May 7 14:57:19 2020 +0800

    add merge

diff --git a/readme.txt b/readme.txt
index 0d3216e..25818f4 100644
--- a/readme.txt
+++ b/readme.txt
@@ -5,3 +5,4 @@ Git tracks changes of files.
 How can we restore the file?
 Creating a new branch is quick.
 Creating a new branch is quick and simple.
+Branch add merge.
```

还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

```bash
$ git tag -a v0.1 -m "version 0.1 released" 1094adb
```

> 注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

###### 小结

- 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；
- 命令`git tag -a <tagname>  -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。

##### 操作标签

如果标签打错了，也可以删除：

```bash
$ git tag -d V1.0
Deleted tag 'V1.0' (was bcb35a4)
```

因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

如果要推送某个标签到远程，使用命令`git push origin <tagname> `：

```bash
$ git push origin V1.0
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 164 bytes | 164.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:Guuhua/learngit.git
 * [new tag]         V1.0 -> V1.0
```

或者，一次性推送全部尚未推送到远程的本地标签：

```bash
$ git push origin --tags
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:Guuhua/learngit.git
 * [new tag]         V0.9 -> V0.9
```

如果标签已经推送到远程，要删除远程标签会比较麻烦，先从本地删除

```bash
$ git tag -d V0.9
Deleted tag 'V0.9' (was 3d3a166)
```

然后从远程删除，删除命令也是push，格式如下

```bash
$ git push origin :refs/tags/V0.9
To github.com:Guuhua/learngit.git
 - [deleted]         V0.9
```

###### 小结

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

#### 使用GitHub

我们一直用GitHub作为免费的远程仓库，如果是个人的开源项目，放到GitHub上是完全没有问题的。其实GitHub还是一个开源协作社区，通过GitHub，既可以让别人参与你的开源项目，也可以参与别人的开源项目。

在GitHub出现以前，开源项目开源容易，但让广大人民群众参与进来比较困难，因为要参与，就要提交代码，而给每个想提交代码的群众都开一个账号那是不现实的，因此，群众也仅限于报个bug，即使能改掉bug，也只能把diff文件用邮件发过去，很不方便。

但是在GitHub上，利用Git极其强大的克隆和分支功能，广大人民群众真正可以第一次自由参与各种开源项目了。

如何参与一个开源项目呢？比如人气极高的bootstrap项目，这是一个非常强大的CSS框架，你可以访问它的项目主页https://github.com/twbs/bootstrap，点“Fork”就在自己的账号下克隆了一个bootstrap仓库，然后，从自己的账号下clone：

```
git clone git@github.com:michaelliao/bootstrap.git
```

一定要从自己的账号下clone仓库，这样你才能推送修改。如果从bootstrap的作者的仓库地址`git@github.com:twbs/bootstrap.git`克隆，因为没有权限，你将不能推送修改。

Bootstrap的官方仓库`twbs/bootstrap`、你在GitHub上克隆的仓库`my/bootstrap`，以及你自己克隆到本地电脑的仓库，他们的关系就像下图显示的那样：

```ascii
┌─ GitHub ────────────────────────────────────┐
│                                             │
│ ┌─────────────────┐     ┌─────────────────┐ │
│ │ twbs/bootstrap  │────>│  my/bootstrap   │ │
│ └─────────────────┘     └─────────────────┘ │
│                                  ▲          │
└──────────────────────────────────┼──────────┘
                                   ▼
                          ┌─────────────────┐
                          │ local/bootstrap │
                          └─────────────────┘
```

如果你想修复bootstrap的一个bug，或者新增一个功能，立刻就可以开始干活，干完后，往自己的仓库推送。

如果你希望bootstrap的官方库能接受你的修改，你就可以在GitHub上发起一个pull request。当然，对方是否接受你的pull request就不一定了。

如果你没能力修改bootstrap，但又想要试一把pull request，那就Fork一下我的仓库：https://github.com/michaelliao/learngit，创建一个`your-github-id.txt`的文本文件，写点自己学习Git的心得，然后推送一个pull request给我，我会视心情而定是否接受。

### 小结

- 在GitHub上，可以任意Fork开源仓库；
- 自己拥有Fork后的仓库的读写权限；
- 可以推送pull request给官方仓库来贡献代码。