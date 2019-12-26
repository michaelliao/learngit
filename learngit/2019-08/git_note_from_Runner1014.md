# 时光机穿梭

## 版本回退

- 显示状态（待提交，冲突文件等）

  ```
  git status
  ```

- 显示提交日志

  ```
  git log [--pretty=oneline]
  ```

- 回退版本

  ```
  git reset --hard HEAD^
  git reset --hard 1094a(版本号)
  ```

  上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，上100个版本`HEAD~100`。

  版本号没必要写全，前几位就可以了，Git会自动去找。

- 命令记录

  可用来查找未来的版本号。

  ```
  git reflog
  ```

## 工作区和暂存区

- 查看修改内容

  ```
  git diff readme.txt  # git add 之前查看工作区和暂存区的区别
  git diff HEAD -- readme.txt  # 查看工作区和版本库里面最新版本的区别
  ```

- 版本库和暂存区

  ![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907720458e56751df1c474485b697575073c40ae9000/0)

- 撤销工作区修改

  ```
  git checkout -- readme.txt #把readme.txt文件在工作区的修改全部撤销，其实是用版本库里暂存区的版本替换工作区的版本，相当于会恢复到最近一次add之后的状态（如果暂存区不存在在文件的修改，则工作区与版本库的最新版本一致，否则，与暂存区一致），其实如果知道最近一次add之后这段时间里面改了什么，完全可以手动在文件中改回来，不用这个命令也可以，可以用git status看一下是不是没有新的修改（没有未添加到暂存区的修改）
  ```

- 撤销暂存区的修改

  ```
  git reset HEAD readme.txt
  ```

  `git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用`HEAD`时，表示最新的版本。（个人体会：其实是把暂存区的版本还原到最近一次提交后的版本库的版本，相当于清空了readme.txt未提交的修改，暂存区现在不存在这个待提交修改，但工作区的文件不会受影响，可以再次add将该修改放到暂存区，也可以使用`git checkout -- readme.txt`将工作区的文件撤回到最近版本的状态

- 删除文件

  ```
  git rm test.txt 
  ```

  类似于 git add ，这个操作也是将修改放到暂存区，也需要commit才能真正删掉版本库中的文件。如果工作区的文件是手动删除的，并且还没有git rm，则可以使用上述的git checkout命令恢复文件，原理相同，只不过一个是撤销了修改，一个是撤销了删除（删除其实也是一种修改）；如果工作区的这个文件没有删除，执行这个命令之后，文件会被删除，然后将修改放到暂存区，如果要撤销修改，则用上述的git reset -> get checkout，原理跟撤销修改也是类似的。

  注：经过测试，如果删了文件test.txt之后，仍然可以使用`git add test.txt`，效果与`git rm test.txt `相同，这样删除文件和修改文件就可以完全等同处理了。

# 远程仓库

- 生成ssh公钥私钥

  ```
   ssh-keygen -t rsa -C "jongliao@tencent.com"
  ```

- 关联远程仓库

  ```
  git remote add origin git@github.com:michaelliao/learngit.git
  
  # 关联多个远程库
  git remote add github git@github.com:michaelliao/learngit.git
  git remote add gitee git@gitee.com:liaoxuefeng/learngit.git
  ```

- 查看远程库信息

  ```
  git remote -v
  ```

- 删除已有远程库

  ```
  git remote rm origin
  ```

- 推送master分支的所有内容

  ```
  git push -u origin master  # 第一次
  git push origin master
  ```

  由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送到远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

# 分支管理

- 创建并切换到分支

  ```
  git checkout -b dev
  ```

  `git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

  ```
  git branch dev # 创建分支
  git checkout dev # 切换分支
  ```

  在本地创建和远程分支对应的分支：

  ```
  git checkout -b branch-name origin/branch-name
  ```

- 查看分支

  ```
  git branch
  ```

  `git branch`命令会列出所有分支，当前分支前面会标一个`*`号。

- 合并分支

  ```
  git checkout master #切换回master分支
  git merge dev #把dev分支的工作成果合并到master分支上
  ```

  `git merge`命令用于合并指定分支到当前分支。

  合并默认使用`fast forward`模式合并，看不出来曾经做过合并。

  ![](https://www.liaoxuefeng.com/files/attachments/919022363210080/0)

  ![](https://www.liaoxuefeng.com/files/attachments/919022387118368/0)

  ![](https://www.liaoxuefeng.com/files/attachments/919022412005504/0)

  普通模式合并，合并后的历史有分支，能看出来曾经做过合并。

  ```
  git merge --no-ff -m "merge with no-ff" dev
  ```

  因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。

  ![](https://www.liaoxuefeng.com/files/attachments/919023225142304/0)

  若合并分支时存在冲突，需手动解决冲突，然后再add->commit。[详情](<https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000>)

  ![](https://www.liaoxuefeng.com/files/attachments/919023000423040/0)

  ![](https://www.liaoxuefeng.com/files/attachments/919023031831104/0)

  个人理解：当出现冲突时，文件中会有相应的标记，手动解决冲突实际上就是重新编辑了文件，此后的操作与更新仓库是一样的，都需要add->commit，所以此时的merge其实只是起到工具的作用，帮忙查出冲突，并且在提交记录的graph中会进行merge的记录。

  所以，合并的最大作用是合并没有冲突的修改，比如不同文件的修改，同一文件不同地方的修改。

- 删除分支

  ```
  git branch -d dev #dev删除分支
  ```

- 查看分支合并图

  ```
  git log --graph --pretty=oneline --abbrev-commit
  ```

- 分支策略

  - 首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；

    你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。

    所以，团队合作的分支看起来就像这样：

    ![](https://www.liaoxuefeng.com/files/attachments/919023260793600/0)

- 建立本地分支和远程分支的关联

  ```
  git branch --set-upstream-to <branch-name> origin/<branch-name>
  ```

- 保存当前工作现场

  ```
  git stash
  git stash list
  git stash apply stash@{0} # 恢复
  git stash drop # 删除
  git stash pop # 恢复并删除
  ```

  可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash

- 查看远程库的信息

  ```
  git remote
  git remote -v
  ```

- 多人协作

  多人协作的工作模式通常是这样：

  1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
  2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
  3. 如果合并有冲突，则解决冲突，并在本地提交；
  4. 没有冲突或者解决掉冲突后，（先commit），再用`git push origin <branch-name>`推送就能成功！

  如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

  - 在本地创建和远程分支对应的分支

    ```
    git checkout -b branch-name origin/branch-name
    ```

- rebase操作可以把本地未push的分叉提交历史整理成直线

  ```
  git pull  # 自动合并，存在分叉
  git rebase  # 将分叉整理为直线
  ```

# 标签管理

- 标签

```
# 创建标签
git tag v1.0 # 在最新提交的commit上
git tag v0.9 f52c633 # 指定commit
git tag -a v0.1 -m "version 0.1 released" 1094adb # 创建带有说明的标签，用-a指定标签名，-m指定说明文字

# 查看标签
git tag # 查看所有标签，按字母排序列出
git show v0.9 # 查看标签信息

# 删除标签
git tag -d v0.1
# 因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

# 推送某个标签到远程
git push origin v1.0
git push origin --tags # 一次性推送全部尚未推送到远程的本地标签

# 删除远程标签
git tag -d v0.9 # 先从本地删除
git push origin :refs/tags/v0.9 # 从远程删除
```

标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。（即标签不属于任何一个分支，只与commit绑定）

# .git文件作用

```
- HEAD : 指向哪个分支
  `ref: refs/heads/master`
- logs
  - refs
    - heads 各个分支的commit变化记录
      - master（分支1）
      - ...
    - remotes 远程各个分支的变化记录
      - origin
        - master
        - dev
      - ...
  - HEAD HEAD指针（指向commit）的变化记录
- refs
  - heads （各个分支指向的commit的hash）
    - master
      `99139245713f7116efd383548442413ab9f2f38e`
    - ...
  - remotes 远程
    - origin 各分支指向的commit的hash
      - master 
      - ...
    - ...
  - tags
  	- tag1 (存储标签对应的commit的hash)
  	- ...
```

# 配置代理

```
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
# 取消代理
git config --global --unset http.proxy 
git config --global --unset https.proxy
```

# 问题

1. 如何分别向gitee和github同步，用户不同

   解决：git上配置的用户其实是标识了机器，不是gitee或者github用户，所以要向多个远程库同步，其实只需要关联多个远程库即可（使用上述关联远程仓库命令）。当使用ssh时，在不同远程库上都得配置ssh公钥，以确认身份；使用https，则与不同远程库交互时会弹出窗要求输入不同的用户名密码，系统会给用户保存密码，输入一次后不需要再次输入。

3. 如何控制远程commit的回退？

   本地进行回退后，强制推送。

   ```
   git push -f
   ```