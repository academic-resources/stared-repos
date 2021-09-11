const assert = require('assert');

/**
 * Generate a random integer
 * @ param {number} min
 * @ param {number} max
 */
function makeRandomInt(min=1, max=20) {
	return min + Math.floor((max - min) * Math.random());
}

/**
 * Generate an array of random integers
 * @param {number} length - How many elements in the array
 * @param {number=} maxAbs - Max absolute value possible
 */
function makeRandomArray(length, maxAbs=100) {
	const randomArray = [];

	for (let i = 0; i < length; i++) {
		randomArray.push(makeRandomInt(-maxAbs, maxAbs));
	}

	return randomArray;
}

/**
 *
 * @param amount - How many random arrays to create
 */
function makeTestArrays(amount) {
	const testArrays = [];

	for (let i = 0; i < amount; i ++) {
		const randomLength = makeRandomInt();
		const randomArray = makeRandomArray(randomLength);
		testArrays.push(randomArray);
	}

	return testArrays;
}

/**
 * Assert equality between two arrays
 * @param A - Array A
 * @param B - Array B
 * @returns {boolean}
 */
function assertArrayEquality(A, B) {
	if (A === B) return true;
	if (A == null || B == null) return false;
	if (A.length !== B.length) return false;

	let equals = true;
	for (let i = 0; i < A.length && equals; ++i) {
			if (A[i] !== B[i]) equals = false;
	}

	return equals;
}

/**
 *
 * @param sortAlgorithm - Sorting algorithm implementation, should return a new array
 * @param amount - How many tests against random sequences to run
 */
function runSortingTests(sortAlgorithm, amount) {
	const testArrays = makeTestArrays(amount);

	testArrays.forEach( function (seq, index) {
		console.log(`Running test #${index+1}`);
		const sortedSequence = sortAlgorithm(seq);
		seq.sort((a, b) => a - b); // Sequence has now been sorted in place
		let errorMessage = `Expected: [${seq}]`;
		errorMessage += `\nResult: [${sortedSequence}]`;
		assert.ok(assertArrayEquality(sortedSequence, seq), errorMessage);
		console.log('PASS!');
	});
}

module.exports = runSortingTests;
