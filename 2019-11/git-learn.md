# git记录

1. 安装完git,首先设置git名字、邮箱。

   > $ git config --global user.name "Your Name"
   > $ git config --global user.email [email@example.com](mailto:email@example.com)

2. 添加文件到Git仓库，分两步

   > 使用命令git add <file>，注意，可反复多次使用，添加多个文件  
   > 使用命令git commit -m <message>，完成

3. 要随时掌握工作区的状态，使用git status命令。

4. 如果git status告诉你有文件被修改过，用git diff可以查看修改内容。

5. 版本回退

   > 比如最开始版本是A, 使用了git add + commit  
   > 你改了下A文件， 使用了git add + commit  
   > 又改了下A文件，使用了git add + commit  
   >
   > 现在共有三个版本A ，B， C   
   > 现在在C中怎么回到A呢？  
   > 输入git log ==》 三个版本（commit ID） 由近到远  
   > 想回到B： git reset --hard （commit Id B）即可返回  
   > 此刻git log 查看，只有A 和 B 的记录了,  
   > 想回到C只有在git窗口未关闭把之前的A的commit ID A, 再使用git reset --hard commit id A
   >
   > 关了电脑睡了一觉起来，还是想回到A版本 ,此时还能找到A对应的commit id嘛
   > git reflog用来记录你的每一次命令，  
   > 可以看到记录  head A  => head B，此时可以拿到A的前几位commit id
   > 就可以拿来使用git reset --hard 了
   >
   > ### 总结
   >
   > - `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
   > - 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
   > - 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

6. 工作区和暂存区

   > 工作区：init的文件夹，除了.git文件。  
   >
   > .git文件 存了很多东西，最重要的就是stage的暂存区,  
   > 还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`  
   >
   > 

7. Git是追踪修改的，  

   > 每次修改，如果不用git add到暂存区，那就不会加入到commit中。

8. 撤销操作

   > ```
   > $ git checkout -- readme.txt
   > ```
   >
   > 命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：
   >
   > 一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
   >
   > 一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态
   >
   > ### 总结
   >
   > 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。
   >
   > 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。
   >
   > 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)一节，不过前提是没有推送到远程库。
   >
   >

9. 远程仓库

   > - github
   > - gitlabe

   > #### github
   >
   > github注册一个账号就可以使用免费的远程仓库了。这样所有人都去仓库克隆各自提交,也从服务器中各自拉取
   >
   > - 注册github账号
   > - 由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以创建ssh key
   >   $ ssh-keygen -t rsa -C "youremail@example.com" 一路回车根据文件夹找到id_rsa,
   >   打开后复制ssh key在github中添加
   > - 第一次使用git clone会得到一个警告,因为ssh在验证github服务器的key时需要你确认github的指纹信息是否真的来自github服务器
   > - 要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。
   >   Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快

10. 分支管理
