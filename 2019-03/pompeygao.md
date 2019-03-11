### git仓库的创建

1. `git init` 初始化git仓库，自动创建`master`分支。
2. `touch readme.md`  创建readme文件.
3. `git status` 查看仓库当前文件的状态.
4. `git add readme.md`  如果添加的文件比较多，可以直接使用`git add .`
5. `git commit -m "add readme file"`  提交`readme`文件.

### git版本回退

1. `git log`查看提交记录.
2. `git reset --hard <commit_id>` `commit_id`是由git自动生成的，通过`git log`命令获取.
3. 假如从最新版本回退到了之前的版本，现在后悔了，要再回退到最新版本。但是`git log`命令已经获取不到.该`commit_id`，使用`git reflog`命令记录每一次的命令，可以找到需要的`commit_id`。

### 工作区和暂存区

1. 工作区就是文件所在的文件夹，暂存区在隐藏文件夹`.git`中。
2. `git add`把文件从工作区添加到暂存区。
3. `git commit`把暂存区的所有文件提交到当前分支。

### 撤销修改

`git checkout -- <file>`  把文件在工作区的修改全部撤销

1. 文件修改后还没添加到暂存区，撤销修改后，回到和仓库一样的状态；
2. 文件修改后已添加到暂存区，之后又作了修改，撤销修改后，回到和暂存区一样的状态。

`git reset HEAD <file>`把已经添加到暂存区的修改撤销掉，重新放回工作区。

### 连接远程仓库

1、生成`SSH key`

2、比如在`gitlab`上，上传自己的`SSH Key`

3、新建仓库(`repository`)，按照页面提示，使用

​	`git remote add origin ssh://xxxxx.com/xx/demo.git`命令，将本地与远程仓库关联。

​	`git push -u origin master`把本地代码推送到远程库上。

4、由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

​	`git pull origin master` 

​	`git push origin master`

### 分支创建和合并

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

### 解决冲突

1. 使用`git merge`后，可能会出现冲突。
2. 先解决冲突，再使用`git add     git commit`命令进行提交。

### 储藏

1. `git stash save <message>` 将修改储藏起来。

   默认情况下，会储藏以下文件：

   - 添加到暂存区的修改(staged changes)
   - git跟踪单并未添加到暂存区的修改(unstaged changes)

   不储藏以下文件：

   - 在工作区中的新文件(untracked files)
   - 被忽略的文件(ignored files)

   `git stash save -u <message>`  可以 stash  untracked files

   `git stash save -a <message>` 可以 stash 当前目录下所有修改

2. `git stash list` 储藏的列表。

3. `git stash apply`将储藏的内容恢复，`stash`中内容并不删除，使用`git stash drop`来删除。

   `git stash pop`将储藏的内容回访，同时删除`stash`中内容。

   `git stash apply stash@{0}`储藏列表中存在多个`stash`，恢复指定的`stash`。



## 实际开发

1. 每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

   在`dev`分支新建一个`feature/play_music`分支：

   - `git checkout -b  feature/play_music`
   - `touch play_music.js`
   - `git add play_music.txt`
   - `git commit -m 'Add play music'`
   - `git checkout dev`
   - `git merge feature/play_music`
   - `git branch -d feature/play_music` // 非必须进行的一步

   如果删除一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

2. 多人开发

   - 在向远端推送前，先使用`git pull origin <branch-name>`拉取对应分支最新的代码
   - 再使用`git push origin <branch-name>`推送到远端
   - 如遇冲突，解决冲突后，在进行操作
   - 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to=origin/<branch-name> <branch-name> `。

### rebase 变基

- TODO

### tag 标签

1. `git tag <name>`默认标签会打在最新提交的`commit`上。

2. `git tag` 查看所有的标签。

3. 若需要在之前的`commit`上打tag, 先使用`git log --pretty=oneline --abbrev-commit`找到历史提交的`commit id`，然后`git tag <name> <commit-id>`。

4. 标签不是按时间顺序列出，而是按字母排序的。

   可以用`git show <tagname>`查看标签信息。

5. 创建`tag`时，也可以添加说明，用`-a`指定标签名，`-m`指定说明文字：

   ```
   git tag -a <name> -m <message> <commit-id>
   ```

   > 标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

6. `git tag -d <name>`  删除指定标签。

7. `git push origin <tag-name>` 单个推送标签到远程

   创建的标签都只存储在本地，不会自动推送到远程。

8. `git push origin --tags`一次性推送全部尚未推送到远程的本地标签。

9. 删除远程标签的话，先从本地删除：

   ```
   git tag -d <name>
   ```

   然后从远程删除：

   ```
   git push origin :refs/tags/<name>
   ```

   