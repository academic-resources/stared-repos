// Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root, levels = [], level = 0) {
  if (!root) return levels;
  if (levels[level]) {
      levels[level].push(root.val);
  } else {
      levels[level] = [root.val];
  }
  levelOrder(root.left, levels, level + 1);
  levelOrder(root.right, levels, level + 1);
  
  return levels;
};

var levelOrderIter = function(root, level = 0) {
  if (!root) return [];
  
  let levels = []; 
  let queue = [[root, level]]; 
  
  while (queue.length) {  
    let [currNode, level] = queue.shift();
    
    levels[level] = levels[level] || [];
    levels[level].push(currNode.val);
    
    if (currNode.left) queue.push([currNode.left, level + 1]); 
    if (currNode.right) queue.push([currNode.right, level + 1]);
  }
  
  return levels;    
};