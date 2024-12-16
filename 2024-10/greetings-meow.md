# Pull Request

To experience the "pull request" functionality:

1. Fork a GitHub repository of another user.
2. Pull the forked repository to the local environment using `git pull`.
3. Create a new branch named 'dev', for example, execute `$ git switch -c dev`.
   The 'main' or'master' branch is typically reserved solely for releases.
4. Switch to the 'dev' branch and make relevant changes according to the
   README.md.
5. Return to the 'main/master' branch and update it to ensure it has the latest
   content: `git switch master; git pull`.
6. Merge the 'dev' branch into the 'main/master' branch: `git merge dev`.
7. If the main branch is already up-to-date, the `git merge` operation will run
   in fast-forward mode. Otherwise, after `git merge dev`, it may be necessary
   to use 'git rebase' to make the 'main' branch more linear and easier to
   read.
8. Push the latest update of 'master' branch to the fork repository on Github:`git push [origin master]` 
9. Click 'Pull request' menu
