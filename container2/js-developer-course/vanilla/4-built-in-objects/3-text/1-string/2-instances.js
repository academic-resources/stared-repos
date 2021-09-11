/*
INSTANCE's PROTOTYPE
String.prototype allows the addition of properties to a String object.

We separate methods between:
- Unrelated to HTML
- HTML wrapper methods (DEPRECATED)
 */

// String.prototype.constructor (READ ONLY)
// String.prototype.length (READ ONLY)

// UNRELATED TO HTML
/*
+ charAt(index)
+ charCodeAt(index) (UTF-16 code unit value)
+ codePointAt(pos) (UTF-16 encoded code point)
+ concat(str [, ...strN])
		combines text of two or more strings and returns a new string
+ includes(searchString [, position]):
		determines whether calling string contains searchString
+ endsWith(searchString [, length])
		determines whether string ends with searchString's characters
+ indexOf(searchValue [, fromIndex])
		returns index of first occurrence or -1
+ lastIndexOf(searchValue [, fromIndex])
		returns index of last occurrence or -1
+ localeCompare(compareString [, locales [, options]])
		returns number indicating whether compareString comes before, after or equivalent
+ match(regexp)
		match regular expression against a string
+ matchAll(regexp)
		returns iterator of all regexp's matches
+ normalize([form])
		returns unicode normalization form
+ padEnd(targetLength [, padString])
		pads current string from the end and returns new string
+ padStart(targetLength [, padString])
+ repeat(count)
+ replace(searchFor, replaceWith)
		searchFor may be a string or regexp, and replace a string or function
+ search(regexp)
+ slice(beginIndex [, endIndex])
		returns new string
+ split([sep, [, limit] ])
+ startsWith(searchString [, length])
+ substring(indexStart [, indexEnd])
+ toLocaleUpperCase( [locale, ...locales] )
+ toLowerCase()
+ toString()
+ toUpperCase()
+ trim()
+ trimStart()
+ trimLeft()
+ trimRight()
+ valueOf()
+ @@iterator()
 */
