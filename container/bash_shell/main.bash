#!/bin/bash

OS="${1}"
REPO_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

. "${REPO_PATH}/general/main.bash"

# Include the Operating System's customizations if its provided
[ "${OS}" ] && . "${REPO_PATH}/${OS}/main.bash"
