#!/bin/bash

OS="${1}"
REPO_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Find the correct login script
if [ -f "${HOME}/.bashrc" ]; then
  login_script="${HOME}/.bashrc"
else
  login_script="${HOME}/.bash_profile"
fi

# Append to their login script to load the customizations
{
  echo
  echo "# PatrickDuncan's bash shell"
  echo "[ -f ${REPO_PATH}/main.bash ] && . ${REPO_PATH}/main.bash ${OS}"
} >> "${login_script}"

echo "I've been installed to ${login_script}"
