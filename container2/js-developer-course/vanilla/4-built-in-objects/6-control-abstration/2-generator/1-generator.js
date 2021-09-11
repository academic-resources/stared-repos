/*
Generator object is returned by a generator function and it conforms
to both the iterable protocol and the iterator protocol.
 */

/*
SYNTAX
 */

function* gen() {
	yield 1;
	yield 2;
	yield 3;
}

var g = gen(); // Generator {}

/*
PROTOTYPE

+ next()
returns a value yielded by the yield expression

+ return()
returns the given value and finishes the generator

+ throw()
throws an error to a generator (also finishes the generation,
unless caught from within that generator)
 */

// AN INFINITE ITERATOR
function* idMaker() {
	var index = 0;
	while(true) yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
