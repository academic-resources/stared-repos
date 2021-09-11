# git

```bash
# Cleanup .git http://gcc.gnu.org/ml/gcc/2007-12/msg00165.html
git repack -a -d --depth=250 --window=250

# Reset to previous commit
git reset HEAD~

# Reset to commit
git reset <commit hash> --hard

# Checkout previous commit
git checkout HEAD~

# Create new branch
git checkout -b

# Revert changes to modified files (working changes)
git reset --hard

# New branch without git history & files
git checkout --orphan

# Show where git configs get defined
git config --show-origin -l

# Undo last commit but don't throw away changes
git reset --soft HEAD^

# List all git submodules
git submodule--helper list

# Pull from PR
git pull origin pull/<issue ID>/head

# List remote branches
git branch -a

# Delete branch
git branch -d

# Delete remote branch
git push origin --delete

# Force overwrite git repo. https://stackoverflow.com/questions/10510462/force-git-push-to-overwrite-remote-files
git push -f <remote> <branch>

# Reset to specific commit
git reset --hard <commit>

# Remove dir from git
git rm --cached -r <dir>

# Rename previous commit
git commit --amend

# Force push overwrite
git push --force origin master

# Hard reset a branch
git reset --hard <branch-name>

# Change remote. i.e. when making a fork of a clone to change upstream destination.
git remote rename origin upstream; git remote rename nikitavoloboev origin

# Change upstream to my name so it pushes there
git branch --set-upstream-to nikitavoloboev/master master

# Show changes between commits. Where f5352 and be73 are unique commit hashes.
git diff f5352 be73

# Update submodule
git submodule update

# Set PGP key for Git globally. <key> = fingerprint w/o spaces
git config --global user.signingkey <key>
```

```bash
# Delete commit from remote.

# 1. Delete commit from local repo
git reset --hard HEAD~1

# 2. Delete commit from remote repo (can get commit using git log)
git push -f origin last_known_good_commit:branch_name
```

### Change old commit message

```bash
#
# It is bad practice to rewrite history. Works best if no one has pushed commits on top of remote branch you want to rewrite history of.

# 1. Rebase to commit you want to change (~1 means the first ancestor of the specified commit)
git rebase -i <hash>~1

# Can also do this
git rebase -i HEAD~4 # where HEAD~4 = last 3 commits

# 2. Rename pick to reword (in opened editor) & save/quit

# 3. Change commit message in editor and save

# 4. Overwrite and remove duplicate commits
git push --force-with-lease
```

### [Quickly pull down PRs](https://davidwalsh.name/5-essential-git-commands-and-utilities)

```bash
git config --global --add alias.pr '!f() { git fetch -fu ${2:-upstream} refs/pull/$1/head:pr/$1 && git checkout pr/$1; }; f'

git config --global --add alias.pr-clean '!git checkout master ; git for-each-ref refs/heads/pr/* --format="%(refname)" | while read ref ; do branch=${ref#refs/heads/} ; git branch -D $branch ; done'
```
