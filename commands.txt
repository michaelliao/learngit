Git is a version control system.
Git is free software.+modified

git config --global user.name 'name'
git config --global user.email 'email@e.com'
mddir learngit
cd learngit
pwd
git init
git add readme.txt
git commit -m 'wrote a readme.txt'
git status
git diff readme.txt
git log #如果日志太长，按q退出
git log --pretty=oneline
git reset --hard head^
git log
git reset --hard 196198(log id前几位)
git commit -m ''	#-m''，空格不会添加到log记录中？
cat readme.txt
git log
git reflog
 change1
 change2
git diff head -- readme.txt	#-- 后带空格
 add
git checkout -- readme.txt #工作空间的文件退回到暂存区中的状态/版本HEAD的状态。
temp
git reset head readme.txt #暂存区的修改退回到工作区。
#测试，工作空间内容。
 新添加delete.txt
 git add delete.txt
 git commit -m 'add delete.txt ampty file'
 rm delete.txt #本地删除文件
 git add delete.txt
 git commit -m 'delete delete.txt' #成功
 
 git checkout -- delete.txt #error,版本库已删除
 git rm delete.txt #fatal:pathspec 'delete.txt' did not match any file(s) known to git
 git reset --hard head^	撤销到上一个版本，delete文件回来了。
 #BUT,其他文件也退回到之前的版本！
 
 rm delete.txt
 git rm delete.txt
 git commit -m 'delete delete.txt' #成功
ssh-keygen -t rsa -C "youremail@example.com" #创建SSH key
git remote add origin git@github.com:hatanooh/learngit.git
git push -u origin master #首次
git push origin master
git clone git@github.com:hatanooh/python.git #从远处github克隆
#branch
git checkout -b dev
 等同于以下两条命令
 git branch dev
 git checkout dev
git branch
git merge dev #当前master分支，合并dev分支到此分支
git branch -d dev #当前master分支，删除分支

git log --graph --pretty=oneline --abbrev-commit
master
f1
git log --graph --pretty=oneline --abbrev-commit
#最好不要再bash中粘贴命令，极容易带回车导致立即执行，尤其commit -m ''导致丢失数据
git merge --no-ff -m 'XX' dev #?dev?
git branch -d dev #删除分支。如果还未merge，提示
git branch -D dev #强制删除分支？ 是的！
git merge --no-ff -m 'git merge --no-ff -m xx branch1' f1
Bug分支：
 git stash #save working directory
 git stash list #查看列表
 git stash apply stash@{0} #恢复
 git stash drop #删除 stash@{0}，即默认删除最近
 git stash pop #恢复并删除
git checkout -- readme.txt #如果本地删除，可以从版本库恢复
git reset head/HEAD readme.txt #如果本地删除，不能从版本库恢复
但是可以从stash中恢复。 stash@{0}指向最新保存的
e:/git/learngit:dev

============================================
git checkout -b dev #本地创建dev分支
#修改readme.txt
git add readme.txt
git commit -m 'add one line'
git push origin dev #将dev分支push到远程仓库origin

#user b:
 git checkout -b dev origin/dev #出错：cannot update paths and switch to branch 'dev' at the same time
 git fetch #需要先这行这个命令，在执行上面命令
 git checkout -b dev origin/dev
#user a:
 此时add，commit后push，出错，应该先pull
 还出错，应该先设置本地dev与origin/dev的链接：
 git branch --set-upstream-to=origin/dev
 git pull
 