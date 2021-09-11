```viml
" Insert text in the end of each line
" s/ - substitute.
" $ - the end of the line.
" / - change it to.
" , - a comma.
:%s/$/,
```

```viml
" Lowercase line
Vu
```

```viml
" Find char backwards
F<char>
```

```viml
" Delete backwards until char
dT<char>
```

```viml
" Visually select until char
v/<char><return>
```

```viml
" Delete all lines in file
:%d
```

```viml
" Yank two inner words
" Yanks first and second words (with the trailing space) in the unnamed register
y2aw
```

```viml
" Delete until start of line
d0
```

```viml
" Yank entire file
:%y+
```

```viml
" Select entire block
Vat
```

```viml
" Visually select until end of line
v$
```

```viml
" Visually select paragraph or function
V}
```

```viml
" See whats in a buffer
" See insides of q buffer
:echo @q
```

```viml
" See registers
:registers
```

```viml
" Delete until end of file
VGx
```

```viml
" Visually select block
V%
```

```viml
" Start recording macro
" Record to register d
qd
```

```viml
" Delete char under cursor
x
```

```viml
" Yank inside tag. Can yank an XML tag for example
yat
```

```viml
" Make multi line search. https://vim.fandom.com/wiki/Search_across_multiple_lines
" Will carry over to new line
\_s
```

```viml
" Inclusive search
/foo/e
```

```viml
" Delete until searched string. Won't delete string itself.
d/string
```

```viml
" Search and replace
:%s/<search>/<replace>/g
```

```viml
" Run command on startup
" Run ':Goyo' on startup. Put it in .vimrc
autocmd VimEnter * Goyo"
```

```viml
" Insert text at start of each line in file
" Insert // at start of each line in file
:%s!^!//!
```

```viml
" Replay last macro
@@
```

```viml
" Delete until character
df<char>
```

```viml
" Centre current line
zz
```

```viml
" Put results of command into a register
" In normal mode, will put results of d$ command into _ (black hole register)
"_d$
```

```viml
" Run macro on whole file
:%normal @x " will run macro x
```
