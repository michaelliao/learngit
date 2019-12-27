
[参考资料]
1. https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137628548491051ccfaef0ccb470894c858999603fedf000
2. https://git-scm.com/


### Git分布式版本控制系统
- 新建文件夹，把该目录变为git仓库，git init
- 工作区 修改文件
- 暂存区 git add，将工作区修改的文件放到暂存区
- 分支，git commit将暂存区文件提交到分支
![](http://p5mgrasjk.bkt.clouddn.com/18-6-5/61512765.jpg)

```
#提交修改的版本
git  add readme.txt 
git commit -m "add distributed and git"

#查看版本信息，主要是查看暂存区stage的版本信息
git status
git diff

#回退之前的版本，commit Id是版本的标识，通过id可以使指针指向任意一个版本
git reset --hard HEAD~1
git reset --hard f143
git log --pretty=oneline
```

#### 1. 撤销更改
- 工作区 git checkout -- filename
- stage  git reset HEAD filename
- 版本库 git reset --hard HEAD~1
- 远程仓库，无法撤销

#### 2. 远程仓库
- 关联一个远程库，git remote add origin git@server-name:path/repo-name.git
- 第一次推送master分支的所有内容 git push -u origin master
- 本地提交，git push origin1 master
- 查看分支 git branch
- 创建分支 git branch branch_name    #git checkout -b dev
- 切换分支 git checkout branch_name
- 将master的分支合并到dev分支 git checkout master; git merge dec; 
- 删除分支 git branch -d branch_name 
---
- 暂存区没有提交到仓库 change to be commited
- 文件没有放到暂存区 changes not staged 
- 修复bug，合并分支 git merge --no-ff -m "merge bug fix 101" issue-101
- 暂时保存工作区内容，切换到另外一个分支去 git stash
- 回复更改保存的工作区内容  git stash pop [apply stash@{0}]
- 打标签， git tag -a <tagname> -m "blablabla commit_id
- 删除tag git tag -d v0.1
- git push origin <tagname>
- git push origin --tags
- git push origin :refs/tags/<tagname>可以删除一个远程标签
