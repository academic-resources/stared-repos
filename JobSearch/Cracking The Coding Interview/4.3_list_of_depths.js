// I AM ENOUGH

// Given a binary tree, design an algorithm which creates a linked list of all the nodes
// at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).

// input: BinaryTree
//         19
//        /   \
//      5      24
//    /  \    /  \
//   3    8  23   31
//  /
// 1

// output: 4 linked lists:
// [
// { 19 },
// { 5 } => { 5, 24 },
// { 3, 8, 23, 31 },
// { 1 }
// ]

const { Node, LinkedList } = require('./LinkedList')
const { SampleTree } = require('./4.2_minimal_tree')


function listOfDepths(root) {
  // built a queue with root in it
  // track levels
  let lists = []
  // let queue = [[root, 0]] OR
  let queue = []
  queue.push([root, 0])
  // while queue is not empty
  while (queue.length) {
    // if linked list does not exist at level, create one, else add to tail
    [currNode, level] = queue.shift()

    lists[level] = lists[level] || new LinkedList()
    lists[level].addToTail(currNode.value)

    // Same Code in If Block
    // if (!lists[level]) {
    //   lists[level] = new LinkedList()
    //   lists[level].addToTail(currNode.value)
    // } else {
    //   lists[level].addToTail(currNode.value)
    // }

    // left before right
    if (currNode.left) queue.push([currNode.left, level + 1])
    if (currNode.right) queue.push([currNode.right, level + 1])
  }
  return lists
}

console.log(SampleTree)
console.log(listOfDepths(SampleTree))

function listOfDepthsRecur(root, lists = [], level = 0) {
  if (!root) return lists;
  
  if (!lists[level]) lists[level] = new LinkedList()
  // Or
  // lists[level] = lists[level] || new LinkedList()
  lists[level].addToTail(root.value)

  listOfDepthsRecur(root.left, lists, level + 1)
  listOfDepthsRecur(root.right, lists, level + 1)

  return lists
}

console.log("==================================")
console.log(listOfDepthsRecur(SampleTree))



// Search a Binary Search Tree Choose BFS or DFS
// If BFS, use a queue (or double stack queue for efficiency)
// if DFS, use a stack

// 0. return null if empty
// 1. setup your variables, lists, collections, ADTs
// 2. instantiate your stack/queue with the root
// 3. "look" at your node ( e.i. stack.pop(), queue.shift() )
// 4. do your logic
// 5. push left child and right child