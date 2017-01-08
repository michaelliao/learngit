#!/bin/bash
# 文件名:  git-Repository.sh 
# 描述:  用于 Git 创建仓库
# 版本:  1.0
# 创建时间:  2016年12月21日
# 修订:  None
# 作者:  Selphia (sp), admin@factory.moe

# 检测用户是否为Root
if [ $UID != "0" ]
then
		echo "请使用root帐户来执行此程序"
			exit 0
		fi

# 检测 git 安装
git --version

if [ $? != '0' ]
then
	bash git-server.sh
fi

#  仓库名称
echo '请输入要建立的仓库名称'
read Repository
mkdir /home/git/$Repository.git
chown -R  git:git /home/git/$Repository.git
git init --bare --shared /home/git/$Repository.git

exit 0
