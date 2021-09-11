/**

Given an array and chunk size, divide the array into many subarrays
where each subarray is of length size.

**/


function chunkOne(array, size) {
  // Create an empty array to hold chunks ('chunked')
  const chunked = []

  // For each element in the 'unchunked' array
  for (let element of array) {
    // Retrieve the last element in 'chunked'
    const last = chunked[chunked.length - 1];

    // If the last element does not exist, or if its length is equal
    // to chunk size
    if (!last || last.length === size) {
      // Push a new chunk into 'unchunked' with the current element
      chunked.push([element]);
    } else {
      // Else add the current element into the chunk
      last.push(element);
    }
  }

  return chunked;
}


function chunkTwo(array, size) {
  // Create an empty array to hold chunks ('chunked')
  const chunked = [];

  // Create an index that starts at 0
  let index = 0;

  // While the index is less than array.length
  while (index < array.length) {
    // Push a slice of length 'size' from 'array' into 'chunked'
    chunked.push(array.slice(index, index + size));

    // Add 'size' to 'index'
    index += size;
  }

  return chunked;
}
