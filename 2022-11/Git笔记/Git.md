

# Git

```git
git init 把本地文件夹变得git可以管理仓库
git add 文件名  把文件加入仓库
git commit -m "对本次提交的描述" 对本次提交修改的描述
```

#### git status

```git
git status  查看仓库状态
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
readme.txt文件已经被修改了
```

#### git diff

```git
git diff 文件名
diff --git a/readme.txt b/readme.txt
index 46d49bf..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software.
查看文件之间的修改，也就是查看difference
```

**提交步骤：1 git add 文件名，2 git status查看仓库状态 ，3 git commit -m “提交信息” **

#### git log

```git
git log 查看历史提交记录
commit e32d25c4c5557e2e7937e7dbfb9ad795002b6bf2 (HEAD -> master)
Author: Sfixy <chaoranff@163.com>
Date:   Sat Oct 10 20:43:12 2020 +0800

    appand GPL

commit 8c2f53a7811d383ae9258fb289ea8877c9f70804
Author: Sfixy <chaoranff@163.com>
Date:   Sat Oct 10 15:31:10 2020 +0800

    add distributed

commit b9ad630348f8c8deaf311f56fb8a8a8da74ed4bb
Author: Sfixy <chaoranff@163.com>
Date:   Sat Oct 10 15:24:09 2020 +0800

    wrote a readme file
三次提交记录

git log --pretty=oneline 简便查看历史记录
e32d25c4c5557e2e7937e7dbfb9ad795002b6bf2 (HEAD -> master) appand GPL
8c2f53a7811d383ae9258fb289ea8877c9f70804 add distributed
b9ad630348f8c8deaf311f56fb8a8a8da74ed4bb wrote a readme file

前面的一段是commit id（版本号）
这里HEAD是当前版本的文件，HEAD^上一个版本，HEAD^^是上上个版本，100个版本HEAD~100
```

#### git reset

```git
git reset --hard HEAD^ 回退到上一个版本
```

#### cat 文件名

查看文件内容

#### 回退到未来的版本

```git
λ git log
commit 8c2f53a7811d383ae9258fb289ea8877c9f70804 (HEAD -> master)
Author: Sfixy <chaoranff@163.com>
Date:   Sat Oct 10 15:31:10 2020 +0800

    add distributed

commit b9ad630348f8c8deaf311f56fb8a8a8da74ed4bb
Author: Sfixy <chaoranff@163.com>
Date:   Sat Oct 10 15:24:09 2020 +0800

    wrote a readme file
```

**上一个版本已经不能查看，不过只要上一个查看界面没关闭，就可以根据commit id返回未来的版本**



head指针指向版本

![1602335613810](C:\Users\FCR\AppData\Roaming\Typora\typora-user-images\1602335613810.png)

```git
git reset --hard 1094a(版本号)
```

#### git reflog

```git
git reflog   用来记录每一次命令
e32d25c (HEAD -> master) HEAD@{0}: reset: moving to e32d
8c2f53a HEAD@{1}: reset: moving to HEAD^
e32d25c (HEAD -> master) HEAD@{2}: commit: appand GPL
8c2f53a HEAD@{3}: commit: add distributed
b9ad630 HEAD@{4}: commit (initial): wrote a readme file
```

#### git checkout -- file

```git
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
```

**工作区的修改全部撤销**

**--很重要，没有--就变成切换成另一个分支的命令**

#### git reset HEAD <file>

**用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区**

#### SSH密钥

**`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。**

#### 远程库的名字就是`origin`

#### 关联远程仓库

```git
git remote add origin SSH Key  本地仓库连接远程仓库
git branch -M main 切换分支
git push -u origin main 本地仓库的内容推到远程仓库
```

**加上了`-u`参数，Git不但会把本地的`main`分支内容推送的远程新的`main`分支，还会把本地的`main`分支和远程的`main`分支关联起来，在以后的推送或者拉取时就可以简化命令。**

**此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；**

