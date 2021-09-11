/*
`valueOf` returns the primitive value of specified object.
 */

function MyNumberType(n) {
	this.number = n;
}

MyNumberType.prototype.valueOf = function() {
	return this.number;
};

const obj1 = new MyNumberType(4);

console.log(obj1 + 3); // 7
