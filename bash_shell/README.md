## Bash Shell Customizations

[![Build Status](https://travis-ci.org/PatrickDuncan/bash_shell.svg?branch=master)](https://travis-ci.org/PatrickDuncan/bash_shell) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Tired of typing out commonly used commands like `git status`?

Tired of your shell not doing basic things like removing duplicates from your history?

Look no further!

### Requirements

* You shell must be `bash`
* `git` must be installed

### Installation

```bash
./quick-install.bash [OPERATING_SYSTEM]
```

* *[OPERATING_SYSTEM] is optional, you will only get `general` if you omit it*
* *[OPERATING_SYSTEM] must be one of the folders in this repo (other than `general`)*

### Tips

* You will not gain vim customizations if you already have `~/.vimrc`
* `~/.vimrc` will be created

### Credits

* [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy)
* [Git Completion](https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash)
* [Vimrc (basic)](https://raw.githubusercontent.com/amix/vimrc/master/vimrcs/basic.vim)

#### Linting

```
docker run -e SHELLCHECK_OPTS="-e SC1091 -e SC1090" -v "$PWD:/mnt" koalaman/shellcheck <Path_To_File>
```
