#!/usr/bin/env python3
# 文件名:  add-keys.py
# 描述: 将当前目录内所有密钥文件（*.pub）添加到 authorized_keys 文件中
# 版本:  1.0
# 创建时间:  2016年12月22日
# 修订:  None
# 作者:  Selphia (sp), admin@factory.moe

import os
import re
list = os.listdir()

# 密钥默认名为 id_rsa.pub ,请将 id_rsa 改为 <user_name> ,避免重复

# 确定 *.pub 文件
def id_rsa(s):
    return re.match(".*\.pub",s) != None

# 读取文件
def open_id_rsa(file):
    f = open(file,'r')
    ras = f.read()
    global ras
    f.close()

# 写入文件
def write_id_rsa(line,file='authorized_keys')
    f = open(file,'a')
    f.write(line)

for i in list:
    if id_rsa(i):
        open_id_rsa(i)
        write_id_rsa(ras,file='authorized_keys')
# 退出
exit()
