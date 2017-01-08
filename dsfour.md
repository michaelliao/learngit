#git廖神教程学习总结

##先说点什么：
前几天开始学习使用github,但一直找不到很全面的教程，这里先感谢廖神，请收下我的膝盖。
首先说一下对githug的理解吧，githug是一个分布式的项目版本托管平台，无论是个人项目还是多人协作
的
项目，都能轻松做到版本托管。更重要的是，github使得多人协作的项目变得简单易行，并且能离线工作
。身为菜鸟的我装逼结束，装逼可以，但不要太过分！

##github的使用：
github有本地库和远程库之分，远程库就是github上大家都可以看到，可以fork，可以clone的库，是大家
共享的。而本地库是你个人离线工作的地方，当你参与到一个项目之中（无论是你创建的项目还是别人的
项目），你都先要把当前已经存在的项目从远程库clone到本地库上，然后才开始工作，例如为项目增加新
的功能。当你完成你的工作后，就可以把你本地库里的已经加了新的功能的项目push到远程库，如果是别
人的项目，你还需要进行pushrequest操作，进行合并库请求。请求项目的发起者将原本的项目和你实现了
新的功能的代码进行合并库，这时项目的发起者就会对你的代码进行测试，何不合并库就看你的代码硬不
硬咯！

##从廖神教程里总结出来的一些命令操作：

##1.如果你想发起一个项目，首先可以建立一个本地仓库

//首先要在github路径下建立一个文件夹
mkdir rep-name
//进入该文件夹
cd rep-name
//把这个目录变成Git可以管理的仓库
git init 
//开始工作，例如在rep-name文件夹下建立一个readme.txt文件，把文件加入暂存区,注意大小写要匹配
git add readme.txt
//把readme.txt提交到当前分支上，提交又叫commit
git commit -m "关于本次提交你想记录点什么"

在这个过程中，可以使用 git statuus 查看当前工作区，暂存区，分支状态。使用git diff可以查看修改
的内容。

##2.坐在时光机，在时空中穿梭
在工作中，你不断的提交修改。有时你脑子有点乱，把文件改坏了，或者误删了文件，就可以使用git的版
本回退功能对文件进行恢复。

//查看commit记录
git log
//HEAD是一个指针，指向我们当前版本，HEAD^表示前一个版本，HEAD~100表示第前100个版本
//以下为版本回退操作
git reset --hard HEAD^
//这样你就可以回到之前的一个版本了
//你还可以使用通过commit记录查询到commit id,通过commit id进行版本回退
git reset --hard commit id（前几位就好）
//还可以使用git reflog 查看命令历史

##3.工作区和暂存区：		

工作区(work directory)就是我们在电脑里能看到的目录，比复foo文件夹
版本库(repository)工作区有一个隐藏目录.git，它不属于工作区，而是git的版本库
git的版本库里存在了很多东西，其中最重要的就是：
称为stage(或者叫index)的暂存区
git为我们创建的第一个分支master
指向master的指针HEAD

//把文件添加到暂存区
git add file_name
//把暂存区文件提交到当前分支
git commit
//因为只有默认创建的master分支，所以commit就是往master分支提交
//因为每次commit的都是暂存区的内容，所以没有被add的内容不会被commit
//使用如下命令可以比较工作区文件和暂存区文件的异同
git diff -- file

好累啊
我不想再解释那么多了，记录命令就好了。。。。。

##4.撤销修改和删除文件

//撤销工作区的修改
git checkout --filename
//撤销已经提交到暂存库stage中的修改
git reset HEAD filename
//撤销已经提交到分支上的修改，请用上面讲到的版本回退
//删除本地文件
rm filename
//必须保持版本库文件和工作区文件的一直，所以你这时候还得删除版本库中的文件，或者撤销上步操作
//删除版本库中文件
git rm filename

##5.远程仓库
github 一个神奇的网站

关联本地仓库和远程仓库
首先要上github官网申请一个账号（我们欢迎你来，但是你要做个报告。。）

由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，还需要一点设置：
第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa
和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git
 Bash），创建SSH Key：
ssh-keygen -t rsa -C "your email_address"
接下来的步骤请百度。。。

//把本地仓库与一个空的远程仓库相关联, 在本地的一个仓库下，例如learngit下运行
git remote add origin git@github.com:you_github_username/learngit.git
//第一次推送master分支的所有内容
git push -u origin master
//以后推送使用
git push origin branch_name
//只有把本地仓库与空的远程仓库关联时需要手动建立连接，当我们从远程仓库clone项目到本地时会自动
建立关联，关联名自动设置为origin

//从远程仓库clone项目到本地仓库
git clone http/ssh

##6.是时候开始建立分支了
在一个多人合作的项目中，切记master是主线，也是稳定版本库。我们每个人都应该在master绳新建一个分支，在分支上工作，分支是不稳定的，master是稳定的，当工作完成后，再将master和分支merge。

//创建分支
git branch dev
//版本库从master切换到分支dev上
git checkout dev
//也可以一气呵成
git checkout -b dev
//查看所有分支
git branch
//在分支上完成工作，合并master和当前分支，首先切换回master
git checkout master
//合并当前分支到某分支
git merge dev
//删除分支
git branch -d dev
//如果master分支和子分支有conflict，则先要解决冲突，再进行合并

bug分支：
git分支管理非常强大，每个bug都可以使用临时分支来解决，合并后就可以删除了
一个很常见的bug修复流程:
//首先使用git stash将当前工作区储藏起来，以备日后恢复工作
git stash
//这时又是干净的工作区了，若要在master上修复bug，切换到master分支
git checkout master			
//创建并切换到bug分支issue-101
git checkout -b issue-101		
//修复bug完成后，切换到master分支，并完成合并，然后删除bug分支
git checkout mater		切换到master分支
git merge --no-ff issue-101 -m "merge bug fix 101"	合并分支
git branch -d issue-101	删粗bug修复分支
//bug解决后，切换回dev分支
git checkout dev
//要恢复stash起来的工作区，首先使用下面的命令查看stash list
	$ git stash list
//要恢复工作区，方法一,恢复stash@{0}存储的工作区,然后删除stash{0}
git stash apply stash@{0}	
git stash drop stash@{0}	
//要恢复工作区，方法二，恢复工作区，并删除stash
git stash pop			

feature分支：
开发时，有时候希望添加一些新功能，但我们不希望实验性的代码把主分支弄坏,可以创建feature分支，
在上面开发，完成后再合并，删粗
//首先新建一个feature分支
git checkout -b feature-newfun
//开发完成后回到dev分支，准备合并
git checkout dev
//如果一切顺利就可以合并并删除feature分支了
git merge --no-ff feature-newfun -m "add new fun"
git branch -d feature-newfun
//如果这时情况有变，要取消新功能，我们就需要销毁feature分支
git branch -d feature-newfun 
//这时会销毁失败，因为新的分支还没有合并，需要强制销毁
git branch -D feature-newfun
//至此删除feature分支完成

##7.多人协作
当我们从远程仓库中克隆的时候，git只把本地master分支和远程的master分支关联了，并且远程仓库的默
认名称是origin。
//查看远程库的信息
git remote -v
master是主分支，因此要时时刻刻与远程分支同步
dev是开发分支，团队成员都要在上面工作，因此也要时刻与远程分支同步
bug分支只用在本地修复bug，没必要推送，除非老板要看你每周修复几个bug
feature分支是否推送，取决于你是否和小伙伴合作在上面开发

//抓取dev开发分支
git checkout -b dev origin/dev
//从本地push分支到远程库
git push origin branch_name
//如果有冲突，使用git pull 抓取远程库中最新的更新
git pull
//在本地解决冲突后再push到远程库

##8.标签管理
发布一个版本时，我么常常现在版本库中打一个标签，这样就唯一确定了打标签时候的版本，将来无论什
么时候，随时都可以取出打标签的版本，其实就是一个版本快照，git的标签也是一个指针，和分支很像，
不同的是，分支可以移动，而标签不能移动

创建标签：
//首先切换到要打标签的版本
git checkout master
//然后使用如下的命令打标签
git tag v1.0
//可以使用如下的命令查看所有标签
git tag
//打标签默认是打在最近的commit上的，如果要给历史版本打标签,就要先找到历史的commitid再给它大上
git log --pretty=oneline --abbrev-commit
git tag v0.9 633834
注意标签不是按照时间排序，而是按照字母排序的,使用git tag <tagname>查看标签信息还可以创建带
说明的标签，使用-a指定标签名，-m指定说明
git tag -a v0.1 -m "this is a tag" 632345
//还可可以使用-s用私钥签名一个标签
git tag -s v0.2 -m "signed version 0.2 released" f234b3
//签名使用GPG签名，所以必须先安装了GunPG，并且有gpg密钥对

操作标签：
//删除标签：
git tag -d v0.1
//推送标签到远程
git push origin <tagname>
//或者可以一次性推送所有本地标签
git push origin --tags
//删除远程标签，要先删本地的，再删远程的
git tag -d v0.1
git push origin :refs/tags/v0.1