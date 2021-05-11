```git
git add filename.txt	//git 添加至暂存区
git commit -m "commit file" //将暂存区提交

git status	//状态
git diff filename.txt	//文件对比



git log	//显示从最近到最远的提交日志
git log --pretty=oneline	//精简模式
git log --graph	//分支关系日志


git reflog	//操作历史


git reset --hard HEAD^	//将当前分支回退到上次提交的版本
git reset --hard HEAD commit_id //将当前分支指向某版本
git reset --hard HEAD^^^^^^(HEAD~100)	//回退若干版本



git remote -v	//查看远程仓库信息
git remote rm origin	//删除关联关系
git remote add origin git@github.com:gitUserName/learngit.git	//关联远程库
git push -u origin master	//将本地库推送至远程库上  -u 还会将本地分支与远程分支关联起来
git push origin master//推送master分支


git tag	//查看标签
git tag name	//在最近一次commit上新建名为`name` 的标签
git tag name commitid	//在指定的commit上新建标签
git tag -a tagname -m "标签说明" commitid
git show tagname	//可以看到说明文字


git tag -d tagname	//删除一个标签
git push origin :refs/tags/tagname	//从远程删除一个标签
git push origin tagname	//推送标签至远程库
git push origin --tags	//推送全部本地标签



```
​

​

