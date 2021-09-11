//Given a Binary Search Tree (BST) with the root node root, return the minimum difference between the values of any two different nodes in the tree.

minDiffInBST = root => {
    let prev = Infinity;
    let minDiff = Infinity;

    const traverse = node =>{
        if(!node){
            return;
        }
        traverse(node.left);
        minDiff = Math.min(minDiff, Math.abs(node.val - prev));
        prev = node.val;
        traverse(node.right);
    };
    traverse(root);
    return minDiff

};