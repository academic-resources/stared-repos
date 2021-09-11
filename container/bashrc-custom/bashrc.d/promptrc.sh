__prompt_command() {
    local EXIT="$?"             # This needs to be first
    PS1=""

    local RCol='\[\e[0m\]'

    local Red='\[\e[0;31m\]'
    local Gre='\[\e[0;32m\]'
    local BGre='\[\e[1;32m\]'
    local BYel='\[\e[1;33m\]'
    local Yel='\[\e[0;33m\]'
    local BBlu='\[\e[1;34m\]'
    local Blu='\[\e[0;34m\]'
    local Pur='\[\e[0;35m\]'

    PS1+="${Yel}\u${BBlu}@\h${Blu}${RCol}:${Gre}\W"
    if [ $EXIT != 0 ]; then
        PS1+="${Red}(\$?)"      # Add red if exit code non 0
    fi

    PS1+="${BGre}$(__git_ps1 '(%s)')$ ${RCol}"
    export PS1
}

__prompt_command_pygit() {
    local EXIT="$?"             # This needs to be first
    PS1=""

    local RCol='\[\e[0m\]'

    local Red='\[\e[0;31m\]'
    local Gre='\[\e[0;32m\]'
    local BGre='\[\e[1;32m\]'
    local BYel='\[\e[1;33m\]'
    local Yel='\[\e[0;33m\]'
    local BBlu='\[\e[1;34m\]'
    local Blu='\[\e[0;34m\]'
    local Pur='\[\e[0;35m\]'

    # Add python virtual environment if it exists
    if [ -n "$VIRTUAL_ENV" ] ; then
        PS1+="${Pur}(${VIRTUAL_ENV##*/}) "
    fi

    PS1+="${Yel}\u${BBlu}@\h${Blu}${RCol}:${Gre}\W"
    if [ $EXIT != 0 ]; then
        PS1+="${Red}(\$?)"      # Add red if exit code non 0
    fi

    ## Add git branch if it exists
    PS1+="${BGre}$(__git_ps1 '(%s)')$ ${RCol}"
    export PS1
}
__prompt_command_odd() {
    local EXIT="$?"             # This needs to be first
    PS1=""

    local RCol='\[\e[0m\]'

    local Red='\[\e[0;31m\]'
    local Gre='\[\e[0;32m\]'
    local BGre='\[\e[1;32m\]'
    local BYel='\[\e[1;33m\]'
    local Yel='\[\e[0;33m\]'
    local BBlu='\[\e[1;34m\]'
    local Blu='\[\e[0;34m\]'
    local Pur='\[\e[0;35m\]'

    PS1+="👾${BBlu}@\h${Blu}${RCol}:${Gre}\W"
    if [ $EXIT != 0 ]; then
        PS1+="${Red}(\$?)"      # Add red if exit code non 0
    fi

    PS1+="${BGre}$(__git_ps1 '(%s)')$ ${RCol}"
    export PS1
}

__prompt_command_short() {
    local EXIT="$?"             # This needs to be first
    PS1=""

    local RCol='\[\e[0m\]'

    local Red='\[\e[0;31m\]'
    local Gre='\[\e[0;32m\]'
    local BGre='\[\e[1;32m\]'
    local BYel='\[\e[1;33m\]'
    local Yel='\[\e[0;33m\]'
    local BBlu='\[\e[1;34m\]'
    local Blu='\[\e[0;34m\]'
    local Pur='\[\e[0;35m\]'

    PS1+="${BBlu}\h${Blu}${RCol}"
    if [ $EXIT != 0 ]; then
        PS1+="${Red}(\$?)"      # Add red if exit code non 0
    fi

    PS1+="${BGre}$ ${RCol}"
    export PS1
}

__prompt_command_git()
{
    export GIT_PS1_SHOWDIRTYSTATE=1
    export GIT_PS1_SHOWCOLORHINTS=1
    export GIT_PS1_SHOWUNTRACKEDFILES=1

    export PROMPT_COMMAND=' __git_ps1 "\n[\e[33m][[\e[m]\A [\e[31m]\u[\e[m]@[\e[32m]\h [\e[34;01m]\l[\e[m] [\e[36m]\w[\e[m]" "[\e[33m]][\e[m]\n$ "'
}

alias short-prompt="PROMPT_COMMAND=__prompt_command_short"
alias long-prompt="PROMPT_COMMAND=__prompt_command"
alias odd-prompt="PROMPT_COMMAND=__prompt_command_odd"

PROMPT_COMMAND=__prompt_command_pygit # Func to gen PS1 after CMDs

