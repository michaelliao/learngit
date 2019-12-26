
Administrator@LQ-PC MINGW64 /f/practiceGit
$ pwd
/f/practiceGit

Administrator@LQ-PC MINGW64 /f/practiceGit
$ git init
Initialized empty Git repository in F:/practiceGit/.git/

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls -ah
./  ../  .git/

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ vim .git

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git config user.name freeman

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git config user.email 730210520@qq.com

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ vim .git

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cd .git

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ ls
config  description  HEAD  hooks/  info/  objects/  refs/

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ vim config

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$


Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$


Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$
Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ cd ..

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "wrote a readme file"
[master (root-commit) cf8c509] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ vim readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff readme.txt
diff --git a/readme.txt b/readme.txt
index d8036c1..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
-Git is free software.
\ No newline at end of file
+Git is a distributed version control system.
+Git is free software.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "add distributed"
On branch master
Changes not staged for commit:
        modified:   readme.txt

no changes added to commit

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "add distributed"
[master 727063c] add distributed
 1 file changed, 2 insertions(+), 2 deletions(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit readme.txt
Aborting commit due to empty commit message.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "append GPL"
[master 3666459] append GPL
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log
commit 366645993e23b17c3e5165ca4a36cd495d6d53ea (HEAD -> master)
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 14:04:43 2019 +0800

    append GPL

commit 727063c16c49023c6f48f581f9392878b6326d87
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 13:41:11 2019 +0800

    add distributed

commit cf8c5099131d237f0c75e720e5bfb2c2271c39a1
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 11:07:50 2019 +0800

    wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log --pretty=oneline
366645993e23b17c3e5165ca4a36cd495d6d53ea (HEAD -> master) append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reset --hard HEAD^
HEAD is now at 727063c add distributed

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
readme.txt
ca
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log
commit 727063c16c49023c6f48f581f9392878b6326d87 (HEAD -> master)
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 13:41:11 2019 +0800

    add distributed

commit cf8c5099131d237f0c75e720e5bfb2c2271c39a1
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 11:07:50 2019 +0800

    wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reset --hard 36664
HEAD is now at 3666459 append GPL

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log --pretty=oneline
366645993e23b17c3e5165ca4a36cd495d6d53ea (HEAD -> master) append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reset --hard HEAD~2
HEAD is now at cf8c509 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a version control system.
Git is free software.
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reset --hard 366
fatal: ambiguous argument '366': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reset --hard 36664
HEAD is now at 3666459 append GPL

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reflog
3666459 (HEAD -> master) HEAD@{0}: reset: moving to 36664
cf8c509 HEAD@{1}: reset: moving to HEAD~2
3666459 (HEAD -> master) HEAD@{2}: reset: moving to 36664
727063c HEAD@{3}: reset: moving to HEAD^
3666459 (HEAD -> master) HEAD@{4}: commit: append GPL
727063c HEAD@{5}: commit: add distributed
cf8c509 HEAD@{6}: commit (initial): wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ LS
readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ vim readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "add freeman"
[master c72d541] add freeman
 1 file changed, 1 insertion(+)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reflog
c72d541 (HEAD -> master) HEAD@{0}: commit: add freeman
3666459 HEAD@{1}: reset: moving to 36664
cf8c509 HEAD@{2}: reset: moving to HEAD~2
3666459 HEAD@{3}: reset: moving to 36664
727063c HEAD@{4}: reset: moving to HEAD^
3666459 HEAD@{5}: commit: append GPL
727063c HEAD@{6}: commit: add distributed
cf8c509 HEAD@{7}: commit (initial): wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ vim readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "add amei"
[master 9a3f0ae] add amei
 1 file changed, 1 insertion(+)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        LICENSE.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt LICENSE.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   LICENSE.txt
        modified:   readme.txt


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "understand how stage works"
[master d1c08de] understand how stage works
 2 files changed, 3 insertions(+)
 create mode 100644 LICENSE.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reflog
d1c08de (HEAD -> master) HEAD@{0}: commit: understand how stage works
9a3f0ae HEAD@{1}: commit: add amei
c72d541 HEAD@{2}: commit: add freeman
3666459 HEAD@{3}: reset: moving to 36664
cf8c509 HEAD@{4}: reset: moving to HEAD~2
3666459 HEAD@{5}: reset: moving to 36664
727063c HEAD@{6}: reset: moving to HEAD^
3666459 HEAD@{7}: commit: append GPL
727063c HEAD@{8}: commit: add distributed
cf8c509 HEAD@{9}: commit (initial): wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log
commit d1c08def7a21275663c9e945300a0d5660b8570c (HEAD -> master)
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 15:37:39 2019 +0800

    understand how stage works

commit 9a3f0aeca460e25c49202afc2f5f639ad21912ce
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 15:33:03 2019 +0800

    add amei

commit c72d5419f78da43bd2145a53f1833df66a3ff86a
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 15:31:12 2019 +0800

    add freeman

commit 366645993e23b17c3e5165ca4a36cd495d6d53ea
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 14:04:43 2019 +0800

    append GPL

commit 727063c16c49023c6f48f581f9392878b6326d87
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 13:41:11 2019 +0800

    add distributed

commit cf8c5099131d237f0c75e720e5bfb2c2271c39a1
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 11:07:50 2019 +0800

    wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ pwd
/f/practiceGit

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cd .git

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ ls
COMMIT_EDITMSG  config  description  HEAD  hooks/  index  info/  logs/  objects/  ORIG_HEAD  refs/

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ ls -au
./  objects/  index  ../  ORIG_HEAD  logs/  COMMIT_EDITMSG  config  HEAD  refs/  info/  hooks/  description

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ cat index
???bj???Up????Sl???
                LICENSE.txt]Sz??]S??????rbGJ[0d?+M?g??j? ?
readme.txtTREE2 0
Z?<?
\??????9??6??hz?K?o$???[HQ??
Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ ls
COMMIT_EDITMSG  config  description  HEAD  hooks/  index  info/  logs/  objects/  ORIG_HEAD  refs/

Administrator@LQ-PC MINGW64 /f/practiceGit/.git (GIT_DIR!)
$ cd ..

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat >> readme.txt ameilaile
cat: ameilaile: No such file or directory

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat >> ameilaile readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat >> readme.txt
ameilaile

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adaiameilaile

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git dif
git: 'dif' is not a git command. See 'git --help'.

The most similar commands are
        diff
        config
        difftool
        init

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff
warning: LF will be replaced by CRLF in readme.txt.
The file will have its original line endings in your working directory.
diff --git a/readme.txt b/readme.txt
index 62474a5..e7dda24 100644
--- a/readme.txt
+++ b/readme.txt
@@ -2,4 +2,4 @@ Git is a distributed version control system.
 Git is free software distributed under the GPL.
 freeman
 amei
-adai
\ No newline at end of file
+adaiameilaile

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt
warning: LF will be replaced by CRLF in readme.txt.
The file will have its original line endings in your working directory.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff --cached
diff --git a/readme.txt b/readme.txt
index 62474a5..e7dda24 100644
--- a/readme.txt
+++ b/readme.txt
@@ -2,4 +2,4 @@ Git is a distributed version control system.
 Git is free software distributed under the GPL.
 freeman
 amei
-adai
\ No newline at end of file
+adaiameilaile

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        ameilaile


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        ameilaile


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "git tracks changes"
[master 75d4406] git tracks changes
 1 file changed, 3 insertions(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff HEAD -- readme.txt
diff --git a/readme.txt b/readme.txt
index 91c9d27..d660e9d 100644
--- a/readme.txt
+++ b/readme.txt
@@ -4,4 +4,5 @@ freeman
 amei
 adai
 ameilaile
-Git tracks changes.
+Git tracks changes of files.
+

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "git tracks changes of files"
[master e4a8dda] git tracks changes of files
 1 file changed, 2 insertions(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reflog
e4a8dda (HEAD -> master) HEAD@{0}: commit: git tracks changes of files
75d4406 HEAD@{1}: commit: git tracks changes
d1c08de HEAD@{2}: commit: understand how stage works
9a3f0ae HEAD@{3}: commit: add amei
c72d541 HEAD@{4}: commit: add freeman
3666459 HEAD@{5}: reset: moving to 36664
cf8c509 HEAD@{6}: reset: moving to HEAD~2
3666459 HEAD@{7}: reset: moving to 36664
727063c HEAD@{8}: reset: moving to HEAD^
3666459 HEAD@{9}: commit: append GPL
727063c HEAD@{10}: commit: add distributed
cf8c509 HEAD@{11}: commit (initial): wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff
diff --git a/readme.txt b/readme.txt
index d660e9d..fd4d34e 100644
--- a/readme.txt
+++ b/readme.txt
@@ -5,4 +5,5 @@ amei
 adai
 ameilaile
 Git tracks changes of files.
+My stupid boss still prefers SVN.


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git ^C

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout -- readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff
diff --git a/readme.txt b/readme.txt
index d660e9d..01b2abb 100644
--- a/readme.txt
+++ b/readme.txt
@@ -5,4 +5,4 @@ amei
 adai
 ameilaile
 Git tracks changes of files.
-
+My stupid boss still prefers SVN.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git reset HEAD readme.txt
Unstaged changes after reset:
M       readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout -- readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt  test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ gif diff
bash: gif: command not found

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "add test.txt"
[master 7b1d890] add test.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log
commit 7b1d8902be4d5f045767d85a2fd668f41a8bb427 (HEAD -> master)
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 16:41:47 2019 +0800

    add test.txt

commit e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 16:10:37 2019 +0800

    git tracks changes of files

commit 75d44062698f2504c5f805e1781332563c64532e
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 16:02:11 2019 +0800

    git tracks changes

commit d1c08def7a21275663c9e945300a0d5660b8570c
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 15:37:39 2019 +0800

    understand how stage works

commit 9a3f0aeca460e25c49202afc2f5f639ad21912ce
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 15:33:03 2019 +0800

    add amei

commit c72d5419f78da43bd2145a53f1833df66a3ff86a
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 15:31:12 2019 +0800

    add freeman

commit 366645993e23b17c3e5165ca4a36cd495d6d53ea
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 14:04:43 2019 +0800

    append GPL

commit 727063c16c49023c6f48f581f9392878b6326d87
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 13:41:11 2019 +0800

    add distributed

commit cf8c5099131d237f0c75e720e5bfb2c2271c39a1
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 11:07:50 2019 +0800

    wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log --pretty=oneline
7b1d8902be4d5f045767d85a2fd668f41a8bb427 (HEAD -> master) add test.txt
e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a git tracks changes of files
75d44062698f2504c5f805e1781332563c64532e git tracks changes
d1c08def7a21275663c9e945300a0d5660b8570c understand how stage works
9a3f0aeca460e25c49202afc2f5f639ad21912ce add amei
c72d5419f78da43bd2145a53f1833df66a3ff86a add freeman
366645993e23b17c3e5165ca4a36cd495d6d53ea append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt  test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ rm test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git ststus
git: 'ststus' is not a git command. See 'git --help'.

The most similar command is
        status

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout -- test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt  test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt  test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ rm test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git rm test.txt
rm 'test.txt'

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    test.txt


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "remove test.txt"
[master 5abb8fb] remove test.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 test.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ls
LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ pwd
/f/practiceGit

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ssh-keygen -t rsa -C "730210520@qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Administrator/.ssh/id_rsa.
Your public key has been saved in /c/Users/Administrator/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:LiVe/BTbogiP4ZqX1AkJqQK1GLaGafBkTjnUHDcVdGo 730210520@qq.com
The key's randomart image is:
+---[RSA 2048]----+
|o+*=..oo+..      |
|=X*.o. . o       |
|==+o .  E .      |
|=   o  o   +     |
|.   oo..S + .    |
|   ..*o* + .     |
|   .o.= o .      |
|   oo  .         |
|  o.             |
+----[SHA256]-----+

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ ^C

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git remote add origin https://github.com/freeman511/practiceGit.git

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git push -u origin master
Logon failed, use ctrl+c to cancel basic credential prompt.
Username for 'https://github.com': freeman511
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/freeman511/practiceGit.git/'

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git push -u origin master
Counting objects: 29, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (22/22), done.
Writing objects: 100% (29/29), 2.23 KiB | 285.00 KiB/s, done.
Total 29 (delta 8), reused 0 (delta 0)
remote: Resolving deltas: 100% (8/8), done.
To https://github.com/freeman511/practiceGit.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff
diff --git a/readme.txt b/readme.txt
index d660e9d..91350ca 100644
--- a/readme.txt
+++ b/readme.txt
@@ -5,4 +5,4 @@ amei
 adai
 ameilaile
 Git tracks changes of files.
-
+origin git

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "add grigin git"
[master fe622f6] add grigin git
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git push origin master
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 311 bytes | 311.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/freeman511/practiceGit.git
   5abb8fb..fe622f6  master -> master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ echo "2019-08-15"
2019-08-15

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch dev

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
  dev
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout dev
Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git diff
diff --git a/readme.txt b/readme.txt
index 91350ca..9828eb8 100644
--- a/readme.txt
+++ b/readme.txt
@@ -6,3 +6,4 @@ adai
 ameilaile
 Git tracks changes of files.
 origin git
+Creating a new branch is quick.
\ No newline at end of file

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git commit -m "new branch"
[dev 32cdfde] new branch
 1 file changed, 1 insertion(+)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git puss
git: 'puss' is not a git command. See 'git --help'.

The most similar command is
        push

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push
fatal: The current branch dev has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin dev


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
ameilaile
Git tracks changes of files.
origin git
Creating a new branch is quick.
Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
ameilaile
Git tracks changes of files.
origin git

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git merge dev
Updating fe622f6..32cdfde
Fast-forward
 readme.txt | 1 +
 1 file changed, 1 insertion(+)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
  dev
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
ameilaile
Git tracks changes of files.
origin git
Creating a new branch is quick.
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch -d dev
Deleted branch dev (was 32cdfde).

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git bar
git: 'bar' is not a git command. See 'git --help'.

The most similar command is
        var

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout -b feature1
Switched to a new branch 'feature1'

Administrator@LQ-PC MINGW64 /f/practiceGit (feature1)
$ git branch
* feature1
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (feature1)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (feature1)
$ git commit -m "AND simple"
[feature1 912860e] AND simple
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (feature1)
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
  feature1
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git commit -m "& simple"
[master c259ab7] & simple
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.

Administrator@LQ-PC MINGW64 /f/practiceGit (master|MERGING)
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        practiceCMD.txt

no changes added to commit (use "git add" and/or "git commit -a")

Administrator@LQ-PC MINGW64 /f/practiceGit (master|MERGING)
$ git diff
diff --cc readme.txt
index 05d9eae,fafc903..0000000
--- a/readme.txt
+++ b/readme.txt
@@@ -6,4 -6,4 +6,8 @@@ ada
  ameilaile
  Git tracks changes of files.
  origin git
- Creating a new branch is quick & simple.
 -Creating a new branch is quick AND simple.
++<<<<<<< HEAD
++Creating a new branch is quick & simple.
++=======
++Creating a new branch is quick AND simple.
++>>>>>>> feature1

Administrator@LQ-PC MINGW64 /f/practiceGit (master|MERGING)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
ameilaile
Git tracks changes of files.
origin git
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1

Administrator@LQ-PC MINGW64 /f/practiceGit (master|MERGING)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
ameilaile
Git tracks changes of files.
origin git
Creating a new branch is quick and simple.
Administrator@LQ-PC MINGW64 /f/practiceGit (master|MERGING)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master|MERGING)
$ git commit -m "conflict fixed with and"
[master 4296d16] conflict fixed with and

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
freeman
amei
adai
ameilaile
Git tracks changes of files.
origin git
Creating a new branch is quick and simple.
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log --graph --pretty=oneline --abbrev-commit
*   4296d16 (HEAD -> master) conflict fixed with and
|\
| * 912860e (feature1) AND simple
* | c259ab7 & simple
|/
* 32cdfde new branch
* fe622f6 (origin/master) add grigin git
* 5abb8fb remove test.txt
* 7b1d890 add test.txt
* e4a8dda git tracks changes of files
* 75d4406 git tracks changes
* d1c08de understand how stage works
* 9a3f0ae add amei
* c72d541 add freeman
* 3666459 append GPL
* 727063c add distributed
* cf8c509 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch -d feature1
Deleted branch feature1 (was 912860e).

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$  git checkout -b dev
Switched to a new branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git diff
diff --git a/readme.txt b/readme.txt
index 28df45f..f62f605 100644
--- a/readme.txt
+++ b/readme.txt
@@ -6,4 +6,5 @@ adai
 ameilaile
 Git tracks changes of files.
 origin git
-Creating a new branch is quick and simple.
\ No newline at end of file
+Creating a new branch is quick and simple.
+new dev branch
\ No newline at end of file

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git add readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git commit -m "add merge"
[dev 6e7f3b7] add merge
 1 file changed, 2 insertions(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git diff

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git log --pretty=oneline
6e7f3b7181bc84154eee00a7e8be4f61aef819ee (HEAD -> dev) add merge
4296d16ae7263e651c7379002a71f599e8652351 (master) conflict fixed with and
c259ab7bd747212ce76f9cc1059dcc4dcb417fc7 & simple
912860e92dfa246f40917acfa025260de03d947a AND simple
32cdfde1f637e36baf83c2813d8c95216a27f48b new branch
fe622f6e4265dea8e757a4338315fca404c17b14 (origin/master) add grigin git
5abb8fb79d60df5446e5932ff2b24775dc1e7434 remove test.txt
7b1d8902be4d5f045767d85a2fd668f41a8bb427 add test.txt
e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a git tracks changes of files
75d44062698f2504c5f805e1781332563c64532e git tracks changes
d1c08def7a21275663c9e945300a0d5660b8570c understand how stage works
9a3f0aeca460e25c49202afc2f5f639ad21912ce add amei
c72d5419f78da43bd2145a53f1833df66a3ff86a add freeman
366645993e23b17c3e5165ca4a36cd495d6d53ea append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        practiceCMD.txt

nothing added to commit but untracked files present (use "git add" to track)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 4 commits.
  (use "git push" to publish your local commits)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
  dev
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'recursive' strategy.
 readme.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log
commit a511805ae0288ca84f955973ce997c59c2844398 (HEAD -> master)
Merge: 4296d16 6e7f3b7
Author: freeman <730210520@qq.com>
Date:   Thu Aug 15 14:08:02 2019 +0800
commit a511805ae0288ca84f955973ce997c59c2844398 (HEAD -> master)
Merge: 4296d16 6e7f3b7

    merge with no-ff

commit 6e7f3b7181bc84154eee00a7e8be4f61aef819ee (dev)
Author: freeman <730210520@qq.com>
Date:   Thu Aug 15 13:30:14 2019 +0800

    add merge

commit 4296d16ae7263e651c7379002a71f599e8652351
Merge: c259ab7 912860e
Author: freeman <730210520@qq.com>
Date:   Thu Aug 15 11:22:51 2019 +0800

    conflict fixed with and

commit c259ab7bd747212ce76f9cc1059dcc4dcb417fc7
Author: freeman <730210520@qq.com>
Date:   Thu Aug 15 11:16:15 2019 +0800

    & simple

commit 912860e92dfa246f40917acfa025260de03d947a
Author: freeman <730210520@qq.com>
Date:   Thu Aug 15 11:13:50 2019 +0800

    AND simple

commit 32cdfde1f637e36baf83c2813d8c95216a27f48b
Author: freeman <730210520@qq.com>
Date:   Thu Aug 15 10:58:27 2019 +0800

    new branch

commit fe622f6e4265dea8e757a4338315fca404c17b14 (origin/master)
Author: freeman <730210520@qq.com>
Date:   Wed Aug 14 18:39:45 2019 +0800

    add grigin git
bash: it: command not found

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ bash: gitd: command not found

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ bash: ginfewfew52gffwfwf: command not found

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone      Clone a repository into a new directory
   init       Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add        Add file contents to the index
   mv         Move or rename a file, a directory, or a symlink
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect     Use binary search to find the commit that introduced a bug
   grep       Print lines matching a pattern
   log        Show commit logs
   show       Show various types of objects
   status     Show the working tree status

grow, mark and tweak your common history
   branch     List, create, or delete branches
   checkout   Switch branches or restore working tree files
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   merge      Join two or more development histories together
   rebase     Reapply commits on top of another base tip
   tag        Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch      Download objects and refs from another repository
   pull       Fetch from and integrate with another repository or a local branch
   push       Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ LICENSE.txt  practiceCMD.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ /f/practiceGit

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (master)
a511805ae0288ca84f955973ce997c59c2844398 (HEAD -> master) merge with no-ff
6e7f3b7181bc84154eee00a7e8be4f61aef819ee (dev) add merge
4296d16ae7263e651c7379002a71f599e8652351 conflict fixed with and
c259ab7bd747212ce76f9cc1059dcc4dcb417fc7 & simple
912860e92dfa246f40917acfa025260de03d947a AND simple
32cdfde1f637e36baf83c2813d8c95216a27f48b new branch
fe622f6e4265dea8e757a4338315fca404c17b14 (origin/master) add grigin git
5abb8fb79d60df5446e5932ff2b24775dc1e7434 remove test.txt
7b1d8902be4d5f045767d85a2fd668f41a8bb427 add test.txt
e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a git tracks changes of files
75d44062698f2504c5f805e1781332563c64532e git tracks changes
d1c08def7a21275663c9e945300a0d5660b8570c understand how stage works
9a3f0aeca460e25c49202afc2f5f639ad21912ce add amei
c72d5419f78da43bd2145a53f1833df66a3ff86a add freeman
366645993e23b17c3e5165ca4a36cd495d6d53ea append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
  dev
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
6e7f3b7181bc84154eee00a7e8be4f61aef819ee (HEAD -> dev) add merge
4296d16ae7263e651c7379002a71f599e8652351 conflict fixed with and
c259ab7bd747212ce76f9cc1059dcc4dcb417fc7 & simple
912860e92dfa246f40917acfa025260de03d947a AND simple
32cdfde1f637e36baf83c2813d8c95216a27f48b new branch
fe622f6e4265dea8e757a4338315fca404c17b14 (origin/master) add grigin git
5abb8fb79d60df5446e5932ff2b24775dc1e7434 remove test.txt
7b1d8902be4d5f045767d85a2fd668f41a8bb427 add test.txt
e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a git tracks changes of files
75d44062698f2504c5f805e1781332563c64532e git tracks changes
d1c08def7a21275663c9e945300a0d5660b8570c understand how stage works
9a3f0aeca460e25c49202afc2f5f639ad21912ce add amei
c72d5419f78da43bd2145a53f1833df66a3ff86a add freeman
366645993e23b17c3e5165ca4a36cd495d6d53ea append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ ls
LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  issue-101
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ history
    1  git -version
    2  git --version
    3  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
    4  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
    5  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
    6  touch README.md
    7  git init
    8  git add README.md
    9  git commit -m "first commit"
   10  git remote add origin https://git.lqting.com/freeman/test.git
   11  git push -u origin master
   12  git config --global user.email
   13  touch .gitignore
   14  git pull
   15  git pull
   16  pull
   17  pull
   18  git pull
   19  pwd
   20  git init
   21  ls
   22  ls -ah
   23  vim .git
   24  git config user.name freeman
   25  git config user.email 730210520@qq.com
   26  vim .git
   27  cd .git
   28  ls
   29  vim config
   30  cd ..
   31  ls
   32  git add readme.txt
   33  git commit -m "wrote a readme file"
   34  ls
   35  vim readme.txt
   36  git status
   37  git diff readme.txt
   38  git commit -m "add distributed"
   39  git add readme.txt
   40  git status
   41  git commit -m "add distributed"
   42  git status
   43  git add readme.txt
   44  git commit readme.txt
   45  git commit -m "append GPL"
   46  git log
   47  git log --pretty=oneline
   48  git reset --hard HEAD^
   49  ls
   50  cat readme.txt
   51  git log
   52  git reset --hard 36664
   53  cat readme.txt
   54  git log --pretty=oneline
   55  git reset --hard HEAD~2
   56  cat readme.txt
   57  git reset --hard 366
   58  git reset --hard 36664
   59  cat readme.txt
   60  git reflog
   61  LS
   62  vim readme.txt
   63  cat readme.txt
   64  git add readme.txt
   65  git commit -m "add freeman"
   66  git reflog
   67  vim readme.txt
   68  git add readme.txt
   69  git commit -m "add amei"
   70  git status
   71  git add readme.txt LICENSE.txt
   72  git status
   73  git commit -m "understand how stage works"
   74  git status
   75  git reflog
   76  git log
   77  ls
   78  pwd
   79  cd .git
   80  ls
   81  ls -au
   82  cat index
   83  ls
   84  cd ..
   85  ls
   86  cat >> readme.txt ameilaile
   87  cat >> ameilaile readme.txt
   88  cat readme.txt
   89  cat >> readme.txt
   90  cat readme.txt
   91  git dif
   92  git diff
   93  git add readme.txt
   94  git diff
   95  git diff --cached
   96  git status
   97  git add readme.txt
   98  git status
   99  git status
  100  git commit -m "git tracks changes"
  101  git status
  102  git diff HEAD -- readme.txt
  103  git add readme.txt
  104  git commit -m "git tracks changes of files"
  105  git status
  106  git reflog
  107  git status
  108  git diff
  109  git checkout -- readme.txt
  110  git diff
  111  git diff
  112  git add readme.txt
  113  git diff
  114  git status
  115  git reset HEAD readme.txt
  116  git status
  117  git checkout -- readme.txt
  118  git status
  119  ls
  120  git add test.txt
  121  gif diff
  122  git commit -m "add test.txt"
  123  git log
  124  git log --pretty=oneline
  125  ls
  126  rm test.txt
  127  ls
  128  git ststus
  129  git status
  130  git checkout -- test.txt
  131  ls
  132  git status
  133  ls
  134  rm test.txt
  135  git status
  136  git rm test.txt
  137  git diff
  138  git status
  139  git commit -m "remove test.txt"
  140  ls
  141  git status
  142  pwd
  143  ssh-keygen -t rsa -C "730210520@qq.com"
  144  git remote add origin https://github.com/freeman511/practiceGit.git
  145  git push -u origin master
  146  git push -u origin master
  147  git diff
  148  git add readme.txt
  149  git commit -m "add grigin git"
  150  git push origin master
  151  echo "2019-08-15"
  152  git branch
  153  git branch dev
  154  git branch
  155  git checkout dev
  156  git branch
  157  git diff
  158  git add readme.txt
  159  git diff
  160  git commit -m "new branch"
  161  git puss
  162  git push
  163  git branch
  164  cat readme.txt
  165  git checkout master
  166  cat readme.txt
  167  git merge dev
  168  git branch
  169  cat readme.txt
  170  git diff
  171  git branch -d dev
  172  git bar
  173  git branch
  174  git checkout -b feature1
  175  git branch
  176  git add readme.txt
  177  git commit -m "AND simple"
  178  git checkout master
  179  git branch
  180  git add readme.txt
  181  git commit -m "& simple"
  182  git merge feature1
  183  git status
  184  git diff
  185  cat readme.txt
  186  cat readme.txt
  187  git add readme.txt
  188  git commit -m "conflict fixed with and"
  189  cat readme.txt
  190  git log --graph --pretty=oneline --abbrev-commit
  191  git branch -d feature1
  192  git branch
  193   git checkout -b dev
  194  git diff
  195  git add readme.txt
  196  git commit -m "add merge"
  197  git diff
  198  git log --pretty=oneline
  199  git status
  200  git branch
  201  git checkout master
  202  git branch
  203  git merge --no-ff -m "merge with no-ff" dev
  204  git log
  205  it
  206  gitd
  207  ginfewfew52gffwfwf
  208  git
  209  ls
  210  pwd
  211  git log --pretty=oneline
  212  git branch
  213  git checkout dev
  214  git branch
  215   git log --pretty=oneline
  216  ls
  217  pwd
  218  git clone git@github.com:freeman511/gitskills.git
  219  cd gitskills/
  220  ls
  221  ls
  222  touch test.txt
  223  vim test.txt
  224  git add test.txt
  225  git log
  226  git status
  227  git commit -m "add test.txt"
  228  git status
  229  git diff
  230  git push
  231  ls
  232  vim test.txt
  233  git diff
  234  git add
  235  git diff
  236  git add  test.txt
  237  git diff
  238  git commit -m "amei yes"
  239  git status
  240  git push
  241  ls
  242  git checkout -b dev
  243  git branch
  244  git checkout master
  245  git branch
  246  git status
  247  ls
  248  git branch
  249  git checkout master
  250  history

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git branch
  dev
  issue-101
* master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout dev
Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout -b feature-vulcan
Switched to a new branch 'feature-vulcan'

Administrator@LQ-PC MINGW64 /f/practiceGit (feature-vulcan)
$ git branch
  dev
* feature-vulcan
  issue-101
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (feature-vulcan)
$ ls
LICENSE.txt  readme.txt  vulcan.py

Administrator@LQ-PC MINGW64 /f/practiceGit (feature-vulcan)
$ git add vulcan.py

Administrator@LQ-PC MINGW64 /f/practiceGit (feature-vulcan)
$ git status
On branch feature-vulcan
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   vulcan.py


Administrator@LQ-PC MINGW64 /f/practiceGit (feature-vulcan)
$ git commit -m "add feature vulcan"
[feature-vulcan 3f66cdd] add feature vulcan
 1 file changed, 1 insertion(+)
 create mode 100644 vulcan.py

Administrator@LQ-PC MINGW64 /f/practiceGit (feature-vulcan)
$ git checkout dev
Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  feature-vulcan
  issue-101
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch -d feature-vulcan
error: The branch 'feature-vulcan' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch -D feature-vulcan
Deleted branch feature-vulcan (was 3f66cdd).

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch -d issue-101
error: The branch 'issue-101' is not fully merged.
If you are sure you want to delete it, run 'git branch -D issue-101'.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout issue-101
Switched to branch 'issue-101'

Administrator@LQ-PC MINGW64 /f/practiceGit (issue-101)
$ git status
On branch issue-101
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (issue-101)
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git log --pretty=oneline
10ba9172bfea2ac25c635bd5d8c012b9c3e59786 (HEAD -> master) merged bug fix 101
07c2d0130bbbf1bb5ef39c7cd80828bbcd78e010 (issue-101) fix bug 101
534b774b88de8c8195386df7b40b17cbd660cd57 (origin/master) add practiceCMD.txt
a511805ae0288ca84f955973ce997c59c2844398 merge with no-ff
6e7f3b7181bc84154eee00a7e8be4f61aef819ee add merge
4296d16ae7263e651c7379002a71f599e8652351 conflict fixed with and
c259ab7bd747212ce76f9cc1059dcc4dcb417fc7 & simple
912860e92dfa246f40917acfa025260de03d947a AND simple
32cdfde1f637e36baf83c2813d8c95216a27f48b new branch
fe622f6e4265dea8e757a4338315fca404c17b14 add grigin git
5abb8fb79d60df5446e5932ff2b24775dc1e7434 remove test.txt
7b1d8902be4d5f045767d85a2fd668f41a8bb427 add test.txt
e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a git tracks changes of files
75d44062698f2504c5f805e1781332563c64532e git tracks changes
d1c08def7a21275663c9e945300a0d5660b8570c understand how stage works
9a3f0aeca460e25c49202afc2f5f639ad21912ce add amei
c72d5419f78da43bd2145a53f1833df66a3ff86a add freeman
366645993e23b17c3e5165ca4a36cd495d6d53ea append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout dev
Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git log --pretty=oneline
713df748e818adfa311279da7240266a7c2a70b9 (HEAD -> dev) fix bug 101
01266a63bfb6827581eb4a0aea4df9ed1c42cc17 dev work
6e7f3b7181bc84154eee00a7e8be4f61aef819ee add merge
4296d16ae7263e651c7379002a71f599e8652351 conflict fixed with and
c259ab7bd747212ce76f9cc1059dcc4dcb417fc7 & simple
912860e92dfa246f40917acfa025260de03d947a AND simple
32cdfde1f637e36baf83c2813d8c95216a27f48b new branch
fe622f6e4265dea8e757a4338315fca404c17b14 add grigin git
5abb8fb79d60df5446e5932ff2b24775dc1e7434 remove test.txt
7b1d8902be4d5f045767d85a2fd668f41a8bb427 add test.txt
e4a8ddaaf547270caa295710dd2ed7c7c9a11c8a git tracks changes of files
75d44062698f2504c5f805e1781332563c64532e git tracks changes
d1c08def7a21275663c9e945300a0d5660b8570c understand how stage works
9a3f0aeca460e25c49202afc2f5f639ad21912ce add amei
c72d5419f78da43bd2145a53f1833df66a3ff86a add freeman
366645993e23b17c3e5165ca4a36cd495d6d53ea append GPL
727063c16c49023c6f48f581f9392878b6326d87 add distributed
cf8c5099131d237f0c75e720e5bfb2c2271c39a1 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ history
    1  git -version
    2  git --version
    3  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
    4  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
    5  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
    6  touch README.md
    7  git init
    8  git add README.md
    9  git commit -m "first commit"
   10  git remote add origin https://git.lqting.com/freeman/test.git
   11  git push -u origin master
   12  git config --global user.email
   13  touch .gitignore
   14  git pull
   15  git pull
   16  pull
   17  pull
   18  git pull
   19  pwd
   20  git init
   21  ls
   22  ls -ah
   23  vim .git
   24  git config user.name freeman
   25  git config user.email 730210520@qq.com
   26  vim .git
   27  cd .git
   28  ls
   29  vim config
   30  cd ..
   31  ls
   32  git add readme.txt
   33  git commit -m "wrote a readme file"
   34  ls
   35  vim readme.txt
   36  git status
   37  git diff readme.txt
   38  git commit -m "add distributed"
   39  git add readme.txt
   40  git status
   41  git commit -m "add distributed"
   42  git status
   43  git add readme.txt
   44  git commit readme.txt
   45  git commit -m "append GPL"
   46  git log
   47  git log --pretty=oneline
   48  git reset --hard HEAD^
   49  ls
   50  cat readme.txt
   51  git log
   52  git reset --hard 36664
   53  cat readme.txt
   54  git log --pretty=oneline
   55  git reset --hard HEAD~2
   56  cat readme.txt
   57  git reset --hard 366
   58  git reset --hard 36664
   59  cat readme.txt
   60  git reflog
   61  LS
   62  vim readme.txt
   63  cat readme.txt
   64  git add readme.txt
   65  git commit -m "add freeman"
   66  git reflog
   67  vim readme.txt
   68  git add readme.txt
   69  git commit -m "add amei"
   70  git status
   71  git add readme.txt LICENSE.txt
   72  git status
   73  git commit -m "understand how stage works"
   74  git status
   75  git reflog
   76  git log
   77  ls
   78  pwd
   79  cd .git
   80  ls
   81  ls -au
   82  cat index
   83  ls
   84  cd ..
   85  ls
   86  cat >> readme.txt ameilaile
   87  cat >> ameilaile readme.txt
   88  cat readme.txt
   89  cat >> readme.txt
   90  cat readme.txt
   91  git dif
   92  git diff
   93  git add readme.txt
   94  git diff
   95  git diff --cached
   96  git status
   97  git add readme.txt
   98  git status
   99  git status
  100  git commit -m "git tracks changes"
  101  git status
  102  git diff HEAD -- readme.txt
  103  git add readme.txt
  104  git commit -m "git tracks changes of files"
  105  git status
  106  git reflog
  107  git status
  108  git diff
  109  git checkout -- readme.txt
  110  git diff
  111  git diff
  112  git add readme.txt
  113  git diff
  114  git status
  115  git reset HEAD readme.txt
  116  git status
  117  git checkout -- readme.txt
  118  git status
  119  ls
  120  git add test.txt
  121  gif diff
  122  git commit -m "add test.txt"
  123  git log
  124  git log --pretty=oneline
  125  ls
  126  rm test.txt
  127  ls
  128  git ststus
  129  git status
  130  git checkout -- test.txt
  131  ls
  132  git status
  133  ls
  134  rm test.txt
  135  git status
  136  git rm test.txt
  137  git diff
  138  git status
  139  git commit -m "remove test.txt"
  140  ls
  141  git status
  142  pwd
  143  ssh-keygen -t rsa -C "730210520@qq.com"
  144  git remote add origin https://github.com/freeman511/practiceGit.git
  145  git push -u origin master
  146  git push -u origin master
  147  git diff
  148  git add readme.txt
  149  git commit -m "add grigin git"
  150  git push origin master
  151  echo "2019-08-15"
  152  git branch
  153  git branch dev
  154  git branch
  155  git checkout dev
  156  git branch
  157  git diff
  158  git add readme.txt
  159  git diff
  160  git commit -m "new branch"
  161  git puss
  162  git push
  163  git branch
  164  cat readme.txt
  165  git checkout master
  166  cat readme.txt
  167  git merge dev
  168  git branch
  169  cat readme.txt
  170  git diff
  171  git branch -d dev
  172  git bar
  173  git branch
  174  git checkout -b feature1
  175  git branch
  176  git add readme.txt
  177  git commit -m "AND simple"
  178  git checkout master
  179  git branch
  180  git add readme.txt
  181  git commit -m "& simple"
  182  git merge feature1
  183  git status
  184  git diff
  185  cat readme.txt
  186  cat readme.txt
  187  git add readme.txt
  188  git commit -m "conflict fixed with and"
  189  cat readme.txt
  190  git log --graph --pretty=oneline --abbrev-commit
  191  git branch -d feature1
  192  git branch
  193   git checkout -b dev
  194  git diff
  195  git add readme.txt
  196  git commit -m "add merge"
  197  git diff
  198  git log --pretty=oneline
  199  git status
  200  git branch
  201  git checkout master
  202  git branch
  203  git merge --no-ff -m "merge with no-ff" dev
  204  git log
  205  it
  206  gitd
  207  ginfewfew52gffwfwf
  208  git
  209  ls
  210  pwd
  211  git log --pretty=oneline
  212  git branch
  213  git checkout dev
  214  git branch
  215   git log --pretty=oneline
  216  ls
  217  pwd
  218  git clone git@github.com:freeman511/gitskills.git
  219  cd gitskills/
  220  ls
  221  ls
  222  touch test.txt
  223  vim test.txt
  224  git add test.txt
  225  git log
  226  git status
  227  git commit -m "add test.txt"
  228  git status
  229  git diff
  230  git push
  231  ls
  232  vim test.txt
  233  git diff
  234  git add
  235  git diff
  236  git add  test.txt
  237  git diff
  238  git commit -m "amei yes"
  239  git status
  240  git push
  241  ls
  242  git checkout -b dev
  243  git branch
  244  git checkout master
  245  git branch
  246  git status
  247  ls
  248  git branch
  249  git checkout master
  250  history
  251  git branch
  252  git checkout dev
  253  git checkout -b feature-vulcan
  254  git branch
  255  ls
  256  git add vulcan.py
  257  git status
  258  git commit -m "add feature vulcan"
  259  git checkout dev
  260  git branch
  261  git branch -d feature-vulcan
  262  git branch -D feature-vulcan
  263  git branch -d issue-101
  264  git checkout issue-101
  265  git status
  266  git checkout master
  267  git log --pretty=oneline
  268  git checkout dev
  269  git log --pretty=oneline
  270  history

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  issue-101
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch -D issue-101
Deleted branch issue-101 (was 07c2d01).

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git sta
git: 'sta' is not a git command. See 'git --help'.

The most similar commands are
        status
        stage
        stash

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git stage
Nothing specified, nothing added.
Maybe you wanted to say 'git add .'?

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git stash
No local changes to save

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git remote
origin

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$


Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git remote
origin

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git push
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 357 bytes | 357.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 2 local objects.
To https://github.com/freeman511/practiceGit.git
   534b774..10ba917  master -> master

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git staus
git: 'staus' is not a git command. See 'git --help'.

The most similar command is
        status

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git remote -v
origin  https://github.com/freeman511/practiceGit.git (fetch)
origin  https://github.com/freeman511/practiceGit.git (push)

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout dev
Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git remote -v
origin  https://github.com/freeman511/practiceGit.git (fetch)
origin  https://github.com/freeman511/practiceGit.git (push)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git checkout dev
Switched to branch 'dev'

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ ls
LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull
From https://github.com/freeman511/practiceGit
 * [new branch]      dev        -> origin/dev
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull remote dev
fatal: 'remote' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push dev
fatal: 'dev' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push origin dev
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 604 bytes | 302.00 KiB/s, done.
Total 6 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 1 local object.
remote:
remote: Create a pull request for 'dev' on GitHub by visiting:
remote:      https://github.com/freeman511/practiceGit/pull/new/dev
remote:
To https://github.com/freeman511/practiceGit.git
 * [new branch]      dev -> dev

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ pull
bash: pull: command not found

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/freeman511/practiceGit
   713df74..10a2cc2  dev        -> origin/dev
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull origin dev
From https://github.com/freeman511/practiceGit
 * branch            dev        -> FETCH_HEAD
Updating 713df74..10a2cc2
Fast-forward
 env.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 env.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ cat env.txt
env config
Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git add env.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ comm
comm.exe  command

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git commit -m "edit env.txt config2"
[dev f895738] edit env.txt config2
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push origin dev
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 316 bytes | 316.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/freeman511/practiceGit.git
   10a2cc2..f895738  dev -> dev

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$
Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push origin dev
To https://github.com/freeman511/practiceGit.git
 ! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to 'https://github.com/freeman511/practiceGit.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull origin dev
remote: Enumerating objects: 9, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 0), reused 5 (delta 0), pack-reused 0
Unpacking objects: 100% (5/5), done.
From https://github.com/freeman511/practiceGit
 * branch            dev        -> FETCH_HEAD
   f895738..39de585  dev        -> origin/dev
Updating f895738..39de585
Fast-forward
 env.txt | 1 -
 1 file changed, 1 deletion(-)
 delete mode 100644 env.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ ls
env2.txt  LICENSE.txt  readme.txt


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        env2.txt

nothing added to commit but untracked files present (use "git add" to track)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git add env2.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git commit -m "add env2"
[dev 3f19b61] add env2
 1 file changed, 2 insertions(+)
 create mode 100644 env2.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull origin dev
From https://github.com/freeman511/practiceGit
 * branch            dev        -> FETCH_HEAD
Already up to date.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ ls
env2.txt  LICENSE.txt  readme.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push origin dev
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 318 bytes | 318.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/freeman511/practiceGit.git
   39de585..3f19b61  dev -> dev

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ touch env3.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git add env3.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git commit -m "add new env3"
[dev 2a177a4] add new env3
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 env3.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push origin dev
To https://github.com/freeman511/practiceGit.git
 ! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to 'https://github.com/freeman511/practiceGit.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/freeman511/practiceGit
   3f19b61..5e348fd  dev        -> origin/dev
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev


Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch --set-upstream-to=origin/dev dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git pull
Merge made by the 'recursive' strategy.

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git status
On branch dev
Your branch is ahead of 'origin/dev' by 2 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push
Counting objects: 2, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 358 bytes | 358.00 KiB/s, done.
Total 2 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), done.
To https://github.com/freeman511/practiceGit.git
   5e348fd..95e1772  dev -> dev

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git add env3.txt

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git commit -m "edit env3"
[dev 4a41d11] edit env3
 1 file changed, 1 insertion(+)

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git push
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 253 bytes | 253.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/freeman511/practiceGit.git
   95e1772..4a41d11  dev -> dev

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ it log --graph --pretty=oneline --abbrev-commit
bash: it: command not found

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git log --graph --pretty=oneline --abbrev-commit
* 4a41d11 (HEAD -> dev, origin/dev) edit env3
*   95e1772 Merge branch 'dev' of https://github.com/freeman511/practiceGit into dev
|\
| * 5e348fd add env3
* | 2a177a4 add new env3
|/
* 3f19b61 add env2
*   39de585 del env.txt
|\
| * f895738 edit env.txt config2
* | 4198b3d test conflict
|/
* 10a2cc2 add env
* 713df74 fix bug 101
* 01266a6 dev work
* 6e7f3b7 add merge
*   4296d16 conflict fixed with and
|\
| * 912860e AND simple
* | c259ab7 & simple
|/
* 32cdfde new branch
* fe622f6 add grigin git
* 5abb8fb remove test.txt
* 7b1d890 add test.txt
* e4a8dda git tracks changes of files
* 75d4406 git tracks changes
* d1c08de understand how stage works
* 9a3f0ae add amei
* c72d541 add freeman
* 3666459 append GPL
* 727063c add distributed
* cf8c509 wrote a readme file

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git branch
* dev
  master

Administrator@LQ-PC MINGW64 /f/practiceGit (dev)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git tag v1.0

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git tag
v1.0

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$ git push origin v1.0
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/freeman511/practiceGit.git
 * [new tag]         v1.0 -> v1.0

Administrator@LQ-PC MINGW64 /f/practiceGit (master)
$
