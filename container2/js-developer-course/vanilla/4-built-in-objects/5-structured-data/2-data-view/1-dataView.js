/*
DataView provides a low-level interface for reading and writing
multiple number types in a binary ArrayBuffer, without having
to care about the platform's endianness.
 */

/*
ENDIANNESS
Multi-byte number formats are represented in memory differently
depending on machine architecture. DataView accessors provide
explicit control of how data is accessed, regardless of the
executing computer's endianness.
 */

var littleEndian = (function() {
	var buffer = new ArrayBuffer(2);
	new DataView(buffer).setInt16(0, 256, true );
	// Int16Array uses the platform's endianness
	return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // true or false

/*
64-bit Integer Values
Because JS does not currently include standard support or 64-bit integer
values, DataView does not offer native 64-bit operations. As a workaround
you could implement your own getUint64() function to obtain a value with
precision up to Number.MAX_SAFE_INTEGER, which could suffice for certain
cases.
 */
