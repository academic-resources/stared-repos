
detectDistro()
{
        if [[ -e /etc/redhat-release ]] ; then
                # The above file exists in Oracle Linux too (which
                # also has /etc/oracle-release), but I don't think
                # this file is in CentOS.
                DISTRO="redhat"
                #RELEASE="$(cat /etc/redhat-release)"
                # Clear the screen after logout is really annoying
                alias clear="echo \"Type 'clearr' to clear the screen\""
                alias clearr=/usr/bin/clear
                # Red Hat de-stupified
                unalias rm cp mv 2>/dev/null
                # A very interesting thing that RH does is change screen's
                # window titles via bash's $PROMPT_COMMAND .  I don't like it.
                export PROMPT_COMMAND=''
        elif [[ -e /etc/SuSE-release ]] ; then
                DISTRO="suse"
                #RELEASE="$(cat /etc/SuSE-release)"
                unaliasPath="unalias path"
                aliasPath="alias path=\"echo \${PATH}\""
        elif [[ "xDarwin" == "x$(uname)" ]] ; then
                DISTRO="macosx"
                local PREFIXSCRIPT="${HOME}/Gentoo/startprefix"
                if [[ -e "${PREFIXSCRIPT}" ]] ; then
                        if [[ "x${SHELL}" == "x/bin/bash" ]] ; then
                                "${PREFIXSCRIPT}"
                                return
                        else
                                DISTRO="macosx-gentoo"
                        fi
                fi
        elif [[ "xSunOS" == "x$(uname)" ]] ; then
                DISTRO="solaris"
        elif [[ -e /KNOPPIX ]] ; then
                DISTRO="knoppix"
                # Knoppix de-stupified
                unalias rm mv 2>/dev/null
        else case ${OSTYPE} in
                cygwin)
                        DISTRO="cygwin"
                        ;;
                NetWare)
                        DISTRO="netware"
                        ;;
                linux*)
                        DISTRO="linux"
                        ;;
                aix*)
                        DISTRO="aix"
                        ;;
                solaris*)
                        DISTRO="solaris"
                        ;;
                *)
                        DISTRO="unassigned"
                        ;;
                esac
        fi

        unset -f detectDistro
}  # detectDistro()

### Environment variables
setEnvVars()
{
        case ${DISTRO} in
                linux) 
                        export LS_OPTIONS='--color=auto'
                        ;;
                macosx)
                        # Other BSDs?
                        export LS_OPTIONS='-G'
                        ;;
                solaris)
                        # Other BSDs?
                        export LS_OPTIONS='-F'
                        ;;
                aix)
                        export LS_OPTIONS=''
                        [[ "screen" == "${TERM}" ]] && export TERM='xterm'
                        ;;
                solaris)
                        export LS_OPTIONS='-F'
                        ;;
                *)
                        export LS_OPTIONS='--color=auto'
                        ;;
        esac

        # LS_COLORS
        export LS_COLORS='*.Z=01;31:*.arj=01;31:*.bat=01;32:*.avi=01;35:*.bmp=01;35:*.btm=01;32:*.bz2=01;31:*.bz=01;31:*.cmd=01;32:*.com=01;32:*.cpio=01;31:*.csh=01;32:*.exe=01;32:*.deb=01;31:*.dl=01;35:*.fli=01;35:*.gif=01;35:*.gl=01;35:*.gz=01;31:*.jar=01;31:*.jpeg=01;35:*.jpg=01;35:*.lzh=01;31:*.mov=01;35:*.mp3=01;35:*.mpeg=01;35:*.mpg=01;35:*.ogg=01;35:*.pbm=01;35:*.pgm=01;35:*.png=01;35:*.ppm=01;35:*.rpm=01;31:*.sh=01;32:*.tar=01;31:*.taz=01;31:*.tga=01;35:*.tgz=01;31:*.tif=01;35:*.tiff=01;35:*.tz=01;31:*.wav=01;35:*.xbm=01;35:*.xcf=01;35:*.xpm=01;35:*.xwd=01;35:*.z=01;31:*.zip=01;31:bd=40;33;01:cd=40;33;01:di=01;34:do=01;35:ex=01;32:fi=00:ln=01;36:mi=01;05;37;41:no=00:or=40;31;01:pi=40;33:so=01;35:'
        local DIRCOLORS="$(type -p dircolors)"
        if [[ -x "${DIRCOLORS}" ]] ; then
                # Overwrites the above:
                eval "$(${DIRCOLORS})"
                # These (from above) were missing on Bodhi:
                export LS_COLORS+='*.bat=01;32:*.btm=01;32:*.cmd=01;32:*.com=01;32:*.csh=01;32:*.exe=01;32:*.sh=01;32:*.wav=01;35:fi=00:mi=01;05;37;41:no=00:'
        fi

        unset -f setEnvVars
}  # setEnvVars()

_add_to_path()
{
    local DIR="$1"
    [ -d "$DIR" ] && [[ ":${PATH}:" = *":${DIR}:"* ]] || {
        #echo "adding ${DIR} to path"
        export PATH="$PATH:$1"
    }
}

bashSettings()
{
        # use `vi' editing at the bash commandline
        set -o vi
        # Update COLUMNS and ROWS
        shopt -s checkwinsize
        # use directory spell checking for `cd'
        shopt -s cdspell
        # append to the history file
        shopt -s histappend
        # failed history substitions get another try
        shopt -s histreedit
        # the glob `**' will match all files and zero or more subdirs (BASH-4)
        [[ 4 -le ${BASH_VERSINFO} ]] && shopt -s globstar
        # hostname completion when '@' is involved
        shopt -s hostcomplete
        # make sure the TAB character does completion (esp in cygwin/screen)
        bind 'TAB: complete'
        export HISTIGNORE="&:ls:vault *:dir:cd:[bf]g:bash:alias:env:cd \.\.:ll:df:df -h:exit:pwd:clear:mount:umount:[ \t]*"
        export HISTCONTROL=ignoreboth:erasedups

        unset -f bashSettings
}  # bashSettings()

detectDistro  # must do this before loading all bash sub-files
setEnvVars

# we don't want to share with microsoft.
export FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=1
export DOTNET_CLI_TELEMETRY_OPTOUT=1

############# INCLUDE SCRIPTS *****************************
# source all scripts in the bashrc.d directory in the same
# path as this script named 'bashrc.d/*rc.sh'

__bashincludedir="$( dirname "${BASH_SOURCE}" )/bashrc.d"
# find all files in sub-dir to include
# use sed command to make sure all files end in newline
source <( find "${__bashincludedir}" -type f -name "*.sh" -exec sed -e '$s/$/\n/' "{}" \;)
unset __bashincludedir
