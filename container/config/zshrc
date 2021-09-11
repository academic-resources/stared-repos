# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH=/Users/wklken/.oh-my-zsh
# brew --prefix
export BREW_PRFIX='/usr/local'

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
# ZSH_THEME="robbyrussell"
# ZSH_THEME="af-magic"
ZSH_THEME="af-magic-left"
# ZSH_THEME="agnoster"
# ZSH_THEME="avit"
# ZSH_THEME="candy"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
export UPDATE_ZSH_DAYS=7

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
HIST_STAMPS="yyyy-mm-dd"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
#
# ============================================

# plugins https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins
plugins=(history colored-man redis-cli autojump gem  cp bundler docker extract encode64 urltools wd httpie npm rails web-search pip python virtualenv supervisor virtualenvwrapper celery pyenv django ruby rbenv go zsh-256color zsh-syntax-highlighting zsh-autosuggestions history-substring-search zsh-completions svn git gitfast git-extras gitignore command-not-found sublime tmux tmuxinator brew osx dirhistory)

# dirhistory: option+arrow left, back to previous dir

# rsync  fabric  vi-mode rake rais rvm 
# extract - x解压

# ============================================

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
export LC_ALL='en_US.UTF-8'
export LANG='en_US.UTF-8'

# Preferred editor for local and remote sessions
export EDITOR='vim'
export PAGER=cat
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# source others
source ~/.zsh_aliases
source ~/.git_aliases

# diy config
DEFAULT_USER='ken'
export HISTFILE="$HOME/.history" #记录的文件
export HISTTIMEFORMAT='%F %T ' #格式 日期+命令
export HISTSIZE=20000
export HISTFILESIZE=20000
export SAVEHIST=$HISTSIZE
setopt hist_ignore_all_dups #忽略重复
# export HISTCONTROL=erasedups
export HISTCONTROL=ignorespace   # leading space hides commands from history
export HISTIGNORE="ls:ll:pwd:clear;ll"
# auto update
DISABLE_UPDATE_PROMPT=true
# ignore  some files
fignore+=(.pyc)
# 指定绑定键位为emacs，同bash
bindkey -e
# 关闭纠错 我很讨厌这个
unsetopt correct_all

# paths
export PATH=/usr/local/bin:$PATH:/bin:/sbin:/usr/sbin:/usr/local/sbin:/usr/bin:/opt/local/sbin:/Users/wklken/workspace/bin:/usr/local/git/bin:/usr/local/opt/rabbitmq/sbin
export PYTHONPATH=$PYTHONPATH:/Users/ken/github/luna

export GOROOT="/usr/local/Cellar/go/1.7.4_1/libexec"
export GOPATH=/Users/wklken/workspace/golang
export PATH=$PATH:${GOROOT}/bin:${GOPATH}/bin
#export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules/
# node npm
export PATH=$PATH:/usr/local/Cellar/node/7.5.0/bin/

# open alias
#alias -s py=vi
alias -s c=vi
alias -s java=vi
# alias -s js=vi
alias -s css=vi
alias -s txt=vi
alias -s md=vi
alias -s markdown=vi

#alias -s sh=vi
alias -s gz='tar -xzvf'
alias -s tgz='tar -xzvf'
alias -s zip='unzip'
alias -s bz2='tar -xjvf'
alias dbf='douban.fm'
# alias f="find . -name"
alias dis="python -m dis"

# alias
# update wiki
# alias upwiki="cd ~/wiki && ga -A && gc 'update wiki' && echo 'DONE'"
# use supervisord
# alias service="/usr/local/bin/supervisorctl -c /Users/ken/bin/service/supervisord.conf"

#===================================



# for mac dircolors
if brew list | grep coreutils > /dev/null ; then
  # replace to make more quick $(brew --prefix coreutils)
  PATH="/usr/local/Cellar/coreutils/8.26/libexec/gnubin:$PATH"
  alias ls='ls -F --show-control-chars --color=auto --hide="*.pyc"'
  eval `gdircolors -b $HOME/.dir_colors`
fi

# for virtualenv
# if [ -f /usr/local/bin/virtualenvwrapper.sh ]; then
#     export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python
#     export VIRTUALENVWRAPPER_VIRTUALENV=/usr/local/bin/virtualenv
#     export WORKON_HOME=$HOME/.virtualenvs
#     export VIRTUALENVWRAPPER_SCRIPT=/usr/local/bin/virtualenvwrapper.sh
#     # source /usr/local/bin/virtualenvwrapper.sh
#     source /usr/local/bin/virtualenvwrapper_lazy.sh
# fi


# others
# for nosetest
export NOSE_REDNOSE=1
# for docker
# for

# pyenv
# export PYENV_ROOT=/usr/local/var/pyenv
# if which pyenv > /dev/null; then eval "$(pyenv init -)"; fi
pyenv() {
    eval "$( command pyenv init - )"
    pyenv "$@"
}

# # for hh, https://github.com/dvorka/hstr
# export HH_CONFIG=hicolor         # get more colors
#shopt -s histappend              # append new history items to .bash_history
setopt histappend              # append new history items to .bash_history
export PROMPT_COMMAND="history -a; history -n; ${PROMPT_COMMAND}"   # mem/file sync




#=============== zsh plugin install begin =============

# zsh-syntax-hightlighting / zsh-autosuggestions

# D: zsh-syntax-highlighting
# git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# add zsh-syntax-highlighting to plugins

# D: zsh-autosuggestions
# git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
# add zsh-autosuggestions  to plugins
# bindkey '^ ' autosuggest-accept
# autosuggest-execute: Accepts and executes the current suggestion.
# autosuggest-clear: Clears the current suggestion.
# http://askubuntu.com/questions/558280/changing-colour-of-text-and-background-of-terminal
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=243'

# D: zsh-history-substring-search
# add zsh-history-substring-search to plugins
# git cl + ctrl'P
# bind P and N for EMACS mode
bindkey -M emacs '^P' history-substring-search-up
bindkey -M emacs '^N' history-substring-search-down

# D: zsh completion
# git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions
# add to zsh-completions plugin

# # auto completion
# fpath=(/usr/local/share/zsh-completions ~/.zsh/completion $fpath)
# # autoload -Uz compinit && compinit -i
# # On slow systems, checking the cached .zcompdump file to see if it must be
# # regenerated adds a noticable delay to zsh startup.  This little hack restricts
# # it to once a day.  It should be pasted into your own completion file.

# autoload -Uz compinit
# if [ $(date +'%j') != $(stat -f '%Sm' -t '%j' ~/.zcompdump) ]; then
#   compinit
# else
#   compinit -C
# fi


# for tool jump
# 简单直接有效
# http://jeroenjanssens.com/2013/08/16/quickly-navigate-your-filesystem-from-the-command-line.html
# export MARKPATH=$HOME/.marks
# #.markrc
# if [ -f ~/.markrc ]; then
        # . ~/.markrc
# fi
# function _completemarks {
  # reply=($(ls $MARKPATH))
# }
# compctl -K _completemarks jump
# compctl -K _completemarks unmark

# for autojump
[[ -s $BREW_PRFIX/etc/profile.d/autojump.sh ]] && . $BREW_PRFIX/etc/profile.d/autojump.sh
# alias g=j
# alias j=jump

# git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
# ~/.fzf/install
# ctrl+r /     vim **<tab> /kill -9 <tab> /    uset/export/unalias <tab>
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# for cat: https://github.com/jingweno/ccat
# brew install ccat
alias cat='ccat'

# thefuck: https://github.com/nvbn/thefuck
# alias f to the fuck
eval "$(thefuck --alias)"
eval "$(thefuck --alias f)"

# for tldr: https://github.com/tldr-pages/tldr
alias help='tldr'

#=============== zsh plugin install end =============

#=================== for proxy ================
if [ "$(networksetup -getairportnetwork en0 | awk '{print $4}')" = "Tencent-OfficeWiFi" ]; then
    export http_proxy=http://web-proxy.oa.com:8080
    export https_proxy=http://web-proxy.oa.com:8080
    export no_proxy="localhost,.oa.com,.ied.com,bking.com"
fi

export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles

#shell 翻墙
#proxy=http://127.0.0.1:8888
#export http_proxy=$proxy
#export https_proxy=$proxy
#export ftp_proxy=$proxy
