```bash
# Build nix package locally.

# cd into cloned https://github.com/NixOS/nixpkgs

# Build package from default.nix inside nixpkgs. Will put result as ./result if succeeds
# i.e. nix-build -A watchexec -> will build watchexec package
nix-build -A <package>

# Install the build and put it `~/.nix-profile/bin`
nix-env -i ./result
```

```bash
# Garbage collect
sudo nix-collect-garbage --delete-older-than 30d
```
