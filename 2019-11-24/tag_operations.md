#### 1、创建查看标签
* 1、git tag <tagName>


* 2、git tag <tagName> <commitId> 在指定的<commitId>上创建标签， commitId可通过 git log查看


* 3、git tag <tagName> 查看标签信息


* 4、git tag -a <tagName> -m <tagMsg> <commitId>

* 5、git  tag 查看所有的标签。


#### 2、操作标签
* 1、git tag -d <tagName>本地删除标签


* 2、 git push origin <tagName> 推送本地标签到远程仓库。


* 3、git push origin --tags 一次性推送所有未推送到远程的本地标签。


* 4、从远程删除标签。
    * 1、先从本地删除标签 git tag -d <tagName>
    * 2、从远程删除标签 git push origin :refs/tags/<tagName>


* 5、git ls-remote --tags origin 查看远程分之上的tags


* 6、同步远程分支上的tags
    * 1、git tag -l | xargs git tag -d 删除所有本地分支。
    * 2、git fetch 获取远程分支