/*
`Object.setPrototypeOf()` method sets the prototype (i.e, the
internal [[Prototype]] property) of a specified object to another
object or null.


WARNING: Changing [[Prototype]] of an object is, by the nature of
how modern JavaScript engines optimize property accesses, currently
a very slow operation in every browser and JS engine. In addition,
the effects of altering inheritance are subtle and far-flung, and
are not limited to simply the time spent in the `Object.setPrototypeOf(...)`
statement, but may extend to ANY code that has access to any object whose
[[Prototype]] has been altered.
 */

const unknownObject = Object.setPrototypeOf({}, null);

// POLYFILL

if (!Object.setPrototypeOf) {
	// does not work in IE
	Object.prototype.setPrototypeOf = function(obj, proto) {
		if (obj.__proto__) {
			obj.__proto__ = proto;
			return obj;
		} else {
			const Fn = function() {
				for (let key in obj) {
					Object.defineProperty(this, key, {
						value: obj[key],
					});
				}
			};
			Fn.prototype = proto;
			return new Fn();
		}
	}
}
