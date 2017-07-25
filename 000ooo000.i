测试.作为贡献者,该如何和上游维护者保持合作关系呢?在github上的流程:
1.上游维护者可以推送数据到公共仓库 blessed repository。
2.贡献者克隆此公共仓库(blessed repository)到自己的公共仓库developer public(这个公共仓库若不用gihub得自己搭建一个git裸库,通知并供维护者拉取最新代码).(fork操作).
3.克隆自己的公共仓库到本地库开发,推送至自己的公共仓库developer-public.
4.pull request到上游维护者.(给维护者发送邮件，请求拉取自己的最新代码.)
5.上游维护者在自己本地的 integration manger 仓库中，将贡献者的公共仓库加为远程仓库，合并更新并做测.这一步在github不知道上游维护者怎么解决?是在integration manger库中解决推送blessed repository到还是直接在github网站上 手动解决?
6.维护者将合并后的更新推送到主仓库 blessed repository。
