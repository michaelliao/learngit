#Git 学习笔记
##基本命令
1. 创建版本库
	- **`git init`**
	- 在指定文件目录（不一定为空）下创建由Git管理的仓库
	- 隐藏文件 `.git` 是Git来跟踪管理版本库的
2. 添加文件到仓库
	- **`git add <filename>`**
	- 可以多次add不同文件
3. 提交文件到仓库
	- **`git commit -m "message"`**
	- -m后面输入的是本次提交的说明
	- 一次可以提交多个文件
4. 查看仓库当前的状态
	- **`git status`**
5. 查看修改的内容
	- **`git diff <filename> <filename>`**
	- `git diff HEAD^ HEAD`
6. 查看提交历史
	- **`git log`**
	- 显示从最近到最远的提交日志
	- **`git log --pretty=oneline`** 只显示commit id信息
7. 查看命令历史
	- **`git reflog`**
	- 找回历史版本的commit id
8. 版本回退
	- **`git reset --hard <option>`**
	- HEAD表示当前版本，HEAD~N表示上N个版本
	- commit id（前几位即可）表示对应版本
	- option可为HEAD~N或commit id
9. 撤销修改
	- **`git checkout -- <filename>`**
	- 若文件还没有添加到暂存区，如果文件被修改，则恢复到和版本库一样的状态
	- 若文件已经被添加到暂存区，如果文件被修改，则恢复到添加到暂存区后的状态
	- 让文件回到最近一次commit或add的状态
	- 若要**丢弃暂存区中内容**，使用命令 **`git reset HEAD <filename>`**
10. 删除文件
	- **`rm <filename>`** 删除工作区文件
	- 若为误删，恢复可使用命令 **`git checkout -- <filename>`**
	- 若非误删，先使用命令 **`git rm <filename>`**，然后使用命令 **`git commit`**
	- 命令 **`git rm <filename>`** 会删除工作区对应文件
11. 关联GitHub
	- **`git remote add origin git@server-name:path/repo-name.git`**
	- origin是远程库的名字，也可以改成其他的
	- 命令 **`git push -u origin master`** 将本地库内容推送到远程库
	- `-u` 参数不但会把本地的master分支内容推送到远程新的master分支，还会把它们关联起来，在以后的推送或者拉取时就可以简化命令，只需输入 **`git push origin master`** 即可
	- 命令 **`git clone git@server-name:path/repo-name.git`** 将远程库克隆至本地
	- Git支持多种协议，但通过SSH支持的原生Git协议速度最快

##工作区和暂存区
- 工作区即电脑中能看到的目录
- `git add` 将工作区中要提交修改的文件添加到暂存区
- `git commit` 提交更改，一次性将暂存区中的内容提交到当前的分支
- git会自动创建第一个分支`master`
- git管理的是修改而不是文件
	
	