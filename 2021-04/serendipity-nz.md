# git学习笔记

致谢：首先很感谢廖老师的教程，通俗易懂，操作性更强，通过这两天的学习确实对git有了挺多的了解

## 学习中遇到的问题

- Git Push时报错 Connection was reset, errno 10054

  - 解决方案

    ​	基本上还是网络的问题，可以挂个vpn或者改host文件，有时可能因为**上传文件太大**做以下的操作。

~~~
将缓存改为500M
 git config http.postBuffer 524288000

参考网站：[修改文件大小](https://blog.csdn.net/qq_34235864/article/details/107438806)

基本上学习下来都可以完成操作，唯一就是Rebase这一节模拟了分支push提交，master提交并origin-push，然后master再进行操作，没有模拟出冲突无法上传的情况。也算是小遗憾，就只是记了一个知识点，如果以后再遇到就好解决了，回来看一看笔记即可。

该文件的作用还是做pull request测试，具体的笔记已经在本地了，也就不写入了。师傅领进门，修行靠个人。加油吧！

