# learngit
### 写在前面
- 本文档是学习 [廖雪峰Git教程](http://t.cn/zQ6LFwE) 后所做的笔记，教程帮忙很大，非常感谢！
- 本笔记主要记录了教程中所用的命令，概念内容不包括在内。
- 建议看完教程后再看Git官网的 [Pro Git](https://git-scm.com/book/zh/v2) 一书。
- 最后附上本人的 [GitHub](https://github.com/tolvgx) ，感谢拨冗翻阅拙作,敬请斧正。

## 一、Git安装
安装完成后，还需要最后一步设置，在命令行输入：

    $ git config --global user.name "Your Name"
	$ git config --global user.email "email@example.com"

注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

## 二、创建版本库 

    $ git init
	Initialized empty Git repository in /Users/tolvgx/learngit/.git/

瞬间Git就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），细心的读者可以发现当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用ls -ah命令就可以看见。

### 添加文件到Git仓库

    $ git add <file>
    $ git commit -m "log"

- 第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；
- 第二步，使用命令git commit完成。-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

## 三、时光穿梭机

	$ git reset --hard HEAD^
	$ git reset --hard commit_id

- Git允许我们在版本的历史之间穿梭。HEAD指向的版本就是当前版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100，或者直接写commit_id。
- git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。具体参考下面的<撤销修改>。

### 特殊命令

	$ git status
	$ git log
	$ git reflog
	$ git diff <file>/git diff HEAD -- <file>

- 要随时掌握工作区的状态，使用git status命令。
- git log命令显示从最近到最远的提交日志
- Git提供了一个命令git reflog用来记录你的每一次命令 
- 如果git status告诉你有文件被修改过，用git diff可以查看修改内容。`git diff <file>`命令可以查看工作区和暂存区的区别。`git diff HEAD -- <file>`命令可以查看工作区和版本库里面最新版本的区别。

### 重要概念
- 工作区：  
就是你在电脑里能看到的目录，比如我的learngit文件夹就是一个工作区。    
- 版本库：  
工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
- 暂存区：  
Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区。
- 分之：  
Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

		前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：  
		第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；  
		第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。  
		因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。  
		你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

### 重要特性

下面，我们要讨论的就是，为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。  
你会问，什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。

	操作：第一次修改 -> git add -> 第二次修改 -> git commit
	结果：第二次的修改没有被提交
	原因：我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。
	解决：第一次修改 -> git add -> 第二次修改 -> git add -> git commit

### 撤销修改
- 丢弃工作区的修改：`$ git checkout -- <file>`  
命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令
- 把暂存区的修改回退到工作区：`$ git reset HEAD <file>`  

**小结：**  
场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- <file>`。  
场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。  
场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。  

### 删除文件
一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：  

	$ rm test.txt
	
现在你有两个选择：  

- 一是确实要从版本库中删除该文件，那就用命令`$ git rm test.txt`删掉，并且`git commit`，文件就从版本库中被删除了。  
- 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：`$ git checkout -- test.txt`

## 四、远程仓库（GitHub）

第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：`$ ssh-keygen -t rsa -C "youremail@example.com"`  

第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。

### 添加远程库

首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库。在Repository name填入learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库。

目前，在GitHub上的这个learngit仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

*1.把一个已有的本地仓库与之关联：*

    $ git remote add origin git@github.com:tolvgx/learngit.git

请千万注意，把上面的tolvgx替换成你自己的GitHub账户名，否则，你在本地关联的就是我的远程库，关联没有问题，但是你以后推送是推不上去的，因为你的SSH Key公钥不在我的账户列表中。添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

*2.把本地库的所有内容推送到远程库上：*

    $ git push -u origin master

把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。  
由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令：

	$ git push origin master

### 克隆远程库
Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。
	
	$ git clone git@github.com:tolvgx/learngit.git

## 五、分支管理
- 分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。  
- 现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。  
- 其他版本控制系统如SVN等都有分支管理，但是用过之后你会发现，这些版本控制系统创建和切换分支比蜗牛还慢，简直让人无法忍受，结果分支功能成了摆设，大家都不去用。  
- 但Git的分支是与众不同的，无论创建、切换和删除分支，Git在1秒钟之内就能完成！无论你的版本库是1个文件还是1万个文件。

### 创建与合并分支

	查看分支：git branch
	
	创建分支：git branch <name>
	
	切换分支：git checkout <name>
	
	创建+切换分支：git checkout -b <name>
	
	合并某分支到当前分支：git merge <name>
	
	删除分支：git branch -d <name>	

- 在版本回退里，你已经知道，每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即master分支。HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。  
- 一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点，每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长。
- 当我们创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上。你看，Git创建一个分支很快，因为除了增加一个dev指针，改改HEAD的指向，工作区的文件都没有任何变化！不过，从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变。
- 假如我们在dev上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并。所以Git合并分支也很快！就改改指针，工作区内容也不变！合并完分支后，甚至可以删除dev分支。删除dev分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支。

*下面开始实战。*  
首先，我们创建dev分支，然后切换到dev分支：

    $ git checkout -b dev
    Switched to a new branch 'dev'

`git checkout`命令加上-b参数表示创建并切换，相当于以下两条命令：

    $ git branch dev
    $ git checkout dev
    Switched to branch 'dev'

然后，用`git branch`命令查看当前分支：

    $ git branch
    * dev
      master

`git branch`命令会列出所有分支，当前分支前面会标一个*号。    
然后，我们就可以在dev分支上正常提交，比如对readme.txt做个修改，加上一行，然后提交。  
现在，dev分支的工作完成，我们就可以切换回master分支。  

	$ git checkout master
	Switched to branch 'master'

切换回master分支后，再查看一个readme.txt文件，刚才添加的内容不见了！因为那个提交是在dev分支上，而master分支此刻的提交点并没有变。  
现在，我们把dev分支的工作成果合并到master分支上：

	$ git merge dev
	Updating d17efd8..fec145a
	Fast-forward
 	readme.txt |    1 +
 	1 file changed, 1 insertion(+)

`git merge`命令用于合并指定分支到当前分支。合并后，再查看readme.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。
注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。  
当然，也不是每次合并都能Fast-forward，我们后面会讲其他方式的合并。

合并完成后，就可以放心地删除dev分支了：

    $ git branch -d dev
    Deleted branch dev (was fec145a).

删除后，查看branch，就只剩下master分支了：

	$ git branch
	* master

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全。


## 六、常用命令
    cd ls cat mkdir rmdir rm vi pwd

# 未完待续。。。