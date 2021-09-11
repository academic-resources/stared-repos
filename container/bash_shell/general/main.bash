#!/bin/bash

GENERAL="${REPO_PATH}/general"

# Prompt improvements
if [ -f "${GENERAL}/prompt.bash" ]; then
  . "${GENERAL}/prompt.bash"
fi

# Vim syntax coloring
if [ -f "${GENERAL}/basic.vim" ] &&
   [ ! -f ~/.vimrc ] &&
   [ ! -L ~/.vimrc ]
then
  ln -s "${GENERAL}/basic.vim" ~/.vimrc
fi

# Improved git diff
if [ -f "${GENERAL}/diff-so-fancy" ]; then
  PATH="${GENERAL}":$PATH
  git config --global core.pager "diff-so-fancy | less --tabs=4 -RFX"
fi

# Aliases
if [ -f "${GENERAL}/aliases.bash" ]; then
  . "${GENERAL}/aliases.bash"
fi

# Git Completion
if [ -f "${GENERAL}/git-completion.bash" ]; then
  . "${GENERAL}/git-completion.bash"
fi

# Make Git Completion with aliases
if [ -f "${GENERAL}/alias-git-completion.bash" ]; then
  . "${GENERAL}/alias-git-completion.bash"
fi

# Misc. functions
if [ -f "${GENERAL}/functions.bash" ]; then
  . "${GENERAL}/functions.bash"
fi
