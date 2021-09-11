// Given the root to a binary tree, implement serialize(root),
// which serializes the tree into a string, and deserialize(s),
// which deserializes the string back into the tree.

// For example, given the following Node class

// class Node:
//     def __init__(self, val, left=None, right=None):
//         self.val = val
//         self.left = left
//         self.right = right

// The following test should pass:

// node = Node('root', Node('left', Node('left.left')), Node('right'))
// assert deserialize(serialize(node)).left.left.val == 'left.left'

class Node {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

const tree = new Node(
  'root',
  new Node('left', new Node('left.left')),
  new Node('right')
)

function serialize(root) {
  if (!root) return '#'
  return JSON.stringify({
    [root.val]: { l: serialize(root.left), r: serialize(root.right) }
  })
}

function deserialize(root) {
  if (root === '#') return null
  const obj = JSON.parse(root)
  const key = Object.keys(obj)[0]
  const left = deserialize(obj[key].l)
  const right = deserialize(obj[key].r)
  return new Node(key, left, right)
}

console.log(deserialize(serialize(tree)).left.left.val === 'left.left')
