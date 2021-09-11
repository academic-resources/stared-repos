// Array.prototype

/*
MUTATOR METHODS

+ copyWithin(target[, start[, end]])
copies a sequence of array elements within the array

+ fill(value[, start[, end]])
fills all the element of array from start index to end index with static value

+ pop()

+ push(element1[, ...[, elementN]])

+ reverse()

+ sort([compareFunction(a, b)])
default ASC, built upon converting elements into strings, then comparing
their sequences of UTF-16 code units values.
Time and space complexity of sort cannot be guaranteed as it depends
on the implementation.
compareFunction(a,b) defines sort order:
< 0: a comes first
> 0: b comes first
0: leaves unchanged with respect to each other

+ splice(start[, deleteCount[, item1[, item2[, ...]]]])
adds or removes elements from an array

+ unshift(element1[, ...[, elementN]])
adds one or more elements to the front of an array, returns new length
 */

/*
ACCESSOR METHODS
these methods do not modify the array
and return some representation of it.

+ concat([value1 [, ...[, valueN]]])
returns NEW array as result of joining this array with values

+ filter(callbackFn(element[, index[, array]])[, thisValue])
returns new array containing all elements of calling array for
which the provided callbackFn returns true

+ includes(valueToFind[, fromIndex])
true | false

+ indexOf(searchElement[, fromIndex])
returns index of first element equal to searchElement or -1

+ join([separator])
Joins all elements into a string

+ lastIndexOf(searchElement[, fromIndex])

+ slice([begin[, end]])
returns a new array with the section of the calling array

+ toString()

+ toLocaleString()
 */

/*
ITERATION METHODS
several methods take as arguments functions to be called back
while processing the array. When these methods are called,
the length of the array is sampled, and any element added
beyond this length from within the callback is not visited.

Other changes to the array (setting the value of or deleting an
element) may affect the results of the operation if the method
visits the changed element afterwards.

While specific behavior of these methods in such cases is
well-defined, you should not rely upon it so as not to
confuse others who might read your code. If you must
mutate the array, copy into a new array instead.

+ entries()
returns new Array Iterator object that contains key/value
pairs for each index in the array

+ every(callbackFn(element[, index[, array]])[, thisValue])
returns true if every element in this array satisfies testing callbackFn

+ find(callbackFn(element[, index[, array]])[, thisValue])
returns found index in the array if an element satisfies testing
callbackFn, or -1 if not found

+ findIndex(callbackFn(element[, index[, array]])[, thisValue])
returns found index in the array if an element satisfies testing
callbackFn, or -1 if not found

+ forEach(callbackFn(currentValue[, index[, array]])[, thisValue])
calls a callbackFn for each element in the array

+ keys()
returns a NEW Array Iterator that contains the keys for each index in array

+ map(callbackFn(currentValue[, index[, array]])[, thisValue])
creates NEW array with the results of calling callbackFn on every element

+ reduce(callbackFn(accumulator, currentValue[, index[, array]])[, initialValue])
apply a callbackFn against an accumulator for each value of the array (left-to-right)
as to reduce it to a single value

+ some(callbackFn(element[, index[, array]])[, thisValue])
returns true if at least one element in the array satisfies provided testing
callbackFn.

+ values()
returns NEW Array Iterator object that contains values for each index in array

+ [@@iterator]()
returns NEW Array Iterator object that contains values for each index in array
 */
