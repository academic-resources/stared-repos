# Variables

In JS, we can define JavaScript with three different keywords: `var`, `let`, `const`. There are two main differences between the three of them, the _scope level_ to which they apply, and _variation allowance_.

## `const` - Block Level Scope

First, `const` defines a variable whose __reference value cannot change__. Every variable is a reference to a memory sector of your host. For example, if you create a variable using `const x = 3`, this means that a portion of your host memory will be dedicated to storing this value for further references. Whenever you try to access it, for example with `console.log(x)`, what's happening under the hood is that you are actually trying to read the memory address which `x` references.

With `const`, the reference cannot change. If you now try to do `const x = 4` or just `x = 4`, it will cause an error. The first one happens because we are trying to declare a new variable `x` but there's already a variable with that name, while the second happens because we are trying to change the memory address which `x` references to, and `const` keyword won't allow us.

This doesn't mean that the value stored in that memory address can't mutate. There's a special case with __Strings and Numbers as they are immutable__, but with objects and arrays we can do things like the following:

```js
const me = { name: 'Nacho' }
me.name = 'Nacho Herrera'
me.mood = 'Happy'
```

This is allowed because the variable `me` still references the same memory address than before, we only modified its value.

## `let` - Block Level Scope

The first difference is that we can change the reference value of `let`.

```js
let x = 3
x = 4;
```

## Block Level Scope

Let's see what _Block Level Scope_ means with some practical examples:

```js
for (let x = 0; x < 2; x++)
{
	console.log(x) // x is visible here
}
// but x is *not* visible out here
```

```js
function funWithPi {
	const Pi = 3.14
	console.log(Pi)
}
// Pi is *not* visible out here
```

## `var` - Function Scope

The difference of scope means that `var` is visible within a function, and its sub-functions and blocks.


```js
{
	var x = 1
	let y = 1
	const z = 1
}
console.log(x) // 1
// both y and z are *not* visible out here
```

```js
for(var x = 0; x < 5; ++x) {}
console.log(x) // note that x is visible out here
```

## Scope complex examples

This is what can happen if we play around with scopes:

```js
(function() {
	// x is not defined here
	function test() {
		console.log(`x:${x} from test()`)
		if (false) { var y = 0; }
		console.log(`y:${y} from test()`) // undefined: y is declared but not initialized
	}
	// neither x or y is not defined here	
	{
		var x = 1
	}
	// x is defined out here
	console.log(`x:${x} from main scope`) 
	test(); // test will have access to this x
	console.log(`x:${x} from main scope`)
})()
```

```text
Output:
x:1 from main scope
x:1 from test()
y:undefined from test()
x:1 from main scope
```

```js
(function() {
	// x is not defined here
	function test() {
		console.log(`x:${x} from test()`) // undefined: x is declared but not unitialized
		var x = 0; // we can define our own variable x inside this scope
		// As we declared our own var x here, we no longer have access to the outside x
		if (false) { var y = 0; }
		console.log(`y:${y} from test()`) // undefined: y is declared but not initialized
	}
	// neither x or y is not defined here	
	{
		var x = 1
	}
	// x is defined out here
	console.log(`x:${x} from main scope`) 
	test(); // test will have access to this function-level x unless test() declares its own var x
	console.log(`x:${x} from main scope`)
})()
```

```text
Output:
x:1 from main scope
x:undefined from test()
y:undefined from test()
x:1 from main scope
```