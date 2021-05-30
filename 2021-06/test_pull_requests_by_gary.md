# Git Basic Skills

Notes of Git Basic Tutorial
Tutorial Link: https://www.liaoxuefeng.com/wiki/896043488029600


## 配置 Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

git config --list
```



## 创建版本库

```bash
git init

ls -ah
```



## 基础命令

```bash
git add <file>
git commit -m <message>

git status
```



## 版本回退

```bash
git log
git log --pretty=oneline
```

* `HEAD` 当前版本
* `HEAD^` 上一个版本
* `HEAD^^` 上上一个版本
* `HEAD~100`

```bash
git reset --hard HEAD^

git log
```

### 回到未来的某个版本

```bash
git reset --hard <commit_id>
git reset --hard 1094a

git reflog    # find commit id
```



## 撤销修改

注意：以下命令似乎是旧版git命令，虽然不影响使用，但建议参考`git status`的提示，使用新版命令。

### 1. 丢弃工作区的修改

```bash
git checkout -- file
git checkout -- README.md
```

两种情况: 

* 一种是`README.md`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

* 一种是`README.md`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次git commit或git add时的状态。

### 2. 丢弃暂存区的修改

用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区

```bash
git reset HEAD README.md    # 把暂存区的修改回退到工作区
```

接着，丢弃工作区的修改...

### 3. 丢弃commit

使用版本回退



## 远程仓库

### 1. Github配置 (SSH)

1. 创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。

   ```bash
   ssh-keygen -t rsa -C "youremail@example.com"
   ```

   一路回车

   * `id_rsa`是私钥
   * `id_rsa.pub`是公钥

2. 登陆GitHub，打开“Account settings”，“SSH Keys”页面。然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容。

### 2. (将已有的本地仓库)添加远程库

1. 在GitHub新建repo

2. 把一个已有的本地仓库与之关联

   在本地的仓库下运行命令

   ```bash
   git remote add origin git@github.com:XXXXXX/YYYYYY.git
   ```

   添加后，远程库的名字就是`origin` (这是Git默认的叫法)

3. （首次）把本地库的所有内容推送到远程库上

   ```bash
   git push -u origin main
   ```

   注意：由于远程库是空的，我们第一次推送`main`分支时，加上了`-u`参数，Git不但会把本地的`main`分支内容推送的远程新的`main`分支，还会把本地的`main`分支和远程的`main`分支关联起来，在以后的推送或者拉取时就可以简化命令。

4. （非首次）把本地库推送到远程库

   ```bash
   git push origin main
   ```

注意：SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可。

### 3. 删除远程库 (解除本地和远程的绑定关系)

如果添加的时候地址写错了，或者就是想删除远程库，

先用`git remote -v`查看远程库信息 (`git remote` 可查阅更简单的远程库的信息)

```bash
git remote -v
```

根据名字删除，比如删除`origin`

```bash
git remote rm origin
```

### 从远程库克隆

```bash
git clone git@github.com:XXXXX/YYYYY.git
```



## 分支管理

* `HEAD`指向当前分支 e.g. `main`

* `main`指向提交

### 1. 分支基础操作（创建与合并分支）

实战 (example)

1. 创建`dev`分支，然后切换到`dev`分支

   ```bash
   git checkout -b dev
   ```

   `git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

   ```bash
   git branch dev
   git checkout dev
   ```

2. 用`git branch`命令查看当前分支

   ```bash
   git branch
   ```

   `git branch`命令会列出所有分支，当前分支前面会标一个`*`号。

3. 切换回`main`分支

   ```bash
   git checkout main
   ```

4. `dev`分支的工作成果合并到`main`分支上

   ```bash
   git merge dev
   ```

   `git merge`命令用于合并指定分支到当前分支。

   注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。

   当然，也不是每次合并都能`Fast-forward`，我们后面会讲其他方式的合并。

5. 删除`dev`分支

   ```bash
   git branch -d dev
   
   git branch
   ```



注意：

* 创建并切换到新的`dev`分支，可以使用：

  ```bash
  git switch -c dev
  ```

* 直接切换到已有的`main`分支，可以使用：

  ```bash
  git switch main
  ```



**分支基础操作总结**：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`或者`git switch <name>`

创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

### 2. 解决冲突

`main`分支和`feature1`分支各自都分别有新的提交

![](https://www.liaoxuefeng.com/files/attachments/919023000423040/0)

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突

```bash
git merge feature1    # Git告诉我们，readme.txt文件存在冲突，必须手动解决冲突后再提交

git status    # 也可以告诉我们冲突的文件
```

注意：解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。



直接查看README.md的内容:

Git用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容

手动解决冲突后再**提交** => 现在，`master`分支和`feature1`分支变成了下图所示：

![](https://www.liaoxuefeng.com/files/attachments/919023031831104/0)

查看分支的合并情况：`git log --graph --pretty=oneline --abbrev-commit`

最后，删除`feature1`分支：`git branch -d feature1`

工作完成。

### 3. 分支管理策略 (普通模式合并)

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的**commit**，这样，从分支历史上就可以看出分支信息。

准备合并`dev`分支，请注意`--no-ff`参数，表示禁用`Fast forward`：

```bash
git merge --no-ff -m "merge with no-ff" dev
```

因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。



### 4. Bug分支 (stash功能)

```bash
git stash

# 去别的分支修bug

git stash list

# method 1
git stash apply    # 恢复，但是恢复后，stash内容并不删除
git stash drop     # 删除stash内容

# method 2
git stash pop      # 恢复的同时把stash内容也删了 (recommended)
```

你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：

```bash
git stash apply stash@{0}
```



Q: 如果在两个独立的分支上有同样的bug (e.g. `main`和`dev`上有同一bug)，且`main`上的bug已被修复，如何优雅地/简单地修复`dev`上的bug？

A: 使用`cherry-pick`命令

### 5. Feature分支 (强行删除未合并的分支)

```bash
$ git branch -d feature-vulcan
error: The branch 'feature-vulcan' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.

# Git友情提醒，feature-vulcan分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用大写的-D参数

$ git branch -D feature-vulcan
Deleted branch feature-vulcan (was 287773e).
```

开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

### 6. 多人协作

```bash
# 查看远程库的信息
git remote
git remote -v

# 推送分支
git push origin master
git push origin dev
# 不一定所有分支都要推送到远程，比如bug分支只要留在本地repo就行了
```

#### 抓取分支

多人协作时，大家都会往`master`和`dev`分支上推送各自的修改。

当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的`master`分支。不信可以用`git branch`命令看看

现在，你的小伙伴要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：

(注意：在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致)

```bash
git checkout -b dev origin/dev
# git pull #???拉取远端dev?
```

你的小伙伴已经向`origin/dev`分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送。

推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用`git pull`把最新的提交从`origin/dev`抓下来，然后，在本地合并，解决冲突，再推送。



`git pull`也失败了，原因是没有指定本地`dev`分支与远程`origin/dev`分支的链接，根据提示，设置`dev`和`origin/dev`的链接。

```bash
git branch --set-upstream-to=origin/<branch_remote> <branch_local>

git branch --set-upstream-to=origin/dev dev

git pull
```

这回`git pull`成功，但是合并有冲突，需要手动解决。



#### 多人协作小结

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

注意：可以克隆指定分支

```bash
git clone -b <branch> <remote_repo>

git clone -b BBBBBBB git@github.com:XXXXXX/YYYYYYY.git
```



#### Rebase

```bash
git rebase
```

我看不懂。。。



## 标签管理

Git的标签：指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动）

tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起

### 1. 创建标签

```bash
git checkout main

# 默认标签是打在最新提交的commit上的
# 1
git tag <name>
git tag v1.0

# 2
git tag <tag_name> <commit_id>
git tag v0.9 f52c633

# 3 创建带有说明的标签
git tag -a <tag_name> -m "blablabla..."
git tag -a v0.1 -m "version 0.1 released" 1094adb

git tag    # 查看所有标签
git show <tagname>    # 查看标签信息
```

### 2. 操作标签

删除标签

```bash
git tag -d v0.1
```

创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

如果要推送某个标签到远程，

```bash
git push origin <tag_name>
git push origin v1.0

# 一次性推送全部尚未推送到远程的本地标签
git push origin --tags
```

如果标签已经推送到远程，要删除远程标签就麻烦一点：

```bash
# 先从本地删除
git tag -d v0.9
# 然后，从远程删除
git push origin :refs/tags/v0.9
```



## 其他命令

不常用的基础命令

1. 查看修改

    ```bash
    git diff
    git diff README.md
    ```

2. 删除文件

   ```bash
   git rm <file>    # 与`git add<file>`效果一样
   ```

   

