PS1="\n\w: "
alias gedit="open -a gedit"
alias lsa="ls -a"
alias lsal="ls -alh"
alias server="python -m SimpleHTTPServer"
alias subl="open -a '/Applications/Sublime Text 2.app'"
export CLICOLOR=1
export LSCOLORS=GxFxCxDxBxegedabagaced
set -o vi

function can
{
	mv "$1" ~/.Trash
}

function wad
{
	cd ~/projects/wad
	subl .
	python -m SimpleHTTPServer &
	python -m webbrowser http://localhost:8000
}
### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:/usr/local/mysql/bin:$PATH"

