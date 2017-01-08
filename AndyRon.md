[AndyRon](https://github.com/andyRon)学习git笔记
-----------------------
[图解Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)

## [git简易教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
### 简介
- 诞生
    + 在2002年以前，世界各地的志愿者把源代码文件通过diff的方式发给Linus，然后由Linus本人通过手工方式合并代码！
    + Linus坚定地反对CVS和SVN
    + 2002年，BitMover公司授权Linux社区免费使用商业的版本控制系统BitKeeper
    + 2005年，开发Samba的Andrew试图破解BitKeeper的协议（这么干的其实也不只他一个），被BitMover公司发现了
    + Linus花了两周时间自己用C写了一个分布式版本控制系统，这就是Git！一个月之内，Linux系统的源码已经由Git管理了！
    + Github
- 集中式vs分布式

### 安装Git
- 安装配置

    ```
    git config --global user.name "Your Name"
    git config --global user.email "email@example.com"
    ```

### 创建版本库
- 版本库（repository）：一个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。
- 基本操作
```
mkdir learngit
cd learngit
git init
git add readme.txt
git commit -m "wrote a readme file"
```

### 时光机穿梭
- 版本回退
    + `git status` 仓库当前的状态
    + `git diff readme.txt ` 
    + `git commit`就像文件修改到一定程度的时候保存的一个快照，一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复
    + `git log`  显示从最近到最远的提交日志, `git log --pretty=oneline`查看简洁版。 前一段长字符是**commit id**（版本号，SHA1）
    + 回到上一个版本。Git中，**HEAD**表示当前版本，**HEAD^**是上一个版本，**HEAD^^**是上上一个版本，**HEAD~100**是往上一个版本。  
    `git reset --hard HEAD^`
    + `git reset --hard 38bb72e5a6d0`  回到某个特定版本（不管是未来的还是过去）， 版本号不一定完整的
    + `git reflog` 记录每一次命令，可用来查看版本号
- 工作区和暂存区
    + 工作区（Working Directory）：除了隐藏目录.git
    + 版本库（Repository）：隐藏目录.git
        * 暂存区：stage（或者叫index），`git add`添加的暂存区
        * 分支：第一次自动创建一个`mater`分支，以及指向master的一个指针叫HEAD。`git commit`就提交到分支
        ![](http://www.liaoxuefeng.com/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)
- 管理修改
    + Git优秀之处：Git跟踪并管理的是修改，而非文件。
    + 什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。
    + `git diff HEAD -- readme.txt` 查看工作区和版本库里面最新版本的区别
    + 每次修改，如果不add到暂存区，那就不会加入到commit中。
- 撤销修改
    + `git checkout -- readme.txt`，把readme.txt文件在工作区的修改全部撤销（让这个文件回到最近一次git commit或git add时的状态），根据readme.txt的是否提交到暂存区分两种情况：
        * 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
        * 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
    + `git reset HEAD file` 可以把暂存区的修改撤销掉（unstage），重新放回工作区
        * `git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。
- 删除文件
    + `git rm file`   有点类似把文件添加到暂存区，然后 `git commit` 
    + `git checkout -- test.txt` : 没有commit之前用checkout撤销删除
    + `git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

### 远程库
- 添加远程库
    + 在github上创建远程库`learngit`
    + `git remote add origin git@github.com:andyRon/learngit.git` 关联本地库与远程库，`origin`是默认的远程库名
    + `git push -u origin master` 把本地库推送到远程库
        * 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
    + 分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！
- 从远程库克隆
    + `git clone git@github.com:andyRon/gitskills.git`
    + `git clone https://github.com/andyRon/gitskills.git`
    + Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

### 分支管理
- 在分支干活，干完合并到原来的分支。git的分支很快
- 创建与合并分支
    + `git checkout -b dev`  checkeout加`-b`表示创建分支并切换到此分支，相当于两个命令：
    ```
    git branch dev
    git checkout dev
    ```
    + `git branch` 查看分支，`*`表示当前分支
    + 在dev中修改readme.txt文件并提交
    ```
    git add readme.txt 
    git commit -m "branch test"
    ```
    + `git checkout master`  切换到master分支，刚才的修改消失
    + `git merge dev`   把dev分支合并到当前分支master
    + `git branch -d dev`   删除分支
- 解决冲突
    + `git checkout -b feature1`    建立新分支
    + 修改readme.txt最后一行： `Creating a new branch is quick AND simple.`
    + `git add readme.txt `  `git commit -m "AND simple"`
    + `git checkout master`
    + 修改readme.txt最后一行： `Creating a new branch is quick & simple.`
    + `git add readme.txt `  `git commit -m "& simple"`
    + `git merge feature1`  合并冲突
    ```
    Auto-merging readme.txt
    CONFLICT (content): Merge conflict in readme.txt
    Automatic merge failed; fix conflicts and then commit the result.
    ```
    + 修改readme.txt： `Creating a new branch is quick and simple.`
    + `git add readme.txt `  `git commit -m "conflict fixed"`
    + `git log --graph --pretty=oneline --abbrev-commit`， 查看分支合并情况
- 分支管理策略
    + 普通分支合并是`Fast forward`模式，不生成新的commit，删除分支后，会丢掉分支信息。
    + 强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
    + `git checkout -b dev`
    + 修改readme.txt, `git add readme.txt `, `git commit -m "add merge"`, `git checkout master`
    + `git merge --no-ff -m "merge with no-ff" dev` : 合并分支dev到master， `--no-ff`表示禁用`Fast forward`，由于是commit， -m表示commit描述
    + `git log --graph --pretty=oneline --abbrev-commit` 查看分支历史
    + 分支策略（实际开发中原则）
        * master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
        * 小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了
            ![](http://www.liaoxuefeng.com/files/attachments/001384909239390d355eb07d9d64305b6322aaf4edac1e3000/0)

- Bug分支
    + `git stash`  临时修改其他bug时，把工作目录储存起来
    + 回到`master`分支，并创建修bug的临时分支： `git checkout master`, `git checkout -b issue-101`
    + 修改bug后提交， `git add readme.txt`, `git commit -m "fix bug 101"`
    + 切换到master分支，并完成合并，最后删除issue-101分支:
    ```
    git checkout master
    git merge --no-ff -m "merged bug fix 101" issue-101
    git branch -d issue-101
    ```

    + `git checkout dev`
    + `git stash list`  查看所有stash
    + `git stash pop` (相当于`git stash apply`+`git stash drop`) : 恢复最新一条stash。当有很多stash,可以通过`git stash apply`加stash的id来恢复指定的stash

- Feature分支:用于开发新功能
    + `git checkout -b feature-vulcan`
    + 开发新功能 `git add vulcan.py`, `git commit -m "add feature vulcan"`
    + `git branch -D <name>` 强制删除分支

- 多人协作
    + `git remote` `git remote -v` 查看远程库
    + 推送分支
        * `git push origin master`  把本地master库推送到远程origin库
        * 推送与否：
            - master分支是主分支，因此要时刻与远程同步；
            - dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
            - bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
            - feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
    + 抓取分支
        * `git checkout -b dev origin/dev`  创建本地dev分支并关联远程dev分支
    
### 标签管理
- tag就是一个让人容易记住的有意义的名字，用来替代commit号，它跟某个commit绑在一起
- 创建标签
    + `git tag <name>`      打一个新标签，默认标签是打在最新提交的commit上
    + `git tag`     查看所有标签(标签不是按时间顺序列出，而是按字母排序的)
    + `git tag <name> <commit id>`      对指定commit打标签(`git log --pretty=oneline --abbrev-commit`)
    + `git show <tagname>`      查看标签信息
    + `git tag -a <tagname> -m "blablabla..."`      可以指定标签说明
    + `git tag -s <tagname> -m "blablabla..."`      可以用PGP签名标签
- 操作标签
    + `git tag -d v0.1`     删除
    + `git push origin v1.0`    推送某个标签到远程
    + `git push origin --tags`  推送所有标签到远程
    + 删除远程标签
        * `git tag -d v0.9`
        * `git push origin :refs/tags/v0.9`

### 自定义Git
- 忽略特殊文件
    + https://github.com/github/gitignore
- 配置别名




