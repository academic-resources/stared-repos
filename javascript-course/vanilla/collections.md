# Built-in Collections

* Array
* Object
* Map
* WeakMap
* Set
* WeakSet

## Map

Holds key-value pairs and remembers the original insertion order of the keys. Any value may be used as either a key or a value.

A `Map` objet iterates its elements in insertion order, whereas a `for...of` loop returns an array `[key, value]` for each iteration.

## WeakMap

Same as map but __keys are weakly referenced__, and __must be objects__ (not primitive data types).

This means that they do not prevent __garbage collection__ in case there would be no other reference to the key objet. This is particularly useful when mapping keys to information about the key that is valuable only if the key has not been garbage collected.

Because the references are weak, `WeakMap` __keys are not enumerable__. There is no method to obtain a list of keys, if they were, the list would depend on the state of garbage collection, introducing non-determinism.

## Set

Stores unique values of any type, whether primitive values or object refereces. You can iterate through elements of a set in _insertion order_.

## WeakSet

Lets you store unique weakly held objects in a collection. Values __must be objects__.

This means that if no other references to an object stored in the `WeakSet` exist, those objects can be garbage collected.
