1，在版本仓库（repository,一般目录）下右键git bash自动定位到版本库，但是目前状态还不归git管理，通过git init才能初始化该目录，使之成为版本仓库；命令执行后有个隐藏的.lsh文件生成

2，在该目录下新增一个文件readme1.txt和readme2.txt，文件内容随便；
git add readme1.txt readme2.txt         类似提交到缓存区  多个文件空格隔开
git commit -m "说明"                    正式提交
git status                              查看当前文件状态 哪些文件改变了
git diff                                diff意为different   即show different 
git log 								查看提交日志
git log -pretty=oneline  				简介格式查看提交日志
git reset --hard head^					版本回滚到上一个版本
git reset --hard head^^					版本回滚到上上一个版本   同理 --hard head^^^ 上上上一个版本
git reset --hard head~10				版本回退到之前第10个版本
git reset --hard 12312412...			根据git log日志显示的id回退到特定版本
git reflog 								查看提交记录日志  
git checkout -- readme.txt  			把修改的文件内容全部撤销 1，未add到缓存区，直接回滚至原始版本 			2，已add缓存区，那么在此修改的内容就会撤销，即回到add后的版本 例如 文件已经git add 然后又添加了一行内容 这时候git checkout的话那么这行内容就被撤销
git checkout 其实是版本库里内容替换工作区的内容
git reset head readme.txt   			git add至暂存区的内容会被撤销，这时候暂存区就是干净的  ，注意仅仅是暂存区是干净的 但是修改依然存在只是没git add
git rm a.txt							从版本库中删除文件   



 


注意点：
	git commit 只提交暂存区（stage）的文件 即文件必须通过git add命令增加到暂存区  commit会将暂存区的文件提交至git给我们创建的分支master中去
	git diff 表示的是当前文件内容和上次已经提交的内容之间的比较，而不是和git add命令后的比较
	如果文件多次修改了内容，每次都修改后都git add但是没commit，这种情况下统一提交 ，所以文件在修改的过程防止意外可以多次git add
	head可以表示最新指向最新的版本，即最近commit的版本
	.git目录可以看做是版本库   工作区就是git init的目录 git add的区域就是版本库
	
	
	
在本地和远程建立好库后，通过git remote add origin git@server-name:path/repo-name.git关联两个库；
第一次将本地commit的文件推送至远程库通过git push -u origin master   
以后每次提交就不需要-u  
master -- > master  将本地分支master提交至远程GitHub的master分支

正常的项目顺序也许是 远程GitHub已存在库了，本地需要克隆
例如远程存在spring库，在本地建立一个任意（远程spring会整体clone过来）文件夹  初始化该目录使之成为git管理的仓库
通过命令git clone git@github.com:yxf9527/Spring.git关联
	
	
	

             
