# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# ----------------------------------------------------------------------
# | Add the following line at the bottom of ~/.bashrc file             |
# | this will override the default configuration                       |
# ----------------------------------------------------------------------

# $ _ Custom bash prompt
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Print Linux distro without version, just only dist:
linux_distro() {
  cat /etc/issue | head -n +1 | awk '{print $1}'
}

# Add Git branch if its present to PS1
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

# Includes custom character for the prompt, path, and Git branch name.
PS1='\[\e]0;${PWD##*/} — $(linux_distro) — WSL\a\]\[\033[00;35m\]→ \[\033[01;36m\]\w\[\033[01;33m\]$(parse_git_branch) \[\033[31m\]\$\[\033[0m\] '

# https://stackoverflow.com/a/14859615
function __ps1_newline_login {
  if [[ -z "${PS1_NEWLINE_LOGIN}" ]]; then
    PS1_NEWLINE_LOGIN=true
  else
    printf '\n'
  fi
}

PROMPT_COMMAND='__ps1_newline_login'
export PS1

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Atom alias (https://github.com/atom/atom/issues/18126#issuecomment-463226481)
atom() {
  target_path=$(wslpath -a -w $(readlink -f $1)) # resolve the path
  (/mnt/c/Windows/System32/cmd.exe /C "atom.cmd $target_path" &> /dev/null) # open the path
}

# rbenv
export PATH="$HOME/.rbenv/bin:$PATH"

# nodenv
export PATH="$HOME/.nodenv/bin:$PATH"
