本文是[Git教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600)的学习笔记

# 初始化

1.初始化当前文件夹为git仓库

```bash
git init 
```

2.设置个人信息

```bash
git config --global user.name '你的用户名'
git config --global user.email '你的邮箱'
```

# 暂存区和仓库

1.查看当前工作区状态

```bash
git status
#哪些文件还没被加入暂存区
```

2.查看文件变动情况

```bash
git diff #对比暂存区，哪些文件被删除了/修改了
git checkout
#对比仓库，哪些文件被删除了/修改了
git diff 
#对比暂存区，哪些文件被删除了/修改了
```

3.添加文件进入暂存区

```bash
git add 文件名
git add *
```

4.将文件移出暂存区

```bash
git reset HEAD 文件名 #不覆盖当前工作区文件 == 取消git add 文件名
git restore --staged 文件名 #覆盖当前工作区文件
```

5.将暂存区文件加入仓库

```bash
git commit -m "修改注释信息"
```

# 版本回退

1.查看版本

```bash
git log #查看当前版本前的历史记录
git log --pretty=oneline  #一行显示
git reflog  #查看操作记录
```

2.版本回退

```bash
git reset --hard HEAD^ #回到上一个版本
git reset --hard 版本标签 #回到指定版本 该标签通过log/logref查询，可不写全
```

3.文件回退

```bash
git checkout 文件名 #将该文件回退到仓库状态
```



# GitHub远程仓库

## 1.准备

1.创建SSH密钥

```bash
ssh-keygen -t rsa -C "邮箱地址"
#一般存在/user/用户/.ssh/id_rsa.pub
```

2.将本地的ssh公钥拷贝到GitHub

3.在GitHub上创建一个仓库

## 2.同步与克隆

1.连接本地仓库到远程仓库

```bash
git remote add origin git@github.com:CzwCugb/LearnHowToGit.git
```

2.同步当前仓库到GitHub

```bash
git push -u origin master #连接并关联origin 和 master
git push origin master #仅连接
```

3.克隆远程仓库到本地

```bash
git clone git@github.com:CzwCugb/LearnHowToGit.git
```

## 3.删除

1.查询当前关联远程仓库

```bash
git remote
git remote -v
```

2.删除关联

```bash
git remote rm origin
```



# 分支

1.创建

```bash
git branch #查询所有分支
git branch dev #创建分支dev
```

2.删除

```bash
git branch -d dev
```

3.切换

```bash
git switch dev #切换
#相当于 git checkout dev
git switch -c dev #创建并切换
#相当于 git checkout -b dev
```

4.合并

```bash
get merge dev #将dev分支合并到当前分支
```

5.冲突

在分支合并时，若它们各自的修改相比与公共祖先存在冲突，

此时合并会报错，需要我们手动修改对应内容

# 保存现场

在一个修改还没做完，不想更新一个版本时，可以将 工作区 和 暂存区 暂时保存在stash里

1.使用stash临时存储

```bash
git stash
#此时工作区之前的修改删除，保存在stash list中，以便恢复
```

2.查询stash

```bash
git stash list
```

3.恢复和删除

```bash
git stash apply <index> #使用
git stash drop <index> #删除
git stash pop <index> #使用并删除
```

# 拉取更新

git Pull

相当于git fetch和git merge两个命令的组合。简而言之，git pull用于从远程仓库拉取更新并将它们合并到当前分支。

```bash
git pull <remote> <branch>
```

git Fetch

git fetch命令则是用于从远程仓库获取更新，但它不会自动合并到当前分支。相反，它将获取的更新保存在本地，让你可以在需要的时候进行合并操作。

```bash
git fetch <remote> <branch>
git merge <remote>/<branch>
```



# 标签

需要记录每次reset的地址过于繁琐，因此，使用标签来替代

```bash
git tag #显示所有标签
git show <tagname> #显示标签信息
git tag v1.0 #给当前版本打标签
git tag v1.1 -m "version 1.1 released" 1094adb #指定地址和提示信息
```

后续在使用该地址值，可以使用标签访问，例如

```bash
git reset --hard v1.0
```

删除标签

```bash
git tag -d v1.0
```

推送标签到远程仓库

```bash
git push origin v1.0 #推送一个
git push origin --tags #全部推送
```



# 其他参考

[常用 Git 命令清单 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

[Git (git-scm.com)](https://git-scm.com/)
