# Git学习总结

---

作者：浅空

日期：2024年4月13日

---

> 好用的代码版本管理软件.

Git 学习过好几次了,再次艰难的开始...
不过这一次我要彻底搞懂

## 1.下载安装
### 1.1 Windows安装
1. 打开[官网](https://git-scm.com/downloads),选择Windows平台,下载`exe`或`zip`格式的安装包安装即可.

![Git官网.png](https://images.bravexist.cn/rest/2024/04/l4DIP2K.png)
### 1.2 Linux安装
1.  依据不同的系统,使用不同的安装命令即可
```CentOS
sudo yum install git
```
```Ubuntu
sudo apt-get install git
```
### 1.3 确保将`git`命令添加到环境变量
#### 1.3.1 windows平台

- 成功案例

![windows下git添加到环境变量的正确案例.png](https://images.bravexist.cn/rest/2024/04/x6xRP2K.png)

- 失败案例

![windows下git添加到环境变量的错误案例.png](https://images.bravexist.cn/rest/2024/04/M7mrP2K.png)

#### 1.3.2linux平台
- 成功案例

![Linux下git添加到环境变量的正确案例.png](https://images.bravexist.cn/rest/2024/04/EFkSP2K.png)

- 失败案例

![Linux下git添加到环境变量的错误案例.png](https://images.bravexist.cn/rest/2024/04/YXzSP2K.png)
#### 1.3.3 配置全局用户名和邮箱
```
git config --global user.name="名字"
git config --global user.email="邮地址箱"
```

## 2. 最简单使用（入门）

1. 名词解释

- 工作区，当前修改被称为工作区
- 暂存区，要提交到版本库的文件需要先放到暂存区
- 版本库，提交后是版本库，并且区分本地和远程

1. 创建仓库

```
git init
git init -b 分支名
```

1. 将文件从 工作区 -->> 暂存区

```
git add 文件名
```
1. 将文件从 暂存区 -->> 版本库

```
git commit -m "本次提交的注释"
git commit -m "可以合并最近的一次提交" --amend
```

1. 查看版本历史

```
git log
git log --oneline
git log --pretty=oneline
git log --graph
git log --abbrev-commit
git log --pretty=oneline --graph --abbrev-commit
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

`--abbrev-commit` 参数将显示短（7个字符，正常情况40个）的哈希值

1. 丢弃工作区和暂存区的修改，回到版本库

```
git reset --hard HEAD^
git reset --hard HEAD~1
git reset --hard 版本哈希值
```

一个`^`代表回退一个版本. `~` 后接回退几个版本
**注意** : Windows操作系统下, `^`是换行符, 需要使用双引号包裹`HEAD^` 或者多敲一个`^`符号

1. 这种暴力的方式回到过去的版本库后，新的提交记录可能会被隐藏，想要查看时可以

```
git reflog
git log --all
git log --walk-reflogs
git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
```

- `--pretty="..."` 定义输出的格式
- `%h` 是提交 hash 的缩写
- `%d` 是提交的装饰（如分支头或标签）
- `%ad` 是创作日期
- `%s` 是注释
- `%an` 是作者姓名
- `--graph` 使用 ASCII 图形布局显示提交树
- `--date=short` 保留日期格式更好且更短

## 2. 查看以往任何版本的状态下的文件

### 2.1 法一，detached 法

2.1.1 回到某个版本

```
git checkout <提交哈希值>
```

此时处于`detached HEAD`状态，可以随意查看，但修改不会保存，除非新建分支

2.1.2 丢弃修改状态，回到原始的`detached HEAD`状态

```
git checkout .
```

2.1.3 退出状态（==切换分支），回到最新的提交

```
git checkout <分支名>
git switch <分支名>
```

## 2.2 法二，哈希法

2.2.1 查看提交对象的内容

```
git cat-file -p <提交哈希>
```

2.2.2 查看文件树对象的内容

```
git cat-file -p <树哈希>
```

2.2.3 通过文件对象哈希来查看文件内容

```
git cat-file -p <文件对象哈希>
```

## 3. 版本切换的其余情况

### 3.1 丢弃暂存区

#### 3.1.1 保留工作区

```
git reset
git reset HEAD
git reset HEAD <可选择单独的一个文件>
git restore --staged 文件名
```

#### 3.1.2 不保留工作区

```
git reset --hard HEAD^
git reset --hard HEAD~1
git reset --hard 版本哈希值
```
一个`^`代表回退一个版本. `~` 后接回退几个版本
**注意** : Windows操作系统下, `^`是换行符, 需要使用双引号包裹`HEAD^` 或者多敲一个`^`符号

### 3.2 丢弃工作区

1. 如果已添加暂存区，还未加入版本库，暂存区也要丢弃的话 == 丢弃暂存器且保留工作区

```
git reset 
git reset HEAD
git reset HEAD 文件名
git restore --staged 文件名
```

1. 如果已添加暂存区，还未加入版本库，暂存区要保留的话 

```
git restore 文件名
```
1. 如果还未提交暂存区，可以直接丢弃所有修改或单独一个文件 `或` 直接将整体回溯到上一个提交

```
git checkout -- 文件名
git checkout .
git reset --hard HEAD
```

1. 如果已经提交暂存区，且已经提交

```
git reset --hard HEAD
```

### 3.3.撤销某次版本库的提交，其实是新的一次反向提交

```
git revert <提交哈希值>
git revert <提交哈希值> --no-edit
%撤销最新的提交%
git revert HEAD 
```

**注意** ：此种方式会给`git log`留下记录，且默认会自动打开编辑器，用于写注释

### 3.4 不同版本之间的对比

1. 工作区与暂存区的对比

```
git diff
git diff 文件名
```

1. 工作区与最新版本库的对比

```
git diff HEAD
git diff HEAD 文件名
```

1. 暂存区与最新版本库的对比

```
git diff --cached
```

默认会比较工作区与暂存的，`--cached`会比较暂存区与最新提交的，也可以指定任意提交哈希值

## 4.分支相关

### 4.1 普通情况

1. 新建分支

```
git branch <分支名>
%创建并切换到新分支%
git checkout -b <分支名>
git switch -c <分支名>
git init -b <分支名>
```
1. 修改当前分支名，强制修改（远程存在同名分支也要修改），永久修改的话

```
git branch -m <新分支名称>
git branch -m <旧分支名称> <新分支名称>
git branch -M <新分支名称>
git branch -M <旧分支名称> <新分支名称>
git config --global init.defaultBranch main
```

1. 删除分支，强制删除还未合并的分支

```
git branch -d <分支名>
git branch -D <分支名>
```

1. 查看所有分支

```
git branch
```

1. 切换分支

```
git checkout <分支名>
git switch <分支名>
```

1. 合并分支，非快速合并在删除分支后，仍能看到分叉（建议）

```
git merge <别的分支名>
git merge --no-ff -m "一些记录此次合并的注释" <别的分支名>
```

### 4.2 修复BUG情况

遇到bug情况时的问题

- 没有提交不能切换分支，所有首先要保留当下不能提交的状态
- 总不能在不同分支上重复修同一个bug吧

#### 4.3.1 储藏室功能的使用

1. 保存当前状态，可以保存多个储藏状态

```
git stash
git stash -u
git stash --include-untracked
```

1. 列出储藏的状态

```
git stash list
```

1. 进入储藏的状态

```
git stash appply stash的id
```

1. 删除储藏的状态

```
git stash drop stash的id
```

1. 进入并删除储藏状态

```
git stash pop stash的id
```

#### 4.3.2 在不同分支，重复修复bug？

```
git cherry-pick <bug提交id>
```

## 5. 远程仓库

1. 生成ssh密钥并在Github添加

```
ssh-keygen -t rsa -C "邮箱"
```

1. 显示远程仓库

```
git remote
git remote -v
```
fetch标识可以拉去，push表示有权限推送

1. 添加远程仓库

```
git remote add 别名 ssh协议的地址
```

1. 修改远程库的地址

```
git remote set-url 别名 新的url
git rm set-url 别名 新的url
```

1. 删除远程库

```
git remote remove 别名
```

1. 拉取远程仓库

```
git fetch <仓库别名> <分支名>
```

1. 拉取并和本地进行合并，变基合并

```
git pull
git pull <仓库别名> <分支名>
git pull --rebase  <仓库别名> <分支名>
```

1. 克隆远程库

```
git clone 远程库地址
```

1. 推送到远程仓库，`-u`会将远程库和本地库设置为默认，推荐强制推送`-f`,`--force`，远程会和本地保持一致

```
git push 远程别名 分支
git push -u 远程别名 分支
git push -f
git push --force
```

1. 绑定本地分支和远程分支

```
git branch --set-upstream 本地分支名 远程别名/远程分支名
```

1. 变基合并，常用于pull或fetch之后

```
git rebase
```

## 6. 标签管理

1. 创建标签

```
git tag 版本号
git tag 版本号 <提交哈希值>
git tag -a 版本号 -m "说明文字" <提交哈希值>
```

1. 显示标签信息

```
git show 版本号
```

1. 删除标签

```
git tag -d 版本号
```

1. 推送标签到远程，一次性推送全部

```
git push 别名 版本号
git push 别名 --tags
```

1. 删除远程标签，需要先删除本地标签，

```
git push 别名 :refs/tags/版本号
```

## 7. 其它情况

1. 文件重命名或移动路径，删除对文件的跟踪

```
git mv 旧名称或路径 新路径或新名称
git rm 不需要跟踪的文件
```

1. 别名

```
git config --global alias.br branch
```

1. `.gitignore`忽略文件

- `!`会排除文件

- ```
  %强制添加文件%
  git add -f 文件名
  ```

- ```
  %检查规则哪里错了%
  git check-ignore -v 文件名
  ```

1. 编码问题，文件首先修改为`utf-8`

	- windows的`cmd`乱码
    ```
    chcp 65001
    ```
   
   - Git中文乱码，`add`，`log`，
   
   ```
   git config --global core.quotepath false
   git config --global i18n.logoutputencoding utf-8
   ```



## 8. 参考网站

- https://www.liaoxuefeng.com/wiki/896043488029600
- https://web.archive.org/web/20191004034217/http://igit.linuxtoy.org/contents.html
- https://chat.openai.com/
- https://www.bilibili.com/video/BV1RC411W7UE