#!/bin/bash
# 文件名:  add-keys.sh 
# 描述:	输入密钥并添加到 authorized_keys 文件中
# 版本:  1.0
# 创建时间:  2016年12月22日
# 修订:  None
# 作者:  Selphia (sp), admin@factory.moe

# 检测用户是否为Root
if [ $UID != "0" ]
then
	echo "请使用root帐户来执行此程序"
	exit 0
fi

# 输入密钥
echo "请输入要添加的密钥 (您的 id_rsa.pub 文件内容) :"
read id_rsa

echo -e "$id_rsa\n" >> /home/git/.ssh/authorized_keys
if [ $? == '0' ]
then
	echo "添加密钥成功"
else
	echo "添加密钥失败，请尝试手动添加"
fi

exit 0
