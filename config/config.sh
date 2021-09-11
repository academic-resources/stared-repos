#!/usr/bin/env bash

# Run
# $ mkdir GitHub && curl https://raw.githubusercontent.com/MilanAryal/config/master/config.sh > ~/GitHub/config.sh && bash ~/GitHub/config.sh

# Because Git submodule commands cannot operate without a work tree, they must
# be run from within $HOME (assuming this is the root of your dotfiles)
cd "$HOME"

# Ask for the administrator password upfront
sudo -v

# Keep-alive: update existing `sudo` time stamp until script has finished
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

#
# Color key
#

red=$'\e[1;31m'
green=$'\e[1;32m'
yellow=$'\e[1;33m'
blue=$'\e[1;34m'
magenta=$'\e[1;35m'
cyan=$'\e[1;36m'
end=$'\e[0m'

#
# Prep
#

bin_dir="/usr/local/bin"
work_dir="$HOME/work/"
github_dir="$HOME/GitHub/"
ruby_version="2.5.8"

printf "%s\n======================================================================\n%s" $yellow $end
printf "%s# Loading MilanAryal/config\n%s" $yellow $end
printf "%s======================================================================\n%s" $yellow $end

#
# System update & upgrade
#

sudo apt -y update && sudo apt -y upgrade && sudo apt -y full-upgrade

#
# Install packages
#

# Install software;
sudo apt -y install \
  git \
  ruby-full \
  nodejs \
  npm \

# Install development dependencies;
sudo apt -y install \
  build-essential \
  zlib1g-dev \

# Avoid installing Ruby Gems as the root user
# (https://jekyllrb.com/docs/installation/ubuntu/)

echo ''
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc # run . ~/.bashrc

#
# Install gems
#

gem install bundler

#
# Check versions
#

ruby --version
bundle --version
nodejs --version
npm --version

#
# $ _ Custom bash prompt
#

echo "" >> ~/.bashrc
echo "# Add Git branch if its present to PS1" >> ~/.bashrc
echo "parse_git_branch() {" >> ~/.bashrc
echo " git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'" >> ~/.bashrc
echo "}" >> ~/.bashrc

echo "" >> ~/.bashrc

echo "# $ _ Custom bash prompt" >> ~/.bashrc
echo "#" >> ~/.bashrc
echo "# Includes custom character for the prompt, path, and Git branch name." >> ~/.bashrc
echo "export PS1='\[\e]0;${PWD##*/} — $(linux_distro) — WSL\a\]\[\033[00;35m\]→ \[\033[01;36m\]\w\[\033[01;33m\]$(parse_git_branch) \[\033[31m\]\$\[\033[0m\] '" >> ~/.bashrc

echo "" >> ~/.bashrc

# Atom alias (https://github.com/atom/atom/issues/18126#issuecomment-463226481)
echo "# Atom alias (https://github.com/atom/atom/issues/18126#issuecomment-463226481)" >> ~/.bashrc
echo "atom() {" >> ~/.bashrc
echo "  target_path=$(wslpath -a -w $(readlink -f $1)) # resolve the path" >> ~/.bashrc
echo "  (/mnt/c/Windows/System32/cmd.exe /C "atom.cmd $target_path" &> /dev/null) # open the path" >> ~/.bashrc
echo "}" >> ~/.bashrc

source ~/.bashrc # run . ~/.bashrc

#
# Make directory
#

mkdir -p GitHub

#
# Alert
#

printf "%s\nInstall GitHub Desktop (https://desktop.github.io/)\n%s" $yellow $end
printf "%s\nSetup clonning local path → \\\\\wsl\$\\\<DISTRO_NAME>\\\home\\\<USER_NAME>\\\GitHub\n%s" $yellow $end

printf "%s\nFor more info visit → https://github.com/MilanAryal/config\n%s" $blue $end

#
# All done!
#

printf "%s\nWoohoo, all done!\n%s" $green $end
