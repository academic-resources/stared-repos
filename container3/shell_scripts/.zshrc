PROMPT=$'\n'"%?%t %~ %#: "

# vim bindings 
bindkey kk vi-cmd-mode
bindkey vv vi-cmd-mode
bindkey nuy vi-cmd-mode
bindkey tfw vi-cmd-mode

# basic aliases
alias ..="cd .."
alias ...="cd ../.."
alias l="ls"
alias sl="ls"
alias la=" ls -lah"
alias code="open -a '/Applications/Visual Studio Code.app'"

# git aliases
alias gts="git status"
alias gacm="git add -A; git commit -m"
alias gf="git fetch --all"
alias gpo="git pull origin"
alias gco="git checkout"
alias gb="git branch"
alias gba="git branch -a"
alias gl="git log --graph --all --decorate=full"

# docker aliases
alias dr="docker"
alias drc="docker-compose"

export CLICOLOR=1
LS_COLORS='di=1:fi=96:*.m=31:*.py=32:*.txt=36:*.out=35'



# Uncomment the following line to use case-sensitive completion.
  CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS=true

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

# source $ZSH/oh-my-zsh.sh

