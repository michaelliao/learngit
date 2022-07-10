# Git

Git--分布式版本控制系统，每个人本地都有完整的版本库，都可以本地提交、查看版本、切换分支

SVN--集中式版本控制系统，从SVN上拉过来--开发--推上去

### 简介

自动记录每次文件的改动，随时查看某次改动。

### 创建版本库

​    即仓库repository，或理解为目录，Git可以管理、跟踪每个文件的修改、删除，以便将来任何时刻追溯历史。

mkdir learngit

git init

ls -ah 查看隐藏文件

### 把文件添加到版本库

​	所有的版本控制系统，只能跟踪__文本文件__的改动，git也不例外，如txt、网页、代码等。图像、视频等二进制文件也能由版本管理系统管理，但没法跟踪文件变化。

​	强烈建议使用UTF-8编码，如visual studio code

git add readme.md	添加到stage（暂存区）

git commit -m 'tip message'	把文件修改添加到当前分支

### 时光机穿梭

git status	随时查看仓库的状态，有没有修改呀--如果提示修改过，可用git diff查看修改内容

git diff readme.md	查看修改的内容，显示格式是Unix通用的diff格式

提交修改 同 提交新文件：

git add readme.md

（git status）

git commit -m 'add distributed'

（git status	提示没有需要提交的修改了）

### 版本回退

​	我们会不断的进行commit，如果某一次commit失败了，就从上一次成功的commit恢复而不是重头再来。commit类似“保存快照”，一旦文件改乱了、误删了，就从最近的commit恢复，然后继续工作。

git log	历史记录，文件每次的改动都改了什么内容

git log --pretty=oneline	嫌信息太多，oneline

Git中使用__HEAD__表示当前版本，上一个版本是HEAD^，上上一个版本是HEAD^^，往上100个版本写成HEAD~100。HEAD就像指针。

git reset --hard HEAD^	返回上一个版本，同时更新了工作区的文件

git reset --hard 98fc

如果找不到要恢复的新版本commit id怎么办--git总是有后悔药吃滴！

git reflog

​	

​	Git允许我们在版本历史之间穿梭  git reset --hard the_commit_id

​	穿梭之前，用git log查看提交历史，以便确定回退到哪个版本

​	重返未来，用git reflog查看命令历史，以便确定回到未来哪个版本

### 工作区和暂存区

​	_暂存区_：git和其他版本控制系统的不同之处。

​	_工作区_：learngit文件夹

​	_版本库_：工作区里一个隐藏的文件夹.git，不算工作区，是git的版本库--存了很多东西__1.最重要的是stage（暂存区，或者叫index）；2.git为我们自动创建的第一个分支master；3.指向master的指针HEAD。

modified: 意思是文件有修改

untracked：没有被添加到stage暂存区，未被跟踪

new file：新文件--untracked使用git add到stage后

### 管理修改

git比其他版本控制系统优秀的原因是因为git跟踪的是修改，而非文件。

git diff HEAD -- readme.md	二者换位置就不行了，不知为何

git commit是把stage暂存数据提交，若某一次修改没有git add，在执行git commit时就不会提交，所以每次作的修改都要git add.

### 撤销修改

git checkout -- readme.md	如果只在工作区修改了，会撤销工作区的修改；如果已执行过一次git add了，在工作区修改了且尚未git add，会撤销到git add后的状态。

_总之，是让文件回到最近一次git add或git commit时的状态。_

此处 -- 很重要，要注意。

1. git reset HEAD readme.md	将暂存区的修改撤销，重新放回工作区--此时git status显示暂存区是干净的，只有工作区有修改（也就是现在把stage区撤回了，工作区也得撤回才行）。

2. 再使用git checkout -- readme.md撤销工作区的修改--此时git status显示工作区也干净了。

git reset既可以回退版本，也可以把暂存区（stage）的修改回退到工作区。使用HEAD表示最新的版本。

__总结__：

​	场景1：丢弃工作区内容，git checkout -- readme.md

​	场景2：丢弃暂存区内容，git reset HEAD readme.md可到场景1，再按场景1操作

​	场景3：丢弃版本库，撤销本次commit--参考_版本回退_  git reset --hard HEAD^

### 删除文件

git rm test.md	工作区删除了文件，版本库我也想删，并且git commit -m 'remove test.md'

### 远程仓库

git杀手级功能__之一__

git是分布式版本控制系统，同一个git仓库可以分不到不同的机器上。

介绍了git和Github的关系--git是个版本控制系统，是个工具，而Github是提供Git仓库托管服务的网站（可能还有其他网站、服务），所以可以通过Github获取免费的远程仓库。

在git目录里创建公钥、秘钥，公钥放到Github网站，就能知道是不是你自己提交的了，多个设备往Github上提交都要配置公钥秘钥。

ssh-genkey -t rsa -C 'your email'	__用户__根目录下会创建.ssh目录，里面有公钥秘钥。

### 添加远程仓库

git remote add origin git@github.com:Suncheng2022/learngit.git	关联远程仓库。origin是为远程库指定的名字（必须指定），可以自定义

git push -u origin master  （第一次）将当前分支推送到远程

git push origin master	后续推送到远程

git remote -v	查看远程库信息

git remote rm origin	删除origin库--只解除了本地和远程的绑定关系，并不是物理删除了远程库。远程库本身没有任何改动，需要到github后台手动删除。



### 从远程库克隆

git clone git@github.com:Suncheng2022/gitskills.git	克隆新库到本地

### 分支管理

创建属于自己的分支，别人看不到，仍在原来分支上继续工作，而你在自己的分支上干活，想提交就提交直到开发完毕而不会给别人以不完整的代码导致程序崩溃，最后一次性合并到原来的分支上，既安全又不影响别人工作。

### 创建与合并分支

每次提交，Git都会把它们串成一条时间线--一个分支。HEAD严格来说指向主分支master，而不是提交，master才是指向提交，所以HEAD指向的就是当前分支。

一开始的时候，master分支是一条线，Git用master指向最新提交，再用HEAD指向master，就能确定当前分支以及提交点。

每次提交，master分支都会向前移动一步。

当我们创建新分支dev时，Git创建了一个指针dev（此时指向master相同的提交），再把HEAD指向dev即表示当前分支在dev上了。

我们在dev上的工作完成了，就可以把dev合并到master上了--最简单的方法是让master指针直接指向dev，完成合并。

git checkout -b dev	创建并切换分支dev。-b参数表示创建并切换[gir brach dev; git checkout dev]

git branch	查看当前分支

git checkout master	切换到master分支--果然，在dev分支作的修改工作区并不显示。

git merge dev	合并分支到当前分支--将dev分支合并到master

git branch -d dev

#### 切换分支switch--命令行不支持

git switch -c dev	创建并切换分支，比checkout更容易理解

git switch master	切换到已有分支

### 解决冲突

合并分支可能遇到冲突。

git checkout -b feature1	创建并切换分支

git add readme.md	在f1分支上修改并提交

git commit -m 'and simple'	

git checkout master	切换到master分支，修改同一个地方

git add readme.md

git commit -m '& simple'

两个分支上情况如下图：

<img src="/home/tx-deepocean/.config/Typora/typora-user-images/image-20220704171257564.png" alt="image-20220704171257564" style="zoom: 67%;" />

git merge feature1	此时合并分支会报冲突

修改成同feature1提交内容相同，再add、commit，此时如下图：

<img src="/home/tx-deepocean/.config/Typora/typora-user-images/image-20220704171458651.png" alt="image-20220704171458651" style="zoom:67%;" />

然后合并就可以了，然后可以删掉f1分支了。

### 分支管理策略

不是太懂

git checkout -b dev	创建并切换分支

修改一下文件 add commit

git checkout master

git merge --no-ff -m 'merge with no-ff' dev	禁用ff合并dev到master，即普通模式合并，保留分支lishi

### Bug分支

软件开发的bug可以通过临时分支修复，修复后然后合并分支，删除临时分支。

比如想要新建临时分支issue-101修复101号bug，但此时正在dev上进行的工作还没提交--工作还需要很长时间才能完成，但是bug要在短时间内修复--stash：把工作现场储存起来，等以后恢复现场后继续工作。

git stash	储存工作区，此时git status查看工作区是干净的，可以放心修复bug了--我在dev新建的hello.py消失了，我在dev修改的readme.md撤销了。

要在哪个分支上修复bug--就从哪个分支上创建临时分支:

git checkout master	切换分支master

git checkout -b issue-101	在master分支上新建临时分支修复bug

在issue-101分支上修复bug（修改了readme.md一行）

git add readme.md

git commit -m 'fix bug 101'

git checkout master	修复完成，切换到master分支

git merge --no-ff -m 'merge fix bug 101' issue-101

至此，完成了master分支的bug修复. 

git checkout dev  切回dev分支继续工作了

git status	工作区干净，如何恢复？

git stash list	查看保存的工作现场

1.git stash apply 恢复，删除git stash drop；2.git stash pop 恢复，同时删除stash

git stash list	空



dev分支早期也是从master分支出来的，master上的bug dev上也有，要重新修复一遍吗？--No--将master上修复bug的commit复制到dev分支上[复制一个commit]

git cherry-pick e3f3177	将修复bug的commit复制到dev分支--果然，修复bug的操作有了

### Feature分支

所以，添加新功能时最好新建一个feature分支，在上面开发完，合并然后删除。

git checkout -b feature-vulcan	接到新任务，新建分支准备开始

新建vulcan文本文件

git add vulcan

git commit -m 'add feature vulcan'

git checkout today	切回today分支准备合并。

此时收到命令，取消功能，就地销毁vulcan功能，因为包含机密资料--删除分支吧

git branch -d feature-vulcan	提示尚未合并，确认后再删除

git branch -D feature-vulcan	删除分支了

### 多人协作

克隆时，Git会自动把本地master分支和远程master分支对应起来，并且远程仓库名称默认为origin

git remote -v	查看_抓取_和_推送_的origin地址，没有推送权限看不到push地址

#### 1. 推送分支

git push origin master	主分支master要时刻与远程同步

git push origin dev	将分支dev的本地提交推送到远程仓库

#### 2. 抓取分支

多人协作时，大家都会推送各自的修改。

模拟另一个同事，将配合你开发：

git clone git@github.com:Suncheng2022/learngit.git	然后进入learngit目录

git branch	只能看到master分支

git checkout -b today origin/today	同事需要在today分支上开发，必须创建远程origin的today分支到本地[前提是，我已经把today分支推送到远程仓库了:git push origin today，github上可以看到多分支today]。同事先git pull获取最新远程仓库，然后git checkout today直接切换到了today分支(远程仓库中的today分支)

同事在readme.md上添加新行，并add commit, git push origin today

我也在自己本地的today分支上修改了readme.md相同地方，也add commit push，失败了，提示“更新被拒绝，因为远程仓库包含您本地尚不存在的提交”，所以需要先pull获取最新的远程仓库数据，于是

git pull	于是我git pull，提示我没有指定本地today与远程origin/today分支的链接

git branch --set-upstream-to=origin/today today	设置today和origin/today的链接

git pull	再pull--成功，但提示冲突了，因为我和同事修改了相同的地方

手动解决冲突，add commit push

### Rebase

少用，会覆盖commit信息

rebase操作可以把本地未push的分叉提交历史整理成直线，目的是让我们在查看历史提交的变化时更容易。

### 标签管理

发布新版本时，通常先在版本库中打一个tag--唯一确定了打标签时刻的版本，此tag就是对应这个版本，其实是指向某个commit的指针。

相比commit号，tag更容易找，tag名字的意义也更容易理解

### 创建标签

git checkout master	首先切换到需要打标签的分支上

git tag 'v1.0'	打一个新标签

git tag	查看所有标签

git log --pretty=oneline --abbrev-commit	如果忘记了打tag，找到之前提交commit

git tag v0.9 f52c633

git tag	可以看到v0.9和v1.0的tag。标签不是按时间顺序排列的，而是按字母顺序

git show v0.9	可以看到v0.9这个tag确实打在了[指定commit上]

git tag -a v1.1 -m '发布v1.1版本' 6838558	创建带有说明的标签 -a 指定标签名，-m指定说明文字

tag总是和commit挂钩，如果commit出现在多个分支上，那么多个分支都能看到这个tag

### 操作标签

git tab -d v0.9	删除tag标签，因为创建的标签都存在本地不会推送到远程，所以可以本地安全删除。

git push origin v1.0	将tag推送到远程

git push origin --tags	一次性将所有标签推送到远程

要删除已推送到远程的标签：

git tag -d v1.0	首先从本地删除tag

git push origin :refs/tags/v1.0	然后从远程删除，要注意格式！

### 使用GitHub

使用GitHub的Fork参与一个开源项目--在自己账号下克隆了这个远程库，然后从自己账号下clone--git clone git@github.com:Suncheng2022/xxx.git

从自己账号clone才能有推送修改的权限

若希望其接受你的修改，发起pull request，对方会考虑是否接受你的pull request。

a





# Linux



rsync -avP tx-deepocean@10.0.40.54:/media/tx-deepocean/Data/data/主动脉夹层收尾数据/训练数据 ./本地目录	下载另一台主机的文件，需要输入源主机密码

tar xvzf itksnap.tar.gz	解压.tar.gz到当前目录

x 解压

v Display progress in the terminal while creating the archive, also known as “verbose” mode. The v is always optional in these commands, but it’s helpful.

z g__z__ip格式

f 指定文件名--切记，这个参数必须是最后一个参数，后面接路径名

tar -xzvf itksnap.tar.gz __-C /tmp	解压到指定目录__



sudo rm -fr 目录	f强制删除不需确认，r递归删除（删除目录时）

mkdir learngit	创建文件夹

pwd	显示当前目录

ls -ah	显示隐藏文件

rm test.md	删除文件

whereis conda	可以查看软件安装位置

cp -r [源目录] [目标目录]	-r表示递归复制，文件夹里面还有文件夹的情况

dpkg -i --instdir=路径 some.deb

在任意目录下，ctrl+D会为其新建标签显示到文件管理器左边导航栏，效果如下：

<img src="/home/tx-deepocean/.config/Typora/typora-user-images/image-20220705175800824.png" alt="image-20220705175800824" style="zoom: 67%;" />





### 挂载硬盘--8T挂载为1张

sudo fdisk -l	显示所有物理盘 我的机械硬盘是/dev/sda

sudo blkid	找出sda的UUID如下:  /dev/sda: LABEL="space" UUID="427a70ef-4e62-4e63-ac9f-b4486b7f77ae" TYPE="ext4"

sudo gedit /etc/fstab	用记事本打开fstab文件，暂时不会vim

重启，或使用挂载命令

### 挂载硬盘--8T挂载为2张

#### _fdisk分区工具只能支持最大2T分区_。

sudo fdisk -lu	机械硬盘是/dev/sda

sudo fdisk /dev/sda	对sda进行分区

#### _【推荐】parted分区工具支持2T以上磁盘分区_。似乎只能对GPT格式磁盘操作。

sudo parted -l	查看所有盘，机械硬盘是/dev/sda

sudo parted /dev/sda	在机械硬盘上操作

mklabel gpt	格式化分区为gpt

mkpart primary 0% 30%	创建分区，起止点，懂吧

name 1 spaceX	对分区重命名

好像不需要格式化了 sudo mkfs.ext4 /dev/sda1	格式化其中一个分区（要先卸载硬盘）

sudo gedit /etc/fstab	挂载

sudo chmod 777 /home/tx-deepocean/spaceX/	赋予读写权限





这俩命令的使用格式了解了，但没有成功下载过，应该是给的地址有问题...

scp -r [服务器用户名]@[服务器IP]: [服务器上存放文件夹的路径] [本地路径]

公司nas仅支持rsync：

rsync -avzh [服务器用户名]@[服务器IP]:[文件目录] [本地目录]

tx-deepocean@172.30.7.17:/media/tx-deepocean/Data/lzq/code/heart-cta-engine/example/data/vess_edit_inputs_demo

### 分区

机械/dev/sda







# Conda

conda config --set auto_activate_base false

-i https://pypi.tuna.tsinghua.edu.cn/simple

conda create -n py37 python=3.7.5

conda remove -n name --all

conda install pytorch==1.4.0 torchvision==0.5.0 cudatoolkit=10.1  欲使用-i，似乎要改用pip安装



