## 本地仓库操作
1. `git init` 命令把这个目录变成Git可以管理的仓库
2. `vi readme.txt------ESC :wq`
3. `git add readme.txt` **添加**文件到仓库
4. `git commit -m "说明"` **提交**文件到仓库.git commit命令执行成功后会告诉你,1 file changed:1个文件被改动(我们新添加的readme.txt文件); 2 insertions:插入了两行内容（readme.txt有两行内容）;1 deletion:删除了一行内容
5. 版本回退
> * HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
> * 穿梭前，用`git log` 可以查看提交历史，以便确定要回退到哪个版本。
> * `git log --pretty=oneline --abbrev-commit`
> * 要重返未来，用`git reflog` 查看命令历史，以便确定要回到未来的哪个版本。

6. 撤销修改

> * 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file` 。
> * 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>` ，就回到了场景1，第二步按场景1操作。
> * 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。
7. rm readme.txt,git rm readme.txt,git commit -m 'remove test.txt',git checkout -- test.txt撤销
## github远程仓库
1. 创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：`ssh-keygen -t rsa -C "youremail@example.com"`
2. 登陆GitHub，打开“Account settings”，“SSH Keys”页面：然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容,当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。
3. 添加远程库
> * 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git` 
> * 关联后，使用命令`git push -u origin master` 第一次推送master分支的所有内容
> * 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master` 推送最新修改
4. 从远程库克隆clone
> * 要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone` 命令克隆。
> * `git clone git@github.com:maqiqing/gitskills.git`
> * Git支持多种协议，包括`https` ，但通过`ssh` 支持的原生`git协议` 速度最快。
## 分支管理
1. 创建与合并分支
> * 查看分支：`git branch`
> * 创建分支：`git branch <name>`
> * 切换分支：`git checkout <name>`
> * 创建+切换分支：`git checkout -b <name>`
> * 合并某分支到当前分支：`git merge <name>`
> * 删除分支：`git branch -d <name>`
2. 解决冲突
> * 当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
> * 解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
> * 用`git log --graph` 命令可以看到分支合并图。
3. 分支管理策略
> * `git merge --no-ff -m 'merge with no-ff' dev`
> * 合并分支时，加上`--no-ff` 参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward` 合并就看不出来曾经做过合并。
4. bug分支
> * 修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
> * 当手头工作没有完成时，先把工作现场`git stash` 一下，然后去修复bug，修复后，再`git stash pop` ，回到工作现场。
> * `git stash list`
5. furture分支
> * 开发一个新feature，最好新建一个分支
> * 如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。
6. 多人合作
> * 查看远程库信息，使用`git remote -v`
> * 本地新建的分支如果不推送到远程，对其他人就是不可见的
> * 从本地推送分支，使用`git push origin branch-name` ，如果推送失败，先用git pull抓取远程的新提交
> * 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name` ，本地和远程分支的名称最好一致
> * 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`
> * 从远程抓取分支，使用`git pull` ，如果有冲突，要先处理冲突
7. 标签tag
> * 命令`git tag` <tagname>用于新建一个标签，默认为HEAD，也可以指定一个commit id
> * 命令`git tag -a <tagname> -m "blablabla..."` 可以指定标签信息
> * 命令`git tag` 可以查看所有标签

