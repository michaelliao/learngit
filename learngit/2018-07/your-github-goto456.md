
非常感想廖老师的教程，其中我收益最大的命令就是`rebase`命令了，之前我们团队的分支很乱，各个分支交织在一起杂乱无章，后来根据廖老师教程的rebase命令把团队的分支整理了一下，并总结了一套我们团队内部git分支操作的规则使整个团队的分支清晰整洁，非常感想廖老师的教程。

###  我们团队协作的应用
在团队协作过程中一般会有多个分支，比如有默认的 master 分支，有用于开发的 dev 分支，还有用于测试的 test 分支，用于对外发布的 release 分支，以及每个开发人员开发不同功能时用到的 feature_xx 分支等等。

公司中一般是用 GitLab 搭建的代码托管服务，几个人的小团队也可以自己搭建。

每个团队业务不一样，分支数量的设置也会不一样，下面我介绍一下我们团队的分支设置，以及普通开发人员和项目 leader 对不同分支的不同权限以及不同的操作。

#### 1 分支设置
我们常用的分支有3个（master 分支、dev 分支、test 分支）以及若干个 feature_xx 分支。

1. `master` 分支：是主分支，是最终上线代码的分支，该分支被设置被保护分支（锁住），普通开发人员没有权限操作，只有团队 leader 有合并的权限；
2. `dev` 分支：是用于开发的分支，该分支被设置为默认 clone 的分支，也用于合并到 master 之前进行测试的分支，普通开发人员从远程 clone 到本地的默认分支，可以进行合并等操作；
3. `test` 分支：是用于测试的分支，测试人员可以将自己开发分支中的修改合并到 test 分支在测试环境进行测试，一般该分支不合并到任何分支；
4. `feature_xx` 分支：是用户开发自己模块功能的特征分支，可以叫 feature_login, feature_ui, feature_payment 等与开发的功能相关的名称，该分支上的功能开发完、测试无误后可合并到 dev 分支上。
 
#### 2 普通开发人员的操作
普通开发人员，一般按照如下几个步骤来进行开发、测试工作就可以了：
1. 将远程 dev 分支 clone 到本地，例如：`git clone git@github.com:goto456/test.git`；
2. 从 dev 分支拉出（新建）自己的 feature 分支用于开发，例如：`git checkout -b feature_login`；
3. 在自己的 feature 分支上进行开发工作；
4. 开发完了用 add、commit 等操作提交到当前分支；
5. 如果需要在测试环境进行测试，则将远程 test 分支拉到本地，例如：`git branch test origin/test`;
6. 将自己的 feature 分支合并到 test 分支，并将 test 分支 push 到远程，例如：`git rebase test`, `git checkout test`, `git merge feature_login`, `git push origin test`；**（注意：我们推荐用 rebase 来合并，以保证分支的整洁、美观）**
7. 通过公司的发布平台将远程 test 分支发布到测试环境进行测试；
8. 如果测试没问题或者开始就不需要测试，这可以直接将当前 feature 分支合并到 dev 分支，并 push 到远程库，例如：`git rebase dev`, `git checkout dev`, `git merge feature_login`, `git push origin dev`；**（注意：我们推荐用 rebase 来合并，以保证分支的整洁、美观）**
9. 这时表示该功能已经开发完成了，代码的 review 以及发布，需要团队 leader 在合并到 master 操作时进行；这时可以删除了自己的 feature 分支，例如：`git branch -d feature_login`；
10. **如果在 push 到远程的时候提示需要先 pull 时，我们推荐使用 rebase 的方式：`git pull --rebase` 以保持分支的整洁、美观。**

#### 3 团队 leader 的操作
因为只有 leader 有操作 master 分支的权限，所以需要完成 dev 分支到 master 分支的合并，以及后续打 tag 和正式上线发布的工作：
1. 先切换到 dev 分支，并拉取最新的状态，例如：`git checkout dev`, `git pull --rebase origin dev`；
2. 进行代码 review 等过程后，合并到 master 分支，例如：`git rebase master`, `git checkout master`, `git merge dev`;**（注意：我们推荐用 rebase 来合并，以保证分支的整洁、美观）**
3. 为本次完成的版本打上标签，例如：`git tag v1.0 -m "release version 1.0"`；
4. 将本地合并后的 master 分支以及标签 push 到远程库，例如：`git push orgin master --tags`。
