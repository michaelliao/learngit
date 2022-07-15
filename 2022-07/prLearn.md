> 开发利器---分支

[toc]

#### 概念

在开发项目时,如果突然需要开发一个新功能,需要两周来完成,第一周完成了50%,如果提交,因为代码不完善,提交之后,会影响同事的工作.

以廖老师的学习Git和SVN的例子举例,你想学习Git和SVN,但是无法同时学习,这时候就可以开两个平行宇宙(分支),当两个都学习完时,合并.

![2](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/2.png)

- 与其它版本控制系统不同,无论创建、切换和删除分支，Git在1秒钟之内就能完成！无论你的版本库是1个文件还是1万个文件。

#### 创建与合并分支

`master`分支,`HEAD`指向的具体含义:

- `HEAD`指向当前分支,即`master`分支,`master`指向提交

![10](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/10.png)

##### 创建分支:

```
 $ git switch -c dev
Switched to a new branch 'dev'

-c代表创建
```

![11](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/11.png)

##### 查看分支:

```
$ git branch
* dev
  master
```

##### 修改dev分支

```
$ git add .
 
$ git commit -m "remove"
[dev d6e9d2e] remove
 1 file changed, 2 deletions(-)
```

![3](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/3.png)

##### 切换回主分支并合并

```
$ git switch master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

$ git merge dev
Updating 5e59ec8..d6e9d2e
Fast-forward
 readme.md | 2 --
 1 file changed, 2 deletions(-)
```

![4](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/4.png)

##### 删除分支

```
$ git branch -d dev
Deleted branch dev (was d6e9d2e).

$ git branch
* master
```

![5](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/5.png)

##### 小结:

Git鼓励大量使用分支

#### 解决冲突

##### 合并冲突原因:

- 合并冲突最主要的原因是在<mark>同一行</mark>有<mark>不同</mark>的修改

##### 新建`feature1`分支并修改最后一行:

```
$ git switch -c feature1
Switched to a new branch 'feature1'

$ git add .

$ git commit -m "add feature1"
[feature1 78c48d4] add feature1
 1 file changed, 2 insertions(+)

```

##### 切换到`master`分支并修改最后一行:

```
$ git switch master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

$ git add .

$ git commit -m "add master"
[master b386d88] add master
 1 file changed, 2 insertions(+)
```

##### 尝试合并:

```
$ git merge feature1
Auto-merging readme.md
CONFLICT (content): Merge conflict in readme.md
Automatic merge failed; fix conflicts and then commit the result.
```

![6](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/6.png)

提示错误了,我们看看`readme.md`文件

![image-20220714195934241](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220714195934241.png)



```
<<<<<<< HEAD
master  // 是当前分支的内容
=======
feature1 // 是被合并分支的内容
>>>>>>> feature1
```

- 出现合并冲突时,Git会在文件中标注哪里冲突,需要我们手动解决冲突

- 这次冲突的出现就是:在同一行有不同的修改
- 我们将上面的内容只保留master

![image-20220714200357351](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220714200357351.png)

提交:

```
$ git add .

$ git commit -m "fix"
[master de04e9f] fix

注意不同点:
提交前: /webLearn (master|MERGING)
提交后: /webLearn (master)
```

![7](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/7.png)

##### 放弃合并

当然也有放弃合并的方法:

```
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   readme.md

no changes added to commit (use "git add" and/or "git commit -a")
```

` (use "git add <file>..." to mark resolution)`命令就是放弃合并的命令

##### 分支合并图

`git log --graph`

![](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220714201115044.png)

#### 分支管理策略

##### `--no-ff`模式

合并分支时,Git会尽可能的使用`Fast forward`模式,这种模式非常快,因为仅仅只是修改一下指针,而这个模式的副作用是:一旦删除,分支信息就会被丢弃,相当于分支什么痕迹也没留下了.

参考:

用dev提交修改,然后``Fast forward`合并到master分支后,可以看到这时的分支,其实只是一个指针

![4](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/4.png)

一旦删除:

![5](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/5.png)

![image-20220715184823506](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220715184823506.png)

dev分支的信息啥也没了,某些场景下,我们不希望这样,就有了`--no-ff`模式

展示:

```
$ git switch -c dev

$ git add .

$ git commit -m "remove dev"
[dev a4cc933] remove dev
 1 file changed, 2 deletions(-)

$ git switch master
Switched to branch 'master'

$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'ort' strategy.
 readme.md | 2 --
 1 file changed, 2 deletions(-)
 
 $ git log --graph --pretty=oneline --abbrev-commit
*   ad18e2e (HEAD -> master) merge with no-ff
|\
| * a4cc933 (dev) remove dev
|/
* 791da3b add dev
...
```

分支图就变成了:

![8](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/8.png)

可以这样理解:

`--no-ff`模式下,`master`分支new了一个和`dev`分支一样的提交,并指向这个提交,而不是原来的直接修改指针.

##### 分支策略:

很多文章都是参考这篇文章[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

![9](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/9.png)

#### Bug分支

`git stash`可以把工作现场储存起来,当需要立刻处理另外的Bug,但不适合提交的时候,可以用这个命令.

当需要恢复时,`git stash list`查看stash列表,使用`git stash pop`恢复现场并删除stash

`git stash pop`出现问题时:

- `git stash pop`冲突,`git stash list`中的记录不会自动删除

使用`git stash`代码的时候,如果出现冲突,系统会认为`stash`没有结束

就会出现代码已经`pop`出来了,但是`git stash list`中没有删除

解决方法:

- 打开冲突文件,解决冲突
- 提交
- 删除stash, `git stash drop <stash@{id}>`,如果不加编号,默认删除最新的
- `git stash clear`,清除satash

#### 单独复制提交

想单独复制某次修改怎么操作,如在`dev`分支的修改,在`master`分支也进行一次

`git cherry-pcik`命令:

```
$ git cherry-pick 798033f
[master d31baf3] remove
 Date: Fri Jul 15 19:12:41 2022 +0800
 1 file changed, 2 deletions(-)
```

#### 强行删除

`git branch -D <name>`

Git的分支在没有被合并过时,是无法删除的,如果一定要删除,就用强行删除命令

#### 多人协作

查看远程库信息 `git remote`

```
$ git remote
gitee
github
```

更加详细`git remote -v`

```
$ git remote -v
gitee   git@gitee.com:ICZKL/webLearn.git (fetch)
gitee   git@gitee.com:ICZKL/webLearn.git (push)
github  git@github.com:taroandpuff/webLearn.git (fetch)
github  git@github.com:taroandpuff/webLearn.git (push)
```

##### `git push`操作

```
git push <远程主机名> <本地分支名>:<远程分支名>

如果本地分支名与远程分支名相同，则可以省略冒号：
git push <远程主机名> <本地分支名>

$ git push github master
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 16 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 769 bytes | 769.00 KiB/s, done.
Total 8 (delta 5), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (5/5), completed with 2 local objects.
To github.com:taroandpuff/webLearn.git
   698c57f..d31baf3  master -> master
```

##### `git pull`操作

```
git pull <远程主机名> <远程分支名>:<本地分支名>
同样可以忽略冒号

$ git pull gitee master
From gitee.com:ICZKL/webLearn
 * branch            master     -> FETCH_HEAD
Already up to date.
```

#####`git clone`注意点:

```
$ git clone git@github.com:taroandpuff/webLearn.git
Cloning into 'webLearn'...
remote: Enumerating objects: 86, done.
remote: Counting objects: 100% (86/86), done.
remote: Compressing objects: 100% (44/44), done.
remote: Total 86 (delta 45), reused 76 (delta 36), pack-reused 0
Receiving objects: 100% (86/86), 7.79 KiB | 3.89 MiB/s, done.
Resolving deltas: 100% (45/45), done.

$ cd webLearn

$ git branch
* master
```

默认情况下，只能看到本地的`master`分支,如果需要在`dev`上开发,需要创建远程仓库的`dev`到本地

```
$ git checkout -b dev origin/dev
Switched to a new branch 'dev'
branch 'dev' set up to track 'origin/dev'.
```

##### 多人协作模式

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

#### 分支策略注意点

多人协作时的分支管理:

- 本地master分支和远程master分支同步，本地dev和远程dev同步
- 切忌本地master同步远程dev,会把自己绕进去