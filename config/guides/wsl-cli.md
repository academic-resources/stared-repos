# wsl-cli.md

## PowerShell command options

```text
$PSversionTable or $PSVersionTable.PSVersion    → Check your PowerShell Version
$host.version or get-host|Select-Object version → Alternative to check PowerShell Version
wsl                               → open default linux distro
wsl --list --verbose or wsl -l -v → list all distro and wsl version
wsl -d <distro_name>              → open required linux distro
wsl --set-version <distro_name> 2 → open linux distro in wsl2
wsl --set-version <distro_name> 1 → open linux distro in wsl1
wsl --set-default-version 2       → make wsl2 default
wsl --shutdown                    → terminate all WSL instances
```

## How to access your Linux (WSL) files in Windows 10?

There are two ways to access your Linux files. First, the easy one. From within the Windows Subsystem for Linux environment you want to browse, run the following command:

```text
explorer.exe .
```

You can also access them directly at a `\\wsl$` path. In File Explorer or any other Windows application that can browse files, navigate to the following path:

```text
\\wsl$
```

Or, simply `win key + r` → type `\\wsl$` → Press Enter

## [WSL2: Use the Linux file system for faster performance](https://docs.microsoft.com/en-us/windows/wsl/compare-versions)

In order to optimize for the fastest performance speed, be sure to store your project files in the Linux file system (not the Windows file system).

For example, when storing your WSL project files:
- Use the Linux file system root directory: `\\wsl$\Ubuntu\home\<user name>\Project`
- Not the Windows file system root directory: `C:\Users\<user name>\Project`

Project files that you are working with using a WSL distribution (like Ubuntu) must be in the Linux root file system to take advantage of faster file system access.

You can access your Linux root file system with Windows apps and tools like File Explorer. Try opening a Linux distribution (like Ubuntu), be sure that you are in the Linux home directory by entering this command: `cd ~`. Then open your Linux file system in File Explorer by entering (don't forget the period at the end): `explorer.exe .`

## [WSL Utilities](https://wslutiliti.es/)

```text
wslfetch - creates colorful wsl information
vmstat -s - virtual machine system usage stats
```

## [Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)

```text
# open vs code in wsl
code .

# to open a wsl window directly from a Windows prompt
# use the `--remote` command line parameter:
code --remote wsl+<distro name> <path in WSL>

# for example:
code --remote wsl+Ubuntu /home/jim/projects/c
```

## How to flush DNS in Ubuntu?

Install nscd using the following command if not yet

``` bash
sudo apt install nscd
```

Flush DNS Cache in Ubuntu by restarting the nscd

``` bash
sudo /etc/init.d/nscd restart
```
