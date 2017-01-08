首先非常感谢您，讲的特别好，一个下午让我清楚的学习了git, 谢谢你！


##git基础
1> 初始化一个Git仓库

```
git init
```

2> 添加文件到Git仓库，可以反复多次使用，添加多个文件；

```
git add <file>
```

3> 完成，添加注释

```
git commit
```
4> 要随时掌握**工作区**的状态，

```
git status
```
5> 如果git status告诉你文件被修改过，查看修改的内容使用

```
git diff
```
6> **HEAD**指向的版本就是当前的版本，因此，Git允许我在版本的历史之间穿梭，使用如下命令

```
git reset --hard commit_id
```
7> 穿梭前，可以查看提交历史，以便确定要退回到哪个版本

```
git log
```
8> 要重返未来，可以查看命令历史，以便确定要回到未来哪个版本

```
git reflog
```
9> **工作区和暂缓区的区别**
（1）工作区就是你在电脑里能看到的目录；
（2）工作区中的一个隐藏目录 .git 是Git的版本库，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD

10> Git跟踪并管理的是修改，而非文件，每次修改，如果不add到暂存区，那就不会加入到commit中。

11> 撤销修改
（1）当修改错了工作区的某个文件内容时，想直接丢弃工作区修改时，使用命令

```
git checkout -- file
```
**注意： -- 前后都有空格** 

（2） 当修改错了工作区某个文件的内容，还使用了`git add`将文件添加到了暂存区时，想丢弃修改，使用命令

```
git reset HEAD <file>
```
就可以回到（1），在按照（1）的操作即可！
（3）当使用了`git commit`将文件提交到了分支，没有提交到远程仓库，想丢弃修改时，使用版本回退 `git reset --hard commit_id`！

12> 想要删除文件使用

```
git rm
```
如果想要恢复本地被删除的文件，但是版本库中有可以使用`git checkout -- file`

##远程
1> 要关联一个远程库，使用命令

```
git remote add origin git@server-name:path/repo-name.git
```
2> 关联后，要将master分支中的内容提交到远程库，使用命令

```
git push -u origin master
```

**分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步 !**

3> 要克隆一个仓库，首先必须知道仓库的地址，

```
git clone git@server-name:path/repo-name.git
```

Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

##分支
1> 创建分支

```
git branch <name>
```
2> 切换分支

```
git checkout <name>
```
上面的两步可以合成一步完成，创建+分支

```
git checkout -b <name>
```
3> 查看分支

```
git branch
```
***name 标出的表示当前所在分支**

4> 合并某个分支到当前分支

```
git merge <name>
```
5> 删除分支

```
git branch -d <name>
```
6> 当Git无法自动合并分支时，必须先解决冲突，然后在提交，完成合并。

```
git log --graph
```
可以查看分支合并图，要看简洁的图可以使用下面的命令：

```
git log --graph --pretty=oneline --abbrev-commit
```

7> 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

8>**bug分支** 
修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场存储一下，

```
git stash
```

然后去修复bug，修复后，回到工作现场，使用

```
git stash pop
```
回到工作现场，并且把stash内容也删了。要查看工作现场可以使用命令：

```
git stash list
```

9> **featrue分支**
开发一个新feature，最好新建一个分支；
如果要丢弃一个没有被合并过的分支，可以强行删除:

```
git branch -D <nmae>
```

10>**多人协作**
（1）查看远程库的信息，使用

```
git remote -v
```
（2）本地新建的分支如果不推送到远程，对其他人就是不可见的；
（3）从本地推送分支，使用

```
git push origin <branch-name>
```
如果推送失败，先使用`git pull`抓取远程的新的提交内容；
（4）在本地创建和远程分支对应的分支，使用命令

```
git checkout -b <branch-name> origin/<branch-name>
```
本地和远程分支的名称最好一致；建立本地分支和远程分支的关联，使用

```
git branch --set-upstream <branch-name> origin/<branch-name>
```
上面的命令已经过时了，不过还可以用

```
git branch --set-upstream-to=origin/<branch-name> dev
```

（5）从远程抓取分支，使用

```
git pull
```

如果有冲突，要先处理冲突。


## 标签
发布一个版本时，我们通常先在版本库中打一个标签，这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。

Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。

1> 新创建一个标签

```
git tag <tag-name>
```
默认为HEAD， 也可以指定一个commit id；
2> 指定标签信息:

```
git tag -a <tagname> -m "abc"
```
3> 用PGP签名标签:

```
git tag -s <tagname> -m "abc"
```
4> 查看所有标签

```
git tag
```

5> 推送一个本地标签到远程仓库：

```
git push origin <tag-name>
```
6> 推送全部没有推送的本地标签：

```
git push origin --tags
```
7> 删除一个本地标签：

```
git tag -d <tag-name>
```
8> 删除一个远程标签：

```
git push origin :refs/tag/<tag-name>
```

