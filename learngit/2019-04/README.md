老师讲的太详细易懂了，小白用了一下午就入门了，而且很舒服，原来以为有了可视化的github desktop软件为什么还要用git来操作呢，学完之后发现，能装*啊，啊哈哈哈哈，老师要接收我的request啊，好歹这也是结课的大作业啊。
一、链接远程库：

1.在github账号创建新的仓库，复制git@github.com:SnowKingNo1/learngit.git

2.执行命令 git remote rm origin
然后git@github.com:SnowKingNo1/learngit.git

3.将本地库推送到远程
git push -u origin master
二、修改或者创建新文件之后，想要更新远程仓库的话要执行以下命令

1.创建了新文件test.txt

2.git add test.txt

3.git commit -m "update test.txt"

4.链接远程库操作（如果是第一次链接，链接过了就直接执行操作5）

5.git push -u origin master
更新完成
三、创建分支（branch）：

1.git checkout -b dev
or
git branch dev
git checkout dev

2. git branch 查看当前分支

3.git add test.txt
git commit -m "branch test"

4.git checkout master

5.git merge dev 将分支dev合并到master主分支

6.git branch -d dev 删除分支dev

7.查看当前分支 git branch
四、Bug分支：当一个分支的工作没有做完又来了一个分支的紧急工作时使用stash保存当前分支工作

1.在当前分支执行git stash保存当前分支工作，然后切换到紧急工作分支，一般先切换到master分支再切换到紧急分支

2.执行完紧急分支工作合并提交之后回到当前工作分支，恢复当前分支工作
git stash apply,使用git stash pop 删除stash内容，继续工作。
五、标签操作：目的是为了通过简短的标签快速搜索到要找到操作

1.创建标签 git tag v1.0

2.某一位置 创建标签 git tag v1.0 版本号

3.推送远程的本地标签
git push origin --tags    (all tags)

git push origin v1.0 (某个标签)

4.删除本地标签
git tag -d 标签

git push origin :refs/tags/标签  （删除远程标签）