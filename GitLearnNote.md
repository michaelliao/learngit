## Note for learn git tool

> 2016/12/2
> Chuck

### 远程仓库
- 创建SSH key `$ ssh-keygen -t rsa -C "youremail@example.com"`
- 要关联一个远程库，使用命令 `git remote add origin git@server-name:path/repo-name.git`
    1. 关联后，使用命令 `git push -u origin master` 第一次推送 `master` 分支的所有内容
    2. 此后，每次本地提交后，只要有必要，就可以使用命令 `git push origin master` 推送最新修改

### 分支管理
- 创建并切换分支
    ```
    $ git checkout -b dev
    ```
    等同于以下两行命令
    ```
    $ git branch dev
    $ git checkout dev
    ```
- 在dev branch上提交
    ```git
    $ git add readme.txt 
    $ git commit -m "branch test"
    ```
- 现在，dev分支的工作完成，我们就可以切换回master分支：
    ```
    $ git checkout master
    ```
- 切换到`master`分支后，合并`dev`分支到`master`分支
    ```
    $ git merge dev
    ```
- 合并完成后，就可以放心地删除dev分支了：
    ```
    $ git branch -d dev
    ```

### 解决冲突
- 合并不同分支可能会产生冲突，比如修改了同一行内容

### 分支策略
- 首先，仍然创建并切换dev分支：
    ```
    $ git checkout -b dev
    Switched to a new branch 'dev'
    ```
- 修改readme.txt文件，并提交一个新的commit：
    ```
    $ git add readme.txt 
    $ git commit -m "add merge"
    [dev 6224937] add merge
    1 file changed, 1 insertion(+)
    ```
- 现在，我们切换回master：
    ```
    $ git checkout master
    Switched to branch 'master'
    ```
- 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward：
    ```
    $ git merge --no-ff -m "merge with no-ff" dev
    Merge made by the 'recursive' strategy.
    readme.txt |    1 +
    1 file changed, 1 insertion(+)
    ```
    > 因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。
- 合并后，我们用git log看看分支历史：
    ```
    $ git log --graph --pretty=oneline --abbrev-commit
    *   7825a50 merge with no-ff
    |\
    | * 6224937 add merge
    |/
    *   59bc1cb conflict fixed
    ...
    ```

### BUG分支
- Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
    ```
    $ git stash
    Saved working directory and index state WIP on dev: 6224937 add merge
    HEAD is now at 6224937 add merge
    ```
- stash之后，可以checkout到其他分支处理bug，处理完bug切到当前分支，`git stash pop`回到工作现场

### 删除未经合并的分支
- 删除未经合并的分支，会提示删除失败
    ```
    $ git branch -d feature-v
    error: The branch 'feature-v' is not fully merged.
    If you are sure you want to delete it, run 'git branch -D feature-v'.
    ```
    此时需要使用`git branch -D feature-v`来强制删除

### 多人协作
- 多人协作的工作模式通常是这样：

    - 首先，可以试图用 `git push origin branch-name` 推送自己的修改；

    - 如果推送失败，则因为远程分支比你的本地更新，需要先用 `git pull` 试图合并；

    - 如果合并有冲突，则解决冲突，并在本地提交；

    - 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功！

    - 如果 `git pull` 提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name` 。