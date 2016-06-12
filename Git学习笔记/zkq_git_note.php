
相关链接:
1.git速成
http://stormzhang.com/github/2016/05/30/learn-github-fromzero3/
2.解决身份问题不能提交的:
http://www.mamicode.com/info-detail-595153.html
3.廖雪峰Git教程
http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

一,搜索并下载git
https://git-for-windows.github.io/ 或百度
国内镜像:http://pan.baidu.com/s/1skFLrMt#path=%252Fpub%252Fgit

二,设置git
1,将git,??????/git/bin/路径加入系统环境变量

2,设置用户名和邮箱,
	git config user.email "这个是邮箱"
	git config user.name "你的名字"
	$ git config --global user.name "Your Name"
	$ git config --global user.email "email@example.com"
	//--global 用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

3,创建仓库目录,并进入 cd

4,初始化git,查看文件夹状态
	git init
	git status

5,添加,删除,提交文件	
	git add a.txt 					//将文件加入待提交缓存
	git rm a.txt 					//删除文件
	git commit -m '这是提交文件的注释'

6,撤销修改
	git checkout -- 文件名称		//丢弃工作区的修改内容,让这个文件回到最近一次git commit或git add时的状态
	git reset HEAD 文件名称			//把暂存区的修改撤销掉（unstage），重新放回工作区,让这个文件回到最近一次git commit

7,查看文件修改内容,提交信息,工作区和版本库区别
	git diff						//查看被修改文件的内容
	git diff HEAD -- 文件名 		//查看工作区和版本库里面最新版本的区别
	git log							//查看提交信息
	git log --pretty=oneline		//查看提交信息,简化版

8,版本回退
	git reset --hard HEAD^ 			//返回上个版本
	git reset --hard HEAD^^ 		//返回上上个版本
	git reset --hard HEAD~100 		//返回前100个版本
	git reset --hard commit_id		//返回commit_id版本,commit_id为commit的版本号,版本号可通过 git log 或 git reflog 查看
	git reflog						//查看命令历史,可以找到各版本的版本号commit_id

9,查看分支,添加分支,删除分支,合并分支,切换分支
	git branch						//查看所有分支
	git branch a 					//创建分支a
	git branch -d a					//删除分支a,未合并时不会被删除
	git branch -D a 				//删除分支a,强制删除
	git checkout a 					//切换分支到a
	git checkout -b a 				//创建并切换到分支a
	git merge a 					//必须先切换到主分支,合并a分支到当前分支
	git log --graph					//查看分支合并图

10.创建,切换标签
	git tag									//查看已创建的标签
	git tag v1.0 							//创建标签v1.0
	git tag v0.9 6224937					//创建版本id为,6224937,的版本标签为,v0.9
	git tag -a v0.1 -m "说明文字" 3628164	//用-a指定标签名，-m指定说明文字
	git tag -s v0.2 -m "说明文字" fec145a	//通过-s用私钥签名一个标签,签名采用PGP签名,必须首先安装gpg(GnuPG)
	git tag -d v0.1 						//删除一个本地标签
	git push 库名 <标签名> 					//推送一个本地标签
	git push 库名 --tags 					//推送全部未推送过的本地标签
	git push 库名 :refs/tags/<标签名>		//删除一个远程标签
	git checkout v1.0 						//切换到标签v1.0
	git show 标签名称						//查看标签详情

11.远程仓库
	A,本地创建SSH Key:id_rsa是私钥,id_rsa.pub公钥
	$ ssh-keygen -t rsa -C "youremail@example.com"	//在用户主目录里创建.ssh目录，里面有id_rsa和id_rsa.pub两个文件

	B,GitHub添加ssh key
	打开“Account settings”，“SSH Keys”页面;然后点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

	C,GitHub创建一个新仓库
	[new repository]->[Repository name]->[Description]->[cteate respository]

	D,把本地仓库的内容推送到GitHub仓库,与远程仓库建立关联,HTTPS/SSH为GitHub的远程仓库地址
	git remote add 远程仓库名称 HTTPS/SSH
	//Example		
	//git remote add tips git@github.com:zhangfor14/tips.git 		//SSH:git@github.com:zhangfor14/tips.git
	//git remote add helper https://github.com/zhangfor14/tips.git 	//HTTPS:https://github.com/zhangfor14/tips.git

	E,把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
	git push 仓库名 master
	git push -u 仓库名 master
	//由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

	F,从远程库克隆
	$ git clone git@github.com:zhangfor14/helper.git


