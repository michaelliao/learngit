# 1. git 介绍
git 是一个分布式版本管理系统，每个人的本地主机都有**完整的项目**以及**完整的历史版本**，存储在本地电脑上。如果要多人协作，就要把自己的修改push到别人的主机上，这样别人收到修改也会去修改他们自己电脑上的本地版本库。<br>
git 虽然是分布式，但是**为了方便多人协作**，依然需要一个中央服务器，不然你就要每次都 push 到每个人电脑上太麻烦了。

# 2. 创建版本库和提交新文件
1. 第一步 git init，在这个文件夹里创建一个版本库(repository)，就是那个隐藏的 .git 文件夹。以后 git 就会记录 git init 的目录（也就是工作区）的各种文件修改操作。（注：git 内，输入命令后，无消息出现，就是好消息，说明没有错误）
2. 第二步 commit，commit 操作是对本地提交修改，本地的会记录这个改动。不过 commit 本身也分为两步，git add 和 git commit，git commit 会把之前 git add 加上的文件全部提交。你可以多次 git add，然后在你觉得合适的时候一并提交。
```
$ git add 1.txt

// 可以一次添加多个文件，用空格分开
$ git add 2.txt 3.txt

// 把之前 add 过的文件提交到版本库，必须写提交信息，不然会报错。也有可以不提交的参数，但是不推荐。
$ git commit -m "我新添加了 1.txt 2.txt 3.txt 三个文本"
```
# 3. 本地版本管理
## 3.1 查看修改和提交修改
1. 假设版本库文件夹中某个文件被修改了，使用 git status 查看可以知道有哪些被修改了。git status 此外还可以查看很多信息，比如如果文件夹中有新文件被加进来，但是没有被 add 并 commit，git status 也会提示哪些文件是 untracked 的。如果有被 add 但是没有被 commit 的也会提示。
2. 假设上一步，用 git status 发现 readme.md 被修改了，用 git diff readme.md 查看修改了什么（diff 查看的是还未被 git add 前的差别，add 了后再用 git diff 就没法显示差别了。关于 diff 命令具体的细节在后面暂存区部分讲）。（注：diff 以行为单位标记修改，如果你某一行加了 3 个字，它不会标记为你加了 3 个字，**而是标记为你删除了这一行，并在同样的地方添加了一个新的行**，新的行比旧的行改了 3 个字）
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0d23302727a4c24a9981a11adb70b95~tplv-k3u1fbpfcp-watermark.image)

3. 如果你只是修改原文件，然后查看 diff，会发现怎么每次都是和刚创建的时候的版本相比啊。那自然是因为你中间没有提交新版本了。提交已跟踪文件的修改和提交新文件是一样的操作。先 add 后 commit。
```
$ git add readme.md
$ git commit -m "我给 readme.md 后面加了一行字"
```
## 3.2 版本回退
### 3.2.1 查看版本历史日志
每次当我们 commit 的时候，git 都会保存一个快照。<br>
我们可以用 git log 来查看 commit 历史（这时候你就发现每次 commit 要写的信息的作用了）。
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f28494a8403b4fe7a75c0ba26f535a7d~tplv-k3u1fbpfcp-watermark.image)<br><br>
可以加一个 --pretty=oneline 参数，更加简短。<br>
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1880f65b191e417a82ca4b4d2f7a5f71~tplv-k3u1fbpfcp-watermark.image)<br><br>
还可以用可视化工具查看（比如 vscode 的 git graph）。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad527b8f7e1f4bf383c33241e5490d4b~tplv-k3u1fbpfcp-watermark.image)<br><br>
### 3.3.2 回退操作
在 git 中，当前版本用 HEAD 表示<br>
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c582db14fb348b292de7bf7d2befad3~tplv-k3u1fbpfcp-watermark.image)<br><br>
上一个版本就是 HEAD^, 上上个版本就是 HEAD^^，如果是前100个版本，可以用简写HEAD~100。
实际命令为 `git reset --hard` 后接想回退的版本，如：
```
$ git reset --hard HEAD^^
```

回退后，回退的版本便成为最新版本，那么如果后悔了，又想回退到之前的版本怎么办？
可以用 commit id 来回到回退之前的版本。命令还是一样，只是 HEAD^^ 要换成 commit id（就是截图里每个commit 前那个黄色的长长的16进制数字）。<br>
如果你的 cmd 或是什么东西还没关，之前刚好 git log 过了可以直接找到，就直接用，不用把版本号全部打出来，只用打出前几个字符，确保是唯一的前几个字符即可
```
$ git reset --hard 7df7335
```
如果找不到，或者电脑早重启了，可能都几天后了，可以用 `git reflog` 看到之前的记录。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee1b5f0c4284e8e8019942e4b7065bf~tplv-k3u1fbpfcp-watermark.image)<br>

当然，reflog 用的是本地记录，别人用不了。如果要别人也能回退再后悔，可以在一开始回退的阶段就不用 git reset 而是 git revert。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd9ac88d5d1b49419b6253bf715cf016~tplv-k3u1fbpfcp-watermark.image)<br>

## 3.3 工作区和暂存区
1. 工作区概念很简单，就是 git init 的目录。git 操作都在这里进行。
2. 版本库为那个 .git 隐藏文件夹，位置在工作区目录下。
3. 版本库里包含很多东西，其中一个就是暂存区（stage），还有 git 自动创建的分支 master，以及指向这个 master 的 HEAD 指针。
4. 当你用 git add 后，文件就被加入暂存区，不加参数的 git diff 此时已经无法显示区别了，要加 --cached 或者 --staged 才能查看工作区与暂存区的差异
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30f1f0eab0df4169b34882cb579588b7~tplv-k3u1fbpfcp-watermark.image)<br>

<span>&nbsp;</span> 5. git diff 只能查看加入暂存区前的变化，加入暂存区后要加别的参数（见下图）。以及，不管加不加 --cached 参数，diff 的另外一边都是最后一次 commit 的文件版本。（当然可以通过别的参数可以改这一边，暂且不提）

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/040849596178402b8ed80bd9aa58ed47~tplv-k3u1fbpfcp-watermark.image)<br>

<span>&nbsp;</span> 6. 因此，如果你修改了一个文件，git add 后不 commit ，而是再次修改文件，再 commit。这时候分支上只会有第一次更改的结果。你只有再次 git add 这个文件 再 commit 才行。<br>
（**注：这一条被作为 git 跟踪管理的是修改而不是文件的解释，我是不懂为什么这样就解释了。弄懂暂存区概念后，这个特性应该是可以直接推理出来的**）
## 3.4 撤销修改
### 3.4.1 旧版本
#### 3.4.1.1 git checkout -- <file\> 撤销工作区的修改（旧版本）
通过 `git checkout -- <file>`命令可以撤销工作区的修改，回到上一次 git add 或者 git commit 的状态（哪个近回到哪个）。也就是说只撤回到你执行任何和版本提交相关的命令前，其实只是相当于帮你省去多次按 ctrl-z 的步骤（而且还只能撤回到具体的某一点）。
（注： `--` 不能省，不然就是和分支相关的操作了）
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72a52d01c37f41ec9713539e6b656aca~tplv-k3u1fbpfcp-watermark.image)<br>
#### 3.4.2.2 撤销 git add 的修改（旧版本）
首先用版本回退的命令 git reset --hard HEAD <file\> ，回退到 HEAD 也就是 commit 的最新版本。不过之前没有提到的就是 git reset --hard 回退的时候也会把暂存区一并清空。
但是这并没有结束，因为此时只是把暂存区清空罢了，工作区的修改还存在着，因此还要继续用 git checkout -- <file\> 来撤销工作区的修改。（注：这次 checkout 撤销的修改并不是上次 git add 的时候，见下图）
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bbbf1747b9b476d9c33fa99696f359c~tplv-k3u1fbpfcp-watermark.image)<br>
```
$ git reset HEAD <file> // 先清空暂存区
$ git checkout -- <file> // 再撤销工作区改动
```
### 3.4.2 新版本
新版本中 git 用 restore 取代了 reset + checkout 这种方式。你可以在 git status 里看到提示都改成了 git restore。当然 git reset 还可以继续用于版本回退。<br>
效果都是一样的，只是命令变了。
#### 3.4.2.1 撤销工作区的修改（新版本）
直接使用 `git restore <file>` 无需加 `--`。
#### 3.4.2.2 撤销 git add 的修改（新版本）
用 `git restore --staged <file>` 代替 `git reset HEAD <file>`，git reset 就专注于版本回退就行了。<br>
因为效果没变，仍然需要两次行动。<br>
```
$ git restore --staged <file> // 清空暂存区
$ git restore <file> // 撤销工作区改动
```
可以看到两次都使用 restore ，只是加不加 --staged 参数的区别。加了就是清空暂存区，不加就是撤销工作区。

### 3.4.3 撤销 git commit 的修改
直接 git reset 版本回退
### 3.4.4 撤销 git push 的修改
改不了

## 3.5 删除文件
1. 首先手动删除文件后，git status 可以看到更改。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b49e52c85614462bd03c0022bc20938~tplv-k3u1fbpfcp-watermark.image)<br><br>
<span>&nbsp;</span> 2. 其实看上图的提示就能很好的理解，说的很清楚了。用 git add 或 git rm 可以确认删除文件。再用 git commit 把删除提交到版本库。<br><br>
<span>&nbsp;</span> 3. 用 `git restore` （或者旧版本 `git checkout --`）可以撤销这次删除。如果已经 git add 或者 git rm 了，和撤销更改一样，用 `git restore --staged <file>` 再接 `git restore <file>`完成。<br><br>
（**注：我认为这个特性才是表示 git 操作的是修改而不是文件的最好解释。**）

# 4. 远程仓库
也就是第一步说的中央服务器。方便多人协作使用。<br>
可以自己搭个服务器，24小时运行。也可以用 github 来管理远程仓库。<br>
github 和电脑账户的连接就不多细讲了，网上一大把。
1. 先在本地电脑用户目录里找到 .ssh 目录，再找到 ssh 公钥，复制后粘贴到 github 账户的对应设置下即可。
2. 之前没有生成过 ssh key，生成命令也很简单。就一行，网上一搜就有。

## 4.1 版本库连接
1. 在 github 上新建一个 repo。没什么好说的。
2. 在该 repo 的 github 页面上找到 ssh 链接。再在 git 上用 `git remote add origin <刚找到的链接>`。（当然要在正确的目录下）（下图前面的大部分命令我们已经用过了所以现在不用再输入，branch 之后再讲）
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4fb3f74c95742b593f7a9cf37366e77~tplv-k3u1fbpfcp-watermark.image)
<span>&nbsp;</span> <span>&nbsp;</span> <span>&nbsp;</span> <span>&nbsp;</span> 强行解释下这个命令，在 `git` 上给远程库(`remote`) 加上 (`add`) 叫做 `origin` 的远程库，链接为 `git:github.com:yourName/repoName.git`。
（注: origin 虽然可以随意改成别的，但最好就叫 origin，以后一看到 origin 就知道是远程库的名字）<br><br>
<span>&nbsp;</span> 3. 把本地版本库的更改提交到 github 上。
```
git push -u origin master
```
（注：现在 git 和 github 的默认主分支都是 main 了，我上午刚写这篇文章的时候还用的之前没升级版本的 git 2.27 版，写到这才发现更新到 2.30 后可以选择 main 作为默认名了，与 github 对齐更方便。这也算是对 blm 的小小支持）<br>
把本地版本库推送到远程仓库用 git push。第一次时加上 -u 表示不仅把本地的 master 分支推送到 origin 的 master 分支，还要关联这两个 master 分支，这样可以简化之后的操作。<br>
第一次连接时会报错需要你输入 yes 确定 github 服务器的 ssh key 是否可信。

## 4.2 远程仓库克隆
```
git clone <链接>
```
git clone 会在当前目录创建一个以 repo 名字为名的文件夹，所以不用事先新建一个空文件夹。
克隆不只是文件，版本库也一并克隆，你可以在克隆后的文件夹里找到 .git 文件夹，完全就可以工作了。（当然， github 要把这个人的 ssh 公钥加入，这个人才能 push）

# 5. 分支管理
## 5.1 分支介绍
分支是分布式管理系统的重要特点之一（git 官方文档说是最重要的特点），之前可以看到，git 的版本管理是从一个节点到另一个节点。如果没有创建分支，默认就会在 main 主分支上。实际上在之前版本管理时提到的 HEAD 指针，指的其实并不是版本节点，而是分支指针上，分支指针再指着节点上。如下图：<br>
（注：分支其实就是一种指针）<br>
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6f97e7a38ba47238a62ee803fa3c4be~tplv-k3u1fbpfcp-watermark.image)<br>
如上图，main 指着最新 commit 的节点，而 HEAD 指针指着的则是 main 指针。<br>

## 5.2 创建，切换，合并分支
### 5.2.1 （旧版本）可以用 `git checkout -b <新分支名>` 创建分支，这样的好处是创建完可以直接指向这个分支（见下图）。<br>
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adf38486abc5481f890abf674d16a231~tplv-k3u1fbpfcp-watermark.image)<br><br>
### 5.2.2 也可以用 `git branch <新分支名>` 创建分支，但位置仍在目前分支上（见下图）。<br>
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe730b9c4ab465eb828dfda2d9dd114~tplv-k3u1fbpfcp-watermark.image)<br><br>
### 5.2.3 创建完后可以用 `git branch` 查看所有分支的情况。<br>
### 5.2.4 （旧版本）可以用 `git checkout <分支名>` 切换分支。
比如在刚刚建立并切换到了 testing 这个分支后，修改一次文件并 commit，这个时候分支就会是这样子：<br>
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3db1a4b4a65543ca9abc1cc412ae9fae~tplv-k3u1fbpfcp-watermark.image)<br><br>
### 5.2.5（新版本）刚提到的两个用 git checkout 的命令都可以用 git switch 等价替换。
```
git checkout 变成 git switch
git checkout -b 变成 git switch -c
```
（注：git checkout 由于在之前的版本承载了过多的功能，为了不让新手迷惑，正逐渐退出历史舞台）
### 5.2.6 延续 5.2.4 之后，如果此时切换分支到 main 上，会发现之前的修改不见了。这是自然的，因为修改在新分支上。
### 5.2.7 合并分支。
```
$ git merge <想合并到现在分支的分支名>
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e39e152c0da442a9023614cd8819ba1~tplv-k3u1fbpfcp-watermark.image)<br>
以上显示的是 fast-forward，也就是把 main 指向了 testing。其他合并方式在后面讲<br>
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c157936dd84c45f4901fb0f6b3700f73~tplv-k3u1fbpfcp-watermark.image)<br>
现在在 git graph 上的显示方式是这样的（origin那个是远程库）<br>
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15552581ecc4eedbefa7043aca48b7f~tplv-k3u1fbpfcp-watermark.image)<br>

## 5.3 合并冲突
如果每次都能 fast-forward 那自然最好，不过当然不可能，稍微想一下就能想到许多冲突。
### 5.3.1 合并两边都修改了的文件
比如书创建一个 feature1 分支，修改一次，然后切换回 main 分支在同一个文件上修改，再合并。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e57037e6a2d24a16be246b2b6959246d~tplv-k3u1fbpfcp-watermark.image)<br>
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c677785c0a9493f9c6551510d323309~tplv-k3u1fbpfcp-watermark.image)<br>
这时候再把 main 和 feature1 合并就会有提示冲突无法合并。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/542a0cb4ec6b493a8f05219027ffd7a9~tplv-k3u1fbpfcp-watermark.image)<br><br>
此时查看 readme.md（单纯查看即可） 便会有提示告诉你这个文件在不同branch下的区别。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e1c1dd27d6d413a949033554d06501f~tplv-k3u1fbpfcp-watermark.image)<br>
而且此时 git 显示状态为 merging，此时你只能专注于解决冲突，其他会影响到解决冲突的命令都无法使用。<br>
此时解决冲突的方法也很简单，在将要合并的两个版本之间选择你想要版本。然后 add 并 commit 这个版本。<br>
（注：如果你想要合并后的 feature1 的版本，就把 main 上的文件**手动**改成 feature1 的版本。如果想保留 main 的版本，就直接 add 并 commit。merging 操作会被当做一种工作区的改变，如果你在 git merge 发生冲突后使用 git status 查看，会发现红色提示）<br>
### 5.3.2 不同的选择的结果
①下图为在 main 上执行合并操作，冲突后选择改成 feature1 的版本。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30508315604643c2be2bfd6c679dcb84~tplv-k3u1fbpfcp-watermark.image)<br>
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c17b9267ddff499594fd9563763a6dcd~tplv-k3u1fbpfcp-watermark.image)<br><br>
② 下图为在 main 上执行合并操作，冲突后保留 main 的版本。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7757c572da1e4544b98c697fd8f9dcee~tplv-k3u1fbpfcp-watermark.image)
可以发现分支的样子和之前并没有区别，这是自然的，因为都是在 main 上执行和 feature1 的合并操作，只是保留的内容不一样罢了。merge 操作只对当前所在分支有影响，在本例中就是只对 main 有影响，feature1 该咋样咋样<br>
不过如果你此时查看文件，会发现它仍然会提示你两分支的文件之间的区别。（这里给出原生 git 和插件的显示方式）<br>
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/284d6cb1bbe24fde8524c2f034e4ac33~tplv-k3u1fbpfcp-watermark.image)<br>
你可以保留这个分支，也可以删除，删了后只有一个版本自然就不会有这提示了。<br><br>
③ 如果是在 feature1 分支上执行合并（不过最好还是把 main 当做主分支），结果如下（就不分两种情况了）。<br>
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42939009176245bbad2e2fd7ddcfc2b6~tplv-k3u1fbpfcp-watermark.image)<br>
可以发现，插件现在把 feature1 当做主线分支了。这很合理，因为 main 分支也只是普通分支，只是用作默认主分支罢了。<br>
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7765974b66440aa88ba44843014e0f4~tplv-k3u1fbpfcp-watermark.image)
## 5.3.3 删除分支
合并后，如果不想要 feature1 分支了（比如工作已经完成了），可以使用 `git branch -d <feature1>` 删除分支。
## 5.3.4 不用插件查看分支图
git 自带查看分支图的命令，`git log --graph`。

## 5.4 分支管理
### 5.4.1 非 fast-forward 合并
1. 先建立一个无冲突的分支 dev<br>![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd8e578f2b1e4e368f59501374efd2c7~tplv-k3u1fbpfcp-watermark.image)<br>
2. 再在 main 分支上执行 merge 操作，但是这次加上 `--no-ff` 参数
```
$ git merge --no-ff dev
```
- 如果是不加参数的 merge，此时结果你应该可以想到。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c157936dd84c45f4901fb0f6b3700f73~tplv-k3u1fbpfcp-watermark.image)<br>
- 如果加上 `--no-ff` 参数，结果是下面这样：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e003f76e9074ac8a986cc227bfd30a3~tplv-k3u1fbpfcp-watermark.image)<br>
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/248343a9dd8949ecb0c2c6bdff57e9dd~tplv-k3u1fbpfcp-watermark.image)<br>
dev 指针不会指向最新节点了，而是专门有个分支节点。<br>
**上面这样做是比较好的**，因为可以很明显看出这里有过分支（上图可以看出，插件里显示别的颜色），如果用 fast-ward（即不加参数），插件里两个分支都是最左边的蓝色线，很难分辨，见下图。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d6d10e56bed4a91834f6e543ab31097~tplv-k3u1fbpfcp-watermark.image)<br><br>
<span>&nbsp;</span> <span>&nbsp;</span> 3. 此外如果是 ff 模式，删除分支后，dev 分支信息就会消失，因为和 main 共用节点。如果是非 ff 模式的话，dev 信息仍然保留在分支节点上，只是分支指针没了。（见下图）<br>
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f51185c0373a461aae242daea0147ed3~tplv-k3u1fbpfcp-watermark.image) ==> ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e0b06ced18542c68882d9551be0379e~tplv-k3u1fbpfcp-watermark.image)
### 5.4.2 分支策略
一般团队的分支使用方法是像下图这样：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fae577b22bf249d6b50971b0998df1dc~tplv-k3u1fbpfcp-watermark.image)<br><br>
1. 一般 main 分支只用来发布版本，不会在上面进行开发。
2. dev 分支才是开发的总分支。
3. 团队成员在各自的分支开发后，合并到 dev 分支上（在 dev 上执行合并操作）。
4. 决定发布版本的时候，将 dev 合并到 main 分支上（在 main 上执行合并操作）。


## 5.5 bug分支
1. 假如我在公司工作，正在写一个功能，这个功能要写两天，我已经写了一天，完成了10%的功能，有些文件在暂存区，有些文件在工作区。这时候突然要改一个 bug，这个 bug 很简单，但是马上就要交。这时候如果你创建新的分支后直接工作，你会发现如果你提交 bug 的时候会把暂存区的你还没写完的文件提交了。或者这个 bug 正好是在你现在工作区中的一个文件中，你工作区这个文件更不可能提交了。<br>
2. 此时用 `git stash` 可把目前工作区和暂存区的工作暂时隐藏起来。<br>
3. 使用后，工作区和暂存区的改动会被撤销，并被保存起来。此时由于被隐藏了，`git status`会显示没有工作。<br>
4. 这个时候可以改 bug 了，比如说 bug 出在 main 分支上，于是在 main 上创建出一个分支，改完 bug，和 main 合并。（见下图）<br>![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e6e9ff64eae4b76ab2bcbfa6f9064c3~tplv-k3u1fbpfcp-watermark.image)
5. 这个时候再返回我们之前的工作。
6. 输入 `git stash list` 可以查看所有的被 stash 的工作。
    - 可以用 `git stash apply <stash@{数字}>` 返回对应的 stash 上，并且保留在 stash list 上
    - 也可用 `git stash pop <stash@{数字}>` 返回对应的 stash 上，但是一并从 stash list 上剔除

## 5.6 cherry-pick
1. cherry-pick 和 merge 很像，但是 cherry-pick 不会合并分支，只是把改动的**复制**过去。<br>pick 前：![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf97eb4f72d498faf08f3acbdf35a7e~tplv-k3u1fbpfcp-watermark.image)<br><br>pick 后：![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecdc8655ada24540ae6e2b76c60b7735~tplv-k3u1fbpfcp-watermark.image)
2. 上面用的命令是 `git cherry-pick dev`，像这样直接用分支名，pick 的就是该分支最新的 commit 节点。**实际上 cherry-pick 的操作单元是 commit 而不是 branch**。最原始的用法应该是 `git cherry-pick <commit>` 比如 `git cherry-pick ce7de`。直接用分支名是一种简写，并不是说 pick 了这个分支。
3. cherry-pick 有时候会造成不好的影响，<a href="https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215">有人批判过</a>。所以最好在非得用的时候再用，比如说你在 main 分支上改了一个 bug，然后 dev 上这个 bug 还在，你不可能在 dev 上用 merge 因为这样 dev 就变成主分支了，那你要不就复制粘贴，要不就在 dev 上 cherry-pick main 修复后的节点（如果 pick 刚修复完的节点会报错，提示你加 -m 参数，因为这个节点有两个来源，git 不知道是哪边来的改动，具体 google 一下就知道）。你也可以 pick bug节点，反正只是复制。

## 5.7 删除未合并的分支
当实际开发的时候，一般是不同功能用不同分支，比如：
```
$ git switch -c feature1
// 等开发完毕后
$ git add feature1.js
$ git commit -m "feature1 开发"
```
开发完了应该要合并到 dev 分支里了，但是此时突然接到命令这功能不要了，只能删除。<br>
那只好删除了
```
$ git branch -d feature1
```
但是会友好提示不能用 -d 删除，因为 feature1 还没有被合并，删除了就会丢失信息。只能用 -D 删除。
```
$ git branch -D feature1
```
删除完毕

## 5.8 多人协作
### 5.8.1 远程仓库基本操作
1. `git remote -v` 查看远程仓库详细信息，fetch 和 push 的权限，没有看到 push 说明没有权限。
2. `git push origin main` 把 main 分支推送到远程库中的 main 分支，让它们同步。
3. `git push origin dev` 把 dev 分支推送到远程库中的 dev 分支，让它们同步。
一般来说，main 和 dev 是要时刻和远程库同步的。其他分支视情况可推送可不推送。
### 5.8.2 多人协作
当你从远程库克隆一个版本库下来开发，只有 main 分支会被克隆下来。<br>
然后你得手动把远程仓库的 dev 分支创建到本地，用：
```
$ git switch -c dev origin/dev
```
然后你再 dev 分支上修改了文件，然后想着 push 到远程库上。但是发现已经有其他人修改了远程库的对应文件，你的本地的 dev 的版本和远程库的 dev 的版本不一致。<br>
按照提示，我们用 git pull 拉取最新更改。<br>
1. 有时候会有提示 no tracking infoamation，这是因为本地库分支和远程库分支没有链接上，用`git branch --set-upstream-to=origin/dev dev` 来链接。
2. 有时候 pull 会冲突，和其他冲突解决方法一样，git 会显示为 merging 中。

## 5.9 rebase（变基）
让分叉的提交历史变成直线。缺点是会把本地分叉 commit 修改的内容改变，尽管最后提交的内容是一样的。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42b039196727482ab37b6b7c50eff4e7~tplv-k3u1fbpfcp-watermark.image)<br>
变成<br>
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a7996b8494a4fa1b650050d5f19e4a3~tplv-k3u1fbpfcp-watermark.image)<br>
可以看到，本地提交的 "add author" 和 "add comment" 的修改内容本来是基于 "init hello"的，现在则是基于 "set exit=1"。

# 6 标签
git 里标签也是一个指针指向某个 commit，和分支类似，只是标签不能移动。建立好标签后就相当于一个快照，随时都可以前往这个版本<br>
标签的作用是可以取个好记的名字，而不像 commit id 太复杂。<br>
## 6.1 本地操作
1. 使用 `git tag <tagname>` 在当前分支的最新 commit 上打一个叫做 <tagname\> 的标签。如果不想打在最新 commit 上，则后接 commit id，`git tag <tagname> <commit id>`。<br>
2. 使用 `git tag` 查看所有 tag。（标签是按照字母排序的）<br>
3. 使用 `git show <tagname>` 查看某个 tag 的详细信息。<br>
4. 创建标签的时候可以加上说明，使用 `git tag -a <tagname> -m "我是一个tag" <commit id>`，注意此时为了区分要对 <tagname\> 前面加上 -a 参数，说明文字前则是 -m 参数。<br>
5. git show 可以看到说明文字。
6. `git tag -d <tagname>` 删除本地标签
## 6.2 远程操作
1. git push <branch\> 的时候并不会把标签上传到远程库，需要专门提交。命令和提交分支一样，`git push origin <tagname>`，可以提交这一个 tag。
2. 如果想提交本地所有的 tags，使用 `git push origin --tags`。
3. 如果想删除某个已经推送到远程库上的 tag，有两种方式:
    1. 第一种格式比较复杂：<br>`git push origin :refs/tags/<tagname>`<br>其实本意是将冒号前面的值推送到后面的值，但是冒号前没有值，因此为删除。
    2. 第二种比较直观：<br>`git push origin --delete <tagname>`
# 7. github 和 gitee 使用
网站没什么好讲的，如果在已经关联了 github 的情况下要关联 gitee 的话（或者反过来）：
1. 可以删除本地关联的 github：`git remote rm origin`，再添加 gitee 的远程库。
2. 也可以都要，但是因为远程库不能重名，因此要想好名字。如果 github 叫 origin 的话，gitee就不能再叫 origin 了。可以这样：
```
// 删除本来关联的 github
$ git remote rm origin

// 重新加上 github，这次取名叫 github
$ git remote add github git@github.com:balabala/balabala.git

// 加上 gitee，取名叫 github
$ git remote add gitee git@gitee.com:balabala/balabala.git
```
# 8. 自定义
## 8.1 改变 git 颜色
git 默认会给不同命令不同颜色的，如果因为某种神秘的诉求，你想关闭也可以关闭
```
$ git config --global color.ui false
```
一般默认就行

## 8.2 忽略特殊文件
1. 如果有些文件你只想放在 git 目录，但是不想提交。又不想每次打开 git 都看到 untrack file 的提示。可以用 .gitignore 文件来声明，把要忽略的文件名写上即可忽略，`*.xx` 可以用来通配 `xx` 后缀的文件。
2. 被忽略的文件用 git add 加的时候会报错，需要用 -f 参数强制加入 `git add -f <filename>`。
3. 也可以在 .gitignore 中声明不排除的项，比如说你有一个条件是 `.*` 会排除所有 .开头的文件即隐藏文件，但是同时 .gitignore 也被排除了，你可以在 .gitignore 后面加上 `!.gitignore` ，`!` 表示不排除这一项。
- 配置文件有各种模板，所有模板在<a href="https://github.com/github/gitignore">这里</a>可以找到
- 这里要记得东西比较多，忘了还是去看看廖雪峰的<a href="https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208">教程</a>。

## 8.3 别名
### 8.3.1 基础用法
别名是一些复杂的命令简写，用户自己指定。如：<br>
```
$ git config --global alias.st status
```
- 即用 `st` 代替 `status`，这样就可以用 `git st` 代替 `git status` 了。<br>
- `--global` 是全局参数，这样就不只是当前仓库能用了。<br>
### 8.3.1 简写带参数的命令
把要简写的命令**用字符串包裹**起来，就可以简写带有参数的命令了，如：
```
$ git config --global alias.lg = "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
这样 lg 就代表了 log 后面加这么多参数
### 8.3.2 配置文件
也可以到 `.git` 文件夹中找到叫做 `config` 的文件打开。里面可以看到各种配置，包括 alias 的，可以在这里手动添加或者删除别名。<br>
（注：如果用的是 --global，那么仓库目录里是找不到刚才设置的别名的，而是在 `c:\users\oyishyi` 用户目录里的 `.gitconfig` 文件里，这个文件就是用户的全局配置）

# 9. 搭建 git 服务器
要用的时候再说，可以先看看<a href="https://www.liaoxuefeng.com/wiki/896043488029600/899998870925664">这个</a>。