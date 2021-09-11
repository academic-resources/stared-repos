# Count the words in an input string

## Input

This function takes a single string as an argument.

```
Hello, my cat. And my cat doesn't say "hello" back.
```

## Output

It returns a dictionary of words and their counts:

```
{'hello': 2, 'my': 2, 'cat': 2, 'and': 1, "doesn't": 1, 'say': 1, 'back': 1}
```

Case should be ignored. Output keys must be lowercase.

Key order in the dictionary doesn't matter.

Split the strings into words on any whitespace.

Ignore each of the following characters:

```
" : ; , . - + = / \ | [ ] { } ( ) * ^ &
```

If the input contains no ignored characters, return an empty dictionary.
