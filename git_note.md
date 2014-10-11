# Git与GitHub

标签（空格分隔）： ReadingNote

[toc]

-----------------------
## 常用命令
- 开始时，克隆
```
$ git clone git@github.com:yourname/resp.git # 仅master
$ git checkout -b dev origin/dev # 新建并克隆分支
```
- 查看状态
```
$ git status
$ git diff <file> #add之前
$ git log [--pretty=oneline]
$ git log -p -1 # 查看最近一次提交的修改
$ git reflog # 查看使用过的命令
```
- 完成后，add与commit
```
$ git add .
$ git commit -m "It's the comment."
```
- 版本回退
```
$ git reset --hard HEAD^^   # 回退两个版本
$ git reset --hard HEAD~100 # 回退100个版本
```
- 撤销修改
```
$ git checkout -- <file> # 撤销工作区中的修改
$ git reset HEAD # 撤销add
```
- 添加标签（release）
```
$ git tag v0.1 [0f50c4] #为[0f50c4]设置标签v0.1
$ git tag # 查看已有标签
$ git show v0.1 # 查看v0.1
$ git push origin --tags # 推送所有标签
$ git tag -d v0.1 # 删除标签
```
--------------------------
## 分支管理
> git的分支管理，是文件指针的变化；git鼓励使用分支

### 基本操作
- 创建分支
```
$ git checkout -b dev # 创建分支dev
```
- 切换分支
```
$ git checkout dev # 切换到dev
```
- 查看分支
```
$ git branch
```
- 合并分支
```
$ git merge [--no-ff -m "merge with no-ff"] dev
```
- 删除分支
```
$ git branch -d dev
```
- 保存现场
```
$ git stash
$ git stash pop
```
### 解决冲突
- 有冲突时，无法合并，需要手工解决冲突
- 通过`git status`查看冲突的文件
- 打开冲突的文件，git已经标记了冲突的位置

###多人协作
> 出现冲突时，先pull到本地，合并后再push

- 远程提交
```
$ git push [-u] origin master # 第一次使用需要[-u]
```
- 建立关联
```
$ git branch --set-upstream dev origin/dev
```
- 本地同步
```
$ git pull
```
--------------------------
## 第一次使用的基本配置
- 产生`密钥`
```
$ ssh-keygen -t rsa -C "your_email@youremail.com"
```
- 在github中注册`公钥`（`~/.ssh/id_rsa.pub`）
- 设置`username`与`email`
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
-----------------------
## 参考资料
1. [廖雪峰的官方网站 - Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
1. [Wuyuan's Blog](http://wuyuans.com/2012/05/github-simple-tutorial/)
1. [快乐&&平凡 - CSDN.NET](http://blog.csdn.net/wh_19910525/article/details/8128916)
