/*
* QUICK SORT
* One of the most important sorting methods. It takes a pivot value (random)
* from an array. All other elements in the array are split to two categories.
* They may be less or greater than the pivot value.
*
* After that, each of the categories are subjected to the same procedure,
* that is a pivot is chosen then each category is divided into two sub-categories.
*
* Eventually, sub-categories are divided in such a way that they may contain an
* element or no element if there are no more elements to compare.
*
 */

function quickSort(seq) {
	// Base case: 1 element means sorted
	if (seq.length <= 1) return seq;

	const left = [];
	const right = [];
	const newArray = [];
	const pivot = seq[0];
	const length = seq.length;

	for (let i = 1; i < length; i++) {
		if (seq[i] <= pivot) {
			left.push(seq[i]);
		}
		else {
			right.push(seq[i]);
		}
	}

	return newArray.concat(quickSort(left), pivot, quickSort(right));
}

const runSortingTests = require('./utils/sequenceTests');

runSortingTests(quickSort, 10);
