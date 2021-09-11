/*
`Function.prototype.bind()` creates a new function that,
when called, has its `this` keyword set to the provided value,
with a given sequence of arguments preceding any provided.
 */

const module = {
	x: 42,
	getX: function() {
		return this.x;
	}
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // function gets invoked at global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
