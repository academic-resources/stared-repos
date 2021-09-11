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

**Config** is a basic checklist I follow to set up a new Ubuntu's development environment. It gets me up to speed with Git, Ruby, Node.js, GitHub, Jekyll, and more so I can more quickly get back to coding.

## Dotfiles

| File | Description |
| --- | --- |
| `.bashrc` | Customizes the Terminal prompt and echoes the currently checked out Git branch. |
| `.gitignore` | The Git ignore file that I use everywhere. |
| `.gitattributes` | The Git attributes file that I use everywhere. |

## Shell script (WIP)

This repository includes a shell script for executing the bulk of the configuration process. First, install and agree to terms for WSL, then download and run Windows Terminal. Then, enter the following in Terminal:

```bash
cd $Home && mkdir -p downloads && curl https://raw.githubusercontent.com/MilanAryal/config/master/config.sh > ~/dl/config.sh && bash ~/downloads/config.sh
```

## Table of contents

1. [Required](#1-required)
2. [Setup WSL](#2-setup-wsl)
3. [Prep WSL](#3-prep-WSL)
4. [Setup Ruby](#4-setup-ruby)
5. [Setup Node.js](#5-setup-nodejs)

## Checklist

### 1. Required

- [WSL2](https://aka.ms/wsl2),
  view [issues](https://github.com/microsoft/WSL/issues)

- Try the new cross-platform [PowerShell](https://aka.ms/pscore6),
  view source on [GitHub](https://github.com/PowerShell/PowerShell)

- [Microsoft Terminal](https://aka.ms/terminal),
  view source on [Github](https://github.com/microsoft/terminal)

- [Visual Studio Code](https://code.visualstudio.com/),
  view source on [Github](https://github.com/Microsoft/vscode).<br />
  Essential extension for VS Code: [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

- [GitHub Desktop](https://desktop.github.com/),
  view source on [Github](https://github.com/desktop/desktop)

- Setup GitHub Desktop cloning path:`\\wsl$\Ubuntu\home\milan\github`
(i.e. `\\wsl$\<distro_name>\home\<user_name>\github`)

### 2. Setup WSL

- Follow official updated steps to install WSL for Windows 10. See <https://docs.microsoft.com/en-us/windows/wsl/install-win10>.

_Forgot WSL password? See [https://aka.ms/wslusers](https://aka.ms/wslusers#reset-your-linux-password)._

### 3. Prep WSL

- Update and upgrade packages:

```bash
sudo apt update && sudo apt upgrade -y
```

- Install required dependencies:

```bash
sudo apt install -y build-essential procps curl file git zlib1g-dev
```

- Install [Homebrew](https://brew.sh/),
  view source on [Github](https://github.com/Homebrew/brew).
  See <https://docs.brew.sh/Homebrew-on-Linux>.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Setup `/home/linuxbrew/.linuxbrew/bin` in your PATH:

```bash
# See https://docs.brew.sh/linux for more information

# Add Homebrew to your PATH in /home/milan/.profile:
$ echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/milan/.profile

$ eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Install the Homebrew dependencies if you have sudo access:
$ sudo apt install -y build-essential

# We recommend that you install GCC:
$ brew install gcc

# Run `brew help` to get started
# Further documentation: https://docs.brew.sh
```

- Log out then log back in to confirm the install.

_**Caution**: Never attempt to edit Linux system files like .bashrc or .profile with a Windows text editor. Windows file metadata differs from Linux file metadata. You could corrupt or damage your Linux environment. Use Bash commands as above, or use a Linux text editor such as [nano or vi](https://www.pluralsight.com/blog/it-ops/linux-text-editors-vi-nano). You can also use a specialized Windows editor like [Notepad++](https://notepad-plus-plus.org/) that can save text as Unix script files._

### 4. Setup Ruby

- Install [rbenv](https://github.com/rbenv/rbenv) via Homebrew:

```bash
brew install rbenv
```

- Set up rbenv in your shell. Run `rbenv init`:

```bash
echo 'eval "$(rbenv init -)"' >> ~/.profile
```

- Add `~/.rbenv/bin` to your `$PATH` for access to the `rbenv` command-line utility:

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
```

- Verify rbenv is configured properly:

```bash
type rbenv
```

- Verify that rbenv is properly set up using _rbenv-doctor_ script:

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
```

- Download a version of Ruby via rbenv: See <https://gorails.com/setup/ubuntu/20.04>.

```bash
# Download a version of Ruby via rbenv:
$ rbenv install 2.7.3

# Make it the global version of Ruby: 
$ rbenv global 2.7.3

# Additional dependencies:
$ gem install bundler
```

- Ruby [dependencies](https://jekyllrb.com/docs/installation/ubuntu/#install-dependencies):

```bash
sudo apt install -y build-essential zlib1g-dev
```

_Installing and managing Ruby with rbenv allows us to specify versions of Ruby on a per-project basis. It also means we can avoid running sudo commands for installing gems and more as it's not affecting OS's system Ruby._

_Having trouble with nokogiri? See <https://stackoverflow.com/a/41491487>._

### 5. Setup Node.js

- Install [nodenv](https://github.com/nodenv/nodenv) via Homebrew:

```bash
brew install nodenv
```

- Set up nodenv in your shell. Run  `nodenv init`:

```bash
echo 'eval "$(nodenv init -)"' >> ~/.profile
```

- Add `~/.nodenv/bin` to your `$PATH` for access to the `nodenv` command-line utility:

```bash
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bashrc
```

- Verify nodenv is configured properly:

```bash
type nodenv
```

- Verify that nodenv is properly set up using _nodenv-doctor_ script:

```bash
curl -fsSL https://github.com/nodenv/nodenv-installer/raw/master/bin/nodenv-doctor | bash
```

- Download a version of Node.js via nodenv:

```bash
# Download a version of Node.js via nodenv:
$ nodenv install 14.17.0

# Make it the global version of Node.js: 
$ nodenv global 14.17.0

# https://www.npmjs.com/package/npm-check-updates
$ npm install -g npm-check-updates
```

- Node.js [dependencies](https://github.com/nodesource/distributions/blob/master/README.md#debinstall):

```bash
sudo apt install -y build-essential
```

_Installing and managing Node.js with nodenv allows us to specify versions of Node on a per-project basis. It also means we can avoid running sudo commands for installing global packages and more as it's not affecting OS's system Node.js._

<p align="right"><a href="#table-of-contents"><b>↥ To the top</b></a></p>
