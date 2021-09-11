/*
`toLocaleString()` returns a string representing the object.
This method is meant to be overridden by derived objects for
locale-specific purposes.
 */

const date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

console.log(date1.toLocaleDateString('ar-EG'));
