# Git学习笔记

## 本地仓库

### git安装

```sh
sudo apt-get install git
```

- 安装成功后，需要配置本机器相关信息

```sh
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

### 创建版本库

- 在本机上创建版本库(repository)，在代码目录下，运行：

```sh
git init
```

- 添加文件到仓库

```sh
git add file_name
git commit -m "upgrade message"
```

> git仓库分工作区和暂存区，执行`git add`后，会将工作区中文件的**修改**添加到暂存区，执行`git commit`后，会将暂存区的修改提交到master分支中。
>
> `git add`只负责添加修改，当执行`git add`之后，如果二次修改文件，则新的修改不会被commit到仓库中。
>
> ![1](./gitlearn/1.jpeg)

### 版本控制

- 获取当前工作区状态

```sh
git status
```

- 查看工作区文件的修改内容

```sh
git diff file_name #查看的是add之前的文件修改内容，如果已经add了，则看不到变化
```

- 查看提交(commit)日志,用于确定回退到哪个版本，`HEAD`指向的版本即当前版本

```sh
git log # 加上--pretty=oneline参数，输出简要信息
```

- 版本回退

```sh
git reset --hard HEAD^ # 回到上一个版本
git reset --hard HEAD^^ # 回到上两个版本
git reset --hard HEAD~100 # 回到之前100个版本
git reset --hard 1094a # 回到某一个版本，1094a为版本号，可以是前缀
```

- 查看命令历史，用于重返未来版本

```sh
git reflog
```

### 撤销修改

- 当需要丢弃对工作区的修改时，可以执行：

```sh
git checkout -- file_name
#该命令负责将文件撤回到最近一次commit或add时的状态
```

- 当修改工作区文件，**且`git add`到了暂存区**，若想丢弃修改，可执行：

```sh
git reset HEAD file_name
#该命令负责将暂存区的文件撤销掉
git checkout -- file_name
```

- 若已经`git commit`，则需要回退版本，前提是**没有推送到远程库**

### 删除文件

- 直接删除某文件

```sh
git rm file_name
git commit -m "upgrade information"
```

- 也可在工作区删除之后，执行`git add`删除文件

> 先手动删除文件，然后使用git rm <file>和git add<file>效果是一样的。

- 如果删错了，想要撤销，可以执行：

```sh
git checkout -- file_name #删除也是一种修改
```

- 想要撤销删除的前提是：代码已经提交到了版本库，否则无法找回，并且只能回复到最新提交的版本，提交之后的修改无法找回。

## 远程仓库

### 创建密钥

- 本地git仓库与GitHub仓库通过ssh进行加密，故需要设置RSA密钥，设置方法如下：

  1. 在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。否则，创建ssh key：

     ```sh
     ssh-keygen -t rsa -C "youremail@example.com"
     ```

     `id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

  2. 登陆GitHub，打开“Account settings”，“SSH Keys”，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容

### 添加远程仓库

- 需要在GitHub网页上手动添加新仓库

- 在本地仓库下运行：

  ```sh
  git remote add origin git@github.com:<myname>/<repositories>.git
  ```

  origin是远程仓库的名字，行规默认这样写。

- 当本地仓库进行了提交之后，运行如下命令同步到远程仓库：

  ```sh
  git push -u origin master #第一次push需加上-u用于把origin和master关联起来，之后可以不用加上
  ```

- 查看远程库信息

  ```sh
  git remote -v
  ```

- 删除远程库

  ```sh
  git remote rm origin #仅删除本地和远程的绑定关系，并非删除GitHub上的库
  ```

### 从远程库克隆

- 在本机上克隆远程仓库：

  ```sh
  git clone git@github.com:michaelliao/gitskills.git
  ```

  

