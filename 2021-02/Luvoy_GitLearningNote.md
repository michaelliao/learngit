# **Git学习笔记**

*作者：Luvoy，鸣谢：廖雪峰*

# 写在前面

本笔记参考了[廖雪峰老师的Git教程](http://t.cn/zQ6LFwE)

学习东西时如果只追求速度，那么很容易学了就忘，必须时常复习。

> 子曰：温故而知新，可以为师矣。

然而复习时光看是不行的，容易眼高手低，遂整理问题和答案，并且用跳跃查看以起到遮掩的目的。

其他链接:

[我的Github主页](https://github.com/Luvoy)

[国外网友制作的Git Cheat Sheet](https://gitee.com/liaoxuefeng/learn-java/raw/master/teach/git-cheatsheet.pdf)

[Git的官方网站](https://git-scm.com/)

# 复习问题

## **开始**

1.  <span id="question_1"></span>简述Git诞生过程？谁因为什么用什么发明的？[查看答案](#answer_1) 
2.  <span id="question_2"></span>集中式和分布式版本控制系统有什么区别呢？ [查看答案](#answer_2)
3.  <span id="question_3"></span>安装完成git后需要设置什么？global参数有什么作用？[查看答案](#answer_3)
 
## **创建版本库**

4.  <span id="question_4"></span>什么是版本库？如何初始化版本库？如何添加文件？[查看答案](#answer_4)
5.  <span id="question_5"></span>如何查看仓库的状态？如何查看文件具体修改了什么内容？[查看答案](#answer_5)
6.  <span id="question_6"></span>如何看到git的日志信息？如何只输出commit id和commit的信息？commit id是用什么计算出来的？[查看答案](#answer_6)

## **版本回退**

7.  <span id="question_7"></span>Git中用什么表示当前版本？上一个版本？往前n个版本？[查看答案](#answer_7)
8.  <span id="question_8"></span>如何把当前版本回退到上一个版本？--hard参数有什么意义？回退的原理是什么？[查看答案](#answer_8)
9.  <span id="question_9"></span>忘记commit id和版本如何回退？未commit但是有修改的其他文件会不会被回退？[查看答案](#answer_9)
10. <span id="question_10"></span>什么是工作区？什么是版本库？add和commit在这些区域上执行了什么操作？[查看答案](#answer_10)
11. <span id="question_11"></span>某文件经历了：修改1->add->修改2->commit，提交的是哪次修改？为什么？[查看答案](#answer_11)
12. <span id="question_12"></span>什么命令可以撤销上一次修改？（让这个文件回到最近一次git commit或git add时的状态？）[查看答案](#answer_12)
13. <span id="question_13"></span>如何删除文件？错删文件怎么办？[查看答案](#answer_13)

## **远程仓库**

14. <span id="question_14"></span>如何创建并在github上添加SSH KEY？[查看答案](#answer_14)
15. <span id="question_15"></span>如何在github上创建远程仓库，并将本地库推送到远程？[查看答案](#answer_15)
16. <span id="question_16"></span>如何将远程仓库克隆到本地?[查看答案](#answer_16)
    
## **分支管理**

17. <span id="question_17"></span>分支有什么用?如何创建分支?如何查看当前分支?如何合并分支?如何删除分支?[查看答案](#answer_17)
18. <span id="question_18"></span>主分支可以看到其他分支的修改和提交吗?[查看答案](#answer_18)
19. <span id="question_19"></span>在某一分支A上修改文件并提交, 然后切换到另一分支B上修改提交, 然后将A合并到B上, 会发生什么? 如何解决?[查看答案](#answer_19)
20. <span id="question_20"></span>用什么命令可以直观地查看分支的合并情况?[查看答案](#answer_20)
21. <span id="question_21"></span>通常情况下合并分支Git会使用Fsat forward模式, 这种模式有什么特点? 如何不使用这种模式?[查看答案](#answer_21)
22. <span id="question_22"></span>实际开发中应该怎样进行分支管理比较好?[查看答案](#answer_22)
23. <span id="question_23"></span>突然需要创建新分支, 但是当前分支上的工作暂时无法提交怎么办?[查看答案](#answer_23)
24. <span id="question_24"></span>在master分支上修复的bug，想要合并到当前dev分支, 而不是再修复一遍, 有什么方法吗?[查看答案](#answer_24)
25. <span id="question_25"></span>还没有合并的分支如何删除? 这用于什么场景?[查看答案](#answer_25)

## **远程与协作**

26. <span id="question_26"></span>如何查看远程仓库信息?[查看答案](#answer_26)
27. <span id="question_27"></span>远程origin下只有一个master分支, 如何创建一个新分支?[查看答案](#answer_27)
28. <span id="question_28"></span>如果一个用户A在他的设备上向origin下的dev分支提交并推送了东西, 然后B也想向dev推送,应该怎么做?[查看答案](#answer_28)
29. <span id="question_29"></span>rebase操作有什么用?[查看答案](#answer_29)
30. <span id="question_30"></span>如何删除远程分支?[查看答案](#answer_30)

## **标签管理**

 
31. <span id="question_30"></span>如何打标签? 有什么用? [查看答案](#answer_30)
32. <span id="question_31"></span>如何把标签推送到远程?[查看答案](#answer_31)

## **使用github**

    
33. <span id="question_32"></span>如何参与一个开源项目?[查看答案](#answer_32)
34. <span id="question_33"></span>[查看答案](#answer_33)
35. <span id="question_34"></span>[查看答案](#answer_34)
36. <span id="question_35"></span>[查看答案](#answer_35)

# 答案

1.  <span id="answer_1"></span>Git由linux系统之父**Linus**，在管理linux版本时，因为其他版本控制系统太难用或者收费，自己用**C语言两周**写出来的**分布式**版本控制系统。[返回问题](#question_1)
2.  <span id="answer_2"></span>集中式相当于图书馆，任何修改都必须上传到服务器上，版本库也存放在服务器上，必须联网。

    分布式相当于每个人电脑里都有完整的版本库，修改文件只需把修改发送给拥有相同版本库的其他人就可以了。不需要服务器存储，可以有服务器用来交换好传输。[返回问题](#question_2)
3.  <span id="answer_3"></span>
    ```git
    git config --global user.name "Tom"
    git config --global user.email "a@b.com"
    ```
    global参数是将这台计算机上所有Git仓库都用这个配置[返回问题](#question_3)
4.  <span id="answer_4"></span>版本库又叫版本仓库repository，可看作一个目录，目录下的文件被Git管理起来，追踪增删改查记录
   
    * 初始化版本库：
        - 在某一文件夹下输入命令
            ```git
            git init
            ```

    * 向版本库添加文件：
        - 将一个或多个文件放入此文件夹下并输入命令
            ```git
            git add 文件名
            ``` 
        - 将文件提交到仓库
            ```git
            git commit -m "wrote a file"
            ```
        git有两个区域，**工作区**和**暂存区**，git add把工作区的修改提交到暂存区，git commit把暂存区的修改保存到本地库，git push把本地库的记录，推送至远程库。[返回问题](#question_4)
5.  <span id="answer_5"></span>使用```git status```命令查看仓库状态，使用```git diff```命令查看文件变化[返回问题](#question_5)
6.  <span id="answer_6:"></span>使用```git log```命令查看仓库日志，加上```--pretty=oneline```参数可以将每次修改按一行显示。其中第一列是**commit id**，由**SHA1**计算得出。[返回问题](#question_6)
7.  <span id="answer_7"></span>用**HEAD**表示**当前版本**，HEAD^表示上一版本，HEAD^表示上上版本，往上100个版本是HEAD~100。[返回问题](#question_7)
8.  <span id="answer_8"></span>用```git reset --hard 某版本```即可回退到某一版本。此时，回退只是把HEAD的**指向**修改[返回问题](#question_8)
9.  <span id="answer_9"></span>用命令```git relog```可以看到历史命令。没有commit 的文件，用reset，也会恢复到之前的版本。[返回问题](#question_9)
10. <span id="answer_10"></span>文件夹目录是**工作区**（working directory），而.git文件夹是Git**版本库**（Repository），版本库包括**缓存区**（stage）和**第一个分支**（master），指向master的指针是HEAD。add命令会把文件修改添加到暂存区，commit把暂存区全部提交到当前分支。提交后，工没有对工作区修改，那么工作区就是干净的[返回问题](#question_10)
11. <span id="answer_11"></span>只会提交第一次修改，因为git必须先把文件添加到**暂存区**再提交。[返回问题](#question_11)
12. <span id="answer_12"></span>```git checkout -- file```可以撤销修改，如果文件**修改后没有add**就撤销，则退回到和版本库一样的状态；如果**已经add后修改**再撤销，则退回到add时的状态。```git reset```可以将暂存区的修改回退到工作区[返回问题](#question_12)
13. <span id="answer_13"></span>```git checkout -- file```已经删除了文件，可以```git rm file```确认在仓库中删除并且commit。
    
    如果是误删，可以用checkout --file回退，但是这个文件必须add过才行。[返回问题](#question_13)
14. <span id="answer_14"></span>```ssh-keygen -t rsa -C "email"```创建ssh key
    
    然后在github的个人主页，settings->ssh keys-> add ssh key
    
    注意把公钥里**所有的文本**都粘贴上去。[返回问题](#question_14)
15. <span id="answer_15"></span>在github个人页上创建一个repository，然后在本地用
    
    ```git remote add origin git@github.com:UserName/GitName.git```

    然后使用```git push -u origin master```
    
    将本地库内容推送到远程。-u是做关联，以后可省。[返回问题](#question_15)
16. <span id="answer_16"></span>在某目录下使用命令```git clone git@github.com:UserName/GitName.git```
    
    这是SSH协议, 必须在github个人设置里加入**SSHKEY**才可以
    
    没有SSH就用http吧: ```git clone https://github.com/UserName/GitName.git```[返回问题](#question_16)
17. <span id="answer_17"></span>
    - 分支的作用: 每个人可以在自己的分支上干活, 互不影响, 想提交就提交, 等开发完后, 再一次性合并到原来的分支上
    - 创建分支: ```git branch 分支名```
    - 查看分支: ```git branch```
    - 切换分支: ```git checkout 分支名```或者```git switch 分支名```
    - 创建+切换分支: ```git checkout -b 分支名```或者```git switch -c 分支名```
    - 合并某分支到当前分支: ```git merge 要合并的分支名```
    - 删除分支: ```git branch -d 分支名```
    [返回问题](#question_17)
18.  <span id="answer_18"></span>在dev分区修改了文件，然后切换到主分区，查看status，是可以看到状态的，就可以在主分区来add 和commit dev 分区的改动;
    
     如果在dev分区修改了文件，并且add和commit 了 那么切换到主分区就看不到修改了

     所有分支, 工作区和暂存区是公共的
    [返回问题](#question_18)
19.  <span id="answer_19"></span>会出现冲突, 因为两个分支文件不一样, 无法合并. 应该具体修改后重新提交, 此时会自动合并.[返回问题](#question_19)
20.  <span id="answer_20"></span>推荐使用
     ```git
     git log --graph --pretty=oneline --abbrev-commit
     ```
     [返回问题](#question_20)
21.  <span id="answer_21"></span>Fast-forward是快进模式, 直接把当前分支指向要要合并的分支, 但是这种模式下, 删除分支后, 会丢失分支信息. 禁用Fast-forward模式, git在merge时会生成一个新的commit. 使用```--no-ff```参数即可.[返回问题](#question_21)
22.  <span id="answer_22"></span>master分支应该是非常稳定的, 仅用来发布新版本, 工作都在dev分支上, 不同的人协作时, 都创建自己的分支往dev分支上合并[返回问题](#question_22)
23.  <span id="answer_23"></span>
     - 使用```git stash```命令, 将当前工作现场储存起来.
     - 使用```git stash list```命令, 查看已经储藏的工作
     - 使用```git stash apply```恢复, 然后```git stash drop```删除, 或者```git stash pop```弹栈 
     
     [返回问题](#question_23)
24.  <span id="answer_24"></span>用```git cherry-pick <commit>```命令, 将在其他分支做的commit, 在当前分支上复制重现一下[返回问题](#question_24)
25.  <span id="answer_25"></span>```git branch -D <分支名>```强制删除, 用于开发了一个新的实验功能, 但是突然要放弃的时候.[返回问题](#question_25)
26.  <span id="answer_26"></span>```git remote -v```查看远程仓库信息[返回问题](#question_26)
27.  <span id="answer_27"></span>在本地创建一个分支, 比如dev, 然后添加文件, 提交修改后, 用```git push origin dev```即可在远程创建新的分支并提交[返回问题](#question_27)
28.  <span id="answer_28"></span>这样推送往往会失败, 因为远程分支比本地的要新, 应该先用```git pull```抓取远程的版本到本地, 才能推送自己的. 
     要注意建立本地分支和远程分支的关联: ```git branch --set-upstream-to=origin/<branch-name> <branch-name>```[返回问题](#question_28)
29.  <span id="answer_29"></span>rebase操作可以把本地未push的分叉提交历史整理成直线；目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。[返回问题](#question_29)
30.  <span id="answer_30"></span>```git push origin --delete <分支名>```删除远程分支[返回问题](#question_30)
31.  <span id="answer_31"></span>

     - 命令```git tag <tagname>```用于新建一个标签，默认为HEAD，后面也可以指定一个commit id
     - 命令```git tag -a <tagname> -m "descriptions"```可以指定标签信息
     - 命令```git tag```可以查看所有标签
     
     标签相当于给某次提交起了别名[返回问题](#question_31)
32.  <span id="answer_32"></span>
     - ```git push```不能把标签推送到远程
     - 必须显式地操作```git push origin <tagname>```
     - 或者一次性推送全部标签```git push origin --tags```
     - 命令```git tag -d <tagname>```可以删除一个本地标签
     - ```git push origin :refs/tags/<tagname>```可以删除一个远程标签
     
     [返回问题](#question_32)
33.  <span id="answer_33"></span>
     1.   找到别人的开源项目, 点击fork,相当于在自己账号下克隆了该仓库
     2.   然后在本地克隆**自己账号的**这个仓库, 这三者关系如下
        
        ```
        ┌─ GitHub ────────────────────────────────────┐
        │                                             │
        │ ┌─────────────────┐     ┌─────────────────┐ │
        │ │ twbs/bootstrap  │────>│  my/bootstrap   │ │
        │ └─────────────────┘     └─────────────────┘ │
        │                                  ▲          │
        └──────────────────────────────────┼──────────┘
                                           ▼
                                ┌─────────────────┐
                                │ local/bootstrap │
                                └─────────────────┘
        ```
        
     3.   对自己的本地仓库做出想要的修改, 然后推送到自己的远程仓库
     4.   如果希望项目原有者接受你的修改, 必须pull request
     [返回问题](#question_33)
34.  <span id="answer_34"></span>[返回问题](#question_34)
35.  <span id="answer_35"></span>[返回问题](#question_35)
 
----------------------

<font size=10 font color="Red">武汉加油！中国加油！</font>