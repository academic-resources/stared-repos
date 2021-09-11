/*
`Date` objects represent a single moment in time in a platform-independent
format. Date objects contain a Number that represents milliseconds since
1 January 1970 UTC, This date and time is the same as the UNIX epoch.

NOTE: while the time value at the heart of a Date object is UTC, the
basic methods to fetch the date and time or its components all work in the local
time zone and offset.
 */


// CONSTRUCTOR
// new Date()
// new Date(value)
// new Date(dateString)
// new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])

const rightNow = new Date();

/*
Note: The correct way to instantiate a new Date object is by using the new Operator.
If you simply call the Date object directly, returned value is a string.
 */
const myStringDate = Date();

const argumentsHandled = Date.length; // 7, arguments handled by constructor


// METHODS

// Date.now()
const millisecondsEpoch = new Date(Date.now());

// Date.parse(): returns milliseconds
// Discouraged due to browser differences and inconsistencies
const parsedDate = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));

// Date.UTC()
// Returns epoch milliseconds with leap seconds ignored
// accepting a date as (year, monthIndex, ...)
// but treats them as UTC
const utcDate1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
console.log(utcDate1.toUTCString());
// expected output: Fri, 02 Feb 1996 03:04:05 GMT



