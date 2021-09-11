#!/bin/bash
# shellcheck disable=SC2139

LOG="git log --graph --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%ar%C(reset)%C(reset)%C(bold yellow)%d%C(reset)%n''              %C(white)%s%C(reset) %C(dim white)- %an%C(reset)'"

# ?
alias ..='cd ..'

# D
alias db='docker build'
alias dc='docker container'
alias dcl='docker container list -a'
alias dco='docker-compose'
alias dcp='docker container prune'
alias de='docker exec'
alias di='docker image'
alias dil='docker image list'
alias dl='docker logs'
alias dp='docker pull'
alias dps='docker ps'
alias dr='docker run'

# G
alias ga='git add'
alias gb='git branch'
alias gc='git checkout'
alias gcherry='git cherry-pick'
alias gclone='git clone'
alias gd='git diff'
alias gdd='git describe'
alias gf='git fetch -p'
alias gl="${LOG} -3"
alias gll="${LOG}"
alias glll="${LOG} --all"
alias gm='git commit -m'
alias gmend='git commit --amend'
alias gmerge='git merge'
alias gmote='git remote'
alias gp='git pull -p'
alias gpop='git stash pop'
alias gr='git rebase'
alias gs='git status'
alias gstash='git stash save -u'

# H
alias his='history | grep'

# L
alias ll='ls -GFhAl'
alias ls='ls -GFhA'

# P
alias profile='vim ~/.bash_profile'

# R
alias refresh='. ~/.bash_profile'
