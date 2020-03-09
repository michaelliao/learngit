本文是关于学习廖雪峰的Git教程的笔记

#### 一、配置全局参数
```
#设置当前用户的git全局用户名
git config --global usr.name "name"
#设置邮箱
git config --global usr.email "email@abc.com"
#设置默认编辑器
git config --global core.editor vim
```
#### 二、创建版本库
```
git init
```
#### 三、查询工作区状态
```
git status
```
#### 四、从工作区提交到暂存区（staged）
```
git add ${filename}
```
#### 五、从暂存去提交到版本库
```
#参数 "-m" 指定本次提交的说明
git commit -m "your commit message"
```
#### 六、查看log
```
git log
#简要信息，加参数 "--pertty=oneline"
git log --pretty=oneline

#查看分支合并图
git log --graph

#只显示SHA-1的前几位
git log --abbrev-commit
```
#### 七、查看操作记录
```
git reflog
```
#### 八、版本回退/撤销修改
```
#从仓库中回退版本 参数 "HEAD^"后面紧跟数字代表回退到最近的第几次版本
#回退到上一次版本
git reset --hard HEAD^

#回退到指定SHA-1的值对应的版本,参数da5bc75,填实际的SHA-1值
git reset --hard da5bc75

#撤销提交到暂存区的修改
git reset HEAD <file>

#撤销工作区的修改
#撤销readme.txt文件的修改
git checkout -- readme.txt
#1、如果readme.txt没有被存放到暂存区，执行命令后工作区的readme.txt文件就恢复到和仓库的一样
#2、如果readme.txt文件已经添加到暂存区，撤销将恢复到添加到暂存区后的状态

```
#### 九、对比差异
```
#对比工作区和暂存区的差异
git diff
#对比暂存区和仓库的差异
git diff --cached
#对比工作区和仓库的差异
git diff HEAD

#可以加参数 "-- ${文件名}" 指定比较的文件
#例如对吧工作区readme.txt文件和仓库中的readme.txt文件的差异
git diif HEAD -- readme.txt
```
#### 十、删除文件
```
#删除工作区文件，并且将版本库中的该版本大的文件也删除
git rm <filename>
git commit -m "remove file"

#删除后的文件可以通过checkout 或者reset 获取最后记录的文件
```
#### 十一、创建SSH Key
SSH key用于网络传输的SSH加密
```
ssh-keygen -t rsa -C "email@abc.com"
```
&emsp;&emsp;执行完之后，按照默认的配置回车就会在用户的home目录下生成.ssh文件夹，文件夹中会有id_rsa和id_rsa.pub文件，id_rsa是私钥，id_rsa.pub是公钥。  
&emsp;&emsp;因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。
#### 十二、关联远程仓库
```
git remote add origin https://github.com/XXX/myfirstgit.git
#origin 是远程库的名称，git的默认叫法
```
#### 十三、推送本地库到远程
```
#推送本地分支到远程仓库
git push origin <branch name>

#例：推送本地的master分支
git push origin master

#如果远程库为空的，则加 "-u" 选项，可以然本地库和远程库关联
git push -u origine master
```
#### 十四、下拉远程库的版本
```
git pull 

#第一次下拉远程仓库代码时指定远程分支和本地分支的关联
git pull origin master
```
#### 十五、克隆远程库
```
git clone <git https link>
```
#### 十六、分支操作
1、查看分支
```
git branch
```
2、创建分支
```
git branch <name>
```
3、切换分支
```
#方法一
git checkout <branch name>
#方法二 git version 2.23以上才支持
git switch <branch name>
```
4、创建+切换分支
```
#方法一
git checkout -b <branch name>
#方法二 version 2.23以上才支持
git switch -c <branch name>
```
5、合并某个分支到当前分支
```
git merge <branch name>

#合并时加参数 "--no-ff" 用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而默认使用的fast forward合并就看不出来曾经做过合并。

#合并时可以添加提交记录内容，使用参数 "-m <描述提交内容>"
```
6、删除分支
```
git branch -d <branch name>

#强制删除已修改，但未被合并的分支
git branch -D <branch name>
```
7、在本地创建与远程分支对应的分支
```
#本地分支名称最好和远程分支名称一致
git checkout -b <branch-name> origin/<branch-name>
```
8、建立本地分支和远程分支的关联
```
git branch --set-upstream-to=origin/<branch-name> <branch-name>
```
#### 十七、现场保存和恢复
当前的分支还有未完成的任务，需要优先去处理别的事务，则需要先将当前的分支修改保存，再切换到别的分支。
```
#保存现场
git stash

#查看保存现场
git stash list

#现场恢复
#方法一,使用apply恢复，但不删除保存的现场；drop删除现场
git stash apply
git stash drop
#方法二,pop 恢复的同时把从stash中恢复的现场删除
git stash pop

#分支中存在多个stash时，使用参数 "stash@{0}" 在大括号中指定要恢复的stash
```
#### 十八、合并别的分支已提交的修改内容
在master分支上修复了bug后，我们要想一想，dev分支是早期从master分支分出来的,如果希望在dev上也修改提交的bug，可以使用cherry-pick命令复制提交的修改到当前分支
```
git cherry-pick ${sha-1}
```
#### 十九、查看远程库的信息
```
git remote -v
```
#### 二十、分叉整理
- rebase操作可以把本地未push的分叉提交历史整理成直线;  
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。
```
git rebase
```
#### 二十一、标签
1、新建标签
```
#新建一个标签，默认指向HEAD
git tag <tag name> 
#指定标签名字和说明信息
git tag -a <tag name> -m "content"
```
2、查看标签
```
#查看标签
git tag  

#查看标签信息
git show [tag name]
```
3、删除标签
```
git tag -d <tag name>
```
4、推送标签到远程仓库
```
#推送一个标签
git push origin <tag name>
#推送全部标签
git push origin --tags
```
5、删除远程标签
```
git push origin :refs/tags/<tag name>
```
