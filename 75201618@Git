yum install git

设置用户信息
git config --global user.name "Mark" 
git config --global user.email 75201618@qq.com
注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

创建git仓库
在当前目录下创建git仓库
git init
[root@localhost gittest]# git init
Initialized empty Git repository in /root/gittest/.git/

在git仓库中添加需要追踪的文件或目录，如果该文件或目录已经被追踪的话将被放入缓存区
git add 
[root@localhost gittest]# vim readme.txt
[root@localhost gittest]# git add readme.txt

提交已暂存的文件（只会提交已暂存的文件，git add后的文件，未git add的文件不会进行提交）
git commit    启动文本编辑器输入本次提交的说明
git commit -m 'initial project version'   将文件提交到仓库中，并且输入“*”为本次提交的说明
git commit -a -m "Mark at 2016"    自动提交已追踪但还未暂存的文件
[root@localhost gittest]# git commit -m "wrote a readme file"
[master (root-commit) 1ba1490] wrote a readme file
 1 files changed, 2 insertions(+), 0 deletions(-)
 create mode 100644 readme.txt
git commit命令执行成功后告诉你，1个文件被改动，插入了两行内容

git add需要添加追踪的文件和目录，添加的文件或目录需要加在命令的后方，而git commit提交的文件为已追踪的文件，不需要指定文件或目录。

查看文件状态
git status
[root@localhost gittest]# vim readme.txt 
[root@localhost gittest]# git status
# On branch master
# Changed but not updated:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#	modified:   readme.txt
#
修改readme.txt文件后，通过git status命令告诉我们，readme.txt被修改过了，但还没有准备提交的修改。

用未暂存的文件对比已暂存的文件，查看尚未暂存的文件更新了哪些部分
git diff
[root@localhost gittest]# git diff
diff --git a/readme.txt b/readme.txt
index 46d49bf..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software.
对比具体修改了什么内容，通过输出可以看到，我们在第一行添加了一个“distributed”单词。
用已暂存的文件对比已提交的文件，查看尚未提交的文件更新了哪些部分
git diff --cached    1.6.1及更高版本支持git diff --staged
用工作区的文件对比已提交的文件
git diff HEAD -- readme.txt
[root@localhost gittest]# git diff HEAD -- readme.txt 
diff --git a/readme.txt b/readme.txt
index 76d770f..a9c5755 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,4 @@
 Git is a distributed version control system.
 Git is free software distributed under the GPL.
 Git has a mutable index called stage.
-Git tracks changes.
+Git tracks changes of files.
修改过后进行修改提交，提交修改的步骤跟提交新文件是一样的两步，第一步是git add，之后使用git status显示将要被提交的修改包括readme.txt，# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#	modified:   readme.txt
最后进行提交git commit -m "add distributed"，之后使用git status显示# On branch master
nothing to commit (working directory clean)
告诉我们当前没有需要提交的修改，而且，工作目录是干净（working directory clean）的

查看文件历史记录
git log 
[root@localhost gittest]# git log readme.txt 
commit fe8ca89f6dd27ec80eb3cca5bf03b2f0aafd9cc6
Author: Mark <shaochen206@gmail.com>
Date:   Sun Feb 28 18:51:50 2016 +0800

    append GPL

commit 3d03f68a17cb3505bc32cd064ebfab5b33b525dd
Author: Mark <shaochen206@gmail.com>
Date:   Sun Feb 28 18:37:29 2016 +0800

    add distributed

commit 1ba1490c1bf097d1a99ab2ecc535267c6e7a4afa
Author: Mark <shaochen206@gmail.com>
Date:   Sun Feb 28 18:02:26 2016 +0800

    wrote a readme file
显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是append GPL，上一次是add distributed，最早的一次是worte a readme file。如果觉得输出信息太多，可以使用--pretty=oneline参数[root@localhost gittest]# git log --pretty=oneline readme.txt 
fe8ca89f6dd27ec80eb3cca5bf03b2f0aafd9cc6 append GPL
3d03f68a17cb3505bc32cd064ebfab5b33b525dd add distributed
1ba1490c1bf097d1a99ab2ecc535267c6e7a4afa wrote a readme file
commit id是一大串fe8ca89...9cc6。这是通过SHA1计算出来的数字，用十六进制表示。

版本回退
git reset
[root@localhost gittest]# git reset --hard HEAD^
HEAD is now at fe8ca89 append GPL
在git当中HEAD表示当前版本，也就是最新的提交fe8ca89...9cc6，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
git reset到旧版本上以后，新版本在git log中就会消失，只能通过commit id来指定回到该版本。如果已经遗忘commit id的话可以通过git reflog来查看历史记录。[root@localhost gittest]# git reflog
fe8ca89 HEAD@{0}: fe8ca89: updating HEAD
58a0f48 HEAD@{1}: HEAD~1: updating HEAD
fe8ca89 HEAD@{2}: HEAD^: updating HEAD
2232bfd HEAD@{3}: commit: add git is
fe8ca89 HEAD@{4}: commit: append GPL
58a0f48 HEAD@{5}: commit: add 4-9
3d03f68 HEAD@{6}: commit: add distributed
5ea43d8 HEAD@{7}: commit: add 3 files
1ba1490 HEAD@{8}: commit (initial): wrote a readme file

撤销修改：
git checkout -- readme.txt
如果文件还未暂存，还原文件到和版本库中一模一样的状态。
如果文件已被暂存后再次修改，还原文件到添加到暂存区后的状态。
如果要删除已暂存的修改，需要先用git reset HEAD files命令把暂存区的修改撤销掉（unstage），重新放回工作区：[root@localhost gittest]# git reset HEAD readme.txt 
Unstaged changes after reset:
M	readme.txt
然后再用git checkout -- files来丢弃工作区的修改

删除文件：
    如果需要删除一个已经提交到版本库中的文件或目录，先使用rm命令进行删除，接着git status查看状态[root@localhost gittest]# git status
# On branch master
# Changed but not updated:
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#	deleted:    test.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
如果是误删除，那么可以使用git checkout -- files来进行还原，如果确定删除那么使用git rm命令来确认删除，并再删除后进行提交git commit。

远程库
查看远程库信息
git remote
或者用git remote -v 显示更加详细的信息
关联本地版本库与git仓库
git remote add origin git@github.com:shaochen206/git.git，添加后，远程库的名字就是origin，这是Git默认的叫法。
把本地库的内容推送到远程库上
git push -u origin master，把本地库的内容推送到远程，用git push命令，实际上是把本地分支master推送到远程。
由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送到远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。从现在起，只要本地作了提交，就可以通过命令：git push origin master，把本地master分支的最新修改推送至GitHub。
origin就是指向远程库的链接，master是本地的master分支。git push origin master的意思就是通过origin这个指向链接上传本地的master分支。
如果推送的版本在远程库上有更新的版本，进行提交就会出错，为了防止你丢失数据会禁止你推送，只有在你抓取远程库最新的版本后在本地合并，解决冲突之后再推送。git push origin dev失败，远程库版本较新，git pull，（如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name）抓取远程库最新版本并在本地合并，修改文件解决冲突，git add，git commit -m，git push origin dev，

克隆现有的git仓库
git clone
克隆有两种方式，ssh和https
git clone git@github.com:shaochen206/gitskills.git
git clone https://github.com/shaochen206/gitskills.git
克隆git仓库的时候默认只会看到master分支，如果需要在别的分支上进行开发，就必须创建远程origin的dev分支到本地，于是可以使用命令git checkout -b dev origin/dev创建本地dev分支并与远程origin关联

创建与合并分支
创建并切换分支
git checkout -b dev。[root@localhost gittest]# git checkout -b dev
Switched to a new branch 'dev'
-b参数表示创建并切换，相当于以下两条命令：
git branch dev
git checkout dev
查看当前分支
git branch
切换分支
git checkout master
合并分支
git merge dev，合并指定的dev分支到当前分支。[root@localhost gittest]# git merge dev
Updating a56ebf4..45ad618
Fast-forward
 readme.txt |    1 +
 1 files changed, 1 insertions(+), 0 deletions(-)
注意Git提示的Fast-forward信息，这是告诉我们，这次合并时快进模式，也就是直接把master指向dev的当前提交，所以合并速度非常快。
删除分支（可以删除已合并的分支，但如果该分支功能被取消不进行合并就删除分支的话，就需要使用git branch -D 来进行删除）
git branch -d dev，[root@localhost gittest]# git branch -d dev
Deleted branch dev (was 45ad618).
分支冲突
master分支和dev分支都提交了新的版本，无法直接快速合并，只能试图把各自的修改合并起来，但这种合并就可能会有冲突[root@localhost gittest]# git merge dev
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.可以使用git status查看冲突的文件[root@localhost gittest]# git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#
# Unmerged paths:
#   (use "git add/rm <file>..." as appropriate to mark resolution)
#
#	both modified:      readme.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
直接查看文件可以看到[root@localhost gittest]# cat readme.txt 
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes.
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1
需要手动修改后再提交。提交后可以使用带参数的git log查看分支合并情况[root@localhost gittest]# git log --graph --pretty=oneline --abbrev-commit
*   b241fc9 conflict fixed
|\  
| * 77d1081 AND simple
* | 094b12f & simple
|/  
* 45ad618 branch test
* a56ebf4 delete test.txt
* 2006e69 add test.txt
* 91a96dc git tracks changes
* 4137f4d understand how stage works
* fe8ca89 append GPL
* 58a0f48 add 4-9
* 3d03f68 add distributed
* 5ea43d8 add 3 files
* 1ba1490 wrote a readme file
最后再删除分支。
通常，合并分支时，如果可能，Git会用fast-forward模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用fast-forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
可以使用--no-ff的git merge来禁止使用fast-forward模式
ff模式与no-ff模式的区别：
no-ff模式* 896d46a master
*   3290a67 Merge branch 'dev'
|\  
| * 39cfdce dev
|/  
* c30d089 add readme

ff模式* 5658847 master
* e416261 dev
* 3c5690d add readme

如果切换分支之后master也有了修改，合并就成了这样

BUG分支
如果你在dev分支上进行工作，但master分支出现了BUG需要进行修复，但你dev分支的工作还未完成，无法进行提交。可以先使用git stash把现场储存起来，然后切换到出现BUG的master分支上进行修复，创建issus-101分支进行BUG修复，修复完成之后切换回master分支进行合并，合并完成后删除issus-101分支，再切换回dev分支，查看储存区的列表使用git stash list，使用git stash apply恢复，但stash内容并不会被删除，需要使用git stash drop删除，或者直接使用git stash pop来恢复并且删除。

标签
创建标签
git tag *    在当前分支的最新提交的commit上打上标签*
git tag * commit id    指定commit id（SHA1计算的十六进制数）打上*标签
git tag -a v0.1 -m "version 0.1 released" commit id    指定commit id打上v0.1的标签并添加"version 0.1 released"标签描述和打标签的时间
显示标签
git show    默认显示最新的一次tag或者加上*参数显示指定标签
加密标签会报错http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001376951758572072ce1dc172b4178b910d31bc7521ee4000?t=1456906687459#comments

删除追踪文件或删除暂存区文件
rm *    删除文件
删除文件后使用git status，可看到该文件会出现在"Changes not staged for commit"部分，标记为deleted:
git rm *    从git追踪中和暂存区中删除该文件
删除追踪文件后使用git status，可看到该文件会出现在"Changes to be committed"部分，标记为deleted:，如果删除缓存区文件，需要添加-f选项强制删除
删除追踪和暂存区文件但不删除源文件
git rm --cached *    在忘记添加.gitignore文件的时候，对不需要追踪的文件进行追踪之后使用
移动文件或更改名称
git mv file_form file_to
相当于展开为
mv file_form file_to
git rm file_form
git add file_to
查看提交历史
git log        按提交时间列出所有更新，最近更新的排在最上面。这个命令会列出每隔提交的SHA-1校验和、作者的名字和电子邮件地址、提交时间以及提交说明
git log -p -2        -p可以显示每次提交的内容差异，-2显示最近2次提交
git log --stat        显示每次提交的简略的统计信息
git log --pretty    指定显示提交历史的格式，oneline显示在一行中，short显示作者，full显示作者和提交者，fuller显示作者、提交者、作者修订时间、提交时间，format可以自行指定要显示的格式，git log --pretty=format:"%h - %an : %s"
作者指的是实际作出修改的人，提交者指的是最后将此工作提交到仓库的人
git log --pretty=format 常用的选项
选项	说明
%H

提交对象（commit）的完整哈希字串

%h

提交对象的简短哈希字串

%T

树对象（tree）的完整哈希字串

%t

树对象的简短哈希字串

%P

父对象（parent）的完整哈希字串

%p

父对象的简短哈希字串

%an

作者（author）的名字

%ae

作者的电子邮件地址

%ad

作者修订日期（可以用 --date= 选项定制格式）

%ar

作者修订日期，按多久以前的方式显示

%cn

提交者(committer)的名字

%ce

提交者的电子邮件地址

%cd

提交日期

%cr

提交日期，按多久以前的方式显示

%s

提交说明


来源： http://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2
git log 的常用选项
选项	说明
-p

按补丁格式显示每个更新之间的差异。

--stat

显示每次更新的文件修改统计信息。

--shortstat

只显示 --stat 中最后的行数修改添加移除统计。

--name-only

仅在提交信息后显示已修改的文件清单。

--name-status

显示新增、修改、删除的文件清单。

--abbrev-commit

仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。

--relative-date

使用较短的相对时间显示（比如，“2 weeks ago”）。

--graph

显示 ASCII 图形表示的分支合并历史。

--pretty

使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。

限制 git log 输出的选项
选项	说明
-(n)

仅显示最近的 n 条提交

--since, --after

仅显示指定时间之后的提交。

--until, --before

仅显示指定时间之前的提交。

--author

仅显示指定作者相关的提交。

--committer

仅显示指定提交者相关的提交。

--grep

仅显示含指定关键字的提交

-S

仅显示添加或移除了某个关键字的提交




托管文件属性分为未追踪、已追踪、已修改、已暂存、已提交
Untracked files    未追踪，新添加的文件或目录，未git add进行追踪
Changes to be committed    已暂存，使用git add对未追踪的文件或目录进行追踪并缓存，如果文件或目录被修改后再次运行git add后将被再次缓存
Changed but not updated    已修改，但未放入缓存，文件在缓存后被修改


git status -s
状态
？？    未追踪
A        新添加的缓存区文件
M        修改过的缓存区文件
   M     已修改，但未放入缓存区  
AM    新添加的缓存区文件，但被修改后还未缓存
MM    修改过的缓存区文件，但被修改后还未缓存
D        源文件被删除，追踪和暂存区也被删除
  D     源文件被删除，但追踪和暂存区未删除
忽略文件列表
.gitignore        文件会被自动追踪
文件 .gitignore 的格式规范如下：

所有空行或者以 ＃ 开头的行都会被 Git 忽略。

可以使用标准的 glob 模式匹配。

匹配模式可以以（/）开头防止递归。

匹配模式可以以（/）结尾指定目录。

要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。
