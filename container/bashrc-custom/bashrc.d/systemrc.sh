alias list-services="systemctl list-unit-files"
alias enabled-services="systemctl list-unit-files | grep enabled"
alias running-services="systemctl | grep running | sed -e 's/   */\t/g'|column -t -s ' '"