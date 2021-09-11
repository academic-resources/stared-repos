/*
JSON object contains methods for parsing JavaScript Object Notation
and converting values to JSON. It can't be called or constructed.
 */

// JSON.parse(text [, reviver])
/*
Parse string text as JSON.
SyntaxError is thrown if any violations of the JSON syntax.
Reviver option allows for interpreting what the replacer
has used to stand in for other data types.
 */

// JSON.stringify(value[, replacer[, space]])
/*
Returns JSON, optionally including only certain properties
or replacing property values. Replacer options allows for
specifying other behavior.

Replacer can be a function that alters the behavior of the
process or an array of String and Number that serve as a
whitelist for selecting/filtering properties to be included.
 */
