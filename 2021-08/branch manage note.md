## 分支管理策略学习心得

git merge --no-ff -m "merge with no-ff" dev

**note：**当master 和 dev 的 read.txt 文件内容不同时，使用如上命令会直接将dev 中的read.txt 覆盖 master 中的read.txt。

git merge --no-ff -m "merge with no-ff" dev和git merge dev 中的Fast forward 合并本质区别

- dev 分支不会被删除，还是read.txt原来的内容
- master 分支内容被dev 的内容直接覆盖，并且不会抛出冲突

---

**疑问：**那么如果我既希望保存maste上 readme.txt已经修改的内容，还希望保留dev 分支 readme.txt已经修改的内容。

该使如何解决呢？

I am hwy，Thank you for your git learning Tutorials.

so good for me.
