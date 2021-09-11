# Modules

A module is a file contaning Python definitions and statements. The file name is the module name with the suffix `.py` appended. 

Within a module, the module's name is available as the value of the global variable __name__.

```
import <module_name>
import <module_name> as <custom_name>
```

Each module has its own private symbol table, which is used as the global symbol table by all functions defined in the module. Thus, the author of a module can use global variables in the module, without worrying about accidental clashes with a user's global variables.

You can import names from a module directly into the importing module's symbol table.

```
from <module_name> import <name1> <name2>
from <module_name> import <name1> as <custom_name>
from <module_name> import *
```

#### Executing modules as scripts

When you run a Python module with

```
python fibo.py <arguments>
```

The code in the module will be executed, just as if you imported it, but with the `__name__` set to `"__main__"`. That means that by adding this code at the end of your module you can make the file usable as a script as well as an importable module:

```python
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
```

# [Packages](https://docs.python.org/3/tutorial/modules.html#packages)

Packages are a way of struturing Python's _module namespace_ by using "_dotted module names_". For example, the module name `A.B` designates a submodule named `B` in a package named `A`.

When importing the package, Python searches through the directories on `sys.path` looking for te package subdirectory.

The `__init__.py` files are required to make Python treat directiories containing the file as packages. This prevents directories with a common name, such as `string` unintentionally hiding valid modules that occur later on the module search path. In the simplest case, `__init__.py` can just be an empty file, but it can also execute intialization code for the package or set `__all__` variable described later.

#### Intra-package references.

When packages are structured into subpackages, you can use absolute imports to refer to submodules of sibilings packages.

Suppose you have the following structure:

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

For example, if the module `sound.filters.vocoder` needs to use the `echo` module in the `sound.effects` package, it can use `from sound.effects import echo`.

You can also write relative imports:

```python
# sounds.filters.vocoder.py
from . import echo
from .. import formats
from ..filters import equalizer
```

