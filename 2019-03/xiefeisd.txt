廖雪峰老师的教程在https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
本文是学习过程形成的笔记。

1 安装
$ apt-get install git /* 安装 */
$ git /* 显示帮助信息 */
$ git config --global user.email "you@example.com" /* 设置email */
$ git config --global user.name "Your Name" /* 设置用户名 */

2 创建仓库
$ mkdir git_learn /* 创建文件夹 */
$ cd git_learn /* 进入文件夹 */
$ git init /* 初始化仓库 */

3 简单使用
3.1 向仓库添加文件
$ vim readme.txt /* 创建一个文本文件 */
$ git add readme.txt /* 添加文件 */
$ git commit -m "first commit" /* 提交文件 */

3.2 查看基本信息
$ git status /* 查看状态 */
$ git diff /* 查看差异 */
$ git log /* 查看历史记录 */

3.3 版本操作
$ git reset --hard HEAD^ /* 回退到上一个版本 */
$ cat readme.txt /* 查看文件内容 */
$ git reset --hard <commit id> /* 逆向恢复到未来版本，指定版本号 */
$ git reflog /* 查看操作指令记录 */
$ git diff HEAD -- readme.txt /* 查看工作区和版本库中文件的区别 */
$ git checkout -- readme.txt /* 检出，用版本库替换工作区 */
$ git reset HEAD readme.txt /* 重设，用工作区替换暂存区 */

4 分支
4.1 创建与合并
$ git branch dev /* 创建分支dev */
$ git checkout dev /* 检出（切换到）分支dev */
$ git checkout -b dev /* 创建并检出分支dev */
$ git branch /* 查看当前分支 */
$ git add readme.txt /* 在当前分支修改readme.txt */
$ git commit -m "branch test" /* 提交 */
$ git checkout master /* 检出（切换到）分支master */
$ git merge dev /* 合并分支dev（在主分支操作） */
$ git branch -d dev /* 删除分支dev */

4.2 合并策略
$ git merge --no-ff -m "merge with no-ff" dev /* 强制禁用快速合并，留下合并历史记录 */

4.3 解决冲突
$ git checkout -b feature1 /* 创建分支 */
$ git add readme.txt /* 提交修改 */
$ git commit -m "AND simple" /* 提交 */
$ git checkout master /* 切换到master */
$ git add readme.txt /* 提交修改 */
$ git commit -m "& simple" /* 提交 */
$ git merge feature1 /* 合并，发生冲突 */
$ git status /* 查看状态 */
$ git add readme.txt /* 添加修改后的文件 */
$ git commit -m "conflict fixed" /* 提交 */
$ git log --graph --pretty=oneline --abbrev-commit /* 查看合并情况 */
$ git branch -d feature1 /* 删除分支feature1 */

4.4 暂时中断分支
$ git stash /* 藏匿当前分支的工作现场 */
$ git stash list /* 查看藏匿的工作现场列表 */
$ git stash pop /* 恢复工作现场 */

4.5 强行删除分支
$ git branch -D feature1 /* 强行删除分支feature1，适用于已提交、未合并的分支 */

5 标签
5.1 创建标签
$ git branch /* 查看当前分支 */
$ git checkout master /* 切换到master分支 */
$ git tag v1.0 /* 打标签v1.0 */
$ git tag /* 查看标签 */
$ git log --pretty=oneline --abbrev-commit /* 查看提交历史 */
$ git tag v0.9 f52c633 /* 给历史提交打标签v0.9 */
$ git tag -a v0.1 -m "version 0.1 released" 1094adb /* 打历史标签，并添加说明 */
$ git show v0.1 /* 查看标签详情 */

5.2 删除标签
$ git tag -d v0.1 /* 删除标签 */
$ git push origin v1.0 /* 推送标签 */
$ git push origin --tags /* 一次性推送本地的所有标签 */
$ git tag -d v0.9 /* 删除本地标签 */
$ git push origin :refs/tags/v0.9 /* 把本地的删除推送到远程 */

6 定制git
6.1 自定义
$ git config /* 查看自定义选项帮助 */

6.2 忽略特殊文件
编写.gitignore文件，提交到本地仓库，提交时忽略其中指定的文件。
.gitignore模板：https://github.com/github/gitignore
$ git add -f <file> /* 不顾忽略规则，强制添加 */
$ git check-ignore -v <file> /* 检查忽略规则对<file>的作用 */

6.3 设置别名
$ git config --global alias.st status
$ git config --global alias.unstage 'reset HEAD'
.git/config文件存储配置信息，别名在alias小节，可手动编辑。

7 远程仓库
7.1 注册github并设置密钥
注册github账号。
$ ssh-keygen -t rsa -C "youremail@example.com" /* 生成ssh密钥 */
登录github，头像>>settings>>SSH and GPG keys>>new ssh key ,在key文本框里粘贴id_rsa.pub文件的内容。

7.2 关联远程仓库
$ git remote add origin git@github.com:<username>/learngit.git /* 关联远程库 */
$ git remote rm origin /* 删除关联 */

7.3 克隆远程库
登陆GitHub，创建一个新的仓库，名字叫gitskills。
勾选Initialize this repository with a README，这样GitHub会自动创建一个README.md文件。
$ git clone git@github.com:<username>/gitskills.git /* 克隆远程库，克隆到当前路径 */

7.4 简单使用
$ git remote /* 查看远程库的信息 */
$ git remote -v /* 查看远程库的信息 */
$ git push -u origin master /* 首次推送到远程，-u建立本地分支和远程分支的链接 */
$ git push origin master /* 后续推送到远程 */
$ git pull /* 拉取（当前仓库的当前分支） */

7.5 多人协作
$ git push origin master /* 推送master分支 */
$ git push origin dev /* 推送dev分支 */
$ git pull /* 拉取 */
/* 本地解决冲突 */
$ git branch --set-upstream-to dev origin/dev /* 给dev分支建立本地与远程的链接关系 */
$ git checkout -b dev origin/dev /* 在本地创建和远程分支对应的分支 */

7.6 在github上fork别人
在别人的项目上点击fork，创建自己的分支。
$ git clone git@github.com:<username>/<objectName>.git /* 在本地克隆分支 */
在本地工作，并推送到自己的github仓库。
在github上发起pull request，请求作者接受自己的修改。

8 码云（gitee）
国内的代码仓库，使用方法和github相同。

9 搭建git服务器
$ sudo apt-get install git /* 安装 */
$ sudo adduser git /* 创建用户 */
收集用户的id_rsa.pub文件，放到/home/git/.ssh/authorized_keys文件里，一行一个。
$ cd /srv /* 定位到需要建立仓库的路径 */
$ sudo git init --bare sample.git /* 初始化仓库 */
$ sudo chown -R git:git sample.git /* 更改所有者 */
$ vim /etc/passwd /* 禁止shell */
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
Gitosis用于大规模管理公钥。
Gitolite用于权限控制。
