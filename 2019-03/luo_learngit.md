创建版本库

mkdir learngit && cd learngit

git init

git add readme.txt

git commit -m "write file"



时光机穿梭

git status

git diff readme.txt 查看



git diff 的比较

git diff ： 暂存区和工作区比较

git diff --cached: 暂存区和版本库比较

git diff HEAD ： 工作区和版本库比较



版本回退

git reset --hard HEAD <^/版本号>

git log --pretty=oneline

git reflog



远程仓库？

git clone、 git fetch、 git  pull的区别



分支

查看： git branch

创建： git branch dev

切换： git checkout master

创建+切换：git checkout -b dev

合并： git merge

删除： git branch -d



解决冲突

git merge

出现冲突，解决冲突后，在add/commit

git log --graph: 查看分支合并图



解决临时bug问题

1. git stash
2. git chechout --no-ff issue-01
3. git checkout dev
4. git stash pop



Feature分支

- 目的：有新的功能，在新的分支上进行功能开发，开发完成后，删除该feature分支
- 丢弃一个没有被合并过的分支，通过-D参数强行删除 branch -D <分支名>



rebase变基

- 可以把未push的commit变成一条直线