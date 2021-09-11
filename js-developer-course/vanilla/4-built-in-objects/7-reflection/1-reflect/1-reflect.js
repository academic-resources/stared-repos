/*
`Reflect` is a built-in object that provides methods for interceptable
js operations. The methods are the same as those of proxy handlers.

Reflect is not a function object so it's not a constructor and cannot be
used with a new operator. All its properties and methods are static, just
like the Math object.
 */

/*
METHODS

+ apply(target, thisValue, argumentsList)
calls a target function as Function.prototype.apply

+ construct(target, argumentsList[, newTarget])
equivalent to calling `new target(...argumentsList)`, also
provides the option to specify a different prototype.

+ defineProperty(target, propertyKey, attributes)
returns true if the property was successfully defined

+ deleteProperty(target, propertyKey)
delete operator as a function, delete target[propertyKey]

+ get(target, propertyKey[, receiver])
returns value of property, target[propertyKey]

+ getOwnPropertyDescriptor(target, propertyKey)
similar to Object.getOwnPropertyDescriptor()

+ getPrototypeOf(target)

+ has(target, propertyKey)

+ isExtensible(target)

+ ownKeys(target)
returns an array of the target object's own (not inherited) property keys

+ preventExtensions(target)
similar to Object.preventExtensions(), returns true if successful

+ set(target, propertyKey, value[, receiver])
function that assigns values to properties, returns true if successful

+ setPrototypeOf(target, prototype)
 */
