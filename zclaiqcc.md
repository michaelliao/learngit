##Notes for Git Learning.

###Some Commands
- $ git init --- initiate Git repository
- $ git add --- add changes to stage
- $ git commit -m "Message" --- clear the stage and commit to repository
- $ git reset --hard commit_id --- back to the last commit_id version, both repositor and working directory
- $ git checkout -- file --- checkout for the file on stage or repository
- $ git log --- show the commit logs
- $ git reflog --- show the histories of commit logs
- $ git status --- show the status of the working directory, especially the differences

- $ ssh-keygen -t rsa -C "zclaiqcc@hotmail.com" --- make sure you are in your user\user_name file
- $ git remote add origin<name> git@github.com:zclaiqcc/LearnGit.git --- add a remote repository to local
- $ git push -u origin master --- -u means to associate local master with the remote master and simplify the command for the future
- $ git remote rm origin
- $ git push origin master
- $ git clone git@github.com:zclaiqcc/Test.git

- $ git branch --- show branches
- $ git branch <branch_name> --- create a branch named <branch_name>
- $ git checkout <branch_name> --- switch to <branch_name>
- $ git checkout -b <branch_name> --- -b means if <branch_name> doesn't exits, create it.
- $ git merge <branch_name> --- merge <branch_name> to the current branch
- $ git branch -d <branch_name> --- delete <branch_name>

- $ git stash --- save the scene
- $ git stash -list --- show the saved scenes
- $ git stash apply/drop/pop --- apply and drop equals pop

- $ git remote [-v | --verbose]
- $ git pull
- $ git branch --set-upstream branch_name origin/branch_name

- $ git tag [-a]<tag_name> [commit_id] [-m] <Message>
- $ git show <tag_name>

###Some Concepts(Key Words)
- Git
- git bash
- Repository
- Working Directory
- Stage
- .ssh/id_rsa/id_rsa.pub
- branch/merge
- Github
- tag