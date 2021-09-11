My Linux config files
=======================================


## zshrc

```
# install oh-my-zsh
https://github.com/robbyrussell/oh-my-zsh

# install others
brew install pyenv

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
brew install ccat
brew install thefuck
brew install tldr
```


## alias


```
ln -s ~/workspace/config/alias/zsh_aliases .zsh_aliases
ln -s ~/workspace/config/alias/git_aliases .git_aliases
```

## reference

- https://github.com/seebi/dircolors-solarized
