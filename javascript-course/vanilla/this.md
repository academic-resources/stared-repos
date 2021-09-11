# `this` keyword

A function's `this` keyword behaves a little differently in JS compared to other languages. It also has some differences between _strict mode_ and non-strict mode.

In most cases, the value of `this` is determined by _how a function is called_ (__Runtime binding__). ES5 introduced the `bind()` method to set the value of a function's `this` regardless of how it's called, and ES6 introduced _arrow functions_ which don't provide their own `this` binding but rather retains the `this` value of the enclosing lexical context.

* In a method, `this` refers to the owner object.
* Alone, `this` refers to the global object.
* In a function, `this` refers to the global object, unless set by call.
* In a function, in strict mode, `this` is undefined.
* In an event, `this` refers to the element that received the event.
* Methods like call(), and apply() can refer `this` to any object (except arrow functions).

## Global Context

In global execution context (outside of any function), `this` refers to the global object whether in strict mode or not.

```js
console.log(this === window); // true
```

## Function Context

Inside a function, the value of `this` depends on how the function is called. You can set the value of `this` to a particular value when calling a function, using `call()`, `apply()` or `bind()`.

If not in strict mode, and `this` not being set by the call, it will default to the global object.

```js
function f1() { return this; }
f1() === window; // true
```

In strict mode, however, if the value of `this` is not set when entering an execution context, it remains `undefined`.

```js
function f2() {
	`use strict`;
	return this;
}
f2() === undefined; // true
```

## Class Context

The behavior of `this` in classes and functions is similar, since classes are functions under the hood.

Within a class constructor, `this` is a regular object, refers to the object to be created. All non-static methods within the class are added to the prototype of `this`. Static methods will be added as properties to the class itself.

```js
class Example {
	constructor() {
		const proto = Object.getPrototypeOf(this);
		console.log(Object.getOwnPropertyNames(proto));
	}
	first() {}
	second() {}
	static third() {}
}

new Example(); // ['constructor', 'first', 'second']
```

## Derived Classes Context

Unlike base class constructors, derived constructors have no initial `this` binding. Calling `super()` creates a `this` binding within the constructor and essentially has the effect of evaluating the following line of code:

```js
this = new Base();
```

Refering to `this` before calling `super()` will throw an error.

Derived classes must not return before calling `super()` unless they return an `Object` or have no constructor at all.

## Arrow functions

In Arrow functions, `this` retains the value of the enclosing lexical context's `this`. In global code, it will be set to the global object. No matter what, `this` is set to what it was when it was created. The same applies to arrow functions created inside other functions.

You cannot bind the scope using `apply`, `call` or `bind` like with normal functions.

```js
var obj = {
	bar: function() {
		var x = (() => this);
		return x;
	}
};
var fn = obj.bar(); // obj
console.log(fn() === obj) // true

var fn2 = obj.bar;
console.log(fn2() === window) // true
```

```js
const myObj = {
	myArrowFunc: null,
	myMethod: function() {
		this.myArrowFunc = () => { console.log(this) };
	}
};
myObj.myMethod(); // this === myObj
myObj.myArrowFunc() // this === myObj
const myOutterArrowFunc = myObj.myArrowFunc;
myOutterArrowFunc() // this === myObj
```

Arrow functions are really useful for async callbacks exactly for this reason, if you are using closures.

```js
myObj = {
	myMethod: function() {
		helperObject.doSomethingAsync('superCool', () => {
			console.log(this); // this === myObj
		});
	},
};
```

## Object method

When a function is called as a method of an object, its `this` is set to the object the method is called on.

```js
var o = {
	prop: 37,
	f: function() {
		return this.prop;
	}
};
console.log(o.f()) // 37;

function independent() { return this.prop }
o.f = independent;
console.log(o.f()); // 37
```

## Inline event handler 

`this` is set to the DOM element on which the listener is placed.

```js
<button onclick="alert(this.tagName.toLowerCase());">
	Show this
</button>
```

However, only the outer code has its `this` set this way:

```js
<button onclick="alert((function() { return this; })())">
	Show inner this
</button>
```

In this case, the inner function's `this` isn't set so it returns the global/window object.