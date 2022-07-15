> 学习前端之前,先到[廖雪峰老师](https://www.liaoxuefeng.com/wiki/896043488029600)网站学习一下Git

- [Git简介](#git简介)
    - [Git诞生](#git诞生)
    - [集中式vs分布式](#集中式vs分布式)
    - [创建版本库](#创建版本库)
        - [版本回退](#版本回退)
        - [工作区和暂存区](#工作区和暂存区)
        - [管理修改](#管理修改)
        - [撤销修改](#撤销修改)
        - [删除文件](#删除文件)

### Git简介

#### Git诞生

Linux坚定反对使用CVS和SVN,这些集中式的版本控制系统.

> Linus花了两周时间用C写了一个==分布式版本管理系统==,用于Linux系统的源码管理.

原因是Linux社区有人尝试破解BitMover公司免费给社区使用的产品,BitMover公司想收回授权

#### 集中式vs分布式

- 廖雪峰老师定义:

```
集中式和分布式的区别是：
你的本地是否有完整的版本库历史！
假设SVN服务器没了，那你丢掉了所有历史信息，因为你的本地只有当前版本以及部分历史信息。
假设GitHub服务器没了，你不会丢掉任何git历史信息，因为你的本地有完整的版本库信息。你可以把本地的git库重新上传到另外的git服务商。
```

- 自己的思考:

```
大部分情况下,我们不论是使用SVN还是Git,都会联网,都会有一台中央服务器.
但区别是,Git联网和有中央服务器,都是为了方便操作,而不是必须,但SVN是必须的.
代价是Git的内存会越来越大.
如果不联网,SVN和Git都只能在本地操作,但区别是:
Git仍然可以提交(push),因为Git是分布式的,每一个Git用户端都会有一个完整的版本库(本地镜像),在本地也可以提交,但与其它人同步时,仍然需要联网.
SVN不能提交(commit),因为SVN每次提交,都是向中央服务器提交,不能联网,SVN也不会有完整的版本库(本地镜像)
```

- Git内存会越来越大的思考:

```
Git是分布式版本管理系统,分布式意味着每个用户都会有完整的版本库,以前的版本内容会越积越多,必然需要更多空间.
```

#### 创建版本库

##### 版本回退

`git log`查看提交的历史记录

![image-20220711223217416](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711223217416.png)

也可以用`git log --pretty=online`

![image-20220711222239714](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711222239714.png)

- 思考

`9e4336...`是`commit id(版本号)`,为什么不是`1, 2, 3..`这种递增的数字:

```
Git的版本号,是用SHA1计算出来的,用十六进制表示,为什么这样表示呢:
因为Git是分布式的版本控制系统,有多人在一个版本库里工作的需要,避免版本号冲突,就使用了SHA1来计算
```

- 回退演示:

`cat readme.md`查看

![image-20220711223510464](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711223510464.png)

`git reset --hard a3fc`回退:

![image-20220711223705328](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711223705328.png)

查看:

![image-20220711223726436](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711223726436.png)

- 思考 为什么Git回退这么快:

```
因为Git回退时,仅仅只是移动HEAD指针
```

- 恢复:

`git reflog`查看`commit id`

```
a3fc94c (HEAD -> master) HEAD@{0}: reset: moving to a3fc
3bcb16f HEAD@{1}: commit: add test
bab20b4 HEAD@{2}: commit: rm test
797d2ce HEAD@{3}: commit: add test
89662f5 HEAD@{4}: commit: backup
c9ae11e HEAD@{5}: commit: tracks changes of file
b4a0a96 HEAD@{6}: commit: git tracks changes
a3fc94c (HEAD -> master) HEAD@{7}: commit: understand how stage works
edb276f HEAD@{8}: reset: moving to edb27
b6ca1a1 HEAD@{9}: reset: moving to HEAD^
edb276f HEAD@{10}: commit: add s
b6ca1a1 HEAD@{11}: commit: apend GPL
9e1fe3e HEAD@{12}: commit: add distributed and s
9e43369 HEAD@{13}: commit (initial): wrote a readme file
```

`git reset --hard 3bcb`

```
$ git reset --hard 3bcb
HEAD is now at 3bcb16f add test

$ cat readme.md
Git is a distributed version control system.

Git is free software distributed under the GPL.

Git has a mutable index called stage.

Git tracks changes of files.
```

##### 工作区和暂存区

![0](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/0.png)

在本地,Git可以分成`工作区 暂存区 版本库`

- 工作区就是Git控制追踪的目录,也就是我们在电脑上看到的
- 暂存区

```
疑问:为什么要设计暂存区?
因为还是初学,很多概念无法理解,这里借用知乎上几个大佬的解释,初步理解:
add类比购物车
commit类比支付
GUI环境下,在购物车里选要购买的商品很简单,但命令行环境下,就不好操作
同时,也保证了commit的原子性,可以更好的回退和恢复版本

暂存区的设计和Git的索引有关,在进一步学习后了解
```

##### 管理修改

- 重要概念:==Git追踪并管理的是修改,不是文件==

演示:

​ 原文件:

![image-20220711232954706](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711232954706.png)

​ 加一行`change`,`git diff`查看:

![image-20220711233202509](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711233202509.png)

从最后`+change`可以看出,Git记录的是修改

这里我们也可以推出,`commit`时,也只会提交暂存区里存的修改.

- 展示

我们先`git add .`

然后再加一行`change2`

然后`commit`

再`git status`查看状态:

```
$ git add .

$ git commit -m "add change"
[master a4bb962] add change
 1 file changed, 1 insertion(+)

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.md

no changes added to commit (use "git add" and/or "git commit -a")
```

可以看到状态显示,文件还有修改没有提交,因为我们`commit`时,只提交暂存区里存的修改信息

##### 撤销修改

> 在前面的基础上,我们会有一个问题:如果添加了一个错误信息怎么办?

这个时候就需要撤销修改操作了

我们在文件里加一句`菜菜不是宅男`

显然这是违背事实的,我们需要撤销掉

`cat readme.md`

![image-20220711234700878](https://testbase-1312396697.cos.ap-chongqing.myqcloud.com/testbase/image-20220711234700878.png)

这时我们有三种环境:

- 还没有加到暂存区:

我们先`git status`

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   readme.md

no changes added to commit (use "git add" and/or "git commit -a")
```

得到提示`use "git restore <file>..." to discard changes in working directory)`

所以我们直接`git restore readme.md`即可

```
$ git restore readme.md

$ cat readme.md
Git is a distributed version control system.

Git is free software distributed under the GPL.

Git has a mutable index called stage.

Git tracks changes of files.
```

- 已经加到暂存区,但没有`commit`:

先`git status`

```
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   readme.md
```

得到提示, `(use "git restore --staged <file>..." to unstage)`,撤销添加后,在进情况1的操作

```
$ git restore --staged readme.md

$ git restore readme.md

$ cat readme.md
Git is a distributed version control system.

Git is free software distributed under the GPL.

Git has a mutable index called stage.

Git tracks changes of files.
```

- `commit`了

```
如果没有push,还可以回退版本
如果push了,那只能不承认菜菜不是宅男了
```

##### 删除文件

`rm test.txt`,或者在文件管理器里手动删除,效果一样

两种情况:

- 确实要删除

使用`git rm test.txt`

再`git commit -m "remove test.txt"`

```
$ rm test.txt

$ git rm test.txt
rm 'test.txt'

$ git commit -m "removed test.txt"
[master 77fd9a3] removed test.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 test.txt
```

- 删错了,则回到上一个话题 撤销修改:

```
$ git restore --staged test.txt

$ git restore test.txt
```