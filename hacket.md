### Git tag

每发布一个版本，通常会在版本库中打一个tag。将来可以将这个tag版本取出来。tag和branch类似，只是branch可以移动，而tag不能移动。

#### 1、查看tag
* 查看所有tag
`git tag`

* 查看某个tag
`git show [tag-name]`

#### 2、新建tag
* 轻量级tag，默认tag是打在最新提交的commit上
`git tag [tag-name]`

* 带标注的tag
`git tag -a [tag-name] -m "tag message"`

* 后期追加tag,创建一个叫做v1.0.0的tag
`git tag v1.0.0 1b2e1d63ff`

`1b2e1d63ff`是你想要标记的提交 ID 的前 10 位字符，通过git log获取提交ID。你也可以用该提交 ID 的少一些的前几位，只要它是唯一的。

* 删除tag
`git tag -d [tag-name]`


#### 3、push到远端
* push一个tag
```
git push origin <tagname>
```

* 一次性推送全部尚未推送到远程的本地tag
```
git push origin --tags
```

* 删除远程tag，先删除本地，再push
```
git tag -d v1.1
git push origin :refs/tags/v1.1
```
![](index_files/8e00ef0d-e2d9-453c-90b2-dbe223fd9132.png)

