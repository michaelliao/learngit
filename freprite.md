## Git学习总结

### 1. 初始化仓库：
```
git init  
```

### 2. 往仓库中添加文件：　
* 将文件修改添加到暂存区：`git add <filename>`
* 将暂存区中的所有内容提交到当前分支：`git commit -m "文件说明"`  

### 3. 查看仓库状态：  
```
git status
```

### 4. 比较文件的不同，或者查看文件修改的地方：  
```
git diff <filename>
```

### 5. <span id="version_back">版本回退</span>
* 查看历史记录：`git log`
* 查看最近的某次的记录：`git log -<数字>`
* 查看精简的历史记录：`git log --pretty=oneline`
* 查看输入命令的记录：`git reflog`
* 版本表示：当前版本表示为`HEAD`，上一个版本表示为`HEAD^`，上上个版本表示为`HEAD^^`，上100个版本可以表示为`HEAD~100`
* 版本回退：`git reset --hard <版本id>`

### 6. Git的工作区和暂存区
* 工作区（Working Direction）：所编辑的文件所在的目录
* 版本库（Repository）：工作区文件夹中的.git文件夹
* 暂存区（Stage）：是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中
* Git跟踪的是文件的修改而不是文件本身：每次修改如果不add到暂存区，那么当commit提交时就不会添加到分支中 

### 7. 撤销修改：
- 命令：`git checkout -- <文件名>`  
    1. 当文件自修改后还没有被add到暂存区，则撤销修改就会使文件回到与版本库分支中的文件一模一样
    2. 当文件已经add到暂存区，又作了修改，则撤销修改就会回到与暂存区中的文件一样
       **注：**此命令中的`--`一定要有，如果没有`--`就变成切换到另一个分支
- 命令： `git reset HEAD <文件名>` `git checkout -- <文件名>`  
    1. 当修改已经add到暂存区，此时想要撤销修改时，就需要先将暂存区的修改回退到工作区，然后再工作区撤销修改
    2. 当已经提交到版本库，想撤销修改时，就需要进行[版本回退](#version_back)。

### 8. 删除文件：
- 若文件已经提交到版本库，从版本库中删除文件：`git rm <文件名>`
- 若文件添加到暂存区，从暂存区和工作区中删除文件：`git rm -f <文件名>`
- 若在工作区删除了文件，但文件已添加到暂存区或者提交到版本库中，在工作区中恢复文件：`git checkout -- <文件名>`  

### 9. 创建SSH Key：
```
ssh-keygen -t rsa -C "youremail@example.com
```
生成.ssh文件，其中id_rsa为私钥，id_rsa.pub为公钥。
将id_rsa.pub中的公钥添加到gitHub.com中。  

### 10. 将工程合并到github.com上：
1. 在github上创建项目，然后根据提示绑定
2. 关联一个远程库：
    ```
    git remote add origin https://github.com/username/projectname.git
    git remote add origin git@github.com:path/repo-name.git
    ```
3. 推送到远程库中：`git push -u origin master`  
4. 若本地版本修改之后，只需要通过`git push origin master`命令就可以合并到github.com中  
5. 将仓库项目克隆到本地：`git clone git@github.com:path/repo-name.git`  

### 11. 分支管理
1. 创建分支：`git checkout -b <分支名称>` 其中，参数`-b`相当于两条命令：创建并切换：`git branch <分支名称>`，`git checkout <分支名称>`

2. 创建本地分支的同时，将远程分支的内容克隆（clone）到此分支：`git checkout -b <本地分支名> <远程库名称>/<远程分支名称>`

3. 查看当前分支：`git branch` 列出所有分支，并在当前分支前显示一个**\***

4. 分支切换：`git checkout <分支名称>`

5. 分支合并：`git merge <分支名称>`将指定分支合并到当前分支上  

6. 删除分支：`git branch -d <分支名称>`

7. 删除远程分支：`git push origin :<分支名称>`**:**代表删除分支

8. 查看分支合并图命令：
    ```
    git log --graph // 多行显示提交记录
    git log --graph --pretty=oneline // 单行显示合并及提交记录，但会显示每个记录id的全称
    git log --graph --pretty=oneline --abbrev-commit // 单行显示，每个记录的Id只会显示一部分；
    ````

9. 禁用Fast Forward模式
    通常通过命令:`git merge <分支名称>`合并时，如果可能（比如没有冲突），Git会用**Fast Forward**模式，此种模式下，合并完成后，会丢失分支信息；
    可以通过**禁用Fast Forward模式**，Git就会在merge时生成一个新的commit，这样就可以从分支历史记录中看到分支信息；
    禁用Fast Forward模式的关键字为`--no-ff`，完整命令：`git merge --no-ff -m "说明" <分支名称>`因为要生成一个新的commit，所以用`-m`添加说明；  

10. 分支策略
   在实际开发中，应该按照以下几个原则进行分支管理：
    1.  master分支应该是非常稳定的版本，也就是用来发布新版本，通常不在此分支开发；
    2. 在dev分支上开发，将每个人的成果合并到dev上，然后通过dev合并到master上进行发布；
    3. 每个人都有自己的分支，比如John，Sam等等，在自己的分支上开发，之后将其合并到dev分支上。

11. bug分支
   修复bug时通常在master中建一个临时分支，修复完成后，合并分支，然后将临时分支删除；

12. 任务现场“储存”操作
   当工作进行到一半，需要立即处理其他事务，则可以通过任务现场“储存”操作将正在进行的工作暂时隐藏起来。
   命令关键字为：**stash**  
   - git stash：备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区的内容保存到Git栈中。 
   - git stash pop：显示Git栈内的所有备份，恢复工作区的相关内容。由于可能存在多个stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复；
   - git stash list：显示Git栈内所有备份，可以利用这个列表来决定从哪个地方恢复；
   - git stash clear：清空Git栈。此时使用图形化工具会发现，原来stash的那些节点都会消失。
   - git stash apply stash@{<标号>}：恢复Git栈中第<标号>所代表的内容；此命令不会从Git栈中删除此条存储信息。若要删除，需要用`git stash drop`命令。
13.  feature分支：
    每添加一个功能，最好针对此功能新建一个分支，在分支上开发完成之后，在进行合并；
    如果未合并时需要删除，则可以通过`git branch -D <分支名称>`强制删除；
14. 多人协作 
    1. 查看远程库名称：
        ```
           git remote
           git remote -v // 显示更加详细的信息           
           git branch -a // 查看本地和远程分支
        ```
    2. 推送分支：`git push origin <分支名称>` 此命令默认将当前分支推送到远程的master上。若要将本地master分支推送到远程的dev(远程已建立此分支)，需要指定远程分支的名称，因为本地master分支默认指向origin master分支：`git push origin master:<远程分支名称>`
    3. 抓取分支：`git pull`当有人对远程分支中的某一文件做了修改，并已完成推送，本地也对此文件做了修改，再推送时会推送失败。需要先将远程库中的文件pull（拉取）到本地，然后在本地合并并解决冲突，再往远程推送。
           git pull作用：取回远程主机某个分支的更新，在与本地的指定分支合并；
           命令格式：`git pull <远程主机名> <远程分支名>:<本地分支名>`。
           当远程分支与当前分支合并，冒号后面的部分可以省略；`git pull`先取回，在合并，相当于先`git fetch`，再做`git merge`
    4. 建立跟踪关系  
           每添加一个功能，最好针对此功能新建一个分支，在分支上开发完成之后，在进行合并；Git可以自动在本地分支与远程分支之间，建立一种跟踪关系（tracking）。比如，在git master分支clone时，所有本地分支默认与远程主机的同名分支，建立跟踪关系，也就是说，本地的master分支自动“追踪”origin/master分支。
           Git也可以手动建立跟踪关系：`git branch --set-upstream <本地分支名> <远程主机名>/<远程分支名>`
           如果当前分支与远程分支存在追踪关系，git pull就可以省略远程分支名称：`git pull origin`
           如果当前分支只有一个追踪分支，连远程主机名都可以省略：`git pull`
           如果合并采用rebase模式，可以使用-rebase选项：`git pull --rebase <远程主机名> <远程分支名>:<本地分支名>`  

### 12. 标签管理
1. 创建标签：`git tag <tagName>`
     **注：**
   - 默认标签是创建在最新提交的commit上的，需要早前的commit打标签时，可以用commit的ID来打标签：`git tag <tagname> <ID> `
   - 可以创建带有说明的标签，用-a指定标签名，-m指定说明文字。如：`git tag -a v0.1 -m "version 0.1 realeased"`
   - 通过-s用私钥签名一个标签，如：`git tag -s v0.2 -m "signed version 0.2"`

2. 查看所有标签：`git tag`
     **注：**标签不是按照实际顺序列出而是按照字母排序。

3. 查看标签信息：` git show <tagname>`

4. 删除标签：`git tag -d <tagname>`;
5. 推送标签:创建的标签存储在本地，不会自动推送到远程，要将某个标签推送到远程，可以使用命令：`git push origin <tagname>`一次性推送所有标签：`git push origin --tags`
6. 删除远程标签：先删除本地标签;然后通过命令：`git push origin :refs/tags/<tagname>`

### 13. 忽略特殊文件：
参考[gitignore](https://github.com/github/gitignore)

### 14. 设置别名
```
git config --global alias.<别名> <命令名称>
```

### 15. 配置文件：
--global：针对当前用户起作用；如果不加，只针对当前的仓库起作用。