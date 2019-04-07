



# Git 学习日志



```cmd
cd、mkdir、pwd
git config --list 命令来列出所有 Git 当时能找到的配置，开始跟踪一个文件
git config <key>： 来检查 Git 的某一项配置，如：git config user.name
git help <verb>    git <verb> --help    man git-<verb>：帮助设置

git init：初始化当前文件夹为仓库
git clone [url]：从服务器上下载克隆仓库
	git clone https://github.com/libgit2/libgit2 mylibgit：重命名克隆仓库
	

git add：将某仓库内的文件添加到待处理队列中（添加到.git版本库中的stage暂存区）
	git reset HEAD CONTRIBUTING.md：取消暂存
git commit -m "xxxxx"：将队列中的文件全部提交到本地仓库（暂存区移至当前分支，-m后添加修改信息
	git commit --amend：重新提交，如：
		$ git commit -m 'initial commit'
		$ git add forgotten_file
		$ git commit --amend
git checkout --CONTRIBUTING.md：放弃对文件的修改，**危险**
	
git status：显示自上次commit后，仓库内文件是否被修改
	git status -s：简单形式显示
git diff：显示自上次commit后，仓库内文件的具体修改信息（加入了什么，删除了什么）
git log：显示历史提交版本信息
	git log --pretty=oneline：显示简略的历史版本信息（short，full 和 fuller ）
	-p，用来显示每次提交的内容差异。 你也可以加上 -2 来仅显示最近两次提交
	--stat，用来显示每次提交的简略的统计信息
git reset --hard head^：回退到当前版本之前的一个版本
	或 git reset --hard xxxx：xxxx为git log显示的版本号
git reflog：显示你所使用的命令历史，其中包含版本号，用于重回最新的版本
git rm PROJECTS.md：删除某文件（工作目录和暂存区）
	git rm --cached README（只删除暂存区）
git mv README.md README：改名
git remote add <shortname> <url> 添加一个新的远程 Git 仓库，同时指定简写
	git remote rename a b:将a重命名未b
	git remote show [remote-name]:查看远程仓库信息
	git remote rm a:移除远程仓库
git fetch [remote-name]：拉取所有你还没有的数据
git push [remote-name] [branch-name]

git tag:标签
	git tag -a v1.4 -m 'my version 1.4':附注标签
	git show v1.4:查看信息
	git tag -a v1.2 9fceb02:补打标签,哈希值
	git push origin v1.5:将标签上传到远程服务器(共享标签)
	git tag -d <tagname>:删除标签
	git checkout 2.0.0:检出标签 ???????
git config --global alias.co checkout:设置别名
git push -u origin master：-u参数，会把本地master和远程master关联起来

git checkout -b dev=git branch dev + git checkout dev
git merge b：命令用于将b分支合并指定分支到当前分支
	git merge --no-ff -m "merge with no-ff" b：禁用Fastforward，可以保留在分支上的操作记录
git branch -d b：将b分支删除
git stash:当前工作现场“储藏”起来，等以后恢复现场后继续工作
	git stash list
	git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除
	git stash pop，恢复的同时把stash内容也删了
	git stash apply stash@{0}：恢复指定的stash
git checkout -b dev//基于本地创建分支
	git checkout -b dev origin/dev //基于远程分支创建本地分支

git rebase操作可以把本地未push的分叉提交历史整理成直线；目的是更易查看历史提交的变化，因为分叉的提交需要三方对比。




```

> ###### 1、在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100
>
> ###### 2、git diff 比较的是工作区文件与缓冲区文件的区别（修改后但未git add）
> ######        git diff --cached 和--staged比较的是工作区文件与暂存区（stage）文件的区别
>
> ###### 3、git status -s新添加的未跟踪文件前面有 `??` 标记，新添加到暂存区中的文件前面有 `A` 标记，修改过的文件前面有 `M` 标记。 你可能注意到了 `M` 有两个可以出现的位置，出现在右边的 `M` 表示该文件被修改了但是还没放入暂存区，出现在靠左边的 `M` 表示该文件被修改了并放入了暂存区。
>
> ###### 4、可以创建一个名为 `.gitignore` 的文件，列出要忽略的文件模式。 来看一个实际的例子：
>
> ```console
> $ cat .gitignore
> *.[oa]
> *~
> ```
>
> ###### glob 模式是指 shell 所使用的简化了的正则表达式。 星号（`*`）匹配零个或多个任意字符；`[abc]`匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（`?`）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 `[0-9]` 表示匹配所有 0 到 9 的数字）。 使用两个星号（`*`) 表示匹配任意中间目录，比如`a/**/z` 可以匹配 `a/z`, `a/b/z` 或 `a/b/c/z`等。
>
> ###### 5、
>
> ```console
> git log --since=2.weeks
> ```
>
> 这个命令可以在多种格式下工作，比如说具体的某一天 `"2008-01-15"`，或者是相对地多久以前 `"2 years 1 day 3 minutes ago"`。
>
> ###### 6、clone 是本地没有 repository 时，将远程 repository 整个下载过来。pull 是本地有 repository 时，将远程 repository 里新的 commit 数据(如有的话)下载过来，并且与本地代码merge。
>
> ###### 7、我们一般情况都是写完代码，commit到本地仓库（生成本地仓的commit ID，代表当前提交代码的版本号），然后push到远程仓库（记录这个版本号）
>
> ###### 8、Git 使用两种主要类型的标签：轻量标签（lightweight）与附注标签（annotated）。一个轻量标签很像一个不会改变的分支 - 它只是一个特定提交的引用。然而，附注标签是存储在 Git 数据库中的一个完整对象。 它们是可以被校验的；其中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息；并且可以使用 GNU Privacy Guard （GPG）签名与验证。 通常建议创建附注标签，这样你可以拥有以上所有信息；但是如果你只是想用一个临时的标签，或者因为某些原因不想要保存那些信息，轻量标签也是可用的。
>
> ###### 9、GitHub给出的地址不止一个，还可以用`https://github.com/michaelliao/gitskills.git`这样的地址。实际上，Git支持多种协议，默认的`git://`使用ssh，但也可以使用`https`等其他协议。使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用`ssh`协议而只能用`https`。
>
> ###### 10、开发一个新feature，最好新建一个分支；如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除
>
> ###### 11、
>
> 1. ###### 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
>
> 2. ###### 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
>
> 3. ###### 如果合并有冲突，则解决冲突，并在本地提交；
>
> 4. ###### 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！
>
> ###### 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。
>
> ###### 这就是多人协作的工作模式，一旦熟悉了，就非常简单。
>
> 
>
> 



















> INDEX 01
>
> ###### [`git log --pretty=format` 常用的选项](https://git-scm.com/book/zh/v2/ch00/rpretty_format) 列出了常用的格式占位符写法及其代表的意义。
>
> | 选项  |                    说明                     |
> | :---- | :-----------------------------------------: |
> | `%H`  |      提交对象（commit）的完整哈希字串       |
> | `%h`  |           提交对象的简短哈希字串            |
> | `%T`  |        树对象（tree）的完整哈希字串         |
> | `%t`  |            树对象的简短哈希字串             |
> | `%P`  |       父对象（parent）的完整哈希字串        |
> | `%p`  |            父对象的简短哈希字串             |
> | `%an` |            作者（author）的名字             |
> | `%ae` |             作者的电子邮件地址              |
> | `%ad` | 作者修订日期（可以用 --date= 选项定制格式） |
> | `%ar` |     作者修订日期，按多久以前的方式显示      |
> | `%cn` |          提交者（committer）的名字          |
> | `%ce` |            提交者的电子邮件地址             |
> | `%cd` |                  提交日期                   |
> | `%cr` |       提交日期，按多久以前的方式显示        |
> | `%s`  |                  提交说明                   |







> INDEX 02
>
> | 选项              | 说明                                                         |
> | :---------------- | :----------------------------------------------------------- |
> | `-p`              | 按补丁格式显示每个更新之间的差异。                           |
> | `--stat`          | 显示每次更新的文件修改统计信息。                             |
> | `--shortstat`     | 只显示 --stat 中最后的行数修改添加移除统计。                 |
> | `--name-only`     | 仅在提交信息后显示已修改的文件清单。                         |
> | `--name-status`   | 显示新增、修改、删除的文件清单。                             |
> | `--abbrev-commit` | 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。            |
> | `--relative-date` | 使用较短的相对时间显示（比如，“2 weeks ago”）。              |
> | `--graph`         | 显示 ASCII 图形表示的分支合并历史。                          |
> | `--pretty`        | 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。 |





> INDEX 03
>
> ![1554293630537](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1554293630537.png)



> INDEX 04
>
> ![1554304413372](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1554304413372.png)









> INDEX 04
>
> ![1554349582448](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1554349582448.png)
>
> 上图：仅在dev分支做修改后的快照
>
> 下图：同时在两个分支修改的快照，此时产生无法合并的问题
>
> ​	     解决：打开冲突文件，决定保存那些修改，并再次提交。
>
> ![1554350806458](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1554350806458.png)









> INDEX 05
>
> ![1554351663891](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1554351663891.png)



































###	



