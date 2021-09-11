// Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its zigzag level order traversal as:
// [
//   [3],
//   [20,9],
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

var zigzagLevelOrder = function(root, level = 0) {
  if (!root) return [];
  
  let levels = []; 
  let queue = []; 
  queue.push([root, level]);
  
  while (queue.length) {  
      let [currNode, level] = queue.shift();
  
      levels[level] = levels[level] || [];
      if (level % 2 === 0) {
        levels[level].push(currNode.val);    
      } else {
        levels[level].unshift(currNode.val);
      }
  
      if (currNode.left) queue.push([currNode.left, level + 1]); 
      if (currNode.right) queue.push([currNode.right, level + 1]);
  }
  
  return levels;    
};