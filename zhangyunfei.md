# git使用总结

标签（空格分隔）： git

##[cmd-markdown](https://www.zybuluo.com/sunbrook/note/819458)

**感谢廖老师的帮助**

---

## 安装git

 1. 下载git并安装
 2. 开始菜单 Git Bash，添加用户名和邮箱
 
```
$ git config --global user.name "your name"
$ git config --global user.email "adb@er.com"
```

---

##创建版本库

 - 创建文件目录,使用 `pwd` 查看当前目录

``` 
$ cd E:
$ mkdir lngit
$ cd lngit
$ pwd
```

 - 使用 `git init` 初始化版本库，使用 `ls -ah` 查看隐藏目录

```
$ git init
$ ls -ah
```

 - 把文件添加到版本库
1. 创建一个readme.txt 的文件
2. 使用命令  `git add` 把文件放到仓库
3. 使用命令  `git commit` 把文件提交到仓库,-m 添加说明

```
$ git add readme.txt
$ git commit -m "add a txt"
```
 ---
 
## 时空穿梭
- 使用 `git status` 命令查看仓库状态
- 使用 `git diff` 查看修改内容

```
git status -s 
  M readme.txt

git diff
git add readme.txt
git commit -m "update"

```
---
### 版本回退
1. 使用 `git log` 查看 提交的历史
2. 使用 `git log --pretty=online` 查看简明提交历史信息

```
$ git log
 commit commit id  (HEAD -> master)
 Author: username <email>
 Date :commit time
 commit message
 
$ git log --pretty=oneline
commit id (HEAD -> master) commit message

```
 
 - 在 Git 中 `HEAD` 表示当前版本，上个版本是 `HEAD^`,上上个是 `HEAD^^`,往上100个是 `HEAD~100`
 - 使用 `git reset` 回退到上个版本
 - 回退到某个版本使用 `git reset --hard 版本号前几位`
 - 使用 `git reflog` 查看命令历史，可以看到对应版本号，以便于操作版本
 
```
$ git reset --hard HEAD^

$ cat reame.txt

$ git reflog
```

---
### 工作区 暂存区 分支
- 工作区隐藏目录 `.git`,是git的版本库，里面包含 `stage` 暂存区，一个 `master` 分支，一个 `HEAD`指针
![git001.jpg-16.3kB][1]

- `git add` 将文件修改添加到暂存区
  ![git002.jpg-14.6kB][2]

- `git commit` 将暂存区的修改提交到分支
![git003.jpg-14.8kB][3]


- `git diff` 比较 **工作区** 和 **暂存区**
- `git diff --cached` 比较 **暂存区** 和 **分支**

  ---
  
### 管理修改
- git 跟踪管理的是修改，而不是文件
- 理解暂存区的概念，工作区的修改不提交到暂存区的话，那么修改就不会被提交到分支

---

### 撤销修改
- 使用 `git checkout -- file`，撤销工作区的修改
- 使用 `git reset HEAD file`,撤销暂存区的修改

---
### 删除文件

 - 使用 `rm file` 删除工作区的文件
 - 使用 `git rm file`：
 1.工作区和暂存区存在，分支上不存在，需要使用 `git rm -f file`；
 2.三者都存在，删除前两者的文件；
 - 使用 `git rm -f file`，工作区和暂存区文件存在，分支上不存在文件， 删除工作区文件，强制删除暂存区文件
 - 使用 `git checkout -- file` 恢复文件
 
---
##远程仓库
 - 创建SSH Key
 
 ```
 $ ssh-keygen -t rsa -C "youremail"
 ```
 - 在用户目录找到 `.ssh` 文件夹，里面有 id_rsa 私钥，id_rsa.pub 公钥
 
![git004.png-18.4kB][4]

- 添加多个电脑公钥到github，保证实时推送
- github 公开，可以交保护费或自己搭建git服务器

  ---
### 添加远程库
- github 网站添加仓库 New repository，直接添加readme.md 文件将不是空仓库

![git005.png-13.1kB][5]

- 用命令行创建一个本地存储库

```
echo "# adfd" >> readme.md
git init
git add readme.md
git commit -m "first commit"
```

- 把本地存储库关联到线上，并把本地存储库的内容推送到线上

```
git remote add orgin https://github.com/mds/testrepo03.git
git push -u origin master
```

 - 关联远程库，使用命令 `git remote add origin git@server-name:path/repo-name.git`  ,关联后使用命令 `git push -u origin master` 第一次推送master分支的所有内容，伺候每次提交，可以使用命令 `git push origin master`

---

### 从远程库克隆
- 使用命令 `git clone 地址`
- 要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
- Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。
```
cd e:/sfss/
git clone https://github.com/sfs/testrepo03.git
```

---

### 删除 github 存储库
![git13.png-69.7kB][6]
![git014.png-79.3kB][7]
![git015.png-69.3kB][8]
![git016.png-63.4kB][9]
![git017.png-60.2kB][10]

---

##分支管理
###分支的 创建、合并、删除

 - 一开始，master分支一条线，master指向最新的提交，HEAD指向master

![git006.png-5.2kB][11]

- 然后创建一个分支 dev

![git007.png-6.9kB][12]

- 有新的提交操作

![git008.png-7.3kB][13]

- 把 dev 分支 合并到 master 分支上

![git009.png-7.2kB][14]

- 删除 dev 分支

![git010.png-5.4kB][15]

- 查看分支 `git branch`
- 创建分支 `git branch <name>`
- 签出分支 `git checkout <name>`
- 创建 + 签出 分支 `git checkout -b <name>`
- 合并分支到当前分支 `git merge <name>`
- 删除分支 `git branch -d <name>`

  ---
  
### 解决冲突
- 发生在合并分支时，当同一个地方，两个分支都有修改时，就会产生冲突，需要手动解决冲突，然后合并
- 使用`git log --graph` 查看分支合并图，也可使用带参数 `git log --graph --pretty=oneline --abbrev-commit`

---

### 分支管理策略
- 合并分支，Git会用 `Fast forward` 模式，如果删除分支，会丢掉分支信息，如果禁用 `Fast forward` 模式，Git在合并分支时会生成一个新的commit，可以从分支历史上看出分支信息

```
git merge --no-ff -m 'no fast forward'
git log --graph --pretty=oneline --abbrev-commit
```

![git011.png-3.9kB][16]


#### 分支策略
![git012.png-4.3kB][17]

- `master` 分支不能用来干活，仅用来发布新版本
- `dev` 分支用来干活，不过最好是从`dev` 分支上建立自己的分支，然后合并上去

  ---

### BUG分支
- 在 `dev` 这种分支上，有未提交的修改，同时有存在迫切需要解决的bug，这样可以使用git提供的临时存储功能

- 使用 git stash 存储当前修改，可存储多次修改
```
git stash
```
- 签出分支，解决掉bug，然后合并回来
- 用 `git stash list`命令,查看存储列表
```
git stash list
```
- 使用 `git stash apply` 恢复，使用 `git stash drop` 删除
- 另一种方式 `git stash pop` 从list拿出存储（既然拿出，就不用再删除了）
- 建议使用先恢复再删除的方式，避免造成不好的影响
- 指定stash list中的某项存储 使用指令后加 `stash@{0}`,例如 `stash drop stash@{1}`

---

### Feature 分支
- Feature 分支，约定来进行实验性质的分支，命名随意
```
git checkout -b feature-zzz
```
- 实验总之，该分支被废弃了，但git提示该分支有修改没有被合并，需要强制删除，指令`git branch -D feature-zzz`
```
git branch -D feature-zzz
```
---

###多人协作
- 查看远程库信息 `git remote`,详细信息加参数`-v`

```
git remote -v
```

- 推送分支
1. 推送到主分支master，时刻与远程同步
2. 推送到开发分支 dev
3. bug 分支修复本地bug，没必要推送到远程
4. feature 分支，视情况而定

```
git push origin master
git push origin dev
```

- 抓取分支，抓取大家推送的修改到本地，可能有冲突需要合并，使用指令 `git pull`
```
git pull
```

- 发布到github分支
1. 创建对应的本地分支，必须创建本地分支，才能推送相应的线上分支
2. 本地分支发布到线上
3. 当然也可以直接在github上创建分支
```
git brance dev
git push origin dev
```

- 删除线上gitHub分支
分支名前的冒号代表删除
```
git push origin :dev
```

**多人协作模式**
1. 首先，试图用 `git push origin branch-name` 推送自己的修改
2. 如果推送失败，说明远程分支比本地更新，先抓取 `git pull`
3. 合并如果有冲突，解决冲突，并本地提交
4. 没有冲突或已经解决，在尝试推送`git push origin branch-name`
5. `git pull` 提示 “no tracking information” 说明本地分支和远程分支链接关系没有创建，指令`git branch --set-upstream branch-name origin/branch-name`

---

## 操作标签
- 每次添加都会生成一个版本号，把版本号打上标签，方便操作

### 创建标签
- `git tag v1.0` 当前的版本打上v1.0的标签
- `git tag v0.9 fd093f` 针对某个版本打上对应标签
- `git tag -a v1.0 -m "message tag" fs09f` -a 标签名，-m 标签说明
- 同一个版本可存在多个标签

```
git tag v1.0
git tag v0.9 fd093f
git tag -a v1.0.1 -m "msg tag" fd093f
```

- `git tag` 查看标签列表
- `git show v0.9` 查看标签信息
- `git tag -s <tagname> -m "blablabla..."` 可以用PGP签名标签
```
git tag
git show v0.9
```
### 操作标签
- 删除本地标签 `git tag -d v1.0`
```
git tag -d v1.0
```
- 发布标签 - 单个 `git push origin v1.0`
- 发布标签 - 全部 `git push origin --tags`

```
git push origin v1.0
git push origin --tags
```
- 删除线上标签 `git push origin :refs/tags/v0.9`

---
## 自定义Git
### 忽略特殊文件
- 创建`.gitignore` 文件
```
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini
```
- 提交`.gitignore` 文件到Git
- 强制添加某个过滤类型的文件 `-f`
```
git add -f App.class
```
- 检查 .gitignore 是否存在问题 `git check-ignore -v App.class`

- 各种规则 https://github.com/github/gitignore

---
### 配置别名
- git status -> git st
- git commit -> git co
- git branch -> git br
```
git config --global alias.st status
git config --global alias.co commit
git config --global alias.br branch

git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
### 搭建Git服务器
- [ ] 等搞到一台Linux机器再来实际操作一遍

  [1]: http://static.zybuluo.com/sunbrook/154bjs3uschkz7vk3pkc4olz/git001.jpg
  [2]: http://static.zybuluo.com/sunbrook/c96h3szivb38575vwdm6kvoa/git002.jpg
  [3]: http://static.zybuluo.com/sunbrook/f6h8npnsyb2n3timlhmgw4rw/git003.jpg
  [4]: http://static.zybuluo.com/sunbrook/8mtzr11v37k7o8kw54j4q45g/git004.png
  [5]: http://static.zybuluo.com/sunbrook/7ihg6e5sj7x9nxwah2yb7vqd/git005.png
  [6]: http://static.zybuluo.com/sunbrook/xjnxmkx222vl68lk6ib5f3sk/git13.png
  [7]: http://static.zybuluo.com/sunbrook/vhaui3byaq0vpya04j3l5ki1/git014.png
  [8]: http://static.zybuluo.com/sunbrook/9oaj3692uzafupuzxe5lur1h/git015.png
  [9]: http://static.zybuluo.com/sunbrook/qhd34lrrndtm8v6wjnusiq8n/git016.png
  [10]: http://static.zybuluo.com/sunbrook/j6tk9g8ll767tp4g5n5awgml/git017.png
  [11]: http://static.zybuluo.com/sunbrook/wptkaskdf2pfa199wy6ooxgo/git006.png
  [12]: http://static.zybuluo.com/sunbrook/dplem9p6z64xs8un0tpwq3qw/git007.png
  [13]: http://static.zybuluo.com/sunbrook/997jzzzjanboa6wly3gon4mq/git008.png
  [14]: http://static.zybuluo.com/sunbrook/tbyy1mtgp0tn3g80cy570c08/git009.png
  [15]: http://static.zybuluo.com/sunbrook/cvpv7zize6aiojvm5jtqa5i2/git010.png
  [16]: http://static.zybuluo.com/sunbrook/hyv6nmebuwap8m15pyna18wn/git011.png
  [17]: http://static.zybuluo.com/sunbrook/jocuvb7d0txfwyryop2hvemz/git012.png