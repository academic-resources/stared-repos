```bash
# Check if command is in PATH
checkDep() {
     path=`command -v ${1}` && echo "${1} found at ${path}" || { echo "${1} not found" >&2 ; exit 1; }
}
```

```bash
# Get output of command. https://www.cyberciti.biz/faq/unix-linux-bsd-appleosx-bash-assign-variable-command-output/
# i.e. save output of date to var now
now=$(date)
```

```md
File testing

![](https://i.imgur.com/QGkHbPm.png)
```

```bash
# Pipe output to file.
# i.e. pipe output of ls to output.txt
ls > output.txt
```

```bash
# Check if no arguments passed
if [ $# -eq 0 ] then ... fi
```

```bash
# Check if file does not exist
# Putting ! before makes it a not statement. Spaces before and after [] are important.
if [ ! -f ~/Desktop/file.txt ]; then
    echo "File not found!"
fi
```

```bash
# Source vs ./
# Runs the script as an executable file, launching a new shell to run it
./script

# Reads and executes commands from filename in the current shell environment
source script
```

```bash
# need to wrap the cd command inside () to run it in scope of the cd
# i.e. pod install will be run inside ios dir
(cd ios && pod install)
```
