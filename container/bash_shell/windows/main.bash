#!/bin/bash

WINDOWS="${REPO_PATH}/windows"

# Aliases
if [ -f "${WINDOWS}/aliases.bash" ]; then
  . "${WINDOWS}/aliases.bash"
fi
