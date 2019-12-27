
# 常见命令

|                            命令                            |              作用              |              说明              |
| :--------------------------------------------------------: | :----------------------------: | :----------------------------: |
|                          `mkdir`                           |           新建文件夹           |         Make Directory         |
|                            `cd`                            |            移动目录            |        Change directory        |
|                           `pwd`                            |          显示当前目录          |    Print Working Directory     |
|                            `ls`                            |         显示目录内文件         |    `ls -ah`显示包括隐形文件    |
|                         `git init`                         |        变成可管理的仓库        |              git               |
|                 `git commit -m <message>`                  |              提交              |              git               |
|                        `git commit`                        |              提交              |  使用文本编辑器编辑`message`   |
|                        `git status`                        |            查看状态            |              git               |
|                         `git diff`                         |            查看改变            |         git difference         |
|                         `git log`                          |            提交日志            |       `--pretty=oneline`       |
|                        `git reflog`                        |       查看所有的修改记录       |              git               |
|                  `git reset --hard HEAD^`                  |        回退到上一个版本        |  `HEAD`上`^`个数即回退版本数   |
|               `git reset --hard <commit id>`               |    回退到`commit id`的版本     |              git               |
|                   `git checkout -- file`                   |  撤销`file`在工作区的全部修改  |              git               |
|                  `git reset HEAD <file>`                   |      把在暂存区的修改撤销      |              git               |
|       `ssh-keygen -t rsa -C "youremail@example.com"`       |           创建`ssh`            |              ssh               |
| `git remote add origin git@github.com:yourname/XXXXXX.git` |       创建和Github的连接       |              git               |
|                  `git push origin master`                  |          提交所有内容          |        第一次需要加`-u`        |
|   `$ git clone git@github.com:zmx0142857/math-note.git`    |        从远程库`clone`         |              git               |
|                   `git checkout -b dev`                    |      创建分支`dev`并前往       |              git               |
|                      `git branch dev`                      |         创建分支`dev`          |              git               |
|                        `git branch`                        |          查看所有分支          |     当前分支前会有一个`*`      |
|                      `git merge dev`                       | 命令用于合并指定分支到当前分支 |              git               |
|                    `git branch -d dev`                     |          删除指定分支          |              git               |
|                     `git log --graph`                      |         查看分支合并图         | `--graph` or `--abbrev-commit` |
|           `git merge --no-ff -m "<message>" dev`           |     合并指定分支到当前分支     |       禁用`Fast forward`       |
|                        `git stash`                         |      把当前工作现场"储藏"      |              git               |
|                      `git stash list`                      |        查看`stash`内容         |              git               |
|                     `git stash apply`                      |    恢复`stash`内容但不删除     |              git               |
|                      `git stash drop`                      |        删除`stash`内容         |              git               |
|                      `git stash pop`                       | 恢复的同时把`stash`内容也删除  |              git               |
|               `$ git stash apply stash@{0}`                |        恢复指定`stash`         |              git               |
|              `$ git cherry-pick <commit id>`               |  复制一个特定的提交到当前分支  |              git               |
|                    `git branch -D dev`                     |        强制删除指定分支        |              git               |
|                        `git remote`                        |         显示远程库信息         |        `-v`显示详细信息        |
|       `git branch --set-upstream-to=origin/dev dev`        | 设置`dev`和`origin/dev`的链接  |              git               |
|                         `git pull`                         |              拉去              |              git               |
|                        `git rebase`                        |              变基              |              git               |
|                    `git tag <tagname>`                     |         给`HEAD`打标签         |              git               |
|              `git tag <tagname> <commit id>`               |             打标签             |              git               |
|     `git tag -a <tagname> -m "<message>" <commit id>`      |             打标签             |              git               |
|                         `git tag`                          |          查看所有标签          |              git               |
|                `git push origin <tagname>`                 |        推送一个本地标签        |              git               |
|                  `git push origin --tags`                  |   推送全部未推送过的本地标签   |              git               |
|                   `git tag -d <tagname>`                   |        删除一个本地标签        |              git               |
|           `git push origin :refs/tags/<tagname>`           |        删除一个远程标签        |              git               |