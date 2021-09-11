// Given a BST and a target, find the the largest number smaller than this target

// Example:
// [1,2,6,7,9,11,16,18,20]

          //         9
          //      /     \
          //     2       18       
          //   /  \     /  \
          //  1    6   16   20
          //        \ /
          //        7 11


// Find the greatest number that is smaller than 15
// TARGET: 15
// Output: 11

const greatestUnder = (root, target) => {
  // let queue = [root]
  let currNode = root
  let bestVal = 0

  while (queue.length > 0) {
    // let currNode = queue.shift()

    // if (currNode.left) queue.push(currNode.left)
    // if (currNode.right) queue.push(currNode.right)
    // if (target > currNode.val & currNode.right) queue.push(currNode.right)
    // else if (currNode.left) queue.push(currNode.left)
    if (target > currNode.val && currNode.right) currNode = currNode.right
    else if (currNode.left) currNode = currNode.left

    if (currNode.val < target) {
      bestVal = Math.max(bestVal, currNode.val)
    }
  }

  return bestVal
}


const greatestUnderBetter = (root, target) => {
  let currNode = root
  let bestVal = -Infinity

  while (currNode.left || currNode.right) {
    if (target > currNode.val && currNode.right) {
      currNode = currNode.right
      bestVal = Math.max(bestVal, currNode.val)
    }
    else if (currNode.left) currNode = currNode.left
  }

  return bestVal === -Infinity ? null : bestVal
}

// queue    [9] -> [] -> [2,18] -> [18] -> [18,1,6] -> [1,6] -> [1,6,16,20] -> [6,16,20] -> [6,16,20]
// bestVal   9      9     9         9       9            9           9             9

// queue    [9] -> [18] -> [16] -> [11]
// bestVal   9      9       9       11

// currNode  9 -> 9 -> 9 -> 11
// bestVal   9 -> 9 -> 9 -> 11


// 1 - Repeat the question

// 2 - Clarification problem:
// Edge Case:  What should I return if all values are larger than target?
// What is confusing?

// 3 - Examples: Some examples to test your understanding

// 4 - Formulate your idea - Talk about the aproach and what methods to be used

// 5 - Write some pseudo code - English Sentences (Much easier to code)
//   creates a road map

// 6 - Code it!

// 7 - Run through examples - Edge cases (null, invalid input)

// 8 - Big O (TIME and SPACE) - BEFORE THEY ASK! - walk through analysis


