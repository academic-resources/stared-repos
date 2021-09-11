# apt-cli.md

## Essential apt commands

List most used commands: `apt`

Update OS packages: `sudo apt update -y && sudo apt upgrade -y`

List all packages: `apt list` && `apt list | more` && `apt list | grep foo`

To install package: `sudo apt install -y <package_name>`

To search package: `apt search <package_name>`

To know the package version before install: `apt policy <package_name>`

To know the package details: `apt show <package_name>`

To delete package and its dependecies: `apt --purge remove <package_name>`

Add repo: `sudo apt-add-repository <ppa: repo_name> && apt update`

Remove repo: `udo apt-add-repository -r <ppa: repo_name> && apt update`

Locate the executable file associated with a given command: `which -a [filename]`

Not to consider recommended packages as a dependency to install: `sudo apt --no-install-recommends` [...COMMAND]
