<p align="center">
  <img width="768" alt="wslfetch annotation 2020-07-05 102241" src="https://user-images.githubusercontent.com/9361180/86525639-9b270e80-bea9-11ea-9e01-631086c8dfc2.png" />  
</p>
<h1 align="center">Config</h1>
<p align="center">
  <a href="https://ubuntu.com/wsl">Ubuntu on WSL</a>
  <br />
  <a href="https://aka.ms/wsl"><em>Windows Subsystem for Linux (WSL)</em></a>
</p>
<div align="center">

[![License](https://img.shields.io/github/license/MilanAryal/config.svg?branch=master)](https://github.com/MilanAryal/config/blob/master/LICENSE)

</div><br />

**Config** is a basic checklist I follow to set up a new Ubuntu's development environment. It gets me up to speed with Git, Ruby, GitHub, Jekyll, and more so I can more quickly get back to coding.

## Dotfiles

| File | Description |
| --- | --- |
| `.bashrc` | Customizes the Terminal prompt and echoes the currently checked out Git branch. |
| `.gitconfig` | Global Git configuration to specify my name and email, shortcuts, colors, and more. |
| `.gitignore` | The Git ignore file that I use everywhere. |
| `.gitattributes` | The Git attributes file that I use everywhere. |

## Shell script (WIP)

This repository includes a shell script for executing the bulk of the configuration process. First, install and agree to terms for WSL, then download and run Windows Terminal. Then, enter the following in Terminal:

```bash
cd $Home && mkdir -p Downloads && curl https://raw.githubusercontent.com/MilanAryal/config/master/config.sh > ~/Downloads/config.sh && bash ~/Downloads/config.sh
```

## Table of contents

1. [Required apps for our projects](#1-required-apps-for-our-projects)
2. [Install WSL](#2-install-wsl)
3. [Prepare OS](#3-prepare-os)
4. [Setup Ruby and gems](#4-setup-ruby-and-gems)
5. [Setup Node.js](#5-setup-nodejs)

## Checklist

### 1. Required apps for our projects

- [WSL2](https://aka.ms/wsl2),
  view [issues](https://github.com/microsoft/WSL/issues),
  [https://aka.ms/wslusers](https://aka.ms/wslusers)
- Try the new cross-platform [PowerShell](https://aka.ms/pscore6),
  view source on [GitHub](https://github.com/PowerShell/PowerShell)
- [Microsoft Terminal](https://aka.ms/terminal),
  view source on [Github](https://github.com/microsoft/terminal)
- [Visual Studio Code](https://code.visualstudio.com/),
  view source on [Github](https://github.com/Microsoft/vscode)
- [GitHub Desktop](https://desktop.github.com/),
  view source on [Github](https://github.com/desktop/desktop)
- GitHub cloning path: <br />
  `\\wsl$\Ubuntu\home\milan\github` or <br />
  `\\wsl$\<distro_name>\home\<user_name>\github`
- [Homebrew](https://brew.sh/),
  view source on [Github](https://github.com/Homebrew/brew)

### 2. Install WSL

Follow official updated steps to install WSL for Windows 10
[here](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

### 3. Prepare OS

Update OS packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 4. Setup Ruby and gems

- [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/#apt)
with OS native apt

```bash
sudo apt update

sudo apt-get install -y ruby-full build-essential zlib1g-dev

ruby --version
```

- [Avoid installing Ruby Gems as the root user](https://jekyllrb.com/docs/installation/ubuntu/)

```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

- Ruby version manager
  - [rbenv](https://github.com/rbenv/rbenv)
  - [rvm](https://rvm.io/)
  - [Brightbox](https://www.brightbox.com/docs/ruby/ubuntu/) - Jekyll [install guide](https://jekyllrb.com/docs/installation/windows/#installation-via-bash-on-windows-10)

- [zlib](https://www.zlib.net/) for Nokogiri (鋸) Ruby gem

```bash
sudo apt install -y zlib1g zlib1g-dev
```

#### Install essential gems for our project

- Install [Bundler](https://bundler.io/) gem:

```bash
gem install bundler
```

- Place the `Gemfile` in the project folder and install gem:

```bash
bundle install
```

### 5. Setup Node.js

Install Node.js with OS native APT

```bash
sudo apt update -y

sudo apt install -y nodejs npm build-essential

nodejs --version
npm --version
```

Avoid installing npm global packages as the root user

```bash
echo '# Install npm global packages to ~/npm' >> ~/.bashrc
echo 'export PATH="$HOME/npm/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Node.js version manager
- [Install Node.js and npm from NodeSource](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- [nodenv](https://github.com/nodenv/nodenv)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

#### Setup [package.json](https://docs.npmjs.com/files/package.json) file

- Go to project file, and [create a package.json file](https://docs.npmjs.com/creating-a-package-json-file)
- Setup required [dependencies](https://docs.npmjs.com/files/package.json#dependencies)

- And install them via terminal

```bash
npm install
```

- Or, Install them directly via CLI

Eg. Install Webpack command line tools globally:

```bash
npm install -g webpack-cli
```

Eg. Install Webpack on a project folder (which install on `node_modules` folder)

```bash
npm install webpack webpack-cli --save-dev
```

To run package on project installed folder `npx webpack`

## Summary

```text
- ide
  + vs code
  + editorconfig extension

- git
  + github desktop

- wsl
  + ubuntu

- ruby
  + ruby-full
  + build-essential
  + bundler

- node.js
  + npm
  + build-essential
```

<p align="right"><a href="#table-of-contents"><b>↥ To the top</b></a></p>
