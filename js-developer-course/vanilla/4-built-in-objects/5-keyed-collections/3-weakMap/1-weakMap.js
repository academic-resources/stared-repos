/*
WeakMap object is a collection of key/value pairs
in which the keys are weakly referenced.
The KEYS MUST BE OBJECTS and the values can be arbitrary
values.

The object references in the keys are held WEAKLY, meaning
that hey are a target of GARBAGE COLLECTION if there is no
other reference to the object anymore.

WeakMap API is the same as the Map API.

One difference is that WeakMap keys are not enumerable
 */

/*
WHY WEAKMAP?

In Map API, we can have memory leak inconvenience because the
arrays (keys and values) ensure that references to each key and each
value are maintained indefinitely. These references prevent the keys
and values from being garbage collected, even if there are no other
references to the object.

By contrast, native WeakMaps hold "weak" references to key objects, which
means that they do not prevent garbage collection in case there would be
no other references to the key object.

Native WeakMaps can be particularly useful constructs when mapping
keys to information about the key that is valuable only if the key
has not been garbage collected.
 */

/*
EXAMPLE CASE

One use case of WeakMap objects is to store private data for an object,
or to hide implementation details. Private data and methods belong inside the
object and are stored in the privates WeakMap object. Everything exposed on the
instance and prototype is public, everything else is inaccessible from the
outside world because privates is not exported from the module.
 */

const privates = new WeakMap();

function Public() {
	const me = {
		// Private data goes here
	};
	privates(this, me);
}

Public.prototype.method = function () {
	const me = privates(this);
	// do stuff with private data in 'me'
};
