```bash
# Read function definition
whence -f ..

# See where the it was defined
whence -v
```

```bash
# Bind comand to alt key
# alt+i will run 'a' command.
# \e means opt key
bindkey -s '\ei' '^Ua^M'
```

```bash
# See what is binded to a key
# See what is binding to ⌃ + E
bindkey '^E'
```

```bash
# Run zsh without sourcing zshrc
zsh -f
```

```bash
# Set alias to external command
alias fin='command fd'
```

```bash
# List all bindings
bindkey
```





