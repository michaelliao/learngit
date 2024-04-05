## Git

Git是分布式版本控制系统，没有“中央服务器”。

## 基本配置

```nginx
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

## 基本操作

### 创建版本库

```nginx
git init
```

### 把文件添加到仓库

```nginx
git add <file>
git add readme.txt
```

### 把文件提交到仓库

```nginx
git commit -m <message>
git commit -m 'wrote a readme file'
```

复制相同提交内容

```nginx
git cherry-pick <commit_id>
// commit_id只需要前7位
```

### 查看修改内容

查看工作区和版本库里面最新版本的区别：

```nginx
git diff <file>
```

### 查看工作区状态

```nginx
git status
```

### 日志

#### 提交日志

`git log`命令显示的是从最近到最远的提交日志。版本号`commit id`由SHA1计算出的。

1. 普通

   ```nginx
   git log
   ```

2. 简易

   ```nginx
   git log --pretty=oneline
   ```

#### 命令日志

该命令可以帮助我们回到未来的版本。

```nginx
git reflog
```

### 版本回退

```nginx
git reset --hard commit_id
```

小技巧

**`head`表示当前版本**。`head^`代表上一个版本，`head^^`即为上上一个版本，对于上`n`个版本，可以使用`head~n`。

### 工作区和暂存区

1. 工作区

   本地文件目录。

2. 暂存区

   `git add`将工作区要添加的文件放到暂存区`stage`。

   `git commit`将暂存区的文件提交到当前分支(默认`master`)。

3. 版本库

   `.git`目录即为Git的版本库，其里面有暂存区、默认分支`master`和指向`master`的指针`HEAD`。

### 修改

#### 撤销工作区的修改

```nginx
git checkout -- <file>
```

有两种情况

1. 工作区修改，但未提交到暂存区。此时，执行命令后将和版本库一模一样。
2. 第一次修改提交到暂存区后，工作区又存在修改。此时，执行命令后将回到第一次修改提交到暂存区的状态。

**原理**：将版本库的版本替换到工作区。

#### 撤销暂存区的修改

撤销暂存区的修改，重新回到工作区，工作区不变。

```nginx
git reset head <file>
```

#### 缓存未提交的修改

未提交的修改包括工作区和暂存区，将其存放在堆栈中，用于后续恢复。

基本操作

1. 缓存

   ```nginx
   git stash
   ```

2. 查看缓存记录

   ```nginx
   git stash list
   ```

3. 恢复缓存

   - 删除stash内容

     ```nginx
     git stash pop
     ```

   - 不删除stash内容

     ```nginx
     git stash apply
     ```

     指定恢复哪个缓存

     ```nginx
     git stash apply stash@{num}
     ```

### 删除

版本库中删除文件

```nginx
git rm file
```

工作区删除文件

```nginx
rm file
```

### 远程仓库

关联远程库

```nginx
git remote add name git@server-name:path/repo-name.git
git remote add origin git@github.com:aisuandebowen/learngit.git
```

`name`：指定远程库名字，例如origin。

##### 推送并将本地分支和远程分支关联

```nginx
git push -u origin master
```

##### 查看远程库信息

```nginx
git remote -v
```

##### 删除与远程库的关联

```nginx
git remote rm origin
```

##### 克隆仓库

```nginx
git clone 
```

##### 本地分支和远程分支设置关联

```nginx
 git branch --set-upstream-to=origin/<branch-name> <branch-name>
```



### 分支branch

#### 查看分支

```nginx
git branch
```

#### 创建分支

```nginx
git branch <name>
```

#### 切换分支

```nginx
// 两个都可以，推荐第一个。
git switch <name>
git checkout <name>
```

#### 创建并切换分支

```nginx
git switch -c <name>
git checkout -b <name>
```

#### 合并某分支到当前分支

```nginx
git merge <name>
```

冲突解决方案：当Git无法进行快速合并时，需要手动更改，Git用`<<<<<<<`，`=======`，`>>>>>>>`标记不同的内容。

`--no-ff`参数

```nginx
git merge --no-ff -m "merge with no-ff" dev
```

以上命令，将会合并并提交一个commit。合并分支推荐使用普通模式`--no-ff`，因为快速模式合并没有历史。

#### 删除分支

```nginx
git branch -d <name>
```

当要删除的分支没有被合并过，是无法删除的。此时一定要删除的话推荐：

```nginx
git branch -D <name>
```

### 标签Tag

标签本质是指向某次提交commit，方便使用。因为平常使用`commit_id`不方便！！！

#### 创建标签

+ 以最新提交的commit为准，创建标签。

  ```nginx
  git tag <tag-name>
  ```

+ 创建带有说明、指定`commit-id`的标签。

  ```nginx
  git tag -a <tag-name> -m <message> <commit-id>
  ```

  **注意**：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

#### 显示已有标签

```nginx
git tag
```

显示指定标签详细信息

```nginx
git show <tag-name>
```

#### 删除标签

+ 本地

  ```nginx
  git tag -d <tag-name>
  ```

+ 远程

  ```nginx
  git push origin :refs/tags/<tag-name>
  ```

#### 推送标签到远程

+ 推送一个标签

  ```nginx
  git push origin <tag-name>
  ```

+ 推送所有标签

  ```nginx
  git push origin --tags
  ```

  ​

