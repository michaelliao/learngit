1. 创建

  从现有仓库克隆

  `git clone ssh://user@domain.com/repo.git`

  创建一个新的本地仓库

  `git init`
2. 本地修改

  查看工作目录中文件改动

  `git status`

  查看已经追踪的文件的改动

  `git diff`

  添加所有改动到下一次提交中

  `git add .`

  将一些__file__添加到下一次提交中

  `git add -p <file>`

  对所有追踪的文件进行提交

  `git commit -a`

  将缓存区的改动提交

  `git commit`

  改变最后一次提交

  `git commit --amend`

3. 提交历史

  从新到旧显示提交历史

  `git log`

  针对某个文件，显示所有的提交改动

  `git log -p <file>`

  显示是谁对文件进行了改动

  `git blame <file>`

4. 分支和标签

  显示所有分支

  `git branch -av`

  切换到__branch__分支

  `git checkout branch`

  创建新分支

  `git branch <new-branch>`
