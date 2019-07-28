Git常用命令

创建版本库

````GIT
git init
//需要切换到目录下
````

把文件添加到仓库，添加到暂存区

```GIT
git add xxxx.xx
```

把文件提交到仓库，把暂存区的所有内容提交到当前分支

```GIT
git commit -m"xxxxx"
```

掌握仓库当前状态

````GIT
git status
````

查看修改的内容

```GIT
git diff xxx.xx
```

历史纪录,显示从最近都最远的提交日志

````GIT
git log
````

回退到上一个版本

HEAD表示当前版本

HEAD^表示上一个版本

HEAD^^表示上上个版本

HEAD~100表示第100个版本

```GIT
git reset --hard HEAD^
```

撤销修改，让文件回到最近一个git commit 或git add是的状态

````GIT 
 git checkout -- XXX.XX
````

把暂存区的修改撤销掉，重新放回工作区

```GIT
git reset HEAD XXX.XX
```

关联远程库

```GIT
git remote add origin git@server-name:path/repo-name.git
```

创建分支

```GIT
git branch <name>
```

切换分支

```GIT
git checkout <name>
```



创建并切换分支

```GIT
git checkout -b <name>
```

下面会显示所有分支，当前分支前面会标有一个*号

```GIT
git branch
```

合并指定分支到当前分支

```GIT
git merge <name>
```

删除分支

```GIT
git branch -d <name>
```

推送分支,就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支

```GIT
git push origin <name>
```

