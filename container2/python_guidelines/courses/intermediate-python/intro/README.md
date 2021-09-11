# Introduction

## Virtual Environment

We want a sanitized environment for our Python project, so it's not influenced by global/other project's dependencies, neither it influences with them.

See [venv documentation](https://docs.python.org/3/library/venv.html) for latest information.

You can create a virutal env running the following:
```
python -m venv /path/to/new/virtual/environment
```

Windows:
```
cd $home
cd myproject
env\scripts\activate
```

Mac/Linux:
```
cd ~/myproject
source env/bin/activate
```

## REPL

> Read-Eval-Print-Loop

This is our Python interpreter. We can launch it from vscode with `Cmd+Shift+P` and `Python> Start REPL`. We can also create and edit jupyter notebooks, just type `Jupyter` and see the available options.

You can also run your Python files with the same approach, `Cmd+Shift+P` and `Python> Run file in terminal`.

## Three most important commands

* `type(<var>)`: See var's class.
* `dir(<class>)`: See available methods.
* `help(<type | type.method)`: Documentation, exit with `q`.

