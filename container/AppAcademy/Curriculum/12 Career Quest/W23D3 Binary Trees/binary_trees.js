class TreeNode {
  constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
  }
}

let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;


//        A
//      /   \
//     B     C
//   /   \     \
//  D     E     F

console.log(a)

// A common mistake when designing recursive tree algorithms is to make the base case about the root being a leaf, instead we'll want the basecase to cover the root being empty:

//left-to-right  
function inOrderPrint(root) {  // d, b, e, a, c, f
  if (!root) return;
  inOrderPrint(root.left);
  console.log(root.val);
  inOrderPrint(root.right);
}

console.log(inOrderPrint(a))

//top-to-bottom & left-to-right
function preOrderPrint(root) {  // a, b, d, e, c, f
  if (!root) return;
  console.log(root.val);
  preOrderPrint(root.left);
  preOrderPrint(root.right);
}

console.log(preOrderPrint(a))

//bottom-to-top & left-to-right
function postOrderPrint(root) {  // d, e, b, f, c, a
  if (!root) return;
  postOrderPrint(root.left);
  postOrderPrint(root.right);
  console.log(root.val);
}

console.log(postOrderPrint(a))


//==================DEPTH FIRST==================
// travels in a preOrder pattern: a, b, d, e, c, f
// LIFO structure
function depthFirst(root) {
  // initialize the stack with the root node
  let stack = [ root ];

  // continue running the algorithm while there are still nodes on the stack
  while (stack.length) {

      // pop the top node from the stack
      let node = stack.pop();

      // we consider a node visited once we pop it,
      // so we should print the node's value now
      console.log(node.val);

      // add the node's left and right children, if they exist
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);

      // IMPORTANT: do not print out the children yet; they must wait their turn to be popped first
  }
}
console.log(depthFirst(a))
// a key idea to take away is that we only consider a node "visited" once we pop it. We do not consider a node "visited" when we push it

// [a]                      initiates 'a' in the stack
// a                        processes 'a' logging itself
// [_] + [c, b]             processed 'a' and stacks 'c' then 'b'
// a, b                     processes 'b' logging itself
// [c, _] + [e, d]          processed 'b' and stacks 'e' then 'd'
// a, b, d                  processes 'd' logging itself
// [c, e, _]                processed 'd' nothing else to stack
// a, b, d, e               processes 'e' logging itself
// [c, _]                   processed 'e' nothing else to stack
// a, b, d, e, c            processes 'c' logging itself
// [_] + [f]                processed 'c' and stacks 'f'
// a, b, d, e, c, f         processes 'f' logging itself
// [_]                      processed 'f' nothing else to stack - end of stack

function depthFirstRecur(root) {
  if (!root) return;
  console.log(root.val);
  depthFirstRecur(root.left);
  depthFirstRecur(root.right);
}

console.log(depthFirstRecur(a))


//==================BREADTH FIRST==================
// travels alphabetically: a, b, c, d, e, f
// FIFO structure
function breadthFirst(root) {
  // initialize the queue with the root node
  let queue = [ root ];

  // continue running the algorithm while there are still nodes on the queue
  while (queue.length) {
      // remove the front node from the queue
      let node = queue.shift();

      // the node we just removed is now "visited", so print it
      console.log(node.val);

      // add the left and right children to the back of the queue, if they exist
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      // IMPORTANT: do not print out the children yet; they must wait their turn to exit the front of the queue first
  }
}

console.log(breadthFirst(a))

// [a]                      initiates 'a' into the queue
// a                        processes 'a' logging itself
// [_] + [b, c]             processed 'a' and queues 'b' and 'c'
// a, b                     processes 'b' logging itself
// [_, c] + [d, e]          processed 'b' and queues 'd' and 'e'
// a, b, c,                 processes 'c' logging itself
// [_, d, e] + [f]          processed 'c' and queues 'f'
// a, b, c, d               processes 'd' logging itself
// [_, e, f]                processed 'd' nothing else to queue
// a, b, c, d, e            processes 'e' logging itself
// [_, f]                   processed 'e' nothing else to queue
// a, b, c, d, e, f         processes 'f' logging itself
// [_]                      processed 'f' nothing else to queue - end of stack



// We'll rarely run into a recursive BF implementation (probably never) because recursion uses an underlying call stack, but we really want the opposite of a stack (a queue).