#!/bin/bash
# 文件名:  git-server.sh 
# 描述:  用于 CentOS 7 系统安装 Git 服务器
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

# 安装 git
yum install git -y

# 创建用户
groupadd -r git
useradd git -g git -r -m -s /usr/bin/git-shell

# 创建证书登录
# 收集所有需要登录的用户的公钥，就是他们的id_rsa.pub文件
# 将所有公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个
mkdir /home/git/.ssh
touch /home/git/.ssh/authorized_keys
chown -R git:git /home/git

exit 0
