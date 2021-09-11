# ~/.config/bashrc/.bashrc_prompt

#  SETUP CONSTANTS

#### GIT && PS1

#    GIT_PS1_DESCRIBE_STYLE
#    Modifies the way detached HEAD is shown. Possible values are:
	#        contains:	Looks forward in the tree for a tag, so you know which tag you're behind
	#        branch:	Looks forward in the tree for a tag or a branch (whatever's nearest)
	#        describe:	Looks backwards in the tree for a tag, so you know which tag you're ahead of
	#        default:	If your exactly on a tag, display it. If the method you chose fails to find a tag/branch to display, you'll see the commit id instead.

#    GIT_PS1_SHOWCOLORHINTS
	#    __git_ps1 can be used to create the PS1 prompt and not just its own output. If that's the case, a non-empty value tells git to color the prompt according to the current state (dirty, untracked files...)

#    GIT_PS1_SHOWDIRTYSTATE
	#    Shows the "dirty" indicator - meaning whether you modified tracked files. Can be * for unstaged changes, + for staged changes, # for "no HEAD to compare against" (usually only happens before initial commit)

#    GIT_PS1_SHOWSTASHSTATE
	#    Shows the "stash" indicator - meaning whether you have files stashed.
	#    Looks like $

#    GIT_PS1_SHOWUNTRACKEDFILES
	#	Shows the "untracked" indicator - meaning whether you have untracked files (files that are in the working directory but haven't been added using git add to the repository).
	#    Looks like %

#    GIT_PS1_SHOWUPSTREAM
	#    Shows the difference between the upstream branch and the current branch. I only use "auto", meaning that I get the following values:
	#        < when behind (pull required)
	#        > when ahead (push required)
	#        <> when diverged (conflict resolution required)
	#        = when identical (no action is needed).
	#    This obviously requires a fetch the remote server from time to time.

#show current project and branch
GIT_PS1_SHOWDIRTYSTATE=true
GIT_PS1_SHOWSTASHSTATE=false
GIT_PS1_SHOWUNTRACKEDFILES=true
GIT_PS1_DESCRIBE_STYLE='contains'
GIT_PS1_SHOWUPSTREAM='auto'
#GIT_PS1_SHOWCOLORHINTS=true


#  Bunch-o-predefined colors.  Makes reading code easier than escape sequences.

# Reset
Color_Off="\[\033[0m\]"       # Text Reset

# Regular Colors
Black="\[\033[0;30m\]"        # Black
Red="\[\033[0;31m\]"          # Red
Green="\[\033[0;32m\]"        # Green
Yellow="\[\033[0;33m\]"       # Yellow
Blue="\[\033[0;34m\]"         # Blue
Purple="\[\033[0;35m\]"       # Purple
Cyan="\[\033[0;36m\]"         # Cyan
White="\[\033[0;37m\]"        # White

# Bold
BBlack="\[\033[1;30m\]"       # Black
BRed="\[\033[1;31m\]"         # Red
BGreen="\[\033[1;32m\]"       # Green
BYellow="\[\033[1;33m\]"      # Yellow
BBlue="\[\033[1;34m\]"        # Blue
BPurple="\[\033[1;35m\]"      # Purple
BCyan="\[\033[1;36m\]"        # Cyan
BWhite="\[\033[1;37m\]"       # White

# Underline
UBlack="\[\033[4;30m\]"       # Black
URed="\[\033[4;31m\]"         # Red
UGreen="\[\033[4;32m\]"       # Green
UYellow="\[\033[4;33m\]"      # Yellow
UBlue="\[\033[4;34m\]"        # Blue
UPurple="\[\033[4;35m\]"      # Purple
UCyan="\[\033[4;36m\]"        # Cyan
UWhite="\[\033[4;37m\]"       # White

# Background
On_Black="\[\033[40m\]"       # Black
On_Red="\[\033[41m\]"         # Red
On_Green="\[\033[42m\]"       # Green
On_Yellow="\[\033[43m\]"      # Yellow
On_Blue="\[\033[44m\]"        # Blue
On_Purple="\[\033[45m\]"      # Purple
On_Cyan="\[\033[46m\]"        # Cyan
On_White="\[\033[47m\]"       # White

# High Intensty
IBlack="\[\033[0;90m\]"       # Black
IRed="\[\033[0;91m\]"         # Red
IGreen="\[\033[0;92m\]"       # Green
IYellow="\[\033[0;93m\]"      # Yellow
IBlue="\[\033[0;94m\]"        # Blue
IPurple="\[\033[0;95m\]"      # Purple
ICyan="\[\033[0;96m\]"        # Cyan
IWhite="\[\033[0;97m\]"       # White

# Bold High Intensty
BIBlack="\[\033[1;90m\]"      # Black
BIRed="\[\033[1;91m\]"        # Red
BIGreen="\[\033[1;92m\]"      # Green
BIYellow="\[\033[1;93m\]"     # Yellow
BIBlue="\[\033[1;94m\]"       # Blue
BIPurple="\[\033[1;95m\]"     # Purple
BICyan="\[\033[1;96m\]"       # Cyan
BIWhite="\[\033[1;97m\]"      # White

# High Intensty backgrounds
On_IBlack="\[\033[0;100m\]"   # Black
On_IRed="\[\033[0;101m\]"     # Red
On_IGreen="\[\033[0;102m\]"   # Green
On_IYellow="\[\033[0;103m\]"  # Yellow
On_IBlue="\[\033[0;104m\]"    # Blue
On_IPurple="\[\033[10;95m\]"  # Purple
On_ICyan="\[\033[0;106m\]"    # Cyan
On_IWhite="\[\033[0;107m\]"   # White

# Various variables you might want for your PS1 prompt instead
Time12h="\T"
Time12a="\@"
PathShort="\w"
PathFull="\W"
NewLine="\n"
Jobs="\j"

## Sets base color around text
if [[ ${EUID} == 0 ]] ; then
  sq_color=$BRed
  sq_emblem="#"
else
  sq_color=$ICyan
  sq_emblem="\$"
fi

## Setup PS1 - split it off into segments for better understanding
#### First corner
PS1="\n$sq_color\342\224\214\342\224\200"
#### If failed command, show extra
PS1+="\$([[ \$? != 0 ]] && echo \"[$BRed\342\234\227$sq_color]\342\224\200\")"

#### If remote connection, show host
if [ -n "$SSH_CLIENT" ] || [ -n "$SSH_TTY" ]; then
  PS1+="[$BPurple\h$sq_color]"
  PS1+="\342\224\200"
fi

#### User
PS1+="[$BRed\u$sq_color]"
#### Connector bit
PS1+="\342\224\200"
#### CWD
PS1+="[$BGreen\w$sq_color]"
#### More corner bits
PS1+="\n$sq_color\342\224\224\342\224\200\342\224\200>"
#### Git cmd
PS1+='$(__git_ps1 " (%s) ")'
#### Last bit use $ or #(root)
PS1+="$sq_color$sq_emblem $Color_Off"

export PS1


unset sq_color
unset sq_emblem
