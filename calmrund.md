##史上最浅显易懂的Git教程 笔记

---
####基本操作
git init 初始化一个Git仓库

添加文件到Git仓库，分两步：

- 第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；

- 第二步，使用命令git commit，完成。

git status 随时掌握工作区的状态。

git diff 可以查看修改内容。

HEAD表示当前版本（指针），上一个版本就是HEAD^，上上一个版本就是HEAD^^，往上100个版本写成HEAD~100

git reset --hard commit_id 在不同版本间切换

git log 可以查看提交历史

git reflog 查看命令历史

git rm 在版本库里删除一个文件

git remote add origin git@server-name:path/repo-name.git 关联一个远程库

git push -u origin master 关联后，第一次推送 master 分支的所有内容

git push origin master 每次本地提交后，推送最新修改

git clone 要克隆一个仓库，首先必须知道仓库的地址，然后使用此命令克隆

Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快

---

####撤销修改

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。


场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。


场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

---

####Git鼓励大量使用分支：


- 查看分支：git branch



- 创建分支：git branch <name>
 


- 切换分支：git checkout <name>



- 创建+切换分支：git checkout -b <name>



- 合并某分支到当前分支：git merge <name>



- 删除分支：git branch -d <name>

- 看分支合并图：git log --graph

```
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward：
$ git merge --no-ff -m "merge with no-ff" dev
```

- 当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。

- git branch -D <name> 强行删除一个没有被合并过的分支

---

####分支与标签

- 查看远程库信息，使用git remote -v；

- 本地新建的分支如果不推送到远程，对其他人就是不可见的；

- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；

- 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；

- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

- git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；

- git tag -a <tagname> -m "blablabla..."可以指定标签信息；

- git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；

- git tag可以查看所有标签。

- git push origin <tagname>可以推送一个本地标签；

- git push origin --tags可以推送全部未推送过的本地标签；

- git tag -d <tagname>可以删除一个本地标签；

- git push origin :refs/tags/<tagname>可以删除一个远程标签。