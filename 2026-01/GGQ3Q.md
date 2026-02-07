# 对于git
## 一些我老是忘记的名词：
 分布式版本控制系统：指的就是读取 存储 修改文档的一个管理器，git就是一个。
 版本库：就是仓库，git可以管理里面所有的文件（注意是./git所在的文件夹！不是./git内部！）
## 我第一次操作遇到的问题
 把文本（txt/md）放到./git内部了，这时候会显示错误，要放在版本库里
 文件名包含空格或特殊字符，可能需要用引号括起来，或者使用转义。如文件名是studynote.md就不用双引号，如果是中文或空格需要双引号。
## 要注意的一些点
 windows系统不能用自带记事本，用vscode，提交时记得改后缀
 添加某个文件时，该文件必须在当前目录下存在，用ls或者dir命令查看当前目录的文件，看看文件是否存在，或者是否写错了文件名。
 git add可以一次多加几个文件，commit一次性提交
## 一些基础指令
```git
 $git add 文件名
 $git commit -m message(#文件提交注释)
 $git log (近到远)
 $git diff
 $git reset --hard commit id or HEAD^....
 $git log --pretty=oneline
 $git relog

```

