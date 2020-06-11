# Git学习笔记，教程与讨论区摘录

## This repo is for learning git.
OK
## 查看状态

git status

## How to add file

git add readme.md
git commit -m "commit information"

## 版本回退
HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本

## add checkout commit reset


这一讲里面，讲了三个区的关系，但有些用语引起很多人理解偏差。

本质上要分两个维度看，一个是数据，一个是记录。

基于磁盘来看，数据就是我们要管理的代码本身。

基于Git的管理来看，三个区本质上是管理的修改、暂存和提交的差异记录。不能说“提交后暂存区就没了”，这个是大家引起理解偏差的位置。

工作区>>>>暂存区>>>>仓库

初始化完成后，三个区域都是空的，这个时候记录就算是初始化了，开始记录这三者差异。

在工作区创建一个新的文件test.txt，先add到暂存区，这时可以使用git diff来查看工作区和暂存区的差异（操作1），当然，这里肯定是没有差异的！记住，这里是比较差异，不存在哪个区的数据没有了或空了，因为数据只有一份。

然后，你在工作区对test.txt进行修改（并没有将暂存区提交到仓库），修改保存后，同样可以使用git diff来查看工作区和暂存区的差异（操作2），当然，这里肯定是有差异的！

在你并没有再次进行git add test.txt操作前，使用git commit将暂存区（第一次add的test.txt版本）提交到仓库，这时仓库就有了第一个版本的test.txt文件。

这时你同样可以使用git diff来查看工作区和暂存区的差异，和操作2的结果是不是一样的？对，是一样的。因为你并没有git add，工作区和暂存区数据存在差异。

这时你使用git diff --cached来查看暂存区和仓库的差异（操作3），当然，这里肯定是没有差异的！同样是因为你并没有再一次git add。

好了，你开始执行第二次git add，执行完后，再试试git diff操作，是不是发现没有差异了？可以证明这里确实比较的是工作区和暂存区的数据差异了吧！

好，再试试git diff --cached操作，是不是发现有差异了？也证明了这里确实比较的是暂存区和仓库的数据差异。

另外，我还想说一下git add的反向命令git checkout，就是将工作区提交到暂存区的数据撤销掉。以及git commit的反向命令git reset HEAD，就是将提交到暂存区的数据以仓库数据为基准撤销暂存。

以上不知道讲的对不对，各位大佬轻拍！

## 回退



1.没有git add时，用git checkout -- file

2.已经git add时，先git reset HEAD <file>回退到1.，再按1.操作

3.已经git commit时，用git reset回退版本

4.推送到远程库，GG?

## 删除文件



当你要删除文件的时候，可以采用命令：rm test.txt

这个时候（也就是说这个时候只执行了rm test.txt）有两种情况

第一种情况:的确要把test.txt删掉，那么可以执行 git rm test.txt git commit -m "remove test.txt" 然后文件就被删掉了

第二种情况:删错文件了，不应该删test.txt，注意这时只执行了rm test.txt，还没 有提交，所以可以执行git checkout test.txt将文件恢复。

并不是说执行完git commit -m "remove test.txt"后还能用checkout恢复，commit之后版本库里的文件也没了，自然没办法用checkout恢复，而是要用其他的办法

## 分支

Git鼓励大量使用分支：

查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>或者git switch <name>

创建+切换分支：git checkout -b <name>或者git switch -c <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>




## 修复BUG
修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场；

在master分支上修复的bug，想要合并到当前dev分支，可以用git cherry-pick <commit>命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

## 开发新功能
开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

因此，多人协作的工作模式通常是这样：

    首先，可以试图用git push origin <branch-name>推送自己的修改；
    
    如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
    
    如果合并有冲突，则解决冲突，并在本地提交；
    
    没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！

如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。
小结

    查看远程库信息，使用git remote -v；
    
    本地新建的分支如果不推送到远程，对其他人就是不可见的；
    
    从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
    
    在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
    
    建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
    
    从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。


## 标签


    命令git tag <tagname>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
    
    命令git tag -a <tagname> -m "blablabla..."可以指定标签信息；
    
    命令git tag可以查看所有标签。


    命令git push origin <tagname>可以推送一个本地标签；
    
    命令git push origin --tags可以推送全部未推送过的本地标签；
    
    命令git tag -d <tagname>可以删除一个本地标签；
    
    命令git push origin :refs/tags/<tagname>可以删除一个远程标签。


