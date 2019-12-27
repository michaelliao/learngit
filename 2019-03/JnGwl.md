### Git 入门笔记

---

> 本文为廖雪峰老师Git教程相关笔记，[廖老师教程网址](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，[Git官方文档](https://git-scm.com/book/zh/v2)
>
> 首发于https://www.cnblogs.com/jngwl/articles/10544761.html，若您转载请注明地址





#### 1.**初始化一个Git仓库**

- `git init`



#### 2.**添加文件**到Git仓库

- 使用命令`git add <file>`，将已修改的工作区文件提交到暂存区；可多次使用，添加多个文件；
- 使用命令`git commit -m <comment message>`，将暂存区的文件添加到分支。



#### 3.**查看工作区的状态**：

- `git status`命令可查看工作区状态
- 如果`git status`告诉你有文件被修改过，可使用
  - `git diff readme.txt` 比较工作区文件与暂存区文件的区别（上次git add 的内容）
  - `git diff -- cached readme.txt` 比较暂存区的文件与仓库分支里（上次git commit 后的内容）的区别
  - `git diff HEAD -- readme.txt`命令查看工作区和版本库里面最新版本的区别
- 几个名词
  - `untracked`：新建的文件，没有git add/commit；
  - `changes not statge for commit`：以前被git add / commit过，但修改了，没有git add；
  - `changes to be commited`：git add过了，但没有commit

<img src="http://images.cnblogs.com/cnblogs_com/jngwl/1357427/o_git_diff.png" width="800px" />



#### 4.**版本回退**

- `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
- 穿梭前，用`git log --pretty=oneline --abbrev-commit`可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。



#### 5.撤销修改

- 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- readme.txt`。

- 当你不但改乱了工作区某个文件的内容，还`git add`添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD readme.txt`，就回到了场景1，再`git checkout -- readme.txt`即可。

- 当你已经提交了不合适的修改到版本库时，想要撤销本次提交，参考**版本回退**一节，不过前提是没有推送到远程库

  

#### 6.删除文件

- 执行`git rm test.txt`

  - 确实要删，则`git commit -m "remove test.txt"`
  - 是误删且未commit，则 `git checkout -- test.txt`

- `git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

- 命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**



#### 7.远程仓库

- 添加远程库
  - 关联一个远程库，可使用` git remote add origin https://github.com/JnGwl/learngit.git`；
  - 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；
  - 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改

- 从远程库克隆
  - https方式：`git clone https://github.com/JnGwl/gitskills.git`
  - SSH方式：`git clone git@github.com:JnGwl/gitskills.git`
  - SSH方式速度较快，但有些公司只开放http端口

- Permission denied (publickey).fatal: Could not read from remote repository.

  - 原因：电脑公钥（publickey）未添加至github

  - 解决方案：

    - 设置Git的`user name`和`email`

    ```bash
    git config --global user.name "yourname"
    git config --global user.email "youremail" 
    ```

    - 生成SSH密钥

    ```bash
    cd ~/.ssh
    ssh-keygen -t rsa -C “youremail”
    ```

    - 三次回车后，得到两个文件：`id_rsa`和`id_rsa.pub`

    - 将`id_rsa.pub`中的公钥添加到网页版GitHub的`settings/ssh and gpg keys/new ssh key`中



#### 8.分支管理

- 查看分支

  - `git branch`查看本地所有分支
  - `git branch -r`查看远程所有分支
  - `git branch -a`查看本地和远程所有分支（远程分支为红色）

- 新建分支

  - `git branch branchname`新建分支但不切换
  - `git checkout -b branchname`新建并切换至新分支

- 切换分支

  - `git checkout branchname`

- 合并分支

  - `git merge branchname`
  - 在落后的分支上（如master）合并领先分支（如dev）

- 推送分支

  -  `git push origin branchname`,如`master`、`dev`分支

- 删除分支

  - `git branch -d branchname`删除本地分支
  -  `git branch -D branchname`强制删除本地分支
  - `git branch -d -r branchname`加`git push origin :branchname`删除远程分支

- 远程分支重命名分支

  - 重命名本地分支`git branch -m oldbranch newbranch`
  - 删除远程分支`git branch -d -r branchname`加`git push origin :branchname`
  - 上传新命名的本地分支`git push origin newbranch`
  - 本地与远程分支关联`git branch --set-upstream-to=origin/newbranch newbranch`

- Bug分支

  - 当你正在某个分支下工作时，master分支下有bug需要紧急修复时
    - `git stash` 保存工作现场
    - 切换到`master`分支，修复bug，add和commit
    - 切换回原分支，`git stash pop`，恢复工作现场。

- 其他

  - 不可删除默认分支；可更改默认分支后再进行删除

  ```bash
  ! [remote rejected] test_branch (refusing to delete the current branch: refs/heads/test_branch)
  error: failed to push some refs to 'https://github.com/JnGwl/learngit.git'
  ```



#### 9.多人协作

- 基本流程：

  - 首先，在本地创建和远程分支对应的分支，`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
  - 用`git push origin <branch-name>`推送自己的修改；
  - 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
  - 如果合并有冲突，则解决冲突，并在本地提交；
  - 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送即可

  - 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to=origin/<branch-name>  <branch-name> `。

- 查看远程库信息，使用`git remote -v`

- 本地新建的分支如果不推送到远程，对其他人就是不可见的



#### 10.标签管理

- 标签（tag）和commit id的关系就像域名和IP地址

- 新建标签：`git tag <tagname>，默认为`HEAD`，也可以指定一个`commit id`（可由`git log --pretty=oneline --abbrev-commit`获得id）；
- 指定标签信息：`git tag -a <tagname> -m "tag comment"`；
- 查看所有标签：`git tag`
- 查看标签具体信息：`git show <tagname>`

- 删除本地标签：`git tag -d <tagname>`
- 删除远程标签：`git push origin :refs/tags/<tagname>`
- 推送一个本地标签：`git push origin <tagname>`
- 推送全部未推送过的本地标签：`git push origin --tags`



#### 11.一些选项解释

**-d**  --delete：删除

**-D**  --delete --force的快捷键

**-f**  --force：强制

**-m**  --move：移动或重命名

**-M**  --move --force的快捷键

**-r**  --remote：远程

**-a**  --all：所有



#### 12.github使用

- `fork`他人的仓库到自己的仓库，如twbs/bootstarp → my/bootstarp
- `git clone`到本地，如my/bootstarp → local/bootstarp
- 修改后，`git push` 到自己的github仓库，如local/bootstarp → my/bootstarp
- 向原作者提交`pull request`

```ascii
┌─ GitHub ────────────────────────────────────┐
│                                             │
│ ┌─────────────────┐     ┌─────────────────┐ │
│ │ twbs/bootstrap  │────>│  my/bootstrap   │ │
│ └─────────────────┘     └─────────────────┘ │
│                                  ▲          │
└──────────────────────────────────┼──────────┘
                                   ▼
                          ┌─────────────────┐
                          │ local/bootstrap │
                          └─────────────────┘
```





#### 13.参考链接：

---

【1】https://www.jianshu.com/p/3b56f4e6ac77

【2】https://blog.csdn.net/afei__/article/details/51567155



