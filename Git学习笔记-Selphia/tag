标签管理

创建标签
$ git tag <name>

	为历史版本创建标签
	$ git tag <name> <commit id>

	$git tag -a <tagname> -m "blablabla..."
		-a	指定标签名
		-m	指定说明文字

	$ git tag -s <tagname> -m "blablabla..."
		-s	使用PGP签名标签，PGP签名的标签是不可伪造
	
	$ git tag -d <tagname>
		-d	删除标签

查看所有标签
$ git tag

推送一个标签到远程仓库
$ git push origin <tagname>

推送全部标签到远程仓库
$ git push origin --tags

删除远程标签
$ git tag -d <tagname>						# 先删除本地标签
$ git push origin :refs/tags/<tagname>		# 再删除远程标签

查看某次历史修改内容
$ git show <commit id>
	查看某次commit的修改内容
$ git show <tagname>
	查看某标签修改的内容
