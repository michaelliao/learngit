廖老师写的太好了，以前看过一些书啊在线教程啊都没有搞明白，这回豁然开朗了，谢谢学长~~~

# 基本操作

## 初始化

进入工程所在文件执行：

    git config global user.name "wx"
    git config global user.email "111@gmail.com"
    git init 

## 基本提交命令

    git add . //添加所有文件到暂存区 也可以单独指定文件
    git commit -m "comment" // 提交修改
    
## 提交前查看
  
    git status //查看是否改动、是否暂存、和远程仓库版本关系
    git diff [file]// 查看文件是否被修改
    
## 回退

git 使用`HEAD`指向当前版本,`HEAD^`HEAD后跟几个`^`就代表指向倒数第几个版本，`HEAD~100`指向倒数第100个版本
      
      git log 查看提交日志
      git reset --hard HEAD^^ 回退到指定版本
如果后悔了，可以通过`git reflog`查看回退前的版本号，使用`git reset --hard [id]`来还原

## 版本库

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/72167540.jpg)
工程下的`.git`文件主要存储着stage(暂存区),自动创建的分支master和指针HEAD

`git add`实际是将文件添加到暂存区
`git commit`实际是将暂存区的文件提交到当前分支

## 管理修改
  - 查看修改
    `git diff HEAD -- readme.txt`查看工作区和版本库的区别

  - 丢掉修改
    
    `git checkout -- [file]`
    如果修改后没有放入暂存区则会回退到上次`git commit`的状态
    如果放入了暂存区再修改的话会回退到上次`git add`的状态
    **注意:`--`很重要，没有它checkout表示的是切换分支**
    那么想把暂存区的内容也丢掉呢？
    1. `git reset readme.txt` 将暂存区放回到工作区
    2. `git checkout -- readme.txt` 像平常一样使用checkout回滚

## 删除文件

为了防止以后要把删除的文件找回，建议使用`git rm [file]`命令删除文件，而不是直接用系统的`rm`命令。
        
    git rm readme.txt
    git checkout -- readme.txt
    
# github

## 创建ssh
运行下面的命令生成ssh秘钥
`ssh-keygen -t rsa -C "youremail@example.com"`
这会在`~/`目录下生成`id_rsa`和`id_rsa.pub`两个文件，前面的私钥，后面的是公钥

## github中添加 key
登录github，打开`Account setting`在`ssh keys`页面粘贴`id_rsa.pub`中的文件
![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/70759590.jpg)
这个key的作用是识别推送是你本人发出而不是别人冒充的。
可以粘贴多个key，每台电脑对应一个

## 关联远程仓库
1. 登录github，右上角找到`create a new repo`按钮
  ![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/39294479.jpg)
  repo名字和本地文件名一样，比如"learngit"，然后点击`create repo`按钮
2. 绑定远程仓库
  将本地仓库与远程仓库关联在一起
  `git remote add origin git@github.com:michaelliao/learngit.git`
  其中`michaelliao`替换成你自己的github账户名，否则无法推送上去，因为你的ssh秘钥不在`michaelliao`账户列表上。
  `origin`是git远程仓库的默认名称
3. 推送到远程仓库
  `git push -u origin master`
  由于远程分支刚创建，它是空的，所以使用`-u`参数将远程仓库的`master`分支和本地仓库的`master`分支关联起来，以后的推送就可以直接使用`git push origin master`指令进行推送了。

也可以在github上新建一个repo，然后使用`git clone [url]`将其克隆到本地再进行开发。

# 分支

## 分支
假如我们要为项目添加新的功能，为了不影响别人工作，我们可以创建新的分支然后在这个新的分支上干活，完成后在合并他们。

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/14879848.jpg)
如上图所示，分支实际上是一条时间线，最开始的时候git用`master`指向最新的提交，再用`head`指向`master`,每次提交，master都向前移动一步。

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/79881671.jpg)
当我们创建新的分支`dev`时,git新建一个指针`dev`指向`master`相同的提交，再把`HEAD`指向`dev`

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/82579991.jpg)
以后每次提交dev就向前移动一步。

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/39152813.jpg)
工作完之后将两个分支合并

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/7522245.jpg)
最后将`dev`分支删除

**代码**
1. 创建分支
        git checkout -b dev//创建并切换到分支
它相当于
  
        git branch dev  //创建分支
        git checkout dev  //切换分支
  
2. 显示当前分支
        $ git branch
        * dev
          master
3. 改动并提交dev分支
        $ git add readme.txt 
        $ git commit -m "branch test"
4. 切换回master分支并合并dev分支
        $ git merge dev
        Updating d17efd8..fec145a
        Fast-forward
        readme.txt |    1 +
        1 file changed, 1 insertion(+)
  因为master分支没有改动，所以内部直接将他们合并了，但是这样做之后查看日志是不会知道曾做过合并的，为了显示发生过合并，可以使用`--no-ff`参数禁用`fast-forward`

        $ git merge --no-ff -m "merge with no-ff" dev
        Merge made by the 'recursive' strategy.
         readme.txt |    1 +
         1 file changed, 1 insertion(+)
         
5. 删除dev分支
        git branch -d dev

**推荐新建分支完成任务，合并后再删除分支**

## 解决冲突

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/30180283.jpg)

当同时在修改了多个分支，比如修改新建的`feature1`分支的同时`master`分支也修改相同的文件，这时就产生了冲突，不能使用快速合并了。

git合并报错，告诉我们readme.txt存在冲突，需要手动改正

    $ git merge feature1
    Auto-merging readme.txt
    CONFLICT (content): Merge conflict in readme.txt
    Automatic merge failed; fix conflicts and then commit the result.
    
打开readme.txt

    Git is a distributed version control system.
    Git is free software distributed under the GPL.
    Git has a mutable index called stage.
    Git tracks changes of files.
    <<<<<<< HEAD
    Creating a new branch is quick & simple.
    =======
    Creating a new branch is quick AND simple.
    >>>>>>> feature1
    
git 用`<<<<<<<` `======` 和`>>>>>>>>`标记不同分支的内容
将它改为如下
      
    Creating a new branch is quick and simple.

再提交

    $ git add readme.txt 
    $ git commit -m "conflict fixed"
    [master 59bc1cb] conflict fixed

使用带参数的`git log`命令可以查看分支合并情况

    $ git log --graph --pretty=oneline --abbrev-commit
    *   59bc1cb conflict fixed
    |\
    | * 75a857c AND simple
    * | 400b400 & simple
    |/
    * fec145a branch test

最后删除分支

    $ git branch -d feature1
    Deleted branch feature1 (was 75a857c).
    
## 分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；

你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：

![](http://7xkyov.com1.z0.glb.clouddn.com/16-10-8/96692231.jpg)

## bug 分支

如果在`dev`上开发还没有完成不能提交情况下，接到任务要马上修复`master`分支的bug，这时候直接新建修复bug分支会丢掉`dev`分支上做的修改，这时候就需要用`git stash`保存现场

    git stash \\存储工作现场
    
    git checkout master   \\切换到master分支
    git checkout -b issue_101 \\新建issus_101分支用于修复bug
    [do something]
    git add .
    git commit -m  "fix bug 101" \\提交修改
    git checkout master
    git merge --no-ff -m "merge bug fix 101"  \\切换回master分支并合并分支
    git branch -d issue_101 \\ 删除issue_101分支
    
    git checkout dev  \\回到dev分支继续干活
    git status  \\ 这是看分支状态发现是干净的
    git stash list \\列出stash
    git stash pop \\ 恢复缓存的dev状态，并将stash删除 或者使用`git stash apply`这个命令不会删除stash， 或者使用`git stash apply stash@{0}`指定要回复的现场

## feature 分支

软件开发中，常常会添加各种各样的功能，为了不把主分支搞乱，需要新建分支工作。但有时候开发到一半这个功能会被取消，这时候使用命令`git branch -d feature`会失败，提示该分支没有被合并，不能被删除。应该使用
`git branch -D feature`强行删除。

# 多人协作

1. 查看远程信息

        $ git remote -v
        origin  git@github.com:michaelliao/learngit.git (fetch)
        origin  git@github.com:michaelliao/learngit.git (push)
    如果没有推送权限就看不到远程的`push`地址

2. 推送分支
  推送master分支

        $ git push origin master
  推送其他分支

        $ git push origin dev
        
  - master分支是主分支，因此要时刻与远程同步；
  
  - dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
  
  - bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
  
  - feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发
  
3. 抓取分支

  当从别人的远程库clone时，默认情况下只能看到`master`分支
  
        $ git branch
        *master
  需要手动关联本地分支到远程分支
  
        $git checkout -b dev origin/dev

  1. 首先，可以试图用git push origin branch-name推送自己的修改；
  
  2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
  
  3. 如果合并有冲突，则解决冲突，并在本地提交；
  
  4. 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！
  
  如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。
  
  这就是多人协作的工作模式，一旦熟悉了，就非常简单。

# 标签

标签和分支类似，是指向某个提交的指针，但是分支可以移动，标签不能移动。可以给标签取一个有意义ç        git clone git@github.com:michaelliao/bootstrap.git
