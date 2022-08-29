# 第一周
## 账号及fork地址
* 账号：Mmoly
* fork地址：<https://github.com/Mmoly/practice>

# github学习篇
## 1.创建版本库
```JavaScript
$ mkdir learngit //在文件夹下右键打开Git Bash Here,输入该行会创建一个learngit的文件夹
$ cd learngit //进入learngit文件夹
$ pwd //显示当前Git Bash所处的目录
$ git init //把这个目录变成Git可以管理的仓库：
$ git add readme.txt //把目录下的readme.txt文件添加到仓库（首先目录下必须有该文件,可以多次进行git add,并且一次可以添加多个文件，用空格隔开）
$ git commit -m "wrote a readme file" //把文件提交到仓库,-m后面输入的是本次提交的说明,方便地找到改动记录。
```

## 2.时光穿梭机
```JavaScript
$ git status //查看仓库当前的状态
$ git diff readme.txt //查看修改后的readme.txt文件和原来有什么不同
$ git add readme.txt //再次将readme.txt文件添加到仓库
$ git commit -m "add distributed" //把readme.txt文件再次提交到仓库
```

### 2.1 版本回退
```JavaScript
$ git log //显示从最近到最远的提交日志,如果嫌输出信息太多，看得眼花缭乱的,可以试试加上--pretty=oneline参数
$ git reset --hard HEAD^ //将readme.txt回退到上一个版本,上上一个版本就是HEAD^^,往上100个版本写成HEAD~100（回退以后，当前版本将无法找到）
$ cat readme.txt //查看readme.txt文件中的内容
$ git reset --hard 1094a //1094表示被回退后无法找到的版本号前几位字符,版本号没必要写全,前几位就可以了,Git会自动去找。
//Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL
$ git reflog //用来记录每一次命令
```

### 2.2 工作区和缓存区
1. **工作区：**在电脑里能看到的目录，比如learngit文件夹就是一个工作区  
2. **版本库：**工作区的一个隐藏目录.git，这个不算工作区，而是Git的版本库。
>Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。
  + 用git add把文件添加进去，实际上就是把文件修改添加到暂存区
  + 用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支

### 2.3 管理修改
>*Git跟踪并管理的是修改，而非文件。*
**<u>放入暂存区（git add）的文件没有提交时再次对文件进行更改，更改后的文件不放入暂存区，此时如果提交（git commit）,则提交的是最开始放入暂存区的文件</u>**
```JavaScript
$ git diff HEAD -- readme.txt //查看工作区和版本库里面最新版本的区别
```

### 2.4 撤销修改
```JavaScript
$ git checkout -- readme.txt //把readme.txt文件在工作区的修改全部撤销
git reset HEAD readme.txt //把eadme.txt文件在暂存区的修改撤销掉
```
>撤销情况
>>一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
>>一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
>>>总之，就是让这个文件回到最近一次git commit或git add时的状态。

>*1. 原来的git checkout 可以使用 git restore 代替*  
>*2. 原来的git reset HEAD 可以使用 git restore --staged 代替*  
>*3. 最新版的git提示都已经更换成了restore*  
>*4. 原来的git checkout branchName 可以用 git switch branchName 代替。*

### 2.5 删除文件
```JavaScript
$ rm test.txt //删除test.txt文件，通常直接在文件管理器中把没用的文件删了
```
>删除文件后，Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告知哪些文件被删除了

<u>两种删除情况</u>  
+ 一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit

```JavaScript
$ git rm test.txt
$ git commit -m "remove test.txt"
```

+ 另一种情况是删错了，版本库里还有，所以可以很轻松地把误删的文件恢复到最新版本

```JavaScript
$ git checkout -- test.txt
```

## 3.远程仓库
```JavaScript
$ ssh-keygen -t rsa -C "youremail@example.com" //创建SSH Key，创建完成后，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人
```

### 3.1 添加远程仓库
**流程：**  
1. 登录github，找到new repository新建仓库<br><img src="./add_warehouse.png" width="50%">
2. 可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。
```JavaScript
$ git remote add origin git@github.com:Mmoly/learngit.git //根据GitHub的提示，在本地的learngit仓库下运行命令,即可将本地仓库与远程仓库相关联
$ git push -u origin master //把本地库的所有内容推送到远程库上
```
>+ 把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
>+ 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
>>+ 从现在起，只要本地作了提交，就可以通过命令：
**$ git push origin master**
3. 删除远程库
```JavaScript
git remote -v //查看远程库信息
git remote rm <name> //删除远程库(仅仅是删除了与远程库的关联，需要删除远程库必须进入github网站，到后台中进行删除)
```

### 3.2 从远程库克隆
**流程：**  
1. 登录github，找到new repository新建仓库，勾选Add a README file<img src="./add_warehouse_fare.png" width="50%">
2. 使用 git clone 克隆一个本地库
```JavaScript
$ git clone git@github.com:Mmoly/gitskills.git //用命令git clone克隆一个本地库
$ ls //查看当前目录下存在的文件
```

## 4.分支管理
>创建一个属于自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

### 4.1 创建与合并分支
```JavaScript
$ git checkout -b dev //创建dev分支，git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：
$ git branch dev
$ git checkout dev

$ git branch //查看当前分支，该命令会列出所有分支，当前分支前面会标一个*号
$ git add readme.txt //在新分支中添加
$ git commit -m "branch test" //在新分支中提交

$ git checkout main //切换回main分支
$ git merge dev //合并dev分支到当前分支
$ git branch -d dev //删除dev分支

//新版
$ git switch -c dev //创建并切换到新的dev分支
$ git switch main //切换到已有的main分支
```

### 4.2 解决冲突
>当两个分支分别对各自分支中的文件进行修改并提交后，Git无法执行“快速合并”（git merge），只能试图把各自的修改合并起来，但这种合并就可能会有冲突
```JavaScript
$ cat README.md //读取文件内容
//修改后重新提交，使两个分支文件呢人变为后一个修改后的当前分支内容（变相去除另外一个分支的指向文件）
$ git add readme.txt 
$ git commit -m "conflict fixed"

$ git log --graph --pretty=oneline --abbrev-commit //带参数的git log也可以看到分支的合并情况
$ git branch -d feature1 //删除feature1分支
```
<img src="./conflict.png" width="50%">
<img src="./conflict_merge.png" width="50%">

### 4.3 分支管理策略
>通常，合并分支时，如果可能，Git会用<u>Fast forward</u>模式，但这种模式下，删除分支后，会丢掉分支信息。  
>如果要强制禁用<u>Fast forward</u>模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息

**--no-ff方式的git merge：**
```JavaScript
$ git switch -c dev //创建并切换dev分支
//修改readme.txt文件，并提交一个新的commit：
$ git add readme.txt 
$ git commit -m "add merge"

$ git switch main //切换回main分支
$ git merge --no-ff -m "merge with no-ff" dev //合并dev分支，--no-ff参数表示禁用Fast forward
$ git log --graph --pretty=oneline --abbrev-commit //查看历史分支
```
<img src="./no-ff.png" width="50%">

>分支策略
>>在实际开发中，应该按照几个基本原则进行分支管理：
>>>1. 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
>>>2. 那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
>>>3. 你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

### 4.4 Bug分支（多分支的合并处理）
```JavaScript
$ git stash //当前工作现场“储藏”起来，等以后恢复现场后继续工作（用于创建多个分支）

//确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支:
$ git checkout master
//修复完成后，切换到master分支，并完成合并，最后删除用于修复bug的分支
$ git switch master
$ git merge --no-ff -m "merged bug fix 101" issue-101

$ git switch dev //切换回原来dev的分支
$ git stash list //查看储藏的工作现场
```
**<u>两种恢复方式</u>**
```JavaScript
$ git stash apply //恢复后，stash内容并不删除
$ git stash drop //删除stash内容

$ git stash apply //恢复后，stash内容并不删除
```
>多次stash，恢复的时候，先用<u>git stash list</u>查看，然后恢复指定的stash，用命令：<u>$ git stash apply stash@{0}</u>

+ 当前分支也会存在主分支的bug，在解决主分支bug时无需将整个主分支进行merge，方法：
>把4c805e2 fix bug 101这个bug分支提交所做的修改“复制”到dev分支
```JavaScript
$ git cherry-pick 4c805e2 //该git操作会使dev分支自动提交(commit)一次
```

### 4.5 强制删除还未合并的分支
```JavaScript
$ git branch -D feature-vulcan //强制删除 feature-vulcan 分支
```

### 4.6 多人协作
```JavaScript
$ git remote //查看远程库的信息
$ git remote -v //显示更详细的远程库信息
```

1. 推送分支：把该分支上的所有本地提交推送到远程库
```JavaScript
$ git push origin main //推送main分支到远程库，推送时，要指定本地分支
$ git push origin dev //推送dev分支到远程库
```
2. 抓取分支
```JavaScript
//另一个直接创建远端dev到本地的
$ git checkout -b dev origin/dev //创建本地dev分支，创建远程origin的dev分支到本地
$ git push origin dev //把dev分支push到远程

//最开始创建远端一级目录origin为本地main的
$ git branch --set-upstream-to=origin/dev dev //设置dev和origin/dev的链接
$ git pull //把最新的提交从origin/dev抓下来
```

### 4.7 Rebase
>把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。
```JavaScript
$ git rebase
```

## 5.标签
>版本库的一个快照，是一个让人容易记住的有意义的名字，方便查找版本库

### 5.1 创建标签
>创建的标签都只存储在本地，不会自动推送到远程
**流程：**
1. 切换到需要打标签的分支上：
```JavaScript
$ git branch //查看当前仓库所具有的分支
$ git checkout main //切换到main分支
```

2. 为当前分支打一个新标签
```JavaScript
$ git tag v1.0 //将当前分支的当前版本标记为v1.0
$ git tag //查看当前分支的所有标签

$ git log --pretty=oneline --abbrev-commit //查看历史提交的commit id
$ git tag v0.9 f52c633 //将id为f52c633的commit版本号标记为v0.9
$ git tag -a v0.1 -m "version 0.1 released" 1094adb //创建带有说明的标签，用-a指定标签名，-m指定说明文字
$ git show v0.1 //查看标签为v0.1版本的说明文字
```
>注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

### 5.2 操作标签
```JavaScript
$ git tag -d v0.1 //删除标签名为v0.1的版本的标签名,创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

//推送
$ git push origin v1.0 //推送某个标签到远程
$ git push origin --tags //一次性推送全部尚未推送到远程的本地标签


//删除已推送到远程的远程标签
  //1.先从本地删除
  $ git tag -d v0.9
  //2.再从远程删除
  $ git push origin :refs/tags/v0.9
```
```JavaScript
```
