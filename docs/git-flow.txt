Bash:
  git status - current branch and status
  git branch - current branch
  git checkout develop - switch to develop branch
  git pull origin develop - pull from develop branch
  git checkout -b "feature/new-feature" - create new branch
Do coding
  git status - watch changes
  git add .
  git commit -n -m "Done something"
  git pull origin develop

If conflicts: Resolve conflicts:
In WebStorm: VCS > Git > Resolve conflicts
Local (mine) changes - Target - remote changes
Apply
  git add .
  git commit -n -m "Resolve conflicts between feature/some-feature develop"
  git push origin feature/some-feature
