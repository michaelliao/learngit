[TOC]

# 一. `Git`常用命令   
## 本地命令
### `git config`   

1. 查看当前git配置: `git config [<option>]`
2. **Location:**       

    `--global`： 使用全局配置文件   
    `--system`：使用系统配置文件 
    `--local`： 使用本地配置文件    

    **eg**:  `git config --local`     
    **eg**:  `git config --local user.name 'hjj'` → 设置本地`user.name`
3. **Action:**      

    `-l`, `--list`： 列出全部配置项    
    **eg**:  `git config --local --list`    
        
    `--unset`： 删除一个变量： name [value-regex]    
    **eg**:  `git config --local --unset user.name` → 删除本地配置项中的`user.name`

### `git log`   
1. [查看提交历史。](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)
1. `git log`：显示当前分支的版本历史。
2. `git log --oneline`：将每次提交显示在一行上面（commit id仅显示头几位）。   
3. `git log -1`：数字表示显示的提交日志条数。  
4. `git log --pretty=oneline`：显示全部commit id。
5. `git log --all`：查看全部分支提交历史。


### `git add`    
1. `git add [file1] [file2] ...`：添加指定文件到暂存区。    
2. `gir add -u`：可以添加所有已经被 git 控制的文件到暂存区   


### `git rm`    
1. `git rm [file1] [file2] ...`：删除工作区文件，并且将这次删除放入暂存区。     
    也可以先删除文件，然后使用`git rm <file>`和`git add<file>`效果是一样的。

### `git status`   
1. `git status`：查看状态和有变更文件。    

### `git commit`    
1. `git commit -m [message]`：提交暂存区到仓库区。
2. ` git commit [file1] [file2] ... -m [message]`： 提交暂存区的指定文件到仓库区。
3. `git commit -a`： 提交工作区自上次commit之后的变化，直接到仓库区。


### `git branch`   
1. `git branch`：显示所有本地分支。
2. `git branch -r`：列出所有远程分支。   
3. `git branch -a`：列出所有本地分支和远程分支。   
4. `git branch -v`：列出每个分支的最后一次提交内容。
5. `git branch -d [branch-name]`：删除分支。
6. `git branch [branch-name]`：新建一个分支，但依然停留在当前分支。   
7. ` git checkout -b [branch]`：新建一个分支，并切换到该分支。  
8. `git branch (--set-upstream-to=<upstream> | -u <upstream>) [<branchname>]`：（有前后顺序）手动指定branch-name分支追踪upstream分支（`--set-upstream`已经不再支持）。

### `git cat-file`   
1. `git cat-file -t`：查看 git 对象的类型。
2. `git cat-file -p`：查看 git 对象的内容。
3. `git cat-file -s`：查看 git 对象的大小。

### `git diff`   
1. [git diff 命令详解（<filename>是可选）。](https://www.jianshu.com/p/80542dc3164e)   
2. `git diff HEAD HEAD^1`：表示`HEAD`与`HEAD`的`parent`进行比较。
3. `git diff <filename>`：查看文件在工作目录与暂存区的差别。如果还没 add 进暂存区，则查看文件自身修改前后的差别。也可查看和另一分支的区别。    
4. 
![image](A82CE9DD71904BB2ACA5D2C6BFB13489)

### `git reset`   
1. `git reset --hard [版本(eg:HEAD^^ 或 [commit id])]`：彻底回退到某个版本，本地的源码也会变为该版本的内容；默认版本为HEAD，即当前版本，会重置暂存区与工作区，与上一次commit保持一致。  
2. `git reset HEAD <file>`：可以把暂存区的修改撤销掉（unstage），重新放回工作区；不写`file`表示撤销所有暂存区内容。   

### `git checkout`   
1. `git checkout -- <filename>`：把`filename`文件在工作区的修改全部撤销，这里有两种情况：    
    > 一种是`filename`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；    
    > 一种是`filename`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。   
2. `git checkout [commit id]`：切换到某个commit上，并从此处开始建立分离头指针，可以在该分支继续进行操作，然后保存该分离头指针为一个分支，也可以选择舍弃。   
3. ` git checkout -b [branch]`：新建一个分支，并切换到该分支。    
4. ` git checkout -b [branch] [remote branch]`：将远端分支拉取到本地并命名。



### `git merge`    
1. `git merge [branch]`：合并指定分支到当前分支。  
2. 如果合并的两个分支有冲突，解决冲突之后一定会生成一个新的`commit`，因为解决完冲突之后要讲解决完冲突的内容重新`git add`和`git commit`。
3. `--no-ff`（禁用`Fast forward`）：如果使用`--no-ff`，则合并分支时会新建一个`commit`，否则会将当前分支的指针直接指向被合并分支。    
    而且，合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。   

    ![image](0CDA2B03E9C14323A6A98718CA10311A)  
    
    图片1、2两处都是将分支合并到`master`之后删除分支，1处是没有使用`--no-ff`，合并后的历史没有分支，2处使用了`--no-ff`，合并后的历史有分支。   
    
### `git tag`    
注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。
1. `git tag`：查看所有标签（按字母顺序排列）。
2. `git tag <tagname>`：给当前分支的最新commit打上tagname标签。  
3. `git tag <tagname> <commit id>`：给对应`commit id`的commit打上tagname标签。   
4. `git tag -d <tagname>`：删除本地打错的标签。  
5. 把标签推送到远程是`git push`命令。
6. `git push origin :refs/tags/<tagname>`：从远程删除标签，记得从本地`git tag -d <tagname>`删除对应本地标签。


### `git show`    
1. `git show <tagname>`：可以看到标签对应commit的信息，包括提交的修改内容。


## 远程命令
### `git remote`    
1. [`git remote介绍`](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)     
2. `git remote`：列出所有远程主机。     
3. `git remote -v`：可以参看远程主机的网址。    

### `git push`    
1. [`git push`](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)     
1. `git push <远程主机名> <本地分支名>:<远程分支名>`：git push命令用于将本地分支的更新，推送到远程主机。    
    如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。    
2. `git push origin master`：将本地的master分支推送到origin主机的master分支。如果后者不存在，则会被新建。   
3. `git push origin :master`如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。等同于`git push origin --delete master`。    

如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。    

4. `git push origin`：将当前分支推送到origin主机的对应分支。   
5. `git push -f`：强制推送到远程分支，即将远程分支同步至与本地一样（用于强制回退远程分支版本）。
6. `git push origin <tagname>`：推送名为tagname的标签到远程。   
7. `git push origin --tags`：一次性推送全部尚未推送到远程的本地标签。


# 二. `Git`其他命令项   
1. `--pretty`：使用其他格式显示信息。
2. `git reflog`：用来查看命令历史，即历史提交和回退的记录，可用于找回过去的数据（如`commit id`）。
3. `--hard`：     




# 三. `Git`知识   
## 多人协作模式    
多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；

2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；

3. 如果合并有冲突，则解决冲突，并在本地提交；

4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。
## 分支策略    
1. 在实际开发中，我们应该按照几个基本原则进行分支管理：

    首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
    
    那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
    
    你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
    
    所以，团队合作的分支看起来就像这样：   
    
    ![image](6326FA9EB2A6427881E5CCC94707CE75)    
    
2. 并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

    - master分支是主分支，因此要时刻与远程同步；
    
    - dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
    
    - bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
    
    - feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

## 常用知识
1. `HEAD`是一个指向当前版本的指针。
2. 用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。   
3. `git`管理的是修改，不是文件，所以`git commit`命令在不加其他指令的时候只会提交已经`git add`到暂存区中的修改。     

# 四. 命令行命令      
1. `powershell`：[powershell常用命令](https://ninghao.net/blog/2072)。

2. 显示当前目录：`pwd`。   

3. 列出当前文件夹下的文件信息：`ls`。   

    显示全部（包括隐藏文件）：   
    
    `ls -al` in `git bash`;   
    
    `ls -force` in `powershell`

4. `vi [file]`： [使用vi编辑文件。](https://www.ibm.com/developerworks/cn/linux/l-lpic1-v3-103-8/index.html)    
    
    [退出vi编辑模式。](https://blog.csdn.net/u010648555/article/details/50676647)

5. 创建目录：`mkdir`:[创建删除文件夹命令。](http://www.cnblogs.com/zf2011/archive/2011/05/17/2049155.html)   
6. 创建文件：[创建文件的几种方式。](https://blog.csdn.net/sunjinshengli/article/details/53557684)    
7. 查找文件：[查找文件的命令。](http://man.linuxde.net/find)    
8. `cat 文件名(可以包含路径)`：查看文件的内容。

