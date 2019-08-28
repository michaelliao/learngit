廖老师官网学习Git笔记

- linux命令

  - windows中查看VIM
    - 按Esc
    - 输入大写的ZZ
  - cat file 查看file的内容

- git 命令

  - git init 将当前这个目录变成git可以管理的仓库

  - git add file 将文件添加到暂存区

  - git commit -m "备注" 把暂存区的所有内容提交到当前分支

  - git status 查看仓库的状态(是否有需要提交的修改 包括暂存区和工作区的修改记录)

  - git diff 查看工作区具体的修改内容

  - git log 查看从从近到最远的提交记录

  - git log --pretty=oneline 查看记录以oneline的格式查看

  - HEAD 表示当前版本

  - git reset --hard **HEAD^**回退到上一个版本

  - **git reset --hard 版本号** 回到所在版本号的版本 版本号不需要写全 写前几位即可git会自动去找

  - git reflog记录你的每一次命令(回滚且忘记版本号的时候可以用到)

  - ![git-repo](https://www.liaoxuefeng.com/files/attachments/919020037470528/0)

  - git commit将暂存区数据提交到仓库 然后暂存区的内容就清空了  提交的是add到暂存区的内容

  - git checkout -- file  

    - 丢弃**工作区**的**修改**(撤销)
    - 另外种情况，删错了 但是版本库还存在，所以可以使用此命令恢复到最新版本(注：从来没有提交到版本库的文件，删除了是无法恢复)
      - 一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
      - 一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

  - git reset HEAD  <file>将**暂存区**的修改撤销掉，重新放到工作区

  - 场景：如果改乱了工作区的内容，并且添加到暂存区，想丢弃修改，分为两步，先丢弃暂存区的修改，再丢弃工作区的修改

  - git rm 用于删除一个文件

  - 创建SSH Key

    - ssh-keygen -t rsa -C  "youremail@example.com"

  - git remote add origin https://github.com/gitUserName/repoName.git  将本地仓库与远程仓库关联  这个地址是基于HTTPS协议

    - 或者 git remote add origin git@server-name:path/repo-name.git 这个地址是基于ssh协议  ssh速度更快

  - git push -u origin master 将本地仓库所有内容推送到远程库

    - origin 远程仓库名称（git默认 也可以改成别的）
    - master 本地仓库分支
    - -u 参数 :第一次推送，并且将本地的分支与远程的分支关联，之后的推送或者拉取可以简化命令
    - git push origin master 推送本地到远程
    - git clone git@github.com:gitUserName/repoName.git 克隆远程库到本地一个(注：不需要自己创建库文件目录，clone自动创建)

  - 分支管理

    - ![git-br-initial](https://www.liaoxuefeng.com/files/attachments/919022325462368/0)

    - git checkout -b dev 创建dev分支并且切换到dev

      - 上述命令相当于 git branch dev 和git checkout dev
      - git branch 查看当前分支 以*标记

    -  git merge dev 合并指定分支到master分支

    - git branch -d dev  删除dev分支

    - git最新版本创建并切换分支命令：git switch -c dev      git switch master直接切换分支 如果报switch is not a git command 请检查git版本，

    - 解决冲突

      - 场景：
        - dev  分支修改README.md 文件内容，然后 add commit提交到本地版本库
        - master 分支同样修改README.md文件内容，然后add commit 提交到本地版本库
        - 此时版本库状态!![git-br-feature1](https://www.liaoxuefeng.com/files/attachments/919023000423040/0)	
        -  此时git merge dev 合并修改 会产生冲突，因为对同一个文件都产生了修改，git不知道保留哪个修改，或者说不知道怎么快速合并，所以将修改都合并了。且以`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容，此时需要**手动去修改冲突**，然后再add commit

    - ```
      git log --graph --pretty=oneline --abbrev-commit
      ```

      查看分支的合并情况

    - 分支管理策略

      - git 中的Fast foward模式，这种模式下，删除分支，会丢失分支的部分信息
      - 如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
      - 准备合并`dev`分支，请注意`--no-ff`参数，表示禁用`Fast forward`
      - 合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。

    - git stash 存储当前工作现场

    - git stash list 查看之前的工作现此存储到哪里

      - 恢复现场
        - git stash apply 恢复后需手动删除stash内容 git stash drop
        - 另外种方式 git stash pop 恢复的同时将stash内容删除
      - 多次stash 先用git stash list 查看 然后恢复指定的stash，用git stash apply stash@{0}

    - 修复bug场景：

      - 先stash保存dev的工作环境
      - 临时bug，先从master检出一个bug分支，然后解决add commit
      - 然后切换master分支，合并，注意使用--no-ff，
      - 然后切换回dev分支，此时场景：当时的dev是从master分支分出来的，所以这个bug应当也是存在的，此时不需要在dev上修复同样的bug，不需要重复操作一次，只需要将临时bug分支提交的修改复制到dev分支，
      - 命令：cherry-pick 版本号 这个版本号对应临时分支bug提交的版本号
      - git会自动给dev分支做一次提交，不同于master修复bug后的提交，虽然改动相同，但是是两个commit

    - 同样的道理，可以先dev保存现场，修复bug，然后再回到现场，然后master复制操作

    - 丢弃一个没有被合并过的分支

      - git branch -D <name	>

    - git remote 查看远程库的信息

      - git remote -v 显示更加详细的信息
      - 会显示push和fetch的地址如果没有push权限，是无法查看到push的地点在

    - git push origin master推送本地master分支到远程库origin

    - git branch --set-upstream-to=origin/dev dev 指定本地的dev分支与远程origin/dev分支的链接

    - 多人协作过程

      - 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
      - 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
      - 如果合并有冲突，则解决冲突，并在本地提交；
      - 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

    - 场景：

      - git pull提示no tracking  information 则说明远程分支和本地分支没有进行链接
        - 命令： git branch --set-upstream-to <branch-name> origin/<branch-name>

    - 在本地创建和远程分支对应的分支

      - git checkout -b branch-name origin/branch-name

    - Rebase 变基

      - rebase操作可以把本地未push的分叉提交历史整理成直线；
      - rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

    - 创建标签

      - git tag v1.0新建一个标签 默认HEAD,也可以指定一个commit_id
      - git tag 查看所有标签
      - 如果某个时候的commit忘记打tag ，可以通过git log查看commit记录
        - git tag v0.9 commit_id
        - git tag 查看效果
      - git show v0.9查看标签信息
      - 创建带说明的标签 -a指定标签名 -m指定说明文字
        - git tag -a v0.1 -m "version 0.1 released" 1094add

      - 删除标签 git tag -d v0.9
        - 创建的标签都存储在本地不会自动推送到远程，所以可以在本地安全删除
        - git push origin v1.0手动推送标签到远程
        - git push origin --tags一次性推送全部未推送到远程的本地标签
        - 如果已经推送到远程，删除远程标签
          - 先删除本地
            - git tag -d v0.9
          - 远程删除
            - git push origin :refs/tags/v0.9
            - 可登录github具体查看是否成功

    - 自定义Git

      - 使命令看起来更加i醒目

        - git config --global color.ui true

      - 忽略文件gitignore

        - 强制添加 -f

        - ```
          git add -f App.class
          ```

      - git check-ignore 

        - git check-ignore -v App.class检查文件与忽略文件的对比

      - 设置别名

        - git config --global alias.st status

          - 此时 git st==git status

        - ```
          $ git config --global alias.co checkout
          $ git config --global alias.ci commit
          $ git config --global alias.br branch
          git config --global alias.unstage 'reset HEAD'
          git config --global alias.last 'log -1'
          git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
          ```

      - 当前用户的Git配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中   当前用户指的是当前登录win的用户 例如Adminitrator

      - 每个仓库的git配置文件放在 .git/config文件中
      

      

      

      

      

      

      

      

      

      
