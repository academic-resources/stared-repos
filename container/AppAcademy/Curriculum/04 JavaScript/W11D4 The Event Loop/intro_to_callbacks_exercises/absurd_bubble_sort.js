const readline = require("readline");

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} > ${el2}? (yes/no) `, input => {
        (input.toLowerCase() === 'yes') ? callback(true) : callback(false);
        
    })
    // Prompt user to tell us whether el1 > el2; pass true back to the
    // callback if true; else false.
}



// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
      askIfGreaterThan(arr[i], arr[i + 1], (isGreatherThan) => {
        if (isGreatherThan) {
          [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
          madeAnySwaps = true;
        }
        innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop)
      });
    }
    if (i == (arr.length - 1)) {
      outerBubbleSortLoop(madeAnySwaps)
    }
    // Do an "async loop":
    // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
    //    know whether any swap was made.
    // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
    //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
    //    continue the inner loop. You'll want to increment i for the
    //    next call, and possibly switch madeAnySwaps if you did swap.
}

// let array = [4,3,2,1]
// innerBubbleSortLoop(array, 0, false, () => console.log('inOuterBubbleSort'));
// console.log(array)

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
          innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop)
        } else {
          sortCompletionCallback(arr)
        }
        // Begin an inner loop if you made any swaps. Otherwise, call
        // `sortCompletionCallback`.
    }
    outerBubbleSortLoop(true)
    // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function (arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
});