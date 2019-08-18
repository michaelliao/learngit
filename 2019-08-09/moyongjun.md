Centos tomcat8.5.43 服务启停
service   tomcat start
service    tomcat stop
service    tomcat restart

ziip    解压命令
filename.zip的解压:
unzip filename.zip
 
filename.tar.gz的解压:
tar -zxvf filename.tar.gz

redis    服务启动命令：
redis-server  /etc/redis/redis.conf
Redis  服务关闭命令：
redis-cli -h 127.0.0.1 -p 6379 shutdown
查看redis是否启动：
ps -ef|grep redis

防火墙：
1. # firewall-cmd --permanent --add-port=80/tcp
2. # firewall-cmd --permanent --add-port=443/tcp
–reload 参数将这些规则应用于当前会话：
1. # firewall-cmd --reload
# 用于查看隐藏目录和文件
ls -ah 
GIt相关：
git 提交文件共两步;
git add 文件名
git commit -m ‘说明'
撤销修改：


版本回退：


git 的删除操作：



创建远程仓库：
先创建ssh key,

ssh-keygen -t rsa -C "youremail@example.com"




(参考廖雪峰Git教程https://www.liaoxuefeng.com/wiki/896043488029600/898732864121440)




获取远程仓库：
git pull —ff-only

git 克隆远程仓库：

git 分支：








合并冲突时，先修改冲突的，在add,commit,然后merge
查看合并情况：
 git log --graph --pretty=oneline --abbrev-commit




实际开发是在dev分支上：

bug修复时创建临时分支：











创建标签：

往往远处推送标签或删除标签：


