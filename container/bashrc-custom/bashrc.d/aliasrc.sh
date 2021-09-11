
################ DEVELOPMENT ALIASES
# powershell
alias powershell='pwsh'


setmyaliases() 
{
    # Program full paths
    local CURL="$(type -p curl)"
    local GCC_CONFIG="$(type -p gcc-config)"
    local NSLOOKUP="$(type -p nslookup)"
    local PORT="$(type -p port)"      # MacPorts
    local SED="$(type -p sed)"
    local SSH="$(type -p ssh)"
    local SUDO="$(type -p sudo)"
    local TAIL="$(type -p tail)"
    local WHICH="$(type -p which)"

    ### Aliases
    alias hist="history"
    # not sure this works
    # alias lastcmd="history |${TAIL} -1 |${SED} -e's/ *[0-9]* *//' "
    alias ll='ls ${LS_OPTIONS} -al'
    alias ls='ls ${LS_OPTIONS}'
    alias path='echo "${PATH}"'
    [[ -e "${CURL}" ]] && alias randpass="${CURL} -k https://intranet.erad.com/pwdgen.cgi"
    [[ -e "${GCC_CONFIG}" ]] && alias harden="${GCC_CONFIG} 2; source /etc/profile;"
    [[ -e "${GCC_CONFIG}" ]] && alias unharden="${GCC_CONFIG} 5; source /etc/profile;"
    [[ -e "${PORT}" ]] && alias port="${PORT} -v"       # MacPorts
    # [[ -e "${SSH}" ]] && alias ssh="${SSH} -Y"
    # The only reason (so far) for this sudo alias is because systemd
    # needs to have $SYSTEMD_LESS passed in, in order to use it.
    [[ -e "${SUDO}" ]] && alias sudo="${SUDO} -E"

    #history
    alias histOn='set -o history'
    alias histOff='set +o history'

    unset -f setmyaliases
		
		#df changed due to new default df behavior including memory filesystems.
		alias df='df -x tmpfs -x squashfs -x devtmpfs'
		alias mounts='cat /proc/mounts|cut -f1-3 -d" "|egrep -v "(squashfs|tmpfs|autofs|cgroup|cgroup2|devpts|proc|sysfs|tracefs|fusectl|fuse|fuse.gvfsd-fuse|configfs|rpc_pipefs|mqueue|pstore|securityfs|nsfs|debugfs|hugetlbfs)$"'

		alias hidestr="tr '[:alnum:]' 'x'"
		alias wgetraw="wget -q -O - "

		alias allservices="systemctl list-units --type=service"

		alias myplaybook="ansible-playbook --ask-vault-pass"
		alias askplaybook="ansible-playbook -K"

		alias tvars="env|egrep '^(back|ARM|TF)'|sort"

		alias view-cert="openssl x509 -text -noout -in "

		show_config() { cat "$1" |sed 's/=.*$/= ######/g'|sed 's/:.*$/: "####"/g'; }

		# convert a column of two alternating things into a two column table
    one2two() {
			awk '{printf "%s" (NR%2==0?RS:FS),$1} '
		}

		alias urldecode='python3 -c "import sys, urllib.parse as ul; \
    print(ul.unquote_plus(sys.argv[1]))"'

		alias urlencode='python3 -c "import sys, urllib.parse as ul; \
    print (ul.quote_plus(sys.argv[1]))"'

		# show git url
		alias git-remote-url='git config --get remote.origin.url'

		# upgrade pip modules
		alias pip-upgrade="python -m pip list --user --format=freeze | cut -f 1 -d = | xargs -n 1 -- python -m pip install -U"
		#alias pip-upgrade="python -m pip list --user --outdated --format=freeze | cut -f 1 -d = | xargs -n 1 -- python -m pip install -U"
}

setmyaliases
