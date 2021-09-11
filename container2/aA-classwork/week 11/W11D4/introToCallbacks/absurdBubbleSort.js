const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}? `, function(answer) {
    answer === "yes" ? callback(true) : callback(false);
    // reader.close();
  });
}

// askIfGreaterThan(7, 4, function(boolean) { console.log(boolean)});

function innerBubbleSortLoop(arr, i , madeAnySwaps, outerBubbleSortLoop) {
  // base case - end of the array
  if (i == (arr.length - 1)) {
    outerBubbleSortLoop(madeAnySwaps); // sorted flag
    return arr;
  }
  // iterative step
  if (i < (arr.length - 1)) {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      console.log(arr) //optional
      if (isGreaterThan) { // if true
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      } 
      innerBubbleSortLoop(arr, (i + 1), madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

// innerBubbleSortLoop([14, 2, 7], 0, madeAnySwaps = true, function() {
//   console.log("In outer bubble sort");
// });

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, madeAnySwaps = false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(madeAnySwaps = true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
    console.log(`Sorted array: [${arr}]`);
  reader.close();
});