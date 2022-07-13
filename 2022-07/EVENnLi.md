### 创建版本库

- ![微信截图_20220711090210](E:\工作室\md图包\微信截图_20220711090210.png)

  在空文件夹里git init，就会创建空的库

#### 添加文件

用notepad++编写了一个readme.txt文件，放到learnGit或其子目录下

- 用命令"**git add**"告诉git把文件添加到仓库：

  > $git add readme.txt

- 用命令**git commit**,告诉git把文件提交到仓库

  > $git commit -m"对本次提交的说明“

#### 修改文件

把文件修改一下

- 运行**git status**命令，会告诉我们文件已修改，但还没有commit

- 运行**git diff**命令，告诉我们文件具体修改了什么内容

  > $git diff readme.txt

- 开始提交修改，第一步先add

  > $jgit add readme.txt

- 再次运行**git status**命令，发现修改的文件已经在提交的修改中了

- 运行**git commit**命令，把修改的文件给提交了



#### 版本回退

再次修改我们的文件，提交。这样子文件一共有三个版本，

- 运行**git log**命令，可以查看从最近到最远的提交日志

- $ git log
  commit 7fc6454a15f5c78c57268622f8aa0cfa9bd25623 (HEAD -> master)
  Author: even li <chcpbkn@163.com>
  Date:   Mon Jul 11 09:26:52 2022 +0800

      append GPL

  commit acc7f5e056fcebbb7eb02f1206aaa69c8f3ede5d
  Author: even li <chcpbkn@163.com>
  Date:   Mon Jul 11 09:21:40 2022 +0800

      add distributed

  commit 4641ef13cf585726487e1bc52034643ec6749120
  Author: even li <chcpbkn@163.com>
  Date:   Mon Jul 11 09:12:01 2022 +0800

      wrote a readme file

- 回退版本前首先要知道当前版本是哪个。Git中用**Head**表示当前版本，上一个版本就是**HEAD^**,上上一个版本就是**HEAD^^**,往上100个版本写成**HEAD~100**

- 运行**git reset**命令回退到上一版本

  > $ git reset --hard HEAD^
  > HEAD is now at acc7f5e add distributed

- 查看文件内容，果然还原到了上一个版本。这时用**git log**查看版本记录，发现回退前的版本不见了

  > $ git log
  > commit acc7f5e056fcebbb7eb02f1206aaa69c8f3ede5d (HEAD -> master)
  > Author: even li <chcpbkn@163.com>
  > Date:   Mon Jul 11 09:21:40 2022 +0800
  >
  >     add distributed
  >
  > commit 4641ef13cf585726487e1bc52034643ec6749120
  > Author: even li <chcpbkn@163.com>
  > Date:   Mon Jul 11 09:12:01 2022 +0800
  >
  >     wrote a readme file

- 只要上面的命令行窗口还没关掉，可以顺着找到版本号，reset。版本号不用写全，前几位就可以让git自动去找 

  > $ git reset --hard 7fc6454
  > HEAD is now at 7fc6454 append GPL

- 当使用**hard**回退版本时，再想恢复到之前的版本，就必须找到其commit id。Git提供了一个命令**git reflog**记录每一次命令

  > $ git reflog
  > 7fc6454 (HEAD -> master) HEAD@{0}: reset: moving to 7fc6454
  > acc7f5e HEAD@{1}: reset: moving to HEAD^
  > 7fc6454 (HEAD -> master) HEAD@{2}: commit: append GPL
  > acc7f5e HEAD@{3}: commit: add distributed
  > 4641ef1 HEAD@{4}: commit (initial): wrote a readme file





#### 工作区和暂缓区

- **工作区**

  就是在电脑里能看到的目录，比如我的learnGit文件夹就是一个工作区

- **版本库（Repository）**

  工作区的隐藏目录，不算工作区而是git的版本库

  git版本库里存了**称为statge（或index）的暂缓区**，**自动创建的第一个分支master**，**以及指向mater的一个指针叫HEAD**

![版本库](E:\工作室\md图包\git\版本库.png)

​     **git add** 把文件添加进去，实际上就是把文件添加到暂存区；

   **git commit**提交更改，实际上就是把暂存区的所有内容提交到当前分支

- 对readme文件进行修改，再在工作区新增一个LICENSE的文本文件，瞎写

- 运行**git status**命令，告诉我们readme文件被修改了，而LICENSE文件从来没有被添加过，状态是**untracked**

  > $ git status
  > On branch master
  > **Changes not staged for commit:**
  >   (use "git add <file>..." to update what will be committed)
  >   (use "git restore <file>..." to discard changes in working directory)
  >         modified:   **readme.txt**
  >
  > **Untracked files:**
  >   (use "git add <file>..." to include in what will be committed)
  >         **LICENSE.txt**
  >
  > no changes added to commit (use "git add" and/or "git commit -a")

- 运行两次**git add**把两个文件都添加后，再次用**git status**查看一下

  > $ git status
  > On branch master
  > Changes to be committed:
  >   (use "git restore --staged <file>..." to unstage)
  >         **new file:   LICENSE.txt**
  >         **modified:   readme.txt**

现在，暂存区的状态如下：

![添加后暂存区](E:\工作室\md图包\git\添加后暂存区.png)

- **git add**命令实际上就是把要提交的所有修改放到暂存区（stage），然后执行**git commit**就可以一次性把暂存区的所有修改提交到分支

- 提交后，如果对工作区没有做任何修改，那么工作区就是干净的

  > $ git  status
  > On branch master
  > nothing to commit, **working tree clean**

- 现在版本库状态如下，暂存区没有任何内容

  ![提交后版本库](E:\工作室\md图包\git\提交后版本库.png)







#### 管理修改

**git管理的是修改，而非文件。**

- 在readme文件中增加内容，添加。

- 再次修改文件内容，直接提交

- 查看状态，发现第二次修改没有被提交，原来是第二次修改后没有添加到暂存区，故第一次修改会被提交，而第二次修改没有

  > $ git status
  > On branch master
  > Changes not staged for commit:
  >   (use "git add <file>..." to update what will be committed)
  >   (use "git restore <file>..." to discard changes in working directory)
  >         modified:   readme.txt
  >
  > no changes added to commit (use "git add" and/or "git commit -a")

- 用**git diff HEAD -- readme.txt**命令查看工作区和版本库里面最新版本的区别：

  > $ git diff HEAD -- readme.txt
  > diff --git a/readme.txt b/readme.txt
  > index 5d2dfa2..fdf9263 100644
  > --- a/readme.txt
  > +++ b/readme.txt
  > @@ -1,4 +1,4 @@
  >  Git is a distributed version control system.
  >  Git is free software distributed under the GPL
  >  Git has a mutable index called stage.
  > -Git tracks changes.
  > \ No newline at end of file
  > **+Git tracks changes of file.**
  > \ No newline at end of file





#### 撤销修改

- 修改文件瞎打一行

- 用**git status**查看一下状态

  > $ git status
  > On branch master
  > Changes not staged for commit:
  >   (use "git add <file>..." to update what will be committed)
  >   (use "git restore <file>..." to discard changes in working directory)
  >         modified:   readme.txt
  >
  > no changes added to commit (use "git add" and/or "git commit -a")

- 里面告诉我们可以用**“git restore <file>”**可以丢弃工作区的修改(**"git checkout -- file"也可以)**

  - 文件修改后没有放到暂存区，撤销修改到版本库一模一样的状态

  - 添加到暂存区后又做修改，撤回修改就回到了添加到暂存区后的状态

    总之，就是回到文件最近一次commit或add的状态

- **乱写的文件已经提交到了暂存区**

- 查看一下状态

  > $ git status
  > On branch master
  > Changes to be committed:
  >   **(use "git restore --staged <file>..." to unstage)**
  >         modified:   readme.txt

- 提醒我们用命令**“git restore --staged file"**把暂存区的修改撤销掉，重新放回工作区**（”git reset HEAD file“也可以）**

- 再次查看状态，此时暂存区是干净的，工作区有修改

  > $ git status
  > On branch master
  > Changes not staged for commit:
  >   (use "git add <file>..." to update what will be committed)
  >   (use "git restore <file>..." to discard changes in working directory)
  >         modified:   readme.txt
  >
  > no changes added to commit (use "git add" and/or "git commit -a")

- 再用restore或者checkout撤销工作区的修改





#### 删除文件

在git中，删除文件也是一个修改操作，先添加一个新文件test.txt

- 添加并提交新建的文件

- 用**rm**命令把不要的文件从工作区中删掉

  > $ rm test.txt

- 此时git知道文件被删除了，工作区和版本库不一致，查看状态

  > $ git status
  > On branch master
  > Changes not staged for commit:
  >   (use "git add/rm <file>..." to update what will be committed)
  >   (use "git restore <file>..." to discard changes in working directory)
  >         **deleted:    test.txt**
  >
  > **no changes added to commit (use "git add" and/or "git commit -a")**

  如果确实要删除的话，用命令**git rm**删掉，并且commit

  > **$ git rm test.txt**
  > rm 'test.txt'
  >
  > 
  >
  > **$ git commit -m"remove test.txt"**
  > [master 4482c4d] remove test.txt
  >  1 file changed, 0 insertions(+), 0 deletions(-)
  >  **delete** mode 100644 test.txt

  如果是删错的话，可以把误删的文件恢复到最新版本

  > $ git checkout -- test.txt

  即用版本库里的版本替换工作区里的版本。

  ***==从来没有被添加到版本库里就删除的文件，是无法恢复的！==***





### 远程仓库

换了新的电脑，要先把新电脑的SSH增加到GitHub（记得挂梯子）里

##### 添加远程库

- 现在GitHub上创建一个新的仓库叫learnGit

- > 目前里面还是空的，我们可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。根据GitHub的提示，在本地learnGit仓库下运行命令：

  > ```
  > git remote add origin https://github.com/EVENnLi/learnGit.git
  > git branch -M main
  > git push -u origin main
  > ```

  添加后，远程库的名字就是**origin**，这是git的默认叫法

- 把本地库的内容推送到远程，用**git push**命令，实际上是把当前分支**master**推送到远程。

- 由于远程库是空的，我们第一次推送**master**分支时，加上了**-u**参数，Git不但会把本地的master分支内容推送到远程的新的master分支，还会**把本地的master分支和远程的master分支关联起来**，在以后的推送或者拉取时可以简化命令

- 只要本地作了提交，就可以通过命令

  > git push origin main

  把本地master分支的最新修改推送至GitHub

  **==push的时候记得把梯子撤了，不然会超时==**

  **==上GitHub的时候再重新挂上梯子==**



##### 删除远程库

- 先用**git remote  -v**查看远程库信息：

  > $ git remote -v
  > origin  https://github.com/EVENnLi/learnGit.git (fetch)
  > origin  https://github.com/EVENnLi/learnGit.git (push)

- 然后根据名字删除，使用**git remote rm name**命令

  > $ git remote rm origin

- 此处的删除其实是**解除了本地和远程的绑定关系，并不是物理上删除了远程库**。要真正删除远程库，需要到GitHub，在后台页面找到删除按钮再删除。





##### 从远程库克隆

上一节是先有本地库，后有远程库，如何关联远程库。

假设我们从零开发，最好就是先创建远程库，然后从远程库克隆

- 先在GitHub里面创建一个新仓库，叫gitskills，默认加一个readme的文件

- 用命令**git clone**克隆一个本地库

  > $ git clone git@github.com:EVENnLi/gitskills.git
  > Cloning into 'gitskills'...
  > The authenticity of host 'github.com (20.205.243.166)' can't be established.
  > ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
  > This key is not known by any other names
  > Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  > Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
  > remote: Enumerating objects: 3, done.
  > remote: Counting objects: 100% (3/3), done.
  > remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
  > Receiving objects: 100% (3/3), done.

- 如果有多个人协作开发，那么每个人各自从远程克隆一份即可
- git支持多种协议，包括**https**，但**ssh**的速度最快





### 分支管理

#### 创建并合并分支

- master分支时一条线，Git用master指针指向最新的提交，再用HEAD指针指向master指针，确定当前分支，确定当前分支的提交点。

  ![分1](E:\工作室\md图包\git\分1.png)

每次提交，master分支就会向前前进一步，随着不断提交，master的分支越长

- 创建新的分支**dev**，即Git新创建一个指针叫dev，指向master相同的提交，**再把HEAD指向dev，就表示当前分支在dev上**

  ![分2](E:\工作室\md图包\git\分2.png)

  假如我们在dev分支上的工作完成了，就可以把dev合并到master上。

- 最简单的合并方法，就是直接把master指针指向dev指针的当前提交。

  ![分3](E:\工作室\md图包\git\分3.png)

- 合并完分支后，可以删除dev分支，即删除dev指针，删掉后就剩下了一条master分支

**实战**

- 创建**dev**分支，然后切换到dev分支

  > **$ git checkout -b dev**
  > Switched to a new branch 'dev'

  **'git checkout'**命令加上**'-b'**参数表示创建并切换相当于以下两条命令

  > **$git branch dev**
  >
  > **$git checkout dev**
  >
  > Swithched to branch 'dev'

- 用‘**git branch**'命令查看当前分支，此时会列出所有分支（我这里是dev和main），当前分支前面会标一个‘*’号

- 对readme做个修改，添加并提交

- **切换回main分支**，查看README文件发现没有在分支上添加的内容

  > **$ git checkout main**
  > Switched to branch 'main'
  > Your branch is up to date with 'origin/main'.

- 把dev分支的工作成果**合并**到master分支上

  > **$ git merge dev**
  > Updating b06d85c..59111da
  > **Fast-forward**
  >  README.md | 4 +++-
  >  1 file changed, 3 insertions(+), 1 deletion(-)

  ‘**git merge**'命令用于**合并指定分支到当前分支**。合并后，再查看README，就可以看到在dev分支上提交的内容

  ’**fast forward**‘指这次合并是“**快进模式**”，也就是直接把main指针指向dev的当前提交，所有合并速度非常快

  **==不是每次合并都能用fast-forward==**

- 合并完成后，就可以放心删除dev分支了

  > **$ git branch -d dev**
  > Deleted branch dev (was 59111da).



切换分支： **git checkout <branch>**

撤销修改：**git checkout -- <file>**

同一个命令两种作用，容易迷惑

切换分支这个动作，可以用'**switch**

- **创建并切换**到新的dev分支

  > $git switch -c dev

- **直接切换到**已有的分支，可以使用

  > $git switch main

<u>更加简单直观易懂</u>



#### 解决冲突

- 创建新的分支feature1

  > $ git switch -c feature1
  > Switched to a new branch 'feature1'

- 修改文件README的内容,并在feature1分支上提交

- **切换**的main分支

  > **$ git switch main**
  > Switched to branch 'main'
  > M       README.md
  > **Your branch is ahead of 'origin/main' by 1 commit.**
  >   (use "git push" to publish your local commits)

  git会提示当前main分支比远程的main分支要超前一个提交

  在main分支上，修改README.md，修改的内容与feature1的不同，提交。

  > **$ git commit -m"&simple"**
  > [main 58a1404] &simple
  >  1 file changed, 1 insertion(+), 3 deletions(-)

- 现在两个分支各自都有了新的提交

  ![冲突](E:\工作室\md图包\git\冲突.png)

  此时git无法执行’**快速合并**‘，只能试图把各自的修改合并起来，但这种合并就可能会有冲突

  > **$ git merge feature1**
  > Auto-merging README.md
  > **CONFLICT** (content): Merge conflict in README.md
  > Automatic merge failed; fix conflicts and then commit the result.

  果然冲突了，用’**git status**'告诉我们冲突的文件。

  > **$ git status**
  > On branch main
  > Your branch is ahead of 'origin/main' by 2 commits.
  >   (use "git push" to publish your local commits)
  >
  > You have unmerged paths.
  >   (fix conflicts and run "git commit")
  >   (use "git merge --abort" to abort the merge)
  >
  > Unmerged paths:
  >   (use "git add <file>..." to mark resolution)
  >         both modified:   **README.md****==（告诉我们这个文件存在冲突，要手动解决后再提交）==**
  >
  > no changes added to commit (use "git add" and/or "git commit -a")

- 直接查看README的内容

  > $ cat README.md
  > <<<<<<< HEAD
  > Creating a new branch is quick & simple.
  > =======
  > creating a new branch is quick AND simple.
  >
  > >>>>>>> feature1

- 修改文件后保存，提交

  > $ git commit -m"conflict fixed"
  > **[main d352c9b] conflict fixed**

- **git log**看一下分支的合并情况

  > $ git log --graph --pretty=oneline --abbrev-commit
  > *   d352c9b (HEAD -> main) conflict fixed
  > |\
  > | * 4faf5d2 AND simple
  > * | 58a1404 &simple
  > |/
  > * 59111da branch test
  > * b06d85c (origin/main, origin/HEAD) Initial commit

- 最后删除feature1分支

**==解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交==**



#### 分支管理策略

 合并分支时git会用'**Fast-forward**'模式，但这种模式下，删除分支后，会丢掉分支信息

强制禁用快速合并模式，git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

- 先**创建并切换**到dev分支

- 修改REAME文件，并提交

- **切换到main分支**

- 准备合并dev分支，'**--no-ff**'参数，表示禁用'**Fast-forward**'

  > $ git merge **--no-ff** -m"merge with no-ff" dev
  > Merge made by the 'ort' strategy.
  >  README.md | 2 +-
  >  1 file changed, 1 insertion(+), 1 deletion(-)

  因为本次合并要创建一个新的commit，所以加上'**-m**'参数，把commit描述写进去

- 用'**git log**'查看分支历史

  > $ **git log --graph --pretty=oneline --abbrev-commit**
  > *   7b4d142 (HEAD -> main) merge with no-ff
  > |\
  > | * 88cec8d (dev) add muahmuah
  > |/
  > *   d352c9b conflict fixed
  > 。。。

- 不使用快速合并模式，会保留分支历史

![no-ff](E:\工作室\md图包\git\no-ff.png)



###### **分支策略**

在实际开发中，应该按照几个基本原则进行分支管理

- master分支应该是非常稳定的，**仅用来发布新版本，平时不能在上面干活**
- **干活都在dev分支上，dev分支是不稳定的**
- 某个时候，再把**dev分支合并到master上**，**在master分支上发布新版本**
- 团队内每个人都有自己的分支，时不时往dev分支上合并即可

![分支策略](E:\工作室\md图包\git\分支策略.png)





#### Bug分支

在dev分支上工作时，突然接到一个修复bug的任务，原本来创建一个分支来修复bug，但此时dev上的工作还没有完成并提交。

Git提供了一个'**stash**'功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作

- 创建一个文件WORK，表示工作中的任务

- 用stash储藏当前工作现场**==（添加到暂存区中才能stash）==**

  > **$ git stash**
  > Saved working directory and index state WIP on main: 7b4d142 merge with no-ff

- 查看工作区，此时是干净的，可以放心地创建分支来修复bug，**==完成中的任务就不会跟修复bug的任务一起被提交啦==**

- 假定需要在main分支上修复，就从main分支上创建临时分支，创建文件fixing表示修复bug的任务。提交该文件

  > **$ git switch -c bug**
  > Switched to a new branch 'bug'
  >
  > $ **git add fixing.txt**
  >
  > $ **git commit -m"fix bug 101"**
  > [main 2e463f8] fix bug 101
  >  1 file changed, 0 insertions(+), 0 deletions(-)
  >  create mode 100644 fixing.txt

- 切换回main分支合并，并删除bug分支

  > **$ git merge --no-ff -m"merged bug fix 101" bug**
  > Merge made by the 'ort' strategy.
  >  fixing.txt | 0
  >  1 file changed, 0 insertions(+), 0 deletions(-)
  >  create mode 100644 fixing.txt

- 接下来回到dev分支干活，用‘**git stash list**'命令看看之前保存的工作现场

  > **$ git stash list**
  > stash@{0}: WIP on dev: 88cec8d add muahmuah

- 恢复工作现场有两种办法

  - 用==’**git stash apply**'==修复，恢复后stash内容仍然存在某个地方不删除，需要用'**git stash drop**'来删除
  - 用'**git stash pop**'恢复，恢复后stash的内容就删了

  > **$ git stash pop**
  > On branch dev
  > Changes to be committed:
  >   (use "git restore --staged <file>..." to unstage)
  >         new file:   WORK.txt
  >
  > Dropped refs/stash@{0} (82468596dad8c5d92390a8246af2e9ca017a461e)

  - 此时再查看stash list就看不到任何内容了

- 我们可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash

  > git stash apply stash@{0}

- 自制小图：

  ![bug分支](E:\工作室\md图包\git\bug分支.png)



**cherry pick**

main分支上有bug，意味着dev分支上有相同的bug，我们不需要在dev分支上重复操作一遍修复bug的操作。

我们把在main分支上修复bug的提交“复制”到dev分支上。**==（注，我们只想复制这个提交所做的修改，并不是把整个master分支merge过来）==**

- Git提供了"**cherry-pick**"命令，让我们能复制一个特定的提交到当前分支

- 先把当前的工作stash，再进行cherry-pick

  > **$ git cherry-pick 9764b5e**
  > [dev f82c24d] fix bug 101
  >  Date: Mon Jul 11 17:26:15 2022 +0800
  >  1 file changed, 0 insertions(+), 0 deletions(-)
  >  create mode 100644 fixing.txt

- 还原工作现场继续工作。。





#### Feature分支

为了不让实验性质的代码，搞乱主分支。每增加一个新功能，最好新建一个feature分支，在上面开发，完成后合并，再删除该feature的分支

现在要开发一个新功能vulcan

- 创建新的分支

- 开发完成后添加提交（此处新建一个vulcan文本文件，表示新功能开发任务）

- 切回dev分支准备合并

- 此时要求把新功能取消，这个分支必须就地销毁

  > **$ git branch -d feature-vulcan**
  > error: The branch 'feature-vulcan' is not fully merged.
  > If you are sure you want to delete it, run 'git branch -D feature-vulcan'.

- Git此时提醒该分支还没有被合并，如果删除将丢失掉所有修改

- 使用大写-D参数强行删除

  > **$ git branch -D feature-vulcan**
  > Deleted branch feature-vulcan (was d01dc4e).

  删除成功！





#### 多人协作

当我们从远程仓库克隆时，**Git自动把本地和master分支和远程的master分支对应起来了**，并且，远程仓库的默认名称是**origin**

- 查看远程库的信息，用'**git remote**'

  > **$ git remote**
  > origin

- 想要显示更详细的信息，用'**git remote -v**'

  > **$ git remote -v**
  > origin  git@github.com:EVENnLi/gitskills.git (fetch)
  > origin  git@github.com:EVENnLi/gitskills.git (push)

  如果没有推送权限，就看不到push的地址

  

##### 推送分支

推送分支，**就是把该分支上的所有本地提交推送到远程库**。推送时，**要指定本地分支**，这样，Git就会把该分支推送到远程对应的远程分支上：

> **$ git push origin main**
> Enumerating objects: 18, done.
> Counting objects: 100% (18/18), done.
> Delta compression using up to 8 threads
> Compressing objects: 100% (7/7), done.
> Writing objects: 100% (16/16), 1.28 KiB | 1.28 MiB/s, done.
> Total 16 (delta 2), reused 0 (delta 0), pack-reused 0
> remote: Resolving deltas: 100% (2/2), done.
> To github.com:EVENnLi/gitskills.git
>    b06d85c..802ab78  main -> main

如果要推送其他分支，比如**dev**，就改成：

> **$ git push origin dev**
> Enumerating objects: 11, done.
> Counting objects: 100% (11/11), done.
> Delta compression using up to 8 threads
> Compressing objects: 100% (6/6), done.
> Writing objects: 100% (9/9), 774 bytes | 774.00 KiB/s, done.
> Total 9 (delta 0), reused 0 (delta 0), pack-reused 0
> remote:
> remote: Create a pull request for 'dev' on GitHub by visiting:
> remote:      https://github.com/EVENnLi/gitskills/pull/new/dev
> remote:
> To github.com:EVENnLi/gitskills.git
>
>  * [new branch]      dev -> dev



**并不是一定要把本地分支往远程推送，那些分支需要推送，哪些不需要？**

- **master**分支是主分支，因此要时刻与远程同步
- **dev**分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- **bug**分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug
- **feature**分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。



##### 抓取分支

- 模拟一个你的小伙伴，在另一个目录下克隆

  > **$ git clone git@github.com:EVENnLi/gitskills.git**
  > Cloning into 'gitskills'...
  > remote: Enumerating objects: 27, done.
  > remote: Counting objects: 100% (27/27), done.
  > remote: Compressing objects: 100% (12/12), done.
  > remote: Total 27 (delta 2), reused 24 (delta 2), pack-reused 0
  > Receiving objects: 100% (27/27), done.
  > Resolving deltas: 100% (2/2), done.

- 默认情况下，只能看到本地的main分支

  > **$ git branch**
  >
  > * main

- 小伙伴要在dev分支上开发，就必须创建远程**origin**的**dev**分支到本地（**此时处在新建的目录，用cd转到刚克隆过来的本地库目录，不然无法创建远程origin分支）**

  > **$ git checkout -b dev origin/dev**
  > Switched to a new branch 'dev'
  > branch 'dev' set up to track 'origin/dev'.

- 然后在dev分支上开发，在fixing文件里瞎打点东西，添加提交，推送到远程库



- 小伙伴已经像origin/dev分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送

  > **$ git push origin dev**
  > To github.com:EVENnLi/gitskills.git
  >  ! [rejected]        dev -> dev (fetch first)
  > error: failed to push some refs to 'github.com:EVENnLi/gitskills.git'
  > hint: Updates were rejected because the remote contains work that you do
  > hint: not have locally. This is usually caused by another repository pushing
  > hint: to the same ref. You may want to first integrate the remote changes
  > hint: (e.g., 'git pull ...') before pushing again.
  > hint: See the 'Note about fast-forwards' in 'git push --help' for details.

- 推送失败，因为小伙伴的最新提交和我试图推送的提交有冲突。

- 解决办法：先用git pull把最新的提交从**origin/dev**抓下来，然后在本地合并，解决冲突再推送

  > **$ git pull**
  > remote: Enumerating objects: 5, done.
  > remote: Counting objects: 100% (5/5), done.
  > remote: Compressing objects: 100% (2/2), done.
  > remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
  > Unpacking objects: 100% (3/3), 250 bytes | 50.00 KiB/s, done.
  > From github.com:EVENnLi/gitskills
  >    f82c24d..8568af7  dev        -> origin/dev
  > There is no tracking information for the current branch.
  > Please specify which branch you want to merge with.
  > See git-pull(1) for details.
  >
  >     git pull <remote> <branch>
  >
  > If you wish to set tracking information for this branch you can do so with:
  >
  >     git branch --set-upstream-to=origin/<branch> dev

- pull失败了，原因是**没有指定本地dev分支和远程origin/dev分支的连接，根据显示，设置dev和origin/dev的链接。**

  > **$ git branch --set-upstream-to=origin/dev dev**
  > branch 'dev' set up to track 'origin/dev'.

- 再次pull

  > $ git pull
  > Auto-merging fixing.txt
  > CONFLICT (content): Merge conflict in fixing.txt
  > Automatic merge failed; fix conflicts and then commit the result.

  git pull成功，但是合并有冲突，需要手动解决，解决方法和分支管理中的解决冲突完全一样，解决后提交，再push。

> **$ git commit -m"fixed conflict"**
> [dev e3b1a28] fixed conflict
>
> **$ git push origin dev**
> Enumerating objects: 10, done.
> Counting objects: 100% (10/10), done.
> Delta compression using up to 8 threads
> Compressing objects: 100% (4/4), done.
> Writing objects: 100% (6/6), 543 bytes | 543.00 KiB/s, done.
> Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
> To github.com:EVENnLi/gitskills.git
>    8568af7..e3b1a28  dev -> dev



**==多人协作的工作模式==**通常是这样：

1. 首先，可以试图用"**git push origin <branch-name>**"推送自己的修改；

2. 如果推送失败，则因为**远程分支比你的本地更加新**，需要先用"**git pull**"试图合并；
3. 如果合并有冲突，则解决冲突并在本地提交；
4. 没有冲突或者解决掉冲突后，再用"**git push origin <branch-name>**"推送就能成功

注：如果"**git pull**"提示"**no tracking information**"，则说明本地分支和远程分支的链接关系没有创建，用命令"**git branch --set-upstream-to <branch-name> origin/<branch-name>**"



#### Rebase

多人在同一个分支上协作，容易出现冲突。就算没有冲突，后提交的人往往要先pull在本地合并，才能提交成功

每次合并再提交后，分支会分叉



- 建立两个文件夹，一个模拟自己工作，一个模拟小伙伴的工作

- 一起远程同步，现在刚好到hello文件的创建

- 小伙伴提前推送

  > $  git log --graph --pretty=oneline --abbrev-commit
  > * ==**e1e63ab (HEAD -> dev, origin/dev) add hihihi**==
  > * 1d350c1 (origin/main, main) hello init
  > * 2e334bc add my TTTTest
  > * 024e5b3 add test.txt
  > * 467e620 the second commit
  > * f81c2e7 git tracks changes
  > * 45ca417 understand how stage works
  > * 7fc6454 append GPL
  > * acc7f5e add distributed
  > * 4641ef1 wrote a readme file

- 我在本地提交了两个修改后试图提交，发现小伙伴比我先提交

  > $  git log --graph --pretty=oneline --abbrev-commit
  > * **==4d507d9 (HEAD -> dev) add author==**
  >
  > * **==624e23a add comment==**
  >
  > * 1d350c1 (origin/main, origin/dev, origin/HEAD, main) hello init
  >
  > * 2e334bc add my TTTTest
  >
  > * 024e5b3 add test.txt
  >
  > * 467e620 the second commit
  >
  > * f81c2e7 git tracks changes
  >
  > * 45ca417 understand how stage works
  >
  > * 7fc6454 append GPL
  >
  > * acc7f5e add distributed
  >
  > * 4641ef1 wrote a readme file
  >
  >   
  >
  >   **$ git push**
  >   To github.com:EVENnLi/learnGit.git
  >    ! [rejected]        dev -> dev (fetch first)
  >   error: failed to push some refs to 'github.com:EVENnLi/learnGit.git'
  >   hint: Updates were rejected because the remote contains work that you do
  >   hint: not have locally. This is usually caused by another repository pushing
  >   hint: to the same ref. You may want to first integrate the remote changes
  >   hint: (e.g., 'git pull ...') before pushing again.
  >   hint: See the 'Note about fast-forwards' in 'git push --help' for details.

- 于是pull一下，解决冲突后查看状态，发现我们本地分支比远程分支超前三个提交。

- git log一下看看

  > $  git log --graph --pretty=oneline --abbrev-commit
  > *   4818659 (HEAD -> dev) fixed conflict
  > |\
  > | * e1e63ab (origin/dev) add hihihi
  > * | 4d507d9 add author
  > * | 624e23a add comment
  > |/
  > * 1d350c1 (origin/main, origin/HEAD, main) hello init
  > * 2e334bc add my TTTTest
  > * 024e5b3 add test.txt
  > * 467e620 the second commit
  > * f81c2e7 git tracks changes
  > * 45ca417 understand how stage works
  > * 7fc6454 append GPL
  > * acc7f5e add distributed
  > * 4641ef1 wrote a readme file

  提交历史分叉了，如果现在把本地分支push到远程，会不好看

- 输入命令 '**git rebase**',解决一下冲突

  > **$  git log --graph --pretty=oneline --abbrev-commit**
  >
  > * **c7fe35a (HEAD -> dev) fixed conflict**
  > * **15fa129 fixed conflict**
  > * **e1e63ab (origin/dev) add hihihi**
  > * 1d350c1 (origin/main, origin/HEAD, main) hello init
  > * 2e334bc add my TTTTest
  > * 024e5b3 add test.txt
  > * 467e620 the second commit
  > * f81c2e7 git tracks changes
  > * 45ca417 understand how stage works
  > * 7fc6454 append GPL
  > * acc7f5e add distributed
  > * 4641ef1 wrote a readme file

  我后面的提交就都在小伙伴的提交之后了，于是理成一条直线也符号客观上的提交顺序

- ==**rebase操作可以把本地未push的分叉提交历史整理成直线**==

- ==**rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比**==





### 标签管理

发布一个版本时，通常会在版本库打一个标签，唯一确定了打标签时刻的版本

Git的标签实际上就是指向某个commit的指针。所以，创建和删除标签都可以瞬间完成。

commit号的数字过于复杂，而打标签可以清楚明了的表示这个commit。

就像身份证号和姓名



tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起

#### 创建标签

- 先切换到需要打标签的分支上，如main

- 敲"**git tag <name>**"就可以打一个新标签

  > **$ git tag v1.0**

- 用命令"**git tag**"查看所有标签

  > **$ git tag**
  > **v1.0**

- 默认标签是打在最新提交的commit上的，如果要对特定commit打上标签，首先要知道其commit号，比如我想要给 append GPL这个commit打上标签，其commit号是7fc6454

  >  git log --graph --pretty=oneline --abbrev-commit
  > * ==**1d350c1 (HEAD -> main, tag: v1.0, origin/main, origin/HEAD) hello init**==
  > * 2e334bc add my TTTTest
  > * 024e5b3 add test.txt
  > * 467e620 the second commit
  > * f81c2e7 git tracks changes
  > * 45ca417 understand how stage works
  > * **==7fc6454 append GPL==**
  > * acc7f5e add distributed
  > * 4641ef1 wrote a readme file

- 敲入命令，再查看所有标签

  > **$ git tag v0.9 7fc6454**
  >
  > **$ git tag**
  > v0.9
  > v1.0

  **==标签不是按时间顺序列出，而是按字母排序的==**

- 用"**git show <tagname**"查看标签信息

  > **$ git show v0.9**
  > commit 7fc6454a15f5c78c57268622f8aa0cfa9bd25623 (tag: v0.9, tag: show)
  > Author: even li <chcpbkn@163.com>
  > Date:   Mon Jul 11 09:26:52 2022 +0800
  >
  >     append GPL
  >
  > diff --git a/readme.txt b/readme.txt
  > index 013b5bc..c24a5f9 100644
  > --- a/readme.txt
  > +++ b/readme.txt
  > @@ -1,2 +1,2 @@
  >  Git is a distributed version control system.
  > -Git is free software.
  > \ No newline at end of file
  > +Git is free software distributed under the GPL
  > \ No newline at end of file

- 还可以创建带有说明的标签，用'**-a**'指定标签名，"**-m**"指定说明文字

  > $ git tag **==-a==** v0.1 ==**-m**=="v0.1 released" 4641ef1

- 查看标签详细信息时，可以看到说明文字

  > **$ git show v0.1**
  > tag v0.1
  > Tagger: even li <chcpbkn@163.com>
  > Date:   Tue Jul 12 10:36:35 2022 +0800
  >
  > **==v0.1 released==**
  >
  > commit 4641ef13cf585726487e1bc52034643ec6749120 (tag: v0.1)
  > Author: even li <chcpbkn@163.com>
  > Date:   Mon Jul 11 09:12:01 2022 +0800
  >
  >     wrote a readme file
  >
  > diff --git a/readme.txt b/readme.txt
  > new file mode 100644
  > index 0000000..d8036c1
  > --- /dev/null
  > +++ b/readme.txt
  > @@ -0,0 +1,2 @@
  > +Git is a version control system.
  > +Git is free software.
  > \ No newline at end of file

  #### 操作标签

  ##### 删除标签

  如果标签打错了，可以删除

  > **$ git tag -d v0.1**
  > Deleted tag 'v0.1' (was c6acbea)

  

  ##### 推送标签

  推送某个标签到远程，使用命令"**git push origin <tagname>**"

  > **$ git push origin v1.0**
  > Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
  > To github.com:EVENnLi/learnGit.git
  >
  >  * [new tag]         v1.0 -> v1.0

  或者**一次性推送全部尚未推送到远程的本地标签**

  > **$ git push origin --tags**
  > Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
  > To github.com:EVENnLi/learnGit.git
  >
  >  * [new tag]         show -> show
  >  * [new tag]         v0.9 -> v0.9

  

  ##### 删除远程标签

  先从本地删除

  > $ git tag -d show
  > Deleted tag 'show' (was 7fc6454)

  然后从远程删除，格式如下

  > $ git push origin :refs/tags/show
  > To github.com:EVENnLi/learnGit.git
  >  - [deleted]         show

  可以登陆GitHub看看是否远程删除了标签
