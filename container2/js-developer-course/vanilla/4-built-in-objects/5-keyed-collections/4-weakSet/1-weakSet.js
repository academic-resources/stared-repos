/*
WeakSet objects are collections of objects where a object is UNIQUE
(may only occur once). Objects are not enumerable.

Main difference to the set:
+ Collections of OBJECTS ONLY, and not arbitrary values of any type.

+ WeakSet holds WEAK REFERENCES to objects in the collection. If there
is no other reference to an object stored in the WeakSet, they can be
garbage collected.

The use cases of WeakSet objects are limited. They will not leak memory,
so it can be safe to use DOM elements as a key and mark them for tracking
purposes, for example.

Same API as Set API.
 */
