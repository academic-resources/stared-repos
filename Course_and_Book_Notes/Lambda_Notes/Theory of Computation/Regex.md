`myRegex = /Hello/` <- literal string!
`myString = "Hello, world"`
`myRegex.test(myString)`

### test () checks if string contains something matching regex and returns true or false

`|` <--- pipe (can be used for 'or')

### Flags

Appended to regex to modify rules
`i` = ignore case/case insensitive
`g` = global (to search for pattern more than once)

### Match

Extracts matches found in regex

`myString.match(myRegex)`

###. (dot) - Wildcard!
`.` <--- period/dot = matches any one character

## Character Sets

When you want to have several options for a character (like 'or')
Example:
`/b[aiu]g/` would match bag, big, and bug
Inside character set, you can use a hyphen to define a range

## Negated Set

Match anything other than defined (use carat ^)
Example:
`/[^aeiou]/gi` matches anything not a vowel

###+
To match a character or group of characters that appear one or more times in a row, use `+`
Example:
`/a+/g` would return 'a' for 'abc', 'aa', for 'aabc', 'a' for 'abab' and no match for 'bed'

###_ (Asterisk)
To match zero or more occurrences, use _

Note to future self: Regex is character by character. If you see `/an*/ig`, that's really saying "look for a and it may or may not be followed by an 'n'" - works like a wildcard
Asterisk can be used on character sets unlike wildcard dot (which only works iwth a single character)

##Greedy match:
Longest possible match (default for regular expressions)

##Lazy match:
Smallest possible part that satisfies regex pattern

Example:
`myString = "titantic"`
`myRegex = /t[a-z]*i/` would return "titanti"
`myRegex = /t[a-z]*?i/` would return "ti"

##$ (Anchor):
Anchor character searches for pattern at the end of a string.

## Shorthand Character Classes:

`\w` is a shorthand equivalent to `[A-Za-z0-9_]`
`\W` is shorthand equivalent to `[^A-Za-z0-9_]`
`\d` is shorthand equivalent to `[0-9]`
`\D` is shorthand equivalent to `[^0-0]`
`\s` matches whitespace, carriage return, tab, form feed, newline - similar to `[\r\t\f\n\v]`
`\S` is similar to `[^\r\t\f\n\v]`

##Quantity Specifiers:
Range of repeat characters {num1, num2}
Example:
// match only if letter 'a' appears between 3 and 5 times in 'ah'
`myRegex = /a{3, 5}h/`

To specify only lower limit, {num, }
To specify the exact number of matches, {num}

###?
To check for zero or more of a character

##Lookaheads:
Checks to see if something is there, but doesn't match it.

###Positive Lookahead (?= char):
Checks that an element is there

###Negative Lookahead (?! char):
Checks that an element is not there

##Capture Group:
Things in parentheses.
Each capture group is numbered and can follow them with their number to indicate placement (so the number becomes like a variable reference).
Example:
`/(waka) \1 \1 \1 sometimes maybe/gi` matches:
"waka waka waka waka sometimes maybe"
