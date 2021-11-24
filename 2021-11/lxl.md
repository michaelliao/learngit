## 0. 创建 ssh key

`ssh-keygen -t rsa -C "youremail@example.com"`


## 1. 远程仓库

- #### 克隆远程仓库
    
    **`git clone`**

- #### 本地项目添加远程仓库

    **`git remote add origin git@xxx`**

- #### 本地项目移除远程仓库

    **`git remote rm origin`**


## 2. 时光穿梭机

- #### 查看改动

    **`git diff <branch>`**
    
    **`git diff -- <file>`**

    **`git diff <branch> -- <file>`**

- #### 场景一：工作区回退

    **`git checkout -- <file>`**

- #### 场景二：暂存区回退，到场景一

    **`git reset HEAD <file>`**

- #### 场景三：版本回退与前进

    **`git reset --hard <commit-id>`**
    
    回退时，通过 `git log` 查看commit历史来获取 `commit-id`，可附带参数 `--graph --pretty=oneline --abbre-commit`；
    
    前进时，通过 `git reflog` 查看命令历史来获取 `commit-id`；


## 3. 分支管理

  - #### 创建分支

    **`git branch <new-branch> <base-branch>`**
    
    `base-branch` 默认为是当前所在分支；

  - #### 切换分支

    **`git switch <branch>`**

  - #### 创建 + 切换分支

    **`git swicth -c <new-branch> <base-branch>`**

  - #### 合并分支

    **`git merge --no-ff <branch>`**

    合并时，默认是 `fast forward` 模式，删除出分支后，不会保留分支信息，`--no-ff` 参数可以用普通模式合并；

  - #### 删除分支

    **`git branch -d <branch>`**

    `-D` 可以删除未被合并过的分支；

    -------------------------------------------------------

  - #### bug 分支

    ① **`git stash`**

    先将工作现场缓存起来；

    ② **`git pop`**

    bug 修复后再释放出来；

    ③ **`git cherry-pick <commit-id>`**

    将 `master` 分支上修复的 bug，合并到 `dev` 分支；

  - #### rebase

    **`git rebase`**

    可以把本地未push的分叉提交历史整理成直线，方便 `git log` 观看；


## 4. 标签管理

  - #### 查看标签

    **`git tag`**

    **`git show <tag-name>`**

  - #### 创建标签

    **`git tag <tag-name> [commit-id]`**

    `coommit-id` 默认为最新；

  - #### 推送标签

    **`git push origin <tag-name>`**

    **`git push origin --tags`**

  - #### 删除标签

    ① **`git tag -d <tag-name>`**

    ② **`git push origin :refs/tags/<tag-name>`**