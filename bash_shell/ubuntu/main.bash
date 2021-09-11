#!/bin/bash

UBUNTU="${REPO_PATH}/ubuntu"

# Aliases
if [ -f "${UBUNTU}/aliases.bash" ]; then
  . "${UBUNTU}/aliases.bash"
fi
