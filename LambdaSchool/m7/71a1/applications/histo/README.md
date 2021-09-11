# Draw a histogram of words in an input string

This is a variation of the "word count" exercise, with a focus on how to
sort the data in a dictionary.

## Input

This function takes a single filename string as an argument, e.g.

```
robin.txt
```

It should open the file, and work through it to produce the output.

(`robin.txt` is in this directory.)

## Output

Print a histogram showing the word count for each word, one hash mark
for every occurrence of the word.

Output will be first ordered by the number of words, then by the word
(alphabetically).

The hash marks should be left justified two spaces after the longest
word.

Case should be ignored, and all output forced to lowercase.

Split the strings into words on any whitespace.

Ignore each of the following characters:

```
" : ; , . - + = / \ | [ ] { } ( ) * ^ &
```

If the input contains no ignored characters, print nothing.

Sample output (truncated):

```
the              ################################################
and              ####################################
of               ###################################
a                ########################
with             #################
to               ################
robin            #############
he               ############
his              ############
that             ############
in               ###########
at               ##########
good             ##########
i                ##########
as               #########
for              #######
green            #######
thou             #######
upon             #######
ale              ######
all              ######
bow              ######
```

## Hints

Items: `.vgrzf()` zrgubq ba n qvpgvbanel zvtug or hfrshy.

Sorting: vg'f cbffvoyr sbe `.fbeg()` gb fbeg ba zhygvcyr xrlf ng bapr.

Sorting: artngvirf zvtug uryc jurer `erirefr` jba'g.

Printing: lbh pna cevag n inevnoyr svryq jvqgu va na s-fgevat jvgu
arfgrq oenprf, yvxr fb `{k:{l}}`
# you can print a variable field width in an f-string with
nested braces, like so `{x:{y}}`

(The hints are encrypted with ROT13. Google for `rot13 decoder` to see
them.)