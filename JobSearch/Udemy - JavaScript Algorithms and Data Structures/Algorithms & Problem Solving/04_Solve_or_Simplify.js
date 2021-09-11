// Solve the problem if you can.
// If you can't!
// Solve a simpler problem.  Ignore the part that is giving you a really hard time to address everything else

// You want to have something to show for yourself
// Getting stuck on one part of a problem and making 0 progress at all looks bad.

// It's much better to start writing code to do the stuff you know how to do keeping in mind you need to incorporate the harder part of the problem.

// Simplify:
//   1. Find the core difficulty in what you're trying to do
//   2. Temporarily ingore that difficulty
//   3. Write a simplified solution
//   4. Then incorporate that difficulty back in

// Example: Write a function which takes in a string and returns counts of each letter in a string

function charCount(str){
  // make object to return at end
  var result = {}
  // loop over string for each character
  for (var i = 0; i < str.length; i++) {
    var char = str[i]
    // if the char is a number/letter AND is a key in object, add one to count
    if (result[char] > 0) {
      result[char]++
    }
    // if the char is a number/letter AND is not in object, add it to object and set value to 1
    else {
      result[char] = 1
    }
  }
    // if character is something else (space, period, etc.) don't do anything
  // return object at end
  return result
}

console.log(charCount("hello there"))


// if you get 90% of the way there, then it usually demonstrates more about your problem solving ability
// get the right pieces in place so that once you get the hard part, you can plug it in.
// Solve a problem that you CAN solve.