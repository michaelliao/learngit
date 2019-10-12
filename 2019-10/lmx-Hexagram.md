# git的知识点小结
0. 部分地方使用了自己的github用户名
1. git config --global user.name "Hexagram"
   git config --global user.email "1471685806@qq.com"
   * 登记名字和邮箱以使用git

2. git init 初始化
3. git status
4. git diff
   * git diff HEAD -- *file* 查看*file*在工作区和版本库里最新版本的区别
5. git add
6. git commit -m
7. git log
8. git reset --hard HEAD^
    * git reset HEAD *file* 把暂存区的修改退回的工作区
9. git reflog 记录了使用的每一次命令
10.  git checkout -- *file* 丢弃工作区的修改
     * 按情况回到**版本库**或者**暂存区**的状态
     * 实质是使用已存文件替换工作区的版本
11. git reset HEAD *file*
12. git rm *file*  
> 连接到远程仓库:
13. ssh-keygen -t rsa -C "*your_email*"
    * 建立一个本地的ssh公钥和私钥，再把公钥丢到GitHub上
    * 建立时没有设置密码
14. git remote add origin git@github.com:lmx-Hexagram/ackonwledge_arrangement.git
    * git@github.com:用户名/仓库名.git
15. git push -u origin master
    * 第一次使用时需要用-u参数，使其在推送本地master分支的同时，把远程仓库和本地仓库联系起来，以简化以后的命令
    * git push origin master以后只要这样就可以了
16. git clone git@github.com:lmx-Hexagram/ackonwledge_arrangement.git
    * 从远程仓库克隆
    * git@github.com:用户名/仓库名.git
    * 也可以使用 git clone https://github.com/lmx-Hexagram/ackonwledge_arrangement.git
    * 也就是可以使用SSH和https两种协议 

>分支:
17. git checkout -b dev
    * Switched to a new branch 'dev'
    * 创建并切换到分支'dev'
    * -b 参数表示创建并切换
    * 以上语句等价于 git branch dev + git checkout dev
18. git branch 列出所有分支
19. git checkout _branch\_name_
20. git merge dev 
    * 把dev分支的结果合并到'当前所在'分支上
    * 此时是使用<code>Fast-forward</code>也就是'快进模式',是直接把master指向dev的当前提交
21. git branch -d dev 删除分支
    * git branch **-D** dev 强制删除没有合并过的分支
22. git switch -c dev 创建并切换的新分支dev
    * git switch _branch\_name_ 切换到已有的分支
    * **推荐使用<code>switch</code>命令来切换和新建分支**
23. git log --graph 查看分支合并图
24. git merge --no--ff -m "*say_sth*" *branch\_name*
    * 使用<code>--no--ff</code>参数使在合并时禁用Fast-forward模式,并创建一个commit

> 暂存工作现场：
25. git stash 保存现在的工作现场(在当前分支)
26. git stash list
27. git stash apply 恢复暂存的工作现场
    * git stash apply stash@{*num*} 使用这种方式指定要恢复的工作现场
28. git stash drop 删除暂存的工作现场
29. git stash pop 恢复并删除
30. git cherry-pick *name_of_commit* 在当前分支重现指定的提交(用来修bug)
>远程多人合作:
31. git remote -v 查看远程库的信息
32. git push origin *branch_name* 将本地分支推送到origin
33. git checkout -b *branch_name* orgin/*branch_name* 在本地创建和远程分支对应的分支，名字一致(不要在这里乱皮)
34. git branch --set-upstream *branch_name* origin/*branch_name* 建立本地和远程分支的关联

>标签:
35. git tag命令簇
    * git tag 查看所有标签
    * git tag *tag_name* *commit_name*
        * for example:
        * *git tag v1.0 378a2a*
        * 若没有*commit_name*则默认给当前分支加标签
    * git show *tag_name* 列出此tag的详细信息
    * git tag -a *tag_name* -m "sth_to_say" *commit_name*
        * 打上标签并给标签加上说明
    * git tag -d *tag_name* 删除标签
36. git push origin *tag_name* 将标签推送到远程
    * git push origin --tags 将本地所有的标签推送到远程
37. git push origin :refs/tags/*tag_name* 删除远程标签(目前不太懂原理,最好先删除本地标签)
>在github上工作
38. git clone git@github.com:lmx-Hexagram/learngit.git
    * 先在github上把项目folk到自己的库里，再从github上自己的库里把项目clone下来
    * 在自己本地修改好后，pull到github上自己的库里
    * 在github的项目中发起pull request
>git的自定义：
1.  git config --global color.ui true 显示颜色
2.  忽略特殊文件
    * 在工作区根目录创建<code>.gitignore</code>文件
    * 在<https://github.com/github/gitignore>中找到要用的配置文件
    * git add -f *file_name* 强制添加被忽略的文件
    * git check-ignore -v *file_name* 查看时那一条忽略规则，忽略了该文件
    * 还有<code>.gitignore要放在版本库里，换言之不能忽略该文件，这样可以方面以后管理</code>
3.  git config --global alias.*the_name_as_your_convinent* *command_of_git*
    * 以这种方式定义别名，下次使用时可以直接<code>git *the_name_as_your_convinent*</code>
    * --global参数使该命令针对这台电脑所有Git仓库有效
    * *git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"* **神仙用法**
>以上
<p align=right>lmx-Hexagram</p>