# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# Adding environment variables in ~/.profile, will be effective
# the next time you log in or restart Terminal app.
# https://askubuntu.com/questions/121073/why-bash-profile-is-not-getting-sourced-when-opening-a-terminal#121075
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# brew
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# rbenv
eval "$(rbenv init -)"

# Add ~/.rbenv/bin to your $PATH for access to the rbenv command-line utility.
# $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc

# nodenv
eval "$(nodenv init -)"

# Add ~/.nodenv/bin to your $PATH for access to the nodenv command-line utility.
# $ echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bashrc
