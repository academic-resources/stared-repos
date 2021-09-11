# Inheritance and Prototype Chain

* [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

When it comes to inheritance, JS only has one construct: _objects_. Each object has a private property which holds a link to another object called its __prototype__, which has a prototype of its own, and so on until an object is reached with `null` as its prototype. By definition, `null` has no prototype, and acts as the final link in this __prototype chain__.

While this confusion is often considered to be one of JS's weaknesses, the prototypal inheritance mode itself is, in fact, more powerful than the classic model. It is, for example, fairly trivial to build a classic model on top of a prototype model.

## Note on ECMAScript standard

The notation `someObject.[[Prototype]]` is used to designate the prototype of `someObject`. Since ECMAScript 2015, the `[[Prototype]]` is accessed using the accessors `Object.getPrototypeOf()` and `Object.setPrototypeOf()`. This is equivalent to the JS property `__proto__` which is non-standard but de-facto implemented by many browsers.

It should not be confused with the `func.prototype` property of functions, which instead specifies the `[[Prototype]]` to be assigned to _all instances_ of objects created by the given function when used as a constructor. The `Object.prototype` property represents the `Object` prototype object.

## Prototype Chain in practice

```js
let f = function() {
	this.a = 1;
	this.b = 2;
}
let o = new f(); // {a: 1, b: 2}

// let's add properties in f function's prototype
f.prototype.b = 3;
f.prototype.c = 4;
// if you try to set prototype f.prototype = {b:3, c:4}, you'd break the prototype chain

// o.[[Prototype]] has properties b and c
// o.[[Prototype]].[[Prototype]] is Object.prototype
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null
// This is the end of the prototype chain.
// Thus, the full prototype chain looks like:
// {a: 1, b: 2} -> {b: 3, c: 4} -> Object.prototype -> null

console.log(o.a); // 1 - o has own property 'a'
console.log(o.b); // 2 - o has own property 'b'
console.log(o.c); // 4 - o doesn't have own property 'c', so js looks in the prototype chain
console.log(o.d); // undefined
```

## Inheritance

JS does not have "methods" in the form that class-based languages define them. In JS, any function can be added to an object in the form of a property. An inherited function acts just as any other property, including property shadowing as shown above (in this case, a form of __method overriding__).

When an inherited function is executed, the value of `this` points to the inheriting object, not to the prototype object where the function is an own property.

```js
var o = {
	a: 2,
	m: function() {
		return this.a + 1;
	}
};
console.log(o.m()); // 3
// When calling o.m in this case, `this` refers to o

var p = Object.create(o);
// p is an object that inherits from o

p.a = 4;
console.log(p.m()); // 5
// When calling p.m, `this` refers to p.
```

## Using Prototypes

```js
function doSomething(){}
console.log(doSomething.prototype)

// we can add new properties onto the prototype
doSomething.prototype.foo = 'bar'
var instance = new doSomething()
instance.prop = 'some value'
console.log(instance)

/*
{
	prop: 'some value',
	__proto__: {
		foo: 'bar',
		constructor: doSomething(),
		__proto__: {
			...
		}
	}
}
*/
```

## Different ways to create objects and resulting prototype chain

### Syntax constructs

```js
var o = {a: 1};
// newly created object o has Object.prototype as its [[Prototype]]

var b = ['yo', 'whadup', '?'];
// Arrays inherit from Array.prototype
// thus having array methods (indexOf, forEach, etc...)
// Prototype chain looks like this:
// b -> Array.prototype -> Object.prototype -> null

function f() {
	return 2;
}
// Functions inherit from Function.prototype
// which has methods like call, bind, etc...
// Prototype chain looks like this:
// f -> Function.prototype -> Object.prototype -> null
```

### Constructors

A _constructor_ in JS is _just a function_ that happens to be called with the `new` operator.

```js
function Graph() {
	this.vertices = [];
	this.edges = [];
}

Graph.prototype = {
	addVertex: function(v) {
		this.vertices.push(v);
	}
};

var g = new Graph();
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.

g.addVertex(1); // g -> Graph.prototype (addVertex found!)

Graph.prototype.test = function() { console.log('test') } 
// You can still add new properties to the Graph.prototype object.

g.test() // g -> Graph.prototype (test found!)

// But if we overwrite Graph.prototype with a new object, all objects that were
// previously instantiated, will keep referencing to the old Graph.prototype object
Graph.prototype = {
	addEdge: function(e) {
		this.edges.push(e)
	}
}

g.addEdge(1) // TypeError: g.addEdge is not a function
// addEdge wasn't found neither as a g property, nor in its prototype chain
```

### `Object.create`

ES5 introduced a new method: `Object.create()`. Calling this method creates a new object and the prototype of this object is the first argument of the function:

```js
var a = {a: 1};
// a -> Object.prototype -> null

var b = Object.create(a);
// b -> a -> Object.prototype -> null

var c = Object.create(b);
// c -> b -> a -> Object.prototype -> null

var d = Object.create(null);
// d -> null
console.log(d.hasOwnProperty);
// undefined, because d doesn't inherit from Object.prototype
```

### `delete` operator

```js
var a = {a: 1};

var b = Object.create(a); 

console.log(a.a); // print 1 
console.log(b.a); // print 1
b.a=5;
console.log(a.a); // print 1
console.log(b.a); // print 5
delete b.a;
console.log(a.a); // print 1
console.log(b.a); // print 1(b.a value 5 is deleted but it showing value from its prototype chain)
delete a.a;
console.log(a.a); // print undefined
console.log(b.a); // print undefined
```

### `class` keyword

ES6 introduced a new set of keywords implementing _classes_: `class`, `constructor`, `static`, `extends` and `super`.

```js
'use strict';

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```

## Performance 

Lookup time for properties that are high up on the prototype chain can have a negative impact on the performance, and this may be significant where performance is critical. Additionally, trying to access nonexistent properties will always traverse the full prototype chain.

Also, when iterating over the properties of an object, __every__ enumerable property that is on the prototype chain will be enumerated. To check whether an object has a property defined on _itself_ and not somewhere on its prototype chain, it is necessary to use the `hasOwnProperty` method which all objects inherit from `Object.prototype`. 

## Bad Practice: Extension of native prototypes

This technique is called __monkey patching__ and __breaks encapsulation__. The only good reason for extending a built-in prototype is to backport the features of newer JS engines.
