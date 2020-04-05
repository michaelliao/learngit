#  Create repository

1. Create a empty directory.

   ```bash
   pwd
   cd xxx
   mkdir xxx
   cd xxx
   pwd
   ```

2. Use  `git init` to initialize a new git repository.

   ```
   git inti
   ```

   This command will generate a hidden folder named .git, and we can use `ls -ah` to see it in Terminal.

3. The text encoding should be consistent, and UTF-8 is strongly recommended.

4. Put the file under the git directory.

5. Use  `git add` to add the file to a git.

   ```
   git add readme.txt
   ```

   No news is good news in Unix.

6. Use `git commit` to submit the file to the git.

   ```
   git commit -m "message"
   ```

7. The `git add` and `git commit` could be used together to add few files and submit them at once.

   ```
   git add readme.txt
   git add readme2.txt
   git commit -m "message"
   ```

# 时光机穿梭

1. If a modification is made to the file, use `git status` to see the status of the file in the git.

```
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

2. Use `git diff` to see the difference between 2 versions.

   ```
   git diff readme.txt
   ```

   The difference is between the **committed version** and **present version in the folder**, whether it is submitted already or not.

3. After knowing the diff, use `add`, `commit` and `status` to submit and check.

### 小结

- 要随时掌握工作区的状态，使用`git status`命令。
- 如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。

## Reset versions

```
git log
```

To see the history record of committing and their comment.

```
git reset --hard head^
```

Head is the current verision, and head^ denotes the last one. Thus, the head^^.

```
git reset --hard commit_id(e.g. 1094a)
```

Use head or the commit id to designate which version you want to reset.

```
git reflog
```

The code is to see commands you made.

### 小结

现在总结一下：

- `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

## Working directory and repository

Working directory: the directory you can see in finder.

Repository:can be generally divided into 2 sections, which are stage and branch They are all stored in the hidden folder named .git.

When you do `git add filename`, the file is added to stage, and will be transferred to branch aftering doing `git commit -m`

```
git diff filename
```

is used to see the difference between wd and stage.

```
git diff cached
```

is used to see the diff between stage and branch.

```
git diff HEAD -- filename
```

is to see the diff between wd and branch.

## 撤销修改

1. When the modification is just within the wd, just use

  ```
  git checkout -- filename
  ```

  to discard the changes you don't want.

  ==In new version git:==

  ```
  git restore filename
  ```

  

2. When the changes have been added to the stage and not commited to branch, use

   ```
   git reset HEAD filename
   ```

   to unstage the changes and put them back to wd. Then, use `git checkout -- filename` to dropout the changes in wd. 

   ==In new version git:==

   ```
   git restore --staged filename
   ```

3. When the changes have been committed to branch, refer to reset versions.

### 小结

又到了小结时间。

场景1：适用于还没有git add到stage，当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。该命令其实就是用版本库的版本替换工作区的的版本。

==`git restore filename`==

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD `，就回到了场景1，第二步按场景1操作。==`git restore -staged filename`==

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)一节，不过前提是没有推送到远程库。

## 删除文件

```
git rm filename
```

Use the command is to remove the file from wd(like `rm filename`)

```
git commit -m "remove filename"
```

Use commit to apply the deleting action to branch, then the file doesn't exist in wd, stage and branch.

After `git rm` or `rm` is used, not no commit is made, we can use 

```
git checkout -- filename
```

`git checkout -- filename` means to use the version in master to replace the version in wd. The process is much like switching wd to branch version or just dropping the wd version and use the branch version.

So we can use the restore command when the changes(removes)  just happen in wd:

```
git restore filename
```

to retrieve the version in the branch.

### 小结

命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**。

删除有些类似撤销修改。

1. 如果仅仅使用rm来删除文件，只是删除了工作区的文件，没有提交到暂存区，这时候可以直接用`git checkout -- file` or `git restore filename`来从版本库恢复。
2. 若使用`git rm`,即删除了工作区的文件，并将这个改动提交到了暂存区，此时需要先从暂存区恢复到工作区：用`git reset HEAD filename`or `git restore --staged filename`来恢复到工作区，再从第一步开始从版本库恢复。
3. 习惯add之后commit一次。

# GitHub

SSH keys

public SSH key:id_rsa.pub

private SSH key:id_rsa

```

```

ssh-keygen -t rsa -C"emailaddress"

## Add and Push remote repo

1. Create a new repo in GH.

2. Use 

   ```
   git remote add origin git@github.com:username/reponame.git
   ```

   to create connection between domestic and remote repo.

3. Use

   ```
   git push -u origin master
   ```

   to push the master to remote origin repo for the first time.

4. Use 

   ```
   git push origin master
   ```

   to push the master to GH.

## Clone from remote repo

```
git clone git@github.com:username/reponame.git
```

# Branch management

## 创建并合并分支

在[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)里，你已经知道，每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点：

![git-br-initial](https://www.liaoxuefeng.com/files/attachments/919022325462368/0)

每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长。

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

![git-br-create](https://www.liaoxuefeng.com/files/attachments/919022363210080/l)

你看，Git创建一个分支很快，因为除了增加一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化！

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

![git-br-dev-fd](https://www.liaoxuefeng.com/files/attachments/919022387118368/l)

假如我们在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并：

![git-br-ff-merge](https://www.liaoxuefeng.com/files/attachments/919022412005504/0)

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支：

![git-br-rm](https://www.liaoxuefeng.com/files/attachments/919022479428512/0)

真是太神奇了，你看得出来有些提交是通过分支完成的吗？

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch `

切换分支：`git checkout `或者`git switch `

创建+切换分支：`git checkout -b `或者`git switch -c `

合并某分支到当前分支：`git merge `

删除分支：`git branch -d `

## Solve Conflicts



### 小结

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

用`git log --graph`命令可以看到分支合并图。

## 分支管理策略

```
git merge branchname
```

merge默认使用的是FastForward模式，在删除了被合并分支之后是看不出合并历史记录的，可以使用--no--ff记录合并历史：

````
git merge --no--ff -m "merge with no-ff" dev
````

因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。

使用这种模式，再用`git log`就可以看到分支合并历史。

可以看到，不使用`Fast forward`模式，merge后就像这样：

![git-no-ff-mode](https://www.liaoxuefeng.com/files/attachments/919023225142304/0)

### 小结

Git分支十分强大，在团队开发中应该充分应用。

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。

## Bug Branch

查看stash有多少个场景：

```
git stash list
```

同样的bug，要在dev上修复，我们只需要把`4c805e2 fix bug 101`这个提交所做的修改“复制”到dev分支。注意：我们只想复制`4c805e2 fix bug 101`这个提交所做的修改，并不是把整个master分支merge过来。

为了方便操作，Git专门提供了一个`cherry-pick`命令，让我们能复制一个特定的提交到当前分支：

```
git cherry-pick <commit id>
```

Git自动给dev分支做了一次提交，注意这次提交的commit是`1d4b803`，它并不同于master的`4c805e2`，因为这两个commit只是改动相同，但确实是两个不同的commit。用`git cherry-pick`，我们就不需要在dev分支上手动再把修bug的过程重复一遍。

### 小结

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场；

在master分支上修复的bug，想要合并到当前dev分支，先切换到dev分支，再用`git cherry-pick `命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

## Feature Branch

### 小结

开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过`git branch -D `强行删除。

## 多人协作

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin `推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin `推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to  origin/`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

### 小结

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

## Rebase

### 小结

- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

## Tag

### 小结

- 命令`git tag `用于新建一个标签，默认为`HEAD`，也可以指定一个commit id，`git tag <tagname> <commitid>`
- 命令`git tag -a  -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。
- 查看某个tag的信息，`git show <tagname>`
- tag针对的是某个提交commit