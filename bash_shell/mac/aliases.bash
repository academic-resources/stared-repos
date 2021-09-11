#!/bin/bash

# A
alias atom="open -a 'Atom' ."

# I
alias ip="ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | grep -v '172.17.0.1'"

# L
alias ll='ls -GFhAlT'

# V
alias vscode="open -a 'Visual Studio Code' ."
