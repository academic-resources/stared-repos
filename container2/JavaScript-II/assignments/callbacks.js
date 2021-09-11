const items = ['Pencil', 'Notebook', 'yo-yo', 'Gum'];

function firstItem(arr, cb) {
  // firstItem passes the first item of the given array to the callback function.
  return cb(arr[0]);
}

const consoleThis = (item) => {console.log(item)};

firstItem(items, consoleThis);


function getLength(arr, cb) {
  // getLength passes the length of the array into the callback.
  return cb(arr.length);
}

getLength(items, consoleThis);

function last(arr, cb) {
  // last passes the last item of the array into the callback.
  return cb(arr[arr.length -1]);
}

last(items, consoleThis);

function sumNums(x, y, cb) {
  // sumNums adds two numbers (x, y) and passes the result to the callback.
  return cb(x+y);
}

sumNums(4, 6, consoleThis);

function multiplyNums(x, y, cb) {
  // multiplyNums multiplies two numbers and passes the result to the callback.
  return cb(x*y);
}

multiplyNums(5, 10, consoleThis);

function contains(item, list, cb) {
  // contains checks if an item is present inside of the given array/list.
  // Pass true to the callback if it is, otherwise pass false.
  let yes = [];
  for (i=0; i<list.length; i++) {
    if (list[i] === item) {
     yes.push(true);
    }
  }
  if (yes.length === 0) {return cb(false);}
  return cb(true);
}

contains('Gum', items, consoleThis);

/* STRETCH PROBLEM */

function removeDuplicates(array, cb) {
  // removeDuplicates removes all duplicate values from the given array.
  // Pass the duplicate free array to the callback function.
  // Do not mutate the original array.
}
