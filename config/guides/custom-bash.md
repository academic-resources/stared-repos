# custom-bash.md

## Debain/ Ubuntu custom bash prompt

```bash
# ----------------------------------------------------------------------
# | Add the following line at the bottom of ~/.bashrc file             |
# | this will override the default configuration                       |
# ----------------------------------------------------------------------

# Add Git branch if its present to PS1
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

# $ _ Custom bash prompt
#
# Includes custom character for the prompt, path, and Git branch name.
export PS1='\[\e]0;${PWD##*/} — bash — ${COLUMNS}x${LINES}\a\]\[\033[00;35m\]→ \[\033[01;36m\]\w\[\033[01;33m\]$(parse_git_branch) \[\033[31m\]\$\[\033[0m\] '
```

`...`

```bash
# Print Linux distro without version, just only dist:
linux_distro() {
  cat /etc/issue | head -n +1 | awk '{print $1}'
}

# Add Git branch if its present to PS1
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
```

`...`

```bash
# $ _ Custom bash prompt
#
# Includes custom character for the prompt, path, and Git branch name.
export PS1='\[\e]0;${PWD##*/} — $(linux_distro) — ${COLUMNS}x${LINES}\a\]\[\033[00;35m\]→ \[\033[01;36m\]\w\[\033[01;33m\]$(parse_git_branch) \[\033[31m\]\$\[\033[0m\] '

# $ _ Custom bash prompt
#
# Includes custom character for the prompt, path, and Git branch name.
export PS1='\[\e]0;${PWD##*/} — $(linux_distro) — WSL\a\]\[\033[00;35m\]→ \[\033[01;36m\]\w\[\033[01;33m\]$(parse_git_branch) \[\033[31m\]\$\[\033[0m\] '

# $ _ Custom bash prompt
#
# Includes custom character for the prompt, path, and Git branch name.
export PS1='\[\e]0;${PWD##*/} [WSL: $(linux_distro)]\a\]\[\033[00;35m\]→ \[\033[01;36m\]\w\[\033[01;33m\]$(parse_git_branch) \[\033[31m\]\$\[\033[0m\] '
```

or, a community bash framework:
 - [Bash-it](https://github.com/Bash-it/bash-it)

or, create a custom PS1 variable for your bash:
 - [Bash Prompt Generator](https://github.com/Scriptim/bash-prompt-generator)
