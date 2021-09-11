#!/bin/bash

MAC="${REPO_PATH}/mac"

# Aliases
if [ -f "${MAC}/aliases.bash" ]; then
  . "${MAC}/aliases.bash"
fi
