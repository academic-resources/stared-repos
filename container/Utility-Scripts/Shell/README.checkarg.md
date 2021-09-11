 
 *Use it in bash scripts to check if minimal count of argument was given
 *Bash color definitions included.

 *Example:
 *checkarg $# 2 "Examplecommand" "Please specify at least 2 arguments: source, destination[, parameters]"
 
 *If  enough arguments are not given, the error message will be printed

 example is also included in the script for understanding how this function works
 if the example is deleted then someone could include this function by writing 
 
an example (copy these to a shell console)

 . checkarg 
 checkarg $# 2 "Examplecommand" "Please specify at least 2 arguments: [source, destination]"


