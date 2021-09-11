#!/bin/bash

# Ignores duplicates in bash history (extend the life of your up arrow)
export HISTCONTROL=ignoreboth:erasedups

# Stops autocompleting incompatible types
complete -d cd
complete -d rmdir

# Prompt visuals
BRANCH() { # Get current git branch
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
FOLDER_COLOR() { # Change the folder and $ colour depending on the weekday
  WEEKDAY=$(date +%u)
  if [ "${WEEKDAY}" -lt 3 ]; then # Mon, Tues
    echo 1
  else
    echo "$((WEEKDAY - 1))"
  fi
}
CHECKMARK() {
  if [ $? = 0 ]; then
    echo '✔'
  else
    echo '✘'
  fi
}

export PS1="\$(CHECKMARK)\[\033[1;3\$(FOLDER_COLOR)m\]\W\[\033[1;36m\]\$(BRANCH)\[\033[1;3\$(FOLDER_COLOR)m\]$\[\033[m\] "
export CLICOLOR=1
export LSCOLORS=Gxfxcxdxbxegedabagacad
